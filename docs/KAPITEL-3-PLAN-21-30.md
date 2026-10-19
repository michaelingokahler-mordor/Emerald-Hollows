# Kapitel 3: Die Torhallen / The Gate Halls

Stand: 18. Oktober 2026. Der folgende freigegebene Entwurf ist in Version 0.9 umgesetzt; tatsächliche Karten, Abweichungen und Messungen stehen in [KAPITEL-3-UMSETZUNG.md](KAPITEL-3-UMSETZUNG.md). Der Text darunter dokumentiert die Planung vor dem Kartenbau. Er ersetzt für die weitere Diskussion den älteren Kapitel-3-Vorschlag in `LEVELS-11-30-ENTWURF.md`. Grundlage sind `LEVELDESIGN-REGELN.md` und die Kartenfassung 0.8.

## Umfang und Zeitbasis

Zehn Hauptlevel, 21–30. Der optionale Abzweig in 25 führt zu den zehn separaten Zwergen-Geheimleveln. Deren Spielzeit zählt nicht zum Umfangsvergleich der Hauptkapitel.

Die zehn dokumentierten Referenzlösungen für 11–20 dauern zusammen **282,5 Sekunden (4:42,5)**. Verwendet werden die jeweils ersten dokumentierten Routen aus `artifacts/distinct-caves-verification.json`: 19,1 / 21,5 / 27,2 / 28,0 / 19,5 / 36,6 / 25,5 / 23,1 / 47,0 / 35,0 Sekunden. Bei Auswahl der schnellsten bisher getesteten Alternative pro Karte sind es **271,0 Sekunden (4:31,0)**. Keine dieser Reihen beweist optimale Lösungen.

Öffentliche Ranglisten, abgerufen am 18. Oktober 2026 um 20:43 MESZ (`artifacts/chapter-three-planning-baseline.json`): Mufti999 hat in 11/12/13 die Zeiten 41,0 / 35,7 / 42,1 Sekunden. Für die revidierten Karten 14–20 gibt es beim Abruf keine Einträge. Die alten Zeiten vor dem Kartenwechsel sind keine belastbare Vergleichsbasis für das jetzige Kapitel.

**Vorläufiges Produktionsbudget für die Referenzlösungen von 21–30: 565 Sekunden (9:25), also das Doppelte.** Die unten stehenden Einzelzeiten sind Entwurfsbudgets, keine Messungen und keine Spielerzeit-Prognosen. Sie dürfen beim Bau umverteilt werden; interessante Entscheidungen gehen vor sekundengenauer Zielerfüllung. Auch schnellere gefundene Alternativen werden gesondert mit den 4:31,0 verglichen.

Das eigentliche menschliche Abnahmeziel bleibt: erfolgreiche, bereits vertraute Durchläufe derselben Person im selben Modus sollen über Kapitel 3 ungefähr doppelt so lange dauern wie über Kapitel 2. Dafür benötigen wir noch vollständige Zeiten auf 0.8. Erstspielzeit, Nachdenken, Pausen und Fehlversuche werden getrennt erfasst. Keine feste Umrechnung von Replay- zu Spielerzeit. Keine verlangsamte Bewegung, künstlichen Wartephasen oder langen leeren Verbindungsgänge zur Erfüllung der Zielzahl.

## Regeln zuerst vermitteln

- **21: Schlüssel und Schlösser.** Ein Schlüssel öffnet genau ein passendes Schloss dauerhaft und wird verbraucht. Kennzeichnung durch Form und Farbe, Bestand sichtbar im HUD. Schlüssel zählen nicht zur Kristallquote. Beide später benötigten Schlüsselfamilien werden hier gefahrlos gezeigt.
- **22: Feste Teleporterpaare.** Gleiche Symbole kennzeichnen zusammengehörige Türen. Nur der Miner wird versetzt; Steine und Käfer benutzen diese Verbindung nicht. Keine automatische Rückreise beim Ankommen. Erst verlassen und erneut betreten löst einen weiteren Transfer aus. Zwei unterschiedlich markierte Paare werden hier bereits verständlich gemacht.
- **23: Belegtes Ziel.** Ein besetztes Ankunftsfeld verhindert die Reise. Der Miner bleibt vor dem Eingang, und die Blockade wird angezeigt. Ein statischer Vorführraum zeigt zunächst einen sammelbaren Kristall als Hindernis; die eigentliche Aufgabe verwendet einen Felsen. Kein unsichtbarer Fernschaden beim Probieren. Nach einer erfolgreichen Reise gelten die normalen Fall- und Gegnerregeln.
- **24–30:** keine weitere Grundmechanik. Wasser, Dynamit und Corruption bleiben späteren Kapiteln vorbehalten. Die vorhandenen Hebel, Tore, Käfer und Fallregeln stehen zur Verfügung, ohne dass jede Karte alle Geräte enthalten muss.

