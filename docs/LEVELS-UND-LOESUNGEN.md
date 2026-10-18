# Die zwanzig Höhlen – Entwurf und Lösungen

Alle Lösungen wurden im Normalspiel mit aktiven Gegnern, Schwerkraft und Countdown ausgeführt und als Replay erneut geprüft. Ein Lösungsreplay beweist Lösbarkeit; es ersetzt kein menschliches Urteil über Spielspaß.

Legende: X Außenwand, # Mauer, . Erde, Leerzeichen Gang, P Spieler, E Ausgang, R Fels, M Smaragd, D Diamant, C Kristallkrabbler, >/< /^/v blaue Krabbler mit Startausrichtung; u/r/d/l lila Krabbler. Geräte werden unter jeder Karte gesondert angegeben. use = frische Hebelbetätigung mit anschließendem Loslassen; until = auf Käfer an der angegebenen Koordinate warten.

## 01 – Die erste Schicht

Ein Licht im Dunkeln. 18 × 12 Felder, Quote 8, 180 Sekunden, Schwierigkeit 1/3.

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

Erst denken. Dann graben.. 22 × 14 Felder, Quote 10, 210 Sekunden, Schwierigkeit 1/3.

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

Ein freier Platz verändert alles. 24 × 16 Felder, Quote 12, 240 Sekunden, Schwierigkeit 2/3.

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

Stein auf Stein. 28 × 18 Felder, Quote 15, 300 Sekunden, Schwierigkeit 2/3.

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

Ein berechenbarer Gegner. 28 × 18 Felder, Quote 12, 300 Sekunden, Schwierigkeit 3/3.

Von (12,6) geschützt beobachten. Die Stütze so entfernen, dass der fallende Stein den Krabbler in der unteren Kammer trifft. Danach die obere Galerie ausräumen.

Hinweis: Der Krabbler folgt der Wand rechts und bewegt sich alle drei Takte. Beobachte ihn geschützt. Untergrabe den Stein, wenn der Krabbler von rechts zur Schachtmitte zurückkommt.

Geprüfter Durchlauf: 46 Takte / 4.6 Sekunden, 12 Kristallpunkte, 17 Wertungspunkte. Replay: public/replays/05.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
X##########################X
X##########################X
X###################....E##X
X###################.....##X
X############R######.....##X
X#P.............D.D.D.D..##X
X#.....R#####·##########.##X
X#......##>······#######.##X
X#......################.##X
X#.###..#############.....#X
X#.###..#############.....#X
X#......#############.....#X
X#......#############.....#X
X#......#############.....#X
X####################.....#X
X##########################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 12 6
wait 15
snap right
wait 5
walk 16 6
walk 18 6
walk 20 6
walk 22 6
walk 24 6
walk 24 3
```

## 06 – Hinter Stein und Riegel

Einsperren statt erschlagen. 26 × 18 Felder, Quote 9, 300 Sekunden, Schwierigkeit 2/3.

Den linken Diamanten holen, zum Fels gehen und den Krabbler beobachten. Den Stein nach rechts in den Zugang schieben, wenn der Krabbler in der oberen Nische ist. Unter dem Riegel hindurch in die rechte Kammer gehen, zwei Diamanten sammeln und zum Ausgang aufsteigen.

Hinweis: Der Krabbler muss lebend in höchstens zwei freien Feldern eingeschlossen bleiben. Schiebe den Fels in den Zugang, wenn er in einer Nische ist. Sammle danach drei Diamanten. Quote und Aufgabe öffnen gemeinsam den Ausgang.

Geprüfter Durchlauf: 46 Takte / 4.6 Sekunden, 9 Kristallpunkte, 14 Wertungspunkte. Replay: public/replays/06.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXX
X########################X
X########################X
X########################X
X########################X
X###################E...#X
X#############·########.#X
X#############^########.#X
X#...........R··#######.#X
X#............#########.#X
X#...###................#X
X#...###.....####.......#X
X#.P......D..####...D.D.#X
X#...........####.###...#X
X#...........####.......#X
X########################X
X########################X
XXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 10 12
walk 12 8
wait 8
move right
walk 13 10
walk 20 12
walk 22 12
walk 23 12
walk 23 5
walk 20 5
```

## 07 – Der richtige Augenblick

Ein Abwurf aus sicherer Entfernung. 28 × 18 Felder, Quote 9, 300 Sekunden, Schwierigkeit 3/3.

