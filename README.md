# Flutter-App-Web

---
[English](README_EN.md)
---

## 概述

使用 Vue 3 开发 Flutter 界面，通过 Flutter WebView 离线嵌入 Vue 3 前端，实现 Flutter 嵌入前端 Vue 3，界面完全由 Vue 3 前端开发。

## 功能

- 使用 Vue 3 开发 Flutter 界面

## 开发目录结构

- **前端目录**: [web](web)
- **前端打包路径**: [dist](dist)
- **前端调用安卓 API**: [androidApi.ts](web/src/android/androidApi.ts)
- **前端调用安卓工具**: [androidRequest.ts](web/src/utils/androidRequest.ts)
- **前端接收安卓调用**: [androidCall.ts](web/src/android/androidCall.ts)
- **开发环境模拟调用**: [androidMock.ts](web/src/android/androidMock.ts)

## 编译前端

进入前端目录 [web](web)，执行以下命令进行编译：

```sh
vite build --emptyOutDir
```

## 接口

在[WebAppInterface.java](android%2Fapp%2Fsrc%2Fmain%2Fjava%2Fnet%2Fyamamomo%2Fflutter_app_web%2FWebAppInterface.java)中编写安卓接口

前端调用安卓，需要安卓回调的接口，callbackName作为第一个参数不要调换位置。后面为接口入参，可不传

```java
    @JavascriptInterface
    public void exampleMethod(final String callbackName, String param) {
        executorService.execute(() -> {
            //.... 逻辑
            AndroidReplyUtil.postApiResult(
                    mainHandler, webView, callbackName, 
                    ApiResult.success("响应数据", "响应消息"));
        });
    }
```

前端调用安卓，不需要安卓回调的接口，不需要callbackName。并且在前端可以直接window.Android.xxxx调用

```java
    @JavascriptInterface
    public void exampleMethodNoCallback(String param) {
        //...逻辑
    }
```
安卓调用前端，发送文本消息。使用[AndroidReplyUtil.java](android%2Fapp%2Fsrc%2Fmain%2Fjava%2Fnet%2Fyamamomo%2Fflutter_app_web%2Futils%2FAndroidReplyUtil.java).sendMessageToJs

安卓调用前端，发送json对象。使用[AndroidReplyUtil.java](android%2Fapp%2Fsrc%2Fmain%2Fjava%2Fnet%2Fyamamomo%2Fflutter_app_web%2Futils%2FAndroidReplyUtil.java).sendObjectToJs

仅作参考，有更好的写法。
