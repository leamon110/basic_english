# Basic English Offline for Android

This is a small Android WebView wrapper that packages the static learning site and its 850 human word-pronunciation recordings inside the APK.

## Offline behavior

- The learning pages, vocabulary, Chinese translations, exercises, CSS, JavaScript and images are bundled as local app assets.
- All 850 Basic English word buttons play bundled human recordings from Wikimedia Commons / Lingua Libre. Word playback does not require Android Text-to-Speech or a selected system TTS engine.
- The audio source, speaker, accent and licence for each word are recorded in the bundled audio/credits.json and audio/THIRD_PARTY_AUDIO_CREDITS.md files.
- Multi-word sentence playback may still use the browser's speech synthesis fallback.
- The app opens file:///android_asset/www/index.html; the learning content and word recordings work offline.
- The conversation page's external AI providers still require a network connection and a user-supplied API configuration.

## Build

The build workflow copies docs/ into the Android assets directory, downloads and validates the 850 openly licensed human recordings from Wikimedia Commons / Lingua Libre, converts them to mono MP3, builds the APK, and uploads the installable artifact.

The package ID for this test build is org.basicenglish.offline.realvoice, with launcher label Basic English Real Voice. It is a separate app identity so it can be installed alongside the previous test versions.
