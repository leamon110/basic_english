# Basic English Offline for Android

This is a small Android WebView wrapper that packages the complete static site from `docs/` inside the APK.

## Offline behavior

- The learning pages, word cards, Chinese translations, sentence examples, sentence assembly exercises, dialogues, CSS, JavaScript and images are bundled as local app assets.
- The app opens `file:///android_asset/www/index.html`; it does not need GitHub Pages or a network connection to open the learning content.
- The conversation page's external AI providers still require a network connection and a user-supplied API configuration.
- External web links are opened by the device browser.

## Build

The GitHub Actions workflow `.github/workflows/build-android-offline.yml` copies `docs/` into the Android assets directory, builds a debug APK, and uploads it as an Actions artifact.

The package ID is `org.basicenglish.offline`. This is a new app identity because the signing key for the old PWABuilder Trusted Web Activity package is not available in this repository. The debug APK is installable but is not an update to the old package.
