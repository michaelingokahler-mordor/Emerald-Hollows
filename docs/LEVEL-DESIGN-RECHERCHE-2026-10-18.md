> Aktualisierung 0.7: Die größere Fassung von 11–20 ist implementiert. Verbindliche aktuelle Karten und Lösungen stehen in [LEVELS-UND-LOESUNGEN.md](LEVELS-UND-LOESUNGEN.md), gemessene Zeiten und Prüfgrenzen im [Prüfbericht](PRUEFBERICHT.md). Frühere Kartenbeschreibungen und Zeitprognosen unten bleiben als Entwurfshistorie erhalten.

# Von der Mechanikübung zur vollständigen Höhle

Stand: 18.10.2026. Recherche und Ausbauvorschlag zur veröffentlichten Version 0.6.0, Quellstand `caf4972a965ed59c2c875a079508e55713717475`. Noch keine geänderten Spielkarten und keine Veröffentlichung dieses Entwurfs.

## Befund

Die Kritik trifft zu: Kapitel 2 besteht überwiegend aus kurzen, isolierten Mechanikübungen. Große Außenmaße täuschen über die geringe nutzbare Fläche hinweg. Zusätzliche Edelsteine fehlen nicht nur als Belohnung, sondern als Anlass, eine günstige Route durch mehrere Kammern zu planen.

Die öffentliche Rangliste enthielt beim Abruf unter allen 20 Leveln ausschließlich den Namen **Mufti999**. Die Zuordnung zum Nutzer ergibt sich aus dem Gespräch, wurde aber nicht über eine Anmeldung bestätigt. Kapitel 2: Mittelwert **17,74 Sekunden**, Median **15,55 Sekunden**. Level 14–20: Mittelwert **19 Sekunden**. Level 01–09: Mittelwert **7,23 Sekunden**. Level 10 fällt mit **60,8 Sekunden** deutlich heraus.

Die Bestzeit misst einen erfolgreichen aktiven Simulationsdurchlauf. Fehlversuche, Pausen und das Lesen außerhalb der laufenden Simulation sind darin nicht enthalten. Sie ist weder die gesamte Lernzeit noch ein Nachweis einer optimalen Lösung. Auch unsere automatisierten Lösungsreplays sind nicht als optimal bewiesen.

### Messwerte

„Felder“ zählt Zeichen im Anfangsraster außer `#` und `X`: Erde, Gänge, Objekte und Start/Ausgang. Das ist eine konservative Näherung für ausbaubare Spielfläche, keine Erreichbarkeitsanalyse. Separat definierte Geräte und offene Tore auf Mauergrund werden dabei nicht mitgezählt. „Funde“ zählt tatsächlich gesammelte Kristallobjekte im vorhandenen erfolgreichen Testreplay; Quotenpunkte sind davon verschieden.

| Level | Außenmaß | Felder | Quote | Bestzeit Mufti999 | Testreplay | Funde im Replay |
|---|---:|---:|---:|---:|---:|---:|
| 01 | 18 × 12 | 137 | 8 | 6,6 s | 3,6 s | 6 |
| 02 | 22 × 14 | 97 | 10 | 4,5 s | 2,8 s | 4 |
| 03 | 24 × 16 | 84 | 12 | 5,3 s | 3,1 s | 4 |
| 04 | 28 × 18 | 109 | 15 | 4,8 s | 4,2 s | 5 |
| 05 | 28 × 18 | 122 | 12 | 5,2 s | 4,6 s | 4 |
| 06 | 26 × 18 | 121 | 9 | 10,8 s | 4,6 s | 3 |
| 07 | 28 × 18 | 78 | 9 | 11,0 s | 6,6 s | 3 |
| 08 | 30 × 20 | 91 | 12 | 8,3 s | 4,6 s | 4 |
| 09 | 28 × 19 | 75 | 5 | 8,6 s | 4,2 s | 3 |
| 10 | 40 × 26 | 168 | 30 | 60,8 s | 8,9 s | 10 |
| 11 | 30 × 20 | 37 | 9 | 10,8 s | 3,6 s | 3 |
| 12 | 36 × 22 | 46 | 9 | 12,9 s | 5,6 s | 3 |
| 13 | 32 × 22 | 46 | 5 | 20,7 s | 11,4 s | 3 |
| 14 | 32 × 22 | 69 | 6 | 14,7 s | 5,6 s | 2 |
| 15 | 26 × 20 | 33 | 4 | 10,5 s | 4,3 s | 2 |
| 16 | 32 × 22 | 31 | 9 | 7,3 s | 4,1 s | 3 |
| 17 | 34 × 24 | 59 | 9 | 22,8 s | 8,0 s | 3 |
| 18 | 32 × 22 | 99 | 9 | 27,5 s | 6,4 s | 4 |
| 19 | 30 × 20 | 41 | 5 | 16,4 s | 7,1 s | 3 |
| 20 | 44 × 28 | 92 | 18 | 33,8 s | 12,8 s | 6 |

