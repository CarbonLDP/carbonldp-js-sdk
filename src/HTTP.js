/// <reference path="../typings/es6/es6.d.ts" />
define(["require", "exports", './Utils'], function (require, exports, Utils) {
    var StatusCode;
    (function (StatusCode) {
        StatusCode[StatusCode["CONTINUE"] = 100] = "CONTINUE";
        StatusCode[StatusCode["SWITCHING_PROTOCOLS"] = 101] = "SWITCHING_PROTOCOLS";
        StatusCode[StatusCode["OK"] = 200] = "OK";
        StatusCode[StatusCode["CREATED"] = 201] = "CREATED";
        StatusCode[StatusCode["ACCEPTED"] = 202] = "ACCEPTED";
        StatusCode[StatusCode["NON_AUTHORITATIVE_INFORMATION"] = 203] = "NON_AUTHORITATIVE_INFORMATION";
        StatusCode[StatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
        StatusCode[StatusCode["RESET_CONTENT"] = 205] = "RESET_CONTENT";
        StatusCode[StatusCode["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
        StatusCode[StatusCode["MULTIPLE_CHOICES"] = 300] = "MULTIPLE_CHOICES";
        StatusCode[StatusCode["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
        StatusCode[StatusCode["FOUND"] = 302] = "FOUND";
        StatusCode[StatusCode["SEE_OTHER"] = 303] = "SEE_OTHER";
        StatusCode[StatusCode["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
        StatusCode[StatusCode["USE_PROXY"] = 305] = "USE_PROXY";
        StatusCode[StatusCode["TEMPORARY_REDIRECT"] = 307] = "TEMPORARY_REDIRECT";
        StatusCode[StatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
        StatusCode[StatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
        StatusCode[StatusCode["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
        StatusCode[StatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
        StatusCode[StatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
        StatusCode[StatusCode["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
        StatusCode[StatusCode["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
        StatusCode[StatusCode["PROXY_AUTHENTICATION_REQUIRED"] = 407] = "PROXY_AUTHENTICATION_REQUIRED";
        StatusCode[StatusCode["REQUEST_TIME_OUT"] = 408] = "REQUEST_TIME_OUT";
        StatusCode[StatusCode["CONFLICT"] = 409] = "CONFLICT";
        StatusCode[StatusCode["GONE"] = 410] = "GONE";
        StatusCode[StatusCode["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
        StatusCode[StatusCode["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
        StatusCode[StatusCode["REQUEST_ENTITY_TOO_LARGE"] = 413] = "REQUEST_ENTITY_TOO_LARGE";
        StatusCode[StatusCode["REQUEST_URI_TOO_LARGE"] = 414] = "REQUEST_URI_TOO_LARGE";
        StatusCode[StatusCode["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
        StatusCode[StatusCode["REQUESTED_RANGE_NOT_SATISFIABLE"] = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE";
        StatusCode[StatusCode["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
        StatusCode[StatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
        StatusCode[StatusCode["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
        StatusCode[StatusCode["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
        StatusCode[StatusCode["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
        StatusCode[StatusCode["GATEWAY_TIME_OUT"] = 504] = "GATEWAY_TIME_OUT";
        StatusCode[StatusCode["HTTP_VERSION_NOT_SUPPORTED"] = 505] = "HTTP_VERSION_NOT_SUPPORTED";
    })(StatusCode || (StatusCode = {}));
    exports.StatusCode = StatusCode;
    var HeaderUtil = (function () {
        function HeaderUtil() {
        }
        HeaderUtil.parseHeaders = function (headersString) {
            var headers = new Map();
            var headerStrings = headersString.split('\r\n');
            for (var i = 0, length = headerStrings.length; i < length; i++) {
                var headerString = headerStrings[i];
                if (!headerString.trim())
                    continue;
                var parts = headerString.split(':');
                if (parts.length != 2)
                    throw new Error("ParseException: The header couldn't be parsed.");
                var name = parts[0].trim();
                var header = new Header(parts[1].trim());
                if (headers.has(name)) {
                    var existingHeader = headers.get(name);
                    existingHeader.values.concat(header.values);
                }
                else
                    headers.set(name, header);
            }
            return headers;
        };
        return HeaderUtil;
    })();
    exports.HeaderUtil = HeaderUtil;
    var Header = (function () {
        function Header(valueOrValues) {
            this.values = [];
            if (!valueOrValues)
                return;
            else if (Array.isArray(valueOrValues))
                this.values = valueOrValues;
            else
                this.setValues(valueOrValues);
        }
        Header.prototype.setValues = function (valuesString) {
            this.values = [];
            var valueStrings = valuesString.split(",");
            for (var i = 0, length = valueStrings.length; i < length; i++) {
                var valueString = valueStrings[i];
                var value = new HeaderValue(valueString);
                this.values.push(value);
            }
        };
        Header.prototype.toString = function () {
            return this.values.join(', ');
        };
        return Header;
    })();
    exports.Header = Header;
    var HeaderValue = (function () {
        function HeaderValue(value, mainValue, secondaryKey, secondaryValue) {
            this.mainKey = null;
            this.mainValue = null;
            this.secondaryKey = null;
            this.secondaryValue = null;
            if (mainValue) {
                this.mainKey = value;
                this.mainValue = mainValue;
                this.secondaryKey = secondaryKey;
                this.secondaryValue = secondaryValue;
            }
            else
                this.setValue(value);
        }
        HeaderValue.prototype.setValue = function (value) {
            var parts = value.split(";");
            this.setMain(parts[0]);
            if (parts.length > 1)
                this.setSecondary(parts[1]);
        };
        HeaderValue.prototype.setMain = function (main) {
            var parts = main.split("=");
            if (parts.length === 1)
                this.mainValue = HeaderValue.cleanString(parts[0]);
            else if (parts.length === 2) {
                this.mainKey = HeaderValue.cleanString(parts[0]);
                this.mainValue = HeaderValue.cleanString(parts[1]);
            }
            else
                throw new Error("ParseError: The header value contains multiple ';'");
        };
        HeaderValue.prototype.setSecondary = function (secondary) {
            var parts = secondary.split("=");
            if (parts.length === 1)
                this.secondaryValue = HeaderValue.cleanString(parts[0]);
            else if (parts.length === 2) {
                this.secondaryKey = HeaderValue.cleanString(parts[0]);
                this.secondaryValue = HeaderValue.cleanString(parts[1]);
            }
            else
                throw new Error("ParseError: The header value contains multiple ';'");
        };
        HeaderValue.cleanString = function (toClean) {
            toClean = toClean.trim();
            toClean = (Utils.S.startsWith(toClean, "\"") || Utils.S.startsWith(toClean, "'")) ? toClean.substr(1, toClean.length) : toClean;
            toClean = (Utils.S.endsWith(toClean, "\"") || Utils.S.endsWith(toClean, "'")) ? toClean.substr(0, toClean.length - 1) : toClean;
            return toClean;
        };
        HeaderValue.prototype.toString = function () {
            var result = '';
            if (this.mainKey)
                result += this.mainKey + '=';
            result += this.mainValue;
            if (this.secondaryKey || this.secondaryValue)
                result += '; ';
            if (this.secondaryKey)
                result += this.secondaryKey + '=';
            if (this.secondaryValue)
                result += this.secondaryValue;
            return result;
        };
        return HeaderValue;
    })();
    exports.HeaderValue = HeaderValue;
    var Response = (function () {
        function Response(request) {
            this.status = request.status;
            this.data = request.responseText;
            this.setHeaders(request);
            this.request = request;
        }
        Response.prototype.setHeaders = function (request) {
            var headersString = request.getAllResponseHeaders();
            if (headersString)
                this.headers = HeaderUtil.parseHeaders(headersString);
            else
                this.headers = new Map();
        };
        return Response;
    })();
    exports.Response = Response;
});
//# sourceMappingURL=HTTP.js.map