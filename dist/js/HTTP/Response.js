"use strict";

System.register(["./Header"], function (_export, _context) {
    var Header, _createClass, Class, Util;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_Header) {
            Header = _Header;
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

            _export("Class", Class = function () {
                function Class(request) {
                    _classCallCheck(this, Class);

                    this.status = request.status;
                    this.data = request.responseText;
                    this.setHeaders(request);
                    this.request = request;
                }

                _createClass(Class, [{
                    key: "setHeaders",
                    value: function setHeaders(request) {
                        var headersString = request.getAllResponseHeaders();

                        if (headersString) {
                            this.headers = Header.Util.parseHeaders(headersString);
                        } else {
                            this.headers = new Map();
                        }
                    }
                }]);

                return Class;
            }());

            _export("Class", Class);

            _export("Util", Util = function () {
                function Util() {
                    _classCallCheck(this, Util);
                }

                _createClass(Util, null, [{
                    key: "getETag",
                    value: function getETag(response) {
                        if (!response || !response.headers) return null;
                        var etagHeader = response.headers.get("ETag");
                        if (!etagHeader) return null;
                        if (!etagHeader.values.length) return null;
                        if (etagHeader.values.length > 1) console.warn("The response contains more than one ETag. Response: %o", response);
                        return etagHeader.values[0].toString();
                    }
                }]);

                return Util;
            }());

            _export("Util", Util);

            _export("default", Class);
        }
    };
});
//# sourceMappingURL=Response.js.map
