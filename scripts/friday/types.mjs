// Shared types for Friday worker (CLI tools)
// Mirror subset of src/lib/friday-types.ts + worker specifics

export const DraftKindValues = ['qa', 'article_update', 'case_study'];
export const DraftStatusValues = ['pending', 'approved', 'rejected', 'published', 'applied', 'publish_failed'];

/** @type {Object} Schema for FridayDraft documents in Firestore */
export const FridayDraftSchema = {
  id: String,
  kind: String, // 'qa' | 'article_update' | 'case_study'
  status: String, // 'pending' | 'approved' | 'rejected' | 'published' | 'applied' | 'publish_failed'
  revision: Number,
  title: String,
  body: String,
  sources: Array, // Array<{ url: string, title: string }>
  postId: String, // optional
  sourceQuestionHash: String, // optional
  targetPath: String, // optional
  originalHash: String, // optional
  model: String, // optional
  error: String, // optional
  createdAt: String, // ISO string
  updatedAt: String, // ISO string
};

export const FRIDAY_MODEL_DEFAULT = 'deepseek/deepseek-v4-flash-0731';