Die neue Planung zieht Teleporter von 26 nach 22–23 vor. So erfüllen die ersten drei Karten die Einführungsrolle. Schlüssel- und Teleporterregeln müssen vor dem Kartenbau im Regelkern und in technischen Prüfkarten präzisiert werden; sie sind noch keine vorhandenen Spielfunktionen.

## Die zehn Entwürfe

### 21 – Der unterbrochene Ring / The Broken Ring

**Entscheidung und Ablauf:** Nach zwei kurzen, sicheren Schlüssel-Schloss-Beispielen öffnet sich eine ringförmige Mine mit drei verschieden angeordneten Erzadern. Ein weiterer Schlüssel liegt abseits der kürzesten Sammelroute. Ihn früh zu holen öffnet eine Querverbindung; zuerst Erz zu sammeln spart zunächst den Abstecher, verursacht später mehr Rückweg. Der Spieler entscheidet, wann sich die neue Verbindung lohnt.

**Sammeln und Folge:** Eine Ader wird seitlich abgebaut, eine entlang einer Schleife, eine auf dem Rückweg. Kein dreimal kopierter Sammelraum. Die geöffnete Tür verändert die spätere Tour, nicht bloß den Zugang zum nächsten Lehrraum.

**Abgrenzung:** Anders als 14 mit mehreren frei wählbaren Bezirken wird hier das Wegenetz während der Sammlung dauerhaft kürzer. Anders als 24 gibt es keinen knappen Schlüsselvorrat mit einer ausschließenden Wahl.

**Erholung und Gegenprüfung:** Frühes oder spätes Holen bleibt lösbar. Keine Schlüssel hinter dem eigenen Schloss. Ohne das Ausgangsschloss zu öffnen darf keine andere Verbindung den Ausgang erreichen. Beide Sammelreihenfolgen benötigen Replays.

**Referenzbudget:** 35 Sekunden. Grober Kartenrahmen: 40 × 28.

### 22 – Jenseits des Spalts / Across the Rift

**Entscheidung und Ablauf:** Ein tiefer, unpassierbarer Spalt trennt zwei asymmetrische Minenhälften. Zwei feste Portalpaare verbinden jeweils andere Positionen an den Ufern. Ein sicherer erster Transfer erklärt die Bedienung. Danach muss man eine Rundreise zusammenstellen: hinüber zu einer hoch gelegenen Ader, über den dortigen Quergang zum anderen Paar und auf der Ausgangsseite wieder ankommen.

**Sammeln und Folge:** Erz liegt sowohl nahe den Türen als auch zwischen deren Ankunftsstellen. Wer die Paare verwechselt oder die falsche Ader zuerst besucht, muss zusätzliche Transfers einplanen. Beide Symbole und die Ankunftsorientierung sind eindeutig; die erste Ankunft bleibt gefahrlos.

**Abgrenzung:** 21 verändert ein zusammenhängendes Wegenetz. Hier muss der Spieler räumlich getrennte Gebiete zu einer zusammenhängenden Tour verknüpfen. Keine blockierte Ankunft und kein Timingrätsel.

**Erholung und Gegenprüfung:** Falsche Transfers sind umkehrbar. Mindestens eine benötigte Fundstelle und der Ausgangsschlüssel liegen jenseits des Spalts; reine Sammlung auf der Startseite darf nicht genügen. Beide sinnvollen Rundreiserichtungen werden geprüft.

**Referenzbudget:** 40 Sekunden. Rahmen: 44 × 28.

### 23 – Freier Empfang / Clear Arrival

**Entscheidung und Ablauf:** Nach der sicheren Demonstration mit einem Kristall versperrt ein Fels die wichtige Ankunftstür. Über eine äußere Treppe erreicht man den Zielraum von der Seite. Zuerst den Fangplatz öffnen, dann den Felsen kontrolliert versetzen beziehungsweise absenken und die Tür freigeben. Der gewonnene Rückweg erschließt eine bisher unpraktische Sammelrunde.

