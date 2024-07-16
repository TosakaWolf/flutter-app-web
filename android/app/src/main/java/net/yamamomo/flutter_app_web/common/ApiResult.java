package net.yamamomo.flutter_app_web.common;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResult<T> implements Serializable {
    private Integer code;

    private T data;

    private String message;

    public ApiResult() {
        this.code = ResultCodeEnum.SUCCESS.getCode();
    }

    public ApiResult(String message) {
        this.message = message;
    }

    public ApiResult(Integer code, String message, T data) {
        this.code = code;
        this.data = data;
        this.message = message;
    }

    public ApiResult(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public ApiResult(IResultCode exceptionEnum) {
        this.code = exceptionEnum.getCode();
        this.message = exceptionEnum.getMessage();
    }

    /**
     * 默认空的成功返回结果
     *
     * @return
     */
    public static ApiResult success() {
        return new ApiResult(ResultCodeEnum.SUCCESS.getCode(), ResultCodeEnum.SUCCESS.getMessage());
    }

    /**
     * 成功返回结果
     *
     * @param data 获取的数据
     */
    public static <T> ApiResult<T> success(T data) {
        return new ApiResult<>(ResultCodeEnum.SUCCESS.getCode(), ResultCodeEnum.SUCCESS.getMessage(), data);
    }

    /**
     * 判断是否成功
     *
     * @return
     */
    public boolean isSuccess() {
        Integer code = this.code;
        return code.equals(ResultCodeEnum.SUCCESS.getCode());
    }

    /**
     * 成功返回结果
     *
     * @param data    获取的数据
     * @param message 提示信息
     */
    public static <T> ApiResult<T> success(T data, String message) {
        return new ApiResult<T>(ResultCodeEnum.SUCCESS.getCode(), message, data);
    }

    /**
     * 失败返回结果
     *
     * @param errorCode 错误码
     */
    public static <T> ApiResult<T> failed(IResultCode errorCode) {
        return new ApiResult<T>(errorCode.getCode(), errorCode.getMessage(), null);
    }

    /**
     * 失败返回结果
     *
     * @param errorCode 错误码
     * @param message   错误信息
     */
    public static <T> ApiResult<T> failed(IResultCode errorCode, String message) {
        return new ApiResult<T>(errorCode.getCode(), message, null);
    }

    /**
     * 失败返回结果
     *
     * @param message 提示信息
     */
    public static <T> ApiResult<T> failed(String message) {
        return new ApiResult<T>(ResultCodeEnum.FAILED.getCode(), message, null);
    }

    /**
     * 失败返回结果
     */
    public static <T> ApiResult<T> failed() {
        return failed(ResultCodeEnum.FAILED);
    }

    /**
     * 参数验证失败返回结果
     */
    public static <T> ApiResult<T> validateFailed() {
        return failed(ResultCodeEnum.VALIDATE_FAILED);
    }

    /**
     * 参数验证失败返回结果
     *
     * @param message 提示信息
     */
    public static <T> ApiResult<T> validateFailed(String message) {
        return new ApiResult<T>(ResultCodeEnum.VALIDATE_FAILED.getCode(), message, null);
    }

    /**
     * 未登录返回结果
     */
    public static <T> ApiResult<T> unauthorized(T data) {
        return new ApiResult<T>(ResultCodeEnum.UNAUTHORIZED.getCode(), ResultCodeEnum.UNAUTHORIZED.getMessage(), data);
    }

    /**
     * 未授权返回结果
     */
    public static <T> ApiResult<T> forbidden(T data) {
        return new ApiResult<T>(ResultCodeEnum.FORBIDDEN.getCode(), ResultCodeEnum.FORBIDDEN.getMessage(), data);
    }


    @Override
    public String toString() {
        return "result{" +
                "code='" + code + '\'' +
                ", data=" + data +
                ", message='" + message + '\'' +
                '}';
    }
}