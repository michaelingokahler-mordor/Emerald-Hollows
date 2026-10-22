## Ergänzung 19. Oktober 2026

Kapitel 3 enthält 21–30; DW in 25 bleibt versiegelt. Zusätzlich werden 15/16/18 umgebaut und 19 auf Quote 41 gesetzt. Nur diese vier bestehenden Ranglisten wechseln die Kartenrevision.

**Vorschlag für ein späteres Kapitel:** Grabekäfer und hartes Muttergestein, das der Miner nicht abbauen kann. Die Aufgabe soll Freilassen, Streckenführung, neu freigelegte Edelsteine und gefährdete Rundsteine sowie Ausweichen oder gezieltes Zerquetschen verbinden. Geschwindigkeit, Grabpriorität und Verhalten beim Treffen auf Hebel/Tore müssen vor Umsetzung festgelegt werden. Der Gegner ist noch nicht implementiert.

> Stand 0.9: Kapitel 3 (21–30) ist umgesetzt. [Kartenrollen und Prüfung](KAPITEL-3-UMSETZUNG.md). Der DW-Vorraum in 25 ist auffindbar, sein Geheimtor bleibt versiegelt; G1–G10 werden separat entworfen. Die nachträglichen Feedback-Revisionen betreffen ausschließlich 15, 16, 18 und 19.

# Lathmar: Emerald Hollows — freigegebener Ausbau

## Lieferung 0.4: Die alte Mine

Zehn handgebaute Höhlen, fortlaufende Freischaltung, lokale Bestzeiten, getrennte Übungserfolge, Spielername, öffentlicher Zeitvergleich, Export/Import, automatische Sicherungskopie, Fortsetzen laufender Versuche, Touchsteuerung, installierbare Offline-Webapp und zwei längere Musikstücke. Die bewährte Grafik bleibt erhalten.

Quellcode, Medien, Tests, Lösungen und Dokumentation: https://github.com/michaelingokahler-mordor/Emerald-Hollows

Spieladresse: https://sabnockworks.com/games/more-projects/emerald-hollows/

Ranglisten-API: https://emerald-hollows-api.emerald-hollows.workers.dev

Die Karten 01–05 bleiben bestehen. 06 verlangt, einen Schieferkrabbler lebend einzusperren. 07 übt den zeitlich abgestimmten Abwurf aus größerer Höhe. 08 bietet bewusst 18 Kristallpunkte bei einer Quote von 12: Der Spieler wählt einen Sammelweg. 09 führt den Kristallkrabbler ein, der beim Zerquetschen zusammen mit dem fallenden Objekt verschwindet und einen Diamanten hinterlässt. 10 kombiniert bekannte Regeln in einer 40 × 26 großen Höhle mit einem notwendigen bewachten Durchgang: Einschließen oder Felsfalle öffnen den Weg zu den letzten drei Diamanten. Keine neue Mechanik wird im Finale vorausgesetzt.

Die gesamte Spieloberfläche ist zwischen Englisch und Deutsch umschaltbar; die Einstellung wird gespeichert. Die Credits nennen die tatsächlichen Mitwirkenden, Werkzeuge und Inspirationsspiele. Freischaltungen aus 0.2 bleiben erhalten. Bestzeiten der umgebauten Karten 06, 07, 09 und 10 werden anhand ihrer Kartenrevision getrennt gewertet; die übrigen Rekorde bleiben gültig.

## Lieferung 0.6: Die verlassenen Fördergänge

Level 11–20 sind spielbar: Hebel und gekoppelte Tore, blaue Rechts- und lila Links-Käfer, Verschmelzung, endliche Steinspender, temporäre Umlenkung, dauerhaftes Einsperren und ein kombiniertes Kapitelende. Bedienapparaturen bleiben auf einem Bildschirm sichtbar. Alte Karten, Ergebnisse und die gewählte Laufanimation A bleiben erhalten. Details: [Regeln](KAPITEL-2-MECHANIKEN.md) und [Lösungen](LEVELS-UND-LOESUNGEN.md).

## Lieferung 0.7: Größere Höhlen und mehrere Sammelwege

