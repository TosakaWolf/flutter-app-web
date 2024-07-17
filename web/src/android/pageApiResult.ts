/**
 * 分页的接口返回
 */
export interface PageApiResult<item> {
  /**
   * 响应码
   */
  code: number;
  /**
   * 响应分页数据
   */
  data?: item[];
  /**
   * 响应消息提示
   */
  message: string;
}
