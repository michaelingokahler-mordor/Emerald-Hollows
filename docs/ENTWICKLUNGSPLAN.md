# Lathmar: Emerald Hollows — freigegebener Ausbau

## Lieferung 0.4: Die alte Mine

Zehn handgebaute Höhlen, fortlaufende Freischaltung, lokale Bestzeiten, getrennte Übungserfolge, Spielername, öffentlicher Zeitvergleich, Export/Import, automatische Sicherungskopie, Fortsetzen laufender Versuche, Touchsteuerung, installierbare Offline-Webapp und zwei längere Musikstücke. Die bewährte Grafik bleibt erhalten.

Quellcode, Medien, Tests, Lösungen und Dokumentation: https://github.com/michaelingokahler-mordor/Emerald-Hollows

Spieladresse: https://sabnockworks.com/games/more-projects/emerald-hollows/

Ranglisten-API: https://emerald-hollows-api.emerald-hollows.workers.dev

Die Karten 01–05 bleiben bestehen. 06 verlangt, einen Schieferkrabbler lebend einzusperren. 07 übt den zeitlich abgestimmten Abwurf aus größerer Höhe. 08 bietet bewusst 18 Kristallpunkte bei einer Quote von 12: Der Spieler wählt einen Sammelweg. 09 führt den Kristallkrabbler ein, der beim Zerquetschen zusammen mit dem fallenden Objekt verschwindet und einen Diamanten hinterlässt. 10 kombiniert bekannte Regeln in einer 40 × 26 großen Höhle mit einem notwendigen bewachten Durchgang: Einschließen oder Felsfalle öffnen den Weg zu den letzten drei Diamanten. Keine neue Mechanik wird im Finale vorausgesetzt.

Die gesamte Spieloberfläche ist zwischen Englisch und Deutsch umschaltbar; die Einstellung wird gespeichert. Die Credits nennen die tatsächlichen Mitwirkenden, Werkzeuge und Inspirationsspiele. Freischaltungen aus 0.2 bleiben erhalten. Bestzeiten der umgebauten Karten 06, 07, 09 und 10 werden anhand ihrer Kartenrevision getrennt gewertet; die übrigen Rekorde bleiben gültig.

## Weitere Kapitel — noch nicht implementiert

| Level | Einführung und Schwerpunkt |
|---|---|
| 11–20 | Kristallkrabbler vertiefen, Beute durch Zerquetschen, sichere Sammelrouten |
| 21–30 | Schlüssel, klar markierte Hebel und Tore; Zwergen-Abzweig in 25 |
| 31–40 | Dynamit, sichtbare Zündzeit, zerstörbare Mauern, 3 × 3 Explosion |
| 41–50 | Paarweise Teleporter-Türen innerhalb einer Höhle; Verfolger |
| 51–60 | Säure, ablassbare Wasserbecken, Schleusen und Treibsand |
| 61–70 | Corruption: deterministisches Wachstum und kontrollierte Freiräume |
| 71–80 | Zeitweise aktive Zauberwände, Fels-zu-Smaragd; Elfen-Abzweig in 75 |
| 81–90 | Größere verbundene Kammern und verschiebbare Steinriegel |
| 91–100 | Kombinationen, Rückwege und Finale ohne neue Grundregeln |

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

Runway-Obergrenze bleibt 1.000 Credits inklusive Fehlversuchen. Bisher 180: ursprüngliche Medien 115, Musikrunde 24 einschließlich einer nicht herunterladbaren Ersatzproduktion, Pseudodrache 21, zwei neue seitliche Laufproben 20. Für 0.5.1 selbst wurden keine Medien generiert; die Laufproben entstanden danach. Der Nutzer wählte A; dessen seitliche Posen sind ab 0.5.2 integriert. Kein automatischer bezahlter Hostingwechsel. Workers Free wurde am 18.10.2026 im Konto bestätigt.

Der Nutzer hat am 18.10.2026 bestätigt, dass der öffentliche Touchmodus funktioniert; Gerät und Betriebssystem wurden nicht angegeben. Vor dem nächsten Kapitel: Feedback zu den überarbeiteten Rätseln, Hörprobe und gezielte Prüfung der Installation auf Android und iPhone/iPad. Browseremulation ist kein Gerätetest. Dann jeweils ein neues Kapitel mitsamt Regeln, Karten, Medien und Replays entwickeln.

Die Zeit bleibt das erste Ranglistenkriterium. Gesamtpunkte aus Kristallen und Gegnern entscheiden Gleichstände. Neue Gegnertypen erhalten vor ihrer Einführung einen festen Punktwert; die Kristallquote bleibt davon unabhängig.

## Rückmeldung zu Level 10 und Darstellung (0.5)

Der Nutzer bestätigt das Komplexitätsniveau des neuen Finales als gute Grundlage für weitere Höhlen. Folgekapitel sollen dieses Zusammenspiel aus Planung, räumlichen Konsequenzen und Timing weiterführen, mit ruhigen Rätseln zwischen schwierigeren Passagen. Die Vollversion bleibt mit 100 Haupt- und 20 eingebetteten Geheimleveln geplant. Die Demo erhält einen grün-roten Pseudodrachen als Aufgaben- und Hinweisgeber; er verändert keine Spielregel.

## Besprechung der nächsten 20 Hauptlevel

Ein konkreter [Entwurf für 11–30](LEVELS-11-30-ENTWURF.md) liegt vor. Er schlägt frühere Hebel/Tore und Teleporter vor und ist noch nicht freigegeben. Die Kapitelzuordnung oben bleibt bis zur gemeinsamen Entscheidung der bisherige Plan.

Die Besprechung ergänzt [blaue/lila Käfer, Verschmelzung und einen dosierenden Steinspender](KAPITEL-2-MECHANIKEN.md). Der Nutzer verlangt die vollständige Sicht auf Hebel und Apparatur. Level 12 und 16 bleiben zur späteren praktischen Gegenüberstellung im Entwurf. Die neuen Regelideen sind noch nicht implementiert.
