# Kapitel V: Die Seidenstollen — endgültiger Bauplan für 41–50

Stand: 22. Oktober 2026. Dieser Plan legt Regeln, Einführung und Aufgaben der zehn Höhlen fest. Die Umsetzung und gemessenen Lösungen stehen inzwischen in [KAPITEL-5-UMSETZUNG.md](KAPITEL-5-UMSETZUNG.md). Dieser Plan dokumentiert die Entwurfsentscheidungen; eine menschliche Spielabnahme liegt noch nicht vor. Maße, Besatz und Sammelbudgets sind Vorgaben für den Kartenbau; Zeitlimits entstehen erst beim Spielen der Prototypen.

## 1. Verbindliche Regeln

Die Nutzerentscheidungen sind: Netzbau auf Freiflächen; Verlangsamung aller Wesen außer Spinnen; Verfolgung über Netzerschütterungen; Fressen mit Kokonphase; **15 Sekunden Reifezeit**; kein Käfer-Explosionscountdown im Kokon; sichere Hackenbefreiung mit Betäubung; pro Level neu freigespielte Fackeln; Werkzeugwechsel ohne Graben mit der Fackel; Feuer durch Fackeln und Explosionen; tote Spinnen ergeben Rubine zu zwei Punkten. Ein Netzfeld soll ein bis zwei Sekunden brennen und nach einer Sekunde Nachbarn entzünden.

Für einen vollständigen Bauplan ergänze ich diese Vorgaben um feste Entwurfswerte: **drei Sekunden Betäubung**, **zwei Sekunden Brenndauer**, doppelte Bewegungskosten im Netz und die unten beschriebenen Regeln für Beute, Schlüssel, Geräte und Punkte. Diese Ergänzungen sind Designentscheidungen dieses Plans, keine bereits gemessenen Balancewerte.

### Spinnen, Netze und Verfolgung

- Spinnen laufen auf freiem Boden in vier Richtungen. Grundtempo: ein Schritt alle 0,3 Sekunden, entsprechend dem bisherigen Käfertakt. Sie können keine Erde oder Muttergestein abbauen.
- Spinnen ziehen beim Laufen zusammenhängende Netzspuren: Ihr freies Startfeld und neu betretene freie Bodenfelder werden vernetzt. Das Netz bleibt liegen; es wächst nicht selbstständig in entfernte Räume. Wände, Erde, Felsen und Edelsteine können nicht vernetzt werden. Gerätefelder, Portale, Schlüssel, Fackelaufnahme und Ausgang bleiben netzfrei; **offene Torfelder dürfen vernetzt werden**. Vorgegebene alte Netze in der Karte ermöglichen sofort lesbare Einführungssituationen.
- Spieler und sämtliche Käfertypen brauchen im Netz doppelt so lange zwischen Schritten. Spinnen werden nicht gebremst. Fallende Steine, Kristalle und Schlüssel folgen weiter ihrer bisherigen Schwerkraft.
- Jeder Schritt eines Spielers oder Käfers im Netz erzeugt einen sichtbaren Erschütterungsimpuls. Eine Spinne empfängt ihn nur im selben, über Seitenkanten verbundenen Netz. Diagonaler Kontakt verbindet keine Netze.
- Sie verfolgt die letzte empfangene Störstelle auf dem kürzesten Netzweg. Gleichzeitige Impulse: kürzere Entfernung, dann feste Quell-ID. Gleich lange Wege: oben, rechts, unten, links. Ohne neuen Impuls endet die Verfolgung an der letzten Störstelle; danach folgt die Spinne einer deterministischen Patrouille auf freiem Boden (geradeaus, bei Hindernissen rechts, links, zurück). Sie kennt keine Position außerhalb des Netzes. Wird ihr Netzweg getrennt, verfällt das Ziel.
- Spinnenbewegungen und das Öffnen eines Kokons erzeugen keine Beuteimpulse. Der Spieler kann eine Spinne durch eine bewusste Bewegung weglocken und auf freiem Boden die Route wechseln.
- Netze sind Bodenbelag, keine Mauer. Die Hacke räumt gewöhnliche Netze nicht ab; sie öffnet Erde und Kokons. Feuer entfernt Netze. Ein Stein oder Kristall entfernt unentzündete Netze auf seinem Feld. Bereits brennende Fäden laufen bis zum regulären Brandende weiter; feuerfeste Beute löscht keinen Brand vorzeitig. Steine fallen weiter durch Netze hindurch.
- Direkter Kontakt mit einer Spinne bleibt tödlich, auch mit Fackel. Der Tod des Spielers erzeugt keinen Kokon und keinen Nachwuchs.

### Fressen, Kokon, Befreiung und Geburt

