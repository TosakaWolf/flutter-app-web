package net.yamamomo.flutter_app_web;

import android.annotation.SuppressLint;
import android.util.Log;
import android.view.View;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.annotation.NonNull;

import io.flutter.embedding.android.FlutterActivity;
import io.flutter.embedding.engine.FlutterEngine;
import io.flutter.plugin.common.MethodChannel;

public class MainActivity extends FlutterActivity {
    private static final String CHANNEL = "webReadyChannel";
    private static final String TAG = "MainActivity";
    private WebView webView;
    private WebAppInterface webAppInterface;


    @SuppressLint({"JavascriptInterface", "SetJavaScriptEnabled"})
    @Override
    public void configureFlutterEngine(@NonNull FlutterEngine flutterEngine) {
        super.configureFlutterEngine(flutterEngine);
        new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), CHANNEL)
                .setMethodCallHandler(
                        (call, result) -> {
                            if (call.method.equals("serverStarted")) {
                                Log.i(TAG, "configureFlutterEngine:serverStarted ");
                                runOnUiThread(() -> {
                                    webView = new WebView(this);
                                    webAppInterface = new WebAppInterface(this, webView);
                                    setContentView(webView);
                                    webView.clearCache(true);
                                    webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
                                    webView.setWebChromeClient(new WebChromeClient() {
                                        @Override
                                        public void onPermissionRequest(final PermissionRequest request) {
                                            request.grant(request.getResources());
                                        }
                                    });
                                    WebSettings webSettings = webView.getSettings();
                                    webSettings.setJavaScriptEnabled(true);
                                    webSettings.setDomStorageEnabled(true);
                                    webSettings.setMediaPlaybackRequiresUserGesture(false);
                                    webView.addJavascriptInterface(webAppInterface, "Android");
                                    webView.loadUrl("http://localhost:8080");
                                });
                                result.success(null);
                            } else if (call.method.equals("sysBack")) {
                                runOnUiThread(() -> {
                                    if (webView != null) {
                                        String jsCode = "javascript:window.sysBack()";
                                        webView.evaluateJavascript(jsCode, null);
                                    }
                                });
                                result.success(null);
                            } else {
                                result.notImplemented();
                            }
                        }
                );
    }
}