Quelle: [öffentliche Ranglisten-API](https://emerald-hollows-api.emerald-hollows.workers.dev), Abrufnachweis in [leaderboards-research-2026-10-18.json](../artifacts/leaderboards-research-2026-10-18.json). Karten- und Replaydaten: [level-design-audit-2026-10-18.json](../artifacts/level-design-audit-2026-10-18.json).

Besonders deutlich: Level 14 endet nach zwei Diamanten. In Level 20 sind nur etwa 7,5 % des gesamten Rasters keine feste Mauer. Der bekannte Testweg enthält lediglich 80 Bewegungen. Die Mechaniken funktionieren, aber die Höhle dazwischen fehlt.

## Was die klassischen Karten zeigen

### Boulder Dash

Die rekonstruierten C64-Kartendaten zeigen einen Rahmen von 40 × 22 Feldern. Cave A verteilt die Aufgabe auf breite Streifen; Cave B verbindet mehrere Räume; Cave C nutzt ein Labyrinth. Cave I verlangt auf der ersten Schwierigkeitsstufe 75 Diamanten. Das gemeinsame Prinzip ist eine ausgedehnte Sammelaufgabe, deren Weg durch Felsen und Raumaufteilung interessant wird. Diese Auswertung stammt aus rekonstruierten Daten; der Autor weist selbst auf mögliche Dekodierfehler hin. [Dekodierte Kartendaten von Peter Broadribb, bereitgestellt von Jake Gordon](https://jakesgordon.com/writing/javascript-boulderdash/decoded_cave_data.pdf).

Das Handbuch beschreibt unterschiedliche Höhlenaufgaben und zusätzliche Punkte für Edelsteine über der Quote. Die Quote muss also nicht immer sämtliche vorhandenen Edelsteine erzwingen. Für unser zeitbasiertes Ranking ist aber die Auswahl zwischen mehreren ausreichenden Sammelrouten wichtiger als ein reiner Punktebonus nach Erreichen der Quote. [Transkription des Boulder-Dash-Handbuchs](https://www.abandonwaredos.com/docawd.php?idg=1016&sf=boulderdashmanual.txt&sg=Boulder+Dash&st=manual).

### Emerald Mine

Die Kartenansichten des als Kingsoft 1987 gekennzeichneten Originals zeigen bereits früh eine weitgehend genutzte Gesamtfläche: unregelmäßige Erdkammern in Level 0, lange verbundene Streifen in Level 1, ein dichtes Raster aus Kammern in Level 12. Edelsteine liegen räumlich verteilt. Die Quellenbilder wurden zur Analyse betrachtet; sie werden nicht als eigene Level übernommen. [Originalspiel im Emerald-Mines-Archiv mit Kartenansichten](https://emeraldmines.net/default.asp?action=detail&id=105&p=downloads).

Der ergänzende Lösungsführer beschreibt für Level 0 zehn benötigte Smaragde in verteilten Bereichen bei 200 Sekunden Zeitlimit; für Level 12 zwanzig Quotenpunkte in einem Raumlabyrinth bei ebenfalls 200 Sekunden. Das sind Zeitlimits, keine gemessenen Spielzeiten. Die redaktionellen Kartenabbildungen wurden teilweise im Rocks’n’Diamonds-Editor rekonstruiert, nicht direkt auf einem Amiga aufgenommen. [Levelbeschreibungen](https://strategywiki.org/wiki/Emerald_Mine/Level_0-20), [Herkunft einer Kartenabbildung](https://strategywiki.org/wiki/File:EmeraldMine_Level01.png).

Als vorsichtiger Plausibilitätscheck: In der nach Punkten sortierten Rocks’n’Diamonds-Rangliste steht beim ersten Eintrag zu Emerald Mine Level 001 eine Spielzeit von 38 Sekunden, zu Level 032 eine von 2:47 Minuten. Andere Einträge dauern länger. Das sind andere Enginebedingungen und keine reine Zeitrekordliste; daraus lassen sich keine verbindlichen Zeiten für unser Spiel ableiten. Wohl aber passt die Mischung aus kurzen Einstiegen und späteren Minuten-Höhlen. [Level 001](https://api-dev.artsoft.org/levels/view/25001), [Level 032](https://api-dev.artsoft.org/levels/view/26621).

## Neue Leitlinie für jedes Zehnerkapitel

1. **Position 1–3: Regeln lernen.** Übersichtliche Einführungen, sichere Beobachtungsplätze, dann eine kurze Anwendung. Bereits hier einige räumlich verteilte Funde.
2. **Position 4–6: vollständige Sammelhöhlen.** Die bekannte Mechanik hilft beim Erschließen der Karte. Mehrere Lagerstätten, Querverbindungen und eine echte Entscheidung über die Sammelreihenfolge.
3. **Position 7–9: Folgen und Kombinationen.** Eine Handlung verändert einen späteren Rückweg; mehrere bekannte Rätsel liegen in einer zusammenhängenden Höhle. Gefährlicher kurzer und sicherer längerer Weg sind beide tatsächlich spielbar.
4. **Position 10: Kapitelprüfung.** Mehrere Teilgebiete und Abhängigkeiten ohne neue Grundregel. Ein großzügiges Zeitlimit erlaubt Lernen; ein schneller Rekord verlangt eine gute Gesamtplanung.

Für Kapitel 2 müssen Einführungen deshalb vorgezogen werden: **11** Hebel, Tore und ein sicherer Versuch mit gegensinnigen Toren; **12** Links-/Rechtskäfer und anschließend ein geschütztes beobachtbares Treffen; **13** dosierter Steinabwurf, angewandt auf die bereits bekannte Fusion. Die zwei Schritte in 12 werden räumlich und mit kurzen Hinweisen getrennt. 14 und 15 führen dann keine neue Bedienregel mehr ein.

Dasselbe Prinzip gilt rückwirkend für Kapitel 1: 04–09 erhalten größere Sammelräume; Spezialaufgaben wie Einsperren bleiben eingebettet. Soll „nach Position 3 keine neue Grundregel“ auch dort strikt gelten, muss der Kristallkäfer aus 09 zuvor gezeigt werden. Die Einführungen 01–03 dürfen dabei nicht überladen werden; das ist beim anschließenden Kapitel-1-Umbau gesondert zu ordnen. Level 10 bleibt die vom Nutzer bestätigte Komplexitätsreferenz.

## Zeitziele und Umfang

Die bisherige Planung nennt für spätere bekannte Lösungen überwiegend 3–8 Minuten. Kapitel 2 liegt aktuell um eine Größenordnung darunter: 3 Minuten entsprechen rund dem **10-Fachen**, 8 Minuten rund dem **27-Fachen** seines mittleren Nutzerrekords. Ein paar zusätzliche Steine reichen nicht.

Bei 100 ms pro Schritt schafft die Figur theoretisch zehn Felder pro Sekunde. Drei Minuten reine Bewegung wären 1.800 Schritte, acht Minuten 4.800. Mehr Außenmaß allein garantiert diese Dauer nicht. Größere nutzbare Flächen, mehrere Sammelgebiete, sinnvolle Zustandswechsel und räumliche Konsequenzen müssen zusammenwirken. Künstliche Wartephasen, leere Umwege und eine langsamere Steuerung sind keine geeigneten Füllmittel.

Die folgenden Bereiche sind **Entwurfsziele für einen zügigen menschlichen Durchlauf mit bekannter Lösung**, keine berechneten Mindestzeiten und keine Zusage über spätere Weltrekorde. Im zweiten Kapitel steigen sie auf 3–6 Minuten; die obere Spanne bis acht Minuten bleibt späteren Kapiteln vorbehalten. Das ursprüngliche Ziel wird damit nicht auf die ersten drei Einführungen angewandt. Ob die Ziele bei unserem Tempo Spaß machen, muss ein Pilot zeigen.

| Level | Heute | Vorgeschlagene Höhle | Sammelumfang / Quotenpunkte | Zielzeit |
|---|---:|---|---|---:|
| 11 – Das erste Tor | 10,8 s | 32 × 22; 120–180 nutzbare Felder; zwei kleine Sammelkammern und Torversuche | 10–14 tatsächliche Funde / Quote 16 | 30–45 s |
| 12 – Die zweite Runde | 12,9 s | 36 × 24; 180–260 Felder; zwei Umlenkungen, danach geschütztes Treffen | 14–20 Funde / Quote 22 | 45–75 s |
| 13 – Ein kostbares Treffen | 20,7 s | 40 × 26; 250–350 Felder; Steinspender sicher erproben, anschließend anwenden | 18–24 Funde / Quote 28 | 60–90 s |
| 14 – Wechselverkehr | 14,7 s | 48 × 30; 500–650 Felder; vier Lagerstätten, gekoppeltes Torpaar und Ringwege | 24–32 Funde / Quote 36 | 120–180 s |
| 15 – Stein für Stein | 10,5 s | 48 × 32; 550–750 Felder; Abwurfkammer plus drei normale Sammelgebiete | 28–38 Funde / Quote 42 | 150–210 s |
| 16 – Der Besucher | 7,3 s | 50 × 32; 600–800 Felder; Käfer aus einem mehrfach genutzten Hauptgang dauerhaft entfernen | 32–42 Funde / Quote 48 | 150–210 s |
| 17 – Der Rückweg | 22,8 s | 52 × 34; 700–950 Felder; verzweigte Expedition mit vorbereitetem Rückweg | 36–48 Funde / Quote 56 | 180–240 s |
| 18 – Der lange oder der kurze Weg | 27,5 s | 56 × 34; 800–1.050 Felder; mehrere kombinierbare sichere/gefährliche Teilrouten | 40–54 Funde / Quote 64 | 180–240 s |
| 19 – Das richtige Treffen | 16,4 s | 56 × 36; 900–1.150 Felder; Fusion/Abwurf als eine Station einer umfangreichen Sammelrunde | 44–60 Funde / Quote 72 | 180–300 s |
| 20 – Das alte Förderwerk | 33,8 s | 64 × 40; 1.100–1.400 Felder; fünf Teilgebiete, zwei zentrale Verbindungen, mehrere Rückwege | 50–70 Funde / Quote 84 | 240–360 s |

„Nutzbar“ ist hier ein Bauziel einschließlich grabbarer Erde; im fertigen Prototyp wird zusätzlich die tatsächliche Erreichbarkeit je Mechanismuszustand geprüft. Fundzahlen bezeichnen geplante erfolgreiche Routen, nicht die gesamte Zahl platzierter Kristalle. Die genaue Mischung aus Smaragden und Diamanten muss jeweils rechnerisch zur Quote passen.

Ab 14 entspricht das grob **7–26-mal mehr sinnvoller Fläche** und **6–20-mal mehr tatsächlichen Sammelhandlungen** als heute. Diese Faktoren sind ein Größenvergleich, keine lineare Formel für Spielzeit. Ein Testreplay, das den umgebauten Level weiterhin in zwanzig Sekunden abräumt, würde das Designziel klar verfehlen.

## Pilot: Level 14 als zusammenhängende Sammelhöhle

Ein zentraler Knoten verbindet vier verschiedenartige Lagerstätten. Ein kurzer lokaler Torwechsel ist bekanntes Werkzeug, nicht der ganze Level. Start und Ausgang liegen am Knoten; neue Querverbindungen erlauben Rundwege statt vier identischer Hin-und-zurück-Ausflüge.

| Gebiet | Angebot | Entscheidung |
|---|---|---|
| Westliche Wurzeln | 14 Smaragde = 14 Punkte | Sicheres, weit verzweigtes Graben; große Ausbeute, längerer Weg |
| Östliche Felsbank | 7 Smaragde + 2 Diamanten = 13 Punkte | Kompakter, aber mehrere kontrollierte Fallstellen |
| Obere Galerie | 10 Smaragde + 2 Diamanten = 16 Punkte | Torzustand und Zugang vom Westbogen berücksichtigen |
| Untere Werkstatt | 7 Smaragde + 1 Diamant = 10 Punkte | Mit bekanntem Käferverhalten schneller zu erreichen |

Insgesamt **53 Punkte bei Quote 36**, also rund 47 % Überschuss. Keine einzelne Kammer und kein Paar genügt; der Spieler muss mindestens drei Gebiete nutzen. Alle vier Dreierkombinationen reichen aus: West/Ost/Oben = 43, West/Ost/Unten = 37, West/Oben/Unten = 40, Ost/Oben/Unten = 39. Ihre Wegkosten unterscheiden sich. Der Überschuss schafft Auswahl. Innerhalb der dritten Kammer muss man nicht alles mitnehmen.

Wichtig: Die Quotenrechnung allein ist noch kein Rätsel. Die Karte muss mindestens zwei vernünftige Reihenfolgen anbieten, erkennbare Querverbindungen haben und die Torstellungen auf den Rückweg wirken lassen. Beim Bau werden Zeiten für eine sichere Runde, eine riskante Abkürzung und eine optimierte Mischroute aufgezeichnet.

## Besonderheiten der übrigen Ausbauten

- **15:** Der Vorrat ist eine endliche Ressource. Erfolgreiche Abwürfe erleichtern Zugänge in einem Teilgebiet; die anschließende Sammelrunde nutzt auch Fels- und Graberegeln. Kein isolierter Knopfdruck mit zwei Kristallen als Abschluss.
- **16:** Das Einsperren räumt eine Hauptverbindung dauerhaft frei. Diese Verbindung wird auf verschiedenen sinnvollen Rundwegen mehrfach gebraucht. Dadurch unterscheidet sich die Aufgabe von der nur vorübergehenden Umlenkung in 12.
- **17:** Der zunächst attraktive Weg verändert sich durch einen Felsabgang und eine Schaltung. Wer die Ablage und Rückverbindung vorher vorbereitet, spart einen Umweg.
- **18:** Nicht nur zwei feste Linien vom Start zum Ausgang. Drei Gebiete mit je einer sicheren und einer kürzeren gefährlichen Verbindung erlauben gemischte Strategien.
- **19:** Fusion und Abwurf bleiben vollständig am Bedienplatz sichtbar. Rundherum liegen weitere Fundstätten. Der Fusionsdiamant oder die dadurch erschlossene Kammer muss für mindestens einen zentralen Zugang nötig bleiben; reine Sammelüberschüsse dürfen die beabsichtigte Aufgabe nicht versehentlich entfernen.
- **20:** Das bestehende Zusammenspiel bleibt Grundlage. Jede mechanische Station erschließt einen größeren Höhlenabschnitt. Zurückliegende Gebiete erhalten neue Ausgänge; die Reihenfolge der Expedition und die Edelsteinauswahl entscheiden den Rekord.

## Runway statt gezeichneter Platzhalter

Ja: Die aktuellen Geräte werden in `src/mechanism-view.ts` mit Phaser-Grafikbefehlen gezeichnet. Das hält Zustände und Kennzeichnungen präzise, passt aber gestalterisch nicht ausreichend zum gemalten Atlas.

Neue Entwürfe verwenden gealtertes Eichenholz, blaugraues Eisen und Messing. Die [lokale Motivvorschau](../artifacts/mechanism-review/index.html) zeigt die Rohmotive groß und in kleinen Kachelgrößen. Produktionsprotokoll: [mechanism-production-01.json](../artifacts/mechanism-production-01.json).

Für die spätere Integration: Hintergrund entfernen, Hebelgrundplatte und beweglichen Arm sauber trennen, offene/geschlossene Tore auf identischer Position ausrichten. Torbuchstaben und Spenderfüllstand bleiben scharfe UI-Überlagerungen. Farbe allein darf die Zuordnung nicht tragen. Der Steinspender bekommt denselben Materialstil, sichtbaren Vorrat und eine klar erkennbare Ausgabe. Die Rohentwürfe sind noch keine fertigen transparenten Spielsprites oder Animationen.

## Umsetzung und Abnahme des nächsten Schritts

1. Zuerst **14 als Sammelpilot** und **20 als Kombinationspilot** bauen. Damit testen wir den eigentlichen Kritikpunkt, bevor alle Karten vergrößert werden.
2. Mindestens drei unterschiedliche erfolgreiche Routen pro Pilot aufzeichnen. Zusätzlich nach unbeabsichtigten Quotenabkürzungen suchen. Sichere Routen und schnelle Routen getrennt ausweisen.
3. Tatsächlich erreichbare Fläche, Fundzahl, Weglänge, Wartezeit und Mechanismusaktionen messen. Zeitziele anhand dieser Daten und menschlicher Durchläufe nachjustieren. Bei zu kurzen Zeiten mehr interessante Entscheidungen einbauen; wenn das nur mit Leerlauf gelingt, das Zeitversprechen offen korrigieren.
4. Apparaturen am Bedienplatz weiterhin vollständig sichtbar halten, auch auf Mobilgeräten. Große Höhlen dürfen scrollen; der kritische Abwurf darf nicht außerhalb des Bildes stattfinden.
5. Erst danach 11–13 neu ordnen und 15–19 entsprechend ausbauen. Hinweise auf Deutsch und Englisch, Replays und dokumentierte Lösungen mitführen.
6. Vor Austausch der Karten die v0.6-Definitionen archivieren. Bestzeiten werden nach Kartenrevision getrennt; alte Rekorde und Freischaltungen bleiben erhalten. Neue Rekorde dürfen nicht mit den kurzen Vorgängerkarten konkurrieren.

Der großzügige Countdown wird nach dem Pilot festgelegt, nicht aus den bisherigen 420/600 Sekunden übernommen. Als Startpunkt kann er etwa das Doppelte eines zügigen erfolgreichen menschlichen Durchlaufs erlauben; Übungsmodus bleibt ohne Zeitdruck. Menschliches Erstspiel und Rekordversuche werden zusätzlich getrennt beobachtet.

Diese Recherche bestätigt noch keine neuen Levelzeiten und ersetzt keinen Spieltest. Sie liefert überprüfbare Ausgangsdaten, eigene Designvorschläge und konkrete Kriterien für den nächsten spielbaren Ausbau.
