"use strict";
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
            reject(new error("", response));
        }
    }
    reject(new Errors.UnknownError("", response));
}
var Service = (function () {
    function Service() {
    }
    Service.send = function (method, url, bodyOrOptions, optionsOrParser, parser) {
        if (bodyOrOptions === void 0) { bodyOrOptions = Service.defaultOptions; }
        if (optionsOrParser === void 0) { optionsOrParser = Service.defaultOptions; }
        if (parser === void 0) { parser = null; }
        var body = null;
        var options = Utils.hasProperty(optionsOrParser, "parse") ? bodyOrOptions : optionsOrParser;
        parser = Utils.hasProperty(optionsOrParser, "parse") ? optionsOrParser : parser;
        if ((bodyOrOptions instanceof Blob) || Utils.isString(bodyOrOptions)) {
            body = bodyOrOptions;
        }
        else {
            options = bodyOrOptions ? bodyOrOptions : options;
        }
        options = Utils.extend(options || {}, Service.defaultOptions);
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
                return [parsedBody, response];
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
    Service.get = function (url, options, parser) {
        if (options === void 0) { options = Service.defaultOptions; }
        if (parser === void 0) { parser = null; }
        return Service.send(Method_1.default.GET, url, null, options, parser);
    };
    Service.post = function (url, bodyOrOptions, options, parser) {
        if (bodyOrOptions === void 0) { bodyOrOptions = Service.defaultOptions; }
        if (options === void 0) { options = Service.defaultOptions; }
        if (parser === void 0) { parser = null; }
        return Service.send(Method_1.default.POST, url, bodyOrOptions, options, parser);
    };
    Service.put = function (url, bodyOrOptions, options, parser) {
        if (bodyOrOptions === void 0) { bodyOrOptions = Service.defaultOptions; }
        if (options === void 0) { options = Service.defaultOptions; }
        if (parser === void 0) { parser = null; }
        return Service.send(Method_1.default.PUT, url, bodyOrOptions, options, parser);
    };
    Service.patch = function (url, bodyOrOptions, options, parser) {
        if (bodyOrOptions === void 0) { bodyOrOptions = Service.defaultOptions; }
        if (options === void 0) { options = Service.defaultOptions; }
        if (parser === void 0) { parser = null; }
        return Service.send(Method_1.default.PATCH, url, bodyOrOptions, options, parser);
    };
    Service.delete = function (url, bodyOrOptions, optionsOrParser, parser) {
        if (bodyOrOptions === void 0) { bodyOrOptions = Service.defaultOptions; }
        if (optionsOrParser === void 0) { optionsOrParser = Service.defaultOptions; }
        if (parser === void 0) { parser = null; }
        return Service.send(Method_1.default.DELETE, url, bodyOrOptions, optionsOrParser, parser);
    };
    Service.defaultOptions = {
        sendCredentialsOnCORS: true,
    };
    return Service;
}());
exports.Service = Service;
var Util = (function () {
    function Util() {
    }
    Util.getHeader = function (headerName, requestOptions, initialize) {
        if (initialize === void 0) { initialize = false; }
        headerName = headerName.toLowerCase();
        if (initialize) {
            var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
            headers.set(headerName, new Header.Class());
        }
        if (!requestOptions.headers)
            return undefined;
        return requestOptions.headers.get(headerName);
    };
    Util.setAcceptHeader = function (accept, requestOptions) {
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        headers.set("accept", new Header.Class(accept));
        return requestOptions;
    };
    Util.setContentTypeHeader = function (contentType, requestOptions) {
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        headers.set("content-type", new Header.Class(contentType));
        return requestOptions;
    };
    Util.setIfMatchHeader = function (etag, requestOptions) {
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        headers.set("if-match", new Header.Class(etag));
        return requestOptions;
    };
    Util.setPreferredInteractionModel = function (interactionModelURI, requestOptions) {
        var prefer = Util.getHeader("prefer", requestOptions, true);
        prefer.values.push(new Header.Value(interactionModelURI + "; rel=interaction-model"));
        return requestOptions;
    };
    Util.setContainerRetrievalPreferences = function (preferences, requestOptions, returnRepresentation) {
        if (returnRepresentation === void 0) { returnRepresentation = true; }
        var prefer = Util.getHeader("prefer", requestOptions) || Util.getHeader("prefer", requestOptions, true);
        var representation = returnRepresentation ? "return=representation; " : "";
        var keys = ["include", "omit"];
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (key in preferences && preferences[key].length > 0) {
                prefer.values.push(new Header.Value("" + representation + key + "=\"" + preferences[key].join(" ") + "\""));
            }
        }
        return requestOptions;
    };
    Util.setSlug = function (slug, requestOptions) {
        var slugHeader = Util.getHeader("slug", requestOptions, true);
        slugHeader.values.push(new Header.Value(slug));
        return requestOptions;
    };
    return Util;
}());
exports.Util = Util;

//# sourceMappingURL=Request.js.map
