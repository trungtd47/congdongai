// Tầng thao tác dữ liệu cộng đồng (posts/answers/comments).
// Khi có Firebase config thật → ghi Firestore qua client SDK.
// Khi demo mode → đọc/ghi mảng mock trong bộ nhớ (không crash, không persist).

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  arrayUnion,
  arrayRemove,
  increment,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore";
import { isDemoMode, getDbInstance } from "./firebase";
import {
  demoPosts,
  demoCommentsBySlug,
  type DemoPost,
  type DemoAnswer,
  type DemoComment,
} from "./demo-data";

export type PostSort = "new" | "votes" | "unanswered";

export interface PostSummary {
  id: string;
  title: string;
  body: string;
  tags: string[];
  authorUid: string;
  authorName: string;
  createdAt: string;
  upvotes: number;
  upvoterUids: string[];
  answerCount: number;
  solvedAnswerId: string | null;
  flagged: boolean;
}

export interface Answer {
  id: string;
  body: string;
  authorUid: string;
  authorName: string;
  createdAt: string;
  upvotes: number;
  upvoterUids: string[];
  isAccepted: boolean;
  isAI: boolean;
  flagged: boolean;
}

export interface PostDetail extends PostSummary {
  answers: Answer[];
}

// ---------- Demo in-memory store ----------
let demoStore: DemoPost[] = structuredClone(demoPosts);
const DEMO_UID = "demo-user";

function demoNow(): string {
  return new Date().toISOString().slice(0, 10);
}

function demoSummary(p: DemoPost): PostSummary {
  return {
    id: p.id,
    title: p.title,
    body: p.body,
    tags: p.tags,
    authorUid: p.authorUid,
    authorName: p.authorName,
    createdAt: p.createdAt,
    upvotes: p.upvotes,
    upvoterUids: p.upvoterUids,
    answerCount: p.answerCount,
    solvedAnswerId: p.solvedAnswerId,
    flagged: p.flagged,
  };
}

function firestoreDate(value: unknown): string {
  if (typeof value === "string") return value.slice(0, 10);
  if (
    value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    return (value.toDate() as Date).toISOString().slice(0, 10);
  }
  return "";
}

function firestorePost(id: string, data: DocumentData): PostSummary {
  return {
    id,
    title: data.title ?? "",
    body: data.body ?? "",
    tags: data.tags ?? [],
    authorUid: data.authorUid ?? "",
    authorName: data.authorName ?? "Thành viên",
    createdAt: firestoreDate(data.createdAt),
    upvotes: data.upvotes ?? 0,
    upvoterUids: data.upvoterUids ?? [],
    answerCount: data.answerCount ?? 0,
    solvedAnswerId: data.solvedAnswerId ?? null,
    flagged: data.flagged ?? false,
  };
}

function firestoreAnswer(id: string, data: DocumentData): Answer {
  return {
    id,
    body: data.body ?? "",
    authorUid: data.authorUid ?? "",
    authorName: data.authorName ?? "Thành viên",
    createdAt: firestoreDate(data.createdAt),
    upvotes: data.upvotes ?? 0,
    upvoterUids: data.upvoterUids ?? [],
    isAccepted: data.isAccepted ?? false,
    isAI: data.isAI ?? false,
    flagged: data.flagged ?? false,
  };
}

// ---------- Public API ----------
function sortedDemo(sort: PostSort): PostSummary[] {
  const arr =
    sort === "unanswered"
      ? demoStore.filter((p) => p.answerCount === 0)
      : [...demoStore];
  if (sort === "votes") arr.sort((a, b) => b.upvotes - a.upvotes);
  else arr.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return arr.map(demoSummary);
}

function demoDetail(p: DemoPost): PostDetail {
  return { ...demoSummary(p), answers: p.answers.map((a) => ({ ...a })) };
}

export async function listPosts(
  sort: PostSort = "new",
): Promise<PostSummary[]> {
  if (isDemoMode()) return sortedDemo(sort);

  const db = getDbInstance()!;
  const q = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc"),
    limit(100),
  );
  const snap = await getDocs(q);
  const posts = snap.docs.map((d) => firestorePost(d.id, d.data()));
  if (sort === "votes") return posts.sort((a, b) => b.upvotes - a.upvotes);
  if (sort === "unanswered") return posts.filter((p) => p.answerCount === 0);
  return posts;
}

export async function getPost(postId: string): Promise<PostDetail | null> {
  if (isDemoMode()) {
    const p = demoStore.find((x) => x.id === postId);
    return p ? demoDetail(p) : null;
  }

  const db = getDbInstance()!;
  const postSnap = await getDoc(doc(db, "posts", postId));
  if (!postSnap.exists()) return null;
  const ansSnap = await getDocs(
    query(
      collection(db, "posts", postId, "answers"),
      orderBy("createdAt", "asc"),
    ),
  );
  const answers = ansSnap.docs.map((d) => firestoreAnswer(d.id, d.data()));
  return { ...firestorePost(postSnap.id, postSnap.data()), answers };
}

