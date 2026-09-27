// OpenRouter API client for Friday worker
// Explicit model selection, timeout + size limits, input sanitization
// API call ceiling tracked via fridayMeta transaction

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const FRIDAY_MODEL = process.env.FRIDAY_MODEL || 'deepseek/deepseek-v4-flash-0731';

const REQUEST_TIMEOUT = 30000; // 30s
const MAX_RESPONSE_LENGTH = 10000; // chars for QA cap
const MAX_INPUT_LENGTH = 4000; // chars for user input
const MAX_TOKENS_PER_REQUEST = 1200; // QA responses

export async function callOpenRouter(messages, options = {}) {
  if (options.dryRun) {
    // Dry-run returns empty string, indicating no API call
    return '';
  }

  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY not set');
  }

  const model = options.model || FRIDAY_MODEL;

  // Validate inputs
  for (const msg of messages) {
    if (msg.content.length > MAX_INPUT_LENGTH) {
      throw new Error(`Input exceeds max length (${MAX_INPUT_LENGTH}): ${msg.content.length}`);
    }
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://congdongai.org',
        'X-Title': 'Friday Worker',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.3,
        max_tokens: MAX_TOKENS_PER_REQUEST,
        top_p: 0.9,
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenRouter API error ${response.status}: ${error.slice(0, 200)}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';

    if (content.length > MAX_RESPONSE_LENGTH) {
      console.warn(`Response truncated from ${content.length} to ${MAX_RESPONSE_LENGTH} chars`);
      return content.slice(0, MAX_RESPONSE_LENGTH);
    }

    return content;
  } catch (err) {
    if (err instanceof TypeError && err.message.includes('signal')) {
      throw new Error('OpenRouter request timeout (30s)');
    }
    throw err;
  }
}

export function validateResponse(response) {
  const errors = [];

  // Check for prompt injection attempts
  if (response.match(/IGNORE.*INSTRUCTIONS?|SYSTEM_PROMPT|ROLE_OVERRIDE/i)) {
    errors.push('Response contains injection indicators');
  }

  // Check for code injection
  if (response.match(/<script|javascript:|onerror=/i)) {
    errors.push('Response contains script tags or event handlers');
  }

  // Check for shell injection
  if (response.match(/[\$`]\(|&&\s*rm|rm\s*-rf|>.*(\/dev\/null|\/dev\/zero)/)) {
    errors.push('Response contains shell command patterns');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function extractCitations(text) {
  const citations = new Set();

  // Markdown links
  const mdLinks = text.match(/\[.*?\]\((https?:\/\/[^)]+)\)/g) || [];
  mdLinks.forEach(link => {
    const url = link.match(/\((https?:\/\/[^)]+)\)/)?.[1];
    if (url) citations.add(url);
  });

  // Bare URLs
  const bareUrls = text.match(/https?:\/\/[^\s<>")+]+/g) || [];
  bareUrls.forEach(url => citations.add(url));

  return Array.from(citations);
}

export function allowlistCitations(citations, allowlist) {
  const allowed = [];
  const rejected = [];

  for (const url of citations) {
    const isAllowed = allowlist.some(pattern => pattern.test(url));
    if (isAllowed) {
      allowed.push(url);
    } else {
      rejected.push(url);
    }
  }

  return { allowed, rejected };
}
