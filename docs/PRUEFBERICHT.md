# Lathmar: Emerald Hollows 0.7.0 – größere Fördergänge

Stand: 18. Oktober 2026. Level 11–20 wurden neu aufgebaut. 11–13 führen die Mechanismen ein; ab 14 verbinden größere Abbaugebiete, verteilte Edelsteine und mehrere Sammelwege die Apparaturen. Hebel und Tore verwenden jetzt die Runway-Motive. Bewegungstempo, Regeln und Miner-Animation bleiben erhalten.

## Umfang und tatsächliche Lösungszeiten

| Level | Raster | Begehbare/abbaubare Zellen | Quote | Geprüfte bekannte Routen |
|---|---|---|---|---|
| 11 | 32 × 22 | 200 | 22 | 19.1–19.1 s |
| 12 | 36 × 26 | 348 | 22 | 21.5–21.5 s |
| 13 | 40 × 27 | 414 | 28 | 27.2–27.2 s |
| 14 | 48 × 30 | 733 | 36 | 19.3–27.3 s |
| 15 | 48 × 32 | 700 | 42 | 32.2–33.9 s |
| 16 | 50 × 32 | 624 | 48 | 25.1–25.7 s |
| 17 | 52 × 34 | 732 | 56 | 47.9–47.9 s |
| 18 | 56 × 34 | 743 | 60 | 31.1–51.0 s |
| 19 | 56 × 36 | 912 | 72 | 52.4–54.0 s |
| 20 | 64 × 40 | 1134 | 84 | 57.8–70.3 s |

Die Zeiten stammen aus deterministischen Eingabefolgen, nicht aus menschlichen Erstversuchen; sie beweisen keine Optimalität. Die ursprüngliche Zielvorstellung von drei bis sechs Minuten für bekannte Routen ist damit **nicht erreicht**. Der größere Inhalt wird ohne künstliche Wartezeiten oder langsameres Bewegungstempo angeboten. Menschliches Feedback zu Orientierung, Routenwahl und Spieldauer steht noch aus.

Level 14 bietet vier Bezirke mit 53 verfügbaren Punkten bei Quote 36. Zwei Bezirke genügen nie, jede Kombination aus drei Bezirken genügt. Level 18 bietet einen kürzeren bewachten Weg und einen längeren sicheren Sammelweg. In 13, 15, 19 und 20 lässt sich die erforderliche Umwandlung eines Kristallkäfers nicht durch zusätzliches Sammeln umgehen. Level 16 verlangt weiterhin das lebendige Einsperren.

## Automatisierte Prüfung

- 156 Vitest-Tests bestanden, einschließlich sämtlicher neuer Kartenrevisionen und zusätzlicher Lösungsrouten.
- Alle 20 Hauptlösungen sowie Alternativen erneut erfolgreich. Kapitel 2 besitzt 19 geprüfte Routen insgesamt; die erfolgreiche Hauptlösung ist dabei jeweils mitgezählt.
- Identische Ergebnisse bei 30/60/144 Render-FPS; zusätzlich neun anfängliche Zeitversätze je Kapitel-2-Karte. Neustart, Fehlwurf und obligatorische Ziele geprüft.
- Lokaler Wrangler/D1-Durchlauf: sämtliche neuen Replays samt Punkten bestätigt. Alte 0.6-Replays bleiben verifizierbar, erscheinen aber nicht in Ranglisten der neuen Karten. Freischaltungen bleiben erhalten.
- Karten und Replays 01–10 unverändert. Keine öffentlichen Testeinträge erzeugt und keine Datenbankeinträge gelöscht. Die neue Kartenprüfsumme trennt die Bestzeiten von 11–20 automatisch.
- Nachweise: `artifacts/expanded-caves-verification.json`, `artifacts/level-verification.json`, `artifacts/api-verification.json`.

## Browserprüfung

Chrome 1280 × 720/DPR 1, Edge 1920 × 1080/DPR 2 und Chrome-Touchemulation 390 × 844/DPR 3 spielten alle zehn neuen Karten vom Menü bis zum erfolgreichen Abschluss ab. Diese systematischen Durchläufe verwendeten sechsfach beschleunigte Replay-Wiedergabe. Die Apparaturen blieben vollständig im Bild. Englisch und Deutsch sowie erhaltene Freischaltungen alter Karten wurden geprüft.

