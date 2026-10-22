# Kapitel V: Die Seidenstollen — Umsetzung 0.12

Stand: 2026-10-22. Höhlen 41–50 und Regelversion emerald-hollows/7 sind implementiert. Der [Bauplan](KAPITEL-5-ENTWURF-41-50.md) beschreibt die Entscheidungen; dieser Bericht trennt tatsächliche Prüfungen von offenen menschlichen Rückmeldungen.

## Regeln und Bedienung

Spinnen bauen zusammenhängende Netzspuren auf freien Wegen. Schritte im selben Netz verraten ihren Ort. Netze verdoppeln die Bewegungskosten des Miners und sämtlicher Käfertypen; Spinnen bleiben unbeeinträchtigt.

Gefressene Käfer werden Kokons mit 15 Sekunden Reifezeit. Im Kokon läuft kein Käfercountdown. Hackenbefreiung setzt die ursprüngliche Figur drei Sekunden betäubt frei; danach beginnen Warnzeiten neu. Feuer vernichtet Kokon und Beute ohne Rubin. Schlüssel bleiben erhalten.

Fackeln werden ab 43 in jeder Höhle neu erschlossen. E oder die Touchtaste wechselt zwischen Hacke und Fackel. Mit Fackel kann der Miner auch durch Betreten keine Erde abbauen. Sie entzündet angrenzende Netze, schützt aber nicht vor Gegnerkontakt. Ein Netzfeld brennt zwei Sekunden und zündet nach einer Sekunde seitliche Nachbarn. Jede getötete Spinne hinterlässt einen Rubin mit zwei Kristallpunkten.

Eigene Vektorgrafik zeigt Spinnenbewegung, Netzimpulse, Kokonreife, Betäubung, Fackel, Rubine und wanderndes Feuer. Die Explosion verwendet acht eigene Bilder über sechs Simulationstakte (600 ms). Die [Referenzrecherche](EXPLOSIONEN-REFERENZEN-2026-10-22.md) beschreibt die Vorbilder; ihre Grafiken wurden nicht kopiert. Es wurden keine neuen bezahlten Medien erzeugt.

## Karten und gemessene Lösungen

Die ersten drei Höhlen führen ein. Danach unterscheiden sich Aufgaben und Verbindungen; der größere äußere Rahmen wird nicht als Beleg für Spielspaß oder längere menschliche Spielzeit verwendet. Alle folgenden Zeiten sind automatische, erfolgreiche Normalspiel-Durchläufe. Sie sind weder menschliche Erstspielzeiten noch Optimalitätsbehauptungen.

| Höhle | Rahmen | Aufgabe | Referenz | Quote / erreicht | Limit |
|---|---|---|---|---|---|
| 41 Die ersten Fäden | 28 × 20 | Netzimpuls erzeugen, Spinne umlenken, freien Bogen für die Sammlung nutzen. | 8.2 s | 8 / 12 | 30 s |
| 42 Fünfzehn Sekunden | 32 × 22 | Käfer und Spinne verbinden; retten oder den späteren Nachwuchs umgehen. Beide Folgen sind aufgezeichnet. | 8.6 s | 9 / 12 | 85 s |
| 43 Feuer in den Fäden | 36 × 24 | Fackel freigraben, Werkzeug wechseln, zwei getrennte Brandbereiche bedienen. G1 bietet eine echte Käferexplosion als erste Zündung. | 34.8 s | 12 / 17 | 100 s |
| 44 Drei Adern, drei Gefahren | 40 × 28 | Zwei von drei verschieden gebauten Adern wählen. Jede Paarung ist gelöst; ein einzelner Bezirk reicht auch mit allen Gegnerfunden nicht. | 28.1 s | 26 / 30 | 80 s |
| 45 Der brauchbare Käfer | 44 × 30 | Helfer bis zum Durchbruch erhalten. Ein Kokon kann gerettet werden; der neue Stollen verändert Steinunterstützung und Rückweg. | 38.0 s | 18 / 21 | 110 s |
| 46 Der Schlüssel im Gespinst | 48 × 32 | Schlüssel aus der vernetzten Bahn bergen. Ein nach dem Schlüsselzugriff gelandeter Fels muss für den weiteren Weg versetzt werden. | 41.3 s | 18 / 25 | 120 s |
| 47 Die Feuerinseln | 52 × 34 | Mit Toren Brandäste trennen und brauchbare Netzbremsen erhalten. Sammlung und Rückweg benutzen verschiedene Inseln. | 48.2 s | 24 / 26 | 140 s |
| 48 Nachschub für die Spinnen | 56 × 36 | Endlichen Pitvorrat steuern. Der zunächst geschlossene Auslass verhindert Rückwärtsflucht vor der Grabearbeit; der Rückweg öffnet erst jenseits des Durchbruchs. | 39.5 s | 25 / 33 | 115 s |
| 49 Das geteilte Revier | 60 × 38 | Zwei Schlüssel und zwei Reviere verbinden. Bei Quote 29 reichen 25 platzierte Punkte plus ein weißer Diamant nicht: Spinnenbeute hat eine tatsächliche Aufgabe. | 55.1 s | 29 / 29 | 165 s |
| 50 Das Herz der Seidenstollen | 64 × 40 | Ersten Durchbruch sichern, Sonnenwache und optionalen Pit vorbereiten, Brandwege trennen und durch die veränderte Mine zur Mondtür zurückkehren. | 61.3 s | 32 / 34 | 185 s |

