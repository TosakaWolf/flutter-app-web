import { showNotify } from '@nutui/nutui'

// 公共返回对象
function createResponse(data: any, message: string) {
  return JSON.stringify({
    code: 200,
    data: data,
    message: message || '操作成功'
  })
}

export async function mockAndroid() {
  if (process.env.NODE_ENV === 'development') {
    if (typeof window !== 'undefined' && !(window as any).Android) {
      (window as any).Android = {

        // debug
        showToastBottom: function(msg: string): void {
          showNotify.success('debug: 提了个示:' + msg)
        },
        helloWorld: function(func: string, ...args: any[]): void {
          (window as any)[func](createResponse(true, 'debug: 收到参数' + args.join('、')))
        }
      }
    }
  }
}
