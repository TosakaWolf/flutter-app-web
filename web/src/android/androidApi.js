import { callAndroidMethod } from '@/utils/androidRequest'

export function showToastBottom(msg) {
  window.showToastBottom(msg)
}

export function helloWorld(...args) {
  return callAndroidMethod('helloWorld', args)
}

