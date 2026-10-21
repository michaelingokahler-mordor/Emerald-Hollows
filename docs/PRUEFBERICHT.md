# Aktueller Stand: 0.11 — Käfer-Revision

Der [Prüfbericht 0.11](PRUEFBERICHT-0.11.md) beschreibt die aktuellen Regeln, Karten, automatischen Zeiten und Browserkontrollen. Die folgenden Berichte dokumentieren frühere Veröffentlichungen und deren damalige Karten.

---

# Update 0.10.0 — Die hungrigen Adern, Level 31–40

Stand: 19. Oktober 2026. Zehn neue Karten; neue Regeln nur in Version 5. Bestehende Karten 01–30, Zeitlimits, Freischaltungen und Rekorde bleiben erhalten. Keine Datenbankmigration und keine Ranglistenlöschung.

- **330 Tests in zwölf Dateien bestanden.** Zusätzlich erfolgreiche zeitgebundene Hauptlösungen für alle 40 Karten. Kapitel IV: alle Alternativen, neun Anfangsphasen pro Hauptlösung, Neustart, JSON-Zwischenstand, serverseitige Prüfabschnitte und gleiche Endzustände bei 30/60/144 Render-FPS.
- **Geröllmeer:** 56 × 36, 400 Edelsteine mit insgesamt 460 Punkten; Quote verlangt alle. Zwei Referenzrouten und 24 gemischte Reihenfolgen sammeln vollständig. Keine innere Trennmauer; nur Außenrand, Ausgangsnische und Geräte. Diese Stichprobe beweist keine Wiederherstellbarkeit nach jeder beliebigen Fehlgrabung.
- Umgehungsprüfungen: optimistische Erreichbarkeit, Quotenrechnung, weggelassene Hebel, fehlender/unterbrochener Transport. Gefundene Probleme vor Auslieferung behoben: rückwärts entkommende Helfer, blockierte Pit-Zugänge, fehlender Rückwegzwang in 33 und ein Erz-Tor-Bypass in 37. Details in [Kapitel IV](KAPITEL-4-UMSETZUNG.md).
- Chrome 1280×720/DPR 1 und Edge 1920×1080/DPR 2: vollständige Browser-Replays aller zehn Karten bei sechsfacher Testgeschwindigkeit. Chrome-Mobil-Emulation 390×844/DPR 3: 32/35/36/37/40 bei dreifacher Testgeschwindigkeit. Alle erfolgreich, konstanter Zoom, keine automatischen Raumwechsel oder JavaScript-Fehler. Ein früher Chrome-Versuch wurde durch Entwicklungs-Neuladen unterbrochen; der saubere Wiederholungslauf bestand.
- Mobile Touch-Betätigung des Pit-Hebels mit gleichzeitigem Graben + Richtung geprüft. Position bleibt stehen; Pause hält den Countdown an; serialisierter Spielstand erhält ihn; Neustart stellt den Anfangszustand wieder her. Vorbereitetes Test-Szenario am Hebel, kein menschlicher Durchlauf. Bedienpunkt, Auslass und Ziel der Apparaturen 32/35/40 passen gleichzeitig in die 390-Pixel-Ansicht. Screenshots lokal unter `output/playwright/`.
- Lokale Wrangler/D1-HTTP-Prüfung: neue Regeln und alle 30 Karten der Kapitel II–IV bestätigt, öffentliche Ranglistenberechnung, Wiederherstellung, alte Offline-Beweise, Eigentümerprüfung und manipulierte Eingaben geprüft. Keine Testprofile auf dem öffentlichen Server erzeugt.
- Produktionsbuild, strenge Typprüfung, Worker-Dry-Run und verschlüsselte Backup-/Wiederherstellungsprüfung bestanden. Dichte Felder nutzen einen temporären Belegungsindex; der Server prüft sie in kleineren Abschnitten. Gemessene lokale Laufzeiten sind keine Cloudflare-CPU-Garantie.
- Keine neuen Medienkosten. Vorhandene gemalte Bilder mit Farbvarianten und Countdown-Anzeige. Musik und Mineranimation unverändert.

Automatisierte Zeiten: [Messdaten](../artifacts/chapter-four-verification.json). Browserdaten: [Prüfprotokoll](../artifacts/chapter-four-browser.json). **Menschliche Spielabnahme, subjektiver Schwierigkeitsgrad und echtes Telefon bleiben offen.** Die riskanten Routen in 34/38 waren in den getesteten Gesamtlösungen langsamer als die sicheren; es wird kein ungemessener Zeitvorteil behauptet.

---

# Update 0.9.1 — Hinweise, Zeitlimits und Kamera