Level 11–20 sind neu gebaut; ab Kapitelstufe 4 stehen größere Abbaugebiete und Routenwahl im Vordergrund. Die Karten wachsen bis 64 × 40. Obligatorische Käferaufgaben bleiben verbindlich. Runway-Hebel und -Tore ersetzen die gezeichneten Platzhalter. Nur für diese neuen Kartenrevisionen beginnen die Ranglisten neu; Freischaltungen und Level 01–10 bleiben erhalten. Siehe [Prüfbericht](PRUEFBERICHT.md) für reale Lösungszeiten und offene menschliche Abnahme. Die früheren Minutenprognosen wurden durch die gemessenen Replays nicht bestätigt.

## Lieferung 0.8: Eigenständige Aufgaben und Umgehungsschutz

14–20 wurden neu entworfen; 11–13 bleiben bestehen. Die Änderungen und Gegenprüfungen stehen in [Kapitelrollen 0.8](KAPITEL-2-ROLLEN-0.8.md). Ab jetzt gelten die [Leveldesign-Regeln](LEVELDESIGN-REGELN.md) für kommende Kapitel. Vor dem Bau von 21–30 werden Leitentscheidung, Folge, Sammelplanung und Abgrenzung je Karte festgehalten; ein Lösungsreplay allein ist keine Abnahme.

## Aktueller Stand und weitere Kapitel — 22. Oktober 2026

Die frühere Kapitelzuordnung wurde während der Entwicklung geändert. Der Regelkern und die spielbaren Karten haben Vorrang vor historischen Vorschlägen. Spinnen sind noch nicht implementiert. Der Nutzer hat ihre Kernregeln am 22. Oktober hier festgehalten: Netze bremsen andere Wesen; Fressen im Netz erzeugt Nachwuchs; Explosionen können Netze entzünden. Der [Entwurf für 41–50](KAPITEL-5-ENTWURF-41-50.md) trennt diese Vorgaben von offenen Details. Grün oder Rubin beim Spinnentod bleibt eine Entscheidung. [Recherche zur Explosion](EXPLOSIONEN-REFERENZEN-2026-10-22.md).

| Level | Einführung und Schwerpunkt |
|---|---|
| 11–20 | Implementiert: Hebel, Tore, zwei Käferrichtungen, Fusion und Steinspender |
| 21–30 | Implementiert: Sonnen-/Mondschlüssel, goldene Schlüsselträger und feste Portalpaare. Zwergen-Geheimzweig weiterhin versiegelt. |
| 31–40 | Implementiert: Grabekäfer, Muttergestein, verzögerte und wiederkehrende Pits. Die frühere Dynamit-Zuordnung wurde nicht umgesetzt. |
| 41–50 | Neuer Entwurf: Spinnen, bremsende Netze, Vermehrung durch Fressen und Netzbrand. Bewegungs-, Feuer- und Funddetails noch offen; Teleporter sind bereits vorhanden. |
| 51–60 | Säure, ablassbare Wasserbecken, Schleusen und Treibsand |
| 61–70 | Corruption: deterministisches Wachstum und kontrollierte Freiräume |
| 71–80 | Zeitweise aktive Zauberwände, Fels-zu-Smaragd; Elfen-Abzweig in 75 |
| 81–90 | Größere verbundene Kammern und verschiebbare Steinriegel |
| 91–100 | Kombinationen, Rückwege und Finale ohne neue Grundregeln |

Weiterhin offen sind platzierbares Dynamit mit eigener Zündzeit, Säure, Wasser mit ablassbaren Becken und Schleusen, Treibsand, Corruption sowie zeitweise aktive Zauberwände zur Umwandlung von Felsen in Smaragde. Für Dynamit ist nach der geänderten Kapitel-IV-Belegung noch kein neuer Einführungsplatz festgelegt. Käferexplosionen sind bereits vorhanden und ersetzen kein bedienbares Dynamit.

Hebelgesteuerte verschiebbare Steinriegel sind ebenfalls offen; gewöhnliches Schieben einzelner Felsen ist schon spielbar. Die beiden Geheimkampagnen G1–G10 und E1–E10 einschließlich ihrer Übergänge fehlen. Die vorgesehenen schiebenden Zwerge und Elfen mit angekündigten Fernangriffen sind noch nicht implementiert.

