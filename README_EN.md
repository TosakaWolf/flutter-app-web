# Flutter-App-Web

---
[中文文档](README.md)
---

## Overview

This project uses Vue 3 to develop the Flutter user interface. The Vue 3 front-end is embedded offline into Flutter via Flutter WebView, meaning the entire UI is built using Vue 3.

## Development
For Android development, open the android directory in Android Studio or your preferred Android development tool.

For frontend development, open the web directory in your chosen frontend development environment.

## Development Directory Structure

- **Frontend Directory**: [web](web)
- **Frontend Build Path**: [dist](dist)
- **Frontend Calls Android API**: [androidApi.ts](web/src/android/androidApi.ts)
- **Frontend Utility for Android Requests**: [androidRequest.ts](web/src/utils/androidRequest.ts)
- **Frontend Receives Android Calls**: [androidCall.ts](web/src/android/androidCall.ts)
- **Mock Android Calls for Development**: [androidMock.ts](web/src/android/androidMock.ts)

## Build Frontend

Navigate to the frontend directory [web](web) and run the following command to build:

```sh
vite build --emptyOutDir
```

## Interfaces

Android interfaces are written in WebAppInterface.java.

## Frontend Calling Android Interfaces

With Android Callback
For frontend calls requiring an Android callback, the callbackName must be the first parameter. Subsequent parameters are the interface input parameters, which are optional.

```java
@JavascriptInterface
public void exampleMethod(final String callbackName, String param) {
    executorService.execute(() -> {
        //.... logic
        AndroidReplyUtil.postApiResult(
                mainHandler, webView, callbackName, 
                ApiResult.success("Response Data", "Response Message"));
    });
}
```

Without Android Callback
For frontend calls that do not require an Android callback, the callbackName is not needed. The frontend can directly call window.Android.xxxx.

```java
@JavascriptInterface
public void exampleMethodNoCallback(String param) {
    //...logic
}
```

Android Calling Frontend
To send a text message, use the sendMessageToJs method in AndroidReplyUtil.java.
To send a JSON object, use the sendObjectToJs method in AndroidReplyUtil.java.
This is for reference; better implementations are possible.