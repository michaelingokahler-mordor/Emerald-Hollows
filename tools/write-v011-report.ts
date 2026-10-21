import {readFile,writeFile} from 'node:fs/promises';
const load=async(p:string)=>JSON.parse(await readFile(p,'utf8'));
const proof=await load('artifacts/beetle-revision-verification.json');
const tests=await load('artifacts/tests-v011-final.json');
const phases=await load('artifacts/beetle-phases.json');
const scree=await load('artifacts/scree-v011-access.json');
let text=`# Prüfbericht 0.11 — Käfer-Revision, Level 01–40

Stand: 21. Oktober 2026. 30 Karten verwenden Regeln v6; 01–04, 08, 11, 14, 17, 18 und 39 behalten Kartenhash, Zeitlimit und Rangliste. Alte Ergebnisse werden nicht gelöscht. Spinnen folgen erst mit einem gesonderten Entwurf für 41–50; DW in 25 bleibt versiegelt.

## Automatisierte Prüfung

- ${tests.numPassedTests} Tests bestanden, ${tests.numFailedTests} fehlgeschlagen. Regelkern, alte Ausführungsregeln, aktuelle Karten, Speicherung, Sprache, Punkte und Umgehungsversuche sind enthalten. [Vollständiges Testergebnis](../artifacts/tests-v011-final.json).
- Alle 40 Hauptlösungen und die angebotenen Alternativen gewinnen innerhalb ihrer tatsächlichen Frist. Jede wurde erneut abgespielt, als JSON-Zwischenstand fortgesetzt, bei 30/60/144 Render-FPS verglichen und vom Serverprüfer in Abschnitten bestätigt. [Messdaten](../artifacts/beetle-revision-verification.json).
- Alle 40 exakt veröffentlichten Replays der Version 0.10 bestehen weiterhin. Die lokale Wrangler/D1-HTTP-Prüfung nimmt sie entgegen: zehn erscheinen weiterhin aktuell, dreißig archiviert. Profilwiederherstellung, Manipulationsablehnung, Rangfolge Zeit vor Punkten und alte Timer-Kompatibilität bestehen. Keine öffentlichen Testprofile und keine Datenbankmigration. [API-Protokoll](../artifacts/api-verification.json).
- ${phases.results.reduce((n:number,r:any)=>n+r.phases.filter((p:any)=>p.success).length,0)} von 120 Versuchen mit unterschiedlichen Startphasen gewinnen. Standardverzögerungen: 0/9/18/36 Sekunden; in 30: 0/11,4/20,4/36 Sekunden. Diese Versuche verwenden eine Laborfrist von 1.800 Sekunden, damit die Wartephase nicht mit der öffentlichen Frist verwechselt wird. Sie belegen Phasenverträglichkeit, keine zeitgebundenen Rekorde und keine Garantie für jeden Starttakt. [Phasentest](../artifacts/beetle-phases.json).
- Geröllmeer: drei Referenzrouten sowie 24 Permutationen der Sammelbezirke erreichen alle 92 Punkte, 80 unterschiedliche Edelsteine und null Restbeute. Während der Permutationen wird alle zehn Takte statische Erreichbarkeit geprüft; zeitweise durch Felsen blockierte Beute wird im selben normalen Durchlauf später geborgen. Das ist eine begrenzte Stichprobe, keine Zusage für jede beliebige Fehlgrabung. [Erreichbarkeitsprüfung](../artifacts/scree-v011-access.json).
- Verschlüsselte Backups werden in eine leere SQLite-Datenbank zurückgespielt; beschädigte Daten werden abgewiesen. Dies ist kein Rückspielen in die Produktivdatenbank. [Backup-Prüfung](../artifacts/backup-verification.json).

## Umgehungen und notwendige Handlungen

Die Tests lassen einzelne verpflichtende Hebelaktionen aus und prüfen zusätzlich vereinfachte Erreichbarkeit, bei der Erde, Gegner und häufig auch bewegliche Hindernisse bereits als entfernt gelten. Ein Scheitern dieser großzügigen Erreichbarkeit beweist eine bauliche Sperre; ein einzelner fehlgeschlagener Eingabedurchlauf allein beweist keine Unmöglichkeit aller Alternativen.

- **05:** Beobachtungslösung wartet den tatsächlichen Wechsel ab und beendet die Karte in 7,9 Sekunden. Der kompakte Rundlauf zeigt die erste Verwandlung nach 6,3 Sekunden innerhalb der 10-Sekunden-Frist.
- **06/15/37:** In 06 ist die zu sprengende Mauer ein echter Zugang. In 15 und 37 kann ein getöteter Käfer die lebendige Gefangenschaft nicht ersetzen.
- **19/20:** 19 braucht den erzeugten Diamanten. 20 dokumentiert denselben Fels beim Treffer und anschließenden Schieben; die geprüfte Lösung enthält keine Explosion.
- **26:** Ein zunächst entstandener Zugang oberhalb des Schlüsselträgers wurde geschlossen. Bedienpunkt, Laufbahn und Beute liegen nun hinter dem ursprünglichen Felsengpass. Untergraben auslassen verhindert die Lösung; der Fels endet weiterhin im gemeinsamen unteren Gang.
- **29/30:** Die Gegenposition am Fels und der einstürzende Portalrückweg bleiben erhalten. Schlüsselträger-Sprengungen erreichen den zentralen Fels in 29 nicht.
- **34:** Beide Muttergesteinstrecken sperren eigene notwendige Bereiche, auch wenn andere bewegliche Hindernisse und Geräte zugunsten des Spielers freigegeben werden. G3 dient als sichere Abkürzung und Gehegeabschluss; es wird nicht als zusätzlicher Pflichtschritt behauptet.
- **35:** G1, R1, G2 und R2 haben verschiedene Funktionen. Die erste Explosion öffnet die Trennwand und gibt den Schlüssel frei; die normale Beute reicht ohne den Fusionsdiamanten nicht aus.
- **36:** Exakt 74 Smaragde, 6 Diamanten, 107 Felsen; die Ausgangsnische ist nur durch ihr Gate erreichbar. Keine inneren Trennmauern außerhalb dieser Nische und des Hebels.
- **38:** P1 und P2 bearbeiten getrennte notwendige Adern. Beide geben nachweislich Gegner aus. Jede geschlossene Ausgangstür verhindert jeden baulichen Zugang; Stahl und verstärkte Geräte verhindern die Sprengabkürzung.
- **40:** Normale Beute liegt sechs Punkte unter der Quote. Genau ein Pit-Helfer, ein getrenntes Blau/Lila-Paar und zwei begrenzte Abwürfe liefern die zwei erforderlichen Diamanten. Erneutes Einschalten füllt keinen Vorrat auf; Formwechsel erzeugen keine zusätzlichen Gegner oder Belohnungen.

## Tatsächliche Browserprüfungen

Chrome 1280 × 720/DPR 1 und Edge 1920 × 1080/DPR 2: alle 40 Hauptreplays liefen bis zum Abschlussdialog, mit verborgenen/aufgeklappten Hints und EN/DE-Hilfe. Die anschließend korrigierten Karten 05 und 26 wurden gezielt erneut geprüft; der Edge-Nachlauf umfasst zusätzlich 34, 35, 38 und 40. Die Wiedergabe wurde für diese technischen Prüfungen beschleunigt.

Chrome-Mobil-Emulation 390 × 844/DPR 3: 06, 09, 13, 15, 16, 26, 34, 35, 36, 38 und 40 gewinnen. Ein separater Test verwendet echte, gleichzeitig dispatchte Touch-Ereignisse zum Schalten des Pit-Hebels. Er prüft Stillstand des Miners beim Graben, angehaltene Simulation bei Pause, den unveränderten gespeicherten Zwischenstand nach tatsächlichem Neuladen und den vollständigen Neustart. Bei 09, beiden Abwürfen in 35 und beiden Abwürfen in 40 sind Bedienpunkt, Ausgabe und Ziel gemeinsam im 390-Pixel-Ausschnitt sichtbar.

Vorbereitete Situationen dienen der Bedienelementprüfung; das sind keine menschlich gespielten Gesamtlösungen. Goldene/weiße Panzer, Materialunterschiede, Gerätekennungen, Gehege und die rote Warnung werden gesondert visuell kontrolliert. Screenshots liegen lokal unter output/playwright/. Ein früher Nachlauf scheiterte am Test-Seed beim Neuladen; nach Setzen vor dem App-Start bestand der saubere Durchlauf. Es wird daraus kein Spielfehler abgeleitet.

[Chrome](../artifacts/browser-chrome-v011.json) · [Edge](../artifacts/browser-edge-v011.json) · [Chrome-Nachlauf](../artifacts/browser-final-chrome-v011.json) · [Edge-Nachlauf](../artifacts/browser-final-edge-v011.json) · [Mobil](../artifacts/browser-mobile-v011.json) · [Touch und Neuladen](../artifacts/browser-touch-v011.json) · [Rote Warnung](../artifacts/browser-warning-v011.json).

Auch das fertige Produktionspaket wurde ohne Entwicklungsimporte geprüft: tatsächliche Touch-Eingabe, versteckter Hint, Pause, unveränderter Spielstand nach Neuladen, Offline-Neuladen über den Service Worker sowie Querformat ohne horizontalen Überlauf bestehen. [Paket im Browser](../artifacts/browser-production-v011.json).

## Lösungszeiten

Alle Angaben unten sind **automatische** Durchläufe derselben Kartenrevision, keine menschlichen Rekorde. Die schnellste bekannte geprüfte Alternative bestimmt bei geänderten Karten die Obergrenze: dreifache Zeit, abgerundet auf fünf Sekunden. Die bisherigen menschlichen Rekorde anderer Kartenrevisionen wurden nicht übernommen. Nach deinen neuen Durchläufen wird zusätzlich die doppelte menschliche Bestzeit als Obergrenze angewendet.

| Level | Hauptlösung | Schnellste geprüfte Route | Limit | Quote |
|---|---:|---:|---:|---:|
`;
for(const l of proof.levels)text+=`| ${l.id} | ${l.routes[0].seconds.toFixed(1)} s | ${Math.min(...l.routes.map((r:any)=>r.seconds)).toFixed(1)} s | ${l.timeSeconds} s | ${l.quota} |\n`;
text+=`
## Grenzen und Auslieferung

Spielgefühl, menschliche Lösbarkeit unter der kurzen Frist, Langzeitmotivation und ein echtes Telefon bleiben deiner Abnahme vorbehalten. Die automatischen Routen kennen die Karte; insbesondere 05/07/09 haben kurze Zeitfenster. Der Übungsmodus bleibt zum Beobachten verfügbar. Kein neuer Musik- oder Geräuschentwurf und keine menschliche Hörabnahme in dieser Revision. Bestehende Runway-Medien werden weiterverwendet, ohne neue Generierungskosten.

Der Server unterstützt alte und neue Beweise vor Veröffentlichung des Clients. Profile und Freischaltungen bleiben erhalten; es werden keine Ranglistenzeilen gelöscht. Quell- und Web-ZIP enthalten Regeln, Lösungen, Mediennachweise und diesen Bericht. Hashes und Paketprüfung stehen in release/SHA256SUMS.txt und release/package-verification.json. Ein vorhandener Service Worker übernimmt die neue Version nach Schließen aller alten Spielfenster und erneutem Öffnen.
`;
await writeFile('docs/PRUEFBERICHT-0.11.md',text);
