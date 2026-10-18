# Verbindliche Regeln – Lathmar: Emerald Hollows 0.2

Ein Takt dauert 100 ms. Die Figur bewegt sich in vier Richtungen und fällt nicht. Erde verschwindet beim Betreten oder beim benachbarten Graben. Ein Tick verarbeitet maximal eine Spielereingabe. Der kurze Eingabepuffer gilt 150 ms; die zuletzt gedrückte Richtung hat Vorrang. Tabwechsel pausiert und verwirft gepufferte Eingaben.

## Reihenfolge

1. Spieler bewegt sich, gräbt, sammelt oder schiebt. Kristalle zählen sofort; ein offener Ausgang beendet das Level beim Betreten sofort.
2. Fallobjekte: Zeilen von unten nach oben, in jeder Zeile von links nach rechts. Bereits bewegte Objekte, auch geschobene Felsen, werden übersprungen.
3. Krabbler: nur bei durch drei teilbarer Ticknummer, in stabiler Kennungsreihenfolge.
4. Countdown: im Normalspiel ein Tick weniger. Bei null endet der Versuch. Im Übungsmodus bleibt ausschließlich der Countdown ausgesetzt.

Jede Entität bewegt sich höchstens einmal pro Tick. Das Raster wird unmittelbar aktualisiert; bei konkurrierenden Zielen gewinnt die frühere Verarbeitung. Die Darstellung interpoliert unabhängig zwischen den letzten beiden Rasterpositionen.

## Felsen und Kristalle

Smaragd = 1, Diamant = 3 Quotenpunkte. Spieler dürfen Kristalle durch Betreten oder benachbartes Aufnehmen sammeln, auch wenn diese im vorherigen Takt fielen: Die Eingabe wird vor der Schwerkraft verarbeitet.

Felsen und Kristalle fallen um ein Feld, wenn darunter ein leeres Feld liegt. Dabei erhalten sie den Zustand `falling`. Ist darunter ein Spieler oder Krabbler, tötet ausschließlich ein bereits fallendes Objekt. Ein ruhendes Objekt auf einer Figur verursacht keinen Schaden. Eine Kollision mit festem Untergrund beendet den Fallzustand.

Auf anderen Felsen oder Kristallen kann ein Objekt abrollen, sofern Seitenfeld und darunterliegendes Diagonalfeld frei sind. Links wird zuerst geprüft. Ein Rollschritt geht nur zur Seite und setzt `falling`; der nächste Abwärtsschritt folgt frühestens im nächsten Tick. Mauern und Figuren sind keine runden Unterlagen. Kristalle zerbrechen nicht durch Felsen.

Der Spieler kann einen ruhenden Felsen horizontal in ein völlig leeres Feld schieben. Das Ziel darf weder Erde noch eine Figur enthalten. Kein vertikales Schieben, keine Ketten und kein Schieben mit der Leertaste.

## Schieferkrabbler

Alle drei Takte wählt er relativ zur Blickrichtung: rechts, geradeaus, links, zurück. Er bewegt sich nur in leere Gänge. Steine, Erde, Kristalle, Mauern und Ausgänge sperren seinen Weg. Eine echte Zellkollision mit dem Spieler tötet; bloße Nachbarschaft ist ungefährlich. Ein fallendes Objekt zerquetscht ihn ohne Explosion oder Bonuskristalle.

## Fortschritt und Wiedergabe

Normal- und Übungsergebnisse werden getrennt in `emerald-hollows.save.v2` gespeichert. Vorhandene Version-1-Spielstände werden übernommen. Pro Level zählt die kürzeste erfolgreiche Tickzahl. Ein Erfolg in einem der beiden Modi öffnet die nächste Höhle. Fortsetzen stellt einen gespeicherten laufenden Versuch pausiert wieder her; sonst beginnt das zuletzt gewählte Level neu. Neustart setzt den Versuch vollständig zurück. Neues Spiel verlangt eine Bestätigung und löscht den lokalen Kampagnenfortschritt, nicht das Online-Profil oder öffentliche Rekorde.

Eine zweite lokale Kopie hilft bei beschädigten Daten. Unter Profil & Sicherung sind Export und Import möglich. Der Profilcode ist getrennt zu sichern. Öffentliche Bestzeiten erfordern ein freiwilliges Online-Profil und eine erfolgreiche serverseitige Replay-Prüfung; Übungszeiten, Importe und Lösungswiedergaben werden nicht hochgeladen. Offline bleibt je Level der schnellste wartende Durchlauf erhalten.

Auf Touchgeräten bewegen die Richtungstasten die Figur. Zum Graben nebenan die Grabentaste halten und zusätzlich eine Richtung drücken. Die Bedienelemente liegen außerhalb der Höhlenansicht. Orientierung und Fokuswechsel pausieren den Versuch.

Ein Replay enthält Regelversion `crystal-delve/1`, Levelkennung und -Prüfsumme, tickbezogene Eingaben, Modus und erwarteten Endzustand. Die mitgelieferten Lösungen verwenden dieselbe Simulation wie normales Spielen. Es gibt keine Teleports, freigeschalteten Ausgänge oder ausgeschalteten Gegner für die Wiedergabe.
