"use strict";

System.register(["./Errors", "./Header", "./Method", "./Response", "./../Utils"], function (_export, _context) {
    var Errors, Header, Method, Response, Utils, _createClass, Service, Util;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

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
            var response = new Response(request);

            if (request.status >= 200 && request.status <= 299) {
                resolve(response);
            } else {
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
        var response = new Response(request);

        if (response.status >= 400 && response.status < 600) {
            if (Errors.statusCodeMap.has(response.status)) {
                var error = Errors.statusCodeMap.get(response.status);
                reject(new error("", response));
            }
        }

        reject(new Errors.UnknownError("", response));
    }

    return {
        setters: [function (_Errors) {
            Errors = _Errors;
        }, function (_Header) {
            Header = _Header;
        }, function (_Method) {
            Method = _Method.default;
        }, function (_Response) {
            Response = _Response.default;
        }, function (_Utils) {
            Utils = _Utils;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("Service", Service = function () {
                function Service() {
                    _classCallCheck(this, Service);
                }

                _createClass(Service, null, [{
                    key: "send",
                    value: function send(method, url) {
                        var bodyOrOptions = arguments.length <= 2 || arguments[2] === undefined ? Service.defaultOptions : arguments[2];
                        var options = arguments.length <= 3 || arguments[3] === undefined ? Service.defaultOptions : arguments[3];
                        var parser = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];
                        var body = bodyOrOptions && Utils.isString(bodyOrOptions) ? bodyOrOptions : null;
                        options = !bodyOrOptions || Utils.isString(bodyOrOptions) ? options : bodyOrOptions;
                        options = options ? options : {};
                        options = Utils.extend(options, Service.defaultOptions);
                        if (Utils.isNumber(method)) method = Method[method];
                        var requestPromise = new Promise(function (resolve, reject) {
                            var request = options.request ? options.request : new XMLHttpRequest();
                            request.open(method, url, true);
                            if (options.headers) setHeaders(request, options.headers);
                            request.withCredentials = options.sendCredentialsOnCORS;
                            if (options.timeout) request.timeout = options.timeout;
                            request.onload = onLoad(resolve, reject, request);
                            request.onerror = onError(reject, request);

                            if (body) {
                                request.send(body);
                            } else {
                                request.send();
                            }
                        });
                        if (parser === null) return requestPromise;
                        return requestPromise.then(function (response) {
                            return parser.parse(response.data).then(function (parsedBody) {
                                return [parsedBody, response];
                            });
                        });
                    }
                }, {
                    key: "options",
                    value: function options(url) {
                        var _options = arguments.length <= 1 || arguments[1] === undefined ? Service.defaultOptions : arguments[1];

                        return Service.send(Method.OPTIONS, url, _options);
                    }
                }, {
                    key: "head",
                    value: function head(url) {
                        var options = arguments.length <= 1 || arguments[1] === undefined ? Service.defaultOptions : arguments[1];
                        return Service.send(Method.HEAD, url, options);
                    }
                }, {
                    key: "get",
                    value: function get(url) {
                        var options = arguments.length <= 1 || arguments[1] === undefined ? Service.defaultOptions : arguments[1];
                        var parser = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
                        return Service.send(Method.GET, url, null, options, parser);
                    }
                }, {
                    key: "post",
                    value: function post(url) {
                        var bodyOrOptions = arguments.length <= 1 || arguments[1] === undefined ? Service.defaultOptions : arguments[1];
                        var options = arguments.length <= 2 || arguments[2] === undefined ? Service.defaultOptions : arguments[2];
                        var parser = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
                        return Service.send(Method.POST, url, bodyOrOptions, options, parser);
                    }
                }, {
                    key: "put",
                    value: function put(url) {
                        var bodyOrOptions = arguments.length <= 1 || arguments[1] === undefined ? Service.defaultOptions : arguments[1];
                        var options = arguments.length <= 2 || arguments[2] === undefined ? Service.defaultOptions : arguments[2];
                        var parser = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
                        return Service.send(Method.PUT, url, bodyOrOptions, options, parser);
                    }
                }, {
                    key: "patch",
                    value: function patch(url) {
                        var bodyOrOptions = arguments.length <= 1 || arguments[1] === undefined ? Service.defaultOptions : arguments[1];
                        var options = arguments.length <= 2 || arguments[2] === undefined ? Service.defaultOptions : arguments[2];
                        var parser = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
                        return Service.send(Method.PATCH, url, bodyOrOptions, options, parser);
                    }
                }, {
                    key: "delete",
                    value: function _delete(url) {
                        var bodyOrOptions = arguments.length <= 1 || arguments[1] === undefined ? Service.defaultOptions : arguments[1];
                        var options = arguments.length <= 2 || arguments[2] === undefined ? Service.defaultOptions : arguments[2];
                        var parser = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
                        return Service.send(Method.DELETE, url, bodyOrOptions, options, parser);
                    }
                }]);

                return Service;
            }());

            _export("Service", Service);

            Service.defaultOptions = {
                sendCredentialsOnCORS: true
            };

            _export("Util", Util = function () {
                function Util() {
                    _classCallCheck(this, Util);
                }

                _createClass(Util, null, [{
                    key: "setAcceptHeader",
                    value: function setAcceptHeader(accept, requestOptions) {
                        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
                        headers.set("Accept", new Header.Class(accept));
                        return requestOptions;
                    }
                }, {
                    key: "setContentTypeHeader",
                    value: function setContentTypeHeader(contentType, requestOptions) {
                        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
                        headers.set("Content-Type", new Header.Class(contentType));
                        return requestOptions;
                    }
                }, {
                    key: "setIfMatchHeader",
                    value: function setIfMatchHeader(etag, requestOptions) {
                        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
                        headers.set("If-Match", new Header.Class(etag));
                        return requestOptions;
                    }
                }, {
                    key: "setPreferredInteractionModel",
                    value: function setPreferredInteractionModel(interactionModelURI, requestOptions) {
                        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
                        if (!headers.has("Prefer")) headers.set("Prefer", new Header.Class());
                        var prefer = headers.get("Prefer");
                        prefer.values.push(new Header.Value(interactionModelURI + "; rel=interaction-model"));
                        return requestOptions;
                    }
                }, {
                    key: "setSlug",
                    value: function setSlug(slug, requestOptions) {
                        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
                        if (!headers.has("Slug")) headers.set("Slug", new Header.Class());
                        var slugHeader = headers.get("Slug");
                        slugHeader.values.push(new Header.Value(slug));
                        return requestOptions;
                    }
                }]);

                return Util;
            }());

            _export("Util", Util);
        }
    };
});
//# sourceMappingURL=Request.js.map
