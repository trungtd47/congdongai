"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import "./diagrams.css";

type Phase = "idle" | "armed" | "in";

/**
 * Khung sơ đồ động. Phần con được render sẵn ở server ở trạng thái cuối, nên không JS / reduced-motion
 * vẫn đọc đủ. Chuyển động là lớp bổ sung: vào cảnh khi cuộn tới, chạy khi đang nhìn thấy,
 * có nút tắt/xem lại, và tôn trọng prefers-reduced-motion.
 */
export function MotionFigure({
  children,
  caption,
  label,
}: {
  children: ReactNode;
  caption: ReactNode;
  label: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [canMotion, setCanMotion] = useState(false);
  const [userOff, setUserOff] = useState(false);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setReady(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ok = !reduce.matches && typeof IntersectionObserver !== "undefined";
    setCanMotion(ok);
    if (!ok) return;
    const top = el.getBoundingClientRect().top;
    setPhase(top < window.innerHeight * 0.85 ? "in" : "armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setPhase("in");
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    const onChange = () => setCanMotion(!reduce.matches);
    reduce.addEventListener("change", onChange);
    return () => {
      io.disconnect();
      reduce.removeEventListener("change", onChange);
    };
  }, []);

  const motion = canMotion && !userOff;
  const running = motion && visible;

  // SMIL (chấm chạy dọc đường cong trong SVG) không theo CSS: tạm dừng bằng API riêng.
  useEffect(() => {
    ref.current?.querySelectorAll("svg").forEach((svg) => {
      if (running) svg.unpauseAnimations?.();
      else svg.pauseAnimations?.();
    });
  }, [running]);

  const replay = useCallback(() => {
    const el = ref.current;
    if (!el || !motion) return;
    setPhase("armed");
    void el.getBoundingClientRect();
    requestAnimationFrame(() => {
      el.querySelectorAll("svg").forEach((svg) => svg.setCurrentTime?.(0));
      setPhase("in");
    });
  }, [motion]);

  return (
    <figure
      ref={ref}
      className="dg"
      role="group"
      aria-label={label}
      data-state={phase}
      data-motion={motion ? "on" : "off"}
      data-running={running ? "true" : "false"}
    >
      {children}
      {ready && canMotion && (
        <div className="dg-controls">
          <button
            type="button"
            onClick={() => setUserOff((v) => !v)}
            aria-pressed={!userOff}
          >
            {userOff ? "Bật chuyển động" : "Tắt chuyển động"}
          </button>
          <button type="button" onClick={replay} disabled={userOff}>
            Xem lại
          </button>
        </div>
      )}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