**Sammeln und Folge:** Der Vorbereitungsgang enthält Erz, das man sinnvoll unterwegs mitnimmt. Weitere Taschen lassen sich nach dem Freiräumen über die Portalverbindung bündeln. Die eigentliche Felsanordnung wird vor Ort vollständig überblickt.

**Abgrenzung:** Anders als 22 ist die Verbindung vorhanden, aber unbenutzbar. Anders als die Rückwegvorbereitung in 17 wird ein Hindernis bewusst beseitigt, um einen neuen Weg herzustellen. Dies ist die letzte ausdrückliche Einführung des Kapitels.

**Erholung und Gegenprüfung:** Die Ablage besitzt eine sichere Korrekturmöglichkeit; ein falscher Versuch darf nicht unsichtbar das ganze Level unlösbar machen. Blockierte Reise verbraucht weder Schlüssel noch Lebenszeit außerhalb normaler Takte. Vor Freigabe darf kein Portaltransfer gelingen. Der Entwurf behauptet nicht, dass jeder spätere Einsatz der Abkürzung zwingend sein muss.

**Referenzbudget:** 45 Sekunden. Rahmen: 42 × 32.

### 24 – Ein Schlüssel, zwei Türen / One Key, Two Doors

**Entscheidung und Ablauf:** In der Vorschau durch Felsfenster sind zwei verschlossene Abbaugebiete erkennbar. Für ihre identischen Schlösser gibt es genau einen Schlüssel. Eine Entscheidung öffnet die senkrechte Diamantader, die andere ein verzweigtes Smaragdfeld mit verschiebbaren Felsen. Danach ist nur der gewählte Bezirk zugänglich.

**Sammeln und Folge:** Beide Bezirke enthalten genug für den Abschluss, aber weder verlangt noch erlaubt die Karte, beide leerzuräumen. In der Diamantader entscheidet die Abbaureihenfolge; im Smaragdfeld die Wahl der Parkplätze und Sammelschleifen. Innerhalb jedes Bezirks bleiben lohnende optionale Taschen.

**Abgrenzung:** Im Gegensatz zu 14 oder 18 ist dies keine jederzeit revidierbare Reihenfolge- oder Abkürzungswahl. Die knappe Ressource legt den Abbauplan fest. Beide Varianten müssen als vollständige, unterschiedlich gespielte Lösungen bestehen.

**Erholung und Gegenprüfung:** Keine falsche Tür, beide Entscheidungen sind gewinnbar. Alle frei zugänglichen Edelsteine zusammen liegen unter der Quote; mindestens ein Bezirk muss geöffnet werden. Ein benötigtes Ausgangsschloss erhält eine andere Kennzeichnung und einen unabhängig erreichbaren Schlüssel.

**Referenzbudget:** 50 Sekunden. Rahmen: 48 × 32.

### 25 – Spuren im Mauerwerk / Marks in the Masonry

**Entscheidung und Ablauf:** Eine durchbrochene Ruine erlaubt Blicke in benachbarte Galerien, deren Zugänge an anderer Stelle liegen. Ein sichtbarer Schlüssel, zwei markierte Portalpaare und mehrere Sackgassen mit Erz machen aus dem Level eine Orientierungsaufgabe: erst erkennen, von welcher Seite sich ein Ziel erreichen lässt, dann eine Tour mit möglichst wenig Rückwegen festlegen. Der normale Ausgang liegt hinter einem klar sichtbaren Schloss.

**Sammeln und Folge:** Einige Fundstellen liegen am Weg zu Schlüssel und Portalen, andere verlangen einen gezielten Abstecher. Die Quote erfordert mehrere Galerien, aber nicht jede Nische. Sichtbare Ziele und unterscheidbare Raumformen ersetzen ein Labyrinth aus gleichartigen Gängen.

**Geheimspur:** Von einer erhöhten Galerie erkennt man wiederkehrende Zwergenzeichen und einen vermauert wirkenden Seitengang. Die Zeichen führen zu einer von der Seite erreichbaren Nische mit einem gewöhnlichen Hebel. Dieser öffnet ein echtes, nachvollziehbar verbundenes Tor zum Geheim-Ausgang. Keine zufällige Wandprüfung und keine neue unsichtbare Schalterregel. Der Geheim-Ausgang funktioniert erst bei erfüllter normaler Quote.

