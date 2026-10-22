# Kapitel V: Die Seidenstollen — Entwurf für 41–50

Stand: 22. Oktober 2026. Arbeitsentwurf auf Grundlage der nachgereichten Spinnenregeln. Noch keine spielbaren Karten oder gemessenen Lösungszeiten.

## Bestätigte Vorgaben

- Spinnen bauen auf Freiflächen Netze.
- Netze verlangsamen den Miner und alle anderen Wesen. Spinnen bleiben unbeeinträchtigt.
- Spinnen können den Miner töten und andere Wesen fressen, die sich im Netz befinden.
- Frisst eine Spinne beispielsweise einen Käfer, entsteht eine neue Spinne.
- Die Höhlen enthalten ausreichend Freiflächen oder viele Gänge sowie verschiedene Käfertypen.
- Netze sind feuerempfindlich. Explosionen können Netze entzünden.
- Der mögliche Fund beim Tod einer Spinne ist noch offen: grüner Edelstein oder roter Rubin.
- Explosionen brauchen eine bessere Animation. Emerald Mine und Boulder Dash dienen als Recherchegrundlage.

Die frühere Chat-Abschrift liegt nicht vor. Diese Liste übernimmt die jetzige Klarstellung. Sichtverfolgung und Gelege aus dem ersten Arbeitspapier sind keine bestätigten Regeln und gehören nicht zu diesem Entwurf. Vermehrung entsteht durch Fressen.

## Leitidee und Kapitelkurve

Der Miner verändert ein kleines Ökosystem: Netze bremsen gefährliche Käfer, machen sie aber auch zu Beute. Ein nützlicher Grabekäfer kann gefressen werden, bevor er den nötigen Stollen öffnet. Käfernachschub kann zur Spinnenpopulation werden. Eine Explosion kann gleichzeitig einen Durchgang öffnen und ein Netz entzünden.

41 erklärt Spinne und Netz. 42 zeigt Fressen und Vermehrung. 43 erklärt Feuer im Netz. Ab 44 entstehen Aufgaben aus diesen Regeln und bekannten Felsen, Käfern, Toren, Schlüsseln und Portalen. 49 bietet eine ruhigere Planungsaufgabe vor dem Finale.

## Noch offene Regeldetails

Diese Empfehlungen gelten für den ersten Prototyp; sie sind keine bereits bestätigten Nutzerregeln.

