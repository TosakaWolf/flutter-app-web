package net.yamamomo.flutter_app_web.common;

public interface IResultCode {
    /**
     * 获取代码
     *
     * @return 错误码
     */
    Integer getCode();

    /**
     * 获取异常消息
     *
     * @return 错误消息
     */
    String getMessage();

}