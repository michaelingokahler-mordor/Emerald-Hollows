# Betrieb und Wiederherstellung

## Zuständigkeiten

- Spielquellen: öffentliches Repository `michaelingokahler-mordor/Emerald-Hollows`, Hauptbranch `main`.
- Spieladresse: `https://sabnockworks.com/games/more-projects/emerald-hollows/`; fertig gebauter Inhalt aus `dist`, eingebunden in der bestehenden More-Projects-Sammlung.
- API: `https://emerald-hollows-api.emerald-hollows.workers.dev`, Konfiguration unter `server/wrangler.jsonc`.
- Datenbank: D1 `emerald-hollows`, ID `981ffcff-002a-47b5-9b3a-3836362f6ba2`.
- Sicherungen: privates Repository `michaelingokahler-mordor/Emerald-Hollows-Backups`.

Workers Free wurde am 18.10.2026 im angemeldeten Dashboard bestätigt. Es gilt ein kostenloses Tageskontingent, keine automatische Tarifänderung. Die API prüft höchstens 100 Simulationstakte pro Anfrage, bei Netzleveln höchstens 10. Begrenzungen bei Profilanlage und Uploads bremsen ungewollte Last. Beim späteren Ausbau muss die CPU-Zeit auf den größeren Karten neu gemessen werden. Die heutige Prüfung ist keine Lasttest-Zusage.

## Veröffentlichung

`npm ci`, `npm test`, `npm run verify:levels`, `npm run build` ausführen. Auf dem lokalen API-Testserver zusätzlich `npx tsx tools/verify-api.ts`. Für eine API-Änderung `npx wrangler deploy --dry-run --config server/wrangler.jsonc` und danach `npx wrangler deploy --config server/wrangler.jsonc`. Migrationen ausdrücklich für die richtige Datenbank ausführen; `--local` und `--remote` nicht verwechseln.

Bevorzugt die API vor dem Web-Build veröffentlichen. Ab 0.12 prüft der Client die unterstützten Regeln: Bei einer älteren API bleiben neue Kapitelbeweise gespeichert und werden nach dem Update erneut abgeglichen; bisherige Höhlen synchronisieren weiter. Die öffentliche Aktivierung der neuen Ranglisten benötigt weiterhin den Worker-Deploy.

Den Web-Build nach `games/more-projects/emerald-hollows/` im SabnockWorks-Repository kopieren. Die bestehende Sammlung und deren Gestaltung erhalten. Nur betroffene Pfade veröffentlichen. Website, Service Worker, `online.json` und API anschließend tatsächlich abrufen. `online.json` wird bewusst nicht offline zwischengespeichert, damit der API-Endpunkt geändert werden kann.

PWA-Updates bleiben wartend, solange noch ein altes Spielfenster geöffnet ist. Kein automatischer Austausch während eines Versuchs. Bei Aktualisierung alle Spielfenster schließen und erneut öffnen. Lokale Speicherstände sind nach Browser und Origin getrennt.

## Öffentliche Bestzeiten

`POST /profiles` legt ein freiwilliges Profil an; `GET/POST /profile` liest es bzw. ändert den Namen. Authentifizierung: `Bearer Profil-ID.geheimer-Code`. Nur SHA-256 des zufälligen 256-Bit-Codes liegt auf dem Server. Der Code ersetzt das Passwort; es gibt keine Wiederherstellung per E-Mail.

`POST /runs` nimmt einen streng geprüften Replay-Umschlag entgegen. Wiederholtes Senden derselben ID ist idempotent. `POST /runs/:id/verify` simuliert in begrenzten Abschnitten. Nur gewonnene Normalspiel-Durchläufe mit exakt passendem Ende werden eingetragen. `/leaderboard/:level` zeigt bis zu 100 Zeilen, getrennt nach Regel- und Levelversion. Bei gleicher Zeit gewinnt die höhere Gesamtwertung. Nur gleiche Zeit und gleiche Punktzahl teilen sich den Rang. Nicht alle möglichen Manipulationen sind erkennbar: automatisierte gültige Lösungen sind kein gelöstes Anti-Cheat-Problem.

## Tägliche Sicherung

Der private GitHub-Workflow läuft täglich um **03:17 UTC** und manuell über Actions. Er liest Profile, Durchläufe und Bestzeiten über einen eigenen, ausschließlich lesenden `/backup`-Zugang. Dieser Schlüssel ist nur für die Spieldaten gültig und ist kein Cloudflare-Kontotoken. Er liegt als Worker-Secret und GitHub-Actions-Secret `BACKUP_READ_TOKEN` vor. Öffentliche Origins bekommen ohne den Schlüssel keine Daten.

