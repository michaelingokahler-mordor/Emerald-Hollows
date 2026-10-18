# Emerald Hollows 0.7: Bestzeiten und Wiederholungen

Stand: 18. Oktober 2026, 20:01 MESZ. Öffentliches Profil: Mufti999. Live-Ranglisten neu abgefragt; alle lokalen Kartenprüfsummen gegen die ausgelieferten Replays geprüft. Daten: [analysis.json](../artifacts/cave-audit-v07/analysis.json). [Visueller Kartenvergleich](../artifacts/cave-audit-v07/index.html).

## Zeitvergleich

| Level | Hauptreplay | Schnellste hier geprüfte Route | Dein neuer Rekord |
|---|---:|---:|---:|
| 11 | 19,1 s | 19,1 s | **41 s** |
| 12 | 21,5 s | 21,5 s | **35,7 s** |
| 13 | 27,2 s | 27,2 s | **42,1 s** |
| 14 | 27,2 s | 19,3 s | **47 s** |
| 15 | 32,2 s | 32,2 s | **61,2 s** |
| 16 | 25,7 s | 25,1 s | **55,7 s** |
| 17 | 47,9 s | 37,0* s | **85,6 s** |
| 18 | 51 s | 31,1 s | **93,5 s** |
| 19 | 54 s | 52,4 s | **86,9 s** |
| 20 | 64,9 s | 57,8 s | **114 s** |

*17: neu im Audit entdeckte Umgehung, keine empfohlene Rätsellösung. Ohne diesen Fund war die schnellste dokumentierte Route 47,9 s.

Deine zehn Rekorde summieren sich auf 11:02,7 Minuten, im Mittel 66,27 s. Vor dem Umbau waren es 2:57,4 Minuten bzw. 17,74 s: Faktor 3,74. Der Mittelwert der Hauptreplays beträgt 37,07 s; dein Mittelwert liegt beim 1,79-Fachen. Das ist keine Bewertung deiner Spielleistung: Testreplays kennen Karte, Timing und Weg, und sammeln teils andere Mengen. Beispielsweise sammelst du in 13/19/20 28/72/85 Kristallpunkte, die Hauptreplays 36/80/103. Gegnerboni kommen getrennt hinzu.

Die öffentlich sichtbaren Bestzeiten sagen nichts über fehlgeschlagene Versuche, Erstspielzeiten oder deine konkrete Route. Aus dem Abstand darf deshalb nicht auf eine bestimmte verlorene Zeit beim Orientieren oder Bedienen geschlossen werden. Keine der geprüften Routen ist als global optimal bewiesen. Die Level-01–10-Rekorde sind gegenüber dem vorigen Abruf unverändert.

Die neuen Höhlen haben mehr Umfang. Die zuvor genannten 3–6 Minuten sind auch mit deinen erfolgreichen Rekorden nicht erreicht; 17–20 liegen bei 1:25,6 bis 1:54,0. Ob längere erfolgreiche Durchläufe überhaupt das beste Ziel sind, muss getrennt von der Vielfalt entschieden werden.

## Befunde zur Gestaltung

### 1. Wiederverwendete Apparaturen: 13, 19 und 20

13 und 19 übernehmen beide den alten Level-19-Kern. Das 9×7-Feld an (9,5) ist in den aktuellen Karten exakt gleich. Hebel, Tor, Vorrat und Anfangspositionen der Käfer stimmen ebenfalls überein. Vorgehen: verbinden, zum Spender wechseln, beim Eintreten in den Schacht auslösen, Diamant holen. Neue Sammelgebiete verlängern diese Aufgabe, verändern sie aber nicht.

20 setzt denselben Geräteaufbau um (16,2) versetzt ein: Tor, zwei Hebel, Spender und Käfer behalten ihre relativen Positionen. Im markierten 9×7-Ausschnitt stimmen 55/63 Zeichen überein; die Unterschiede sind Zugänge. Das ist eine lokale Bereichsmessung, kein Ähnlichkeitsprozentsatz für das gesamte Level. Die weiteren Stationen machen 20 umfangreicher, die zentrale Wiederholung bleibt.

### 2. Level 15 wiederholt einen Teil von 13

