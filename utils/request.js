
// 发起网络请求功能封装

// 基础版本信息
const ENV = wx.getAccountInfoSync().miniProgram.envVersion;

// 环境参数
const urls = {
    develop: 'https://www.snrthn.com/api/dev/', // 开发环境
    trial: 'https://www.snrthn.com/api/stage/', // 体验环境
    release: 'https://www.snrthn.com/api/prod/', // 正式环境
};

// 请求基础路径
const baseUrl = urls[ENV];

/**
 * GET请求
 */
wx.get = function (options = {}) {
    options.method = 'get';
    handleRequest(options);
}

/**
 * POST请求
 */
wx.post = function (options = {}) {
    options.method = 'post';
    handleRequest(options);
}

/**
 * PUT请求
 */
wx.put = function (options = {}) {
    options.method = 'put';
    handleRequest(options);
}

/**
 * DELETE请求
 */
wx.delete = function (options = {}) {
    options.method = 'delete';
    handleRequest(options);
}

/**
 * 文件上传
 */
wx.upload = function (options = {}) {
    options.upload = true;
    options.method = 'post';
    handleRequest(options);
}

/**
 * 请求拦截器
 */
handleRequest.reqInterceptor = function (options = {}) {
    console.log('请求拦截器触发');
    // DO SOMETHING

    return options;
}

/**
 * 发起网络请求
 */
function handleRequest (options = {}) {
    let mySelf = handleRequest;
    let isReqInterceptor = mySelf.reqInterceptor && Object.prototype.toString.call(mySelf.reqInterceptor) === '[object Function]';
    let isResInterceptor = mySelf.resInterceptor && Object.prototype.toString.call(mySelf.resInterceptor) === '[object Function]';
    if (isReqInterceptor) {
        options = mySelf.reqInterceptor(options);
        if (!options) return;
    }

    wx[options.upload ? 'uploadFile' : 'request']({
        url: handleUrlStr(baseUrl, options.url),
        data: options.data,
        header: options.header,
        timeout: options.timeout,
        method: options.method,
        dataType: options.dataType,
        responseType: options.responseType,
        enableHttp2: options.enableHttp2,
        enableQuic: options.enableQuic,
        enableCache: options.enableCache,
        success (result) {
            if (isResInterceptor) {
                let handleResult = mySelf.resInterceptor(result);
                if (handleResult) {
                    options.success(handleResult);
                }
            } else {
                options.success(result);
            }
        },
        fail (error) {
            if (isResInterceptor) {
                let handleErrInfo = mySelf.resInterceptor(error);
                if (handleErrInfo) {
                    options.fail(error);
                }
            } else {
                options.fail(error);
            }
        },
        complete: options.complete
    })
}

/**
 * 响应拦截器
 */
handleRequest.resInterceptor = function (result = {}) {
    console.log('响应拦截器触发');
    // DO SOMETHING

    return result;
}

/**
 * 处理URL字符串
 */
function handleUrlStr (base, path) {
    // 参数为空
    if (!base) base = '';
    if (!path) path = '';

    // 查检 path 是否以 http:// 或 https:// 开头
    if (/^(http:\/\/|https:\/\/)/.test(path)) return path;

    // 踢除 base 中结尾位置可能出现的 / 一个或多个字符
    var base = base.replace(/\/+$/, '');

    // 踢除 path 中起始位置可能出现的 / 一个或多个字符
    var path = path.replace(/^\/+/, '');

    // 组装返回结果
    var retData = base + '/' + path;

    // 截取协议
    var protocol = retData.match(/^(http:\/\/|https:\/\/)/g)[0];

    // 截取并处理请求路径
    var reqPath = retData.split(protocol)[1].replace(/\/+/g, '/');

    // 返回最终结果
    return protocol + reqPath;
}