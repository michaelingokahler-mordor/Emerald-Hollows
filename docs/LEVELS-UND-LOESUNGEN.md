# Die vierzig Höhlen – Entwurf und Lösungen

Alle Lösungen wurden im Normalspiel mit aktiven Gegnern, Schwerkraft und Countdown ausgeführt und als Replay erneut geprüft. Ein Lösungsreplay beweist Lösbarkeit; es ersetzt kein menschliches Urteil über Spielspaß.

Legende: X Außenwand, # Mauer, . Erde, Leerzeichen Gang, P Spieler, E Ausgang, R Fels, M Smaragd, D Diamant, C weißer Diamantkäfer, >/< /^/v blaue Krabbler mit Startausrichtung; u/r/d/l lila Krabbler; H hartes Muttergestein; 1/2/3/4 Grabe-Käfer (oben/rechts/unten/links). Goldene Schlüsselträger, Gehege und Geräte werden unter jeder Karte gesondert angegeben. strike = reguläre benachbarte Aktion zeitlich auf einen Treffer abstimmen; trap/capture = erst bei tatsächlicher Gefangenschaft schließen; clear = auf freien Durchgang warten; key = freigesetzten Schlüssel regulär sammeln. use = frische Hebelbetätigung mit anschließendem Loslassen; until = auf Käfer an der angegebenen Koordinate warten; harvest = alle erreichbaren Edelsteine im bezeichneten Bereich mit regulären Bewegungseingaben sammeln.

## 01 – Die erste Schicht

Ein Licht im Dunkeln. 18 × 12 Felder, Quote 8, 13 Sekunden, Schwierigkeit 1/3.

Den ersten Smaragd nebenan aufnehmen. Die westliche Kammer absuchen, durch den unteren Durchgang wechseln und den Diamanten holen. Dann zum Ausgang im Nordosten.

Hinweis: Leertaste + Richtung sammelt nebenan, ohne dass du dich bewegst. Smaragde zählen 1, Diamanten 3. Du kannst auch nach oben graben.

Geprüfter Durchlauf: 36 Takte / 3.6 Sekunden, 8 Kristallpunkte, 8 Wertungspunkte. Replay: public/replays/01.json.

```text
XXXXXXXXXXXXXXXXXX
X···.....#.......X
X·P·M.M..#.....E.X
X........#.###...X
X.###..M.#.###...X
X........#.###...X
X....M...#.......X
X................X
X..M..###....D...X
X........#.......X
X........#.......X
XXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 3 2
snap right
walk 6 2
walk 7 4
walk 5 6
walk 3 8
walk 5 7
walk 10 7
walk 12 7
walk 12 8
walk 13 8
walk 15 8
walk 15 2
```

## 02 – Unter Last

Erst denken. Dann graben.. 22 × 14 Felder, Quote 10, 9 Sekunden, Schwierigkeit 1/3.

Bis zum Seitengang gehen, von (9,5) nach rechts untergraben und den Stein in den Schacht fallen lassen. Danach die Kristalle im rechten Gang sammeln.

Hinweis: Der Stein versperrt den Gang. Geh links unter ihn, grabe von der Seite seine Stütze weg und warte in Sicherheit.

Geprüfter Durchlauf: 28 Takte / 2.8 Sekunden, 10 Kristallpunkte, 10 Wertungspunkte. Replay: public/replays/02.json.

```text
XXXXXXXXXXXXXXXXXXXXXX
X####################X
X####################X
X###R################X
X#P.......RM.D.D.D.E#X
X#.....#··.#######.##X
X#.....###·#######.##X
X#.....###·#.......##X
X#.###.###·#.......##X
X#.....###·#.......##X
X#.....###·#.......##X
X#.....###·#.......##X
X####################X
XXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 8 4
walk 8 5
walk 9 5
snap right
wait 8
walk 9 4
walk 11 4
walk 13 4
walk 15 4
walk 17 4
walk 19 4
```

## 03 – Platz zum Schieben

Ein freier Platz verändert alles. 24 × 16 Felder, Quote 12, 10 Sekunden, Schwierigkeit 2/3.

Zur rechten Nische (13,8), Erde oberhalb entfernen. Über den unteren Gang zurück nach (11,7), den Stein rechts schieben und durch den frei gewordenen Aufstieg in die obere Kammer.

Hinweis: Rechts vom Felsen steckt noch Erde. Räume sie von unten frei. Schiebe den Stein dann von links zur Seite; darüber liegt die Kristallkammer.

Geprüfter Durchlauf: 31 Takte / 3.1 Sekunden, 12 Kristallpunkte, 12 Wertungspunkte. Replay: public/replays/03.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXX
X######################X
X########...........E.#X
X########.............#X
X########.....D.D.D.D.#X
X###########.##########X
X###########.##########X
X##########.R.#########X
X##########.#.#########X
X#.P...........########X
X#...#.R###############X
X#...#..###############X
X####...###############X
X#......###############X
X#......###############X
XXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 13 9
walk 13 8
snap up
walk 13 9
walk 11 9
walk 11 7
move right
walk 12 4
walk 14 4
walk 16 4
walk 18 4
walk 20 4
walk 20 2
```

## 04 – Die rollende Galerie

Stein auf Stein. 28 × 18 Felder, Quote 15, 9 Sekunden, Schwierigkeit 2/3.

Vor dem Stapel anhalten und das linke Seitenfeld nebenan freigraben. Nach dem Abrollen und Fallen den Gang zur Diamantgalerie durchqueren und oben zum Ausgang zurückgehen.

Hinweis: Felsen rollen von runden Unterlagen ab. Seitenfeld und Feld darunter müssen frei sein. Sind beide Seiten frei, rollt der Stein nach links.

Geprüfter Durchlauf: 42 Takte / 4.2 Sekunden, 15 Kristallpunkte, 15 Wertungspunkte. Replay: public/replays/04.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
X##########################X
X#......##########E......##X
X#......##########.......##X
X#....R.################.##X
X#......################.##X
X#.P.........R.D.D.D.D.D.##X
X###.#######·R#############X
X##......###·##############X
X##......###·##############X
X##.###..###·##############X
X##......###·##############X
X##....#.###·##############X
X##....#.###·##############X
X##....#.###·##############X
X##########################X
X##########################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 11 6
snap right
wait 10
walk 15 6
walk 17 6
walk 19 6
walk 21 6
walk 23 6
walk 24 6
walk 24 3
walk 18 3
walk 18 2
```

## 05 – Der Schieferkrabbler

Ein berechenbarer Gegner. 28 × 18 Felder, Quote 12, 10 Sekunden, Schwierigkeit 3/3.

Beobachte die Verzweigung aus der sicheren oberen Galerie. Blau folgt rechts, Lila links. Nach wiederholten gleichen Runden kündigt ein Schimmer den Wechsel an. Der Felsabwurf bleibt eine Möglichkeit, den Weg zu sichern.

Hinweis: Beobachte die Verzweigung aus der sicheren oberen Galerie. Blau folgt rechts, Lila links. Nach wiederholten gleichen Runden kündigt ein Schimmer den Wechsel an. Der Felsabwurf bleibt eine Möglichkeit, den Weg zu sichern.

Geprüfter Durchlauf: 47 Takte / 4.7 Sekunden, 12 Kristallpunkte, 17 Wertungspunkte. Replay: public/replays/05.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXX....EXXX
XXXXXXXXXXXXXXXXXXXX.....XXX
XXXXXXXXXXXXXRXXXXXX.....XXX
XXP.............D.D.D.D..XXX
XX.....RXXXXX·XXXXXXXXXX.XXX
XX......XXXXX···XXXXXXXX.XXX
XX......XX···^X·XXXXXXXX.XXX
XX.XXX..XXXXX···XXXXX.....XX
XX.XXX..XXXXXXXXXXXXX.....XX
XX......XXXXXXXXXXXXX.....XX
XX......XXXXXXXXXXXXX.....XX
XX......XXXXXXXXXXXXX.....XX
XXXXXXXXXXXXXXXXXXXXX.....XX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

```json
{
  "pits": []
}
```

```json
{
  "gates": [],
  "levers": [],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 12 6
strike crawler right
walk 16 6
walk 18 6
walk 20 6
walk 22 6
walk 24 6
walk 24 3
```

## 06 – Sechs Sekunden bis zum Durchbruch

Die wandelbare Mine. 28 × 18 Felder, Quote 9, 30 Sekunden, Schwierigkeit 2/3.

Schiebe den Fels nach rechts, wenn der Käfer oben in der kleinen Bucht ist. Zwei freie Felder starten sechs Sekunden bis zur Explosion. Geh zwei Schritte zurück. Die gewöhnliche Mauer öffnet sich; Stahl bleibt stehen. Sammle danach die drei Diamanten.

Hinweis: Schiebe den Fels nach rechts, wenn der Käfer oben in der kleinen Bucht ist. Zwei freie Felder starten sechs Sekunden bis zur Explosion. Geh zwei Schritte zurück. Die gewöhnliche Mauer öffnet sich; Stahl bleibt stehen. Sammle danach die drei Diamanten.

Geprüfter Durchlauf: 106 Takte / 10.6 Sekunden, 9 Kristallpunkte, 14 Wertungspunkte. Replay: public/replays/06.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXEXXX
XXX.......XXXXXXXXXXXXXX.XXX
XXX.XXXXX.XXXXXXXXXXXXXX.XXX
XXX.XXXXX.XXXXXXXXXXXXXX.XXX
XXX.X.....XXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXX·#.D......DXXX
XXX.XXXXXX..R·^#XXXX.XXXXXXX
XXXP.......XXXXXXXXX.XXXXXXX
XXX.XXXXXX.XXXXXXXXXDXXXXXXX
XXX.XXXXXX.XXXXXXXXX.XXXXXXX
XXX.XXXXXX.XXXXXXXXX......XX
XXX........XXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Schlüsselträger:
```json
[]
```

```json
{
  "pits": []
}
```

```json
{
  "keys": [],
  "doors": [],
  "portals": []
}
```

```json
{
  "gates": [],
  "levers": [],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 11 9
until 14 8 beetle
move right
walk 10 9
wait 62
walk 17 8
walk 20 11
walk 24 8
walk 24 3
```

## 07 – Der richtige Augenblick

Ein Abwurf aus sicherer Entfernung. 28 × 18 Felder, Quote 9, 20 Sekunden, Schwierigkeit 3/3.

Beobachte die aktuelle Laufrichtung. Entferne die Stütze von der Seite so, dass der fallende Fels den Käfer erreicht. Nach dem Treffer führt die untere Sammlung zurück zum Ausgang.

Hinweis: Beobachte die aktuelle Laufrichtung. Entferne die Stütze von der Seite so, dass der fallende Fels den Käfer erreicht. Nach dem Treffer führt die untere Sammlung zurück zum Ausgang.

Geprüfter Durchlauf: 80 Takte / 8.0 Sekunden, 9 Kristallpunkte, 14 Wertungspunkte. Replay: public/replays/07.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXRXXXXXXXXXX
XX.P.....................XXX
XXXXXXXXXXXXXXXXX·XXXXXX.XXX
XXXXXXXXXXXXXXXXX·XXXXXX.XXX
XXXXXXX·>···············.XXX
XXXXXXXXXXXXXXXXXXXXXXXX.XXX
XXXXXXXXXXXXXXXXXXXXXXXX.XXX
XXXXXE...XXXXXXXXXXXXXXX.XXX
XXXXX....XXXXXXXXXXXXXXX.XXX
XXXXX...........D.D.D....XXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

```json
{
  "pits": []
}
```

```json
{
  "gates": [],
  "levers": [],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 16 5
strike crawler right
wait 4
walk 24 5
walk 24 13
walk 20 13
walk 18 13
walk 16 13
walk 5 13
walk 5 11
```

## 08 – Der lange Bogen

Es gibt mehr als einen Weg. 30 × 20 Felder, Quote 12, 16 Sekunden, Schwierigkeit 2/3.

Links nach unten graben, die vier Diamanten entlang der unteren Galerie einsammeln und rechts zum Ausgang aufsteigen. Die Kammer in der Mitte ist optional.

Hinweis: Wähle deine Route: Sechs Diamanten bieten 18 Punkte, aber vier Diamanten (12 Punkte) reichen. Vier liegen im unteren Rundgang, zwei im mittleren Abzweig. Du kannst Schätze aus beiden Wegen kombinieren; ein vollständiges Ausräumen ist nicht nötig.

