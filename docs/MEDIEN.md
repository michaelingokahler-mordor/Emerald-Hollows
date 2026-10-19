# Medienherkunft und Produktion

## Ergänzung 0.3

Der Kristallkrabbler nutzt die bestehenden Runway-Krabblerbilder mit blauer Einfärbung und einer kleinen Diamantmarkierung aus dem vorhandenen Atlas. Seine Umwandlung verwendet vorhandene Diamantpartikel und den Diamantklang. Für diese Version wurden keine neuen Medien generiert: Der Verbrauch bleibt bei **139 / 1.000 Runway-Credits**. Vollständige Spielcredits: [CREDITS.md](CREDITS.md).

Alle Spielbilder, acht Geräusche und der Musikentwurf wurden für Crystal Delve über die verbundene Runway-Plattform erzeugt. Keine Originalgrafiken, Musikstücke oder Karten der Inspirationsspiele wurden übernommen.

Die vollständigen verwendeten Prompts und Runway-Auftragskennungen stehen in `artifacts/media-production.json`. Die heruntergeladenen Originaldateien liegen unter `artifacts/raw/`. Das Spiel lädt ausschließlich die daraus aufbereiteten lokalen Dateien in `public/assets/`.

## Grafik

- Ein 4×4-Atlas: Erde, Mauern, Fels, beide Kristalle, geschlossener/offener Ausgang, vier Krabblerbilder und Untergrund.
- Ein 4×4-Forscherbogen: vier Laufrichtungen mit je vier Bildern.
- Ein 4×4-Grabbogen: vier Richtungen mit je vier Grabeposen.
- Eine breite gemalte Höhlenansicht für den Titelbildschirm.

Der erste Atlas diente als Stilreferenz; der Forscher als Referenz für den Grabbogen. Die automatische Runway-Segmentierung erkannte auf den mehrteiligen Spritebögen keine Objekte. Diese fehlgeschlagenen Aufträge wurden dokumentiert. Die finale technische Aufbereitung entfernt deshalb die farblich definierten Hintergründe, schneidet die Rasterzellen aus und vereinheitlicht sie auf 256×256 Pixel. Die Vordergrundillustrationen stammen weiterhin aus Runway. Der Vorgang ist in `tools/prepare-assets.mjs` reproduzierbar.

Ein zusätzlicher Korrekturversuch für die Grabeanimation behielt falsche Blickrichtungen bei und wurde verworfen. Für die finale Animation wird die Rechtsfolge gespiegelt, um eine konsistente Linksfolge zu erhalten. Nach vorne und hinten werden jeweils drei geeignete Originalposen verwendet; die vierte Zelle wiederholt die Ruhepose. Auch dieser verworfene Versuch ist im Verbrauch enthalten und als Rohdatei gesichert.

## Audio

Runway erzeugte MP3-Originale für Graben, Smaragd, Diamant, Schieben, Steinaufprall, Tod, Ausgang und Erfolg sowie ein instrumentales Musikstück. FFmpeg entfernt führende Stille, normalisiert Effekte auf ein Ziel von -20 LUFS und Musik auf -23 LUFS und exportiert Ogg Vorbis. Der Musikübergang erhält eine 1,5-sekündige Überblendung. Im Spiel ist die Musik zusätzlich leiser eingestellt.

Metadaten und Verarbeitung stehen in `artifacts/audio-verification.json`. Dateiprüfung, Dekodierung und Browserwiedergabe sind von einer menschlichen Hörabnahme zu unterscheiden.

## Credits

Verbindliches Produktionslimit: 1.000 Runway-Credits. Die abschließende Bilanz steht im Prüfbericht. Das Spiel selbst verursacht keine Generierungskosten und benötigt keine API-Schlüssel.

Aktueller Stand nach der Geräte-Entwurfsrunde vom 18.10.2026: **236 / 1.000 Credits netto**. Die Runde enthält 56 Credits für zwei ausgewählte und zwei verworfene Bildentwürfe. Ein weiterer fehlgeschlagener Auftrag wurde zunächst mit 8 Credits belastet; der Abgleich des Kontostands ergibt eine Erstattung. Konservativ ohne deren Anrechnung: **244 / 1.000**. Historische Zwischenstände weiter unten bleiben als Produktionsverlauf erhalten. Prompts, Dateien und Bilanz: `artifacts/mechanism-production-01.json`; Vorschau: `artifacts/mechanism-review/index.html`. Die neuen Geräte sind Rohentwürfe und noch nicht in das Spiel integriert.

## Inspirations- und Werkzeugnachweise

