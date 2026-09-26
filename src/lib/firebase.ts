// Cấu hình Firebase đọc từ NEXT_PUBLIC_FIREBASE_* env vars.
// Khi thiếu config thật, app chạy ở DEMO MODE (xem isDemoMode).

import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export function readFirebaseConfig(): FirebaseConfig | null {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  const messagingSenderId =
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

  if (!apiKey || !projectId || !appId) {
    return null;
  }

  return {
    apiKey,
    authDomain: authDomain ?? "",
    projectId,
    storageBucket: storageBucket ?? "",
    messagingSenderId: messagingSenderId ?? "",
    appId,
  };
}

export const isFirebaseConfigured = (() => {
  try {
    return readFirebaseConfig() !== null;
  } catch {
    return false;
  }
})();

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

export function initFirebase() {
  if (!isFirebaseConfigured) return null;
  if (app) return { app, auth, db, storage };

  const cfg = readFirebaseConfig()!;
  app = initializeApp(cfg);
  auth = getAuth(app);
  db = getFirestore(app, "congdongai");
  storage = getStorage(app);

  return { app, auth, db, storage };
}

export function getAuthInstance(): Auth | null {
  return initFirebase()?.auth ?? null;
}

export function getDbInstance(): Firestore | null {
  return initFirebase()?.db ?? null;
}

export function getStorageInstance(): FirebaseStorage | null {
  return initFirebase()?.storage ?? null;
}

export function isDemoMode(): boolean {
  return !isFirebaseConfigured;
}
