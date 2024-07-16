import 'dart:io';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:path_provider/path_provider.dart';
import 'package:flutter/services.dart'; // For rootBundle
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:logger/logger.dart';
import 'proxy.dart';
// import 'package:flutter_inappwebview/flutter_inappwebview.dart';

const platform = MethodChannel('webReadyChannel');

const webDistDir = "dist";

var logger = Logger();
// 前端已代理
var init = false;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  FlutterNativeSplash.preserve(
      widgetsBinding: WidgetsFlutterBinding.ensureInitialized());
  // 设置全屏
  SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
  // 不申请权限也可以启动
  await requestPermissions();
  final appRoot = await getApplicationDocumentsDirectory();
  // 前端路径默认dist
  final appDir = Directory('${appRoot.path}/$webDistDir');
  await copyAssetsToLocal(webDistDir, appDir);
  startWebServer(appDir);
  FlutterNativeSplash.remove();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: WebViewExample(),
    );
  }
}

class WebViewExample extends StatefulWidget {
  const WebViewExample({super.key});

  @override
  WebViewExampleState createState() => WebViewExampleState();
}

class WebViewExampleState extends State<WebViewExample> {
  late WebViewController _controller;

  @override
  void initState() {
    super.initState();
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      // ..addJavaScriptChannel(
      //   'Flutter',
      //   onMessageReceived: (message) async {
      //     // Handle JavaScript messages here
      //   },
      // )
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) async {
            if (progress == 100) {
              if (!init) {
                init = true;
                logger.i("send serverStarted to java");
                await platform.invokeMethod('serverStarted');
              }
            }
          },
        ),
      )
      ..loadRequest(Uri.parse('about:blank'));
  }

  Future<bool> _onWillPop() async {
    // if (await _controller.canGoBack()) {
    //   _controller.goBack();
    // }
    sysBack();
    return Future.value(false);
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
        onWillPop: _onWillPop,
        child: Scaffold(
          body: WebViewWidget(controller: _controller),
        ));
  }

  Future<void> sysBack() async {
    await platform.invokeMethod('sysBack');
    //当前页面不是业务界面导致无法执行
    // _controller.runJavaScript("javascript:window.sysBack();");
  }
//
// InAppWebViewController? webViewController;
//
// @override
// Widget build(BuildContext context) {
//   return Scaffold(
//     // appBar: AppBar(title: Text("WebView Example")),
//     body: Container(
//       // padding: EdgeInsets.all(8.0),
//       child: Column(
//         children: [
//           Expanded(
//             child: InAppWebView(
//               initialUrlRequest: URLRequest(url: WebUri('about:blank')),
//               initialSettings: InAppWebViewSettings(
//                 useOnDownloadStart: true,
//                 javaScriptEnabled: true,
//                 cacheEnabled: true,
//                 supportZoom: true,
//                 useHybridComposition: true,
//                 builtInZoomControls: true,
//                 displayZoomControls: false,
//                 allowsInlineMediaPlayback: true,
//               ),
//               onWebViewCreated: (controller) {
//                 webViewController = controller;
//               },
//               // onLoadStart: (controller, url) {
//               //   print("Started $url");
//               // },
//               // onLoadStop: (controller, url) async {
//               //   print("Stopped $url");
//               // },
//               onProgressChanged: (controller, progress) async {
//                 if (progress == 100) {
//                   if (count == 0) {
//                     count++;
//                     logger.i("send serverStarted to java");
//                     await platform.invokeMethod('serverStarted');
//                   }
//                 }
//               },
//             ),
//           ),
//         ],
//       ),
//     ),
//   );
// }
}
