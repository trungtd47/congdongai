"use client";

import Link from "next/link";
import { useState } from "react";
import { createPost } from "@/lib/firestore-ops";
import { isDemoMode } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { signInWithGoogle } from "@/lib/auth";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ImageUpload } from "@/components/ImageUpload";

const DEMO_UID = "demo-user";

export default function TaoCauHoiPage() {
  const { user, loading } = useAuth();
  const demo = isDemoMode();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [postId, setPostId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim() || busy || (!demo && !user)) return;
    setBusy(true);
    setError("");
    try {
      const id = await createPost({
        title: title.trim(),
        body: body.trim(),
        imageURL,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
          .slice(0, 5),
        authorUid: demo ? DEMO_UID : user!.uid,
        authorName: demo
          ? "Bạn"
          : (user!.displayName ?? user!.email?.split("@")[0] ?? "Thành viên"),
      });
      setPostId(id);
    } catch {
      setError("Chưa đăng được câu hỏi. Kiểm tra kết nối và thử lại nhé.");
    } finally {
      setBusy(false);
    }
  }

  if (postId) {
    return (
      <div className="wrap max-w-xl py-16">
        <div className="card p-8 text-center">
          <div className="mb-2 text-3xl">🎉</div>
          <h1 className="mb-2 text-[22px] font-extrabold">
            Câu hỏi đã được đăng!
          </h1>
          <p className="mb-5 text-sm text-ink-soft">
            Bạn có thể mở lại câu hỏi để theo dõi câu trả lời.
          </p>
          <Link href={`/hoi-dap/${postId}`} className="btn btn-primary">
            Xem câu hỏi vừa đăng
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap max-w-xl py-12">
      <Breadcrumb
        items={[{ name: "Hỏi đáp", href: "/hoi-dap" }, { name: "Đặt câu hỏi" }]}
      />
      <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
        Hỏi đáp
      </p>
      <h1 className="mb-1 text-[28px] font-extrabold tracking-[-0.3px]">
        Đặt câu hỏi
      </h1>
      <p className="mb-6 text-sm text-ink-soft">
        Mô tả rõ vấn đề bạn gặp, cộng đồng sẽ giúp nhanh hơn.
      </p>

      {demo && (
        <div className="mb-4 rounded-lg bg-amber-soft px-4 py-2 text-sm text-amber-900">
          Chế độ demo - câu hỏi lưu tạm trong phiên, không công khai lâu dài.
        </div>
      )}

      {!demo && loading ? (
        <div className="card p-6 text-sm text-ink-soft">
          Đang kiểm tra đăng nhập…
        </div>
      ) : !demo && !user ? (
        <div className="card flex flex-col items-start gap-3 p-6">
          <p className="text-sm text-ink-soft">
            Đăng nhập bằng Google trước khi đặt câu hỏi.
          </p>
          <button
            type="button"
            onClick={signInWithGoogle}
            className="btn btn-primary"
          >
            Đăng nhập để đặt câu hỏi
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="card flex flex-col gap-4 p-6">
          <div>
            <label className="mb-1 block text-sm font-semibold">Tiêu đề</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Hermes không cập nhật được trên Windows"
              className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-teal"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Chi tiết</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={5}
              placeholder="Mô tả bạn đã thử gì, lỗi hiện ra thế nào…"
              className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-teal"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">
              Ảnh đính kèm (không bắt buộc)
            </label>
            <ImageUpload
              uid={demo ? DEMO_UID : (user?.uid ?? "")}
              imageURL={imageURL}
              onChange={setImageURL}
              disabled={busy}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">
              Chủ đề (cách nhau bằng dấu phẩy)
            </label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="cài đặt, windows"
              className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-teal"
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-clay">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="btn btn-primary self-end disabled:opacity-50"
          >
            {busy ? "Đang đăng…" : "Đăng câu hỏi"}
          </button>
        </form>
      )}
    </div>
  );
}