Stand: 19. Oktober 2026. Keine Karten oder Spielregeln verändert. Alle 30 Zeitlimits anhand der bestätigten menschlichen Bestzeiten verkürzt; vollständige Tabelle und Abgrenzung gegenüber automatisierten Zeiten in [TIMING-FEEDBACK-0.9.1.md](TIMING-FEEDBACK-0.9.1.md).

- 269 automatisierte Tests in zehn Dateien bestanden. Alle Hauptlösungen und dokumentierten Alternativen passen in die neuen Limits. Alte Offline-Beweise bleiben prüfbar; kompatible Rekorde werden ohne Datenlöschung zusammengeführt.
- Lokale Wrangler/D1-HTTP-Prüfung bestanden, einschließlich alter Timer-Beweise oberhalb und innerhalb der neuen Frist, Deduplizierung und Profilwiederherstellung. Keine Datenbankmigration.
- Chrome 1280×720/DPR 1, Edge 1920×1080/DPR 2 sowie Chrome-Mobil-Emulation 390×844/DPR 3: vollständige Replays 27 und 30 bei dreifacher Wiedergabegeschwindigkeit. Konstanter Zoom, keine automatischen Raumwechsel; Endstände 431 und 910 Takte. Portalreisen versetzen die Kamera weiterhin ausdrücklich zum Ziel.
- Chrome Desktop und Mobil-Emulation: Hint anfangs verborgen, per Tastatur bzw. Touch geöffnet und wieder geschlossen. Echter Ablauf des 13-Sekunden-Limits in 01 geprüft; Übung übersteht dieselbe Frist. Auch nach Tod und Neustart bleibt der Hinweis verborgen.
- Sichtprüfung der Hint-Karten und mobilen Spielfläche. Diese Tests ersetzen keinen menschlichen Durchlauf auf einem echten Telefon. Das neue Zeitgefühl ist noch nicht vom Nutzer abgenommen.
- Kein neues Tracking und keine Monster-Pits implementiert. Die Generator-Idee ist als Vorschlag dokumentiert. Keine neuen Medienkosten.

---

# Lathmar: Emerald Hollows 0.9.0 — Torhallen und Spielerfeedback

Stand: 19. Oktober 2026. Zehn neue Hauptkarten 21–30 mit Schlüsseln und Portalen. Zusätzlich 15, 16 und 18 nach menschlichem Feedback neu gebaut; 19 erhält Quote 41. Die übrigen vorhandenen Karten und Rekorde bleiben unverändert. Die 0.8-Definitionen der vier geänderten Karten bleiben zur Verifikation ausstehender Offline-Durchläufe erhalten. Richtungs-Pfeile an Käfern sind entfernt. Keine neuen Runway-Kosten.

## Automatisierte Prüfung

- **225 Tests in neun Dateien bestanden.** Regeln, Fall-/Schubverhalten, Schlüsselverbrauch, Portalbelegung, Ankunftsgefahren, Gerätezustände, speicherbare Zustände, Neustart und Replays.
- Alle 30 Hauptlösungen sowie die dokumentierten Alternativen sind erfolgreich zeitgebunden abgespielt. Kapitel 2 und 3 sind zusätzlich bei neun Anfangsphasen geprüft. Die Simulation liefert bei 30/60/144 Render-FPS dieselben Endzustände.
- Umgehungsprüfungen kombinieren ausgelassene Aktionen mit großzügiger Erreichbarkeit und Quotenberechnung. Ein erfolgreicher Replay allein gilt nicht als Beweis einer notwendigen Aktion. Gefundene Bypässe wurden in 15, 28 und 29 geschlossen. Keine vollständige Suche über sämtliche dynamischen Spielzustände.
- Die lokale HTTP-API mit Wrangler/D1 bestätigt sämtliche 20 Karten aus Kapitel 2/3 einschließlich Gesamtpunkten. Sie akzeptiert alle vier archivierten 0.8-Lösungen, hält sie aus aktuellen Ranglisten heraus und stellt historische Rekorde weiterhin wieder her. Auch ältere Regelversionen bleiben geprüft. Keine Testprofile auf dem öffentlichen Server angelegt.
- Strenge TypeScript-Prüfung, Produktionsbuild und Worker-Dry-Run bestanden. Keine Datenbankmigration erforderlich.

## Zeiten und menschliches Feedback

Kapitel 3: **9:18,7** automatische Referenzen, schnellste dokumentierte Varianten **8:28,2**. Vergleich zum genehmigten Kapitel-2-Stand 0.8: **4:42,5**, Faktor **1,978**. Die anschließend angefragte Erweiterung von 15/16/18 erhöht Kapitel 2 auf **5:46,8**; dazu beträgt der Faktor nur noch **1,61**. Keine künstliche Verlängerung durch Leerwege oder langsamere Bewegung.