Bei (16,5) stehen bleiben. Den Abwurf vorhalten: Stütze bei Takt 25 entfernen, damit der Fels den Krabbler bei Takt 28 trifft. Danach rechts absteigen, die drei Diamanten der unteren Galerie holen und zum westlichen Ausgang gehen.

Hinweis: Der Fels braucht mehrere Takte bis zur Laufbahn. Warte links neben seiner Stütze, bis der Krabbler von links an das Feld vor dem Fallschacht herankommt. Grabe die Stütze nebenan weg. Du musst ihn treffen, bevor der Ausgang öffnet.

Geprüfter Durchlauf: 66 Takte / 6.6 Sekunden, 9 Kristallpunkte, 14 Wertungspunkte. Replay: public/replays/07.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
X##########################X
X##########################X
X##########################X
X################R#########X
X#.P.....................##X
X################·######.##X
X################·######.##X
X######·>···············.##X
X#######################.##X
X#######################.##X
X####E...###############.##X
X####....###############.##X
X####...........D.D.D....##X
X##########################X
X##########################X
X##########################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 16 5
wait 11
snap right
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

Es gibt mehr als einen Weg. 30 × 20 Felder, Quote 12, 360 Sekunden, Schwierigkeit 2/3.

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

Der Kristallkrabbler. 28 × 19 Felder, Quote 5, 300 Sekunden, Schwierigkeit 3/3.

Links der Stütze bei (14,8) warten. Bei Takt 14 rechts nebenan graben. Der Stein trifft bei Takt 16. Rechts in die Laufbahn steigen, den entstandenen Diamanten einsammeln und im östlichen Schacht beide Smaragde auf dem Weg zum Ausgang holen.

Hinweis: Der blaue Krabbler mit Diamantzeichen verwandelt sich beim Zerquetschen in einen Diamanten (3 Punkte). Auch der fallende Stein verschwindet dabei. Zwei Smaragde ergänzen die Quote: Du brauchst den Diamanten des Krabblers.