1. Eine Spinne kann einen seitlich benachbarten Käfer fressen, **wenn dessen Feld vernetzt ist**. Die Mutter bleibt stehen und führt in dieser Bewegungsphase keinen weiteren Schritt aus. Der Käfer verschwindet als aktive Figur; auf seinem Feld liegt ein undurchlässiger Kokon mit dem gespeicherten ursprünglichen Käfer.
2. Der Kokon reift genau **15 Sekunden aktiver Spielzeit**. Ein Fortschrittsring und die letzten drei deutlich pulsierenden Sekunden machen die verbleibende Rettungszeit sichtbar. Pause hält die Reifung an. Es gibt keine unabhängige Eiablage.
3. Im Kokon laufen **keine Käferbewegung, Verwandlung oder Einschlussprüfung und kein Explosionscountdown**. Ein zuvor gestarteter Käfercountdown wird beim Fressen verworfen. Ein Kokon ist kein eingeschlossener aktiver Käfer und explodiert nicht von selbst.
4. Eine gerichtete Hackenaktion öffnet einen angrenzenden Kokon. Der ursprüngliche Käfer erscheint auf dessen Feld und ist **drei Sekunden betäubt**: keine Bewegung, kein Graben, keine Verwandlung, keine Verschmelzung, kein Kontaktschaden und kein Explosionscountdown. Das Feld bleibt für den Spieler blockiert; beide Figuren überlappen nicht. Sterne und ein auslaufender Ring zeigen den Zustand. Andere aktive Gegner bleiben gefährlich, und Feuer oder fallende Steine können den Käfer weiterhin töten.
5. Während dieser drei Sekunden kann eine Spinne den befreiten Käfer nicht erneut einspinnen; sonst würde die Rettung direkt wieder rückgängig. Danach gelten die normalen Käferregeln mit frischen Warn- und Einschlusszeiten. Ein tatsächlich eingeschlossener Käfer beginnt gegebenenfalls erst dann seinen normalen Sechs-Sekunden-Countdown. Der Miner erhält keine allgemeine Unverwundbarkeit und muss andere aktive Gegner weiterhin meiden.
6. Nach 15 Sekunden entsteht aus dem ungeöffneten Kokon genau eine Spinne. Die Mutter bleibt erhalten. Das Jungtier handelt frühestens in der nächsten regulären Bewegungsphase; keine Geburt mit Angriff oder weiterem Fressen im selben Takt.
7. **Feuer zerstört Kokon und enthaltenen Käfer.** Es befreit keinen Käfer und erzeugt keinen Rubin. Auch ein Fels oder eine Explosion kann den Kokon vernichten; daraus entsteht kein Nachwuchs. Die ursprüngliche Beute kann nur einmal sterben, zurückkehren oder zur Spinne werden.

Weiße Käfer liefern beim Fressen oder Verbrennen keinen Diamanten; dieser entsteht weiterhin nur beim Zerquetschen der weißen Form. Ein goldener Käfer behält seinen Schlüssel im Kokon. Hackenbefreiung setzt ihn samt Schlüssel lebend frei. Bei Schlüpfen oder Vernichtung wird der Schlüssel auf dem Kokonfeld freigegeben. Der Schlüssel wird genau einmal ausgegeben und ist feuerfest.

### Fackel und Werkzeugwechsel

- Jede Höhle ab 43 enthält eine Fackel, die durch eine eigene kleine Aufgabe erreichbar wird. 41 und 42 brauchen keine. Besitz wird beim nächsten Level und beim Neustart zurückgesetzt; Fortsetzen desselben gespeicherten Versuchs erhält ihn.
- Nach Aufnahme behält der Miner beide Werkzeuge. **E** wechselt am Desktop, eine eigene Ausrüstungstaste auf Touch. Symbol und Figurenpose zeigen das aktive Werkzeug. Vor der Aufnahme steht nur die Hacke zur Verfügung.
- Leertaste plus Richtung beziehungsweise die bisherige gerichtete Werkzeugaktion auf Touch benutzt das aktive Werkzeug. Hacke: Erde oder Kokon öffnen. Fackel: angrenzendes Netz entzünden. Keine Fernwirkung und kein direkter Angriff auf Tiere auf netzfreiem Boden.
- Mit aktiver Fackel ist auch das Betreten eines Erdfeldes gesperrt, weil dies sonst automatisch graben würde. Zum Weitergraben oder Befreien muss zurückgewechselt werden.
- Kein Brennstoffverbrauch in diesem Kapitel. Die Herausforderung besteht im Freispielen, Wechseln und richtigen Einsatz des Feuers.

### Netzbrand und Explosionen

Ein entzündetes Netzfeld ist **zwei Sekunden gefährlich**. Genau **eine Sekunde nach seiner Entzündung** entzündet es seine vier direkt benachbarten Netzfelder. Jedes davon hat seine eigene Uhr. Zusätzliche Zündungen setzen laufende Uhren nicht zurück. Diagonale Nachbarn, netzfreie Lücken, Wände und geschlossene Tore unterbrechen die Ausbreitung.

| Zeit nach Zündung von A | A | B | C | D |
|---|---|---|---|---|
| 0 Sekunden | brennt | Netz | Netz | Netz |
| 1 Sekunde | brennt | brennt | Netz | Netz |
| 2 Sekunden | freier Boden | brennt | brennt | Netz |
| 3 Sekunden | freier Boden | freier Boden | brennt | brennt |
| 4 Sekunden | freier Boden | freier Boden | freier Boden | brennt |
| 5 Sekunden | freier Boden | freier Boden | freier Boden | freier Boden |

Das Beispiel beschreibt einen geraden Strang A–B–C–D. Verzweigungen entzünden mehrere Nachbarn gleichzeitig, aber nie das gesamte Netz in einem Takt. Feuer ist für den Miner tödlich; auch Spinnen und Käfer sterben auf aktiven Brandfeldern. Es gibt keinen zusätzlichen Käfer-Explosionscountdown durch Feuer. Bestehende Explosionen können weitere Netze anzünden. Kokons werden einschließlich ihres Inhalts vernichtet.

