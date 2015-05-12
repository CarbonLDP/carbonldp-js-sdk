define(["require", "exports", './HTTP', './Utils'], function (require, exports, HTTP, Utils) {
    var Method;
    (function (Method) {
        Method[Method["OPTIONS"] = 0] = "OPTIONS";
        Method[Method["HEAD"] = 1] = "HEAD";
        Method[Method["GET"] = 2] = "GET";
        Method[Method["POST"] = 3] = "POST";
        Method[Method["PUT"] = 4] = "PUT";
        Method[Method["PATCH"] = 5] = "PATCH";
        Method[Method["DELETE"] = 6] = "DELETE";
    })(Method || (Method = {}));
    var defaultRequestOptions = {
        sendCredentialsOnCORS: true
    };
    function sendRequest(method, url, bodyOrOptions, options) {
        if (bodyOrOptions === void 0) { bodyOrOptions = defaultRequestOptions; }
        if (options === void 0) { options = defaultRequestOptions; }
        var body = Utils.isString(bodyOrOptions) ? bodyOrOptions : null;
        options = Utils.isString(bodyOrOptions) ? options : bodyOrOptions;
        return new Promise(function (resolve, reject) {
            var request = options.request ? options.request : new XMLHttpRequest();
            request.open(Method[method], url, true);
            if (options.headers)
                setHeaders(request, options.headers);
            if (options.basic)
                addBasicAuthHeader(request, options.basic);
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
    }
    function setHeaders(request, headers) {
        var names = headers.getAllKeys();
        for (var i = 0, length = names.length; i < length; i++) {
            var name = names[i];
            var value = headers.get(name);
            request.setRequestHeader(name, value.toString());
        }
    }
    function addBasicAuthHeader(request, credentials) {
        var header = new HTTP.Header();
        var authorization = 'Basic ' + atob(credentials.username + ':' + credentials.password);
        header.values.push(new HTTP.HeaderValue(authorization));
        request.setRequestHeader('Authorization', header.toString());
    }
    function onLoad(resolve, reject, request) {
        return function () {
            var response = new HTTP.Response(request);
            if (request.status >= 200 && request.status <= 299)
                resolve(response);
            else
                reject(response);
        };
    }
    function onError(reject, request) {
        return function () {
            var response = new HTTP.Response(request);
            reject(response);
        };
    }
    function options(url, options) {
        if (options === void 0) { options = {}; }
        return sendRequest(Method.OPTIONS, url, options);
    }
    exports.options = options;
    function head(url, options) {
        if (options === void 0) { options = {}; }
        return sendRequest(Method.HEAD, url, options);
    }
    exports.head = head;
    function get(url, options) {
        if (options === void 0) { options = {}; }
        return sendRequest(Method.GET, url, options);
    }
    exports.get = get;
    // TODO: export function post( url:string, fields:HashMap<string, any>, options:RequestOptions = {} )
    function post(url, body, options) {
        if (options === void 0) { options = {}; }
        return sendRequest(Method.POST, url, body, options);
    }
    exports.post = post;
    function put(url, body, options) {
        if (options === void 0) { options = {}; }
        return sendRequest(Method.PUT, url, body, options);
    }
    exports.put = put;
    function patch(url, body, options) {
        if (options === void 0) { options = {}; }
        return sendRequest(Method.PATCH, url, body, options);
    }
    exports.patch = patch;
    function doDelete(url, body, options) {
        if (options === void 0) { options = {}; }
        return sendRequest(Method.DELETE, url, body, options);
    }
    exports.doDelete = doDelete;
});
//# sourceMappingURL=REST.js.map