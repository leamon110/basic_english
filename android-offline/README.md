# Basic English Offline — Human Word Audio

This Android WebView app packages the Basic English learning site and its 850 word-pronunciation recordings inside the APK.

## Offline behavior

- The learning pages, vocabulary, Chinese translations, exercises, CSS, JavaScript and images are bundled as local app assets.
- All 850 single-word pronunciation buttons play bundled human recordings from Wikimedia Commons / Lingua Libre / Wiktionary.
- Single-word playback does not use Android system TextToSpeech and does not need an installed TTS voice or an internet connection.
- The original recording, speaker or contributor, accent and per-file licence are listed in `audio/CREDITS.md`.
- Multi-word sentence playback retains the existing browser SpeechSynthesis fallback; the 850 vocabulary-word buttons use the local human MP3 files.
- The app opens `file:///android_asset/www/index.html`; learning content and word audio work offline.
- The conversation page's external AI providers still require a network connection and a user-supplied API configuration.
- External web links are opened by the device browser.

## Build

The workflow `.github/workflows/build-human-audio.yml` verifies the source and licence for every word, refuses to build if any of the 850 words is missing, packages the human recordings, builds the APK, and uploads the installable artifact.

The package ID is `org.basicenglish.offline.humanaudio`, with launcher label `Basic English Human Audio`. It is a separate app identity so it can be installed alongside the existing Basic English app.