Ziel: **100 Hauptlevel plus 20 Geheimlevel**, insgesamt 120. Jede Erweiterung erhält eigene Prüfkarten und erfolgreiche Lösungsreplays. Handgebaute Karten wachsen schrittweise bis 64 × 40; kleine schwierige Räume bleiben dazwischen. Spätere bekannte Lösungen sollen überwiegend 3–8 Minuten dauern. Die Demo verspricht diese Länge noch nicht.

## Geheimwege

25 → G1 … G10 → 26 (Twisted Dwarves). 75 → E1 … E10 → 76 (Twisted Elves). Der normale Ausgang führt ebenfalls zum nächsten Hauptlevel. Ein Geheimtor braucht die normale Kristallquote. Der Einstieg schaltet den nächsten Hauptlevel und den ersten Geheimlevel frei.

Geheimkapitel können jederzeit verlassen werden. Geschaffte Räume bleiben erhalten, beim Wiedereinstieg geht es zum zuletzt freigeschalteten Raum. Sie sind für den Hauptkampagnenabschluss optional. Weitere Lathmar-Themen können später als Datenzweige ergänzt werden. `CampaignDefinition` und die geplanten Zweige sind bereits angelegt; die 20 Karten und ihre Übergänge im Spiel fehlen noch.

Twisted Dwarves schieben Felsen auf berechenbaren horizontalen Wegen. Twisted Elves erhalten angekündigte Fernangriffe mit Sichtlinie. Beide brauchen eigene Einführungsräume. Diese Regeln sind ein Entwurf für das eigenständige Spin-off, keine nachträgliche Änderung des Lathmar-Kanons.

## Festgelegte Regeln der Erweiterungen

Das wachsende Material heißt in beiden Sprachen **Corruption**. Es wird als verderbende Kraft mit Bezug zu Lathmar gestaltet. Seine Ausbreitung bleibt deterministisch, durch Raumbegrenzungen steuerbar und optisch klar von Erde, Wasser und Kristallen unterscheidbar. Wachstumsrate, Umwandlung bei vollständiger Einschließung und genaue Darstellung werden vor Kapitel 61–70 festgelegt und mit Prüfkarten abgesichert. Corruption ist geplant und noch nicht spielbar; dieser Entwurf legt keine neuen Fakten für den Lathmar-Kanon fest.

Teleporter sind feste, sichtbar zugeordnete Paare und transportieren zunächst nur die Spielfigur. Ein belegtes Ziel blockiert den Transfer. Ankunft löst keinen sofortigen Rücktransfer aus. Geheimtore zwischen Leveln sind davon getrennt.

Hebel bewegen eindeutig markierte Tore, Schleusen oder Riegel auf vorgegebenen Bahnen. Belegte Felder werden nicht überschrieben. Wasserbecken werden von Hand definiert und zeigen eine erkennbare Wasserlinie. Tiefes Wasser blockiert die Spielfigur; Felsen und Kristalle sinken. Eine Schleuse lässt das Wasser schrittweise ab und legt Wege frei.

Musik erhält Kapitelthemen und eine dezente Gefahrenschicht. Die Demo verwendet einen ruhigen und einen zügigeren Titel; sie laufen über Levelwechsel hinweg. Der Rhythmus reagiert mit Ausblendverzögerung auf nahe Krabbler oder wenig Restzeit. Hörabnahme bleibt ein menschlicher Schritt.

## Kosten und nächste Abnahmen

Runway-Obergrenze bleibt 1.000 Credits inklusive Fehlversuchen. Bisher 180: ursprüngliche Medien 115, Musikrunde 24 einschließlich einer nicht herunterladbaren Ersatzproduktion, Pseudodrache 21, zwei neue seitliche Laufproben 20. Für 0.5.1 selbst wurden keine Medien generiert; die Laufproben entstanden danach. Der Nutzer wählte A; dessen seitliche Posen sind ab 0.5.2 integriert. Kapitel 2 (0.6) verbraucht keine weiteren Runway-Credits. Kein automatischer bezahlter Hostingwechsel. Workers Free wurde am 18.10.2026 im Konto bestätigt.

