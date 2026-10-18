# Lathmar: Emerald Hollows 0.2.0 – Prüfbericht

Stand: 18. Oktober 2026. Zehn spielbare Höhlen, deutsche Oberfläche, Tastatur und Touchsteuerung. Der Ausbau auf 100 Haupt- und 20 Geheimlevel steht im Entwicklungsplan; diese zusätzlichen Karten und Mechaniken sind noch nicht Teil der Demo.

## Automatisierte Prüfung

| Prüfung | Ergebnis |
|---|---|
| TypeScript, Produktionsbuild | bestanden |
| Vitest | 60 Tests bestanden |
| Zeitgebundene Lösungen | 10/10 erfolgreich und erneut abgespielt |
| Replays bei 30, 60 und 144 Render-FPS | gleicher Simulations-Endzustand für alle zehn Level |
| Alte Spielstände | Migration aus Version 1; keine automatische Übernahme in die öffentliche Rangliste |
| Lokale Sicherung | Prüfsumme, zweite Kopie, Wiederherstellung bei beschädigtem Hauptspeicher |
| Offline-Ergebnisse | Schnellster wartender Durchlauf je Level bleibt auch bei vielen Wiederholungen erhalten |
| Serverprüfung | Alle zehn Lösungen akzeptiert; begrenzte Rechenschritte, falsche Eingaben/Endzustände und Übung abgelehnt |
| API auf lokalem Wrangler/D1 | Profilanlage, Eigentümerprüfung, Wiederherstellung, idempotenter Upload, Rangliste, CORS bestanden |
| Sicherung | Verschlüsseln, Entschlüsseln, Manipulationserkennung und SQLite-Import mit befüllten Beispieldaten bestanden |

Die Mechaniktests prüfen Fallen, Abrollen, Linkspriorität, blockierte Diagonalen, ruhende und fallende Objekte über Figuren, Schieben einschließlich Bewegungssperre im selben Takt, blockierte Schiebeketten, Nebenangraben, Bewegungskonflikte, Gegnerkontakt, Zerquetschen, Quote, Ausgang und Zeitablauf. Level 5 zerquetscht den Krabbler auch im Lösungsnachweis.

| Level | Punkte | Takte | Restzeit |
|---|---:|---:|---|
| 01 – Die erste Schicht | 8 | 36 | vorhanden |
| 02 – Unter Last | 10 | 28 | vorhanden |
| 03 – Platz zum Schieben | 12 | 31 | vorhanden |
| 04 – Die rollende Galerie | 15 | 42 | vorhanden |
| 05 – Der Schieferkrabbler | 12 | 46 | vorhanden |
| 06 – Das Herz der alten Mine | 24 | 64 | vorhanden |
| 07 – Zwei Schächte | 9 | 46 | vorhanden |
| 08 – Der lange Bogen | 12 | 46 | vorhanden |
| 09 – Über dem Abgrund | 15 | 50 | vorhanden |
| 10 – Ein Tor nach Lathmar | 30 | 73 | vorhanden |

Ein Takt dauert 100 ms. Diese Zeiten stammen aus lückenlosen automatischen Eingaben bei bekannter Lösung. Sie sind keine gemessenen Erstspielzeiten und belegen keinen bestimmten Schwierigkeitsgrad. Die neue Demo bewahrt die bisherigen Regeln unter der Kennung `crystal-delve/1`.

Nachweise: `tests/`, `public/replays/`, `artifacts/level-verification.json`, `artifacts/api-verification.json`, `artifacts/backup-verification.json`.

## Browser und Mobilgeräte

Die Browserprüfungen verwenden die lokal installierten Versionen Chrome 155 und Edge 155 im Headless-Modus. Sie laden die echte Anwendung und bedienen DOM, Canvas und Eingaben. V0.1-Nachweise bleiben als historische Dateien erhalten; sie gelten nicht automatisch als erneute Abnahme der neuen Fassung.

| Browser | Fenster / Pixeldichte | Umfang in Version 0.2 |
|---|---|---|
| Chrome | 1280 × 720 / DPR 1 | Name speichern, Freischaltung, Tastatur, Pausieren, exaktes Fortsetzen nach Neuladen, zehn visuelle Lösungsdurchläufe |
| Edge | 1920 × 1080 / DPR 2 | Name speichern, Freischaltung, Tastatur, Fortsetzen, zehn visuelle Lösungsdurchläufe |
| Chrome mit Mobilgeräteemulation | 390 × 844 / DPR 3; 844 × 390 | Zwei-Finger-Graben, separate Touchfläche, Hoch-/Querformat, exaktes Fortsetzen, Offline-Neuladen |