Geprüfter Durchlauf: 42 Takte / 4.2 Sekunden, 5 Kristallpunkte, 15 Wertungspunkte. Replay: public/replays/09.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
X##########################X
X##########################X
X##########################X
X##......##################X
X##.###..##################X
X##......##################X
X##......######R###########X
X##P.................######X
X##############·####.######X
X#########C·········.######X
X###################.######X
X###################M#...##X
X###################.#...##X
X###################M#...##X
X###################.#...##X
X###################E....##X
X##########################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 14 8
wait 2
snap right
wait 4
walk 20 8
walk 20 10
walk 15 10
walk 20 10
walk 20 12
walk 20 14
walk 20 16
```

## 10 – Ein Tor nach Lathmar

Am Ende der alten Mine. 40 × 26 Felder, Quote 30, 480 Sekunden, Schwierigkeit 3/3.

Zuerst den unteren Schiebestein lösen und den Galeriestein seitlich untergraben. Sieben Diamanten sammeln. Am bewachten Riegel warten, bis der Krabbler in der oberen Nische ist, und den Riegel nach rechts schieben. Die Stützerde nicht freigraben. Unten herum zum letzten Aufstieg gehen und die drei übrigen Diamanten holen. Alternative: den Krabbler rechts lassen, den oberen Abwurf vorbereiten, treffen und den gelandeten Stein nach rechts wegschieben.

Hinweis: Der letzte Durchgang wird bewacht. Schiebe den Riegelstein nach rechts, wenn der Krabbler in der oberen Nische ist. Lass die Erde unter dem Riegel stehen und gehe durch den unteren Bogen. Alternativ erreichst du links oben die Felsfalle; nach dem Treffer musst du ihren Stein im Gang nach rechts wegschieben. Drei Diamanten liegen erst hinter der Wache.

Geprüfter Durchlauf: 89 Takte / 8.9 Sekunden, 30 Kristallpunkte, 35 Wertungspunkte. Replay: public/replays/10.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X######################################X
X######################################X
X########################......###..DE#X
X#......#################.####.###D####X
X#....R.#################.####.R##.####X
X#......#################.##·#..##D####X
X#......#################.##·##·##.####X
X#......################...R··<·····###X
X#......################.##...#########X
X###.###################.##...#########X
X###.###################.###·##########X
X###.######.D.D.D.D.RD.D.D##·##########X
X###.######.#######·.##.####·##########X
X###.######.########·##.####·##########X
X###.######.########·##.####·##########X
X###.######.########·##.###############X
X###.######.########·##.###############X
X###.#####.R.#######·##....############X
X###.#####.#.#######·##.M..############X
X#.P..........######·##....############X
X###################·##...M############X
X###################·##################X
X###################·##################X
X######################################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.


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
wait 10
move right
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

Ein Hebel, ein neuer Weg. 32 × 22 Felder, Quote 22, 360 Sekunden, Schwierigkeit 2/3.

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

Beobachten, verbinden, sammeln. 36 × 26 Felder, Quote 22, 420 Sekunden, Schwierigkeit 2/3.

Die Westkammer sammeln. Am oberen Beobachtungsweg Hebel F betätigen und das Treffen ansehen. In der Ostkammer die Quote ergänzen und rechts zum Ausgang gehen.

Hinweis: Oben kannst du die Richtungen geschützt beobachten: Blau bevorzugt rechts, Lila links. Hebel F verbindet das getrennte Paar rechts und öffnet den Ausgang. Beim Treffen entsteht ein Kristallkäfer. Sammle danach die Quote in den beiden unteren Kammern.

Geprüfter Durchlauf: 215 Takte / 21.5 Sekunden, 31 Kristallpunkte, 31 Wertungspunkte. Replay: public/replays/12.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X##################################X
X###·····###·····##################X
X###··#·<###··#·l#####··>#l··######X
X###·····###·····##################X
X##################################X
X##################################X
X##P...........................####X
X##.##########################.####X
X##.##########################.####X
X##.##########################.####X
X#R...........#######.....D......R#X
X#.M.........M#######M....#.....M.#X
X#.#....M....#########.....M....#.#X
X#......#.....#######......#......#X
X#..#######..D#######M.########...#X
X#...M......M#########.M......M...#X
X#...#......#.#######..#D..........X
X#M.....M.....#######...#..M.....M.X
X##..#######..#######...########.#.X
X#...........M#######M............#X
X#...........#########.............X
X#...M....M...#######...M.....M..M.X
X#...#....#...#######...#.....#..#.X
X#################################EX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

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

Ein Zug, ein Stein. 40 × 27 Felder, Quote 28, 480 Sekunden, Schwierigkeit 3/3.

Westliche Lagerstätte sammeln. A schalten, zu S wechseln und den Abwurf vorhalten. Nach dem Treffer den Diamanten holen. Den großen Ostabbau durchsuchen und zum Ausgang zurückkehren.

Hinweis: Jetzt kommt der Steinspender: Jeder neue Zug an S gibt genau einen Stein frei. A führt Blau und Lila zusammen. Löse S aus, wenn der Kristallkäfer im Schacht zwei Felder unter der Ausgabe steht. Der Treffer und 28 Kristallpunkte öffnen den Ausgang. Drei Steine erlauben einen zweiten Versuch.

Geprüfter Durchlauf: 272 Takte / 27.2 Sekunden, 36 Kristallpunkte, 46 Wertungspunkte. Replay: public/replays/13.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X######################################X
X######################################X
X######################################X
X#######...................############X
X#######.#########.#####R....D.......R#X
X#######.#####·###.#####.....#........#X
X#.P.M.M....##·###.#####M..........M..#X
X##.##########·###.######..........#..#X
X##.#########>#l·#.#####.......M......#X
X##.##########·.....E###.......#......#X
X##.####################M.#########...#X
X##.#####################.............#X
X##.####################..M.......M...#X
X#R..........###########..#.......#...#X
X#.M........M###########...D..........#X
X#.#...M....############...#..........#X
X#.....#....D###########.......M.....M#X
X#...M.....M############...#########.##X
X#...#.....#.###########M.............#X
X#M....M.....############.............#X
X##....#....M###########..............#X
X#..........############..............#X
X#...M....M..###########...M......M..M#X
X#...#....#..###########...#......#..##X
X######################################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

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
until 14 8 crystal-crawler
use up
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

## 14 – Wechselverkehr

Vier Lagerstätten, ein Rundweg. 48 × 30 Felder, Quote 36, 600 Sekunden, Schwierigkeit 2/3.

A öffnen, West und Nord absuchen. Am zentralen Hebel auf B wechseln, die südliche Werkstatt sammeln und zum Ausgang zurückkehren. Ost kann eines der anderen Gebiete ersetzen.

Hinweis: 53 Punkte, Quote 36: Du brauchst mindestens drei Fundgebiete. A öffnet West und Nord, B Ost und Süd. Wähle deine Runde und nutze die äußeren Verbindungen. Alle vier Dreierkombinationen reichen.

Geprüfter Durchlauf: 272 Takte / 27.2 Sekunden, 40 Kristallpunkte, 40 Wertungspunkte. Replay: public/replays/14.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X##############################################X
X#####################........#################X
X#R.........M.....R###.M.....M##..............#X
X#..........#......#..D#..M..###M..........M..#X
X#..M.............M#.##.M.#.M.###......M...#..#X
X#..#.............##.#..#...#.##.......#......#X
X#...................#M...M..M##..M.......M...#X
X#........M........####...#..###..#....M..#..M#X
X#........#........###D.M..M..##D......#.....##X
X#..############..M####.#..#..###.............#X
X#................##############..........D...#X
X#....M.........M..######.######..........#...#X
X#....#.........#..##......######.##########.##X
X#.................##......######.##########.##X
X#............M.....#........#....##########.##X
X#............#....##.P.E..#################.##X
X#M.......M........##......#################.##X
X##..############..#######.#################.##X
X#................M#######.#################.##X
X#................########.##.................#X
X#.................#######.##M.......M.....M..#X
X#.................#######.#.........#.....#..#X
X#.................##########..M.........M....#X
X#M...M.......M....##########..#.....M...#...M#X
X##...#.......#....##########D.......#.......##X
X#############################................#X
X############################.................#X
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
harvest 2 3 17 23
harvest 22 2 8 9
walk 23 13
use up
harvest 29 20 17 8
walk 24 16
```

