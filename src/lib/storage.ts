// Upload ảnh đính kèm (bình luận / câu hỏi / trả lời) lên Firebase Storage.
// Demo mode → trả về object URL tạm để preview, không lưu lâu dài.

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { isDemoMode, getStorageInstance } from "./firebase";

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function validateImage(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Chỉ nhận ảnh JPG, PNG, WebP hoặc GIF.";
  }
  if (file.size > MAX_BYTES) {
    return "Ảnh quá lớn - vui lòng chọn ảnh dưới 5MB.";
  }
  return null;
}

export async function uploadCommentImage(
  file: File,
  uid: string,
): Promise<string> {
  if (isDemoMode()) {
    // Không có Storage thật: trả về bản preview tạm cho phiên hiện tại.
    return URL.createObjectURL(file);
  }

  const storage = getStorageInstance();
  if (!storage) throw new Error("Storage chưa sẵn sàng");

  const ext = (file.name.split(".").pop() || "jpg")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const path = `comment-images/${uid}/${name}`;
  const fileRef = ref(storage, path);
  const snap = await uploadBytes(fileRef, file, {
    contentType: file.type || "image/jpeg",
  });
  return getDownloadURL(snap.ref);
}