**Abgrenzung:** Hier geht es um räumliche Schlussfolgerung aus Sichtfenstern und Zugangsrichtungen. Anders als 28 bleibt das reguläre Wegenetz überwiegend stabil; der Spieler muss es verstehen, statt zwischen Betriebszuständen umzuschalten. Der Geheimweg ergänzt ein vollständiges Hauptlevel.

**Erholung und Gegenprüfung:** Umwege sind korrigierbar. Der Geheimhebel ist für die normale Lösung entbehrlich. Hauptausgang und Geheim-Ausgang werden separat geprüft, einschließlich Quote, Freischaltung und Rückkehrziel. Der Geheimweg darf keinen frühen Zugang hinter das normale Ausgangsschloss schaffen.

**Referenzbudget:** 55 Sekunden für den normalen Ausgang; Suche und Geheimroute separat. Rahmen: 50 × 34.

### 26 – Wandernde Adern / Shifting Veins

**Entscheidung und Ablauf:** Mehrere verzahnte Erzadern teilen sich dieselben Felsauflagen. Das Entfernen eines Kristalls kann Steine in eine benachbarte Ader rollen lassen. Der Spieler muss festlegen, welche Tasche zuerst abgebaut und welcher seitliche Zugang erhalten wird. Das ist ein zusammenhängendes Abbaugebiet, keine Reihe unabhängiger Fallsteinvorführungen.

**Sammeln und Folge:** Sammeln verändert unmittelbar die noch erreichbare Beute und den Weg. Eine kontrollierte Absenkung kann tiefere Kristalle erreichbar machen, gleichzeitig aber einen bisherigen Quergang verschließen. Eine bekannte Portalverbindung hilft beim Verlassen des Abbaugebiets.

**Abgrenzung:** 25 verlangt Orientierung in einer weitgehend unveränderten Karte. In 26 verändert jeder größere Abbauschritt die Geometrie. Gegenüber dem Diamantzweig in 24 wirken die Adern aufeinander; man löst keine einzelne gewählte Tasche.

**Erholung und Gegenprüfung:** Ein Teil optionaler Beute darf verloren gehen, ohne sofort den Sieg zu verhindern. Irreversible Abgänge müssen vor Auslösung lesbar sein. Pflichtbeute und Reserven werden nach jedem vorgesehenen Abbauschritt bilanziert. Mindestens zwei Abbaureihenfolgen werden auf ihren unterschiedlichen Verlauf geprüft.

**Referenzbudget:** 55 Sekunden. Rahmen: 46 × 38.

### 27 – Die geöffnete Jagd / The Open Hunt

**Entscheidung und Ablauf:** Eine Schlüsseltür trennt bisher einen Krabblerumlauf vom benötigten Abbaugebiet. Beim Öffnen entsteht eine gemeinsame Patrouillenstrecke; die Tür bleibt offen. Der Miner benutzt feste Portale, um die Laufwege der Käfer zu unterbrechen und an anderer Stelle vor ihnen anzukommen. Die Käfer müssen den normalen Gang entlanglaufen.

**Sammeln und Folge:** Mehrere benötigte Erzgruppen liegen entlang der neuen Patrouille. Der Spieler plant kleine Sammelabschnitte zwischen sicheren Nischen und Portalen. Die Öffnung und die erste Begegnung sind vollständig sichtbar; eine sichere Rückzugsmöglichkeit bleibt erhalten.

**Abgrenzung:** Anders als 15/16 soll der Gegner nicht eingesperrt werden. Anders als 18 bietet die Karte keinen vollständig sicheren äußeren Ersatzweg für dieselbe Aufgabe. Hier bleibt ein beweglicher Gegner Bestandteil der wiederholten Sammlung; Umgehen ist eine beabsichtigte Lösung.

**Erholung und Gegenprüfung:** Fehlendes Timing führt in eine sichere Nische, wenn man rechtzeitig abbricht. Gegnerkontakt bleibt tödlich. Die Quote ist ohne Betreten des bewachten Bereichs nicht erreichbar. Kein behaupteter Pflicht-Kill; unterschiedliche Käferphasen dürfen die sichere Lösung nicht unmöglich machen.

**Referenzbudget:** 60 Sekunden. Rahmen: 50 × 34.

### 28 – Schichtwechsel / Changing Shifts

