import { setTimeout as delay } from 'node:timers/promises';

export async function fetchNpmArchive(url, { method = 'GET', attempts = 1, delayMs = 15_000 } = {}) {
  const endpoint = new URL(url);
  for (let attempt = 1; attempt <= attempts; attempt++) {
    if (attempt > 1) endpoint.searchParams.set('verify', String(Date.now()));
    const response = await fetch(endpoint, {
      method, cache: 'no-store', signal: AbortSignal.timeout(30_000),
    });
    if (response.ok) return response;
    await response.body?.cancel();
    if (response.status !== 404) {
      throw Error(`Npm archive lookup HTTP ${response.status}: ${endpoint.pathname}`);
    }
    if (attempt < attempts) await delay(delayMs);
  }
  return null;
}