| Thema | Empfehlung oder offene Entscheidung |
|---|---|
| Bewegung | Deterministisches Vier-Richtungs-Verhalten auf freien Feldern. Bewegungspriorität und Geschwindigkeit müssen auf einer Prüfkarte festgelegt werden. Keine vorausgesetzte Verfolgungs-KI. |
| Netzaufbau | Sichtbarer Aufbau auf freien Bodenfeldern. Erde, Felsen und Edelsteine werden nicht überlagert. Empfehlung: Hebel, Schlüssel und Portale freihalten; offene Torfelder dürfen dagegen vernetzt werden. |
| Verlangsamung | Zusätzliche Takte zwischen Bewegungsschritten, auch für Blau, Lila, Weiß, Bernstein und goldene Schlüsselkäfer. Felsen und Kristalle sind keine Wesen; ihre Schwerkraft bleibt im Vorschlag unverändert. |
| Netzräumung | Feuer ist bestätigt. Ob zusätzlich die Grabeneingabe ein Netz entfernen darf, ist offen. Die unten beschriebenen Pflichtwege benötigen keine noch unbeschlossene Handräumung. |
| Fressen | Empfehlung: Eine benachbarte Spinne frisst ein Wesen im Netz und läuft im selben Takt nicht zusätzlich. Nur Beute im Netz ist fressbar. Der Miner stirbt; Vermehrung durch seinen Tod ist nicht festgelegt. |
| Geburt | Empfehlung: Die Mutter bleibt stehen; Nachwuchs entsteht auf dem Beutefeld. Beute einmal entfernen, Nachwuchs einmal erzeugen. Das neue Tier handelt erst in einem späteren Takt. Keine Eier. |
| Grenzen | Ohne Nachschub wird beim Fressen ein Käfer in eine Spinne umgewandelt. Karten mit Pits erhalten endlichen Gesamtvorrat. Weitere Populations- und Netzgrenzen müssen technisch geprüft und nachvollziehbar angezeigt werden. |
| Weiße Beute | Empfehlung: Fressen liefert keinen Diamanten. Dieser entsteht weiterhin nur beim Zerquetschen der weißen Form. Die Entscheidung zwischen Füttern und Diamantgewinn bleibt wichtig. |
| Goldene Beute | Empfehlung: Fressen gibt den Schlüssel frei und erzeugt Nachwuchs. Kein Schlüsselverlust und keine unauflösbare Blockade. Vor dem Bau von 46 bestätigen. |
| Feuer | Entzündung durch Explosionen ist bestätigt. Empfehlung: sichtbare Ausbreitung über zusammenhängende Netze; freie Felder, Wände und geschlossene Tore unterbrechen den Brand. Takt, Brenndauer und Schaden an Wesen bleiben festzulegen. |
| Tor und Netz | Empfehlung: Schließen entfernt das Netz auf dem Torfeld und trennt die Brandstrecke. Eine Figur im Tor verhindert weiter das Schließen; ein Netz allein nicht. Nach Öffnung bleibt dort zunächst ein freies Feld. Diese Empfehlung macht die Brandsteuerung in 47 möglich und ist vor dem Bau zu bestätigen. |
| Feuerschutz | Empfehlung: Kristalle, freigesetzte Schlüssel und verstärkte Geräte bleiben erhalten. Kein Pflichtweg verlangt das Durchlaufen aktiver Flammen. |
| Spinnenfund | Grün verwendet einen vorhandenen Edelsteintyp. Ein Rubin macht die Belohnung erkennbar, benötigt aber einen eigenen Punktwert sowie Regeln für Quote, Schwerkraft und Anzeige. Noch keine Entscheidung und keine feste Pflichtquote aus Spinnenfunden. |
| Zustand | Netzbau, Verlangsamung, Fressen, Geburt und Brand laufen in Simulationstakten. Pause hält sie an; Neustart setzt sie zurück. Alle nötigen Daten gehören in gespeicherten Zustand und Replay. |

Die Reihenfolge konkurrierender Aktionen muss feststehen: Fels trifft Käfer, Spinne frisst Käfer oder Käfer verlässt Netz. Dieselbe Beute darf nicht doppelt sterben oder zugleich widersprüchliche Schlüssel-, Diamant- und Nachwuchsaktionen auslösen. Geburt und Brand dürfen keine unbegrenzte Kette innerhalb eines Takts abarbeiten.

## Die zehn Höhlen

### 41 — Die ersten Fäden

**Leitentscheidung:** Welchen freien Gang halte ich für die Rückkehr offen?

Eine Spinne webt in einer breiten, einsehbaren Arbeitskammer. Eine feste Wand bietet eine Beobachtungsnische. Ein blauer Käfer durchquert auf getrennter Bahn einen Netzstreifen: Der Spieler sieht, dass auch Käfer langsamer werden, Spinnen dagegen nicht. Kontakt zwischen den beiden Gegnern bleibt in dieser Einführung ausgeschlossen.

Die Sammelrunde führt an der Spinne vorbei zu benötigten Funden. Ausweichflächen und zwei unterschiedlich lange Wege erlauben eine geplante Rückkehr. Die Anfangskammer liefert allein nicht die Quote.

**Abgrenzung und Prüfung:** Einführung von Gegner und Boden, noch keine Vermehrungs- oder Feueraufgabe. Netzfelder, freie Wege und die Verlangsamung aller beteiligten Wesen prüfen. Die Spinne darf nicht dauerhaft nur Anschauungsmaterial bleiben.

### 42 — Ein Käfer zu viel

**Leitentscheidung:** Welche Verbindung öffne ich, ohne zusätzliche Spinnen in meinen Sammelraum zu lassen?

Ein Beobachtungsplatz zeigt einen Käfer im Netz. Eine Spinne frisst ihn; aus dem Käferfeld entsteht Nachwuchs. Danach beeinflussen gekoppelte Tore zwei Sammeläste: Einer verbindet eine Spinne mit einem blauen Käfer, der andere führt an einer lila Patrouille vorbei.

Die Wahl verändert Gegnerzahl und Rückweg. Vollständiges Töten ist nicht vorgeschrieben. Wer die Futterverbindung öffnet, muss den Nachwuchs beim Heimweg einplanen.

