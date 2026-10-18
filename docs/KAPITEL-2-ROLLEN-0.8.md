# Kapitel 2 – Rollen der Karten in 0.8

11–13 bleiben als Einführung bytegleich in ihrer Kartenrevision. 14–20 ersetzen die größeren, aber zu ähnlichen 0.7-Karten. Es werden keine neuen Spielregeln oder KI-Medien eingeführt.

| Level | Leitentscheidung | Handlung und Folge | Raumstruktur / Rückweg |
|---|---|---|---|
| 14 – Die vier Reviere | Welche drei Reviere ergeben meine Runde? | A/B wechselt innere Zugänge; 36 von 53 Punkten genügen | Erzäste, kurze Diamantstollen, Rundgang und Werkstattspur; äußere Verbindungen |
| 15 – Der steinerne Riegel | Wann steht der Käfer sicher rechts vom Auslass? | Ein dosierter Fels schließt eine Zweierbucht; der Käfer muss leben | Tiefe Sammelschleife und obere Seitenstollen, getrennt von der Bucht |
| 16 – Der bewachte Knoten | Wann schließe ich die obere Nische? | Zweites Schalten sperrt Blau dauerhaft ein und öffnet den Ausgang | Verzweigter Knoten; Funde aus West und Ost nötig |
| 17 – Der vorbereitete Rückweg | Was muss vor dem Wechsel des Rückwegs frei sein? | Schacht vorbereiten; A/B wechseln; Rückwegfels hineinschieben | Zwei Ebenen, gekoppelter Hin-/Rückweg; fehlende Vorbereitung ist durch Zurückschalten reparierbar |
| 18 – Die Abkürzung | Sicherer Erz-Umweg oder bewachte schnelle Verbindung? | Lila umlenken und durchqueren; alternativ sichere Diamanten im Außenstollen | Beide Routen treffen an derselben verzweigten Ostader zusammen |
| 19 – Zwei getrennte Wege | Wie führe ich zwei getrennte Patrouillen zusammen? | Zwei räumlich getrennte Hebel öffnen Zuführungen; natürlicher Fels statt Spender | Beobachtung von zwei Seiten, danach Steinuntergrabung und gebogene Adern |
| 20 – Der letzte Abtransport | Wie nutze und beseitige ich denselben Fels? | Falltür trifft Lila; der gelandete Stein muss nach rechts; entfernter Hebel öffnet den Ausgang | Westliche Stollen, Engstelle mit seitlichem Aufstieg, östliche Erzschleife |

Die Karten sind bewusst keine Serie aufgefüllter Rechteckräume. Die neuen Hauptreplays dauern 19,5–47,0 Sekunden für 14–20; die riskante Alternative in 18 dauert 16,9 Sekunden. Das sind bekannte automatische Wege, keine menschlichen Zielzeiten. Teilweise sind die Routen kürzer als in 0.7. Geprüft wurde die unterschiedliche mechanische Abfolge; eine neue menschliche Abnahme fehlt noch.

## Gegenprüfungen

17: alter Sammel-Bypass scheitert; ohne Vorbereitung, ohne Umschalten und ohne Verschieben des Felsens kein Gewinn. Nach der letzten Schaltung erreicht ein gehender Spieler weder Ausgang noch Vorbereitungsstelle, solange der Fels blockiert. Entfernen des Hindernisses macht den Ausgang erreichbar. Die zugängliche westliche Beute genügt nicht für die Quote.

15: der erfolgreiche Durchlauf gibt einen Fels aus, tötet keinen Gegner und lässt Blau nachweislich lebendig in maximal zwei Zellen eingeschlossen. Ohne Ausgabe kein Abschluss.

19: beide Zuführungen sind notwendig; Weglassen einer Freigabe verhindert die Lösung. Ein Fusions- und ein Umwandlungsereignis, keine Spenderausgabe.

20: ein Zerquetschen, mindestens ein Schiebeereignis, derselbe Fels endet in der rechten Ablage. Ohne Schieben oder ohne den entfernten Ausgangshebel scheitert der geprüfte Ablauf.

Tests: `tests/distinct-caves.test.ts`. Allgemeine Regeln für weitere Kapitel: [LEVELDESIGN-REGELN.md](LEVELDESIGN-REGELN.md).
