'use client';

// Firebase Authentication - đăng nhập Google + quản lý phiên.
// Demo mode (chưa có config) → mọi hàm no-op trả về null/undefined an toàn.

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getAuthInstance, getDbInstance, isDemoMode } from './firebase';

export async function signInWithGoogle(): Promise<User | null> {
  if (isDemoMode()) return null;
  const auth = getAuthInstance();
  if (!auth) return null;

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    await ensureUserProfile(result.user);
    return result.user;
  } catch {
    // popup bị chặn / người dùng hủy - bỏ qua
    return null;
  }
}

export async function signOutUser(): Promise<void> {
  if (isDemoMode()) return;
  const auth = getAuthInstance();
  if (!auth) return;
  try {
    await signOut(auth);
  } catch {
    // bỏ qua
  }
}

export function subscribeAuth(cb: (user: User | null) => void): (() => void) | null {
  if (isDemoMode()) {
    cb(null);
    return null;
  }
  const auth = getAuthInstance();
  if (!auth) {
    cb(null);
    return null;
  }
  return onAuthStateChanged(auth, cb);
}

// Tạo hồ sơ người dùng lần đầu đăng nhập (khớp users/{uid} trong schema).
async function ensureUserProfile(user: User): Promise<void> {
  if (isDemoMode()) return;
  const db = getDbInstance();
  if (!db) return;
  try {
    const ref = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        displayName: user.displayName ?? 'Thành viên',
        photoURL: user.photoURL ?? '',
        createdAt: serverTimestamp(),
        points: 0,
        role: 'member',
      });
    }
  } catch {
    // bỏ qua - hồ sơ sẽ được tạo lần sau
  }
}
