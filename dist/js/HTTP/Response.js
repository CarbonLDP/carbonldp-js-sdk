var Header = require('./Header');
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
            this.headers = Header.Util.parseHeaders(headersString);
        else
            this.headers = new Map();
    };
    return Response;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Response;

//# sourceMappingURL=Response.js.map
