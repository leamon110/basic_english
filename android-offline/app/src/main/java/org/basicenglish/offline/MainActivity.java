package org.basicenglish.offline;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.util.Locale;

public class MainActivity extends Activity {
    private WebView webView;

    private final Handler mainHandler = new Handler(Looper.getMainLooper());
    private final Object ttsLock = new Object();
    private TextToSpeech textToSpeech;
    private volatile boolean ttsReady = false;
    private volatile String ttsStatus = "initializing";
    private volatile int ttsLanguageResult = Integer.MIN_VALUE;
    private volatile String ttsEnginePackage = "unknown";
    private String pendingSpeechText;
    private float pendingSpeechRate = 0.9f;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getWindow().setStatusBarColor(Color.WHITE);
        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);

        initializeTextToSpeech();

        webView = new WebView(this);
        webView.setBackgroundColor(Color.WHITE);
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        settings.setSupportMultipleWindows(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);

        // Expose Android's system TextToSpeech directly to the local learning app.
        // The app content is packaged in assets/www; external links leave this WebView.
        webView.addJavascriptInterface(new AndroidTtsBridge(), "AndroidTTS");

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return openExternal(request.getUrl());
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return openExternal(Uri.parse(url));
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onCreateWindow(WebView view, boolean isDialog,
                                          boolean isUserGesture, Message resultMsg) {
                WebView popup = new WebView(MainActivity.this);
                popup.setWebViewClient(new WebViewClient() {
                    @Override
                    public boolean shouldOverrideUrlLoading(WebView child, WebResourceRequest request) {
                        return openExternal(request.getUrl());
                    }

                    @Override
                    public boolean shouldOverrideUrlLoading(WebView child, String url) {
                        return openExternal(Uri.parse(url));
                    }
                });

                WebView.WebViewTransport transport =
                        (WebView.WebViewTransport) resultMsg.obj;
                transport.setWebView(popup);
                resultMsg.sendToTarget();
                return true;
            }
        });

        WebView.setWebContentsDebuggingEnabled(BuildConfig.DEBUG);
        webView.loadUrl("file:///android_asset/www/index.html");
    }

    private void initializeTextToSpeech() {
        textToSpeech = new TextToSpeech(getApplicationContext(), status ->
                mainHandler.post(() -> finishTextToSpeechInitialization(status)));
    }

    private void finishTextToSpeechInitialization(int status) {
        if (status != TextToSpeech.SUCCESS || textToSpeech == null) {
            ttsReady = false;
            ttsStatus = "initialization-failed:initStatus=" + status;
            return;
        }

        // Prefer US English; fall back to UK English, then generic English.
        ttsEnginePackage = textToSpeech.getDefaultEngine();
        int languageResult = textToSpeech.setLanguage(Locale.US);
        if (languageResult < TextToSpeech.LANG_AVAILABLE) {
            languageResult = textToSpeech.setLanguage(Locale.UK);
        }
        if (languageResult < TextToSpeech.LANG_AVAILABLE) {
            languageResult = textToSpeech.setLanguage(Locale.ENGLISH);
        }

        ttsLanguageResult = languageResult;
        ttsReady = languageResult >= TextToSpeech.LANG_AVAILABLE;
        ttsStatus = ttsReady
                ? "ready:engine=" + ttsEnginePackage + ":languageResult=" + languageResult
                : "english-language-unavailable:engine=" + ttsEnginePackage + ":languageResult=" + languageResult;

        textToSpeech.setOnUtteranceProgressListener(new UtteranceProgressListener() {
            @Override
            public void onStart(String utteranceId) {
                ttsStatus = "speaking";
            }

            @Override
            public void onDone(String utteranceId) {
                ttsStatus = "finished";
            }

            @Override
            public void onError(String utteranceId) {
                ttsStatus = "utterance-error";
            }

            @Override
            public void onError(String utteranceId, int errorCode) {
                ttsStatus = "utterance-error:" + errorCode;
            }
        });

        if (ttsReady) {
            String queuedText;
            float queuedRate;
            synchronized (ttsLock) {
                queuedText = pendingSpeechText;
                queuedRate = pendingSpeechRate;
                pendingSpeechText = null;
            }
            if (queuedText != null) {
                speakWithTextToSpeech(queuedText, queuedRate);
            }
        }
    }

    private void speakWithTextToSpeech(String text, float rate) {
        if (textToSpeech == null || !ttsReady || text == null || text.trim().isEmpty()) {
            return;
        }

        float safeRate = Math.max(0.5f, Math.min(2.0f, rate));
        textToSpeech.setSpeechRate(safeRate);
        int result = textToSpeech.speak(
                text,
                TextToSpeech.QUEUE_FLUSH,
                null,
                "basic-english-" + System.nanoTime()
        );
        if (result == TextToSpeech.ERROR) {
            ttsStatus = "speak-error";
        } else {
            ttsStatus = "queued";
        }
    }

    public final class AndroidTtsBridge {
        @JavascriptInterface
        public boolean isReady() {
            return ttsReady;
        }

        @JavascriptInterface
        public String getStatus() {
            return ttsStatus + ";engine=" + ttsEnginePackage + ";languageResult=" + ttsLanguageResult;
        }

        @JavascriptInterface
        public boolean speak(String text, float rate) {
            if (text == null || text.trim().isEmpty()) {
                return false;
            }
            // If native TTS initialization definitively failed, allow the
            // JavaScript layer to try its browser SpeechSynthesis fallback.
            if (ttsStatus.startsWith("initialization-failed")
                    || ttsStatus.startsWith("english-language-unavailable")) {
                return false;
            }

            // JavaScript bridge calls arrive off the UI thread. Serialize all
            // TextToSpeech operations on Android's main thread.
            mainHandler.post(() -> {
                if (textToSpeech == null || !ttsReady) {
                    synchronized (ttsLock) {
                        pendingSpeechText = text;
                        pendingSpeechRate = rate;
                    }
                    return;
                }
                speakWithTextToSpeech(text, rate);
            });
            return true;
        }
    }

    private boolean openExternal(Uri uri) {
        String scheme = uri.getScheme();
        if (!"http".equalsIgnoreCase(scheme) && !"https".equalsIgnoreCase(scheme)) {
            return false;
        }

        try {
            startActivity(new Intent(Intent.ACTION_VIEW, uri));
        } catch (ActivityNotFoundException ignored) {
            // Keep the current page open if no browser can handle the link.
        }
        return true;
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onDestroy() {
        ttsReady = false;
        if (textToSpeech != null) {
            textToSpeech.stop();
            textToSpeech.shutdown();
            textToSpeech = null;
        }
        if (webView != null) {
            webView.destroy();
            webView = null;
        }
        super.onDestroy();
    }
}