Die öffentlich abgerufene menschliche Serie von Mufti999 dauerte auf 0.8 **7:17,6**. Die einzelnen Rekorde und alten/neuen Automatenzeiten stehen in [KAPITEL-2-FEEDBACK-2026-10-19.md](KAPITEL-2-FEEDBACK-2026-10-19.md). Für die neue Fassung und Kapitel 3 fehlen noch menschliche Durchläufe. Es gibt weder einen gemessenen Erstspielzeitfaktor noch eine menschliche Spielspaß-Abnahme.

## Browserprüfung

Chrome 1280 × 720 / DPR 1, Edge 1920 × 1080 / DPR 2 und Chrome mit Touch-Emulation 390 × 844 / DPR 3: alle 14 neuen oder geänderten Karten erfolgreich über die Spieloberfläche abgespielt. Der Prüfablauf beschleunigt nur den Browser-Zeitgeber um Faktor sechs; Eingaben und Endtakte bleiben unverändert. Alle 30 Auswahlkarten und EN/DE-Umschaltung geprüft. Die Kontrollansichten in 16, 23, 26, 27 und 30 werden auf vollständige Sichtbarkeit ihrer definierten Räume geprüft.

In Edge löste die hochauflösende Aufnahme eine automatische Pause aus. Der Prüfablauf setzt erkannte Pausen fort; der vollständige erfolgreiche Matrixlauf enthielt eine solche Fortsetzung. Zwei vorherige Prüfversuche liefen wegen dieser unberücksichtigten Pause in einen Prüfzeitablauf.

Die abschließende Zweikäfer-Fassung von 16 wurde in allen drei Browserkonfigurationen erneut geprüft, mobil bei normalem Tempo. Level 27 zusätzlich bei normalem Tempo in der mobilen Ansicht erfolgreich. Ein eigener normaler Eingabetest prüft Tastaturbewegung, gleichzeitiges Touch-Graben mit Richtung, Schlüsselaufnahme ohne Bewegung, Pause, Neuladen mit erhaltenem Inventar und Neustart. Hoch- und Querformat wurden aufgenommen. Emulation ersetzt keinen Test auf einem physischen Mobilgerät.

Der paketierte Produktionsbuild wurde zusätzlich nach einem echten Offline-Neuladen über den Service Worker geprüft. Alle 30 Karten waren vorhanden; Level 30 gewann bei normalem Tempo nach 91,0 Sekunden mit 101 Punkten.

Nach dem Offline-Test wurde ausschließlich der zweite Käfer in 16 ergänzt; dessen finale Karte wurde separat erneut geprüft. Der Offline-Test gilt für den unveränderten Ablauf von Level 30.

Screenshots liegen lokal unter `output/playwright/`. Geprüfte Grafiken sind vorhandene Runway-Medien plus programmatische Schlüssel-/Portalzeichen. Es gab keine neuen Audioänderungen; eine neue menschliche Hörabnahme wurde nicht durchgeführt.

Der Geheimzweig in 25 ist ausschließlich ein auffindbarer, versiegelter Vorraum. G1–G10 sind nicht implementiert, kein geheimer Fortschritt wird vorgetäuscht. Der reguläre Ausgang führt nach 26.

Die folgenden Abschnitte dokumentieren ältere Veröffentlichungen und ihre damaligen Prüfstände.

---

# Lathmar: Emerald Hollows 0.8.0 – unterschiedliche Aufgaben

Stand: 18. Oktober 2026. Geändert wurden ausschließlich die Kartenrevisionen 14–20. 01–13, Simulationstakt, Laufanimation, Spielregeln und Runway-Medien bleiben erhalten. Die Varianten von 0.7 sind für ausstehende Offline-Replays archiviert.

## Was sich spielerisch ändert

14 bietet vier unterschiedlich gebaute Reviere. 15 nutzt einen Spenderfels als lebendigen Riegel. 16 sichert einen verzweigten Knoten. 17 verlangt einen vorbereiteten Entsorgungsschacht und das Verschieben des Rückwegfelsens. 18 verbindet einen sicheren, reicheren Umweg mit einer schnelleren bewachten Route. 19 führt zwei getrennt freigegebene Patrouillen zusammen und nutzt einen natürlichen Felsen statt eines Spenders. 20 verwendet denselben Felsen zuerst gegen einen Gegner und anschließend als zu verschiebendes Hindernis.

