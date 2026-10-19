# Die Torhallen — Kapitel 3 in Version 0.9

Umgesetzt am 18. Oktober 2026 nach dem freigegebenen [Entwurf](KAPITEL-3-PLAN-21-30.md). Zehn neue Hauptkarten, keine Geheimlevel. Die Kapitel-3-Erweiterung ändert keine älteren Regeln. Nach dem zusätzlichen Feedback vom 19. Oktober werden jedoch 15, 16, 18 und 19 überarbeitet und erhalten neue Kartenranglisten. Alte Definitionen bleiben für ausstehende Replays erhalten.

## Neue Regeln

`emerald-hollows/4` ergänzt Schlüssel und Portale. Die früheren Versionen bleiben für aktuelle und archivierte Replays verfügbar.

- Ein Sonnen- oder Mondschlüssel wird beim Betreten oder durch benachbartes Sammeln aufgenommen. Er zählt nicht zur Quote oder Punktewertung. Das HUD zeigt beide Bestände. Farbe und Symbol kennzeichnen die Zuordnung.
- Beim Versuch, eine passende verschlossene Tür zu betreten, wird genau ein Schlüssel verbraucht. Die Tür bleibt offen. Ein falscher oder fehlender Schlüssel bewirkt keine Bewegung und keinen Verbrauch. Ein Schlüssel kann nicht durch einen Felsen hindurch gesammelt werden.
- Gleiche Buchstaben kennzeichnen feste Portalpaare. Nur die Spielfigur reist beim Betreten; die Ankunft löst keine sofortige Rückreise aus. Der Miner muss die Tür verlassen und erneut betreten.
- Bei belegter Ankunft bleibt der Miner vor dem Eingang stehen. Auch ein Kristall blockiert die Ankunft. Steine und Gegner bleiben normale Objekte auf Portalflächen.
- Nach dem Transfer folgen im selben Takt die normalen Fall- und Gegneraktionen. Es gibt keine Unverwundbarkeit. Die Darstellung springt zum Ziel und zeichnet keinen Lauf quer durch Mauern.
- Schlüssel und geöffnete Türen gehören zum gespeicherten Replayzustand. Neustart setzt Inventar, Türen, Geräte und Portale vollständig zurück. Die Online-Prüfung verwendet denselben Regelkern.

## Kartenrollen und tatsächliche Zeiten

Alle Zeiten sind automatisch ausgeführte, zeitgebundene Lösungen. Sie enthalten weder menschliches Nachdenken noch menschliche Bedienungsfehler. Die kürzeren Varianten beenden Sammelabschnitte bei erfüllter Quote; sie sind keine optimalen Lösungen.

| Level | Karte / Quote | Tatsächliche Hauptentscheidung | Referenz | Schnellste getestete Variante |
|---|---|---|---:|---:|
| 21 | 44 × 32 / 48 | Zwei Schlösser sicher kennenlernen; den Zeitpunkt einer dauerhaften Querverbindung im Erzring wählen | 53,9 s | 40,5 s |
| 22 | 52 × 36 / 62 | Zwei getrennte Ufer über zwei Portalpaare zu einer Sammelreise verbinden | 52,4 s | 48,1 s |
| 23 | 48 × 34 / 52 | Erst einen Kristall, dann einen Felsen aus einer Ankunft räumen; Vorbereitung und Sammelrückweg verbinden | 51,3 s | 46,6 s |
| 24 | 56 × 38 / 90 | Einen einzigen Sonnenschlüssel für eine von zwei unterschiedlichen Minen ausgeben; gemeinsame Erzadern einbeziehen | 33,1 s | 30,5 s |
| 25 | 52 × 38 / 62 | Drei durch Portale verbundene Galerien ihren tatsächlichen Zugängen zuordnen; optional DW entdecken | 58,3 s | 56,6 s |
| 26 | 50 × 40 / 66 | Den gemeinsamen Schacht vorbereiten; der Abgang öffnet die Schlüsselnische und verändert den unteren Erzweg | 62,0 s | 54,1 s |
| 27 | 52 × 38 / 56 | Eine dauerhafte Verbindung zur Patrouille öffnen; Portale und Rückzugsrunden für wiederholte Sammlung nutzen | 43,1 s | 43,1 s |
| 28 | 56 × 40 / 78 | Obere und untere Besorgungen bündeln; Sonnen- und Mondschlüssel erzwingen beide Betriebszustände | 59,4 s | 58,4 s |
| 29 | 52 × 40 / 68 | Erst den oberen Zugang freischieben, dann die andere Arbeitsseite erreichen und den unteren Zugang öffnen | 54,2 s | 54,2 s |
| 30 | 58 × 44 / 86 | Vor dem Kernabbau den anderen Rückweg vorbereiten; notwendiger Abbau blockiert die Portalankunft | 91,0 s | 76,1 s |

**Summe:** Referenzen 558,7 Sekunden / **9:18,7**, gegenüber 282,5 Sekunden / **4:42,5** in Kapitel 2 **Version 0.8**: Faktor **1,978**. Schnellste bisher getestete Varianten: **8:28,2**, gegenüber den dokumentierten **4:31,0** aus Kapitel 2: Faktor **1,875**. Dieser zweite Vergleich ist keine Aussage über vollständig optimierte Rekorde. Die gewünschte Verdopplung menschlicher Spielzeit ist noch nicht gemessen.

Level 24 ist bewusst kürzer als sein ursprüngliches 50-Sekunden-Budget: Der östliche vollständige Weg dauert 45,3 Sekunden, der westliche 33,1 Sekunden. Die Unterschiede bleiben erhalten, statt den kürzeren Weg mit leeren Gängen zu verlängern. Der optionale Entdeckungsweg in 25 dauert 59,6 Sekunden und zählt nicht zur Referenzsumme.

