# Aktuelle Regeln – Lathmar: Emerald Hollows 0.11

Regelversion 6 gilt in 05–07, 09–10, 12–13, 15–16, 19–38 und 40. Unverändert bleiben 01–04, 08, 11, 14, 17, 18 und 39. Die folgenden Ergänzungen ersetzen dort die historischen Käferregeln. Vollständige englische Fassung: [RULES.md](RULES.md).

- **Verwandlung:** Der dritte Besuch derselben Position mit derselben Blickrichtung startet eine 1,2 Sekunden lange Schimmerwarnung. Blau/Rechtswand und Lila/Linkswand wechseln ineinander. Bernstein/Graben und Weiß/Diamant wechseln ebenfalls. Weiß folgt links; Bernstein bevorzugt geradeaus, rechts, links, zurück. Erfolgreiches Graben löscht Schleifengedächtnis und Verwandlungswarnung. Nach dem Wechsel wird einmal der bisher seltenste begehbare Ausgang bevorzugt; Gleichstand entscheidet die neue Bewegungsregel. Ein einzelnes Hindernis löst keinen sofortigen Wechsel aus.
- **Enge Falle:** Ein oder zwei erreichbare Felder starten sechs Sekunden Zündzeit. Zunehmendes rotes Pulsieren, besonders in den letzten zwei Sekunden, zeigt sie ohne Zahl. Ab drei erreichbaren Feldern wird vollständig zurückgesetzt. Bewegliche Figuren zählen nicht als Käfigwand; für Grabe-Käfer zählen Erde und Muttergestein als möglicher Fluchtraum. Die rote Warnung unterbricht die Verwandlungswarnung. Die Laufgeschwindigkeit bleibt gleich.
- **Explosion:** 3 × 3 Felder; Spieler und Käfer sterben, Erde, gewöhnliche Mauern und runde Felsen verschwinden. Stahl, Muttergestein, verstärkte Geräte, Edelsteine und Schlüssel bleiben. Helle Eckmarkierungen kennzeichnen verstärkte Apparate. Keine zusätzlichen Kettenexplosionen; Weiß liefert nur beim Zerquetschen einen Diamanten. Neue Fallbewegungen nach der Explosion beginnen im Folgetakt.
- **Lebendiges Einsperren:** Markierte Gehege haben mindestens vier nutzbare Felder. Der Käfer muss tatsächlich darin eingeschlossen und der Spieler außerhalb sein. Tod erfüllt die Aufgabe nicht. Erde eignet sich nicht zur Sicherung einer möglichen Grabform.
- **Goldene Schlüsselträger:** Alle Schlüssel der revidierten Karten beginnen in goldenen Sonnen-/Mondkäfern. Diese wechseln nur ihre Wandregel und verschmelzen nicht. Zerquetschen zerstört auch das Geschoss und gibt den Schlüssel frei; Explosion gibt ihn ebenfalls frei. Schlüssel fallen ohne Schaden und ohne Abrollen, überstehen Sprengungen und zählen nicht zur Quote.
- **Generatorvorrat:** Ein ausdrücklich begrenzter Gesamtvorrat füllt sich beim Wiedereinschalten nicht auf. In 40 gibt es genau einen Helfer. Abschalten entfernt keine bereits ausgegebenen Käfer. R1/R2 bezeichnen Felsausgaben, G1/G2 Torgruppen, P1/P2 Generatoren.
- **Taktfolge:** Eingabe → Fallobjekte und freigesetzte Schlüssel → Käferbewegung → Explosionen → Generatorausgabe → Levelzeit. Käfer bewegen sich weiterhin alle drei 100-ms-Takte. Offenen Ausgang betreten beendet sofort. Pause hält alle Simulationstimer an; Übung setzt nur die Levelzeit außer Kraft.
- **Wertung:** Smaragd 1, Diamant 3; normaler Abschuss/Sprengung 5; Weiß zerquetschen 10, dessen Diamant zusätzlich 3; gültiges lebendiges Gehege am Ende 5 pro Käfer. Tatsächliche Niederlagen werden genau einmal gewertet. Verwandlung/Fusion allein geben nichts. Zeit bleibt vorrangig, Gegnerpunkte und Schlüssel zählen nicht zur Edelsteinquote.
- **Bestandsschutz:** Historische Karten und Regeln 1–5 prüfen ausstehende Offline-Läufe weiter. Neue Prüfsummen trennen die Ranglisten der 30 geänderten Karten; alte Ergebnisse und Freischaltungen bleiben erhalten. Ein laufender lokaler Versuch auf einer ersetzten Karte startet neu. Neustart setzt sämtliche Timer, Schlüssel und Vorräte zurück.
- **Zeiten:** Höchstens dreifache schnellste geprüfte automatische Lösung, auf fünf Sekunden abgerundet. Spätere menschliche Rekorde derselben Revision begrenzen zusätzlich auf deren doppelte Zeit. Alte Kartenrekorde sind keine Vergleichsbasis.

