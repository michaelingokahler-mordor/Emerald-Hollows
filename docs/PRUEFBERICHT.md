# Lathmar: Emerald Hollows 0.3.0 – Prüfbericht

Stand: 18. Oktober 2026. Zehn spielbare Höhlen mit umschaltbarer englischer/deutscher Oberfläche. Höhlen 06, 07 und 09 wurden ersetzt. Corruption ist im Ausbauplan benannt, aber noch nicht implementiert.

## Automatisierte Prüfung

| Prüfung | Ergebnis |
|---|---|
| TypeScript und Produktionsbuild | bestanden |
| Vitest | 72 Tests bestanden |
| Zeitgebundene Lösungen | 10/10 erfolgreich und erneut abgespielt |
| Replays bei 30, 60 und 144 Render-FPS | identische Simulations-Endzustände |
| Höhle 06 | Erfolg nur mit lebendem, eingeschlossenem Krabbler und Quote; Wiederöffnen des Geheges schließt den Ausgang |
| Höhle 07 | zeitlich abgestimmter Abwurf trifft den Krabbler |
| Höhle 09 | ein Diamant entsteht; Fallobjekt verschwindet; kein zweiter Bewegungsschritt oder sofortiger Punktgewinn |
| Höhle 08 | 18 verfügbare Punkte, Quote 12; unterer und gemischter Sammelweg erfolgreich |
| Alte Rekorde | alle sieben unveränderten Karten behalten ihre Prüfsummen; alte Erfolge öffnen weiterhin Folgehöhlen |
| Alte Offline-Durchläufe | alle drei ersetzten Karten mit archivierten Definitionen erfolgreich verifiziert |
| Sprache | gespeichert; Übersetzungen aller zehn Namen, Untertitel, Hinweise und dynamischer Zähler geprüft |
| Lokale API | neue Durchläufe 06/07/09 bestätigt; alter 06-Durchlauf archiviert, aus aktueller Rangliste ausgeschlossen, bei Wiederherstellung als historischer Erfolg enthalten |

Die API-Prüfung umfasst außerdem Profilanlage, Besitzerprüfung, Wiederholung von Uploads, mehrteilige Verifikation, falsche Eingaben/Endzustände, Ausschluss des Übungsmodus und CORS. Schreibende Tests verwenden ausschließlich eine lokale Wrangler/D1-Datenbank.

Nachweise: `artifacts/level-verification.json`, `artifacts/api-verification.json`, `artifacts/verification-v0.3.json`, `tests/crawlers-and-language.test.ts` sowie die vorhandenen Kern- und Speichertests.

## Tatsächlich ausgeführte Browserprüfung

| Umgebung | Geprüft |
|---|---|
| Chrome, 1280 × 720, DPR 1 | englische Menüs, Credits, alle zehn Lösungen, Sprachwechsel und gespeicherte Auswahl |
| Edge, 1920 × 1080, DPR 2 | dieselben Menüs und alle zehn englischen Lösungen; Sprachwechsel während Pause erhält exakt den Simulationszustand |
| Chrome-Touchemulation, 390 × 844 / 844 × 390, DPR 3 | Zwei-Finger-Graben, Neustart nach Neuladen, neue Aufgabenanzeigen 06/07/09 in beiden Sprachen, Credits, Offline-Neuladen |
| Chrome mit lokaler API | englische Profilanlage, echter Tastaturabschluss im Normal- und Übungsspiel, Upload, Rangliste, Import und Wiederherstellung |

Level 1 wurde per Tastatur in beiden Modi in jeweils 55 Takten abgeschlossen. Übungszeiten überschreiben keine Normalrekorde. Die Pause friert den Countdown ein. Ein explizites Blur-Ereignis pausiert; der Headless-Tabwechsel erzeugte keinen nativen Fokuswechsel. Bei offline geschalteter Verbindung schlägt der Abruf der bewusst nicht gecachten Online-Konfiguration erwartungsgemäß fehl; das Spiel startet trotzdem aus dem Service-Worker-Cache.

Die neuen Höhlen, Credits sowie mobile Hoch- und Querformate wurden anhand der aufgenommenen Bilder gesichtet. Neue Aufgabenanzeigen und Touchfelder überdecken das Spielfeld nicht. Skripte: `tools/browser-v03.js`, `tools/browser-mobile-v03.js`, `tools/browser-online-v03.js`. Screenshots liegen unter `output/playwright/`; eine kompakte Bildübersicht liegt in `artifacts/visual-review-v0.3.webp`.

## Menschliches Feedback und offene Abnahmen

Der Nutzer hat die Grafik positiv beurteilt und bestätigt, dass der öffentliche Touchmodus funktioniert. Gerät und Betriebssystem wurden nicht genannt. Sein Feedback zur Ähnlichkeit von 06/07/09 führte zu den drei verschiedenen Krabbleraufgaben. Die neue Fassung dieser Rätsel braucht noch seinen Spieldurchlauf.

Die Gerätesimulation ersetzt keine gezielte Prüfung auf Android, iPhone oder iPad. Home-Bildschirm-Installation, Safari, Firefox, interaktiver Fensterwechsel, schwächere Hardware und eine menschliche Hörabnahme der zwei Musikstücke sind weiterhin offen. Die Zielrate von 60 FPS ist kein allgemeiner Leistungsnachweis.

## Server, Sicherung und Veröffentlichung

Die bestehende Datenbankstruktur bleibt unverändert. Die Rangliste filtert nach Karten- und Regelversion. Historische Werte werden nicht gelöscht; auch noch wartende 0.2-Ergebnisse bleiben prüfbar. Unveränderte Höhlen behalten ihre Rekorde. Laufende Versuche auf ersetzten Karten starten neu, Freischaltungen bleiben bestehen.

Die täglichen verschlüsselten Sicherungen und der bereits erfolgreich geprüfte Wiederherstellungsweg aus Version 0.2 bleiben bestehen. Deren Nachweise liegen in `artifacts/verification-v0.2.json`; in 0.3 wurde keine produktive D1-Wiederherstellung ausgeführt. Öffentliche Veröffentlichungsprüfung und Commit-/Worker-Kennungen werden separat in `release/deployment-verification-v0.3.json` dokumentiert. Testprofile wurden nicht öffentlich angelegt.

## Medien und Pakete

Es wurden keine neuen Runway-Medien generiert. Der Kristallkrabbler nutzt die vorhandene Animation mit Einfärbung und Diamantmarkierung. Gesamtverbrauch: **139 von höchstens 1.000 Runway-Credits**.

Web-ZIP: Spiel, lokaler Node-Server, Windows-Startdatei und Dokumentation. Quell-ZIP: zusätzlich Quellcode, Tests, Server, Rohmedien und festgeschriebene Abhängigkeiten. Private Schlüssel, Datenbanken und Zugangsdaten sind ausgeschlossen. Dateiprüfungen und SHA-256-Summen liegen unter `release/`. Der öffentliche Spielstart benötigt keine Installation; der lokale Starthelfer benötigt Node.js 24.