Nach dem Brand bleibt freier Boden. Spinnen dürfen ihn später erneut verweben; während ein Feld oder sein direkter Nachbar brennt, wird dort kein neues Netz gebaut. Es gibt keine unsichtbare Dauersperre für abgebrannte Flächen.

Das Schließen eines Tores entfernt Netz und Brand auf seinem Feld und trennt die Verbindung. Eine Figur oder ein Kokon blockiert das Schließen; ein Netz allein nicht. Wiederöffnen erzeugt freien Boden. Hebel, Portale, Fackeln, Schlüssel und Kristalle bleiben durch Netzbrand erhalten. Kein Pflichtweg verlangt einen Lauf durch aktive Flammen.

Die Explosionsdarstellung bekommt eine eigene gezeichnete Folge mit sechs bis acht Bildern: heller Kern, Ausbruch, Funken und kurzes Abklingen. Netzbrand bekommt glühende Fäden und wandernde kleine Flammen. Die kurze Explosion und das zwei Sekunden gefährliche Netz müssen klar unterscheidbar bleiben. Die [Recherche](EXPLOSIONEN-REFERENZEN-2026-10-22.md) begründet die Bildfolge; sie ist kein Beleg für unsere gewählten Brandzeiten.

### Rubine, Vorräte und Simulationszustand

- Jede getötete Spinne hinterlässt genau einen **roten Rubin: zwei Kristallpunkte**, zwischen Smaragd (1) und Diamant (3). Das gilt für Feuer, fallenden Stein und Explosion. Beim Zerquetschen wird das fallende Objekt wie beim weißen Käfer verbraucht. Der Rubin fällt und rollt wie ein Edelstein, übersteht Netzbrand und zählt erst beim Einsammeln zur Quote und Wertung. Kein zusätzlicher Spinnen-Killbonus.
- Fressen, Befreien und Schlüpfen bringen keine Punkte. Vernichtete Kokons bringen keine Punkte und keinen Rubin. Ein durch den Spieler verbrannter aktiver Käfer zählt wie ein normal beseitigter Käfer mit fünf Gegnerpunkten, ohne zusätzliche Kristallbeute. Gegnerpunkte ersetzen niemals die Kristallquote.
- Pits haben einen sichtbaren, endlichen Gesamtvorrat; An-/Abschalten füllt ihn nicht auf. Maximalzahl möglicher Spinnen = Anfangsspinnen plus sämtliche verfügbare Beutetiere einschließlich Pitvorrat. Keine unsichtbare Geburtenbegrenzung. Ohne zusätzliche Käfer kann die Population nicht weiter wachsen.
- Im bestehenden 100-ms-Takt entsprechen Reifezeit 150, Betäubung 30, Brenndauer 20 und Ausbreitungsverzug 10 Takten. Alle Uhren, Netzimpulse, Käferidentitäten, Schlüssel, Werkzeugzustände und Vorräte gehören in Speicherstand, Zustands-Hash und Replay. Rendering oder Bildrate dürfen keine Regel auslösen.
- Für gleichzeitige Ereignisse gilt: Werkzeugaktion und Torzustand, fälliger Brand und bestehende Explosionen, fallende Objekte, Käferbewegung, Spinnenaktion, Kokonreifung. Neu entstandene Figuren und Beute handeln beziehungsweise fallen frühestens im folgenden Takt. Bereits getötete Beute kann nicht gefressen werden; ein rechtzeitig geöffneter oder verbrannter Kokon schlüpft nicht zusätzlich. Die Einbindung erhält eine neue Regelversion; 01–40 behalten ihre bisherigen Abläufe.

## 2. Kapitelkurve und Kartenbudgets

**41–43 führen ein, 44–46 verbinden die Regeln mit vorhandenen Aufgaben, 47–50 verlangen mehrere vorbereitete Zustände und längere Rückwege.** Jede Karte besitzt genügend freie Bodenflächen für Netzbau sowie eine netzfreie Ausweichroute. Diese Route darf die eigentliche Sammelaufgabe nicht umgehen.

| Level | Kartenbudget | Anfangsspinnen | Käfer und Nachschub | Neue Anforderung |
|---|---|---|---|---|
| 41 | 28 × 20 | 1 | 1 blau, räumlich getrennt | Netzbremse, Erschütterung, Ausweichen |
| 42 | 32 × 22 | 1 | 2 blau | Fressen, Kokon, Befreien oder Nachwuchs |
| 43 | 36 × 24 | 2 | 1 blau, 1 lila | Fackel, Werkzeugwechsel, Brandfront |
| 44 | 40 × 28 | 2 | blau, lila, weiß | Zwei von drei Lagerstätten wählen |
| 45 | 44 × 30 | 2 | 1 Bernstein, 1 blau, 1 lila | Nützlichen Helfer erhalten und retten |
| 46 | 48 × 32 | 3 | 1 goldener, 1 weißer, 1 blauer | Begrenzte Abwürfe, Schlüssel, Portalroute |
| 47 | 52 × 34 | 3 | blau, lila, weiß | Brandinseln mit Toren vorbereiten |
| 48 | 56 × 36 | 4 | 1 blau, 1 lila; Pit mit 3 Bernsteinkäfern | Nachschub und verbleibende Kokons beherrschen |
| 49 | 60 × 38 | 4 | 2 goldene, blau, lila, weiß | Zwei Schlüssel, Portale und Netzbremsen koordinieren |
| 50 | 64 × 40 | 5 | 1 Bernstein, 2 goldene, blau, lila, weiß; Pit mit 3 Bernsteinkäfern | Vorbereitung, zwei Arbeitsreihenfolgen, veränderter Rückweg |

