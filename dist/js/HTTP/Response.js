System.register(["./Header"], function(exports_1) {
    var Header;
    var Class, Util;
    return {
        setters:[
            function (Header_1) {
                Header = Header_1;
            }],
        execute: function() {
            Class = (function () {
                function Class(request) {
                    this.status = request.status;
                    this.data = request.responseText;
                    this.setHeaders(request);
                    this.request = request;
                }
                Class.prototype.setHeaders = function (request) {
                    var headersString = request.getAllResponseHeaders();
                    if (headersString) {
                        this.headers = Header.Util.parseHeaders(headersString);
                    }
                    else {
                        this.headers = new Map();
                    }
                };
                return Class;
            })();
            exports_1("Class", Class);
            Util = (function () {
                function Util() {
                }
                Util.getETag = function (response) {
                    if (!response || !response.headers)
                        return null;
                    var etagHeader = response.headers.get("ETag");
                    if (!etagHeader)
                        return null;
                    if (!etagHeader.values.length)
                        return null;
                    if (etagHeader.values.length > 1)
                        console.warn("The response contains more than one ETag. Response: %o", response);
                    return etagHeader.values[0].toString();
                };
                return Util;
            })();
            exports_1("Util", Util);
            exports_1("default",Class);
        }
    }
});

//# sourceMappingURL=Response.js.map