## 15 – Stein für Stein

Ein Zug, ein Stein. 48 × 32 Felder, Quote 42, 900 Sekunden, Schwierigkeit 2/3.

Den Kristallkäfer mit einem dosierten Stein treffen. Den entstandenen Diamanten holen. Westlichen und östlichen Abbau sammeln, dann zum Ausgang über dem Start zurückkehren. Der tiefe Ostabbau kann den Westabbau ersetzen.

Hinweis: Der Steinspender ist eine Station auf deiner Sammelrunde. Triff den Kristallkäfer und plane danach einen Weg durch mindestens zwei der drei Abbaugebiete. 42 Punkte werden benötigt. Der Vorrat ist endlich; nach einem Fehlwurf kannst du den nächsten Durchgang abwarten.

Geprüfter Durchlauf: 322 Takte / 32.2 Sekunden, 44 Kristallpunkte, 54 Wertungspunkte. Replay: public/replays/15.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X##############################################X
X##############################################X
X##E###################........M.....D.......R#X
X##.###################M.......#.....#....M...#X
X##.####################..........M.......#...#X
X##.##.........########M..........#...........#X
X##.##.#######.#########.#M#############M##...#X
X##.##.###·###.########...#.............#.....#X
X#.P.M...#·###.########......M................#X
X#########···C.########......#....M..........M#X
X#########·............M..################D#.##X
X###############.#######..................#...#X
X###############.######......M..........M....M#X
X###############.######......#..........#....##X
X###############.###########################.##X
X#R.....D...M......#########################.##X
X#..M...#...#.....M#########################.##X
X#..#.............##########################.##X
X#........M........#########################.##X
X#..############..M####..............D........#X
X#....M.........M.#####...M..........#.......M#X
X#....#.........#..####...#.......M..........##X
X#............M....####...........#..........M#X
X#M.......M...#....####......M..........D.M..##X
X##.D############.M####M.....#....M.....#.#...#X
X#..#.............######..........#..........M#X
X#.................####......................##X
X#M...M.......M....####M.....M..........M.....#X
X##...#.......#....#####.....#..........#.....#X
X##############################################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

```json
{
  "gates": [],
  "levers": [
    {
      "id": "S-lever",
      "x": 8,
      "y": 8,
      "gates": [],
      "dispensers": [
        "S"
      ],
      "label": "S",
      "view": {
        "x": 7,
        "y": 6,
        "width": 9,
        "height": 7
      }
    }
  ],
  "dispensers": [
    {
      "id": "S",
      "x": 10,
      "y": 7,
      "stock": 3,
      "label": "S"
    }
  ]
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 8 9
until 10 10 crystal-crawler
use up
wait 6
walk 6 9
walk 6 6
walk 14 6
walk 14 10
walk 13 11
walk 10 11
walk 14 11
harvest 2 16 17 14
harvest 23 3 23 12
walk 3 3
```