Die Karten 14–20 verwenden keine skalierten Sammelraumvorlagen mehr. Die neuen Stollen sind teilweise kompakter. Bekannte automatische Wege wurden dadurch teilweise kürzer; eine längere menschliche Spielzeit wird nicht behauptet. Aktuelle Rollen: [KAPITEL-2-ROLLEN-0.8.md](KAPITEL-2-ROLLEN-0.8.md). Verbindliche Folgerungen für kommende Kapitel: [LEVELDESIGN-REGELN.md](LEVELDESIGN-REGELN.md), auch in `AGENTS.md` verankert.

| Level | Raster | Quote | Hauptreplay |
|---|---|---|---|
| 14 | 48 × 30 | 36 | 28.0 s |
| 15 | 36 × 28 | 30 | 19.5 s |
| 16 | 46 × 31 | 40 | 36.6 s |
| 17 | 44 × 32 | 38 | 25.5 s |
| 18 | 48 × 32 | 36 | 23.1 s |
| 19 | 44 × 30 | 38 | 47.0 s |
| 20 | 48 × 34 | 44 | 35.0 s |

18: sichere Route 23,1 s / 45 Kristallpunkte, schnelle Route 16,9 s / 41 Kristallpunkte. Diese Eingabefolgen sind verifiziert, nicht als optimal bewiesen. Es liegen noch keine neuen menschlichen Rekorde oder Erstspielzeiten für 0.8 vor.

## Automatisierte Prüfung

- **168 Tests bestanden.** Alle 20 Hauptlösungen und angebotenen Alternativen erfolgreich. Kapitel 2 enthält 15 dokumentierte Routen insgesamt, einschließlich der Hauptwege.
- Alle zehn Kapitel-2-Hauptwege bestehen bei neun anfänglichen Timing-Verschiebungen sowie mit identischen Ergebnissen bei 30/60/144 Render-FPS. Checkpoint-Rekonstruktion, Zurücksetzen und Server-Verifikation bestehen.
- **17:** alter 0.7-Sammel-Bypass scheitert. Vorbereitung, Umschalten und Verschieben separat ausgelassen: kein Erfolg. Zusätzlicher struktureller Erreichbarkeitstest nach der Schaltung: der Fels trennt Ausgang und Vorbereitungsstelle vom Spieler; ohne das Hindernis ist der Ausgang erreichbar. Westliche Beute allein liegt unter der Quote. Diese Nachweise gehen über den Erfolg einer einzelnen Musterlösung hinaus.
- **15:** ein ausgegebener Fels, kein getöteter Gegner, Blau lebt in einer Zweierzelle. Ohne Ausgabe kein Zielabschluss.
- **19:** beide Freigaben nötig, genau eine Fusion und Umwandlung, kein Spender vorhanden.
- **20:** gezieltes Zerquetschen, mindestens ein Schiebeereignis, Fels in der stabilen Ablage und entfernter Ausgangshebel. Auch eine volle Sekunde Pause nach dem Schieben ist geprüft. Gegenläufe ohne Schieben oder Ausgangsschaltung scheitern.
- Lokaler Wrangler/D1-Test bestätigt sämtliche aktuellen Kapitel-2-Replays und die Archivierung von 0.2-, 0.6- und 0.7-Durchläufen. Freischaltungen bleiben erhalten. Keine öffentlichen Testprofile oder Rekorde erzeugt.
- Produktionsbuild, TypeScript und Worker-Bundle erfolgreich. ZIP-Prüfung und Veröffentlichung erhalten separate Auslieferungsnachweise.

Nachweise: `artifacts/distinct-caves-verification.json`, `artifacts/level-verification.json`, `artifacts/api-verification.json`, `tests/distinct-caves.test.ts`.

## Tatsächlich durchgeführte Browserprüfungen

Chrome 1280 × 720/DPR 1, Edge 1920 × 1080/DPR 2 sowie Chrome-Touchemulation 390 × 844/DPR 3: alle sieben geänderten Karten vom Menü bis zum erfolgreichen Abschluss. Für diese systematischen Durchläufe wurde die Replay-Uhr sechsfach beschleunigt. EN/DE und Freischaltungen aus 0.7 geprüft. Die beobachteten Bedienansichten passen vollständig in die Kamera.

Separater normaler Spieltakt: zwei gleichzeitige CDP-Touchpunkte geben bei gehaltenem Hebel genau einen Felsen aus; erneutes Drücken per Tastatur einen weiteren. Pause/Neuladen behält den Vorrat, Neustart setzt ihn zurück. Querformat 844 × 390/DPR 3 ohne horizontale Überbreite; Bedienansicht etwa 40,7 CSS-Pixel pro Kachel.

Der Produktionsbuild startet nach Offline-Neuladen, zeigt alle zwanzig Karten und spielt das Finale bei normalem Takt erfolgreich bis zum Ende. Englische Hilfe geprüft. Der absichtlich offline angeforderte `online.json`-Abruf erzeugt einen erwarteten Netzwerkfehler; Spiel und Replay laufen aus dem Cache.

