"use client";

import { useAuth } from "@/hooks/useAuth";
import { PushPrompt } from "@/components/PushPrompt";

// Cuối bài: ai cũng được mời nhận bài mới (khách không cần đăng nhập). Có cooldown, không hiện lúc mở trang.
export function ArticlePushPrompt() {
  const { user, loading } = useAuth();
  if (loading) return null;
  return <PushPrompt user={user} context="article" />;
}