**Abgrenzung und Prüfung:** 41 verändert die Bewegung, 42 die Population. Einmalige Beuteentfernung und Geburt, kein Auftauchen auf dem Miner, keine sofortige Weitervermehrung des Neugeborenen. Beide angebotenen Wege brauchen vollständige Lösungen.

### 43 — Feuer in den Fäden

**Leitentscheidung:** Wo stehe ich, wenn die Explosion das Netz entzündet?

Eine bekannte Käferfalle löst eine Explosion neben einem sichtbaren Netz aus. Die erste Brandstrecke bleibt vollständig im Blick. Freier Boden trennt sie von der sicheren Bedienseite. Eine zweite Anwendung öffnet den benötigten Sammelweg.

Die Aufgabe nutzt Käferexplosionen; platzierbares Dynamit ist nicht nötig. Brennende Abschnitte werden abgewartet oder über einen freien Seitenweg umgangen. Kein erzwungenes Durchlaufen aktiver Flammen.

**Abgrenzung und Prüfung:** Letzte Grundmechanik des Kapitels. Kurze Explosion und anhaltender Netzbrand müssen unterscheidbar sein. Brandunterbrechung, Tore, Quote und verbleibende sichere Wege prüfen.

### 44 — Drei Adern, drei Gefahren

**Leitentscheidung:** Welche zwei Lagerstätten passen zu meinem Umgang mit Spinnen und Käfern?

Ein asymmetrischer Knoten verbindet eine Diamantader mit weißem Käfer, ein offenes Smaragdfeld mit Spinne und blauer Patrouille sowie eine Felsgalerie mit lila Käfer. Kein einzelnes Gebiet reicht; jede angebotene Zweierkombination muss die Quote ermöglichen.

Im Smaragdfeld können neue Verbindungen Beute zur Spinne führen. In der Diamantader konkurrieren Fresskontakt und Diamantgewinn durch Zerquetschen. Die Felsgalerie verlangt eine andere Abbaureihenfolge.

**Abgrenzung und Prüfung:** Eine Expeditionsentscheidung statt eines größeren Lehrraums. Unterschiedliche Raumformen, Rückwege und Gegnerfolgen sind wichtiger als zusätzliche Fläche. Zeiten und Punkte vollständig messen; „schneller“ ist noch keine zugesicherte Eigenschaft.

### 45 — Der brauchbare Käfer

**Leitentscheidung:** Wie halte ich den Grabekäfer vom Netz fern, bis seine Arbeit erledigt ist?

Ein bernsteinfarbener Käfer muss Muttergestein zu einer nötigen Ader öffnen. Sein Arbeitsgang liegt neben einer Spinnenkammer. Bekannte Tore trennen zunächst den Futterweg und ermöglichen den Arbeitseinsatz. Später nutzt der Miner den geöffneten Stollen und kontrolliert die weitere Gegnerbewegung.

Wird der Helfer vor dem Durchbruch gefressen, ersetzt die neue Spinne seine Grabfähigkeit nicht. Freie Funde außerhalb der Ader reichen nicht zur Quote. Kein unendlicher Ersatzvorrat.

**Abgrenzung und Prüfung:** 31 führte den lebenden Helfer ein. Hier bedroht ein anderer Gegner dessen Funktion. Frühes Freilassen, frühes Fressen und Umgehung des Muttergesteins prüfen. Die Abschottung darf den nötigen Arbeitsweg nicht selbst blockieren.

### 46 — Der Schlüssel im Gespinst

**Leitentscheidung:** Wen treffe ich mit den begrenzten Felsen, um den Schlüssel sicher zu gewinnen?

Ein goldener Schlüsselkäfer durchquert eine netzgefährdete Bahn. Eine Spinne kann Zugang erhalten. Zwei einsehbare Abwurfpositionen ermöglichen, den Schlüsselkäfer direkt zu treffen oder mit Spinne und Nachwuchs umzugehen. Ein bekanntes Portalpaar erschließt die andere Arbeitsseite.

Diese Variante setzt die vorgeschlagene Schlüsselfreigabe beim Fressen voraus. Erst nach dieser Regelentscheidung wird die Karte festgelegt. Der Schlüssel muss erreichbar bleiben; sein Schloss schützt eine benötigte Lagerstätte.

