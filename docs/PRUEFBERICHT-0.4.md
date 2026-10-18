# Lathmar: Emerald Hollows 0.4.0 – Prüfbericht

Stand: 18. Oktober 2026. Level 10 erhält einen bewachten Pflichtdurchgang und zwei geprüfte Lösungen. Bestzeiten zeigen die Gesamtpunkte; bei gleicher Zeit entscheidet die höhere Punktzahl. Die Kristallquote bleibt davon unabhängig.

## Automatisierte Prüfung

| Prüfung | Ergebnis |
|---|---|
| TypeScript und Produktionsbuild | bestanden |
| Vitest | 80 Tests bestanden |
| Zeitgebundene Lösungen | 10/10 erfolgreich; zusätzliche Felsfallenlösung für Level 10 erfolgreich |
| Replays bei 30, 60 und 144 Render-FPS | identische Simulations-Endzustände |
| Level 10: Einschließen | 89 Takte, Krabbler lebt im geschlossenen Gehege, 30 Kristallpunkte + 5 Gegnerpunkte |
| Level 10: Felsfalle | 131 Takte, Krabbler zerquetscht, 30 Kristallpunkte + 5 Gegnerpunkte |
| Level 10: Gefahr | blindes Vorschieben ohne die Wartephase endet tödlich; ohne den bewachten Gang sind Quote und Ausgang nicht erreichbar |
| Punkte | Smaragd 1, Diamant 3, Schieferkrabbler 5, Kristallkrabbler 10; keine Änderung der Quote oder Replay-Prüfsummen |
| Einschließen | Bonus verschwindet beim Wiederöffnen; wiederholte Berechnung erzeugt keine zusätzlichen Punkte |
| Bestzeiten | kürzere Zeit gewinnt; bei gleicher Zeit höhere Punktzahl; gleiche Zeit und Punkte teilen den Rang |
| Alte Rekorde | Karten 01–09 unverändert; alter Level-10-Durchlauf bleibt anhand seiner archivierten Karte prüfbar |
| Offline-Warteschlange | bei gleicher Zeit bleibt der Durchlauf mit mehr Punkten erhalten, unabhängig von der Reihenfolge |
| Lokale API | Punkte serverseitig aus bestätigten Durchläufen berechnet; Zeit-/Punktsortierung, Gleichrang und Nichtüberschreiben durch langsamere Läufe geprüft |
| Sicherungsformat | verschlüsselter Rundlauf, manipulierte Daten abgewiesen, SQLite-Fremdschlüsselprüfung; neue Punkte erhalten, alte Sicherungen ohne Punkte weiterhin einlesbar |

Die API-Prüfung umfasst weiterhin Profilanlage, Besitzerprüfung, wiederholte Uploads, mehrteilige Verifikation, ungültige Endzustände, Ausschluss des Übungsmodus und CORS. Schreibende Testläufe verwenden ausschließlich die lokale Wrangler/D1-Datenbank.

Nachweise: `artifacts/level-verification.json`, `artifacts/api-verification.json`, `artifacts/backup-verification.json`, `artifacts/verification-v0.4.json`, `tests/finale-and-score.test.ts` und die bisherigen Kern- und Speichertests.

## Tatsächlich ausgeführte Browserprüfung in 0.4

| Umgebung | Geprüft |
|---|---|
| Chrome, 1280 × 720, DPR 1 | beide Level-10-Lösungen im Spiel, Punktezähler, Ergebnisaufschlüsselung, englische/deutsche Hilfe und Bestzeiten |
| Edge, 1920 × 1080, DPR 2 | dieselben beiden Lösungen und Anzeigen; keine JavaScript-Seitenfehler |
| Chrome-Touchemulation, 390 × 844, DPR 3 | beide Lösungen, Punkteanzeige, Rangliste in beiden Sprachen ohne horizontalen Überlauf |
| Chrome-Touchemulation, 844 × 390, DPR 3 | Level-10-Start, Punkteanzeige und Sprachwechsel; Touchfelder liegen außerhalb des Spielfelds |

Die Browserprüfung der Rangliste verwendet lokale Beispieldaten. Die tatsächliche API-Sortierung wurde separat gegen die lokale Datenbank getestet. Es wurden keine Testprofile oder Testrekorde in die öffentliche Rangliste geschrieben. Die Bildsichtung umfasst das Finale, die neue Tabelle sowie mobiles Hoch- und Querformat. Skript: `tools/browser-v04.js`; Bilder unter `output/playwright/`; kompakte Übersicht in `artifacts/visual-review-v0.4.webp`.

Die umfassenderen Prüfungen von 0.3 zu Zwei-Finger-Graben, Offline-Neuladen, Profilwiederherstellung und Tastaturabschlüssen sind in `artifacts/verification-v0.3.json` dokumentiert. Sie wurden in 0.4 nicht vollständig wiederholt.

## Server, Sicherung und Veröffentlichung

Vor der Servermigration wurde eine zusätzliche verschlüsselte Sicherung erfolgreich erstellt (Backup-Workflow 39127181141). Migration `0002_score.sql` ergänzt die Punktespalte. Aus elf bestätigten Produktionsdurchläufen wurden die Punkte berechnet und die zehn bestehenden Rekorde ergänzt; anschließend fehlte bei keinem Rekord die Punktzahl. Bestehende Zeiten bleiben erhalten.

Die alte Level-10-Karte bleibt im Archiv. Ihre Rekorde werden nicht mit dem neuen Finale verglichen; Freischaltungen bleiben erhalten. Lokale Altbestzeiten ohne gespeicherten Endzustand zeigen zunächst ihre Kristallpunkte mit einer Kennzeichnung. Ein neuer Durchlauf oder die Wiederherstellung des Onlineprofils liefert die vollständige Wertung.

Die täglichen verschlüsselten Sicherungen bleiben aktiv. Der lokale Wiederherstellungstest berücksichtigt beide Datenbankformate. Eine produktive Datenbankwiederherstellung wurde in 0.4 nicht durchgeführt. Die abschließende öffentliche Prüfung und Commit-/Worker-Kennungen werden separat in `release/deployment-verification-v0.4.json` dokumentiert.

## Menschliches Feedback und Grenzen

Der Nutzer hat die Grafik und den öffentlichen Touchmodus positiv beurteilt. Sein Hinweis auf den ignorierbaren Krabbler führte zum Umbau von Level 10. Ein menschlicher Spieldurchlauf dieser neuen Fassung steht noch aus; erfolgreiche Lösungsreplays belegen die Lösbarkeit, nicht den subjektiven Schwierigkeitsgrad.

Die Gerätesimulation ersetzt keine Prüfung auf einem physischen Android-Gerät, iPhone oder iPad. Home-Bildschirm-Installation, Safari, Firefox, schwächere Hardware und eine menschliche Hörabnahme bleiben offen. Es handelt sich weder um einen Lasttest noch um einen allgemeinen Leistungsnachweis.

## Medien und Pakete

Keine neuen Runway-Generierungen: weiterhin **139 von höchstens 1.000 Credits**. Web- und Quell-ZIP enthalten beide Finale-Replays, Regeln, Lösungen und diesen Bericht. Private Schlüssel, Datenbanken und Zugangsdaten sind ausgeschlossen. Paketprüfung und SHA-256-Summen liegen unter `release/`. Der Browserstart benötigt keine Installation; der lokale Starthelfer benötigt Node.js 24.
