
// 这是个模板
interface Template {
  code: number;
  data?: any;
  message: string;
}

/**
 * 调用 Android 方法并返回 Promise.
 *
 * @template Template
 * @param {string} methodName - 要调用的 Android 方法的名称.
 * @param {...AndroidMethodArgs} args - 传递给 Android 方法的参数.
 * @returns {Promise<Template>} 与 Android 方法调用结果一起解析的 Promise.
 */
export function callAndroidMethod(methodName: string, ...args: any[]): Promise<Template> {
  return new Promise((resolve, reject) => {
    const callbackName = `${methodName}_callback_${Date.now()}`
    let timeoutId: number;

    // 定义回调函数
    (window as any)[callbackName] = (result: string) => {
      clearTimeout(timeoutId) // 清除超时定时器
      try {
        const parsedResult: Template = JSON.parse(result) // 解析 JSON 字符串
        resolve(parsedResult) // 解析成功，返回结果
      } catch (error: unknown) {
        if (error instanceof Error) {
          reject(`解析JSON时出错: ${error.message}`) // 解析失败，返回错误信息
        } else {
          reject('解析JSON时出错') // 解析失败，返回错误信息
        }
      } finally {
        delete (window as any)[callbackName] // 无论成功还是失败，都删除回调函数
      }
    }

    if ((window as any).Android && typeof (window as any).Android[methodName] === 'function') {
      (window as any).Android[methodName](callbackName, ...args)

      // 设置超时定时器
      timeoutId = window.setTimeout(() => {
        delete (window as any)[callbackName]
        reject(`调用 ${methodName} 方法超时.`) // 超时，返回错误信息
      }, 5000) // 超时时间设为 5000 毫秒（5 秒）
    } else {
      reject(`Android接口${methodName}不可用.`) // 方法不可用，返回错误信息
    }
  })
}