## Gegenprüfungen und daraus entstandene Korrekturen

- **21:** Hinter den beiden Einführungsschlössern liegt der Zugang zur Mine. Die Ringstruktur ermöglicht keinen Einstieg ohne sie. Frühe und späte Öffnung der Querverbindung bleiben zulässige Alternativen.
- **22:** Der Ausgang liegt hinter dem Schloss, dessen Schlüssel auf dem anderen Ufer liegt. Eine hohe Quote allein ersetzt die Reise nicht.
- **23:** Ein belegtes Ziel verhindert den Transfer. Die äußere Vorbereitung bleibt ein normaler begehbarer Weg; es gibt kein verstecktes Pflichtflag für die spätere Nutzung der Abkürzung.
- **24:** Alle gemeinsamen frei zugänglichen Punkte reichen nicht. Beide gewählten Bezirke sind erfolgreich geprüft, aber der einzige Sonnenschlüssel öffnet nur einen. Das Ausgangsschloss verwendet den anderen Schlüsseltyp.
- **25:** Der Geheimhebel ist für den Hauptabschluss entbehrlich. Auch mit offener Vorraumtür bleiben Geheimtor und Kampagnenzweig gesperrt. Der Hauptausgang führt unverändert nach 26.
- **26:** Der Ausgangsschlüssel liegt physisch hinter dem zuerst blockierenden Felsen. Der wichtige Abgang kann nicht einfach durch zusätzliche Beute ersetzt werden. Die Stütze besteht aus Erde: Ein frei über einem leeren Schacht liegender Kristall würde nach den normalen Regeln sofort fallen. Graben durch Bewegung und benachbartes Graben sind beide gültige Auslöser; das Auslassen eines einzelnen Snap-Befehls beweist daher allein keine Umgehung.
- **27:** Die Portale auf der Startseite sind zunächst gesperrt und können die verschlossene Patrouillentür nicht umgehen. Ein geschützter Startzeitpunkt und eine zusätzliche Rückzugsrunde machen die Lösung über neun Startphasen reproduzierbar. Der Gegner bleibt lebendig. Ein Kill wird weder behauptet noch verlangt.
- **28:** Das obere Ausgangsschloss erhielt einen eigenen Endgang, nachdem eine Erreichbarkeitsprüfung einen Zugang von oben zeigte. Lokale Portale führen nicht am unteren Zustandswechsel vorbei. Zwei Schaltungen genügen für die Referenzlösung.
- **29:** Ein dritter unmittelbarer Schub würde das Portalrätsel auslassen. Das anfangs mit Erde belegte Arbeitsfeld auf der Gegenseite verhindert diesen Schritt. Die Gegenseite muss zuvor erreicht werden. Danach sind unterschiedliche Umstellungen des Felsens zulässig; der Referenzweg schiebt ihn zurück.
- **30:** Sämtliche Punkte außerhalb der Kernader bleiben unter der Quote. Nach dem Abbau sitzt der Fels auf der Portalankunft. Mit geschlossenem R besteht keine Verbindung zum Ausgang. Der erforderliche Zeitpunkt ist vor dem Kernabbau, nicht zwingend vor dem allerersten gefahrlosen Portalbesuch.

Die Tests kombinieren erfolgreiche Replays, veränderte Routen, ausgelassene Aktionen und Erreichbarkeits-/Quotenprüfungen. Eine umfassende mathematische Suche über alle dynamischen Spielzustände wurde nicht durchgeführt. Beabsichtigte alternative Lösungen gelten nicht als Fehler.

## Geheimzweig 25

Das DW-Vorzimmer kann über einen normalen Hebel geöffnet werden. Das eigentliche Tor ist sichtbar versiegelt; ein Kontakt zeigt die lokalisierte Erklärung, dass der Zweig später geöffnet wird. Es gibt weder G1-Platzhalter noch einen zweiten aktiven Abschluss oder eine vorgetäuschte Freischaltung.

Die bereits vorgemerkte Kampagnenstruktur bleibt **25 → G1 → … → G10 → 26**. Die zehn Geheimkarten, ihre Gegner, Fortschrittsübergänge und getrennten Ausgänge/Ranglisten werden separat besprochen und implementiert. Jetzt ist ausschließlich **25 → 26** aktiv.

## Medien und Prüfung

Die vorhandene Runway-Torgrafik bildet die Grundlage für Schlösser, Portale und das versiegelte Tor. Schlüssel, Siegel und Portallichter sind programmatische Oberflächenelemente. Es wurden keine neuen Runway-Generierungen oder Credits benötigt.

Messdaten: `artifacts/chapter-three-verification.json`. Alle aufgezeichneten Eingaben liegen unter `public/replays/`. Die komplette Karten- und Gerätedokumentation steht in `LEVELS-UND-LOESUNGEN.md`. Browser-, Paket- und Veröffentlichungsergebnisse werden im `PRUEFBERICHT.md` getrennt dokumentiert. Menschliches Feedback zu Schwierigkeit, Lesbarkeit beim eigenen Spielen und Spielspaß bleibt offen.

Die nachträglich angefragte Überarbeitung von Kapitel 2 ergibt jetzt 346,8 Sekunden (5:46,8). Gegen diesen neuen Stand beträgt der Referenzfaktor 1,61. Die Karten in Kapitel 3 werden nicht mit zusätzlichen Leerwegen verlängert, um eine verschobene Vergleichsbasis auszugleichen.