Die Sicherungsdatei verwendet AES-256-GCM; der zufällige Dateischlüssel wird mit RSA-OAEP/SHA-256 verschlüsselt. Nur der öffentliche RSA-Schlüssel liegt im Backup-Repository. Der private Schlüssel liegt lokal in **`artifacts/private/backup-private.pem`**. Diesen Schlüssel zusätzlich auf einem sicheren externen Datenträger aufbewahren. Ohne ihn können die Archive nicht entschlüsselt werden. Private Dateien sind aus Git und Quellpaketen ausgeschlossen.

Im aktuellen Repository-Baum bleiben 30 tägliche und 12 monatliche Archive. Frühere verschlüsselte Dateien können weiterhin in der Git-Historie liegen. GitHub kann geplante Läufe verzögern oder bei Inaktivität deaktivieren; die Actions-Seite und Benachrichtigungen des Repository-Eigentümers sind der Fehlerkanal. Ein einmal erfolgreicher Test ist keine Zusage, dass zukünftige Läufe unbeaufsichtigt immer gelingen.

Zusätzlich bietet D1 Time Travel im Free-Tarif sieben Tage Rückblick. Das ist eine separate Wiederherstellungsmöglichkeit, kein Ersatz für die externen Archive.

## Wiederherstellen

1. Verschlüsseltes Archiv aus dem privaten Backup-Repository herunterladen. Privaten Schlüssel getrennt bereitstellen.
2. Im Spielprojekt ausführen: `node tools/restore-backup.mjs ARCHIV.ehbackup PRIVATER-SCHLUESSEL.pem artifacts/private/restore.sql`.
3. Eine **neue, leere Testdatenbank** anlegen und die SQL-Datei dort importieren. Die Datei erstellt Tabellen und fügt Daten ein; sie löscht keine bestehenden Tabellen und ist absichtlich nicht für das Überschreiben einer laufenden Datenbank gedacht.
4. Profilanzahl, Bestzeiten, Fremdschlüsselprüfung und eine Profilwiederherstellung kontrollieren. Erst dann die API-Bindung bewusst auf die geprüfte Datenbank umstellen. Die bisherige Datenbank zur Rückkehr erhalten.
5. Die entschlüsselte SQL-Datei privat halten. Öffentliche ZIPs, Git und Fehlermeldungen dürfen keine Profilcodes oder Backup-Schlüssel enthalten.

Der lokale Restore-Test prüft befüllte Beispieldaten, Manipulationserkennung und Import in leeres SQLite. Zusätzlich wurde das erste reale GitHub-Archiv entschlüsselt und in leeres SQLite importiert; es enthielt erwartungsgemäß noch keine Spielerprofile. Eine produktive D1-Umschaltung wurde nicht durchgeführt.

Quellen: [Workers-Kontingente](https://developers.cloudflare.com/workers/platform/pricing/), [D1 Time Travel](https://developers.cloudflare.com/d1/reference/time-travel/), [PWA-Installation](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable).

## Migration 0.4: Punktewertung

Vor dem Eingriff eine manuelle verschlüsselte Sicherung im privaten Backup-Repository ausführen und ihren Erfolg kontrollieren. Migration 0002 ergänzt nur die nullable Spalte scores.score und einen Index. Sie löscht keine Datensätze. Die bestehende Spalte points bleibt die Kristallpunktzahl.

1. Lokal testen: npm run server:migrate, npx tsx tools/verify-api.ts und node tools/verify-backup.mjs.
2. Produktiv Migrationen mit npx wrangler d1 migrations apply emerald-hollows --remote --config server/wrangler.jsonc anwenden; dann den neuen Worker veröffentlichen.
3. Bestätigte Durchläufe exportieren: SELECT id,profile_id,replay,state,cursor,status FROM runs WHERE status='confirmed'. Wrangler mit --json verwenden und die Ausgabe unter artifacts/private/score-runs.json sichern.
4. npx tsx tools/backfill-scores.ts artifacts/private/score-runs.json artifacts/private/score-updates.sql ausführen. Das Werkzeug prüft Regelversion, Kartenrevision, Status, Tickzahl und Endzustands-Hash und berechnet den Score aus dem gespeicherten Endzustand.
5. Die erzeugte SQL-Datei mit wrangler d1 execute und --remote --file auf die richtige Datenbank anwenden. Upserts sind wiederholbar: Schnellere Rekorde bleiben bestehen, Gleichstände werden nach Punkten verglichen. Es werden keine Namen oder Profilzugänge verändert.
6. SELECT COUNT(*) FROM scores WHERE score IS NULL muss für die bekannten bestätigten Durchläufe null liefern. Ranglisten und Profilwiederherstellung prüfen. Dann Web-Build veröffentlichen.

Die Wiederherstellung unterstützt alte Archive ohne score und neue mit score. Sie erstellt alle mitgelieferten Schema-Migrationen in einer leeren Datenbank. Bei alten Archiven kann die Nachbewertung anschließend wiederholt werden. Private Exporte und SQL-Dateien dürfen nicht in Git oder Release-Pakete gelangen.
