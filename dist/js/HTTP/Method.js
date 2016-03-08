System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Method;
    return {
        setters:[],
        execute: function() {
            (function (Method) {
                Method[Method["OPTIONS"] = 0] = "OPTIONS";
                Method[Method["HEAD"] = 1] = "HEAD";
                Method[Method["GET"] = 2] = "GET";
                Method[Method["POST"] = 3] = "POST";
                Method[Method["PUT"] = 4] = "PUT";
                Method[Method["PATCH"] = 5] = "PATCH";
                Method[Method["DELETE"] = 6] = "DELETE";
            })(Method || (Method = {}));
            exports_1("default",Method);
        }
    }
});

//# sourceMappingURL=Method.js.map
