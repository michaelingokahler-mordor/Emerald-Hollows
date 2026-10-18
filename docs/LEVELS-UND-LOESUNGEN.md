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

Ein Hebel, ein neuer Weg. 30 × 20 Felder, Quote 9, 420 Sekunden, Schwierigkeit 2/3.

Halte Graben und drücke zum Hebel A. Lass die Tasten vor dem nächsten Schalten los. Hinter dem Tor: erst die rechte Felsablage von unten freigraben, dann den Stein von links schieben.

Hinweis: Halte Graben und drücke zum Hebel A. Lass die Tasten vor dem nächsten Schalten los. Hinter dem Tor: erst die rechte Felsablage von unten freigraben, dann den Stein von links schieben.

Geprüfter Durchlauf: 36 Takte / 3.6 Sekunden, 9 Kristallpunkte, 9 Wertungspunkte. Replay: public/replays/11.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X############################X
X############################X
X###############..D..D..DE###X
X###############.############X
X###############.############X
X##############.R.###########X
X##############.#.###########X
X#.P.....#.............######X
X############################X
X############################X
X############################X
X############################X
X############################X
X############################X
X############################X
X############################X
X############################X
X############################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
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
    }
  ],
  "levers": [
    {
      "id": "A-lever",
      "x": 5,
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
walk 25 3
```

## 12 – Die zweite Runde

Rechts herum, links herum. 36 × 22 Felder, Quote 9, 420 Sekunden, Schwierigkeit 2/3.

Blau biegt bevorzugt rechts ab, Lila links. Öffne A: Blau nimmt auf dem Rückweg die obere Schleife. Öffne B: Lila nimmt die untere Schleife. Nutze jeweils den Umweg zum Durchqueren; die Käfer bleiben frei.

Hinweis: Blau biegt bevorzugt rechts ab, Lila links. Öffne A: Blau nimmt auf dem Rückweg die obere Schleife. Öffne B: Lila nimmt die untere Schleife. Nutze jeweils den Umweg zum Durchqueren; die Käfer bleiben frei.

Geprüfter Durchlauf: 56 Takte / 5.6 Sekunden, 9 Kristallpunkte, 9 Wertungspunkte. Replay: public/replays/12.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X##################################X
X##################################X
X##################################X
X##################################X
X#################################EX
X#################################.X
X##########··#####################.X
X##########··#####################.X
X#################################.X
X#.P.......···<·........···l·.D.D.DX
X##################################X
X#######################··#########X
X#######################··#########X
X##################################X
X##################################X
X##################################X
X##################################X
X##################################X
X##################################X
X##################################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
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
      "x": 24,
      "y": 11,
      "open": false,
      "label": "B"
    }
  ],
  "levers": [
    {
      "id": "A-lever",
      "x": 9,
      "y": 9,
      "gates": [
        "A"
      ],
      "dispensers": [],
      "label": "A"
    },
    {
      "id": "B-lever",
      "x": 22,
      "y": 9,
      "gates": [
        "B"
      ],
      "dispensers": [],
      "label": "B"
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 9 10
use up
until 11 8 crawler
walk 22 10
use up
until 24 12 purple-crawler
walk 34 10
walk 34 5
```

## 13 – Ein kostbares Treffen

Aus zwei Käfern wird einer. 32 × 22 Felder, Quote 5, 420 Sekunden, Schwierigkeit 3/3.

Öffne A und beobachte das Treffen: Berühren sich Blau und Lila seitlich, entsteht auf dem blauen Feld ein Kristallkäfer. Grabe die Stütze des Felsens weg, wenn er in den Schacht steigt. Sein Diamant ist für die Quote nötig.

Hinweis: Öffne A und beobachte das Treffen: Berühren sich Blau und Lila seitlich, entsteht auf dem blauen Feld ein Kristallkäfer. Grabe die Stütze des Felsens weg, wenn er in den Schacht steigt. Sein Diamant ist für die Quote nötig.

Geprüfter Durchlauf: 114 Takte / 11.4 Sekunden, 5 Kristallpunkte, 15 Wertungspunkte. Replay: public/replays/13.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X##############################X
X##############################X
X##############################X
X#####...............##########X
X#####.#############.##########X
X#####.#######R#####.##########X
X#.P.M..M......#####.##########X
X#############·#####.##########X
X#############·#####.##########X
X###########>·#l·...E##########X
X##############################X
X##############################X
X##############################X
X##############################X
X##############################X
X##############################X
X##############################X
X##############################X
X##############################X
X##############################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

```json
{
  "gates": [
    {
      "id": "A",
      "x": 14,
      "y": 10,
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
      "label": "A"
    }
  ],
  "dispensers": []
}
```


Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 10 7
use up
walk 13 7
until 14 9 crystal-crawler
snap right
wait 8
walk 6 7
walk 6 4
walk 20 4
walk 20 9
walk 19 10
walk 14 10
walk 20 10
```

## 14 – Wechselverkehr

Zwei Tore, zwei Zustände. 32 × 22 Felder, Quote 6, 420 Sekunden, Schwierigkeit 2/3.

Der Hebel öffnet A und schließt B – und umgekehrt. Hole zuerst die Diamanten hinter A. Kehre dann zum Hebel zurück und öffne B für den Ausgang. Ein belegtes Tor verhindert die gesamte Schaltung.

Hinweis: Der Hebel öffnet A und schließt B – und umgekehrt. Hole zuerst die Diamanten hinter A. Kehre dann zum Hebel zurück und öffne B für den Ausgang. Ein belegtes Tor verhindert die gesamte Schaltung.

Geprüfter Durchlauf: 56 Takte / 5.6 Sekunden, 6 Kristallpunkte, 6 Wertungspunkte. Replay: public/replays/14.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X##############################X
X##############################X
X###########E##################X
X###########.##################X
X##############################X
X#########...##################X
X#########.####################X
X#########.####################X
X#########.####################X
X##P...........#.........######X
X################........######X
X################........######X
X################........######X
X################........######X
X################...D..D.######X
X##############################X
X##############################X
X##############################X
X##############################X
X##############################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

```json
{
  "gates": [
    {
      "id": "A",
      "x": 15,
      "y": 10,
      "open": false,
      "label": "A"
    },
    {
      "id": "B",
      "x": 12,
      "y": 5,
      "open": true,
      "label": "B"
    }
  ],
  "levers": [
    {
      "id": "AB",
      "x": 12,
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
walk 12 10
use up
walk 20 15
walk 23 15
walk 12 10
use up
walk 10 6
walk 12 6
walk 12 3
```

## 15 – Stein für Stein

Ein Zug, ein Stein. 26 × 20 Felder, Quote 4, 420 Sekunden, Schwierigkeit 2/3.

Der Vorrat S gibt pro neuem Hebelzug einen Stein frei. Halten wiederholt nicht. Warte, bis der Kristallkäfer unten auf dem Fallschachtfeld steht, und löse aus. Bei einem Fehlwurf kannst du erneut versuchen, solange der Schacht frei und Vorrat übrig ist.

Hinweis: Der Vorrat S gibt pro neuem Hebelzug einen Stein frei. Halten wiederholt nicht. Warte, bis der Kristallkäfer unten auf dem Fallschachtfeld steht, und löse aus. Bei einem Fehlwurf kannst du erneut versuchen, solange der Schacht frei und Vorrat übrig ist.

Geprüfter Durchlauf: 43 Takte / 4.3 Sekunden, 4 Kristallpunkte, 14 Wertungspunkte. Replay: public/replays/15.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXX
X########################X
X########################X
X########################X
X########################X
X########################X
X#####.........##########X
X#####.#######.##########X
X#####.###·###.##########X
X#.P.M...#·###.##########X
X#########···C.##########X
X#########·...E##########X
X########################X
X########################X
X########################X
X########################X
X########################X
X########################X
X########################X
XXXXXXXXXXXXXXXXXXXXXXXXXX
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
```

## 16 – Der Besucher

Diesmal bleibt er hier. 32 × 22 Felder, Quote 9, 420 Sekunden, Schwierigkeit 2/3.

Öffne die obere Seitenkammer mit A. Sobald Blau ganz oben ist, schalte erneut: Er bleibt lebend eingeschlossen, und Tor B zum Ausgang öffnet wieder. Anders als in Höhle 12 ist der Gang danach dauerhaft sicher.

Hinweis: Öffne die obere Seitenkammer mit A. Sobald Blau ganz oben ist, schalte erneut: Er bleibt lebend eingeschlossen, und Tor B zum Ausgang öffnet wieder. Anders als in Höhle 12 ist der Gang danach dauerhaft sicher.

Geprüfter Durchlauf: 41 Takte / 4.1 Sekunden, 9 Kristallpunkte, 14 Wertungspunkte. Replay: public/replays/16.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X##############################X
X##############################X
X##############################X
X##########################E###X
X##########################.###X
X##############################X
X##########################.###X
X##########·###############.###X
X##########################.###X
X##P.......···<·....D.D.D...###X
X##############################X
X##############################X
X##############################X
X##############################X
X##############################X
X##############################X
X##############################X
X##############################X
X##############################X
X##############################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
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
walk 9 10
use up
until 11 8 crawler
use up
walk 27 10
walk 27 4
```

## 17 – Der Rückweg

Erst Platz schaffen. 34 × 24 Felder, Quote 9, 420 Sekunden, Schwierigkeit 3/3.

Grabe zuerst die Ablage rechts neben dem unteren Fallschacht frei. Lass dann den Felsen kontrolliert fallen und hole den oberen Diamanten. Schiebe den gelandeten Felsen in die Ablage. Der letzte Hebel schließt den Hinweg, öffnet aber die obere Rückverbindung.

Hinweis: Grabe zuerst die Ablage rechts neben dem unteren Fallschacht frei. Lass dann den Felsen kontrolliert fallen und hole den oberen Diamanten. Schiebe den gelandeten Felsen in die Ablage. Der letzte Hebel schließt den Hinweg, öffnet aber die obere Rückverbindung.

Geprüfter Durchlauf: 80 Takte / 8.0 Sekunden, 9 Kristallpunkte, 9 Wertungspunkte. Replay: public/replays/17.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X################################X
X################################X
X###########D####################X
X###########.####################X
X##E########.####################X
X##.########R####################X
X##.#######..####################X
X##.........·..#.....############X
X##.#######.·#######.############X
X##.#######.·#######.############X
X##.#######.·#######.############X
X##P.....#........D...D.#########X
X############·###################X
X################################X
X################################X
X################################X
X################################X
X################################X
X################################X
X################################X
X################################X
X################################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
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
walk 22 12
use up
walk 20 12
walk 20 8
walk 3 8
walk 3 5
```

## 18 – Der lange oder der kurze Weg

Zeit, Punkte oder Sicherheit. 32 × 22 Felder, Quote 9, 420 Sekunden, Schwierigkeit 2/3.

Unten liegen vier sichere Diamanten; drei reichen. Der mittlere Weg ist kürzer, aber Lila bewacht ihn. Mit Hebel A lenkst du den Käfer in die obere Nische. Die Rangliste wertet zuerst Zeit, dann Punkte bei Gleichstand.

Hinweis: Unten liegen vier sichere Diamanten; drei reichen. Der mittlere Weg ist kürzer, aber Lila bewacht ihn. Mit Hebel A lenkst du den Käfer in die obere Nische. Die Rangliste wertet zuerst Zeit, dann Punkte bei Gleichstand.

Geprüfter Durchlauf: 64 Takte / 6.4 Sekunden, 12 Kristallpunkte, 12 Wertungspunkte. Replay: public/replays/18.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X##############################X
X##############################X
X##P.....###############...E###X
X##.####.###############.##.###X
X##.####.###############.##.###X
X##.####.########·######.##.###X
X##.####.###############.##.###X
X##.####...D..··r···.D.D.##.###X
X##.#######################.###X
X##.....###################.###X
X######.###################.###X
X######.###################.###X
X##.....###################.###X
X##.#######################.###X
X##.#######################.###X
X##.....D...####....D...D...###X
X##########.####.##############X
X##########.####.##############X
X##########...D..##############X
X##############################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
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
```

## 19 – Das richtige Treffen

Erst verbinden, dann auslösen. 30 × 20 Felder, Quote 5, 420 Sekunden, Schwierigkeit 3/3.

Öffne A, um Blau und Lila zusammenzuführen. Wechsle dann zum Hebel S. Löse einen Stein aus, sobald der Kristallkäfer in den Schacht steigt und noch zwei Felder unter der Ausgabe steht. Alle Teile der Apparatur bleiben vom Bedienplatz sichtbar.

Hinweis: Öffne A, um Blau und Lila zusammenzuführen. Wechsle dann zum Hebel S. Löse einen Stein aus, sobald der Kristallkäfer in den Schacht steigt und noch zwei Felder unter der Ausgabe steht. Alle Teile der Apparatur bleiben vom Bedienplatz sichtbar.

Geprüfter Durchlauf: 71 Takte / 7.1 Sekunden, 5 Kristallpunkte, 15 Wertungspunkte. Replay: public/replays/19.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X############################X
X############################X
X############################X
X#######...........##########X
X#######.#########.##########X
X#######.#####·###.##########X
X#.P.M.M....##·###.##########X
X#############·###.##########X
X############>#l·#.##########X
X#############·.....E########X
X############################X
X############################X
X############################X
X############################X
X############################X
X############################X
X############################X
X############################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
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
walk 20 10
```

## 20 – Das alte Förderwerk

Alles greift ineinander. 44 × 28 Felder, Quote 18, 600 Sekunden, Schwierigkeit 3/3.

Löse zuerst den Schiebestein und öffne A. Führe in der nächsten Kammer die Käfer mit B zusammen; S liefert den Abwurf. Hole den entstandenen Diamanten über den unteren Bogen. A/C öffnet den Aufstieg. Oben lenkt D den letzten lila Käfer um.

Hinweis: Löse zuerst den Schiebestein und öffne A. Führe in der nächsten Kammer die Käfer mit B zusammen; S liefert den Abwurf. Hole den entstandenen Diamanten über den unteren Bogen. A/C öffnet den Aufstieg. Oben lenkt D den letzten lila Käfer um.

Geprüfter Durchlauf: 128 Takte / 12.8 Sekunden, 18 Kristallpunkte, 28 Wertungspunkte. Replay: public/replays/20.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X##########################################X
X##########################################X
X####################################·##E##X
X#######################################.##X
X#################################.D·l··D##X
X#################################.########X
X##########################################X
X#############################·###.########X
X#####################.......#·###.########X
X#########..D.D.D....#.......#·###.########X
X#########.#################.>#l·#.########X
X#########.#################.#·....########X
X#########.#################.#####.########X
X#########.#################.......########X
X#########.################################X
X#########.################################X
X#########.################################X
X########.R.###############################X
X########.#.###############################X
X########...###############################X
X########.#.###############################X
X##P............###########################X
X##########################################X
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
walk 34 12
walk 30 12
walk 32 12
use down
walk 34 12
walk 34 5
use up
until 37 3 purple-crawler
walk 40 5
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
```
