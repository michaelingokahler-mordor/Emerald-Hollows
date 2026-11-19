import type { Database } from './worker';
import { statisticsReport } from './game-statistics-report';

export interface GameStatisticsEnv {
  DB: Database;
  GAME_STATS_REPORT_SECRET?: string;
}

const siteOrigin = 'https://sabnockworks.com';
const dayMs = 86_400_000;
const berlinDate = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin', dateStyle: 'short' });
const sourceHostname = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?)$/;
const eventId = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const games = ['war-of-the-wizards', 'emerald-hollows'];
const types = ['game_loaded', 'run_start'];

function dateValue(value: string | null): number {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN;
  const ms = Date.parse(value + 'T00:00:00Z');
  return Number.isFinite(ms) && new Date(ms).toISOString().slice(0, 10) === value ? ms : NaN;
}

async function body(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const decoder = new TextDecoder();
  let bytes = 0;
  let raw = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.length;
    if (bytes > 1024) {
      await reader.cancel();
      return null;
    }
    raw += decoder.decode(value, { stream: true });
  }
  try { return JSON.parse(raw + decoder.decode()); } catch { return null; }
}

function validEvent(value: unknown, now: number): value is {
  id: string; game: string; type: string; source: string; timestamp: number;
} {
  if (!value || typeof value !== 'object') return false;
  const { id, game, type, source, timestamp } = value as Record<string, unknown>;
  return typeof id === 'string' && eventId.test(id) &&
    typeof game === 'string' && games.includes(game) &&
    typeof type === 'string' && types.includes(type) &&
    typeof source === 'string' && (['direct', 'unknown'].includes(source) || sourceHostname.test(source)) &&
    typeof timestamp === 'number' && Number.isSafeInteger(timestamp) &&
    timestamp >= now - dayMs && timestamp <= now + 300_000 && Object.keys(value).length === 5;
}

async function authorized(secret: string, header: string): Promise<boolean> {
  if (header.length > 512) return false;
  const digest = async (s: string) => new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)));
  const [actual, expected] = await Promise.all([digest(header), digest('Bearer ' + secret)]);
  return actual.reduce((diff, byte, index) => diff | (byte ^ expected[index]), 0) === 0;
}

function reply(data: unknown, status: number, headers?: HeadersInit): Response {
  const response = data === null ? new Response(null, { status, headers }) : Response.json(data, { status, headers });
  response.headers.set('Cache-Control', 'no-store');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  return response;
}

export async function handleGameStatistics(request: Request, env: GameStatisticsEnv): Promise<Response> {
  const url = new URL(request.url);
  const origin = request.headers.get('Origin');
  if (url.pathname === '/game-statistics/events') {
    if (origin !== siteOrigin) return reply({ error: 'origin' }, 403);
    const cors = {
      'Access-Control-Allow-Origin': siteOrigin,
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      Vary: 'Origin',
    };
    if (request.method === 'OPTIONS') return reply(null, 204, cors);
    if (request.method !== 'POST') return reply(null, 405, cors);
    if (request.headers.get('Content-Type')?.split(';')[0].trim() !== 'application/json') return reply(null, 415, cors);
    const data = await body(request);
    const now = Date.now();
    if (!validEvent(data, now)) return reply({ error: 'invalid_event' }, 400, cors);
    const cf = (request as Request & { cf?: { country?: string } }).cf;
    const country = typeof cf?.country === 'string' && /^[A-Z]{2}$/.test(cf.country) ? cf.country : 'XX';
    await env.DB.batch([
      env.DB.prepare('DELETE FROM game_statistics_events WHERE expires_at <= ?').bind(now),
      env.DB.prepare('INSERT OR IGNORE INTO game_statistics_events (id, expires_at, day, game, type, source, country) VALUES (?, ?, ?, ?, ?, ?, ?)')
        .bind(data.id, now + 2 * dayMs, berlinDate.format(data.timestamp), data.game, data.type, data.source, country),
    ]);
    return reply(null, 204, cors);
  }

  if (origin && origin !== url.origin) return reply({ error: 'origin' }, 403);
  if (request.method !== 'GET') return reply(null, 405);
  if (['/game-statistics', '/game-statistics/'].includes(url.pathname)) return statisticsReport();
  if (url.pathname !== '/game-statistics/report') return reply(null, 404);
  const secret = env.GAME_STATS_REPORT_SECRET;
  if (!secret || secret.length < 32) return reply({ error: 'report_unconfigured' }, 503);
  if (!await authorized(secret, request.headers.get('Authorization') ?? '')) return reply({ error: 'report_key' }, 401);

  const from = url.searchParams.get('from');
  const to = url.searchParams.get('to');
  const first = dateValue(from);
  const last = dateValue(to);
  if (!Number.isFinite(first) || !Number.isFinite(last) || last < first || last - first > 92 * dayMs) {
    return reply({ error: 'date_range' }, 400);
  }
  const { results } = await env.DB.prepare(`SELECT day, game, source, country, game_loaded, run_start
    FROM game_statistics_daily WHERE day BETWEEN ? AND ? ORDER BY day DESC, game, run_start DESC, source, country`)
    .bind(from, to).all();
  return reply({ from, to, timeZone: 'Europe/Berlin', rows: results }, 200);
}
