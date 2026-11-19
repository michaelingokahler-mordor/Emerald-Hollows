export function statisticsReport(): Response {
  return new Response(`<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Spielstatistik | Sabnock Works</title>
  <style>
    body { margin: 2rem auto; max-width: 72rem; padding: 0 1rem; font: 1rem system-ui; color: #eee6cf; background: #151a16; }
    form { display: flex; gap: 1rem; flex-wrap: wrap; align-items: end; }
    label { display: grid; gap: .4rem; }
    input, button { font: inherit; padding: .5rem; }
    .results { overflow-x: auto; }
    table { border-collapse: collapse; width: 100%; text-align: left; }
    th, td { border-bottom: 1px solid #504938; padding: .6rem; }
    th { color: #ecce8b; }
    caption { text-align: left; padding: 1rem 0; }
  </style>
</head>
<body>
  <h1>Spielstatistik</h1>
  <p>Geladene Spiele und neue Versuche. Die Tageszahlen verwenden die Berliner Zeit.</p>
  <form id="filters">
    <label>Von <input id="from" type="date" required></label>
    <label>Bis <input id="to" type="date" required></label>
    <label>Berichtsschlüssel <input id="key" type="password" autocomplete="off" required></label>
    <button>Laden</button>
    <button type="button" id="clear">Schlüssel löschen</button>
  </form>
  <p id="status" role="status"></p>
  <section id="results" class="results" hidden>
    <table>
      <caption>Summen pro Spiel</caption>
      <thead><tr><th scope="col">Spiel</th><th scope="col">Geladen</th><th scope="col">Neue Versuche</th></tr></thead>
      <tbody id="totals"></tbody>
    </table>
    <table>
      <caption>Tageszahlen nach Herkunft</caption>
      <thead><tr><th scope="col">Tag</th><th scope="col">Spiel</th><th scope="col">Verweisende Website</th><th scope="col">Land</th><th scope="col">Geladen</th><th scope="col">Neue Versuche</th></tr></thead>
      <tbody id="days"></tbody>
    </table>
  </section>
  <script>
    const field = id => document.getElementById(id);
    const formatDay = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin', dateStyle: 'short' });
    const regionNames = new Intl.DisplayNames(['de'], { type: 'region' });
    const gameNames = {
      'war-of-the-wizards': 'War of the Wizards',
      'emerald-hollows': 'Lathmar: Emerald Hollows',
    };
    const endpoint = new URL('/game-statistics/report', location.href);
    const today = formatDay.format(new Date());
    const firstDay = new Date(Date.parse(today + 'T00:00:00Z') - 6 * 86400000);
    field('from').value = firstDay.toISOString().slice(0, 10);
    field('to').value = today;
    let pending;

    function row(values) {
      const tr = document.createElement('tr');
      for (const value of values) {
        const td = document.createElement('td');
        td.textContent = value;
        tr.append(td);
      }
      return tr;
    }

    function render(rows) {
      const totals = Object.fromEntries(Object.keys(gameNames).map(game => [game, [0, 0]]));
      field('days').replaceChildren(...rows.map(entry => {
        totals[entry.game][0] += entry.game_loaded;
        totals[entry.game][1] += entry.run_start;
        const source = entry.source === 'direct' ? 'Direkt / ohne Referrer' : entry.source === 'unknown' ? 'Unbekannt' : entry.source;
        const country = entry.country === 'XX' ? 'Unbekannt' : regionNames.of(entry.country);
        return row([entry.day, gameNames[entry.game], source, country, entry.game_loaded, entry.run_start]);
      }));
      field('totals').replaceChildren(...Object.entries(totals).map(([game, counts]) => row([gameNames[game], ...counts])));
      field('results').hidden = false;
    }

    field('filters').addEventListener('submit', async event => {
      event.preventDefault();
      pending?.abort();
      const request = new AbortController();
      pending = request;
      field('results').hidden = true;
      field('status').textContent = 'Wird geladen …';
      endpoint.search = new URLSearchParams({ from: field('from').value, to: field('to').value });
      try {
        const response = await fetch(endpoint, {
          headers: { Authorization: 'Bearer ' + field('key').value },
          cache: 'no-store', credentials: 'omit', signal: request.signal,
        });
        if (pending !== request) return;
        if (!response.ok) {
          field('status').textContent = {
            400: 'Wähle einen gültigen Zeitraum von bis zu 93 Tagen.',
            401: 'Der Berichtsschlüssel stimmt nicht.',
            503: 'Der Bericht ist zurzeit nicht verfügbar.',
          }[response.status] || 'Die Statistik konnte nicht geladen werden.';
          return;
        }
        const { rows } = await response.json();
        if (pending !== request) return;
        render(rows);
        field('status').textContent = rows.length ? '' : 'Keine Ereignisse im gewählten Zeitraum.';
      } catch {
        if (pending === request) field('status').textContent = 'Die Statistik konnte nicht geladen werden.';
      }
    });

    field('clear').addEventListener('click', () => {
      pending?.abort();
      pending = undefined;
      field('key').value = '';
      field('results').hidden = true;
      field('totals').replaceChildren();
      field('days').replaceChildren();
      field('status').textContent = '';
      field('key').focus();
    });
  </script>
</body>
</html>`, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Referrer-Policy': 'no-referrer',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",
    },
  });
}
