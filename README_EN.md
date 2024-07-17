# Flutter-App-Web

---
[中文文档](README.md)
---

## Overview

Develop Flutter interfaces using Vue 3 and embed the Vue 3 frontend offline in Flutter WebView, achieving a fully Vue 3-based frontend within Flutter.

## Features

- Develop Flutter interfaces using Vue 3.

## Development Directory Structure

- Frontend Directory: [web](web)
- Frontend Build Path: [dist](dist)
- Frontend Calls Backend API: [androidApi.js](web/src/android/androidApi.js)
- Frontend Utility for Backend Requests: [androidRequest.js](web/src/utils/androidRequest.js)
- Frontend Receives Backend Calls: [androidCall.js](web/src/android/androidCall.js)
- Mock Backend Calls for Development: [androidMock.js](web/src/android/androidMock.js)

## Build Frontend

Navigate to the frontend directory [web](web) and execute the following command to build:

```sh
vite build --emptyOutDir
