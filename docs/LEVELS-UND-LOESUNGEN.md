# Die zehn Höhlen – Entwurf und Lösungen

Alle Lösungen wurden im Normalspiel mit aktiven Gegnern, Schwerkraft und Countdown ausgeführt und als Replay erneut geprüft. Ein Lösungsreplay beweist Lösbarkeit; es ersetzt kein menschliches Urteil über Spielspaß.

Legende: X Außenwand, # Mauer, . Erde, Leerzeichen Gang, P Spieler, E Ausgang, R Fels, M Smaragd, D Diamant, >/< /^/v Krabbler mit Startausrichtung.

## 01 – Die erste Schicht

Ein Licht im Dunkeln. 18 × 12 Felder, Quote 8, 180 Sekunden, Schwierigkeit 1/3.

Den ersten Smaragd nebenan aufnehmen. Die westliche Kammer absuchen, durch den unteren Durchgang wechseln und den Diamanten holen. Dann zum Ausgang im Nordosten.

Hinweis: Leertaste + Richtung sammelt nebenan, ohne dass du dich bewegst. Smaragde zählen 1, Diamanten 3. Du kannst auch nach oben graben.

Geprüfter Durchlauf: 36 Takte / 3.6 Sekunden, 8 Punkte. Replay: public/replays/01.json.

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

Geprüfter Durchlauf: 28 Takte / 2.8 Sekunden, 10 Punkte. Replay: public/replays/02.json.

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

Geprüfter Durchlauf: 31 Takte / 3.1 Sekunden, 12 Punkte. Replay: public/replays/03.json.

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

Geprüfter Durchlauf: 42 Takte / 4.2 Sekunden, 15 Punkte. Replay: public/replays/04.json.

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

Geprüfter Durchlauf: 46 Takte / 4.6 Sekunden, 12 Punkte. Replay: public/replays/05.json.

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

## 06 – Das Herz der alten Mine

Alles, was du gelernt hast. 36 × 24 Felder, Quote 24, 420 Sekunden, Schwierigkeit 3/3.

Die rechte Nische freiräumen, von links schieben, die obere Galerie von links nach rechts absuchen. Den zweiten Felsen seitlich untergraben, die restlichen Diamanten sammeln und am Krabbler vorbei zum Ausgang steigen.

Hinweis: Unten zuerst den Abstellplatz rechts freiräumen. Oben den Fels in seinen Schacht schicken. Im letzten Aufstieg den Krabbler beobachten: Du bewegst dich schneller als er.

Geprüfter Durchlauf: 64 Takte / 6.4 Sekunden, 24 Punkte. Replay: public/replays/06.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X##################################X
X##################################X
X##...R..###....R..##########...E##X
X##......###.......##########.·####X
X##..##..###.......#####>····.···##X
X##..##..###.......##########.·####X
X##......###.......##########.·####X
X##......###.......##########.·####X
X############################.·####X
X############################.·####X
X#############################·####X
X##########.D.D.D...RD.D.D.D.D.####X
X##########.#######·.########.#####X
X##########.########·########.#####X
X##########.########·########.#####X
X#########.R.#######·##...R......##X
X#########.#.#######·##..........##X
X#.P..........######·##..###.....##X
X#.......###########·##..###.....##X
X#.......###########·##..........##X
X#.......###########·##..........##X
X##################################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 12 18
walk 12 17
snap up
walk 12 18
walk 10 18
walk 10 16
move right
walk 11 12
walk 12 12
walk 14 12
walk 16 12
walk 19 12
walk 19 13
snap right
wait 10
walk 19 12
walk 21 12
walk 23 12
walk 25 12
walk 27 12
walk 29 12
walk 30 12
walk 30 3
walk 32 3
```

## 07 – Zwei Schächte

Die Reihenfolge zählt. 26 × 18 Felder, Quote 9, 300 Sekunden, Schwierigkeit 2/3.

Die erste Stütze von links entfernen, warten und die beiden mittleren Diamanten sammeln. An der zweiten Nische genauso vorgehen und den letzten Diamanten vor dem Ausgang holen.

Hinweis: Öffne jeden Schacht von seiner linken Nische aus. Warte, bis der Stein unter dem Gang verschwunden ist. Dann erst weitergehen.

Geprüfter Durchlauf: 46 Takte / 4.6 Sekunden, 9 Punkte. Replay: public/replays/07.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXX
X########################X
X########################X
X########################X
X########################X
X#P.......R.D.D...R.D.E##X
X##.####··.#####··.######X
X##.######·#######·######X
X##.######·#######·######X
X#.....###·#######·######X
X#.....###·#######·######X
X#.....###·#######·######X
X#...M.###·#######·######X
X#.....###·#######·######X
X#.....###·#######·######X
X########################X
X########################X
XXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 8 5
walk 8 6
walk 9 6
snap right
wait 10
walk 9 5
walk 12 5
walk 14 5
walk 16 5
walk 16 6
walk 17 6
snap right
wait 10
walk 17 5
walk 20 5
walk 22 5
```

