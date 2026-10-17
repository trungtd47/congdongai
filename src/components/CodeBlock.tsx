"use client";

import { useRef, useState, type ComponentProps } from "react";

// Khối code trong tài liệu Thư viện, có nút sao chép để dán thẳng vào Hermes.
export function CodeBlock(props: ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [state, setState] = useState<"idle" | "done" | "error">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(
        ref.current?.innerText.trimEnd() ?? "",
      );
      setState("done");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("error");
    }
  }

  return (
    <div className="code-copy">
      <pre ref={ref} {...props} />
      <button
        type="button"
        onClick={copy}
        className="code-copy-btn"
        aria-live="polite"
      >
        {state === "done"
          ? "Đã chép"
          : state === "error"
            ? "Chép tay giúp mình"
            : "Sao chép"}
      </button>
    </div>
  );
}