Die Limits stammen aus dreifachen Referenzzeiten, abgerundet auf fünf Sekunden. 41 hat mindestens 30 Sekunden für die Einführung. 42 verwendet die vollständige Schlüpfdemonstration als Referenz, damit Beobachtung der 15 Sekunden nicht den Versuch entwertet. Übung bleibt ohne Levelcountdown.

## Tatsächlich geprüfte Alternativen

| Höhle | Variante | Zeit | Kristallpunkte | Wirkung |
|---|---|---|---|---|
| 42 | rescue | 17.2 s | 12 | 1 gerettet, 0 geschlüpft, 0 Spinnen beseitigt |
| 42 | hatch | 29.4 s | 12 | 0 gerettet, 1 geschlüpft, 0 Spinnen beseitigt |
| 43 | blast | 43.3 s | 14 | 0 gerettet, 0 geschlüpft, 2 Spinnen beseitigt |
| 44 | west | 16.5 s | 29 | 0 gerettet, 0 geschlüpft, 0 Spinnen beseitigt |
| 44 | east | 35.4 s | 30 | 0 gerettet, 0 geschlüpft, 1 Spinnen beseitigt |
| 48 | expanded | 56.8 s | 33 | 0 gerettet, 3 geschlüpft, 1 Spinnen beseitigt |
| 49 | south | 51.3 s | 29 | 0 gerettet, 0 geschlüpft, 2 Spinnen beseitigt |
| 50 | pitFirst | 78.7 s | 34 | 0 gerettet, 1 geschlüpft, 4 Spinnen beseitigt |

Jede Variante ist als eigener Replay unter public/replays enthalten und über die Höhlenübersicht abrufbar. Bei den zehn Hauptrouten wurden zusätzlich ein und zwei anfängliche Leertakte geprüft. In 50 verändern diese Phasen die Gegnerlage deutlich: Die geprüften Lösungen dauern dort 91.8 s und 91.8 s. Der Miner weicht während eines Brandes bei unmittelbarer Gefahr aus. Ein fester günstiger Starttakt wird nicht vorausgesetzt.

## Gegenprüfungen und Bestandsschutz

