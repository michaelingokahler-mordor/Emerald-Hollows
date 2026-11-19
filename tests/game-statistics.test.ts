import { readFileSync } from 'node:fs';
import { DatabaseSync, type SQLInputValue } from 'node:sqlite';
import { expect, test } from 'vitest';
import worker, { type Database } from '../server/worker';

const origin = 'https://sabnockworks.com';
const api = 'https://api.example.org';
const secret = 'test-report-key-' + 'a'.repeat(32);

function database(): { DB: Database; sqlite: DatabaseSync } {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec(readFileSync(new URL('../server/migrations/0003_game_statistics.sql', import.meta.url), 'utf8'));
  const DB: Database = {
    prepare(sql) {
      const statement = sqlite.prepare(sql);
      let args: SQLInputValue[] = [];
      return {
        bind(...values) { args = values as SQLInputValue[]; return this; },
        async first<T>() { return statement.get(...args) as T | undefined ?? null; },
        async all<T>() { return { results: statement.all(...args) as T[] }; },
        async run() { return statement.run(...args); },
      };
    },
    async batch(statements) {
      sqlite.exec('BEGIN');
      try {
        const results = await Promise.all(statements.map(statement => statement.run()));
        sqlite.exec('COMMIT');
        return results;
      } catch (error) {
        sqlite.exec('ROLLBACK');
        throw error;
      }
    },
  };
  return { DB, sqlite };
}

function event(game: string, type: string, source = 'example.org') {
  return { id: crypto.randomUUID(), game, type, source, timestamp: Date.now() };
}

function ingest(data: unknown, from = origin, country?: string) {
  const request = new Request(api + '/game-statistics/events', {
    method: 'POST', headers: { Origin: from, 'Content-Type': 'application/json', 'CF-IPCountry': 'US' },
    body: JSON.stringify(data),
  });
  return Object.assign(request, { cf: { country } });
}

function report(token?: string, from = '2026-11-01', to = '2026-11-30') {
  return new Request(api + '/game-statistics/report?from=' + from + '&to=' + to, {
    headers: token ? { Authorization: 'Bearer ' + token } : {},
  });
}

test('counts starts by game, Berlin day, hostname and Cloudflare country exactly once', async () => {
  const { DB, sqlite } = database();
  const environment = { DB, GAME_STATS_REPORT_SECRET: secret, ALLOWED_ORIGINS: origin };
  const start = event('war-of-the-wizards', 'run_start');
  const load = event('war-of-the-wizards', 'game_loaded');
  const cave = event('emerald-hollows', 'run_start', 'direct');
  for (const request of [ingest(start, origin, 'DE'), ingest(start, origin, 'FR'), ingest(load, origin, 'DE'), ingest(cave)]) {
    const response = await worker.fetch(request, environment);
    expect(response.status).toBe(204);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe(origin);
  }
  const day = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin', dateStyle: 'short' }).format(start.timestamp);
  const response = await worker.fetch(report(secret, day, day), environment);
  expect(response.status).toBe(200);
  expect((await response.json() as { rows: unknown[] }).rows).toEqual([
    { day, game: 'emerald-hollows', source: 'direct', country: 'XX', game_loaded: 0, run_start: 1 },
    { day, game: 'war-of-the-wizards', source: 'example.org', country: 'DE', game_loaded: 1, run_start: 1 },
  ]);
  expect(sqlite.prepare('SELECT count(*) AS total FROM game_statistics_events').get()?.total).toBe(3);
});

test('rejects unexpected origins, inflated payloads, private URL fields and unauthorized reports', async () => {
  const { DB } = database();
  const environment = { DB, GAME_STATS_REPORT_SECRET: secret, ALLOWED_ORIGINS: origin + ',http://localhost' };
  const start = event('emerald-hollows', 'run_start');
  expect((await worker.fetch(ingest(start, 'http://localhost'), environment)).status).toBe(403);
  expect((await worker.fetch(ingest({ ...start, source: 'example.org/path?q=secret' }), environment)).status).toBe(400);
  expect((await worker.fetch(ingest({ ...start, source: '192.0.2.1' }), environment)).status).toBe(400);
  expect((await worker.fetch(ingest({ ...start, ip: '192.0.2.1' }), environment)).status).toBe(400);
  expect((await worker.fetch(ingest({ ...start, source: 'a'.repeat(2000) }), environment)).status).toBe(400);
  expect((await worker.fetch(ingest({ ...start, timestamp: 0 }), environment)).status).toBe(400);
  expect((await worker.fetch(report(), environment)).status).toBe(401);
  expect((await worker.fetch(report('incorrect'), environment)).status).toBe(401);
  expect((await worker.fetch(report(secret, '2026-02-30', '2026-03-01'), environment)).status).toBe(400);
  expect((await worker.fetch(report(secret), { ...environment, GAME_STATS_REPORT_SECRET: undefined })).status).toBe(503);
  expect((await worker.fetch(new Request(api + '/health'), environment)).status).toBe(200);
});

test('adds Velvet Cruise without replaying or losing earlier event IDs and aggregates', async () => {
  const { DB, sqlite } = database();
  const environment = { DB, GAME_STATS_REPORT_SECRET: secret, ALLOWED_ORIGINS: origin };
  const previous = event('war-of-the-wizards', 'run_start');
  const race = { ...event('velvet-cruise', 'run_start'), timestamp: previous.timestamp };
  expect((await worker.fetch(ingest(previous, origin, 'DE'), environment)).status).toBe(204);

  sqlite.exec(readFileSync(new URL('../server/migrations/0004_velvet_cruise_statistics.sql', import.meta.url), 'utf8'));
  for (const data of [previous, race, race]) {
    expect((await worker.fetch(ingest(data, origin, 'DE'), environment)).status).toBe(204);
  }
  const day = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin', dateStyle: 'short' }).format(previous.timestamp);
  const response = await worker.fetch(report(secret, day, day), environment);
  expect((await response.json() as { rows: unknown[] }).rows).toEqual([
    { day, game: 'velvet-cruise', source: 'example.org', country: 'DE', game_loaded: 0, run_start: 1 },
    { day, game: 'war-of-the-wizards', source: 'example.org', country: 'DE', game_loaded: 0, run_start: 1 },
  ]);
  expect(sqlite.prepare('SELECT count(*) AS total FROM game_statistics_events').get()?.total).toBe(2);
});