export async function upvotePost(postId: string, uid: string): Promise<void> {
  if (isDemoMode()) {
    const p = demoStore.find((x) => x.id === postId);
    if (!p) return;
    if (p.upvoterUids.includes(uid)) {
      p.upvoterUids = p.upvoterUids.filter((u) => u !== uid);
      p.upvotes = Math.max(0, p.upvotes - 1);
    } else {
      p.upvoterUids.push(uid);
      p.upvotes += 1;
    }
    return;
  }

  const db = getDbInstance()!;
  const ref = doc(db, "posts", postId);
  const snap = await getDoc(ref);
  const upvoterUids: string[] = snap.data()?.upvoterUids ?? [];
  if (upvoterUids.includes(uid)) {
    await updateDoc(ref, {
      upvoterUids: arrayRemove(uid),
      upvotes: increment(-1),
    });
  } else {
    await updateDoc(ref, {
      upvoterUids: arrayUnion(uid),
      upvotes: increment(1),
    });
  }
}

export async function upvoteAnswer(
  postId: string,
  answerId: string,
  uid: string,
): Promise<void> {
  if (isDemoMode()) {
    const p = demoStore.find((x) => x.id === postId);
    const a = p?.answers.find((x) => x.id === answerId);
    if (!a) return;
    if (a.upvoterUids.includes(uid)) {
      a.upvoterUids = a.upvoterUids.filter((u) => u !== uid);
      a.upvotes = Math.max(0, a.upvotes - 1);
    } else {
      a.upvoterUids.push(uid);
      a.upvotes += 1;
    }
    return;
  }

  const db = getDbInstance()!;
  const ref = doc(db, "posts", postId, "answers", answerId);
  const snap = await getDoc(ref);
  const upvoterUids: string[] = snap.data()?.upvoterUids ?? [];
  if (upvoterUids.includes(uid)) {
    await updateDoc(ref, {
      upvoterUids: arrayRemove(uid),
      upvotes: increment(-1),
    });
  } else {
    await updateDoc(ref, {
      upvoterUids: arrayUnion(uid),
      upvotes: increment(1),
    });
  }
}

export async function createPost(input: {
  title: string;
  body: string;
  tags: string[];
  authorUid: string;
  authorName: string;
}): Promise<string> {
  if (isDemoMode()) {
    const id = `p-${Date.now()}`;
    demoStore.unshift({
      id,
      title: input.title,
      body: input.body,
      tags: input.tags,
      authorUid: input.authorUid,
      authorName: input.authorName,
      createdAt: demoNow(),
      upvotes: 0,
      upvoterUids: [],
      answerCount: 0,
      solvedAnswerId: null,
      flagged: false,
      answers: [],
    });
    return id;
  }

  const db = getDbInstance()!;
  const ref = doc(collection(db, "posts"));
  await setDoc(ref, {
    title: input.title,
    body: input.body,
    tags: input.tags,
    authorUid: input.authorUid,
    authorName: input.authorName,
    createdAt: serverTimestamp(),
    upvotes: 0,
    upvoterUids: [],
    answerCount: 0,
    solvedAnswerId: null,
    flagged: false,
  });
  return ref.id;
}

export async function createAnswer(
  postId: string,
  input: { body: string; authorUid: string; authorName: string },
): Promise<void> {
  if (isDemoMode()) {
    const p = demoStore.find((x) => x.id === postId);
    if (!p) return;
    p.answers.push({
      id: `a-${Date.now()}`,
      body: input.body,
      authorUid: input.authorUid,
      authorName: input.authorName,
      createdAt: demoNow(),
      upvotes: 0,
      upvoterUids: [],
      isAccepted: false,
      isAI: false,
      flagged: false,
    });
    p.answerCount = p.answers.length;
    return;
  }

  const db = getDbInstance()!;
  const ref = doc(collection(db, "posts", postId, "answers"));
  await setDoc(ref, {
    body: input.body,
    authorUid: input.authorUid,
    authorName: input.authorName,
    createdAt: serverTimestamp(),
    upvotes: 0,
    upvoterUids: [],
    isAccepted: false,
    isAI: false,
    flagged: false,
  });
  await updateDoc(doc(db, "posts", postId), { answerCount: increment(1) });
}

