// Crypto utilities for Friday worker
import crypto from 'crypto';

export function sha256(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

export function generateDraftId(kind, sourceHash) {
  return `${kind}-${sourceHash.slice(0, 16)}`;
}

export function sanitizeForJSON(text) {
  return text;
}