Die Maße geben einen wachsenden äußeren Rahmen vor, keine Pflicht zur Vollfüllung. Spannung entsteht aus verschiedenen Handlungsketten, nicht aus Gegnerzahl oder Laufstrecke. Quoten werden gegen sämtliche erreichbaren Kristalle, möglichen Rubine und Verwandlungen gerechnet. Zeitlimits werden nicht aus diesen Maßen abgeleitet.

## 3. Die zehn Levelentwürfe

### 41 — Die ersten Fäden

**Leitentscheidung:** Wo erzeuge ich einen Netzimpuls, damit die Spinne den Sammelweg räumt?

**Raum:** Eine hufeisenförmige offene Kammer um eine feste Felsinsel. Links liegt eine sichere Beobachtungsnische, rechts eine benötigte Smaragdtasche. Ein kurzer Netzgang und ein längerer freier Bogen verbinden beide Seiten. Eine durch Stahl getrennte Käferbahn zeigt den verlangsamten blauen Käfer; er kann nicht zur Spinne gelangen.

**Handlung und Folge:** Den Netzrand betreten, den Impuls sehen und die Spinne zur linken Seite locken. Über den freien Bogen gelangt der Miner von hinten zur Smaragdtasche. Auf dem Rückweg muss er erneut prüfen, wo die Spinne gerade webt. Kein Feuer, kein Kokon und keine Fackel lenken vom ersten Prinzip ab.

**Sammlung und Rückweg:** Die Startseite reicht nicht zur Quote; die rechte Tasche ist nötig. Ein reicher Seitenast nahe dem Spinnenrückweg bietet freiwilliges Risiko. Die freie Umgehung ermöglicht Rückzug, führt aber nicht allein an allen benötigten Funden vorbei.

**Scheitern und Abgrenzung:** Zu langes Bleiben im Netz ist gefährlich; Verlassen des Netzes kann einen schlechten Lockversuch reparieren. Anders als 42 verändert die Spinne hier nur die Wegwahl, noch nicht die Population. **Gegenprüfung:** sämtliche Startfunde sammeln, nur warten, ohne Netzimpuls laufen; gute Alternativlösungen akzeptieren, aber die Spinne darf nicht wirkungslos abseits stehen.

### 42 — Fünfzehn Sekunden

**Leitentscheidung:** Befreie ich den Käfer, oder plane ich den Rückweg mit einer zusätzlichen Spinne?

**Raum:** Eine achtförmige Höhle mit zwei über bekannte Tore verbundenen Schleifen. Eine Stahlnische überblickt das erste Zusammentreffen von Spinne und Käfer. Die Fressstelle liegt direkt neben einer sicheren Bedienseite für die Hacke. Der zweite blaue Käfer läuft in der äußeren Schleife; keine neue Käferart als zusätzliche Lektion.

**Handlung und Folge:** Erst das Öffnen der Verbindung führt sichtbar zum Fressen. Kein Kokon steht schon seit Levelstart unter Zeitdruck. Sofort mit der Hacke befreien, die drei Sekunden Betäubung zum Rückzug und zur Torbedienung nutzen und den Käfer auf eine breite Bahn lenken. Oder während der 15 Sekunden im zweiten Bogen sammeln und eine neue Spinne entstehen lassen.

**Sammlung und Rückweg:** Beide Schleifen enthalten benötigte Beute. Ein erreichbarer Felsabwurf erlaubt später, einen Zugang zu räumen; eine Fackel ist nicht nötig. Nach einer Geburt bleibt eine längere netzfreie Rückroute offen. Schlüpfen ist eine Konsequenz, kein automatischer Neustart und keine Pflichtwartezeit.

**Scheitern und Abgrenzung:** Ein verpasstes Rettungsfenster verändert den Besatz. Ein-Zellen-Käfige dürfen bei aktiven Käfern weiterhin explodieren; der Kokon selbst nie. **Gegenprüfung:** sofort retten, kurz vor Reife retten, schlüpfen lassen, wiederholt retten; keine Countdownübernahme oder doppelte Geburt.

### 43 — Feuer in den Fäden

**Leitentscheidung:** Was grabe ich frei, bevor ich zünde und auf die freie Seite zurückweiche?

**Raum:** Eine Fackelnische hinter einer Grabaufgabe, danach ein vollständig sichtbarer gegabelter Netzstrang. Eine netzfreie Querfuge trennt die sichere Bedienseite vom zweiten Brandbereich. Dahinter liegt eine versetzte Abbaukammer mit weiterer Erde und einer zweiten Spinne.