## 08 – Der lange Bogen

Es gibt mehr als einen Weg. 30 × 20 Felder, Quote 12, 360 Sekunden, Schwierigkeit 2/3.

Links nach unten graben, die vier Diamanten entlang der unteren Galerie einsammeln und rechts zum Ausgang aufsteigen. Die Kammer in der Mitte ist optional.

Hinweis: Vier Diamanten reichen. Die untere Galerie bietet einen sicheren Rundweg. Die mittlere Kammer enthält zusätzliche Kristalle; du musst nicht jeden Schatz mitnehmen.

Geprüfter Durchlauf: 46 Takte / 4.6 Sekunden, 12 Punkte. Replay: public/replays/08.json.

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

## 09 – Über dem Abgrund

Ein Schritt zur Seite. 32 × 22 Felder, Quote 15, 360 Sekunden, Schwierigkeit 3/3.

Von (11,15) das Seitenfeld rechts freigraben. Der obere Stapelstein rollt nach links und fällt. Die fünf Diamanten sammeln und im Osten nach oben steigen.

Hinweis: Der obere Fels braucht links ein freies Seitenfeld. Darunter wartet schon der Schacht. Grabe nebenan, warte den Fall ab und gehe dann durch die Galerie.

Geprüfter Durchlauf: 50 Takte / 5.0 Sekunden, 15 Punkte. Replay: public/replays/09.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X##############################X
X##############################X
X##############################X
X#.......###########E......####X
X#......R#################.####X
X#..M....#################.####X
X#.......#################.####X
X#.......#################.####X
X####.####################.####X
X####.####################.####X
X####.####################.####X
X####.####################.####X
X####.####################.####X
X####.####################.####X
X#P..........R..D.D.D.D.D..####X
X###########·R#################X
X###########·##################X
X###########·##################X
X###########·##################X
X##############################X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

In der Karte steht · für einen leeren Gang.

Lösungsskript (Koordinaten ab 0 einschließlich Außenwand):

```text
walk 11 15
snap right
wait 8
walk 16 15
walk 18 15
walk 20 15
walk 22 15
walk 24 15
walk 26 15
walk 26 4
walk 20 4
```

## 10 – Ein Tor nach Lathmar

Am Ende der alten Mine. 40 × 26 Felder, Quote 30, 480 Sekunden, Schwierigkeit 3/3.

Rechte Nische freigraben, von links schieben und in die Galerie steigen. Den zweiten Stein seitlich untergraben, alle zehn Galeriediamanten sammeln und am Krabbler vorbei durch den Ostschacht zum Tor.

Hinweis: Schaffe rechts vom unteren Fels Platz. In der Galerie öffnest du den Fallschacht von der Seite. Zehn Diamanten genügen. Beobachte den Krabbler im letzten Aufstieg.

Geprüfter Durchlauf: 73 Takte / 7.3 Sekunden, 30 Punkte. Replay: public/replays/10.json.

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X######################################X
X######################################X
X################################....E#X
X#......#########################.·####X
X#....R.####################>····.···##X
X#......#########################.·####X
X#......#########################.·####X
X#......#########################.·####X
X#......#########################.·####X
X###.############################.·####X
X###.#############################·####X
X###.######.D.D.D...RD.D.D.D.D.D.D.####X
X###.######.#######·.#########.########X
X###.######.########·#########.########X
X###.######.########·#########.########X
X###.######.########·#########.########X
X###.######.########·###...........####X
X###.#####.R.#######·###..M........####X
X###.#####.#.#######·###...........####X
X#.P..........######·###...........####X
X###################·###....M......####X
X###################·###...........####X
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
walk 19 12
walk 19 13
snap right
wait 12
walk 19 12
walk 21 12
walk 23 12
walk 25 12
walk 27 12
walk 29 12
walk 31 12
walk 33 12
walk 34 12
walk 34 3
walk 37 3
```
