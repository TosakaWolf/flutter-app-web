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
/**
 * 分页的接口返回
 */
export interface PageApiResult<PageModel> {
  /**
   * 响应码
   */
  code: number;
  /**
   * 响应分页数据
   */
  data?: PageModel;
  /**
   * 响应消息提示
   */
  message: string;
}


/**
 * 分页的接口data
 */
export interface PageModel<item> {
  /**
   * 分页的总个数
   */
  count: number;
  /**
   * 分页的数据列表
   */
  list: item[];
}