Beim Test wurden eine falsche Kamerazentrierung bei vergrößerter Pixeldichte und ein Cache-Problem mit dem `Vary: Origin`-Header korrigiert. Der Offline-Test lief danach erneut erfolgreich. Die Netzwerkanfrage für die bewusst nicht zwischengespeicherte Online-Konfiguration schlägt offline erwartungsgemäß fehl; die Anwendung startet trotzdem aus dem Cache.

Zusätzlich wurde Level 1 mit echten Tastatureingaben im Normal- und Übungsspiel abgeschlossen (je 55 Takte). Profilanlage, automatischer Upload, bestätigte Ranglistenanzeige, Import einer gültigen und einer beschädigten Sicherung sowie Profilwiederherstellung bestanden gegen die lokale API. Ein künstlich ausgelöstes Blur-Ereignis pausiert; der Headless-Tabwechsel erzeugte keinen nativen Fokuswechsel.

Die More-Projects-Karte und der Spielstart im verschachtelten Website-Pfad wurden im lokalen Produktionspreview geprüft. Grafiken, Replay-Dateien und der auf diesen Spielpfad begrenzte Service Worker wurden korrekt geladen.

Nachweise: `artifacts/verification-v0.2.json`, `artifacts/all-levels-v0.2.webp`, `tools/browser-v02.js`, `tools/browser-mobile.js`, `tools/browser-online-v02.js`, `tools/browser-site.js`, Screenshots unter `output/playwright/`. Dies ist Browseremulation, kein Test auf einem echten Android- oder iOS-Gerät. Safari und Firefox sind noch nicht geprüft.

## Server und Sicherung

Der Worker ist veröffentlicht; Health-Endpunkt und leere öffentliche Rangliste wurden tatsächlich abgerufen. Die schreibenden API-Prüfungen verwenden eine lokale Testdatenbank, damit keine künstlichen Rekorde in der öffentlichen Rangliste erscheinen.

Der erste reale Sicherungslauf im privaten GitHub-Repository wurde erfolgreich abgeschlossen. Sein Archiv wurde entschlüsselt und in eine leere SQLite-Datenbank importiert; die noch neue Produktionsdatenbank enthielt erwartungsgemäß keine Spielerprofile. Zusätzlich prüft der lokale Sicherungstest befüllte Daten. Eine produktive D1-Wiederherstellung oder ein Lasttest wurde nicht durchgeführt.

Freier Workers-Tarif im angemeldeten Konto geprüft. Kosten- und Kontingentgrenzen bleiben Plattformbedingungen. Zukünftige Sicherungen müssen über die Actions-Ergebnisse beobachtet werden. Gültige automatisch gespielte Lösungen sind möglich; die Replay-Prüfung ist kein vollständiger Schutz gegen Bots.

## Medien und Grenzen der Abnahme

Die bestehende Runway-Grafik bleibt erhalten. Neu sind zwei instrumentale Titel mit je 168 Sekunden, ein ruhiger und ein schnellerer. Beide Dateien wurden vollständig mit FFmpeg dekodiert. Das Spiel wechselt die Titel und ergänzt bei nahen Gegnern oder knapper Zeit dezente rhythmische Akzente. Eine menschliche Hörabnahme der neuen Musik und ihrer Übergänge steht noch aus.

| Produktion | Credits |
|---|---:|
| Bisherige Grafik, Effekte und Musik einschließlich Fehlversuchen | 115 |
| Drei neue Musikaufträge einschließlich eines nicht übertragbaren Ergebnisses | 24 |
| **Gesamt** | **139 von höchstens 1.000** |

Rohdateien, Prompts und Auftragskennungen sind dokumentiert. Der fehlgeschlagene Transfer wird nicht als verwendetes Medium ausgegeben. Das Spiel benötigt keine laufenden KI-Aufrufe.

Noch offen: menschliches Spielfeedback zu Rätseln und Bewegungsgefühl, Hörabnahme, echte Mobilgeräte und Home-Bildschirm-Installation, interaktiver Fensterwechsel und Messungen auf leistungsschwächeren Geräten. Die Zielrate von 60 FPS ist kein allgemeiner Leistungsnachweis.

## Pakete

Web-ZIP: fertiges Spiel, lokaler Node-Server, Windows-Startdatei und Dokumentation. Quell-ZIP: zusätzlich Quellcode, Tests, Server, Rohmedien und festgeschriebene Abhängigkeiten. Private Schlüssel, lokale Datenbanken und Zugangsdaten werden ausgeschlossen. Prüfsummen und Paketprüfung liegen unter `release/`. Für das lokale Web-Paket ist Node.js 24 erforderlich; das öffentliche Browserspiel benötigt keine Installation.
