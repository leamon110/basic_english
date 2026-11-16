# Basic English Offline for Android

This is a small Android WebView wrapper that packages the complete static site from `docs/` inside the APK.

## Offline behavior

- The learning pages, word cards, Chinese translations, sentence examples, sentence assembly exercises, dialogues, CSS, JavaScript and images are bundled as local app assets.
- The app opens `file:///android_asset/www/index.html`; it does not need GitHub Pages or a network connection to open the learning content.
- Word pronunciation uses Android's native `TextToSpeech` engine through a JavaScript bridge, with browser SpeechSynthesis as a fallback.
- The conversation page's external AI providers still require a network connection and a user-supplied API configuration.
- External web links are opened by the device browser.

## Build

The GitHub Actions workflow `.github/workflows/build-android-offline.yml` copies `docs/` into the Android assets directory, builds a debug APK, and uploads it as an Actions artifact.

The package ID for this voice-fix test build is `org.basicenglish.offline.voicefix`, with the launcher label `Basic English Voice Fix`. It is intentionally a separate app identity so it can be installed alongside the existing `org.basicenglish.offline` app without uninstalling it or risking its local learning data. After the new build is verified, the package identity can be reconciled in a later release.
