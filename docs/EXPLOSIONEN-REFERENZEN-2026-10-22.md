# Explosionsdarstellung: Emerald Mine und Boulder Dash

Recherche am 22. Oktober 2026. Gemeint ist hier **Emerald Mine**, das Amiga-Spiel. Die Beobachtungen unterscheiden die jeweilige Fassung und eine spätere Nachbildung. Version 0.12 setzt darauf aufbauend eine eigene Folge mit acht Bildern und 600 Millisekunden Darstellung um.

## Beobachtungen und Belege

### Emerald Mine: kompatibler X11-/Browser-Port

Der [Browser-Port von steffest](https://github.com/steffest/emerald-mine/tree/590b8d80d526089de2227e85dcf5e37582a4e79a) basiert auf X11 Emerald Mine. Seine README bezeichnet ihn als vollständig kompatibel mit der ursprünglichen Amiga-Fassung. Das ist die Herkunftsangabe des Projekts; der Port ist kein direkt aufgezeichneter Lauf auf originaler Amiga-Hardware.

Die [Grafiktafel](https://github.com/steffest/emerald-mine/blob/590b8d80d526089de2227e85dcf5e37582a4e79a/sprites_emv6.png) zeigt gezeichnete gelb-orange-rote Explosionsformen. Ihre Kontur und Füllung ändern sich zwischen den Bildern. Die [Animationstabelle](https://github.com/steffest/emerald-mine/blob/590b8d80d526089de2227e85dcf5e37582a4e79a/src/datamap.c#L168) verwendet sieben verschiedene Explosionsbilder. Die Zustände Xboom_1 und Xboom_2 bilden daraus zwei Folgen mit je acht Bildzuordnungen. Wiederholte Bilder steuern den Ablauf; die sieben Formen sind keine Aussage über sieben gleich lange Simulationsphasen.

Die Darstellung ist damit eine gezeichnete Bildfolge auf den Spielfeldern. Ein einfaches Rechteck mit ausblendender Transparenz bildet diesen Eindruck nicht ab. Die konkrete Dauer wurde in dieser Recherche nicht am Originalgerät gemessen.

### Boulder Dash: BBC Micro, Original-Disassemblierung

Die [Disassemblierung von TobyLobster](https://github.com/TobyLobster/Boulderdash/tree/f0a2f0c726fe7f6b058f9ee814a02e8891463764) beschreibt die BBC-Micro-Fassung von 1988. Laut README entsteht daraus bytegleich die ursprüngliche Programmdatei dieser Fassung.

Im [Grafikbereich](https://github.com/TobyLobster/Boulderdash/blob/f0a2f0c726fe7f6b058f9ee814a02e8891463764/source/___1___.asm#L351) sind vier Explosionssprites definiert. Die [Zuordnung der Animationszustände](https://github.com/TobyLobster/Boulderdash/blob/f0a2f0c726fe7f6b058f9ee814a02e8891463764/source/___1___.asm#L889) wechselt diese Grafiken über die Explosionsphasen. Der Ablauf entsteht feldweise aus Spritezuständen und anschließenden Zustandswechseln, nicht aus einer frei skalierten runden Feuerkugel.

Dies belegt vier Grafiken in dieser BBC-Fassung. Es belegt keine einheitliche Framezahl, Palette oder Geschwindigkeit für alle C64-, Atari-, Amiga- und späteren Boulder-Dash-Fassungen.

### Ergänzender Bildvergleich: JavaScript-Boulder-Dash

Die [Nachbildung von Jake Gordon](https://github.com/jakesgordon/javascript-boulderdash/tree/61f0bb59785878669a28796c471845bb9a91402e) enthält eine gut lesbare [Grafiktafel](https://github.com/jakesgordon/javascript-boulderdash/blob/61f0bb59785878669a28796c471845bb9a91402e/images/sprites.png). Die Explosionszustände verwenden drei unterschiedliche Grafiken in einer Fünferfolge: A–B–C–B–A. Sie sind [im Quellcode](https://github.com/jakesgordon/javascript-boulderdash/blob/61f0bb59785878669a28796c471845bb9a91402e/boulderdash.js#L61) getrennt für das Ende als Leerraum oder Diamant aufgeführt.

Das ist eine Nachbildung, kein Beleg für die exakte Grafik oder das Timing aller Originalfassungen. Nützlich ist die sichtbare Idee: ein kurzer Aufbau, ein dichter Ausbruch, dann zurückgehende Funken und das klar erkennbare Ergebnis.

## Bisherige Darstellung in Emerald Hollows

[src/scene.ts](../src/scene.ts) erzeugt beim Ereignis explode ein orangefarbenes Rechteck über drei mal drei Feldern. Es blendet innerhalb von 420 Millisekunden aus. Die sonstigen kleinen Partikel betreffen andere Ereignisse. Das war der Zustand vor 0.12; die neue Folge wird in `src/silk-view.ts` aus eigener Vektorgrafik erzeugt.

Der Regelkern berechnet die Explosion unabhängig davon. Die vorliegende Aufgabe ist zunächst ein Darstellungsentwurf und die Planung der neuen Netz-/Feuerregeln.

## Vorschlag für die eigene Animation

Eine eigene Folge aus sechs bis acht Bildern im vorhandenen Grafikstil. Als erster visueller Prototyp sind 450–650 Millisekunden sinnvoll; das ist ein Vorschlag, keine gemessene Referenzdauer.

| Phase | Darstellung | Zweck |
|---|---|---|
| Zündung | Kleiner, heller Kern am Explosionszentrum | Ursprung lesbar machen |
| Ausbruch | Gelb-orange Zungen brechen unregelmäßig über die betroffenen Felder aus | Kraft und räumliche Wirkung zeigen |
| Maximum | Dichtes, lebendiges Feuer mit heller Mitte und dunkleren Rändern | Den eigentlichen Schlag sichtbar machen |
| Zerfall | Kontur zerreißt in kleinere Flammen und Funken | Das Ende der Explosion ankündigen |
| Abklingen | Kurze dunklere Rauch- und Glutreste | Wieder freie Sicht auf Felsen, Beute und Wege |

Das Raster bleibt erkennbar; die Explosion soll wie ein kurzer Ausbruch wirken. Verstärkte Wände und geschützte Geräte brauchen ein verständliches Erscheinungsbild. Kosmetische Partikel außerhalb der Wirkung erzeugen keine zusätzlichen Schadensfelder. Kein großflächiges Dauerblenden, das Gegner oder Touchbedienung verdeckt.

Für brennende Netze ist eine **andere, anhaltende Animation** nötig: glühende Fäden, kleine wandernde Flammen und sichtbares Verschwinden des Netzes. Die kurze Explosion darf nicht mit einem weiter gefährlichen Brandfeld verwechselt werden. Die Branddauer gehört in die Simulation; die Darstellung liest diesen Zustand.

Im [endgültigen Kapitelplan für 41–50](KAPITEL-5-ENTWURF-41-50.md) ist dafür festgelegt: **zwei Sekunden Brand pro Netzfeld, Entzündung direkt benachbarter Netzfelder nach einer Sekunde**. Jede Flamme hat ihre eigene Uhr. Das sind die gewählten Spielregeln von Emerald Hollows, keine aus den historischen Vorbildern ermittelten Zeiten. Die Explosionsanimation verkürzt oder verlängert diese Branduhren nicht.

## Abnahme vor Integration

- Standbilder und eine laufende Bildfolge auf dunklem Boden, Erde, Stahl und neben Edelsteinen vergleichen.
- Den Übergang von Explosion zu brennendem Netz zeigen; das tatsächliche Ende des Brandzustands muss erkennbar sein.
- Mehrere gleichzeitige Explosionen sowie das Ausblenden beim Neustart prüfen. Keine liegen gebliebenen Effekte.
- Desktop- und Touchansicht, Pause und unterschiedliche Bildraten prüfen. Effektdauer darf das Ergebnis eines Replays nicht verändern.
- Eine reine Grafikverbesserung kann die bisherigen Regeln unverändert darstellen. Netzbrand braucht dagegen seine neue, separat getestete Regelversion.

Die offiziellen Webseiten von Artsoft und Boulder Dash waren aus dieser Cloud-Umgebung nicht erreichbar (HTTP 403). Die Aussagen oben stützen sich auf die tatsächlich gelesenen öffentlichen GitHub-Quellen und angesehenen Grafiktafeln. Ein Live-Video oder ein Lauf auf Originalhardware wurde nicht geprüft.