**Handlung und Folge:** Fackel freigraben, aufnehmen, wechseln und ein angrenzendes Feld entzünden. Die wandernde Flamme zeigt den Ein-Sekunden-Abstand; parallel bleibt der freie Nebenweg nutzbar. Für die zweite Erdtasche muss der Miner zur Hacke zurückwechseln. Ein bekannter Käfer-Einschluss bietet alternativ eine Explosion zum Zünden des zweiten Netzastes; eine vollständige Fackellösung bleibt möglich.

**Sammlung und Rückweg:** Die zweite Spinne bewacht benötigte Kristalle. Netzbrand beseitigt sie und hinterlässt den ersten Rubin auf dem normalen Rückweg. Die Quote ist auch ohne Rubin erfüllbar, aber die Startseite allein reicht nicht. Ein möglicher Kokon nahe dem zweiten Ast bietet die Wahl zwischen Hackenrettung und Vernichtung durch Feuer.

**Scheitern und Abgrenzung:** Niemand muss absichtlich einen Gegner berühren, um die fehlende Schutzwirkung der Fackel zu lernen. Gefährlich sind sichtbare Brandfront und Spinne außerhalb des Netzes. Netzfreie Schleifen erlauben Korrekturen. **Gegenprüfung:** mit Fackel in Erde laufen, ohne Wechsel retten, diagonal zünden, freien Boden anzünden, Explosions- und Fackelvariante lösen.

### 44 — Drei Adern, drei Gefahren

**Leitentscheidung:** Welche zwei Lagerstätten erschließe ich, und welche Gefahr nehme ich für den Heimweg in Kauf?

**Raum:** Asymmetrischer Knoten: oben eine schmale Diamantkluft mit weißem Käfer, rechts ein breites Smaragdfeld mit blauer Patrouille und Spinne, unten eine gestufte Felsgalerie mit lila Käfer und zweiter Spinne. Eine kurze seitliche Felsverschiebung öffnet die Fackel dieses Levels.

**Handlung und Folge:** In der Kluft konkurrieren Diamantgewinn durch Zerquetschen und Verlust des weißen Käfers an eine Spinne. Im offenen Feld entscheiden Lockimpuls und Brand darüber, ob die Käferbahn frei wird. In der Galerie verändert das Einsammeln die Unterstützung mehrerer Steine: zuerst Arbeitsseite und Rückgang freilegen, dann unter den Stapeln abbauen.

**Sammlung und Rückweg:** Umgesetztes Konstruktionsbudget: je Bezirk 14 platzierte Kristallpunkte; Quote 26, keine ungebundene Startbeute. Selbst alle zusätzlichen Gegnerfunde und weißen Umwandlungen zusammen ergänzen höchstens elf Punkte; ein einzelner Bezirk bleibt damit unter der Quote. Kein Bezirk reicht, jedes Paar schon. Wandernde Beute muss einem eindeutigen Gesamtbudget zugeordnet werden. Die drei Paarungen erhalten unterschiedliche Rundwege statt gleicher Sammelzimmer.

**Scheitern und Abgrenzung:** Verlust des weißen Diamanten kann die Wahl des zweiten Bezirks ändern. Ein Steinsturz kann einen Ast versperren. Anders als 43 gibt es keine festgelegte Werkzeugfolge durch die ganze Karte. **Gegenprüfung:** jede Zweierkombination, sämtliche Funde nur eines Bezirks, maximaler Nachwuchs und neu geöffnete Querverbindungen.

### 45 — Der brauchbare Käfer

**Leitentscheidung:** Wie bringe ich den Grabekäfer durch seine Arbeit und rette ihn bei einem Fehler rechtzeitig?

**Raum:** Ein langer, versetzter Arbeitsstollen im Muttergestein, daneben eine offene Spinnenkammer und ein separater Rückgang. Zwei Tore trennen Arbeitszuführung und Futterzuführung. Die Fackel liegt hinter einem kurzen, vom Miner zu grabenden Seitengang.

**Handlung und Folge:** Den Bernsteinkäfer in den Arbeitsstollen lenken und den Zugang der Spinnen abschotten. Er öffnet den einzigen Zugang zur Hauptader. Wird er vor dem Durchbruch gefressen, liegt sein Kokon an einer erreichbaren Arbeitskante: binnen 15 Sekunden mit der Hacke retten, während der Betäubung die Spinnenzuführung trennen, dann die Arbeit fortsetzen. Feuer darf den nötigen Helfer nicht mitsamt Kokon vernichten.

**Sammlung und Rückweg:** Die Hauptader liegt physisch hinter unabbaubarem Muttergestein; maximal mögliche Außenbeute einschließlich Rubinen reicht nicht. Im neuen Stollen warten Edelsteine unter Steinen: Grabearbeit verändert deren Unterstützung. Erst den Rückgang sichern, dann die Ader abernten.

**Scheitern und Abgrenzung:** Ein Fressfehler lässt sich retten; Helfertod oder Schlüpfen vor dem Durchbruch erfordern einen Neustart mit sichtbarem Grund. Nach vollendeter Arbeit ist sein Überleben nicht vorgeschrieben. Anders als 42 hat die ursprüngliche Käferidentität einen konkreten Nutzen. **Gegenprüfung:** Helfer auslassen, vor/nach Durchbruch fressen lassen, rechtzeitig retten, Muttergestein von der Rückseite umgehen.

### 46 — Der Schlüssel im Gespinst

**Leitentscheidung:** Verwende ich den begrenzten Abwurf für den Schlüsselträger oder für seine Verfolger?

