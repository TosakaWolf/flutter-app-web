import { callAndroidMethod } from '../utils/androidRequest'
import { DefaultApiResult } from './defaultApiResult'

export function showToastBottom(msg: string): void {
  (window as any).showToastBottom(msg)
}

export function helloWorld(...args: any[]): Promise<DefaultApiResult> {
  return callAndroidMethod('helloWorld', args)
}
