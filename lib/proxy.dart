import 'dart:io';
import 'package:permission_handler/permission_handler.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as io;
import 'dart:convert';
import 'package:shelf_router/shelf_router.dart' as shelf_router;
import 'package:shelf_static/shelf_static.dart';
import 'package:logger/logger.dart';
import 'package:flutter/services.dart'; // For rootBundle

var logger = Logger();

Future<void> requestPermissions() async {
  if (Platform.isAndroid) {
    if ((await _isAndroidVersion28OrAbove())) {
      PermissionStatus storageStatus = await Permission.storage.request();
      if (storageStatus.isDenied || storageStatus.isPermanentlyDenied) {
        logger.e('Storage permission denied');
        openAppSettings();
      }
    }

    PermissionStatus manageExternalStorageStatus =
        await Permission.manageExternalStorage.request();
    if (manageExternalStorageStatus.isDenied ||
        manageExternalStorageStatus.isPermanentlyDenied) {
      logger.e("Manage ExternalStorage permission denied");
    }

    // Request internet permissions (Note: INTERNET permission is typically granted by default on Android)
    // Here we're demonstrating ACCESS_NETWORK_STATE which can be useful for network operations
    PermissionStatus networkStatus =
        await Permission.accessMediaLocation.request();
    if (networkStatus.isDenied || networkStatus.isPermanentlyDenied) {
      logger.e('Network permission denied');
    }
    PermissionStatus cameraStatus = await Permission.camera.request();
    if (cameraStatus.isDenied || cameraStatus.isPermanentlyDenied) {
      logger.e('Camera permission denied');
    }
    PermissionStatus microphoneStatus = await Permission.microphone.request();
    if (microphoneStatus.isDenied || microphoneStatus.isPermanentlyDenied) {
      logger.e('Microphone permission denied');
    }
  }
}

Future<void> startWebServer(Directory assetsDirectory) async {
  final staticHandler =
      createStaticHandler(assetsDirectory.path, defaultDocument: 'index.html');
  final router = shelf_router.Router()..all('/<ignored|.*>', staticHandler);

  final server = await io.serve(
    const Pipeline().addMiddleware(logRequests()).addHandler(router.call),
    InternetAddress.loopbackIPv4,
    8080,
  );
  logger.i('Serving at http://${server.address.host}:${server.port}');
}

Future<void> copyAssetsToLocal(
    String webRootBundlePrefix, Directory appDir) async {
  // Ensure the target directory exists
  if (!await appDir.exists()) {
    await appDir.create(recursive: true);
  }
  // Copy all assets
  await copyAssetDirectory(webRootBundlePrefix, appDir.path);
}

Future<void> copyAssetDirectory(String assetPath, String localPath) async {
  final manifestContent = await rootBundle.loadString('AssetManifest.json');
  final Map<String, dynamic> manifestMap = json.decode(manifestContent);
  final List<String> assetPaths = manifestMap.keys
      .where((String key) => key.startsWith(assetPath))
      .toList();
  await deleteDirectory(localPath);
  for (String asset in assetPaths) {
    final filePath = asset.replaceFirst(assetPath, localPath);
    final file = File(filePath);

    final ByteData data = await rootBundle.load(asset);
    final List<int> bytes =
        data.buffer.asUint8List(data.offsetInBytes, data.lengthInBytes);
    if (!await file.parent.exists()) {
      await file.parent.create(recursive: true);
    }
    await file.writeAsBytes(bytes);
  }
}

Future<void> deleteDirectory(String path) async {
  final directory = Directory(path);

  if (await directory.exists()) {
    try {
      await directory.delete(recursive: true);
    } catch (e) {
      logger.e('Failed to delete directory: $e');
    }
  } else {
    logger.e('Directory does not exist: $path');
  }
}

Future<bool> _isAndroidVersion28OrAbove() async {
  // 检查是否是Android 28或更高版本
  int sdkVersion = 0;
  try {
    sdkVersion = int.parse(await _getAndroidSdkVersion());
  } catch (e) {
    logger.e("Failed to get Android SDK version: $e");
  }
  return sdkVersion >= 28;
}

Future<String> _getAndroidSdkVersion() async {
  return Platform.isAndroid
      ? (await Permission.storage.request().isGranted)
          ? "28"
          : "0"
      : "0";
}