13 führt bereits den endlichen Spender und den Kristallkäfer-Abwurf ein. 15 fordert denselben Treffer erneut, diesmal ohne vorherige Fusion. Es ist eine leichtere Variante einer schon bekannten Aufgabe, obwohl es nach der Einführungsphase liegt. Die drei neuen Sammelgebiete schaffen keine neue Verwendung des Spenders.

### 3. 31 Sammelkammern aus einem Muster

Alle 31 zusätzlichen Abbaukammern entstehen aus `deposit()` in `src/cave-design.ts`. Die Funktion verwendet dieselbe Liste normierter Edelsteinpositionen, skaliert oder gespiegelt, feste Sockel unter jedem Edelstein, zwei Teilriegel in größeren Kammern und bis zu zwei Eckfelsen. Breite, Höhe, Menge und Verbindungen unterscheiden sich, die Tätigkeit bleibt häufig dieselbe: durch Erde graben und freistehende Funde einsammeln.

Das erklärt die visuelle und spielerische Ähnlichkeit besser als ein Vergleich kompletter Rechteckkarten. Ein globaler Zeichenvergleich würde vor allem die vielen gemeinsamen Mauerfelder zählen. Die zusätzliche Fläche erzeugt zu wenig gegenseitige Abhängigkeit zwischen Sammeln, Felsen, Käfern und Torzuständen.

### 4. Level 17: Kernrätsel umgehbar

Ein neuer Simulationsdurchlauf gewinnt in **37,0 s mit 69 Kristallpunkten**, ohne Schiebe-, Schalt- oder Aufprallereignis. Eingaben werden regulär simuliert; keine Zustandsänderung von außen. Route: Westabbau → tiefer Abbau → Ostabbau → Ausgang bei (3,5). Die ergänzten Verbindungen und frei zugänglichen Vorräte machen die Vorbereitung der Felsablage und den letzten Rückweghebel unnötig.

Damit widerspricht die Karte ihrem Hinweis. Die vorhandenen Tests bewiesen die Lösbarkeit der beabsichtigten Route, aber nicht deren Notwendigkeit. Das ist ein Designfehler, kein bloßer Geschmacksunterschied. Der Nachweis und die Ereigniszahlen stehen in `analysis.json` unter `bypass17`.

### 5. Verwandte, aber sinnvoll unterscheidbare Aufgaben

- 11 und 14 verwenden gekoppelte Torzustände. 14 erweitert dies zu einer Auswahl von mindestens drei aus vier Bezirken; das ist eine tragfähige Weiterentwicklung, wenn die Bezirke individuell werden.
- 16 und 18 lenken einen Käfer in eine Seitennische. 16 verlangt dauerhaftes lebendiges Einsperren; 18 erlaubt die Wahl zwischen bewachter Abkürzung und sicherem Umweg. Diese Entscheidung ist unterschiedlich, die räumliche Inszenierung sollte stärker auseinandergehen.
- 12 zeigt Richtung und Fusion geschützt. Das ist als Einführung vertretbar; die Fusion ist dort Vorführung, kein eigenständig zu lösendes Timingproblem.

## Empfohlene nächste Überarbeitung

1. **17 reparieren:** Rückweg und notwendige Ausbeute räumlich an die Vorbereitung binden; negative Tests für das Auslassen der zentralen Schritte ergänzen.
2. **19 neu entwerfen:** Fusion als Zusammenführungs-/Wegeplanungsproblem mit getrennten Zugängen einsetzen; keine dritte Kopie der Spenderstation.
3. **15 neue Anwendung geben:** dosierte Steine verändern Wege oder sperren einen Gegner ein, statt erneut nur den bekannten Kristallkäfer zu treffen. Vorher prüfen, dass die bestehende Fallphysik die konkrete Konstruktion trägt.
4. **20 eigenes Finale:** dieselben bekannten Regeln kombinieren, aber mit einer neuen Anordnung und Folgen für den Rückweg.
5. **Sammelkammern individuell bauen:** Felsfelder, verzweigte Stollen, riskante reiche Taschen und Sammelentscheidungen, die später Wege öffnen oder schließen. Weniger identische Rechteckräume; nicht lediglich noch mehr Fläche.

Keine Karten, Rekorde oder Veröffentlichung wurden in diesem Audit geändert. Die Vorschläge sind noch nicht umgesetzt.