**Entscheidung und Ablauf:** Ein zentraler, immer erreichbarer Hebel schaltet zwei Gruppen bekannter Tore gegenläufig. Im einen Zustand sind obere Galerien verbunden, im anderen untere. Feste Portale behalten ihre Ziele; nur der Zugang zu ihnen ändert sich. Schlüssel und Erz können bei jedem Besuch mitgenommen werden und müssen nicht erneut geholt werden.

**Sammeln und Folge:** Die Aufgabe ist, Besorgungen zu bündeln: erst die Schlüssel und seitlichen Adern einer Betriebsstellung erledigen, dann umschalten. Eine gut vorbereitete Tour soll mit zwei Zustandswechseln auskommen; eine ungünstige Reihenfolge verursacht zusätzliche Reisen und Schaltungen.

**Abgrenzung:** 24 trifft eine einmalige, ausschließende Ressourcenentscheidung. Hier ist die Entscheidung umkehrbar, betrifft aber das ganze Wegenetz. Anders als 17 geht es nicht um eine einmalige Hin-/Rückwegvorbereitung, sondern um die Organisation mehrerer Besorgungen in zwei Zuständen.

**Erholung und Gegenprüfung:** Der Hebel bleibt aus beiden Zuständen erreichbar; keine Falle ohne Rückschaltung. Blockierte Tore müssen die ganze Schaltung nach den vorhandenen Regeln abweisen. Beide Zustände enthalten physisch notwendige Ziele, und kein Portal darf unbeabsichtigt die geschlossenen Torgruppen umgehen.

**Referenzbudget:** 65 Sekunden. Rahmen: 52 × 36.

### 29 – Die andere Seite des Felsens / The Other Side of the Boulder

**Entscheidung und Ablauf:** Wenige Felsen stehen an gemeinsam genutzten Verzweigungen. Ein Stein muss nacheinander auf verschiedenen Ablagen parken, damit unterschiedliche Erzbuchten erreichbar werden. Der Miner benutzt Portale, um hinter denselben Stein zu gelangen und ihn aus der entgegengesetzten Richtung zu schieben. Der Stein selbst bleibt am Ort und reist nie mit.

**Sammeln und Folge:** Die Reihenfolge der Buchten entscheidet, wie oft ein Stein umgestellt werden muss. Zu früh geöffnete Zugänge können den nächsten Arbeitsstandplatz versperren. Abbau und Transportplanung sind miteinander verbunden; nicht jede Bucht erhält einen eigenen unabhängigen Block.

**Abgrenzung:** In 23 wird ein Portalziel einmal freigeräumt. In 29 dienen die Portale der wiederholten Wahl der Schubrichtung. Im Unterschied zu 17 wird nicht bloß eine Ablage für einen späteren Rückweg vorbereitet. Gegenüber 28 verändert der Spieler einzelne physische Hindernisse statt eines globalen Schaltzustands.

**Erholung und Gegenprüfung:** Der Hauptarbeitsbereich hat sichere Korrekturplätze. Eine optionale knappe Ablage darf einen riskanteren Punktedetour erlauben. Kein Zeitdruck im Schieberätsel. Notwendige Arbeitsstandplätze und alle behaupteten Rückschubmöglichkeiten werden geprüft; ein Weg durch sämtliche frei zugängliche Beute darf das gemeinsame Hindernis nicht umgehen.

**Referenzbudget:** 70 Sekunden. Rahmen: 48 × 38.

### 30 – Das gebrochene Siegel / The Broken Seal

**Entscheidung und Ablauf:** In den äußeren Galerien erhält man zwei verschieden markierte Schlüssel. Einer erschließt die Hebelnische, mit der ein unterer Rückweg vorbereitet wird. Der andere passt zur Tür auf diesem Rückweg. Über ein Portal geht es anschließend in die reiche Kernader. Deren notwendiger Abbau lässt einen gut sichtbaren Felsen auf die zuvor benutzte Portalankunft sinken: Der bequeme Heimweg ist damit blockiert. Jetzt führt die Tour über den vorbereiteten unteren Gang, an einer bekannten Krabblerpatrouille vorbei, zum Ausgang.

**Sammeln und Folge:** Schon beim Holen der Schlüssel kann man Erz auf zwei unterschiedlich angeordneten Schleifen mitnehmen. Die Kernader enthält unverzichtbare Quotenpunkte. Wer am Hinweg passende Reserven sammelt, kann auf dem bewachten Rückweg eine riskante zusätzliche Tasche auslassen. Der entscheidende Abgang, seine Auflage und die betroffene Tür sind gleichzeitig im Bild.

