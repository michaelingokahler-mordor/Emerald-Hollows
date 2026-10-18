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
