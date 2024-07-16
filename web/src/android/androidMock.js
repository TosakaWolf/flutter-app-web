// 公共返回对象
function createResponse(data, message) {
  return '{ \"code\": 200, \"data\": \"' + data + '\", \"message\":\"' + (message || '操作成功') + '\" }'
}

(function() {
  if (process.env.NODE_ENV === 'development') {
    if (!window.Android) {
      window.Android = {

        // debug
        showToastBottom: function(msg) {
          console.log('提了个示:' + msg)
        },
        helloWorld: function(func, ...args) {
          window[func](createResponse(true, 'debug : hello world 收到参数' + args.join('、')))
        }
      }
    }
  }
})()