Level 19 wurde zusätzlich bei normalem Takt auf der mobilen Emulation abgespielt: beide getrennten Beobachtungsansichten bleiben vollständig sichtbar (etwa 36,6 bzw. 33,4 CSS-Pixel je Kachel). Nach der letzten Anpassung der stabilen Felsablage wurde das Finale erneut geprüft.

Kein physisches Handy getestet, keine neue menschliche Spiel- oder Hörabnahme. Ob die Änderungen subjektiv ausreichend abwechslungsreich sind, bleibt ausdrücklich offen. Keine neuen Mediengenerierungen; Runway-Projektstand 262 Credits netto.

Die folgenden Abschnitte sind historische Prüfungen früherer Versionen.

---

# Lathmar: Emerald Hollows 0.7.0 – größere Fördergänge

Stand: 18. Oktober 2026. Level 11–20 wurden neu aufgebaut. 11–13 führen die Mechanismen ein; ab 14 verbinden größere Abbaugebiete, verteilte Edelsteine und mehrere Sammelwege die Apparaturen. Hebel und Tore verwenden jetzt die Runway-Motive. Bewegungstempo, Regeln und Miner-Animation bleiben erhalten.

## Umfang und tatsächliche Lösungszeiten

| Level | Raster | Begehbare/abbaubare Zellen | Quote | Geprüfte bekannte Routen |
|---|---|---|---|---|
| 11 | 32 × 22 | 200 | 22 | 19.1–19.1 s |
| 12 | 36 × 26 | 348 | 22 | 21.5–21.5 s |
| 13 | 40 × 27 | 414 | 28 | 27.2–27.2 s |
| 14 | 48 × 30 | 733 | 36 | 19.3–27.3 s |
| 15 | 48 × 32 | 700 | 42 | 32.2–33.9 s |
| 16 | 50 × 32 | 624 | 48 | 25.1–25.7 s |
| 17 | 52 × 34 | 732 | 56 | 47.9–47.9 s |
| 18 | 56 × 34 | 743 | 60 | 31.1–51.0 s |
| 19 | 56 × 36 | 912 | 72 | 52.4–54.0 s |
| 20 | 64 × 40 | 1134 | 84 | 57.8–70.3 s |

Die Zeiten stammen aus deterministischen Eingabefolgen, nicht aus menschlichen Erstversuchen; sie beweisen keine Optimalität. Die ursprüngliche Zielvorstellung von drei bis sechs Minuten für bekannte Routen ist damit **nicht erreicht**. Der größere Inhalt wird ohne künstliche Wartezeiten oder langsameres Bewegungstempo angeboten. Menschliches Feedback zu Orientierung, Routenwahl und Spieldauer steht noch aus.

Level 14 bietet vier Bezirke mit 53 verfügbaren Punkten bei Quote 36. Zwei Bezirke genügen nie, jede Kombination aus drei Bezirken genügt. Level 18 bietet einen kürzeren bewachten Weg und einen längeren sicheren Sammelweg. In 13, 15, 19 und 20 lässt sich die erforderliche Umwandlung eines Kristallkäfers nicht durch zusätzliches Sammeln umgehen. Level 16 verlangt weiterhin das lebendige Einsperren.

## Automatisierte Prüfung

- 156 Vitest-Tests bestanden, einschließlich sämtlicher neuer Kartenrevisionen und zusätzlicher Lösungsrouten.
- Alle 20 Hauptlösungen sowie Alternativen erneut erfolgreich. Kapitel 2 besitzt 19 geprüfte Routen insgesamt; die erfolgreiche Hauptlösung ist dabei jeweils mitgezählt.
- Identische Ergebnisse bei 30/60/144 Render-FPS; zusätzlich neun anfängliche Zeitversätze je Kapitel-2-Karte. Neustart, Fehlwurf und obligatorische Ziele geprüft.
- Lokaler Wrangler/D1-Durchlauf: sämtliche neuen Replays samt Punkten bestätigt. Alte 0.6-Replays bleiben verifizierbar, erscheinen aber nicht in Ranglisten der neuen Karten. Freischaltungen bleiben erhalten.
- Karten und Replays 01–10 unverändert. Keine öffentlichen Testeinträge erzeugt und keine Datenbankeinträge gelöscht. Die neue Kartenprüfsumme trennt die Bestzeiten von 11–20 automatisch.
- Nachweise: `artifacts/expanded-caves-verification.json`, `artifacts/level-verification.json`, `artifacts/api-verification.json`.

## Browserprüfung