Ein separater Test mit zwei gleichzeitigen CDP-Touchpunkten und Tastatur lief mit normalem Spieltakt: ein gehaltener Hebel gibt genau einen Stein aus, erneutes Drücken einen weiteren; Pause/Neuladen erhält den Vorrat, Neustart stellt ihn wieder her. Auch 844 × 390 im Querformat ohne horizontale Überbreite geprüft. Keine physische Handyprüfung und keine neue menschliche Spiel- oder Hörabnahme.

Die neuen Runway-Grafiken wurden zusätzlich an 13, 14, 15 und 20 in Desktop- und Mobilansicht geprüft; die Apparaturen bleiben vollständig sichtbar. Produktionsbuild und beide ZIP-Pakete bestehen die technische Prüfung. Nach Offline-Neuladen sind alle 20 Level vorhanden; Level 20 wurde bei normalem Takt bis zum erfolgreichen Abschluss abgespielt. Browsernachweis: `artifacts/expanded-browser-verification.json`. Die Veröffentlichung wird zusätzlich unter `release/deployment-verification-v0.7.0.json` dokumentiert.

## Medien

26 neue Runway-Credits netto einschließlich verworfener Freistellungen (2477 → 2451). Projektgesamt **262 / 1.000**, konservativ ohne Erstattungen 271 / 1.000. Herkunft, Prompts und Verwendungen: `artifacts/mechanism-production-v0.7.json`. Die offene Toransicht verwendet dieselben Rahmenstücke wie das geschlossene Tor, damit die Geometrie beim Öffnen stabil bleibt. Die neue separate offene Generierung wurde nicht verwendet.

Die folgenden Abschnitte sind historische Prüfungen früherer Versionen.

---

# Lathmar: Emerald Hollows 0.6.0 – Kapitel 2

Stand: 18. Oktober 2026. Zwanzig spielbare Höhlen; Level 11–20 ergänzen Hebel/Tore, zwei Käferrichtungen, Verschmelzung und dosierte Steinspender. Die Laufanimation A bleibt bei 240 ms pro Pose. Keine neuen Runway-Generierungen.

## Automatisierte Prüfung

- 128 Vitest-Tests bestanden. TypeScript, Produktionsbuild und Worker-Bundle erfolgreich.
- Alle 20 Hauptlösungen sowie Alternativen für 10 und 18 erfolgreich. Neue Replays bei 30/60/144 Render-FPS identisch. Die zehn neuen Lösungen funktionieren zusätzlich mit neun verschiedenen anfänglichen Wartezeiten.
- Regeln prüfen beide Abbiegerichtungen, Fusion vor/nach Bewegung, Mehrfachkontakte, keine doppelte Bewegung oder Punkte, tödlichen Kontakt, atomare Torblockierung, gehaltene Hebel, Vorrat, Ausgabesperre, belegten Auslass und Neustart. Level 15 hat einen geprüften Lösungsweg nach einem Fehlwurf.
- Karten und Replays 01–10 unverändert. Alte Bestzeiten/Freischaltungen bleiben erhalten; ein abgeschlossenes Level 10 öffnet 11.
- Lokaler Wrangler/D1-Test: alle neuen Replays mit Gesamtwertung bestätigt, Wiederherstellung und schrittweise Serverprüfung bestanden. Keine öffentlichen Testprofile oder Ranglisteneinträge erzeugt.
- Verschlüsselte Sicherung in leere SQLite-Datenbank wiederhergestellt; beschädigte Sicherung abgewiesen.

- Produktionsbuild nach Offline-Neuladen: alle 20 Level vorhanden, Level-20-Replay ohne Netzwerk bis zum Abschluss abgespielt; englische Hilfe geprüft.

## Tatsächliche Browserdurchläufe

| Umgebung | Prüfung |
|---|---|
| Chrome, 1280 × 720, DPR 1 | Alle zehn neuen Replays vom Menü bis zum erfolgreichen Abschluss; englische/deutsche Kapitelübersicht; Screenshots aller Karten |
| Edge, 1920 × 1080, DPR 2 | Alle zehn neuen Replays erfolgreich; Apparaturen vollständig im Kamerabild |
| Chrome mit Touch-Emulation, 390 × 844, DPR 3 | Level 15, 19 und 20 erfolgreich; vollständige Apparaturen, etwa 40,5 CSS-Pixel pro Kachel |
| Chrome mit Touch-Emulation, 844 × 390, DPR 3 | Dieselben drei Level erfolgreich; etwa 40,7 CSS-Pixel pro Kachel |
| Zwei gleichzeitige Touchpunkte sowie Tastatur | Gehaltene Kombination gibt einen Stein aus; Loslassen und neuer Druck geben einen weiteren aus. Pausieren/Neuladen erhält den Vorrat, Neustart stellt ihn wieder her |

