"use client";

import { useEffect, useState, useRef } from "react";
import { validateDraftSource } from "@/lib/friday-types";
import type {
  FridayDraft,
  DraftKind,
  DraftStatus,
  AdminFridayListResponse,
  AdminModerateRequest,
} from "@/lib/friday-types";
import { useAuth } from "@/hooks/useAuth";

function contentUrl(target: string): string | null {
  const match =
    /^src\/content\/(?:(bat-dau|huong-dan)\/)?([a-z0-9-]+)\.mdx$/.exec(target);
  if (match) return `/${match[1] || "blog"}/${match[2]}`;
  const study = /^src\/content\/friday-cases\/([a-z0-9-]+)\.json$/.exec(target);
  return study ? `/cau-chuyen/${study[1]}` : null;
}

type FilterKind = "all" | DraftKind;
type FilterStatus = "pending" | "all";

interface UIState {
  drafts: FridayDraft[];
  loading: boolean;
  error: string | null;
  successMsg: string | null;
  submitting: Set<string>; // Track IDs being submitted
}

export function FridayAdmin() {
  const { user, loading: authLoading } = useAuth();
  const currentUid = useRef(user?.uid);
  currentUid.current = user?.uid;
  const [state, setState] = useState<UIState>({
    drafts: [],
    loading: true,
    error: null,
    successMsg: null,
    submitting: new Set(),
  });

  const [filterKind, setFilterKind] = useState<FilterKind>("all");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("pending");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBody, setEditBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [rejectConfirm, setRejectConfirm] = useState<string | null>(null);

  // Check auth & load drafts
  useEffect(() => {
    setState((s) => ({ ...s, drafts: [], error: null }));
    setEditingId(null);
    if (authLoading) return;

    if (!user) {
      setState((s) => ({
        ...s,
        loading: false,
        error: "Vui lòng đăng nhập để tiếp tục.",
      }));
      return;
    }

    fetchDrafts();
  }, [user, authLoading]);

  async function fetchDrafts() {
    const requestUid = user?.uid;
    try {
      setState((s) => ({ ...s, loading: true, error: null }));
      const token = await user?.getIdToken();
      if (!token) {
        setState((s) => ({
          ...s,
          loading: false,
          error: "Không thể lấy token xác thực.",
        }));
        return;
      }

      const res = await fetch("/api/admin/friday", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401 || res.status === 403) {
        const data = await res.json();
        setState((s) => ({
          ...s,
          loading: false,
          error: data.error || "Không có quyền truy cập.",
        }));
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Lỗi tải danh sách");
      }

      const data: AdminFridayListResponse = await res.json();
      if (currentUid.current !== requestUid) return;
      setState((s) => ({
        ...s,
        drafts: data.drafts,
        loading: false,
        error: null,
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Lỗi không xác định";
      setState((s) => ({ ...s, loading: false, error: message }));
    }
  }

  async function handleApprove(draft: FridayDraft) {
    await submitAction(draft, "approve");
  }

  async function handleSave(draft: FridayDraft) {
    await submitAction(draft, "save", editBody, editTitle);
  }

  async function handleReject(draftId: string) {
    await submitAction(
      state.drafts.find((d) => d.id === draftId)!,
      "reject",
    );
    setRejectConfirm(null);
  }

  async function submitAction(
    draft: FridayDraft,
    action: "save" | "approve" | "reject",
    body?: string,
    title?: string,
  ) {
    try {
      setState((s) => ({
        ...s,
        submitting: new Set([...s.submitting, draft.id]),
        successMsg: null,
        error: null,
      }));

      const token = await user?.getIdToken();
      if (!token) {
        setState((s) => ({
          ...s,
          error: "Không thể lấy token xác thực.",
          submitting: new Set(
            [...s.submitting].filter((id) => id !== draft.id),
          ),
        }));
        return;
      }

      const payload: AdminModerateRequest = {
        action,
        expectedRevision: draft.revision,
        ...(body !== undefined && { body }),
        ...(title !== undefined && { title }),
      };

      const res = await fetch(`/api/admin/friday/${draft.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 401 || res.status === 403) {
        const data = await res.json();
        setState((s) => ({
          ...s,
          error: data.error || "Không có quyền truy cập.",
          submitting: new Set(
            [...s.submitting].filter((id) => id !== draft.id),
          ),
        }));
        return;
      }

      if (res.status === 409) {
        // Conflict - refetch
        await fetchDrafts();
        setState((s) => ({
          ...s,
          error: "Nội dung đã thay đổi. Vui lòng tải lại.",
          submitting: new Set(
            [...s.submitting].filter((id) => id !== draft.id),
          ),
        }));
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Lỗi cập nhật");
      }

      const updated = await res.json();
      setState((s) => ({
        ...s,
        drafts: s.drafts.map((d) => (d.id === draft.id ? updated.draft : d)),
        successMsg: `Đã ${action === "approve" ? "duyệt" : action === "reject" ? "từ chối" : "lưu"} bản nháp.`,
        submitting: new Set([...s.submitting].filter((id) => id !== draft.id)),
      }));

      setEditingId(null);
      setEditBody("");
      setEditTitle("");

      // Clear success msg after 3s
      setTimeout(() => {
        setState((s) => ({ ...s, successMsg: null }));
      }, 3000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Lỗi không xác định";
      setState((s) => ({
        ...s,
        error: message,
        submitting: new Set([...s.submitting].filter((id) => id !== draft.id)),
      }));
    }
  }

  // Filter drafts
  const filtered = state.drafts.filter((d) => {
    if (filterKind !== "all" && d.kind !== filterKind) return false;
    if (filterStatus === "pending" && d.status !== "pending") return false;
    return true;
  });

  // Count by kind
  const counts = {
    all: state.drafts.length,
    qa: state.drafts.filter((d) => d.kind === "qa").length,
    article_update: state.drafts.filter((d) => d.kind === "article_update")
      .length,
    case_study: state.drafts.filter((d) => d.kind === "case_study").length,
  };

  if (authLoading) {
    return (
      <div className="wrap py-12 text-center">Đang kiểm tra xác thực...</div>
    );
  }

  if (!user) {
    return (
      <div className="wrap py-12 text-center">
        <p className="text-red-600">
          Vui lòng đăng nhập bằng tài khoản Google để tiếp tục.
        </p>
      </div>
    );
  }

  if (state.loading) {
    return (
      <div className="wrap py-12 text-center">
        Đang tải danh sách bản nháp...
      </div>
    );
  }

  if (state.error && !state.drafts.length) {
    return (
      <div className="wrap py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{state.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Friday - Duyệt & Xuất Bản Nội Dung
        </h1>
        <p className="text-ink-soft">
          Quản lý tối đa 100 bản nháp mới nhất. Q&A đăng sau duyệt; bài viết cần
          kiểm tra build và push trước khi xuất bản.
        </p>
      </div>

      {/* Messages */}
      {state.error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{state.error}</p>
          <button
            onClick={fetchDrafts}
            className="mt-2 text-red-700 underline hover:no-underline"
          >
            Thử tải lại
          </button>
        </div>
      )}

      {state.successMsg && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">{state.successMsg}</p>
        </div>
      )}

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Loại nội dung
            </label>
            <select
              value={filterKind}
              onChange={(e) => setFilterKind(e.target.value as FilterKind)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">Tất cả ({counts.all})</option>
              <option value="qa">Câu hỏi & Trả lời ({counts.qa})</option>
              <option value="article_update">
                Bài viết ({counts.article_update})
              </option>
              <option value="case_study">
                Case Study ({counts.case_study})
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Trạng thái
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="pending">Chờ duyệt</option>
              <option value="all">Tất cả</option>
            </select>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {!filtered.length ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            Không có bản nháp nào phù hợp với bộ lọc.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((draft) => (
            <DraftCard
              key={draft.id}
              draft={draft}
              isEditing={editingId === draft.id}
              isSubmitting={state.submitting.has(draft.id)}
              editBody={editBody}
              editTitle={editTitle}
              showRejectConfirm={rejectConfirm === draft.id}
              onEdit={() => {
                setEditingId(draft.id);
                setEditBody(draft.body);
                setEditTitle(draft.title);
              }}
              onSave={() => handleSave(draft)}
              onApprove={() => handleApprove(draft)}
              onReject={() => setRejectConfirm(draft.id)}
              onConfirmReject={() => handleReject(draft.id)}
              onCancelReject={() => setRejectConfirm(null)}
              onCancel={() => setEditingId(null)}
              onEditBodyChange={setEditBody}
              onEditTitleChange={setEditTitle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface DraftCardProps {
  draft: FridayDraft;
  isEditing: boolean;
  isSubmitting: boolean;
  editBody: string;
  editTitle: string;
  showRejectConfirm: boolean;
  onEdit: () => void;
  onSave: () => void;
  onApprove: () => void;
  onReject: () => void;
  onConfirmReject: () => void;
  onCancelReject: () => void;
  onCancel: () => void;
  onEditBodyChange: (value: string) => void;
  onEditTitleChange: (value: string) => void;
}

function DraftCard({
  draft,
  isEditing,
  isSubmitting,
  editBody,
  editTitle,
  showRejectConfirm,
  onEdit,
  onSave,
  onApprove,
  onReject,
  onConfirmReject,
  onCancelReject,
  onCancel,
  onEditBodyChange,
  onEditTitleChange,
}: DraftCardProps) {
  const getKindLabel = (kind: DraftKind): string => {
    switch (kind) {
      case "qa":
        return "Câu hỏi & Trả lời";
      case "article_update":
        return "Bài viết";
      case "case_study":
        return "Case Study";
      default:
        return kind;
    }
  };

  const getStatusBadge = (status: DraftStatus) => {
    const styles: Record<DraftStatus, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      published: "bg-blue-100 text-blue-800",
      applied: "bg-blue-100 text-blue-800",
      publish_failed: "bg-red-100 text-red-800",
    };

    const labels: Record<DraftStatus, string> = {
      pending: "Chờ duyệt",
      approved: "Đã duyệt",
      rejected: "Từ chối",
      published: "Đã xuất bản",
      applied: "Đã áp dụng",
      publish_failed: "Xuất bản thất bại",
    };

    return (
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  const getApproveCaption = (): string => {
    if (draft.kind === "qa") {
      return "Duyệt và đăng trả lời";
    }
    return "Duyệt để kiểm tra và xuất bản";
  };

  const timestamp = new Date(draft.updatedAt).toLocaleString("vi-VN");

  return (
    <div
      id={draft.id}
      className="card p-4 sm:p-6 space-y-4 scroll-mt-24 min-w-0"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-gray-600 uppercase">
              {getKindLabel(draft.kind)}
            </span>
            {getStatusBadge(draft.status)}
          </div>

          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => onEditTitleChange(e.target.value)}
              className="w-full text-lg font-bold mb-2 px-3 py-2 border border-gray-300 rounded-lg"
              disabled={isSubmitting || draft.status !== "pending"}
            />
          ) : (
            <h3 className="text-lg font-bold mb-2 break-words">
              {draft.title}
            </h3>
          )}

          <p className="text-xs text-gray-500">
            Cập nhật: {timestamp}
            {draft.model && <span> · Model: {draft.model}</span>}
            {draft.targetPath && <span> · Đường dẫn: {draft.targetPath}</span>}
          </p>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-2 text-sm">
        {draft.postId && (
          <a
            href={`/hoi-dap/${draft.postId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:underline"
          >
            Xem câu hỏi gốc →
          </a>
        )}
        {draft.targetPath && contentUrl(draft.targetPath) && (
          <a
            href={contentUrl(draft.targetPath)!}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:underline"
          >
            Xem nội dung →
          </a>
        )}
      </div>

      {/* Sources */}
      {draft.sources.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs font-semibold mb-2 text-gray-700">
            Nguồn tham khảo
          </p>
          <ul className="space-y-1">
            {draft.sources.filter(validateDraftSource).map((source, idx) => (
              <li key={idx} className="text-sm">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:underline break-all"
                >
                  {source.title || source.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {draft.originalBody && (
        <details className="text-sm">
          <summary className="cursor-pointer font-semibold">
            Nội dung gốc để đối chiếu
          </summary>
          <pre className="max-h-80 overflow-auto whitespace-pre-wrap break-words p-3">
            {draft.originalBody}
          </pre>
        </details>
      )}
      {/* Body */}
      <div>
        <label className="block text-xs font-semibold mb-2 text-gray-700">
          Nội dung
        </label>
        {isEditing ? (
          <textarea
            value={editBody}
            onChange={(e) => onEditBodyChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg min-h-[200px] font-mono text-sm"
            disabled={isSubmitting || draft.status !== "pending"}
          />
        ) : (
          <div className="bg-gray-50 rounded-lg p-3 max-h-[300px] overflow-y-auto text-sm whitespace-pre-wrap break-words">
            {draft.body}
          </div>
        )}
      </div>

      {/* Error message */}
      {draft.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-red-700 mb-1">Lỗi</p>
          <p className="text-sm text-red-600 whitespace-pre-wrap">
            {draft.error}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        {!isEditing ? (
          <>
            <button
              onClick={onEdit}
              disabled={isSubmitting || draft.status !== "pending"}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 font-semibold text-sm"
            >
              Chỉnh sửa
            </button>
            <button
              onClick={onApprove}
              disabled={
                isSubmitting || showRejectConfirm || draft.status !== "pending"
              }
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 font-semibold text-sm"
            >
              {getApproveCaption()}
            </button>
            {showRejectConfirm ? (
              <>
                <button
                  onClick={onConfirmReject}
                  disabled={isSubmitting || draft.status !== "pending"}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 font-semibold text-sm"
                >
                  Xác nhận từ chối
                </button>
                <button
                  onClick={onCancelReject}
                  disabled={isSubmitting || draft.status !== "pending"}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 disabled:opacity-50 font-semibold text-sm"
                >
                  Hủy
                </button>
              </>
            ) : (
              <button
                onClick={onReject}
                disabled={isSubmitting || draft.status !== "pending"}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50 font-semibold text-sm"
              >
                Từ chối
              </button>
            )}
          </>
        ) : (
          <>
            <button
              onClick={onSave}
              disabled={isSubmitting || draft.status !== "pending"}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold text-sm"
            >
              {isSubmitting ? "Đang lưu..." : "Lưu"}
            </button>
            <button
              onClick={onCancel}
              disabled={isSubmitting || draft.status !== "pending"}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 font-semibold text-sm"
            >
              Hủy
            </button>
          </>
        )}
      </div>
    </div>
  );
}
