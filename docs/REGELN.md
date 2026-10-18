# Verbindliche Regeln – Lathmar: Emerald Hollows 0.6

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

## Kristallkrabbler und Aufgaben

Der blaue Krabbler mit Diamantmarkierung folgt denselben Bewegungsregeln wie der Schieferkrabbler. Beim Treffer durch ein bereits fallendes Objekt werden Krabbler und Fallobjekt durch genau einen Diamanten im Feld des Krabblers ersetzt. Es gibt keine Explosion. Der Diamant bewegt sich erst wieder im nächsten Tick und zählt erst beim Einsammeln drei Punkte. Ein ruhendes Objekt löst keine Umwandlung aus.

In Höhle 06 müssen Kristallquote und Einsperraufgabe erfüllt sein. Der Krabbler muss leben, sein zusammenhängender freier Bewegungsraum darf höchstens zwei Felder enthalten, und der Spieler muss außerhalb stehen. Andere Krabbler zählen nicht als feste Barriere. Wird das Gehege wieder geöffnet, schließt der Ausgang erneut. In 07 muss ein Schieferkrabbler zerquetscht, in 09 ein Kristallkrabbler umgewandelt werden. Die Aufgabe erscheint im HUD; Übung und Lösungsreplays verwenden dieselben Bedingungen.

## Punktewertung

Die Kristallquote bleibt getrennt von der Gesamtwertung. Smaragd = 1, Diamant = 3 Punkte. Pro Schieferkrabbler zählen 5 zusätzliche Punkte, wenn er zerquetscht oder am Levelende sicher in höchstens zwei freien Zellen eingeschlossen ist. Ein umgewandelter Kristallkrabbler zählt 10 Zusatzpunkte; sein Diamant zählt erst beim Einsammeln weitere 3 Kristallpunkte. Einsperren eines Kristallkrabblers gibt keinen Zusatzbonus.

Die Wertung wird aus dem Zustand abgeleitet. Wiederholtes Öffnen und Schließen eines Geheges sammelt keine Punkte; ein freigelassener Krabbler verliert den Einschließbonus. Gegnerpunkte allein öffnen keinen Ausgang. Die Live-Anzeige zeigt den aktuell gültigen Gesamtwert. Ranglisten verwenden nur den Endwert eines bestätigten Normalspiel-Durchlaufs.

Kürzere Zeit gewinnt immer. Erst bei identischer Tickzahl entscheidet die höhere Gesamtwertung. Stimmen Zeit und Punkte überein, teilen sich Spieler den Rang. Lokale Rekorde und die Offline-Warteschlange verwenden dieselbe Reihenfolge. Die Punkte gehören zum angezeigten Durchlauf, nicht zu einem unabhängigen langsameren Punkterekord.

## Finale

Höhle 10 verlangt keine zusätzliche Aufgabenbedingung. Der bewachte Gang liegt zwischen den ersten sieben und den letzten drei Pflichtdiamanten. Der Riegel kann den Krabbler in der oberen Nische einschließen; die Erde darunter muss stehen bleiben. Alternativ wird von einer sicheren Plattform ein Stein abgeworfen. Dieser muss nach dem Treffer im Gang nach rechts weggeschoben werden. Beide Lösungen werden mit normalen Regeln geprüft und sind in der Höhlenauswahl abrufbar.

## Fortschritt und Wiedergabe

Normal- und Übungsergebnisse werden getrennt in `emerald-hollows.save.v2` gespeichert. Vorhandene Version-1-Spielstände werden übernommen. Pro Level zählt die kürzeste erfolgreiche Tickzahl. Ein Erfolg in einem der beiden Modi öffnet die nächste Höhle. Fortsetzen stellt einen gespeicherten laufenden Versuch pausiert wieder her; sonst beginnt das zuletzt gewählte Level neu. Neustart setzt den Versuch vollständig zurück. Neues Spiel verlangt eine Bestätigung und löscht den lokalen Kampagnenfortschritt, nicht das Online-Profil oder öffentliche Rekorde.

