# Lathmar: Emerald Hollows

Eine Browserdemo mit zehn handgebauten Höhlen, warmer Amiga-inspirierter Grafik und Runway-Musik. Umschaltbare englische/deutsche Oberfläche, Tastatur und Touch, Übungsmodus, automatische Speicherstände, Offline-Installation und optionale öffentliche Bestzeiten.

- [Im Browser spielen](https://sabnockworks.com/games/more-projects/emerald-hollows/)
- [More Projects bei SabnockWorks](https://sabnockworks.com/games/more-projects/#emerald-hollows)
- [Pakete herunterladen](https://github.com/michaelingokahler-mordor/Emerald-Hollows/releases)
- [Entwicklungsplan: 100 + 20 Level](docs/ENTWICKLUNGSPLAN.md)

## Lokal starten

Node.js 24 LTS installieren, dann im Projektordner:

```sh
npm ci
npm run dev
```

Alternativ das Web-ZIP vollständig entpacken und unter Windows `Start-Emerald-Hollows.cmd` öffnen. Dieser kleine lokale Server braucht Node.js, aber keine npm-Installation. Die feste Adresse `http://127.0.0.1:4173/` erhält den Browser-Spielstand zwischen Starts. Entwicklungsserver und öffentliche Website besitzen getrennte Speicherstände; über „Profil & Sicherung“ lassen sie sich exportieren und importieren.

## Spielen

WASD/Pfeile bewegen und graben. Leertaste plus Richtung gräbt oder sammelt nebenan. R startet neu, Escape pausiert. Mobil: Richtungstasten links; „Graben“ rechts halten und gleichzeitig eine Richtung berühren. Smaragde zählen einen, Diamanten drei Punkte. Bei erfüllter Quote öffnet der Ausgang; Höhlen 06, 07 und 09 verlangen zusätzlich ihre angezeigte Krabbleraufgabe. Fallende Objekte und Krabbler bleiben auch im Übungsmodus gefährlich.

Die Sprache lässt sich im Hauptmenü oder unter Einstellungen wechseln. Englisch ist die Voreinstellung. Die Credits sind über das Hauptmenü und den Abschlussbildschirm erreichbar; Herkunft und Lizenznachweise stehen in [docs/CREDITS.md](docs/CREDITS.md).

Seit Version 0.3 unterscheiden sich die drei Krabblerlektionen: 06 einsperren, 07 einen Abwurf zeitlich abstimmen, 09 einen Kristallkrabbler in einen Diamanten verwandeln. Die zusätzlichen Kristalle in 08 ermöglichen bewusst verschiedene Sammelwege. Vorhandene Freischaltungen bleiben erhalten. Bestzeiten werden nur zwischen identischen Kartenrevisionen verglichen; ältere wartende Ergebnisse werden weiterhin geprüft und archiviert.

Erfolge im Normal- oder Übungsspiel öffnen die nächste Höhle. Zeiten bleiben getrennt. „Fortsetzen“ lädt den laufenden Versuch; gespeichert wird ungefähr jede Sekunde und beim Pausieren. Ein Stromausfall kann die letzte Sekunde verlieren. Der Browser hält zusätzlich eine vorherige geprüfte Kopie vor. Importierte und alte lokale Erfolge erzeugen keine öffentlichen Ranglisteneinträge.

Version 0.4 baut Höhle 10 zum bewachten Finale um: Drei Pflichtdiamanten liegen hinter der Krabblerpassage. Einsperren und Felsfalle sind als zwei reguläre Lösungsreplays verfügbar. Das Finale besitzt keine zusätzliche Pflichtaufgabe; seine Geometrie macht den Durchgang notwendig.

Best Times zeigt Zeit und Punkte. Die kürzere Zeit gewinnt, bei Gleichstand die höhere Punktzahl. Smaragde zählen 1, Diamanten 3 Punkte. Ein zerquetschter oder am Ende sicher eingeschlossener Schieferkrabbler bringt 5 zusätzliche Punkte; ein umgewandelter Kristallkrabbler 10. Sein eingesammelter Diamant zählt weitere 3. Gegnerpunkte beeinflussen die Kristallquote nicht. Ältere rein lokale Werte sind mit † als reine Kristallpunkte gekennzeichnet; Online-Ergebnisse werden aus ihren geprüften Durchläufen ergänzt.

## Online-Profil und Sicherung

Der Name wird unter „Profil & Sicherung“ eingetragen. Ein Online-Profil ist freiwillig und benötigt keine E-Mail. Sein geheimer Code stellt das Profil auf einem anderen Gerät wieder her; öffentlich sichtbar sind Name und bestätigte Bestzeiten. Der Server berechnet Ergebnisse aus den Eingaben selbst. Regelgültigkeit ist kein Beweis für menschliches Spielen.

Die API läuft auf Cloudflare Workers Free mit D1. Die Website bleibt auf GitHub Pages. Bei Ausfällen oder Kontingentgrenzen bleibt das Spiel lokal spielbar; angemeldete Spieler behalten wartende Ergebnisse. Keine automatische Umstellung auf einen bezahlten Tarif.

Tägliche verschlüsselte Serversicherungen liegen in einem getrennten privaten Repository. Betriebs- und Wiederherstellungsanleitung: [docs/BETRIEB.md](docs/BETRIEB.md). Niemals Schlüssel, Tokens, `.dev.vars`, private Sicherungen oder lokale D1-Datenbanken veröffentlichen. Quell-ZIP und Git schließen diese Dateien aus.

## Entwicklung

```sh
npm test
npm run verify:levels
npm run build
npm run server:migrate
npm run server:dev
# In einem zweiten Terminal:
npx tsx tools/verify-api.ts
node tools/verify-backup.mjs
npm run package
node tools/verify-package.mjs
```

TypeScript mit strenger Prüfung, Phaser 4.2.1, Vite und Vitest. Die Simulation ist unabhängig von Phaser. 100-ms-Takt, deterministische Replays. Unveränderte Karten behalten `crystal-delve/1`; die überarbeiteten Krabblerkarten und das Finale verwenden `emerald-hollows/2`. Der Speicher übernimmt `crystal-delve.save.v1` automatisch.

`src/core` enthält Regeln und Replay-Prüfung, `src/levels.ts` die Karten, `src/campaign.ts` den Kampagnenaufbau, `src/main.ts` die Oberfläche, `server` die API und Migrationen. `public/replays` enthält erfolgreiche Lösungen. Die Runway-Quellen und Produktionsnachweise liegen unter `artifacts`; Bearbeitungsskripte unter `tools`.

Die 100-Level-Kampagne, Geheimkapitel und neuen Mechaniken sind der weitere Ausbau und noch nicht Teil dieser Zehn-Level-Demo. Echte Mobilgeräte und die subjektive Musik-/Spielspaßabnahme stehen gesondert im [Prüfbericht](docs/PRUEFBERICHT.md).
