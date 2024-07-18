import { callAndroidMethod } from '../utils/androidRequest'
import { DefaultApiResult } from './apiInferfaces'

export function showToastBottom(msg: string): void {
  (window as any).Android.showToastBottom(msg)
}

export function helloWorld(...args: any[]): Promise<DefaultApiResult> {
  return callAndroidMethod('helloWorld', args)
}
