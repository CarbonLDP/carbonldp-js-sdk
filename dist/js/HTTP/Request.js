/// <reference path="../../typings/es6/es6.d.ts" />
/// <reference path="../../typings/es6-promise/es6-promise.d.ts" />
var Errors = require("./Errors");
var Header = require("./Header");
var Method_1 = require("./Method");
var Response_1 = require("./Response");
var Utils = require("./../Utils");
function setHeaders(request, headers) {
    var namesIterator = headers.keys();
    var next = namesIterator.next();
    while (!next.done) {
        var name_1 = next.value;
        var value = headers.get(name_1);
        request.setRequestHeader(name_1, value.toString());
        next = namesIterator.next();
    }
}
function onLoad(resolve, reject, request) {
    return function () {
        var response = new Response_1.default(request);
        if (request.status >= 200 && request.status <= 299) {
            resolve(response);
        }
        else {
            rejectRequest(reject, request);
        }
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
            var error = Errors.statusCodeMap.get(response.status);
            // TODO: Set error message
            reject(new error("", response));
        }
    }
    reject(new Errors.UnknownError("", response));
}
var Service = (function () {
    function Service() {
    }
    Service.send = function (method, url, bodyOrOptions, options, parser) {
        if (bodyOrOptions === void 0) { bodyOrOptions = Service.defaultOptions; }
        if (options === void 0) { options = Service.defaultOptions; }
        if (parser === void 0) { parser = null; }
        var body = Utils.isString(bodyOrOptions) ? bodyOrOptions : null;
        options = Utils.isString(bodyOrOptions) ? options : bodyOrOptions;
        options = options ? options : Service.defaultOptions;
        if (Utils.isNumber(method))
            method = Method_1.default[method];
        var requestPromise = new Promise(function (resolve, reject) {
            var request = options.request ? options.request : new XMLHttpRequest();
            request.open(method, url, true);
            if (options.headers)
                setHeaders(request, options.headers);
            request.withCredentials = options.sendCredentialsOnCORS;
            if (options.timeout)
                request.timeout = options.timeout;
            request.onload = onLoad(resolve, reject, request);
            request.onerror = onError(reject, request);
            if (body) {
                request.send(body);
            }
            else {
                request.send();
            }
        });
        if (parser === null)
            return requestPromise;
        return requestPromise.then(function (response) {
            return parser.parse(response.data).then(function (parsedBody) {
                return {
                    result: parsedBody,
                    response: response
                };
            });
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
    Service.post = function (url, bodyOrOptions, options, parser) {
        if (bodyOrOptions === void 0) { bodyOrOptions = Service.defaultOptions; }
        if (options === void 0) { options = Service.defaultOptions; }
        if (parser === void 0) { parser = null; }
        return Service.send(Method_1.default.POST, url, bodyOrOptions, options, parser);
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
    Service.setAcceptHeader = function (accept, requestOptions) {
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        headers.set("Accept", new Header.Class(accept));
        return requestOptions;
    };
    // TODO: Move this method to a more specific module
    Service.setPreferredInteractionModel = function (interactionModelURI, requestOptions) {
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        if (!headers.has("Prefer"))
            headers.set("Prefer", new Header.Class());
        var prefer = headers.get("Prefer");
        prefer.values.push(new Header.Value(interactionModelURI + "; rel=interaction-model"));
        return requestOptions;
    };
    Service.defaultOptions = {
        sendCredentialsOnCORS: true
    };
    return Service;
})();
exports.Service = Service;

//# sourceMappingURL=Request.js.map
