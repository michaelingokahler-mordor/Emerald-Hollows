# Lathmar: Emerald Hollows — freigegebener Ausbau

## Lieferung 0.2: Die alte Mine

Zehn handgebaute Höhlen, fortlaufende Freischaltung, lokale Bestzeiten, getrennte Übungserfolge, Spielername, öffentlicher Zeitvergleich, Export/Import, automatische Sicherungskopie, Fortsetzen laufender Versuche, Touchsteuerung, installierbare Offline-Webapp und zwei längere Musikstücke. Die bewährte Grafik bleibt erhalten.

Quellcode, Medien, Tests, Lösungen und Dokumentation: https://github.com/michaelingokahler-mordor/Emerald-Hollows

Spieladresse: https://sabnockworks.com/games/more-projects/emerald-hollows/

Ranglisten-API: https://emerald-hollows-api.emerald-hollows.workers.dev

Die ersten sechs Karten bleiben bestehen. 07 übt zwei kontrollierte Fallschächte, 08 alternative Sammelwege, 09 eine Rollfalle und 10 kombiniert die bekannten Regeln in einer 40 × 26 großen Höhle. Keine neue Mechanik wird im Finale vorausgesetzt.

## Weitere Kapitel — noch nicht implementiert

| Level | Einführung und Schwerpunkt |
|---|---|
| 11–20 | Kristallkäfer, Beute durch Zerquetschen, sichere Sammelrouten |
| 21–30 | Schlüssel, klar markierte Hebel und Tore; Zwergen-Abzweig in 25 |
| 31–40 | Dynamit, sichtbare Zündzeit, zerstörbare Mauern, 3 × 3 Explosion |
| 41–50 | Paarweise Teleporter-Türen innerhalb einer Höhle; Verfolger |
| 51–60 | Säure, ablassbare Wasserbecken, Schleusen und Treibsand |
| 61–70 | Deterministisches Wachstum und kontrollierte Freiräume |
| 71–80 | Zeitweise aktive Zauberwände, Fels-zu-Smaragd; Elfen-Abzweig in 75 |
| 81–90 | Größere verbundene Kammern und verschiebbare Steinriegel |
| 91–100 | Kombinationen, Rückwege und Finale ohne neue Grundregeln |

Ziel: **100 Hauptlevel plus 20 Geheimlevel**, insgesamt 120. Jede Erweiterung erhält eigene Prüfkarten und erfolgreiche Lösungsreplays. Handgebaute Karten wachsen schrittweise bis 64 × 40; kleine schwierige Räume bleiben dazwischen. Spätere bekannte Lösungen sollen überwiegend 3–8 Minuten dauern. Die Demo verspricht diese Länge noch nicht.

## Geheimwege

25 → G1 … G10 → 26 (Twisted Dwarves). 75 → E1 … E10 → 76 (Twisted Elves). Der normale Ausgang führt ebenfalls zum nächsten Hauptlevel. Ein Geheimtor braucht die normale Kristallquote. Der Einstieg schaltet den nächsten Hauptlevel und den ersten Geheimlevel frei.

Geheimkapitel können jederzeit verlassen werden. Geschaffte Räume bleiben erhalten, beim Wiedereinstieg geht es zum zuletzt freigeschalteten Raum. Sie sind für den Hauptkampagnenabschluss optional. Weitere Lathmar-Themen können später als Datenzweige ergänzt werden. `CampaignDefinition` und die geplanten Zweige sind bereits angelegt; die 20 Karten und ihre Übergänge im Spiel fehlen noch.

Twisted Dwarves schieben Felsen auf berechenbaren horizontalen Wegen. Twisted Elves erhalten angekündigte Fernangriffe mit Sichtlinie. Beide brauchen eigene Einführungsräume. Diese Regeln sind ein Entwurf für das eigenständige Spin-off, keine nachträgliche Änderung des Lathmar-Kanons.

## Festgelegte Regeln der Erweiterungen

Teleporter sind feste, sichtbar zugeordnete Paare und transportieren zunächst nur die Spielfigur. Ein belegtes Ziel blockiert den Transfer. Ankunft löst keinen sofortigen Rücktransfer aus. Geheimtore zwischen Leveln sind davon getrennt.

Hebel bewegen eindeutig markierte Tore, Schleusen oder Riegel auf vorgegebenen Bahnen. Belegte Felder werden nicht überschrieben. Wasserbecken werden von Hand definiert und zeigen eine erkennbare Wasserlinie. Tiefes Wasser blockiert die Spielfigur; Felsen und Kristalle sinken. Eine Schleuse lässt das Wasser schrittweise ab und legt Wege frei.

Musik erhält Kapitelthemen und eine dezente Gefahrenschicht. Die Demo verwendet einen ruhigen und einen zügigeren Titel; sie laufen über Levelwechsel hinweg. Der Rhythmus reagiert mit Ausblendverzögerung auf nahe Krabbler oder wenig Restzeit. Hörabnahme bleibt ein menschlicher Schritt.

## Kosten und nächste Abnahmen

Runway-Obergrenze bleibt 1.000 Credits inklusive Fehlversuchen. Bisher 139: ursprüngliche Medien 115, Musikrunde 24 einschließlich einer nicht herunterladbaren Ersatzproduktion. Kein automatischer bezahlter Hostingwechsel. Workers Free wurde am 18.10.2026 im Konto bestätigt.

Vor dem nächsten Kapitel: menschlicher Durchlauf der Demo, Hörprobe, Tests auf einem echten Android-Gerät und iPhone/iPad. Browseremulation ist kein Gerätetest. Dann jeweils ein neues Kapitel mitsamt Regeln, Karten, Medien und Replays entwickeln.