Spielidee inspiriert von Emerald Mine und Boulder Dash. Umsetzung als eigenständiges Spiel mit eigenen Regeln und Leveln. Darstellung mit Phaser (MIT-Lizenz), Entwicklung mit TypeScript und Vite. Angaben zu Paketlizenzen bleiben in den npm-Paketen und der Lockdatei nachvollziehbar.

## Ergänzung 0.2 – zwei Musikvarianten

Am 18.10.2026 wurden über Runway drei instrumentale Musikaufträge erstellt. Der erste ruhige Entwurf kostete 8 Credits, ließ sich jedoch trotz Wiederholungen nicht übertragen. Er wird nicht verwendet. Der schnellere Titel und die erfolgreiche Ersatzgenerierung für den ruhigen Titel kosteten jeweils weitere 8 Credits.

- `music-calm.ogg`: ruhiger, tracker-inspirierter Höhlentitel, 168 Sekunden.
- `music-brisk.ogg`: schnellerer Titel für Abwechslung, 168 Sekunden.
- Rohdateien: `artifacts/raw/music-calm.mp3` und `music-brisk.mp3`.
- Verarbeitung: Kürzung auf 168 Sekunden, Normalisierung auf -23 LUFS, eine Sekunde Einblendung, vier Sekunden Ausblendung, Ogg Vorbis Qualitätsstufe 5.
- Nachweis: `artifacts/music-production-v0.2.json`. Beide Ogg-Dateien vollständig dekodiert; menschliche Hörabnahme steht aus.

Die Titel wechseln nach ihrem Ende. Bei nahen Gegnern oder knapper Zeit kommen zurückhaltende rhythmische Akzente aus dem vorhandenen Runway-Steinaufprall hinzu; die Musik wird nicht einfach schneller abgespielt. Hysterese und Überblendung vermeiden dauerndes Umschalten. Das ursprüngliche Musikstück bleibt als historisches Asset erhalten.

Gesamtverbrauch einschließlich aller bisherigen und neuen Fehlversuche: **139 / 1.000 Credits** (115 bisher + 24 neu). PWA-Symbole sind aus dem vorhandenen Runway-Smaragd abgeleitet; dafür entstand kein weiterer Generierungsverbrauch.

## Ergänzung 0.5 – Pseudodrache als Hinweisgeber

Neue Illustration mit grünem Körper und roten Flügelhäuten, nach einer vom Nutzer bereitgestellten visuellen Referenz und dem vorhandenen Titelbild als Stilreferenz. Runway-Aufträge und vollständiger Prompt: artifacts/guide-production-v0.5.json. Zwei intern fehlgeschlagene Versuche erzeugten keine verwendbaren Bilder. Nettoverbrauch für erfolgreiche Illustration und Freistellung: 21 Credits. Neuer Projektstand: **160 / 1.000 Credits**.

Der ausgewählte freigestellte Rohentwurf liegt unter artifacts/raw/pseudodragon-guide-cutout.png. tools/prepare-guide.mjs erzeugt daraus die 512 × 512 große WebP-Datei public/assets/pseudodragon-guide.webp mit erhaltener Transparenz. Ein ruhiger CSS-Zyklus bewegt das vollständige Porträt; reduzierte Bewegung deaktiviert ihn. Es wurden keine zusätzlichen Animationsbilder erzeugt.

## Laufproben nach 0.5.1 – noch keine Spielintegration

Zwei seitliche Laufentwürfe wurden als gemeinsamer 4×2-Spritebogen mit dem vorhandenen Miner als Figurenreferenz über Runway erzeugt. Kosten: 20 Credits, Kontostand 2594 → 2574; **Projektgesamt 180 / 1.000 Credits**. Keine neue Hackenanimation und keine neuen Vorder-/Rückansichten.

- Rohdatei: `artifacts/raw/miner-walk-drafts-01.png`.
- Vollständiger Prompt und Auftragskennung: `artifacts/miner-walk-production-01.json`.
- Aufbereitung: `node tools/prepare-miner-drafts.mjs`; magentafarbenen Hintergrund entfernen, Helmmitten ausrichten, einheitlicher Maßstab pro Folge, vier Bilder pro Entwurf. Keine künstlich nachgezeichneten Beinposen.
- Animierter Vergleich: `artifacts/miner-walk-review/index.html`, nach `npm run dev` unter `/artifacts/miner-walk-review/index.html` erreichbar. Alternativ lässt sich die Datei im vollständigen Checkout direkt im Browser öffnen.
- A ist zurückhaltender; B hebt die Knie stärker. Beide verbessern den Wechsel zwischen weiter und enger Beinsilhouette. Die Kontaktposen 1 und 3 ähneln sich noch deutlich: Es sind Auswahlentwürfe, keine freigegebene endgültige Schrittfolge.
- Browserprüfung mit `tools/browser-miner-review.js`: Bilder geladen, Pause, Einzelbild, Geschwindigkeit, Richtungswechsel, Bewegungsvorschau; 64-Pixel-Darstellung bei Canvasbreite 256; keine horizontale Überbreite bei 390 × 844; reduzierte Bewegung startet pausiert. Screenshots liegen unter `output/playwright/miner-review-*.png`.

