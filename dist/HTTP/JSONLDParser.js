"use strict";
var jsonld = require("jsonld");
var JSONParser_1 = require("./JSONParser");
var HTTP = require("./../HTTP");
var RDF = require("./../RDF");
var Utils = require("./../Utils");
var MAX_CTX_URLS = 10;
var LINK_HEADER_REL = "http://www.w3.org/ns/json-ld#context";
function _getTargetFromLinkHeader(header) {
    var rLinkHeader = /\s*<([^>]*?)>\s*(?:;\s*(.*))?/;
    for (var _i = 0, _a = header.values; _i < _a.length; _i++) {
        var value = _a[_i];
        var match = value.toString().match(rLinkHeader);
        if (!match)
            continue;
        var target = match[1];
        var params = match[2];
        var rParams = /(.*?)=(?:(?:"([^"]*?)")|([^"]*?))\s*(?:(?:;\s*)|$)/g;
        var result = {};
        while (true) {
            match = rParams.exec(params);
            if (!match)
                break;
            result[match[1]] = (match[2] === undefined) ? match[3] : match[2];
        }
        if (result["rel"] === LINK_HEADER_REL)
            return target;
    }
    return null;
}
function _findContextURLs(input, contexts, base, replace) {
    if (replace === void 0) { replace = false; }
    var previousContexts = Object.keys(contexts).length;
    if (Utils.isArray(input)) {
        for (var _i = 0, _a = input; _i < _a.length; _i++) {
            var element = _a[_i];
            _findContextURLs(element, contexts, base);
        }
    }
    else if (Utils.isPlainObject(input)) {
        for (var key in input) {
            if ("@context" !== key) {
                _findContextURLs(input[key], contexts, base);
                continue;
            }
            var urlOrArrayOrContext = input[key];
            if (Utils.isArray(urlOrArrayOrContext)) {
                var contextArray = urlOrArrayOrContext;
                for (var index = 0, length_1 = contextArray.length; index < length_1; ++index) {
                    var urlOrContext = contextArray[index];
                    if (!Utils.isString(urlOrContext))
                        continue;
                    var url = urlOrContext;
                    url = RDF.URI.Util.resolve(base, url);
                    if (replace) {
                        if (Utils.isArray(contexts[url])) {
                            Array.prototype.splice.apply(contextArray, [index, 1].concat(contexts[url]));
                            index += contexts[url].length - 1;
                            length_1 = contextArray.length;
                        }
                        else {
                            contextArray[index] = contexts[url];
                        }
                    }
                    else if (!(url in contexts)) {
                        contexts[url] = true;
                    }
                }
            }
            else if (Utils.isString(urlOrArrayOrContext)) {
                var url = urlOrArrayOrContext;
                url = RDF.URI.Util.resolve(base, url);
                if (replace) {
                    input[key] = contexts[url];
                }
                else if (!(url in contexts)) {
                    contexts[url] = null;
                }
            }
        }
    }
    return previousContexts < Object.keys(contexts).length;
}
function _retrieveContexts(input, contextsRequested, base) {
    if (Object.keys(contextsRequested).length > MAX_CTX_URLS)
        throw new Error("Maximum number of @context URLs exceeded.");
    var contextToResolved = Object.create(null);
    if (!_findContextURLs(input, contextToResolved, base))
        return;
    function resolved(url, promise) {
        var _contextsRequested = Utils.O.clone(contextsRequested);
        _contextsRequested[url] = true;
        return promise.then(function (_a) {
            var object = _a[0], response = _a[1];
            var contextWrapper = { "@context": {} };
            var header = response.getHeader("Content-Type");
            if (!Utils.S.contains(header.toString(), "application/ld+json")) {
                header = response.getHeader("Link");
                var link = void 0;
                if (!!header)
                    link = _getTargetFromLinkHeader(header);
                if (!!link)
                    contextWrapper["@context"] = link;
            }
            else {
                contextWrapper["@context"] = ("@context" in object) ? object["@context"] : {};
            }
            contextToResolved[url] = contextWrapper["@context"];
            return _retrieveContexts(contextWrapper, _contextsRequested, url);
        });
    }
    var promises = [];
    for (var url in contextToResolved) {
        if (url in contextsRequested)
            throw new Error("Cyclical @context URLs detected.");
        var requestOptions = {};
        HTTP.Request.Util.setAcceptHeader("application/ld+json, application/json", requestOptions);
        var promise = HTTP.Request.Service.get(url, requestOptions, new JSONParser_1.default());
        promises.push(resolved(url, promise));
    }
    return Promise.all(promises).then(function () {
        _findContextURLs(input, contextToResolved, base, true);
    });
}
function _proress(input, context) {
    return input;
}
function expand(input) {
    return _retrieveContexts(input, Object.create(null), "").then(function () {
        return _proress(input, {});
    });
}
exports.expand = expand;
var Class = (function () {
    function Class() {
    }
    Class.prototype.parse = function (input) {
        var _this = this;
        var jsonParser = new JSONParser_1.default();
        return jsonParser.parse(input).then(function (parsedObject) {
            return _this.expandJSON(parsedObject);
        });
    };
    Class.prototype.expandJSON = function (parsedObject, options) {
        return new Promise(function (resolve, reject) {
            jsonld.expand(parsedObject, options, function (error, expanded) {
                if (error) {
                    reject(error);
                }
                parsedObject = expanded;
                resolve(expanded);
            });
        });
    };
    return Class;
}());
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=JSONLDParser.js.map
