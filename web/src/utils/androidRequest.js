// 这是个模板
const template = { code: 200, data: undefined, message: '操作成功' }

/**
 * 调用 Android 方法并返回 Promise.
 *
 * @template template
 * @param {string} methodName - 要调用的 Android 方法的名称.
 * @param {...any} args - 传递给 Android 方法的参数.
 * @returns {Promise<template>} 与 Android 方法调用结果一起解析的 Promise.
 */
export function callAndroidMethod(methodName, ...args) {
  return new Promise((resolve, reject) => {
    const callbackName = `${methodName}_callback_${Date.now()}`
    let timeoutId

    // 定义回调函数
    window[callbackName] = (result) => {
      clearTimeout(timeoutId) // 清除超时定时器
      try {
        const parsedResult = JSON.parse(result) // 解析 JSON 字符串
        resolve(parsedResult) // 解析成功，返回结果
      } catch (error) {
        reject(`解析JSON时出错: ${error.message}`) // 解析失败，返回错误信息
      } finally {
        delete window[callbackName] // 无论成功还是失败，都删除回调函数
      }
    }

    if (window.Android && typeof window.Android[methodName] === 'function') {
      window.Android[methodName](callbackName, ...args)

      // 设置超时定时器
      timeoutId = setTimeout(() => {
        delete window[callbackName]
        reject(`调用 ${methodName} 方法超时.`) // 超时，返回错误信息
      }, 5000) // 超时时间设为 5000 毫秒（5 秒）
    } else {
      reject(`Android接口${methodName}不可用.`) // 方法不可用，返回错误信息
    }
  })
}
