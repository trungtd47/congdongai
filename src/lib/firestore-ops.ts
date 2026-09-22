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
} from 'firebase/firestore';
import { isDemoMode, getDbInstance } from './firebase';
import { demoPosts, type DemoPost, type DemoAnswer } from './demo-data';

export type PostSort = 'new' | 'votes' | 'unanswered';

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
const DEMO_UID = 'demo-user';

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

// ---------- Public API ----------
export async function listPosts(sort: PostSort = 'new'): Promise<PostSummary[]> {
  if (isDemoMode()) {
    const arr = [...demoStore];
    if (sort === 'votes') arr.sort((a, b) => b.upvotes - a.upvotes);
    else if (sort === 'unanswered') arr.sort((a, b) => a.answerCount - b.answerCount);
    else arr.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    return arr.map(demoSummary);
  }

  const db = getDbInstance()!;
  const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(100));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as PostSummary);
}

export async function getPost(postId: string): Promise<PostDetail | null> {
  if (isDemoMode()) {
    const p = demoStore.find((x) => x.id === postId);
    if (!p) return null;
    return { ...demoSummary(p), answers: p.answers.map((a) => ({ ...a })) };
  }

  const db = getDbInstance()!;
  const postRef = doc(db, 'posts', postId);
  const postSnap = await getDoc(postRef);
  if (!postSnap.exists()) return null;

  const ansSnap = await getDocs(
    query(collection(db, 'posts', postId, 'answers'), orderBy('createdAt', 'asc')),
  );
  const answers = ansSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as Answer);
  return { id: postSnap.id, ...postSnap.data(), answers } as PostDetail;
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
  const ref = doc(db, 'posts', postId);
  const snap = await getDoc(ref);
  const upvoterUids: string[] = snap.data()?.upvoterUids ?? [];
  if (upvoterUids.includes(uid)) {
    await updateDoc(ref, { upvoterUids: arrayRemove(uid), upvotes: increment(-1) });
  } else {
    await updateDoc(ref, { upvoterUids: arrayUnion(uid), upvotes: increment(1) });
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
  const ref = doc(db, 'posts', postId, 'answers', answerId);
  const snap = await getDoc(ref);
  const upvoterUids: string[] = snap.data()?.upvoterUids ?? [];
  if (upvoterUids.includes(uid)) {
    await updateDoc(ref, { upvoterUids: arrayRemove(uid), upvotes: increment(-1) });
  } else {
    await updateDoc(ref, { upvoterUids: arrayUnion(uid), upvotes: increment(1) });
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
  const ref = doc(collection(db, 'posts'));
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
  const ref = doc(collection(db, 'posts', postId, 'answers'));
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
  await updateDoc(doc(db, 'posts', postId), { answerCount: increment(1) });
}

export async function acceptAnswer(postId: string, answerId: string): Promise<void> {
  if (isDemoMode()) {
    const p = demoStore.find((x) => x.id === postId);
    if (!p) return;
    p.answers.forEach((a) => (a.isAccepted = a.id === answerId));
    p.solvedAnswerId = answerId;
    return;
  }

  const db = getDbInstance()!;
  const ansSnap = await getDocs(collection(db, 'posts', postId, 'answers'));
  const batch = ansSnap.docs.map((d) => {
    const isAccepted = d.id === answerId;
    if (d.data().isAccepted !== isAccepted) {
      return updateDoc(doc(db, 'posts', postId, 'answers', d.id), { isAccepted });
    }
    return null;
  });
  await Promise.all(batch.filter(Boolean));
  await updateDoc(doc(db, 'posts', postId), { solvedAnswerId: answerId });
}

export function currentDemoUid(): string {
  return DEMO_UID;
}
