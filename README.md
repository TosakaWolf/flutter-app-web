# Flutter-App-Web

---
[English](README_EN.md)
---

## 概述

使用 Vue 3 开发 Flutter 界面，通过 Flutter WebView 离线嵌入 Vue 3 前端，实现 Flutter 嵌入前端 Vue 3，界面完全由 Vue 3 前端开发。

## 功能

- 使用 Vue 3 开发 Flutter 界面。

## 开发目录结构

- 前端目录：[web](web)
- 前端打包路径：[dist](dist)
- 前端调用后端 API：[androidApi.js](web/src/android/androidApi.js)
- 前端调用后端工具：[androidRequest.js](web/src/utils/androidRequest.js)
- 前端接收后端调用：[androidCall.js](web/src/android/androidCall.js)
- 开发环境模拟调用：[androidMock.js](web/src/android/androidMock.js)

## 编译前端

进入前端目录 [web](web)，执行以下命令进行编译：

```sh
vite build --emptyOutDir
