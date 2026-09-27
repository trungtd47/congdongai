// Shared Draft contract cho Friday AI moderation.
// UI + Server share cùng interface này.

export type DraftKind = "qa" | "article_update" | "case_study";
export type DraftStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "published"
  | "applied"
  | "publish_failed";
export type DraftAction = "save" | "approve" | "reject";

export interface DraftSource {
  url: string;
  title: string;
}

export interface FridayDraft {
  // Định danh & metadata
  id: string;
  kind: DraftKind;
  status: DraftStatus;
  revision: number;

  // Nội dung
  title: string;
  body: string;
  sources: DraftSource[];

  // QA-specific
  postId?: string;
  sourceQuestionHash?: string; // SHA256(JSON.stringify([post.title, post.body]))

  // Article-specific
  targetPath?: string;
  originalHash?: string;
  originalBody?: string;

  // Generated
  model?: string;
  error?: string;

  // Timestamps (ISO string)
  createdAt: string;
  updatedAt: string;
}

// Request body cho PATCH /api/admin/friday/[id]
export interface AdminModerateRequest {
  action: DraftAction;
  body?: string;
  title?: string;
  expectedRevision: number;
}

// Response body từ GET /api/admin/friday
export interface AdminFridayListResponse {
  drafts: FridayDraft[];
}

// Response body từ PATCH /api/admin/friday/[id]
export interface AdminModerateResponse {
  draft: FridayDraft;
}

// Error response (không expose secrets)
export interface AdminErrorResponse {
  error: string;
  status?: number;
}

// Utility functions
export function isValidDraftKind(value: unknown): value is DraftKind {
  return value === "qa" || value === "article_update" || value === "case_study";
}

export function isValidDraftStatus(value: unknown): value is DraftStatus {
  return [
    "pending",
    "approved",
    "rejected",
    "published",
    "applied",
    "publish_failed",
  ].includes(String(value));
}

export function isValidDraftAction(value: unknown): value is DraftAction {
  return value === "save" || value === "approve" || value === "reject";
}

export function validateDraftSource(source: unknown): source is DraftSource {
  if (!source || typeof source !== "object") return false;
  const s = source as Record<string, unknown>;
  try {
    if (
      typeof s.url !== "string" ||
      typeof s.title !== "string" ||
      s.title.length > 300 ||
      s.url.length > 2048
    )
      return false;
    const url = new URL(s.url);
    return (
      ["https:", "http:"].includes(url.protocol) &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

export function validateDraftSources(
  sources: unknown,
): sources is DraftSource[] {
  return Array.isArray(sources) && sources.every(validateDraftSource);
}

// Body length constraints (in characters)
export const DRAFT_CONSTRAINTS = {
  titleMin: 3,
  titleMax: 200,
  bodyMin: 10,
  bodyMax: 60000,
  sourcesMax: 10,
  urlPatterns: /^https?:\/\/.+/i, // Only http/https, no credentials in URL
} as const;

export function validateDraftConstraints(
  title: string,
  body: string,
  sources: DraftSource[],
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (
    typeof title !== "string" ||
    typeof body !== "string" ||
    !validateDraftSources(sources)
  ) {
    return { valid: false, errors: ["Nội dung hoặc nguồn không hợp lệ."] };
  }

  if (title.length < DRAFT_CONSTRAINTS.titleMin) {
    errors.push(
      `Title must be at least ${DRAFT_CONSTRAINTS.titleMin} characters`,
    );
  }
  if (title.length > DRAFT_CONSTRAINTS.titleMax) {
    errors.push(
      `Title must not exceed ${DRAFT_CONSTRAINTS.titleMax} characters`,
    );
  }

  if (body.length < DRAFT_CONSTRAINTS.bodyMin) {
    errors.push(
      `Body must be at least ${DRAFT_CONSTRAINTS.bodyMin} characters`,
    );
  }
  if (body.length > DRAFT_CONSTRAINTS.bodyMax) {
    errors.push(`Body must not exceed ${DRAFT_CONSTRAINTS.bodyMax} characters`);
  }

  if (sources.length > DRAFT_CONSTRAINTS.sourcesMax) {
    errors.push(`Maximum ${DRAFT_CONSTRAINTS.sourcesMax} sources allowed`);
  }

  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    if (!DRAFT_CONSTRAINTS.urlPatterns.test(source.url)) {
      errors.push(`Source ${i + 1}: URL must start with http:// or https://`);
    }
    if (
      source.url.includes("@") ||
      (source.url.includes(":") && !source.url.includes("://"))
    ) {
      errors.push(
        `Source ${i + 1}: URL must not contain credentials or malformed protocol`,
      );
    }
  }

  return { valid: errors.length === 0, errors };
}