Öffentliche Spielgrafiken, Hackenanimation, Bewegungstempo und Replays sind unverändert. Die Auswahl und das subjektive Bewegungsgefühl werden mit dem Nutzer beurteilt; eine neue vollständige Spielprüfung war für diese getrennte Vorschau nicht erforderlich.

## Auswahl und Integration 0.5.2

Der Nutzer hat Entwurf A ausgewählt. Seine vier seitlichen Laufposen werden rechts unverändert und links jeweils gespiegelt verwendet. Die Bilddauer bleibt 240 ms. Vorder- und Rückansicht bleiben aus dem bisherigen Miner-Spritebogen erhalten; die Hackenanimation bleibt bytegleich. Die ursprüngliche Grafik ist zusätzlich als `artifacts/miner-walk-review/original-hero.png` für den Vergleich gesichert.

`tools/prepare-selected-miner.mjs` setzt die ausgewählte Folge in den Spielatlas ein und wird auch am Ende von `npm run assets` aufgerufen. Dabei werden RGBA-Pixel direkt kopiert, sodass transparente Ränder und die bewahrten Ansichten keine Rundungsänderungen durch erneute Alpha-Komposition erhalten. Nachweis: `artifacts/miner-selected-verification.json`. Keine neue Generierung, weiterhin 180 / 1.000 Runway-Credits.

## Kapitel 2 (0.6.0)

Keine zusätzliche Mediengenerierung: weiterhin 180 / 1.000 Runway-Credits. Hebel, Tore, Magazinrahmen und Richtungsmarkierungen werden in Phaser gezeichnet (src/mechanism-view.ts). Die sichtbaren Magazinsteine verwenden die vorhandene Felsgrafik; Blau und Lila verwenden eingefärbte vorhandene Käferbilder mit verschiedenen Winkelmarkierungen. Die Diamantmarkierung kennzeichnet den Kristallkäfer. Schalten, Ausgabe und Fusion verwenden bestehende Push-, Impact- und Diamond-Geräusche. Die ausgewählte Miner-Folge A und die 240 ms pro Pose bleiben unverändert.


## Größere Höhlen und Runway-Mechanismen (0.7.0)

Die vorausgehenden Hebel-/Torentwürfe verbrauchten netto 56 Credits (Projektstand 236). Für Integration, einen offenen Torentwurf und mehrere Freistellversuche kamen netto 26 hinzu: **262 / 1.000 Credits**, konservativ einschließlich erstatteter Versuche 271. Das Konto sank in dieser Integrationsrunde von 2477 auf 2451. Ein zwischenzeitlicher, nicht diesem Projekt zugeordneter Kontoverbrauch wird nicht eingerechnet.

`artifacts/mechanism-production-01.json` dokumentiert die Entwürfe; `artifacts/mechanism-production-v0.7.json` sämtliche Integrationsversuche, Kosten, Prompts und Verwendungen. Verwendet werden der vollständige freigestellte Hebelarm samt Zahnrad und das geschlossene bemalte Holztor. `tools/prepare-mechanisms.mjs` beschneidet und verkleinert sie mit erhaltener Transparenz zu `mechanism-lever.webp` und `mechanism-gate.webp`.

Der Hebel dreht sich um sein Zahnrad. Das geöffnete Tor zeigt ausgeschnittene Randteile desselben Rahmens; so springen Pfosten beim Schalten nicht. Das Magazin verwendet diesen Rahmen und vorhandene Felsgrafiken. Zustandsmarkierungen bleiben als lesbare UI darüber. Der separat generierte offene Torentwurf und unvollständige Freistellungen sind archiviert, aber nicht im Spiel. Keine weitere Musik- oder Miner-Generierung.


## Eigenständige Aufgaben (0.8)

Keine neuen Generierungen. Runway-Hebel, Tore, Miner und übrige Medien bleiben unverändert. Projektstand weiterhin 262 / 1.000 Credits netto (271 konservativ ohne Erstattungen).


## Kapitel 3, Version 0.9

Keine neuen Runway-Generierungen und keine zusätzlichen Credits. Schlösser, Portale und das DW-Tor verwenden die vorhandene Runway-Torgrafik. Die Schlüsselzeichen, Sonnen-/Mondsiegel und Portallichter sind programmatische UI-Overlays in `src/passage-view.ts`; sie sind keine neuen Runway-Bilder. Audio und Mineranimation bleiben unverändert.
