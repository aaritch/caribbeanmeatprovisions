// In-memory rate limiter. Per-IP, per-key (route) sliding window.
// Resets on every server restart — fine for v1 scaffold.
// TODO: swap to Vercel KV / Upstash Redis when traffic grows or for multi-region deploys.

interface Entry {
  hits: number[];
}

const store = new Map<string, Entry>();

export function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const entry = store.get(key) ?? { hits: [] };
  entry.hits = entry.hits.filter((t) => now - t < windowMs);
  if (entry.hits.length >= limit) {
    const oldest = entry.hits[0];
    const retryAfter = Math.ceil((oldest + windowMs - now) / 1000);
    store.set(key, entry);
    return { allowed: false, retryAfter: Math.max(1, retryAfter) };
  }
  entry.hits.push(now);
  store.set(key, entry);
  return { allowed: true };
}

export function getClientIp(headers: Headers): string {
  const xff = headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const real = headers.get('x-real-ip');
  if (real) return real.trim();
  return 'unknown';
}