## 16 – Der Besucher

Diesmal bleibt er hier. 50 × 32 Felder, Quote 48, 900 Sekunden, Schwierigkeit 2/3.

Im Westen sammeln. Den Käfer mit A in die Nische lenken und erneut schalten, sobald er oben ist. Den Hauptgang durchqueren, östliche Lagerstätte sammeln und über B nach oben zum Ausgang gehen.

Hinweis: Der Hauptgang wird für mehrere Sammelwege gebraucht. Sperre Blau mit A lebend in die obere Nische ein; damit wird B zum Ausgang wieder frei. Danach wählst du zwischen Westabbau, Ostgalerie und tiefer Mine. 48 Punkte und der eingeschlossene Käfer öffnen den Ausgang.

Geprüfter Durchlauf: 257 Takte / 25.7 Sekunden, 49 Kristallpunkte, 54 Wertungspunkte. Replay: public/replays/16.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X################################################X
X################################################X
X################################.....M...D....R#X
X##########################E#####M....#...#..M..#X
X##########################.######......M....#..#X
X################################.......#.......#X
X##########################.#####M.##########...#X
X##########·###############.######.M........M...#X
X##########################.#####..#.M......#...#X
X##P.......···<·....D.D.D............#..M......M#X
X##.#######################.#####...##########.##X
X##.#######################.#####M...........D..#X
X##.#######################.######...........#..#X
X##.#######################.#####....M......M..M#X
X##.#######################.#####....#......#..##X
X#R.....D....M......#######.##################.##X
X#..M...#....#.....M#######.##################.##X
X#..#..............########.##################.##X
X#.........M........#######.##################.##X
X#..#############..M#######.##################.##X
X#....M..........M.######........D.....M........#X
X#....#..........#..#####...M....#.....#.......M#X
X#.............M....#####M..#.......M..........##X
X#M........M...#....######.....M....#.......M...#X
X##.D#############.M...........#..........M.#...#X
X#..#..............######M..D.......M.....#....M#X
X#..................######..#.......#..........##X
X#M...M........M....#####M.....M..........M.....#X
X##...#........#....######.....#..........#.....#X
X################################################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

```json
{
  "gates": [
    {
      "id": "A",
      "x": 11,
      "y": 9,
      "open": false,
      "label": "A"
    },
    {
      "id": "B",
      "x": 27,
      "y": 6,
      "open": true,
      "label": "B"
    }
  ],
  "levers": [
    {
      "id": "AB",
      "x": 9,
      "y": 9,
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
harvest 2 16 18 14
walk 9 10
use up
until 11 8 crawler
use up
walk 27 10
harvest 33 3 15 13
walk 27 4
```

## 17 – Der Rückweg

Erst Platz schaffen. 52 × 34 Felder, Quote 56, 900 Sekunden, Schwierigkeit 3/3.

Westabbau sammeln. Ablage vorbereiten, Fels kontrolliert fallen lassen, oberen Diamanten holen und Fels zur Seite schieben. Ost- und Tiefabbau durchsuchen. Erst dann den letzten Hebel schalten und über die obere Verbindung zum Ausgang zurückkehren.

Hinweis: Plane den Rückweg, bevor du tief in die Mine gehst. Lege erst die Felsablage frei und hole den oberen Diamanten. Drei große Abbaugebiete bieten 72 Punkte; du brauchst 56. Der letzte Hebel schließt den unteren Hinweg und öffnet die obere Rückverbindung.

Geprüfter Durchlauf: 479 Takte / 47.9 Sekunden, 72 Kristallpunkte, 72 Wertungspunkte. Replay: public/replays/17.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X##################################################X
X##################################################X
X###########D###############........M....D.......R#X
X###########.###############M.......#....#....M...#X
X##E########.################..........M......#...#X
X##.########R###############...........#..........#X
X##.#######..###############M.#################...#X
X##.........·..#.....########..M............M.....#X
X##.#######.·#######.#######...#.M..........#.....#X
X##.#######.·#######.#######.....#.....M.........M#X
X##.#######.·#######.#######...#################.##X
X##P.....#........D...D.....M.................D...#X
X##.#########·###############.................#...#X
X##.########################D....M..........M....M#X
X##.#########################....#..........#....##X
X##.###########################################.###X
X##.###########################################.###X
X#R.....D....M......###########################.###X
X#..M...#....#.....M###########################.###X
X#..#..............############################.###X
X#.........M........#######R.......D.....M........#X
X#..#############..M#######...M....#.....#.......M#X
X#....M..........M.########...#.......M..........##X
X#....#..........#..#######..##################..M#X
X#.............M....#######......M............M..##X
X#M........M...#....#######......#..........M.#...#X
X##.D#############.M.......M..........M.....#.....#X
X#..#..............#########..D#################.M#X
X#..................#######...#..................##X
X#M...M........M....#######M.....M..........M.....#X
X##...#........#....########.....#..........#.....#X
X##################################################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