Der DW-Abzweig in 25 bleibt versiegelt. Spinnen, Netze und Vermehrung gehören nicht zu 0.11. Das Geröllmeer enthält 74 Smaragde, 6 Diamanten und 107 Felsen; alle 92 Quotenpunkte sind erforderlich.

---

# Historische Regeln bis 0.10 — für archivierte Karten

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


## Kapitel III: Schlüssel und Teleporter (Regelversion 4)

Sonnen- und Mondschlüssel öffnen jeweils ein passendes Schloss und werden dabei verbraucht. Das Schloss bleibt offen. Schlüssel können beim Betreten oder durch benachbartes Sammeln aufgenommen werden und zählen nicht zur Kristallquote. Das HUD zeigt den Bestand getrennt.

Gleiche Buchstaben kennzeichnen feste Portalpaare. Nur die Spielfigur wird beim Betreten versetzt. Bei belegtem Ziel bleibt sie vor dem Eingang; auch ein Kristall blockiert die Ankunft. Nach einer Reise muss die Ankunft verlassen und neu betreten werden, bevor eine Rückreise möglich ist. Fallobjekte und Gegner werden anschließend im selben Takt normal verarbeitet. Neustart setzt Schlüssel, Türen und Portale zurück.

Das DW-Tor in Level 25 ist für den späteren Zwergen-Geheimzweig vorgesehen und bleibt in 0.9 versiegelt. Der normale Ausgang führt nach 26. G1–G10 sind nicht enthalten.

## Kontinuierlicher Schub über Schächte

Ein bereits geschobener Fels wird in demselben 100-ms-Takt nicht erneut bewegt. Da die Spielereingabe vor der Schwerkraft ausgewertet wird, kann durchgehendes Schieben ihn über eine freie Schachtöffnung tragen. Ohne nächsten Schub fällt er. Das ist bestehendes Regelverhalten; Version 0.9 erklärt und verwendet es in Level 18, ohne alte Physik oder Replays zu ändern.


## Kapitel IV: Grabe-Käfer und Pits (Regelversion 5)

Bernsteinfarbene Grabe-Käfer bewegen sich alle drei Takte: geradeaus, rechts, links, zurück. Sie öffnen Erde und hartes Muttergestein. Der Miner kann Muttergestein nicht entfernen. Edelsteine, Felsen, Mauern und geschlossene Geräte blockieren den Käfer. Nach dem Graben wirkt die Schwerkraft ab dem nächsten Takt. Berührung tötet; Zerquetschen hinterlässt keinen Diamanten. Sicheres Einsperren oder Zerquetschen zählt fünf Gegnerpunkte. Erde und Muttergestein eignen sich nicht als Gefängniswand.

Pits sind feste, ausschließlich von Monstern benutzbare Ausgänge mit sichtbarem Countdown. Nach Ablauf erscheint ein Grabe-Käfer im benachbarten Auslass. Einmalige Pits erzeugen einen Käfer pro Aktivierung; wiederkehrende Pits respektieren ihr Intervall und die örtliche Höchstzahl lebender Gegner. Ein belegter Auslass wartet, ohne mehrere Erscheinungen aufzustauen. Hebel stoppen zukünftige Erscheinungen; vorhandene Käfer bleiben. Erneutes Einschalten startet einen neuen Countdown. Pause und Speichern erhalten den Zustand.

Im Geröllmeer (36) entspricht die Quote allen vorhandenen Edelsteinen. Von unten greifen und seitlich ausweichen vermeidet, unter einem gerade gelösten Felsen stehenzubleiben. Die Außenränder dienen als Verbindung zwischen den Adern. Das Ausgangstor benötigt zusätzlich seinen Hebel.