export async function acceptAnswer(
  postId: string,
  answerId: string,
): Promise<void> {
  if (isDemoMode()) {
    const p = demoStore.find((x) => x.id === postId);
    if (!p) return;
    p.answers.forEach((a) => (a.isAccepted = a.id === answerId));
    p.solvedAnswerId = answerId;
    return;
  }

  const db = getDbInstance()!;
  const ansSnap = await getDocs(collection(db, "posts", postId, "answers"));
  const batch = ansSnap.docs.map((d) => {
    const isAccepted = d.id === answerId;
    if (d.data().isAccepted !== isAccepted) {
      return updateDoc(doc(db, "posts", postId, "answers", d.id), {
        isAccepted,
      });
    }
    return null;
  });
  await Promise.all(batch.filter(Boolean));
  await updateDoc(doc(db, "posts", postId), { solvedAnswerId: answerId });
}

export function currentDemoUid(): string {
  return DEMO_UID;
}

// ---------- Article comments (articles/{slug}/comments) ----------

export interface ArticleComment {
  id: string;
  body: string;
  authorUid: string;
  authorName: string;
  photoURL: string;
  createdAt: string; // YYYY-MM-DD để hiển thị
  isAI: boolean;
}

// Demo store riêng cho comment (in-memory, không persist)
const demoCommentStore: Record<string, DemoComment[]> =
  structuredClone(demoCommentsBySlug);

function demoCommentToView(c: DemoComment): ArticleComment {
  return {
    id: c.id,
    body: c.body,
    authorUid: c.authorUid,
    authorName: c.authorName,
    photoURL: "",
    createdAt: c.createdAt,
    isAI: c.isAI,
  };
}

function demoComments(slug: string): ArticleComment[] {
  return (demoCommentStore[slug] ?? []).map(demoCommentToView);
}

export async function listComments(slug: string): Promise<ArticleComment[]> {
  if (isDemoMode()) return demoComments(slug);

  const db = getDbInstance()!;
  const snap = await getDocs(
    query(
      collection(db, "articles", slug, "comments"),
      orderBy("createdAt", "asc"),
      limit(200),
    ),
  );
  // Seed c1/c2/... là lời bình minh họa, không phải tài khoản Google thật.
  // Chỉ hiển thị chúng trong demo mode; giữ nguyên dữ liệu Firestore để tránh xóa nhầm.
  const sampleAuthors = new Map(
    (demoCommentsBySlug[slug] ?? []).map((c) => [c.id, c.authorUid]),
  );
  const realDocs = snap.docs.filter(
    (d) => sampleAuthors.get(d.id) !== d.data().authorUid,
  );
  // Bình luận cũ chưa lưu avatar: lấy hồ sơ Google đã tạo khi đăng nhập,
  // chỉ đọc một lần cho mỗi UID. Lỗi đọc hồ sơ không che mất bình luận.
  const missingPhotoUids = [
    ...new Set(
      realDocs
        .filter((d) => !d.data().photoURL && d.data().authorUid)
        .map((d) => d.data().authorUid as string),
    ),
  ];
  const profiles = new Map(
    await Promise.all(
      missingPhotoUids.map(async (uid) => {
        try {
          const profile = await getDoc(doc(db, "users", uid));
          return [uid, profile.exists() ? profile.data() : null] as const;
        } catch {
          return [uid, null] as const;
        }
      }),
    ),
  );
  return realDocs.map((d) => {
    const data = d.data();
    const profile = profiles.get(data.authorUid);
    return {
      id: d.id,
      body: data.body ?? "",
      authorUid: data.authorUid ?? "",
      authorName:
        profile?.displayName?.trim() || data.authorName || "Thành viên",
      photoURL: data.photoURL || profile?.photoURL || "",
      createdAt: firestoreDate(data.createdAt),
      isAI: data.isAI ?? false,
    } as ArticleComment;
  });
}

export async function createComment(
  slug: string,
  input: {
    body: string;
    authorUid: string;
    authorName: string;
    photoURL?: string;
  },
): Promise<ArticleComment> {
  if (isDemoMode()) {
    const c: DemoComment = {
      id: `c-${Date.now()}`,
      authorUid: input.authorUid || DEMO_UID,
      authorName: input.authorName || "Khách",
      body: input.body,
      createdAt: demoNow(),
      isAI: false,
    };
    if (!demoCommentStore[slug]) demoCommentStore[slug] = [];
    demoCommentStore[slug].push(c);
    return demoCommentToView(c);
  }

  const db = getDbInstance()!;
  const ref = doc(collection(db, "articles", slug, "comments"));
  await setDoc(ref, {
    body: input.body,
    authorUid: input.authorUid,
    authorName: input.authorName,
    photoURL: input.photoURL ?? "",
    createdAt: serverTimestamp(),
    isAI: false,
    flagged: false,
  });
  return {
    id: ref.id,
    body: input.body,
    authorUid: input.authorUid,
    authorName: input.authorName,
    photoURL: input.photoURL ?? "",
    createdAt: demoNow(),
    isAI: false,
  };
}
