"use strict";
var Error_1 = require("./Error");
var Errors = require("./../Errors");
var HTTP = require("./../HTTP");
var ObjectSchema = require("./../ObjectSchema");
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
        return Promise.reject(new Error_1.default("Maximum number of @context URLs exceeded."));
    var contextToResolved = Object.create(null);
    if (!_findContextURLs(input, contextToResolved, base))
        return Promise.resolve();
    function resolved(url, promise) {
        return promise.then(function (_a) {
            var object = _a[0], response = _a[1];
            var _contextsRequested = Utils.O.clone(contextsRequested);
            _contextsRequested[url] = true;
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
            return Promise.reject(new Error_1.default("Cyclical @context URLs detected."));
        var requestOptions = {};
        HTTP.Request.Util.setAcceptHeader("application/ld+json, application/json", requestOptions);
        var promise = HTTP.Request.Service.get(url, requestOptions, new HTTP.JSONParser.Class());
        promises.push(resolved(url, promise));
    }
    return Promise.all(promises).then(function () {
        _findContextURLs(input, contextToResolved, base, true);
    });
}
function _isKeyword(value) {
    if (!Utils.isString(value))
        return false;
    switch (value) {
        case "@base":
        case "@context":
        case "@container":
        case "@default":
        case "@embed":
        case "@explicit":
        case "@graph":
        case "@id":
        case "@index":
        case "@language":
        case "@list":
        case "@omitDefault":
        case "@preserve":
        case "@requireAll":
        case "@reverse":
        case "@set":
        case "@type":
        case "@value":
        case "@vocab":
            return true;
        default:
            return false;
    }
}
function _isValidType(value) {
    if (Utils.isString(value))
        return true;
    if (!Utils.isArray(value))
        return false;
    for (var _i = 0, _a = value; _i < _a.length; _i++) {
        var element = _a[_i];
        if (!Utils.isString(element))
            return false;
    }
    return true;
}
function _expandURI(value, schema, relativeTo) {
    if (relativeTo === void 0) { relativeTo = {}; }
    if (value === null || _isKeyword(value) || RDF.URI.Util.isAbsolute(value))
        return value;
    if (schema.properties.has(value))
        return schema.properties.get(value).uri.stringValue;
    if (RDF.URI.Util.isPrefixed(value))
        return ObjectSchema.Digester.resolvePrefixedURI(value, schema);
    if (relativeTo.vocab) {
        if (schema.vocab === null)
            return null;
        return schema.vocab + value;
    }
    if (relativeTo.base)
        RDF.URI.Util.resolve(schema.base, value, { untilSlash: true });
    return value;
}
function _expandLanguageMap(languageMap) {
    var expandedLanguage = [];
    var keys = Object.keys(languageMap).sort();
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var values = languageMap[key];
        if (!Utils.isArray(values))
            values = [values];
        for (var _a = 0, values_1 = values; _a < values_1.length; _a++) {
            var item = values_1[_a];
            if (item === null)
                continue;
            if (!Utils.isString(item))
                throw new Error_1.default("Language map values must be strings.");
            expandedLanguage.push({
                "@value": item,
                "@language": key.toLowerCase(),
            });
        }
    }
    return expandedLanguage;
}
function _getContainer(context, property) {
    if (context.properties.has(property))
        return context.properties.get(property).containerType;
    return undefined;
}
function _expandValue(context, element, propertyName) {
    return element;
}
function _process(context, element, activeProperty, insideList) {
    if (Utils.isNull(element) || !Utils.isDefined(element))
        return null;
    if (!Utils.isArray(element) && !Utils.isObject(element)) {
        if (!insideList && (activeProperty === null || activeProperty === "@graph"))
            return null;
        return _expandValue(context, element, activeProperty);
    }
    if (Utils.isArray(element)) {
        var container = _getContainer(context, activeProperty);
        insideList = insideList || container === ObjectSchema.ContainerType.LIST;
        var expandedElement_1 = [];
        for (var _i = 0, _a = element; _i < _a.length; _i++) {
            var item = _a[_i];
            var expandedItem = _process(context, item, activeProperty);
            if (expandedItem === null)
                continue;
            if (insideList && (Utils.isArray(expandedItem) || RDF.List.Factory.is(expandedItem)))
                throw new Error_1.default("Lists of lists are not permitted.");
            if (!Utils.isArray(expandedItem))
                expandedItem = [expandedItem];
            Array.prototype.push.apply(expandedElement_1, expandedItem);
        }
        return expandedElement_1;
    }
    if ("@context" in element) {
        context = ObjectSchema.Digester.combineDigestedObjectSchemas([
            ObjectSchema.Digester.digestSchema(element["@context"]),
            context,
        ]);
    }
    var expandedElement = {};
    var keys = Object.keys(element);
    for (var _b = 0, keys_2 = keys; _b < keys_2.length; _b++) {
        var key = keys_2[_b];
        if (key === "@context")
            continue;
        var uri = _expandURI(key, context, { vocab: true });
        if (!uri || !(RDF.URI.Util.isAbsolute(uri) || _isKeyword(uri)))
            continue;
        var value = element[key];
        if (_isKeyword(uri)) {
            if (uri === "@id" && !Utils.isString(value))
                throw new Error_1.default("\"@id\" value must a string.");
            if (uri === "@type" && !_isValidType(value))
                throw new Error_1.default("\"@type\" value must a string, an array of strings.");
            if (uri === "@graph" && !(Utils.isObject(value) || Utils.isArray(value)))
                throw new Error_1.default("\"@graph\" value must not be an object or an array.");
            if (uri === "@value" && (Utils.isObject(value) || Utils.isArray(value)))
                throw new Error_1.default("\"@value\" value must not be an object or an array.");
            if (uri === "@language") {
                if (value)
                    continue;
                if (!Utils.isString(value))
                    throw new Error_1.default("\"@language\" value must be a string.");
                value = value.toLowerCase();
            }
            if (uri === "@index" && !Utils.isString(value))
                throw new Error_1.default("\"@index\" value must be a string.");
            if (uri === "@reverse" && !Utils.isObject(value))
                throw new Error_1.default("\"@reverse\" value must be an object.");
            if (uri === "@index" || uri === "@reverse")
                throw new Errors.NotImplementedError("The SDK does not support \"@index\" and \"@reverse\" tags.");
        }
        var expandedValue = void 0;
        var container = _getContainer(context, key);
        if (container === ObjectSchema.ContainerType.LANGUAGE && Utils.isObject(value)) {
            expandedValue = _expandLanguageMap(value);
        }
        else {
            var nextActiveProperty = key;
            var isList = container === ObjectSchema.ContainerType.LIST;
            if (isList || container === ObjectSchema.ContainerType.SET)
                nextActiveProperty = (isList && activeProperty === "@graph") ? null : activeProperty;
            expandedValue = _process(context, value, nextActiveProperty);
        }
        if (expandedValue === null && uri !== "@value")
            continue;
        if (uri !== "@list" && !RDF.List.Factory.is(expandedValue) && container === ObjectSchema.ContainerType.LIST) {
            if (!Utils.isArray(expandedValue))
                expandedValue = [expandedValue];
            expandedValue = { "@list": expandedValue };
        }
        var useArray = ["@id", "@type", "@value", "@language"].indexOf(uri) === -1;
        _addValue(expandedElement, uri, expandedValue, { propertyIsArray: useArray });
    }
    return expandedElement;
}
function _addValue(element, propertyName, value, options) {
    if (Utils.isArray(value)) {
        var values = value;
        if (values.length === 0 && options.propertyIsArray && !Utils.hasProperty(element, propertyName))
            element[propertyName] = [];
        for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
            var item = values_2[_i];
            _addValue(element, propertyName, item, options);
        }
    }
    else if (propertyName in element) {
        if (!_hasValue(element, propertyName, value)) {
            var items = element[propertyName];
            if (!Utils.isArray(items))
                items = element[propertyName] = [items];
            items.push(value);
        }
    }
    else {
        element[propertyName] = options.propertyIsArray ? [value] : value;
    }
}
function _hasProperty(element, propertyName) {
    if (propertyName in element) {
        var item = element[propertyName];
        return !Utils.isArray(item) || item.length > 0;
    }
    return false;
}
function _compareValues(value1, value2) {
    if (value1 === value2)
        return true;
    if (Utils.isObject(value1) && Utils.isObject(value2)) {
        if ("@value" in value1
            && value1["@value"] === value2["@value"]
            && value1["@type"] === value2["@type"]
            && value1["@language"] === value2["@language"]
            && value1["@index"] === value2["@index"])
            return true;
        if ("@id" in value1)
            return value1["@id"] === value2["@id"];
    }
    return false;
}
function _hasValue(element, propertyName, value) {
    if (_hasProperty(element, propertyName)) {
        var item = element[propertyName];
        var isList = RDF.List.Factory.is(value);
        if (isList || Utils.isArray(item)) {
            var items = item;
            if (isList)
                items = items["@list"];
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var entry = items_1[_i];
                if (_compareValues(entry, value))
                    return true;
            }
        }
        else if (!Utils.isArray(value)) {
            return _compareValues(item, value);
        }
    }
    return false;
}
function expand(input) {
    return _retrieveContexts(input, Object.create(null), "").then(function () {
        return _process(new ObjectSchema.DigestedObjectSchema(), input);
    });
}
exports.expand = expand;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    expand: expand,
};

//# sourceMappingURL=Processor.js.map
