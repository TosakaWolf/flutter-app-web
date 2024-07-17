/**
 * 默认的接口返回
 */
export interface DefaultApiResult {
  /**
   * 响应码
   */
  code: number;
  /**
   * 响应数据
   */
  data?: string | number | boolean;
  /**
   * 响应消息提示
   */
  message: string;
}