**Raum:** Zwei versetzte Arbeitsbühnen über einer goldenen Käferbahn. Ein festes Portalpaar verbindet die Bedienseiten. Unter der Bahn liegen Auffangnischen für Schlüssel und Rubine. Ein weißer Käfer bewacht die Fackelkammer; ein vorbereiteter Abwurf öffnet deren sichere Seite.

**Handlung und Folge:** Zwei weitere begrenzte Felsen stehen für die Hauptbahn bereit. Den goldenen Käfer direkt zerquetschen oder ihn von der Spinne fressen lassen: Kokon verbrennen und den Schlüssel nach dem Brand bergen; alternativ den Käfer betäubt befreien und an der zweiten Bühne treffen. Abwarten setzt den Schlüssel ebenfalls frei, bringt aber eine neue Spinne in den Bergungsraum.

**Sammlung und Rückweg:** Der Schlüssel öffnet die einzige Tür zur nötigen Lagerstätte. Das Portal führt nicht hinter diese Tür. Versetzte Edelstein- und Steinstapel bestimmen, ob der Portalrückgang nach dem Abbau frei bleibt.

**Scheitern und Abgrenzung:** Felsverbrauch ist dauerhaft; zusätzlicher Nachwuchs bleibt mit Fackel beherrschbar. Schlüssel dürfen nicht in unerreichbare Schächte fallen. Anders als 45 kann der wichtige Käfer sterben: Entscheidend ist der Schlüssel. **Gegenprüfung:** direkte und Kokonvariante, Rettung samt lebendem Schlüsselträger, Schlüssel bei Geburt, Felsen voreilig verbrauchen, Portal als Türumgehung.

### 47 — Die Feuerinseln

**Leitentscheidung:** Welche Netzbrücken schließe ich vor dem Brand, und welche Käferbremse erhalte ich?

**Raum:** Vier ungleiche offene Inseln um einen breiten freien Mittelgang. Drei schmale vernetzbare Torverbindungen koppeln Hauptabbau, Käferkammer und Rückweg. Jeder Torhebel steht bei der sichtbaren Brücke neben freier Rückzugsfläche. Die Fackel wird durch Freigraben einer kleinen Bediennische erreichbar.

**Handlung und Folge:** Vor dem Zünden die Brücke zum Rückweg schließen, den Ast zur nötigen Spinnenkammer offen lassen. Die Front wandert durch den gewünschten Ast. Eine erhaltene Netzstrecke bremst den lila Käfer auf seiner späteren Patrouille. Ein zweiter Brand ist möglich, kostet aber diese Bremse; keine unsichtbare Fernreaktion entscheidet über Leben und Tod.

**Sammlung und Rückweg:** Die reichste Tasche liegt hinter einer Spinneninsel, eine kleinere unter einer Felsstufe. Torvorbereitung beeinflusst deren Sammelreihenfolge. Das Rückwegtor lässt sich nach dem Brand öffnen; es beginnt netzfrei, kann aber später neu verwebt werden.

**Scheitern und Abgrenzung:** Zu großer Brand beseitigt nützliche Bremsen und erzeugt zusätzliche Patrouillengefahr. Mittelgang und zweite Bedienseite erlauben Umplanung. Anders als 46 steuert der Spieler ein Verbindungsnetz statt eines Abwurfs. **Gegenprüfung:** alle Tore offen, voreilig zünden, alternative Trennstelle, Tor bei anliegendem Feuer schließen, jede Tür auf tatsächlichen Zweck prüfen.

### 48 — Nachschub für die Spinnen

**Leitentscheidung:** Wie viele Grabekäfer lasse ich arbeiten, bevor ich die Zuführung stoppe?

**Raum:** Verzweigtes Fördergebiet mit einem Pit, zwei Muttergesteinästen und breiter, teilweise vernetzter Sammelrinne. Der Pit besitzt insgesamt drei Käfer; Auslass und Abschalter sind seitlich erreichbar. Die Fackel liegt hinter der ersten kurzen Arbeitsader und wird hier erneut erschlossen.

**Handlung und Folge:** Mindestens ein Helfer muss den Grundweg öffnen. Weitere Helfer können den zweiten Abbau und eine Rückwegabkürzung erschließen, geraten aber leichter ins Netz. Rechtzeitig stoppen und über vorhandene Kokons entscheiden: Helfer retten, Nachwuchs kontrolliert schlüpfen lassen oder verbrennen. Abschalten beseitigt nichts, was schon im Level ist.

**Sammlung und Rückweg:** Eine Lösung mit nur einem ausgegebenen Käfer ist vorgesehen: weniger offene Verbindungen, längere Sammelrunde. Zwei oder drei Käfer erschließen andere Fundtaschen und Wege, verlangen aber mehr Populationskontrolle. Beide Varianten erreichen die Quote ohne unbegrenzte Rubinproduktion.

**Scheitern und Abgrenzung:** Vor dem nötigen Durchbruch alle Helfer zu verlieren kann den Versuch beenden. Späterer Nachwuchs ist reparierbar. Anders als 45 entscheidet der Spieler zusätzlich über endlichen Ersatz und optionalen Ausbau. **Gegenprüfung:** null/ein/zwei/drei Ausgaben, früh stoppen, erneut anschalten, laufende Kokons beim Stopp, sämtliche Beute in Rubine umwandeln.