Sichtprüfung der zehn Chrome-Spielansichten und der mobilen Apparatur erfolgt. Browsernachweis: `artifacts/chapter-two-verification.json`; Skripte unter `tools/browser-chapter-two*.js` und `tools/browser-mechanism-controls.js`. Screenshots liegen lokal unter `output/playwright/chapter2-*`.

Die Touch-Prüfung verwendet Browseremulation, kein physisches Handy. Eine neue menschliche Spiel- oder Hörabnahme ist nicht erfolgt. Insbesondere das subjektive Verhältnis von Level 12 (vorübergehend umlenken) und 16 (dauerhaft einsperren) bleibt für den Nutzer zu beurteilen. Die kurzen Lösungszeiten sind automatisierte bekannte Routen, keine erwarteten Erstspielzeiten.

Die folgenden Abschnitte dokumentieren frühere Versionen. Die Veröffentlichung von 0.6 erhält einen gesonderten Dateivergleich unter `release/deployment-verification-v0.6.0.json`.

---

# Lathmar: Emerald Hollows 0.5.2 – ausgewählte Laufanimation A

Stand: 18. Oktober 2026. Vom Nutzer ausgewählter Entwurf A für seitliche Laufposen integriert. Links wird jede Rechts-Pose gespiegelt, ohne die Bildfolge umzudrehen. 240 ms pro Pose bleiben erhalten.

- Pixelprüfung: alle vier Rechtsposen entsprechen A, alle vier Linksposen dessen Spiegelung. Vorder-/Rückansicht pixelgleich zum bisherigen Atlas; Hackenanimation bytegleich. Nachweis: `artifacts/miner-selected-verification.json`.
- TypeScript und Produktionsbuild erfolgreich.
- Chrome 1280 × 720: tatsächliche Posenwechsel mit 249/234 ms gemessen; Pause friert die Phase ein. Linksbewegung mit Frames 4–7 geprüft, Spielansicht aufgenommen.
- Keine Level-, Regel-, Server- oder Punkteänderung. Die weitergehenden Prüfungen unten sind frühere Ergebnisse. Keine neue vollständige Geräteprüfung oder Mediengenerierung.

Die Veröffentlichung erhält den Dateivergleich `release/deployment-verification-v0.5.2.json`.

---

# Lathmar: Emerald Hollows 0.5.1 – Prüfbericht

Stand: 18. Oktober 2026. Lauf- und Grabeposen wechseln jetzt alle 240 ms (vier Posen: 0,96 Sekunden). Der Wert 180 ms in 0.5 war eine gestalterische Testeinstellung, kein empirisch ermitteltes Optimum. Die Sichtung des vorhandenen Spritebogens zeigt insbesondere seitlich zu ähnliche Beinposen; 240 ms verbessert die Betrachtungszeit, ersetzt aber keine neu gezeichnete Schrittfolge.

## In 0.5.1 tatsächlich geprüft

- 80 Vitest-Tests bestanden, TypeScript und Produktionsbuild erfolgreich.
- Alle zehn Lösungsreplays und die alternative Felsfallenlösung von Level 10 bestehen; Karten und Spielregeln wurden nicht verändert.
- Chrome 1280 × 720, DPR 1, Entwicklungsbuild: drei Posenwechsel aufgezeichnet, Abstände 233 und 250 ms. Die Abweichung vom Sollwert entsteht durch die Ausgabe in Renderframes. Ein Richtungswechsel wird bei der Messung nicht als zusätzlicher Posenwechsel gezählt.
- Pause hält die Animationsphase an. Skript: `tools/browser-animation-v051.js`.
- README vollständig ins Englische übersetzt. Der 20-Level-Entwurf ist ausdrücklich als noch nicht freigegeben gekennzeichnet.

Kein neuer physischer Mobilgerätetest und keine erneute vollständige Layoutprüfung. Keine Mediengenerierung, keine Serveränderung und keine öffentlichen Testeinsendungen. Die subjektive Beurteilung des langsameren Miners bleibt beim Nutzer. Nach Veröffentlichung dokumentiert `release/deployment-verification-v0.5.1.json` den Vergleich der ausgelieferten Dateien mit dem Site-Commit.