Chrome 1280 × 720/DPR 1, Edge 1920 × 1080/DPR 2 und Chrome-Touchemulation 390 × 844/DPR 3 spielten alle zehn neuen Karten vom Menü bis zum erfolgreichen Abschluss ab. Diese systematischen Durchläufe verwendeten sechsfach beschleunigte Replay-Wiedergabe. Die Apparaturen blieben vollständig im Bild. Englisch und Deutsch sowie erhaltene Freischaltungen alter Karten wurden geprüft.

Ein separater Test mit zwei gleichzeitigen CDP-Touchpunkten und Tastatur lief mit normalem Spieltakt: ein gehaltener Hebel gibt genau einen Stein aus, erneutes Drücken einen weiteren; Pause/Neuladen erhält den Vorrat, Neustart stellt ihn wieder her. Auch 844 × 390 im Querformat ohne horizontale Überbreite geprüft. Keine physische Handyprüfung und keine neue menschliche Spiel- oder Hörabnahme.

Die neuen Runway-Grafiken wurden zusätzlich an 13, 14, 15 und 20 in Desktop- und Mobilansicht geprüft; die Apparaturen bleiben vollständig sichtbar. Produktionsbuild und beide ZIP-Pakete bestehen die technische Prüfung. Nach Offline-Neuladen sind alle 20 Level vorhanden; Level 20 wurde bei normalem Takt bis zum erfolgreichen Abschluss abgespielt. Browsernachweis: `artifacts/expanded-browser-verification.json`. Die Veröffentlichung wird zusätzlich unter `release/deployment-verification-v0.7.0.json` dokumentiert.

## Medien

26 neue Runway-Credits netto einschließlich verworfener Freistellungen (2477 → 2451). Projektgesamt **262 / 1.000**, konservativ ohne Erstattungen 271 / 1.000. Herkunft, Prompts und Verwendungen: `artifacts/mechanism-production-v0.7.json`. Die offene Toransicht verwendet dieselben Rahmenstücke wie das geschlossene Tor, damit die Geometrie beim Öffnen stabil bleibt. Die neue separate offene Generierung wurde nicht verwendet.

Die folgenden Abschnitte sind historische Prüfungen früherer Versionen.

---

# Lathmar: Emerald Hollows 0.6.0 – Kapitel 2

Stand: 18. Oktober 2026. Zwanzig spielbare Höhlen; Level 11–20 ergänzen Hebel/Tore, zwei Käferrichtungen, Verschmelzung und dosierte Steinspender. Die Laufanimation A bleibt bei 240 ms pro Pose. Keine neuen Runway-Generierungen.

## Automatisierte Prüfung

- 128 Vitest-Tests bestanden. TypeScript, Produktionsbuild und Worker-Bundle erfolgreich.
- Alle 20 Hauptlösungen sowie Alternativen für 10 und 18 erfolgreich. Neue Replays bei 30/60/144 Render-FPS identisch. Die zehn neuen Lösungen funktionieren zusätzlich mit neun verschiedenen anfänglichen Wartezeiten.
- Regeln prüfen beide Abbiegerichtungen, Fusion vor/nach Bewegung, Mehrfachkontakte, keine doppelte Bewegung oder Punkte, tödlichen Kontakt, atomare Torblockierung, gehaltene Hebel, Vorrat, Ausgabesperre, belegten Auslass und Neustart. Level 15 hat einen geprüften Lösungsweg nach einem Fehlwurf.
- Karten und Replays 01–10 unverändert. Alte Bestzeiten/Freischaltungen bleiben erhalten; ein abgeschlossenes Level 10 öffnet 11.
- Lokaler Wrangler/D1-Test: alle neuen Replays mit Gesamtwertung bestätigt, Wiederherstellung und schrittweise Serverprüfung bestanden. Keine öffentlichen Testprofile oder Ranglisteneinträge erzeugt.
- Verschlüsselte Sicherung in leere SQLite-Datenbank wiederhergestellt; beschädigte Sicherung abgewiesen.

- Produktionsbuild nach Offline-Neuladen: alle 20 Level vorhanden, Level-20-Replay ohne Netzwerk bis zum Abschluss abgespielt; englische Hilfe geprüft.

## Tatsächliche Browserdurchläufe

| Umgebung | Prüfung |
|---|---|
| Chrome, 1280 × 720, DPR 1 | Alle zehn neuen Replays vom Menü bis zum erfolgreichen Abschluss; englische/deutsche Kapitelübersicht; Screenshots aller Karten |
| Edge, 1920 × 1080, DPR 2 | Alle zehn neuen Replays erfolgreich; Apparaturen vollständig im Kamerabild |
| Chrome mit Touch-Emulation, 390 × 844, DPR 3 | Level 15, 19 und 20 erfolgreich; vollständige Apparaturen, etwa 40,5 CSS-Pixel pro Kachel |
| Chrome mit Touch-Emulation, 844 × 390, DPR 3 | Dieselben drei Level erfolgreich; etwa 40,7 CSS-Pixel pro Kachel |
| Zwei gleichzeitige Touchpunkte sowie Tastatur | Gehaltene Kombination gibt einen Stein aus; Loslassen und neuer Druck geben einen weiteren aus. Pausieren/Neuladen erhält den Vorrat, Neustart stellt ihn wieder her |