**Abgrenzung:** Der Hinweg wird durch genau die Sammlung unbrauchbar, wegen der man ihn benutzt hat. Damit greifen Zugang, Abbau und Rückweg ineinander. Keine Aneinanderreihung der Apparaturen von 21 bis 29 und keine Wiederholung des Ablaufs aus 20, bei dem derselbe Stein erst tötet und dann geschoben wird.

**Erholung und Gegenprüfung:** Bis zur sichtbaren Kernader kann man fehlende Vorbereitungen nachholen. Nach dem Abgang ist die Entscheidung bindend; die Einführung des Zustandswechsels muss deutlich sein. Alle außerhalb der Kernader erreichbaren Edelsteine bleiben zusammen unter der Quote. Ohne vorbereiteten Rückweg darf keine Portal- oder Nebenverbindung den Ausgang erschließen. Kein zwingender Gegner-Kill, wenn eine sichere Passage möglich ist.

**Referenzbudget:** 90 Sekunden. Rahmen: 56 × 40.

## Vergleichsmatrix

| Level | Leitentscheidung | Handlung | Folge | Raumstruktur | Risiko | Rückweg |
|---|---|---|---|---|---|---|
| 21 | Wann lohnt die Abkürzung? | Schlüssel früh oder spät holen | Ring wird kürzer | Rundweg mit ungleichen Adern | Gering; bekannte Felsen | Dauerhaft geöffnet |
| 22 | Welche Verbindung ergänzt die Tour? | Portalpaare kombinieren | Wechsel der Minenhälfte | Zwei Ufer, zwei Paare | Gering; Orientierung | Anderes Paar |
| 23 | Wie wird die Ankunft frei? | Ablage vorbereiten, Fels räumen | Verbindung wird nutzbar | Treppe um blockiertes Ziel | Lokaler Fallstein | Gewonnene Abkürzung |
| 24 | Wofür den einzigen Schlüssel ausgeben? | Einen Bezirk öffnen | Alternative bleibt geschlossen | Vorschau mit zwei Abbauformen | Je nach gewähltem Abbau | Durch gewählten Bezirk |
| 25 | Wo ist der tatsächliche Zugang? | Sichtfenster und Portale zuordnen | Tour und Geheimspur erschließen | Durchbrochene Galerien | Umwege, bekannte Hindernisse | Normal- oder Geheim-Ausgang |
| 26 | Welche Ader zuerst abbauen? | Auflagen gezielt entfernen | Nachbaradern und Wege verändern sich | Verzahntes Fels-/Erzfeld | Verschüttung, Fallsteine | Erhaltener Zugang/Portal |
| 27 | Wann welche Tasche räumen? | Portal und Rückzugsnische nutzen | Miner überholt Patrouille | Gemeinsamer Umlauf mit Seitentaschen | Bewegliche Käfer | Bekannte sichere Nischen |
| 28 | Welche Besorgungen zusammenlegen? | Sammeln, dann Zustand wechseln | Andere Verbindungen nutzbar | Zwei überlagerte Wegenetze | Fehlplanung, Umwege | Zentraler Hebel erreichbar |
| 29 | Von welcher Seite muss ich schieben? | Arbeitsseite wechseln, Stein umparken | Andere Bucht erreichbar | Geteilte Kreuzungen und Ablagen | Verstellte Arbeitsposition | Korrekturplätze |
| 30 | Was muss vor dem Kernabbau fertig sein? | Schlüssel holen, vorbereiten, abbauen | Hinweg fällt aus, Rückweg wird gebraucht | Äußere Schleifen, Kern, unterer Ausgang | Irreversibler Abgang plus Patrouille | Vorher vorbereiteter anderer Weg |

Die Kartenmaße sind Platzierungsrahmen, keine Mindestgrößen oder Qualitätsnachweise. Sie steigen absichtlich nicht gleichmäßig. Vor der endgültigen Quote werden die erreichbaren Punkte je Kartenphase bestimmt; mindestens zwei nicht gleichwertige Sammelentscheidungen müssen ab 24 zur Hauptaufgabe beitragen. Eine solche Entscheidung kann Abbaureihenfolge, Zugang, Rückweg oder Risiko betreffen und braucht nicht immer einen zweiten vollständigen Lösungsweg.

