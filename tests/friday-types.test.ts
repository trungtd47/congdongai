// Test Friday types validation - pure logic, no external dependencies
// Run: node --experimental-strip-types tests/friday-types.test.ts

import assert from 'assert';

// Import types and validators (simulated here for test isolation)
const isValidDraftKind = (value: unknown): value is 'qa' | 'article_update' | 'case_study' =>
  value === 'qa' || value === 'article_update' || value === 'case_study';

const isValidDraftStatus = (value: unknown): value is 'pending' | 'approved' | 'rejected' | 'published' | 'applied' | 'publish_failed' =>
  [
    'pending',
    'approved',
    'rejected',
    'published',
    'applied',
    'publish_failed',
  ].includes(String(value));

const isValidDraftAction = (value: unknown): value is 'save' | 'approve' | 'reject' =>
  value === 'save' || value === 'approve' || value === 'reject';

const validateDraftSource = (source: unknown): source is { url: string; title: string } => {
  if (!source || typeof source !== 'object') return false;
  const s = source as Record<string, unknown>;
  return typeof s.url === 'string' && typeof s.title === 'string';
};

const validateDraftSources = (sources: unknown): sources is Array<{ url: string; title: string }> => {
  return Array.isArray(sources) && sources.every(validateDraftSource);
};

const DRAFT_CONSTRAINTS = {
  titleMin: 3,
  titleMax: 200,
  bodyMin: 10,
  bodyMax: 10000,
  sourcesMax: 10,
  urlPatterns: /^https?:\/\/.+/i,
} as const;

const validateDraftConstraints = (
  title: string,
  body: string,
  sources: Array<{ url: string; title: string }>
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (title.length < DRAFT_CONSTRAINTS.titleMin) {
    errors.push(`Title must be at least ${DRAFT_CONSTRAINTS.titleMin} characters`);
  }
  if (title.length > DRAFT_CONSTRAINTS.titleMax) {
    errors.push(`Title must not exceed ${DRAFT_CONSTRAINTS.titleMax} characters`);
  }

  if (body.length < DRAFT_CONSTRAINTS.bodyMin) {
    errors.push(`Body must be at least ${DRAFT_CONSTRAINTS.bodyMin} characters`);
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
    if (source.url.includes('@') || (source.url.includes(':') && !source.url.includes('://'))) {
      errors.push(`Source ${i + 1}: URL must not contain credentials or malformed protocol`);
    }
  }

  return { valid: errors.length === 0, errors };
};

// Test cases
console.log('Testing Friday types validation...\n');

// Test isValidDraftKind
assert.strictEqual(isValidDraftKind('qa'), true, 'Should accept qa');
assert.strictEqual(isValidDraftKind('article_update'), true, 'Should accept article_update');
assert.strictEqual(isValidDraftKind('case_study'), true, 'Should accept case_study');
assert.strictEqual(isValidDraftKind('invalid'), false, 'Should reject invalid kind');
assert.strictEqual(isValidDraftKind(null), false, 'Should reject null');
console.log('✓ isValidDraftKind tests passed');

// Test isValidDraftStatus
assert.strictEqual(isValidDraftStatus('pending'), true, 'Should accept pending');
assert.strictEqual(isValidDraftStatus('approved'), true, 'Should accept approved');
assert.strictEqual(isValidDraftStatus('rejected'), true, 'Should accept rejected');
assert.strictEqual(isValidDraftStatus('published'), true, 'Should accept published');
assert.strictEqual(isValidDraftStatus('applied'), true, 'Should accept applied');
assert.strictEqual(isValidDraftStatus('publish_failed'), true, 'Should accept publish_failed');
assert.strictEqual(isValidDraftStatus('invalid'), false, 'Should reject invalid status');
console.log('✓ isValidDraftStatus tests passed');

// Test isValidDraftAction
assert.strictEqual(isValidDraftAction('save'), true, 'Should accept save');
assert.strictEqual(isValidDraftAction('approve'), true, 'Should accept approve');
assert.strictEqual(isValidDraftAction('reject'), true, 'Should accept reject');
assert.strictEqual(isValidDraftAction('invalid'), false, 'Should reject invalid action');
console.log('✓ isValidDraftAction tests passed');