```json
{
  "gates": [
    {
      "id": "A",
      "x": 9,
      "y": 12,
      "open": true,
      "label": "A"
    },
    {
      "id": "B",
      "x": 15,
      "y": 8,
      "open": false,
      "label": "B"
    }
  ],
  "levers": [
    {
      "id": "AB",
      "x": 22,
      "y": 11,
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
harvest 2 18 18 14
walk 12 12
snap right
walk 11 12
walk 11 7
snap right
wait 7
walk 12 7
walk 12 3
walk 12 7
walk 11 7
walk 11 12
move right
wait 2
harvest 28 3 22 13
harvest 27 21 23 11
walk 22 12
use up
walk 20 12
walk 20 8
walk 3 8
walk 3 5
```

## 18 – Der lange oder der kurze Weg

Zeit, Punkte oder Sicherheit. 56 × 34 Felder, Quote 60, 900 Sekunden, Schwierigkeit 2/3.

Für die sichere Runde den unteren Bogen nutzen und seine Diamanten sammeln. Hohe Ostgalerie, tiefe Mine und optional Westabbau durchsuchen. Zum Ausgang an der Ostverbindung gehen. Schneller: Lila umlenken, durch die Mitte und nur Ostgalerie sowie Tiefabbau sammeln.

Hinweis: Wähle eine Kombination aus Sammelgebieten und Verbindungen. Der mittlere Weg ist kurz, aber Lila bewacht ihn; A lenkt ihn kurz um. Der untere Bogen ist sicher. 60 Punkte genügen, du musst nicht jede Lagerstätte leeren. Zeit zählt vor Punkten.

Geprüfter Durchlauf: 510 Takte / 51.0 Sekunden, 92 Kristallpunkte, 92 Wertungspunkte. Replay: public/replays/18.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X######################################################X
X#################################.......M....M......R#X
X##P.....###############..........M......#....#....M..#X
X##.####.###############.##.#######................#..#X
X##.####.###############.##.######..........M.........#X
X##.####.########·######.##.######M.###############..D#X
X##.####.###############.##.#######.M...........M....##X
X##.####...D..··r···.D.D.##.######..#...........#.....#X
X##.#######################.######.....M......D.......#X
X##.....###################.######.....#....M.#......M#X
X######.###################.######M..##############M.##X
X######.###################.#######................#..#X
X##.....###################.######.......D............#X
X##.#######################.######D....M.#......M....M#X
X##.#######################.#######....#........#....##X
X##.....D...####....D...D......####################..##X
X##.#######.####.#############.####################..##X
X##.#######.####.#############.####################..##X
X##.#######...D..#############.####################..E#X
X##.##########################.####################.###X
X##.##########################.####################.###X
X##.##########################.####################.###X
X#........D....M........######.........D....M.........#X
X#...M....#....#.......M######...M.....#....#........M#X
X#MD.#.......M.........#######MD.#........M..........##X
X###...M.....#......M...########....M.....#.......M...#X
X#.....#..........M.#...######......#..........M..#...#X
X#M..D.......M....#....M######M..D........M....#.....M#X
X##..#.......#.........########..#........#..........##X
X#M....M..........M....D######M.....M..........M.....D#X
X##....#..........#....########.....#..........#.....##X
X######################################################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

```json
{
  "gates": [
    {
      "id": "A",
      "x": 17,
      "y": 7,
      "open": false,
      "label": "A"
    }
  ],
  "levers": [
    {
      "id": "A-lever",
      "x": 12,
      "y": 7,
      "gates": [
        "A"
      ],
      "dispensers": [],
      "label": "A"
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 3 10
walk 7 10
walk 7 13
walk 3 13
walk 3 16
walk 11 16
walk 11 19
walk 16 19
walk 16 16
walk 20 16
walk 27 16
walk 27 3
harvest 34 2 20 14
harvest 30 23 24 9
harvest 2 23 22 9
walk 53 19
```

