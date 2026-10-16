"use client";

import { useAuth } from "@/hooks/useAuth";
import { PushPrompt } from "@/components/PushPrompt";

// Cuối bài: người đã đăng nhập, chưa bật thông báo thì được mời một lần (có cooldown), không hiện lúc mở trang.
export function ArticlePushPrompt() {
  const { user } = useAuth();
  return <PushPrompt user={user} context="article" />;
}
