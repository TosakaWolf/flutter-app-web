package net.yamamomo.flutter_app_web.utils;

import android.os.Handler;
import android.webkit.WebView;

import com.google.gson.Gson;

import net.yamamomo.flutter_app_web.common.ApiResult;

import org.json.JSONObject;

public class AndroidReplyUtil {

    public static <T> void postApiResult(Handler mainHandler, WebView webView, final String jsFunction, ApiResult<T> result) {
        mainHandler.post(() -> {
            if (webView != null) {
                Gson gson = new Gson();
                String jsonResult = gson.toJson(result);
                String escapedJsonResult = JSONObject.quote(jsonResult);
                String jsCode = "javascript:window." + jsFunction + "(" + escapedJsonResult + ")";
                webView.evaluateJavascript(jsCode, null);
            }
        });
    }


    public static void sendMessageToJs(Handler mainHandler, WebView webView, final String jsFunction, String message) {
        mainHandler.post(() -> {
            if (webView != null) {
                String jsCode = "javascript:window." + jsFunction + "('" + message + "')";
                webView.evaluateJavascript(jsCode, null);
            }
        });
    }

    public static <T> void sendObjectToJs(Handler mainHandler, WebView webView, final String jsFunction, T object) {
        mainHandler.post(() -> {
            if (webView != null) {
                Gson gson = new Gson();
                String jsonResult = gson.toJson(object);
                String escapedJsonResult = JSONObject.quote(jsonResult);
                String jsCode = "javascript:window." + jsFunction + "(" + escapedJsonResult + ")";
                webView.evaluateJavascript(jsCode, null);
            }
        });
    }
}