Sichtprüfung der zehn Chrome-Spielansichten und der mobilen Apparatur erfolgt. Browsernachweis: `artifacts/chapter-two-verification.json`; Skripte unter `tools/browser-chapter-two*.js` und `tools/browser-mechanism-controls.js`. Der paketierte Produktionsbuild wurde zusätzlich nach einem echten Offline-Neuladen über den Service Worker geprüft. Alle 30 Karten waren vorhanden; Level 30 gewann bei normalem Tempo nach 91,0 Sekunden mit 101 Punkten.

Nach dem Offline-Test wurde ausschließlich der zweite Käfer in 16 ergänzt; dessen finale Karte wurde separat erneut geprüft. Der Offline-Test gilt für den unveränderten Ablauf von Level 30.

Screenshots liegen lokal unter `output/playwright/chapter2-*`.

Die Touch-Prüfung verwendet Browseremulation, kein physisches Handy. Eine neue menschliche Spiel- oder Hörabnahme ist nicht erfolgt. Insbesondere das subjektive Verhältnis von Level 12 (vorübergehend umlenken) und 16 (dauerhaft einsperren) bleibt für den Nutzer zu beurteilen. Die kurzen Lösungszeiten sind automatisierte bekannte Routen, keine erwarteten Erstspielzeiten.

Die folgenden Abschnitte dokumentieren frühere Versionen. Die Veröffentlichung von 0.6 erhält einen gesonderten Dateivergleich unter `release/deployment-verification-v0.6.0.json`.

---

# Lathmar: Emerald Hollows 0.5.2 – ausgewählte Laufanimation A

Stand: 18. Oktober 2026. Vom Nutzer ausgewählter Entwurf A für seitliche Laufposen integriert. Links wird jede Rechts-Pose gespiegelt, ohne die Bildfolge umzudrehen. 240 ms pro Pose bleiben erhalten.

- Pixelprüfung: alle vier Rechtsposen entsprechen A, alle vier Linksposen dessen Spiegelung. Vorder-/Rückansicht pixelgleich zum bisherigen Atlas; Hackenanimation bytegleich. Nachweis: `artifacts/miner-selected-verification.json`.
- TypeScript und Produktionsbuild erfolgreich.
- Chrome 1280 × 720: tatsächliche Posenwechsel mit 249/234 ms gemessen; Pause friert die Phase ein. Linksbewegung mit Frames 4–7 geprüft, Spielansicht aufgenommen.
- Keine Level-, Regel-, Server- oder Punkteänderung. Die weitergehenden Prüfungen unten sind frühere Ergebnisse. Keine neue vollständige Geräteprüfung oder Mediengenerierung.

Die Veröffentlichung erhält den Dateivergleich `release/deployment-verification-v0.5.2.json`.

---

# Lathmar: Emerald Hollows 0.5.1 – Prüfbericht

Stand: 18. Oktober 2026. Lauf- und Grabeposen wechseln jetzt alle 240 ms (vier Posen: 0,96 Sekunden). Der Wert 180 ms in 0.5 war eine gestalterische Testeinstellung, kein empirisch ermitteltes Optimum. Die Sichtung des vorhandenen Spritebogens zeigt insbesondere seitlich zu ähnliche Beinposen; 240 ms verbessert die Betrachtungszeit, ersetzt aber keine neu gezeichnete Schrittfolge.

## In 0.5.1 tatsächlich geprüft

- 80 Vitest-Tests bestanden, TypeScript und Produktionsbuild erfolgreich.
- Alle zehn Lösungsreplays und die alternative Felsfallenlösung von Level 10 bestehen; Karten und Spielregeln wurden nicht verändert.
- Chrome 1280 × 720, DPR 1, Entwicklungsbuild: drei Posenwechsel aufgezeichnet, Abstände 233 und 250 ms. Die Abweichung vom Sollwert entsteht durch die Ausgabe in Renderframes. Ein Richtungswechsel wird bei der Messung nicht als zusätzlicher Posenwechsel gezählt.
- Pause hält die Animationsphase an. Skript: `tools/browser-animation-v051.js`.
- README vollständig ins Englische übersetzt. Der 20-Level-Entwurf ist ausdrücklich als noch nicht freigegeben gekennzeichnet.