## 19 – Das richtige Treffen

Erst verbinden, dann auslösen. 56 × 36 Felder, Quote 72, 900 Sekunden, Schwierigkeit 3/3.

Westabbau sammeln. A schalten, mit S den Kristallkäfer treffen und seinen Diamanten holen. Mittleren und östlichen Abbau durchsuchen. Danach zum Ausgang am alten Kontrollgang zurückkehren. Alternativ den tiefen Ostabbau statt Westen nutzen.

Hinweis: Das Treffen und der Abwurf öffnen nur einen Teil der Aufgabe. Sammle 72 Punkte in den vier Lagerstätten und triff den Kristallkäfer. Die Reihenfolge der Abbaugebiete ist frei; der Ostabbau ist besonders reich. A verbindet, S dosiert. Die Apparatur bleibt vom Bedienplatz sichtbar.

Geprüfter Durchlauf: 540 Takte / 54.0 Sekunden, 80 Kristallpunkte, 90 Wertungspunkte. Replay: public/replays/19.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X######################################################X
X######################################################X
X###################################R.....D....M......#X
X#######..............................M...#....#.....M#X
X#######.#########.#################..#..............##X
X#######.#####·###.#################.........M........#X
X#.P.M.M....##·###.#################D.#############..M#X
X##.##########·###.##################...M..........M.##X
X##.#########>#l·#.#################....#..........#..#X
X##.##########·.....E.....##########.............M....#X
X##.#####################.##########M........M...#....#X
X##.#####################.###########.D#############.M#X
X##.#####################.##########..#..............##X
X##.#####################.##########..................#X
X#R..D..M..R#############.##########M...M........M...D#X
X#...#..#...####R.....M...D.....R####...#............##X
X#.M.......M####......#...#......################.#####X
X#.#.......#####M.............M..################.#####X
X#.....M....#####.............#..################.#####X
X#.....#....####........M........################.#####X
X#.........M####M.......#........################.#####X
X#.........######.############...###......M....D.....R#X
X#..M.....M.####..M.........M....###M.....#....#...M..#X
X#..#....M#.####..#.........#....####........M.....#..#X
X#.......#..####....M............###M........#........#X
X#M....M....####....#............####.M##########M#...#X
X##....#....####........M.......M.....#..........#....#X
X#.D.......M####M..###########D.####....M.............#X
X#.#.......######.............#..###....#....M.......M#X
X#..........####.................###M..############D.##X
X#..........####.................####..............#..#X
X#M.M....M..####D...M.......M...M###D...M........M...M#X
X##.#....#..#####...#.......#...#####...#........#...##X
X######################################################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

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
harvest 2 15 10 19
walk 10 7
use up
walk 11 7
until 14 8 crystal-crawler
use up
wait 7
walk 8 7
walk 8 4
walk 18 4
walk 18 9
walk 17 10
walk 14 10
harvest 16 16 17 18
harvest 36 3 18 14
walk 20 10
```

## 20 – Das alte Förderwerk

Alles greift ineinander. 64 × 40 Felder, Quote 84, 1200 Sekunden, Schwierigkeit 3/3.

Südabbau sammeln, Schiebestein lösen und A öffnen. Mittlere Lagerstätte ausräumen. B führt die Käfer zusammen, S trifft den Kristallkäfer. Tiefen Ostabbau besuchen, Fusionsdiamant holen und A/C schalten. Oben Lila umlenken, hohen Ostabbau sammeln und zum Ausgang zurückkehren.

Hinweis: Fünf Fundgebiete umgeben das Förderwerk. Suche dir eine Runde für 84 Punkte; nicht jede Lagerstätte ist nötig. Fusion und Abwurf gehören zur Aufgabe. Bereite Schiebestein und Rückweg vor. Jede Apparatur bleibt am Hebel vollständig sichtbar.

Geprüfter Durchlauf: 649 Takte / 64.9 Sekunden, 103 Kristallpunkte, 113 Wertungspunkte. Replay: public/replays/20.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X##############################################################X
X#R.....####################################R.....D....M.....R#X
X#.M...M#############################·##E###......#....#......#X
X#.#...#################################.###..M..............M#X
X#...M..##########################.D·l··D.....#..............##X
X#...#.D##########################.#########.........M........#X
X#.....#####################################.........#.......M#X
X#.M..M.######################·###.#########..#############..##X
X#.#..#.##############.......#·###.#########....M..........M..#X
X#......##..D.D.D....#.......#·###.#########....#..........#..#X
X#M..M..##.############.####.>#l·#.#########.............M....#X
X##..#.M##.############.####.#·....#########.............#....#X
X#.....###.###...........###.#####.#########M........M........#X
X#......##.###.M...M....M###........#########.D#############.M#X
X#DM..M.##.###D#...#....###########.########..#..............##X
X###....##.####..M.....M.##########.########..................#X
X#####.###.###M..#.M...#.##########.########..................#X
X#####.##.R.###....#....M##########.########M...M........M...D#X
X#####.##.#.##D..M....M.###########.#########...#........#...##X
X#####.##...###..#....#..##########.###########################X
X#####.##.#.#######################.###########################X
X##P............###################.###########################X
X##############.###################.###########################X
X##############.###################.##.........M....D........R#X
X##############.###################.##M........#....#.....M...#X
X##.........M.....D........R#######.###...................#...#X
X##M........#.....#.....M...#######...............M...........#X
X###...........M........#...##########M...........#...........#X
X##............#............###########.###################...#X
X##M.####################...##########...M.............M......#X
X###..M..............M......##########...#..M..........#......#X
X##...#..M...........#......##########......#.................#X
X##......#.....M...........M##########............M..........M#X
X##...####################.###########M..#################D#.##X
X##M....................D...###########...................#...#X
X###....................#...##########........................#X
X##D.....M...........M.....M##########D.....M..........M.....M#X
X###.....#...........#.....############.....#..........#.....##X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

```json
{
  "gates": [
    {
      "id": "A",
      "x": 21,
      "y": 10,
      "open": false,
      "label": "A"
    },
    {
      "id": "B",
      "x": 30,
      "y": 11,
      "open": false,
      "label": "B"
    },
    {
      "id": "C",
      "x": 34,
      "y": 7,
      "open": false,
      "label": "C"
    },
    {
      "id": "D",
      "x": 37,
      "y": 4,
      "open": false,
      "label": "D"
    }
  ],
  "levers": [
    {
      "id": "A-lever",
      "x": 18,
      "y": 9,
      "gates": [
        "A"
      ],
      "dispensers": [],
      "label": "A"
    },
    {
      "id": "B-lever",
      "x": 26,
      "y": 8,
      "gates": [
        "B"
      ],
      "dispensers": [],
      "label": "B",
      "view": {
        "x": 25,
        "y": 7,
        "width": 9,
        "height": 7
      }
    },
    {
      "id": "S-lever",
      "x": 27,
      "y": 8,
      "gates": [],
      "dispensers": [
        "S"
      ],
      "label": "S",
      "view": {
        "x": 25,
        "y": 7,
        "width": 9,
        "height": 7
      }
    },
    {
      "id": "AC",
      "x": 32,
      "y": 13,
      "gates": [
        "A",
        "C"
      ],
      "dispensers": [],
      "label": "A/C"
    },
    {
      "id": "D-lever",
      "x": 34,
      "y": 4,
      "gates": [
        "D"
      ],
      "dispensers": [],
      "label": "D"
    }
  ],
  "dispensers": [
    {
      "id": "S",
      "x": 30,
      "y": 7,
      "stock": 3,
      "label": "S"
    }
  ]
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
harvest 3 26 25 13
walk 11 22
walk 11 19
snap up
walk 11 20
walk 9 20
walk 9 18
move right
walk 10 10
walk 18 10
use up
walk 22 10
harvest 14 13 11 8
walk 22 9
walk 26 9
use up
walk 27 9
until 30 10 crystal-crawler
use up
wait 7
walk 28 9
walk 28 14
walk 34 14
harvest 38 24 24 15
walk 34 14
walk 34 12
walk 30 12
walk 32 12
use down
walk 34 12
walk 34 5
use up
until 37 3 purple-crawler
walk 40 5
harvest 44 2 18 18
walk 40 3
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
wait 16
snap right
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

Replay: public/replays/18-shortcut.json. 59 Takte und 9 Kristallpunkte, gegenüber 64 Takten und 12 Kristallpunkten auf dem sicheren Weg.

```text
walk 8 3
walk 8 8
walk 12 8
use up
until 17 6 purple-crawler
walk 24 8
walk 24 3
walk 27 3
harvest 34 2 20 14
harvest 30 23 24 9
walk 53 19
```