Eine zweite lokale Kopie hilft bei beschädigten Daten. Unter Profil & Sicherung sind Export und Import möglich. Der Profilcode ist getrennt zu sichern. Öffentliche Bestzeiten erfordern ein freiwilliges Online-Profil und eine erfolgreiche serverseitige Replay-Prüfung; Übungszeiten, Importe und Lösungswiedergaben werden nicht hochgeladen. Offline bleibt je Level der schnellste wartende Durchlauf erhalten.

Auf Touchgeräten bewegen die Richtungstasten die Figur. Zum Graben nebenan die Grabentaste halten und zusätzlich eine Richtung drücken. Die Bedienelemente liegen außerhalb der Höhlenansicht. Orientierung und Fokuswechsel pausieren den Versuch.

Ein Replay enthält Regelversion, Levelkennung und -Prüfsumme, tickbezogene Eingaben, Modus und erwarteten Endzustand. Die unveränderten Höhlen verwenden `crystal-delve/1`, die überarbeiteten Höhlen 06, 07, 09 und 10 `emerald-hollows/2`. Die mitgelieferten Lösungen verwenden dieselbe Simulation wie normales Spielen. Es gibt keine Teleports, freigeschalteten Ausgänge oder ausgeschalteten Gegner für die Wiedergabe.

Erfolge alter Kartenrevisionen behalten ihre Freischaltungen, erscheinen aber nicht als aktuelle Bestzeiten. Bereits aufgezeichnete ältere Durchläufe bleiben hochladbar und werden mit den archivierten Karten geprüft. Öffentliche Ranglisten zeigen ausschließlich die aktuelle Karten- und Regelversion. Eine Profilwiederherstellung übernimmt auch historische Erfolge für die Freischaltung. Ein laufender Versuch auf einer ersetzten Karte kann nicht fortgesetzt werden und startet neu; Versuche auf unveränderten Karten bleiben fortsetzbar.

Die abgeleitete Wertung hat die Kennung `scoreVersion: 1` und verändert bestehende Simulationszustände oder Replay-Prüfsummen nicht. Alte lokale Werte ohne Gesamtwertung behalten ihre Kristallpunkte mit †-Kennzeichnung. Serverseitig werden gespeicherte bestätigte Endzustände nachbewertet; ihre Zeiten und Freischaltungen bleiben erhalten.

## Kapitel 2: Regelversion emerald-hollows/3

Die Karten 11–20 verwenden die in [KAPITEL-2-MECHANIKEN.md](KAPITEL-2-MECHANIKEN.md) beschriebenen verbindlichen Regeln. Blau bevorzugt rechts, Lila links; beide bewegen sich alle drei Takte. Direkte Nachbarschaft eines verschiedenfarbigen Paars erzeugt genau einen Kristallkrabbler auf dem blauen Feld. Der neue Käfer bewegt sich im Entstehungstakt nicht nochmals. Fusion allein gibt keine Punkte.

Graben plus Richtung zum benachbarten Hebel löst genau eine Betätigung aus. Zum erneuten Schalten muss mindestens ein Simulationstakt ohne diese Tastenkombination dazwischenliegen. Ein blockiertes schließendes Tor, ein belegtes Ausgabefeld, leerer Vorrat oder ein laufender Ausgabezyklus verhindert die gesamte gekoppelte Aktion. Es gibt keine Warteschlange. Die Sperrzeit eines erfolgreichen Steinspenders beträgt drei Takte (300 ms). Der ausgegebene Stein folgt noch im selben Takt der normalen Fallphase.

Torstellungen, Magazinbestand, Sperrzeiten, Eingabelatch, erzeugte Entitätskennungen und Ereigniszähler gehören zum deterministischen Spielzustand. Fortsetzen und Serverprüfung rekonstruieren ihn aus dem Replay. Neustart setzt alles zurück. Karten und Replay-Endzustände der Level 01–10 bleiben unverändert.