Kein neuer physischer Mobilgerätetest und keine erneute vollständige Layoutprüfung. Keine Mediengenerierung, keine Serveränderung und keine öffentlichen Testeinsendungen. Die subjektive Beurteilung des langsameren Miners bleibt beim Nutzer. Nach Veröffentlichung dokumentiert `release/deployment-verification-v0.5.1.json` den Vergleich der ausgelieferten Dateien mit dem Site-Commit.

---

# Lathmar: Emerald Hollows 0.5.0 – Prüfbericht

Stand: 18. Oktober 2026. Änderungen betreffen Darstellung, Fußbereich, Hinweisgeber und den Erklärungstext der Rangliste. Level, Regeln, Bewegungstempo und Server bleiben unverändert.

## Automatisiert

- 80 Vitest-Tests bestanden; TypeScript und Produktionsbuild erfolgreich.
- Alle zehn zeitgebundenen Lösungen und die alternative Level-10-Felsfalle bestehen erneut, einschließlich identischer Endzustände bei 30/60/144 Render-FPS.
- Die gespeicherten Karten- und Replay-Prüfsummen bleiben erhalten.
- Die transparente Pseudodrachen-Grafik ist lokal gespeichert und im Offline-Cache enthalten.

## Tatsächlich im Browser geprüft

| Umgebung | Ergebnis |
|---|---|
| Chrome 1280 × 720, DPR 1 | größere Fußschrift, 120-Level-Hinweis, bereinigter Ranglistentext, Drache in Aufgaben- und Hinweisbox, EN/DE erfolgreich |
| Edge 1920 × 1080, DPR 2 | dieselben Prüfungen erfolgreich |
| Chrome-Touchemulation 390 × 844, DPR 3 | keine horizontale Überbreite; lange Hinweise und Schaltflächen erreichbar |
| Chrome-Touchemulation 844 × 390, DPR 3 | lange Box bleibt im sichtbaren Bereich und lässt sich intern zu den Schaltflächen scrollen |
| Reduzierte Bewegung | Drachenbewegung deaktiviert |
| Hinweis geöffnet | Countdown bleibt stehen |
| Miner im Entwicklungsbuild | drei tatsächliche Posenwechsel beobachtet; gemessene Abstände 183/183 ms; Pause hält die Animationsphase an |

Der geplante Abstand pro Pose beträgt 180 ms statt bisher 100 ms. Der vierteilige Zyklus dauert damit 0,72 statt 0,4 Sekunden. Die Spielfigur bewegt sich weiterhin nach dem bisherigen 100-ms-Regeltakt. Die Beobachtung im Entwicklungsbuild erfasst echte Renderer-Aufrufe; ein erster Prüfansatz importierte versehentlich eine andere Vite-Modulinstanz und wurde korrigiert.

Skripte: tools/browser-v05.js und tools/browser-animation-v05.js. Screenshots: output/playwright/v05-*.png. Kompakte Übersicht: artifacts/visual-review-v0.5.webp. Die lange Querformatbox wurde zusätzlich separat geprüft. Eine physische Handyprüfung ist in dieser Version nicht erfolgt.

## Medien und Feedback

Der Pseudodrache ist eine neue Runway-Illustration, angeregt durch die vom Nutzer bereitgestellte Referenz. Ein CSS-Zyklus bewegt das Porträt dezent; es ist keine Folge neu gezeichneter Körperposen. Zwei Bildversuche scheiterten intern. Die erfolgreiche Illustration und Freistellung kosteten netto 21 Credits, laut Kontoständen 2615 → 2594. Projektgesamt: **160 / 1000 Credits**. Prompts, Aufträge und Verarbeitung: artifacts/guide-production-v0.5.json und docs/MEDIEN.md.

Das Komplexitätsniveau von Level 10 wurde vom Nutzer ausdrücklich positiv beurteilt. Der neue Hinweisgeber und die verlangsamte Animation benötigen noch seine gestalterische Rückmeldung.

## Rangliste und Veröffentlichung

Der öffentliche Satz über automatisch erzeugte Lösungen wurde in beiden Sprachen entfernt. Turnstile wurde recherchiert und in docs/RANGLISTENSCHUTZ.md eingeordnet; es ist nicht aktiviert. Keine Servermigration, keine Änderung an Rekorden, keine öffentlichen Testeinsendungen.

Produktionsprüfung und Commitkennungen werden nach Veröffentlichung in release/deployment-verification-v0.5.json festgehalten. Die weitergehenden Prüfungen von 0.4 stehen in PRUEFBERICHT-0.4.md; sie werden hier nicht als neu durchgeführt ausgegeben.