- Alle vierzig bisherigen Karten-Hashes bleiben erhalten. Deren aktuelle und archivierte Replay-Prüfungen bestehen weiter; keine Ranglistendaten werden gelöscht oder migriert.
- 44 besitzt je 14 platzierte Punkte in drei Gebieten. Ein beliebiger einzelner Bezirk plus die konservativ höchstens elf zusätzlichen Kristallpunkte aus Gegnern bleibt unter 26; jedes Paar reicht. Der separate Gegnerbonus zählt dabei nicht zur Quote.
- 45, 48 und 50 benötigen echte Grabearbeit. Optimistische Erreichbarkeit ignoriert bewegliche Hindernisse und öffnet andere Geräte, behält aber Rückwegtore, deren Bedienseite selbst noch unerreichbar ist. Auch diese Bedienseiten werden separat geprüft.
- 46 und 50 besitzen notwendige Sonnenzugänge. Die Mondtüren in 49 und 50 schützen ummauerte Ausgänge. Ein früherer Schacht- und ein Portal-/Rückweg-Bypass wurden vor Auslieferung entfernt.
- 49 erreicht seine Quote selbst mit sämtlicher platzierter Beute und dem weißen Diamanten nicht ohne Spinnenfunde. In 50 bleibt auch die konservative Summe aller Außenfunde und endlichen Gegner-/Pitbelohnungen unter der Quote; der Hauptabbau bleibt nötig.
- Aufgezeichnete Gegenläufe lassen Hebel und Brandaktionen aus. Sie ergänzen die Erreichbarkeits- und Mengenprüfungen; sie beweisen nicht die Abwesenheit jeder denkbaren Alternativlösung.
- Alle Pits haben endlichen Vorrat. Wiederanschalten füllt ihn nicht auf. Kokons und Spinnen verschwinden nicht beim Abschalten.

Die vollständige Kapitelvergleichstabelle steht im Bauplan. Erfolgreiche Alternativen werden zugelassen; es gibt keine unsichtbaren Pflichtflags für einzelne Lösungen.

## Technische Abnahme

- **626 Tests bestanden**, 0 fehlgeschlagen. Darunter Kokonreife, frischer Countdown nach Betäubung, Befreiung am Reifetakt, Schlüssel, Fressen, Brandfront, Tortrennung, Physik, Ausrüstung und historische Durchläufe.
- **18 Replay-Varianten:** Normalspiel, erneut abgespielt, JSON-Zwischenspeicher fortgesetzt, 30/60/144-FPS-Taktpläne und serverseitige Abschnittsprüfung mit identischem Endzustand.
- **Lokale HTTP-API:** alle 18 neuen Varianten bestätigt, höchstens zehn Simulationstakte je Anfrage, alle zehn Ranglisten und Profilwiederherstellung geprüft. Die vollständige bestehende API-Prüfung einschließlich archivierter Versionen besteht ebenfalls.
- **Browser:** alle 18 Varianten auf Desktop und mit emulierter Touchbedienung bis zum bestätigten Ende; sichtbare Netze, Kokons, Betäubung und Brand, echte Tastatur-/Touch-Werkzeugaktionen, Grabsperre, Pause und Wiederaufnahme. Der Produktionsbuild wurde zusätzlich offline über den Service Worker fortgesetzt.
- **Worker-Paket und Web-Build:** erfolgreich gebaut. Bestehende verschlüsselte Backup-/Restore-Prüfung erfolgreich; keine produktive Datenbankwiederherstellung ausgeführt.

Belege: [Tests](../artifacts/tests-v012.json), [Lösungen und Abschnitte](../artifacts/spider-chapter-verification.json), [neue HTTP-Prüfung](../artifacts/spider-api-verification.json), [bestehende HTTP-Prüfung](../artifacts/api-verification.json), [Browser](../artifacts/browser-spiders-v012.json), [Backup](../artifacts/backup-verification.json). Lokale Laufzeiten sind keine Messung des produktiven Cloudflare-CPU-Kontingents.

## Veröffentlichung und offene Rückmeldungen

Der Web-Build kann mit einer älteren API betrieben werden: Neue Kapitelbeweise bleiben gespeichert, bis der Server Regel 7 meldet. Bestehende Kapitel synchronisieren weiter. Die Aktivierung öffentlicher Bestzeiten für 41–50 benötigt den Worker-Deploy; dessen tatsächlicher Veröffentlichungsstatus wird separat festgehalten.

Menschliche Erstspielzeiten, subjektive Schwierigkeit und physische Mobilgeräte sind noch nicht abgenommen. Browseremulation und automatische Lösungen ersetzen diese Rückmeldungen nicht. Dieser offene Feedbackstand ist keine Behauptung über bereits gesammelte Nutzerurteile.