**Abgrenzung und Prüfung:** Keine neue Schlüsselart. Begrenzte Mittel und wechselnde Bewohner derselben Bahn bestimmen die Aufgabe. Keine doppelte Belohnung und kein Schlüsselverlust. Beide angebotenen Gewinnstrategien vollständig prüfen.

### 47 — Die Feuerinseln

**Leitentscheidung:** Welche Netzverbindung trenne ich mit einem vorhandenen Tor vor dem Zünden?

Freie Räume sind durch schmale, unterschiedlich vernetzte Gänge verbunden. Tore trennen einen reichen Abbau, den Rückweg und eine Käferkammer. Brandstelle und Torzustand bestimmen, welcher Sammelweg nach dem Brand nutzbar wird.

Offene Flächen bieten Ausweichraum. Gefährdete Brandstelle und unmittelbare Fluchtwege sind beim Auslösen sichtbar. Keine Pflichtreaktion auf einen außerhalb der Kamera gestarteten Brand.

**Abgrenzung und Prüfung:** 43 erklärt eine Feuerstrecke; 47 organisiert mehrere Fundgebiete durch ein Feuernetz. Torzustände, verbleibende Brandbrücken und vorzeitig freigegebene Rückwege prüfen. Jede Tür braucht einen tatsächlichen Zweck.

### 48 — Nachschub für die Spinnen

**Leitentscheidung:** Wann stoppe ich Nachschub, bevor die Grabekäfer zur Spinnenpopulation werden?

Ein bekannter Pit liefert Grabekäfer mit endlichem Gesamtvorrat. Einige müssen zunächst Erzwege erschließen. Führt ihre Bahn durch ein Netzfeld, können sie gefressen werden. Abschalten entfernt weder bereits freigelassene Käfer noch daraus entstandene Spinnen.

Frühes Stoppen erlaubt einen längeren Erzweg. Mehr Grabearbeit kann Wege öffnen, erzeugt aber möglicherweise mehr Spinnen am Heimweg. Vorrat und tatsächlich erzeugte Tiere bleiben nachvollziehbar.

**Abgrenzung und Prüfung:** Der Pit ist bekannt; sein Nachschub ernährt nun eine andere Gefahr. Vorratsende, Abschalten, Fressen, Wiederanschalten und Gesamtpopulation gemeinsam prüfen. Keine endlose Quelle für Spinnenfunde oder Quotenpunkte.

### 49 — Die stillen Netze

**Leitentscheidung:** Welche Netze lasse ich als Bremse für die Käfer bestehen?

Eine ruhigere Höhle besitzt alte Netze, aber zunächst keine lebende Spinne. Blaue und lila Käfer durchqueren unterschiedlich lange Gänge. Der Miner nutzt Netzbremsen, Tore und einen Felsabwurf für Sammlung und Rückweg.

Ein Brand kann den eigenen Weg öffnen, beschleunigt aber zugleich die vorher verlangsamte Patrouille. Netze werden als Werkzeug lesbar. Keine bloße Warteaufgabe und kein vergrößerter Lehrraum aus 42.

**Abgrenzung und Prüfung:** Nach 48 keine Populationseskalation. „Netz erhalten oder abbrennen“ verändert dieselbe Patrouille. Beide sinnvollen Sammelreihenfolgen, frühes Abbrennen und reines Warten als mögliche Umgehung prüfen.

### 50 — Das Herz der Seidenstollen

**Leitentscheidung:** Welche Vorbereitung sichert Helfer, Hauptabbau und Heimweg zugleich?

Eine Expedition verbindet nötigen Grabekäfer-Durchbruch, begrenzten Nachschub, goldene Schlüsselwache und zwei vernetzte Arbeitsräume. Zuerst den Helfer vor Fresskontakt schützen und den Erzweg öffnen. Danach Nachschub und Tore so einstellen, dass die vorbereitete Explosion den richtigen Netzast erfasst. Der Schlüssel erschließt den Hauptabbau; der vorbereitete Rückweg bleibt nach dessen Veränderung nutzbar.

Die mittleren Teile sollen zwei geprüfte Reihenfolgen erlauben. Mehr Käfer bedeuten zusätzliche Grabearbeit und mögliche Umwandlung in Spinnen. Ein späterer Brand darf nicht ungesehen den einzigen Ausgangsweg nehmen. Keine neue Grundregel erst im Finale.

