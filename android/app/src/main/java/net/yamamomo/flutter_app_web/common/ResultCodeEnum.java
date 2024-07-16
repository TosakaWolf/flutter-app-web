package net.yamamomo.flutter_app_web.common;

public enum ResultCodeEnum implements IResultCode {
    SUCCESS(200, "操作成功"),
    FAILED(500, "操作失败"),
    SERVICE_UNAVAILABLE(503, "服务器睡着了"),
    VALIDATE_FAILED(400, "参数检验失败"),
    NOT_FOUND(404, "参数检验失败"),
    UNAUTHORIZED(401, "暂未登录或token已经过期"),
    FORBIDDEN(403, "没有相关权限");

    private final Integer code;
    private final String message;

    ResultCodeEnum(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    @Override
    public Integer getCode() {
        return code;
    }

    @Override
    public String getMessage() {
        return message;
    }
}