### 49 — Das geteilte Revier

**Leitentscheidung:** Welche Netzbremsen und Portalzugänge brauche ich noch, nachdem ich den ersten Schlüssel geborgen habe?

**Raum:** Große verschachtelte Doppelschleife mit Nord- und Südrevier, verbunden durch zwei feste Portalpaare und einen zentralen Torbogen. Vier Spinnen leben in getrennten, später verbindbaren Netzabschnitten. Sonnen- und Mondträger patrouillieren auf verschiedenen Höhen. Die Fackel liegt hinter einer kleinen gestuften Abbauaufgabe.

**Handlung und Folge:** Der Sonnenschlüssel öffnet den Quergang zum zweiten Revier. Dort muss die Netzbremse der lila Patrouille erhalten bleiben, solange der Miner den Mondschlüssel bergt. Ein Brand kann den ersten Bergungsweg sichern und zugleich über eine offene Brücke die Bremse des späteren Rückwegs zerstören: vorher trennen, gezielt zünden, danach die Reviere verbinden. Kokons bieten Rettungs- oder Bergungsgelegenheiten, sind aber keine zwingende Doppel-Stoppuhr.

**Sammlung und Rückweg:** Hauptfunde verteilen sich auf einen weißen Käfer in einer Fallkluft und ein offenes Smaragdfeld mit versetzten Steinsäulen. Nach Sonnenöffnung sind zwei Sammelreihenfolgen möglich, die unterschiedliche Portalrückwege freilegen. Die Mondtür schützt den einzigen Zugang zum ummauerten Ausgang. Die umgesetzte Quote beträgt 29 bei 25 platzierten Punkten: Selbst der zusätzliche weiße Diamant ersetzt nicht sämtliche benötigten Spinnenfunde. Beide Schlüssel haben eine physische Aufgabe, unabhängig von der Quote.

**Scheitern und Abgrenzung:** Frühes Abbrennen macht spätere Patrouillen schneller; verlorene Schlüssel oder unsichtbar tödliche Portalankünfte sind ausgeschlossen. Viele Vorbereitungen sind ohne Zeitdruck möglich, die Planung ist trotzdem umfangreicher als in 48. **Gegenprüfung:** beide Sammelreihenfolgen, sofort alles verbrennen, Türen über Portale umgehen, beide Schlüssel über Kokons gewinnen, Rückweg nach Wiedervernetzung.

### 50 — Das Herz der Seidenstollen

**Leitentscheidung:** Wie bereite ich Arbeit, Schlüssel und Brand vor, damit nach dem Hauptabbau ein begehbarer Heimweg bleibt?

**Raum:** Expedition mit westlichem Muttergesteinbruch, nördlicher Schlüsselgalerie, südlicher Förderrinne und zentralem tiefem Abbau. Freiflächen wechseln mit schmalen Netzbrücken. Start und ummauerter Ausgang liegen nahe beieinander; die echte Mondtür ist jedoch der einzige Zugang zum Ausgang.

**Handlung und Folge:**

1. Den anfänglichen Bernsteinkäfer vor der Spinnenzuführung schützen. Er öffnet Grundstollen und Fackelnische. Fressen vor dem Durchbruch bleibt durch Hackenrettung reparierbar.
2. Danach entweder die Sonnenwache in der Nordgalerie behandeln **oder** mit dem endlichen Pit die südliche Arbeits- und Rückverbindung erschließen. Beide Reihenfolgen sind vorgesehen. Der Pit bietet drei zusätzliche Helfer, keinen unendlichen Ersatz.
3. Der Sonnenschlüssel öffnet den Hauptabbau. Vor dessen erster Zündung Netzbrücken schließen und eine freie Umgehung vorbereiten. Eine bekannte Käferexplosion kann einen Netzast entzünden; die Fackel bietet eine vollständige Alternative für den Brand.
4. Abgestufte Steine und Edelsteine von vorbereiteten Arbeitsseiten abbauen. Ein zunächst als Riegel zwischen Helferbahn und Spinnenrevier genutzter Fels fällt beim Einsammeln seines stützenden Kristalls in den kurzen Rückgang. Nun muss er von der anderen Seite umgangen oder verschoben werden. Diese Folge und die sichere seitliche Sammelposition sind vor dem Abbau sichtbar.
5. Mondschlüssel aus der zweiten Wache bergen, Restnachschub stoppen und durch den veränderten Förderbereich zur Mondtür zurückkehren. Noch reifende Kokons verschwinden beim Abschalten nicht; Rettung und gezielter Brand bleiben Entscheidungen.

**Sammlung und Rückweg:** Außenfunde, Rubine aus maximalem Nachschub und weiße Verwandlungen zusammen bleiben unter der Quote; die Hauptader ist nötig. Muttergesteindurchbruch, Sonnentor und Mondtor werden zusätzlich über Erreichbarkeit abgesichert. Zwei mittlere Arbeitsreihenfolgen bieten unterschiedliche Risiken; keine unsichtbaren Pflichtflags erzwingen eine einzige Lösung.

