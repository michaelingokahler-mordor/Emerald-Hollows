# Ranglistenschutz – technische Einordnung

Stand: 18. Oktober 2026. Der erklärende Satz zur Unterscheidung menschlicher und automatisierter Lösungen wurde aus der Spieloberfläche entfernt. Die technischen Grenzen werden hier für die Entwicklung festgehalten. Das Entfernen des Satzes ist selbst kein Schutzmechanismus.

## Bereits vorhanden

Der Server prüft Eingaben gegen die genaue Karten- und Regelversion. Nur erfolgreiche Normalspiel-Durchläufe werden gewertet. Gesamtpunkte werden aus dem geprüften Endzustand berechnet. Profilbesitz, Wiederholungen und Anfragelimits werden kontrolliert. Diese Prüfungen erkennen regelwidrige Ergebnisse; eine gültige automatisch berechnete Lösung kann dieselben Eingaben enthalten wie ein menschlicher Lauf.

## Human-Check

Cloudflare Turnstile kann automatisierte Profilanlagen und Rekordeinsendungen erschweren. Das Widget allein reicht nicht: Der Worker muss das Token über Siteverify validieren, einschließlich erwartetem Hostnamen und Zweck. Tokens gelten fünf Minuten und sind nur einmal verwendbar. Deshalb gehört der Check unmittelbar an die Online-Einsendung, nicht an den Beginn eines womöglich längeren Levels. Offline-Ergebnisse bleiben bis zur späteren Übertragung lokal erhalten.

Empfohlene nächste Stufe: Turnstile bei Profilanlage und Rekordversand, ergänzt durch profilbezogene Limits und eine Warteschlange für auffällige Rekorde. Ein Mensch kann einen Check lösen und danach einen Bot verwenden; ein gültiges Token belegt daher keinen von Hand gespielten Lauf. Turnstile ist in Version 0.5 noch nicht aktiviert.

## Auffälligkeiten untersuchen

Sehr viele Rekorde in kurzer Zeit, wiederholt identische Eingabefolgen verschiedener Profile und ungewöhnlich viele nahezu optimale Zeiten können eine manuelle Prüfung auslösen. Das sind Indizien, keine Beweise: Geübte Spieler können legitime optimale Routen spielen. Keine automatische Sperre allein wegen einer schnellen Zeit oder gleichmäßiger Eingaben. Aufzeichnung und Prüfung sollen innerhalb der bestehenden Replay-Daten bleiben; zusätzliches Geräte-Fingerprinting ist dafür nicht erforderlich.

## Primärquellen

- [Cloudflare Turnstile: Überblick](https://developers.cloudflare.com/turnstile/)
- [Serverseitige Validierung, Gültigkeit und Einmalverwendung](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)

Die Kombination mit Replay-Indizien ist eine projektspezifische Empfehlung, keine von Cloudflare garantierte Erkennung von Spielbots.
