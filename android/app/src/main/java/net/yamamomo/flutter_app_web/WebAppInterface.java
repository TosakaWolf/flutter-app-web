package net.yamamomo.flutter_app_web;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.view.Gravity;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import net.yamamomo.flutter_app_web.common.ApiResult;
import net.yamamomo.flutter_app_web.utils.AndroidReplyUtil;

import java.util.Arrays;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class WebAppInterface {
    Context context;
    private WebView webView;
    private Handler mainHandler;
    private ExecutorService executorService;

    public WebAppInterface(Context context, WebView webView) {
        this.context = context;
        this.webView = webView;
        this.mainHandler = new Handler(Looper.getMainLooper());
        this.executorService = Executors.newFixedThreadPool(8); // You can adjust the pool size
    }

    @JavascriptInterface
    public void showToastBottom(String toastText) {
        Toast toast = Toast.makeText(context, toastText, Toast.LENGTH_SHORT);
        toast.setGravity(Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL, 0, 0);
        toast.show();
    }

    @JavascriptInterface
    public void helloWorld(final String callbackName, String... args) {
        executorService.execute(() -> {
            AndroidReplyUtil.postApiResult(mainHandler, webView, callbackName, ApiResult.success(true, "hello world 收到参数" + Arrays.toString(args)));
        });
    }


}
