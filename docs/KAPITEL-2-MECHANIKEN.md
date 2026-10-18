> Aktualisierung 0.7: Die größere Fassung von 11–20 ist implementiert. Verbindliche aktuelle Karten und Lösungen stehen in [LEVELS-UND-LOESUNGEN.md](LEVELS-UND-LOESUNGEN.md), gemessene Zeiten und Prüfgrenzen im [Prüfbericht](PRUEFBERICHT.md). Frühere Kartenbeschreibungen und Zeitprognosen unten bleiben als Entwurfshistorie erhalten.

# Kapitel 2 – Käferrichtungen, Verschmelzung und Steinspender

Stand: 18. Oktober 2026. In Version 0.6.0 implementiert und durch Regeltests, Lösungsreplays und Browserdurchläufe geprüft. Bestehende Level 01–10 und ihre Replays bleiben unverändert.

## Blauer und lila Käfer

Die Farbe bezeichnet eine feste Abbiegepriorität, keinen starren Kreis. Verbindliche Zuordnung: **Blau bevorzugt rechts**, wie der bestehende Schieferkrabbler; **Lila bevorzugt links**. Von der aktuellen Blickrichtung aus gilt:

| Typ | Reihenfolge der Versuche |
|---|---|
| Blau | rechts, geradeaus, links, zurück |
| Lila | links, geradeaus, rechts, zurück |
| Kristallkäfer | rechts, geradeaus, links, zurück, wie bisher |

Beide normalen Käfer bewegen sich alle drei Simulationstakte und betreten nur freie Gänge. Eine Sackgasse führt zum Umdrehen, kein möglicher Weg zum Warten. Die Farbe wird durch eine unterschiedliche Rückenmarkierung ergänzt (Rechts-/Linkswinkel), damit die Unterscheidung nicht allein von der Farberkennung abhängt. Ein sicherer Beobachtungsraum zeigt die unterschiedlichen Wege an derselben Kreuzung.

## Blau + Lila = Kristallkäfer

Nutzerwunsch: Treffen beide Typen aufeinander, entsteht ein Kristallkäfer. Verbindliche Kontaktregel: **orthogonaler Kontakt auf direkt benachbarten Feldern**. Diagonale Nähe genügt nicht. Es entsteht genau ein Kristallkäfer, keine Explosion und kein sofortiger Diamant.

Implementierte technische Auflösung:

1. Nach der Fallobjektphase, aber vor einem fälligen Käfer-Bewegungsschritt, bereits aneinanderliegende blaue/lila Paare verschmelzen.
2. Übrige Käfer nach stabiler Entitätsreihenfolge bewegen. Nach jedem Schritt erneut auf direkten Kontakt prüfen, sodass kein Paar durch die Reihenfolge unbemerkt aneinander vorbeigeht. Kontakt zum Spieler bleibt tödlich und wird zuerst aufgelöst.
3. Der neue Kristallkäfer entsteht auf dem Feld des blauen Käfers mit dessen Blickrichtung; das lila Feld wird leer. Beide Ausgangsentitäten werden ersetzt. Ein neu entstandener Käfer bewegt sich in diesem Takt nicht nochmals.
4. Bei mehreren möglichen Partnern gewinnt das Paar mit der kleinsten sortierten Kombination stabiler Entitätskennungen; jede Entität kann pro Takt nur einem Paar angehören. Karten sollten im Einführungsbereich solche Mehrfachkontakte vermeiden.
5. Zwei blaue oder zwei lila Käfer verschmelzen nicht. Ein Kristallkäfer verschmilzt nicht weiter.

Es erhalten beide normalen Farben denselben bisherigen Gegnerbonus von 5 Punkten beim Zerquetschen beziehungsweise sicheren Einschließen am erfolgreichen Levelende. Die Verschmelzung selbst gibt **0 Punkte** und keine Kristallquote; dabei werden keine zusätzlichen Tötungs- oder Einschließboni für die verschwundenen Ausgangskäfer vergeben. Erst das bekannte Zerquetschen erzeugt einen Diamanten und gibt den festgelegten Kristallkäferbonus; Einsammeln des Diamanten zählt weiterhin 3 Quoten-/Sammelpunkte. So bleibt das eigentliche Rätsel: zusammenführen, den neuen Käfer zur Fallstelle lenken, Diamanten bergen.

Neue Regeln verwenden `emerald-hollows/3`. Alte Karten werden nicht nachträglich anders gespielt oder neu bewertet. Prüffälle: beide Prioritäten an Kreuzungen, Sackgassen, direkter und diagonaler Kontakt, Kontakt vor/nach Bewegung, Mehrfachkontakt, Spielerberührung, zerquetschter Partner, genau eine neue Entität und keine doppelte Bewegung/Punktvergabe.

## Falltür und Steinspender sind unterschiedliche Geräte