---

# Lathmar: Emerald Hollows 0.5.0 – Prüfbericht

Stand: 18. Oktober 2026. Änderungen betreffen Darstellung, Fußbereich, Hinweisgeber und den Erklärungstext der Rangliste. Level, Regeln, Bewegungstempo und Server bleiben unverändert.

## Automatisiert

- 80 Vitest-Tests bestanden; TypeScript und Produktionsbuild erfolgreich.
- Alle zehn zeitgebundenen Lösungen und die alternative Level-10-Felsfalle bestehen erneut, einschließlich identischer Endzustände bei 30/60/144 Render-FPS.
- Die gespeicherten Karten- und Replay-Prüfsummen bleiben erhalten.
- Die transparente Pseudodrachen-Grafik ist lokal gespeichert und im Offline-Cache enthalten.

## Tatsächlich im Browser geprüft

| Umgebung | Ergebnis |
|---|---|
| Chrome 1280 × 720, DPR 1 | größere Fußschrift, 120-Level-Hinweis, bereinigter Ranglistentext, Drache in Aufgaben- und Hinweisbox, EN/DE erfolgreich |
| Edge 1920 × 1080, DPR 2 | dieselben Prüfungen erfolgreich |
| Chrome-Touchemulation 390 × 844, DPR 3 | keine horizontale Überbreite; lange Hinweise und Schaltflächen erreichbar |
| Chrome-Touchemulation 844 × 390, DPR 3 | lange Box bleibt im sichtbaren Bereich und lässt sich intern zu den Schaltflächen scrollen |
| Reduzierte Bewegung | Drachenbewegung deaktiviert |
| Hinweis geöffnet | Countdown bleibt stehen |
| Miner im Entwicklungsbuild | drei tatsächliche Posenwechsel beobachtet; gemessene Abstände 183/183 ms; Pause hält die Animationsphase an |

Der geplante Abstand pro Pose beträgt 180 ms statt bisher 100 ms. Der vierteilige Zyklus dauert damit 0,72 statt 0,4 Sekunden. Die Spielfigur bewegt sich weiterhin nach dem bisherigen 100-ms-Regeltakt. Die Beobachtung im Entwicklungsbuild erfasst echte Renderer-Aufrufe; ein erster Prüfansatz importierte versehentlich eine andere Vite-Modulinstanz und wurde korrigiert.

Skripte: tools/browser-v05.js und tools/browser-animation-v05.js. Screenshots: output/playwright/v05-*.png. Kompakte Übersicht: artifacts/visual-review-v0.5.webp. Die lange Querformatbox wurde zusätzlich separat geprüft. Eine physische Handyprüfung ist in dieser Version nicht erfolgt.

## Medien und Feedback

Der Pseudodrache ist eine neue Runway-Illustration, angeregt durch die vom Nutzer bereitgestellte Referenz. Ein CSS-Zyklus bewegt das Porträt dezent; es ist keine Folge neu gezeichneter Körperposen. Zwei Bildversuche scheiterten intern. Die erfolgreiche Illustration und Freistellung kosteten netto 21 Credits, laut Kontoständen 2615 → 2594. Projektgesamt: **160 / 1000 Credits**. Prompts, Aufträge und Verarbeitung: artifacts/guide-production-v0.5.json und docs/MEDIEN.md.

Das Komplexitätsniveau von Level 10 wurde vom Nutzer ausdrücklich positiv beurteilt. Der neue Hinweisgeber und die verlangsamte Animation benötigen noch seine gestalterische Rückmeldung.

## Rangliste und Veröffentlichung

Der öffentliche Satz über automatisch erzeugte Lösungen wurde in beiden Sprachen entfernt. Turnstile wurde recherchiert und in docs/RANGLISTENSCHUTZ.md eingeordnet; es ist nicht aktiviert. Keine Servermigration, keine Änderung an Rekorden, keine öffentlichen Testeinsendungen.

Produktionsprüfung und Commitkennungen werden nach Veröffentlichung in release/deployment-verification-v0.5.json festgehalten. Die weitergehenden Prüfungen von 0.4 stehen in PRUEFBERICHT-0.4.md; sie werden hier nicht als neu durchgeführt ausgegeben.