**Scheitern und Abgrenzung:** Helferverlust vor dem Grunddurchbruch oder dauerhaft zugestellter Hauptzugang kann einen Neustart erfordern. Zu viele Spinnen oder abgebrannte Bremswege sind mit vorbereiteter Fackel- und Torbedienung noch beherrschbar. Anders als 49 verändern Grabearbeit, Nachschub und Abbau gemeinsam den Rückweg. Keine neue Grundregel erscheint erst im Finale. **Gegenprüfung:** jeden behaupteten Pflichtschritt auslassen, alle Außenfunde sammeln, beide Arbeitsreihenfolgen, maximaler Nachwuchs und verfrühter Hauptbrand.

## 4. Vergleich der Aufgaben

| Level | Leitentscheidung | Handlung → Folge | Raumstruktur | Hauptrisiko | Rückweg |
|---|---|---|---|---|---|
| 41 | Wo stören? | Impuls lockt Spinne aus Sammelweg | Hufeisen um Felsinsel | Im Netz eingeholt werden | Freier Bogen |
| 42 | Retten oder schlüpfen lassen? | Hacke erhält Käfer; Warten verändert Population | Zwei Schleifen mit Beobachtungsnische | Rettungsfenster verstreicht | Lange Umgehung bleibt |
| 43 | Was vor Zündung graben? | Wechsel öffnet Erde oder Brandweg | Gegabelter Strang mit Querfuge | Flammenfront, falsches Werkzeug | Freier Seitenweg |
| 44 | Welche zwei Adern? | Gebietswahl ändert Abbau und Gegnerfolge | Drei verschiedene Bezirke | Steinunterstützung, verlorene weiße Beute | Gewählte Gebietsrunde |
| 45 | Wie Helfer erhalten? | Trennen oder retten ermöglicht Durchbruch | Stollen neben Spinnenkammer | Endgültiger Helferverlust | Neuer Stollen und Rückgang |
| 46 | Wofür Felsen einsetzen? | Abwurf oder Kokonbehandlung gewinnt Schlüssel | Zwei Bühnen mit Portalpaar | Verbrauchte Mittel, falsche Bergungsseite | Portalrunde mit Auffangnischen |
| 47 | Wo Feuer trennen? | Tore verteilen Brand und erhalten Bremse | Vier Inseln um Mittelgang | Beschleunigte Käfer nach Brand | Vorbereitete Brücke |
| 48 | Wie viel Nachschub? | Helfer öffnen Wege und ernähren Spinnen | Fördergebiet mit zwei Arbeitsästen | Kokons nach Abschaltung | Je nach Ausbauzustand |
| 49 | Welche Bremse später nötig? | Schlüssel und Brand verändern zweites Revier | Verschachtelte Doppelschleife | Eigenen späteren Weg verschärfen | Zwei Portalverbindungen |
| 50 | Welche Vorbereitung zuerst? | Arbeit, Brand und Abbau verändern dieselbe Mine | Vier Expeditionsbereiche | Ressourcenverlust, blockierter Heimweg | Vor Hauptabbau vorbereitet |

## 5. Umsetzung und Abnahme

1. **Regelkern vor Kapitelbau:** Prüfkarten für Verfolgung, Netzbremse, Tortrennung, Kokon, Betäubung, Schlüssel und Feuer. Neue Regelversion mit Speicher-/Replay-Unterstützung. Unveränderte 01–40 behalten Karten-Hashes, historische Verifikation und Rekorde.
2. **Gezielte Grenztests:** Kein Countdown im Kokon oder in Betäubung; Befreiung vor/genau bei Reife; frischer Countdown nach Betäubung; keine doppelte Geburt, Beute oder Schlüsselausgabe; Feuer nach 10/20 Takten; getrennte und zyklische Netze; Feuer und Geburt im selben Takt; Pause, Neustart, Fortsetzen.
3. **Bedienung und Darstellung:** E und Touchwechsel, gesperrtes Graben einschließlich Erdbewegung mit Fackel, Betäubungs- und Reifeanzeige, Impulse, Brandende und Rubinfarbe. Keine nötige Sekundentakt-Reaktion außerhalb des sichtbaren Bereichs. Explosion und Netzbrand getrennt darstellen.
4. **Erst 41–43 spielbar abnehmen:** Ohne Vorwissen müssen Lockimpuls, Rettungsfenster und Brandfront verständlich sein. Keine 15 Sekunden Leerlauf als Pflicht; während Reifung sind Sammeln, Vorbereitung oder sofortige Rettung möglich. Danach 44–50 bauen.
5. **Pro Karte:** Sammelrechnung mit allen möglichen Rubinen, weißen Formen und Pitvorräten; funktionierende Alternativen; erfolgreiche zeitgebundene Replays bei unterschiedlichen Startphasen; Gegenprüfungen der Steckbriefe und strukturelle Prüfung jeder Pflicht. Stichproben nicht als vollständigen Beweis ausgeben.
6. **Kapitelabnahme:** Desktop und Touch, menschliche Erstversuche und Fehlversuche getrennt von automatischen Replays erfassen. Erst danach Zeitlimits und gegebenenfalls Bewegungsbalance feinjustieren. Größerer Rahmen und mehr Gegner ersetzen keine Prüfung der Entscheidungen.

Der Plan ist vollständig genug für Mechanikprototypen und Kartenbau. Auslieferung folgt erst nach diesen Prüfungen; die tatsächlichen Implementierungs- und Prüfstände werden im verlinkten Umsetzungsbericht getrennt dokumentiert.