Eine gewöhnliche offene Falltür entfernt eine Auflage. Liegen mehrere Steine darüber, kann der ganze Stapel nachrutschen. Für den Nutzerwunsch **ein Hebelzug = genau ein Stein** gibt es einen sichtbaren **Steinspender**: Vorratsmagazin, obere Rückhaltesperre und untere Ausgabeklappe. Die Mechanik hält die restlichen Steine sichtbar zurück.

- Ein einzelner frischer Hebeldruck gibt genau einen vorhandenen Stein frei. Halten wiederholt die Ausgabe nicht.
- Vorrat und verbleibende Steine sind sichtbar; keine unbegrenzte Erzeugung.
- Ist das Ausgabefeld belegt oder das Gerät noch in seinem Ausgabezyklus, wird die Betätigung abgewiesen und der Vorrat bleibt unverändert. Keine versteckte Warteschlange.
- Der ausgegebene Stein wird ein normales Fallobjekt. Bestehende Fall-, Roll- und Trefferregeln gelten; die Grafik muss den tatsächlichen Zustand darstellen.
- Bevor der nächste Druck akzeptiert wird, muss die Rückhaltesperre wieder eingerastet und das Ausgabefeld frei sein. Die Sperrzeit beträgt drei Simulationstakte (300 ms).
- Eine leere Vorratskammer zeigt einen klaren Leerzustand. Verspätetes Auslösen kann einen Stein verbrauchen; Level 15 bietet drei Steine und erlaubt nach einem Fehlwurf einen weiteren Versuch; eine solche Lösung ist separat getestet.

## Verbindliche Sichtanforderung aus dem Nutzerfeedback

**Am Bedienplatz müssen Hebel, gesamter Vorrat, Ausgabeklappe, komplette Fallstrecke und Ziel-/Käferbahn gleichzeitig sichtbar sein.** Kein Auslösen mit blindem Blick auf einen anderen Bildschirmausschnitt. Diese Anforderung gilt auch für Touch, einschließlich schmaler und niedriger Ansichten.

Die betreffende Apparatur bleibt eine kompakte Teilkammer, auch wenn die restliche Höhle größer ist. Die Kamera darf beim Hebelbedienen nicht vom Ziel wegscrollen; Hinweise und HUD dürfen die Fallstelle nicht verdecken. Die Kammergröße wird anhand der tatsächlich nutzbaren Spielfläche bestimmt, nicht durch pauschales Verkleinern aller Kacheln. Ist die Kontrolle auf einem unterstützten Display nicht lesbar möglich, muss der Raum umgebaut werden. Browseremulation bei 390 × 844 und 844 × 390 ist geprüft. Ein neuer Test auf einem physischen Mobilgerät steht aus.

## Einordnung in Level 11–20

- 11: Hebel und Tor sicher kennenlernen.
- 12: Blauen und lila Käfer in getrennten Gängen beobachten; ihre verschiedenen Abbiegeprioritäten nutzen, um einen bewachten Weg freizumachen. Noch keine erzwungene Verschmelzung.
- 13: Beide Käfer mit einem Tor gezielt zusammenführen; den entstandenen Kristallkäfer über eine bekannte einzelne Felsfalle in einen notwendigen Diamanten verwandeln. Hier steht die Verschmelzung im Mittelpunkt.
- 14: Gegenläufige Tore und Schaltreihenfolge.
- 15: Kompakte Steinspender-Einführung: ein optionaler erster Abwurf in den Fangschacht, dann einen bereits vorhandenen Kristallkäfer in einer getrennten unteren Bahn treffen. Kein eigener Kontaktweg zum Spieler, ein Bildschirm. Die neue Lektion ist die dosierte Ausgabe; Verschmelzung wird hier noch nicht kombiniert. Eine Grube muss nicht als Brücke aufgefüllt werden, da die Spielfigur keine Schwerkraft besitzt.
- 16: Käfer dauerhaft in einer Seitenkammer einsperren; bleibt gegenüber der vorübergehenden Umlenkung in 12 bestehen. Unterschiedlichkeit wird im menschlichen Durchlauf beurteilt.
- 17: Rückweg vor einem Felsabgang sichern.
- 18: Langer sicherer oder kurzer riskanter Sammelweg.
- 19: Käfer über Tore zusammenführen und den Kristallkäfer anschließend mit einem einzeln ausgelösten Magazinstein treffen. Hebel, Magazin, Treffpunkt und Käferbahn bleiben gemeinsam sichtbar. Keine punktgenaue Reflexprüfung ohne Rückzugs-/Warteplatz.
- 20: Kapitelabschluss verbindet bekannte Aufgaben in getrennten, gut lesbaren Teilräumen. Kein gleichzeitiges Überwachen mehrerer unsichtbarer Apparaturen.

Level 12 und 16 sind beide implementiert; der Nutzer möchte ihre tatsächliche Unterschiedlichkeit selbst spielen und beurteilen. Die Vorschläge zu Teleportern und Kapitel 3 sind davon weiterhin getrennt und offen.
