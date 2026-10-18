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
