"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = require("./../Utils");
var Errors_1 = require("./Errors");
var Header = require("./Header");
var Method_1 = require("./Method");
var Response_1 = require("./Response");
function forEachHeaders(headers, setHeader) {
    var namesIterator = headers.keys();
    var next = namesIterator.next();
    while (!next.done) {
        var name_1 = next.value;
        var value = headers.get(name_1);
        setHeader(name_1, value.toString());
        next = namesIterator.next();
    }
}
function onResolve(resolve, reject, response) {
    if (response.status >= 200 && response.status <= 299) {
        resolve(response);
    }
    else {
        reject(response);
    }
}
function sendWithBrowser(method, url, body, options) {
    return new Promise(function (resolve, reject) {
        var request = options.request ? options.request : new XMLHttpRequest();
        request.open(method, url, true);
        if (options.headers)
            forEachHeaders(options.headers, function (name, value) { return request.setRequestHeader(name, value); });
        request.withCredentials = options.sendCredentialsOnCORS;
        if (options.timeout)
            request.timeout = options.timeout;
        request.onload = request.onerror = function () {
            var response = new Response_1.default(request);
            onResolve(resolve, reject, response);
        };
        if (body) {
            request.send(body);
        }
        else {
            request.send();
        }
    });
}
function sendWithNode(method, url, body, options) {
    return new Promise(function (resolve, reject) {
        var URL = require("url");
        function returnResponse(request, res) {
            var rawData = [];
            res.on("data", function (chunk) {
                if (typeof chunk === "string")
                    chunk = Buffer.from(chunk, "utf-8");
                rawData.push(chunk);
            }).on("end", function () {
                var data = Buffer.concat(rawData).toString("utf8");
                var response = new Response_1.default(request, data, res);
                onResolve(resolve, reject, response);
            });
        }
        var numberOfRedirects = 0;
        function sendRequestWithRedirect(_url) {
            var parsedURL = URL.parse(_url);
            var HTTP = parsedURL.protocol === "http:" ? require("http") : require("https");
            var requestOptions = {
                protocol: parsedURL.protocol,
                hostname: parsedURL.hostname,
                port: parsedURL.port,
                path: parsedURL.path,
                method: method,
                headers: {},
                withCredentials: options.sendCredentialsOnCORS,
            };
            if (options.headers)
                forEachHeaders(options.headers, function (name, value) { return requestOptions.headers[name] = value; });
            var request = HTTP.request(requestOptions);
            if (options.timeout)
                request.setTimeout(options.timeout);
            request.on("response", function (res) {
                if (res.statusCode >= 300 && res.statusCode <= 399 && "location" in res.headers) {
                    if (++numberOfRedirects < 10)
                        return sendRequestWithRedirect(URL.resolve(_url, res.headers.location));
                }
                returnResponse(request, res);
            });
            request.on("error", function (error) {
                var response = new Response_1.default(request, error.message);
                onResolve(resolve, reject, response);
            });
            request.end(body);
        }
        sendRequestWithRedirect(url);
    });
}
function sendRequest(method, url, body, options) {
    return typeof XMLHttpRequest !== "undefined" ?
        sendWithBrowser(method, url, body, options) :
        sendWithNode(method, url, body, options);
}
function isBody(data) {
    return Utils.isString(data)
        || typeof Blob !== "undefined" && data instanceof Blob
        || typeof Buffer !== "undefined" && data instanceof Buffer;
}
var Service = (function () {
    function Service() {
    }
    Service.send = function (method, url, bodyOrOptions, optionsOrParser, parser) {
        var _this = this;
        if (bodyOrOptions === void 0) { bodyOrOptions = Service.defaultOptions; }
        if (optionsOrParser === void 0) { optionsOrParser = Service.defaultOptions; }
        if (parser === void 0) { parser = null; }
        var body = null;
        var options = Utils.hasProperty(optionsOrParser, "parse") ? bodyOrOptions : optionsOrParser;
        parser = Utils.hasProperty(optionsOrParser, "parse") ? optionsOrParser : parser;
        if (isBody(bodyOrOptions)) {
            body = bodyOrOptions;
        }
        else {
            options = bodyOrOptions ? bodyOrOptions : options;
        }
        options = Utils.extend({}, Service.defaultOptions, options);
        if (Utils.isNumber(method))
            method = Method_1.default[method];
        var requestPromise = sendRequest(method, url, body, options)
            .then(function (response) {
            if (method === "GET" && options.headers)
                return _this._handleGETResponse(url, options, response);
            else
                return response;
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
    Service._handleGETResponse = function (url, requestOptions, response) {
        var _this = this;
        return Promise.resolve()
            .then(function () {
            if (_this._contentTypeIsAccepted(requestOptions, response))
                return response;
            _this._setNoCacheHeaders(requestOptions);
            if (!_this._isChromiumAgent())
                _this._setFalseETag(requestOptions);
            return sendRequest("GET", url, null, requestOptions)
                .then(function (noCachedResponse) {
                if (!_this._contentTypeIsAccepted(requestOptions, response)) {
                    throw new Errors_1.BadResponseError("The server responded with an unacceptable Content-Type", response);
                }
                return noCachedResponse;
            });
        });
    };
    Service._contentTypeIsAccepted = function (requestOptions, response) {
        var accepts = requestOptions.headers.has("accept") ?
            requestOptions.headers.get("accept").values :
            [];
        var contentType = response.headers.has("content-type") ?
            response.headers.get("content-type") :
            null;
        return !contentType || accepts.some(contentType.hasValue, contentType);
    };
    Service._setNoCacheHeaders = function (requestOptions) {
        requestOptions.headers
            .set("pragma", new Header.Class("no-cache"))
            .set("cache-control", new Header.Class("no-cache, max-age=0"));
    };
    Service._isChromiumAgent = function () {
        return typeof window !== "undefined" && !window["chrome"];
    };
    Service._setFalseETag = function (requestOptions) {
        requestOptions.headers.set("if-none-match", new Header.Class(""));
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
            if (!headers.has(headerName))
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
    Util.setIfMatchHeader = function (eTag, requestOptions) {
        if (!eTag)
            return;
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        headers.set("if-match", new Header.Class(eTag));
        return requestOptions;
    };
    Util.setIfNoneMatchHeader = function (eTag, requestOptions) {
        if (!eTag)
            return;
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        headers.set("if-none-match", new Header.Class(eTag));
        return requestOptions;
    };
    Util.setPreferredInteractionModel = function (interactionModelURI, requestOptions) {
        var prefer = Util.getHeader("prefer", requestOptions, true);
        prefer.values.push(interactionModelURI + "; rel=interaction-model");
        return requestOptions;
    };
    Util.setPreferredRetrieval = function (retrievalType, requestOptions) {
        var prefer = Util.getHeader("prefer", requestOptions, true);
        prefer.values.push("return=" + retrievalType);
        return requestOptions;
    };
    Util.setRetrievalPreferences = function (preferences, requestOptions, returnRepresentation) {
        if (returnRepresentation === void 0) { returnRepresentation = true; }
        var prefer = Util.getHeader("prefer", requestOptions, true);
        var representation = returnRepresentation ? "return=representation; " : "";
        var keys = ["include", "omit"];
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (key in preferences && preferences[key].length > 0) {
                prefer.values.push("" + representation + key + "=\"" + preferences[key].join(" ") + "\"");
            }
        }
        return requestOptions;
    };
    Util.setSlug = function (slug, requestOptions) {
        var slugHeader = Util.getHeader("slug", requestOptions, true);
        slugHeader.values.push(slug);
        return requestOptions;
    };
    Util.isOptions = function (object) {
        return Utils.hasPropertyDefined(object, "headers")
            || Utils.hasPropertyDefined(object, "sendCredentialsOnCORS")
            || Utils.hasPropertyDefined(object, "timeout")
            || Utils.hasPropertyDefined(object, "request");
    };
    Util.cloneOptions = function (options) {
        var clone = __assign({}, options, { headers: new Map() });
        if (options.headers)
            options.headers
                .forEach(function (value, key) { return clone.headers.set(key, new Header.Class(value.values.slice())); });
        return clone;
    };
    return Util;
}());
exports.Util = Util;

//# sourceMappingURL=Request.js.map
