"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BadResponseError_1 = require("./Errors/ServerErrors/BadResponseError");
var Header_1 = require("./Header");
var Response = (function () {
    function Response(request, data, response) {
        var _this = this;
        this.request = request;
        if (typeof XMLHttpRequest !== "undefined" && request instanceof XMLHttpRequest) {
            this.status = request.status;
            this.data = request.responseText;
            this.headers = Header_1.Header.parseHeaders(request.getAllResponseHeaders());
        }
        else {
            this.data = data || "";
            this.headers = new Map();
            if (!response)
                return;
            this.status = response.statusCode;
            Object.keys(response.headers).forEach(function (name) {
                _this.headers.set(name.toLowerCase(), new Header_1.Header(response.headers[name]));
            });
        }
    }
    Response.prototype.getHeader = function (name) {
        name = name.toLowerCase();
        return this.headers.get(name) || null;
    };
    Response.prototype.getETag = function () {
        var eTagHeader = this.getHeader("ETag");
        if (!eTagHeader || !eTagHeader.values.length)
            throw new BadResponseError_1.BadResponseError("The response doesn't contain an ETag", this);
        return eTagHeader.values[0];
    };
    return Response;
}());
exports.Response = Response;

//# sourceMappingURL=Response.js.map