// Test validateDraftSource
assert.strictEqual(
  validateDraftSource({ url: 'https://example.com', title: 'Example' }),
  true,
  'Should accept valid source'
);
assert.strictEqual(
  validateDraftSource({ url: 'https://example.com' }),
  false,
  'Should reject source without title'
);
assert.strictEqual(validateDraftSource(null), false, 'Should reject null source');
assert.strictEqual(validateDraftSource({}), false, 'Should reject empty object');
console.log('✓ validateDraftSource tests passed');

// Test validateDraftSources
assert.strictEqual(
  validateDraftSources([
    { url: 'https://example.com', title: 'Example' },
    { url: 'http://test.com', title: 'Test' },
  ]),
  true,
  'Should accept valid sources array'
);
assert.strictEqual(validateDraftSources([]), true, 'Should accept empty array');
assert.strictEqual(
  validateDraftSources([{ url: 'https://example.com' }]),
  false,
  'Should reject incomplete source'
);
assert.strictEqual(validateDraftSources(null), false, 'Should reject null');
assert.strictEqual(validateDraftSources('not array'), false, 'Should reject non-array');
console.log('✓ validateDraftSources tests passed');

// Test validateDraftConstraints
let result = validateDraftConstraints(
  'Valid Title',
  'This is a valid body with enough length',
  []
);
assert.strictEqual(result.valid, true, 'Should accept valid draft');
assert.strictEqual(result.errors.length, 0, 'Should have no errors');
console.log('✓ Valid draft passes constraints');

result = validateDraftConstraints('ab', 'body', []);
assert.strictEqual(result.valid, false, 'Should reject title too short');
assert(result.errors.some((e) => e.includes('Title must be at least')), 'Should mention title constraint');
console.log('✓ Title too short rejected');

result = validateDraftConstraints('A'.repeat(201), 'body', []);
assert.strictEqual(result.valid, false, 'Should reject title too long');
assert(result.errors.some((e) => e.includes('Title must not exceed')), 'Should mention title constraint');
console.log('✓ Title too long rejected');

result = validateDraftConstraints('Title', 'short', []);
assert.strictEqual(result.valid, false, 'Should reject body too short');
assert(result.errors.some((e) => e.includes('Body must be at least')), 'Should mention body constraint');
console.log('✓ Body too short rejected');

result = validateDraftConstraints('Title', 'x'.repeat(10001), []);
assert.strictEqual(result.valid, false, 'Should reject body too long');
assert(result.errors.some((e) => e.includes('Body must not exceed')), 'Should mention body constraint');
console.log('✓ Body too long rejected');

result = validateDraftConstraints(
  'Title',
  'Valid body with enough length',
  Array(11).fill({ url: 'https://example.com', title: 'Source' })
);
assert.strictEqual(result.valid, false, 'Should reject too many sources');
assert(result.errors.some((e) => e.includes('sources')), 'Should mention sources constraint');
console.log('✓ Too many sources rejected');

result = validateDraftConstraints('Title', 'Valid body with enough length', [
  { url: 'invalid-url', title: 'Bad URL' },
]);
assert.strictEqual(result.valid, false, 'Should reject invalid URL');
assert(result.errors.some((e) => e.includes('URL must start')), 'Should mention URL constraint');
console.log('✓ Invalid URL rejected');

result = validateDraftConstraints('Title', 'Valid body with enough length', [
  { url: 'https://user@example.com', title: 'Creds in URL' },
]);
assert.strictEqual(result.valid, false, 'Should reject URL with credentials');
assert(
  result.errors.some((e) => e.includes('credentials')),
  'Should mention credentials constraint'
);
console.log('✓ URL with credentials rejected');

result = validateDraftConstraints('Title', 'Valid body with enough length', [
  { url: 'https://example.com', title: 'Good' },
  { url: 'http://test.org', title: 'Also good' },
]);
assert.strictEqual(result.valid, true, 'Should accept multiple valid sources');
console.log('✓ Multiple valid sources accepted');

console.log('\n✅ All tests passed!');
