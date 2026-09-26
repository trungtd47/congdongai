"use client";

import { useRef, useState } from "react";
import { uploadCommentImage, validateImage } from "@/lib/storage";

// Nút chọn ảnh → upload lên Storage → gọi onChange với URL để form cha nhận.
export function ImageUpload({
  uid,
  imageURL,
  onChange,
  disabled,
}: {
  uid: string;
  imageURL: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handlePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    // Reset để chọn lại cùng một file vẫn kích hoạt sự kiện change.
    e.target.value = "";
    if (!file) return;
    const err = validateImage(file);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setBusy(true);
    try {
      const url = await uploadCommentImage(file, uid);
      onChange(url);
    } catch {
      setError("Chưa tải được ảnh. Bạn thử lại nhé.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handlePick}
        aria-label="Chọn ảnh đính kèm"
      />
      {imageURL ? (
        <div className="flex items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageURL}
            alt="Ảnh đính kèm"
            className="max-h-40 max-w-full rounded-lg border border-line object-contain"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-md px-2 py-1 text-xs font-semibold text-clay hover:bg-clay/10"
            aria-label="Gỡ ảnh đính kèm"
          >
            ✕ Gỡ ảnh
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled || busy}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-sm font-semibold text-ink-soft transition-colors hover:border-teal hover:text-teal disabled:opacity-50"
        >
          {busy ? "Đang tải ảnh…" : "🖼 Gửi kèm ảnh"}
        </button>
      )}
      {error && (
        <p role="alert" className="text-xs text-clay">
          {error}
        </p>
      )}
    </div>
  );
}