**Abgrenzung und Prüfung:** Jede Station beeinflusst eine spätere. Zusatzbeute darf Durchbruch und Schlüssel nicht ersetzen. Pflichtvorbereitungen brauchen strukturelle Gegenprüfungen. Erfolgreiche Alternativen werden anerkannt und nicht durch versteckte Pflichtflags verboten.

## Kapitelvergleich

| Höhle | Entscheidung | Handlung und Folge | Raumstruktur | Risiko | Rückweg |
|---|---|---|---|---|---|
| 41 | Welchen Gang freihalten? | Netze in der Sammlung berücksichtigen | Offene Kammer, zwei Wege | Langsam im Gefahrenbereich | Freie Ausweichroute |
| 42 | Welche Verbindung öffnen? | Futterzugang verändert Gegnerzahl | Beobachtungsplatz, zwei Äste | Zusätzliche Spinne | Je nach Torwahl |
| 43 | Wo zünden und warten? | Explosion entzündet Netzstrecke | Brandbahn und freier Seitenweg | Aktives Feuer | Nach dem Brand nutzbar |
| 44 | Welche zwei Bezirke? | Fress-, Sammel- und Felsrisiko abwägen | Drei asymmetrische Adern | Verschiedene Gegnerfolgen | Gebietswahl bestimmt Tour |
| 45 | Wie den Helfer schützen? | Futterweg trennen, Durchbruch ermöglichen | Arbeit neben Spinnenkammer | Früher Verlust des Helfers | Geöffneter Erzstollen |
| 46 | Wen mit dem Fels treffen? | Schlüssel direkt oder über Fresskontakt gewinnen | Zwei Arbeitsseiten | Nachwuchs am Schlüssel | Portalrunde |
| 47 | Welche Netzbrücke trennen? | Torzustand steuert Brandweg | Freie Räume, vernetzte Gänge | Falscher Ast brennt | Geschützter Netzast |
| 48 | Wann Nachschub stoppen? | Grabearbeit kann Spinnen ernähren | Pit, Arbeit und gemeinsamer Rückgang | Population trotz Abschalten | Je nach Stoppzeit |
| 49 | Welche Bremse erhalten? | Brand beschleunigt auch Käfer | Ruhiger Rundgang, getrennte Patrouillen | Eigene Vorbereitung entwerten | Kontrollierte Patrouille |
| 50 | Welche Vorbereitung zuerst? | Helfer, Nachschub, Brand und Schlüssel koppeln | Expedition durch verbundene Räume | Ressourcenverlust und Feuer | Vor Hauptabbau gesichert |

## Vor dem Kartenbau

1. Bewegung, Netzaufbau, Verlangsamung, Fressaktion und Brand auf kleinen Prüfkarten festlegen. Die bestätigten Nutzerregeln bleiben verbindlich.
2. Spinnenfund und Behandlung weißer sowie goldener Beute entscheiden. Erst danach notwendige Spinnenfunde zur Quote rechnen.
3. 41–43 als kleine spielbare Prototypen prüfen. Netz, gefangene Beute, Fressen, Geburt und Feuer müssen auf Desktop und Touch verständlich sein.
4. Für 44–50 Raumskizzen, Sammelrechnung und Zustandsfolgen bauen. Freiflächen oder viele Gänge schaffen Handlungsraum; Größe allein ist kein Qualitätsbeleg.
5. Neue Regeln separat versionieren. 01–40, ihre historischen Regeln, Replays und Ranglisten bleiben erhalten.
6. Zeitgebundene Lösungen und Alternativen aufzeichnen. Pause, Startphasen, Neustart, gespeicherten Zustand und Serverprüfung abdecken. Zeitlimits erst aus tatsächlichen Lösungen ableiten.
7. Pflichtschritte auslassen, freie Beute vorab sammeln und Nebenwege auf Umgehungen prüfen. Keine endlose Futter-, Punkte- oder Edelsteinschleife. Stichproben nicht als Beweis für jede Spielsituation ausgeben.
8. Browser-Emulation und menschliche Spielabnahme getrennt dokumentieren. Dieser Entwurf enthält noch keine getesteten Karten.

Zur Explosionsdarstellung: [Recherche und Vorschlag](EXPLOSIONEN-REFERENZEN-2026-10-22.md).
