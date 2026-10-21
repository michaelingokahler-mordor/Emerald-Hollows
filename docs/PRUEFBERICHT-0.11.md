# Prüfbericht 0.11 — Käfer-Revision, Level 01–40

Stand: 21. Oktober 2026. 30 Karten verwenden Regeln v6; 01–04, 08, 11, 14, 17, 18 und 39 behalten Kartenhash, Zeitlimit und Rangliste. Alte Ergebnisse werden nicht gelöscht. Spinnen folgen erst mit einem gesonderten Entwurf für 41–50; DW in 25 bleibt versiegelt.

## Automatisierte Prüfung

- 467 Tests bestanden, 0 fehlgeschlagen. Regelkern, alte Ausführungsregeln, aktuelle Karten, Speicherung, Sprache, Punkte und Umgehungsversuche sind enthalten. [Vollständiges Testergebnis](../artifacts/tests-v011-final.json).
- Alle 40 Hauptlösungen und die angebotenen Alternativen gewinnen innerhalb ihrer tatsächlichen Frist. Jede wurde erneut abgespielt, als JSON-Zwischenstand fortgesetzt, bei 30/60/144 Render-FPS verglichen und vom Serverprüfer in Abschnitten bestätigt. [Messdaten](../artifacts/beetle-revision-verification.json).
- Alle 40 exakt veröffentlichten Replays der Version 0.10 bestehen weiterhin. Die lokale Wrangler/D1-HTTP-Prüfung nimmt sie entgegen: zehn erscheinen weiterhin aktuell, dreißig archiviert. Profilwiederherstellung, Manipulationsablehnung, Rangfolge Zeit vor Punkten und alte Timer-Kompatibilität bestehen. Keine öffentlichen Testprofile und keine Datenbankmigration. [API-Protokoll](../artifacts/api-verification.json).
- 120 von 120 Versuchen mit unterschiedlichen Startphasen gewinnen. Standardverzögerungen: 0/9/18/36 Sekunden; in 30: 0/11,4/20,4/36 Sekunden. Diese Versuche verwenden eine Laborfrist von 1.800 Sekunden, damit die Wartephase nicht mit der öffentlichen Frist verwechselt wird. Sie belegen Phasenverträglichkeit, keine zeitgebundenen Rekorde und keine Garantie für jeden Starttakt. [Phasentest](../artifacts/beetle-phases.json).
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
| 01 | 3.6 s | 3.6 s | 13 s | 8 |
| 02 | 2.8 s | 2.8 s | 9 s | 10 |
| 03 | 3.1 s | 3.1 s | 10 s | 12 |
| 04 | 4.2 s | 4.2 s | 9 s | 15 |
| 05 | 4.7 s | 4.7 s | 10 s | 12 |
| 06 | 10.6 s | 10.6 s | 30 s | 9 |
| 07 | 8.0 s | 8.0 s | 20 s | 9 |
| 08 | 4.6 s | 4.6 s | 16 s | 12 |
| 09 | 5.7 s | 5.7 s | 15 s | 5 |
| 10 | 15.7 s | 14.5 s | 40 s | 30 |
| 11 | 19.1 s | 19.1 s | 80 s | 22 |
| 12 | 21.5 s | 21.5 s | 60 s | 22 |
| 13 | 27.1 s | 27.1 s | 80 s | 28 |
| 14 | 28.0 s | 28.0 s | 65 s | 36 |
| 15 | 53.0 s | 53.0 s | 155 s | 36 |
| 16 | 48.6 s | 48.6 s | 145 s | 36 |
| 17 | 25.5 s | 25.5 s | 65 s | 38 |
| 18 | 41.8 s | 38.8 s | 135 s | 38 |
| 19 | 53.5 s | 53.5 s | 160 s | 41 |
| 20 | 33.4 s | 33.4 s | 100 s | 44 |
| 21 | 62.0 s | 62.0 s | 185 s | 48 |
| 22 | 54.0 s | 54.0 s | 160 s | 62 |
| 23 | 53.0 s | 53.0 s | 155 s | 52 |
| 24 | 38.1 s | 38.1 s | 110 s | 90 |
| 25 | 60.4 s | 60.4 s | 180 s | 62 |
| 26 | 71.5 s | 71.5 s | 210 s | 66 |
| 27 | 53.6 s | 53.6 s | 160 s | 56 |
| 28 | 58.5 s | 58.5 s | 175 s | 78 |
| 29 | 53.4 s | 53.4 s | 160 s | 68 |
| 30 | 91.4 s | 91.4 s | 270 s | 86 |
| 31 | 27.7 s | 27.7 s | 80 s | 24 |
| 32 | 35.9 s | 35.9 s | 105 s | 24 |
| 33 | 29.0 s | 29.0 s | 85 s | 25 |
| 34 | 104.6 s | 89.1 s | 265 s | 42 |
| 35 | 42.6 s | 42.6 s | 125 s | 33 |
| 36 | 53.3 s | 47.6 s | 140 s | 92 |
| 37 | 45.3 s | 45.3 s | 135 s | 34 |
| 38 | 50.5 s | 50.5 s | 150 s | 46 |
| 39 | 39.7 s | 39.7 s | 115 s | 46 |
| 40 | 75.6 s | 75.6 s | 225 s | 54 |

## Grenzen und Auslieferung

Spielgefühl, menschliche Lösbarkeit unter der kurzen Frist, Langzeitmotivation und ein echtes Telefon bleiben deiner Abnahme vorbehalten. Die automatischen Routen kennen die Karte; insbesondere 05/07/09 haben kurze Zeitfenster. Der Übungsmodus bleibt zum Beobachten verfügbar. Kein neuer Musik- oder Geräuschentwurf und keine menschliche Hörabnahme in dieser Revision. Bestehende Runway-Medien werden weiterverwendet, ohne neue Generierungskosten.

Der Server unterstützt alte und neue Beweise vor Veröffentlichung des Clients. Profile und Freischaltungen bleiben erhalten; es werden keine Ranglistenzeilen gelöscht. Quell- und Web-ZIP enthalten Regeln, Lösungen, Mediennachweise und diesen Bericht. Hashes und Paketprüfung stehen in release/SHA256SUMS.txt und release/package-verification.json. Ein vorhandener Service Worker übernimmt die neue Version nach Schließen aller alten Spielfenster und erneutem Öffnen.