Der Nutzer hat am 18.10.2026 bestätigt, dass der öffentliche Touchmodus funktioniert; Gerät und Betriebssystem wurden nicht angegeben. Vor dem nächsten Kapitel: Feedback zu den überarbeiteten Rätseln, Hörprobe und gezielte Prüfung der Installation auf Android und iPhone/iPad. Browseremulation ist kein Gerätetest. Dann jeweils ein neues Kapitel mitsamt Regeln, Karten, Medien und Replays entwickeln.

Die Zeit bleibt das erste Ranglistenkriterium. Gesamtpunkte aus Kristallen und Gegnern entscheiden Gleichstände. Neue Gegnertypen erhalten vor ihrer Einführung einen festen Punktwert; die Kristallquote bleibt davon unabhängig.

## Rückmeldung zu Level 10 und Darstellung (0.5)

Der Nutzer bestätigt das Komplexitätsniveau des neuen Finales als gute Grundlage für weitere Höhlen. Folgekapitel sollen dieses Zusammenspiel aus Planung, räumlichen Konsequenzen und Timing weiterführen, mit ruhigen Rätseln zwischen schwierigeren Passagen. Die Vollversion bleibt mit 100 Haupt- und 20 eingebetteten Geheimleveln geplant. Die Demo erhält einen grün-roten Pseudodrachen als Aufgaben- und Hinweisgeber; er verändert keine Spielregel.

## Besprechung der nächsten 20 Hauptlevel

Ein konkreter [Entwurf für 11–30](LEVELS-11-30-ENTWURF.md) liegt vor. Er schlägt frühere Hebel/Tore und Teleporter vor wurde für 11–20 mit den besprochenen Käfern und dem Steinspender umgesetzt. 21–30 bleiben zur gemeinsamen Besprechung offen.

Die Besprechung ergänzt [blaue/lila Käfer, Verschmelzung und einen dosierenden Steinspender](KAPITEL-2-MECHANIKEN.md). Diese Regeln sind seit 0.6 implementiert. Der Nutzer verlangt die vollständige Sicht auf Hebel und Apparatur. Level 12 und 16 stehen zur praktischen Gegenüberstellung im Spiel bereit.

## Rückmeldung nach 0.6: mehr Höhle und Sammelwege

Neue Vorgabe: Die ersten drei Level eines Kapitels führen Mechaniken ein; ab dem vierten Level dienen sie einer umfangreicheren Sammelaufgabe. Mehrere Fundgebiete und alternative Wege sollen Zeitrekorde interessant machen. Die aktuellen 11–20 sind dafür zu kurz. [Recherche mit Bestzeiten, klassischen Karten und konkretem Ausbauvorschlag](LEVEL-DESIGN-RECHERCHE-2026-10-18.md). Die größeren Karten und neuen Zeitziele sind noch nicht umgesetzt oder spielerisch bestätigt.

Für passendere Hebel-/Torgrafik liegen Runway-Entwürfe vor. Diese zusätzliche Runde kostet 56 Credits netto; Projektstand jetzt **236 / 1.000 Credits** (einschließlich verworfener Bilder). Ohne Anrechnung einer aus der Kontobilanz erschlossenen Rückerstattung von 8 Credits beträgt der konservative Stand 244. Die Entwürfe sind noch nicht in den Spielatlas integriert; Protokoll: `artifacts/mechanism-production-01.json`.


## Rückmeldung nach Kapitel III (0.9.1)

Level 29 erhält positives menschliches Feedback zur Komplexität. Die aktuellen Bestzeiten und engeren Limits stehen in [TIMING-FEEDBACK-0.9.1.md](TIMING-FEEDBACK-0.9.1.md). Dort ist auch der Vorschlag für Monster-Pits festgehalten: zunächst ein angekündigter Einzelspawn mit Abschalthebel, später wiederkehrende Ausgänge. Der Grabe-Käfer und harter Fels bleiben eine zukünftige Mechanik. Pits sind noch nicht implementiert.
