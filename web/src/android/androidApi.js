import { callAndroidMethod } from '@/utils/androidRequest'

export function showToastBottom(msg) {
  window.Android.showToastBottom(msg)
}

export function helloWorld(...args) {
  return callAndroidMethod('helloWorld', args)
}

