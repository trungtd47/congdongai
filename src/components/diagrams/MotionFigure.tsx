"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import "./diagrams.css";

type Phase = "idle" | "armed" | "in";

/**
 * Khung sơ đồ động. Phần con được render sẵn ở server ở trạng thái cuối, nên không JS / reduced-motion
 * vẫn đọc đủ. Chuyển động là lớp bổ sung: vào cảnh khi cuộn tới, chạy khi đang nhìn thấy,
 * và tôn trọng prefers-reduced-motion (máy bật giảm chuyển động thì hiện bản tĩnh).
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
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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

  const motion = canMotion;
  const running = motion && visible;

  // SMIL (chấm chạy dọc đường cong trong SVG) không theo CSS: tạm dừng bằng API riêng.
  useEffect(() => {
    ref.current?.querySelectorAll("svg").forEach((svg) => {
      if (running) svg.unpauseAnimations?.();
      else svg.pauseAnimations?.();
    });
  }, [running]);

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
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