## Der Zwergen-Abzweig

```text
25 ── normaler Ausgang ───────────────────► 26
 └── Geheim-Ausgang ─► G1 ─► … ─► G10 ──► 26
```

- Thema: Twisted Dwarves. Eigene Gegnerregeln werden in G1–G3 eingeführt; die Hauptkampagne setzt sie nicht voraus. G1–G10 benötigen einen eigenen detaillierten Kartenentwurf.
- Quote von 25 gilt für beide Ausgänge. Das Betreten des Geheim-Ausgangs schließt 25 ab und schaltet sowohl G1 als auch 26 frei. Es überspringt keine Hauptlevel.
- Im Menü kann man den Geheimzweig verlassen und mit 26 beginnen. Freigeschaltete Geheimlevel und der zuletzt gewählte Geheimlevel bleiben verfügbar; Fortsetzen startet wie bisher das gewählte Level neu, es verspricht keine Speicherung mitten im Lauf.
- Nach G10 geht es zu 26. Tod oder Neustart beginnt nur das jeweilige Geheimlevel neu. Schlüssel, Quote und Laufzeit werden pro Karte neu initialisiert.
- Die gemeinsame Rangliste darf keine unterschiedlich langen Ausgänge von 25 vermischen. Vorschlag: getrennte Streckenkennung für normalen und geheimen Abschluss; G1–G10 erhalten eigene Ranglisten. Replayprüfung, lokaler Speicher und Online-Dienst müssen dieselbe Streckenkennung verwenden. Das ist noch zu implementieren.
- Zeitbudget 55 Sekunden bezieht sich ausschließlich auf den normalen Abschluss von 25. Geheimroute und G1–G10 werden zusätzlich gemessen; sie dürfen die gewünschte Verdopplung nicht künstlich herstellen.
- Falls die Geheimkarten erst später ausgeliefert werden, kennzeichnet das Spiel den noch verschlossenen Zweig klar. Erst mit spielbaren Zielkarten wird der Eingang aktiv. Die geplante Rückkehr zu 26 ist bereits in `src/campaign.ts` vorgemerkt, der Zweig ist noch nicht aktiv.

## Prüfung vor Auslieferung

1. Schlüssel, Türöffnung und Teleportertakt zuerst mit kleinen technischen Karten prüfen, einschließlich blockierter Ankunft, Fallobjekt-/Gegnerkontakt am Ziel, Touch und Replayformat.
2. Jede Hauptkarte als grauen Prototyp bauen. Erfolgreiche zeitgebundene Referenzlösung und angebotene Alternativen aufzeichnen; geplante Einzelzeiten durch tatsächliche Messungen ersetzen.
3. Je behauptetem Pflichtschritt einen Gegenversuch und möglichst strukturellen Nachweis führen: erreichbare Flächen, Quote ohne Pflichtbereich, Verbindungen vor/nach Portalöffnung. Besonders 24, 27, 28 und 30 dürfen nicht durch zusätzliches Erz umgehbar werden.
4. Handlungsketten vergleichen, nicht nur Kartenbilder. Besonders 21/24, 22/25, 23/29 und 26/30 müssen ihre unterschiedlichen Rollen im tatsächlichen Spiel behalten.
5. Timingabhängige Räume mit mehreren Gegnerphasen sowie auf Desktop und Touch prüfen. Kein kritischer Hebel-Abwurf-Ziel-Ablauf außerhalb eines sichtbaren Ausschnitts. Quoten und großzügige Zeitlimits erst nach Lösungsprüfung und menschlichem Spieltest festlegen.
6. Geheimzweig separat auf beide Ausgänge, Freischaltungen, Fortsetzen, Offline-Runs und Rückkehr testen. Englische und deutsche Texte müssen die tatsächlichen Regeln erklären.
7. Dauer separat berichten: Referenzreplay, schnellste getestete Alternative, menschlicher Rekord, Erstspielzeit/Fehlversuche. Erst die vollständigen menschlichen Kapitelzeiten erlauben eine Aussage über die erreichte Verdopplung.

**Ursprünglicher Planungsstand:** Dieser Entwurf enthält noch keine Messergebnisse. Die spätere Umsetzung und Prüfung stehen in KAPITEL-3-UMSETZUNG.md und PRUEFBERICHT.md. Menschliches Spielfeedback bleibt offen.