Geprüfter Durchlauf: 46 Takte / 4.6 Sekunden, 12 Kristallpunkte, 12 Wertungspunkte. Replay: public/replays/08.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X############################X
X############################X
X##P................R....E###X
X##.####.###########.####.###X
X##.####.###########.####.###X
X##.####.###########.####.###X
X##.####.################.###X
X##.####...D..D...#######.###X
X##.#############.#######.###X
X##.#############.#######.###X
X##.#############.#######.###X
X##.#############.#######.###X
X##.#############.#######.###X
X##.#############.#######.###X
X##....D....D.....D....D..###X
X############################X
X############################X
X############################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 3 15
walk 7 15
walk 12 15
walk 18 15
walk 23 15
walk 25 15
walk 25 3
```

## 09 – Ein kostbarer Gegner

Der Kristallkrabbler. 28 × 19 Felder, Quote 5, 15 Sekunden, Schwierigkeit 3/3.

Weiß hinterlässt nur beim Zerquetschen einen Diamanten. Nach wiederholten Runden wird Weiß zu einem bernsteinfarbenen Grabe-Käfer und später zurück. R1 liefert einen Fels: Graben plus Richtung betätigt den Hebel. Triff die weiße Form, schiebe anschließend den Eingangsstein nach links und sammle den Diamanten im unteren Arenaweg. Zwei Smaragde ergänzen die Quote.

Hinweis: Weiß hinterlässt nur beim Zerquetschen einen Diamanten. Nach wiederholten Runden wird Weiß zu einem bernsteinfarbenen Grabe-Käfer und später zurück. R1 liefert einen Fels: Graben plus Richtung betätigt den Hebel. Triff die weiße Form, schiebe anschließend den Eingangsstein nach links und sammle den Diamanten im unteren Arenaweg. Zwei Smaragde ergänzen die Quote.

Geprüfter Durchlauf: 57 Takte / 5.7 Sekunden, 5 Kristallpunkte, 15 Wertungspunkte. Replay: public/replays/09.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXX......XXXXXXXXXXXXXXXXXXX
XXX.XXX..XXXXXXXXXXXXXXXXXXX
XXX......XXXX........XXXXXXX
XXX......XXXX.X#XXXX.XXXXXXX
XXXP..........#·XXX..XXXXXXX
XXXXXXXXXXXXXXX·XXXX.XXXXXXX
XXXXXXXXXXXXXC····R..XXXXXXX
XXXXXXXXXXXXX·····XX.XXXXXXX
XXXXXXXXXXXXXXXXXXXXMX...XXX
XXXXXXXXXXXXXXXXXXXX.X...XXX
XXXXXXXXXXXXXXXXXXXXMX...XXX
XXXXXXXXXXXXXXXXXXXX.X...XXX
XXXXXXXXXXXXXXXXXXXXE....XXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

```json
{
  "pits": []
}
```

```json
{
  "gates": [],
  "levers": [
    {
      "id": "drop",
      "label": "R1",
      "x": 14,
      "y": 8,
      "gates": [],
      "dispensers": [
        "R1"
      ],
      "view": {
        "x": 12,
        "y": 6,
        "width": 9,
        "height": 7
      }
    }
  ],
  "dispensers": [
    {
      "id": "R1",
      "label": "R1",
      "x": 15,
      "y": 7,
      "stock": 1
    }
  ]
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 13 8
strike crystal-crawler right
walk 20 8
walk 20 10
walk 19 10
move left
wait 2
move left
walk 15 10
snap down
walk 20 10
walk 20 12
walk 20 14
walk 20 16
```

## 10 – Ein Tor nach Lathmar

Am Ende der alten Mine. 40 × 26 Felder, Quote 30, 40 Sekunden, Schwierigkeit 3/3.

Die enge Bucht wird zur Sprengfalle: Schiebe den Riegel, wenn der Käfer oben ist, und ziehe dich vor dem roten Pulsieren zurück. Alternativ nutze den oberen Felsabwurf. Hinter der Wache liegen drei notwendige Diamanten.

Hinweis: Die enge Bucht wird zur Sprengfalle: Schiebe den Riegel, wenn der Käfer oben ist, und ziehe dich vor dem roten Pulsieren zurück. Alternativ nutze den oberen Felsabwurf. Hinter der Wache liegen drei notwendige Diamanten.

Geprüfter Durchlauf: 157 Takte / 15.7 Sekunden, 30 Kristallpunkte, 35 Wertungspunkte. Replay: public/replays/10.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXX......XXX..DEXX
XX......XXXXXXXXXXXXXXXXX.XXXX.XXXDXXXXX
XX....R.XXXXXXXXXXXXXXXXX.XXXX.RXX.XXXXX
XX......XXXXXXXXXXXXXXXXX.XX·X..XXDXXXXX
XX......XXXXXXXXXXXXXXXXX.XX·XX·XX.XXXXX
XX......XXXXXXXXXXXXXXXX...R··<·····XXXX
XX......XXXXXXXXXXXXXXXX.XX...XXXXXXXXXX
XXXX.XXXXXXXXXXXXXXXXXXX.XX...XXXXXXXXXX
XXXX.XXXXXXXXXXXXXXXXXXX.XXX·XXXXXXXXXXX
XXXX.XXXXXX.D.D.D.D.RD.D.DXX·XXXXXXXXXXX
XXXX.XXXXXX.XXXXXXX·.XX.XXXX·XXXXXXXXXXX
XXXX.XXXXXX.XXXXXXXX·XX.XXXX·XXXXXXXXXXX
XXXX.XXXXXX.XXXXXXXX·XX.XXXX·XXXXXXXXXXX
XXXX.XXXXXX.XXXXXXXX·XX.XXXXXXXXXXXXXXXX
XXXX.XXXXXX.XXXXXXXX·XX.XXXXXXXXXXXXXXXX
XXXX.XXXXX.R.XXXXXXX·XX....XXXXXXXXXXXXX
XXXX.XXXXX.X.XXXXXXX·XX.M..XXXXXXXXXXXXX
XX.P..........XXXXXX·XX....XXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXX·XX...MXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXX·XXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXX·XXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

```json
{
  "pits": []
}
```

```json
{
  "gates": [],
  "levers": [],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 12 20
walk 12 19
snap up
walk 12 20
walk 10 20
walk 10 18
move right
walk 11 12
walk 12 12
walk 14 12
walk 16 12
walk 18 12
walk 19 12
walk 19 13
snap right
wait 12
walk 19 12
walk 21 12
walk 23 12
walk 25 12
walk 24 12
walk 24 8
walk 26 8
until 28 6 crawler
move right
walk 25 8
wait 61
walk 27 9
walk 27 9
walk 27 10
walk 29 10
walk 29 8
walk 30 8
walk 34 6
walk 34 4
walk 36 3
walk 37 3
```

## 11 – Das erste Tor

Ein Hebel, ein neuer Weg. 32 × 22 Felder, Quote 22, 80 Sekunden, Schwierigkeit 2/3.

A öffnen, den Schiebestein lösen und die obere Galerie sammeln. In der Ostkammer weiter sammeln. Zum Hebel zurückkehren und B öffnen; im Westen die Quote ergänzen und nach Süden zum Ausgang.

Hinweis: A öffnet die östliche Mine, B den Ausgang im Westen. Beide Tore wechseln gegensinnig. Hole genügend Schätze hinter A, kehre zum Hebel zurück und öffne B. Die untere Westkammer bietet weitere Smaragde.

Geprüfter Durchlauf: 191 Takte / 19.1 Sekunden, 38 Kristallpunkte, 38 Wertungspunkte. Replay: public/replays/11.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X##############################X
X##############################X
X###############..D..D..D.#####X
X###############.########.#####X
X###############.########.#####X
X##############.R.#######.#####X
X##############.#.#######.#####X
X#.P.....#.............##.#####X
X##.#####################.#####X
X##.#####################.#####X
X#.M........M#####............#X
X#D....M....######M.........M.#X
X##..M.#...M.######.D...M...#.#X
X#M..#.M...#M#####.M#...#.M...#X
X##..M.#..M.######.#......#...#X
X#...#....#..#####M.....M....M#X
X##################.....#....##X
X##.##############...M....M..D#X
X##E##############...#....#..##X
X##############################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

```json
{
  "gates": [
    {
      "id": "A",
      "x": 9,
      "y": 8,
      "open": false,
      "label": "A"
    },
    {
      "id": "B",
      "label": "B",
      "x": 3,
      "y": 17,
      "open": true
    }
  ],
  "levers": [
    {
      "id": "A-lever",
      "x": 5,
      "y": 7,
      "gates": [
        "A",
        "B"
      ],
      "dispensers": [],
      "label": "A/B"
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 5 8
use up
walk 17 8
walk 17 7
snap up
walk 17 8
walk 15 8
walk 15 6
move right
walk 16 3
walk 24 3
harvest 18 11 12 9
walk 5 8
use up
harvest 2 11 11 6
walk 3 19
```

## 12 – Die zweite Runde

Beobachten, verbinden, sammeln. 36 × 26 Felder, Quote 22, 60 Sekunden, Schwierigkeit 2/3.

Beobachte die aktuellen Farben: Blau folgt rechts, Lila links; wiederholte Runden ändern die Richtung. Bereite F vor und nutze die Querung, wenn die Patrouille entfernt ist. Verbinde danach die beiden Sammelbezirke.

Hinweis: Beobachte die aktuellen Farben: Blau folgt rechts, Lila links; wiederholte Runden ändern die Richtung. Bereite F vor und nutze die Querung, wenn die Patrouille entfernt ist. Verbinde danach die beiden Sammelbezirke.

Geprüfter Durchlauf: 215 Takte / 21.5 Sekunden, 31 Kristallpunkte, 31 Wertungspunkte. Replay: public/replays/12.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXX·····XXX·····XXXXXXXXXXXXXXXXXXX
XXXX··X·<XXX··X·lXXXXX··>#l··XXXXXXX
XXXX·····XXX·····XXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXX#XXXXXXXXXXXXXXX
XXXP...........................XXXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXX
XXR...........XXXXXXX.....D......RXX
XX.M.........MXXXXXXXM....X.....M.XX
XX.X....M....XXXXXXXXX.....M....X.XX
XX......X.....XXXXXXX......X......XX
XX..XXXXXXX..DXXXXXXXM.XXXXXXXX...XX
XX...M......MXXXXXXXXX.M......M...XX
XX...X......X.XXXXXXX..XD..........X
XXM.....M.....XXXXXXX...X..M.....M.X
XXX..XXXXXXX..XXXXXXX...XXXXXXXX.X.X
XX...........MXXXXXXXM............#X
XX...........XXXXXXXXX.............X
XX...M....M...XXXXXXX...M.....M..M.X
XX...X....X...XXXXXXX...X.....X..X.X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXEX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

```json
{
  "pits": []
}
```

```json
{
  "gates": [
    {
      "id": "F",
      "label": "F",
      "x": 25,
      "y": 3,
      "open": false
    },
    {
      "id": "G",
      "label": "F",
      "x": 34,
      "y": 20,
      "open": false
    }
  ],
  "levers": [
    {
      "id": "F-lever",
      "label": "F",
      "x": 20,
      "y": 6,
      "gates": [
        "F",
        "G"
      ],
      "dispensers": [],
      "view": {
        "x": 18,
        "y": 1,
        "width": 12,
        "height": 8
      }
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
harvest 2 11 12 13
walk 20 7
use up
wait 18
harvest 21 11 13 13
walk 34 24
```

## 13 – Ein kostbares Treffen

Ein Zug, ein Stein. 40 × 27 Felder, Quote 28, 80 Sekunden, Schwierigkeit 3/3.

Die längeren Wartegänge halten die Käfer zunächst sicher. A verbindet die Zuführungen. Beobachte ihre aktuellen Farben und betätige S, sobald der weiße Käfer im Abwurf steht. S liefert pro Zug einen Fels.

Hinweis: Die längeren Wartegänge halten die Käfer zunächst sicher. A verbindet die Zuführungen. Beobachte ihre aktuellen Farben und betätige S, sobald der weiße Käfer im Abwurf steht. S liefert pro Zug einen Fels.

Geprüfter Durchlauf: 271 Takte / 27.1 Sekunden, 36 Kristallpunkte, 46 Wertungspunkte. Replay: public/replays/13.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXX...................XXXXXXXXXXXXX
XXXXXXXX.XXXXX#XXX.XXXXXR....D.......RXX
XXXXXXXX.X##XX·XXX.XXXXX.....X........XX
XX.P.M.M....XX·XXX.XXXXXM..........M..XX
XXX.XXXXXXXXXX·XXX.XXXXXX..........X..XX
XXX.XXXXXXXXX>#l·X.XXXXX.......M......XX
XXX.XXXXXXXXX···....EXXX.......X......XX
XXX.XXXXXXXXX·X·XXXXXXXXM.XXXXXXXXX...XX
XXX.XXXXXXXXX·X·XXXXXXXXX.............XX
XXX.XXXXXXXXX·X·XXXXXXXX..M.......M...XX
XXR..........XXXXXXXXXXX..X.......X...XX
XX.M........MXXXXXXXXXXX...D..........XX
XX.X...M....XXXXXXXXXXXX...X..........XX
XX.....X....DXXXXXXXXXXX.......M.....MXX
XX...M.....MXXXXXXXXXXXX...XXXXXXXXX.XXX
XX...X.....X.XXXXXXXXXXXM.............XX
XXM....M.....XXXXXXXXXXXX.............XX
XXX....X....MXXXXXXXXXXX..............XX
XX..........XXXXXXXXXXXX..............XX
XX...M....M..XXXXXXXXXXX...M......M..MXX
XX...X....X..XXXXXXXXXXX...X......X..XXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

```json
{
  "pits": []
}
```

```json
{
  "gates": [
    {
      "id": "A",
      "x": 14,
      "y": 9,
      "open": false,
      "label": "A"
    }
  ],
  "levers": [
    {
      "id": "A-lever",
      "x": 10,
      "y": 6,
      "gates": [
        "A"
      ],
      "dispensers": [],
      "label": "A",
      "view": {
        "x": 9,
        "y": 5,
        "width": 9,
        "height": 7
      }
    },
    {
      "id": "S-lever",
      "x": 11,
      "y": 6,
      "gates": [],
      "dispensers": [
        "S"
      ],
      "label": "S",
      "view": {
        "x": 9,
        "y": 5,
        "width": 9,
        "height": 7
      }
    }
  ],
  "dispensers": [
    {
      "id": "S",
      "x": 14,
      "y": 5,
      "stock": 3,
      "label": "S"
    }
  ]
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
harvest 2 14 11 11
walk 10 7
use up
walk 11 7
strike crystal-crawler up
wait 7
walk 8 7
walk 8 4
walk 18 4
walk 18 9
walk 17 10
walk 14 10
harvest 24 5 14 20
walk 20 10
```

## 14 – Die vier Reviere

Jeder Weg verändert die Mine. 48 × 30 Felder, Quote 36, 65 Sekunden, Schwierigkeit 3/3.

Westen: verzweigte Erzadern. Norden: kurze Diamantstollen. Osten: Rundgang mit Abzweig. Süden: Werkstatt mit Sackgasse. Drei Reviere reichen für 36 Punkte. A/B wechselt die inneren Zugänge; außen sind benachbarte Reviere verbunden.

Hinweis: Westen: verzweigte Erzadern. Norden: kurze Diamantstollen. Osten: Rundgang mit Abzweig. Süden: Werkstatt mit Sackgasse. Drei Reviere reichen für 36 Punkte. A/B wechselt die inneren Zugänge; außen sind benachbarte Reviere verbunden.

Geprüfter Durchlauf: 280 Takte / 28.0 Sekunden, 40 Kristallpunkte, 40 Wertungspunkte. Replay: public/replays/14.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X##############################################X
X##############################################X
X######################.MMM.MD#################X
X###..M.M.M..M..........#########..M..M..M.D.##X
X###.##################.#########.##########.##X
X###.##################.MM.MM.###.##########.##X
X###.##################.#########.##########.##X
X###.##################.#########..M..M.D###.##X
X###..M..M..M.M...#####....MMD###.##########.##X
X###.###########.########.#######.##########.##X
X###.###########.################...M...M....##X
X###.###########.########.#######.##########.##X
X###.###########.####......######.##########.##X
X###.###########.####......######.##########.##X
X###..M...M...M.....#........#....##########.##X
X###.###########.####.P.E..#################.##X
X###.###########.####......#################.##X
X###.###########.#########.#################.##X
X###.###########.#########.#################.##X
X###.###########.#########.#################.##X
X###....M..M..M...########.###..M..M..M...M..##X
X###.#####################.#...#############.##X
X###.#########################.......D######.##X
X#############################.#############.##X
X#############################..M...M...M....##X
X##############################################X
X##############################################X
X##############################################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

```json
{
  "gates": [
    {
      "id": "A",
      "label": "A",
      "x": 20,
      "y": 15,
      "open": false
    },
    {
      "id": "A2",
      "label": "A",
      "x": 25,
      "y": 11,
      "open": false
    },
    {
      "id": "B",
      "label": "B",
      "x": 29,
      "y": 15,
      "open": true
    },
    {
      "id": "B2",
      "label": "B",
      "x": 27,
      "y": 22,
      "open": true
    }
  ],
  "levers": [
    {
      "id": "AB",
      "label": "A/B",
      "x": 23,
      "y": 12,
      "gates": [
        "A",
        "A2",
        "B",
        "B2"
      ],
      "dispensers": []
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 23 13
use up
harvest 2 2 18 25
harvest 22 2 8 9
walk 23 13
use up
harvest 29 20 17 8
walk 24 16
```

## 15 – Drei Reviere, ein Rückweg

Verändere den Weg zurück. 50 × 38 Felder, Quote 36, 155 Sekunden, Schwierigkeit 3/3.

S verschließt das markierte größere Gehege; der Käfer muss darin lebendig bleiben. A öffnet den Bezirk hinter dem Start, B den Weg hinter A und C den Ausgang. Erledige die Felsarbeiten und sammle auf Hin- und Rückwegen.

Hinweis: S verschließt das markierte größere Gehege; der Käfer muss darin lebendig bleiben. A öffnet den Bezirk hinter dem Start, B den Weg hinter A und C den Ausgang. Erledige die Felsarbeiten und sammle auf Hin- und Rückwegen.

Geprüfter Durchlauf: 530 Takte / 53.0 Sekunden, 37 Kristallpunkte, 42 Wertungspunkte. Replay: public/replays/15.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX#XXXXXXXXXXXXXXXXXXXXX
XXX...M..M..#..M..M.....XXXXDXXXXXXXXXXXXXXXXXXXXX
XXX.XXXXXXXXXXXXXXXXX.X.XXXX.XXXXXXXXXXXXXXX#XXXXX
XXX.XXXXXXXXXXXXXXXXX.X.XXXX.XXXXXX..M..M...DXXXXX
XXX.XXXXXX#XXXXXXXXXX.X.XXXX.XXXXXX.XXXXXXXXXXXXXX
XXX.XXXX#X·XXXXXXXXXX.X.XXXX.XXXXXX.XXXXXXXXXXXXXX
XXXP.....X·XXXXXXXXXX.XR.M...XXXXXX.XXXXXXXXXXXXXX
XXX.XXXXXX·XXXXXXXXXX...XXXXXXXXXXX.XXXXXXXXXXXXXX
XXX.XXXXXX··<··XXXXXXXX·XXXXXXXXXXX.XXXXXXXXXXXXXX
XXX.XXXXXXXXXXXXXXXXXXX·XXXXXXXXXX.R.XXXXXXXXXXXXX
XXX.XXXXXXXXXXXXXXXXXXX·XXXXXXXXXX.X.XXXXXXXXXXXXX
XXX.XXXXXXXXXXXXXXXXXXX·XXXXXXXXXX.........XXXXXXX
XXX.XXXXXXXXXXXXXXXXXXX·XXXXXXXXXX.XXXXXXX.XXXXXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXMXXXXXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXX.XXXXXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXMXXXXXXX
XXX..M..M..M..M....XXXXXXXXX..M..M..M..M.......XXX
XXX.XXXXXXXXXXXXXX.XXXXXXXXX.XXXXXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXX.XXXXXXXXX.XXXXXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXX.XXXXXXXXX.XXXXXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXX.XXXXXXXXX.XXXXXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXX.XXXXXXXXX.XXXXXXXXXXXXXXXXX#XXX
XXX.XXXXXXXXXXXXXX.XXXXXXXXX.XXXXXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXX.XXXXXXXXX.XXXXXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXX.M..M..M...XXXXXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXX#XXXXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXX..M..M..DXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXX.XXXXXXXX.XXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXX.XXXXXXXX.XXX
XXX.....#....DXXXXXXXXXXXXXXX.XXXXXXX.XXXXXXXX.XXX
XXXXXXXXXXXXX.XXXXXXXXXXXXXXX...M..M...M...M...XXX
XXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Markierte Gehege:
```json
[
  {
    "id": "PEN",
    "x": 11,
    "y": 10,
    "width": 4,
    "height": 1,
    "required": 1
  }
]
```

```json
{
  "pits": []
}
```

```json
{
  "gates": [
    {
      "id": "A",
      "label": "A",
      "x": 12,
      "y": 3,
      "open": false
    },
    {
      "id": "B",
      "label": "B",
      "x": 46,
      "y": 23,
      "open": false
    },
    {
      "id": "C",
      "label": "C",
      "x": 8,
      "y": 32,
      "open": false
    }
  ],
  "levers": [
    {
      "id": "S-lever",
      "label": "S",
      "x": 8,
      "y": 7,
      "gates": [],
      "dispensers": [
        "S"
      ],
      "view": {
        "x": 7,
        "y": 5,
        "width": 8,
        "height": 7
      }
    },
    {
      "id": "A-control",
      "label": "A",
      "x": 44,
      "y": 4,
      "gates": [
        "A"
      ],
      "dispensers": []
    },
    {
      "id": "B-control",
      "label": "B",
      "x": 28,
      "y": 2,
      "gates": [
        "B"
      ],
      "dispensers": []
    },
    {
      "id": "C-control",
      "label": "C",
      "x": 29,
      "y": 28,
      "gates": [
        "C"
      ],
      "dispensers": []
    }
  ],
  "dispensers": [
    {
      "id": "S",
      "label": "S",
      "x": 10,
      "y": 6,
      "stock": 3
    }
  ]
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 8 8
trap PEN up
wait 8
walk 36 13
walk 36 12
snap up
walk 34 13
walk 34 11
move right
walk 35 5
walk 44 5
use up
walk 21 3
walk 21 9
walk 22 9
snap right
wait 8
walk 23 8
walk 28 8
walk 28 3
use up
walk 46 18
walk 46 33
walk 37 33
walk 37 29
walk 29 29
use up
harvest 2 17 45 18
walk 13 35
```

## 16 – Die umgegrabene Patrouille

Verändere den Weg zurück. 46 × 34 Felder, Quote 36, 145 Sekunden, Schwierigkeit 3/3.

Grabe hinter P eine Umlenkung und ziehe dich zurück. Schließe OUT nach dem Graben vom sicheren Vorraum aus. Warte dort, bis die Käfer im inneren Gehege stehen, und schließe P/E. Öffne danach OUT zur Sammlung wieder. Seine verstärkten Wände halten auch eine spätere Grabform. Der kontrollierte Felsfall im Osten erschließt W und das Diamantlager hinter dem Start.

Hinweis: Grabe hinter P eine Umlenkung und ziehe dich zurück. Schließe OUT nach dem Graben vom sicheren Vorraum aus. Warte dort, bis die Käfer im inneren Gehege stehen, und schließe P/E. Öffne danach OUT zur Sammlung wieder. Seine verstärkten Wände halten auch eine spätere Grabform. Der kontrollierte Felsfall im Osten erschließt W und das Diamantlager hinter dem Start.

Geprüfter Durchlauf: 486 Takte / 48.6 Sekunden, 40 Kristallpunkte, 45 Wertungspunkte. Replay: public/replays/16.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXX#XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXX.XXXXXXXXXXXXXX#XXXXXXXXXXXXXXXX#XXXXXXXXXX
XXXP.................XXXXXXXXXXXXXX...M...XXXX
XXX.XXXXXXXXXXXXXX#X#XXXXXXXXXXXXXXXXXXXX.XXXX
XXX.XXXXXXXXXX···········>··>··XXXXXXXXXX.XXXX
XXX.XXXXXXXXXX·....X#XXX......·XXXXXXXXXX.XXXX
XXX.XXXXXXXXXX·....X...X......·XXXXXXXXXXMXXXX
XXX.XXXXXXXXXX·M...X...XM.....·XXXXXXXXXX.XXXX
XXX.XXXXXXXXXX·....X...X......·XXXXXXXXXX.XXXX
XXX.XXXXXXXXXX·..M.X...X..M...·XXXXXXXXXX.XXXX
XXX.XXXXXXXXXX·....X...X......·XXXXXXXXXX.XXXX
XXX.XXXXXXXXXX·....X...X......·XXXXXXXXXX.XXXX
XXX.XXXXXXXXXX·.M..X...X....M.·.M.M..R.M..XXXX
XXX.XXXXXXXXXX·....XXXXX......·XXXXX..XXXXXXXX
XXX.XXXXXXXXXX·...M......M....·XXXXXX·XXXXXXXX
XXX.XXXXXXXXXX·...............·XXXXXX·XXXXXXXX
XXX.XXXXXXXXXX·················XXXXXX·XXXXXXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX·XXXXXXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX·XXXXXXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXX..#.........D..D..D....XXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXX.XXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXX.XXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXX.XXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXX
XXXXXD..D..D.XXXXD..D..D..XXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Markierte Gehege:
```json
[
  {
    "id": "P",
    "x": 20,
    "y": 12,
    "width": 3,
    "height": 7,
    "required": 1
  }
]
```

```json
{
  "pits": []
}
```

```json
{
  "gates": [
    {
      "id": "P",
      "label": "P",
      "x": 20,
      "y": 11,
      "open": true
    },
    {
      "id": "E",
      "label": "E",
      "x": 3,
      "y": 6,
      "open": false
    },
    {
      "id": "W",
      "label": "W",
      "x": 5,
      "y": 26,
      "open": false
    },
    {
      "id": "SAFE",
      "label": "OUT",
      "x": 20,
      "y": 9,
      "open": true
    }
  ],
  "levers": [
    {
      "id": "PE",
      "label": "P/E",
      "x": 18,
      "y": 7,
      "gates": [
        "P",
        "E"
      ],
      "dispensers": [],
      "view": {
        "x": 17,
        "y": 7,
        "width": 8,
        "height": 14
      }
    },
    {
      "id": "W-control",
      "label": "W",
      "x": 35,
      "y": 7,
      "gates": [
        "W"
      ],
      "dispensers": []
    },
    {
      "id": "outer",
      "label": "OUT",
      "x": 18,
      "y": 9,
      "gates": [
        "SAFE"
      ],
      "dispensers": []
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 20 9
until 30 20 beetle
walk 20 11
walk 20 17
walk 22 17
walk 22 14
walk 20 14
walk 20 8
walk 18 8
use down
capture P up
use down
harvest 14 12 15 10
walk 36 19
snap right
wait 8
walk 37 18
walk 41 18
walk 41 8
walk 35 8
use up
harvest 31 7 12 13
harvest 4 25 23 7
walk 3 5
```

## 17 – Der vorbereitete Rückweg

Jeder Weg verändert die Mine. 44 × 32 Felder, Quote 38, 65 Sekunden, Schwierigkeit 3/3.

Lege vor dem Hinweg die obere Öffnung des Entsorgungsschachts links neben dem Felsen frei. Sammle im Osten. Der letzte Hebel schließt A und öffnet B am Ausgang. Auf dem Rückweg musst du den Felsen von rechts in den vorbereiteten Schacht schieben. Ohne Vorbereitung bleibt nur Zurückschalten und Nacharbeiten.

Hinweis: Lege vor dem Hinweg die obere Öffnung des Entsorgungsschachts links neben dem Felsen frei. Sammle im Osten. Der letzte Hebel schließt A und öffnet B am Ausgang. Auf dem Rückweg musst du den Felsen von rechts in den vorbereiteten Schacht schieben. Ohne Vorbereitung bleibt nur Zurückschalten und Nacharbeiten.

Geprüfter Durchlauf: 255 Takte / 25.5 Sekunden, 39 Kristallpunkte, 39 Wertungspunkte. Replay: public/replays/17.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X##########################################X
X##########################################X
X##########################################X
X##########################################X
X##E####################.M.M.M.M.M..#######X
X##.####################.##########.#######X
X##.####################.##########..M.MD##X
X##.####################.##########.#######X
X##.####################.M.M.M.D###.#######X
X##.###############################.#######X
X##.###############################.#######X
X##.....#.........R.................#######X
X################.################..#######X
X################.################..#######X
X################.################..#######X
X################.################..#######X
X################.################.########X
X##P.M.M..M.M.M.......#.............#######X
X###########################.##############X
X###########################.##############X
X###########################..M.M.M.M.M..##X
X###########################.###########.##X
X###########################.###########.##X
X###########################..M.M.M.D###.##X
X###########################.###########.##X
X###########################.###########.##X
X###########################..M..M..M.M.D##X
X##########################################X
X##########################################X
X##########################################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

```json
{
  "gates": [
    {
      "id": "A",
      "label": "A",
      "x": 22,
      "y": 18,
      "open": true
    },
    {
      "id": "B",
      "label": "B",
      "x": 8,
      "y": 12,
      "open": false
    }
  ],
  "levers": [
    {
      "id": "AB",
      "label": "A/B",
      "x": 35,
      "y": 17,
      "gates": [
        "A",
        "B"
      ],
      "dispensers": []
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 17 13
snap up
walk 17 18
harvest 23 4 19 25
walk 35 18
use up
walk 35 12
walk 19 12
move left
wait 3
walk 3 12
walk 3 5
```

## 18 – Fracht über dem Schacht

Verändere den Weg zurück. 48 × 38 Felder, Quote 38, 135 Sekunden, Schwierigkeit 3/3.

Ein geschobener Fels fällt erst in einem Takt ohne weiteren Schub. Halte Rechts, um ihn über den ersten Schacht bis in den zweiten zu schieben: Der kurze Rückweg bleibt frei. Fällt er in den ersten Schacht, bleibt der längere Diamantweg außen offen. Am östlichen Fels zuerst die Ablage von unten freigraben. Hinter ihm öffnet A/B/E den Rückweg und schließt den oberen Zugang.

Hinweis: Ein geschobener Fels fällt erst in einem Takt ohne weiteren Schub. Halte Rechts, um ihn über den ersten Schacht bis in den zweiten zu schieben: Der kurze Rückweg bleibt frei. Fällt er in den ersten Schacht, bleibt der längere Diamantweg außen offen. Am östlichen Fels zuerst die Ablage von unten freigraben. Hinter ihm öffnet A/B/E den Rückweg und schließt den oberen Zugang.

Geprüfter Durchlauf: 418 Takte / 41.8 Sekunden, 52 Kristallpunkte, 52 Wertungspunkte. Replay: public/replays/18.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X##############################################X
X##############################################X
X##############################################X
X####################...M...M..M....M..M...####X
X####################.####.#######.#######.####X
X####################.####M#######.#######.####X
X#########################.#######M#######.####X
X####################.####.#######.#######.####X
X####################.####..M.D###.#######.####X
X##P........R··········###########M#######.####X
X############·########·###########.#######.####X
X############·########·###########.#######.####X
X############·########·###########D#######.####X
X#######..M..·...M..M.·.M.#....###.#######.####X
X#######.#####.#######·#######.###..M..M##.####X
X#######.#####.#######·#######.###########.####X
X#######.#####.#######·#######M###########.####X
X#######.#####.#######·#######.###########M####X
X#######.#####.###############.###########.####X
X###.....#####.###############M#######.###.####X
X##E####.#####.###############.#######.###M####X
X#######.#####.###############.#######.###.####X
X#######.#####.###############M#######.###.####X
X#######D#####D###############.#######.###...##X
X#######.#####.###############.#######.###.#.##X
X#######.#####.###############........R.##.#M##X
X#######.#####.###############.########....#.##X
X#######D#####.###############.###########.#.##X
X#######.#####D###############.###########.#M##X
X#######.#####.###############.###########.#.##X
X#######.#####.###############.###########.#.##X
X#######.#####.###############..M..M..M....#M##X
X#######.#####.###############.#############.##X
X#######...D...###############..M...M...M...D##X
X##############################################X
X##############################################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

```json
{
  "gates": [
    {
      "id": "A",
      "label": "A",
      "x": 21,
      "y": 7,
      "open": true
    },
    {
      "id": "B",
      "label": "B",
      "x": 26,
      "y": 14,
      "open": false
    },
    {
      "id": "E",
      "label": "E",
      "x": 3,
      "y": 20,
      "open": false
    }
  ],
  "levers": [
    {
      "id": "return",
      "label": "A/B/E",
      "x": 38,
      "y": 19,
      "gates": [
        "A",
        "B",
        "E"
      ],
      "dispensers": []
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 11 10
move right
wait 5
walk 21 4
harvest 23 3 18 13
walk 42 27
walk 39 27
snap up
walk 42 32
walk 30 32
walk 37 26
move right
walk 38 20
use up
harvest 29 16 17 20
walk 30 14
walk 14 14
harvest 7 23 9 13
walk 8 20
walk 3 21
```

## 19 – Zwei getrennte Wege

Jeder Weg verändert die Mine. 44 × 30 Felder, Quote 41, 160 Sekunden, Schwierigkeit 3/3.

L und R geben zwei getrennte Patrouillen frei. Erst wenn beide Zugänge offen sind, können Blau und Lila in der mittleren Galerie zusammentreffen. Beobachte den neuen Kristallkäfer im natürlichen Fallschacht und grabe die Stütze von links weg, sobald er zwei Felder unter der Stütze steht. Danach erschließt du die gebogenen Erzadern.

Hinweis: L und R geben zwei getrennte Patrouillen frei. Erst wenn beide Zugänge offen sind, können Blau und Lila in der mittleren Galerie zusammentreffen. Beobachte den neuen Kristallkäfer im natürlichen Fallschacht und grabe die Stütze von links weg, sobald er zwei Felder unter der Stütze steht. Danach erschließt du die gebogenen Erzadern. Die Mine enthält 38 Punkte; die fehlenden drei liefert nur sein Diamant.

Geprüfter Durchlauf: 535 Takte / 53.5 Sekunden, 41 Kristallpunkte, 51 Wertungspunkte. Replay: public/replays/19.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXX..M..M..M..M..M.M..XXXXXXXXXXXXXXXXXXXX
XXXXX.XXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXEXXXX
XXXXX.XXXXXXXXXXXXXXXXX.XXXX..M..M..M...XXXX
XXXXX.XXXX#XXXRXXXXXXXX.XXXX.XXXXXXXXXX.XXXX
XXXP...........XXXXXXX..XXXX.XXXXXXXXXX.XXXX
XXXXXXXXXXXXXX·XXXXXXX.#XXXX.XXXXXXXXXX.XXXX
XXXXXXXXXXXXXX·XXXXXXX..XXXX..M..M.DXXX.XXXX
XXXXXXX··>··#···#··l··..XXXXXXXXXXX.XXX.XXXX
XXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXX.XXX.XXXX
XXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXX.XXX.XXXX
XXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXX.XXX.XXXX
XXXXXXXXXXXXXXXXXXXXXXX.XXXX.M..M.......XXXX
XXXXXXXXXXXXXXXXXXXXXXX.XXXX.XXXXXXXXXX.XXXX
XXXXXXXXXXXXXXXXXX......XXXX.XXXXXXXXXX.XXXX
XXXXX..M.DXXXXXXXX.XXXX.XXXX.XXXXXXXXXX.XXXX
XXXXX.XXXXXXXXXXXX.XXXX.XXXX.XXXXXXXXXX.XXXX
XXXXX.XXXXXXXXXXXX.XXXX.XXXX..M..M.DXXX.XXXX
XXXXX.XXXXXXXXXXXX.XXXX.XXXXXXXXXXXXXXX.XXXX
XXXXX.XXXXXX..M.M..XXXX.XXXXXXXXXXXXXXX.XXXX
XXXXX.XXXXXX.XXXXXXXXXX.XXXXXXXXXXXXXXX.XXXX
XXXXX.XXXXXX.XXXXXXXXXX.XXXXXXXXXXXXXXX.XXXX
XXXXX.XXXXXX.XXXXXXXXXX..M..M..M..M..M..XXXX
XXXXX.XXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXX..M.M.MDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

```json
{
  "pits": []
}
```

```json
{
  "gates": [
    {
      "id": "L",
      "label": "L",
      "x": 12,
      "y": 10,
      "open": false
    },
    {
      "id": "R",
      "label": "R",
      "x": 16,
      "y": 10,
      "open": false
    }
  ],
  "levers": [
    {
      "id": "left",
      "label": "L",
      "x": 10,
      "y": 6,
      "gates": [
        "L"
      ],
      "dispensers": [],
      "view": {
        "x": 7,
        "y": 5,
        "width": 10,
        "height": 7
      }
    },
    {
      "id": "right",
      "label": "R",
      "x": 23,
      "y": 8,
      "gates": [
        "R"
      ],
      "dispensers": [],
      "view": {
        "x": 14,
        "y": 5,
        "width": 11,
        "height": 7
      }
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 10 7
use up
walk 5 7
walk 5 3
walk 23 3
walk 23 7
use down
walk 23 3
walk 5 3
walk 5 7
walk 10 7
walk 13 7
strike crystal-crawler right
wait 8
walk 5 7
walk 5 3
walk 23 3
walk 23 7
walk 22 7
walk 22 10
walk 14 10
walk 23 10
harvest 4 15 36 13
harvest 24 4 17 16
walk 39 4
```

## 20 – Der letzte Abtransport

Jeder Weg verändert die Mine. 48 × 34 Felder, Quote 44, 100 Sekunden, Schwierigkeit 3/3.

Sammle zuerst in den westlichen Stollen. T/A öffnet die Falltür und den Zugang zur bewachten Engstelle. Warte, bis Lila ganz oben im Schacht steht. Nach dem Treffer liegt der Fels im Durchgang: Schiebe ihn nach rechts, um zur oberen Abzweigung zu gelangen. Hebel B liegt am Ende der östlichen Erzschleife und öffnet den Ausgang.

Hinweis: Sammle zuerst in den westlichen Stollen. T/A öffnet die Falltür und den Zugang zur bewachten Engstelle. Warte, bis Lila ganz oben im Schacht steht. Nach dem Treffer liegt der Fels im Durchgang: Schiebe ihn nach rechts, um zur oberen Abzweigung zu gelangen. Hebel B liegt am Ende der östlichen Erzschleife und öffnet den Ausgang.

Geprüfter Durchlauf: 334 Takte / 33.4 Sekunden, 47 Kristallpunkte, 52 Wertungspunkte. Replay: public/replays/20.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXEXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXRXXXXXXXXXXXXX.XXXXXXX
XXXXXXXXXXXXXXXXXXXXXXX#XX#XXXXXXXXXXXXX.XXXXXXX
XXXXXXXXXXXXXXXXXX......XX·XXXXXXXXXXXXX.XXXXXXX
XXXXXXXXXXXXXXXXXX.XXXX.XX·XXXXXXXXXXXXX.XXXXXXX
XXXXXXXXXXXXXXXXXX.XXXX.XX·...........#..XXXXXXX
XXXXXXXXXXXXXXXXXX.XXXX.#l···X.XXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXX.XXXXXXXXXXX.XXXXXXXXXXXXXXXXX
XXXXXXXX..M.M.DXXX.XXXXXXXXXXX.....M..M.M..XXXXX
XXXXXXXX.XXXXXXXXX.XXXXXXXXXXXXXX.XXXXXXXX.XXXXX
XXXXXXXX.XXXXXXXXX.XXXXXXXXXXXXXX.XXXXXXXX.XXXXX
XXXXXXXX.XXXXXXXXX.XXXXXXXXXXXXXX.XXXXXXXX.XXXXX
XXXXXXXX.XXXXXXXXX.XXXXXXXXXXXXXX..M.M.DXX.XXXXX
XXXXXXXX.M.M...XXX.XXXXXXXXXXXXXX.XXXXXXXX.XXXXX
XXXXXXXXXXXXXX.XXX.XXXXXXXXXXXXXX.XXXXXXXX.XXXXX
XXXXXXXXXXXXXX.XXX.XXXX.XXXXXXXXX.XXXXXXXX.XXXXX
XXXXXXXX..M.M..XXX.XXXX.XXXXXXXXX.XXXXXXXX.XXXXX
XXXXXXXXXXXXXX.XXX.XXXX.XXXXXXXXX..M.MDXXX.XXXXX
XXXXXXXXXXXXXX.XXX.XXXX.XXXXXXXXX.XXXXXXXX.XXXXX
XXXP.M..M..M..M....XXXX.XXXXXXXXX.XXXXXXXX.XXXXX
XXX.XXXXXXXXXX.XXXXXXXX.XXXXXXXXX.XXXXXXXX.XXXXX
XXX.XXXXXXXXXX.XXXXXXXX..M.M.MDXX.XXXXXXXX.XXXXX
XXX.XXXXXXXXXX.XXXXXXXX.XXXXXXXXX.XXXXXXXX.XXXXX
XXX.XXXXXXXXXX.XXXXXXXX.XXXXXXXXX.XXXXXXXX#XXXXX
XXX..M..M..M..DXXXXXXXX.XXXXXXXXX.XXXXXXXX.XXXXX
XXXXXXXXXXXXXXXXXXXXXXX..M..M..M..M..M..M.DXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

```json
{
  "pits": []
}
```

```json
{
  "gates": [
    {
      "id": "T",
      "label": "T",
      "x": 26,
      "y": 6,
      "open": false
    },
    {
      "id": "A",
      "label": "A",
      "x": 24,
      "y": 10,
      "open": false
    },
    {
      "id": "B",
      "label": "B",
      "x": 38,
      "y": 9,
      "open": false
    }
  ],
  "levers": [
    {
      "id": "drop",
      "label": "T/A",
      "x": 23,
      "y": 6,
      "gates": [
        "T",
        "A"
      ],
      "dispensers": [],
      "view": {
        "x": 22,
        "y": 4,
        "width": 9,
        "height": 8
      }
    },
    {
      "id": "return",
      "label": "B",
      "x": 42,
      "y": 27,
      "gates": [
        "B"
      ],
      "dispensers": []
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
harvest 2 11 14 19
walk 23 7
strike beetle up
wait 8
walk 23 10
walk 25 10
move right
walk 26 9
walk 27 9
harvest 19 11 25 20
walk 42 28
use up
walk 40 9
walk 40 4
```

## 21 – Der unterbrochene Ring

Die Torhallen. 44 × 32 Felder, Quote 48, 185 Sekunden, Schwierigkeit 2/3.

Sonne und Mond passen nur zum gleichen Schloss. Ein Schlüssel wird beim Öffnen verbraucht. Hole den dritten Sonnenschlüssel im unteren Seitenstollen: Er öffnet die Querverbindung im Ring. Entscheide, welche Adern du davor und danach sammelst. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Hinweis: Sonne und Mond passen nur zum gleichen Schloss. Ein Schlüssel wird beim Öffnen verbraucht. Hole den dritten Sonnenschlüssel im unteren Seitenstollen: Er öffnet die Querverbindung im Ring. Entscheide, welche Adern du davor und danach sammelst. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Geprüfter Durchlauf: 620 Takte / 62.0 Sekunden, 60 Kristallpunkte, 75 Wertungspunkte. Replay: public/replays/21.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXRXXXXXRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XX.E....X......XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XX.P.·X....·XX........XXXXXXXXXXXXXXXXXXXXXX
XXXXX···XXX···XXXXXXX.XXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXX
XXXX..M..M..M...M........M...M...M...XXXXXXX
XXXX.XXXXXXXXXXXXXXXX.XXXXXXXXXXXXXX.XXXXXXX
XXXX.XXXXXXXXXXXXXXXX.XXXXXXXXXXXXXX.XXXXXXX
XXXX...M..M..M..XXXXX.XXX..M..M..M...XXXXXXX
XXXX.XXXXXXXXXX.XXXXXDXXX.XXXXXXXXXX.XXXXXXX
XXXX.XXXXXXXXXX.XXXXXXXXX.XXXXXXXXXX.XXXXXXX
XXXX.XXXM..M..M.XXXXXXXXX..M..M.DXXX.XXXXXXX
XXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXX
XXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXX
XXXX..M...M...M.........M...M...M....XXXXXXX
XXXX.XXXXXXXXXXXXXXXX.XXXXXXXXXXXXXX.XXXXXXX
XXXX.XXXXXXXXXXXXXXXX.XXXXXXXXXXXXXX.XXXXXXX
XXXX.XXXXXXXXXXXXXXXX.XXXXXXXXXXXXXX.XXXXXXX
XXXX...M..M..M.XXXXXX.XXX..M..M..M...XXXXXXX
XXXX.XXXXXXXXX.XXXXXX.XXX.XXXXXXXXXX.XXXXXXX
XXXX.XXXXXXXXX.XXXXXXDXXX.XXXXXXXXXX.XXXXXXX
XXXX.XXXDM..M..XXXXXXXXXX..M..M.DXXX.XXXXXXX
XXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXX
XXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXX
XXXX..M...M...M....M....M....M...M.......XXX
XXXXXXXXXXXXXXXXXXXXXXRXXXXXXXXXXXXXXXXX.XXX
XXXXXXXXXXXXXXXXXXXXXX.....XXXXXXXXXXXXX.XXX
XXXXXXXXXXXXXXXXXXXXXX·XXX.XXXXXXXXXXXXX.XXX
XXXXXXXXXXXXXXXXXXXXX····M...M...M...M...XXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Schlüsselträger:
```json
[
  {
    "id": "key-first",
    "seal": "sun",
    "x": 5,
    "y": 4,
    "direction": "right"
  },
  {
    "id": "key-second",
    "seal": "moon",
    "x": 11,
    "y": 4,
    "direction": "right"
  },
  {
    "id": "key-link",
    "seal": "sun",
    "x": 21,
    "y": 29,
    "direction": "right"
  }
]
```

```json
{
  "pits": []
}
```

```json
{
  "keys": [],
  "doors": [
    {
      "id": "door-first",
      "seal": "sun",
      "x": 8,
      "y": 3
    },
    {
      "id": "door-second",
      "seal": "moon",
      "x": 15,
      "y": 3
    },
    {
      "id": "door-link",
      "seal": "sun",
      "x": 20,
      "y": 15
    }
  ],
  "portals": []
}
```

```json
{
  "gates": [],
  "levers": [],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 3 3
walk 2 3
walk 2 2
walk 4 2
strike key-first right
key key-first
walk 9 3
walk 9 2
walk 10 2
strike key-second right
key key-second
walk 21 6
walk 26 29
walk 26 27
walk 23 27
strike key-link left
key key-link
walk 21 15
move left
harvest 4 6 37 24
walk 3 2
```

## 22 – Jenseits des Spalts

Die Torhallen. 52 × 36 Felder, Quote 62, 160 Sekunden, Schwierigkeit 2/3.

Gleiche Buchstaben verbinden zwei Türen. Nur du reist hindurch; Steine und Käfer bleiben auf ihrer Seite. Verlasse die Ankunftstür vor der nächsten Reise. Hole den Sonnenschlüssel auf der anderen Seite und verbinde die Erzwege beider Ufer. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Hinweis: Gleiche Buchstaben verbinden zwei Türen. Nur du reist hindurch; Steine und Käfer bleiben auf ihrer Seite. Verlasse die Ankunftstür vor der nächsten Reise. Hole den Sonnenschlüssel auf der anderen Seite und verbinde die Erzwege beider Ufer. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Geprüfter Durchlauf: 540 Takte / 54.0 Sekunden, 69 Kristallpunkte, 74 Wertungspunkte. Replay: public/replays/22.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXEXXXXXXXXXXXXXXXXXXXXXXXXX·..M..M..M..M..M..M.XXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXX
XXXP..M..M..M..M..·..XXXXXXXXXXXXXXXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXXXX.XXXXXXX..M..M..M..M.XXXXXXX.XXX
XXX.XXXXXXXXXXXXXXXX.XXXXXXX.XXXXXXXXXXX.XXXXXXX.XXX
XXX..M..M..M.M.XXXXX.XXXXXXX.XXXXXXXXXXX.XXXXXXX.XXX
XXX.XXXXXXXXXX.XXXXX.XXXXXXX.XXXXXXXXXXX.XXXXXXX.XXX
XXX.XXXXXXXXXX.XXXXX.XXXXXXX.XXXXDM..M...XXXXXXX.XXX
XXX.XXXXXXXXXX.XXXXX.XXXXXXX.XXXXXXXXXXXXXXXXXXX.XXX
XXX.XXXXDM..M..XXXXX.XXXXXXX.XXXXXXXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXXXX.XXXXXXX.XXXXXXXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXXXX.XXXXXXX.XXXXXXXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXXXX.XXXXXXX.XXXXX.M..M..M..M..M.XXX
XXX.XXXX.M..M..M..M..XXXXXXX.XXXXX.XXXXXXXXXXXXX.XXX
XXX.XXXX.XXXXXXXXXXX.XXXXXXX.XXXXX..RXXXXXXXXXXX.XXX
XXX.XXXX.XXXXXXXXXXX.XXXXXXX.XXXXX...XXXXXXXXXXX.XXX
XXX.XXXX.XXXXXXXXXXX.XXXXXXX.XXXXXXX·XXXXXXXXXXX.XXX
XXX.XXXX.XXXXXXXXXXX.XXXXXXX.XXXXX·····M..MXXXXX.XXX
XXX.XXXX..M..M.DXXXX.XXXXXXX.XXXXXXXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXXXX.XXXXXXX.XXXXXXXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXXXX.XXXXXXX.XXXXXXXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXXXX.XXXXXXX..M..MM.M..MDXXXXXXX.XXX
XXX..M..M..M..MDXXXX.XXXXXXX.XXXXXXXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXXXX.XXXXXXX.XXXXXXXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXXXX.XXXXXXX.XXXXXXXXXXXXXXXXXXX.XXX
XXX.XXXXXXXXXXXXXXXX.XXXXXXX..M..M..M..M..M..M.·.XXX
XXX.XXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXX..M..M..M..M...·..XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Schlüsselträger:
```json
[
  {
    "id": "key-return",
    "seal": "sun",
    "x": 34,
    "y": 22,
    "direction": "right"
  }
]
```

```json
{
  "pits": []
}
```

```json
{
  "keys": [],
  "doors": [
    {
      "id": "door-exit",
      "seal": "sun",
      "x": 3,
      "y": 4
    }
  ],
  "portals": [
    {
      "id": "A1",
      "pair": "A",
      "x": 18,
      "y": 5
    },
    {
      "id": "A2",
      "pair": "A",
      "x": 29,
      "y": 3
    },
    {
      "id": "B1",
      "pair": "B",
      "x": 18,
      "y": 32
    },
    {
      "id": "B2",
      "pair": "B",
      "x": 47,
      "y": 30
    }
  ]
}
```

```json
{
  "gates": [],
  "levers": [],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 17 5
move right
walk 34 19
walk 35 19
walk 35 20
strike key-return right
key key-return
harvest 27 2 23 30
harvest 3 5 18 28
walk 3 3
```

## 23 – Freier Empfang

Die Torhallen. 48 × 34 Felder, Quote 52, 155 Sekunden, Schwierigkeit 2/3.

Eine belegte Ankunft verhindert die Reise. Sammle zuerst den Diamanten neben der D-Tür. Bei A versperrt ein Fels das Ziel: Entferne seine Stütze von links, damit er in den Fangschacht sinkt. Die freie Tür wird zum kurzen Rückweg. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Hinweis: Eine belegte Ankunft verhindert die Reise. Sammle zuerst den Diamanten neben der D-Tür. Bei A versperrt ein Fels das Ziel: Entferne seine Stütze von links, damit er in den Fangschacht sinkt. Die freie Tür wird zum kurzen Rückweg. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Geprüfter Durchlauf: 530 Takte / 53.0 Sekunden, 59 Kristallpunkte, 64 Wertungspunkte. Replay: public/replays/23.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXEXXXXXXXXXXXXXXX..M..M..M..M..M..M..M...XXXX
XXXX.XXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXX.XXXX
XXXXP·XXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXX.XXXX
XXXX.XXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXX.XXXX
XXXX.XXXX.D....·.....XXXXX..M..M..M..M..XXX.XXXX
XXXX......XXXX.XXXXX.XXXXXXXXXXXXXXXXXX.XXX.XXXX
XXXXXXXXXXXXXX.......XXXXXXXXXXXXXXXXXX.XXX.XXXX
XXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXRXXXXXX.XXX.XXXX
XXXXXXXXXXXXXXXXXXXX.XXXXX..M.M...M..M..XXX.XXXX
XXXXXXXXXXXXXXXXXXXX.XXXXX.XXXXX·XXXXXXXXXX.XXXX
XXXX..M..M..M..XXXXX.XXXXX.XXXXX·XXXXXXXXXX.XXXX
XXXX.XXXXXXXXX.XXXXX.XXXXX.XXXXX·XXXXXXXXXX.XXXX
XXXX.XXXXXXXXX.XXXXX.XXXXX.XXXXXXXXXXXXXXXX.XXXX
XXXX.XXXXXXXXX.XXXXX.XXXXX.XXXXXXDM.M.M.XXX.XXXX
XXXX.XXXXXXXXX.XXXXX.XXXXX.XXXXXX.XXXXX.XXX.XXXX
XXXX.XXXXXXXXX.XXXXX.XXXXX.XXXXXX.XXXXX.XXX.XXXX
XXXX.XXXXXXXXX.XXXXX.XXXXX.XXXXXX.XXXXX.XXX.XXXX
XXXX.XXXDM..M..XXXXX.XXXXX.XXXXXX.XXXXX.....XXXX
XXXX.XXXXXXXXXXXXXXX.XXXXX.XXXXXX..RXXXXXXX.XXXX
XXXX.XXXXXXXXXXXXXXX..M.M..XXXXXX...XXXXXXX.XXXX
XXXX.XXXXXXXXXXXXXXXXXXXXX.XXXXXXXX·XXXXXXX.XXXX
XXXX..M..M..M..MDXXXXXXXXX.XXXXXX·····M.XXX.XXXX
XXXX.XXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXX.XXXX
XXXX.XXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXX.XXXX
XXXX.XXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXX.XXXX
XXXX..M...M...M...M...M....M...MM..M...M....XXXX
XXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXX..M..M..M..MDXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Schlüsselträger:
```json
[
  {
    "id": "key-exit",
    "seal": "moon",
    "x": 33,
    "y": 24,
    "direction": "right"
  }
]
```

```json
{
  "pits": []
}
```

```json
{
  "keys": [],
  "doors": [
    {
      "id": "door-exit",
      "seal": "moon",
      "x": 4,
      "y": 4
    }
  ],
  "portals": [
    {
      "id": "D1",
      "pair": "D",
      "x": 5,
      "y": 5
    },
    {
      "id": "D2",
      "pair": "D",
      "x": 10,
      "y": 7
    },
    {
      "id": "A1",
      "pair": "A",
      "x": 15,
      "y": 7
    },
    {
      "id": "A2",
      "pair": "A",
      "x": 32,
      "y": 10
    }
  ],
  "views": [
    {
      "x": 29,
      "y": 8,
      "width": 7,
      "height": 8
    }
  ]
}
```

```json
{
  "gates": [],
  "levers": [],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 9 7
snap right
walk 4 5
move right
walk 31 11
snap right
wait 5
walk 33 21
walk 34 21
walk 34 22
strike key-exit right
key key-exit
harvest 20 2 24 30
harvest 4 12 14 18
walk 4 3
```

## 24 – Ein Schlüssel, zwei Türen

Die Torhallen. 56 × 38 Felder, Quote 90, 110 Sekunden, Schwierigkeit 3/3.

Ein Sonnenschlüssel, zwei Türen: Wähle die westliche Diamantader oder das östliche Smaragdfeld. Beide reichen für den Abschluss. Der Mondschlüssel gehört zum Ausgang. Im Osten musst du den Platz neben dem Schiebefelsen von der Gegenseite freigraben. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Hinweis: Ein Sonnenschlüssel, zwei Türen: Wähle die westliche Diamantader oder das östliche Smaragdfeld. Beide reichen für den Abschluss. Der Mondschlüssel gehört zum Ausgang. Im Osten musst du den Platz neben dem Schiebefelsen von der Gegenseite freigraben. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Geprüfter Durchlauf: 381 Takte / 38.1 Sekunden, 106 Kristallpunkte, 116 Wertungspunkte. Replay: public/replays/24.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXEXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXD.M..M..M..M.DXXXX
XXXX..D..D..D..D..XXXXXXXXX.XXXXXXXXXX.XXXXXXXXXXXX.XXXX
XXXX.XXXXXXXXXXXX.XXXXXXXXX.XXXXXXXXXX.XXXXXXXXXXXX.XXXX
XXXX.XXXXXXXXXXXX.XXXXX.M.M..M.DXXXXXX.XXXXXXXXXXXX.XXXX
XXXX.XXXX.D..D..D.XXXXXXXXX.XXX.XXXXXX.XXXXXXXXXXXX.XXXX
XXXX.XXXXXXXXXXXX.XXXXXXXXX.XXX.XXXXXX..M..M..MDXXX.XXXX
XXXX..D..D..DXXXX.XXXXXXXXX.XXX.XXXXXX.XXXXXXXX.XXX.XXXX
XXXX.XXXXXXX.XXXX.XXXXXXXXX.XXX.XXXXXX.XXXXXXXX.XXX.XXXX
XXXX.XXXXXXX.XXXX.XXXXX.M.M..M.DXXXXXX.XXXXXXXX.XXX.XXXX
XXXX.XXXXXXX.XXXX.XXXXX.XXX.XXXXXXXXXX.XXXDM..M.XXX.XXXX
XXXX.XXD..D..XXXX.XXXXX.XXX.XXXXXXXXXX.XXXXXXXXXXXX.XXXX
XXXX.XXXXXXXXXXXX.XXXXX.XXX.XXXXXXXXXX.XXXXXXXXXXXX.XXXX
XXXX.XXXXXXXXXXXX.XXXXX.XXX.XXXXXXXXXX.XXXXXXXXXXXX.XXXX
XXXX.XXXXXXXXXXXX.XXXXX.XXX.XXXXXXXXXX.XXXXX..M..M..XXXX
XXXX.XXXXXXXXXXXX.......................M.XX.XXXXXX.XXXX
XXXX.XXXXXXXXXXXX.XXXXX.XXX.XXXXXXXXXX.XX.XX.XXXXXX.XXXX
XXXX.XXXXXXXXXXXX.XXXXX.XXX.XXXXXXXXXX.XX.XX.XXXXXX.XXXX
XXXX..D..D..DXXXX.XXXXX.M.M..M.DXXXXXX.XX.XXDM..M.X.XXXX
XXXX.XXXXXXX.XXXX.XXXXX.XXX.XXXXXXXXXX.M.DXXXXXXXXX.XXXX
XXXX.XXXXXXX.XXXX.XXXXX.XXX.XXXXXXXXXXXXX.XXXXXXXXX.XXXX
XXXX.XXXXXXX.XXXX.XXXXX.XXX.XXXXXXXXX..R..XXXXXXXXX.XXXX
XXXX.XXXXXXX.XXXX.XXXXX.M.M..M.DXXXXXD.M..M..M.XXXX.XXXX
XXXX.XXD..D..XXXX.XXXXX.XXX.XXX.XXXXX.XXXXXXXX.XXXX.XXXX
XXXX.XXXXXXXXXXXX.XXXRX.XXX.XXX.XXXXX.XXXXXXXX.XXXX.XXXX
XXXX.XXXXXXXXXXXX.XXX..DM.MDXXX.XXXXX.XXXXXXXX.XXXX.XXXX
XXXX.XXXXX.D..D...XXX·XX.XX.RXX.XXXXX.XXXXXXXXDXXXX.XXXX
XXXX.XXXXXXXXXXXX.X····.M....MDDXXXXX.XXXXXXXXXXXXX.XXXX
XXXX.XXXXXXXXXXXX.XXXXXXX.XX·XXXXXXXX.XXXXXXXXXXXXX.XXXX
XXXX..D...D...D...XXXXXXX.X····XXXXXX.XXXXXXXXXXXXX.XXXX
XXXXXXXXXXXXXXXXXXXXXXXXX.X.XXXXXXXXX..M..M..M..M..DXXXX
XXXXXXXXXXXXXXXXXXXXXXXXX..PXXXXXXXXX.XXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX..M..M..M..MDXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Schlüsselträger:
```json
[
  {
    "id": "key-choice",
    "seal": "sun",
    "x": 27,
    "y": 32,
    "direction": "right"
  },
  {
    "id": "key-exit",
    "seal": "moon",
    "x": 19,
    "y": 30,
    "direction": "right"
  }
]
```

```json
{
  "pits": []
}
```

```json
{
  "keys": [],
  "doors": [
    {
      "id": "door-exit",
      "seal": "moon",
      "x": 27,
      "y": 4
    },
    {
      "id": "door-west",
      "seal": "sun",
      "x": 21,
      "y": 18
    },
    {
      "id": "door-east",
      "seal": "sun",
      "x": 33,
      "y": 18
    }
  ],
  "portals": []
}
```

```json
{
  "gates": [],
  "levers": [],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 27 34
walk 25 34
walk 25 30
walk 27 30
strike key-choice right
key key-choice
walk 24 30
walk 24 28
walk 22 28
strike key-exit left
key key-exit
walk 20 18
harvest 3 4 15 29
harvest 23 5 9 26
walk 27 3
```

## 25 – Spuren im Mauerwerk

Die Torhallen. 52 × 38 Felder, Quote 62, 180 Sekunden, Schwierigkeit 3/3.

Sieh zuerst nach den Zugängen: Sichtbare Schätze liegen oft in der Nachbargalerie. A und B verbinden die drei Reviere. Der goldene Mondträger wartet im Osten. DW weist auf den späteren Zwergen-Geheimzweig: Du kannst sein Vorzimmer finden, aber sein Eingang bleibt in dieser Fassung versiegelt. Der normale Ausgang führt zu 26. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Hinweis: Sieh zuerst nach den Zugängen: Sichtbare Schätze liegen oft in der Nachbargalerie. A und B verbinden die drei Reviere. Der goldene Mondträger wartet im Osten. DW weist auf den späteren Zwergen-Geheimzweig: Du kannst sein Vorzimmer finden, aber sein Eingang bleibt in dieser Fassung versiegelt. Der normale Ausgang führt zu 26. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Geprüfter Durchlauf: 604 Takte / 60.4 Sekunden, 69 Kristallpunkte, 74 Wertungspunkte. Replay: public/replays/25.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXX.XXXXXXXXXXXXXXXXXXX·.M..M..M..M.XXXXX·.M.M.M.XXX
XXXPXXM..M..M.M.·.XXXXX.XXXXXXXXXXX.XXXXX.XXXXXX.XXX
XXX.XXXXXXXXXXXXX.XXXXX.XXXXXXXXXXX.XXXXX.XXXXXX.XXX
XXX.XXXXXXXXXXXXX.XXXXX.XXXXXXXXXXX.XXXXX.XXXXXX.XXX
XXX.XXXXXXXXXXXXX.XXXXX.XXXXXXXXXXX.XXXXX.XXXXXX.XXX
XXX.XXXXXXXXXXXXX.XXXXX..M..M..XXXX.XXXXX.XXXXXX.XXX
XXX..M..M..DXXXXX.XXXXX.XXXXXX.XXXX.XXXXX.XXXXXX.XXX
XXX.XXXXXXXXXXXXX.XXXXX.XXXXXX.XXXX.XXXXX.XXXXXX.XXX
XXX.XXXXXXXXXXXXX.XXXXX.XXXXXX.XXXX.XXXXX.XXXXXX.XXX
XXX.XXXXXXXXXXXXX.XXXXX.XXDM.M.XXXX.XXXXX.XXXXXX.XXX
XXX.XXXXXXXXXXXXX.XXXXX.XXXXXXXXXXX.XXXXX.XXXXXX.XXX
XXX.XXX..M..M..M..XXXXX.XXXXXXXXXXX.XXXXX.M.MDXX.XXX
XXX.XXX.XXXXXXXXXXXXXXX.XXXXXXXXXXX.XXXXXXXXXXXX.XXX
XXX.XXX.XXXXXXXXXXXXXXX..M..M..M..M.XXXXXXXXXXXX.XXX
XXX.XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXX.XXX
XXX.XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXX.XXX
XXX.XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXRM.M..XXX
XXX.XXX..M..M..M..XXXXXXXXXXXXXXXXX.XXX.....XXXX.XXX
XXX.XXX.XXXXXXXXX.XXXXXXXXXXXXXXXXX.XXX.XXX·XXXX.XXX
XXX.XXX.XXXXXXXXX.XXXXX..M..M..M..M.XXX..····XXX.XXX
XXX.XXX.XXXXXXXXX.XXXXX.XXXXXXXXXXXXXXX.XXXXXXXX.XXX
XXX.XXX.XXXXXXXXX.XXXXX.XXXXXXXXXXXXXXX.XXXXXXXX.XXX
XXX.XXX.XXXXXXXXX.XXXXX.XXXXXXXXXXXXXX#.MD.M..M..XXX
XXX.XXX.M..M.DXXX.XXXXX.XXXXXXXXXXXXXXX.XXXXXXXXXXXX
XXX.XXXXXXXXXXXXX.XXXXX..M..MDXXXXXXXXX.XXXXXXXXXXXX
XXX.XXXXXXXXXXXXX.XXXXX.XXXXXXXXXXXXXXX..#..XXXXXXXX
XXX.XXXXXXXXXXXXX.XXXXX.XXXXXXXXXXXXXXX.XXX.XXXXXXXX
XXX.XXXXXXXXXXXXX.XXXXX.XXXXXXXXXXXXXXX.XXX#XXXXXXXX
XXX..M..M..M..M...XXXXX.XXXXXXXXXXXXXXX.M..M..MXXXXX
XXXXXXXXXXXXXXXXXXXXXXX..M..M..·XXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Schlüsselträger:
```json
[
  {
    "id": "key-exit",
    "seal": "moon",
    "x": 41,
    "y": 23,
    "direction": "right"
  }
]
```

```json
{
  "pits": []
}
```

```json
{
  "keys": [],
  "doors": [
    {
      "id": "door-exit",
      "seal": "moon",
      "x": 3,
      "y": 4
    }
  ],
  "portals": [
    {
      "id": "A1",
      "pair": "A",
      "x": 16,
      "y": 5
    },
    {
      "id": "A2",
      "pair": "A",
      "x": 23,
      "y": 4
    },
    {
      "id": "B1",
      "pair": "B",
      "x": 31,
      "y": 33
    },
    {
      "id": "B2",
      "pair": "B",
      "x": 41,
      "y": 4
    }
  ],
  "secret": {
    "x": 43,
    "y": 31,
    "branch": "twisted-dwarves",
    "available": false
  }
}
```

```json
{
  "gates": [
    {
      "id": "DW",
      "label": "DW",
      "x": 41,
      "y": 29,
      "open": false
    }
  ],
  "levers": [
    {
      "id": "DW-switch",
      "label": "DW",
      "x": 38,
      "y": 26,
      "gates": [
        "DW"
      ],
      "dispensers": []
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 15 5
move right
walk 30 33
move right
walk 39 26
walk 39 21
walk 42 21
strike key-exit right
key key-exit
harvest 39 4 10 29
harvest 23 4 13 30
harvest 3 5 15 28
walk 3 3
```

## 26 – Wandernde Adern

Die Torhallen. 50 × 40 Felder, Quote 66, 210 Sekunden, Schwierigkeit 3/3.

Die mittlere Ader und der untere Quergang teilen sich einen Fallschacht. Gräbst du die mittlere Stütze frei, sinkt der Fels in den unteren Zugang. Entscheide, welche Funde du vorher holst. A erschließt die Gegenseite; der goldene Sonnenträger wartet in der Nische hinter dem Felsen. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Hinweis: Die mittlere Ader und der untere Quergang teilen sich einen Fallschacht. Gräbst du die mittlere Stütze frei, sinkt der Fels in den unteren Zugang. Entscheide, welche Funde du vorher holst. A erschließt die Gegenseite; der goldene Sonnenträger wartet in der Nische hinter dem Felsen. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Geprüfter Durchlauf: 715 Takte / 71.5 Sekunden, 71 Kristallpunkte, 76 Wertungspunkte. Replay: public/replays/26.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXP..M...M...M...M...M...M...M...M...M..M..XXXXX
XXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXXXXXXXXXRXXXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXXXXXXX...XXX..M..M..M..M..XXXXX
XXXX..M..M..M..M........X.X·XXX.XXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXX.XXXXXR..····XXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXX.XXXX..XXXXXX.XXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXX.XXXX.·XXX.XX..M..M.M.·XXX.XXXXX
XXXX.XXXXX.M..M..D.XXXX.·XXX.XXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXX.XXXXXXXXXXXX.·XXX.XXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXX.XXXXXXXXXXXX.·XXX.XXXXXXXXXXXXXXX.XXXXX
XXXX.XXXX·.....M..M..M...M..M..M.....XXXXXXX.XXXXX
XXXX.XXXXX.XXX.XXXXXXXXXXXXXXXXX.XXX.XXXXXXX.XXXXX
XXXX.XXXXX.XXX.XXXXXXXXXXXXXXXXX.XXX.XXXXXXX.XXXXX
XXXX.XXXXX.XXX.XXXXXXXXXXXXXXXXX.XXX.XXXXXXX.XXXXX
XXXX.......XXX.XXXXXXXXXXXXXD....XXXD........XXXXX
XXXX.XXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXX..M..M..M..XXXXXXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXXXXXX.XXXXXXXX..M..M..M...XXXXX
XXXX.XXXXXXXXXXXXXXXXXXX.XXXXXXXX.XXXXXXXXXX.XXXXX
XXXX..M..M..M..M.XXXXXXX.XXXXXXXX.XXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXX.XXXXXXX..M.MDXXX.XXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXX.XXXXXXXXXXXXXXXX.XXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXX.XXXXXXXXXXXXXXXX..M..M..MXX.XXXXX
XXXX.XXXXDM..M...XXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXX
XXXX..M...M...M...M...M...M...M...M...M...M..XXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Schlüsselträger:
```json
[
  {
    "id": "key-exit",
    "seal": "sun",
    "x": 27,
    "y": 10,
    "direction": "right"
  }
]
```

```json
{
  "pits": []
}
```

```json
{
  "keys": [],
  "doors": [
    {
      "id": "door-exit",
      "seal": "sun",
      "x": 4,
      "y": 3
    }
  ],
  "portals": [
    {
      "id": "A1",
      "pair": "A",
      "x": 9,
      "y": 16
    },
    {
      "id": "A2",
      "pair": "A",
      "x": 40,
      "y": 12
    }
  ],
  "views": [
    {
      "x": 21,
      "y": 8,
      "width": 9,
      "height": 10
    }
  ]
}
```

```json
{
  "gates": [],
  "levers": [],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 14 16
walk 28 16
walk 23 11
snap right
wait 6
walk 25 10
walk 25 8
walk 26 8
strike key-exit right
key key-exit
harvest 9 15 28 15
harvest 4 4 41 31
walk 4 2
```

## 27 – Die geöffnete Jagd

Die Torhallen. 52 × 38 Felder, Quote 56, 160 Sekunden, Schwierigkeit 3/3.

Die Sonnentür verbindet die Patrouille mit deinen Sammelwegen und bleibt offen. Schalte A/B von innen frei. Über die Portale kannst nur du abkürzen; der Käfer muss laufen. Nutze Nischen, sammle in Abschnitten und hole den Mondschlüssel im südöstlichen Ast. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Hinweis: Die Sonnentür verbindet die Patrouille mit deinen Sammelwegen und bleibt offen. Schalte A/B von innen frei. Über die Portale kannst nur du abkürzen; der Käfer muss laufen. Nutze Nischen, sammle in Abschnitten und hole den Mondschlüssel im südöstlichen Ast. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Geprüfter Durchlauf: 536 Takte / 53.6 Sekunden, 58 Kristallpunkte, 68 Wertungspunkte. Replay: public/replays/27.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXX..M..M..M..#·XXXXXXX>·M··M··M··M······M··M·XXXXX
XXXX.XXX.XXXXXXXXXXXXXXX·XXXXXXXXXXXXXXXXXXXXX·XXXXX
XXXX.XXX.XXXXXXXXXXXXXXX·XXXXXXXXXXXXXXXXXXXXX·XXXXX
XXXX.XXX......XXXXXXXXXX·XXXXXXXXXXXXXXXXXXXXX·XXXXX
XXXX.XXXXXXXX.XXXXXXXXXX·XXXXXXXXXXXXXXXXXXXXX·XXXXX
XXXX.XXXXXXXX.XXXXXXXXXX·XXXXXXXX..M..M..M..M.·XXXXX
XXXX..M..M..MDXXXXXXXXXX·XXXXXXXX.XXXXXXXXXXXX·XXXXX
XXXX.XXXXXXXXXXXXXXXXXXX·XXXXXXXX.XXXXXXXXXXXX·XXXXX
XXXX.XXXXXXXXXXXXXXXXXXX·XXXXXXXX.XXXXXXXXXXXX·XXXXX
XXXX.XXXXXXXXXXXXXXXXXXX·XXXXXXXXD.M..M..MXXXX·XXXXX
XXXX.XXXXXXXXXXXXXXXXXXX·.....XXXXXXXXXXXXXXXX·XXXXX
XXXX.XXXXXXXXXXXXXXXXXXX·XXXX.XXXXXXXXXXXXXXXX·XXXXX
XXXX.XXXXX..............·#XXX.XXXXXXXXXXXXXXXX·XXXXX
XXXX.XXXXX.XXXXXXXXXXXXX·XXXX.XXXXXXXXXXXXXXXX·XXXXX
XXXX.XXXXX.XXXXXXXXXXXXX·X...DXXXXXXXXXXXXXXXX·XXXXX
XXXX.XXXXX.XX·XXXXXXXXXX·XXXXXXXXXXXXX....XXXX·XXXXX
XXXX.XXXXX.XX#XXXXXXXXXX·XXXXXXXXX..M..MR.M..M·XXXXX
XXXX.XXXXX.........XXXXX·XXXXXXXXX.XXX...XXXXX·XXXXX
XXXX.XXXXXXRXXXXXX.XXXXX·XXXXXXXXX.XXXXX·XXXXX·XXXXX
XXXX.XXX....XXXXXX.XXXXX·XXXXXXXXXD.M.·····XXX·XXXXX
XXXX.XXX.XX·XXXXXX.XXXXX·XXXXXXXXXXXXXXXXXXXXX·XXXXX
XXXX..M..M····XXXX.XXXXX·XXXXXXXXXXXXXXXXXXXXX·XXXXX
XXXX.XXXXXXXXXXXXX.XXXXX··M·····M··M··M··M··M··XXXXX
XXXX.XXXXXXXXXXXXX.XXXXX.XXXXXXXXXXXXXXXXXXX.XXXXXXX
XXXX.XXXXXXXXXXXXX.XXXXX.XXXXXXXXXXXXXXXXXXX.XXXXXXX
XXXX..M..M..M..M..DXXXXX.XXXXXXXXXXXXXXXXXXX.XXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXX.XXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXX..M..M..M..M.MM..M..DXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Schlüsselträger:
```json
[
  {
    "id": "key-hunt",
    "seal": "sun",
    "x": 10,
    "y": 29,
    "direction": "right"
  },
  {
    "id": "key-exit",
    "seal": "moon",
    "x": 38,
    "y": 27,
    "direction": "right"
  }
]
```

```json
{
  "pits": []
}
```

```json
{
  "keys": [],
  "doors": [
    {
      "id": "door-hunt",
      "seal": "sun",
      "x": 23,
      "y": 20
    },
    {
      "id": "door-exit",
      "seal": "moon",
      "x": 4,
      "y": 4
    }
  ],
  "portals": [
    {
      "id": "A1",
      "pair": "A",
      "x": 16,
      "y": 8
    },
    {
      "id": "A2",
      "pair": "A",
      "x": 39,
      "y": 8
    },
    {
      "id": "B1",
      "pair": "B",
      "x": 13,
      "y": 23
    },
    {
      "id": "B2",
      "pair": "B",
      "x": 29,
      "y": 30
    }
  ],
  "views": [
    {
      "x": 20,
      "y": 13,
      "width": 10,
      "height": 15
    }
  ]
}
```

```json
{
  "gates": [
    {
      "id": "A",
      "label": "A/B",
      "x": 15,
      "y": 8,
      "open": false
    },
    {
      "id": "B",
      "label": "A/B",
      "x": 13,
      "y": 24,
      "open": false
    }
  ],
  "levers": [
    {
      "id": "ports",
      "label": "A/B",
      "x": 25,
      "y": 20,
      "gates": [
        "A",
        "B"
      ],
      "dispensers": [],
      "view": {
        "x": 22,
        "y": 17,
        "width": 9,
        "height": 8
      }
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 8 29
walk 8 27
walk 10 27
strike key-hunt right
key key-hunt
walk 22 20
until 24 15 crawler
move right
move right
use right
walk 24 30
walk 24 35
walk 44 35
walk 46 30
walk 46 24
walk 41 24
walk 41 23
walk 38 23
walk 38 25
walk 39 25
strike key-exit right
key key-exit
harvest 33 12 13 16
harvest 24 30 22 6
harvest 24 8 23 1
harvest 4 8 15 26
walk 4 3
```

## 28 – Schichtwechsel

Die Torhallen. 56 × 40 Felder, Quote 78, 175 Sekunden, Schwierigkeit 3/3.

U und L schalten gegenläufig. Hole oben den Sonnenschlüssel und sammle die oberen Äste, bevor du auf L wechselst. Unten liegt der Mondschlüssel für den oberen Ausgang. Bündele deine Wege: Zwei Schaltungen reichen. Der Hebel bleibt immer erreichbar. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Hinweis: U und L schalten gegenläufig. Hole oben den Sonnenschlüssel und sammle die oberen Äste, bevor du auf L wechselst. Unten liegt der Mondschlüssel für den oberen Ausgang. Bündele deine Wege: Zwei Schaltungen reichen. Der Hebel bleibt immer erreichbar. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Geprüfter Durchlauf: 585 Takte / 58.5 Sekunden, 82 Kristallpunkte, 92 Wertungspunkte. Replay: public/replays/28.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXX.·.M..M..M..M..M..DXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXX.XXXXXXXXXX.XXXXXX.XXXXXXXXXXXXXXXXX..M..M..M.DXXXXX
XXXX.XXXXXXXXXX.XXXXXX.XXXXXXXXXXXXXXXXX.XXXXXXXXX.XXXXX
XXXX..M..M..M.....M..M..M...XXXXXXXXXXXX.XXXXXXXXX.XXXXX
XXXX.XXXXXXXRXXXXXXXXXXXXXX.XXXXXXXXXXXX.XXXXXXXXX.XXXXX
XXXX.XXXXXXX.....XXXXXXXXXX.XXXXXXXXXXXX.XXXXXXXXX.XXXXX
XXXX.XXXXXXX·XXX.XXXXXXXXXX.XXXXXXXXXXXX.XXXXXXXXX.XXXXX
XXXX.XXXXX·····..M..MXXXXXX..M..M..M..M..XXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXX.XXXXXX.XXXXXX.XXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXX.XXXXXX.XXXXXX.XXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXX.XXXXXX.XXXXXX.XXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXX.XXXXXX#XXXXXX.XXXXXXXXXXXXXXX.XXXXX
XXXX..M..MMMM..M..M..XXXXXX.XXXXXX..M..M..M..M.M.·.XXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXX..#P...XXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXD.M..M..M..M...XXXXXX
XXXXX..M..M..M..M.DXXXXXXXX.XXXXXXX.XXXXXXXXXXXXX.XXXXXX
XXXXX.XXXXXXXXXXXX.XXXXXXXX#XXXXXXX.XXXXXXXXXXXXX.XXXXXX
XXXXX.XXXXXXXXXXXX.XXXXXXXX.XXXXXXX.XXXXXRXXXXXXX....XXX
XXXXX.XXXXXXXXXXXX.XXXXXXXX.XXXXXXX.......XXXXXXX.XX.XXX
XXXXX.XXXXXXXXXXXX.XXXXXXXX.XXXXXXX..XXXX·XXXXXXX.XX.XXX
XXXXX.XXXXDM..M..M.XXXXXXXX.XXXXXXX.M..·····XXXXX.XX.XXX
XXXXX.XXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXX.XX.XXX
XXXXX.XXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXX.XX.XXX
XXXXX.XXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXX.XX.XXX
XXXXX.XXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXX.XX.XXX
XXXXX.XXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXX.XX.XXX
XXXXX.·..M..M..M..M..M..M.....M..M..M.MMM.M..M..M.XX.XXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXX.XXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXX.XXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXD.M..M..M..M..M...·.XXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Schlüsselträger:
```json
[
  {
    "id": "key-lower",
    "seal": "sun",
    "x": 10,
    "y": 10,
    "direction": "right"
  },
  {
    "id": "key-exit",
    "seal": "moon",
    "x": 39,
    "y": 28,
    "direction": "right"
  }
]
```

```json
{
  "pits": []
}
```

```json
{
  "keys": [],
  "doors": [
    {
      "id": "door-lower",
      "seal": "sun",
      "x": 27,
      "y": 26
    },
    {
      "id": "door-exit",
      "seal": "moon",
      "x": 15,
      "y": 2
    }
  ],
  "portals": [
    {
      "id": "A1",
      "pair": "A",
      "x": 5,
      "y": 3
    },
    {
      "id": "A2",
      "pair": "A",
      "x": 49,
      "y": 15
    },
    {
      "id": "B1",
      "pair": "B",
      "x": 6,
      "y": 34
    },
    {
      "id": "B2",
      "pair": "B",
      "x": 51,
      "y": 37
    }
  ]
}
```

```json
{
  "gates": [
    {
      "id": "U",
      "label": "U",
      "x": 27,
      "y": 14,
      "open": true
    },
    {
      "id": "L",
      "label": "L",
      "x": 27,
      "y": 24,
      "open": false
    }
  ],
  "levers": [
    {
      "id": "UL",
      "label": "U/L",
      "x": 26,
      "y": 19,
      "gates": [
        "U",
        "L"
      ],
      "dispensers": []
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 16 10
walk 16 8
walk 13 8
strike key-lower left
key key-lower
harvest 4 3 47 13
walk 27 19
use left
walk 36 28
walk 36 26
walk 40 26
strike key-exit right
key key-exit
harvest 4 22 49 16
walk 27 19
use left
walk 15 1
```

## 29 – Die andere Seite des Felsens

Die Torhallen. 52 × 40 Felder, Quote 68, 160 Sekunden, Schwierigkeit 3/3.

Schiebe den gemeinsamen Felsen zuerst zweimal nach rechts. Oben findest du den Sonnenschlüssel für A. Reise auf die andere Seite und schiebe denselben Felsen von rechts zurück: So wird der untere Erzweg frei. Der Mondschlüssel öffnet den direkten Heimweg. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Hinweis: Schiebe den gemeinsamen Felsen zuerst zweimal nach rechts. Oben findest du den Sonnenschlüssel für A. Reise auf die andere Seite und schiebe denselben Felsen von rechts zurück: So wird der untere Erzweg frei. Der Mondschlüssel öffnet den direkten Heimweg. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Geprüfter Durchlauf: 534 Takte / 53.4 Sekunden, 70 Kristallpunkte, 80 Wertungspunkte. Replay: public/replays/29.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX..M..M..M..DXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX..M..M..M..M...XXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXX.XXXXX
XXXX..M..M..M..M..M.M..XXXXXXXXX.XXXXXXXXXXXXX.XXXXX
XXXX.XXXXXRXXXXXXXXXXX.XXXXXXXXX.XXXXXXXXXXXXX.XXXXX
XXXX.XXXXX......XXXXXX.XXXXXXXXX.XXXXDM..M..M..XXXXX
XXXX.XXXXX·XXXX.XXXXXX.XXXXXXXXX.XXXXXXXXXXXXX.XXXXX
XXXX.XXX·····...XXD....XXXXXXXXX.XXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXX.XXXXXX.XXXXXXXXX.XXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXX.XXXXXX.XXXXXXXXX..M..M..MXXXXX.XXXXX
XXXX.XXXXXXXXXX.XXXXXX.XXXXXXXXXXXXXXXXX.XXXXX.XXXXX
XXXX.XXXXXXXXXX.XXXXXX...XXXXXXXXXXXRXXX.XXXXX.XXXXX
XXXXD.MMMM..M..MXXXXXX.X.XXXXXXXXXXX.....XXXXX.XXXXX
XXXXXXXXXXXXXXXXXXXXXX.X·XXX·XXXXXXX·XXX.XXXXX.XXXXX
XXXXXXXXXXXXXXXXXXXXXX.XXXXX.XXXXX·····..XXXXX.XXXXX
XXXXXXXXXXXXXXXXXXXXXX.XXXXX.XXXXXXXXXXXXXXXXX.XXXXX
XXXXXXXXXXXXXXXXXX.··R··.....XXXXXXXXXXXXXXXXX.XXXXX
XXXXXXXXXXXXXXXXXX.XXXX.XXXXXXXXXXXXXXXXXXXXXX.XXXXX
XXXXXXXXXXXXXXXXXX.XXXX.XXXXXXXXXXXXXXXXXXXXXX.XXXXX
XXXXXXXXXXXXXXXXXX.XXXX.XXXXXXXXXXXXXXXXXXXXXX.XXXXX
XXXXXXXXXXXXXXXXXX.XXXX..M..M..M.MMM.M..M..M...XXXXX
XXXXXXXXXXXXXXXXXX.XXXX.XXXXXXXXXXXXXXXXXXXXXX.XXXXX
XXXXXXXXXXXXXXXXXX.XXXX.XXXXXXXXXXXXXXXXXXXXXX.XXXXX
XXXXXXXXXXXXXXXXXX.XXXX.XXXXXXXXXXXXXXXXXXXXXX.XXXXX
XXXXEXXXXXXXXXXXXX.XXXX.XXXXXXXXXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXX.XXXX.XXXXXX..M..M..M..DXXXX.XXXXX
XXXX.XXXXXXXXXXXXX......XXXXXX.XXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXX.XXXXXXXXXXX.XXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXX.XXXXXXXXXXX.XXXXXXXDM..M..M.XXXXX
XXXX.XXXXXXXXXXXXX.XXXXXXXXXXX.XXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXX.XXXXXXXXXXX.XXXXXXXXXXXXXXX.XXXXX
XXXXP.M..M..M..M...XXXXXXXXXXXD.M..M..M..M..M..XXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Schlüsselträger:
```json
[
  {
    "id": "key-work",
    "seal": "sun",
    "x": 8,
    "y": 11,
    "direction": "right"
  },
  {
    "id": "key-home",
    "seal": "moon",
    "x": 34,
    "y": 18,
    "direction": "right"
  }
]
```

```json
{
  "pits": []
}
```

```json
{
  "keys": [],
  "doors": [
    {
      "id": "door-work",
      "seal": "sun",
      "x": 24,
      "y": 16
    },
    {
      "id": "door-home",
      "seal": "moon",
      "x": 21,
      "y": 30
    }
  ],
  "portals": [
    {
      "id": "A1",
      "pair": "A",
      "x": 24,
      "y": 17
    },
    {
      "id": "A2",
      "pair": "A",
      "x": 28,
      "y": 17
    }
  ]
}
```

```json
{
  "gates": [],
  "levers": [],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 20 20
move right
move right
walk 15 11
walk 15 9
walk 11 9
strike key-work left
key key-work
harvest 4 7 19 10
walk 24 15
move down
move down
walk 24 20
move left
walk 23 24
walk 40 16
walk 39 16
walk 37 16
strike key-home left
key key-home
harvest 30 3 17 33
walk 22 30
move left
harvest 4 35 15 1
walk 4 28
```

## 30 – Das gebrochene Siegel

Die Torhallen. 58 × 44 Felder, Quote 86, 270 Sekunden, Schwierigkeit 3/3.

Bereite R vor dem Abbau der Kernader vor: Der Sonnenschlüssel öffnet die Hebelnische, der Mondschlüssel den Ausgang. Beim Betreten der Kernader untergräbst du den Fels über der A-Ankunft. Er versperrt danach den Portalrückweg. Für die Quote brauchst du Diamanten aus der Kernader; heimwärts geht es durch R und die bewachten unteren Gänge. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Hinweis: Bereite R vor dem Abbau der Kernader vor: Der Sonnenschlüssel öffnet die Hebelnische, der Mondschlüssel den Ausgang. Beim Betreten der Kernader untergräbst du den Fels über der A-Ankunft. Er versperrt danach den Portalrückweg. Für die Quote brauchst du Diamanten aus der Kernader; heimwärts geht es durch R und die bewachten unteren Gänge. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Geprüfter Durchlauf: 914 Takte / 91.4 Sekunden, 101 Kristallpunkte, 111 Wertungspunkte. Replay: public/replays/30.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXX.XXXXXXXXXXXXXXXXXXXXXXXXXX.D.D.DXXXXXXX.M..M..M.XXXXX
XXXXP..M...M...M...M...·.XXXXXX.XXXXXXXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXXXXXX.XXXXXX.XXXXXXXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXXXXXX.XXXXXX.D.D.XXXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXXXXXX.XXXXXX.XXXXXXXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXXXXXX.....XX.XXXXXXRXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXXXXXX.XXX.XX.D.D.D.......M..M..M..XXXXX
XXXX..M..M..M..M..XXXXXX.XXX.XX.XXXXXX·XXX.XXXXXXXXX.XXXXX
XXXX.XXXXXXRXXXXX.XXXXXX.XXX.XX.XXXXXX·XXX.XXXXXXXXX.XXXXX
XXXX.XXXXXX.......XXXXXX.XXX.XX.XD.D.X·XXX.XXXXXXXXX.XXXXX
XXXX.XXXXXX·XXXXX.XXXXXX.XXX.XX.XXXX.X·XXX.XXXX.M..M.XXXXX
XXXX.XXXX·····M...XXXXXX.XXX.XX.XXXX.X·....XXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXXXXXX.XXX.XX.D.DX.XXXXX.XXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXX#........XX.XXXX.XXXXX.XXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXXXXXX.XXXXXX.XXXX.XXXXX.XXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXXXXXX.XXXXXX.D.D.DXXXXX..M..M..M..XXXXX
XXXX.XXXXX.M.............XXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXX
XXXX.XXXXX.XXXXXXXXXXXXX......XXXXXXXXXXXX.XXXXXXXXXXXXXXX
XXXX.XXXXX..M..M..M.XXXXXXXXX.XXXXXXXXXXXX.XXXXXXXXXXXXXXX
XXXX.XXXXX.XXXXXXXXXXXXXXXXXX.XXXXXXXXXXXX#XXXXXXXXXXXXXXX
XXXX.XXXXX.XXXXXXXXXXXXXXXXXX.XXXXXXXXXXXX.XXXXXXXXXXXXXXX
XXXX.XXXXX.XXXXXXXXXXXXXXXXXX.XXXXXXXXXXXX.XXXXXXXXXXXXXXX
XXXX.XXXXX..M...M...M....XXXX..M..M.XXXXXX.XXXXXXXXXXXXXXX
XXXX.XXXXXXXXXXXXXXXXXXX.XXXXXXXXXX.XXXXXX.XXXXXXXXXXXXXXX
XXXX.XXXXXXXXXXRXX.......XXXXXXXXXX.XXXXXX··M··M·<M..XXXXX
XXXX.XXXXX......XX.XXXXX.XXXXXXXXXX...XXXX·XXXXXX·XX.XXXXX
XXXX.XXXXX.XXXX·XX.XXXXX.XXXXXXXXXX.X.XXXX·XXXXXX·XX.XXXXX
XXXX..M..M..M·····.XXXXX.XXXX..M..M...XXXX········...XXXXX
XXXX.XXXXXXXXXXXXXXXXXXX.XXXX.XXXXXXXXXXXXX.XXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXXXXXX.XXXX.XXXXXXXXXXXXX.M..M..M..XXXXX
XXXX.XXXXXXXXXXXXXXXXXXX.XXXX..M..M..M.XXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXXXXXX.XXXX.XXXXXXXXXXXXXXXXXXXXXX.XXXXX
XXXX.XXXXXXXXXXXXXXXXXXX.XXXX.XXXXXXXXXXXXXXXXXXXXXX.XXXXX
XXXX..M...M.M.M...M...M..XXXX..M..M..M..M..M..M..M...XXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Schlüsselträger:
```json
[
  {
    "id": "key-prepare",
    "seal": "sun",
    "x": 13,
    "y": 32,
    "direction": "right"
  },
  {
    "id": "key-exit",
    "seal": "moon",
    "x": 9,
    "y": 16,
    "direction": "right"
  }
]
```

```json
{
  "pits": []
}
```

```json
{
  "keys": [],
  "doors": [
    {
      "id": "door-prepare",
      "seal": "sun",
      "x": 23,
      "y": 18
    },
    {
      "id": "door-exit",
      "seal": "moon",
      "x": 4,
      "y": 4
    }
  ],
  "portals": [
    {
      "id": "A1",
      "pair": "A",
      "x": 23,
      "y": 6
    },
    {
      "id": "A2",
      "pair": "A",
      "x": 38,
      "y": 16
    }
  ],
  "views": [
    {
      "x": 35,
      "y": 8,
      "width": 10,
      "height": 11
    }
  ]
}
```

```json
{
  "gates": [
    {
      "id": "R",
      "label": "R",
      "x": 42,
      "y": 24,
      "open": false
    }
  ],
  "levers": [
    {
      "id": "return",
      "label": "R",
      "x": 20,
      "y": 18,
      "gates": [
        "R"
      ],
      "dispensers": []
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 10 32
walk 10 30
walk 14 30
strike key-prepare right
key key-prepare
walk 17 14
walk 15 14
walk 12 14
strike key-exit left
key key-exit
harvest 4 6 21 33
walk 21 18
use left
walk 22 6
move right
walk 42 16
walk 42 11
walk 37 11
harvest 31 5 6 16
harvest 42 5 11 16
walk 42 25
harvest 42 29 11 4
walk 52 38
harvest 29 27 24 12
walk 4 3
```

## 31 – Ein ungewöhnlicher Bergmann

Die hungrigen Adern. 38 × 26 Felder, Quote 24, 80 Sekunden, Schwierigkeit 2/3.

Bernsteinfarbene Grabe-Käfer öffnen das harte Muttergestein. Sie graben geradeaus; Hindernisse lenken sie rechts, links oder zurück. Lass A offen und sammle links, während er arbeitet. Der goldene Sonnenträger wartet hinter der Ader. Töte deinen Helfer nicht vorher. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Hinweis: Bernsteinfarbene Grabe-Käfer öffnen das harte Muttergestein. Sie graben geradeaus; Hindernisse lenken sie rechts, links oder zurück. Lass A offen und sammle links, während er arbeitet. Der goldene Sonnenträger wartet hinter der Ader. Töte deinen Helfer nicht vorher. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Geprüfter Durchlauf: 277 Takte / 27.7 Sekunden, 26 Kristallpunkte, 31 Wertungspunkte. Replay: public/replays/31.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXX..M.MXXXXXXXXXXXX..M...M...M...XXXX
XXX.XXX.XXXXXXXXXXXX.XXXXXXXXXXXX.XXXX
XXX.XXX.XXXXXXXXXXXX.XXXXXXXXXXXX.XXXX
XXX.XXX#XXXXXXXXXXXX.XXXXXXXXXRXX.XXXX
XXXP...#2#HHHHHHHHHH······XXXX...MXXXX
XXX.XXXX·XXXXXXXXXXX.XX.X.XXXX·XX.XXXX
XXX.XXXX·XXXXXXXXXXX.XX.X.XX·····.XXXX
XXX.XXXX·XXXXXXXXXXX.XX.X.XXX.XXX.XXXX
XXXMXXXXXXXXXXXXXXXX.XX...XXX.XXX.XXXX
XXX.XXXXXXXXXXXXXXXX.XXXXXXXX.XXX.XXXX
XXX.XXXXXXXXXXXXXXXX.XXXXXXXXMXXX.XXXX
XXX.XM...XXXX....M...XXXXM.M..XXX.XXXX
XXX.XXXX.XXXX.XXXXXX.XXXXXXXXXXXX.XXXX
XXX.XXXX.XXXX.XXXXXX.XXXXXXXXXXXX.XXXX
XXX.XXXX.XXXXDXXXXXX......DXXXXXXDXXXX
XXX.XXXX.XXXX.XXXXXXXXXXXXXXXXXXX.XXXX
XXX....M.XXXX.XXXXXXXXXXXXXXXXXXX.XXXX
XXXXXXXXXXXXX..M...M....M....M....XXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Schlüsselträger:
```json
[
  {
    "id": "sun",
    "seal": "sun",
    "x": 28,
    "y": 10,
    "direction": "right"
  }
]
```

```json
{
  "pits": []
}
```

```json
{
  "keys": [],
  "doors": [
    {
      "id": "exit",
      "seal": "sun",
      "x": 3,
      "y": 3
    }
  ],
  "portals": []
}
```

```json
{
  "gates": [
    {
      "id": "A",
      "label": "A",
      "x": 9,
      "y": 8,
      "open": false
    },
    {
      "id": "BACK",
      "label": "A",
      "x": 7,
      "y": 8,
      "open": false
    }
  ],
  "levers": [
    {
      "id": "release",
      "label": "A",
      "x": 7,
      "y": 7,
      "gates": [
        "A",
        "BACK"
      ],
      "dispensers": []
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 7 6
use down
harvest 2 4 7 17
until 25 8 digger
walk 33 4
walk 33 8
walk 31 8
strike sun left
key sun
harvest 12 4 23 19
walk 3 2
```

## 32 – Was aus der Tiefe kommt

Die hungrigen Adern. 42 × 26 Felder, Quote 24, 105 Sekunden, Schwierigkeit 2/3.

P kündigt einen einzigen Grabe-Käfer an. Sammle den Seitenweg, während er die Ader öffnet. Die Felsfalle bedienst du von links neben der Stütze. Ein Abschalten löscht keinen bereits erschienenen Gegner. Der Schlüssel liegt im östlichen Bogen. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Hinweis: P kündigt einen einzigen Grabe-Käfer an. Sammle den Seitenweg, während er die Ader öffnet. Die Felsfalle bedienst du von links neben der Stütze. Ein Abschalten löscht keinen bereits erschienenen Gegner. Der Schlüssel liegt im östlichen Bogen. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Geprüfter Durchlauf: 359 Takte / 35.9 Sekunden, 25 Kristallpunkte, 35 Wertungspunkte. Replay: public/replays/32.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXD.......XXX
XXX..M..MXXXXXXXXXXXXXXXXXXXXXX.XXXXXX.XXX
XXX.XXXX.XXXXXXXXXXXXXXXXXXXXXX.XXXXXX.XXX
XXX.XXXX.XXXXXXXXXXXXXXXXXXXXXX.XXXXXXMXXX
XXX.XXXX#XXXXXXXXXXXX.....RXXXXMXXXXXX.XXX
XXX.XXXXX....XXXXXXXX.XXX..XXXX.XXXXXX.XXX
XXXPXXXXX..#·HHHHHHHH········XX.XXXXXX.XXX
XXX.XXXXX.XXXXXXXXXXX.XX·XXX·XX.XXXXXXMXXX
XXX.XXXXX.XXXXXXXXXXX.XX·XXX·XXMXXXXXX.XXX
XXX.XXXXX.XXXXXXXXXXX.XX·XXX·XX.XXXXXX.XXX
XXX.XXXXX.XXXXXXXXXXX.XX·····XX.XXXRXX.XXX
XXX..M.MX.XXXXXXXXXXX.XXXXXXXXX.....XX.XXX
XXX.XXXXX.XXXXXXXXXXX..M..MXXXX.XXX·XXDXXX
XXX.XXXXX.XXXXXXXXXXX.XXXX.XXXX..·····.XXX
XXX.XXXXX.XXXXXXXXXXX.XXXX.XXXX.XXXXXX.XXX
XXX.XXXXX.XXXXXXXXXXX.XXXX.XXXX.XXXXXX.XXX
XXX.XXXXX.XXXXXXXXXXX...M...M...DM...M.XXX
XXX..M..M.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Schlüsselträger:
```json
[
  {
    "id": "sun",
    "seal": "sun",
    "x": 33,
    "y": 17,
    "direction": "right"
  }
]
```

```json
{
  "pits": [
    {
      "id": "P",
      "label": "P",
      "x": 11,
      "y": 10,
      "direction": "right",
      "delay": 30,
      "interval": 0,
      "maxAlive": 1,
      "active": false
    }
  ]
}
```

```json
{
  "keys": [],
  "doors": [
    {
      "id": "exit",
      "seal": "sun",
      "x": 3,
      "y": 4
    }
  ],
  "portals": []
}
```

```json
{
  "gates": [],
  "levers": [
    {
      "id": "wake",
      "label": "P",
      "x": 8,
      "y": 8,
      "gates": [],
      "dispensers": [],
      "pits": [
        "P"
      ]
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 8 7
use down
harvest 3 5 7 17
clear 20 10
walk 25 9
strike worker:P right
wait 5
walk 31 20
walk 31 15
walk 34 15
strike sun right
key sun
harvest 20 4 19 18
walk 3 3
```

## 33 – Den Nachschub stoppen

Die hungrigen Adern. 44 × 28 Felder, Quote 25, 85 Sekunden, Schwierigkeit 2/3.

P liefert alle 24 Sekunden einen Grabe-Käfer, höchstens zwei gleichzeitig. Der Hebel hinter der Ader stoppt den Nachschub, schließt IN und öffnet OUT. Bereits erschienene Käfer bleiben. Hole den Mondschlüssel und kehre durch OUT zurück. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Hinweis: P liefert alle 24 Sekunden einen Grabe-Käfer, höchstens zwei gleichzeitig. Der Hebel hinter der Ader stoppt den Nachschub, schließt IN und öffnet OUT. Bereits erschienene Käfer bleiben. Hole den Mondschlüssel und kehre durch OUT zurück. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Geprüfter Durchlauf: 290 Takte / 29.0 Sekunden, 29 Kristallpunkte, 34 Wertungspunkte. Replay: public/replays/33.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXX#XXXXXXXXXXXXXXXXXXX#...M...M...XXXXXXXXX
XXX..M..M....XXXX.XXX.XX.XXXXXXXXX.XXXXXXXXX
XXX.XXXXX.XX..XXX.XXX.XX.XXXXXXXXX.XXXXXXXXX
XXXPXXXXX.XX#·#HHHHHHHHH·······XXX.XXXXXXXXX
XXX.XXXXX.XX.XXXXXXXXXXXXXX·XX·XXXMXXXXXXXXX
XXX.XXXXXMXX.XXXXXXXXXXXXXX·XX·XXX...M...XXX
XXX.XXXXX.XX.XXXXXXXXXXXXXX·XX·XXX.XXXXX.XXX
XXX.XM....XX.XXXXXXXXXXXXXX····XXX.XXXXX.XXX
XXX.XXXXXXXX.XXXXXXXXXXXXXXXXXXXXX.XXXXX.XXX
XXX.XXXXXXXX.XXXXXXXXXXXXXXXXXXXXXDXXXXXMXXX
XXX.XXXXXXXX.XXXXXXXXXXXXXXXXXXXXX.XXXXX.XXX
XXX.XXXXXXXX.XXXXXXXXXXX.M..M..XXX.XXXXX.XXX
XXXMXXXXXXXX.XXXXXXXXXXX.XXXXX.XXX.XXXXXRXXX
XXX.XXXXXXXX.XXXXXXXXXXX.XXXXX.XXX.X.....XXX
XXX.XXXXXXXX.XXXXXXXXXXX.XXXXXMXXXDX.XXX·XXX
XXX.XXXXXXXX.XXXXXXXXXXXD.M....XXX...M·····X
XXX.XXXXXXXX.XXXXXXXXXXX.XXXXXXXXX.XXXXXXXXX
XXX.XXXXXXXX.XXXXXXXXXXX.XXXXXXXXX.XXXXXXXXX
XXX....M...M......#...M....M....M..XXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Schlüsselträger:
```json
[
  {
    "id": "moon",
    "seal": "moon",
    "x": 38,
    "y": 20,
    "direction": "right"
  }
]
```

```json
{
  "pits": [
    {
      "id": "P",
      "label": "P",
      "x": 12,
      "y": 8,
      "direction": "right",
      "delay": 10,
      "interval": 240,
      "maxAlive": 2,
      "active": true
    }
  ]
}
```

```json
{
  "keys": [],
  "doors": [
    {
      "id": "exit",
      "seal": "moon",
      "x": 3,
      "y": 4
    }
  ],
  "portals": []
}
```

```json
{
  "gates": [
    {
      "id": "IN",
      "label": "IN",
      "x": 14,
      "y": 8,
      "open": true
    },
    {
      "id": "OUT",
      "label": "OUT",
      "x": 18,
      "y": 23,
      "open": false
    },
    {
      "id": "EXIT",
      "label": "OUT",
      "x": 3,
      "y": 5,
      "open": false
    }
  ],
  "levers": [
    {
      "id": "stop",
      "label": "P / OUT",
      "x": 23,
      "y": 5,
      "gates": [
        "IN",
        "OUT",
        "EXIT"
      ],
      "dispensers": [],
      "pits": [
        "P"
      ]
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
harvest 3 6 9 18
clear 23 8
walk 24 5
use left
walk 36 20
walk 36 18
walk 39 18
strike moon right
key moon
harvest 20 5 22 20
walk 3 3
```

## 34 – Zwei Aufträge für einen Bergmann

Die wandelbare Mine. 52 × 34 Felder, Quote 42, 265 Sekunden, Schwierigkeit 3/3.

G1 lässt den Helfer die erste Ader öffnen. Hinter ihr erreichst du G2: Es sperrt seine Runde und öffnet den zweiten Arbeitsweg nach Süden. Gewinne die beiden Schlüssel in unterschiedlichen Bezirken. G3 öffnet den Rückweg. Töte den Helfer nicht vor seinem zweiten Auftrag.

Hinweis: G1 lässt den Helfer die erste Ader öffnen. Hinter ihr erreichst du G2: Es sperrt seine Runde und öffnet den zweiten Arbeitsweg nach Süden. Gewinne die beiden Schlüssel in unterschiedlichen Bezirken. G3 öffnet den Rückweg. Töte den Helfer nicht vor seinem zweiten Auftrag.

Geprüfter Durchlauf: 1046 Takte / 104.6 Sekunden, 45 Kristallpunkte, 55 Wertungspunkte. Replay: public/replays/34.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXX.XXXXXXXXXXXXXXXXXX..M...M......M.......M...XXXXX
XXX.XXXXXX..M...M.DXXX.XXXXXXXXX.XXX.XXRXXXXXX.XXXXX
XXX.XXXXXXXXXXXXXX.XXX.XXXXXXXXX.XXX....XXXXXX.XXXXX
XXX.XXXXXXXXXXXXXX.XXX.XXXXXXXXX.XXXXXX·XXX....XXXXX
XXXP.M..M..M..XXXXMXXX.XXXXXXXXXD....·····X.XXMXXXXX
XXX.XXXXXXXXX.XXXX.XXX.XXXXXXXXXXXXXXXXXXXX.XX.XXXXX
XXX.XXXXXXXX·..M...XXX.XXXXXXXXXXXXXXXXXXXX.XX.XXXXX
XXX.XXXXXXXXX.XXXXXXXX.XXXXXXXXXXXXXXXXX...DXX.XXXXX
XXX..M.M.XXXXMXXXXXXXX.........M...M......M....XXXXX
XXX.XXXX.XXXX.XXXXXXXX.XXXXXXXX.XXXXXXXXXXXXXXXXXXXX
XXX.XXXX#X....XXXXXXXX.XXXXXXX#.XXXXXXXXXXXXXXXXXXXX
XXX.XXXXXX.XX.XXXXXXXX.XXXXXXXX.XXXXXXXXXXXXXXXXXXXX
XXX.XX··2·#HHHHHHHHHHHH#···XXXX.XXXXXXXXXXXXXXXXXXXX
XXX.XXXXXXXXX.XXXXXXXXXX·X·.....XXXXXXXXXXXXXXXXXXXX
XXX.XXXXXXXXXMXXXXXXXXXX·X·XXXXXXXXXXXXXXXXXXXXXXXXX
XXX.XXXXXXXXX.XXXXXXXXXX·#·XXXXXXXXXXXXXXXXXXXXXXXXX
XXX..M..M.XXX.XXXXXXXXXXXX#XXXXXXXXXXXXXXXXXXXXXXXXX
XXX.XXXXX.XXX.XXXXXXXXXXXXHXXXXXXXXXXXXXXXXXXXXXXXXX
XXX.XXXXX.XXX.XXXXXXXXXXXXHXXXXXXXXXXXXXXXXXXXXXXXXX
XXX.X·....XXXMXXXXXXXXXXXXHXXXXXXXXXXXXXXXXXXXXXXXXX
XXX.XXXXXXXXX.XXXXXXXXXXXXHXXXXXXXXXXXXXXXXXXXXXXXXX
XXX.XXXXXXXXX.XXXXXXXXXXXXHXXXXXXXXXXXXXXXXXXXXXXXXX
XXX...M...M...XXXRXXXXXXXXHXXXXXXXXXXXXXXXXXXXXXXXXX
XXX.XXXXXXXXXXX...XXXXXXXXHX·····XXXXXXXXXXXXXXXXXXX
XXX.XXXXXXXXXXX.X·XXXXXXXXHX·XXX·XXXXXXXXXXXXXXXXXXX
XXX.XXXXXXXXXXX.····D....X·#·····#..M........XXXXXXX
XXX...........#..XXXXXXX.XXXXXXXXXX#XXXXXXXXMXXXXXXX
XXXXXXXXXXXXXXX..XXXXXXX.XXXXXXXXXXXXXXXXXXX.XXXXXXX
XXXXXXXXXXXXXXX.........M...M.....M....MD....XXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Schlüsselträger:
```json
[
  {
    "id": "sun",
    "seal": "sun",
    "x": 37,
    "y": 8,
    "direction": "right"
  },
  {
    "id": "moon",
    "seal": "moon",
    "x": 16,
    "y": 29,
    "direction": "right"
  }
]
```

```json
{
  "pits": []
}
```

```json
{
  "keys": [],
  "doors": [
    {
      "id": "sun-lock",
      "seal": "sun",
      "x": 3,
      "y": 4
    },
    {
      "id": "moon-lock",
      "seal": "moon",
      "x": 3,
      "y": 5
    }
  ],
  "portals": [
    {
      "id": "Aa",
      "pair": "A",
      "x": 5,
      "y": 23
    },
    {
      "id": "Ab",
      "pair": "A",
      "x": 12,
      "y": 10
    }
  ]
}
```

```json
{
  "gates": [
    {
      "id": "G1",
      "label": "G1",
      "x": 10,
      "y": 16,
      "open": false
    },
    {
      "id": "G2",
      "label": "G2",
      "x": 26,
      "y": 20,
      "open": false
    },
    {
      "id": "LOOP",
      "label": "G2",
      "x": 25,
      "y": 19,
      "open": true
    },
    {
      "id": "RETURN",
      "label": "G3",
      "x": 14,
      "y": 30,
      "open": false
    },
    {
      "id": "SEAL",
      "label": "G2",
      "x": 23,
      "y": 16,
      "open": true
    },
    {
      "id": "WORK-L",
      "label": "G3",
      "x": 27,
      "y": 29,
      "open": true
    },
    {
      "id": "WORK-R",
      "label": "G3",
      "x": 33,
      "y": 29,
      "open": true
    }
  ],
  "levers": [
    {
      "id": "release",
      "label": "G1",
      "x": 8,
      "y": 14,
      "gates": [
        "G1"
      ],
      "dispensers": []
    },
    {
      "id": "redirect",
      "label": "G2",
      "x": 30,
      "y": 14,
      "gates": [
        "G2",
        "LOOP",
        "SEAL"
      ],
      "dispensers": []
    },
    {
      "id": "return",
      "label": "G3",
      "x": 35,
      "y": 30,
      "gates": [
        "RETURN",
        "WORK-L",
        "WORK-R"
      ],
      "dispensers": []
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 8 13
use down
harvest 3 5 16 22
until 26 17 beetle
walk 31 14
until 26 17 beetle
use left
until 32 27 beetle
walk 35 29
until 32 29 beetle
use down
walk 15 32
walk 15 31
walk 15 27
walk 16 27
strike moon right
key moon
walk 36 4
walk 36 6
walk 38 6
strike sun right
key sun
harvest 22 4 25 9
harvest 16 27 29 6
walk 3 3
```

## 35 – Die Werkstattkette

Die wandelbare Mine. 44 × 32 Felder, Quote 33, 125 Sekunden, Schwierigkeit 3/3.

G1 erschließt R1. Lass seinen Fels den goldenen Käfer in der engen Bucht einschließen, statt ihn zu treffen. Zieh dich zurück: Die Explosion öffnet die Wand und setzt den Sonnenschlüssel frei. Danach verbindet G2 Blau und Lila; R2 liefert ihren notwendigen Diamanten.

Hinweis: G1 erschließt R1. Lass seinen Fels den goldenen Käfer in der engen Bucht einschließen, statt ihn zu treffen. Zieh dich zurück: Die Explosion öffnet die Wand und setzt den Sonnenschlüssel frei. Danach verbindet G2 Blau und Lila; R2 liefert ihren notwendigen Diamanten.

Geprüfter Durchlauf: 426 Takte / 42.6 Sekunden, 33 Kristallpunkte, 48 Wertungspunkte. Replay: public/replays/35.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXX#XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXX.XXXXXXXXXXXXXXXXX..M...M...M...M..XXXXXX
XXXP.M.M.XXXXXXXXXXXX.XXXXXXXXXXXXXXX.XXXXXX
XXX.XXX.#XXXXXX#XXXXX.XXXXXXXXXXXXXXX.XXXXXX
XXX.XXX....#..#·XXXXX.XXXXXXXXXXXXXXXMXXXXXX
XXX.XXXXXXXXX.X·XXXXX.XXXXXXXXXXXXXXX.XXXXXX
XXX.XXXXXXXXX.X·XXXXX.#XXXXXXXXXXXXXX....XXX
XXX.XXXXXXXXX..··#...........XXXXXXXX.XX.XXX
XXX..M..MDXXXXXX·#XXXXXXXXXX.XXXXXXXX.XXMXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXX.X#XXXXXX.XX.XXX
XXX.XXXXXXXXXXXXXXXXXXXXXX·X.#·XXXdXX.XX.XXX
XXX.XXXXXXXXXXXXXXXXXXXXXX·X.X·XXX·XX.XX.XXX
XXX.XM..M...XXXXXXXXXXXXXX·X.X·XXX·XX.XX.XXX
XXX.XXXXXXX.XXXXXXXXXXXX..^#·····#·XX.XXMXXX
XXX.XXXXXXX.XXXXXXXX.....XXXXXXXXXXXX.XX.XXX
XXX.XXXXXXX.XXXXXXXX.XXXXXXXXXXXXXXXX.XX.XXX
XXX.XXXXXXXMXXXXXXXX.XXXXXXXXXXXXXXXX.XX.XXX
XXX.XXXXXXX.XXXXXXXX.XXXXXXXXXXXXXXXX...DXXX
XXX.XXXXXXX.XXXXXXXX.XXXXXXXXXXXXXXXX.XXXXXX
XXX.XXXXXXX.XXXXXXXX.XXXXXXXXXXXXXXXXMXXXXXX
XXX.XXXXXXX.XXXXXXXX.XXXXXXXXXXXXXXXX.XXXXXX
XXX...M...M.XXXXXXXX........M...M.....XXXXXX
XXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXX.XXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXX.XXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXX...M...M....DXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Schlüsselträger:
```json
[
  {
    "id": "sun",
    "seal": "sun",
    "x": 16,
    "y": 11,
    "direction": "up"
  }
]
```

```json
{
  "pits": []
}
```

```json
{
  "keys": [],
  "doors": [
    {
      "id": "sun-lock",
      "seal": "sun",
      "x": 19,
      "y": 11
    }
  ],
  "portals": []
}
```

```json
{
  "gates": [
    {
      "id": "G1",
      "label": "G1",
      "x": 11,
      "y": 8,
      "open": false
    },
    {
      "id": "G2a",
      "label": "G2",
      "x": 27,
      "y": 17,
      "open": false
    },
    {
      "id": "G2b",
      "label": "G2",
      "x": 33,
      "y": 17,
      "open": false
    },
    {
      "id": "EXIT",
      "label": "G2",
      "x": 3,
      "y": 4,
      "open": false
    }
  ],
  "levers": [
    {
      "id": "G1-control",
      "label": "G1",
      "x": 8,
      "y": 7,
      "gates": [
        "G1"
      ],
      "dispensers": []
    },
    {
      "id": "R1-control",
      "label": "R1",
      "x": 14,
      "y": 8,
      "gates": [],
      "dispensers": [
        "R1"
      ],
      "view": {
        "x": 12,
        "y": 6,
        "width": 8,
        "height": 7
      }
    },
    {
      "id": "G2-control",
      "label": "G2",
      "x": 22,
      "y": 10,
      "gates": [
        "G2a",
        "G2b",
        "EXIT"
      ],
      "dispensers": []
    },
    {
      "id": "R2-control",
      "label": "R2",
      "x": 29,
      "y": 14,
      "gates": [],
      "dispensers": [
        "R2"
      ],
      "view": {
        "x": 25,
        "y": 12,
        "width": 11,
        "height": 7
      }
    }
  ],
  "dispensers": [
    {
      "id": "R1",
      "label": "R1",
      "x": 15,
      "y": 7,
      "stock": 1
    },
    {
      "id": "R2",
      "label": "R2",
      "x": 30,
      "y": 13,
      "stock": 2
    }
  ]
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 8 8
use up
walk 13 8
blast sun right
walk 10 8
wait 62
key sun
walk 22 11
use up
walk 28 14
strike crystal-crawler right
wait 5
walk 30 17
harvest 3 5 38 24
walk 3 3
```

## 36 – Das offene Geröllmeer

Die wandelbare Mine. 56 × 36 Felder, Quote 92, 140 Sekunden, Schwierigkeit 3/3.

80 verstreute Edelsteine, 107 Felsen, keine inneren Trennwände. Du brauchst alle 92 Kristallpunkte. Plane die Sammlung und den Besuch beim EXIT-Hebel so, dass die veränderte Felslage deinen Rückweg nicht unnötig verlängert.

Hinweis: 80 verstreute Edelsteine, 107 Felsen, keine inneren Trennwände. Du brauchst alle 92 Kristallpunkte. Plane die Sammlung und den Besuch beim EXIT-Hebel so, dass die veränderte Felslage deinen Rückweg nicht unnötig verlängert.

Geprüfter Durchlauf: 533 Takte / 53.3 Sekunden, 92 Kristallpunkte, 92 Wertungspunkte. Replay: public/replays/36.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X....................................................XEX
X................R...........R......................RX#X
X.R...M....M.......M...D..M............M........DRR....X
X....R........................R....R.R........R........X
X................D...M.R....M.....................R....X
X.........M...............R.....R.....R........R...M...X
X.............R.....M....R.................R.R..R...R..X
X.............R....................................R...X
X............R.....................M..M....R...........X
X.R....M..........M.....................R..R...M.......X
X..........M.............M..M....R...M...M.............X
X.R....R.R...R.M.............R..........R..............X
X....M....R...R..R.M..M...M....R..............R..R.....X
X........M..MR..M............M...R.....R....M..........X
X......M............M....R.........M...............D...X
X..M..........R.............M............RM...RR.......X
X.......M..M.......R...R.............R.............R...X
X..R.............RM...R.....#...............RM.........X
X....MR......M.........D...M..M................R.......X
X.....R.......R......M.........R...........R...........X
X..R...M........R.......M..........M...................X
X..RM..............R......M..RR.MR..............MR..R..X
X..............MR.....R....................M......R....X
X..M.............M..MRR....R.....R..............RR.....X
X..............................M....M....M.RM..........X
X....R............M...M....M...................M.......X
X......................................R...............X
X.....R..........................R........R............X
X....M..R...R..M.....RM...R.....R..............RR..R...X
X..M.....M...R..........R..R...R.....M....M...R........X
X......R...M....................MR.....D.......R.......X
X..............R...................................R...X
X......................................................X
XP.....................................................X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Schlüsselträger:
```json
[]
```

```json
{
  "pits": []
}
```

```json
{
  "keys": [],
  "doors": [],
  "portals": []
}
```

```json
{
  "gates": [
    {
      "id": "EXIT",
      "label": "EXIT",
      "x": 54,
      "y": 2,
      "open": false
    }
  ],
  "levers": [
    {
      "id": "exit",
      "label": "EXIT",
      "x": 28,
      "y": 18,
      "gates": [
        "EXIT"
      ],
      "dispensers": []
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 27 18
use right
harvest 1 1 54 34
walk 54 1
```

## 37 – Fracht über der Tiefe

Die hungrigen Adern. 44 × 30 Felder, Quote 34, 135 Sekunden, Schwierigkeit 3/3.

Bereite die Landestelle über A vor und schiebe den Fels ohne Pause über den Schacht. Nach PEN/ORE hält er den Käfer im größeren Gehege lebendig fest. Gewinne den Mondschlüssel im Erzbezirk und plane den Rückweg. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Hinweis: Bereite die Landestelle über A vor und schiebe den Fels ohne Pause über den Schacht. Nach PEN/ORE hält er den Käfer im größeren Gehege lebendig fest. Gewinne den Mondschlüssel im Erzbezirk und plane den Rückweg. Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.

Geprüfter Durchlauf: 453 Takte / 45.3 Sekunden, 37 Kristallpunkte, 47 Wertungspunkte. Replay: public/replays/37.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXX.XXXXXXXXXXXX........·XXXXXXXXXXXXXXXXXXX
XXX.XXXX..M.·XXX.XXXXXXXXXXXXX..M...M...XXXX
XXX.XXXX.XXXXXXX.XXXXXXXXXXXXX.XXXXXXXX.XXXX
XXX.XXXX.XXXXXXX.XXXXXXXXXXXXX.XXXXXXXX.XXXX
XXXP.M.M.XXXXXXX.XXXXXXXXD.....XXXXXXXX.XXXX
XXX.XXXX.X#XXXXX.XXXXXXXXRXXXX.XXXXXXXX.XXXX
XXX.XXXX...·R···.#>···XXX.....MXXXXXXXX.XXXX
XXX.XXXXXXXXX···XXXXXXXXX·XXXX.XXXXXXXX.XXXX
XXX.XXXXXXXXX···XXXXXXX·····XX...M..M.X.XXXX
XXX.XXXXXXXXX···XXXXXXXXXXXXXXXXXXXXXXX.XXXX
XXX.XXXXXXXXX···XXXXXXXXXXXXXXXXXXXXXXX.XXXX
XXX..M...XXXX···XXXXXXXXXXXXXXXXXXXXXXX.XXXX
XXX.XXXX.XXXX···XXXXXXXXXXXXXXXXXXXXXXXMXXXX
XXX.XXXXMXXXXXXXXXXXXXXXXXXXX.......XXX.XXXX
XXX.XXXX.XXXXXXXXXXXXXXXXXXXX.XXXXX.XXX.XXXX
XXX.XXXX...M.DXXXXXXXXXXXXXXXMXXXXX.XXX.XXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXX.XXXXX.X.M.XXXX
XXX.XXXXXXXXXXXXXXXXXXXD.M....XXXXX.XXX.XXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXX.XXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXX.XXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXDXXXX
XXX....M....M....M....M....M....M...XXX.XXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXX
XXX.....M......M.......M......M......#..XXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Schlüsselträger:
```json
[
  {
    "id": "moon",
    "seal": "moon",
    "x": 23,
    "y": 12,
    "direction": "right"
  }
]
```

Markierte Gehege:
```json
[
  {
    "id": "PEN",
    "x": 17,
    "y": 10,
    "width": 5,
    "height": 1,
    "required": 1
  }
]
```

```json
{
  "pits": []
}
```

```json
{
  "keys": [],
  "doors": [
    {
      "id": "exit",
      "seal": "moon",
      "x": 3,
      "y": 4
    }
  ],
  "portals": [
    {
      "id": "Aa",
      "pair": "A",
      "x": 12,
      "y": 5
    },
    {
      "id": "Ab",
      "pair": "A",
      "x": 24,
      "y": 4
    }
  ]
}
```

```json
{
  "gates": [
    {
      "id": "PEN",
      "label": "PEN",
      "x": 17,
      "y": 10,
      "open": false
    },
    {
      "id": "ORE",
      "label": "ORE",
      "x": 37,
      "y": 27,
      "open": false
    }
  ],
  "levers": [
    {
      "id": "pen",
      "label": "PEN / ORE",
      "x": 10,
      "y": 9,
      "gates": [
        "PEN",
        "ORE"
      ],
      "dispensers": []
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 11 5
move right
walk 16 10
walk 23 4
move right
walk 11 10
move right
move right
move right
move right
walk 10 10
use up
walk 30 10
walk 29 10
walk 26 10
strike moon left
key moon
harvest 3 5 37 23
walk 3 3
```

## 38 – Zwei Arbeitsfronten

Die wandelbare Mine. 54 × 38 Felder, Quote 46, 150 Sekunden, Schwierigkeit 3/3.

P1 erschließt den Sonnenbezirk. Seine Abschaltung startet P2 für den Mondbezirk. Ihre Abschaltungen liegen jeweils hinter der Arbeit und öffnen getrennte Rückwege sowie die Ausgangsriegel. Abschalten entfernt vorhandene Käfer nicht. Gewinne beide Schlüssel; alle vier Ausgangssperren liegen in derselben geschützten Passage.

Hinweis: P1 erschließt den Sonnenbezirk. Seine Abschaltung startet P2 für den Mondbezirk. Ihre Abschaltungen liegen jeweils hinter der Arbeit und öffnen getrennte Rückwege sowie die Ausgangsriegel. Abschalten entfernt vorhandene Käfer nicht. Gewinne beide Schlüssel; alle vier Ausgangssperren liegen in derselben geschützten Passage.

Geprüfter Durchlauf: 505 Takte / 50.5 Sekunden, 54 Kristallpunkte, 69 Wertungspunkte. Replay: public/replays/38.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXX.XXXXXXXXXXXXXXXXXXXXXX..M...M...M...M...M.DXXXXXXX
XXX#XXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXX.XXXXXXX
XXX#XXXXXXXXXXXXXXXXXXXXXXMXXXXXXXXXXXXXXXXXXX.XXXXXXX
XXX.XXXXXXXXXXXXXXXXXXXXXX.XXXXX#XXXXXXXXXXXXX.XXXXXXX
XXX..M..M....XXXXXXXXXXXXX..M..M..M....RXXXXXXMXXXXXXX
XXXPXXXXXXXX.XXXXXXXXXXXXX.XXXXXXXXX....XXXXXX.XXXXXXX
XXX.XXXXXXXXMXXXXX.XXX.XXX.XXXXXXXXXXXX·XXXXXX.XXXXXXX
XXX.XXXXXXXX...XXX.XXX.XXX.XXXXXXXXXX·····XXXX.XXXXXXX
XXX.XXXXXXXX.#·#HHHHHHHHHH·····XXXXXXXXXXXXXXX.XXXXXXX
XXX.XXXXXXXX.XXXXXXXXXXXXXX·XX·XXXXXXXXXXXXXXX.XXXXXXX
XXX.XXXXXXXX.XXXXXXXXXXXXXX·XX·XXXDXXXXXXXXXXXMXXXXXXX
XXX.XXXXXXXX.XXXXXXXXXXXXXX·XX·XXX.XXXXXXXXXXX.XXXXXXX
XXX..M.M.XXX.XXXXXXXXXXXXXX····XXXMXXXXXXXXXXX.XXXXXXX
XXX.XXXX.XXX.XXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXX.XXXXXXX
XXX.XXXX.XXX.XXXXXXXXXXXXXXXXX........M...M.....DXXXXX
XXX.XXXXMXXX.XXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXX.XXXXX
XXX.XXXX.XXX.XXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXMXXXXX
XXX.XM..DXXX.XXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXX.XXXXX
XXX.XXXXXXXX.XXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXX#XX.XXXXX
XXX.XXXXXXXX.XXXXXXXXXXXXXXXXXMXXXXXXXXXXXXXX·...XXXXX
XXXMXXXXXXXXMXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXX#XXXXXXXX
XXX.XXXXXXXX.XXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXHXXXXXXXX
XXX.XXXXXXXX.XXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXHXXXXXXXX
XXX.XXXXXXXX..M..M..M..#..M.M..XXXXXXXXXXXXXXHXXXXXXXX
XXX.XXXXXXXX.XXXXXXXXXXXXXXXXXXXRXXXXX#.XXXXXHXXXXXXXX
XXX.XXXXXXXX.XXXXXXXXXXXXXXX.....XXX.........HXXXXXXXX
XXX...M...M.DXXXXXXXXXXXXXXX.XXX·XXX.XXXXXXXX#XXXXXXXX
XXXXXXXXXXXX.XXXXXXXXXXXXXXX.X·····X.XXXX·····XXXXXXXX
XXXXXXXXXXXX.XXXXXXXXXXXXXXX.XXXXXXX.XXXX·XXX·XXXXXXXX
XXXXXXXXXXXX....M...M..M.#............XXX·XXX·XXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXMXXX·XXX·XXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXM..M...M.DXXX·····XXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Schlüsselträger:
```json
[
  {
    "id": "sun",
    "seal": "sun",
    "x": 37,
    "y": 11,
    "direction": "right"
  },
  {
    "id": "moon",
    "seal": "moon",
    "x": 30,
    "y": 31,
    "direction": "right"
  }
]
```

Markierte Gehege:
```json
[
  {
    "id": "P2",
    "x": 41,
    "y": 31,
    "width": 5,
    "height": 5,
    "required": 1
  }
]
```

```json
{
  "pits": [
    {
      "id": "P1",
      "label": "P1",
      "x": 13,
      "y": 12,
      "direction": "right",
      "delay": 40,
      "interval": 180,
      "maxAlive": 1,
      "active": true
    },
    {
      "id": "P2",
      "label": "P2",
      "x": 45,
      "y": 22,
      "direction": "down",
      "delay": 120,
      "interval": 180,
      "maxAlive": 1,
      "active": false
    }
  ]
}
```

```json
{
  "keys": [],
  "doors": [
    {
      "id": "sun-lock",
      "seal": "sun",
      "x": 3,
      "y": 3
    },
    {
      "id": "moon-lock",
      "seal": "moon",
      "x": 3,
      "y": 4
    }
  ],
  "portals": []
}
```

```json
{
  "gates": [
    {
      "id": "IN1",
      "label": "P1",
      "x": 15,
      "y": 12,
      "open": true
    },
    {
      "id": "IN2",
      "label": "P2",
      "x": 45,
      "y": 24,
      "open": true
    },
    {
      "id": "RET1",
      "label": "P1",
      "x": 23,
      "y": 27,
      "open": false
    },
    {
      "id": "RET2",
      "label": "P2",
      "x": 25,
      "y": 33,
      "open": false
    },
    {
      "id": "E1",
      "label": "P1",
      "x": 3,
      "y": 5,
      "open": false
    },
    {
      "id": "E2",
      "label": "P2",
      "x": 3,
      "y": 6,
      "open": false
    },
    {
      "id": "WORK2",
      "label": "P2",
      "x": 45,
      "y": 30,
      "open": true
    }
  ],
  "levers": [
    {
      "id": "stop1",
      "label": "P1→P2",
      "x": 32,
      "y": 7,
      "gates": [
        "IN1",
        "RET1",
        "E1"
      ],
      "dispensers": [],
      "pits": [
        "P1",
        "P2"
      ]
    },
    {
      "id": "stop2",
      "label": "P2",
      "x": 38,
      "y": 28,
      "gates": [
        "IN2",
        "RET2",
        "E2",
        "WORK2"
      ],
      "dispensers": [],
      "pits": [
        "P2"
      ]
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
harvest 3 8 10 23
clear 25 12
walk 32 8
use up
walk 36 8
walk 38 8
walk 38 9
strike sun right
key sun
harvest 26 4 23 24
walk 48 23
until 43 35 beetle
walk 39 28
use left
walk 28 33
walk 28 29
walk 31 29
strike moon right
key moon
harvest 12 29 26 7
walk 3 2
```

## 39 – Die Ernte fällt nach unten

Die hungrigen Adern. 42 × 34 Felder, Quote 46, 115 Sekunden, Schwierigkeit 3/3.

Stelle die beiden Felsen oben seitlich ab. Öffne ORE an der unteren Galerie und lass die vier Adern zu dir fallen. A verbindet Arbeitsgang und Sammelboden. Plane die Sammelrunde unter den Schächten; du brauchst die gesamte Ernte.

Hinweis: Stelle die beiden Felsen oben seitlich ab. Öffne ORE an der unteren Galerie und lass die vier Adern zu dir fallen. A verbindet Arbeitsgang und Sammelboden. Plane die Sammelrunde unter den Schächten; du brauchst die gesamte Ernte.

Geprüfter Durchlauf: 397 Takte / 39.7 Sekunden, 46 Kristallpunkte, 46 Wertungspunkte. Replay: public/replays/39.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X########################################X
X########################################X
X##E#####################################X
X##.#####################################X
X##.###.........................M...#####X
X##.###.###.R·#########.R·#########.#####X
X##.###.####.#####D#####.#####D####.#####X
X##P..·.####·#####·#####·#####·####M#####X
X##.########M#####M#####M#####M####.#####X
X##.########D#####·#####D#####·.....#####X
X##.########D#####D#####D#####D##########X
X##.########·#####·#####·#####·##########X
X##.########M#####M#####M#####M##########X
X##.########·#####·#####·#####·##########X
X##..M.M#################################X
X##.########·#####·#####·#####·##########X
X##.########·#####·#####·#####·##########X
X##.########·#####·#####·#####·##########X
X##.####....·#####·#####·#####·##########X
X##.####.###·#####·#####·#####·##########X
X##.####.###·#####·#####·#####·##########X
X##.####.###·#####·#####·#####·##########X
X##.####.###·#####·#####·#####·##########X
X##.####.............................####X
X##.################################.####X
X##.################################.####X
X##.####..M....M....M....M....######.####X
X##.#########################.######.####X
X##..M....M....M....M....M....M....·.####X
X########################################X
X########################################X
X########################################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

```json
{
  "pits": []
}
```

```json
{
  "keys": [],
  "doors": [],
  "portals": [
    {
      "id": "Aa",
      "pair": "A",
      "x": 6,
      "y": 8
    },
    {
      "id": "Ab",
      "pair": "A",
      "x": 35,
      "y": 29
    }
  ]
}
```

```json
{
  "gates": [
    {
      "id": "DROP12",
      "label": "ORE",
      "x": 12,
      "y": 15,
      "open": false
    },
    {
      "id": "DROP18",
      "label": "ORE",
      "x": 18,
      "y": 15,
      "open": false
    },
    {
      "id": "DROP24",
      "label": "ORE",
      "x": 24,
      "y": 15,
      "open": false
    },
    {
      "id": "DROP30",
      "label": "ORE",
      "x": 30,
      "y": 15,
      "open": false
    }
  ],
  "levers": [
    {
      "id": "harvest",
      "label": "ORE",
      "x": 7,
      "y": 19,
      "gates": [
        "DROP12",
        "DROP18",
        "DROP24",
        "DROP30"
      ],
      "dispensers": []
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 11 6
move right
walk 23 6
move right
walk 8 19
use left
wait 12
harvest 8 20 29 10
harvest 3 5 33 25
walk 3 3
```

## 40 – Der Preis des Durchbruchs

Die hungrigen Adern. 56 × 40 Felder, Quote 54, 225 Sekunden, Schwierigkeit 3/3.

P liefert genau einen Helfer. Lass ihn den Durchbruch vollenden, schließe G3 hinter ihm und verwandle ihn mit R1 in seiner weißen Phase in einen Diamanten. Öffne G3 zur Bergung. Ein zweiter Diamant entsteht aus Blau/Lila und R2. Beide sind für die Quote nötig. P/R bereitet den Rückweg vor; der Pit lässt sich nicht nachfüllen.

Hinweis: P liefert genau einen Helfer. Lass ihn den Durchbruch vollenden, schließe G3 hinter ihm und verwandle ihn mit R1 in seiner weißen Phase in einen Diamanten. Öffne G3 zur Bergung. Ein zweiter Diamant entsteht aus Blau/Lila und R2. Beide sind für die Quote nötig. P/R bereitet den Rückweg vor; der Pit lässt sich nicht nachfüllen.

Geprüfter Durchlauf: 756 Takte / 75.6 Sekunden, 54 Kristallpunkte, 84 Wertungspunkte. Replay: public/replays/40.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXX.XXXXX..M..M..XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXX#XXXXX.XXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXX.XXXXX.XXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXP.M..M.XXXXXX.XXXXXXXXXXXXXXX..M...M...M...M...XXXXXX
XXX.XXXXXXXXXXXX.XXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXX.XXXXXX
XXX.XXXXXXXXXXXX.#XXXXXXXXXXXXXX.....XXXXXXXXXXXX.XXXXXX
XXX.XXXXXXXXXXXX.XXXXXXXXXXXXXXX.X.#.X#XXXXXXXXXX.XXXXXX
XXX.XM...XXXXXXX.XXXXXXXXXXXXXXX.X.#.#·XXXXXD.....XXXXXX
XXX.XXXX.XXXXXXX.....XXXXXXXXXXX.XXXXX·XXXXX.XXXX.XXXXXX
XXX.XXXXMXXXXXXXXXX#·#HHHHHHHHHH····#···XXXXMXXXX.XXXXXX
XXX.XXXX.XXXXXXXXXXXXXXXXXXXXXXXX.XX·XX·XXXX.XXXX.XXXXXX
XXX..M...XXXXXXXXXXXXXXXXXXXXXXXX.·X·XX·XXXX...M..XXXXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXX#.#X·XX·XXXXXXXXX.XXXXXX
XXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXX.·X····XXXXXXXXX.XXXXXX
XXX.XXXXXXXXXXRXXXXXXXXXXXXXXXXXX.·XXXXXXXXXXXXXX.XXXXXX
XXX.XXXXXX.....XXXXXXXXXXX···>#·······#l···XXXXXXMXXXXXX
XXX.XXXXXX.XXX·XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXX
XXX.XXXX..M.·····XXXXXXXXXXXXXXRXXXXXXXXXXXXXXXXX.XXXXXX
XXX.XXXX.XXXXXXXXXXXXXXXXXX.....XXXXXXXXXXXXXXXXX.XXXXXX
XXX.XXXX.XXXXXXXXXXXXXXXXXX.XXX·XXXXXXXXXXXXXXXXX.XXXXXX
XXX.XXXX.XXXXXXXXXXXXXXX.#.M.·····XXXXXXXXXX..M...XXXXXX
XXX.XXXX.XXXXXXXXXXXXXXX.XX.XXX.XXXXXXXXXXXX.XXXX.XXXXXX
XXX.XXXX.XXXXXXXXXXXXXXX.XX.XXX.XXXXXXXXXXXXMXXXX.XXXXXX
XXX.XXXX..M...M.DXXXXXXX.XX.XXX.XXXXXXXDM....XXXX.XXXXXX
XXX.XXXXXXXXXXXX.XXXXXXX.XX.XXX.XXXXXXXXXXXXXXXXX.XXXXXX
XXX..M.MXXXXXXXX.XXXXXXX.XX.XXX.XXXXXXXXXXXXXXXXX.XXXXXX
XXX.XXXXXXXXXXXX.XXXXXXX...M....M....M....M....M..XXXXXX
XXX.XXXXXXXXXXXX.XXXXXXX.XXXXXXXXXXXXXXXXXXXXX.XXXXXXXXX
XXX.XXXXXXXXXXXX.XXXXXXX.XXXXXXXXXXXXXXXXXXXXXMXXXXXXXXX
XXX...M...M...M.....#....XXXXXXXXXXXXXXXXXXXXX.XXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXX...M....M....M....M...DXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Schlüsselträger:
```json
[
  {
    "id": "wake-key",
    "seal": "sun",
    "x": 12,
    "y": 22,
    "direction": "right"
  },
  {
    "id": "home-key",
    "seal": "moon",
    "x": 29,
    "y": 25,
    "direction": "right"
  }
]
```

```json
{
  "pits": [
    {
      "id": "P",
      "label": "P",
      "x": 19,
      "y": 14,
      "direction": "right",
      "delay": 20,
      "interval": 0,
      "maxAlive": 1,
      "active": false,
      "stock": 1
    }
  ]
}
```

```json
{
  "keys": [],
  "doors": [
    {
      "id": "wake-lock",
      "seal": "sun",
      "x": 15,
      "y": 5
    },
    {
      "id": "home-lock",
      "seal": "moon",
      "x": 3,
      "y": 4
    }
  ],
  "portals": []
}
```

```json
{
  "gates": [
    {
      "id": "F1",
      "label": "F",
      "x": 30,
      "y": 20,
      "open": false
    },
    {
      "id": "F2",
      "label": "F",
      "x": 38,
      "y": 20,
      "open": false
    },
    {
      "id": "RETURN",
      "label": "R",
      "x": 20,
      "y": 34,
      "open": false
    },
    {
      "id": "IN",
      "label": "P",
      "x": 21,
      "y": 14,
      "open": true
    },
    {
      "id": "EXIT",
      "label": "R",
      "x": 3,
      "y": 6,
      "open": false
    },
    {
      "id": "HOLD",
      "label": "G3",
      "x": 36,
      "y": 14,
      "open": true
    }
  ],
  "levers": [
    {
      "id": "wake",
      "label": "P",
      "x": 17,
      "y": 10,
      "gates": [],
      "dispensers": [],
      "pits": [
        "P"
      ]
    },
    {
      "id": "fusion",
      "label": "F",
      "x": 35,
      "y": 12,
      "gates": [
        "F1",
        "F2"
      ],
      "dispensers": []
    },
    {
      "id": "last",
      "label": "R2",
      "x": 32,
      "y": 17,
      "gates": [],
      "dispensers": [
        "LAST"
      ],
      "view": {
        "x": 29,
        "y": 14,
        "width": 9,
        "height": 9
      }
    },
    {
      "id": "return",
      "label": "P / R",
      "x": 25,
      "y": 25,
      "gates": [
        "RETURN",
        "IN",
        "EXIT"
      ],
      "dispensers": [],
      "pits": [
        "P"
      ]
    },
    {
      "id": "hold",
      "label": "G3",
      "x": 35,
      "y": 11,
      "gates": [
        "HOLD"
      ],
      "dispensers": []
    },
    {
      "id": "worker-drop",
      "label": "R1",
      "x": 37,
      "y": 12,
      "gates": [],
      "dispensers": [
        "WORK"
      ],
      "view": {
        "x": 34,
        "y": 9,
        "width": 8,
        "height": 11
      }
    }
  ],
  "dispensers": [
    {
      "id": "LAST",
      "label": "R2",
      "x": 34,
      "y": 17,
      "stock": 1
    },
    {
      "id": "WORK",
      "label": "R1",
      "x": 38,
      "y": 11,
      "stock": 1
    }
  ]
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 8 22
walk 10 22
walk 10 20
walk 13 20
strike wake-key right
key wake-key
walk 16 10
use right
harvest 3 8 14 27
until 39 14 digger
walk 34 11
until 37 14 beetle
use right
walk 36 12
strike pit:P right
wait 5
walk 34 11
use right
walk 38 14
walk 34 12
use right
walk 33 17
strike crystal-crawler left
wait 6
walk 34 20
walk 27 31
walk 27 23
walk 30 23
strike home-key right
key home-key
walk 26 25
use left
harvest 24 8 26 28
walk 3 3
```

## Alternative in Höhle 10: Felsfalle

Auch diese Lösung verwendet die normale Simulation und denselben Ausgang. Replay: public/replays/10-crush.json.

```text
walk 12 20
walk 12 19
snap up
walk 12 20
walk 10 20
walk 10 18
move right
walk 11 12
walk 12 12
walk 14 12
walk 16 12
walk 18 12
walk 19 12
walk 19 13
snap right
wait 12
walk 19 12
walk 21 12
walk 23 12
walk 25 12
walk 24 12
walk 24 8
walk 26 8
wait 0
move right
walk 26 8
walk 25 8
walk 25 3
walk 30 3
walk 30 6
strike beetle right
wait 5
walk 30 3
walk 25 3
walk 25 8
walk 27 8
walk 27 9
walk 27 10
walk 29 10
walk 29 8
walk 30 8
move right
move right
move right
move right
walk 34 6
walk 34 4
walk 36 3
walk 37 3
```

## Alternative in Höhle 18: bewachte Abkürzung

Replay: public/replays/18-shortcut.json. Aktuelle Zeiten und Punkte werden im Prüfbericht dokumentiert; beide Routen verwenden dieselbe aktuelle Karte.

```text
walk 11 10
move right
move right
move right
move right
move right
move right
move right
move right
move right
move right
wait 8
walk 21 4
harvest 23 3 18 13
walk 42 27
walk 39 27
snap up
walk 42 32
walk 30 32
walk 37 26
move right
walk 38 20
use up
harvest 29 16 17 20
walk 30 14
walk 8 14
walk 8 20
walk 3 21
```
