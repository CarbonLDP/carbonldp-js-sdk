/// <reference path="../../typings/es6/es6.d.ts" />
/// <reference path="../../typings/es6-promise/es6-promise.d.ts" />
var Method_1 = require('./Method');
var Response_1 = require('./Response');
var Errors = require('./Errors');
var Utils = require('./../Utils');
function setHeaders(request, headers) {
    var namesIterator = headers.keys();
    var next = namesIterator.next();
    while (!next.done) {
        var name = next.value;
        var value = headers.get(name);
        request.setRequestHeader(name, value.toString());
        next = namesIterator.next();
    }
}
function onLoad(resolve, reject, request) {
    return function () {
        var response = new Response_1.default(request);
        if (request.status >= 200 && request.status <= 299)
            resolve(response);
        else
            rejectRequest(reject, request);
    };
}
function onError(reject, request) {
    return function () {
        rejectRequest(reject, request);
    };
}
function rejectRequest(reject, request) {
    var response = new Response_1.default(request);
    if (response.status >= 400 && response.status < 600) {
        if (Errors.statusCodeMap.has(response.status)) {
            var e = Errors.statusCodeMap.get(response.status);
            // TODO: Set error message
            reject(new e("", response));
        }
    }
    reject(new Errors.UnknownError("", response));
}
var Service = (function () {
    function Service() {
    }
    Service.send = function (method, url, bodyOrOptions, options) {
        if (bodyOrOptions === void 0) { bodyOrOptions = Service.defaultOptions; }
        if (options === void 0) { options = Service.defaultOptions; }
        var body = Utils.isString(bodyOrOptions) ? bodyOrOptions : null;
        options = Utils.isString(bodyOrOptions) ? options : bodyOrOptions;
        if (Utils.isNumber(method))
            method = Method_1.default[method];
        return new Promise(function (resolve, reject) {
            var request = options.request ? options.request : new XMLHttpRequest();
            request.open(method, url, true);
            if (options.headers)
                setHeaders(request, options.headers);
            request.withCredentials = options.sendCredentialsOnCORS;
            if (options.timeout)
                request.timeout = options.timeout;
            request.onload = onLoad(resolve, reject, request);
            request.onerror = onError(reject, request);
            if (body)
                request.send(body);
            else
                request.send();
        });
    };
    Service.options = function (url, options) {
        if (options === void 0) { options = Service.defaultOptions; }
        return Service.send(Method_1.default.OPTIONS, url, options);
    };
    Service.head = function (url, options) {
        if (options === void 0) { options = Service.defaultOptions; }
        return Service.send(Method_1.default.HEAD, url, options);
    };
    Service.get = function (url, options) {
        if (options === void 0) { options = Service.defaultOptions; }
        return Service.send(Method_1.default.GET, url, options);
    };
    Service.post = function (url, body, options) {
        if (options === void 0) { options = Service.defaultOptions; }
        return Service.send(Method_1.default.POST, url, body, options);
    };
    Service.put = function (url, body, options) {
        if (options === void 0) { options = Service.defaultOptions; }
        return Service.send(Method_1.default.PUT, url, body, options);
    };
    Service.patch = function (url, body, options) {
        if (options === void 0) { options = Service.defaultOptions; }
        return Service.send(Method_1.default.PATCH, url, body, options);
    };
    Service.delete = function (url, body, options) {
        if (options === void 0) { options = Service.defaultOptions; }
        return Service.send(Method_1.default.DELETE, url, body, options);
    };
    Service.defaultOptions = {
        sendCredentialsOnCORS: true
    };
    return Service;
})();
exports.Service = Service;
//@formatter:off
//@formatter:on 
//# sourceMappingURL=Request.js.map