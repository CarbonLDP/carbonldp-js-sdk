(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CarbonLDP"] = factory();
	else
		root["CarbonLDP"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 169);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function hasFunction(object, functionName) {
    return typeof object[functionName] === "function";
}
exports.hasFunction = hasFunction;
function hasProperty(object, property) {
    if (!object)
        return false;
    return isDefined(object[property]);
}
exports.hasProperty = hasProperty;
function hasPropertyDefined(object, property) {
    if (!object)
        return false;
    return !!Object.getOwnPropertyDescriptor(object, property);
}
exports.hasPropertyDefined = hasPropertyDefined;
function isDefined(value) {
    return void 0 !== value;
}
exports.isDefined = isDefined;
function isNull(value) {
    return value === null;
}
exports.isNull = isNull;
function isArray(object) {
    return Array.isArray(object);
}
exports.isArray = isArray;
function isString(value) {
    return typeof value === "string" || value instanceof String;
}
exports.isString = isString;
function isBoolean(value) {
    return typeof value === "boolean";
}
exports.isBoolean = isBoolean;
function isNumber(value) {
    return typeof value === "number" || value instanceof Number;
}
exports.isNumber = isNumber;
function isInteger(value) {
    if (!isNumber(value))
        return false;
    return value % 1 === 0;
}
exports.isInteger = isInteger;
function isDouble(value) {
    if (!isNumber(value))
        return false;
    return value % 1 !== 0;
}
exports.isDouble = isDouble;
function isDate(date) {
    return date instanceof Date || (typeof date === "object" && Object.prototype.toString.call(date) === "[object Date]");
}
exports.isDate = isDate;
function isObject(object) {
    return typeof object === "object" && (!!object);
}
exports.isObject = isObject;
function isPlainObject(object) {
    return isObject(object)
        && !isArray(object)
        && !isDate(object)
        && !isMap(object)
        && !(typeof Blob !== "undefined" && object instanceof Blob)
        && !(Object.prototype.toString.call(object) === "[object Set]");
}
exports.isPlainObject = isPlainObject;
function isFunction(value) {
    return typeof value === "function";
}
exports.isFunction = isFunction;
function isMap(value) {
    return (isObject(value) &&
        hasFunction(value, "get") &&
        hasFunction(value, "has") &&
        hasProperty(value, "size") &&
        hasFunction(value, "clear") &&
        hasFunction(value, "delete") &&
        hasFunction(value, "entries") &&
        hasFunction(value, "forEach") &&
        hasFunction(value, "get") &&
        hasFunction(value, "has") &&
        hasFunction(value, "keys") &&
        hasFunction(value, "set") &&
        hasFunction(value, "values"));
}
exports.isMap = isMap;
function parseBoolean(value) {
    if (!isString(value))
        return false;
    switch (value.toLowerCase()) {
        case "true":
        case "yes":
        case "y":
        case "1":
            return true;
        case "false":
        case "no":
        case "n":
        case "0":
        default:
            return false;
    }
}
exports.parseBoolean = parseBoolean;
function forEachOwnProperty(object, action) {
    if (!(isObject(object) || isFunction(object)))
        throw new Error("IllegalArgument");
    for (var name_1 in object) {
        if (object.hasOwnProperty(name_1)) {
            if (action(name_1, object[name_1]) === false)
                break;
        }
    }
}
exports.forEachOwnProperty = forEachOwnProperty;
function promiseMethod(fn) {
    return new Promise(function (resolve) { return resolve(fn ? fn() : void 0); });
}
exports.promiseMethod = promiseMethod;
function mapTupleArray(tuples) {
    var firsts = [];
    var seconds = [];
    tuples.forEach(function (tuple) {
        firsts.push(tuple[0]);
        seconds.push(tuple[1]);
    });
    return [firsts, seconds];
}
exports.mapTupleArray = mapTupleArray;
var ArrayUtils = (function () {
    function ArrayUtils() {
    }
    ArrayUtils.from = function (iterator) {
        var array = [];
        var next = iterator.next();
        while (!next.done) {
            array.push(next.value);
            next = iterator.next();
        }
        return array;
    };
    ArrayUtils.joinWithoutDuplicates = function () {
        var arrays = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arrays[_i] = arguments[_i];
        }
        var result = arrays[0].slice();
        for (var i = 1, length_1 = arrays.length; i < length_1; i++) {
            result = result.concat(arrays[i].filter(function (item) {
                return result.indexOf(item) < 0;
            }));
        }
        return result;
    };
    ArrayUtils.indexOf = function (array, searchedElement, comparator) {
        if (comparator === void 0) { comparator = function (a, b) { return a === b; }; }
        if (!array)
            return -1;
        for (var i = 0, length_2 = array.length; i < length_2; ++i) {
            if (comparator(array[i], searchedElement))
                return i;
        }
        return -1;
    };
    return ArrayUtils;
}());
exports.ArrayUtils = ArrayUtils;
var ObjectUtils = (function () {
    function ObjectUtils() {
    }
    ObjectUtils.extend = function (target, source, config) {
        if (config === void 0) { config = { arrays: false, objects: false }; }
        if (!isArray(source) && !isPlainObject(source) || !isArray(target) && !isPlainObject(target))
            return null;
        source.__CarbonSDK_circularReferenceFlag = target;
        for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
            var key = _a[_i];
            if (isFunction(source[key]) || key === "__CarbonSDK_circularReferenceFlag")
                continue;
            var property = source[key];
            if (isArray(property) && config.arrays || isPlainObject(property) && config.objects) {
                if ("__CarbonSDK_circularReferenceFlag" in property) {
                    property = property.__CarbonSDK_circularReferenceFlag;
                }
                else {
                    property = !(key in target) || target[key].constructor !== property.constructor ?
                        ObjectUtils.clone(property, config) :
                        ObjectUtils.extend(target[key], property, config);
                }
            }
            if (property === null) {
                if (target[key])
                    delete target[key];
                continue;
            }
            target[key] = property;
        }
        delete source.__CarbonSDK_circularReferenceFlag;
        return target;
    };
    ObjectUtils.clone = function (object, config) {
        if (config === void 0) { config = { arrays: false, objects: false }; }
        var isAnArray = isArray(object);
        if (!isAnArray && !isPlainObject(object))
            return null;
        var clone = (isAnArray ? [] : Object.create(Object.getPrototypeOf(object)));
        return ObjectUtils.extend(clone, object, config);
    };
    ObjectUtils.areEqual = function (object1, object2, config, ignore) {
        if (config === void 0) { config = { arrays: false, objects: false }; }
        if (ignore === void 0) { ignore = {}; }
        return internalAreEqual(object1, object2, config, [object1], [object2], ignore);
    };
    ObjectUtils.areShallowlyEqual = function (object1, object2) {
        if (object1 === object2)
            return true;
        if (!isObject(object1) || !isObject(object2))
            return false;
        var properties = [];
        for (var propertyName in object1) {
            if (!object1.hasOwnProperty(propertyName))
                continue;
            if (isFunction(object1[propertyName]))
                continue;
            if (!(propertyName in object2))
                return false;
            if (object1[propertyName] !== object2[propertyName])
                return false;
            properties.push(propertyName);
        }
        for (var propertyName in object2) {
            if (!object2.hasOwnProperty(propertyName))
                continue;
            if (isFunction(object2[propertyName]))
                continue;
            if (!(propertyName in object1))
                return false;
            if (properties.indexOf(propertyName) === -1)
                return false;
        }
        return true;
    };
    return ObjectUtils;
}());
exports.ObjectUtils = ObjectUtils;
function internalAreEqual(object1, object2, config, stack1, stack2, ignore) {
    if (ignore === void 0) { ignore = {}; }
    if (object1 === object2)
        return true;
    if (!isObject(object1) || !isObject(object2))
        return false;
    if (isDate(object1))
        return object1.getTime() === object2.getTime();
    var keys = ArrayUtils.joinWithoutDuplicates(Object.keys(object1), Object.keys(object2));
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (!(key in object1) || !(key in object2))
            return false;
        if (typeof object1 !== typeof object2)
            return false;
        if (key in ignore)
            continue;
        if (isFunction(object1[key]))
            continue;
        var firstIsPlainObject = isPlainObject(object1[key]);
        if (isArray(object1[key]) && config.arrays ||
            firstIsPlainObject && config.objects ||
            isDate(object1[key])) {
            if (firstIsPlainObject) {
                var lengthStack = stack1.length;
                while (lengthStack--) {
                    if (stack1[lengthStack] === object1[key])
                        return stack2[lengthStack] === object2[key];
                }
                stack1.push(object1[key]);
                stack2.push(object2[key]);
            }
            if (!internalAreEqual(object1[key], object2[key], config, stack1, stack2))
                return false;
            if (firstIsPlainObject) {
                stack1.pop();
                stack2.pop();
            }
        }
        else {
            if (object1[key] !== object2[key])
                return false;
        }
    }
    return true;
}
var StringUtils = (function () {
    function StringUtils() {
    }
    StringUtils.startsWith = function (str, substring) {
        return str.lastIndexOf(substring, 0) === 0;
    };
    StringUtils.endsWith = function (str, substring) {
        return str.indexOf(substring, str.length - substring.length) !== -1;
    };
    StringUtils.contains = function (str, substring) {
        return str.indexOf(substring) !== -1;
    };
    return StringUtils;
}());
exports.StringUtils = StringUtils;
var MapUtils = (function () {
    function MapUtils() {
    }
    MapUtils.from = function (object) {
        var map = new Map();
        forEachOwnProperty(object, function (name, value) {
            map.set(name, value);
        });
        return map;
    };
    MapUtils.extend = function (toExtend) {
        var extenders = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            extenders[_i - 1] = arguments[_i];
        }
        for (var i = 0, length_3 = extenders.length; i < length_3; i++) {
            var extender = extenders[i];
            if (!extender)
                continue;
            var values = extender.entries();
            var next = values.next();
            while (!next.done) {
                var entry = next.value;
                var key = entry[0];
                var value = entry[1];
                toExtend.set(key, value);
                next = values.next();
            }
        }
        return toExtend;
    };
    return MapUtils;
}());
exports.MapUtils = MapUtils;
var UUIDUtils = (function () {
    function UUIDUtils() {
    }
    UUIDUtils.is = function (uuid) {
        return UUIDUtils.regExp.test(uuid);
    };
    UUIDUtils.generate = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    UUIDUtils.regExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return UUIDUtils;
}());
exports.UUIDUtils = UUIDUtils;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractError_1 = __webpack_require__(21);
var IllegalArgumentError = (function (_super) {
    __extends(IllegalArgumentError, _super);
    function IllegalArgumentError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IllegalArgumentError.prototype, "name", {
        get: function () { return "IllegalArgumentError"; },
        enumerable: true,
        configurable: true
    });
    return IllegalArgumentError;
}(AbstractError_1.AbstractError));
exports.IllegalArgumentError = IllegalArgumentError;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.C = {
    namespace: "https://carbonldp.com/ns/v1/platform#",
    AccessPoint: "https://carbonldp.com/ns/v1/platform#AccessPoint",
    AccessPointCreated: "https://carbonldp.com/ns/v1/platform#AccessPointCreated",
    AddMemberAction: "https://carbonldp.com/ns/v1/platform#AddMemberAction",
    ChildCreated: "https://carbonldp.com/ns/v1/platform#ChildCreatedEvent",
    Document: "https://carbonldp.com/ns/v1/platform#Document",
    DocumentCreatedDetails: "https://carbonldp.com/ns/v1/platform#DocumentCreatedEventDetails",
    DocumentDeleted: "https://carbonldp.com/ns/v1/platform#DocumentDeleted",
    DocumentMetadata: "https://carbonldp.com/ns/v1/platform#DocumentMetadata",
    DocumentModified: "https://carbonldp.com/ns/v1/platform#DocumentModified",
    ErrorResponse: "https://carbonldp.com/ns/v1/platform#ErrorResponse",
    Error: "https://carbonldp.com/ns/v1/platform#Error",
    Instance: "https://carbonldp.com/ns/v1/platform#Instance",
    Map: "https://carbonldp.com/ns/v1/platform#Map",
    MemberAdded: "https://carbonldp.com/ns/v1/platform#MemberAddedEvent",
    MemberAddedDetails: "https://carbonldp.com/ns/v1/platform#MemberAddedEventDetails",
    MemberRemoved: "https://carbonldp.com/ns/v1/platform#MemberRemovedEvent",
    MemberRemovedDetails: "https://carbonldp.com/ns/v1/platform#MemberRemovedEventDetails",
    NonReadableMembershipResourceTriples: "https://carbonldp.com/ns/v1/platform#NonReadableMembershipResourceTriples",
    Platform: "https://carbonldp.com/ns/v1/platform#Platform",
    PlatformInstance: "https://carbonldp.com/ns/v1/platform#PlatformInstance",
    PreferContainer: "https://carbonldp.com/ns/v1/platform#PreferContainer",
    PreferContainmentResources: "https://carbonldp.com/ns/v1/platform#PreferContainmentResources",
    PreferContainmentTriples: "https://carbonldp.com/ns/v1/platform#PreferContainmentTriples",
    PreferDocumentETags: "https://carbonldp.com/ns/v1/platform#PreferDocumentETags",
    PreferMembershipResources: "https://carbonldp.com/ns/v1/platform#PreferMembershipResources",
    PreferMembershipTriples: "https://carbonldp.com/ns/v1/platform#PreferMembershipTriples",
    PreferResultsContext: "https://carbonldp.com/ns/v1/platform#PreferResultsContext",
    PreferSelectedMembershipTriples: "https://carbonldp.com/ns/v1/platform#PreferSelectedMembershipTriples",
    QueryMetadata: "https://carbonldp.com/ns/v1/platform#QueryMetadata",
    RemoveMemberAction: "https://carbonldp.com/ns/v1/platform#RemoveMemberAction",
    ResponseMetadata: "https://carbonldp.com/ns/v1/platform#ResponseMetadata",
    ValidationError: "https://carbonldp.com/ns/v1/platform#ValidationError",
    VolatileResource: "https://carbonldp.com/ns/v1/platform#VolatileResource",
    accessPoint: "https://carbonldp.com/ns/v1/platform#accessPoint",
    bNodesMap: "https://carbonldp.com/ns/v1/platform#bNodesMap",
    buildDate: "https://carbonldp.com/ns/v1/platform#buildDate",
    created: "https://carbonldp.com/ns/v1/platform#created",
    createdDocument: "https://carbonldp.com/ns/v1/platform#createdDocument",
    details: "https://carbonldp.com/ns/v1/platform#details",
    defaultInteractionModel: "https://carbonldp.com/ns/v1/platform#defaultInteractionModel",
    documentMetadata: "https://carbonldp.com/ns/v1/platform#documentMetadata",
    entry: "https://carbonldp.com/ns/v1/platform#entry",
    entryKey: "https://carbonldp.com/ns/v1/platform#key",
    entryValue: "https://carbonldp.com/ns/v1/platform#value",
    error: "https://carbonldp.com/ns/v1/platform#error",
    errorCode: "https://carbonldp.com/ns/v1/platform#errorCode",
    errorDetails: "https://carbonldp.com/ns/v1/platform#errorDetails",
    errorMessage: "https://carbonldp.com/ns/v1/platform#errorMessage",
    errorParameters: "https://carbonldp.com/ns/v1/platform#errorParameters",
    eTag: "https://carbonldp.com/ns/v1/platform#eTag",
    httpStatusCode: "https://carbonldp.com/ns/v1/platform#httpStatusCode",
    instance: "https://carbonldp.com/ns/v1/platform#instance",
    mediaType: "https://carbonldp.com/ns/v1/platform#mediaType",
    member: "https://carbonldp.com/ns/v1/platform#member",
    modified: "https://carbonldp.com/ns/v1/platform#modified",
    requestID: "https://carbonldp.com/ns/v1/platform#requestID",
    relatedDocument: "https://carbonldp.com/ns/v1/platform#relatedDocument",
    size: "https://carbonldp.com/ns/v1/platform#size",
    target: "https://carbonldp.com/ns/v1/platform#target",
    targetMember: "https://carbonldp.com/ns/v1/platform#targetMember",
    version: "https://carbonldp.com/ns/v1/platform#version",
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(0);
exports.ModelDecorator = {
    hasPropertiesFrom: function (prototype, object) {
        return Object
            .keys(prototype)
            .every(function (key) {
            var definition = Object
                .getOwnPropertyDescriptor(prototype, key);
            if (definition.value && Utils_1.isFunction(definition.value))
                return Utils_1.hasFunction(object, key);
            return object.hasOwnProperty(key) && !object.propertyIsEnumerable(key);
        });
    },
    definePropertiesFrom: function (prototype, object) {
        Object
            .keys(prototype)
            .forEach(function (key) {
            var definition = Object
                .getOwnPropertyDescriptor(prototype, key);
            var descriptor = {
                enumerable: false,
                configurable: true,
            };
            if (Utils_1.isFunction(definition.value)) {
                descriptor.writable = false;
                descriptor.value = definition.value;
            }
            else if (!definition.set) {
                descriptor.writable = true;
                descriptor.value = object.hasOwnProperty(key) ?
                    object[key] : definition.get ?
                    definition.get() : definition.value;
            }
            else {
                descriptor.get = definition.get;
                descriptor.set = definition.set;
            }
            Object.defineProperty(object, key, descriptor);
        });
        return object;
    },
    decorateMultiple: function (object) {
        var models = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            models[_i - 1] = arguments[_i];
        }
        models.forEach(function (model) { return model.decorate(object); });
        return object;
    },
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(35));
__export(__webpack_require__(89));
__export(__webpack_require__(66));
__export(__webpack_require__(171));
__export(__webpack_require__(51));
__export(__webpack_require__(67));
__export(__webpack_require__(34));
__export(__webpack_require__(20));
__export(__webpack_require__(172));
__export(__webpack_require__(173));
__export(__webpack_require__(90));
__export(__webpack_require__(91));
__export(__webpack_require__(92));
__export(__webpack_require__(93));
__export(__webpack_require__(94));
__export(__webpack_require__(174));
__export(__webpack_require__(95));
__export(__webpack_require__(175));
__export(__webpack_require__(176));
__export(__webpack_require__(177));
__export(__webpack_require__(178));
__export(__webpack_require__(179));
__export(__webpack_require__(180));
__export(__webpack_require__(181));
__export(__webpack_require__(182));
__export(__webpack_require__(183));
__export(__webpack_require__(184));
__export(__webpack_require__(185));
__export(__webpack_require__(186));
__export(__webpack_require__(187));
__export(__webpack_require__(188));
__export(__webpack_require__(189));
__export(__webpack_require__(190));

//# sourceMappingURL=index.js.map


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractError_1 = __webpack_require__(21);
var HTTPError = (function (_super) {
    __extends(HTTPError, _super);
    function HTTPError(message, response) {
        var _this = _super.call(this, message) || this;
        _this.response = response;
        return _this;
    }
    Object.defineProperty(HTTPError, "statusCode", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HTTPError.prototype, "name", {
        get: function () { return "HTTPError"; },
        enumerable: true,
        configurable: true
    });
    return HTTPError;
}(AbstractError_1.AbstractError));
exports.HTTPError = HTTPError;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(5);
exports.VAR_SYMBOL = new tokens_1.LeftSymbol("?");
exports.PREFIX_SYMBOL = new tokens_1.Operator(":");
exports.OFF_TYPE = new tokens_1.Operator("^^");
exports.LANG_SYMBOL = new tokens_1.Operator("@");
exports.ALL = new tokens_1.RightSymbol("*");
exports.OPEN_IRI = new tokens_1.LeftSymbol("<");
exports.CLOSE_IRI = new tokens_1.RightSymbol(">");
exports.OPEN_QUOTE = new tokens_1.LeftSymbol("\"");
exports.CLOSE_QUOTE = new tokens_1.RightSymbol("\"");
exports.GRAPH_PATTERN_SEPARATOR = new tokens_1.NewLineSymbol(".");
exports.SAME_SUBJECT_SEPARATOR = new tokens_1.NewLineSymbol(";");
exports.SAME_PROPERTY_SEPARATOR = new tokens_1.NewLineSymbol(",");
exports.EMPTY_SEPARATOR = new tokens_1.NewLineSymbol("");
exports.OPEN_MULTI_BLOCK = new tokens_1.NewLineSymbol("{");
exports.CLOSE_MULTI_BLOCK = new tokens_1.NewLineSymbol("}");
exports.OPEN_SINGLE_BLOCK = new tokens_1.LeftSymbol("{");
exports.CLOSE_SINGLE_BLOCK = new tokens_1.RightSymbol("}");
exports.OPEN_MULTI_BN = new tokens_1.NewLineSymbol("[");
exports.CLOSE_MULTI_BN = new tokens_1.NewLineSymbol("]");
exports.OPEN_SINGLE_BN = new tokens_1.LeftSymbol("[");
exports.CLOSE_SINGLE_BN = new tokens_1.RightSymbol("]");
exports.OPEN_MULTI_LIST = new tokens_1.NewLineSymbol("(");
exports.CLOSE_MULTI_LIST = new tokens_1.NewLineSymbol(")");
exports.OPEN_SINGLE_LIST = new tokens_1.LeftSymbol("(");
exports.CLOSE_SINGLE_LIST = new tokens_1.RightSymbol(")");
exports.BASE = new tokens_1.Identifier("BASE");
exports.PREFIX = new tokens_1.Identifier("PREFIX");
exports.SELECT = new tokens_1.Identifier("SELECT");
exports.FROM = new tokens_1.Identifier("FROM");
exports.NAMED = new tokens_1.Identifier("NAMED");
exports.WHERE = new tokens_1.Identifier("WHERE");
exports.GROUP = new tokens_1.Identifier("GROUP");
exports.BY = new tokens_1.Identifier("BY");
exports.HAVING = new tokens_1.Identifier("HAVING");
exports.ORDER = new tokens_1.Identifier("ORDER");
exports.LIMIT = new tokens_1.Identifier("LIMIT");
exports.OFFSET = new tokens_1.Identifier("OFFSET");
exports.GRAPH = new tokens_1.Identifier("GRAPH");
exports.OPTIONAL = new tokens_1.Identifier("OPTIONAL");
exports.UNION = new tokens_1.Identifier("UNION");
exports.MINUS = new tokens_1.Identifier("MINUS");
exports.VALUES = new tokens_1.Identifier("VALUES");
exports.UNDEF = new tokens_1.Identifier("UNDEF");
exports.DISTINCT = new tokens_1.Identifier("DISTINCT");
exports.REDUCED = new tokens_1.Identifier("REDUCED");
exports.SERVICE = new tokens_1.Identifier("SERVICE");
exports.SILENT = new tokens_1.Identifier("SILENT");
exports.BIND = new tokens_1.Identifier("BIND");
exports.AS = new tokens_1.Identifier("AS");
exports.FILTER = new tokens_1.Identifier("FILTER");

//# sourceMappingURL=tokens.js.map


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(0);
exports.URI = {
    hasFragment: function (uri) {
        return uri.indexOf("#") !== -1;
    },
    hasQuery: function (uri) {
        return uri.indexOf("?") !== -1;
    },
    hasProtocol: function (uri) {
        return Utils_1.StringUtils.startsWith(uri, "https://") || Utils_1.StringUtils.startsWith(uri, "http://");
    },
    isAbsolute: function (uri) {
        return Utils_1.StringUtils.startsWith(uri, "http://")
            || Utils_1.StringUtils.startsWith(uri, "https://")
            || Utils_1.StringUtils.startsWith(uri, "://");
    },
    isRelative: function (uri) {
        return !exports.URI.isAbsolute(uri);
    },
    isBNodeID: function (uri) {
        return Utils_1.StringUtils.startsWith(uri, "_:");
    },
    generateBNodeID: function () {
        return "_:" + Utils_1.UUIDUtils.generate();
    },
    isPrefixed: function (uri) {
        return !exports.URI.isAbsolute(uri) && !exports.URI.isBNodeID(uri) && Utils_1.StringUtils.contains(uri, ":");
    },
    isFragmentOf: function (fragmentURI, uri) {
        if (!exports.URI.hasFragment(fragmentURI))
            return false;
        var documentURI = exports.URI.getDocumentURI(fragmentURI);
        return documentURI === "" || documentURI === uri;
    },
    isBaseOf: function (baseURI, uri) {
        if (baseURI === uri)
            return true;
        if (baseURI === "")
            return true;
        if (exports.URI.isRelative(uri) && !exports.URI.isPrefixed(uri))
            return true;
        if (uri.startsWith(baseURI)) {
            if (Utils_1.StringUtils.endsWith(baseURI, "/") || Utils_1.StringUtils.endsWith(baseURI, "#"))
                return true;
            var relativeURI = uri.substring(baseURI.length);
            if (Utils_1.StringUtils.startsWith(relativeURI, "/") || Utils_1.StringUtils.startsWith(relativeURI, "#"))
                return true;
        }
        return false;
    },
    getRelativeURI: function (absoluteURI, base) {
        if (!absoluteURI.startsWith(base))
            return absoluteURI;
        return absoluteURI.substring(base.length);
    },
    getDocumentURI: function (uri) {
        var parts = uri.split("#");
        if (parts.length > 2)
            throw new Error("IllegalArgument: The URI provided has more than one # sign.");
        return parts[0];
    },
    getFragment: function (uri) {
        var parts = uri.split("#");
        if (parts.length < 2)
            return null;
        if (parts.length > 2)
            throw new Error("IllegalArgument: The URI provided has more than one # sign.");
        return parts[1];
    },
    getSlug: function (uri) {
        var uriParts = uri.split("#");
        if (uriParts.length === 2)
            return exports.URI.getSlug(uriParts[1]);
        if (uriParts.length > 2)
            throw new IllegalArgumentError_1.IllegalArgumentError("Invalid URI: The uri contains two '#' symbols.");
        uri = uriParts[0];
        if (uri === "")
            return uri;
        if (uri === "/")
            return "";
        var parts = uri.split("/");
        if (parts[parts.length - 1] === "") {
            return parts[parts.length - 2];
        }
        else {
            return parts[parts.length - 1];
        }
    },
    getParameters: function (uri) {
        var parameters = new Map();
        if (!exports.URI.hasQuery(uri))
            return parameters;
        uri.replace(/^.*\?/, "").split("&").forEach(function (param) {
            var parts = param.replace(/\+/g, " ").split("=");
            var key = parts.shift();
            var val = parts.length > 0 ? parts.join("=") : null;
            if (!parameters.has(key)) {
                parameters.set(key, val);
            }
            else {
                parameters.set(key, [].concat(parameters.get(key), val));
            }
        });
        return parameters;
    },
    resolve: function (parentURI, childURI) {
        if (!parentURI || exports.URI.isAbsolute(childURI) || exports.URI.isBNodeID(childURI) || exports.URI.isPrefixed(childURI))
            return childURI;
        var protocol = parentURI.substr(0, parentURI.indexOf("://") + 3);
        var path = parentURI.substr(parentURI.indexOf("://") + 3, parentURI.length - 1);
        if (path.lastIndexOf("/") === -1)
            path += "/";
        if (Utils_1.StringUtils.startsWith(childURI, "?") || Utils_1.StringUtils.startsWith(childURI, "#")) {
            if (exports.URI.hasQuery(path))
                path = path.substr(0, path.indexOf("?"));
            if (exports.URI.hasFragment(path) && (!Utils_1.StringUtils.startsWith(childURI, "?") || Utils_1.StringUtils.endsWith(path, "#")))
                path = exports.URI.getDocumentURI(path);
        }
        else {
            path = path.substr(0, path.lastIndexOf("/") + 1);
            if (!Utils_1.StringUtils.endsWith(path, "?") && !Utils_1.StringUtils.endsWith(path, "#") && !Utils_1.StringUtils.endsWith(path, "/"))
                path += "/";
        }
        if (Utils_1.StringUtils.startsWith(childURI, "/")) {
            childURI = childURI.substr(1, childURI.length);
        }
        return protocol + path + childURI;
    },
    removeProtocol: function (uri) {
        if (!exports.URI.hasProtocol(uri))
            return uri;
        return uri.substring(uri.indexOf("://") + 3);
    },
    prefix: function (uri, prefixOrObjectSchema, prefixURI) {
        if (!Utils_1.isString(prefixOrObjectSchema))
            return prefixWithObjectSchema(uri, prefixOrObjectSchema);
        var prefix = prefixOrObjectSchema;
        if (exports.URI.isPrefixed(uri) || !uri.startsWith(prefixURI))
            return uri;
        return prefix + ":" + uri.substring(prefixURI.length);
    },
};
function prefixWithObjectSchema(uri, objectSchema) {
    var prefixEntries = objectSchema.prefixes.entries();
    while (true) {
        var result = prefixEntries.next();
        if (result.done)
            return uri;
        var _a = result.value, prefix = _a[0], prefixURI = _a[1];
        if (!exports.URI.isAbsolute(prefixURI))
            continue;
        if (!uri.startsWith(prefixURI))
            continue;
        return exports.URI.prefix(uri, prefix, prefixURI);
    }
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(254);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = Object({"NODE_ENV":"prod"}).DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(253)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.XSD = {
    namespace: "http://www.w3.org/2001/XMLSchema#",
    boolean: "http://www.w3.org/2001/XMLSchema#boolean",
    byte: "http://www.w3.org/2001/XMLSchema#byte",
    date: "http://www.w3.org/2001/XMLSchema#date",
    dateTime: "http://www.w3.org/2001/XMLSchema#dateTime",
    decimal: "http://www.w3.org/2001/XMLSchema#decimal",
    double: "http://www.w3.org/2001/XMLSchema#double",
    duration: "http://www.w3.org/2001/XMLSchema#duration",
    float: "http://www.w3.org/2001/XMLSchema#float",
    gDay: "http://www.w3.org/2001/XMLSchema#gDay",
    gMonth: "http://www.w3.org/2001/XMLSchema#gMonth",
    gMonthDay: "http://www.w3.org/2001/XMLSchema#gMonthDay",
    gYear: "http://www.w3.org/2001/XMLSchema#gYear",
    gYearMonth: "http://www.w3.org/2001/XMLSchema#gYearMonth",
    int: "http://www.w3.org/2001/XMLSchema#int",
    integer: "http://www.w3.org/2001/XMLSchema#integer",
    long: "http://www.w3.org/2001/XMLSchema#long",
    negativeInteger: "http://www.w3.org/2001/XMLSchema#negativeInteger",
    nonNegativeInteger: "http://www.w3.org/2001/XMLSchema#nonNegativeInteger",
    nonPositiveInteger: "http://www.w3.org/2001/XMLSchema#nonPositiveInteger",
    object: "http://www.w3.org/2001/XMLSchema#object",
    positiveInteger: "http://www.w3.org/2001/XMLSchema#positiveInteger",
    short: "http://www.w3.org/2001/XMLSchema#short",
    string: "http://www.w3.org/2001/XMLSchema#string",
    time: "http://www.w3.org/2001/XMLSchema#time",
    unsignedByte: "http://www.w3.org/2001/XMLSchema#unsignedByte",
    unsignedInt: "http://www.w3.org/2001/XMLSchema#unsignedInt",
    unsignedLong: "http://www.w3.org/2001/XMLSchema#unsignedLong",
    unsignedShort: "http://www.w3.org/2001/XMLSchema#unsignedShort",
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(1)
  , EventTarget = __webpack_require__(137)
  ;

function EventEmitter() {
  EventTarget.call(this);
}

inherits(EventEmitter, EventTarget);

EventEmitter.prototype.removeAllListeners = function(type) {
  if (type) {
    delete this._listeners[type];
  } else {
    this._listeners = {};
  }
};

EventEmitter.prototype.once = function(type, listener) {
  var self = this
    , fired = false;

  function g() {
    self.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  this.on(type, g);
};

EventEmitter.prototype.emit = function() {
  var type = arguments[0];
  var listeners = this._listeners[type];
  if (!listeners) {
    return;
  }
  // equivalent of Array.prototype.slice.call(arguments, 1);
  var l = arguments.length;
  var args = new Array(l - 1);
  for (var ai = 1; ai < l; ai++) {
    args[ai - 1] = arguments[ai];
  }
  for (var i = 0; i < listeners.length; i++) {
    listeners[i].apply(this, args);
  }
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener = EventTarget.prototype.addEventListener;
EventEmitter.prototype.removeListener = EventTarget.prototype.removeEventListener;

module.exports.EventEmitter = EventEmitter;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ModelDecorator_1 = __webpack_require__(4);
var Utils_1 = __webpack_require__(0);
exports.Pointer = {
    PROTOTYPE: {
        get $id() { return ""; },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.Pointer.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.Pointer.isDecorated(object))
            return object;
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.Pointer.PROTOTYPE, object);
    },
    is: function (value) {
        return Utils_1.isObject(value)
            && exports.Pointer.isDecorated(value);
    },
    create: function (data) {
        var clone = Object.assign({}, data);
        return exports.Pointer.createFrom(clone);
    },
    createFrom: function (object) {
        return exports.Pointer.decorate(object);
    },
    areEqual: function (pointer1, pointer2) {
        return pointer1.$id === pointer2.$id;
    },
    getIDs: function (pointers) {
        return pointers
            .map(function (pointer) { return pointer.$id; });
    },
    getID: function (pointerOrIRI) {
        return Utils_1.isObject(pointerOrIRI) ? pointerOrIRI.$id : pointerOrIRI;
    },
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var URL = __webpack_require__(136);

var debug = function() {};
if (true) {
  debug = __webpack_require__(10)('sockjs-client:utils:url');
}

module.exports = {
  getOrigin: function(url) {
    if (!url) {
      return null;
    }

    var p = new URL(url);
    if (p.protocol === 'file:') {
      return null;
    }

    var port = p.port;
    if (!port) {
      port = (p.protocol === 'https:') ? '443' : '80';
    }

    return p.protocol + '//' + p.hostname + ':' + port;
  }

, isOriginEqual: function(a, b) {
    var res = this.getOrigin(a) === this.getOrigin(b);
    debug('same', a, b, res);
    return res;
  }

, isSchemeEqual: function(a, b) {
    return (a.split(':')[0] === b.split(':')[0]);
  }

, addPath: function (url, path) {
    var qs = url.split('?');
    return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
  }

, addQuery: function (url, q) {
    return url + (url.indexOf('?') === -1 ? ('?' + q) : ('&' + q));
  }
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var URI_1 = __webpack_require__(8);
var DigestedObjectSchema = (function () {
    function DigestedObjectSchema() {
        this.base = "";
        this.vocab = void 0;
        this.language = null;
        this.prefixes = new Map();
        this.properties = new Map();
    }
    DigestedObjectSchema.prototype.resolveURI = function (uri, relativeTo) {
        if (relativeTo === void 0) { relativeTo = {}; }
        if (uri === null || URI_1.URI.isAbsolute(uri) || URI_1.URI.isBNodeID(uri))
            return uri;
        var _a = uri.split(":"), prefix = _a[0], _b = _a[1], localName = _b === void 0 ? "" : _b;
        var definedReference = this.prefixes.has(prefix) ?
            this.prefixes.get(prefix) : this.properties.has(prefix) ?
            this.properties.get(prefix).uri
            : null;
        if (definedReference !== null && definedReference !== prefix) {
            return this.resolveURI(definedReference + localName, { vocab: true });
        }
        if (localName)
            return uri;
        if (relativeTo.vocab && this.vocab)
            return this.vocab + uri;
        if (relativeTo.base)
            return URI_1.URI.resolve(this.base, uri);
        return uri;
    };
    return DigestedObjectSchema;
}());
exports.DigestedObjectSchema = DigestedObjectSchema;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var finish_1 = __webpack_require__(123);
var subFinish_1 = __webpack_require__(124);
var IRIResolver_1 = __webpack_require__(26);
var Container = (function () {
    function Container(containerOrFunction, newTokens, iriResolver) {
        var _newTarget = this.constructor;
        var container = containerOrFunction instanceof Function ?
            void 0 : containerOrFunction;
        var finishDecorator = containerOrFunction instanceof Function
            ? containerOrFunction : finish_1.finishDecorator;
        this._iriResolver = finishDecorator !== subFinish_1.subFinishDecorator ? !iriResolver ? container ? container._iriResolver ?
            new IRIResolver_1.IRIResolver(container._iriResolver) : void 0 : new IRIResolver_1.IRIResolver() : iriResolver : void 0;
        var previousTokens = container ? container._tokens : [];
        if (!newTokens)
            newTokens = [];
        this._tokens = previousTokens.concat(newTokens);
        this._finishDecorator = container
            ? container._finishDecorator
            : finishDecorator;
        if (_newTarget === Container)
            Object.freeze(this);
    }
    return Container;
}());
exports.Container = Container;
exports.default = Container;

//# sourceMappingURL=Container.js.map


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JSONLDConverter_1 = __webpack_require__(68);
var ModelDecorator_1 = __webpack_require__(4);
var DigestedObjectSchema_1 = __webpack_require__(15);
var Pointer_1 = __webpack_require__(13);
var URI_1 = __webpack_require__(8);
var RegisteredPointer_1 = __webpack_require__(101);
var Utils_1 = __webpack_require__(0);
function __getContext(registry) {
    if (!registry)
        return;
    if ("$context" in registry && registry.$context)
        return registry.$context;
    return __getContext(registry.$registry);
}
function __resolveURI(resource, uri) {
    if (URI_1.URI.isAbsolute(uri))
        return uri;
    var context = __getContext(resource.$registry);
    if (!context)
        return uri;
    return context
        .getObjectSchema()
        .resolveURI(uri, { vocab: true });
}
exports.Resource = {
    PROTOTYPE: {
        get types() { return []; },
        get $slug() {
            if (URI_1.URI.isBNodeID(this.$id))
                return this.$id;
            return URI_1.URI.getSlug(this.$id);
        },
        set $slug(slug) { },
        addType: function (type) {
            type = __resolveURI(this, type);
            if (this.types.indexOf(type) !== -1)
                return;
            this.types.push(type);
        },
        hasType: function (type) {
            type = __resolveURI(this, type);
            return this.types.indexOf(type) !== -1;
        },
        removeType: function (type) {
            type = __resolveURI(this, type);
            var index = this.types.indexOf(type);
            if (index !== -1)
                this.types.splice(index, 1);
        },
        toJSON: function (contextOrKey) {
            var context = typeof contextOrKey === "object" ?
                contextOrKey : __getContext(this.$registry);
            var generalSchema = context ?
                context.registry.getGeneralSchema() : new DigestedObjectSchema_1.DigestedObjectSchema();
            var resourceSchema = context && context.registry ?
                context.registry.getSchemaFor(this) : generalSchema;
            var jsonldConverter = context ?
                context.jsonldConverter : new JSONLDConverter_1.JSONLDConverter();
            return jsonldConverter.expand(this, generalSchema, resourceSchema);
        },
    },
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && ModelDecorator_1.ModelDecorator
                .hasPropertiesFrom(exports.Resource.PROTOTYPE, object);
    },
    is: function (value) {
        return Pointer_1.Pointer.is(value)
            && exports.Resource.isDecorated(value);
    },
    create: function (data) {
        var clone = Object.assign({}, data);
        return exports.Resource.createFrom(clone);
    },
    createFrom: function (object) {
        return exports.Resource.decorate(object);
    },
    decorate: function (object) {
        if (exports.Resource.isDecorated(object))
            return object;
        if (!object.hasOwnProperty("$registry"))
            object.$registry = void 0;
        var resource = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, RegisteredPointer_1.RegisteredPointer);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.Resource.PROTOTYPE, resource);
    },
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(123));
__export(__webpack_require__(235));
__export(__webpack_require__(124));
__export(__webpack_require__(236));
__export(__webpack_require__(237));
__export(__webpack_require__(238));
__export(__webpack_require__(243));
__export(__webpack_require__(244));
__export(__webpack_require__(245));
__export(__webpack_require__(246));

//# sourceMappingURL=index.js.map


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
;(function () {
  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = "function" === "function" && __webpack_require__(262);

  // A set of types used to distinguish objects from primitives.
  var objectTypes = {
    "function": true,
    "object": true
  };

  // Detect the `exports` object exposed by CommonJS implementations.
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  // Use the `global` object exposed by Node (including Browserify via
  // `insert-module-globals`), Narwhal, and Ringo as the default context,
  // and the `window` object in browsers. Rhino exports a `global` function
  // instead.
  var root = objectTypes[typeof window] && window || this,
      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
    root = freeGlobal;
  }

  // Public: Initializes JSON 3 using the given `context` object, attaching the
  // `stringify` and `parse` functions to the specified `exports` object.
  function runInContext(context, exports) {
    context || (context = root["Object"]());
    exports || (exports = root["Object"]());

    // Native constructor aliases.
    var Number = context["Number"] || root["Number"],
        String = context["String"] || root["String"],
        Object = context["Object"] || root["Object"],
        Date = context["Date"] || root["Date"],
        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
        TypeError = context["TypeError"] || root["TypeError"],
        Math = context["Math"] || root["Math"],
        nativeJSON = context["JSON"] || root["JSON"];

    // Delegate to the native `stringify` and `parse` implementations.
    if (typeof nativeJSON == "object" && nativeJSON) {
      exports.stringify = nativeJSON.stringify;
      exports.parse = nativeJSON.parse;
    }

    // Convenience aliases.
    var objectProto = Object.prototype,
        getClass = objectProto.toString,
        isProperty, forEach, undef;

    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
    var isExtended = new Date(-3509827334573292);
    try {
      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
      // results for certain dates in Opera >= 10.53.
      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
        // Safari < 2.0.2 stores the internal millisecond time value correctly,
        // but clips the values returned by the date methods to the range of
        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
    } catch (exception) {}

    // Internal: Determines whether the native `JSON.stringify` and `parse`
    // implementations are spec-compliant. Based on work by Ken Snyder.
    function has(name) {
      if (has[name] !== undef) {
        // Return cached feature test result.
        return has[name];
      }
      var isSupported;
      if (name == "bug-string-char-index") {
        // IE <= 7 doesn't support accessing string characters using square
        // bracket notation. IE 8 only supports this for primitives.
        isSupported = "a"[0] != "a";
      } else if (name == "json") {
        // Indicates whether both `JSON.stringify` and `JSON.parse` are
        // supported.
        isSupported = has("json-stringify") && has("json-parse");
      } else {
        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
        // Test `JSON.stringify`.
        if (name == "json-stringify") {
          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
          if (stringifySupported) {
            // A test function object with a custom `toJSON` method.
            (value = function () {
              return 1;
            }).toJSON = value;
            try {
              stringifySupported =
                // Firefox 3.1b1 and b2 serialize string, number, and boolean
                // primitives as object literals.
                stringify(0) === "0" &&
                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                // literals.
                stringify(new Number()) === "0" &&
                stringify(new String()) == '""' &&
                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                // does not define a canonical JSON representation (this applies to
                // objects with `toJSON` properties as well, *unless* they are nested
                // within an object or array).
                stringify(getClass) === undef &&
                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                // FF 3.1b3 pass this test.
                stringify(undef) === undef &&
                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                // respectively, if the value is omitted entirely.
                stringify() === undef &&
                // FF 3.1b1, 2 throw an error if the given value is not a number,
                // string, array, object, Boolean, or `null` literal. This applies to
                // objects with custom `toJSON` methods as well, unless they are nested
                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                // methods entirely.
                stringify(value) === "1" &&
                stringify([value]) == "[1]" &&
                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                // `"[null]"`.
                stringify([undef]) == "[null]" &&
                // YUI 3.0.0b1 fails to serialize `null` literals.
                stringify(null) == "null" &&
                // FF 3.1b1, 2 halts serialization if an array contains a function:
                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                // elides non-JSON values from objects and arrays, unless they
                // define custom `toJSON` methods.
                stringify([undef, getClass, null]) == "[null,null,null]" &&
                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                stringify(null, value) === "1" &&
                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                // serialize extended years.
                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                // The milliseconds are optional in ES 5, but required in 5.1.
                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                // four-digit years instead of six-digit years. Credits: @Yaffle.
                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                // values less than 1000. Credits: @Yaffle.
                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
            } catch (exception) {
              stringifySupported = false;
            }
          }
          isSupported = stringifySupported;
        }
        // Test `JSON.parse`.
        if (name == "json-parse") {
          var parse = exports.parse;
          if (typeof parse == "function") {
            try {
              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
              // Conforming implementations should also coerce the initial argument to
              // a string prior to parsing.
              if (parse("0") === 0 && !parse(false)) {
                // Simple parsing test.
                value = parse(serialized);
                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                if (parseSupported) {
                  try {
                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                    parseSupported = !parse('"\t"');
                  } catch (exception) {}
                  if (parseSupported) {
                    try {
                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                      // certain octal literals.
                      parseSupported = parse("01") !== 1;
                    } catch (exception) {}
                  }
                  if (parseSupported) {
                    try {
                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                      // points. These environments, along with FF 3.1b1 and 2,
                      // also allow trailing commas in JSON objects and arrays.
                      parseSupported = parse("1.") !== 1;
                    } catch (exception) {}
                  }
                }
              }
            } catch (exception) {
              parseSupported = false;
            }
          }
          isSupported = parseSupported;
        }
      }
      return has[name] = !!isSupported;
    }

    if (!has("json")) {
      // Common `[[Class]]` name aliases.
      var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";

      // Detect incomplete support for accessing string characters by index.
      var charIndexBuggy = has("bug-string-char-index");

      // Define additional utility methods if the `Date` methods are buggy.
      if (!isExtended) {
        var floor = Math.floor;
        // A mapping between the months of the year and the number of days between
        // January 1st and the first of the respective month.
        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        // Internal: Calculates the number of days between the Unix epoch and the
        // first day of the given month.
        var getDay = function (year, month) {
          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
        };
      }

      // Internal: Determines if a property is a direct property of the given
      // object. Delegates to the native `Object#hasOwnProperty` method.
      if (!(isProperty = objectProto.hasOwnProperty)) {
        isProperty = function (property) {
          var members = {}, constructor;
          if ((members.__proto__ = null, members.__proto__ = {
            // The *proto* property cannot be set multiple times in recent
            // versions of Firefox and SeaMonkey.
            "toString": 1
          }, members).toString != getClass) {
            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
            // supports the mutable *proto* property.
            isProperty = function (property) {
              // Capture and break the object's prototype chain (see section 8.6.2
              // of the ES 5.1 spec). The parenthesized expression prevents an
              // unsafe transformation by the Closure Compiler.
              var original = this.__proto__, result = property in (this.__proto__ = null, this);
              // Restore the original prototype chain.
              this.__proto__ = original;
              return result;
            };
          } else {
            // Capture a reference to the top-level `Object` constructor.
            constructor = members.constructor;
            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
            // other environments.
            isProperty = function (property) {
              var parent = (this.constructor || constructor).prototype;
              return property in this && !(property in parent && this[property] === parent[property]);
            };
          }
          members = null;
          return isProperty.call(this, property);
        };
      }

      // Internal: Normalizes the `for...in` iteration algorithm across
      // environments. Each enumerated key is yielded to a `callback` function.
      forEach = function (object, callback) {
        var size = 0, Properties, members, property;

        // Tests for bugs in the current environment's `for...in` algorithm. The
        // `valueOf` property inherits the non-enumerable flag from
        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
        (Properties = function () {
          this.valueOf = 0;
        }).prototype.valueOf = 0;

        // Iterate over a new instance of the `Properties` class.
        members = new Properties();
        for (property in members) {
          // Ignore all properties inherited from `Object.prototype`.
          if (isProperty.call(members, property)) {
            size++;
          }
        }
        Properties = members = null;

        // Normalize the iteration algorithm.
        if (!size) {
          // A list of non-enumerable properties inherited from `Object.prototype`.
          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
          // properties.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, length;
            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
            for (property in object) {
              // Gecko <= 1.0 enumerates the `prototype` property of functions under
              // certain conditions; IE does not.
              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                callback(property);
              }
            }
            // Manually invoke the callback for each non-enumerable property.
            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
          };
        } else if (size == 2) {
          // Safari <= 2.0.4 enumerates shadowed properties twice.
          forEach = function (object, callback) {
            // Create a set of iterated properties.
            var members = {}, isFunction = getClass.call(object) == functionClass, property;
            for (property in object) {
              // Store each property name to prevent double enumeration. The
              // `prototype` property of functions is not enumerated due to cross-
              // environment inconsistencies.
              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
                callback(property);
              }
            }
          };
        } else {
          // No bugs detected; use the standard `for...in` algorithm.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
            for (property in object) {
              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                callback(property);
              }
            }
            // Manually invoke the callback for the `constructor` property due to
            // cross-environment inconsistencies.
            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
              callback(property);
            }
          };
        }
        return forEach(object, callback);
      };

      // Public: Serializes a JavaScript `value` as a JSON string. The optional
      // `filter` argument may specify either a function that alters how object and
      // array members are serialized, or an array of strings and numbers that
      // indicates which properties should be serialized. The optional `width`
      // argument may be either a string or number that specifies the indentation
      // level of the output.
      if (!has("json-stringify")) {
        // Internal: A map of control characters and their escaped equivalents.
        var Escapes = {
          92: "\\\\",
          34: '\\"',
          8: "\\b",
          12: "\\f",
          10: "\\n",
          13: "\\r",
          9: "\\t"
        };

        // Internal: Converts `value` into a zero-padded string such that its
        // length is at least equal to `width`. The `width` must be <= 6.
        var leadingZeroes = "000000";
        var toPaddedString = function (width, value) {
          // The `|| 0` expression is necessary to work around a bug in
          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
          return (leadingZeroes + (value || 0)).slice(-width);
        };

        // Internal: Double-quotes a string `value`, replacing all ASCII control
        // characters (characters with code unit values between 0 and 31) with
        // their escaped equivalents. This is an implementation of the
        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
        var unicodePrefix = "\\u00";
        var quote = function (value) {
          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
          for (; index < length; index++) {
            var charCode = value.charCodeAt(index);
            // If the character is a control character, append its Unicode or
            // shorthand escape sequence; otherwise, append the character as-is.
            switch (charCode) {
              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
                result += Escapes[charCode];
                break;
              default:
                if (charCode < 32) {
                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                  break;
                }
                result += useCharIndex ? symbols[index] : value.charAt(index);
            }
          }
          return result + '"';
        };

        // Internal: Recursively serializes an object. Implements the
        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
          try {
            // Necessary for host object support.
            value = object[property];
          } catch (exception) {}
          if (typeof value == "object" && value) {
            className = getClass.call(value);
            if (className == dateClass && !isProperty.call(value, "toJSON")) {
              if (value > -1 / 0 && value < 1 / 0) {
                // Dates are serialized according to the `Date#toJSON` method
                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                // for the ISO 8601 date time string format.
                if (getDay) {
                  // Manually compute the year, month, date, hours, minutes,
                  // seconds, and milliseconds if the `getUTC*` methods are
                  // buggy. Adapted from @Yaffle's `date-shim` project.
                  date = floor(value / 864e5);
                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                  date = 1 + date - getDay(year, month);
                  // The `time` value specifies the time within the day (see ES
                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                  // to compute `A modulo B`, as the `%` operator does not
                  // correspond to the `modulo` operation for negative numbers.
                  time = (value % 864e5 + 864e5) % 864e5;
                  // The hours, minutes, seconds, and milliseconds are obtained by
                  // decomposing the time within the day. See section 15.9.1.10.
                  hours = floor(time / 36e5) % 24;
                  minutes = floor(time / 6e4) % 60;
                  seconds = floor(time / 1e3) % 60;
                  milliseconds = time % 1e3;
                } else {
                  year = value.getUTCFullYear();
                  month = value.getUTCMonth();
                  date = value.getUTCDate();
                  hours = value.getUTCHours();
                  minutes = value.getUTCMinutes();
                  seconds = value.getUTCSeconds();
                  milliseconds = value.getUTCMilliseconds();
                }
                // Serialize extended years correctly.
                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                  // Months, dates, hours, minutes, and seconds should have two
                  // digits; milliseconds should have three.
                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                  // Milliseconds are optional in ES 5.0, but required in 5.1.
                  "." + toPaddedString(3, milliseconds) + "Z";
              } else {
                value = null;
              }
            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
              // ignores all `toJSON` methods on these objects unless they are
              // defined directly on an instance.
              value = value.toJSON(property);
            }
          }
          if (callback) {
            // If a replacement function was provided, call it to obtain the value
            // for serialization.
            value = callback.call(object, property, value);
          }
          if (value === null) {
            return "null";
          }
          className = getClass.call(value);
          if (className == booleanClass) {
            // Booleans are represented literally.
            return "" + value;
          } else if (className == numberClass) {
            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
            // `"null"`.
            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
          } else if (className == stringClass) {
            // Strings are double-quoted and escaped.
            return quote("" + value);
          }
          // Recursively serialize objects and arrays.
          if (typeof value == "object") {
            // Check for cyclic structures. This is a linear search; performance
            // is inversely proportional to the number of unique nested objects.
            for (length = stack.length; length--;) {
              if (stack[length] === value) {
                // Cyclic structures cannot be serialized by `JSON.stringify`.
                throw TypeError();
              }
            }
            // Add the object to the stack of traversed objects.
            stack.push(value);
            results = [];
            // Save the current indentation level and indent one additional level.
            prefix = indentation;
            indentation += whitespace;
            if (className == arrayClass) {
              // Recursively serialize array elements.
              for (index = 0, length = value.length; index < length; index++) {
                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                results.push(element === undef ? "null" : element);
              }
              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
            } else {
              // Recursively serialize object members. Members are selected from
              // either a user-specified list of property names, or the object
              // itself.
              forEach(properties || value, function (property) {
                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                if (element !== undef) {
                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                  // is not the empty string, let `member` {quote(property) + ":"}
                  // be the concatenation of `member` and the `space` character."
                  // The "`space` character" refers to the literal space
                  // character, not the `space` {width} argument provided to
                  // `JSON.stringify`.
                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                }
              });
              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
            }
            // Remove the object from the traversed object stack.
            stack.pop();
            return result;
          }
        };

        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
        exports.stringify = function (source, filter, width) {
          var whitespace, callback, properties, className;
          if (objectTypes[typeof filter] && filter) {
            if ((className = getClass.call(filter)) == functionClass) {
              callback = filter;
            } else if (className == arrayClass) {
              // Convert the property names array into a makeshift set.
              properties = {};
              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
            }
          }
          if (width) {
            if ((className = getClass.call(width)) == numberClass) {
              // Convert the `width` to an integer and create a string containing
              // `width` number of space characters.
              if ((width -= width % 1) > 0) {
                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
              }
            } else if (className == stringClass) {
              whitespace = width.length <= 10 ? width : width.slice(0, 10);
            }
          }
          // Opera <= 7.54u2 discards the values associated with empty string keys
          // (`""`) only if they are used directly within an object member list
          // (e.g., `!("" in { "": 1})`).
          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
        };
      }

      // Public: Parses a JSON source string.
      if (!has("json-parse")) {
        var fromCharCode = String.fromCharCode;

        // Internal: A map of escaped control characters and their unescaped
        // equivalents.
        var Unescapes = {
          92: "\\",
          34: '"',
          47: "/",
          98: "\b",
          116: "\t",
          110: "\n",
          102: "\f",
          114: "\r"
        };

        // Internal: Stores the parser state.
        var Index, Source;

        // Internal: Resets the parser state and throws a `SyntaxError`.
        var abort = function () {
          Index = Source = null;
          throw SyntaxError();
        };

        // Internal: Returns the next token, or `"$"` if the parser has reached
        // the end of the source string. A token may be a string, number, `null`
        // literal, or Boolean literal.
        var lex = function () {
          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
          while (Index < length) {
            charCode = source.charCodeAt(Index);
            switch (charCode) {
              case 9: case 10: case 13: case 32:
                // Skip whitespace tokens, including tabs, carriage returns, line
                // feeds, and space characters.
                Index++;
                break;
              case 123: case 125: case 91: case 93: case 58: case 44:
                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                // the current position.
                value = charIndexBuggy ? source.charAt(Index) : source[Index];
                Index++;
                return value;
              case 34:
                // `"` delimits a JSON string; advance to the next character and
                // begin parsing the string. String tokens are prefixed with the
                // sentinel `@` character to distinguish them from punctuators and
                // end-of-string tokens.
                for (value = "@", Index++; Index < length;) {
                  charCode = source.charCodeAt(Index);
                  if (charCode < 32) {
                    // Unescaped ASCII control characters (those with a code unit
                    // less than the space character) are not permitted.
                    abort();
                  } else if (charCode == 92) {
                    // A reverse solidus (`\`) marks the beginning of an escaped
                    // control character (including `"`, `\`, and `/`) or Unicode
                    // escape sequence.
                    charCode = source.charCodeAt(++Index);
                    switch (charCode) {
                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                        // Revive escaped control characters.
                        value += Unescapes[charCode];
                        Index++;
                        break;
                      case 117:
                        // `\u` marks the beginning of a Unicode escape sequence.
                        // Advance to the first character and validate the
                        // four-digit code point.
                        begin = ++Index;
                        for (position = Index + 4; Index < position; Index++) {
                          charCode = source.charCodeAt(Index);
                          // A valid sequence comprises four hexdigits (case-
                          // insensitive) that form a single hexadecimal value.
                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                            // Invalid Unicode escape sequence.
                            abort();
                          }
                        }
                        // Revive the escaped character.
                        value += fromCharCode("0x" + source.slice(begin, Index));
                        break;
                      default:
                        // Invalid escape sequence.
                        abort();
                    }
                  } else {
                    if (charCode == 34) {
                      // An unescaped double-quote character marks the end of the
                      // string.
                      break;
                    }
                    charCode = source.charCodeAt(Index);
                    begin = Index;
                    // Optimize for the common case where a string is valid.
                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
                      charCode = source.charCodeAt(++Index);
                    }
                    // Append the string as-is.
                    value += source.slice(begin, Index);
                  }
                }
                if (source.charCodeAt(Index) == 34) {
                  // Advance to the next character and return the revived string.
                  Index++;
                  return value;
                }
                // Unterminated string.
                abort();
              default:
                // Parse numbers and literals.
                begin = Index;
                // Advance past the negative sign, if one is specified.
                if (charCode == 45) {
                  isSigned = true;
                  charCode = source.charCodeAt(++Index);
                }
                // Parse an integer or floating-point value.
                if (charCode >= 48 && charCode <= 57) {
                  // Leading zeroes are interpreted as octal literals.
                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                    // Illegal octal literal.
                    abort();
                  }
                  isSigned = false;
                  // Parse the integer component.
                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                  // Floats cannot contain a leading decimal point; however, this
                  // case is already accounted for by the parser.
                  if (source.charCodeAt(Index) == 46) {
                    position = ++Index;
                    // Parse the decimal component.
                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal trailing decimal.
                      abort();
                    }
                    Index = position;
                  }
                  // Parse exponents. The `e` denoting the exponent is
                  // case-insensitive.
                  charCode = source.charCodeAt(Index);
                  if (charCode == 101 || charCode == 69) {
                    charCode = source.charCodeAt(++Index);
                    // Skip past the sign following the exponent, if one is
                    // specified.
                    if (charCode == 43 || charCode == 45) {
                      Index++;
                    }
                    // Parse the exponential component.
                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal empty exponent.
                      abort();
                    }
                    Index = position;
                  }
                  // Coerce the parsed value to a JavaScript number.
                  return +source.slice(begin, Index);
                }
                // A negative sign may only precede numbers.
                if (isSigned) {
                  abort();
                }
                // `true`, `false`, and `null` literals.
                if (source.slice(Index, Index + 4) == "true") {
                  Index += 4;
                  return true;
                } else if (source.slice(Index, Index + 5) == "false") {
                  Index += 5;
                  return false;
                } else if (source.slice(Index, Index + 4) == "null") {
                  Index += 4;
                  return null;
                }
                // Unrecognized token.
                abort();
            }
          }
          // Return the sentinel `$` character if the parser has reached the end
          // of the source string.
          return "$";
        };

        // Internal: Parses a JSON `value` token.
        var get = function (value) {
          var results, hasMembers;
          if (value == "$") {
            // Unexpected end of input.
            abort();
          }
          if (typeof value == "string") {
            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
              // Remove the sentinel `@` character.
              return value.slice(1);
            }
            // Parse object and array literals.
            if (value == "[") {
              // Parses a JSON array, returning a new JavaScript array.
              results = [];
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing square bracket marks the end of the array literal.
                if (value == "]") {
                  break;
                }
                // If the array literal contains elements, the current token
                // should be a comma separating the previous element from the
                // next.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "]") {
                      // Unexpected trailing `,` in array literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each array element.
                    abort();
                  }
                }
                // Elisions and leading commas are not permitted.
                if (value == ",") {
                  abort();
                }
                results.push(get(value));
              }
              return results;
            } else if (value == "{") {
              // Parses a JSON object, returning a new JavaScript object.
              results = {};
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing curly brace marks the end of the object literal.
                if (value == "}") {
                  break;
                }
                // If the object literal contains members, the current token
                // should be a comma separator.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "}") {
                      // Unexpected trailing `,` in object literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each object member.
                    abort();
                  }
                }
                // Leading commas are not permitted, object property names must be
                // double-quoted strings, and a `:` must separate each property
                // name and value.
                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                  abort();
                }
                results[value.slice(1)] = get(lex());
              }
              return results;
            }
            // Unexpected token encountered.
            abort();
          }
          return value;
        };

        // Internal: Updates a traversed object member.
        var update = function (source, property, callback) {
          var element = walk(source, property, callback);
          if (element === undef) {
            delete source[property];
          } else {
            source[property] = element;
          }
        };

        // Internal: Recursively traverses a parsed JSON object, invoking the
        // `callback` function for each value. This is an implementation of the
        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
        var walk = function (source, property, callback) {
          var value = source[property], length;
          if (typeof value == "object" && value) {
            // `forEach` can't be used to traverse an array in Opera <= 8.54
            // because its `Object#hasOwnProperty` implementation returns `false`
            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
            if (getClass.call(value) == arrayClass) {
              for (length = value.length; length--;) {
                update(value, length, callback);
              }
            } else {
              forEach(value, function (property) {
                update(value, property, callback);
              });
            }
          }
          return callback.call(source, property, value);
        };

        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
        exports.parse = function (source, callback) {
          var result, value;
          Index = 0;
          Source = "" + source;
          result = get(lex());
          // If a JSON string contains multiple tokens, it is invalid.
          if (lex() != "$") {
            abort();
          }
          // Reset the parser state.
          Index = Source = null;
          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
        };
      }
    }

    exports["runInContext"] = runInContext;
    return exports;
  }

  if (freeExports && !isLoader) {
    // Export for CommonJS environments.
    runInContext(root, freeExports);
  } else {
    // Export for web browsers and JavaScript engines.
    var nativeJSON = root.JSON,
        previousJSON = root["JSON3"],
        isRestored = false;

    var JSON3 = runInContext(root, (root["JSON3"] = {
      // Public: Restores the original value of the global `JSON` object and
      // returns a reference to the `JSON3` object.
      "noConflict": function () {
        if (!isRestored) {
          isRestored = true;
          root.JSON = nativeJSON;
          root["JSON3"] = previousJSON;
          nativeJSON = previousJSON = null;
        }
        return JSON3;
      }
    }));

    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return JSON3;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}).call(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(261)(module), __webpack_require__(9)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EMPTY_SEPARATOR = "";
exports.SPACE_SEPARATOR = " ";
exports.NEW_LINE_SEPARATOR = "\n";
var TokenFormat;
(function (TokenFormat) {
    TokenFormat[TokenFormat["PRETTY"] = 0] = "PRETTY";
    TokenFormat[TokenFormat["COMPACT"] = 1] = "COMPACT";
})(TokenFormat = exports.TokenFormat || (exports.TokenFormat = {}));
var Token = (function () {
    function Token(value) {
        this.value = value;
    }
    ;
    Token.prototype.getTokenValue = function (format, nextToken) {
        var separator = exports.EMPTY_SEPARATOR;
        if (nextToken !== void 0) {
            switch (format) {
                case TokenFormat.PRETTY:
                    separator = this.getPrettySeparator(nextToken);
                    break;
                case TokenFormat.COMPACT:
                    separator = this.getCompactSeparator(nextToken);
                    break;
            }
        }
        return this.value + separator;
    };
    return Token;
}());
exports.Token = Token;
exports.default = Token;

//# sourceMappingURL=Token.js.map


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractError = (function (_super) {
    __extends(AbstractError, _super);
    function AbstractError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        if ("captureStackTrace" in Error)
            Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    Object.defineProperty(AbstractError.prototype, "name", {
        get: function () { return "AbstractError"; },
        enumerable: true,
        configurable: true
    });
    return AbstractError;
}(Error));
exports.AbstractError = AbstractError;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var random = __webpack_require__(32);

var onUnload = {}
  , afterUnload = false
    // detect google chrome packaged apps because they don't allow the 'unload' event
  , isChromePackagedApp = global.chrome && global.chrome.app && global.chrome.app.runtime
  ;

module.exports = {
  attachEvent: function(event, listener) {
    if (typeof global.addEventListener !== 'undefined') {
      global.addEventListener(event, listener, false);
    } else if (global.document && global.attachEvent) {
      // IE quirks.
      // According to: http://stevesouders.com/misc/test-postmessage.php
      // the message gets delivered only to 'document', not 'window'.
      global.document.attachEvent('on' + event, listener);
      // I get 'window' for ie8.
      global.attachEvent('on' + event, listener);
    }
  }

, detachEvent: function(event, listener) {
    if (typeof global.addEventListener !== 'undefined') {
      global.removeEventListener(event, listener, false);
    } else if (global.document && global.detachEvent) {
      global.document.detachEvent('on' + event, listener);
      global.detachEvent('on' + event, listener);
    }
  }

, unloadAdd: function(listener) {
    if (isChromePackagedApp) {
      return null;
    }

    var ref = random.string(8);
    onUnload[ref] = listener;
    if (afterUnload) {
      setTimeout(this.triggerUnloadCallbacks, 0);
    }
    return ref;
  }

, unloadDel: function(ref) {
    if (ref in onUnload) {
      delete onUnload[ref];
    }
  }

, triggerUnloadCallbacks: function() {
    for (var ref in onUnload) {
      onUnload[ref]();
      delete onUnload[ref];
    }
  }
};

var unloadTriggered = function() {
  if (afterUnload) {
    return;
  }
  afterUnload = true;
  module.exports.triggerUnloadCallbacks();
};

// 'unload' alone is not reliable in opera within an iframe, but we
// can't use `beforeunload` as IE fires it on javascript: links.
if (!isChromePackagedApp) {
  module.exports.attachEvent('unload', unloadTriggered);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(26));
__export(__webpack_require__(65));

//# sourceMappingURL=index.js.map


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(27);
var IllegalArgumentError_1 = __webpack_require__(2);
var ModelDecorator_1 = __webpack_require__(4);
var Pointer_1 = __webpack_require__(13);
var Utils_2 = __webpack_require__(0);
function __internalRevert(target, source) {
    if (!Utils_2.isObject(target) || !Utils_2.isObject(source))
        return;
    new Set(Object.keys(target).concat(Object.keys(source))).forEach(function (key) {
        var sourceValue = Array.isArray(source[key]) ? source[key].slice() : source[key];
        if (sourceValue === null || sourceValue === void 0) {
            delete target[key];
            return;
        }
        if (Utils_2.isFunction(sourceValue))
            return;
        target[key] = sourceValue;
    });
}
exports.ResolvablePointer = {
    PROTOTYPE: {
        get $repository() {
            throw new IllegalArgumentError_1.IllegalArgumentError("Property \"$repository\" is required.");
        },
        $eTag: void 0,
        _resolved: false,
        isResolved: function () {
            return this._resolved;
        },
        _snapshot: {},
        _syncSnapshot: function () {
            var clone = Utils_2.ObjectUtils.clone(this, { arrays: true });
            if (this.types)
                clone.types = this.types.slice();
            this._snapshot = clone;
        },
        isDirty: function () {
            return !Utils_2.ObjectUtils
                .areEqual(this, this._snapshot, { arrays: true });
        },
        revert: function () {
            __internalRevert(this, this._snapshot);
            if (!this.types)
                this.types = [];
        },
        get: function (uri) {
            var _a;
            var _b = Utils_1._parseURIParams(this, uri, arguments), _uri = _b._uri, _args = _b._args;
            return (_a = this.$repository).get.apply(_a, [_uri].concat(_args));
        },
        resolve: function (resource) {
            var _a;
            var _b = Utils_1._parseResourceParams(this, resource, arguments), _resource = _b._resource, _args = _b._args;
            return (_a = this.$repository).resolve.apply(_a, [_resource].concat(_args));
        },
        exists: function (uri) {
            var _a;
            var _b = Utils_1._parseURIParams(this, uri, arguments), _uri = _b._uri, _args = _b._args;
            return (_a = this.$repository).exists.apply(_a, [_uri].concat(_args));
        },
        refresh: function (resource) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _a;
            var _b = Utils_1._parseResourceParams(this, resource, arguments), _resource = _b._resource, _args = _b._args;
            return (_a = this.$repository).refresh.apply(_a, [_resource].concat(_args));
        },
        save: function (resource) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _a;
            var _b = Utils_1._parseResourceParams(this, resource, arguments), _resource = _b._resource, _args = _b._args;
            return (_a = this.$repository).save.apply(_a, [_resource].concat(_args));
        },
        saveAndRefresh: function (resource) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _a;
            var _b = Utils_1._parseResourceParams(this, resource, arguments), _resource = _b._resource, _args = _b._args;
            return (_a = this.$repository).saveAndRefresh.apply(_a, [_resource].concat(_args));
        },
        delete: function (uri) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _a;
            var _b = Utils_1._parseURIParams(this, uri, arguments), _uri = _b._uri, _args = _b._args;
            return (_a = this.$repository).delete.apply(_a, [_uri].concat(_args));
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.ResolvablePointer.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.ResolvablePointer.isDecorated(object))
            return object;
        var resource = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, Pointer_1.Pointer);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.ResolvablePointer.PROTOTYPE, resource);
    },
    is: function (value) {
        return Pointer_1.Pointer.is(value)
            && exports.ResolvablePointer.isDecorated(value);
    },
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = __webpack_require__(17);
var C_1 = __webpack_require__(3);
var SCHEMA = {
    "target": {
        "@id": C_1.C.target,
        "@type": "@id",
    },
};
exports.EventMessage = {
    SCHEMA: SCHEMA,
    is: function (value) {
        return Resource_1.Resource.is(value)
            && value.hasOwnProperty("target");
    },
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(65);
var tokens_1 = __webpack_require__(7);
var tokens_2 = __webpack_require__(5);
var IRIResolver = (function () {
    function IRIResolver(base, vocab) {
        var _newTarget = this.constructor;
        this._prefixes = base
            ? new Map(base._prefixes.entries())
            : new Map();
        this._vocab = vocab ? vocab : base ? base._vocab : void 0;
        if (_newTarget === IRIResolver)
            Object.freeze(this);
    }
    IRIResolver.prototype.resolve = function (relativeIRI, vocab) {
        if (vocab === void 0) { vocab = false; }
        var tokens;
        if (utils_1.isPrefixed(relativeIRI)) {
            var _a = utils_1.getPrefixedParts(relativeIRI), prefix = _a[0], prefixIRI = _a[1];
            var used = this._prefixes.get(prefix);
            if (used === void 0)
                throw new Error("The used prefix has not been declared");
            tokens = [new tokens_2.StringLiteral(prefix), tokens_1.PREFIX_SYMBOL, new tokens_2.StringLiteral(prefixIRI)];
            if (!used)
                this._prefixes.set(prefix, true);
        }
        else {
            tokens = utils_1.resolve(relativeIRI, vocab ? this._vocab : void 0);
        }
        return tokens;
    };
    return IRIResolver;
}());
exports.IRIResolver = IRIResolver;

//# sourceMappingURL=IRIResolver.js.map


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = __webpack_require__(2);
var FreeResources_1 = __webpack_require__(39);
var JSONLDParser_1 = __webpack_require__(44);
var ErrorResponse_1 = __webpack_require__(72);
var Pointer_1 = __webpack_require__(13);
var URI_1 = __webpack_require__(8);
var Utils_1 = __webpack_require__(0);
function _parseURIParams(resource, uri, args) {
    var _uri = Utils_1.isString(uri) ?
        URI_1.URI.resolve(resource.$id, uri) : resource.$id;
    var _args = !Utils_1.isString(uri) ?
        Array.from(args) :
        Array.prototype.slice.call(args, 1);
    return { _uri: _uri, _args: _args };
}
exports._parseURIParams = _parseURIParams;
function _parseResourceParams(resource, $resource, args) {
    var _resource = Pointer_1.Pointer.is($resource) ?
        $resource : resource;
    var _args = !Pointer_1.Pointer.is($resource) ?
        Array.from(args) :
        Array.prototype.slice.call(args, 1);
    return { _resource: _resource, _args: _args };
}
exports._parseResourceParams = _parseResourceParams;
function _getErrorResponseParserFn(registry) {
    return function (error) {
        if (!("response" in error))
            return Promise.reject(error);
        if (!error.response.data)
            return Promise.reject(error);
        return new JSONLDParser_1.JSONLDParser()
            .parse(error.response.data)
            .then(function (freeNodes) {
            var freeResources = FreeResources_1.FreeResources.parseFreeNodes(registry, freeNodes);
            var errorResponses = freeResources
                .getPointers(true)
                .filter(ErrorResponse_1.ErrorResponse.is);
            if (errorResponses.length === 0)
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("The response string does not contains a c:ErrorResponse."));
            if (errorResponses.length > 1)
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("The response string contains multiple c:ErrorResponse."));
            var errorResponse = Object.assign(error, errorResponses[0]);
            error.message = ErrorResponse_1.ErrorResponse.getMessage(errorResponse);
            return Promise.reject(error);
        }, function () {
            return Promise.reject(error);
        });
    };
}
exports._getErrorResponseParserFn = _getErrorResponseParserFn;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(__webpack_require__(193));
var https_1 = __importDefault(__webpack_require__(194));
var url_1 = __importDefault(__webpack_require__(195));
var Utils_1 = __webpack_require__(0);
var index_1 = __webpack_require__(103);
var BadResponseError_1 = __webpack_require__(55);
var UnknownError_1 = __webpack_require__(106);
var Header_1 = __webpack_require__(70);
var HTTPMethod_1 = __webpack_require__(107);
var Response_1 = __webpack_require__(108);
function onResolve(resolve, reject, response) {
    if (response.status >= 200 && response.status <= 299) {
        resolve(response);
    }
    else {
        if (!index_1.statusCodeMap.has(response.status))
            return reject(new UnknownError_1.UnknownError(response.data, response));
        reject(new (index_1.statusCodeMap.get(response.status))(response.data, response));
    }
}
function sendWithBrowser(method, url, body, options) {
    return new Promise(function (resolve, reject) {
        var request = options.request ? options.request : new XMLHttpRequest();
        request.open(method, url, true);
        if (options.headers)
            options.headers
                .forEach(function (header, name) { return request.setRequestHeader(name, header.toString()); });
        request.withCredentials = options.sendCredentialsOnCORS;
        if (options.timeout)
            request.timeout = options.timeout;
        request.onload = request.onerror = function () {
            var response = new Response_1.Response(request);
            onResolve(resolve, reject, response);
        };
        if (body) {
            request.send(body);
        }
        else {
            request.send();
        }
    });
}
function sendWithNode(method, url, body, options) {
    return new Promise(function (resolve, reject) {
        function returnResponse(request, res) {
            var rawData = [];
            res.on("data", function (chunk) {
                if (typeof chunk === "string")
                    chunk = Buffer.from(chunk, "utf-8");
                rawData.push(chunk);
            }).on("end", function () {
                var data = Buffer.concat(rawData).toString("utf8");
                var response = new Response_1.Response(request, data, res);
                onResolve(resolve, reject, response);
            });
        }
        var numberOfRedirects = 0;
        function sendRequestWithRedirect(_url) {
            var parsedURL = url_1.default.parse(_url);
            var Adapter = parsedURL.protocol === "http:" ? http_1.default : https_1.default;
            var requestOptions = {
                protocol: parsedURL.protocol,
                hostname: parsedURL.hostname,
                port: parsedURL.port,
                path: parsedURL.path,
                method: method,
                headers: {},
            };
            if (options.headers)
                options.headers
                    .forEach(function (header, name) { return requestOptions.headers[name] = header.toString(); });
            var request = Adapter.request(requestOptions);
            if (options.timeout)
                request.setTimeout(options.timeout);
            request.on("response", function (res) {
                if (res.statusCode >= 300 && res.statusCode <= 399 && "location" in res.headers) {
                    if (++numberOfRedirects < 10)
                        return sendRequestWithRedirect(url_1.default.resolve(_url, res.headers.location));
                }
                returnResponse(request, res);
            });
            request.on("error", function (error) {
                var response = new Response_1.Response(request, error.message);
                onResolve(resolve, reject, response);
            });
            request.end(body);
        }
        sendRequestWithRedirect(url);
    });
}
function sendRequest(method, url, body, options) {
    return typeof XMLHttpRequest !== "undefined" ?
        sendWithBrowser(method, url, body, options) :
        sendWithNode(method, url, body, options);
}
function isBody(data) {
    return Utils_1.isString(data)
        || typeof Blob !== "undefined" && data instanceof Blob
        || typeof Buffer !== "undefined" && data instanceof Buffer;
}
var RequestService = (function () {
    function RequestService() {
    }
    RequestService.send = function (method, url, bodyOrOptions, optionsOrParser, parser) {
        var _this = this;
        if (bodyOrOptions === void 0) { bodyOrOptions = RequestService.defaultOptions; }
        if (optionsOrParser === void 0) { optionsOrParser = RequestService.defaultOptions; }
        if (parser === void 0) { parser = null; }
        var body = null;
        var options = Utils_1.hasProperty(optionsOrParser, "parse") ? bodyOrOptions : optionsOrParser;
        parser = Utils_1.hasProperty(optionsOrParser, "parse") ? optionsOrParser : parser;
        if (isBody(bodyOrOptions)) {
            body = bodyOrOptions;
        }
        else {
            options = bodyOrOptions ? bodyOrOptions : options;
        }
        options = Object.assign({}, RequestService.defaultOptions, options);
        if (Utils_1.isNumber(method))
            method = HTTPMethod_1.HTTPMethod[method];
        var requestPromise = sendRequest(method, url, body, options)
            .then(function (response) {
            if (method === "GET" && options.headers)
                return _this._handleGETResponse(url, options, response);
            else
                return response;
        });
        if (parser === null)
            return requestPromise;
        return requestPromise.then(function (response) {
            return parser.parse(response.data).then(function (parsedBody) {
                return [parsedBody, response];
            });
        });
    };
    RequestService.options = function (url, options) {
        if (options === void 0) { options = RequestService.defaultOptions; }
        return RequestService.send(HTTPMethod_1.HTTPMethod.OPTIONS, url, options);
    };
    RequestService.head = function (url, options) {
        if (options === void 0) { options = RequestService.defaultOptions; }
        return RequestService.send(HTTPMethod_1.HTTPMethod.HEAD, url, options);
    };
    RequestService.get = function (url, options, parser) {
        if (options === void 0) { options = RequestService.defaultOptions; }
        if (parser === void 0) { parser = null; }
        return RequestService.send(HTTPMethod_1.HTTPMethod.GET, url, null, options, parser);
    };
    RequestService.post = function (url, bodyOrOptions, options, parser) {
        if (bodyOrOptions === void 0) { bodyOrOptions = RequestService.defaultOptions; }
        if (options === void 0) { options = RequestService.defaultOptions; }
        if (parser === void 0) { parser = null; }
        return RequestService.send(HTTPMethod_1.HTTPMethod.POST, url, bodyOrOptions, options, parser);
    };
    RequestService.put = function (url, bodyOrOptions, options, parser) {
        if (bodyOrOptions === void 0) { bodyOrOptions = RequestService.defaultOptions; }
        if (options === void 0) { options = RequestService.defaultOptions; }
        if (parser === void 0) { parser = null; }
        return RequestService.send(HTTPMethod_1.HTTPMethod.PUT, url, bodyOrOptions, options, parser);
    };
    RequestService.patch = function (url, bodyOrOptions, options, parser) {
        if (bodyOrOptions === void 0) { bodyOrOptions = RequestService.defaultOptions; }
        if (options === void 0) { options = RequestService.defaultOptions; }
        if (parser === void 0) { parser = null; }
        return RequestService.send(HTTPMethod_1.HTTPMethod.PATCH, url, bodyOrOptions, options, parser);
    };
    RequestService.delete = function (url, bodyOrOptions, optionsOrParser, parser) {
        if (bodyOrOptions === void 0) { bodyOrOptions = RequestService.defaultOptions; }
        if (optionsOrParser === void 0) { optionsOrParser = RequestService.defaultOptions; }
        if (parser === void 0) { parser = null; }
        return RequestService.send(HTTPMethod_1.HTTPMethod.DELETE, url, bodyOrOptions, optionsOrParser, parser);
    };
    RequestService._handleGETResponse = function (url, requestOptions, response) {
        var _this = this;
        return Promise.resolve()
            .then(function () {
            if (_this._contentTypeIsAccepted(requestOptions, response))
                return response;
            _this._setNoCacheHeaders(requestOptions);
            if (!_this._isChromiumAgent())
                _this._setFalseETag(requestOptions);
            return sendRequest("GET", url, null, requestOptions)
                .then(function (noCachedResponse) {
                if (!_this._contentTypeIsAccepted(requestOptions, response)) {
                    throw new BadResponseError_1.BadResponseError("The server responded with an unacceptable Content-Type", response);
                }
                return noCachedResponse;
            });
        });
    };
    RequestService._contentTypeIsAccepted = function (requestOptions, response) {
        var accepts = requestOptions.headers.has("accept") ?
            requestOptions.headers.get("accept").values :
            [];
        var contentType = response.headers.has("content-type") ?
            response.headers.get("content-type") :
            null;
        return !contentType || accepts.some(contentType.hasValue, contentType);
    };
    RequestService._setNoCacheHeaders = function (requestOptions) {
        requestOptions.headers
            .set("pragma", new Header_1.Header("no-cache"))
            .set("cache-control", new Header_1.Header("no-cache, max-age=0"));
    };
    RequestService._isChromiumAgent = function () {
        return typeof window !== "undefined" && !window["chrome"];
    };
    RequestService._setFalseETag = function (requestOptions) {
        requestOptions.headers.set("if-none-match", new Header_1.Header());
    };
    RequestService.defaultOptions = {
        sendCredentialsOnCORS: true,
    };
    return RequestService;
}());
exports.RequestService = RequestService;
var RequestUtils = (function () {
    function RequestUtils() {
    }
    RequestUtils.getHeader = function (headerName, requestOptions, initialize) {
        if (initialize === void 0) { initialize = false; }
        headerName = headerName.toLowerCase();
        if (initialize) {
            var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
            if (!headers.has(headerName))
                headers.set(headerName, new Header_1.Header());
        }
        if (!requestOptions.headers)
            return undefined;
        return requestOptions.headers.get(headerName);
    };
    RequestUtils.setAcceptHeader = function (accept, requestOptions) {
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        headers.set("accept", new Header_1.Header(accept));
        return requestOptions;
    };
    RequestUtils.setContentTypeHeader = function (contentType, requestOptions) {
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        headers.set("content-type", new Header_1.Header(contentType));
        return requestOptions;
    };
    RequestUtils.setIfMatchHeader = function (eTag, requestOptions) {
        if (!eTag)
            return;
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        headers.set("if-match", new Header_1.Header(eTag));
        return requestOptions;
    };
    RequestUtils.setIfNoneMatchHeader = function (eTag, requestOptions) {
        if (!eTag)
            return;
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        headers.set("if-none-match", new Header_1.Header(eTag));
        return requestOptions;
    };
    RequestUtils.setPreferredInteractionModel = function (interactionModelURI, requestOptions) {
        var prefer = RequestUtils.getHeader("prefer", requestOptions, true);
        prefer.values.push(interactionModelURI + "; rel=interaction-model");
        return requestOptions;
    };
    RequestUtils.setPreferredRetrieval = function (retrievalType, requestOptions) {
        var prefer = RequestUtils.getHeader("prefer", requestOptions, true);
        prefer.values.push("return=" + retrievalType);
        return requestOptions;
    };
    RequestUtils.setRetrievalPreferences = function (preferences, requestOptions) {
        var prefer = RequestUtils.getHeader("prefer", requestOptions, true);
        var keys = ["include", "omit"];
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (key in preferences && preferences[key].length > 0) {
                prefer.values.push(key + "=\"" + preferences[key].join(" ") + "\"");
            }
        }
        return requestOptions;
    };
    RequestUtils.setSlug = function (slug, requestOptions) {
        var slugHeader = RequestUtils.getHeader("slug", requestOptions, true);
        slugHeader.values.push(slug);
        return requestOptions;
    };
    RequestUtils.isOptions = function (object) {
        return Utils_1.hasPropertyDefined(object, "headers")
            || Utils_1.hasPropertyDefined(object, "sendCredentialsOnCORS")
            || Utils_1.hasPropertyDefined(object, "timeout")
            || Utils_1.hasPropertyDefined(object, "request");
    };
    RequestUtils.cloneOptions = function (options) {
        var clone = __assign({}, options, { headers: new Map() });
        if (options.headers)
            options.headers
                .forEach(function (value, key) { return clone.headers.set(key, new Header_1.Header(value.values.slice())); });
        return clone;
    };
    return RequestUtils;
}());
exports.RequestUtils = RequestUtils;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = __webpack_require__(2);
var InvalidJSONLDSyntaxError_1 = __webpack_require__(69);
var URI_1 = __webpack_require__(8);
var Utils = __importStar(__webpack_require__(0));
var XSD_1 = __webpack_require__(11);
var ContainerType_1 = __webpack_require__(41);
var DigestedObjectSchema_1 = __webpack_require__(15);
var DigestedObjectSchemaProperty_1 = __webpack_require__(56);
var ObjectSchemaUtils_1 = __webpack_require__(71);
var PointerType_1 = __webpack_require__(57);
var ObjectSchemaDigester = (function () {
    function ObjectSchemaDigester() {
    }
    ObjectSchemaDigester.digestSchema = function (schemas) {
        if (!Array.isArray(schemas))
            return ObjectSchemaDigester._digestSchema(schemas);
        var digestedSchemas = schemas
            .map(function (schema) { return ObjectSchemaDigester._digestSchema(schema); });
        return ObjectSchemaDigester._combineSchemas(digestedSchemas);
    };
    ObjectSchemaDigester.digestProperty = function (name, definition, digestedSchema) {
        var digestedDefinition = new DigestedObjectSchemaProperty_1.DigestedObjectSchemaProperty();
        if ("@id" in definition) {
            var uri = definition["@id"];
            if (URI_1.URI.isPrefixed(name))
                throw new IllegalArgumentError_1.IllegalArgumentError("A prefixed property cannot have assigned another URI.");
            if (!Utils.isString(uri))
                throw new IllegalArgumentError_1.IllegalArgumentError("@id needs to point to a string");
            digestedDefinition.uri = uri;
        }
        else {
            digestedDefinition.uri = name;
        }
        if ("@type" in definition) {
            var type = definition["@type"];
            if (!Utils.isString(type))
                throw new IllegalArgumentError_1.IllegalArgumentError("@type needs to point to a string");
            if (type === "@id" || type === "@vocab") {
                digestedDefinition.literal = false;
                digestedDefinition.pointerType = type === "@id" ? PointerType_1.PointerType.ID : PointerType_1.PointerType.VOCAB;
            }
            else {
                if (URI_1.URI.isRelative(type) && type in XSD_1.XSD)
                    type = XSD_1.XSD[type];
                digestedDefinition.literal = true;
                digestedDefinition.literalType = type;
            }
        }
        if ("@language" in definition) {
            var language = definition["@language"];
            if (language !== null && !Utils.isString(language))
                throw new IllegalArgumentError_1.IllegalArgumentError("@language needs to point to a string or null.");
            digestedDefinition.literal = true;
            digestedDefinition.language = language;
        }
        if ("@container" in definition) {
            switch (definition["@container"]) {
                case "@set":
                    digestedDefinition.containerType = ContainerType_1.ContainerType.SET;
                    break;
                case "@list":
                    digestedDefinition.containerType = ContainerType_1.ContainerType.LIST;
                    break;
                case "@language":
                    if (Utils.isString(digestedDefinition.language))
                        throw new IllegalArgumentError_1.IllegalArgumentError("@container cannot be set to @language when the property definition already contains an @language tag.");
                    digestedDefinition.containerType = ContainerType_1.ContainerType.LANGUAGE;
                    break;
                default:
                    throw new IllegalArgumentError_1.IllegalArgumentError("@container needs to be equal to '@list', '@set', or '@language'");
            }
        }
        return digestedSchema ?
            ObjectSchemaUtils_1.ObjectSchemaUtils.resolveProperty(digestedSchema, digestedDefinition, true) :
            digestedDefinition;
    };
    ObjectSchemaDigester.combineDigestedObjectSchemas = function (digestedSchemas) {
        if (digestedSchemas.length === 0)
            throw new IllegalArgumentError_1.IllegalArgumentError("At least one DigestedObjectSchema needs to be specified.");
        digestedSchemas.unshift(new DigestedObjectSchema_1.DigestedObjectSchema());
        return ObjectSchemaDigester._combineSchemas(digestedSchemas);
    };
    ObjectSchemaDigester._digestSchema = function (schema) {
        var digestedSchema = new DigestedObjectSchema_1.DigestedObjectSchema();
        for (var _i = 0, _a = ["@base", "@vocab"]; _i < _a.length; _i++) {
            var propertyName = _a[_i];
            if (!(propertyName in schema))
                continue;
            var value = schema[propertyName];
            if (value !== null && !Utils.isString(value))
                throw new IllegalArgumentError_1.IllegalArgumentError("The value of '" + propertyName + "' must be a string or null.");
            if ((propertyName === "@vocab" && value === "") || !URI_1.URI.isAbsolute(value) && !URI_1.URI.isBNodeID(value))
                throw new IllegalArgumentError_1.IllegalArgumentError("The value of '" + propertyName + "' must be an absolute URI" + (propertyName === "@base" ? " or an empty string" : "") + ".");
            digestedSchema[propertyName.substr(1)] = value;
        }
        digestedSchema.base = digestedSchema.base || "";
        if ("@language" in schema) {
            var value = schema["@language"];
            if (value !== null && !Utils.isString(value))
                throw new InvalidJSONLDSyntaxError_1.InvalidJSONLDSyntaxError("The value of '@language' must be a string or null.");
            digestedSchema.language = value;
        }
        for (var propertyName in schema) {
            if (!schema.hasOwnProperty(propertyName))
                continue;
            if (propertyName === "@reverse")
                continue;
            if (propertyName === "@index")
                continue;
            if (propertyName === "@base")
                continue;
            if (propertyName === "@vocab")
                continue;
            if (propertyName === "@language")
                continue;
            var propertyValue = schema[propertyName];
            if (Utils.isString(propertyValue)) {
                if (URI_1.URI.isPrefixed(propertyName))
                    throw new IllegalArgumentError_1.IllegalArgumentError("A prefixed property cannot be equal to another URI.");
                digestedSchema.prefixes.set(propertyName, propertyValue);
            }
            else if (!!propertyValue && Utils.isObject(propertyValue)) {
                var definition = ObjectSchemaDigester.digestProperty(propertyName, propertyValue);
                digestedSchema.properties.set(propertyName, definition);
            }
            else {
                throw new IllegalArgumentError_1.IllegalArgumentError("ObjectSchema Properties can only have string values or object values.");
            }
        }
        return digestedSchema;
    };
    ObjectSchemaDigester._combineSchemas = function (digestedSchemas) {
        var targetSchema = digestedSchemas[0], restSchemas = digestedSchemas.slice(1);
        restSchemas.forEach(function (schema) {
            if (schema.vocab !== void 0)
                targetSchema.vocab = schema.vocab;
            if (schema.base !== "")
                targetSchema.base = schema.base;
            if (schema.language !== null)
                targetSchema.language = schema.language;
            Utils.MapUtils.extend(targetSchema.prefixes, schema.prefixes);
            Utils.MapUtils.extend(targetSchema.properties, schema.properties);
        });
        return targetSchema;
    };
    return ObjectSchemaDigester;
}());
exports.ObjectSchemaDigester = ObjectSchemaDigester;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = __webpack_require__(23);
var IllegalArgumentError_1 = __webpack_require__(2);
var TransientFragment_1 = __webpack_require__(73);
var ModelDecorator_1 = __webpack_require__(4);
var Pointer_1 = __webpack_require__(13);
var URI_1 = __webpack_require__(8);
var Registry_1 = __webpack_require__(40);
var Resource_1 = __webpack_require__(17);
var Utils_1 = __webpack_require__(0);
function __getLabelFrom(slug) {
    if (!iri_1.isRelative(slug) || slug.startsWith("#"))
        return slug;
    return "#" + slug;
}
function __getObjectId(object) {
    if ("$id" in object)
        return object.$id;
    if ("$slug" in object)
        return URI_1.URI.hasFragment(object.$slug) ?
            object.$slug : __getLabelFrom(object.$slug);
    return URI_1.URI.generateBNodeID();
}
function __convertNested(resource, target, tracker) {
    if (tracker === void 0) { tracker = new Set(); }
    Object
        .keys(target)
        .map(function (key) { return target[key]; })
        .forEach(function (next) {
        if (Array.isArray(next))
            return __convertNested(resource, next, tracker);
        if (!Utils_1.isPlainObject(next))
            return;
        if (exports.TransientDocument.is(next))
            return;
        if (next._registry && next._registry !== resource)
            return;
        var idOrSlug = __getObjectId(next);
        if (tracker.has(idOrSlug))
            return;
        if (!resource.inScope(idOrSlug, true))
            return;
        var fragment = resource.hasPointer(idOrSlug, true) ?
            resource.getPointer(idOrSlug, true) :
            resource.createFragment(next, idOrSlug);
        tracker.add(fragment.$id);
        __convertNested(resource, fragment, tracker);
    });
}
exports.TransientDocument = {
    PROTOTYPE: {
        $registry: void 0,
        _normalize: function () {
            var usedFragments = new Set();
            __convertNested(this, this, usedFragments);
            this.getPointers(true)
                .map(Pointer_1.Pointer.getID)
                .filter(URI_1.URI.isBNodeID)
                .filter(function (id) { return !usedFragments.has(id); })
                .forEach(this.removePointer, this);
        },
        _getLocalID: function (id) {
            if (URI_1.URI.isBNodeID(id))
                return id;
            if (URI_1.URI.isFragmentOf(id, this.$id))
                return URI_1.URI.getFragment(id);
            throw new IllegalArgumentError_1.IllegalArgumentError("\"" + id + "\" is out of scope.");
        },
        getPointer: function (id, local) {
            id = URI_1.URI.resolve(this.$id, id);
            return Registry_1.Registry.PROTOTYPE.getPointer.call(this, id, local);
        },
        hasFragment: function (id) {
            id = __getLabelFrom(id);
            if (!this.inScope(id, true))
                return false;
            var localID = this._getLocalID(id);
            return this.__resourcesMap.has(localID);
        },
        getFragment: function (id) {
            id = __getLabelFrom(id);
            var localID = this._getLocalID(id);
            var resource = this.__resourcesMap.get(localID);
            if (!resource)
                return null;
            return resource;
        },
        getFragments: function () {
            return this.getPointers(true);
        },
        createFragment: function (isOrObject, id) {
            var object = Utils_1.isObject(isOrObject) ? isOrObject : {};
            if (Utils_1.isString(isOrObject))
                id = isOrObject;
            var $id = id ? __getLabelFrom(id) : __getObjectId(object);
            var fragment = this._addPointer(Object
                .assign(object, { $id: $id }));
            __convertNested(this, fragment);
            return fragment;
        },
        removeFragment: function (fragmentOrSlug) {
            var id = __getLabelFrom(Pointer_1.Pointer.getID(fragmentOrSlug));
            if (!this.inScope(id, true))
                return false;
            return this.removePointer(id);
        },
        toJSON: function (contextOrKey) {
            var nodes = [
                Resource_1.Resource.PROTOTYPE.toJSON.call(this, contextOrKey)
            ].concat(this
                .getFragments()
                .map(function (resource) { return resource.toJSON(contextOrKey); }));
            return {
                "@id": this.$id,
                "@graph": nodes,
            };
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.TransientDocument.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.TransientDocument.isDecorated(object))
            return object;
        var base = ModelDecorator_1.ModelDecorator.definePropertiesFrom({
            __modelDecorator: TransientFragment_1.TransientFragment,
        }, object);
        var resource = ModelDecorator_1.ModelDecorator
            .decorateMultiple(base, Resource_1.Resource, Registry_1.Registry);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.TransientDocument.PROTOTYPE, resource);
    },
    is: function (value) {
        return Resource_1.Resource.is(value) &&
            Registry_1.Registry.isDecorated(value) &&
            exports.TransientDocument.isDecorated(value);
    },
    createFrom: function (object) {
        if (exports.TransientDocument.is(object))
            throw new IllegalArgumentError_1.IllegalArgumentError("The object provided is already a Document.");
        var document = exports.TransientDocument.decorate(object);
        __convertNested(document, document);
        return document;
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientDocument.createFrom(copy);
    },
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractError_1 = __webpack_require__(21);
var IllegalStateError = (function (_super) {
    __extends(IllegalStateError, _super);
    function IllegalStateError(message) {
        return _super.call(this, message) || this;
    }
    Object.defineProperty(IllegalStateError.prototype, "name", {
        get: function () { return "IllegalStateError"; },
        enumerable: true,
        configurable: true
    });
    return IllegalStateError;
}(AbstractError_1.AbstractError));
exports.IllegalStateError = IllegalStateError;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global crypto:true */
var crypto = __webpack_require__(250);

// This string has length 32, a power of 2, so the modulus doesn't introduce a
// bias.
var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
module.exports = {
  string: function(length) {
    var max = _randomStringChars.length;
    var bytes = crypto.randomBytes(length);
    var ret = [];
    for (var i = 0; i < length; i++) {
      ret.push(_randomStringChars.substr(bytes[i] % max, 1));
    }
    return ret.join('');
  }

, number: function(max) {
    return Math.floor(Math.random() * max);
  }

, numberString: function(max) {
    var t = ('' + (max - 1)).length;
    var p = new Array(t + 1).join('0');
    return (p + this.number(max)).slice(-t);
  }
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(1)
  , urlUtils = __webpack_require__(14)
  , SenderReceiver = __webpack_require__(138)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(10)('sockjs-client:ajax-based');
}

function createAjaxSender(AjaxObject) {
  return function(url, payload, callback) {
    debug('create ajax sender', url, payload);
    var opt = {};
    if (typeof payload === 'string') {
      opt.headers = {'Content-type': 'text/plain'};
    }
    var ajaxUrl = urlUtils.addPath(url, '/xhr_send');
    var xo = new AjaxObject('POST', ajaxUrl, payload, opt);
    xo.once('finish', function(status) {
      debug('finish', status);
      xo = null;

      if (status !== 200 && status !== 204) {
        return callback(new Error('http status ' + status));
      }
      callback();
    });
    return function() {
      debug('abort');
      xo.close();
      xo = null;

      var err = new Error('Aborted');
      err.code = 1000;
      callback(err);
    };
  };
}

function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
  SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
}

inherits(AjaxBasedTransport, SenderReceiver);

module.exports = AjaxBasedTransport;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Identifier_1 = __webpack_require__(35);
var NewLineSymbol_1 = __webpack_require__(66);
var Operator_1 = __webpack_require__(51);
var RightSymbol_1 = __webpack_require__(67);
var Token_1 = __webpack_require__(20);
var StringLiteral = (function (_super) {
    __extends(StringLiteral, _super);
    function StringLiteral() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringLiteral.prototype.getPrettySeparator = function (nextToken) {
        if ((nextToken instanceof Identifier_1.Identifier && nextToken["value"] !== "AS") || (nextToken instanceof NewLineSymbol_1.NewLineSymbol && (nextToken["value"] === ")" || nextToken["value"] === "}")))
            return Token_1.NEW_LINE_SEPARATOR;
        if (nextToken instanceof Operator_1.Operator || (nextToken instanceof RightSymbol_1.RightSymbol && nextToken["value"] !== ")"))
            return Token_1.EMPTY_SEPARATOR;
        return Token_1.SPACE_SEPARATOR;
    };
    StringLiteral.prototype.getCompactSeparator = function (nextToken) {
        if (this.constructor === nextToken.constructor || nextToken instanceof Identifier_1.Identifier)
            return Token_1.SPACE_SEPARATOR;
        return Token_1.EMPTY_SEPARATOR;
    };
    return StringLiteral;
}(Token_1.Token));
exports.StringLiteral = StringLiteral;
exports.default = StringLiteral;

//# sourceMappingURL=StringLiteral.js.map


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var StringLiteral_1 = __webpack_require__(34);
var Token_1 = __webpack_require__(20);
var Identifier = (function (_super) {
    __extends(Identifier, _super);
    function Identifier() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Identifier.prototype.getPrettySeparator = function (nextToken) {
        if (this.value === "UNION")
            return Token_1.NEW_LINE_SEPARATOR;
        return Token_1.SPACE_SEPARATOR;
    };
    Identifier.prototype.getCompactSeparator = function (nextToken) {
        if (this.constructor === nextToken.constructor || nextToken instanceof StringLiteral_1.StringLiteral)
            return Token_1.SPACE_SEPARATOR;
        return Token_1.EMPTY_SEPARATOR;
    };
    return Identifier;
}(Token_1.Token));
exports.Identifier = Identifier;
exports.default = Identifier;

//# sourceMappingURL=Identifier.js.map


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.joinPatterns = function (patterns) {
    return patterns
        .map(function (pattern) {
        if (pattern.token === "select")
            return "{ " + pattern + " }";
        return pattern;
    })
        .join(". ");
};

//# sourceMappingURL=utils.js.map


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Fragment_1 = __webpack_require__(96);
var ModelDecorator_1 = __webpack_require__(4);
var ResolvablePointer_1 = __webpack_require__(24);
var Utils_1 = __webpack_require__(0);
var C_1 = __webpack_require__(3);
var LDP_1 = __webpack_require__(45);
var XSD_1 = __webpack_require__(11);
var EventEmitterDocumentTrait_1 = __webpack_require__(216);
var QueryableDocumentTrait_1 = __webpack_require__(217);
var SPARQLDocumentTrait_1 = __webpack_require__(219);
var TransientDocument_1 = __webpack_require__(30);
exports.Document = {
    TYPE: C_1.C.Document,
    SCHEMA: {
        "contains": {
            "@id": LDP_1.LDP.contains,
            "@container": "@set",
            "@type": "@id",
        },
        "members": {
            "@id": LDP_1.LDP.member,
            "@container": "@set",
            "@type": "@id",
        },
        "membershipResource": {
            "@id": LDP_1.LDP.membershipResource,
            "@type": "@id",
        },
        "isMemberOfRelation": {
            "@id": LDP_1.LDP.isMemberOfRelation,
            "@type": "@id",
        },
        "hasMemberRelation": {
            "@id": LDP_1.LDP.hasMemberRelation,
            "@type": "@id",
        },
        "insertedContentRelation": {
            "@id": LDP_1.LDP.insertedContentRelation,
            "@type": "@id",
        },
        "created": {
            "@id": C_1.C.created,
            "@type": XSD_1.XSD.dateTime,
        },
        "modified": {
            "@id": C_1.C.modified,
            "@type": XSD_1.XSD.dateTime,
        },
        "defaultInteractionModel": {
            "@id": C_1.C.defaultInteractionModel,
            "@type": "@id",
        },
        "accessPoints": {
            "@id": C_1.C.accessPoint,
            "@type": "@id",
            "@container": "@set",
        },
    },
    PROTOTYPE: {
        get __savedFragments() { return []; },
        _syncSavedFragments: function () {
            this.__savedFragments = Array
                .from(this.__resourcesMap.values());
            this.__savedFragments
                .forEach(function (fragment) { return fragment._syncSnapshot(); });
        },
        _syncSnapshot: function () {
            ResolvablePointer_1.ResolvablePointer.PROTOTYPE._syncSnapshot.call(this);
            this._syncSavedFragments();
        },
        isDirty: function () {
            var _this = this;
            var isSelfDirty = ResolvablePointer_1.ResolvablePointer.PROTOTYPE.isDirty.call(this);
            if (isSelfDirty)
                return true;
            var hasRemovedFragments = this
                .__savedFragments
                .some(function (fragment) { return !_this.hasFragment(fragment.$id); });
            if (hasRemovedFragments)
                return true;
            var hasNewFragments = this
                .__savedFragments.length !== this.__resourcesMap.size;
            if (hasNewFragments)
                return true;
            return this
                .__savedFragments
                .some(function (fragment) { return fragment.isDirty(); });
        },
        revert: function () {
            var _this = this;
            ResolvablePointer_1.ResolvablePointer.PROTOTYPE.revert.call(this);
            this.__resourcesMap.clear();
            this
                .__savedFragments
                .forEach(function (fragment) {
                fragment.revert();
                _this.__resourcesMap.set(fragment.$slug, fragment);
            });
        },
    },
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && ModelDecorator_1.ModelDecorator
                .hasPropertiesFrom(exports.Document.PROTOTYPE, object);
    },
    is: function (object) {
        return TransientDocument_1.TransientDocument.is(object)
            && SPARQLDocumentTrait_1.SPARQLDocumentTrait.isDecorated(object)
            && EventEmitterDocumentTrait_1.EventEmitterDocumentTrait.isDecorated(object)
            && QueryableDocumentTrait_1.QueryableDocumentTrait.isDecorated(object)
            && exports.Document.isDecorated(object);
    },
    decorate: function (object) {
        if (exports.Document.isDecorated(object))
            return object;
        var base = Object.assign(object, {
            __modelDecorator: Fragment_1.Fragment,
        });
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(base, SPARQLDocumentTrait_1.SPARQLDocumentTrait, EventEmitterDocumentTrait_1.EventEmitterDocumentTrait, QueryableDocumentTrait_1.QueryableDocumentTrait);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.Document.PROTOTYPE, target);
    },
    create: TransientDocument_1.TransientDocument.create,
    createFrom: TransientDocument_1.TransientDocument.createFrom,
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ModelDecorator_1 = __webpack_require__(4);
var ResolvablePointer_1 = __webpack_require__(24);
exports.QueryablePointer = {
    PROTOTYPE: {
        _queryableMetadata: void 0,
        isQueried: function () {
            return !!this._queryableMetadata;
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.QueryablePointer.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.QueryablePointer.isDecorated(object))
            return object;
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, ResolvablePointer_1.ResolvablePointer);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.QueryablePointer.PROTOTYPE, target);
    },
    is: function (value) {
        return ResolvablePointer_1.ResolvablePointer.is(value)
            && exports.QueryablePointer.isDecorated(value);
    },
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ModelDecorator_1 = __webpack_require__(4);
var URI_1 = __webpack_require__(8);
var Registry_1 = __webpack_require__(40);
var Resource_1 = __webpack_require__(17);
exports.FreeResources = {
    PROTOTYPE: {
        $registry: void 0,
        _getLocalID: function (id) {
            if (URI_1.URI.isBNodeID(id))
                return id;
            return Registry_1.Registry.PROTOTYPE._getLocalID.call(this, id);
        },
        _addPointer: function (base) {
            if (!base.$id)
                base.$id = URI_1.URI.generateBNodeID();
            return Registry_1.Registry.PROTOTYPE._addPointer.call(this, base);
        },
        toJSON: function (contextOrKey) {
            return this
                .getPointers(true)
                .map(function (resource) { return resource.toJSON(contextOrKey); });
        },
    },
    is: function (value) {
        return Registry_1.Registry.isDecorated(value)
            && exports.FreeResources.isDecorated(value);
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.FreeResources.PROTOTYPE, object);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.FreeResources.createFrom(copy);
    },
    createFrom: function (object) {
        return exports.FreeResources.decorate(object);
    },
    decorate: function (object) {
        if (exports.FreeResources.isDecorated(object))
            return object;
        var base = Object.assign(object, {
            __modelDecorator: Resource_1.Resource,
        });
        var resource = ModelDecorator_1.ModelDecorator
            .decorateMultiple(base, Registry_1.Registry);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.FreeResources.PROTOTYPE, resource);
    },
    parseFreeNodes: function (registry, freeNodes) {
        var freeResources = exports.FreeResources
            .createFrom({ $registry: registry });
        freeNodes
            .forEach(function (node) {
            var digestedSchema = registry.getSchemaFor(node);
            var target = freeResources.getPointer(node["@id"], true);
            registry.$context.jsonldConverter.compact(node, target, digestedSchema, freeResources);
        });
        return freeResources;
    },
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IDAlreadyInUseError_1 = __webpack_require__(97);
var IllegalArgumentError_1 = __webpack_require__(2);
var ModelDecorator_1 = __webpack_require__(4);
var Pointer_1 = __webpack_require__(13);
var Utils_1 = __webpack_require__(0);
exports.Registry = {
    PROTOTYPE: {
        $registry: void 0,
        get __modelDecorator() {
            throw new IllegalArgumentError_1.IllegalArgumentError("Property \"__modelDecorator\" is required");
        },
        get __resourcesMap() { return new Map(); },
        inScope: function (idOrPointer, local) {
            try {
                var id = Pointer_1.Pointer.getID(idOrPointer);
                this._getLocalID(id);
                return true;
            }
            catch (_a) {
                if (local === true || !this.$registry)
                    return false;
                return this.$registry.inScope(idOrPointer);
            }
        },
        hasPointer: function (id, local) {
            if (this.inScope(id, true)) {
                var localID = this._getLocalID(id);
                if (this.__resourcesMap.has(localID))
                    return true;
            }
            if (local === true || !this.$registry)
                return false;
            return this.$registry.hasPointer(id);
        },
        getPointer: function (id, local) {
            if (!this.inScope(id, true)) {
                if (local === true || !this.$registry)
                    throw new IllegalArgumentError_1.IllegalArgumentError("\"" + id + "\" is out of scope.");
                return this.$registry.getPointer(id);
            }
            var localID = this._getLocalID(id);
            if (this.__resourcesMap.has(localID))
                return this.__resourcesMap.get(localID);
            if (local !== true && this.$registry && this.$registry.hasPointer(id))
                return this.$registry.getPointer(id);
            return this._addPointer({ $id: id });
        },
        getPointers: function (local) {
            var pointers = Array.from(this.__resourcesMap.values());
            if (local === true || !this.$registry)
                return pointers;
            return this.$registry.getPointers().concat(pointers);
        },
        removePointer: function (idOrPointer, local) {
            var id = Pointer_1.Pointer.getID(idOrPointer);
            if (this.inScope(id, true)) {
                var localID = this._getLocalID(id);
                if (this.__resourcesMap.delete(localID))
                    return true;
            }
            if (local === true || !this.$registry)
                return false;
            return this.$registry.removePointer(idOrPointer);
        },
        _addPointer: function (pointer) {
            if (!pointer.$id)
                throw new IllegalArgumentError_1.IllegalArgumentError("The pointer $id cannot be empty.");
            var localID = this._getLocalID(pointer.$id);
            if (this.__resourcesMap.has(localID))
                throw new IDAlreadyInUseError_1.IDAlreadyInUseError("\"" + pointer.$id + "\" is already being used.");
            var resource = this.__modelDecorator
                .decorate(Object.assign(pointer, {
                $registry: this,
            }));
            this.__resourcesMap.set(localID, resource);
            return resource;
        },
        _getLocalID: function (id) {
            throw new IllegalArgumentError_1.IllegalArgumentError("\"" + id + "\" is out of scope.");
        },
    },
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && ModelDecorator_1.ModelDecorator
                .hasPropertiesFrom(exports.Registry.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.Registry.isDecorated(object))
            return object;
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.Registry.PROTOTYPE, object);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.Registry.createFrom(copy);
    },
    createFrom: function (object) {
        return exports.Registry.decorate(object);
    },
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ContainerType;
(function (ContainerType) {
    ContainerType[ContainerType["SET"] = 0] = "SET";
    ContainerType[ContainerType["LIST"] = 1] = "LIST";
    ContainerType[ContainerType["LANGUAGE"] = 2] = "LANGUAGE";
})(ContainerType = exports.ContainerType || (exports.ContainerType = {}));


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = __importStar(__webpack_require__(0));
exports.RDFList = {
    is: function (value) {
        return Utils.hasPropertyDefined(value, "@list");
    },
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var XSD_1 = __webpack_require__(11);
var Utils = __importStar(__webpack_require__(0));
var List_1 = __webpack_require__(42);
var Literal_1 = __webpack_require__(52);
var URI_1 = __webpack_require__(8);
exports.RDFNode = {
    is: function (value) {
        return Utils.hasProperty(value, "@id")
            && Utils.isString(value["@id"]);
    },
    create: function (uri) {
        return {
            "@id": uri,
        };
    },
    getID: function (node) {
        return node["@id"];
    },
    getRelativeID: function (node) {
        var id = exports.RDFNode.getID(node);
        return URI_1.URI.hasFragment(id) ? URI_1.URI.getFragment(id) : id;
    },
    areEqual: function (node1, node2) {
        return exports.RDFNode.getID(node1) === exports.RDFNode.getID(node2);
    },
    isFragment: function (node) {
        var id = exports.RDFNode.getID(node);
        return URI_1.URI.hasFragment(id) || URI_1.URI.isBNodeID(id);
    },
    hasType: function (node, type) {
        return exports.RDFNode.getTypes(node).indexOf(type) !== -1;
    },
    getTypes: function (node) {
        if (!("@type" in node))
            return [];
        return node["@type"];
    },
    getList: function (propertyValues) {
        if (!Array.isArray(propertyValues))
            return;
        return propertyValues
            .find(List_1.RDFList.is);
    },
    getPropertyLiterals: function (propertyValues, literalType) {
        if (!Array.isArray(propertyValues))
            return;
        return propertyValues
            .filter(Literal_1.RDFLiteral.is)
            .filter(function (literal) { return Literal_1.RDFLiteral.hasType(literal, literalType); })
            .map(Literal_1.RDFLiteral.parse);
    },
    getPropertyLanguageMap: function (propertyValues) {
        if (!Array.isArray(propertyValues))
            return;
        var propertyLanguageMap = {};
        for (var _i = 0, propertyValues_1 = propertyValues; _i < propertyValues_1.length; _i++) {
            var propertyValue = propertyValues_1[_i];
            if (!Literal_1.RDFLiteral.is(propertyValue))
                continue;
            if (!Literal_1.RDFLiteral.hasType(propertyValue, XSD_1.XSD.string))
                continue;
            var languageTag = propertyValue["@language"];
            if (!languageTag)
                continue;
            propertyLanguageMap[languageTag] = Literal_1.RDFLiteral.parse(propertyValue);
        }
        return propertyLanguageMap;
    },
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var JSONParser_1 = __webpack_require__(53);
var JSONLDProcessor_1 = __webpack_require__(102);
var JSONLDParser = (function (_super) {
    __extends(JSONLDParser, _super);
    function JSONLDParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONLDParser.prototype.parse = function (input) {
        return _super.prototype.parse.call(this, input).then(JSONLDProcessor_1.JSONLDProcessor.expand);
    };
    return JSONLDParser;
}(JSONParser_1.JSONParser));
exports.JSONLDParser = JSONLDParser;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LDP = {
    namespace: "http://www.w3.org/ns/ldp#",
    Ascending: "http://www.w3.org/ns/ldp#Ascending",
    BasicContainer: "http://www.w3.org/ns/ldp#BasicContainer",
    Container: "http://www.w3.org/ns/ldp#Container",
    Descending: "http://www.w3.org/ns/ldp#Descending",
    DirectContainer: "http://www.w3.org/ns/ldp#DirectContainer",
    IndirectContainer: "http://www.w3.org/ns/ldp#IndirectContainer",
    RDFSource: "http://www.w3.org/ns/ldp#RDFSource",
    Resource: "http://www.w3.org/ns/ldp#Resource",
    MemberSubject: "http://www.w3.org/ns/ldp#MemberSubject",
    NonRDFSource: "http://www.w3.org/ns/ldp#NonRDFSource",
    Page: "http://www.w3.org/ns/ldp#Page",
    PageSortCriterion: "http://www.w3.org/ns/ldp#PageSortCriterion",
    PreferContainment: "http://www.w3.org/ns/ldp#PreferContainment",
    PreferEmptyContainer: "http://www.w3.org/ns/ldp#PreferEmptyContainer",
    PreferMembership: "http://www.w3.org/ns/ldp#PreferMembership",
    PreferMinimalContainer: "http://www.w3.org/ns/ldp#PreferMinimalContainer",
    constrainedBy: "http://www.w3.org/ns/ldp#constrainedBy",
    contains: "http://www.w3.org/ns/ldp#contains",
    hasMemberRelation: "http://www.w3.org/ns/ldp#hasMemberRelation",
    insertedContentRelation: "http://www.w3.org/ns/ldp#insertedContentRelation",
    isMemberOfRelation: "http://www.w3.org/ns/ldp#isMemberOfRelation",
    member: "http://www.w3.org/ns/ldp#member",
    membershipResource: "http://www.w3.org/ns/ldp#membershipResource",
    pageSequence: "http://www.w3.org/ns/ldp#pageSequence",
    pageSortCollation: "http://www.w3.org/ns/ldp#pageSortCollation",
    pageSortCriteria: "http://www.w3.org/ns/ldp#pageSortCriteria",
    pageSortOrder: "http://www.w3.org/ns/ldp#pageSortOrder",
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(5);
var Utils_1 = __webpack_require__(0);
function getLevelRegExp(property) {
    if (property)
        property += ".";
    var parsedName = property.replace(/\./g, "\\.");
    return new RegExp("^" + parsedName + "[^.]+$");
}
exports.getLevelRegExp = getLevelRegExp;
function createPropertyPatterns(context, resourcePath, propertyPath, propertyDefinition) {
    var uri = propertyDefinition.uri, literalType = propertyDefinition.literalType, pointerType = propertyDefinition.pointerType;
    var propertyIRI = context.compactIRI(uri);
    var resource = context.getVariable(resourcePath);
    var propertyObject = context.getVariable(propertyPath);
    var propertyPatterns = [new tokens_1.SubjectToken(resource)
            .addPredicate(new tokens_1.PredicateToken(propertyIRI)
            .addObject(propertyObject)),
    ];
    if (literalType !== null)
        propertyPatterns
            .push(new tokens_1.FilterToken("datatype( " + propertyObject + " ) = " + context.compactIRI(literalType)));
    if (pointerType !== null)
        propertyPatterns
            .push(new tokens_1.FilterToken("! isLiteral( " + propertyObject + " )"));
    return propertyPatterns;
}
exports.createPropertyPatterns = createPropertyPatterns;
function createTypesPattern(context, resourcePath) {
    return new tokens_1.OptionalToken()
        .addPattern(new tokens_1.SubjectToken(context.getVariable(resourcePath))
        .addPredicate(new tokens_1.PredicateToken("a")
        .addObject(context.getVariable(resourcePath + ".types"))));
}
exports.createTypesPattern = createTypesPattern;
function createGraphPattern(context, resourcePath) {
    return new tokens_1.GraphToken(context.getVariable(resourcePath))
        .addPattern(new tokens_1.SubjectToken(context.getVariable(resourcePath + "._subject"))
        .addPredicate(new tokens_1.PredicateToken(context.getVariable(resourcePath + "._predicate"))
        .addObject(context.getVariable(resourcePath + "._object"))));
}
exports.createGraphPattern = createGraphPattern;
function createAllPattern(context, resourcePath) {
    return new tokens_1.SubjectToken(context.getVariable(resourcePath))
        .addPredicate(new tokens_1.PredicateToken(context.getVariable(resourcePath + "._predicate"))
        .addObject(context.getVariable(resourcePath + "._object")));
}
exports.createAllPattern = createAllPattern;
function getParentPath(path) {
    return path
        .split(".")
        .slice(0, -1)
        .join(".");
}
exports.getParentPath = getParentPath;
function getAllTriples(patterns) {
    var subjectsMap = new Map();
    internalTripleAdder(subjectsMap, patterns);
    return Array.from(subjectsMap.values());
}
exports.getAllTriples = getAllTriples;
function isFullTriple(triple) {
    return triple
        .predicates
        .map(function (x) { return x.predicate; })
        .some(function (x) { return Utils_1.isObject(x) && x.token === "variable"; });
}
function internalTripleAdder(subjectsMap, patterns) {
    patterns.forEach(function (pattern) {
        var _a;
        if (pattern.token === "optional" || pattern.token === "graph")
            return internalTripleAdder(subjectsMap, pattern.patterns);
        if (pattern.token !== "subject")
            return;
        var valid = pattern.predicates
            .map(function (predicate) { return predicate.objects; })
            .some(function (objects) { return objects.some(function (object) { return object.token === "variable"; }); });
        if (!valid)
            return;
        var subject = getSubject(subjectsMap, pattern);
        if (isFullTriple(subject))
            return;
        if (isFullTriple(pattern))
            subject.predicates.length = 0;
        (_a = subject.predicates).push.apply(_a, pattern.predicates);
    });
}
function getSubject(subjectsMap, original) {
    var subjectStr = original.subject.toString();
    if (subjectsMap.has(subjectStr))
        return subjectsMap.get(subjectStr);
    var subject = new tokens_1.SubjectToken(original.subject);
    subjectsMap.set(subjectStr, subject);
    return subject;
}
function getPathProperty(element, path) {
    if (element === void 0 || !path)
        return element;
    var _a = path.split("."), propName = _a[0], restParts = _a.slice(1);
    var property = element[propName];
    var restPath = restParts.join(".");
    return getPathProperty(property, restPath);
}
exports.getPathProperty = getPathProperty;
function areDifferentType(a, b) {
    if (typeof a !== typeof b)
        return true;
    if (typeof a === "object")
        return a instanceof Date !== b instanceof Date;
    return false;
}
exports.areDifferentType = areDifferentType;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var XSD = __webpack_require__(241);
var StringLiteral_1 = __webpack_require__(34);
var tokens_1 = __webpack_require__(7);
var PatternBuilder_1 = __webpack_require__(126);
function serialize(object) {
    if (typeof object === "string" || object instanceof String) {
        if (object === PatternBuilder_1.PatternBuilder.undefined)
            return [tokens_1.UNDEF];
        return [tokens_1.OPEN_QUOTE, new StringLiteral_1.StringLiteral(object), tokens_1.CLOSE_QUOTE];
    }
    if (typeof object === "number" || object instanceof Number) {
        if (Number.isInteger(object.valueOf()))
            return this.addType(object + "", "integer");
        return this.addType(object + "", "float");
    }
    if (typeof object === "boolean" || object instanceof Boolean)
        return this.addType(object + "", "boolean");
    if (object instanceof Date)
        return this.addType(object.toISOString(), "dateTime");
    return object.getSelfTokens();
}
exports.serialize = serialize;
function addType(value, type) {
    if (type in XSD)
        type = XSD[type];
    return [tokens_1.OPEN_QUOTE, new StringLiteral_1.StringLiteral(value), tokens_1.CLOSE_QUOTE, tokens_1.OFF_TYPE, tokens_1.OPEN_IRI, new StringLiteral_1.StringLiteral(type), tokens_1.CLOSE_IRI];
}
exports.addType = addType;

//# sourceMappingURL=ObjectPattern.js.map


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(1)
  , XhrDriver = __webpack_require__(139)
  ;

function XHRLocalObject(method, url, payload /*, opts */) {
  XhrDriver.call(this, method, url, payload, {
    noCredentials: true
  });
}

inherits(XHRLocalObject, XhrDriver);

XHRLocalObject.enabled = XhrDriver.enabled;

module.exports = XHRLocalObject;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports = {
  isOpera: function() {
    return global.navigator &&
      /opera/i.test(global.navigator.userAgent);
  }

, isKonqueror: function() {
    return global.navigator &&
      /konqueror/i.test(global.navigator.userAgent);
  }

  // #187 wrap document.domain in try/catch because of WP8 from file:///
, hasDomain: function () {
    // non-browser client always has a domain
    if (!global.document) {
      return true;
    }

    try {
      return !!global.document.domain;
    } catch (e) {
      return false;
    }
  }
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var eventUtils = __webpack_require__(22)
  , JSON3 = __webpack_require__(19)
  , browser = __webpack_require__(49)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(10)('sockjs-client:utils:iframe');
}

module.exports = {
  WPrefix: '_jp'
, currentWindowId: null

, polluteGlobalNamespace: function() {
    if (!(module.exports.WPrefix in global)) {
      global[module.exports.WPrefix] = {};
    }
  }

, postMessage: function(type, data) {
    if (global.parent !== global) {
      global.parent.postMessage(JSON3.stringify({
        windowId: module.exports.currentWindowId
      , type: type
      , data: data || ''
      }), '*');
    } else {
      debug('Cannot postMessage, no parent window.', type, data);
    }
  }

, createIframe: function(iframeUrl, errorCallback) {
    var iframe = global.document.createElement('iframe');
    var tref, unloadRef;
    var unattach = function() {
      debug('unattach');
      clearTimeout(tref);
      // Explorer had problems with that.
      try {
        iframe.onload = null;
      } catch (x) {
        // intentionally empty
      }
      iframe.onerror = null;
    };
    var cleanup = function() {
      debug('cleanup');
      if (iframe) {
        unattach();
        // This timeout makes chrome fire onbeforeunload event
        // within iframe. Without the timeout it goes straight to
        // onunload.
        setTimeout(function() {
          if (iframe) {
            iframe.parentNode.removeChild(iframe);
          }
          iframe = null;
        }, 0);
        eventUtils.unloadDel(unloadRef);
      }
    };
    var onerror = function(err) {
      debug('onerror', err);
      if (iframe) {
        cleanup();
        errorCallback(err);
      }
    };
    var post = function(msg, origin) {
      debug('post', msg, origin);
      try {
        // When the iframe is not loaded, IE raises an exception
        // on 'contentWindow'.
        setTimeout(function() {
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(msg, origin);
          }
        }, 0);
      } catch (x) {
        // intentionally empty
      }
    };

    iframe.src = iframeUrl;
    iframe.style.display = 'none';
    iframe.style.position = 'absolute';
    iframe.onerror = function() {
      onerror('onerror');
    };
    iframe.onload = function() {
      debug('onload');
      // `onload` is triggered before scripts on the iframe are
      // executed. Give it few seconds to actually load stuff.
      clearTimeout(tref);
      tref = setTimeout(function() {
        onerror('onload timeout');
      }, 2000);
    };
    global.document.body.appendChild(iframe);
    tref = setTimeout(function() {
      onerror('timeout');
    }, 15000);
    unloadRef = eventUtils.unloadAdd(cleanup);
    return {
      post: post
    , cleanup: cleanup
    , loaded: unattach
    };
  }

/* eslint no-undef: "off", new-cap: "off" */
, createHtmlfile: function(iframeUrl, errorCallback) {
    var axo = ['Active'].concat('Object').join('X');
    var doc = new global[axo]('htmlfile');
    var tref, unloadRef;
    var iframe;
    var unattach = function() {
      clearTimeout(tref);
      iframe.onerror = null;
    };
    var cleanup = function() {
      if (doc) {
        unattach();
        eventUtils.unloadDel(unloadRef);
        iframe.parentNode.removeChild(iframe);
        iframe = doc = null;
        CollectGarbage();
      }
    };
    var onerror = function(r) {
      debug('onerror', r);
      if (doc) {
        cleanup();
        errorCallback(r);
      }
    };
    var post = function(msg, origin) {
      try {
        // When the iframe is not loaded, IE raises an exception
        // on 'contentWindow'.
        setTimeout(function() {
          if (iframe && iframe.contentWindow) {
              iframe.contentWindow.postMessage(msg, origin);
          }
        }, 0);
      } catch (x) {
        // intentionally empty
      }
    };

    doc.open();
    doc.write('<html><s' + 'cript>' +
              'document.domain="' + global.document.domain + '";' +
              '</s' + 'cript></html>');
    doc.close();
    doc.parentWindow[module.exports.WPrefix] = global[module.exports.WPrefix];
    var c = doc.createElement('div');
    doc.body.appendChild(c);
    iframe = doc.createElement('iframe');
    c.appendChild(iframe);
    iframe.src = iframeUrl;
    iframe.onerror = function() {
      onerror('onerror');
    };
    tref = setTimeout(function() {
      onerror('timeout');
    }, 15000);
    unloadRef = eventUtils.unloadAdd(cleanup);
    return {
      post: post
    , cleanup: cleanup
    , loaded: unattach
    };
  }
};

module.exports.iframeEnabled = false;
if (global.document) {
  // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
  // huge delay, or not at all.
  module.exports.iframeEnabled = (typeof global.postMessage === 'function' ||
    typeof global.postMessage === 'object') && (!browser.isKonqueror());
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Token_1 = __webpack_require__(20);
var Operator = (function (_super) {
    __extends(Operator, _super);
    function Operator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Operator.prototype.getPrettySeparator = function (nextToken) {
        return Token_1.EMPTY_SEPARATOR;
    };
    Operator.prototype.getCompactSeparator = function (nextToken) {
        return Token_1.EMPTY_SEPARATOR;
    };
    return Operator;
}(Token_1.Token));
exports.Operator = Operator;
exports.default = Operator;

//# sourceMappingURL=Operator.js.map


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = __webpack_require__(2);
var Utils = __importStar(__webpack_require__(0));
var XSD_1 = __webpack_require__(11);
var Serializers = __importStar(__webpack_require__(192));
exports.Serializers = Serializers;
exports.RDFLiteral = {
    from: function (value) {
        if (Utils.isNull(value))
            throw new IllegalArgumentError_1.IllegalArgumentError("Null cannot be converted into a Literal");
        if (!Utils.isDefined(value))
            throw new IllegalArgumentError_1.IllegalArgumentError("The value is undefined");
        var type;
        switch (true) {
            case Utils.isDate(value):
                type = XSD_1.XSD.dateTime;
                value = value.toISOString();
                break;
            case Utils.isNumber(value):
                if (Utils.isInteger(value)) {
                    type = XSD_1.XSD.integer;
                }
                else {
                    type = XSD_1.XSD.double;
                }
                break;
            case Utils.isString(value):
                type = XSD_1.XSD.string;
                break;
            case Utils.isBoolean(value):
                type = XSD_1.XSD.boolean;
                break;
            default:
                type = XSD_1.XSD.object;
                value = JSON.stringify(value);
                break;
        }
        var literal = { "@value": value.toString() };
        if (type)
            literal["@type"] = type;
        return literal;
    },
    parse: function (valueOrLiteral, type) {
        var literalValue;
        if (Utils.isString(valueOrLiteral)) {
            literalValue = valueOrLiteral;
        }
        else {
            var literal = valueOrLiteral;
            if (!literal)
                return null;
            if (!Utils.hasProperty(literal, "@value"))
                return null;
            type = "@type" in literal ? literal["@type"] : null;
            literalValue = literal["@value"];
        }
        var value = literalValue;
        var parts;
        switch (type) {
            case XSD_1.XSD.date:
            case XSD_1.XSD.dateTime:
                value = new Date(literalValue);
                break;
            case XSD_1.XSD.time:
                parts = literalValue.match(/(\d+):(\d+):(\d+)\.(\d+)Z/);
                value = new Date();
                value.setUTCHours(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3]), parseFloat(parts[4]));
                break;
            case XSD_1.XSD.duration:
                break;
            case XSD_1.XSD.gDay:
            case XSD_1.XSD.gMonth:
            case XSD_1.XSD.gMonthDay:
            case XSD_1.XSD.gYear:
            case XSD_1.XSD.gYearMonth:
                break;
            case XSD_1.XSD.byte:
            case XSD_1.XSD.decimal:
            case XSD_1.XSD.int:
            case XSD_1.XSD.integer:
            case XSD_1.XSD.long:
            case XSD_1.XSD.negativeInteger:
            case XSD_1.XSD.nonNegativeInteger:
            case XSD_1.XSD.nonPositiveInteger:
            case XSD_1.XSD.positiveInteger:
            case XSD_1.XSD.short:
            case XSD_1.XSD.unsignedLong:
            case XSD_1.XSD.unsignedInt:
            case XSD_1.XSD.unsignedShort:
            case XSD_1.XSD.unsignedByte:
            case XSD_1.XSD.double:
            case XSD_1.XSD.float:
                value = parseFloat(literalValue);
                break;
            case XSD_1.XSD.boolean:
                value = Utils.parseBoolean(literalValue);
                break;
            case XSD_1.XSD.string:
                value = literalValue;
                break;
            case XSD_1.XSD.object:
                value = JSON.parse(literalValue);
                break;
            default:
                break;
        }
        return value;
    },
    is: function (value) {
        return Utils.hasProperty(value, "@value")
            && Utils.isString(value["@value"]);
    },
    hasType: function (value, type) {
        if (!value["@type"] && type === XSD_1.XSD.string)
            return true;
        return value["@type"] === type;
    },
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JSONParser = (function () {
    function JSONParser() {
    }
    JSONParser.prototype.parse = function (body) {
        return new Promise(function (resolve) { return resolve(JSON.parse(body)); });
    };
    return JSONParser;
}());
exports.JSONParser = JSONParser;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractError_1 = __webpack_require__(21);
var NotImplementedError = (function (_super) {
    __extends(NotImplementedError, _super);
    function NotImplementedError(message) {
        return _super.call(this, message) || this;
    }
    Object.defineProperty(NotImplementedError.prototype, "name", {
        get: function () { return "NotImplementedError"; },
        enumerable: true,
        configurable: true
    });
    return NotImplementedError;
}(AbstractError_1.AbstractError));
exports.NotImplementedError = NotImplementedError;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "BadResponseError";
var statusCode = 0;
var BadResponseError = (function (_super) {
    __extends(BadResponseError, _super);
    function BadResponseError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BadResponseError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BadResponseError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return BadResponseError;
}(HTTPError_1.HTTPError));
exports.BadResponseError = BadResponseError;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DigestedObjectSchemaProperty = (function () {
    function DigestedObjectSchemaProperty() {
        this.uri = null;
        this.literal = null;
        this.literalType = null;
        this.pointerType = null;
        this.containerType = null;
    }
    return DigestedObjectSchemaProperty;
}());
exports.DigestedObjectSchemaProperty = DigestedObjectSchemaProperty;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PointerType;
(function (PointerType) {
    PointerType[PointerType["ID"] = 0] = "ID";
    PointerType[PointerType["VOCAB"] = 1] = "VOCAB";
})(PointerType = exports.PointerType || (exports.PointerType = {}));


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(5);
var DigestedObjectSchema_1 = __webpack_require__(15);
var Utils_1 = __webpack_require__(46);
var QueryPropertyType;
(function (QueryPropertyType) {
    QueryPropertyType[QueryPropertyType["FULL"] = 0] = "FULL";
    QueryPropertyType[QueryPropertyType["PARTIAL"] = 1] = "PARTIAL";
    QueryPropertyType[QueryPropertyType["ALL"] = 2] = "ALL";
    QueryPropertyType[QueryPropertyType["EMPTY"] = 3] = "EMPTY";
})(QueryPropertyType = exports.QueryPropertyType || (exports.QueryPropertyType = {}));
var QueryProperty = (function () {
    function QueryProperty(context, name) {
        this.name = name;
        this.variable = context.getVariable(name);
        this._optional = true;
        this._context = context;
        this._patterns = [];
    }
    QueryProperty.prototype.addPattern = function () {
        var patterns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            patterns[_i] = arguments[_i];
        }
        var _a;
        (_a = this._patterns).push.apply(_a, patterns);
        return this;
    };
    QueryProperty.prototype.getPatterns = function () {
        var _a;
        var patterns = this._patterns.slice();
        var fn = getFunctionPattern(this.getType());
        if (fn) {
            var index = patterns.findIndex(function (pattern) { return pattern === void 0; });
            patterns[index] = fn(this._context, this.name);
        }
        if (!this._optional)
            return patterns;
        return [(_a = new tokens_1.OptionalToken()).addPattern.apply(_a, patterns),];
    };
    QueryProperty.prototype.getSchema = function () {
        if (this._schema)
            return this._schema;
        return this._schema = new DigestedObjectSchema_1.DigestedObjectSchema();
    };
    QueryProperty.prototype.isOptional = function () {
        return this._optional;
    };
    QueryProperty.prototype.setOptional = function (optional) {
        this._optional = optional;
        return this;
    };
    QueryProperty.prototype.getType = function () {
        return this._type;
    };
    QueryProperty.prototype.setType = function (type) {
        if (this._type === void 0)
            this._patterns.push(void 0);
        this._type = type;
        return this;
    };
    QueryProperty.prototype.getTriple = function () {
        return this._patterns
            .find(function (pattern) { return pattern instanceof tokens_1.SubjectToken; });
    };
    QueryProperty.prototype.toString = function () {
        return "" + this.variable;
    };
    return QueryProperty;
}());
exports.QueryProperty = QueryProperty;
function getFunctionPattern(type) {
    switch (type) {
        case QueryPropertyType.ALL:
            return Utils_1.createAllPattern;
        case QueryPropertyType.FULL:
            return Utils_1.createGraphPattern;
        case QueryPropertyType.EMPTY:
        case QueryPropertyType.PARTIAL:
            return Utils_1.createTypesPattern;
        default:
            return null;
    }
}


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = __importStar(__webpack_require__(0));
var Node_1 = __webpack_require__(43);
var URI_1 = __webpack_require__(8);
exports.RDFDocument = {
    is: function (value) {
        return Utils.hasProperty(value, "@graph")
            && Utils.isArray(value["@graph"]);
    },
    create: function (resources, uri) {
        return {
            "@id": uri ? uri : "",
            "@graph": resources,
        };
    },
    getDocuments: function (objects) {
        if (Utils.isArray(objects))
            return objects
                .filter(exports.RDFDocument.is);
        if (exports.RDFDocument.is(objects))
            return [objects];
        return [];
    },
    getFreeNodes: function (objects) {
        if (!Array.isArray(objects))
            return [];
        return objects
            .filter(function (element) { return !exports.RDFDocument.is(element); })
            .filter(Node_1.RDFNode.is);
    },
    getResources: function (objects) {
        var resources = exports.RDFDocument.getFreeNodes(objects);
        exports.RDFDocument
            .getDocuments(objects)
            .map(function (document) { return document["@graph"]; })
            .forEach(function (nodes) { return resources.push.apply(resources, nodes); });
        return resources;
    },
    getDocumentResources: function (document) {
        return exports.RDFDocument
            .getResources(document)
            .filter(function (node) { return !Node_1.RDFNode.isFragment(node); });
    },
    getNamedFragmentResources: function (document, documentResource) {
        var uriToMatch = Utils.isObject(documentResource) ?
            Node_1.RDFNode.getID(documentResource) :
            documentResource;
        return exports.RDFDocument
            .getResources(document)
            .filter(function (node) {
            var id = Node_1.RDFNode.getID(node);
            if (!URI_1.URI.hasFragment(id))
                return;
            if (!uriToMatch)
                return true;
            return URI_1.URI.getDocumentURI(id) === uriToMatch;
        });
    },
    getBNodeResources: function (document) {
        return exports.RDFDocument
            .getResources(document)
            .filter(function (node) {
            var id = Node_1.RDFNode.getID(node);
            return URI_1.URI.isBNodeID(id);
        });
    },
    getNodes: function (rdfDocument) {
        var documentNodes = [];
        var fragmentNodes = [];
        for (var _i = 0, _a = rdfDocument["@graph"]; _i < _a.length; _i++) {
            var node = _a[_i];
            (Node_1.RDFNode.isFragment(node) ? fragmentNodes : documentNodes).push(node);
        }
        return [documentNodes, fragmentNodes];
    },
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(3);
var VolatileResource_1 = __webpack_require__(79);
var SCHEMA = {
    "documentsMetadata": {
        "@id": C_1.C.documentMetadata,
        "@type": "@id",
        "@container": "@set",
    },
};
exports.ResponseMetadata = {
    TYPE: C_1.C.ResponseMetadata,
    SCHEMA: SCHEMA,
    is: function (object) {
        return VolatileResource_1.VolatileResource.is(object)
            && object.hasType(exports.ResponseMetadata.TYPE);
    },
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(7);
var tokens_2 = __webpack_require__(5);
var ObjectPattern_1 = __webpack_require__(47);
var TriplesPattern = (function () {
    function TriplesPattern(resolver) {
        this.resolver = resolver;
        this.patternTokens = [];
        this.init();
    }
    TriplesPattern.prototype.has = function (property, objects) {
        this.patternTokens = [];
        return this._addPattern(property, objects);
    };
    TriplesPattern.prototype.getSelfTokens = function () {
        return this.elementTokens;
    };
    TriplesPattern.prototype.init = function () {
        var _this = this;
        this.interfaces = {
            addPattern: {
                and: function (property, objects) {
                    _this.patternTokens.push(tokens_1.SAME_SUBJECT_SEPARATOR);
                    return _this._addPattern(property, objects);
                },
            },
        };
    };
    ;
    TriplesPattern.prototype._addPattern = function (property, objects) {
        var tokens = (typeof property === "string")
            ? this._resolvePath(property)
            : property.getSelfTokens();
        objects = Array.isArray(objects) ? objects : [objects];
        objects.forEach(function (value, index, array) {
            tokens.push.apply(tokens, ObjectPattern_1.serialize(value));
            if (index < array.length - 1)
                tokens.push(tokens_1.SAME_PROPERTY_SEPARATOR);
        });
        (_a = this.patternTokens).push.apply(_a, tokens);
        return Object.assign({}, this.interfaces.addPattern, this.interfaces.graphPattern);
        var _a;
    };
    TriplesPattern.prototype._resolvePath = function (propertyPath) {
        var _this = this;
        var tokens = propertyPath
            .split(/(<.*?>)/).reduce(function (array, part) {
            if (part.startsWith("<")) {
                array.push(part);
            }
            else {
                array.push.apply(array, part.split(/([|/^?*+!()])/));
            }
            return array;
        }, [])
            .reduce(function (array, part) {
            if (!part)
                return array;
            if (TriplesPattern.PATH_OPERATORS.indexOf(part) !== -1) {
                array.push(new tokens_2.Operator(part));
            }
            else if (part === "a") {
                array.push(new tokens_2.StringLiteral(part));
            }
            else {
                if (part.startsWith("<") && part.endsWith(">"))
                    part = part.slice(1, -1);
                array.push.apply(array, _this.resolver.resolve(part, true));
            }
            return array;
        }, []);
        if (tokens[0] instanceof tokens_2.Operator)
            tokens.unshift(new tokens_2.LeftSymbol(""));
        if (tokens[tokens.length - 1] instanceof tokens_2.Operator)
            tokens.push(new tokens_2.RightSymbol(""));
        return tokens;
    };
    TriplesPattern.PATH_OPERATORS = ["|", "/", "^", "?", "*", "+", "!", "(", ")"];
    return TriplesPattern;
}());
exports.TriplesPattern = TriplesPattern;
exports.default = TriplesPattern;

//# sourceMappingURL=TriplesPattern.js.map


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var TriplesPattern_1 = __webpack_require__(61);
var TriplesSubject = (function (_super) {
    __extends(TriplesSubject, _super);
    function TriplesSubject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TriplesSubject.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.interfaces.graphPattern = {
            getPattern: function () {
                return _this.getSelfTokens().concat(_this.patternTokens);
            },
        };
    };
    return TriplesSubject;
}(TriplesPattern_1.TriplesPattern));
exports.TriplesSubject = TriplesSubject;
exports.default = TriplesSubject;

//# sourceMappingURL=TriplesSubject.js.map


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(1)
  , EventEmitter = __webpack_require__(12).EventEmitter
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(10)('sockjs-client:receiver:xhr');
}

function XhrReceiver(url, AjaxObject) {
  debug(url);
  EventEmitter.call(this);
  var self = this;

  this.bufferPosition = 0;

  this.xo = new AjaxObject('POST', url, null);
  this.xo.on('chunk', this._chunkHandler.bind(this));
  this.xo.once('finish', function(status, text) {
    debug('finish', status, text);
    self._chunkHandler(status, text);
    self.xo = null;
    var reason = status === 200 ? 'network' : 'permanent';
    debug('close', reason);
    self.emit('close', null, reason);
    self._cleanup();
  });
}

inherits(XhrReceiver, EventEmitter);

XhrReceiver.prototype._chunkHandler = function(status, text) {
  debug('_chunkHandler', status);
  if (status !== 200 || !text) {
    return;
  }

  for (var idx = -1; ; this.bufferPosition += idx + 1) {
    var buf = text.slice(this.bufferPosition);
    idx = buf.indexOf('\n');
    if (idx === -1) {
      break;
    }
    var msg = buf.slice(0, idx);
    if (msg) {
      debug('message', msg);
      this.emit('message', msg);
    }
  }
};

XhrReceiver.prototype._cleanup = function() {
  debug('_cleanup');
  this.removeAllListeners();
};

XhrReceiver.prototype.abort = function() {
  debug('abort');
  if (this.xo) {
    this.xo.close();
    debug('close');
    this.emit('close', null, 'user');
    this.xo = null;
  }
  this._cleanup();
};

module.exports = XhrReceiver;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(1)
  , XhrDriver = __webpack_require__(139)
  ;

function XHRCorsObject(method, url, payload, opts) {
  XhrDriver.call(this, method, url, payload, opts);
}

inherits(XHRCorsObject, XhrDriver);

XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;

module.exports = XHRCorsObject;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StringLiteral_1 = __webpack_require__(34);
var tokens_1 = __webpack_require__(7);
function isAbsolute(iri) {
    return iri.indexOf(":") !== -1;
}
exports.isAbsolute = isAbsolute;
function hasProtocol(iri) {
    return iri.indexOf("://") !== -1;
}
exports.hasProtocol = hasProtocol;
function isRelative(iri) {
    return !isAbsolute(iri);
}
exports.isRelative = isRelative;
function isIRI(iri) {
    return hasProtocol(iri) || !isAbsolute(iri);
}
exports.isIRI = isIRI;
var bNodeRegex = /^_:/;
function isBNodeLabel(label) {
    return bNodeRegex.test(label);
}
exports.isBNodeLabel = isBNodeLabel;
var prefixRegex = /([A-Za-z](([A-Za-z_\-0-9]|\.)*[A-Za-z_\-0-9])?)?:/;
var softPrefixRegex = /^(?!_:)[^]*?:/;
var prefixNormalizeRegex = /([_~.\-!$&'|()*+,;=/?#@%])/g;
function isPrefixed(iri) {
    return softPrefixRegex.test(iri) && !hasProtocol(iri);
}
exports.isPrefixed = isPrefixed;
function getPrefixedParts(iri) {
    var parts = prefixRegex.exec(iri);
    if (parts === null || hasProtocol(iri))
        return null;
    var prefix = parts[1] || "";
    var local = iri.substr(prefix.length + 1).replace(prefixNormalizeRegex, "\\$1");
    return [
        prefix,
        local,
    ];
}
exports.getPrefixedParts = getPrefixedParts;
function resolve(iri, vocab) {
    var tokens = [new StringLiteral_1.StringLiteral(iri)];
    if (isIRI(iri)) {
        if (isRelative(iri) && vocab)
            iri = vocab + iri;
        tokens = [tokens_1.OPEN_IRI, new StringLiteral_1.StringLiteral(iri), tokens_1.CLOSE_IRI];
    }
    return tokens;
}
exports.resolve = resolve;

//# sourceMappingURL=utils.js.map


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Token_1 = __webpack_require__(20);
var NewLineSymbol = (function (_super) {
    __extends(NewLineSymbol, _super);
    function NewLineSymbol() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewLineSymbol.prototype.getPrettySeparator = function (nextToken) {
        if (nextToken instanceof NewLineSymbol) {
            if ([".", ";", ","].indexOf(nextToken["value"]) !== -1)
                return Token_1.SPACE_SEPARATOR;
        }
        return Token_1.NEW_LINE_SEPARATOR;
    };
    NewLineSymbol.prototype.getCompactSeparator = function (nextToken) {
        return Token_1.EMPTY_SEPARATOR;
    };
    return NewLineSymbol;
}(Token_1.Token));
exports.NewLineSymbol = NewLineSymbol;
exports.default = NewLineSymbol;

//# sourceMappingURL=NewLineSymbol.js.map


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Identifier_1 = __webpack_require__(35);
var LeftSymbol_1 = __webpack_require__(89);
var NewLineSymbol_1 = __webpack_require__(66);
var Operator_1 = __webpack_require__(51);
var Token_1 = __webpack_require__(20);
var RightSymbol = (function (_super) {
    __extends(RightSymbol, _super);
    function RightSymbol() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RightSymbol.prototype.getPrettySeparator = function (nextToken) {
        if (nextToken instanceof Identifier_1.Identifier && nextToken["value"] !== "UNDEF")
            return Token_1.NEW_LINE_SEPARATOR;
        if (nextToken instanceof NewLineSymbol_1.NewLineSymbol) {
            if (["}", "]", ")"].indexOf(nextToken["value"]) !== -1) {
                return Token_1.NEW_LINE_SEPARATOR;
            }
        }
        if (nextToken instanceof LeftSymbol_1.LeftSymbol) {
            if (nextToken["value"] === "(")
                return Token_1.NEW_LINE_SEPARATOR;
        }
        if (nextToken instanceof Operator_1.Operator)
            return Token_1.EMPTY_SEPARATOR;
        return Token_1.SPACE_SEPARATOR;
    };
    RightSymbol.prototype.getCompactSeparator = function (nextToken) {
        return Token_1.EMPTY_SEPARATOR;
    };
    return RightSymbol;
}(Token_1.Token));
exports.RightSymbol = RightSymbol;
exports.default = RightSymbol;

//# sourceMappingURL=RightSymbol.js.map


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = __webpack_require__(2);
var ContainerType_1 = __webpack_require__(41);
var Pointer_1 = __webpack_require__(13);
var List_1 = __webpack_require__(42);
var XSDSerializers = __importStar(__webpack_require__(98));
var Node_1 = __webpack_require__(43);
var URI_1 = __webpack_require__(8);
var Value_1 = __webpack_require__(99);
var Utils_1 = __webpack_require__(0);
var XSD_1 = __webpack_require__(11);
var Utils_2 = __webpack_require__(100);
var JSONLDConverter = (function () {
    function JSONLDConverter(literalSerializers) {
        this._literalSerializers = literalSerializers ?
            Utils_1.MapUtils.extend(new Map(), literalSerializers) :
            JSONLDConverter.getDefaultSerializers();
    }
    Object.defineProperty(JSONLDConverter.prototype, "literalSerializers", {
        get: function () { return this._literalSerializers; },
        enumerable: true,
        configurable: true
    });
    JSONLDConverter.getDefaultSerializers = function () {
        var literalSerializers = new Map();
        literalSerializers.set(XSD_1.XSD.date, XSDSerializers.dateSerializer);
        literalSerializers.set(XSD_1.XSD.dateTime, XSDSerializers.dateTimeSerializer);
        literalSerializers.set(XSD_1.XSD.time, XSDSerializers.timeSerializer);
        literalSerializers.set(XSD_1.XSD.integer, XSDSerializers.integerSerializer);
        literalSerializers.set(XSD_1.XSD.int, XSDSerializers.integerSerializer);
        literalSerializers.set(XSD_1.XSD.unsignedInt, XSDSerializers.unsignedIntegerSerializer);
        literalSerializers.set(XSD_1.XSD.long, XSDSerializers.longSerializer);
        literalSerializers.set(XSD_1.XSD.unsignedLong, XSDSerializers.unsignedLongSerializer);
        literalSerializers.set(XSD_1.XSD.float, XSDSerializers.floatSerializer);
        literalSerializers.set(XSD_1.XSD.double, XSDSerializers.floatSerializer);
        literalSerializers.set(XSD_1.XSD.boolean, XSDSerializers.booleanSerializer);
        literalSerializers.set(XSD_1.XSD.string, XSDSerializers.stringSerializer);
        return literalSerializers;
    };
    JSONLDConverter.prototype.compact = function (expandedObjectOrObjects, targetObjectOrObjectsOrDigestedContext, digestedSchemaOrPointerLibrary, pointerLibrary, strict) {
        if (pointerLibrary === void 0) { pointerLibrary = null; }
        var targetObjectOrObjects = !pointerLibrary ? null : targetObjectOrObjectsOrDigestedContext;
        var digestedSchema = !pointerLibrary ? targetObjectOrObjectsOrDigestedContext : digestedSchemaOrPointerLibrary;
        pointerLibrary = !pointerLibrary ? digestedSchemaOrPointerLibrary : pointerLibrary;
        if (!Array.isArray(expandedObjectOrObjects))
            return this.compactSingle(expandedObjectOrObjects, targetObjectOrObjects, digestedSchema, pointerLibrary, strict);
        var expandedObjects = expandedObjectOrObjects;
        var targetObjects = !!targetObjectOrObjects ? targetObjectOrObjects : [];
        for (var i = 0, length_1 = expandedObjects.length; i < length_1; i++) {
            var expandedObject = expandedObjects[i];
            var targetObject = targetObjects[i] = !!targetObjects[i] ? targetObjects[i] : {};
            this.compactSingle(expandedObject, targetObject, digestedSchema, pointerLibrary, strict);
        }
        return targetObjects;
    };
    JSONLDConverter.prototype.expand = function (compactedObjectOrObjects, generalSchema, digestedSchema) {
        if (!Array.isArray(compactedObjectOrObjects))
            return this.expandSingle(compactedObjectOrObjects, generalSchema, digestedSchema);
    };
    JSONLDConverter.prototype.expandSingle = function (compactedObject, generalSchema, digestedSchema) {
        var _this = this;
        var expandedObject = {};
        expandedObject["@id"] = !!compactedObject["$id"] ? compactedObject["$id"] : "";
        if (compactedObject["types"]) {
            var types = Array.isArray(compactedObject["types"]) ?
                compactedObject["types"] : [compactedObject["types"]];
            if (types.length)
                expandedObject["@type"] = types
                    .map(function (type) { return generalSchema.resolveURI(type, { vocab: true, base: true }); });
        }
        Utils_1.forEachOwnProperty(compactedObject, function (propertyName, value) {
            if (propertyName === "$id")
                return;
            if (propertyName === "types")
                return;
            var expandedPropertyName = digestedSchema.resolveURI(propertyName, { vocab: true });
            if (URI_1.URI.isRelative(expandedPropertyName))
                return;
            var expandedValue = _this.expandProperty(propertyName, value, digestedSchema, generalSchema);
            if (expandedValue === null)
                return;
            expandedObject[expandedPropertyName] = expandedValue;
        });
        return expandedObject;
    };
    JSONLDConverter.prototype.expandProperty = function (propertyName, propertyValue, digestedSchema, generalSchema) {
        var definition = digestedSchema.properties.get(propertyName);
        var propertyContainer = definition ? definition.containerType : void 0;
        if (propertyContainer === ContainerType_1.ContainerType.LANGUAGE)
            return this.expandPropertyLanguageMap(propertyValue);
        propertyValue = Array.isArray(propertyValue) ? propertyValue : [propertyValue];
        if (propertyContainer === null)
            propertyValue = [propertyValue[0]];
        var propertyType = definition ? definition.literal : null;
        var expandedValues = propertyType === true ?
            this.expandPropertyLiteral(propertyValue, definition, digestedSchema) :
            propertyType === false ?
                this.expandPropertyPointer(propertyValue, digestedSchema, generalSchema) :
                this.expandPropertyValue(propertyValue, digestedSchema, generalSchema);
        var filteredValues = expandedValues.filter(function (value) { return value !== null; });
        if (!filteredValues.length)
            return null;
        if (propertyContainer === ContainerType_1.ContainerType.LIST)
            return [
                { "@list": filteredValues },
            ];
        return filteredValues;
    };
    JSONLDConverter.prototype.expandPropertyValue = function (propertyValue, digestedSchema, generalSchema) {
        var _this = this;
        return propertyValue.map(function (value) { return _this.expandValue(value, digestedSchema, generalSchema); });
    };
    JSONLDConverter.prototype.expandPropertyPointer = function (propertyValue, digestedSchema, generalSchema) {
        var _this = this;
        return propertyValue.map(function (value) { return _this.expandPointerValue(value, digestedSchema, generalSchema); });
    };
    JSONLDConverter.prototype.expandPropertyLiteral = function (propertyValue, definition, digestedSchema) {
        var _this = this;
        var literalType = digestedSchema.resolveURI(definition.literalType, { vocab: true, base: true });
        var expandedValues = propertyValue.map(function (value) { return _this.expandLiteralValue(value, literalType); });
        if (definition.language)
            expandedValues.forEach(function (value) { return value["@language"] = definition.language; });
        return expandedValues;
    };
    JSONLDConverter.prototype.expandPropertyLanguageMap = function (propertyValue) {
        var _this = this;
        if (!Utils_1.isObject(propertyValue)) {
            return null;
        }
        var mapValues = [];
        Utils_1.forEachOwnProperty(propertyValue, function (languageTag, value) {
            var serializedValue = _this.literalSerializers.get(XSD_1.XSD.string).serialize(value);
            mapValues.push({ "@value": serializedValue, "@type": XSD_1.XSD.string, "@language": languageTag });
        });
        return mapValues;
    };
    JSONLDConverter.prototype.expandPointerValue = function (propertyValue, digestedSchema, generalSchema) {
        var isStringID = Utils_1.isString(propertyValue);
        var id = Pointer_1.Pointer.is(propertyValue) ?
            propertyValue.$id :
            isStringID ?
                propertyValue :
                null;
        if (!id)
            return null;
        var resolved = generalSchema.resolveURI(id, { vocab: isStringID });
        return { "@id": resolved };
    };
    JSONLDConverter.prototype.expandValue = function (propertyValue, digestedSchema, generalSchema) {
        if (Array.isArray(propertyValue))
            return null;
        return Pointer_1.Pointer.is(propertyValue) ?
            this.expandPointerValue(propertyValue, generalSchema, digestedSchema) :
            this.expandLiteralValue(propertyValue, Utils_2.guessXSDType(propertyValue));
    };
    JSONLDConverter.prototype.expandLiteralValue = function (literalValue, literalType) {
        if (literalType === null)
            return null;
        if (!this.literalSerializers.has(literalType))
            return null;
        var serializedValue = this.literalSerializers
            .get(literalType)
            .serialize(literalValue);
        return { "@value": serializedValue, "@type": literalType };
    };
    JSONLDConverter.prototype.compactSingle = function (expandedObject, targetObject, digestedSchema, pointerLibrary, strict) {
        var _this = this;
        if (!expandedObject["@id"])
            throw new IllegalArgumentError_1.IllegalArgumentError("The expandedObject doesn't have an @id defined.");
        targetObject["$id"] = expandedObject["@id"];
        targetObject["types"] = !!expandedObject["@type"] ? expandedObject["@type"] : [];
        var propertyURINameMap = this.getPropertyURINameMap(digestedSchema);
        Utils_1.forEachOwnProperty(expandedObject, function (propertyURI, propertyValues) {
            if (propertyURI === "@id")
                return;
            if (propertyURI === "@type")
                return;
            if (!propertyURINameMap.has(propertyURI) && strict)
                return;
            var propertyName = propertyURINameMap.has(propertyURI) ?
                propertyURINameMap.get(propertyURI) :
                digestedSchema.vocab !== null ?
                    URI_1.URI.getRelativeURI(propertyURI, digestedSchema.vocab) :
                    propertyURI;
            var targetValue = _this.getPropertyValue(propertyName, propertyValues, digestedSchema, pointerLibrary);
            if (targetValue === null || targetValue === void 0)
                return;
            targetObject[propertyName] = targetValue;
        });
        return targetObject;
    };
    JSONLDConverter.prototype.getPropertyContainerType = function (propertyValues) {
        if (propertyValues.length === 1) {
            if (List_1.RDFList.is(propertyValues[0]))
                return ContainerType_1.ContainerType.LIST;
        }
        else {
            return ContainerType_1.ContainerType.SET;
        }
        return null;
    };
    JSONLDConverter.prototype.getPropertyValue = function (propertyName, propertyValues, digestedSchema, pointerLibrary) {
        var definition = digestedSchema.properties.get(propertyName);
        var propertyContainer = definition ?
            definition.containerType :
            this.getPropertyContainerType(propertyValues);
        if (propertyContainer === ContainerType_1.ContainerType.LANGUAGE)
            return Node_1.RDFNode.getPropertyLanguageMap(propertyValues);
        if (propertyContainer === ContainerType_1.ContainerType.LIST) {
            var list = Node_1.RDFNode.getList(propertyValues);
            if (!list)
                return null;
            propertyValues = list["@list"];
        }
        var propertyType = definition ? definition.literal : null;
        if (propertyType === true && definition.language) {
            propertyValues = propertyValues.filter(function (value) { return value["@language"] === definition.language; });
        }
        if (propertyContainer === null)
            propertyValues = [propertyValues[0]];
        var compactedValues = propertyType === true ?
            this.compactPropertyLiteral(propertyValues, definition, digestedSchema) :
            propertyType === false ?
                this.getPropertyPointers(propertyValues, pointerLibrary) :
                this.getProperties(propertyValues, pointerLibrary);
        if (!compactedValues)
            return null;
        var filteredValues = compactedValues.filter(function (value) { return value !== null; });
        if (!filteredValues.length)
            return null;
        if (propertyContainer === null)
            return filteredValues[0];
        return filteredValues;
    };
    JSONLDConverter.prototype.getPropertyURINameMap = function (digestedSchema) {
        var map = new Map();
        digestedSchema.properties.forEach(function (definition, propertyName) {
            var uri = digestedSchema.resolveURI(definition.uri, { vocab: true });
            map.set(uri, propertyName);
        });
        return map;
    };
    JSONLDConverter.prototype.compactPropertyLiteral = function (propertyValues, definition, digestedSchema) {
        var literalType = definition.literalType === null ?
            XSD_1.XSD.string : digestedSchema.resolveURI(definition.literalType, { vocab: true, base: true });
        return Node_1.RDFNode.getPropertyLiterals(propertyValues, literalType);
    };
    JSONLDConverter.prototype.getProperties = function (propertyValues, pointerLibrary) {
        if (!Array.isArray(propertyValues))
            return;
        return propertyValues
            .map(Value_1.RDFValue.parse.bind(null, pointerLibrary))
            .filter(function (value) { return !Utils_1.isNull(value); });
    };
    JSONLDConverter.prototype.getPropertyPointers = function (propertyValues, pointerLibrary) {
        if (!Array.isArray(propertyValues))
            return;
        return propertyValues
            .filter(Node_1.RDFNode.is)
            .map(Node_1.RDFNode.getID)
            .map(pointerLibrary.getPointer, pointerLibrary)
            .filter(function (pointer) { return !Utils_1.isNull(pointer); });
    };
    return JSONLDConverter;
}());
exports.JSONLDConverter = JSONLDConverter;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractError_1 = __webpack_require__(21);
var InvalidJSONLDSyntaxError = (function (_super) {
    __extends(InvalidJSONLDSyntaxError, _super);
    function InvalidJSONLDSyntaxError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(InvalidJSONLDSyntaxError.prototype, "name", {
        get: function () { return "InvalidJSONLDSyntaxError"; },
        enumerable: true,
        configurable: true
    });
    return InvalidJSONLDSyntaxError;
}(AbstractError_1.AbstractError));
exports.InvalidJSONLDSyntaxError = InvalidJSONLDSyntaxError;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Header = (function () {
    function Header(values) {
        this.values = Array.isArray(values) ?
            values : Header._parseValues(values);
    }
    Header.parseHeaders = function (headersString) {
        var headers = new Map();
        headersString.split(/\r?\n/).forEach(function (strHeader) {
            var _a;
            if (!strHeader.trim())
                return;
            var parts = strHeader.split(":");
            if (parts.length < 2)
                throw new Error("ParseError: The header couldn't be parsed.");
            var name = parts[0].trim().toLowerCase();
            var values = Header._parseValues(parts.slice(1).join(":"));
            if (headers.has(name)) {
                (_a = headers.get(name).values).push.apply(_a, values);
            }
            else {
                headers.set(name, new Header(values));
            }
        });
        return headers;
    };
    Header._parseValues = function (strValues) {
        if (!strValues)
            return [];
        return strValues
            .split(",")
            .map(function (valueString) {
            return valueString.trim();
        });
    };
    Header.prototype.hasValue = function (value) {
        return this.values.indexOf(value) !== -1;
    };
    Header.prototype.toString = function () {
        return this.values.join(", ");
    };
    return Header;
}());
exports.Header = Header;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(0);
var ObjectSchemaUtils = (function () {
    function ObjectSchemaUtils() {
    }
    ObjectSchemaUtils.resolveProperty = function (schema, definition, inSame) {
        var uri = definition.uri;
        var type = definition.literalType;
        var resolvedURI = schema.resolveURI(uri, { vocab: true });
        var resolvedType = schema.resolveURI(type, { vocab: true, base: true });
        if (resolvedURI !== uri || resolvedType !== type) {
            definition = inSame ? definition : Utils_1.ObjectUtils.clone(definition);
            definition.uri = resolvedURI;
            definition.literalType = resolvedType;
        }
        return definition;
    };
    return ObjectSchemaUtils;
}());
exports.ObjectSchemaUtils = ObjectSchemaUtils;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = __webpack_require__(17);
var C_1 = __webpack_require__(3);
var XSD_1 = __webpack_require__(11);
var SCHEMA = {
    "errors": {
        "@id": C_1.C.error,
        "@type": "@id",
        "@container": "@set",
    },
    "requestID": {
        "@id": C_1.C.requestID,
        "@type": XSD_1.XSD.string,
    },
    "statusCode": {
        "@id": C_1.C.httpStatusCode,
        "@type": XSD_1.XSD.int,
    },
};
exports.ErrorResponse = {
    TYPE: C_1.C.ErrorResponse,
    SCHEMA: SCHEMA,
    is: function (value) {
        return Resource_1.Resource.is(value)
            && value.hasType(exports.ErrorResponse.TYPE);
    },
    getMessage: function (errorResponse) {
        var errors = getErrors(errorResponse);
        return errors
            .map(getErrorMessage)
            .join(", ");
    },
};
function getErrors(errorResponse) {
    if (errorResponse.errors && errorResponse.errors.length)
        return errorResponse.errors;
    if (!errorResponse[C_1.C.error])
        return [];
    if (Array.isArray(errorResponse[C_1.C.error]))
        return errorResponse[C_1.C.error];
    return [errorResponse[C_1.C.error]];
}
function getErrorMessage(error) {
    if ("errorMessage" in error)
        return error.errorMessage;
    return error[C_1.C.errorMessage];
}


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = __webpack_require__(2);
var ModelDecorator_1 = __webpack_require__(4);
var URI_1 = __webpack_require__(8);
var Resource_1 = __webpack_require__(17);
exports.TransientFragment = {
    PROTOTYPE: {
        get $registry() {
            throw new IllegalArgumentError_1.IllegalArgumentError("Property \"$registry\" is required.");
        },
        get $slug() {
            return URI_1.URI.generateBNodeID();
        },
        get $id() {
            if (URI_1.URI.isBNodeID(this.$slug))
                return this.$slug;
            return this.$document.$id + "#" + this.$slug;
        },
        set $id(value) {
            if (URI_1.URI.isBNodeID(value))
                this.$slug = value;
            else
                this.$slug = URI_1.URI.getFragment(value);
        },
        get $document() {
            return this.$registry;
        },
        set $document(document) {
            this.$registry = document;
        },
    },
    isDecorated: function (object) {
        return Resource_1.Resource.isDecorated(object);
    },
    decorate: function (object) {
        if (exports.TransientFragment.isDecorated(object))
            return object;
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, Resource_1.Resource);
        if (!target.$registry)
            delete target.$registry;
        if (!target.$slug)
            delete target.$slug;
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.TransientFragment.PROTOTYPE, target);
    },
    is: function (value) {
        return Resource_1.Resource.is(value);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientFragment.createFrom(copy);
    },
    createFrom: function (object) {
        return exports.TransientFragment.decorate(object);
    },
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Event;
(function (Event) {
    Event["CHILD_CREATED"] = "child.created";
    Event["DOCUMENT_MODIFIED"] = "document.modified";
    Event["DOCUMENT_DELETED"] = "document.deleted";
    Event["MEMBER_ADDED"] = "member.added";
    Event["MEMBER_REMOVED"] = "member.removed";
})(Event = exports.Event || (exports.Event = {}));


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TransientDocument_1 = __webpack_require__(30);
var IllegalArgumentError_1 = __webpack_require__(2);
var LDP_1 = __webpack_require__(45);
exports.TransientDirectContainer = {
    TYPE: LDP_1.LDP.DirectContainer,
    is: function (value) {
        return TransientDocument_1.TransientDocument.is(value)
            && value.hasType(exports.TransientDirectContainer.TYPE)
            && value.hasOwnProperty("membershipResource");
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientDirectContainer.createFrom(copy);
    },
    createFrom: function (object) {
        if (exports.TransientDirectContainer.is(object))
            throw new IllegalArgumentError_1.IllegalArgumentError("The base object is already a DirectContainer.");
        if (!object.hasMemberRelation)
            throw new IllegalArgumentError_1.IllegalArgumentError("The property hasMemberRelation is required.");
        var container = TransientDocument_1.TransientDocument.is(object) ?
            object : TransientDocument_1.TransientDocument.createFrom(object);
        container.addType(exports.TransientDirectContainer.TYPE);
        return container;
    },
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = __webpack_require__(2);
var JSONLDConverter_1 = __webpack_require__(68);
var DigestedObjectSchema_1 = __webpack_require__(15);
var ObjectSchemaDigester_1 = __webpack_require__(29);
var URI_1 = __webpack_require__(8);
var AbstractContext = (function () {
    function AbstractContext(parentContext) {
        this._parentContext = parentContext;
        this._typeObjectSchemaMap = new Map();
        this.jsonldConverter = new JSONLDConverter_1.JSONLDConverter(parentContext && parentContext.jsonldConverter.literalSerializers);
    }
    Object.defineProperty(AbstractContext.prototype, "baseURI", {
        get: function () { return this._baseURI; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractContext.prototype, "parentContext", {
        get: function () { return this._parentContext; },
        enumerable: true,
        configurable: true
    });
    AbstractContext.prototype.resolve = function (relativeURI) {
        return URI_1.URI.resolve(this.baseURI, relativeURI);
    };
    AbstractContext.prototype.hasObjectSchema = function (type) {
        type = this._resolveTypeURI(type);
        if (this._typeObjectSchemaMap.has(type))
            return true;
        return !!this.parentContext && this.parentContext.hasObjectSchema(type);
    };
    AbstractContext.prototype.getObjectSchema = function (type) {
        if (!!type) {
            type = this._resolveTypeURI(type);
            if (this._typeObjectSchemaMap.has(type))
                return this._typeObjectSchemaMap.get(type);
            if (this.parentContext && this.parentContext.hasObjectSchema(type))
                return this.parentContext.getObjectSchema(type);
            throw new IllegalArgumentError_1.IllegalArgumentError("\"" + type + "\" hasn't an object schema.");
        }
        else {
            var generalSchema = !this._generalObjectSchema ?
                this.parentContext ?
                    this.parentContext.getObjectSchema() :
                    new DigestedObjectSchema_1.DigestedObjectSchema() :
                ObjectSchemaDigester_1.ObjectSchemaDigester
                    .combineDigestedObjectSchemas([this._generalObjectSchema]);
            if (generalSchema.vocab === void 0 && this._settings && this._settings.vocabulary)
                generalSchema.vocab = this.resolve(this._settings.vocabulary);
            if (!generalSchema.base)
                generalSchema.base = this.baseURI;
            return generalSchema;
        }
    };
    AbstractContext.prototype.extendObjectSchema = function (typeOrObjectSchema, objectSchema) {
        var type = objectSchema ? typeOrObjectSchema : null;
        objectSchema = objectSchema ? objectSchema : typeOrObjectSchema;
        var digestedSchema = ObjectSchemaDigester_1.ObjectSchemaDigester.digestSchema(objectSchema);
        if (!type) {
            this._extendGeneralSchema(digestedSchema);
        }
        else {
            this._extendTypeSchema(digestedSchema, type);
        }
        return this;
    };
    AbstractContext.prototype.clearObjectSchema = function (type) {
        if (!type) {
            this._generalObjectSchema = this.parentContext ? null : new DigestedObjectSchema_1.DigestedObjectSchema();
        }
        else {
            type = this._resolveTypeURI(type);
            this._typeObjectSchemaMap.delete(type);
        }
    };
    AbstractContext.prototype._getTypeObjectSchemas = function () {
        var types = this._getObjectSchemasTypes();
        return types.map(this.getObjectSchema, this);
    };
    AbstractContext.prototype._getObjectSchemasTypes = function () {
        var localTypes = Array.from(this._typeObjectSchemaMap.keys());
        if (!this._parentContext)
            return localTypes;
        var allTypes = this._parentContext._getObjectSchemasTypes();
        for (var _i = 0, localTypes_1 = localTypes; _i < localTypes_1.length; _i++) {
            var type = localTypes_1[_i];
            if (allTypes.indexOf(type) !== -1)
                continue;
            allTypes.push(type);
        }
        return allTypes;
    };
    AbstractContext.prototype._extendGeneralSchema = function (digestedSchema) {
        var digestedSchemaToExtend;
        if (!!this._generalObjectSchema) {
            digestedSchemaToExtend = this._generalObjectSchema;
        }
        else if (!!this.parentContext) {
            digestedSchemaToExtend = this.parentContext.getObjectSchema();
        }
        else {
            digestedSchemaToExtend = new DigestedObjectSchema_1.DigestedObjectSchema();
        }
        this._generalObjectSchema = ObjectSchemaDigester_1.ObjectSchemaDigester._combineSchemas([
            digestedSchemaToExtend,
            digestedSchema,
        ]);
    };
    AbstractContext.prototype._extendTypeSchema = function (digestedSchema, type) {
        type = this._resolveTypeURI(type);
        var digestedSchemaToExtend;
        if (this._typeObjectSchemaMap.has(type)) {
            digestedSchemaToExtend = this._typeObjectSchemaMap.get(type);
        }
        else if (!!this.parentContext && this.parentContext.hasObjectSchema(type)) {
            digestedSchemaToExtend = this.parentContext.getObjectSchema(type);
        }
        else {
            digestedSchemaToExtend = new DigestedObjectSchema_1.DigestedObjectSchema();
        }
        var extendedDigestedSchema = ObjectSchemaDigester_1.ObjectSchemaDigester.combineDigestedObjectSchemas([
            digestedSchemaToExtend,
            digestedSchema,
        ]);
        this._typeObjectSchemaMap.set(type, extendedDigestedSchema);
    };
    AbstractContext.prototype._resolveTypeURI = function (uri) {
        return this.getObjectSchema()
            .resolveURI(uri, { vocab: true });
    };
    return AbstractContext;
}());
exports.AbstractContext = AbstractContext;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = __webpack_require__(2);
var ModelDecorator_1 = __webpack_require__(4);
var Repository_1 = __webpack_require__(225);
exports.GeneralRepository = {
    PROTOTYPE: {
        get $context() {
            throw new IllegalArgumentError_1.IllegalArgumentError("Property $context is required.");
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.GeneralRepository.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.GeneralRepository.isDecorated(object))
            return object;
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, Repository_1.Repository);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.GeneralRepository.PROTOTYPE, target);
    },
    create: function (data) {
        return exports.GeneralRepository.createFrom(__assign({}, data));
    },
    createFrom: function (object) {
        return exports.GeneralRepository.decorate(object);
    },
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = __webpack_require__(2);
var Pointer_1 = __webpack_require__(13);
var QueryableMetadata_1 = __webpack_require__(112);
var QueryContextBuilder_1 = __webpack_require__(113);
var QueryContextPartial_1 = __webpack_require__(115);
var QueryProperty_1 = __webpack_require__(58);
var Document_1 = __webpack_require__(59);
var Registry_1 = __webpack_require__(40);
var JSONLDCompacter = (function () {
    function JSONLDCompacter(registry, root, schemaResolver, jsonldConverter) {
        this.registry = registry;
        this.root = root;
        this.resolver = schemaResolver || registry;
        this.converter = jsonldConverter || registry.$context.jsonldConverter;
        this.compactionMap = new Map();
    }
    JSONLDCompacter.prototype.compactDocument = function (rdfDocument) {
        var rdfDocuments = [rdfDocument];
        return this.compactDocuments(rdfDocuments)[0];
    };
    JSONLDCompacter.prototype.compactDocuments = function (rdfDocuments, mainDocuments) {
        var _this = this;
        if (!mainDocuments || !mainDocuments.length)
            mainDocuments = rdfDocuments;
        rdfDocuments.forEach(function (rdfDocument) {
            var _a = Document_1.RDFDocument.getNodes(rdfDocument), documentNodes = _a[0], fragmentNodes = _a[1];
            if (documentNodes.length === 0)
                throw new IllegalArgumentError_1.IllegalArgumentError("The RDFDocument \"" + rdfDocument["@id"] + "\" does not contain a document resource.");
            if (documentNodes.length > 1)
                throw new IllegalArgumentError_1.IllegalArgumentError("The RDFDocument \"" + rdfDocument["@id"] + "\" contains multiple document resources.");
            var documentNode = documentNodes[0];
            var targetDocument = _this._getResource(documentNode, _this.registry);
            var currentFragments = targetDocument
                .getPointers(true)
                .map(function (pointer) { return pointer.$id; });
            var newFragments = fragmentNodes
                .map(function (fragmentNode) { return _this._getResource(fragmentNode, targetDocument); })
                .map(function (fragment) { return fragment.$id; });
            var newFragmentsSet = new Set(newFragments);
            currentFragments
                .filter(function (id) { return !newFragmentsSet.has(id); })
                .forEach(function (id) { return targetDocument.removePointer(id); });
        });
        var compactionQueue = mainDocuments
            .map(function (rdfDocument) { return rdfDocument["@id"]; });
        var mainCompactedDocuments = compactionQueue
            .map(this.compactionMap.get, this.compactionMap)
            .map(function (compactionNode) {
            if (_this.root)
                compactionNode.paths.push(_this.root);
            return compactionNode.resource;
        });
        while (compactionQueue.length) {
            this._processCompactionQueue(compactionQueue);
            this.compactionMap.forEach(function (node, key, map) {
                if (node.processed)
                    map.delete(key);
            });
            if (this.compactionMap.size)
                compactionQueue
                    .push(this.compactionMap.keys().next().value);
        }
        rdfDocuments
            .map(function (rdfDocument) { return rdfDocument["@id"]; })
            .map(function (id) { return _this.registry.getPointer(id, true); })
            .forEach(function (persistedDocument) {
            persistedDocument._syncSnapshot();
            _this.registry.decorate(persistedDocument);
        });
        return mainCompactedDocuments;
    };
    JSONLDCompacter.prototype._compactNode = function (node, resource, containerLibrary, path) {
        var schema = this.resolver.getSchemaFor(node, path);
        var isPartial = this._setOrRemovePartial(resource, schema, path);
        var compactedData = this.converter.compact(node, {}, schema, containerLibrary, isPartial);
        var addedProperties = [];
        new Set(Object.keys(resource).concat(Object.keys(compactedData))).forEach(function (key) {
            var _a;
            if (!compactedData.hasOwnProperty(key)) {
                if (!isPartial || schema.properties.has(key))
                    delete resource[key];
                return;
            }
            addedProperties.push(key);
            if (!Array.isArray(resource[key])) {
                resource[key] = compactedData[key];
                return;
            }
            var values = Array.isArray(compactedData[key]) ? compactedData[key] : [compactedData[key]];
            resource[key].length = 0;
            (_a = resource[key]).push.apply(_a, values);
        });
        return addedProperties
            .filter(function (x) { return schema.properties.has(x); });
    };
    JSONLDCompacter.prototype._getResource = function (node, registry) {
        var resource = registry.getPointer(node["@id"], true);
        if (Registry_1.Registry.isDecorated(resource))
            registry = resource;
        this.compactionMap
            .set(resource.$id, { paths: [], node: node, resource: resource, registry: registry });
        return resource;
    };
    JSONLDCompacter.prototype._processCompactionQueue = function (compactionQueue) {
        while (compactionQueue.length) {
            var targetNode = compactionQueue.shift();
            if (!this.compactionMap.has(targetNode))
                continue;
            var compactionNode = this.compactionMap.get(targetNode);
            compactionNode.processed = true;
            var targetPath = compactionNode.paths.shift();
            var addedProperties = this._compactNode(compactionNode.node, compactionNode.resource, compactionNode.registry, targetPath);
            for (var _i = 0, addedProperties_1 = addedProperties; _i < addedProperties_1.length; _i++) {
                var propertyName = addedProperties_1[_i];
                if (!compactionNode.resource.hasOwnProperty(propertyName))
                    continue;
                var value = compactionNode.resource[propertyName];
                var values = Array.isArray(value) ? value : [value];
                var pointers = values.filter(Pointer_1.Pointer.is);
                for (var _a = 0, pointers_1 = pointers; _a < pointers_1.length; _a++) {
                    var pointer = pointers_1[_a];
                    if (!this.compactionMap.has(pointer.$id))
                        continue;
                    var subCompactionNode = this.compactionMap.get(pointer.$id);
                    if (targetPath) {
                        var subPath = targetPath + "." + propertyName;
                        if (!this.resolver.hasSchemaFor(subCompactionNode.node, subPath))
                            continue;
                        subCompactionNode.paths.push(subPath);
                        compactionQueue.push(pointer.$id);
                    }
                }
            }
        }
    };
    JSONLDCompacter.prototype._setOrRemovePartial = function (resource, schema, path) {
        if (this._willBePartial(resource, schema, path))
            return true;
        if (resource._queryableMetadata)
            resource._queryableMetadata = void 0;
        return false;
    };
    JSONLDCompacter.prototype._willBePartial = function (resource, schema, path) {
        if (this.resolver instanceof QueryContextPartial_1.QueryContextPartial)
            return true;
        if (!(this.resolver instanceof QueryContextBuilder_1.QueryContextBuilder))
            return false;
        var type = this.resolver.hasProperty(path) ?
            this.resolver.getProperty(path).getType() : void 0;
        if (type !== QueryProperty_1.QueryPropertyType.PARTIAL && type !== QueryProperty_1.QueryPropertyType.ALL)
            return false;
        resource._queryableMetadata = new QueryableMetadata_1.QueryableMetadata(type === QueryProperty_1.QueryPropertyType.ALL ? QueryableMetadata_1.QueryableMetadata.ALL : schema, resource._queryableMetadata);
        return true;
    };
    return JSONLDCompacter;
}());
exports.JSONLDCompacter = JSONLDCompacter;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = __webpack_require__(17);
var C_1 = __webpack_require__(3);
exports.VolatileResource = {
    TYPE: C_1.C.VolatileResource,
    is: function (value) {
        return Resource_1.Resource.is(value)
            && value.hasType(exports.VolatileResource.TYPE);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.VolatileResource.createFrom(copy);
    },
    createFrom: function (object) {
        var resource = Resource_1.Resource.createFrom(object);
        resource.addType(exports.VolatileResource.TYPE);
        return resource;
    },
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = __webpack_require__(2);
var NotImplementedError_1 = __webpack_require__(54);
var Request_1 = __webpack_require__(28);
var StringParser_1 = __webpack_require__(118);
var Literal_1 = __webpack_require__(52);
var RawResultsParser_1 = __webpack_require__(119);
var SPARQLService = (function () {
    function SPARQLService() {
    }
    SPARQLService.executeRawASKQuery = function (url, askQuery, options) {
        if (options === void 0) { options = {}; }
        options = Object.assign(options, SPARQLService.DEFAULT_OPTIONS);
        Request_1.RequestUtils.setAcceptHeader("application/sparql-results+json", options);
        Request_1.RequestUtils.setContentTypeHeader("application/sparql-query", options);
        return Request_1.RequestService.post(url, askQuery, options, SPARQLService.RESULTS_PARSER);
    };
    SPARQLService.executeASKQuery = function (url, askQuery, options) {
        if (options === void 0) { options = {}; }
        return SPARQLService
            .executeRawASKQuery(url, askQuery, options)
            .then(function (_a) {
            var rawResults = _a[0], response = _a[1];
            return [rawResults.boolean, response];
        });
    };
    SPARQLService.executeRawSELECTQuery = function (url, selectQuery, options) {
        if (options === void 0) { options = {}; }
        options = Object.assign(options, SPARQLService.DEFAULT_OPTIONS);
        Request_1.RequestUtils.setAcceptHeader("application/sparql-results+json", options);
        Request_1.RequestUtils.setContentTypeHeader("application/sparql-query", options);
        return Request_1.RequestService.post(url, selectQuery, options, SPARQLService.RESULTS_PARSER);
    };
    SPARQLService.executeSELECTQuery = function (url, selectQuery, pointerLibrary, options) {
        if (options === void 0) { options = {}; }
        return SPARQLService
            .executeRawSELECTQuery(url, selectQuery, options)
            .then(function (_a) {
            var rawResults = _a[0], response = _a[1];
            var rawBindings = rawResults.results.bindings;
            var bindings = [];
            for (var _i = 0, rawBindings_1 = rawBindings; _i < rawBindings_1.length; _i++) {
                var bindingColumn = rawBindings_1[_i];
                var binding = {};
                for (var bindingRow in bindingColumn) {
                    if (!bindingColumn.hasOwnProperty(bindingRow))
                        continue;
                    var bindingCell = bindingColumn[bindingRow];
                    binding[bindingRow] = SPARQLService.parseRawBindingProperty(bindingCell, pointerLibrary);
                }
                bindings.push(binding);
            }
            var results = {
                vars: rawResults.head.vars,
                bindings: bindings,
            };
            return [results, response];
        });
    };
    SPARQLService.executeRawCONSTRUCTQuery = function (url, constructQuery, options) {
        if (options === void 0) { options = {}; }
        options = Object.assign(options, SPARQLService.DEFAULT_OPTIONS);
        if (Request_1.RequestUtils.getHeader("Accept", options) === undefined)
            Request_1.RequestUtils.setAcceptHeader("application/ld+json", options);
        Request_1.RequestUtils.setContentTypeHeader("application/sparql-query", options);
        return Request_1.RequestService.post(url, constructQuery, options, SPARQLService.STRING_PARSER);
    };
    SPARQLService.executeRawDESCRIBEQuery = function (url, describeQuery, options) {
        if (options === void 0) { options = {}; }
        options = Object.assign(options, SPARQLService.DEFAULT_OPTIONS);
        if (Request_1.RequestUtils.getHeader("Accept", options) === undefined)
            Request_1.RequestUtils.setAcceptHeader("application/ld+json", options);
        Request_1.RequestUtils.setContentTypeHeader("application/sparql-query", options);
        return Request_1.RequestService.post(url, describeQuery, options, SPARQLService.STRING_PARSER);
    };
    SPARQLService.executeUPDATE = function (url, updateQuery, options) {
        if (options === void 0) { options = {}; }
        options = Object.assign(options, SPARQLService.DEFAULT_OPTIONS);
        if (Request_1.RequestUtils.getHeader("Accept", options) === undefined)
            Request_1.RequestUtils.setAcceptHeader("application/ld+json", options);
        Request_1.RequestUtils.setContentTypeHeader("application/sparql-update", options);
        return Request_1.RequestService.post(url, updateQuery, options);
    };
    SPARQLService.parseRawBindingProperty = function (rawBindingProperty, pointerLibrary) {
        switch (rawBindingProperty.type) {
            case "uri":
                return pointerLibrary.getPointer(rawBindingProperty.value);
            case "bnode":
                throw new NotImplementedError_1.NotImplementedError("BNodes cannot be queried directly");
            case "literal":
                if ("datatype" in rawBindingProperty) {
                    return Literal_1.RDFLiteral.parse(rawBindingProperty.value, rawBindingProperty.datatype);
                }
                else {
                    return Literal_1.RDFLiteral.parse(rawBindingProperty.value);
                }
            default:
                throw new IllegalArgumentError_1.IllegalArgumentError("The bindingProperty has an unsupported type");
        }
    };
    SPARQLService.DEFAULT_OPTIONS = {};
    SPARQLService.RESULTS_PARSER = new RawResultsParser_1.SPARQLRawResultsParser();
    SPARQLService.STRING_PARSER = new StringParser_1.StringParser();
    return SPARQLService;
}());
exports.SPARQLService = SPARQLService;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = __webpack_require__(17);
var C_1 = __webpack_require__(3);
var SCHEMA = {
    "targetMembers": {
        "@id": C_1.C.targetMember,
        "@type": "@id",
        "@container": "@set",
    },
};
exports.AddMemberAction = {
    TYPE: C_1.C.AddMemberAction,
    SCHEMA: SCHEMA,
    is: function (value) {
        return Resource_1.Resource.is(value)
            && value.hasType(exports.AddMemberAction.TYPE);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.AddMemberAction.createFrom(copy);
    },
    createFrom: function (object) {
        var resource = Resource_1.Resource.createFrom(object);
        resource.addType(exports.AddMemberAction.TYPE);
        return resource;
    },
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = __webpack_require__(17);
var C_1 = __webpack_require__(3);
var SCHEMA = {
    "targetMembers": {
        "@id": C_1.C.targetMember,
        "@type": "@id",
        "@container": "@set",
    },
};
exports.RemoveMemberAction = {
    TYPE: C_1.C.RemoveMemberAction,
    SCHEMA: SCHEMA,
    is: function (value) {
        return Resource_1.Resource.is(value)
            && value.hasType(exports.RemoveMemberAction.TYPE);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.RemoveMemberAction.createFrom(copy);
    },
    createFrom: function (object) {
        var resource = Resource_1.Resource.createFrom(object);
        resource.addType(exports.RemoveMemberAction.TYPE);
        return resource;
    },
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var EventEmitter = __webpack_require__(12).EventEmitter
  , inherits = __webpack_require__(1)
  , eventUtils = __webpack_require__(22)
  , browser = __webpack_require__(49)
  , urlUtils = __webpack_require__(14)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(10)('sockjs-client:sender:xdr');
}

// References:
//   http://ajaxian.com/archives/100-line-ajax-wrapper
//   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx

function XDRObject(method, url, payload) {
  debug(method, url);
  var self = this;
  EventEmitter.call(this);

  setTimeout(function() {
    self._start(method, url, payload);
  }, 0);
}

inherits(XDRObject, EventEmitter);

XDRObject.prototype._start = function(method, url, payload) {
  debug('_start');
  var self = this;
  var xdr = new global.XDomainRequest();
  // IE caches even POSTs
  url = urlUtils.addQuery(url, 't=' + (+new Date()));

  xdr.onerror = function() {
    debug('onerror');
    self._error();
  };
  xdr.ontimeout = function() {
    debug('ontimeout');
    self._error();
  };
  xdr.onprogress = function() {
    debug('progress', xdr.responseText);
    self.emit('chunk', 200, xdr.responseText);
  };
  xdr.onload = function() {
    debug('load');
    self.emit('finish', 200, xdr.responseText);
    self._cleanup(false);
  };
  this.xdr = xdr;
  this.unloadRef = eventUtils.unloadAdd(function() {
    self._cleanup(true);
  });
  try {
    // Fails with AccessDenied if port number is bogus
    this.xdr.open(method, url);
    if (this.timeout) {
      this.xdr.timeout = this.timeout;
    }
    this.xdr.send(payload);
  } catch (x) {
    this._error();
  }
};

XDRObject.prototype._error = function() {
  this.emit('finish', 0, '');
  this._cleanup(false);
};

XDRObject.prototype._cleanup = function(abort) {
  debug('cleanup', abort);
  if (!this.xdr) {
    return;
  }
  this.removeAllListeners();
  eventUtils.unloadDel(this.unloadRef);

  this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
  if (abort) {
    try {
      this.xdr.abort();
    } catch (x) {
      // intentionally empty
    }
  }
  this.unloadRef = this.xdr = null;
};

XDRObject.prototype.close = function() {
  debug('close');
  this._cleanup(true);
};

// IE 8/9 if the request target uses the same scheme - #79
XDRObject.enabled = !!(global.XDomainRequest && browser.hasDomain());

module.exports = XDRObject;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var inherits = __webpack_require__(1)
  , IframeTransport = __webpack_require__(143)
  , objectUtils = __webpack_require__(85)
  ;

module.exports = function(transport) {

  function IframeWrapTransport(transUrl, baseUrl) {
    IframeTransport.call(this, transport.transportName, transUrl, baseUrl);
  }

  inherits(IframeWrapTransport, IframeTransport);

  IframeWrapTransport.enabled = function(url, info) {
    if (!global.document) {
      return false;
    }

    var iframeInfo = objectUtils.extend({}, info);
    iframeInfo.sameOrigin = true;
    return transport.enabled(iframeInfo) && IframeTransport.enabled();
  };

  IframeWrapTransport.transportName = 'iframe-' + transport.transportName;
  IframeWrapTransport.needBody = true;
  IframeWrapTransport.roundTrips = IframeTransport.roundTrips + transport.roundTrips - 1; // html, javascript (2) + transport - no CORS (1)

  IframeWrapTransport.facadeTransport = transport;

  return IframeWrapTransport;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isObject: function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }

, extend: function(obj) {
    if (!this.isObject(obj)) {
      return obj;
    }
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (Object.prototype.hasOwnProperty.call(source, prop)) {
          obj[prop] = source[prop];
        }
      }
    }
    return obj;
  }
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Event(eventType) {
  this.type = eventType;
}

Event.prototype.initEvent = function(eventType, canBubble, cancelable) {
  this.type = eventType;
  this.bubbles = canBubble;
  this.cancelable = cancelable;
  this.timeStamp = +new Date();
  return this;
};

Event.prototype.stopPropagation = function() {};
Event.prototype.preventDefault = function() {};

Event.CAPTURING_PHASE = 1;
Event.AT_TARGET = 2;
Event.BUBBLING_PHASE = 3;

module.exports = Event;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(3);
var SCHEMA = {
    "members": {
        "@id": C_1.C.member,
        "@type": "@id",
        "@container": "@set",
    },
};
exports.MemberDetails = {
    SCHEMA: SCHEMA,
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SHACL = {
    namespace: "http://www.w3.org/ns/shacl#",
    ValidationReport: "http://www.w3.org/ns/shacl#ValidationReport",
    ValidationResult: "http://www.w3.org/ns/shacl#ValidationResult",
    conforms: "http://www.w3.org/ns/shacl#conforms",
    detail: "http://www.w3.org/ns/shacl#detail",
    focusNode: "http://www.w3.org/ns/shacl#focusNode",
    result: "http://www.w3.org/ns/shacl#result",
    resultMessage: "http://www.w3.org/ns/shacl#resultMessage",
    resultPath: "http://www.w3.org/ns/shacl#resultPath",
    resultSeverity: "http://www.w3.org/ns/shacl#resultSeverity",
    shapesGraphWellFormed: "http://www.w3.org/ns/shacl#shapesGraphWellFormed",
    sourceConstraintComponent: "http://www.w3.org/ns/shacl#sourceConstraintComponent",
    sourceShape: "http://www.w3.org/ns/shacl#sourceShape",
    value: "http://www.w3.org/ns/shacl#value",
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Identifier_1 = __webpack_require__(35);
var Token_1 = __webpack_require__(20);
var LeftSymbol = (function (_super) {
    __extends(LeftSymbol, _super);
    function LeftSymbol() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LeftSymbol.prototype.getPrettySeparator = function (nextToken) {
        if (nextToken instanceof LeftSymbol || nextToken instanceof Identifier_1.Identifier)
            return Token_1.SPACE_SEPARATOR;
        return Token_1.EMPTY_SEPARATOR;
    };
    LeftSymbol.prototype.getCompactSeparator = function (nextToken) {
        return Token_1.EMPTY_SEPARATOR;
    };
    return LeftSymbol;
}(Token_1.Token));
exports.LeftSymbol = LeftSymbol;
exports.default = LeftSymbol;

//# sourceMappingURL=LeftSymbol.js.map


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IRIToken = (function () {
    function IRIToken(value) {
        this.token = "iri";
        this.value = value;
    }
    IRIToken.prototype.toString = function () {
        return "<" + this.value + ">";
    };
    return IRIToken;
}());
exports.IRIToken = IRIToken;

//# sourceMappingURL=IRIToken.js.map


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(65);
var NAMESPACE_REGEX = /^([A-Za-z](([A-Za-z_\-0-9]|\.)*[A-Za-z_\-0-9])?)?$/;
var PrefixedNameToken = (function () {
    function PrefixedNameToken(prefixedOrNamespace, localName) {
        this.token = "prefixedName";
        var namespace = prefixedOrNamespace;
        if (localName === void 0) {
            if (!utils_1.isPrefixed(prefixedOrNamespace))
                throw new Error("Invalid prefixed name.");
            _a = prefixedOrNamespace.split(/:(.*)/), namespace = _a[0], localName = _a[1];
        }
        if (!NAMESPACE_REGEX.test(namespace))
            throw new Error("Invalid prefixed namespace.");
        this.namespace = namespace;
        var _b = localName.split(/^(.)(?:(.*)?(.))?$/), ln1 = _b[1], ln2 = _b[2], ln3 = _b[3];
        var preSanitation = "";
        if (ln1)
            preSanitation += ln1.replace(/([\-.])/g, "\\$1");
        if (ln2)
            preSanitation += ln2;
        if (ln2)
            preSanitation += ln3.replace(/([.])/g, "\\$1");
        this.localName = preSanitation.replace(/([~!$&'|()*+,;=/?#@%])/g, "\\$1");
        var _a;
    }
    PrefixedNameToken.prototype.toString = function () {
        return this.namespace + ":" + this.localName;
    };
    return PrefixedNameToken;
}());
exports.PrefixedNameToken = PrefixedNameToken;

//# sourceMappingURL=PrefixedNameToken.js.map


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NumberToken = (function () {
    function NumberToken(value) {
        this.token = "number";
        this.value = value;
    }
    NumberToken.prototype.toString = function () {
        return "" + this.value;
    };
    return NumberToken;
}());
exports.NumberToken = NumberToken;

//# sourceMappingURL=NumberToken.js.map


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LANGUAGE_REGEX = /^[a-zA-Z]+(-[a-zA-Z0-9]+)*$/;
function isLanguageTag(tag) {
    return LANGUAGE_REGEX.test(tag);
}
exports.isLanguageTag = isLanguageTag;
var LanguageToken = (function () {
    function LanguageToken(tag) {
        this.token = "language";
        if (!isLanguageTag(tag))
            throw new Error("Invalid language tag.");
        this.tag = tag;
    }
    LanguageToken.prototype.toString = function () {
        return "@" + this.tag;
    };
    return LanguageToken;
}());
exports.LanguageToken = LanguageToken;

//# sourceMappingURL=LanguageToken.js.map


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BooleanToken = (function () {
    function BooleanToken(value) {
        this.token = "boolean";
        this.value = value;
    }
    BooleanToken.prototype.toString = function () {
        return "" + this.value;
    };
    return BooleanToken;
}());
exports.BooleanToken = BooleanToken;

//# sourceMappingURL=BooleanToken.js.map


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StringToken = (function () {
    function StringToken(value) {
        this.token = "string";
        this.value = value;
    }
    StringToken.prototype.toString = function () {
        return "\"" + this.value + "\"";
    };
    return StringToken;
}());
exports.StringToken = StringToken;

//# sourceMappingURL=StringToken.js.map


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ModelDecorator_1 = __webpack_require__(4);
var QueryablePointer_1 = __webpack_require__(38);
var TransientFragment_1 = __webpack_require__(73);
exports.Fragment = {
    PROTOTYPE: {
        get $repository() {
            return this.$registry;
        },
        set $repository(document) {
            this.$registry = document;
        },
        get _resolved() {
            return this.$document._resolved;
        },
        set _resolved(_value) { },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.Fragment.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.Fragment.isDecorated(object))
            return object;
        var forced = Object.assign(object, {
            $document: object.$registry,
            $repository: object.$registry,
        });
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(forced, TransientFragment_1.TransientFragment, QueryablePointer_1.QueryablePointer);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.Fragment.PROTOTYPE, target);
    },
    create: TransientFragment_1.TransientFragment.create,
    createFrom: TransientFragment_1.TransientFragment.createFrom,
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractError_1 = __webpack_require__(21);
var IDAlreadyInUseError = (function (_super) {
    __extends(IDAlreadyInUseError, _super);
    function IDAlreadyInUseError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IDAlreadyInUseError.prototype, "name", {
        get: function () { return "IDAlreadyInUseError"; },
        enumerable: true,
        configurable: true
    });
    return IDAlreadyInUseError;
}(AbstractError_1.AbstractError));
exports.IDAlreadyInUseError = IDAlreadyInUseError;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = __webpack_require__(2);
var Utils = __importStar(__webpack_require__(0));
function pad(value) {
    var paddedValue = String(value);
    if (paddedValue.length === 1)
        paddedValue = "0" + paddedValue;
    return paddedValue;
}
var notNumberError = "The value is not a number.";
var DateSerializer = (function () {
    function DateSerializer() {
    }
    DateSerializer.prototype.serialize = function (value) {
        if (!Utils.isDate(value))
            throw new IllegalArgumentError_1.IllegalArgumentError("The value is not a Date object.");
        return value.getUTCFullYear() + "-" + pad((value.getUTCMonth() + 1)) + "-" + pad(value.getUTCDate());
    };
    return DateSerializer;
}());
exports.DateSerializer = DateSerializer;
exports.dateSerializer = new DateSerializer();
var DateTimeSerializer = (function () {
    function DateTimeSerializer() {
    }
    DateTimeSerializer.prototype.serialize = function (value) {
        if (!Utils.isDate(value))
            throw new IllegalArgumentError_1.IllegalArgumentError("The value is not a Date object.");
        return value.toISOString();
    };
    return DateTimeSerializer;
}());
exports.DateTimeSerializer = DateTimeSerializer;
exports.dateTimeSerializer = new DateTimeSerializer();
var TimeSerializer = (function () {
    function TimeSerializer() {
    }
    TimeSerializer.prototype.serialize = function (value) {
        if (!Utils.isDate(value))
            throw new IllegalArgumentError_1.IllegalArgumentError("The value is not a Date object.");
        return pad(value.getUTCHours())
            + ":" + pad(value.getUTCMinutes())
            + ":" + pad(value.getUTCSeconds())
            + "." + String((value.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5)
            + "Z";
    };
    return TimeSerializer;
}());
exports.TimeSerializer = TimeSerializer;
exports.timeSerializer = new TimeSerializer();
var IntegerSerializer = (function () {
    function IntegerSerializer() {
    }
    IntegerSerializer.prototype.serialize = function (value) {
        if (!Utils.isNumber(value))
            throw new IllegalArgumentError_1.IllegalArgumentError(notNumberError);
        return (~~value).toString();
    };
    return IntegerSerializer;
}());
exports.IntegerSerializer = IntegerSerializer;
exports.integerSerializer = new IntegerSerializer();
var LongSerializer = (function () {
    function LongSerializer() {
    }
    LongSerializer.prototype.serialize = function (value) {
        if (!Utils.isNumber(value))
            throw new IllegalArgumentError_1.IllegalArgumentError(notNumberError);
        return Math.trunc(value).toString();
    };
    return LongSerializer;
}());
exports.LongSerializer = LongSerializer;
exports.longSerializer = new LongSerializer();
var UnsignedIntegerSerializer = (function (_super) {
    __extends(UnsignedIntegerSerializer, _super);
    function UnsignedIntegerSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnsignedIntegerSerializer.prototype.serialize = function (value) {
        var stringValue = _super.prototype.serialize.call(this, value);
        stringValue = Utils.StringUtils.startsWith(stringValue, "-") ? stringValue.substring(1) : stringValue;
        return stringValue;
    };
    return UnsignedIntegerSerializer;
}(IntegerSerializer));
exports.UnsignedIntegerSerializer = UnsignedIntegerSerializer;
exports.unsignedIntegerSerializer = new UnsignedIntegerSerializer();
var UnsignedLongSerializer = (function () {
    function UnsignedLongSerializer() {
    }
    UnsignedLongSerializer.prototype.serialize = function (value) {
        if (!Utils.isNumber(value))
            throw new IllegalArgumentError_1.IllegalArgumentError(notNumberError);
        return Math.trunc(Math.abs(value)).toString();
    };
    return UnsignedLongSerializer;
}());
exports.UnsignedLongSerializer = UnsignedLongSerializer;
exports.unsignedLongSerializer = new UnsignedLongSerializer();
var FloatSerializer = (function () {
    function FloatSerializer() {
    }
    FloatSerializer.prototype.serialize = function (value) {
        if (value === Number.POSITIVE_INFINITY)
            return "INF";
        if (value === Number.NEGATIVE_INFINITY)
            return "-INF";
        if (!Utils.isNumber(value))
            throw new IllegalArgumentError_1.IllegalArgumentError(notNumberError);
        return value.toString();
    };
    return FloatSerializer;
}());
exports.FloatSerializer = FloatSerializer;
exports.floatSerializer = new FloatSerializer();
var BooleanSerializer = (function () {
    function BooleanSerializer() {
    }
    BooleanSerializer.prototype.serialize = function (value) {
        return (!!value).toString();
    };
    return BooleanSerializer;
}());
exports.BooleanSerializer = BooleanSerializer;
exports.booleanSerializer = new BooleanSerializer();
var StringSerializer = (function () {
    function StringSerializer() {
    }
    StringSerializer.prototype.serialize = function (value) {
        return String(value);
    };
    return StringSerializer;
}());
exports.StringSerializer = StringSerializer;
exports.stringSerializer = new StringSerializer();


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(0);
var List_1 = __webpack_require__(42);
var Literal_1 = __webpack_require__(52);
var Node_1 = __webpack_require__(43);
exports.RDFValue = {
    parse: function (pointerLibrary, value) {
        if (Utils_1.isString(value))
            return value;
        if (Literal_1.RDFLiteral.is(value))
            return Literal_1.RDFLiteral.parse(value);
        if (Node_1.RDFNode.is(value))
            return pointerLibrary.getPointer(value["@id"]);
        if (List_1.RDFList.is(value))
            return value["@list"]
                .map(exports.RDFValue.parse.bind(null, pointerLibrary));
        return null;
    },
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(0);
var XSD_1 = __webpack_require__(11);
function guessXSDType(value) {
    if (Utils_1.isFunction(value))
        return null;
    if (Utils_1.isString(value))
        return XSD_1.XSD.string;
    if (Utils_1.isDate(value))
        return XSD_1.XSD.dateTime;
    if (Utils_1.isNumber(value))
        return XSD_1.XSD.float;
    if (Utils_1.isBoolean(value))
        return XSD_1.XSD.boolean;
    return null;
}
exports.guessXSDType = guessXSDType;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = __webpack_require__(2);
var ModelDecorator_1 = __webpack_require__(4);
var Pointer_1 = __webpack_require__(13);
exports.RegisteredPointer = {
    PROTOTYPE: {
        get $registry() {
            throw new IllegalArgumentError_1.IllegalArgumentError("Property \"$registry\" is required.");
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.RegisteredPointer.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.RegisteredPointer.isDecorated(object))
            return object;
        var resource = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, Pointer_1.Pointer);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.RegisteredPointer.PROTOTYPE, resource);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.RegisteredPointer.createFrom(copy);
    },
    createFrom: function (object) {
        return exports.RegisteredPointer.decorate(object);
    },
    is: function (value) {
        return Pointer_1.Pointer.is(value)
            && exports.RegisteredPointer.isDecorated(value);
    },
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var InvalidJSONLDSyntaxError_1 = __webpack_require__(69);
var NotImplementedError_1 = __webpack_require__(54);
var JSONParser_1 = __webpack_require__(53);
var Request_1 = __webpack_require__(28);
var ContainerType_1 = __webpack_require__(41);
var DigestedObjectSchema_1 = __webpack_require__(15);
var DigestedObjectSchemaProperty_1 = __webpack_require__(56);
var ObjectSchemaDigester_1 = __webpack_require__(29);
var PointerType_1 = __webpack_require__(57);
var List_1 = __webpack_require__(42);
var URI_1 = __webpack_require__(8);
var Utils = __importStar(__webpack_require__(0));
var MAX_CONTEXT_URLS = 10;
var LINK_HEADER_REL = "http://www.w3.org/ns/json-ld#context";
var JSONLDProcessor = (function () {
    function JSONLDProcessor() {
    }
    JSONLDProcessor.expand = function (input) {
        return JSONLDProcessor.retrieveContexts(input, Object.create(null), "").then(function () {
            var expanded = JSONLDProcessor.process(new DigestedObjectSchema_1.DigestedObjectSchema(), input);
            if (Utils.isObject(expanded) && "@graph" in expanded && Object.keys(expanded).length === 1) {
                expanded = expanded["@graph"];
            }
            else if (expanded === null) {
                expanded = [];
            }
            if (!Utils.isArray(expanded))
                expanded = [expanded];
            return expanded;
        });
    };
    JSONLDProcessor.getTargetFromLinkHeader = function (header) {
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
    };
    JSONLDProcessor.findContextURLs = function (input, contexts, base, replace) {
        if (replace === void 0) { replace = false; }
        var previousContexts = Object.keys(contexts).length;
        if (Utils.isArray(input)) {
            for (var _i = 0, _a = input; _i < _a.length; _i++) {
                var element = _a[_i];
                JSONLDProcessor.findContextURLs(element, contexts, base);
            }
        }
        else if (Utils.isPlainObject(input)) {
            for (var key in input) {
                if ("@context" !== key) {
                    JSONLDProcessor.findContextURLs(input[key], contexts, base);
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
                        url = URI_1.URI.resolve(base, url);
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
                    url = URI_1.URI.resolve(base, url);
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
    };
    JSONLDProcessor.retrieveContexts = function (input, contextsRequested, base) {
        if (Object.keys(contextsRequested).length > MAX_CONTEXT_URLS)
            return Promise.reject(new InvalidJSONLDSyntaxError_1.InvalidJSONLDSyntaxError("Maximum number of @context URLs exceeded."));
        var contextToResolved = Object.create(null);
        if (!JSONLDProcessor.findContextURLs(input, contextToResolved, base))
            return Promise.resolve();
        function resolved(url, promise) {
            return promise.then(function (_a) {
                var object = _a[0], response = _a[1];
                var _contextsRequested = Utils.ObjectUtils.clone(contextsRequested);
                _contextsRequested[url] = true;
                var contextWrapper = { "@context": {} };
                var header = response.getHeader("Content-Type");
                if (!Utils.StringUtils.contains(header.toString(), "application/ld+json")) {
                    header = response.getHeader("Link");
                    var link = void 0;
                    if (!!header)
                        link = JSONLDProcessor.getTargetFromLinkHeader(header);
                    if (!!link)
                        contextWrapper["@context"] = link;
                }
                else {
                    contextWrapper["@context"] = ("@context" in object) ? object["@context"] : {};
                }
                contextToResolved[url] = contextWrapper["@context"];
                return JSONLDProcessor.retrieveContexts(contextWrapper, _contextsRequested, url);
            });
        }
        var promises = [];
        var _loop_1 = function (url) {
            if (url in contextsRequested)
                return { value: Promise.reject(new InvalidJSONLDSyntaxError_1.InvalidJSONLDSyntaxError("Cyclical @context URLs detected.")) };
            var requestOptions = { sendCredentialsOnCORS: false };
            Request_1.RequestUtils.setAcceptHeader("application/ld+json, application/json", requestOptions);
            var promise = Request_1.RequestService
                .get(url, requestOptions, new JSONParser_1.JSONParser())
                .catch(function (response) {
                return Promise.reject(new InvalidJSONLDSyntaxError_1.InvalidJSONLDSyntaxError("Unable to resolve context from \"" + url + "\". Status code: " + response.status));
            });
            promises.push(resolved(url, promise));
        };
        for (var url in contextToResolved) {
            var state_1 = _loop_1(url);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return Promise.all(promises).then(function () {
            JSONLDProcessor.findContextURLs(input, contextToResolved, base, true);
        });
    };
    JSONLDProcessor.isKeyword = function (value) {
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
    };
    JSONLDProcessor.isValidType = function (value) {
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
    };
    JSONLDProcessor.expandURI = function (schema, uri, relativeTo) {
        if (JSONLDProcessor.isKeyword(uri))
            return uri;
        return schema.resolveURI(uri, relativeTo);
    };
    JSONLDProcessor.expandLanguageMap = function (languageMap) {
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
                    throw new InvalidJSONLDSyntaxError_1.InvalidJSONLDSyntaxError("Language map values must be strings.");
                expandedLanguage.push({
                    "@value": item,
                    "@language": key.toLowerCase(),
                });
            }
        }
        return expandedLanguage;
    };
    JSONLDProcessor.getContainer = function (context, property) {
        if (context.properties.has(property))
            return context.properties.get(property).containerType;
        return void 0;
    };
    JSONLDProcessor.expandValue = function (context, value, propertyName) {
        if (Utils.isNull(value) || !Utils.isDefined(value))
            return null;
        if (propertyName === "@id") {
            return JSONLDProcessor.expandURI(context, value, { base: true });
        }
        else if (propertyName === "@type") {
            return JSONLDProcessor.expandURI(context, value, { vocab: true, base: true });
        }
        var definition = new DigestedObjectSchemaProperty_1.DigestedObjectSchemaProperty();
        if (context.properties.has(propertyName))
            definition = context.properties.get(propertyName);
        if (definition.literal === false || (propertyName === "@graph" && Utils.isString(value))) {
            var options = { base: true };
            if (definition.pointerType === PointerType_1.PointerType.VOCAB)
                options.vocab = true;
            return { "@id": JSONLDProcessor.expandURI(context, value, options) };
        }
        if (JSONLDProcessor.isKeyword(propertyName))
            return value;
        var expandedValue = {};
        if (definition.literalType) {
            expandedValue["@type"] = context.resolveURI(definition.literalType, { vocab: true, base: true });
        }
        else if (Utils.isString(value)) {
            var language = Utils.isDefined(definition.language) ? definition.language : context.language;
            if (language !== null)
                expandedValue["@language"] = language;
        }
        if (["boolean", "number", "string"].indexOf(typeof value) === -1)
            value = value.toString();
        expandedValue["@value"] = value;
        return expandedValue;
    };
    JSONLDProcessor.process = function (context, element, activeProperty, insideList) {
        if (Utils.isNull(element) || !Utils.isDefined(element))
            return null;
        if (!Utils.isArray(element) && !Utils.isObject(element)) {
            if (!insideList && (activeProperty === null || activeProperty === "@graph"))
                return null;
            return JSONLDProcessor.expandValue(context, element, activeProperty);
        }
        if (Utils.isArray(element)) {
            var container = JSONLDProcessor.getContainer(context, activeProperty);
            insideList = insideList || container === ContainerType_1.ContainerType.LIST;
            var expanded = [];
            for (var _i = 0, _a = element; _i < _a.length; _i++) {
                var item = _a[_i];
                var expandedItem = JSONLDProcessor.process(context, item, activeProperty);
                if (expandedItem === null)
                    continue;
                if (insideList && (Utils.isArray(expandedItem) || List_1.RDFList.is(expandedItem)))
                    throw new InvalidJSONLDSyntaxError_1.InvalidJSONLDSyntaxError("Lists of lists are not permitted.");
                if (!Utils.isArray(expandedItem))
                    expandedItem = [expandedItem];
                expanded.push.apply(expanded, expandedItem);
            }
            return expanded;
        }
        if ("@context" in element) {
            context = ObjectSchemaDigester_1.ObjectSchemaDigester
                .combineDigestedObjectSchemas([
                context,
                ObjectSchemaDigester_1.ObjectSchemaDigester.digestSchema(element["@context"]),
            ]);
        }
        var expandedElement = {};
        var keys = Object.keys(element);
        for (var _b = 0, keys_2 = keys; _b < keys_2.length; _b++) {
            var key = keys_2[_b];
            if (key === "@context")
                continue;
            var uri = JSONLDProcessor.expandURI(context, key, { vocab: true });
            if (!uri || !(URI_1.URI.isAbsolute(uri) || URI_1.URI.isBNodeID(uri) || JSONLDProcessor.isKeyword(uri)))
                continue;
            var value = element[key];
            if (JSONLDProcessor.isKeyword(uri)) {
                if (uri === "@id" && !Utils.isString(value))
                    throw new InvalidJSONLDSyntaxError_1.InvalidJSONLDSyntaxError("\"@id\" value must a string.");
                if (uri === "@type" && !JSONLDProcessor.isValidType(value))
                    throw new InvalidJSONLDSyntaxError_1.InvalidJSONLDSyntaxError("\"@type\" value must a string, an array of strings.");
                if (uri === "@graph" && !(Utils.isObject(value) || Utils.isArray(value)))
                    throw new InvalidJSONLDSyntaxError_1.InvalidJSONLDSyntaxError("\"@graph\" value must not be an object or an array.");
                if (uri === "@value" && (Utils.isObject(value) || Utils.isArray(value)))
                    throw new InvalidJSONLDSyntaxError_1.InvalidJSONLDSyntaxError("\"@value\" value must not be an object or an array.");
                if (uri === "@language") {
                    if (value === null)
                        continue;
                    if (!Utils.isString(value))
                        throw new InvalidJSONLDSyntaxError_1.InvalidJSONLDSyntaxError("\"@language\" value must be a string.");
                    value = value.toLowerCase();
                }
                if (uri === "@index" && !Utils.isString(value))
                    throw new InvalidJSONLDSyntaxError_1.InvalidJSONLDSyntaxError("\"@index\" value must be a string.");
                if (uri === "@reverse" && !Utils.isObject(value))
                    throw new InvalidJSONLDSyntaxError_1.InvalidJSONLDSyntaxError("\"@reverse\" value must be an object.");
                if (uri === "@index" || uri === "@reverse")
                    throw new NotImplementedError_1.NotImplementedError("The SDK does not support \"@index\" and \"@reverse\" tags.");
            }
            var expandedValue = void 0;
            var container = JSONLDProcessor.getContainer(context, key);
            if (container === ContainerType_1.ContainerType.LANGUAGE && Utils.isObject(value)) {
                expandedValue = JSONLDProcessor.expandLanguageMap(value);
            }
            else {
                var nextActiveProperty = key;
                var isList = uri === "@list";
                if (isList || uri === "@set") {
                    nextActiveProperty = activeProperty;
                    if (isList && activeProperty === "@graph")
                        nextActiveProperty = null;
                }
                expandedValue = JSONLDProcessor.process(context, value, nextActiveProperty, isList);
            }
            if (expandedValue === null && uri !== "@value")
                continue;
            if (uri !== "@list" && !List_1.RDFList.is(expandedValue) && container === ContainerType_1.ContainerType.LIST) {
                if (!Utils.isArray(expandedValue))
                    expandedValue = [expandedValue];
                expandedValue = { "@list": expandedValue };
            }
            var useArray = ["@type", "@id", "@value", "@language"].indexOf(uri) === -1;
            JSONLDProcessor.addValue(expandedElement, uri, expandedValue, { propertyIsArray: useArray });
        }
        if ("@value" in expandedElement) {
            if (expandedElement["@value"] === null)
                expandedElement = null;
        }
        else if ("@type" in expandedElement) {
            if (!Utils.isArray(expandedElement["@type"]))
                expandedElement["@type"] = [expandedElement["@type"]];
        }
        else if ("@set" in expandedElement) {
            expandedElement = expandedElement["@set"];
        }
        return expandedElement;
    };
    JSONLDProcessor.addValue = function (element, propertyName, value, options) {
        if (Utils.isArray(value)) {
            var values = value;
            if (values.length === 0 && options.propertyIsArray && !Utils.hasProperty(element, propertyName))
                element[propertyName] = [];
            for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
                var item = values_2[_i];
                JSONLDProcessor.addValue(element, propertyName, item, options);
            }
        }
        else if (propertyName in element) {
            if (!JSONLDProcessor.hasValue(element, propertyName, value)) {
                var items = element[propertyName];
                if (!Utils.isArray(items))
                    items = element[propertyName] = [items];
                items.push(value);
            }
        }
        else {
            element[propertyName] = options.propertyIsArray ? [value] : value;
        }
    };
    JSONLDProcessor.hasProperty = function (element, propertyName) {
        if (propertyName in element) {
            var item = element[propertyName];
            return !Utils.isArray(item) || item.length > 0;
        }
        return false;
    };
    JSONLDProcessor.compareValues = function (value1, value2) {
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
    };
    JSONLDProcessor.hasValue = function (element, propertyName, value) {
        if (JSONLDProcessor.hasProperty(element, propertyName)) {
            var item = element[propertyName];
            var isList = List_1.RDFList.is(item);
            if (isList || Utils.isArray(item)) {
                var items = isList ? item["@list"] : item;
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var entry = items_1[_i];
                    if (JSONLDProcessor.compareValues(entry, value))
                        return true;
                }
            }
            else if (!Utils.isArray(value)) {
                return JSONLDProcessor.compareValues(item, value);
            }
        }
        return false;
    };
    return JSONLDProcessor;
}());
exports.JSONLDProcessor = JSONLDProcessor;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ClientErrors = __importStar(__webpack_require__(104));
var ServerErrors = __importStar(__webpack_require__(105));
__export(__webpack_require__(104));
__export(__webpack_require__(105));
__export(__webpack_require__(6));
__export(__webpack_require__(106));
exports.statusCodeMap = new Map();
var addErrors = function (o) { return Object
    .keys(o)
    .map(function (k) { return o[k]; })
    .forEach(function (e) { return exports.statusCodeMap.set(e.statusCode, e); }); };
addErrors(ClientErrors);
addErrors(ServerErrors);


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(196));
__export(__webpack_require__(197));
__export(__webpack_require__(198));
__export(__webpack_require__(199));
__export(__webpack_require__(200));
__export(__webpack_require__(201));
__export(__webpack_require__(202));
__export(__webpack_require__(203));
__export(__webpack_require__(204));
__export(__webpack_require__(205));
__export(__webpack_require__(206));
__export(__webpack_require__(207));
__export(__webpack_require__(208));
__export(__webpack_require__(209));


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(55));
__export(__webpack_require__(210));
__export(__webpack_require__(211));
__export(__webpack_require__(212));
__export(__webpack_require__(213));
__export(__webpack_require__(214));
__export(__webpack_require__(215));


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "UnknownError";
var UnknownError = (function (_super) {
    __extends(UnknownError, _super);
    function UnknownError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UnknownError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return UnknownError;
}(HTTPError_1.HTTPError));
exports.UnknownError = UnknownError;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HTTPMethod;
(function (HTTPMethod) {
    HTTPMethod[HTTPMethod["OPTIONS"] = 0] = "OPTIONS";
    HTTPMethod[HTTPMethod["HEAD"] = 1] = "HEAD";
    HTTPMethod[HTTPMethod["GET"] = 2] = "GET";
    HTTPMethod[HTTPMethod["POST"] = 3] = "POST";
    HTTPMethod[HTTPMethod["PUT"] = 4] = "PUT";
    HTTPMethod[HTTPMethod["PATCH"] = 5] = "PATCH";
    HTTPMethod[HTTPMethod["DELETE"] = 6] = "DELETE";
})(HTTPMethod = exports.HTTPMethod || (exports.HTTPMethod = {}));


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BadResponseError_1 = __webpack_require__(55);
var Header_1 = __webpack_require__(70);
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


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TransientDirectContainer_1 = __webpack_require__(75);
var C_1 = __webpack_require__(3);
exports.TransientAccessPoint = {
    TYPE: C_1.C.AccessPoint,
    is: function (value) {
        return TransientDirectContainer_1.TransientDirectContainer.is(value);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientAccessPoint.createFrom(copy);
    },
    createFrom: function (object) {
        var accessPoint = TransientDirectContainer_1.TransientDirectContainer
            .createFrom(object);
        accessPoint
            .addType(exports.TransientAccessPoint.TYPE);
        return accessPoint;
    },
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = __webpack_require__(2);
var ModelDecorator_1 = __webpack_require__(4);
var ObjectSchemaResolver_1 = __webpack_require__(222);
var URI_1 = __webpack_require__(8);
var Registry_1 = __webpack_require__(40);
var Utils_1 = __webpack_require__(0);
exports.GeneralRegistry = {
    PROTOTYPE: {
        get $context() {
            throw new IllegalArgumentError_1.IllegalArgumentError("Property $context is required.");
        },
        get $registry() {
            if (!this.$context || !this.$context.parentContext)
                return;
            return this.$context.parentContext.registry;
        },
        set $registry(value) { },
        get __modelDecorators() { return new Map(); },
        addDecorator: function (decorator) {
            if (!decorator.TYPE)
                throw new IllegalArgumentError_1.IllegalArgumentError("No TYPE specified in the model decorator.");
            this.__modelDecorators.set(decorator.TYPE, decorator);
            return this;
        },
        decorate: function (object) {
            var _this = this;
            if (!object.types)
                return;
            object.types
                .filter(function (type) { return _this.__modelDecorators.has(type); })
                .map(function (type) { return _this.__modelDecorators.get(type); })
                .forEach(function (decorator) { return decorator.decorate(object); });
        },
        _addPointer: function (pointer) {
            if (this.$context.repository)
                Object.assign(pointer, { $repository: this.$context.repository });
            var resource = Registry_1.Registry.PROTOTYPE._addPointer.call(this, pointer);
            resource.$id = this.$context.getObjectSchema().resolveURI(resource.$id, { base: true });
            return resource;
        },
        _getLocalID: function (id) {
            var uri = this.$context.getObjectSchema().resolveURI(id, { base: true });
            if (!URI_1.URI.isAbsolute(uri) || !URI_1.URI.isBaseOf(this.$context.baseURI, uri))
                throw new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope.");
            return URI_1.URI.getRelativeURI(uri, this.$context.baseURI);
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.GeneralRegistry.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.GeneralRegistry.isDecorated(object))
            return object;
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, Registry_1.Registry, ObjectSchemaResolver_1.ObjectSchemaResolver);
        if (!target.$context)
            delete target.$context;
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.GeneralRegistry.PROTOTYPE, target);
    },
    create: function (data) {
        return exports.GeneralRegistry.createFrom(__assign({}, data));
    },
    createFrom: function (object) {
        var registry = exports.GeneralRegistry.decorate(object);
        if (registry.$registry)
            Utils_1.MapUtils.extend(registry.__modelDecorators, registry.$registry.__modelDecorators);
        return registry;
    },
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = __webpack_require__(2);
var URI_1 = __webpack_require__(8);
function validateEventType(event) {
    if (!/(access-point|child|\*)\.(created|\*)|(document|\*)\.(modified|deleted|\*)|(member|\*)\.(added|removed|\*)/.test(event))
        throw new IllegalArgumentError_1.IllegalArgumentError("Provided event type \"" + event + "\" is invalid.");
}
exports.validateEventType = validateEventType;
function parseURIPattern(uriPattern, baseURI) {
    if (!URI_1.URI.isBaseOf(baseURI, uriPattern))
        throw new IllegalArgumentError_1.IllegalArgumentError("\"" + uriPattern + "\" is out of scope.");
    if (uriPattern === "/")
        return "";
    uriPattern = URI_1.URI.getRelativeURI(uriPattern, baseURI);
    uriPattern = uriPattern.substring(+uriPattern.startsWith("/"), uriPattern.length - +uriPattern.endsWith("/"));
    return uriPattern
        .split("/")
        .map(function (slug) {
        if (slug === "**")
            return "#";
        return encodeURIComponent(slug)
            .replace(/\./g, "^");
    }).join(".");
}
exports.parseURIPattern = parseURIPattern;
function createDestination(event, uriPattern, baseURI) {
    validateEventType(event);
    uriPattern = parseURIPattern(uriPattern, baseURI);
    return "/topic/" + event + (uriPattern ? "." + uriPattern : uriPattern);
}
exports.createDestination = createDestination;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = __webpack_require__(2);
var DigestedObjectSchema_1 = __webpack_require__(15);
var QueryableMetadata = (function () {
    function QueryableMetadata(schema, previousPartial) {
        this.schema = this.mergeSchemas(previousPartial ? previousPartial.schema : new DigestedObjectSchema_1.DigestedObjectSchema(), schema);
    }
    QueryableMetadata.prototype.mergeSchemas = function (oldSchema, newSchema) {
        if (newSchema === QueryableMetadata.ALL || oldSchema === QueryableMetadata.ALL)
            return QueryableMetadata.ALL;
        newSchema.prefixes.forEach(function (newURI, namespace) {
            newURI = newSchema.resolveURI(newURI);
            if (!oldSchema.prefixes.has(namespace))
                return oldSchema.prefixes.set(namespace, newURI);
            var oldURI = oldSchema.prefixes.get(namespace);
            if (oldURI !== newURI)
                throw new IllegalArgumentError_1.IllegalArgumentError("Prefix \"" + namespace + "\" has different value: \"" + oldURI + "\", \"" + newURI + "\".");
        });
        newSchema.properties.forEach(function (newDefinition, propertyName) {
            if (!oldSchema.properties.has(propertyName))
                return oldSchema.properties.set(propertyName, newDefinition);
            var oldDefinition = oldSchema.properties.get(propertyName);
            for (var key in newDefinition) {
                var newValue = newDefinition[key];
                var oldValue = oldDefinition[key];
                if (newValue !== oldValue)
                    throw new IllegalArgumentError_1.IllegalArgumentError("Property \"" + propertyName + "\" has different \"" + key + "\": \"" + oldValue + "\", \"" + newValue + "\".");
            }
        });
        return oldSchema;
    };
    QueryableMetadata.ALL = Object.freeze(new DigestedObjectSchema_1.DigestedObjectSchema());
    return QueryableMetadata;
}());
exports.QueryableMetadata = QueryableMetadata;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = __webpack_require__(2);
var DigestedObjectSchema_1 = __webpack_require__(15);
var ObjectSchemaDigester_1 = __webpack_require__(29);
var ObjectSchemaUtils_1 = __webpack_require__(71);
var QueryContext_1 = __webpack_require__(114);
var QueryProperty_1 = __webpack_require__(58);
var Utils_1 = __webpack_require__(46);
var QueryContextBuilder = (function (_super) {
    __extends(QueryContextBuilder, _super);
    function QueryContextBuilder(context) {
        var _this = _super.call(this, context) || this;
        _this._propertiesMap = new Map();
        return _this;
    }
    QueryContextBuilder.prototype.hasProperty = function (name) {
        return this._propertiesMap.has(name);
    };
    QueryContextBuilder.prototype.hasProperties = function (name) {
        var levelRegex = Utils_1.getLevelRegExp(name);
        return Array.from(this._propertiesMap.keys())
            .some(function (propertyName) { return levelRegex.test(propertyName); });
    };
    QueryContextBuilder.prototype.addProperty = function (name) {
        var property = new QueryProperty_1.QueryProperty(this, name);
        this._propertiesMap.set(name, property);
        return property;
    };
    QueryContextBuilder.prototype.getProperty = function (name) {
        return this._propertiesMap.get(name);
    };
    QueryContextBuilder.prototype.getProperties = function (name) {
        var levelRegex = Utils_1.getLevelRegExp(name);
        return Array.from(this._propertiesMap.entries())
            .filter(function (_a) {
            var propertyName = _a[0];
            return levelRegex.test(propertyName);
        })
            .map(function (_a) {
            var propertyName = _a[0], property = _a[1];
            return property;
        });
    };
    QueryContextBuilder.prototype.getInheritTypeDefinition = function (existingSchema, propertyName, propertyURI) {
        var schemas = [existingSchema].concat(this._getTypeSchemas());
        for (var _i = 0, schemas_1 = schemas; _i < schemas_1.length; _i++) {
            var schema = schemas_1[_i];
            if (!schema.properties.has(propertyName))
                continue;
            var mergeSchema = ObjectSchemaDigester_1.ObjectSchemaDigester.combineDigestedObjectSchemas([existingSchema, schema]);
            var digestedProperty = ObjectSchemaUtils_1.ObjectSchemaUtils.resolveProperty(mergeSchema, schema.properties.get(propertyName));
            if (!propertyURI || propertyURI === digestedProperty.uri)
                return digestedProperty;
        }
    };
    QueryContextBuilder.prototype.hasSchemaFor = function (object, path) {
        if (path === void 0)
            return _super.prototype.hasSchemaFor.call(this, object);
        if (!this.hasProperty(path))
            return false;
        var type = this
            .getProperty(path)
            .getType();
        return type !== void 0 && type !== QueryProperty_1.QueryPropertyType.EMPTY;
    };
    QueryContextBuilder.prototype.getSchemaFor = function (object, path) {
        if (path === void 0)
            return _super.prototype.getSchemaFor.call(this, object);
        var property = this.getProperty(path);
        if (property) {
            switch (property.getType()) {
                case QueryProperty_1.QueryPropertyType.PARTIAL:
                    return this.getProperty(path).getSchema();
                case QueryProperty_1.QueryPropertyType.FULL:
                case QueryProperty_1.QueryPropertyType.ALL:
                    return _super.prototype.getSchemaFor.call(this, object);
                case QueryProperty_1.QueryPropertyType.EMPTY:
                    return new DigestedObjectSchema_1.DigestedObjectSchema();
                default:
                    throw new IllegalArgumentError_1.IllegalArgumentError("Property \"" + path + "\" is not a resource.");
            }
        }
        var parent = this.getProperty(Utils_1.getParentPath(path));
        if (!parent || parent.getType() !== QueryProperty_1.QueryPropertyType.FULL)
            throw new IllegalArgumentError_1.IllegalArgumentError("Schema path \"" + path + "\" does not exists.");
        return _super.prototype.getSchemaFor.call(this, object);
    };
    QueryContextBuilder.prototype._getTypeSchemas = function () {
        if (this._schemas)
            return this._schemas;
        return this._schemas = this.context ?
            this.context._getTypeObjectSchemas() :
            [];
    };
    return QueryContextBuilder;
}(QueryContext_1.QueryContext));
exports.QueryContextBuilder = QueryContextBuilder;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = __webpack_require__(23);
var tokens_1 = __webpack_require__(5);
var IllegalArgumentError_1 = __webpack_require__(2);
var DigestedObjectSchema_1 = __webpack_require__(15);
var QueryVariable_1 = __webpack_require__(227);
var QueryContext = (function () {
    function QueryContext(context) {
        this.context = context;
        this._variablesCounter = 0;
        this._variablesMap = new Map();
        this._prefixesMap = new Map();
    }
    QueryContext.prototype.getVariable = function (name) {
        if (this._variablesMap.has(name))
            return this._variablesMap.get(name);
        var variable = new QueryVariable_1.QueryVariable(name, this._variablesCounter++);
        this._variablesMap.set(name, variable);
        return variable;
    };
    QueryContext.prototype.serializeLiteral = function (type, value) {
        if (!this.context || !this.context.jsonldConverter.literalSerializers.has(type))
            return "" + value;
        return this.context.jsonldConverter.literalSerializers.get(type).serialize(value);
    };
    QueryContext.prototype.compactIRI = function (iri) {
        if (!this.context) {
            if (iri_1.isPrefixed(iri))
                return new tokens_1.PrefixedNameToken(iri);
            return new tokens_1.IRIToken(iri);
        }
        var schema = this.context.getObjectSchema();
        var namespace;
        var localName;
        if (!iri_1.isPrefixed(iri)) {
            for (var _i = 0, _a = Array.from(schema.prefixes.entries()); _i < _a.length; _i++) {
                var _b = _a[_i], prefixName = _b[0], prefixURI = _b[1];
                if (!iri.startsWith(prefixURI))
                    continue;
                namespace = prefixName;
                localName = iri.substr(prefixURI.length);
                break;
            }
            if (namespace === void 0)
                return new tokens_1.IRIToken(iri);
        }
        var prefixedName = new tokens_1.PrefixedNameToken(namespace || iri, localName);
        namespace = prefixedName.namespace;
        if (!this._prefixesMap.has(namespace)) {
            if (!schema.prefixes.has(namespace))
                throw new IllegalArgumentError_1.IllegalArgumentError("Prefix \"" + namespace + "\" has not been declared.");
            var prefixIRI = new tokens_1.IRIToken(schema.prefixes.get(namespace));
            this._prefixesMap.set(namespace, new tokens_1.PrefixToken(namespace, prefixIRI));
        }
        return prefixedName;
    };
    QueryContext.prototype.getPrologues = function () {
        return Array.from(this._prefixesMap.values());
    };
    QueryContext.prototype.getGeneralSchema = function () {
        if (!this.context)
            return new DigestedObjectSchema_1.DigestedObjectSchema();
        return this.context.registry.getGeneralSchema();
    };
    QueryContext.prototype.hasSchemaFor = function (object, path) {
        if (!this.context)
            return false;
        return this.context.registry.hasSchemaFor(object);
    };
    QueryContext.prototype.getSchemaFor = function (object, path) {
        if (!this.context)
            return new DigestedObjectSchema_1.DigestedObjectSchema();
        return this.context.registry.getSchemaFor(object);
    };
    return QueryContext;
}());
exports.QueryContext = QueryContext;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var QueryablePointer_1 = __webpack_require__(38);
var QueryContext_1 = __webpack_require__(114);
var QueryContextPartial = (function (_super) {
    __extends(QueryContextPartial, _super);
    function QueryContextPartial(resource, context) {
        var _this = _super.call(this, context) || this;
        _this._resource = resource;
        return _this;
    }
    QueryContextPartial.prototype.getSchemaFor = function (object, path) {
        if (path === void 0)
            return _super.prototype.getSchemaFor.call(this, object);
        var parts = path.split(/\./g).slice(1);
        var schemaLibrary = this._resource;
        while (parts.length) {
            var part = parts.shift();
            var values = Array.isArray(schemaLibrary[part]) ?
                schemaLibrary[part] : [schemaLibrary[part]];
            schemaLibrary = values.find(QueryablePointer_1.QueryablePointer.is);
            if (!schemaLibrary)
                return _super.prototype.getSchemaFor.call(this, object);
        }
        return schemaLibrary._queryableMetadata.schema;
    };
    return QueryContextPartial;
}(QueryContext_1.QueryContext));
exports.QueryContextPartial = QueryContextPartial;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(5);
var IllegalArgumentError_1 = __webpack_require__(2);
var IllegalStateError_1 = __webpack_require__(31);
var ObjectSchemaDigester_1 = __webpack_require__(29);
var Utils_1 = __webpack_require__(0);
var QueryObject_1 = __webpack_require__(228);
var QueryProperty_1 = __webpack_require__(58);
var QueryValue_1 = __webpack_require__(229);
var Utils_2 = __webpack_require__(46);
var INHERIT = Object.freeze({});
var QueryDocumentBuilder = (function () {
    function QueryDocumentBuilder(queryContext, property) {
        this.inherit = INHERIT;
        this.all = QueryDocumentBuilder.ALL;
        this._context = queryContext;
        property._builder = this;
        this._document = property;
        this._typesTriple = new tokens_1.SubjectToken(property.variable).addPredicate(new tokens_1.PredicateToken("a"));
        this._values = new tokens_1.ValuesToken().addValues(property.variable);
        this._schema = this._context.getGeneralSchema();
    }
    QueryDocumentBuilder.prototype.property = function (name) {
        if (name === void 0)
            return this._document;
        var parent = this._document.name;
        while (parent) {
            var fullPath = parent + "." + name;
            if (this._context.hasProperty(fullPath))
                return this._context.getProperty(fullPath);
            var directPath = Utils_2.getParentPath(fullPath);
            if (this._context.hasProperty(directPath)) {
                var direct = this._context.getProperty(directPath);
                var directType = direct.getType();
                if (directType === QueryProperty_1.QueryPropertyType.FULL || directType === QueryProperty_1.QueryPropertyType.ALL) {
                    var propertyName = fullPath.substr(directPath.length + 1);
                    return direct._builder._addProperty(propertyName, INHERIT);
                }
            }
            parent = Utils_2.getParentPath(parent);
        }
        throw new IllegalArgumentError_1.IllegalArgumentError("The \"" + name + "\" property was not declared.");
    };
    QueryDocumentBuilder.prototype.value = function (value) {
        return new QueryValue_1.QueryValue(this._context, value);
    };
    QueryDocumentBuilder.prototype.object = function (object) {
        return new QueryObject_1.QueryObject(this._context, object);
    };
    QueryDocumentBuilder.prototype.withType = function (type) {
        if (this._context.hasProperties(this._document.name))
            throw new IllegalStateError_1.IllegalStateError("Types must be specified before the properties.");
        type = this._schema.resolveURI(type, { vocab: true });
        if (!this._typesTriple.predicates[0].objects.length)
            this._document.addPattern(this._typesTriple);
        this._typesTriple.predicates[0].addObject(this._context.compactIRI(type));
        if (!this._context.context)
            return this;
        if (this._context.context.hasObjectSchema(type))
            ObjectSchemaDigester_1.ObjectSchemaDigester._combineSchemas([
                this._schema,
                this._context.context.getObjectSchema(type),
            ]);
        return this;
    };
    QueryDocumentBuilder.prototype.properties = function (propertiesSchema) {
        if (propertiesSchema === QueryDocumentBuilder.ALL) {
            this._document.setType(QueryProperty_1.QueryPropertyType.ALL);
            return this;
        }
        for (var propertyName in propertiesSchema) {
            var queryPropertySchema = propertiesSchema[propertyName];
            var propertyDefinition = Utils_1.isObject(queryPropertySchema) ? queryPropertySchema : { "@id": queryPropertySchema };
            this._addProperty(propertyName, propertyDefinition);
        }
        return this;
    };
    QueryDocumentBuilder.prototype.filter = function (constraint) {
        var baseName = this._document.name.split(".")[0];
        this._context
            .getProperty(baseName)
            .addPattern(new tokens_1.FilterToken(constraint));
        return this;
    };
    QueryDocumentBuilder.prototype.values = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var _a;
        var termTokens = values.map(function (value) {
            var token = value.getToken();
            if (token.token === "blankNode")
                throw new IllegalArgumentError_1.IllegalArgumentError("Blank node \"" + token.label + "\" is not a valid value.");
            return token;
        });
        if (!this._values.values[0].length)
            this._document.addPattern(this._values);
        (_a = this._values.values[0]).push.apply(_a, termTokens);
        var property = this._document;
        while (property.isOptional()) {
            property.setOptional(false);
            var parentPath = Utils_2.getParentPath(property.name);
            property = this._context.getProperty(parentPath);
        }
        return this;
    };
    QueryDocumentBuilder.prototype._addProperty = function (propertyName, propertyDefinition) {
        var _a, _b;
        var digestedDefinition = this.addPropertyDefinition(propertyName, propertyDefinition);
        var name = this._document.name + "." + propertyName;
        var property = (_a = this._context
            .addProperty(name)).addPattern.apply(_a, Utils_2.createPropertyPatterns(this._context, this._document.name, name, digestedDefinition));
        if ("query" in propertyDefinition) {
            if (digestedDefinition.literal === false) {
                property.setType(QueryProperty_1.QueryPropertyType.PARTIAL);
            }
            var builder = new QueryDocumentBuilder(this._context, property);
            if (builder !== propertyDefinition["query"].call(void 0, builder))
                throw new IllegalArgumentError_1.IllegalArgumentError("The provided query builder was not returned");
        }
        (_b = this._document).addPattern.apply(_b, property.getPatterns());
        return property;
    };
    QueryDocumentBuilder.prototype.addPropertyDefinition = function (propertyName, propertyDefinition) {
        var digestedDefinition = ObjectSchemaDigester_1.ObjectSchemaDigester.digestProperty(propertyName, propertyDefinition, this._schema);
        var uri = "@id" in propertyDefinition ? digestedDefinition.uri : void 0;
        var inheritDefinition = this._context.getInheritTypeDefinition(this._schema, propertyName, uri);
        if (inheritDefinition) {
            for (var key in inheritDefinition) {
                if (digestedDefinition[key] !== null && key !== "uri")
                    continue;
                digestedDefinition[key] = inheritDefinition[key];
            }
        }
        if (!digestedDefinition.uri)
            throw new IllegalArgumentError_1.IllegalArgumentError("Invalid property \"" + propertyName + "\" definition, \"@id\" is necessary.");
        this._document.getSchema()
            .properties.set(propertyName, digestedDefinition);
        return digestedDefinition;
    };
    QueryDocumentBuilder.ALL = Object.freeze({});
    return QueryDocumentBuilder;
}());
exports.QueryDocumentBuilder = QueryDocumentBuilder;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VolatileResource_1 = __webpack_require__(79);
var C_1 = __webpack_require__(3);
var SCHEMA = {
    "target": {
        "@id": C_1.C.target,
        "@type": "@id",
        "@container": "@set",
    },
};
exports.QueryMetadata = {
    TYPE: C_1.C.QueryMetadata,
    SCHEMA: SCHEMA,
    is: function (value) {
        return VolatileResource_1.VolatileResource.is(value)
            && value.hasType(exports.QueryMetadata.TYPE);
    },
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StringParser = (function () {
    function StringParser() {
    }
    StringParser.prototype.parse = function (body) {
        return new Promise(function (resolve) { return resolve(body); });
    };
    return StringParser;
}());
exports.StringParser = StringParser;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var JSONParser_1 = __webpack_require__(53);
var SPARQLRawResultsParser = (function (_super) {
    __extends(SPARQLRawResultsParser, _super);
    function SPARQLRawResultsParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SPARQLRawResultsParser.prototype.parse = function (input) {
        return _super.prototype.parse.call(this, input).then(function (object) { return object; });
    };
    return SPARQLRawResultsParser;
}(JSONParser_1.JSONParser));
exports.SPARQLRawResultsParser = SPARQLRawResultsParser;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = __webpack_require__(23);
var tokens_1 = __webpack_require__(5);
var Utils_1 = __webpack_require__(100);
var ContainerType_1 = __webpack_require__(41);
var DigestedObjectSchemaProperty_1 = __webpack_require__(56);
var PointerType_1 = __webpack_require__(57);
var Pointer_1 = __webpack_require__(13);
var Utils_2 = __webpack_require__(0);
var XSD_1 = __webpack_require__(11);
var Tokens_1 = __webpack_require__(121);
var typesDefinition = new DigestedObjectSchemaProperty_1.DigestedObjectSchemaProperty();
typesDefinition.literal = false;
typesDefinition.pointerType = PointerType_1.PointerType.ID;
typesDefinition.containerType = ContainerType_1.ContainerType.SET;
var DeltaCreator = (function () {
    function DeltaCreator(context) {
        this.prefixesMap = new Map();
        this.context = context;
        this.addToken = new Tokens_1.AddToken();
        this.deleteToken = new Tokens_1.DeleteToken();
        this.updateLists = [];
    }
    DeltaCreator.prototype.getPatch = function () {
        var _a;
        var patch = new Tokens_1.LDPatchToken();
        this.prefixesMap.forEach(function (prefix) { return patch.prologues.push(prefix); });
        (_a = patch.statements).push.apply(_a, this.updateLists);
        if (this.addToken.triples.length)
            patch.statements.push(this.addToken);
        if (this.deleteToken.triples.length)
            patch.statements.push(this.deleteToken);
        return "" + patch;
    };
    DeltaCreator.prototype.addResource = function (id, previousResource, currentResource) {
        var _this = this;
        var _a;
        var schema = this.__getSchema(id, previousResource, currentResource);
        var resource = iri_1.isBNodeLabel(id) ?
            new tokens_1.BlankNodeToken(id) : this._compactIRI(schema, id);
        var updateLists = [];
        var addTriples = new tokens_1.SubjectToken(resource);
        var deleteTriples = new tokens_1.SubjectToken(resource);
        new Set([
            "types"
        ].concat(Object.keys(previousResource), Object.keys(currentResource))).forEach(function (propertyName) {
            if (propertyName === "$id")
                return;
            var predicateURI = propertyName === "types" ?
                "a" : _this._getPropertyIRI(schema, propertyName);
            var definition = predicateURI === "a" ?
                typesDefinition : schema.properties.get(propertyName);
            var oldValue = previousResource[propertyName];
            var newValue = currentResource[propertyName];
            if (definition && definition.containerType === ContainerType_1.ContainerType.LIST && isValidValue(oldValue)) {
                var listUpdates = [];
                if (!isValidValue(newValue)) {
                    deleteTriples.addPredicate(new tokens_1.PredicateToken(predicateURI).addObject(new tokens_1.CollectionToken()));
                    listUpdates.push({ slice: [0, void 0], objects: [] });
                }
                else {
                    var tempDefinition = __assign({}, definition, { containerType: ContainerType_1.ContainerType.SET });
                    listUpdates.push.apply(listUpdates, getListDelta(_this._getObjects(oldValue, schema, tempDefinition), _this._getObjects(newValue, schema, tempDefinition)));
                }
                if (!listUpdates.length)
                    return;
                _this._addPrefixFrom(predicateURI, schema);
                listUpdates.forEach(function (updateDelta) {
                    var collection = new tokens_1.CollectionToken();
                    updateDelta.objects.forEach(function (object) {
                        collection.addObject(object);
                        _this._addPrefixFrom(object, schema);
                    });
                    updateLists.push(new Tokens_1.UpdateListToken(resource, predicateURI, updateDelta.objects.length ?
                        new Tokens_1.SliceToken(updateDelta.slice[0], updateDelta.slice[0]) : new (Tokens_1.SliceToken.bind.apply(Tokens_1.SliceToken, [void 0].concat(updateDelta.slice)))(), collection));
                });
            }
            else {
                var oldObjects = _this._getObjects(oldValue, schema, definition);
                var newObjects = _this._getObjects(newValue, schema, definition);
                var setDelta = getArrayDelta(oldObjects, newObjects);
                var addValues = function (objects, triple) {
                    if (!objects.length)
                        return;
                    var predicate = new tokens_1.PredicateToken(predicateURI);
                    objects.forEach(function (object) {
                        predicate.addObject(object);
                        _this._addPrefixFrom(object, schema);
                    });
                    triple.addPredicate(predicate);
                };
                addValues(setDelta.toAdd, addTriples);
                addValues(setDelta.toDelete, deleteTriples);
            }
        });
        (_a = this.updateLists).push.apply(_a, updateLists);
        if (addTriples.predicates.length)
            this.addToken.triples.push(addTriples);
        if (deleteTriples.predicates.length)
            this.deleteToken.triples.push(deleteTriples);
        var predicates = updateLists.concat(addTriples.predicates, deleteTriples.predicates);
        if (!predicates.length)
            return;
        this._addPrefixFrom(resource, schema);
        predicates.forEach(function (x) { return _this._addPrefixFrom(x.predicate, schema); });
    };
    DeltaCreator.prototype.__getSchema = function (id, previousResource, currentResource) {
        var types = new Set();
        if ("types" in previousResource)
            previousResource
                .types.forEach(types.add, types);
        if ("types" in currentResource)
            currentResource
                .types.forEach(types.add, types);
        return this.context
            .registry.getSchemaFor({ $id: id, types: Array.from(types) });
    };
    DeltaCreator.prototype._getPropertyIRI = function (schema, propertyName) {
        var propertyDefinition = schema.properties.get(propertyName);
        var uri = propertyDefinition && propertyDefinition.uri ?
            propertyDefinition.uri :
            propertyName;
        return this._compactIRI(schema, uri);
    };
    DeltaCreator.prototype._getObjects = function (value, schema, definition) {
        var _a;
        var values = (Array.isArray(value) ?
            !definition || definition.containerType !== null ? value : value.slice(0, 1) :
            [value]).filter(isValidValue);
        if (definition && definition.containerType === ContainerType_1.ContainerType.LIST) {
            if (!isValidValue(value))
                return [];
            var collection = new tokens_1.CollectionToken();
            (_a = collection.objects).push.apply(_a, this._expandValues(values, schema, definition));
            return [collection];
        }
        if (definition && definition.containerType === ContainerType_1.ContainerType.LANGUAGE) {
            return this._expandLanguageMap(values, schema);
        }
        return this._expandValues(values, schema, definition);
    };
    DeltaCreator.prototype._expandValues = function (values, schema, definition) {
        var _this = this;
        var areDefinedLiteral = definition && definition.literal !== null ? definition.literal : null;
        return values.map(function (value) {
            var isLiteral = areDefinedLiteral !== null ? areDefinedLiteral : !Pointer_1.Pointer.is(value);
            if (isLiteral)
                return _this._expandLiteral(value, schema, definition);
            return _this._expandPointer(value, schema);
        }).filter(isValidValue);
    };
    DeltaCreator.prototype._expandLanguageMap = function (values, schema) {
        var _this = this;
        if (!values.length)
            return [];
        var languageMap = values[0];
        return Object.keys(languageMap).map(function (key) {
            var value = languageMap[key];
            var tempDefinition = new DigestedObjectSchemaProperty_1.DigestedObjectSchemaProperty();
            tempDefinition.language = key;
            tempDefinition.literalType = XSD_1.XSD.string;
            return _this._expandLiteral(value, schema, tempDefinition);
        }).filter(isValidValue);
    };
    DeltaCreator.prototype._expandPointer = function (value, schema) {
        var id = Pointer_1.Pointer.is(value) ? value.$id : value;
        if (!Utils_2.isString(id))
            return null;
        return iri_1.isBNodeLabel(id) ?
            new tokens_1.BlankNodeToken(id) :
            this._compactIRI(schema, id);
    };
    DeltaCreator.prototype._expandLiteral = function (value, schema, definition) {
        var type = definition && definition.literalType ?
            definition.literalType :
            Utils_1.guessXSDType(value);
        if (!this.context.jsonldConverter.literalSerializers.has(type))
            return null;
        value = this.context.jsonldConverter.literalSerializers.get(type).serialize(value);
        var literal = new tokens_1.LiteralToken(value);
        if (type !== XSD_1.XSD.string)
            literal.setType(this._compactIRI(schema, type));
        if (definition && definition.language !== void 0)
            literal.setLanguage(definition.language);
        return literal;
    };
    DeltaCreator.prototype._compactIRI = function (schema, iri) {
        if (iri_1.isRelative(iri) && schema.vocab)
            iri = schema.vocab + iri;
        var matchPrefix = Array.from(schema.prefixes.entries())
            .find(function (_a) {
            var prefixURI = _a[1];
            return iri.startsWith(prefixURI);
        });
        if (!matchPrefix)
            return new tokens_1.IRIToken(iri);
        return new tokens_1.PrefixedNameToken(matchPrefix[0], iri.substr(matchPrefix[1].length));
    };
    DeltaCreator.prototype._addPrefixFrom = function (object, schema) {
        var _this = this;
        if (object instanceof tokens_1.CollectionToken)
            return object.objects.forEach(function (collectionObject) {
                _this._addPrefixFrom(collectionObject, schema);
            });
        if (object instanceof tokens_1.LiteralToken)
            return this._addPrefixFrom(object.type, schema);
        if (!(object instanceof tokens_1.PrefixedNameToken))
            return;
        var namespace = object.namespace;
        if (this.prefixesMap.has(namespace))
            return;
        var iri = schema.prefixes.get(namespace);
        this.prefixesMap.set(namespace, new Tokens_1.PrefixToken(namespace, new tokens_1.IRIToken(iri)));
    };
    return DeltaCreator;
}());
exports.DeltaCreator = DeltaCreator;
function getArrayDelta(oldValues, newValues) {
    var objectMapper = function (object) { return ["" + object, object]; };
    var toAdd = new Map(newValues.map(objectMapper));
    var toDelete = new Map(oldValues.map(objectMapper));
    toAdd.forEach(function (value, identifier) {
        if (!toDelete.has(identifier))
            return;
        toDelete.delete(identifier);
        toAdd.delete(identifier);
    });
    return {
        toAdd: Array.from(toAdd.values()),
        toDelete: Array.from(toDelete.values()),
    };
}
function getListDelta(oldValues, newValues) {
    var nodeMapper = function (object, index) { return ({
        identifier: "" + object,
        object: object,
        index: index,
    }); };
    var oldPositions = oldValues.map(nodeMapper);
    var newPositions = newValues.map(nodeMapper);
    var addsSet = new Set(newPositions);
    var deletes = [];
    var offset = 0;
    var remnants = newPositions;
    oldPositions.forEach(function (oldNode) {
        var currentIndex = remnants.findIndex(function (newNode) { return newNode.identifier === oldNode.identifier; });
        if (currentIndex === -1) {
            oldNode.index -= offset++;
            deletes.push(oldNode);
        }
        else {
            addsSet.delete(remnants[currentIndex]);
            remnants = remnants.slice(currentIndex + 1);
        }
    });
    var updates = [];
    var last;
    deletes.forEach(function (node) {
        if (last && last.slice[0] === node.index) {
            last.slice = [last.slice[0], last.slice[1] + 1];
            return;
        }
        updates.push(last = {
            slice: [node.index, node.index + 1],
            objects: [],
        });
    });
    last = void 0;
    addsSet.forEach(function (node) {
        if (last && last.slice[1] === node.index) {
            last.slice = [last.slice[0], node.index + 1];
            last.objects.push(node.object);
            return;
        }
        updates.push(last = {
            slice: [node.index, node.index + 1],
            objects: [node.object],
        });
    });
    return updates;
}
function isValidValue(value) {
    return value !== null && value !== void 0;
}


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(36);
var Utils_1 = __webpack_require__(0);
var LDPatchToken = (function () {
    function LDPatchToken() {
        this.token = "ldpatch";
        this.prologues = [];
        this.statements = [];
    }
    LDPatchToken.prototype.toString = function () {
        var tokens = this.prologues.concat(this.statements);
        return tokens.join(" ");
    };
    return LDPatchToken;
}());
exports.LDPatchToken = LDPatchToken;
var PrefixToken = (function () {
    function PrefixToken(namespace, iri) {
        this.token = "prefix";
        this.namespace = namespace;
        this.iri = iri;
    }
    PrefixToken.prototype.toString = function () {
        return "@prefix " + this.namespace + ": " + this.iri + ".";
    };
    return PrefixToken;
}());
exports.PrefixToken = PrefixToken;
var AddToken = (function () {
    function AddToken() {
        this.token = "add";
        this.triples = [];
    }
    AddToken.prototype.toString = function () {
        return "Add { " + utils_1.joinPatterns(this.triples) + ". }.";
    };
    return AddToken;
}());
exports.AddToken = AddToken;
var DeleteToken = (function () {
    function DeleteToken() {
        this.token = "delete";
        this.triples = [];
    }
    DeleteToken.prototype.toString = function () {
        return "Delete { " + utils_1.joinPatterns(this.triples) + ". }.";
    };
    return DeleteToken;
}());
exports.DeleteToken = DeleteToken;
var UpdateListToken = (function () {
    function UpdateListToken(subject, predicate, slice, collection) {
        this.token = "updateList";
        this.subject = subject;
        this.predicate = predicate;
        this.slice = slice;
        this.collection = collection;
    }
    UpdateListToken.prototype.toString = function () {
        return "UpdateList " + this.subject + " " + this.predicate + " " + this.slice + " " + this.collection + ".";
    };
    return UpdateListToken;
}());
exports.UpdateListToken = UpdateListToken;
var SliceToken = (function () {
    function SliceToken(minIndex, maxIndex) {
        this.token = "slice";
        if (Utils_1.isNumber(minIndex))
            this.minIndex = minIndex;
        if (Utils_1.isNumber(maxIndex))
            this.maxIndex = maxIndex;
    }
    SliceToken.prototype.toString = function () {
        var buffer = "..";
        if (this.minIndex !== void 0)
            buffer = this.minIndex + buffer;
        if (this.maxIndex !== void 0)
            buffer = buffer + this.maxIndex;
        return buffer;
    };
    return SliceToken;
}());
exports.SliceToken = SliceToken;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sparqler_1 = __webpack_require__(234);
var decorators_1 = __webpack_require__(18);
var SPARQLBuilder = (function (_super) {
    __extends(SPARQLBuilder, _super);
    function SPARQLBuilder(resource, entryPoint) {
        return _super.call(this, function (container, object) {
            var finishObject = decorators_1.finishDecorator(container, object);
            return Object.assign(finishObject, {
                execute: function () {
                    return resource.executeSELECTQuery(entryPoint, finishObject.toCompactString());
                },
            });
        }) || this;
    }
    return SPARQLBuilder;
}(sparqler_1.SPARQLER));
exports.SPARQLBuilder = SPARQLBuilder;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(7);
var tokens_2 = __webpack_require__(5);
function toCompactString() {
    var tokens = this._tokens
        .filter(function (token) { return token !== tokens_1.WHERE; });
    var maxTokens = [tokens_1.SELECT];
    var baseTokens;
    for (var index = 0, token = tokens[index]; token && maxTokens.indexOf(token) === -1; ++index, token = tokens[index]) {
        if (token === tokens_1.PREFIX) {
            var nextToken = tokens[index + 1];
            if (!this._iriResolver._prefixes.get(nextToken["value"])) {
                tokens.splice(index, 6);
                --index;
            }
        }
        else if (token === tokens_1.BASE) {
            baseTokens = tokens.splice(index, 4);
            --index;
        }
    }
    if (baseTokens) {
        var baseString = baseTokens.reduce(function (res, token, index, thisArray) {
            var nextToken = thisArray[index + 1];
            return res + token.getTokenValue(tokens_2.TokenFormat.PRETTY, nextToken);
        }, "") + "\n";
        tokens.unshift(new tokens_2.StringLiteral(baseString));
    }
    return tokens.reduce(function (res, token, index, thisArray) {
        var nextToken = thisArray[index + 1];
        if (nextToken === tokens_1.EMPTY_SEPARATOR)
            nextToken = thisArray[index + 2];
        return res + token.getTokenValue(tokens_2.TokenFormat.COMPACT, nextToken);
    }, "");
}
function toPrettyString() {
    var stack = [];
    var actual = {
        token: null,
        indentation: 0,
        subject: 0,
        property: 0,
        spaces: 0,
    };
    return this._tokens.reduce(function (res, token, index, tokens) {
        var nextToken = tokens[index + 1];
        var tokenString = token.getTokenValue(tokens_2.TokenFormat.PRETTY, nextToken);
        if (actual.spaces === 0) {
            actual.subject += tokenString.length;
            if (tokenString.endsWith(" "))
                actual.spaces++;
        }
        else if (actual.spaces === 1) {
            actual.property += tokenString.length;
            if (tokenString.endsWith(" "))
                actual.spaces++;
        }
        if ([tokens_1.OPEN_MULTI_BLOCK, tokens_1.OPEN_MULTI_BN, tokens_1.OPEN_MULTI_LIST].indexOf(token) !== -1) {
            stack.push(actual);
            actual = {
                token: token,
                indentation: actual.indentation + 4,
                subject: 0,
                property: 0,
                spaces: token === tokens_1.OPEN_MULTI_BLOCK ? 0 : token === tokens_1.OPEN_MULTI_BN ? 1 : 2,
            };
        }
        else if ([tokens_1.CLOSE_MULTI_LIST].indexOf(token) !== -1) {
            if (nextToken && !(nextToken instanceof tokens_2.NewLineSymbol)) {
                var parent = actual;
                while ([tokens_1.OPEN_MULTI_BLOCK, tokens_1.OPEN_MULTI_BN, tokens_1.OPEN_MULTI_LIST].indexOf(parent.token) === -1)
                    parent = stack.pop();
                stack.push(parent);
                actual = {
                    token: token,
                    indentation: parent.indentation + 4,
                    subject: 0,
                    property: 0,
                    spaces: 1,
                };
            }
        }
        else if ([tokens_1.SAME_SUBJECT_SEPARATOR, tokens_1.SAME_PROPERTY_SEPARATOR, tokens_1.CLOSE_MULTI_LIST].indexOf(token) !== -1) {
            var parent = actual;
            while ([tokens_1.OPEN_MULTI_BLOCK, tokens_1.OPEN_MULTI_BN, tokens_1.OPEN_MULTI_LIST, tokens_1.CLOSE_MULTI_LIST, tokens_1.CLOSE_MULTI_BN].indexOf(parent.token) === -1)
                parent = stack.pop();
            stack.push(parent);
            if (token === tokens_1.SAME_SUBJECT_SEPARATOR) {
                actual = {
                    token: token,
                    indentation: parent.indentation + actual.subject,
                    subject: actual.subject,
                    property: 0,
                    spaces: 1,
                };
            }
            else if (token === tokens_1.SAME_PROPERTY_SEPARATOR) {
                actual = {
                    token: token,
                    indentation: parent.indentation + actual.subject + actual.property,
                    subject: actual.subject,
                    property: actual.property,
                    spaces: 2,
                };
            }
        }
        else if (token === tokens_1.GRAPH_PATTERN_SEPARATOR) {
            while (actual.token !== tokens_1.OPEN_MULTI_BLOCK)
                actual = stack.pop();
            actual.spaces = 0;
            actual.subject = 0;
            actual.property = 0;
        }
        if (nextToken === tokens_1.CLOSE_MULTI_BLOCK) {
            while (actual.token !== tokens_1.OPEN_MULTI_BLOCK)
                actual = stack.pop();
            actual = stack.pop();
        }
        else if (nextToken === tokens_1.CLOSE_MULTI_BN) {
            while (actual.token !== tokens_1.OPEN_MULTI_BN)
                actual = stack.pop();
            actual = stack.pop();
        }
        else if (nextToken === tokens_1.CLOSE_MULTI_LIST) {
            while (actual.token !== tokens_1.OPEN_MULTI_LIST)
                actual = stack.pop();
            actual = stack.pop();
        }
        if (tokenString.endsWith("\n")) {
            tokenString = tokenString + " ".repeat(actual.indentation);
        }
        return res + tokenString;
    }, "");
}
function finishDecorator(container, object) {
    return Object.assign(object, {
        toCompactString: toCompactString.bind(container),
        toPrettyString: toPrettyString.bind(container),
        toString: toPrettyString.bind(container),
    });
}
exports.finishDecorator = finishDecorator;

//# sourceMappingURL=finish.js.map


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(7);
function getPattern() {
    return [tokens_1.OPEN_MULTI_BLOCK].concat(this._tokens, [tokens_1.CLOSE_MULTI_BLOCK]);
}
function subFinishDecorator(container, object) {
    return Object.assign(object, {
        getPattern: getPattern.bind(container),
    });
}
exports.subFinishDecorator = subFinishDecorator;

//# sourceMappingURL=subFinish.js.map


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(126));

//# sourceMappingURL=index.js.map


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(16);
var decorators_1 = __webpack_require__(18);
var NotTriplesPattern_1 = __webpack_require__(127);
var ValuesPattern_1 = __webpack_require__(128);
var tokens_1 = __webpack_require__(7);
var BlankNode_1 = __webpack_require__(129);
var Collection_1 = __webpack_require__(130);
var Literals_1 = __webpack_require__(131);
var Resource_1 = __webpack_require__(132);
var Variable_1 = __webpack_require__(133);
var StringLiteral_1 = __webpack_require__(34);
var Patterns_1 = __webpack_require__(134);
var PatternBuilder = (function () {
    function PatternBuilder(iriResolver) {
        this.iriResolver = iriResolver;
        decorators_1.selectDecorator(new Container_1.Container(decorators_1.subFinishDecorator), this);
    }
    Object.defineProperty(PatternBuilder, "undefined", {
        get: function () { return "UNDEF"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PatternBuilder.prototype, "undefined", {
        get: function () { return PatternBuilder.undefined; },
        enumerable: true,
        configurable: true
    });
    ;
    PatternBuilder.prototype.resource = function (iri) {
        return new Resource_1.Resource(this.iriResolver, iri);
    };
    PatternBuilder.prototype.var = function (name) {
        return new Variable_1.Variable(this.iriResolver, name);
    };
    PatternBuilder.prototype.literal = function (value) {
        if (typeof value === "string" || value instanceof String)
            return new Literals_1.RDFLiteral(this.iriResolver, value);
        if (typeof value === "number" || value instanceof Number)
            return new Literals_1.NumericLiteral(this.iriResolver, value);
        if (typeof value === "boolean" || value instanceof Boolean)
            return new Literals_1.BooleanLiteral(this.iriResolver, value);
        throw new Error("No valid value of a literal was provided.");
    };
    PatternBuilder.prototype.collection = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        if (values.length === 0)
            throw Error("The collection needs at least one value.");
        return new Collection_1.Collection(this.iriResolver, values);
    };
    PatternBuilder.prototype.blankNode = function () {
        return new BlankNode_1.BlankNode(this.iriResolver);
    };
    PatternBuilder.prototype.graph = function (iriOrVariable, patterns) {
        var graph = (typeof iriOrVariable === "string")
            ? this.iriResolver.resolve(iriOrVariable)
            : iriOrVariable.getSelfTokens();
        var patternTokens = Patterns_1.getBlockTokens(patterns);
        return new NotTriplesPattern_1.NotTriplesPattern([tokens_1.GRAPH].concat(graph, patternTokens));
    };
    PatternBuilder.prototype.optional = function (patterns) {
        var patternTokens = Patterns_1.getBlockTokens(patterns);
        return new NotTriplesPattern_1.NotTriplesPattern([tokens_1.OPTIONAL].concat(patternTokens));
    };
    PatternBuilder.prototype.union = function (patterns1, patterns2) {
        var leftPatternTokens = Patterns_1.getBlockTokens(patterns1);
        var rightPatternTokens = Patterns_1.getBlockTokens(patterns2);
        return new NotTriplesPattern_1.NotTriplesPattern(leftPatternTokens.concat([tokens_1.UNION], rightPatternTokens));
    };
    PatternBuilder.prototype.minus = function () {
        var patterns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            patterns[_i] = arguments[_i];
        }
        var patternTokens = Patterns_1.getBlockTokens(patterns);
        return new NotTriplesPattern_1.NotTriplesPattern([tokens_1.MINUS].concat(patternTokens));
    };
    PatternBuilder.prototype.values = function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        return new ValuesPattern_1.ValuesPattern(this.iriResolver, variables);
    };
    PatternBuilder.prototype.service = function (resource, patterns) {
        var serviceTokens = typeof resource === "string" ?
            this.iriResolver.resolve(resource) :
            resource.getSelfTokens();
        var patternTokens = Patterns_1.getBlockTokens(patterns);
        return new NotTriplesPattern_1.NotTriplesPattern([tokens_1.SERVICE].concat(serviceTokens, patternTokens));
    };
    PatternBuilder.prototype.serviceSilent = function (resource, patterns) {
        var serviceTokens = typeof resource === "string" ?
            this.iriResolver.resolve(resource) :
            resource.getSelfTokens();
        var patternTokens = Patterns_1.getBlockTokens(patterns);
        return new NotTriplesPattern_1.NotTriplesPattern([tokens_1.SERVICE, tokens_1.SILENT].concat(serviceTokens, patternTokens));
    };
    PatternBuilder.prototype.bind = function (rawExpression, variable) {
        variable = typeof variable === "string" ? this.var(variable) : variable;
        var patternTokens = [tokens_1.BIND, tokens_1.OPEN_SINGLE_LIST, new StringLiteral_1.StringLiteral(rawExpression), tokens_1.AS].concat(variable.getSelfTokens(), [tokens_1.CLOSE_SINGLE_LIST]);
        return new NotTriplesPattern_1.NotTriplesPattern(patternTokens);
    };
    PatternBuilder.prototype.filter = function (rawConstraint) {
        return new NotTriplesPattern_1.NotTriplesPattern([tokens_1.FILTER, new StringLiteral_1.StringLiteral(rawConstraint)]);
    };
    return PatternBuilder;
}());
exports.PatternBuilder = PatternBuilder;
exports.default = PatternBuilder;

//# sourceMappingURL=PatternBuilder.js.map


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NotTriplesPattern = (function () {
    function NotTriplesPattern(tokens) {
        this.patternTokens = tokens;
    }
    NotTriplesPattern.prototype.getPattern = function () {
        return this.patternTokens;
    };
    return NotTriplesPattern;
}());
exports.NotTriplesPattern = NotTriplesPattern;
exports.default = NotTriplesPattern;

//# sourceMappingURL=NotTriplesPattern.js.map


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(240);
var tokens_1 = __webpack_require__(7);
var ObjectPattern_1 = __webpack_require__(47);
var ValuesPattern = (function (_super) {
    __extends(ValuesPattern, _super);
    function ValuesPattern(resolver, variables) {
        var _this = _super.call(this, [tokens_1.VALUES]) || this;
        _this.init();
        _this.resolver = resolver;
        _this.length = variables.length;
        if (_this.length === 1) {
            (_a = _this.patternTokens).push.apply(_a, variables[0].getSelfTokens().concat([tokens_1.OPEN_SINGLE_BLOCK]));
        }
        else {
            _this.patternTokens.push(tokens_1.OPEN_SINGLE_LIST);
            variables.forEach(function (variable) {
                return (_a = _this.patternTokens).push.apply(_a, variable.getSelfTokens());
                var _a;
            });
            _this.patternTokens.push(tokens_1.CLOSE_SINGLE_LIST, tokens_1.OPEN_MULTI_BLOCK);
        }
        return _this;
        var _a;
    }
    ValuesPattern.prototype.has = function () {
        var _this = this;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        if (this.length !== values.length)
            throw new Error("InvalidArgumentError: The number of variables and values are different.");
        if (this.length === 1) {
            (_a = this.patternTokens).push.apply(_a, ObjectPattern_1.serialize(values[0]));
        }
        else {
            this.patternTokens.push(tokens_1.OPEN_SINGLE_LIST);
            values.forEach(function (value) {
                return (_a = _this.patternTokens).push.apply(_a, ObjectPattern_1.serialize(value));
                var _a;
            });
            this.patternTokens.push(tokens_1.CLOSE_SINGLE_LIST);
        }
        return this.interfaces.addPattern;
        var _a;
    };
    ValuesPattern.prototype.getPattern = function () {
        if (this.length === 1) {
            this.patternTokens.push(tokens_1.CLOSE_SINGLE_BLOCK);
        }
        else {
            this.patternTokens.push(tokens_1.CLOSE_MULTI_BLOCK);
        }
        return this.patternTokens;
    };
    ValuesPattern.prototype.init = function () {
        var _this = this;
        this.interfaces = {
            addPattern: {
                and: this.has.bind(this),
                getPattern: function () { return _this.getPattern(); },
            },
        };
    };
    return ValuesPattern;
}(_1.NotTriplesPattern));
exports.ValuesPattern = ValuesPattern;
exports.default = ValuesPattern;

//# sourceMappingURL=ValuesPattern.js.map


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(7);
var TriplesPattern_1 = __webpack_require__(61);
var BlankNode = (function (_super) {
    __extends(BlankNode, _super);
    function BlankNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlankNode.prototype.getSelfTokens = function () {
        if (!this.patternTokens.find(function (token) { return token === tokens_1.SAME_SUBJECT_SEPARATOR || token === tokens_1.SAME_PROPERTY_SEPARATOR; }))
            return [tokens_1.OPEN_SINGLE_BN].concat(this.patternTokens, [tokens_1.CLOSE_SINGLE_BN]);
        return [tokens_1.OPEN_MULTI_BN].concat(this.patternTokens, [tokens_1.CLOSE_MULTI_BN]);
    };
    BlankNode.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.interfaces.graphPattern = {
            getPattern: function () { return _this.getSelfTokens(); },
            getSelfTokens: function () { return _this.getSelfTokens(); },
        };
    };
    return BlankNode;
}(TriplesPattern_1.TriplesPattern));
exports.BlankNode = BlankNode;
exports.default = BlankNode;

//# sourceMappingURL=BlankNode.js.map


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(7);
var tokens_2 = __webpack_require__(5);
var ObjectPattern_1 = __webpack_require__(47);
var TriplesPattern_1 = __webpack_require__(61);
var Collection = (function (_super) {
    __extends(Collection, _super);
    function Collection(resolver, values) {
        var _this = _super.call(this, resolver) || this;
        var tokens = [];
        values.forEach(function (value, index) {
            tokens.push.apply(tokens, ObjectPattern_1.serialize(value));
            if (index < values.length - 1)
                tokens.push(tokens_1.EMPTY_SEPARATOR);
        });
        var isSingle = values.length <= 1 && !tokens.find(function (token) { return token instanceof tokens_2.NewLineSymbol; });
        _this.elementTokens = [
            isSingle ? tokens_1.OPEN_SINGLE_LIST : tokens_1.OPEN_MULTI_LIST
        ].concat(tokens, [
            isSingle ? tokens_1.CLOSE_SINGLE_LIST : tokens_1.CLOSE_MULTI_LIST,
        ]);
        return _this;
    }
    Collection.prototype.getPattern = function () {
        return this.getSelfTokens().concat(this.patternTokens);
    };
    Collection.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.interfaces.graphPattern = {
            getPattern: function () { return _this.getPattern(); },
            getSelfTokens: function () { return _this.getSelfTokens(); },
        };
    };
    return Collection;
}(TriplesPattern_1.TriplesPattern));
exports.Collection = Collection;
exports.default = Collection;

//# sourceMappingURL=Collection.js.map


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(7);
var tokens_2 = __webpack_require__(5);
var ObjectPattern_1 = __webpack_require__(47);
var TriplesSubject_1 = __webpack_require__(62);
var Literal = (function (_super) {
    __extends(Literal, _super);
    function Literal(resolver, value) {
        var _this = _super.call(this, resolver) || this;
        _this.value = value + "";
        return _this;
    }
    return Literal;
}(TriplesSubject_1.TriplesSubject));
exports.Literal = Literal;
var RDFLiteral = (function (_super) {
    __extends(RDFLiteral, _super);
    function RDFLiteral(resolver, value) {
        var _this = _super.call(this, resolver, value) || this;
        _this.elementTokens = [tokens_1.OPEN_QUOTE, new tokens_2.StringLiteral(value), tokens_1.CLOSE_QUOTE];
        return _this;
    }
    RDFLiteral.prototype.ofType = function (type) {
        this.elementTokens = ObjectPattern_1.addType(this.value, type);
        return this;
    };
    ;
    RDFLiteral.prototype.withLanguage = function (language) {
        this.elementTokens = [tokens_1.OPEN_QUOTE, new tokens_2.StringLiteral(this.value), tokens_1.CLOSE_QUOTE, tokens_1.LANG_SYMBOL, new tokens_2.StringLiteral(language)];
        return this;
    };
    ;
    return RDFLiteral;
}(Literal));
exports.RDFLiteral = RDFLiteral;
var NumericLiteral = (function (_super) {
    __extends(NumericLiteral, _super);
    function NumericLiteral(resolver, value) {
        var _this = _super.call(this, resolver, value) || this;
        var type = Number.isInteger(value) ? "integer" : "float";
        _this.elementTokens = ObjectPattern_1.addType(_this.value, type);
        return _this;
    }
    return NumericLiteral;
}(Literal));
exports.NumericLiteral = NumericLiteral;
var BooleanLiteral = (function (_super) {
    __extends(BooleanLiteral, _super);
    function BooleanLiteral(resolver, value) {
        var _this = _super.call(this, resolver, value) || this;
        _this.elementTokens = ObjectPattern_1.addType(_this.value, "boolean");
        return _this;
    }
    return BooleanLiteral;
}(Literal));
exports.BooleanLiteral = BooleanLiteral;

//# sourceMappingURL=Literals.js.map


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var TriplesSubject_1 = __webpack_require__(62);
var Resource = (function (_super) {
    __extends(Resource, _super);
    function Resource(resolver, iri) {
        var _this = _super.call(this, resolver) || this;
        _this.elementTokens = resolver.resolve(iri);
        return _this;
    }
    return Resource;
}(TriplesSubject_1.TriplesSubject));
exports.Resource = Resource;
exports.default = Resource;

//# sourceMappingURL=Resource.js.map


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(7);
var tokens_2 = __webpack_require__(5);
var TriplesSubject_1 = __webpack_require__(62);
var nameRegex = /^((?:[0-9A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF]))((?:[0-9A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF]))*$/;
var Variable = (function (_super) {
    __extends(Variable, _super);
    function Variable(resolver, name) {
        var _this = this;
        if (!nameRegex.test(name))
            throw new Error("Invalid variable name");
        _this = _super.call(this, resolver) || this;
        _this.elementTokens = [tokens_1.VAR_SYMBOL, new tokens_2.StringLiteral(name)];
        return _this;
    }
    return Variable;
}(TriplesSubject_1.TriplesSubject));
exports.Variable = Variable;
exports.default = Variable;

//# sourceMappingURL=Variable.js.map


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(7);
var tokens_2 = __webpack_require__(5);
function getBlockTokens(patterns) {
    var tokens = this.getTokens(patterns);
    var openToken = tokens_1.OPEN_SINGLE_BLOCK;
    var closeToken = tokens_1.CLOSE_SINGLE_BLOCK;
    if (this.isMultiLine(tokens)) {
        openToken = tokens_1.OPEN_MULTI_BLOCK;
        closeToken = tokens_1.CLOSE_MULTI_BLOCK;
    }
    return [openToken].concat(tokens, [closeToken]);
}
exports.getBlockTokens = getBlockTokens;
function getTokens(patterns) {
    var patternArray = Array.isArray(patterns) ? patterns : [patterns];
    var triplesTokens = [];
    var lastToken = void 0;
    patternArray.forEach(function (graphPattern, index, array) {
        var tokens = graphPattern.getPattern();
        if (lastToken === tokens_1.GRAPH_PATTERN_SEPARATOR && (tokens[0] instanceof tokens_2.Identifier || tokens[0] === tokens_1.OPEN_MULTI_BLOCK || tokens[0] === tokens_1.OPEN_SINGLE_BLOCK))
            triplesTokens.pop();
        triplesTokens.push.apply(triplesTokens, tokens);
        lastToken = tokens[tokens.length - 1];
        if (index < array.length - 1 && lastToken !== tokens_1.CLOSE_MULTI_BLOCK && lastToken !== tokens_1.CLOSE_SINGLE_BLOCK) {
            triplesTokens.push(lastToken = tokens_1.GRAPH_PATTERN_SEPARATOR);
        }
    });
    return triplesTokens;
}
exports.getTokens = getTokens;
function isMultiLine(tokens) {
    return tokens.find(function (token) { return token instanceof tokens_2.NewLineSymbol && [".", ";", ",", ""].indexOf(token["value"]) !== -1; }) !== void 0;
}
exports.isMultiLine = isMultiLine;

//# sourceMappingURL=Patterns.js.map


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var sockjs_client_1 = __importDefault(__webpack_require__(247));
var webstomp = __importStar(__webpack_require__(280));
var IllegalStateError_1 = __webpack_require__(31);
var FreeResources_1 = __webpack_require__(39);
var JSONLDParser_1 = __webpack_require__(44);
var Utils_1 = __webpack_require__(0);
var EventMessage_1 = __webpack_require__(25);
var DEFAULT_OPTIONS = {
    maxReconnectAttempts: 10,
    reconnectDelay: 1000,
};
var MessagingService = (function () {
    function MessagingService(context) {
        this.context = context;
        this._subscriptionsQueue = [];
        this._options = DEFAULT_OPTIONS;
    }
    MessagingService.prototype.setOptions = function (options) {
        this._options = __assign({}, DEFAULT_OPTIONS, options);
    };
    MessagingService.prototype.connect = function (onConnect, onError) {
        if (this._client) {
            var error = new IllegalStateError_1.IllegalStateError("The messaging service is already connect" + (this._client.connected ? "ed" : "ing") + ".");
            if (onError)
                onError(error);
            throw error;
        }
        if (this._subscriptionsMap)
            this._subscriptionsMap.clear();
        this.reconnect(onConnect, onError);
    };
    MessagingService.prototype.reconnect = function (onConnect, onError) {
        var _this = this;
        if (onError === void 0) { onError = this._broadcastError.bind(this); }
        if (!this._client)
            this._attempts = 0;
        else if (this._client.connected)
            this._client.disconnect();
        if (!this._subscriptionsMap)
            this._subscriptionsMap = new Map();
        var sock = new sockjs_client_1.default(this.context.resolve("/broker"));
        this._client = webstomp.over(sock, {
            debug: false,
            heartbeat: false,
        });
        this._client.connect({}, function () {
            _this._subscriptionsQueue.forEach(function (callback) { return callback(); });
            _this._subscriptionsQueue.length = 0;
            _this._attempts = 0;
            if (onConnect)
                onConnect();
        }, function (errorFrameOrEvent) {
            var canReconnect = _this._options.maxReconnectAttempts === null || _this._options.maxReconnectAttempts >= _this._attempts;
            var errorMessage;
            if ("reason" in errorFrameOrEvent) {
                if (canReconnect) {
                    if (++_this._attempts === 1)
                        _this._saveSubscriptions();
                    setTimeout(function () { return _this.reconnect(onConnect, onError); }, _this._options.reconnectDelay);
                    return;
                }
                _this._client = null;
                _this._subscriptionsQueue.length = 0;
                errorMessage = "CloseEventError: " + errorFrameOrEvent.reason;
            }
            else if ("body" in errorFrameOrEvent) {
                if (!_this._client.connected && canReconnect)
                    return;
                errorMessage = errorFrameOrEvent.headers["message"] + ": " + errorFrameOrEvent.body.trim();
            }
            else {
                errorMessage = "Unknown error: " + errorFrameOrEvent;
            }
            onError(new Error(errorMessage));
        });
    };
    MessagingService.prototype.subscribe = function (destination, onEvent, onError) {
        if (!this._client)
            this.connect();
        if (!this._subscriptionsMap.has(destination))
            this._subscriptionsMap.set(destination, new Map());
        var callbacksMap = this._subscriptionsMap.get(destination);
        if (callbacksMap.has(onEvent))
            return;
        var subscriptionID = Utils_1.UUIDUtils.generate();
        callbacksMap.set(onEvent, {
            id: subscriptionID,
            errorCallback: onError,
        });
        var subscribeTo = this._makeSubscription(subscriptionID, destination, onEvent, onError);
        if (this._client.connected)
            return subscribeTo();
        this._subscriptionsQueue.push(subscribeTo);
    };
    MessagingService.prototype.unsubscribe = function (destination, onEvent) {
        if (!this._client || !this._subscriptionsMap || !this._subscriptionsMap.has(destination))
            return;
        var callbackMap = this._subscriptionsMap.get(destination);
        if (!callbackMap.has(onEvent))
            return;
        var subscriptionID = callbackMap.get(onEvent).id;
        callbackMap.delete(onEvent);
        if (callbackMap.size === 0)
            this._subscriptionsMap.delete(destination);
        this._client.unsubscribe(subscriptionID);
    };
    MessagingService.prototype._broadcastError = function (error) {
        if (!this._subscriptionsMap)
            return;
        this._subscriptionsMap.forEach(function (callbacksMap) { return callbacksMap.forEach(function (subscription) {
            subscription.errorCallback(error);
        }); });
    };
    MessagingService.prototype._makeSubscription = function (id, destination, eventCallback, errorCallback) {
        var _this = this;
        return function () { return _this._client.subscribe(destination, function (message) {
            new JSONLDParser_1.JSONLDParser()
                .parse(message.body)
                .then(function (data) {
                var freeResources = FreeResources_1.FreeResources
                    .parseFreeNodes(_this.context.registry, data);
                var eventMessage = freeResources
                    .getPointers(true)
                    .find(EventMessage_1.EventMessage.is);
                if (!eventMessage)
                    throw new Error("No message was returned by the notification.");
                return eventMessage;
            })
                .then(eventCallback)
                .catch(errorCallback);
        }, { id: id }); };
    };
    MessagingService.prototype._saveSubscriptions = function () {
        var _this = this;
        if (this._subscriptionsQueue.length || !this._subscriptionsMap)
            return;
        this._subscriptionsMap.forEach(function (callbackMap, destination) { return callbackMap.forEach(function (subscription, eventCallback) {
            var subscribeTo = _this._makeSubscription(subscription.id, destination, eventCallback, subscription.errorCallback);
            _this._subscriptionsQueue.push(subscribeTo);
        }); });
    };
    return MessagingService;
}());
exports.MessagingService = MessagingService;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var required = __webpack_require__(251)
  , qs = __webpack_require__(252)
  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
  , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [
  ['#', 'hash'],                        // Extract from the back.
  ['?', 'query'],                       // Extract from the back.
  ['/', 'pathname'],                    // Extract from the back.
  ['@', 'auth', 1],                     // Extract from the front.
  [NaN, 'host', undefined, 1, 1],       // Set left over value.
  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @api public
 */
function lolcation(loc) {
  loc = loc || global.location || {};

  var finaldestination = {}
    , type = typeof loc
    , key;

  if ('blob:' === loc.protocol) {
    finaldestination = new URL(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new URL(loc, {});
    for (key in ignore) delete finaldestination[key];
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @return {ProtocolExtract} Extracted information.
 * @api private
 */
function extractProtocol(address) {
  var match = protocolre.exec(address);

  return {
    protocol: match[1] ? match[1].toLowerCase() : '',
    slashes: !!match[2],
    rest: match[3]
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @api private
 */
function resolve(relative, base) {
  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
    , i = path.length
    , last = path[i - 1]
    , unshift = false
    , up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} location Location defaults for relative paths.
 * @param {Boolean|Function} parser Parser for the query string.
 * @api public
 */
function URL(address, location, parser) {
  if (!(this instanceof URL)) {
    return new URL(address, location, parser);
  }

  var relative, extracted, parse, instruction, index, key
    , instructions = rules.slice()
    , type = typeof location
    , url = this
    , i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = qs.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '');
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (!extracted.slashes) instructions[2] = [/(.*)/, 'pathname'];

  for (; i < instructions.length; i++) {
    instruction = instructions[i];
    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if ((index = parse.exec(address))) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (
      relative && instruction[3] ? location[key] || '' : ''
    );

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (
      relative
    && location.slashes
    && url.pathname.charAt(0) !== '/'
    && (url.pathname !== '' || location.pathname !== '')
  ) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0] || '';
    url.password = instruction[1] || '';
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL}
 * @api public
 */
function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!required(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname +':'+ value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':'+ url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (/:\d+$/.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
    case 'hash':
      if (value) {
        var char = part === 'pathname' ? '/' : '#';
        url[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url[part] = value;
      }
      break;

    default:
      url[part] = value;
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String}
 * @api public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

  var query
    , url = this
    , protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':'+ url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

  if (url.hash) result += url.hash;

  return result;
}

URL.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
URL.extractProtocol = extractProtocol;
URL.location = lolcation;
URL.qs = qs;

module.exports = URL;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Simplified implementation of DOM2 EventTarget.
 *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
 */

function EventTarget() {
  this._listeners = {};
}

EventTarget.prototype.addEventListener = function(eventType, listener) {
  if (!(eventType in this._listeners)) {
    this._listeners[eventType] = [];
  }
  var arr = this._listeners[eventType];
  // #4
  if (arr.indexOf(listener) === -1) {
    // Make a copy so as not to interfere with a current dispatchEvent.
    arr = arr.concat([listener]);
  }
  this._listeners[eventType] = arr;
};

EventTarget.prototype.removeEventListener = function(eventType, listener) {
  var arr = this._listeners[eventType];
  if (!arr) {
    return;
  }
  var idx = arr.indexOf(listener);
  if (idx !== -1) {
    if (arr.length > 1) {
      // Make a copy so as not to interfere with a current dispatchEvent.
      this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
    } else {
      delete this._listeners[eventType];
    }
    return;
  }
};

EventTarget.prototype.dispatchEvent = function() {
  var event = arguments[0];
  var t = event.type;
  // equivalent of Array.prototype.slice.call(arguments, 0);
  var args = arguments.length === 1 ? [event] : Array.apply(null, arguments);
  // TODO: This doesn't match the real behavior; per spec, onfoo get
  // their place in line from the /first/ time they're set from
  // non-null. Although WebKit bumps it to the end every time it's
  // set.
  if (this['on' + t]) {
    this['on' + t].apply(this, args);
  }
  if (t in this._listeners) {
    // Grab a reference to the listeners list. removeEventListener may alter the list.
    var listeners = this._listeners[t];
    for (var i = 0; i < listeners.length; i++) {
      listeners[i].apply(this, args);
    }
  }
};

module.exports = EventTarget;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(1)
  , urlUtils = __webpack_require__(14)
  , BufferedSender = __webpack_require__(258)
  , Polling = __webpack_require__(259)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(10)('sockjs-client:sender-receiver');
}

function SenderReceiver(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
  var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
  debug(pollUrl);
  var self = this;
  BufferedSender.call(this, transUrl, senderFunc);

  this.poll = new Polling(Receiver, pollUrl, AjaxObject);
  this.poll.on('message', function(msg) {
    debug('poll message', msg);
    self.emit('message', msg);
  });
  this.poll.once('close', function(code, reason) {
    debug('poll close', code, reason);
    self.poll = null;
    self.emit('close', code, reason);
    self.close();
  });
}

inherits(SenderReceiver, BufferedSender);

SenderReceiver.prototype.close = function() {
  BufferedSender.prototype.close.call(this);
  debug('close');
  this.removeAllListeners();
  if (this.poll) {
    this.poll.abort();
    this.poll = null;
  }
};

module.exports = SenderReceiver;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var EventEmitter = __webpack_require__(12).EventEmitter
  , inherits = __webpack_require__(1)
  , utils = __webpack_require__(22)
  , urlUtils = __webpack_require__(14)
  , XHR = global.XMLHttpRequest
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(10)('sockjs-client:browser:xhr');
}

function AbstractXHRObject(method, url, payload, opts) {
  debug(method, url);
  var self = this;
  EventEmitter.call(this);

  setTimeout(function () {
    self._start(method, url, payload, opts);
  }, 0);
}

inherits(AbstractXHRObject, EventEmitter);

AbstractXHRObject.prototype._start = function(method, url, payload, opts) {
  var self = this;

  try {
    this.xhr = new XHR();
  } catch (x) {
    // intentionally empty
  }

  if (!this.xhr) {
    debug('no xhr');
    this.emit('finish', 0, 'no xhr support');
    this._cleanup();
    return;
  }

  // several browsers cache POSTs
  url = urlUtils.addQuery(url, 't=' + (+new Date()));

  // Explorer tends to keep connection open, even after the
  // tab gets closed: http://bugs.jquery.com/ticket/5280
  this.unloadRef = utils.unloadAdd(function() {
    debug('unload cleanup');
    self._cleanup(true);
  });
  try {
    this.xhr.open(method, url, true);
    if (this.timeout && 'timeout' in this.xhr) {
      this.xhr.timeout = this.timeout;
      this.xhr.ontimeout = function() {
        debug('xhr timeout');
        self.emit('finish', 0, '');
        self._cleanup(false);
      };
    }
  } catch (e) {
    debug('exception', e);
    // IE raises an exception on wrong port.
    this.emit('finish', 0, '');
    this._cleanup(false);
    return;
  }

  if ((!opts || !opts.noCredentials) && AbstractXHRObject.supportsCORS) {
    debug('withCredentials');
    // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
    // "This never affects same-site requests."

    this.xhr.withCredentials = 'true';
  }
  if (opts && opts.headers) {
    for (var key in opts.headers) {
      this.xhr.setRequestHeader(key, opts.headers[key]);
    }
  }

  this.xhr.onreadystatechange = function() {
    if (self.xhr) {
      var x = self.xhr;
      var text, status;
      debug('readyState', x.readyState);
      switch (x.readyState) {
      case 3:
        // IE doesn't like peeking into responseText or status
        // on Microsoft.XMLHTTP and readystate=3
        try {
          status = x.status;
          text = x.responseText;
        } catch (e) {
          // intentionally empty
        }
        debug('status', status);
        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
        if (status === 1223) {
          status = 204;
        }

        // IE does return readystate == 3 for 404 answers.
        if (status === 200 && text && text.length > 0) {
          debug('chunk');
          self.emit('chunk', status, text);
        }
        break;
      case 4:
        status = x.status;
        debug('status', status);
        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
        if (status === 1223) {
          status = 204;
        }
        // IE returns this for a bad port
        // http://msdn.microsoft.com/en-us/library/windows/desktop/aa383770(v=vs.85).aspx
        if (status === 12005 || status === 12029) {
          status = 0;
        }

        debug('finish', status, x.responseText);
        self.emit('finish', status, x.responseText);
        self._cleanup(false);
        break;
      }
    }
  };

  try {
    self.xhr.send(payload);
  } catch (e) {
    self.emit('finish', 0, '');
    self._cleanup(false);
  }
};

AbstractXHRObject.prototype._cleanup = function(abort) {
  debug('cleanup');
  if (!this.xhr) {
    return;
  }
  this.removeAllListeners();
  utils.unloadDel(this.unloadRef);

  // IE needs this field to be a function
  this.xhr.onreadystatechange = function() {};
  if (this.xhr.ontimeout) {
    this.xhr.ontimeout = null;
  }

  if (abort) {
    try {
      this.xhr.abort();
    } catch (x) {
      // intentionally empty
    }
  }
  this.unloadRef = this.xhr = null;
};

AbstractXHRObject.prototype.close = function() {
  debug('close');
  this._cleanup(true);
};

AbstractXHRObject.enabled = !!XHR;
// override XMLHttpRequest for IE6/7
// obfuscate to avoid firewalls
var axo = ['Active'].concat('Object').join('X');
if (!AbstractXHRObject.enabled && (axo in global)) {
  debug('overriding xmlhttprequest');
  XHR = function() {
    try {
      return new global[axo]('Microsoft.XMLHTTP');
    } catch (e) {
      return null;
    }
  };
  AbstractXHRObject.enabled = !!new XHR();
}

var cors = false;
try {
  cors = 'withCredentials' in new XHR();
} catch (ignored) {
  // intentionally empty
}

AbstractXHRObject.supportsCORS = cors;

module.exports = AbstractXHRObject;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(1)
  , AjaxBasedTransport = __webpack_require__(33)
  , XhrReceiver = __webpack_require__(63)
  , XDRObject = __webpack_require__(83)
  ;

// According to:
//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/

function XdrStreamingTransport(transUrl) {
  if (!XDRObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XDRObject);
}

inherits(XdrStreamingTransport, AjaxBasedTransport);

XdrStreamingTransport.enabled = function(info) {
  if (info.cookie_needed || info.nullOrigin) {
    return false;
  }
  return XDRObject.enabled && info.sameScheme;
};

XdrStreamingTransport.transportName = 'xdr-streaming';
XdrStreamingTransport.roundTrips = 2; // preflight, ajax

module.exports = XdrStreamingTransport;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(1)
  , AjaxBasedTransport = __webpack_require__(33)
  , EventSourceReceiver = __webpack_require__(260)
  , XHRCorsObject = __webpack_require__(64)
  , EventSourceDriver = __webpack_require__(142)
  ;

function EventSourceTransport(transUrl) {
  if (!EventSourceTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }

  AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
}

inherits(EventSourceTransport, AjaxBasedTransport);

EventSourceTransport.enabled = function() {
  return !!EventSourceDriver;
};

EventSourceTransport.transportName = 'eventsource';
EventSourceTransport.roundTrips = 2;

module.exports = EventSourceTransport;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global.EventSource;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Few cool transports do work only for same-origin. In order to make
// them work cross-domain we shall use iframe, served from the
// remote domain. New browsers have capabilities to communicate with
// cross domain iframe using postMessage(). In IE it was implemented
// from IE 8+, but of course, IE got some details wrong:
//    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
//    http://stevesouders.com/misc/test-postmessage.php

var inherits = __webpack_require__(1)
  , JSON3 = __webpack_require__(19)
  , EventEmitter = __webpack_require__(12).EventEmitter
  , version = __webpack_require__(144)
  , urlUtils = __webpack_require__(14)
  , iframeUtils = __webpack_require__(50)
  , eventUtils = __webpack_require__(22)
  , random = __webpack_require__(32)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(10)('sockjs-client:transport:iframe');
}

function IframeTransport(transport, transUrl, baseUrl) {
  if (!IframeTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }
  EventEmitter.call(this);

  var self = this;
  this.origin = urlUtils.getOrigin(baseUrl);
  this.baseUrl = baseUrl;
  this.transUrl = transUrl;
  this.transport = transport;
  this.windowId = random.string(8);

  var iframeUrl = urlUtils.addPath(baseUrl, '/iframe.html') + '#' + this.windowId;
  debug(transport, transUrl, iframeUrl);

  this.iframeObj = iframeUtils.createIframe(iframeUrl, function(r) {
    debug('err callback');
    self.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
    self.close();
  });

  this.onmessageCallback = this._message.bind(this);
  eventUtils.attachEvent('message', this.onmessageCallback);
}

inherits(IframeTransport, EventEmitter);

IframeTransport.prototype.close = function() {
  debug('close');
  this.removeAllListeners();
  if (this.iframeObj) {
    eventUtils.detachEvent('message', this.onmessageCallback);
    try {
      // When the iframe is not loaded, IE raises an exception
      // on 'contentWindow'.
      this.postMessage('c');
    } catch (x) {
      // intentionally empty
    }
    this.iframeObj.cleanup();
    this.iframeObj = null;
    this.onmessageCallback = this.iframeObj = null;
  }
};

IframeTransport.prototype._message = function(e) {
  debug('message', e.data);
  if (!urlUtils.isOriginEqual(e.origin, this.origin)) {
    debug('not same origin', e.origin, this.origin);
    return;
  }

  var iframeMessage;
  try {
    iframeMessage = JSON3.parse(e.data);
  } catch (ignored) {
    debug('bad json', e.data);
    return;
  }

  if (iframeMessage.windowId !== this.windowId) {
    debug('mismatched window id', iframeMessage.windowId, this.windowId);
    return;
  }

  switch (iframeMessage.type) {
  case 's':
    this.iframeObj.loaded();
    // window global dependency
    this.postMessage('s', JSON3.stringify([
      version
    , this.transport
    , this.transUrl
    , this.baseUrl
    ]));
    break;
  case 't':
    this.emit('message', iframeMessage.data);
    break;
  case 'c':
    var cdata;
    try {
      cdata = JSON3.parse(iframeMessage.data);
    } catch (ignored) {
      debug('bad json', iframeMessage.data);
      return;
    }
    this.emit('close', cdata[0], cdata[1]);
    this.close();
    break;
  }
};

IframeTransport.prototype.postMessage = function(type, data) {
  debug('postMessage', type, data);
  this.iframeObj.post(JSON3.stringify({
    windowId: this.windowId
  , type: type
  , data: data || ''
  }), this.origin);
};

IframeTransport.prototype.send = function(message) {
  debug('send', message);
  this.postMessage('m', message);
};

IframeTransport.enabled = function() {
  return iframeUtils.iframeEnabled;
};

IframeTransport.transportName = 'iframe';
IframeTransport.roundTrips = 2;

module.exports = IframeTransport;


/***/ }),
/* 144 */
/***/ (function(module, exports) {

module.exports = '1.1.4';


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(1)
  , HtmlfileReceiver = __webpack_require__(263)
  , XHRLocalObject = __webpack_require__(48)
  , AjaxBasedTransport = __webpack_require__(33)
  ;

function HtmlFileTransport(transUrl) {
  if (!HtmlfileReceiver.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
}

inherits(HtmlFileTransport, AjaxBasedTransport);

HtmlFileTransport.enabled = function(info) {
  return HtmlfileReceiver.enabled && info.sameOrigin;
};

HtmlFileTransport.transportName = 'htmlfile';
HtmlFileTransport.roundTrips = 2;

module.exports = HtmlFileTransport;


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(1)
  , AjaxBasedTransport = __webpack_require__(33)
  , XhrReceiver = __webpack_require__(63)
  , XHRCorsObject = __webpack_require__(64)
  , XHRLocalObject = __webpack_require__(48)
  ;

function XhrPollingTransport(transUrl) {
  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
}

inherits(XhrPollingTransport, AjaxBasedTransport);

XhrPollingTransport.enabled = function(info) {
  if (info.nullOrigin) {
    return false;
  }

  if (XHRLocalObject.enabled && info.sameOrigin) {
    return true;
  }
  return XHRCorsObject.enabled;
};

XhrPollingTransport.transportName = 'xhr-polling';
XhrPollingTransport.roundTrips = 2; // preflight, ajax

module.exports = XhrPollingTransport;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports = global.location || {
  origin: 'http://localhost:80'
, protocol: 'http'
, host: 'localhost'
, port: 80
, href: 'http://localhost/'
, hash: ''
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(1)
  , EventEmitter = __webpack_require__(12).EventEmitter
  , JSON3 = __webpack_require__(19)
  , XHRLocalObject = __webpack_require__(48)
  , InfoAjax = __webpack_require__(149)
  ;

function InfoReceiverIframe(transUrl) {
  var self = this;
  EventEmitter.call(this);

  this.ir = new InfoAjax(transUrl, XHRLocalObject);
  this.ir.once('finish', function(info, rtt) {
    self.ir = null;
    self.emit('message', JSON3.stringify([info, rtt]));
  });
}

inherits(InfoReceiverIframe, EventEmitter);

InfoReceiverIframe.transportName = 'iframe-info-receiver';

InfoReceiverIframe.prototype.close = function() {
  if (this.ir) {
    this.ir.close();
    this.ir = null;
  }
  this.removeAllListeners();
};

module.exports = InfoReceiverIframe;


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EventEmitter = __webpack_require__(12).EventEmitter
  , inherits = __webpack_require__(1)
  , JSON3 = __webpack_require__(19)
  , objectUtils = __webpack_require__(85)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(10)('sockjs-client:info-ajax');
}

function InfoAjax(url, AjaxObject) {
  EventEmitter.call(this);

  var self = this;
  var t0 = +new Date();
  this.xo = new AjaxObject('GET', url);

  this.xo.once('finish', function(status, text) {
    var info, rtt;
    if (status === 200) {
      rtt = (+new Date()) - t0;
      if (text) {
        try {
          info = JSON3.parse(text);
        } catch (e) {
          debug('bad json', text);
        }
      }

      if (!objectUtils.isObject(info)) {
        info = {};
      }
    }
    self.emit('finish', info, rtt);
    self.removeAllListeners();
  });
}

inherits(InfoAjax, EventEmitter);

InfoAjax.prototype.close = function() {
  this.removeAllListeners();
  this.xo.close();
};

module.exports = InfoAjax;


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = __webpack_require__(37);
var GeneralRegistry_1 = __webpack_require__(110);
var AddMemberAction_1 = __webpack_require__(81);
var DocumentMetadata_1 = __webpack_require__(151);
var Error_1 = __webpack_require__(152);
var ErrorResponse_1 = __webpack_require__(72);
var Map_1 = __webpack_require__(153);
var MapEntry_1 = __webpack_require__(154);
var RemoveMemberAction_1 = __webpack_require__(82);
var ResponseMetadata_1 = __webpack_require__(60);
var ValidationError_1 = __webpack_require__(155);
var ChildCreated_1 = __webpack_require__(156);
var DocumentCreatedDetails_1 = __webpack_require__(158);
var DocumentDeleted_1 = __webpack_require__(159);
var DocumentModified_1 = __webpack_require__(160);
var MemberAdded_1 = __webpack_require__(161);
var MemberAddedDetails_1 = __webpack_require__(162);
var MemberRemoved_1 = __webpack_require__(163);
var MemberRemovedDetails_1 = __webpack_require__(164);
var DigestedObjectSchema_1 = __webpack_require__(15);
var QueryMetadata_1 = __webpack_require__(117);
var RegisteredPointer_1 = __webpack_require__(101);
var ValidationReport_1 = __webpack_require__(165);
var ValidationResult_1 = __webpack_require__(166);
var PlatformInstance_1 = __webpack_require__(167);
var PlatformMetadata_1 = __webpack_require__(168);
var AbstractContext_1 = __webpack_require__(76);
var GlobalContext = (function (_super) {
    __extends(GlobalContext, _super);
    function GlobalContext() {
        var _this = _super.call(this) || this;
        _this._baseURI = "";
        _this._generalObjectSchema = new DigestedObjectSchema_1.DigestedObjectSchema();
        _this.registry = GeneralRegistry_1.GeneralRegistry.createFrom({ $context: _this, __modelDecorator: RegisteredPointer_1.RegisteredPointer });
        _this._registerDefaultObjectSchemas();
        _this._registerDefaultDecorators();
        return _this;
    }
    GlobalContext.prototype._registerDefaultObjectSchemas = function () {
        this
            .extendObjectSchema(Document_1.Document.TYPE, Document_1.Document.SCHEMA)
            .extendObjectSchema(PlatformMetadata_1.PlatformMetadata.TYPE, PlatformMetadata_1.PlatformMetadata.SCHEMA)
            .extendObjectSchema(PlatformInstance_1.PlatformInstance.TYPE, PlatformInstance_1.PlatformInstance.SCHEMA)
            .extendObjectSchema(AddMemberAction_1.AddMemberAction.TYPE, AddMemberAction_1.AddMemberAction.SCHEMA)
            .extendObjectSchema(RemoveMemberAction_1.RemoveMemberAction.TYPE, RemoveMemberAction_1.RemoveMemberAction.SCHEMA)
            .extendObjectSchema(Error_1.Error.TYPE, Error_1.Error.SCHEMA)
            .extendObjectSchema(Map_1.Map.TYPE, Map_1.Map.SCHEMA)
            .extendObjectSchema(MapEntry_1.MapEntry.SCHEMA)
            .extendObjectSchema(DocumentMetadata_1.DocumentMetadata.TYPE, DocumentMetadata_1.DocumentMetadata.SCHEMA)
            .extendObjectSchema(ErrorResponse_1.ErrorResponse.TYPE, ErrorResponse_1.ErrorResponse.SCHEMA)
            .extendObjectSchema(ResponseMetadata_1.ResponseMetadata.TYPE, ResponseMetadata_1.ResponseMetadata.SCHEMA)
            .extendObjectSchema(ValidationError_1.ValidationError.TYPE, ValidationError_1.ValidationError.SCHEMA)
            .extendObjectSchema(ValidationReport_1.ValidationReport.TYPE, ValidationReport_1.ValidationReport.SCHEMA)
            .extendObjectSchema(ValidationResult_1.ValidationResult.TYPE, ValidationResult_1.ValidationResult.SCHEMA)
            .extendObjectSchema(QueryMetadata_1.QueryMetadata.TYPE, QueryMetadata_1.QueryMetadata.SCHEMA)
            .extendObjectSchema(ChildCreated_1.ChildCreated.TYPE, ChildCreated_1.ChildCreated.SCHEMA)
            .extendObjectSchema(DocumentCreatedDetails_1.DocumentCreatedDetails.TYPE, DocumentCreatedDetails_1.DocumentCreatedDetails.SCHEMA)
            .extendObjectSchema(DocumentDeleted_1.DocumentDeleted.TYPE, DocumentDeleted_1.DocumentDeleted.SCHEMA)
            .extendObjectSchema(DocumentModified_1.DocumentModified.TYPE, DocumentModified_1.DocumentModified.SCHEMA)
            .extendObjectSchema(MemberAdded_1.MemberAdded.TYPE, MemberAdded_1.MemberAdded.SCHEMA)
            .extendObjectSchema(MemberAddedDetails_1.MemberAddedDetails.TYPE, MemberAddedDetails_1.MemberAddedDetails.SCHEMA)
            .extendObjectSchema(MemberRemoved_1.MemberRemoved.TYPE, MemberRemoved_1.MemberRemoved.SCHEMA)
            .extendObjectSchema(MemberRemovedDetails_1.MemberRemovedDetails.TYPE, MemberRemovedDetails_1.MemberRemovedDetails.SCHEMA);
    };
    GlobalContext.prototype._registerDefaultDecorators = function () {
    };
    GlobalContext.instance = new GlobalContext();
    return GlobalContext;
}(AbstractContext_1.AbstractContext));
exports.GlobalContext = GlobalContext;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(3);
var XSD_1 = __webpack_require__(11);
var SCHEMA = {
    "relatedDocument": {
        "@id": C_1.C.relatedDocument,
        "@type": "@id",
    },
    "eTag": {
        "@id": C_1.C.eTag,
        "@type": XSD_1.XSD.string,
    },
    "bNodesMap": {
        "@id": C_1.C.bNodesMap,
        "@type": "@id",
    },
};
exports.DocumentMetadata = {
    TYPE: C_1.C.DocumentMetadata,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(3);
var XSD_1 = __webpack_require__(11);
var SCHEMA = {
    "errorCode": {
        "@id": C_1.C.errorCode,
        "@type": XSD_1.XSD.string,
    },
    "errorMessage": {
        "@id": C_1.C.errorMessage,
        "@language": "en",
    },
    "errorParameters": {
        "@id": C_1.C.errorParameters,
        "@type": "@id",
    },
};
exports.Error = {
    TYPE: C_1.C.Error,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = __webpack_require__(17);
var C_1 = __webpack_require__(3);
var SCHEMA = {
    "entries": {
        "@id": C_1.C.entry,
        "@type": "@id",
        "@container": "@set",
    },
};
exports.Map = {
    TYPE: C_1.C.Map,
    SCHEMA: SCHEMA,
    is: function (object) {
        return Resource_1.Resource.is(object)
            && object.hasType(exports.Map.TYPE)
            && object.hasOwnProperty("entries");
    },
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(3);
var SCHEMA = {
    "entryKey": {
        "@id": C_1.C.entryKey,
    },
    "entryValue": {
        "@id": C_1.C.entryValue,
    },
};
exports.MapEntry = {
    SCHEMA: SCHEMA,
};


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(3);
var SCHEMA = {
    "errorDetails": {
        "@id": C_1.C.errorDetails,
        "@type": "@id",
    },
};
exports.ValidationError = {
    TYPE: C_1.C.ValidationError,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(3);
var DocumentCreated_1 = __webpack_require__(157);
var TYPE = C_1.C.ChildCreated;
var SCHEMA = DocumentCreated_1.DocumentCreated.SCHEMA;
exports.ChildCreated = {
    TYPE: TYPE,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(3);
var EventMessage_1 = __webpack_require__(25);
var SCHEMA = __assign({}, EventMessage_1.EventMessage.SCHEMA, { "details": {
        "@id": C_1.C.details,
        "@type": "@id",
    } });
exports.DocumentCreated = {
    SCHEMA: SCHEMA,
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(3);
var SCHEMA = {
    "createdDocuments": {
        "@id": C_1.C.createdDocument,
        "@type": "@id",
        "@container": "@set",
    },
};
exports.DocumentCreatedDetails = {
    TYPE: C_1.C.DocumentCreatedDetails,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(3);
var EventMessage_1 = __webpack_require__(25);
var TYPE = C_1.C.DocumentDeleted;
var SCHEMA = EventMessage_1.EventMessage.SCHEMA;
exports.DocumentDeleted = {
    TYPE: TYPE,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(3);
var EventMessage_1 = __webpack_require__(25);
var TYPE = C_1.C.DocumentModified;
var SCHEMA = EventMessage_1.EventMessage.SCHEMA;
exports.DocumentModified = {
    TYPE: TYPE,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(3);
var EventMessage_1 = __webpack_require__(25);
var TYPE = C_1.C.MemberAdded;
var SCHEMA = __assign({}, EventMessage_1.EventMessage.SCHEMA, { "details": {
        "@id": C_1.C.details,
        "@type": "@id",
    } });
exports.MemberAdded = {
    TYPE: TYPE,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(3);
var MemberDetails_1 = __webpack_require__(87);
var TYPE = C_1.C.MemberAddedDetails;
var SCHEMA = MemberDetails_1.MemberDetails.SCHEMA;
exports.MemberAddedDetails = {
    TYPE: TYPE,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(3);
var EventMessage_1 = __webpack_require__(25);
var TYPE = C_1.C.MemberRemoved;
var SCHEMA = __assign({}, EventMessage_1.EventMessage.SCHEMA, { "details": {
        "@id": C_1.C.details,
        "@type": "@id",
    } });
exports.MemberRemoved = {
    TYPE: TYPE,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(3);
var MemberDetails_1 = __webpack_require__(87);
var TYPE = C_1.C.MemberRemovedDetails;
var SCHEMA = MemberDetails_1.MemberDetails.SCHEMA;
exports.MemberRemovedDetails = {
    TYPE: TYPE,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SHACL_1 = __webpack_require__(88);
var XSD_1 = __webpack_require__(11);
var SCHEMA = {
    "conforms": {
        "@id": SHACL_1.SHACL.conforms,
        "@type": XSD_1.XSD.boolean,
    },
    "results": {
        "@id": SHACL_1.SHACL.result,
        "@type": "@id",
        "@container": "@set",
    },
    "shapesGraphWellFormed": {
        "@id": SHACL_1.SHACL.shapesGraphWellFormed,
        "@type": XSD_1.XSD.boolean,
    },
};
exports.ValidationReport = {
    TYPE: SHACL_1.SHACL.ValidationReport,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SHACL_1 = __webpack_require__(88);
var XSD_1 = __webpack_require__(11);
var SCHEMA = {
    "focusNode": {
        "@id": SHACL_1.SHACL.focusNode,
        "@type": "@id",
    },
    "resultPath": {
        "@id": SHACL_1.SHACL.resultPath,
        "@type": "@id",
    },
    "value": {
        "@id": SHACL_1.SHACL.value,
    },
    "sourceShape": {
        "@id": SHACL_1.SHACL.sourceShape,
        "@type": "@id",
    },
    "sourceConstraintComponent": {
        "@id": SHACL_1.SHACL.sourceConstraintComponent,
        "@type": "@id",
    },
    "detail": {
        "@id": SHACL_1.SHACL.detail,
        "@type": "@id",
    },
    "resultMessage": {
        "@id": SHACL_1.SHACL.resultMessage,
        "@type": XSD_1.XSD.string,
    },
    "resultSeverity": {
        "@id": SHACL_1.SHACL.resultSeverity,
        "@type": "@id",
    },
};
exports.ValidationResult = {
    TYPE: SHACL_1.SHACL.ValidationResult,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(3);
var XSD_1 = __webpack_require__(11);
var SCHEMA = {
    "buildDate": {
        "@id": C_1.C.buildDate,
        "@type": XSD_1.XSD.dateTime,
    },
    "version": {
        "@id": C_1.C.version,
        "@type": XSD_1.XSD.string,
    },
};
exports.PlatformInstance = {
    TYPE: C_1.C.PlatformInstance,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(3);
var SCHEMA = {
    "instance": {
        "@id": C_1.C.instance,
        "@type": "@id",
    },
};
exports.PlatformMetadata = {
    TYPE: C_1.C.Platform,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var CarbonLDP_1 = __webpack_require__(170);
module.exports = CarbonLDP_1.CarbonLDP;


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = __webpack_require__(23);
var AccessPoint_1 = __webpack_require__(191);
var TransientAccessPoint_1 = __webpack_require__(109);
var AbstractContext_1 = __webpack_require__(76);
var DocumentsContext_1 = __webpack_require__(220);
var GlobalContext_1 = __webpack_require__(150);
var Document_1 = __webpack_require__(37);
var Errors = __importStar(__webpack_require__(281));
var IllegalArgumentError_1 = __webpack_require__(2);
var Fragment_1 = __webpack_require__(96);
var TransientFragment_1 = __webpack_require__(73);
var FreeResources_1 = __webpack_require__(39);
var HTTP = __importStar(__webpack_require__(283));
var JSONLD = __importStar(__webpack_require__(285));
var LDP = __importStar(__webpack_require__(286));
var LDPatch = __importStar(__webpack_require__(289));
var Messaging = __importStar(__webpack_require__(290));
var ContainerType_1 = __webpack_require__(41);
var DigestedObjectSchema_1 = __webpack_require__(15);
var DigestedObjectSchemaProperty_1 = __webpack_require__(56);
var ObjectSchemaDigester_1 = __webpack_require__(29);
var ObjectSchemaUtils_1 = __webpack_require__(71);
var PointerType_1 = __webpack_require__(57);
var Pointer_1 = __webpack_require__(13);
var RDF = __importStar(__webpack_require__(291));
var Resource_1 = __webpack_require__(17);
var SHACL = __importStar(__webpack_require__(292));
var SPARQL = __importStar(__webpack_require__(293));
var System = __importStar(__webpack_require__(294));
var Utils = __importStar(__webpack_require__(0));
var Vocabularies = __importStar(__webpack_require__(295));
var CarbonLDP = (function (_super) {
    __extends(CarbonLDP, _super);
    function CarbonLDP(urlOrSettings) {
        var _this = _super.call(this, getURLFrom(urlOrSettings)) || this;
        _this._settings = {
            vocabulary: "vocabularies/main/#",
            paths: {
                system: {
                    slug: ".system/",
                    paths: {
                        platform: "platform/",
                        credentials: "credentials/",
                        roles: "roles/",
                    },
                },
                users: {
                    slug: "users/",
                    paths: {
                        me: "me/",
                    },
                },
            },
        };
        var settings = getSettingsFrom(urlOrSettings);
        _this._extendsSettings(settings);
        _this.documents = _this.registry.getPointer(_this._baseURI, true);
        return _this;
    }
    Object.defineProperty(CarbonLDP, "version", {
        get: function () { return "1.0.0-alpha.18"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarbonLDP.prototype, "version", {
        get: function () { return CarbonLDP.version; },
        enumerable: true,
        configurable: true
    });
    CarbonLDP.prototype.getPlatformMetadata = function () {
        var _this = this;
        return Utils.promiseMethod(function () {
            var uri = _this._resolvePath("system.platform");
            return _this.documents.get(uri);
        });
    };
    CarbonLDP.AbstractContext = AbstractContext_1.AbstractContext;
    CarbonLDP.AccessPoint = AccessPoint_1.AccessPoint;
    CarbonLDP.TransientAccessPoint = TransientAccessPoint_1.TransientAccessPoint;
    CarbonLDP.Errors = Errors;
    CarbonLDP.FreeResources = FreeResources_1.FreeResources;
    CarbonLDP.HTTP = HTTP;
    CarbonLDP.JSONLD = JSONLD;
    CarbonLDP.LDP = LDP;
    CarbonLDP.LDPatch = LDPatch;
    CarbonLDP.Messaging = Messaging;
    CarbonLDP.Vocabularies = Vocabularies;
    CarbonLDP.ObjectSchemaUtils = ObjectSchemaUtils_1.ObjectSchemaUtils;
    CarbonLDP.ObjectSchemaDigester = ObjectSchemaDigester_1.ObjectSchemaDigester;
    CarbonLDP.DigestedObjectSchemaProperty = DigestedObjectSchemaProperty_1.DigestedObjectSchemaProperty;
    CarbonLDP.PointerType = PointerType_1.PointerType;
    CarbonLDP.ContainerType = ContainerType_1.ContainerType;
    CarbonLDP.DigestedObjectSchema = DigestedObjectSchema_1.DigestedObjectSchema;
    CarbonLDP.Document = Document_1.Document;
    CarbonLDP.Fragment = Fragment_1.Fragment;
    CarbonLDP.TransientFragment = TransientFragment_1.TransientFragment;
    CarbonLDP.Pointer = Pointer_1.Pointer;
    CarbonLDP.RDF = RDF;
    CarbonLDP.TransientResource = Resource_1.Resource;
    CarbonLDP.GlobalContext = GlobalContext_1.GlobalContext;
    CarbonLDP.SHACL = SHACL;
    CarbonLDP.SPARQL = SPARQL;
    CarbonLDP.System = System;
    CarbonLDP.Utils = Utils;
    return CarbonLDP;
}(DocumentsContext_1.DocumentsContext));
exports.CarbonLDP = CarbonLDP;
function getURLFrom(urlOrSettings) {
    return Utils.isString(urlOrSettings) ?
        getURLFromString(urlOrSettings) :
        getURLFromSettings(urlOrSettings);
}
function getURLFromString(url) {
    if (!RDF.URI.hasProtocol(url))
        throw new IllegalArgumentError_1.IllegalArgumentError("The URL must contain a valid protocol: \"http://\", \"https://\".");
    if (url.endsWith("/"))
        return url;
    return url + "/";
}
function getURLFromSettings(settings) {
    if (!Utils.isString(settings.host))
        throw new IllegalArgumentError_1.IllegalArgumentError("The settings object must contains a valid host string.");
    if (iri_1.hasProtocol(settings.host))
        throw new IllegalArgumentError_1.IllegalArgumentError("The host must not contain a protocol.");
    if (settings.host.includes(":"))
        throw new IllegalArgumentError_1.IllegalArgumentError("The host must not contain a port.");
    var protocol = settings.ssl === false ? "http://" : "https://";
    var host = settings.host.endsWith("/") ? settings.host.slice(0, -1) : settings.host;
    var url = "" + protocol + host + "/";
    if (!Utils.isNumber(settings.port))
        return url;
    return url.slice(0, -1) + (":" + settings.port + "/");
}
function getSettingsFrom(urlOrSettings) {
    if (Utils.isString(urlOrSettings))
        return {};
    return Object.assign({}, urlOrSettings, { ssl: null, host: null, port: null });
}


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Identifier_1 = __webpack_require__(35);
var Operator_1 = __webpack_require__(51);
var RightSymbol_1 = __webpack_require__(67);
var Token_1 = __webpack_require__(20);
var NumberLiteral = (function (_super) {
    __extends(NumberLiteral, _super);
    function NumberLiteral(value) {
        return _super.call(this, value + "") || this;
    }
    NumberLiteral.prototype.getPrettySeparator = function (nextToken) {
        if (nextToken instanceof Identifier_1.Identifier)
            return Token_1.NEW_LINE_SEPARATOR;
        if (nextToken instanceof Operator_1.Operator || nextToken instanceof RightSymbol_1.RightSymbol)
            return Token_1.EMPTY_SEPARATOR;
        return Token_1.SPACE_SEPARATOR;
    };
    NumberLiteral.prototype.getCompactSeparator = function (nextToken) {
        if (this.constructor === nextToken.constructor)
            return Token_1.SPACE_SEPARATOR;
        return Token_1.EMPTY_SEPARATOR;
    };
    return NumberLiteral;
}(Token_1.Token));
exports.NumberLiteral = NumberLiteral;
exports.default = NumberLiteral;

//# sourceMappingURL=NumberLiteral.js.map


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LABEL_REGEX = /^_:[A-Za-z0-9_]([A-Za-z0-9_\-.]*[A-Za-z0-9_\-])?$/;
var BlankNodeToken = (function () {
    function BlankNodeToken(label) {
        this.token = "blankNode";
        if (!label)
            return;
        if (!LABEL_REGEX.test(label))
            throw new Error("Invalid blank node label.");
        this.label = label;
    }
    BlankNodeToken.prototype.toString = function () {
        if (this.label)
            return this.label;
        return "[]";
    };
    return BlankNodeToken;
}());
exports.BlankNodeToken = BlankNodeToken;

//# sourceMappingURL=BlankNodeToken.js.map


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NAME_REGEX = /^((?:[0-9A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF]))((?:[0-9A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF]))*$/;
var VariableToken = (function () {
    function VariableToken(name) {
        this.token = "variable";
        if (!NAME_REGEX.test(name))
            throw new Error("Invalid variable name");
        this.name = name;
    }
    VariableToken.prototype.toString = function () {
        return "?" + this.name;
    };
    return VariableToken;
}());
exports.VariableToken = VariableToken;

//# sourceMappingURL=VariableToken.js.map


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = __webpack_require__(23);
var BooleanToken_1 = __webpack_require__(94);
var IRIToken_1 = __webpack_require__(90);
var LanguageToken_1 = __webpack_require__(93);
var NumberToken_1 = __webpack_require__(92);
var PrefixedNameToken_1 = __webpack_require__(91);
var StringToken_1 = __webpack_require__(95);
var LiteralToken = (function () {
    function LiteralToken(value) {
        this.token = "literal";
        if (value === void 0)
            return;
        this.setValue(value);
    }
    LiteralToken.prototype.setValue = function (value) {
        if (this.value && this.value.value === value)
            return;
        this.value = typeof value === "boolean" ? new BooleanToken_1.BooleanToken(value) :
            typeof value === "number" ? new NumberToken_1.NumberToken(value) :
                new StringToken_1.StringToken(value);
        return this;
    };
    LiteralToken.prototype.setType = function (type) {
        if (!this.value)
            throw new Error("Must set a value before a type.");
        if (this.value.token !== "string")
            this.value = new StringToken_1.StringToken("" + this.value);
        this.type = typeof type === "string" ? iri_1.isPrefixed(type) ?
            new PrefixedNameToken_1.PrefixedNameToken(type) : new IRIToken_1.IRIToken(type) : type;
        return this;
    };
    LiteralToken.prototype.setLanguage = function (language) {
        if (!this.value || this.value.token !== "string")
            throw new Error("Non-string value can't have a language.");
        this.type = void 0;
        this.language = new LanguageToken_1.LanguageToken(language);
        return this;
    };
    LiteralToken.prototype.toString = function () {
        if (this.language)
            return "" + this.value + this.language;
        if (this.type)
            return this.value + "^^" + this.type;
        return "" + this.value;
    };
    return LiteralToken;
}());
exports.LiteralToken = LiteralToken;

//# sourceMappingURL=LiteralToken.js.map


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ValuesToken = (function () {
    function ValuesToken() {
        this.token = "values";
        this.variables = [];
        this.values = [];
    }
    ValuesToken.prototype.addValues = function (variable) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        this.variables.push(variable);
        this.values.push(values);
        return this;
    };
    ValuesToken.prototype.toString = function () {
        var variables = this.variables.length ? this.variables.length === 1 ? this.variables.join(" ") :
            "( " + this.variables.join(" ") + " )" : "()";
        var values = this.variables.length ? this.variables.length === 1 ? this.values[0] :
            this.values.map(function (varValues) { return "( " + varValues.join(" ") + " )"; }) : ["()"];
        return "VALUES " + variables + " { " + values.join(" ") + " }";
    };
    return ValuesToken;
}());
exports.ValuesToken = ValuesToken;

//# sourceMappingURL=ValuesToken.js.map


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SubjectToken = (function () {
    function SubjectToken(subject) {
        this.token = "subject";
        this.subject = subject;
        this.predicates = [];
    }
    SubjectToken.prototype.addPredicate = function (predicate) {
        this.predicates.push(predicate);
        return this;
    };
    SubjectToken.prototype.toString = function () {
        return this.subject + " " + this.predicates.join("; ");
    };
    return SubjectToken;
}());
exports.SubjectToken = SubjectToken;

//# sourceMappingURL=SubjectToken.js.map


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PredicateToken = (function () {
    function PredicateToken(predicate) {
        this.token = "predicate";
        this.predicate = predicate;
        this.objects = [];
    }
    PredicateToken.prototype.addObject = function (object) {
        this.objects.push(object);
        return this;
    };
    PredicateToken.prototype.toString = function () {
        return this.predicate + " " + this.objects.join(", ");
    };
    return PredicateToken;
}());
exports.PredicateToken = PredicateToken;

//# sourceMappingURL=PredicateToken.js.map


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(36);
var OptionalToken = (function () {
    function OptionalToken() {
        this.token = "optional";
        this.patterns = [];
    }
    OptionalToken.prototype.addPattern = function () {
        var pattern = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pattern[_i] = arguments[_i];
        }
        (_a = this.patterns).push.apply(_a, pattern);
        return this;
        var _a;
    };
    OptionalToken.prototype.toString = function () {
        return "OPTIONAL { " + utils_1.joinPatterns(this.patterns) + " }";
    };
    return OptionalToken;
}());
exports.OptionalToken = OptionalToken;

//# sourceMappingURL=OptionalToken.js.map


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(36);
var GraphToken = (function () {
    function GraphToken(graph) {
        this.token = "graph";
        this.graph = graph;
        this.patterns = [];
    }
    GraphToken.prototype.addPattern = function () {
        var pattern = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pattern[_i] = arguments[_i];
        }
        (_a = this.patterns).push.apply(_a, pattern);
        return this;
        var _a;
    };
    GraphToken.prototype.toString = function () {
        return "GRAPH " + this.graph + " { " + utils_1.joinPatterns(this.patterns) + " }";
    };
    return GraphToken;
}());
exports.GraphToken = GraphToken;

//# sourceMappingURL=GraphToken.js.map


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BindToken = (function () {
    function BindToken(expression, variable) {
        this.token = "bind";
        this.expression = expression;
        this.variable = variable;
    }
    BindToken.prototype.toString = function () {
        return "BIND(" + this.expression + " AS " + this.variable + ")";
    };
    return BindToken;
}());
exports.BindToken = BindToken;

//# sourceMappingURL=BindToken.js.map


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FilterToken = (function () {
    function FilterToken(constraint) {
        this.token = "filter";
        this.constraint = constraint;
    }
    FilterToken.prototype.toString = function () {
        return "FILTER( " + this.constraint + " )";
    };
    return FilterToken;
}());
exports.FilterToken = FilterToken;

//# sourceMappingURL=FilterToken.js.map


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PrefixToken = (function () {
    function PrefixToken(namespace, iri) {
        this.token = "prefix";
        this.namespace = namespace;
        this.iri = iri;
    }
    PrefixToken.prototype.toString = function () {
        return "PREFIX " + this.namespace + ": " + this.iri;
    };
    return PrefixToken;
}());
exports.PrefixToken = PrefixToken;

//# sourceMappingURL=PrefixToken.js.map


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(36);
var ConstructToken = (function () {
    function ConstructToken() {
        this.token = "construct";
        this.triples = [];
        this.patterns = [];
        this.modifiers = [];
    }
    ConstructToken.prototype.addTriple = function () {
        var triple = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            triple[_i] = arguments[_i];
        }
        (_a = this.triples).push.apply(_a, triple);
        return this;
        var _a;
    };
    ConstructToken.prototype.addPattern = function () {
        var patterns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            patterns[_i] = arguments[_i];
        }
        (_a = this.patterns).push.apply(_a, patterns);
        return this;
        var _a;
    };
    ConstructToken.prototype.addModifier = function () {
        var modifiers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modifiers[_i] = arguments[_i];
        }
        (_a = this.modifiers).push.apply(_a, modifiers);
        return this;
        var _a;
    };
    ConstructToken.prototype.toString = function () {
        var query = "CONSTRUCT { " + this.triples.join(". ") + " } WHERE { " + utils_1.joinPatterns(this.patterns) + " }";
        if (this.modifiers.length)
            query += " " + this.modifiers.join(" ");
        return query;
    };
    return ConstructToken;
}());
exports.ConstructToken = ConstructToken;

//# sourceMappingURL=ConstructToken.js.map


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(36);
var SelectToken = (function () {
    function SelectToken(modifier) {
        this.token = "select";
        this.modifier = modifier;
        this.variables = [];
        this.patterns = [];
        this.modifiers = [];
    }
    SelectToken.prototype.addVariable = function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        (_a = this.variables).push.apply(_a, variables);
        return this;
        var _a;
    };
    SelectToken.prototype.addPattern = function () {
        var patterns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            patterns[_i] = arguments[_i];
        }
        (_a = this.patterns).push.apply(_a, patterns);
        return this;
        var _a;
    };
    SelectToken.prototype.addModifier = function () {
        var modifier = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modifier[_i] = arguments[_i];
        }
        (_a = this.modifiers).push.apply(_a, modifier);
        return this;
        var _a;
    };
    SelectToken.prototype.toString = function () {
        var query = "SELECT";
        if (this.modifier)
            query += " " + this.modifier;
        if (this.variables.length)
            query += " " + this.variables.join(" ");
        query += " WHERE { " + utils_1.joinPatterns(this.patterns) + " }";
        if (this.modifiers.length)
            query += " " + this.modifiers.join(" ");
        return query;
    };
    return SelectToken;
}());
exports.SelectToken = SelectToken;

//# sourceMappingURL=SelectToken.js.map


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BaseToken = (function () {
    function BaseToken(iri) {
        this.token = "base";
        this.iri = iri;
    }
    BaseToken.prototype.toString = function () {
        return "BASE " + this.iri;
    };
    return BaseToken;
}());
exports.BaseToken = BaseToken;

//# sourceMappingURL=BaseToken.js.map


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OrderToken = (function () {
    function OrderToken(condition, flow) {
        this.token = "order";
        this.condition = condition;
        if (flow)
            this.flow = flow;
    }
    OrderToken.prototype.toString = function () {
        return "ORDER BY " + (this.flow ?
            this.flow + "( " + this.condition + " )" :
            "" + this.condition);
    };
    return OrderToken;
}());
exports.OrderToken = OrderToken;

//# sourceMappingURL=OrderToken.js.map


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LimitToken = (function () {
    function LimitToken(value) {
        this.token = "limit";
        this.value = value;
    }
    LimitToken.prototype.toString = function () {
        return "LIMIT " + this.value;
    };
    return LimitToken;
}());
exports.LimitToken = LimitToken;

//# sourceMappingURL=LimitToken.js.map


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OffsetToken = (function () {
    function OffsetToken(value) {
        this.token = "offset";
        this.value = value;
    }
    OffsetToken.prototype.toString = function () {
        return "OFFSET " + this.value;
    };
    return OffsetToken;
}());
exports.OffsetToken = OffsetToken;

//# sourceMappingURL=OffsetToken.js.map


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var QueryToken = (function () {
    function QueryToken(query, values) {
        this.token = "query";
        this.prologues = [];
        this.query = query;
        this.values = values;
    }
    QueryToken.prototype.addPrologues = function () {
        var prologues = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            prologues[_i] = arguments[_i];
        }
        (_a = this.prologues).push.apply(_a, prologues);
        return this;
        var _a;
    };
    QueryToken.prototype.toString = function () {
        var query = this.prologues.join(" ");
        if (this.prologues.length)
            query += " ";
        query += this.query;
        if (this.values)
            query += " " + this.values;
        return query;
    };
    return QueryToken;
}());
exports.QueryToken = QueryToken;

//# sourceMappingURL=QueryToken.js.map


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CollectionToken = (function () {
    function CollectionToken() {
        this.token = "collection";
        this.objects = [];
    }
    CollectionToken.prototype.addObject = function (object) {
        this.objects.push(object);
        return this;
    };
    CollectionToken.prototype.toString = function () {
        if (!this.objects.length)
            return "()";
        return "( " + this.objects.join(" ") + " )";
    };
    return CollectionToken;
}());
exports.CollectionToken = CollectionToken;

//# sourceMappingURL=CollectionToken.js.map


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = __webpack_require__(37);
var TransientAccessPoint_1 = __webpack_require__(109);
exports.AccessPoint = {
    TYPE: TransientAccessPoint_1.TransientAccessPoint.TYPE,
    is: function (value) {
        return TransientAccessPoint_1.TransientAccessPoint.is(value)
            && Document_1.Document.is(value);
    },
    create: TransientAccessPoint_1.TransientAccessPoint.create,
    createFrom: TransientAccessPoint_1.TransientAccessPoint.createFrom,
};


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(98));


/***/ }),
/* 193 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 194 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 195 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "BadRequestError";
var statusCode = 400;
var BadRequestError = (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BadRequestError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BadRequestError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return BadRequestError;
}(HTTPError_1.HTTPError));
exports.BadRequestError = BadRequestError;


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "ConflictError";
var statusCode = 409;
var ConflictError = (function (_super) {
    __extends(ConflictError, _super);
    function ConflictError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ConflictError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConflictError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return ConflictError;
}(HTTPError_1.HTTPError));
exports.ConflictError = ConflictError;


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "ForbiddenError";
var statusCode = 403;
var ForbiddenError = (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ForbiddenError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForbiddenError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return ForbiddenError;
}(HTTPError_1.HTTPError));
exports.ForbiddenError = ForbiddenError;


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "MethodNotAllowedError";
var statusCode = 405;
var MethodNotAllowedError = (function (_super) {
    __extends(MethodNotAllowedError, _super);
    function MethodNotAllowedError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MethodNotAllowedError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MethodNotAllowedError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return MethodNotAllowedError;
}(HTTPError_1.HTTPError));
exports.MethodNotAllowedError = MethodNotAllowedError;


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "NotAcceptableError";
var statusCode = 406;
var NotAcceptableError = (function (_super) {
    __extends(NotAcceptableError, _super);
    function NotAcceptableError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NotAcceptableError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotAcceptableError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return NotAcceptableError;
}(HTTPError_1.HTTPError));
exports.NotAcceptableError = NotAcceptableError;


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "NotFoundError";
var statusCode = 404;
var NotFoundError = (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NotFoundError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotFoundError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return NotFoundError;
}(HTTPError_1.HTTPError));
exports.NotFoundError = NotFoundError;


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "PreconditionFailedError";
var statusCode = 412;
var PreconditionFailedError = (function (_super) {
    __extends(PreconditionFailedError, _super);
    function PreconditionFailedError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PreconditionFailedError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PreconditionFailedError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return PreconditionFailedError;
}(HTTPError_1.HTTPError));
exports.PreconditionFailedError = PreconditionFailedError;


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "PreconditionRequiredError";
var statusCode = 428;
var PreconditionRequiredError = (function (_super) {
    __extends(PreconditionRequiredError, _super);
    function PreconditionRequiredError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PreconditionRequiredError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PreconditionRequiredError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return PreconditionRequiredError;
}(HTTPError_1.HTTPError));
exports.PreconditionRequiredError = PreconditionRequiredError;


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "RequestEntityTooLargeError";
var statusCode = 413;
var RequestEntityTooLargeError = (function (_super) {
    __extends(RequestEntityTooLargeError, _super);
    function RequestEntityTooLargeError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RequestEntityTooLargeError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestEntityTooLargeError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return RequestEntityTooLargeError;
}(HTTPError_1.HTTPError));
exports.RequestEntityTooLargeError = RequestEntityTooLargeError;


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "RequestHeaderFieldsTooLargeError";
var statusCode = 431;
var RequestHeaderFieldsTooLargeError = (function (_super) {
    __extends(RequestHeaderFieldsTooLargeError, _super);
    function RequestHeaderFieldsTooLargeError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RequestHeaderFieldsTooLargeError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestHeaderFieldsTooLargeError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return RequestHeaderFieldsTooLargeError;
}(HTTPError_1.HTTPError));
exports.RequestHeaderFieldsTooLargeError = RequestHeaderFieldsTooLargeError;


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "RequestURITooLongError";
var statusCode = 414;
var RequestURITooLongError = (function (_super) {
    __extends(RequestURITooLongError, _super);
    function RequestURITooLongError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RequestURITooLongError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestURITooLongError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return RequestURITooLongError;
}(HTTPError_1.HTTPError));
exports.RequestURITooLongError = RequestURITooLongError;


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "TooManyRequestsError";
var statusCode = 429;
var TooManyRequestsError = (function (_super) {
    __extends(TooManyRequestsError, _super);
    function TooManyRequestsError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TooManyRequestsError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooManyRequestsError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return TooManyRequestsError;
}(HTTPError_1.HTTPError));
exports.TooManyRequestsError = TooManyRequestsError;


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "UnauthorizedError";
var statusCode = 401;
var UnauthorizedError = (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UnauthorizedError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UnauthorizedError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return UnauthorizedError;
}(HTTPError_1.HTTPError));
exports.UnauthorizedError = UnauthorizedError;


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "UnsupportedMediaTypeError";
var statusCode = 415;
var UnsupportedMediaTypeError = (function (_super) {
    __extends(UnsupportedMediaTypeError, _super);
    function UnsupportedMediaTypeError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UnsupportedMediaTypeError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UnsupportedMediaTypeError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return UnsupportedMediaTypeError;
}(HTTPError_1.HTTPError));
exports.UnsupportedMediaTypeError = UnsupportedMediaTypeError;


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "BadGatewayError";
var statusCode = 502;
var BadGatewayError = (function (_super) {
    __extends(BadGatewayError, _super);
    function BadGatewayError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BadGatewayError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BadGatewayError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return BadGatewayError;
}(HTTPError_1.HTTPError));
exports.BadGatewayError = BadGatewayError;


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "GatewayTimeoutError";
var statusCode = 504;
var GatewayTimeoutError = (function (_super) {
    __extends(GatewayTimeoutError, _super);
    function GatewayTimeoutError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GatewayTimeoutError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GatewayTimeoutError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return GatewayTimeoutError;
}(HTTPError_1.HTTPError));
exports.GatewayTimeoutError = GatewayTimeoutError;


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "HTTPVersionNotSupportedError";
var statusCode = 505;
var HTTPVersionNotSupportedError = (function (_super) {
    __extends(HTTPVersionNotSupportedError, _super);
    function HTTPVersionNotSupportedError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(HTTPVersionNotSupportedError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HTTPVersionNotSupportedError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return HTTPVersionNotSupportedError;
}(HTTPError_1.HTTPError));
exports.HTTPVersionNotSupportedError = HTTPVersionNotSupportedError;


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "InternalServerErrorError";
var statusCode = 500;
var InternalServerErrorError = (function (_super) {
    __extends(InternalServerErrorError, _super);
    function InternalServerErrorError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(InternalServerErrorError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InternalServerErrorError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return InternalServerErrorError;
}(HTTPError_1.HTTPError));
exports.InternalServerErrorError = InternalServerErrorError;


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "NotImplementedError";
var statusCode = 501;
var NotImplementedError = (function (_super) {
    __extends(NotImplementedError, _super);
    function NotImplementedError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NotImplementedError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotImplementedError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return NotImplementedError;
}(HTTPError_1.HTTPError));
exports.NotImplementedError = NotImplementedError;


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(6);
var name = "ServiceUnavailableError";
var statusCode = 503;
var ServiceUnavailableError = (function (_super) {
    __extends(ServiceUnavailableError, _super);
    function ServiceUnavailableError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ServiceUnavailableError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceUnavailableError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return ServiceUnavailableError;
}(HTTPError_1.HTTPError));
exports.ServiceUnavailableError = ServiceUnavailableError;


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Event_1 = __webpack_require__(74);
var ModelDecorator_1 = __webpack_require__(4);
var URI_1 = __webpack_require__(8);
var ResolvablePointer_1 = __webpack_require__(24);
var Utils_1 = __webpack_require__(0);
var TransientDocument_1 = __webpack_require__(30);
function __parseParams(resource, uriPatternOROnEvent, onEventOrOnError, onError) {
    var uriPattern = Utils_1.isString(uriPatternOROnEvent) ?
        URI_1.URI.resolve(resource.$id, uriPatternOROnEvent) : resource.$id;
    var onEvent = Utils_1.isFunction(uriPatternOROnEvent) ?
        uriPatternOROnEvent : onEventOrOnError;
    if (onEvent !== onEventOrOnError)
        onError = onEventOrOnError;
    return { uriPattern: uriPattern, onEvent: onEvent, onError: onError };
}
exports.EventEmitterDocumentTrait = {
    PROTOTYPE: {
        on: function (event, uriPatternOROnEvent, onEventOrOnError, onError) {
            var _a = __parseParams(this, uriPatternOROnEvent, onEventOrOnError, onError), uriPattern = _a.uriPattern, onEvent = _a.onEvent, $onError = _a.onError;
            return this.$repository.on(event, uriPattern, onEvent, $onError);
        },
        off: function (event, uriPatternOROnEvent, onEventOrOnError, onError) {
            var _a = __parseParams(this, uriPatternOROnEvent, onEventOrOnError, onError), uriPattern = _a.uriPattern, onEvent = _a.onEvent, $onError = _a.onError;
            return this.$repository.off(event, uriPattern, onEvent, $onError);
        },
        one: function (event, uriPatternOROnEvent, onEventOrOnError, onError) {
            var _a = __parseParams(this, uriPatternOROnEvent, onEventOrOnError, onError), uriPattern = _a.uriPattern, onEvent = _a.onEvent, $onError = _a.onError;
            return this.$repository.one(event, uriPattern, onEvent, $onError);
        },
        onChildCreated: function (uriPatternOROnEvent, onEventOrOnError, onError) {
            return this.on(Event_1.Event.CHILD_CREATED, uriPatternOROnEvent, onEventOrOnError, onError);
        },
        onDocumentModified: function (uriPatternOROnEvent, onEventOrOnError, onError) {
            return this.on(Event_1.Event.DOCUMENT_MODIFIED, uriPatternOROnEvent, onEventOrOnError, onError);
        },
        onDocumentDeleted: function (uriPatternOROnEvent, onEventOrOnError, onError) {
            return this.on(Event_1.Event.DOCUMENT_DELETED, uriPatternOROnEvent, onEventOrOnError, onError);
        },
        onMemberAdded: function (uriPatternOROnEvent, onEventOrOnError, onError) {
            return this.on(Event_1.Event.MEMBER_ADDED, uriPatternOROnEvent, onEventOrOnError, onError);
        },
        onMemberRemoved: function (uriPatternOROnEvent, onEventOrOnError, onError) {
            return this.on(Event_1.Event.MEMBER_REMOVED, uriPatternOROnEvent, onEventOrOnError, onError);
        },
    },
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && ModelDecorator_1.ModelDecorator
                .hasPropertiesFrom(exports.EventEmitterDocumentTrait.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.EventEmitterDocumentTrait.isDecorated(object))
            return object;
        var resource = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, TransientDocument_1.TransientDocument, ResolvablePointer_1.ResolvablePointer);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.EventEmitterDocumentTrait.PROTOTYPE, resource);
    },
};


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(27);
var ModelDecorator_1 = __webpack_require__(4);
var QueryablePointer_1 = __webpack_require__(38);
var LDPDocumentTrait_1 = __webpack_require__(218);
exports.QueryableDocumentTrait = {
    PROTOTYPE: {
        getChildren: function (uriOrQueryBuilderFnOrOptions, queryBuilderFnOrOptions, queryBuilderFn) {
            var _a;
            var _b = Utils_1._parseURIParams(this, uriOrQueryBuilderFnOrOptions, arguments), _uri = _b._uri, _args = _b._args;
            return (_a = this.$repository).getChildren.apply(_a, [_uri].concat(_args));
        },
        getMembers: function (uriOrQueryBuilderFnOrOptions, queryBuilderFnOrOptions, queryBuilderFn) {
            var _a;
            var _b = Utils_1._parseURIParams(this, uriOrQueryBuilderFnOrOptions, arguments), _uri = _b._uri, _args = _b._args;
            return (_a = this.$repository).getMembers.apply(_a, [_uri].concat(_args));
        },
        listChildren: function (uriOrOptions, requestOptions) {
            var _a;
            var _b = Utils_1._parseURIParams(this, uriOrOptions, arguments), _uri = _b._uri, _args = _b._args;
            return (_a = this.$repository).listChildren.apply(_a, [_uri].concat(_args));
        },
        listMembers: function (uriOrOptions, requestOptions) {
            var _a;
            var _b = Utils_1._parseURIParams(this, uriOrOptions, arguments), _uri = _b._uri, _args = _b._args;
            return (_a = this.$repository).listMembers.apply(_a, [_uri].concat(_args));
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.QueryableDocumentTrait.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.QueryableDocumentTrait.isDecorated(object))
            return object;
        var forced = object;
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(forced, LDPDocumentTrait_1.LDPDocumentTrait, QueryablePointer_1.QueryablePointer);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.QueryableDocumentTrait.PROTOTYPE, target);
    },
};


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(27);
var ModelDecorator_1 = __webpack_require__(4);
var Pointer_1 = __webpack_require__(13);
var URI_1 = __webpack_require__(8);
var ResolvablePointer_1 = __webpack_require__(24);
var Utils_2 = __webpack_require__(0);
var TransientDocument_1 = __webpack_require__(30);
function __parseMemberParams(resource, args) {
    var params = Array.from(args);
    var uri = Utils_2.isString(params[0]) && Utils_2.isString(Pointer_1.Pointer.getID(params[1])) ?
        URI_1.URI.resolve(resource.$id, params.shift()) : resource.$id;
    return { uri: uri, params: params };
}
exports.LDPDocumentTrait = {
    PROTOTYPE: {
        create: function (uriOrChildren, childrenOrSlugsOrRequestOptions, slugsOrRequestOptions, requestOptions) {
            var _a;
            var _b = Utils_1._parseURIParams(this, uriOrChildren, arguments), _uri = _b._uri, _args = _b._args;
            return (_a = this.$repository).create.apply(_a, [_uri].concat(_args));
        },
        createAndRetrieve: function (uriOrChildren, childrenOrSlugsOrRequestOptions, slugsOrRequestOptions, requestOptions) {
            if (requestOptions === void 0) { requestOptions = {}; }
            var _a;
            var _b = Utils_1._parseURIParams(this, uriOrChildren, arguments), _uri = _b._uri, _args = _b._args;
            return (_a = this.$repository).createAndRetrieve.apply(_a, [_uri].concat(_args));
        },
        addMember: function (uriOrMember, memberOrOptions, requestOptions) {
            var _a;
            var _b = __parseMemberParams(this, arguments), uri = _b.uri, params = _b.params;
            return (_a = this.$repository).addMember.apply(_a, [uri].concat(params));
        },
        addMembers: function (uriOrMembers, membersOrOptions, requestOptions) {
            var _a;
            var _b = Utils_1._parseURIParams(this, uriOrMembers, arguments), _uri = _b._uri, _args = _b._args;
            return (_a = this.$repository).addMembers.apply(_a, [_uri].concat(_args));
        },
        removeMember: function (uriOrMember, memberOrOptions, requestOptions) {
            var _a;
            var _b = __parseMemberParams(this, arguments), uri = _b.uri, params = _b.params;
            return (_a = this.$repository).removeMember.apply(_a, [uri].concat(params));
        },
        removeMembers: function (uriOrMembersOrOptions, membersOrOptions, requestOptions) {
            var _a;
            var _b = Utils_1._parseURIParams(this, uriOrMembersOrOptions, arguments), _uri = _b._uri, _args = _b._args;
            return (_a = this.$repository).removeMembers.apply(_a, [_uri].concat(_args));
        },
    },
    isDecorated: function (object) {
        return Utils_2.isObject(object)
            && ModelDecorator_1.ModelDecorator
                .hasPropertiesFrom(exports.LDPDocumentTrait.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.LDPDocumentTrait.isDecorated(object))
            return object;
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, TransientDocument_1.TransientDocument, ResolvablePointer_1.ResolvablePointer);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.LDPDocumentTrait.PROTOTYPE, target);
    },
};


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ModelDecorator_1 = __webpack_require__(4);
var URI_1 = __webpack_require__(8);
var ResolvablePointer_1 = __webpack_require__(24);
var Utils_1 = __webpack_require__(0);
var TransientDocument_1 = __webpack_require__(30);
function __parseParams(resource, uriOrQuery, queryOrOptions, options) {
    var uri = resource.$id;
    var query = uriOrQuery;
    if (Utils_1.isObject(queryOrOptions)) {
        options = queryOrOptions;
    }
    else if (queryOrOptions !== void 0) {
        query = queryOrOptions;
        uri = URI_1.URI.resolve(resource.$id, uriOrQuery);
    }
    return { uri: uri, query: query, options: options };
}
exports.SPARQLDocumentTrait = {
    PROTOTYPE: {
        executeASKQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
            var _a = __parseParams(this, uriOrQuery, queryOrOptions, requestOptions), uri = _a.uri, query = _a.query, options = _a.options;
            return this.$repository.executeASKQuery(uri, query, options);
        },
        executeSELECTQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
            var _a = __parseParams(this, uriOrQuery, queryOrOptions, requestOptions), uri = _a.uri, query = _a.query, options = _a.options;
            return this.$repository.executeSELECTQuery(uri, query, options);
        },
        executeUPDATE: function (uriOrQuery, updateOrOptions, requestOptions) {
            var _a = __parseParams(this, uriOrQuery, updateOrOptions, requestOptions), uri = _a.uri, query = _a.query, options = _a.options;
            return this.$repository.executeUPDATE(uri, query, options);
        },
        sparql: function (uri) {
            var $uri = uri ? URI_1.URI.resolve(this.$id, uri) : this.$id;
            return this.$repository.sparql($uri);
        },
    },
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && ModelDecorator_1.ModelDecorator
                .hasPropertiesFrom(exports.SPARQLDocumentTrait.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.SPARQLDocumentTrait.isDecorated(object))
            return object;
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, TransientDocument_1.TransientDocument, ResolvablePointer_1.ResolvablePointer);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.SPARQLDocumentTrait.PROTOTYPE, target);
    },
};


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var DocumentsRegistry_1 = __webpack_require__(221);
var DocumentsRepository_1 = __webpack_require__(223);
var IllegalStateError_1 = __webpack_require__(31);
var MessagingService_1 = __webpack_require__(135);
var URI_1 = __webpack_require__(8);
var Utils_1 = __webpack_require__(0);
var AbstractContext_1 = __webpack_require__(76);
var GlobalContext_1 = __webpack_require__(150);
var DocumentsContext = (function (_super) {
    __extends(DocumentsContext, _super);
    function DocumentsContext(url) {
        var _this = _super.call(this, GlobalContext_1.GlobalContext.instance) || this;
        _this._baseURI = url;
        _this.registry = DocumentsRegistry_1.DocumentsRegistry.createFrom({ $context: _this });
        _this.repository = DocumentsRepository_1.DocumentsRepository.createFrom({ $context: _this });
        _this.messaging = new MessagingService_1.MessagingService(_this);
        return _this;
    }
    DocumentsContext._mergePaths = function (target, source) {
        if (!source)
            return target;
        if (!target)
            return Utils_1.ObjectUtils.clone(source, { objects: true });
        for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
            var key = _a[_i];
            var sourcePath = source[key];
            if (sourcePath === null) {
                delete target[key];
                continue;
            }
            var targetPath = target[key];
            if (!targetPath) {
                target[key] = Utils_1.isObject(sourcePath) ?
                    Utils_1.ObjectUtils.clone(sourcePath, { objects: true }) :
                    sourcePath;
                continue;
            }
            if (Utils_1.isString(sourcePath)) {
                if (Utils_1.isObject(targetPath)) {
                    targetPath.slug = sourcePath;
                }
                else {
                    target[key] = sourcePath;
                }
                continue;
            }
            if (sourcePath.slug === void 0 && sourcePath.paths === void 0)
                continue;
            var targetDocPaths = Utils_1.isString(targetPath) ?
                target[key] = { slug: targetPath } : targetPath;
            if (sourcePath.slug !== void 0)
                targetDocPaths.slug = sourcePath.slug;
            if (sourcePath.paths !== void 0)
                targetDocPaths.paths = DocumentsContext._mergePaths(targetDocPaths.paths, sourcePath.paths);
        }
        return target;
    };
    DocumentsContext.prototype._resolvePath = function (path) {
        var leftSearchedPaths = path.split(".");
        var currentSearchedPaths = [];
        var url = "";
        var documentPaths = this._settings && this._settings.paths;
        while (leftSearchedPaths.length) {
            var containerKey = leftSearchedPaths.shift();
            currentSearchedPaths.push(containerKey);
            var containerPath = documentPaths ? documentPaths[containerKey] : null;
            if (!containerPath)
                throw new IllegalStateError_1.IllegalStateError("The path \"" + currentSearchedPaths.join(".") + "\" hasn't been declared.");
            var slug = Utils_1.isString(containerPath) ? containerPath : containerPath.slug;
            if (!slug)
                throw new IllegalStateError_1.IllegalStateError("The path \"" + currentSearchedPaths.join(".") + "\" doesn't have a slug set.");
            url = URI_1.URI.resolve(url, slug);
            documentPaths = Utils_1.isObject(containerPath) ? containerPath.paths : null;
        }
        return this.resolve(url);
    };
    DocumentsContext.prototype._extendPaths = function (paths) {
        this._settings.paths = DocumentsContext._mergePaths(this._settings.paths, paths);
    };
    DocumentsContext.prototype._extendsSettings = function (settings) {
        this._extendPaths(settings.paths);
        delete settings.paths;
        Utils_1.ObjectUtils.extend(this._settings, settings);
    };
    return DocumentsContext;
}(AbstractContext_1.AbstractContext));
exports.DocumentsContext = DocumentsContext;


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = __webpack_require__(37);
var GeneralRegistry_1 = __webpack_require__(110);
var ModelDecorator_1 = __webpack_require__(4);
var URI_1 = __webpack_require__(8);
var Registry_1 = __webpack_require__(40);
exports.DocumentsRegistry = {
    PROTOTYPE: {
        register: function (id) {
            return this.getPointer(id, true);
        },
        _getLocalID: function (id) {
            if (URI_1.URI.hasFragment(id))
                Registry_1.Registry.PROTOTYPE._getLocalID.call(this, id);
            return GeneralRegistry_1.GeneralRegistry.PROTOTYPE._getLocalID.call(this, id);
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.DocumentsRegistry.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.DocumentsRegistry.isDecorated(object))
            return object;
        var base = Object.assign(object, {
            __modelDecorator: Document_1.Document,
        });
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(base, GeneralRegistry_1.GeneralRegistry);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.DocumentsRegistry.PROTOTYPE, target);
    },
    create: function (data) {
        return exports.DocumentsRegistry.createFrom(__assign({}, data));
    },
    createFrom: function (object) {
        var registry = exports.DocumentsRegistry.decorate(object);
        return GeneralRegistry_1.GeneralRegistry.createFrom(registry);
    },
};


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ModelDecorator_1 = __webpack_require__(4);
var QueryablePointer_1 = __webpack_require__(38);
var Node_1 = __webpack_require__(43);
var URI_1 = __webpack_require__(8);
var C_1 = __webpack_require__(3);
var DigestedObjectSchema_1 = __webpack_require__(15);
var ObjectSchemaDigester_1 = __webpack_require__(29);
function __getSchemaForNode($context, node) {
    var types = Node_1.RDFNode.getTypes(node);
    return __getSchema($context, types, node["@id"]);
}
function __getSchemaForResource($context, resource) {
    var types = resource.types || [];
    return __getSchema($context, types, resource.$id);
}
function __getSchema($context, objectTypes, objectID) {
    if (!$context)
        return new DigestedObjectSchema_1.DigestedObjectSchema();
    if (objectID !== void 0 && !URI_1.URI.hasFragment(objectID) && !URI_1.URI.isBNodeID(objectID) && objectTypes.indexOf(C_1.C.Document) === -1)
        objectTypes = objectTypes.concat(C_1.C.Document);
    var objectSchemas = objectTypes
        .filter(function (type) { return $context.hasObjectSchema(type); })
        .map(function (type) { return $context.getObjectSchema(type); });
    return ObjectSchemaDigester_1.ObjectSchemaDigester
        ._combineSchemas([
        $context.getObjectSchema()
    ].concat(objectSchemas));
}
exports.ObjectSchemaResolver = {
    PROTOTYPE: {
        $context: undefined,
        getGeneralSchema: function () {
            if (!this.$context)
                return new DigestedObjectSchema_1.DigestedObjectSchema();
            return this.$context.getObjectSchema();
        },
        hasSchemaFor: function (object, path) {
            return !path;
        },
        getSchemaFor: function (object) {
            var schema = "types" in object || "$id" in object ?
                __getSchemaForResource(this.$context, object) :
                __getSchemaForNode(this.$context, object);
            if (!QueryablePointer_1.QueryablePointer.isDecorated(object) || !object.isQueried())
                return schema;
            return ObjectSchemaDigester_1.ObjectSchemaDigester
                ._combineSchemas([
                schema,
                object._queryableMetadata.schema,
            ]);
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator.hasPropertiesFrom(exports.ObjectSchemaResolver.PROTOTYPE, object);
    },
    decorate: function (object) {
        return ModelDecorator_1.ModelDecorator.definePropertiesFrom(exports.ObjectSchemaResolver.PROTOTYPE, object);
    },
};


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ModelDecorator_1 = __webpack_require__(4);
var Utils_1 = __webpack_require__(0);
var EventEmitterDocumentsRepositoryTrait_1 = __webpack_require__(224);
var QueryableDocumentsRepositoryTrait_1 = __webpack_require__(226);
var SPARQLDocumentsRepositoryTrait_1 = __webpack_require__(233);
exports.DocumentsRepository = {
    create: function (data) {
        return exports.DocumentsRepository.createFrom(__assign({}, data));
    },
    createFrom: function (object) {
        return ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, QueryableDocumentsRepositoryTrait_1.QueryableDocumentsRepositoryTrait, SPARQLDocumentsRepositoryTrait_1.SPARQLDocumentsRepositoryTrait, EventEmitterDocumentsRepositoryTrait_1.EventEmitterDocumentsRepositoryTrait);
    },
    is: function (value) {
        return Utils_1.isObject(value)
            && QueryableDocumentsRepositoryTrait_1.QueryableDocumentsRepositoryTrait.isDecorated(value)
            && SPARQLDocumentsRepositoryTrait_1.SPARQLDocumentsRepositoryTrait.isDecorated(value)
            && EventEmitterDocumentsRepositoryTrait_1.EventEmitterDocumentsRepositoryTrait.isDecorated(value);
    },
};


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GeneralRepository_1 = __webpack_require__(77);
var Event_1 = __webpack_require__(74);
var Utils_1 = __webpack_require__(111);
var ModelDecorator_1 = __webpack_require__(4);
var Utils_2 = __webpack_require__(0);
exports.EventEmitterDocumentsRepositoryTrait = {
    PROTOTYPE: {
        on: function (event, uriPattern, onEvent, onError) {
            try {
                var destination = Utils_1.createDestination(event, uriPattern, this.$context.baseURI);
                this.$context.messaging.subscribe(destination, onEvent, onError);
            }
            catch (error) {
                if (!onError)
                    throw error;
                onError(error);
            }
        },
        off: function (event, uriPattern, onEvent, onError) {
            try {
                var destination = Utils_1.createDestination(event, uriPattern, this.$context.baseURI);
                this.$context.messaging.unsubscribe(destination, onEvent);
            }
            catch (error) {
                if (!onError)
                    throw error;
                onError(error);
            }
        },
        one: function (event, uriPattern, onEvent, onError) {
            var _this = this;
            try {
                var destination_1 = Utils_1.createDestination(event, uriPattern, this.$context.baseURI);
                var onEventWrapper_1 = function (message) {
                    onEvent(message);
                    _this.$context.messaging.unsubscribe(destination_1, onEventWrapper_1);
                };
                this.$context.messaging.subscribe(destination_1, onEventWrapper_1, onError);
            }
            catch (error) {
                if (!onError)
                    throw error;
                onError(error);
            }
        },
        onChildCreated: function (uriPattern, onEvent, onError) {
            return this.on(Event_1.Event.CHILD_CREATED, uriPattern, onEvent, onError);
        },
        onDocumentModified: function (uriPattern, onEvent, onError) {
            return this.on(Event_1.Event.DOCUMENT_MODIFIED, uriPattern, onEvent, onError);
        },
        onDocumentDeleted: function (uriPattern, onEvent, onError) {
            return this.on(Event_1.Event.DOCUMENT_DELETED, uriPattern, onEvent, onError);
        },
        onMemberAdded: function (uriPattern, onEvent, onError) {
            return this.on(Event_1.Event.MEMBER_ADDED, uriPattern, onEvent, onError);
        },
        onMemberRemoved: function (uriPattern, onEvent, onError) {
            return this.on(Event_1.Event.MEMBER_REMOVED, uriPattern, onEvent, onError);
        },
    },
    isDecorated: function (object) {
        return Utils_2.isObject(object)
            && ModelDecorator_1.ModelDecorator
                .hasPropertiesFrom(exports.EventEmitterDocumentsRepositoryTrait.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.EventEmitterDocumentsRepositoryTrait.isDecorated(object))
            return object;
        var resource = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, GeneralRepository_1.GeneralRepository);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.EventEmitterDocumentsRepositoryTrait.PROTOTYPE, resource);
    },
};


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NotImplementedError_1 = __webpack_require__(54);
var ModelDecorator_1 = __webpack_require__(4);
function __throwNotImplemented() {
    return Promise.reject(new NotImplementedError_1.NotImplementedError("Must be implemented for a specific repository implementation."));
}
exports.Repository = {
    PROTOTYPE: {
        get: __throwNotImplemented,
        resolve: __throwNotImplemented,
        exists: __throwNotImplemented,
        refresh: __throwNotImplemented,
        save: __throwNotImplemented,
        saveAndRefresh: __throwNotImplemented,
        delete: __throwNotImplemented,
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.Repository.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.Repository.isDecorated(object))
            return;
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.Repository.PROTOTYPE, object);
    },
};


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(5);
var IllegalArgumentError_1 = __webpack_require__(2);
var IllegalStateError_1 = __webpack_require__(31);
var FreeResources_1 = __webpack_require__(39);
var Request_1 = __webpack_require__(28);
var JSONLDCompacter_1 = __webpack_require__(78);
var JSONLDParser_1 = __webpack_require__(44);
var ResponseMetadata_1 = __webpack_require__(60);
var ModelDecorator_1 = __webpack_require__(4);
var Pointer_1 = __webpack_require__(13);
var QueryableMetadata_1 = __webpack_require__(112);
var QueryablePointer_1 = __webpack_require__(38);
var QueryContextBuilder_1 = __webpack_require__(113);
var QueryContextPartial_1 = __webpack_require__(115);
var QueryDocumentBuilder_1 = __webpack_require__(116);
var QueryDocumentsBuilder_1 = __webpack_require__(230);
var QueryMetadata_1 = __webpack_require__(117);
var QueryProperty_1 = __webpack_require__(58);
var Utils_1 = __webpack_require__(46);
var Document_1 = __webpack_require__(59);
var URI_1 = __webpack_require__(8);
var SPARQLService_1 = __webpack_require__(80);
var Utils_2 = __webpack_require__(0);
var C_1 = __webpack_require__(3);
var LDP_1 = __webpack_require__(45);
var Utils_3 = __webpack_require__(27);
var LDPDocumentsRepositoryTrait_1 = __webpack_require__(231);
var emptyQueryBuildFn = function (_) { return _; };
function __executePatterns(repository, url, requestOptions, queryContext, targetName, constructPatterns, target) {
    var _a, _b;
    var metadataVar = queryContext.getVariable("metadata");
    var construct = (_a = new tokens_1.ConstructToken()
        .addTriple(new tokens_1.SubjectToken(metadataVar)
        .addPredicate(new tokens_1.PredicateToken("a")
        .addObject(queryContext.compactIRI(C_1.C.VolatileResource))
        .addObject(queryContext.compactIRI(C_1.C.QueryMetadata)))
        .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(C_1.C.target))
        .addObject(queryContext.getVariable(targetName))))
        .addPattern(new tokens_1.BindToken("BNODE()", metadataVar))).addPattern.apply(_a, constructPatterns);
    var query = (_b = new tokens_1.QueryToken(construct)).addPrologues.apply(_b, queryContext.getPrologues());
    var triples = Utils_1.getAllTriples(constructPatterns);
    construct.addTriple.apply(construct, triples);
    Request_1.RequestUtils.setRetrievalPreferences({ include: [C_1.C.PreferResultsContext] }, requestOptions);
    return SPARQLService_1.SPARQLService
        .executeRawCONSTRUCTQuery(url, query.toString(), requestOptions)
        .then(function (_a) {
        var strConstruct = _a[0];
        return strConstruct;
    })
        .then(function (jsonldString) {
        return new JSONLDParser_1.JSONLDParser().parse(jsonldString);
    })
        .then(function (rdfNodes) {
        var freeNodes = Document_1.RDFDocument.getFreeNodes(rdfNodes);
        var freeResources;
        try {
            freeResources = FreeResources_1.FreeResources.parseFreeNodes(repository.$context.registry, freeNodes);
        }
        catch (e) {
            throw e;
        }
        var targetSet = new Set(freeResources
            .getPointers(true)
            .filter(QueryMetadata_1.QueryMetadata.is)
            .map(function (x) { return x.target; })
            .reduce(function (targets, currentTargets) { return targets.concat(currentTargets); }, [])
            .map(function (x) { return x.$id; }));
        var targetETag = target && target.$eTag;
        if (target)
            target.$eTag = void 0;
        freeResources
            .getPointers(true)
            .filter(ResponseMetadata_1.ResponseMetadata.is)
            .map(function (responseMetadata) { return responseMetadata.documentsMetadata || responseMetadata[C_1.C.documentMetadata]; })
            .map(function (documentsMetadata) { return Array.isArray(documentsMetadata) ? documentsMetadata : [documentsMetadata]; })
            .forEach(function (documentsMetadata) { return documentsMetadata.forEach(function (documentMetadata) {
            if (!documentMetadata)
                return;
            var relatedDocument = documentMetadata.relatedDocument || documentMetadata[C_1.C.relatedDocument];
            var eTag = documentMetadata.eTag || documentMetadata[C_1.C.eTag];
            if (!eTag)
                return;
            relatedDocument._resolved = true;
            if (relatedDocument.$eTag === void 0)
                relatedDocument.$eTag = eTag;
            if (relatedDocument.$eTag !== eTag)
                relatedDocument.$eTag = null;
        }); });
        if (targetETag && targetETag === target.$eTag)
            return [target];
        var rdfDocuments = rdfNodes
            .filter(Document_1.RDFDocument.is);
        var targetDocuments = rdfDocuments
            .filter(function (x) { return targetSet.has(x["@id"]); });
        return new JSONLDCompacter_1.JSONLDCompacter(repository.$context.registry, targetName, queryContext)
            .compactDocuments(rdfDocuments, targetDocuments);
    })
        .catch(Utils_3._getErrorResponseParserFn(repository.$context.registry));
}
function __executeBuilder(repository, url, requestOptions, queryContext, targetProperty, queryBuilderFn, target) {
    var Builder = targetProperty.name === "document" ?
        QueryDocumentBuilder_1.QueryDocumentBuilder : QueryDocumentsBuilder_1.QueryDocumentsBuilder;
    var queryBuilder = new Builder(queryContext, targetProperty);
    targetProperty.setType(queryBuilderFn ?
        queryBuilderFn === emptyQueryBuildFn ?
            QueryProperty_1.QueryPropertyType.EMPTY :
            QueryProperty_1.QueryPropertyType.PARTIAL :
        QueryProperty_1.QueryPropertyType.FULL);
    if (queryBuilderFn && queryBuilderFn.call(void 0, queryBuilder) !== queryBuilder)
        throw new IllegalArgumentError_1.IllegalArgumentError("The provided query builder was not returned");
    var constructPatterns = targetProperty.getPatterns();
    return __executePatterns(repository, url, requestOptions, queryContext, targetProperty.name, constructPatterns, target)
        .then(function (documents) {
        if (!(queryBuilder instanceof QueryDocumentsBuilder_1.QueryDocumentsBuilder && queryBuilder._orderData))
            return documents;
        var _a = queryBuilder._orderData, path = _a.path, flow = _a.flow;
        var inverter = flow === "DESC" ? -1 : 1;
        return documents.sort(function (a, b) {
            a = Utils_1.getPathProperty(a, path);
            b = Utils_1.getPathProperty(b, path);
            var aValue = Pointer_1.Pointer.is(a) ? a.$id : a;
            var bValue = Pointer_1.Pointer.is(b) ? b.$id : b;
            if (aValue === bValue)
                return 0;
            if (aValue === void 0)
                return -1 * inverter;
            if (bValue === void 0)
                return inverter;
            if (!Utils_1.areDifferentType(a, b)) {
                if (Pointer_1.Pointer.is(a)) {
                    var aIsBNode = URI_1.URI.isBNodeID(aValue);
                    var bIsBNode = URI_1.URI.isBNodeID(bValue);
                    if (aIsBNode && !bIsBNode)
                        return -1 * inverter;
                    if (bIsBNode && !aIsBNode)
                        return inverter;
                }
            }
            else {
                if (Pointer_1.Pointer.is(a))
                    return -1 * inverter;
                if (Pointer_1.Pointer.is(b))
                    return inverter;
                if (Utils_2.isNumber(a))
                    return -1 * inverter;
                if (Utils_2.isNumber(b))
                    return inverter;
                if (Utils_2.isDate(a))
                    return -1 * inverter;
                if (Utils_2.isDate(b))
                    return inverter;
                if (Utils_2.isBoolean(a))
                    return -1 * inverter;
                if (Utils_2.isBoolean(b))
                    return inverter;
                if (Utils_2.isString(a))
                    return -1 * inverter;
                if (Utils_2.isString(b))
                    return inverter;
            }
            if (aValue < bValue)
                return -1 * inverter;
            if (aValue > bValue)
                return inverter;
        });
    });
}
function __getQueryable(repository, uri, requestOptions, queryBuilderFn, target) {
    if (!repository.$context.registry.inScope(uri, true))
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
    var url = repository.$context.getObjectSchema().resolveURI(uri, { base: true });
    var queryContext = new QueryContextBuilder_1.QueryContextBuilder(repository.$context);
    var documentProperty = queryContext
        .addProperty("document")
        .setOptional(false);
    var propertyValue = new tokens_1.ValuesToken().addValues(documentProperty.variable, queryContext.compactIRI(uri));
    documentProperty.addPattern(propertyValue);
    Request_1.RequestUtils.setRetrievalPreferences({ include: [C_1.C.PreferDocumentETags] }, requestOptions);
    return __executeBuilder(repository, url, requestOptions, queryContext, documentProperty, queryBuilderFn, target)
        .then(function (documents) { return documents[0]; });
}
function __addRefreshPatterns(queryContext, parentAdder, resource, parentName) {
    if (resource._queryableMetadata.schema === QueryableMetadata_1.QueryableMetadata.ALL) {
        parentAdder.addPattern(Utils_1.createAllPattern(queryContext, parentName));
        return;
    }
    parentAdder.addPattern(Utils_1.createTypesPattern(queryContext, parentName));
    resource._queryableMetadata.schema.properties.forEach(function (digestedProperty, propertyName) {
        var _a;
        var path = parentName + "." + propertyName;
        var propertyPattern = (_a = new tokens_1.OptionalToken()).addPattern.apply(_a, Utils_1.createPropertyPatterns(queryContext, parentName, path, digestedProperty));
        parentAdder.addPattern(propertyPattern);
        var propertyValues = Array.isArray(resource[propertyName]) ? resource[propertyName] : [resource[propertyName]];
        var propertyFragment = propertyValues
            .filter(QueryablePointer_1.QueryablePointer.is)
            .find(function (fragment) { return fragment.isQueried(); });
        if (!propertyFragment)
            return;
        __addRefreshPatterns(queryContext, propertyPattern, propertyFragment, path);
    });
}
function __refreshQueryable(repository, document, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    if (!repository.$context.registry.inScope(document.$id, true))
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + document.$id + "\" is out of scope."));
    var url = repository.$context.getObjectSchema().resolveURI(document.$id, { base: true });
    var queryContext = new QueryContextPartial_1.QueryContextPartial(document, repository.$context);
    var targetName = "document";
    var constructPatterns = new tokens_1.OptionalToken()
        .addPattern(new tokens_1.ValuesToken()
        .addValues(queryContext.getVariable(targetName), new tokens_1.IRIToken(url)));
    __addRefreshPatterns(queryContext, constructPatterns, document, targetName);
    Request_1.RequestUtils.setRetrievalPreferences({ include: [C_1.C.PreferDocumentETags] }, requestOptions);
    return __executePatterns(repository, url, requestOptions, queryContext, targetName, constructPatterns.patterns, document)
        .then(function (documents) { return documents[0]; });
}
function __executeChildrenBuilder(repository, uri, requestOptions, queryBuilderFn) {
    if (!repository.$context.registry.inScope(uri, true))
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
    var url = repository.$context.getObjectSchema().resolveURI(uri, { base: true });
    var queryContext = new QueryContextBuilder_1.QueryContextBuilder(repository.$context);
    var childrenProperty = queryContext
        .addProperty("child")
        .setOptional(false);
    var selectChildren = new tokens_1.SelectToken("DISTINCT")
        .addVariable(childrenProperty.variable)
        .addPattern(new tokens_1.SubjectToken(queryContext.compactIRI(url))
        .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(LDP_1.LDP.contains))
        .addObject(childrenProperty.variable)));
    childrenProperty.addPattern(selectChildren);
    return __executeBuilder(repository, url, requestOptions, queryContext, childrenProperty, queryBuilderFn);
}
function __executeMembersBuilder(repository, uri, requestOptions, queryBuilderFn) {
    if (!repository.$context.registry.inScope(uri, true))
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
    var url = repository.$context.getObjectSchema().resolveURI(uri, { base: true });
    var queryContext = new QueryContextBuilder_1.QueryContextBuilder(repository.$context);
    var membersProperty = queryContext
        .addProperty("member")
        .setOptional(false);
    var membershipResource = queryContext.getVariable("membershipResource");
    var hasMemberRelation = queryContext.getVariable("hasMemberRelation");
    var selectMembers = new tokens_1.SelectToken("DISTINCT")
        .addVariable(membersProperty.variable)
        .addPattern(new tokens_1.SubjectToken(queryContext.compactIRI(url))
        .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(LDP_1.LDP.membershipResource))
        .addObject(membershipResource))
        .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(LDP_1.LDP.hasMemberRelation))
        .addObject(hasMemberRelation)))
        .addPattern(new tokens_1.SubjectToken(membershipResource)
        .addPredicate(new tokens_1.PredicateToken(hasMemberRelation)
        .addObject(membersProperty.variable)));
    membersProperty.addPattern(selectMembers);
    return __executeBuilder(repository, url, requestOptions, queryContext, membersProperty, queryBuilderFn);
}
exports.QueryableDocumentsRepositoryTrait = {
    PROTOTYPE: {
        get: function (uri, requestOptionsOrQueryBuilderFn, queryBuilderFn) {
            var requestOptions = Utils_2.isObject(requestOptionsOrQueryBuilderFn) ?
                requestOptionsOrQueryBuilderFn : {};
            queryBuilderFn = Utils_2.isFunction(requestOptionsOrQueryBuilderFn) ?
                requestOptionsOrQueryBuilderFn : queryBuilderFn;
            var target = this.$context.registry.hasPointer(uri) ?
                this.$context.registry.getPointer(uri, true) :
                void 0;
            if (queryBuilderFn) {
                var types_1 = target ? target.types : [];
                return __getQueryable(this, uri, requestOptions, function (_) {
                    types_1.forEach(function (type) { return _.withType(type); });
                    return queryBuilderFn.call(void 0, _);
                });
            }
            if (target && target.isQueried())
                requestOptions.ensureLatest = true;
            return LDPDocumentsRepositoryTrait_1.LDPDocumentsRepositoryTrait.PROTOTYPE
                .get.call(this, uri, requestOptions);
        },
        resolve: function (document, requestOptionsOrQueryBuilderFn, queryBuilderFn) {
            return this.get(document.$id, requestOptionsOrQueryBuilderFn, queryBuilderFn);
        },
        refresh: function (document, requestOptions) {
            if (!document.isQueried())
                return LDPDocumentsRepositoryTrait_1.LDPDocumentsRepositoryTrait.PROTOTYPE
                    .refresh.call(this, document, requestOptions);
            return __refreshQueryable(this, document, requestOptions);
        },
        saveAndRefresh: function (document, requestOptions) {
            var _this = this;
            if (!document._queryableMetadata)
                return LDPDocumentsRepositoryTrait_1.LDPDocumentsRepositoryTrait.PROTOTYPE
                    .saveAndRefresh.call(this, document, requestOptions);
            if (document.$eTag === null)
                return Promise.reject(new IllegalStateError_1.IllegalStateError("The document \"" + document.$id + "\" is locally outdated and cannot be saved."));
            var cloneOptions = Request_1.RequestUtils.cloneOptions(requestOptions || {});
            return this.save(document, cloneOptions)
                .then(function (doc) {
                return __refreshQueryable(_this, doc, requestOptions);
            });
        },
        getChildren: function (uri, requestOptionsOrQueryBuilderFn, queryBuilderFn) {
            var requestOptions = Utils_2.isObject(requestOptionsOrQueryBuilderFn) ?
                requestOptionsOrQueryBuilderFn : {};
            queryBuilderFn = Utils_2.isFunction(requestOptionsOrQueryBuilderFn) ?
                requestOptionsOrQueryBuilderFn : queryBuilderFn;
            Request_1.RequestUtils.setRetrievalPreferences({ include: [C_1.C.PreferDocumentETags] }, requestOptions);
            return __executeChildrenBuilder(this, uri, requestOptions, queryBuilderFn);
        },
        getMembers: function (uri, requestOptionsOrQueryBuilderFn, queryBuilderFn) {
            var requestOptions = Utils_2.isObject(requestOptionsOrQueryBuilderFn) ?
                requestOptionsOrQueryBuilderFn : {};
            queryBuilderFn = Utils_2.isFunction(requestOptionsOrQueryBuilderFn) ?
                requestOptionsOrQueryBuilderFn : queryBuilderFn;
            Request_1.RequestUtils.setRetrievalPreferences({ include: [C_1.C.PreferDocumentETags] }, requestOptions);
            return __executeMembersBuilder(this, uri, requestOptions, queryBuilderFn);
        },
        listChildren: function (uri, requestOptions) {
            if (requestOptions === void 0) { requestOptions = {}; }
            return __executeChildrenBuilder(this, uri, requestOptions, emptyQueryBuildFn);
        },
        listMembers: function (uri, requestOptions) {
            if (requestOptions === void 0) { requestOptions = {}; }
            return __executeMembersBuilder(this, uri, requestOptions, emptyQueryBuildFn);
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.QueryableDocumentsRepositoryTrait.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.QueryableDocumentsRepositoryTrait.isDecorated(object))
            return object;
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, LDPDocumentsRepositoryTrait_1.LDPDocumentsRepositoryTrait);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.QueryableDocumentsRepositoryTrait.PROTOTYPE, target);
    },
};


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(5);
var QueryVariable = (function (_super) {
    __extends(QueryVariable, _super);
    function QueryVariable(name, index) {
        var _this = _super.call(this, name
            .replace(/[.]/g, "__")
            .replace(/[^0-9A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/g, "_")) || this;
        _this.index = index;
        return _this;
    }
    QueryVariable.prototype.toString = function () {
        if (true)
            return "?_" + this.index;
        return _super.prototype.toString.call(this);
    };
    return QueryVariable;
}(tokens_1.VariableToken));
exports.QueryVariable = QueryVariable;


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = __webpack_require__(23);
var tokens_1 = __webpack_require__(5);
var Utils_1 = __webpack_require__(0);
var QueryObject = (function () {
    function QueryObject(context, object) {
        this._context = context;
        var id = Utils_1.isString(object) ? object : object.$id;
        this._resource = iri_1.isBNodeLabel(id) ? new tokens_1.BlankNodeToken(id) : this._context.compactIRI(id);
    }
    QueryObject.prototype.getToken = function () {
        return this._resource;
    };
    QueryObject.prototype.toString = function () {
        return "" + this._resource;
    };
    return QueryObject;
}());
exports.QueryObject = QueryObject;


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = __webpack_require__(23);
var tokens_1 = __webpack_require__(5);
var IllegalArgumentError_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(0);
var XSD_1 = __webpack_require__(11);
var QueryValue = (function () {
    function QueryValue(context, value) {
        this._value = value;
        this._context = context;
        if (Utils_1.isDate(value)) {
            this._literal = new tokens_1.LiteralToken();
            this.withType(XSD_1.XSD.dateTime);
        }
        else {
            this._literal = new tokens_1.LiteralToken(value);
        }
    }
    QueryValue.prototype.withType = function (type) {
        if (!iri_1.isAbsolute(type)) {
            if (!XSD_1.XSD.hasOwnProperty(type))
                throw new IllegalArgumentError_1.IllegalArgumentError("Invalid type provided.");
            type = XSD_1.XSD[type];
        }
        var value = this._context.serializeLiteral(type, this._value);
        this._literal.setValue(value);
        this._literal.setType(this._context.compactIRI(type));
        return this;
    };
    QueryValue.prototype.withLanguage = function (language) {
        this._literal.setLanguage(language);
        return this;
    };
    QueryValue.prototype.getToken = function () {
        return this._literal;
    };
    QueryValue.prototype.toString = function () {
        return "" + this._literal;
    };
    return QueryValue;
}());
exports.QueryValue = QueryValue;


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(5);
var IllegalArgumentError_1 = __webpack_require__(2);
var IllegalStateError_1 = __webpack_require__(31);
var QueryDocumentBuilder_1 = __webpack_require__(116);
var Utils_1 = __webpack_require__(46);
var QueryDocumentsBuilder = (function (_super) {
    __extends(QueryDocumentsBuilder, _super);
    function QueryDocumentsBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryDocumentsBuilder.prototype.orderBy = function (property, flow) {
        var propertyObj = this.property(property);
        var select = this._document.getPatterns().find(function (pattern) { return pattern.token === "select"; });
        if (!select)
            throw new IllegalStateError_1.IllegalStateError("A sub-select token has not been defined.");
        this._orderData = void 0;
        var orderIndex = select.modifiers.findIndex(function (pattern) { return pattern.token === "order"; });
        if (orderIndex !== -1) {
            select.modifiers.splice(orderIndex, 1);
            var optionalIndex = select.patterns.findIndex(function (pattern) { return pattern.token === "optional"; });
            select.patterns.splice(optionalIndex, 1);
        }
        var validatedFlow = parseFlowString(flow);
        select.modifiers.unshift(new tokens_1.OrderToken(propertyObj.variable, validatedFlow));
        var orderData = {
            path: propertyObj.name
                .split(".")
                .slice(1)
                .join("."),
            flow: validatedFlow,
        };
        var propertyPatternsPath;
        while (propertyObj !== this._document) {
            var propertyTriple = propertyObj && propertyObj.getTriple();
            if (!propertyTriple)
                throw new IllegalArgumentError_1.IllegalArgumentError("The property \"" + propertyObj.name + "\" is not a valid property defined by the builder.");
            var propertyPattern = new tokens_1.OptionalToken()
                .addPattern(propertyTriple);
            if (propertyPatternsPath)
                propertyPattern.addPattern(propertyPatternsPath);
            propertyPatternsPath = propertyPattern;
            propertyObj = this._context.getProperty(Utils_1.getParentPath(propertyObj.name));
        }
        this._orderData = orderData;
        select.addPattern(propertyPatternsPath);
        return this;
    };
    QueryDocumentsBuilder.prototype.limit = function (limit) {
        var select = this._document.getPatterns().find(function (pattern) { return pattern.token === "select"; });
        if (!select)
            throw new IllegalStateError_1.IllegalStateError("A sub-select token has not been defined.");
        var limitIndex = select.modifiers.findIndex(function (pattern) { return pattern.token === "limit"; });
        if (limitIndex !== -1)
            select.modifiers.splice(limitIndex, 1);
        select.modifiers.push(new tokens_1.LimitToken(limit));
        return this;
    };
    QueryDocumentsBuilder.prototype.offset = function (offset) {
        var select = this._document.getPatterns().find(function (pattern) { return pattern.token === "select"; });
        if (!select)
            throw new IllegalStateError_1.IllegalStateError("A sub-select token has not been defined.");
        var offsetIndex = select.modifiers.findIndex(function (pattern) { return pattern.token === "offset"; });
        if (offsetIndex !== -1)
            select.modifiers.splice(offsetIndex, 1);
        select.modifiers.push(new tokens_1.OffsetToken(offset));
        return this;
    };
    return QueryDocumentsBuilder;
}(QueryDocumentBuilder_1.QueryDocumentBuilder));
exports.QueryDocumentsBuilder = QueryDocumentsBuilder;
function parseFlowString(flow) {
    if (flow === void 0)
        return void 0;
    var upperCase = flow
        .toUpperCase();
    switch (upperCase) {
        case "ASC":
        case "DESC":
            return upperCase;
        case "ASCENDING":
        case "DESCENDING":
            return upperCase
                .slice(0, -6);
        default:
            throw new IllegalArgumentError_1.IllegalArgumentError("Invalid flow order.");
    }
}


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TransientDocument_1 = __webpack_require__(30);
var IllegalArgumentError_1 = __webpack_require__(2);
var FreeResources_1 = __webpack_require__(39);
var BadResponseError_1 = __webpack_require__(55);
var Request_1 = __webpack_require__(28);
var JSONLDCompacter_1 = __webpack_require__(78);
var JSONLDParser_1 = __webpack_require__(44);
var AddMemberAction_1 = __webpack_require__(81);
var RemoveMemberAction_1 = __webpack_require__(82);
var ResponseMetadata_1 = __webpack_require__(60);
var DeltaCreator_1 = __webpack_require__(120);
var ModelDecorator_1 = __webpack_require__(4);
var Pointer_1 = __webpack_require__(13);
var Document_1 = __webpack_require__(59);
var ResolvablePointer_1 = __webpack_require__(24);
var Utils_1 = __webpack_require__(0);
var C_1 = __webpack_require__(3);
var LDP_1 = __webpack_require__(45);
var Utils_2 = __webpack_require__(27);
var HTTPRepositoryTrait_1 = __webpack_require__(232);
var __JSONLD_PARSER = new JSONLDParser_1.JSONLDParser();
function __setDefaultRequestOptions(requestOptions, interactionModel) {
    if (interactionModel)
        Request_1.RequestUtils.setPreferredInteractionModel(interactionModel, requestOptions);
    Request_1.RequestUtils.setAcceptHeader("application/ld+json", requestOptions);
}
function __getTargetID(id, response) {
    var locationHeader = response.getHeader("Content-Location");
    if (!locationHeader)
        return id;
    if (locationHeader.values.length !== 1)
        throw new BadResponseError_1.BadResponseError("The response must contain one Content-Location header.", response);
    var locationString = "" + locationHeader;
    if (!locationString)
        throw new BadResponseError_1.BadResponseError("The response doesn't contain a valid 'Content-Location' header.", response);
    return locationString;
}
function __getErrorResponseParserFnFrom(repository) {
    return Utils_2._getErrorResponseParserFn(repository.$context.registry);
}
function __changeNodesID(resource, map) {
    map
        .entries
        .forEach(function (_a) {
        var entryKey = _a.entryKey, entryValue = _a.entryValue;
        var node = resource
            .getPointer(entryKey.$id, true);
        resource.removePointer(entryKey.$id);
        node.$id = entryValue.$id;
        resource._addPointer(node);
    });
}
function __applyResponseMetadata(repository, freeNodes) {
    if (!freeNodes.length)
        return;
    var freeResources = FreeResources_1.FreeResources.parseFreeNodes(repository.$context.registry, freeNodes);
    var responseMetadata = freeResources
        .getPointers(true)
        .find(ResponseMetadata_1.ResponseMetadata.is);
    responseMetadata
        .documentsMetadata
        .forEach(function (metadata) { return __changeNodesID(metadata.relatedDocument, metadata.bNodesMap); });
}
function __applyResponseRepresentation(repository, resource, response) {
    if (response.status === 204 || !response.data)
        return resource;
    return __JSONLD_PARSER
        .parse(response.data)
        .then(function (expandedResult) {
        var freeNodes = Document_1.RDFDocument.getFreeNodes(expandedResult);
        __applyResponseMetadata(repository, freeNodes);
        var preferenceHeader = response.getHeader("Preference-Applied");
        if (preferenceHeader === null || preferenceHeader.toString() !== "return=representation")
            return resource;
        return repository._parseResponseData(response, resource.$id);
    });
}
function __isInvalidChild(child) {
    return ResolvablePointer_1.ResolvablePointer.is(child);
}
function __isPersistingChild(object) {
    return object["__CarbonLDP_persisting__"];
}
function __createChild(repository, parentURI, requestOptions, child, slug) {
    if (ResolvablePointer_1.ResolvablePointer.is(child))
        throw new IllegalArgumentError_1.IllegalArgumentError("Cannot persist an already resolvable pointer.");
    var transient = TransientDocument_1.TransientDocument.is(child) ?
        child : TransientDocument_1.TransientDocument.decorate(child);
    transient._normalize();
    transient.$registry = repository.$context.registry;
    var body = JSON.stringify(transient);
    if (!!slug)
        Request_1.RequestUtils.setSlug(slug, requestOptions);
    Object.defineProperty(transient, "__CarbonLDP_persisting__", { configurable: true, value: true });
    return Request_1.RequestService
        .post(parentURI, body, requestOptions)
        .then(function (response) {
        delete transient["__CarbonLDP_persisting__"];
        var locationHeader = response.getHeader("Location");
        if (locationHeader === null || locationHeader.values.length < 1)
            throw new BadResponseError_1.BadResponseError("The response is missing a Location header.", response);
        if (locationHeader.values.length !== 1)
            throw new BadResponseError_1.BadResponseError("The response contains more than one Location header.", response);
        transient.$id = locationHeader.values[0].toString();
        var document = repository.$context.registry._addPointer(transient);
        document
            .getFragments()
            .forEach(document.__modelDecorator.decorate);
        document._syncSnapshot();
        return __applyResponseRepresentation(repository, document, response);
    })
        .catch(function (error) {
        delete transient["__CarbonLDP_persisting__"];
        return __getErrorResponseParserFnFrom(repository)(error);
    });
}
function __createChildren(retrievalType, repository, uri, children, slugsOrOptions, requestOptions) {
    if (!repository.$context.registry.inScope(uri, true))
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
    var url = repository.$context.getObjectSchema().resolveURI(uri, { base: true });
    requestOptions = Request_1.RequestUtils.isOptions(slugsOrOptions) ?
        slugsOrOptions :
        requestOptions ? requestOptions : {};
    var slugs = Utils_1.isString(slugsOrOptions) || Array.isArray(slugsOrOptions) ?
        slugsOrOptions : null;
    __setDefaultRequestOptions(requestOptions, LDP_1.LDP.Container);
    Request_1.RequestUtils.setPreferredRetrieval(retrievalType, requestOptions);
    Request_1.RequestUtils.setContentTypeHeader("application/ld+json", requestOptions);
    if (!Array.isArray(children)) {
        if (__isInvalidChild(children))
            return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("The object is already a resolvable pointer."));
        if (__isPersistingChild(children))
            return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("The object is already being persisted."));
        return __createChild(repository, url, requestOptions, children, slugs ? slugs.toString() : null);
    }
    var invalidChild = children
        .findIndex(function (child) { return __isInvalidChild(child); });
    if (invalidChild !== -1)
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("The object in \"" + invalidChild + "\" is already a resolvable pointer."));
    var persistingChild = children
        .findIndex(function (child) { return __isPersistingChild(child); });
    if (persistingChild !== -1)
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("The object in \"" + persistingChild + "\" is already being persisted."));
    var promises = children.map(function (child, index) {
        var cloneOptions = Request_1.RequestUtils.cloneOptions(requestOptions);
        var slug = slugs && index < slugs.length ? slugs[index] : void 0;
        return __createChild(repository, url, cloneOptions, child, slug);
    });
    return Promise.all(promises);
}
function __sendPatch(repository, document, requestOptions) {
    if (!ResolvablePointer_1.ResolvablePointer.is(document))
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("The document isn't a resolvable pointer."));
    if (!repository.$context.registry.inScope(document.$id))
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + document.$id + "\" is out of scope."));
    var url = repository.$context.getObjectSchema().resolveURI(document.$id, { base: true });
    if (!document.isDirty())
        return Promise.resolve(document);
    document._normalize();
    __setDefaultRequestOptions(requestOptions);
    Request_1.RequestUtils.setContentTypeHeader("text/ldpatch", requestOptions);
    Request_1.RequestUtils.setIfMatchHeader(document.$eTag, requestOptions);
    var deltaCreator = new DeltaCreator_1.DeltaCreator(repository.$context);
    deltaCreator.addResource(document.$id, document._snapshot, document);
    document
        .getPointers(true)
        .forEach(function (pointer) {
        deltaCreator.addResource(pointer.$id, pointer._snapshot, pointer);
    });
    document.__savedFragments
        .filter(function (pointer) { return !document.hasPointer(pointer.$id); })
        .forEach(function (pointer) {
        deltaCreator.addResource(pointer.$id, pointer._snapshot, {});
    });
    var body = deltaCreator.getPatch();
    return Request_1.RequestService
        .patch(url, body, requestOptions)
        .then(function (response) {
        return __applyResponseRepresentation(repository, document, response);
    })
        .catch(__getErrorResponseParserFnFrom(repository));
}
function __parseMembers(registry, pointers) {
    return pointers
        .map(function (pointer) {
        if (Utils_1.isString(pointer))
            return registry.getPointer(pointer);
        if (Pointer_1.Pointer.is(pointer))
            return pointer;
    })
        .filter(function (pointer) { return !!pointer; });
}
function __sendAddAction(repository, uri, members, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    if (!repository.$context.registry.inScope(uri, true))
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
    var url = repository.$context.getObjectSchema().resolveURI(uri, { base: true });
    __setDefaultRequestOptions(requestOptions, LDP_1.LDP.Container);
    Request_1.RequestUtils.setContentTypeHeader("application/ld+json", requestOptions);
    var freeResources = FreeResources_1.FreeResources.createFrom({ $registry: repository.$context.registry });
    var targetMembers = __parseMembers(repository.$context.registry, members);
    freeResources._addPointer(AddMemberAction_1.AddMemberAction.createFrom({ targetMembers: targetMembers }));
    var body = JSON.stringify(freeResources);
    return Request_1.RequestService
        .put(url, body, requestOptions)
        .then(function () { })
        .catch(__getErrorResponseParserFnFrom(repository));
}
function __sendRemoveAction(repository, uri, members, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    if (!repository.$context.registry.inScope(uri, true))
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
    var url = repository.$context.getObjectSchema().resolveURI(uri, { base: true });
    __setDefaultRequestOptions(requestOptions, LDP_1.LDP.Container);
    Request_1.RequestUtils.setContentTypeHeader("application/ld+json", requestOptions);
    Request_1.RequestUtils.setRetrievalPreferences({
        include: [C_1.C.PreferSelectedMembershipTriples],
        omit: [C_1.C.PreferMembershipTriples],
    }, requestOptions);
    var freeResources = FreeResources_1.FreeResources.createFrom({ $registry: repository.$context.registry });
    var targetMembers = __parseMembers(repository.$context.registry, members);
    freeResources._addPointer(RemoveMemberAction_1.RemoveMemberAction.createFrom({ targetMembers: targetMembers }));
    var body = JSON.stringify(freeResources);
    return Request_1.RequestService
        .delete(url, body, requestOptions)
        .then(function () { })
        .catch(__getErrorResponseParserFnFrom(repository));
}
function __sendRemoveAll(repository, uri, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    if (!repository.$context.registry.inScope(uri, true))
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
    var url = repository.$context.getObjectSchema().resolveURI(uri, { base: true });
    __setDefaultRequestOptions(requestOptions, LDP_1.LDP.Container);
    Request_1.RequestUtils.setRetrievalPreferences({
        include: [
            C_1.C.PreferMembershipTriples,
        ],
        omit: [
            C_1.C.PreferMembershipResources,
            C_1.C.PreferContainmentTriples,
            C_1.C.PreferContainmentResources,
            C_1.C.PreferContainer,
        ],
    }, requestOptions);
    return Request_1.RequestService
        .delete(url, requestOptions)
        .then(function () { })
        .catch(__getErrorResponseParserFnFrom(repository));
}
exports.LDPDocumentsRepositoryTrait = {
    PROTOTYPE: {
        get: function (uri, requestOptions) {
            if (requestOptions === void 0) { requestOptions = {}; }
            __setDefaultRequestOptions(requestOptions, LDP_1.LDP.RDFSource);
            return HTTPRepositoryTrait_1.HTTPRepositoryTrait.PROTOTYPE
                .get.call(this, uri, requestOptions)
                .catch(__getErrorResponseParserFnFrom(this));
        },
        exists: function (uri, requestOptions) {
            if (requestOptions === void 0) { requestOptions = {}; }
            __setDefaultRequestOptions(requestOptions, LDP_1.LDP.RDFSource);
            return HTTPRepositoryTrait_1.HTTPRepositoryTrait.PROTOTYPE
                .exists.call(this, uri, requestOptions)
                .catch(__getErrorResponseParserFnFrom(this));
        },
        create: function (uri, children, slugsOrOptions, requestOptions) {
            return __createChildren("minimal", this, uri, children, slugsOrOptions, requestOptions);
        },
        createAndRetrieve: function (uri, children, slugsOrOptions, requestOptions) {
            return __createChildren("representation", this, uri, children, slugsOrOptions, requestOptions);
        },
        refresh: function (document, requestOptions) {
            if (requestOptions === void 0) { requestOptions = {}; }
            __setDefaultRequestOptions(requestOptions, LDP_1.LDP.RDFSource);
            Request_1.RequestUtils.setIfNoneMatchHeader(document.$eTag, requestOptions);
            return HTTPRepositoryTrait_1.HTTPRepositoryTrait.PROTOTYPE
                .refresh.call(this, document, requestOptions)
                .catch(__getErrorResponseParserFnFrom(this));
        },
        save: function (document, requestOptions) {
            if (requestOptions === void 0) { requestOptions = {}; }
            Request_1.RequestUtils.setPreferredRetrieval("minimal", requestOptions);
            return __sendPatch(this, document, requestOptions);
        },
        saveAndRefresh: function (document, requestOptions) {
            if (requestOptions === void 0) { requestOptions = {}; }
            Request_1.RequestUtils.setPreferredRetrieval("representation", requestOptions);
            return __sendPatch(this, document, requestOptions);
        },
        delete: function (uri, requestOptions) {
            if (requestOptions === void 0) { requestOptions = {}; }
            __setDefaultRequestOptions(requestOptions, LDP_1.LDP.RDFSource);
            return HTTPRepositoryTrait_1.HTTPRepositoryTrait.PROTOTYPE
                .delete.call(this, uri, requestOptions)
                .catch(__getErrorResponseParserFnFrom(this));
        },
        addMember: function (uri, member, requestOptions) {
            return __sendAddAction(this, uri, [member], requestOptions);
        },
        addMembers: function (uri, members, requestOptions) {
            return __sendAddAction(this, uri, members, requestOptions);
        },
        removeMember: function (uri, member, requestOptions) {
            return __sendRemoveAction(this, uri, [member], requestOptions);
        },
        removeMembers: function (uri, membersOrOptions, requestOptions) {
            if (Array.isArray(membersOrOptions))
                return __sendRemoveAction(this, uri, membersOrOptions, requestOptions);
            return __sendRemoveAll(this, uri, membersOrOptions || requestOptions);
        },
        _parseResponseData: function (response, id) {
            var _this = this;
            return __JSONLD_PARSER
                .parse(response.data)
                .then(function (rdfNodes) {
                var rdfDocuments = Document_1.RDFDocument
                    .getDocuments(rdfNodes);
                var documents = new JSONLDCompacter_1.JSONLDCompacter(_this.$context.registry)
                    .compactDocuments(rdfDocuments);
                id = __getTargetID(id, response);
                var target = documents.find(function (doc) { return doc.$id === id; });
                if (!target)
                    throw new BadResponseError_1.BadResponseError("No document \"" + id + "\" was returned.", response);
                target.$eTag = response.getETag();
                target._resolved = true;
                return target;
            });
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.LDPDocumentsRepositoryTrait.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.LDPDocumentsRepositoryTrait.isDecorated(object))
            return object;
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, HTTPRepositoryTrait_1.HTTPRepositoryTrait);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.LDPDocumentsRepositoryTrait.PROTOTYPE, target);
    },
};


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = __webpack_require__(2);
var GeneralRepository_1 = __webpack_require__(77);
var Request_1 = __webpack_require__(28);
var ModelDecorator_1 = __webpack_require__(4);
var ResolvablePointer_1 = __webpack_require__(24);
exports.HTTPRepositoryTrait = {
    PROTOTYPE: {
        get: function (uri, requestOptions) {
            var _this = this;
            if (!this.$context.registry.inScope(uri, true))
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
            var url = this.$context.getObjectSchema().resolveURI(uri, { base: true });
            if (this.$context.registry.hasPointer(url, true)) {
                var resource = this.$context.registry.getPointer(url, true);
                if (resource.isResolved()) {
                    if (!requestOptions.ensureLatest)
                        return Promise.resolve(resource);
                    Request_1.RequestUtils.setIfNoneMatchHeader(resource.$eTag, requestOptions);
                }
            }
            return Request_1.RequestService
                .get(url, requestOptions)
                .then(function (response) {
                return _this._parseResponseData(response, url);
            });
        },
        resolve: function (resource, requestOptions) {
            return this.get(resource.$id, requestOptions);
        },
        exists: function (uri, requestOptions) {
            if (!this.$context.registry.inScope(uri, true))
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
            var url = this.$context.getObjectSchema().resolveURI(uri, { base: true });
            return Request_1.RequestService
                .head(url, requestOptions)
                .then(function () { return true; })
                .catch(function (error) {
                if ("response" in error && error.response.status === 404)
                    return false;
                return Promise.reject(error);
            });
        },
        refresh: function (resource, requestOptions) {
            var _this = this;
            if (!ResolvablePointer_1.ResolvablePointer.is(resource))
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("The resource isn't a resolvable pointer."));
            if (!this.$context.registry.inScope(resource.$id, true))
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + resource.$id + "\" is out of scope."));
            var url = this.$context.getObjectSchema().resolveURI(resource.$id, { base: true });
            return Request_1.RequestService
                .get(url, requestOptions)
                .then(function (response) {
                return _this._parseResponseData(response, url);
            })
                .catch(function (error) {
                if ("response" in error && error.response.status === 304)
                    return resource;
                return Promise.reject(error);
            });
        },
        save: function (resource, requestOptions) {
            if (!ResolvablePointer_1.ResolvablePointer.is(resource))
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("The resource isn't a resolvable pointer."));
            if (!this.$context.registry.inScope(resource.$id, true))
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + resource.$id + "\" is out of scope."));
            var url = this.$context.getObjectSchema().resolveURI(resource.$id, { base: true });
            if (!resource.isDirty())
                return Promise.resolve(resource);
            var body = JSON.stringify(resource);
            return Request_1.RequestService
                .put(url, body, requestOptions)
                .then(function () { return resource; });
        },
        saveAndRefresh: function (resource, requestOptions) {
            var _this = this;
            return this
                .save(resource, requestOptions)
                .then(function () { return _this.refresh(resource, requestOptions); });
        },
        delete: function (uri, requestOptions) {
            var _this = this;
            if (!this.$context.registry.inScope(uri, true))
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
            var url = this.$context.getObjectSchema().resolveURI(uri, { base: true });
            return Request_1.RequestService
                .delete(url, requestOptions)
                .then(function () {
                _this.$context.registry.removePointer(url);
            });
        },
        _parseResponseData: function (response, id) {
            return __awaiter(this, void 0, void 0, function () {
                var resolvable;
                return __generator(this, function (_a) {
                    resolvable = this.$context.registry
                        .getPointer(id, true);
                    resolvable.$eTag = response.getETag();
                    resolvable._resolved = true;
                    return [2, resolvable];
                });
            });
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.HTTPRepositoryTrait.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.HTTPRepositoryTrait.isDecorated(object))
            return;
        var resource = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, GeneralRepository_1.GeneralRepository);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.HTTPRepositoryTrait.PROTOTYPE, resource);
    },
};


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = __webpack_require__(2);
var GeneralRepository_1 = __webpack_require__(77);
var ModelDecorator_1 = __webpack_require__(4);
var Builder_1 = __webpack_require__(122);
var SPARQLService_1 = __webpack_require__(80);
var Utils_1 = __webpack_require__(27);
exports.SPARQLDocumentsRepositoryTrait = {
    PROTOTYPE: {
        executeASKQuery: function (uri, askQuery, requestOptions) {
            if (!this.$context.registry.inScope(uri, true))
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
            var url = this.$context.getObjectSchema().resolveURI(uri, { base: true });
            return SPARQLService_1.SPARQLService
                .executeASKQuery(url, askQuery, requestOptions)
                .then(function (_a) {
                var rawResults = _a[0];
                return rawResults;
            })
                .catch(Utils_1._getErrorResponseParserFn(this.$context.registry));
        },
        executeSELECTQuery: function (uri, selectQuery, requestOptions) {
            if (!this.$context.registry.inScope(uri, true))
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
            var url = this.$context.getObjectSchema().resolveURI(uri, { base: true });
            return SPARQLService_1.SPARQLService
                .executeSELECTQuery(url, selectQuery, this.$context.registry, requestOptions)
                .then(function (_a) {
                var selectResults = _a[0];
                return selectResults;
            })
                .catch(Utils_1._getErrorResponseParserFn(this.$context.registry));
        },
        executeUPDATE: function (uri, update, requestOptions) {
            if (!this.$context.registry.inScope(uri, true))
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
            var url = this.$context.getObjectSchema().resolveURI(uri, { base: true });
            return SPARQLService_1.SPARQLService
                .executeUPDATE(url, update, requestOptions)
                .then(function () { })
                .catch(Utils_1._getErrorResponseParserFn(this.$context.registry));
        },
        sparql: function (uri) {
            if (!this.$context.registry.inScope(uri, true))
                throw new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope.");
            var url = this.$context.getObjectSchema().resolveURI(uri, { base: true });
            var schema = this.$context.registry.getGeneralSchema();
            var builder = new Builder_1.SPARQLBuilder(this, url)
                .base(schema.base)
                .vocab(schema.vocab);
            schema.prefixes.forEach(function (name, prefix) {
                builder = builder.prefix(prefix, name);
            });
            return builder;
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.SPARQLDocumentsRepositoryTrait.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.SPARQLDocumentsRepositoryTrait.isDecorated(object))
            return object;
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, GeneralRepository_1.GeneralRepository);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.SPARQLDocumentsRepositoryTrait.PROTOTYPE, target);
    },
};


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(16);
var decorators_1 = __webpack_require__(18);
var SPARQLER = (function () {
    function SPARQLER(finishDecorator) {
        var container = new Container_1.Container(finishDecorator);
        return decorators_1.queryDecorator(container, this);
    }
    return SPARQLER;
}());
exports.SPARQLER = SPARQLER;
exports.default = SPARQLER;

//# sourceMappingURL=index.js.map


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(16);
var _1 = __webpack_require__(18);
var IRIResolver_1 = __webpack_require__(26);
var tokens_1 = __webpack_require__(7);
function _from(self, tokens, iri) {
    var iriResolver = new IRIResolver_1.IRIResolver(self._iriResolver);
    tokens.push.apply(tokens, iriResolver.resolve(iri));
    var container = new Container_1.Container(self, tokens, iriResolver);
    return fromDecorator(container, {});
}
function from(iri) {
    return _from(this, [tokens_1.FROM], iri);
}
function fromNamed(iri) {
    return _from(this, [tokens_1.FROM, tokens_1.NAMED], iri);
}
function fromDecorator(container, object) {
    return Object.assign(_1.whereDecorator(container, object), {
        from: from.bind(container),
        fromNamed: fromNamed.bind(container),
    });
}
exports.fromDecorator = fromDecorator;

//# sourceMappingURL=from.js.map


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(16);
var _1 = __webpack_require__(18);
var tokens_1 = __webpack_require__(7);
var tokens_2 = __webpack_require__(5);
function groupBy(rawCondition) {
    var tokens = [tokens_1.GROUP, tokens_1.BY, new tokens_2.StringLiteral(rawCondition)];
    var container = new Container_1.Container(this, tokens);
    return this._finishDecorator(container, _1.havingDecorator(container, {}));
}
function groupDecorator(container, object) {
    return Object.assign(_1.havingDecorator(container, object), {
        groupBy: groupBy.bind(container),
    });
}
exports.groupDecorator = groupDecorator;

//# sourceMappingURL=group.js.map


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(16);
var _1 = __webpack_require__(18);
var tokens_1 = __webpack_require__(7);
var tokens_2 = __webpack_require__(5);
function having(rawCondition) {
    var tokens = [tokens_1.HAVING, new tokens_2.StringLiteral(rawCondition)];
    var container = new Container_1.Container(this, tokens);
    return this._finishDecorator(container, _1.orderDecorator(container, {}));
}
function havingDecorator(container, object) {
    return Object.assign(_1.orderDecorator(container, object), {
        having: having.bind(container),
    });
}
exports.havingDecorator = havingDecorator;

//# sourceMappingURL=having.js.map


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(16);
var values_1 = __webpack_require__(239);
var tokens_1 = __webpack_require__(7);
var tokens_2 = __webpack_require__(5);
var CurrentMethod;
(function (CurrentMethod) {
    CurrentMethod[CurrentMethod["LIMIT"] = 0] = "LIMIT";
    CurrentMethod[CurrentMethod["OFFSET"] = 1] = "OFFSET";
})(CurrentMethod = exports.CurrentMethod || (exports.CurrentMethod = {}));
var LimitOffsetContainer = (function (_super) {
    __extends(LimitOffsetContainer, _super);
    function LimitOffsetContainer(previousContainer, newTokens, currentMethod) {
        var _this = _super.call(this, previousContainer, newTokens) || this;
        _this._offsetUsed = currentMethod === CurrentMethod.OFFSET;
        _this._limitUsed = currentMethod === CurrentMethod.LIMIT;
        Object.freeze(_this);
        return _this;
    }
    return LimitOffsetContainer;
}(Container_1.Container));
exports.LimitOffsetContainer = LimitOffsetContainer;
function limit(limit) {
    var tokens = [tokens_1.LIMIT, new tokens_2.NumberLiteral(limit)];
    if (this._offsetUsed) {
        var container_1 = new Container_1.Container(this, tokens);
        return this._finishDecorator(container_1, values_1.valuesDecorator(container_1, {}));
    }
    var container = new LimitOffsetContainer(this, tokens, CurrentMethod.LIMIT);
    return this._finishDecorator(container, offsetDecorator(container, {}));
}
exports.limit = limit;
function offset(offset) {
    var tokens = [tokens_1.OFFSET, new tokens_2.NumberLiteral(offset)];
    if (this._limitUsed) {
        var container_2 = new Container_1.Container(this, tokens);
        return this._finishDecorator(container_2, values_1.valuesDecorator(container_2, {}));
    }
    var container = new LimitOffsetContainer(this, tokens, CurrentMethod.OFFSET);
    return this._finishDecorator(container, limitDecorator(container, {}));
}
exports.offset = offset;
function limitDecorator(container, object) {
    return Object.assign(values_1.valuesDecorator(container, object), {
        limit: limit.bind(container),
    });
}
exports.limitDecorator = limitDecorator;
function offsetDecorator(container, object) {
    return Object.assign(values_1.valuesDecorator(container, object), {
        offset: offset.bind(container),
    });
}
exports.offsetDecorator = offsetDecorator;
function limitOffsetDecorator(container, object) {
    return Object.assign(values_1.valuesDecorator(container, object), {
        limit: limit.bind(container),
        offset: offset.bind(container),
    });
}
exports.limitOffsetDecorator = limitOffsetDecorator;

//# sourceMappingURL=limit-offset.js.map


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(16);
var IRIResolver_1 = __webpack_require__(26);
var patterns_1 = __webpack_require__(125);
var tokens_1 = __webpack_require__(7);
var triples_1 = __webpack_require__(242);
var ObjectPattern_1 = __webpack_require__(47);
function values(variableOrVariables, valuesOrBuilder) {
    var isSingle = !Array.isArray(variableOrVariables);
    var variables = (isSingle ?
        [variableOrVariables] : variableOrVariables)
        .map(function (name) { return new triples_1.Variable(null, name); });
    var tokens = [tokens_1.VALUES];
    if (isSingle) {
        tokens.push.apply(tokens, variables[0].getSelfTokens().concat([tokens_1.OPEN_SINGLE_BLOCK]));
    }
    else {
        tokens.push(tokens_1.OPEN_SINGLE_LIST);
        variables.forEach(function (variable) { return tokens.push.apply(tokens, variable.getSelfTokens()); });
        tokens.push(tokens_1.CLOSE_SINGLE_LIST, tokens_1.OPEN_MULTI_BLOCK);
    }
    var iriResolver = void 0;
    var rawValues = typeof valuesOrBuilder === "function" ?
        valuesOrBuilder(new patterns_1.PatternBuilder(iriResolver = new IRIResolver_1.IRIResolver(this._iriResolver))) :
        valuesOrBuilder;
    var values = isSingle ?
        Array.isArray(rawValues) ? rawValues.map(function (value) { return [value]; }) : [[rawValues]] :
        Array.isArray(rawValues[0]) ? rawValues : [rawValues];
    values.forEach(function (valuesRow) {
        if (isSingle) {
            tokens.push.apply(tokens, ObjectPattern_1.serialize(valuesRow[0]));
        }
        else {
            tokens.push(tokens_1.OPEN_SINGLE_LIST);
            valuesRow.forEach(function (value) { return tokens.push.apply(tokens, ObjectPattern_1.serialize(value)); });
            tokens.push(tokens_1.CLOSE_SINGLE_LIST);
        }
    });
    tokens.push(isSingle ? tokens_1.CLOSE_SINGLE_BLOCK : tokens_1.CLOSE_MULTI_BLOCK);
    var container = new Container_1.Container(this, tokens, iriResolver);
    return this._finishDecorator(container, {});
}
function valuesDecorator(container, object) {
    return Object.assign(object, {
        values: values.bind(container),
    });
}
exports.valuesDecorator = valuesDecorator;

//# sourceMappingURL=values.js.map


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(127));
__export(__webpack_require__(128));

//# sourceMappingURL=index.js.map


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NAMESPACE = "http://www.w3.org/2001/XMLSchema#";
exports.dateTime = exports.NAMESPACE + "dateTime";
exports.integer = exports.NAMESPACE + "integer";
exports.float = exports.NAMESPACE + "float";
exports.boolean = exports.NAMESPACE + "boolean";
exports.string = exports.NAMESPACE + "string";

//# sourceMappingURL=XSD.js.map


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(129));
__export(__webpack_require__(130));
__export(__webpack_require__(131));
__export(__webpack_require__(132));
__export(__webpack_require__(61));
__export(__webpack_require__(62));
__export(__webpack_require__(133));

//# sourceMappingURL=index.js.map


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(16);
var _1 = __webpack_require__(18);
var tokens_1 = __webpack_require__(7);
var tokens_2 = __webpack_require__(5);
function orderBy(rawCondition) {
    var tokens = [tokens_1.ORDER, tokens_1.BY, new tokens_2.StringLiteral(rawCondition)];
    var container = new Container_1.Container(this, tokens);
    return this._finishDecorator(container, _1.limitOffsetDecorator(container, {}));
}
exports.orderBy = orderBy;
function orderDecorator(container, object) {
    return Object.assign(_1.limitOffsetDecorator(container, object), {
        orderBy: orderBy.bind(container),
    });
}
exports.orderDecorator = orderDecorator;

//# sourceMappingURL=order.js.map


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(16);
var _1 = __webpack_require__(18);
var IRIResolver_1 = __webpack_require__(26);
var tokens_1 = __webpack_require__(7);
var tokens_2 = __webpack_require__(5);
function base(iri) {
    var tokens = [tokens_1.BASE, tokens_1.OPEN_IRI, new tokens_2.StringLiteral(iri), tokens_1.CLOSE_IRI];
    var container = new Container_1.Container(this, tokens);
    return queryDecorator(container, {});
}
function vocab(iri) {
    var iriResolver = new IRIResolver_1.IRIResolver(this._iriResolver, iri);
    var container = new Container_1.Container(this, null, iriResolver);
    return queryDecorator(container, {});
}
function prefix(name, iri) {
    var iriResolver = new IRIResolver_1.IRIResolver(this._iriResolver);
    var previousIndex = iriResolver._prefixes.has(name) ?
        this._tokens.findIndex(function (token) { return token instanceof tokens_2.StringLiteral && token["value"] === name; }) :
        -1;
    iriResolver._prefixes.set(name, false);
    var tokens = [tokens_1.PREFIX, new tokens_2.StringLiteral(name), tokens_1.PREFIX_SYMBOL, tokens_1.OPEN_IRI, new tokens_2.StringLiteral(iri), tokens_1.CLOSE_IRI];
    var container = new Container_1.Container(this, tokens, iriResolver);
    if (previousIndex !== -1) {
        container._tokens.splice(previousIndex - 1, 6);
    }
    return queryDecorator(container, {});
}
function queryDecorator(container, object) {
    return Object.assign(_1.selectDecorator(container, object), {
        base: base.bind(container),
        vocab: vocab.bind(container),
        prefix: prefix.bind(container),
    });
}
exports.queryDecorator = queryDecorator;

//# sourceMappingURL=query.js.map


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(16);
var _1 = __webpack_require__(18);
var tokens_1 = __webpack_require__(7);
var tokens_2 = __webpack_require__(5);
function _select(self, tokens, variables) {
    if (variables && variables.length === 0)
        throw new Error("Need to provide al least one variable.");
    if (variables)
        variables.forEach(function (variable) { return tokens.push(tokens_1.VAR_SYMBOL, new tokens_2.StringLiteral(variable)); });
    var container = new Container_1.Container(self, tokens);
    if (self._finishDecorator === _1.subFinishDecorator)
        return _1.subWhereDecorator(container, {});
    return _1.fromDecorator(container, {});
}
function select() {
    var variables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        variables[_i] = arguments[_i];
    }
    return _select(this, [tokens_1.SELECT], variables);
}
function selectDistinct() {
    var variables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        variables[_i] = arguments[_i];
    }
    return _select(this, [tokens_1.SELECT, tokens_1.DISTINCT], variables);
}
function selectReduced() {
    var variables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        variables[_i] = arguments[_i];
    }
    return _select(this, [tokens_1.SELECT, tokens_1.REDUCED], variables);
}
function selectAll() {
    return _select(this, [tokens_1.SELECT, tokens_1.ALL]);
}
function selectAllDistinct() {
    return _select(this, [tokens_1.SELECT, tokens_1.DISTINCT, tokens_1.ALL]);
}
function selectAllReduced() {
    return _select(this, [tokens_1.SELECT, tokens_1.REDUCED, tokens_1.ALL]);
}
function selectDecorator(container, object) {
    return Object.assign(object, {
        select: select.bind(container),
        selectDistinct: selectDistinct.bind(container),
        selectReduced: selectReduced.bind(container),
        selectAll: selectAll.bind(container),
        selectAllDistinct: selectAllDistinct.bind(container),
        selectAllReduced: selectAllReduced.bind(container),
    });
}
exports.selectDecorator = selectDecorator;

//# sourceMappingURL=select.js.map


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(16);
var _1 = __webpack_require__(18);
var IRIResolver_1 = __webpack_require__(26);
var patterns_1 = __webpack_require__(125);
var tokens_1 = __webpack_require__(7);
var Patterns_1 = __webpack_require__(134);
function subWhere(patterns) {
    var tokens = [tokens_1.WHERE].concat(Patterns_1.getBlockTokens(patterns));
    var container = new Container_1.Container(this, tokens);
    return this._finishDecorator(container, _1.groupDecorator(container, {}));
}
function where(patternFunction) {
    var iriResolver = new IRIResolver_1.IRIResolver(this._iriResolver);
    var patterns = patternFunction(new patterns_1.PatternBuilder(iriResolver));
    var tokens = [tokens_1.WHERE].concat(Patterns_1.getBlockTokens(patterns));
    var container = new Container_1.Container(this, tokens, iriResolver);
    return this._finishDecorator(container, _1.groupDecorator(container, {}));
}
function whereDecorator(container, object) {
    return Object.assign(object, {
        where: where.bind(container),
    });
}
exports.whereDecorator = whereDecorator;
function subWhereDecorator(container, object) {
    return Object.assign(object, {
        where: subWhere.bind(container),
    });
}
exports.subWhereDecorator = subWhereDecorator;

//# sourceMappingURL=where.js.map


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var transportList = __webpack_require__(248);

module.exports = __webpack_require__(268)(transportList);

// TODO can't get rid of this until all servers do
if ('_sockjs_onload' in global) {
  setTimeout(global._sockjs_onload, 1);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = [
  // streaming transports
  __webpack_require__(249)
, __webpack_require__(257)
, __webpack_require__(140)
, __webpack_require__(141)
, __webpack_require__(84)(__webpack_require__(141))

  // polling transports
, __webpack_require__(145)
, __webpack_require__(84)(__webpack_require__(145))
, __webpack_require__(146)
, __webpack_require__(264)
, __webpack_require__(84)(__webpack_require__(146))
, __webpack_require__(265)
];


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(22)
  , urlUtils = __webpack_require__(14)
  , inherits = __webpack_require__(1)
  , EventEmitter = __webpack_require__(12).EventEmitter
  , WebsocketDriver = __webpack_require__(256)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(10)('sockjs-client:websocket');
}

function WebSocketTransport(transUrl, ignore, options) {
  if (!WebSocketTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }

  EventEmitter.call(this);
  debug('constructor', transUrl);

  var self = this;
  var url = urlUtils.addPath(transUrl, '/websocket');
  if (url.slice(0, 5) === 'https') {
    url = 'wss' + url.slice(5);
  } else {
    url = 'ws' + url.slice(4);
  }
  this.url = url;

  this.ws = new WebsocketDriver(this.url, [], options);
  this.ws.onmessage = function(e) {
    debug('message event', e.data);
    self.emit('message', e.data);
  };
  // Firefox has an interesting bug. If a websocket connection is
  // created after onunload, it stays alive even when user
  // navigates away from the page. In such situation let's lie -
  // let's not open the ws connection at all. See:
  // https://github.com/sockjs/sockjs-client/issues/28
  // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
  this.unloadRef = utils.unloadAdd(function() {
    debug('unload');
    self.ws.close();
  });
  this.ws.onclose = function(e) {
    debug('close event', e.code, e.reason);
    self.emit('close', e.code, e.reason);
    self._cleanup();
  };
  this.ws.onerror = function(e) {
    debug('error event', e);
    self.emit('close', 1006, 'WebSocket connection broken');
    self._cleanup();
  };
}

inherits(WebSocketTransport, EventEmitter);

WebSocketTransport.prototype.send = function(data) {
  var msg = '[' + data + ']';
  debug('send', msg);
  this.ws.send(msg);
};

WebSocketTransport.prototype.close = function() {
  debug('close');
  var ws = this.ws;
  this._cleanup();
  if (ws) {
    ws.close();
  }
};

WebSocketTransport.prototype._cleanup = function() {
  debug('_cleanup');
  var ws = this.ws;
  if (ws) {
    ws.onmessage = ws.onclose = ws.onerror = null;
  }
  utils.unloadDel(this.unloadRef);
  this.unloadRef = this.ws = null;
  this.removeAllListeners();
};

WebSocketTransport.enabled = function() {
  debug('enabled');
  return !!WebsocketDriver;
};
WebSocketTransport.transportName = 'websocket';

// In theory, ws should require 1 round trip. But in chrome, this is
// not very stable over SSL. Most likely a ws connection requires a
// separate SSL connection, in which case 2 round trips are an
// absolute minumum.
WebSocketTransport.roundTrips = 2;

module.exports = WebSocketTransport;


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

if (global.crypto && global.crypto.getRandomValues) {
  module.exports.randomBytes = function(length) {
    var bytes = new Uint8Array(length);
    global.crypto.getRandomValues(bytes);
    return bytes;
  };
} else {
  module.exports.randomBytes = function(length) {
    var bytes = new Array(length);
    for (var i = 0; i < length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
    return bytes;
  };
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */
module.exports = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
    return port !== 80;

    case 'https':
    case 'wss':
    return port !== 443;

    case 'ftp':
    return port !== 21;

    case 'gopher':
    return port !== 70;

    case 'file':
    return false;
  }

  return port !== 0;
};


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String} The decoded string.
 * @api private
 */
function decode(input) {
  return decodeURIComponent(input.replace(/\+/g, ' '));
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g
    , result = {}
    , part;

  //
  // Little nifty parsing hack, leverage the fact that RegExp.exec increments
  // the lastIndex property so we can continue executing this loop until we've
  // parsed all results.
  //
  for (;
    part = parser.exec(query);
    result[decode(part[1])] = decode(part[2])
  );

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = [];

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (var key in obj) {
    if (has.call(obj, key)) {
      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;


/***/ }),
/* 253 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(255);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 255 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var Driver = global.WebSocket || global.MozWebSocket;
if (Driver) {
	module.exports = function WebSocketBrowserDriver(url) {
		return new Driver(url);
	};
} else {
	module.exports = undefined;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var inherits = __webpack_require__(1)
  , AjaxBasedTransport = __webpack_require__(33)
  , XhrReceiver = __webpack_require__(63)
  , XHRCorsObject = __webpack_require__(64)
  , XHRLocalObject = __webpack_require__(48)
  , browser = __webpack_require__(49)
  ;

function XhrStreamingTransport(transUrl) {
  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
}

inherits(XhrStreamingTransport, AjaxBasedTransport);

XhrStreamingTransport.enabled = function(info) {
  if (info.nullOrigin) {
    return false;
  }
  // Opera doesn't support xhr-streaming #60
  // But it might be able to #92
  if (browser.isOpera()) {
    return false;
  }

  return XHRCorsObject.enabled;
};

XhrStreamingTransport.transportName = 'xhr-streaming';
XhrStreamingTransport.roundTrips = 2; // preflight, ajax

// Safari gets confused when a streaming ajax request is started
// before onload. This causes the load indicator to spin indefinetely.
// Only require body when used in a browser
XhrStreamingTransport.needBody = !!global.document;

module.exports = XhrStreamingTransport;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(1)
  , EventEmitter = __webpack_require__(12).EventEmitter
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(10)('sockjs-client:buffered-sender');
}

function BufferedSender(url, sender) {
  debug(url);
  EventEmitter.call(this);
  this.sendBuffer = [];
  this.sender = sender;
  this.url = url;
}

inherits(BufferedSender, EventEmitter);

BufferedSender.prototype.send = function(message) {
  debug('send', message);
  this.sendBuffer.push(message);
  if (!this.sendStop) {
    this.sendSchedule();
  }
};

// For polling transports in a situation when in the message callback,
// new message is being send. If the sending connection was started
// before receiving one, it is possible to saturate the network and
// timeout due to the lack of receiving socket. To avoid that we delay
// sending messages by some small time, in order to let receiving
// connection be started beforehand. This is only a halfmeasure and
// does not fix the big problem, but it does make the tests go more
// stable on slow networks.
BufferedSender.prototype.sendScheduleWait = function() {
  debug('sendScheduleWait');
  var self = this;
  var tref;
  this.sendStop = function() {
    debug('sendStop');
    self.sendStop = null;
    clearTimeout(tref);
  };
  tref = setTimeout(function() {
    debug('timeout');
    self.sendStop = null;
    self.sendSchedule();
  }, 25);
};

BufferedSender.prototype.sendSchedule = function() {
  debug('sendSchedule', this.sendBuffer.length);
  var self = this;
  if (this.sendBuffer.length > 0) {
    var payload = '[' + this.sendBuffer.join(',') + ']';
    this.sendStop = this.sender(this.url, payload, function(err) {
      self.sendStop = null;
      if (err) {
        debug('error', err);
        self.emit('close', err.code || 1006, 'Sending error: ' + err);
        self.close();
      } else {
        self.sendScheduleWait();
      }
    });
    this.sendBuffer = [];
  }
};

BufferedSender.prototype._cleanup = function() {
  debug('_cleanup');
  this.removeAllListeners();
};

BufferedSender.prototype.close = function() {
  debug('close');
  this._cleanup();
  if (this.sendStop) {
    this.sendStop();
    this.sendStop = null;
  }
};

module.exports = BufferedSender;


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(1)
  , EventEmitter = __webpack_require__(12).EventEmitter
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(10)('sockjs-client:polling');
}

function Polling(Receiver, receiveUrl, AjaxObject) {
  debug(receiveUrl);
  EventEmitter.call(this);
  this.Receiver = Receiver;
  this.receiveUrl = receiveUrl;
  this.AjaxObject = AjaxObject;
  this._scheduleReceiver();
}

inherits(Polling, EventEmitter);

Polling.prototype._scheduleReceiver = function() {
  debug('_scheduleReceiver');
  var self = this;
  var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);

  poll.on('message', function(msg) {
    debug('message', msg);
    self.emit('message', msg);
  });

  poll.once('close', function(code, reason) {
    debug('close', code, reason, self.pollIsClosing);
    self.poll = poll = null;

    if (!self.pollIsClosing) {
      if (reason === 'network') {
        self._scheduleReceiver();
      } else {
        self.emit('close', code || 1006, reason);
        self.removeAllListeners();
      }
    }
  });
};

Polling.prototype.abort = function() {
  debug('abort');
  this.removeAllListeners();
  this.pollIsClosing = true;
  if (this.poll) {
    this.poll.abort();
  }
};

module.exports = Polling;


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(1)
  , EventEmitter = __webpack_require__(12).EventEmitter
  , EventSourceDriver = __webpack_require__(142)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(10)('sockjs-client:receiver:eventsource');
}

function EventSourceReceiver(url) {
  debug(url);
  EventEmitter.call(this);

  var self = this;
  var es = this.es = new EventSourceDriver(url);
  es.onmessage = function(e) {
    debug('message', e.data);
    self.emit('message', decodeURI(e.data));
  };
  es.onerror = function(e) {
    debug('error', es.readyState, e);
    // ES on reconnection has readyState = 0 or 1.
    // on network error it's CLOSED = 2
    var reason = (es.readyState !== 2 ? 'network' : 'permanent');
    self._cleanup();
    self._close(reason);
  };
}

inherits(EventSourceReceiver, EventEmitter);

EventSourceReceiver.prototype.abort = function() {
  debug('abort');
  this._cleanup();
  this._close('user');
};

EventSourceReceiver.prototype._cleanup = function() {
  debug('cleanup');
  var es = this.es;
  if (es) {
    es.onmessage = es.onerror = null;
    es.close();
    this.es = null;
  }
};

EventSourceReceiver.prototype._close = function(reason) {
  debug('close', reason);
  var self = this;
  // Safari and chrome < 15 crash if we close window before
  // waiting for ES cleanup. See:
  // https://code.google.com/p/chromium/issues/detail?id=89155
  setTimeout(function() {
    self.emit('close', null, reason);
    self.removeAllListeners();
  }, 200);
};

module.exports = EventSourceReceiver;


/***/ }),
/* 261 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 262 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var inherits = __webpack_require__(1)
  , iframeUtils = __webpack_require__(50)
  , urlUtils = __webpack_require__(14)
  , EventEmitter = __webpack_require__(12).EventEmitter
  , random = __webpack_require__(32)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(10)('sockjs-client:receiver:htmlfile');
}

function HtmlfileReceiver(url) {
  debug(url);
  EventEmitter.call(this);
  var self = this;
  iframeUtils.polluteGlobalNamespace();

  this.id = 'a' + random.string(6);
  url = urlUtils.addQuery(url, 'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id));

  debug('using htmlfile', HtmlfileReceiver.htmlfileEnabled);
  var constructFunc = HtmlfileReceiver.htmlfileEnabled ?
      iframeUtils.createHtmlfile : iframeUtils.createIframe;

  global[iframeUtils.WPrefix][this.id] = {
    start: function() {
      debug('start');
      self.iframeObj.loaded();
    }
  , message: function(data) {
      debug('message', data);
      self.emit('message', data);
    }
  , stop: function() {
      debug('stop');
      self._cleanup();
      self._close('network');
    }
  };
  this.iframeObj = constructFunc(url, function() {
    debug('callback');
    self._cleanup();
    self._close('permanent');
  });
}

inherits(HtmlfileReceiver, EventEmitter);

HtmlfileReceiver.prototype.abort = function() {
  debug('abort');
  this._cleanup();
  this._close('user');
};

HtmlfileReceiver.prototype._cleanup = function() {
  debug('_cleanup');
  if (this.iframeObj) {
    this.iframeObj.cleanup();
    this.iframeObj = null;
  }
  delete global[iframeUtils.WPrefix][this.id];
};

HtmlfileReceiver.prototype._close = function(reason) {
  debug('_close', reason);
  this.emit('close', null, reason);
  this.removeAllListeners();
};

HtmlfileReceiver.htmlfileEnabled = false;

// obfuscate to avoid firewalls
var axo = ['Active'].concat('Object').join('X');
if (axo in global) {
  try {
    HtmlfileReceiver.htmlfileEnabled = !!new global[axo]('htmlfile');
  } catch (x) {
    // intentionally empty
  }
}

HtmlfileReceiver.enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled;

module.exports = HtmlfileReceiver;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(1)
  , AjaxBasedTransport = __webpack_require__(33)
  , XdrStreamingTransport = __webpack_require__(140)
  , XhrReceiver = __webpack_require__(63)
  , XDRObject = __webpack_require__(83)
  ;

function XdrPollingTransport(transUrl) {
  if (!XDRObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XDRObject);
}

inherits(XdrPollingTransport, AjaxBasedTransport);

XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
XdrPollingTransport.transportName = 'xdr-polling';
XdrPollingTransport.roundTrips = 2; // preflight, ajax

module.exports = XdrPollingTransport;


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// The simplest and most robust transport, using the well-know cross
// domain hack - JSONP. This transport is quite inefficient - one
// message could use up to one http request. But at least it works almost
// everywhere.
// Known limitations:
//   o you will get a spinning cursor
//   o for Konqueror a dumb timer is needed to detect errors

var inherits = __webpack_require__(1)
  , SenderReceiver = __webpack_require__(138)
  , JsonpReceiver = __webpack_require__(266)
  , jsonpSender = __webpack_require__(267)
  ;

function JsonPTransport(transUrl) {
  if (!JsonPTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }
  SenderReceiver.call(this, transUrl, '/jsonp', jsonpSender, JsonpReceiver);
}

inherits(JsonPTransport, SenderReceiver);

JsonPTransport.enabled = function() {
  return !!global.document;
};

JsonPTransport.transportName = 'jsonp-polling';
JsonPTransport.roundTrips = 1;
JsonPTransport.needBody = true;

module.exports = JsonPTransport;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var utils = __webpack_require__(50)
  , random = __webpack_require__(32)
  , browser = __webpack_require__(49)
  , urlUtils = __webpack_require__(14)
  , inherits = __webpack_require__(1)
  , EventEmitter = __webpack_require__(12).EventEmitter
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(10)('sockjs-client:receiver:jsonp');
}

function JsonpReceiver(url) {
  debug(url);
  var self = this;
  EventEmitter.call(this);

  utils.polluteGlobalNamespace();

  this.id = 'a' + random.string(6);
  var urlWithId = urlUtils.addQuery(url, 'c=' + encodeURIComponent(utils.WPrefix + '.' + this.id));

  global[utils.WPrefix][this.id] = this._callback.bind(this);
  this._createScript(urlWithId);

  // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
  this.timeoutId = setTimeout(function() {
    debug('timeout');
    self._abort(new Error('JSONP script loaded abnormally (timeout)'));
  }, JsonpReceiver.timeout);
}

inherits(JsonpReceiver, EventEmitter);

JsonpReceiver.prototype.abort = function() {
  debug('abort');
  if (global[utils.WPrefix][this.id]) {
    var err = new Error('JSONP user aborted read');
    err.code = 1000;
    this._abort(err);
  }
};

JsonpReceiver.timeout = 35000;
JsonpReceiver.scriptErrorTimeout = 1000;

JsonpReceiver.prototype._callback = function(data) {
  debug('_callback', data);
  this._cleanup();

  if (this.aborting) {
    return;
  }

  if (data) {
    debug('message', data);
    this.emit('message', data);
  }
  this.emit('close', null, 'network');
  this.removeAllListeners();
};

JsonpReceiver.prototype._abort = function(err) {
  debug('_abort', err);
  this._cleanup();
  this.aborting = true;
  this.emit('close', err.code, err.message);
  this.removeAllListeners();
};

JsonpReceiver.prototype._cleanup = function() {
  debug('_cleanup');
  clearTimeout(this.timeoutId);
  if (this.script2) {
    this.script2.parentNode.removeChild(this.script2);
    this.script2 = null;
  }
  if (this.script) {
    var script = this.script;
    // Unfortunately, you can't really abort script loading of
    // the script.
    script.parentNode.removeChild(script);
    script.onreadystatechange = script.onerror =
        script.onload = script.onclick = null;
    this.script = null;
  }
  delete global[utils.WPrefix][this.id];
};

JsonpReceiver.prototype._scriptError = function() {
  debug('_scriptError');
  var self = this;
  if (this.errorTimer) {
    return;
  }

  this.errorTimer = setTimeout(function() {
    if (!self.loadedOkay) {
      self._abort(new Error('JSONP script loaded abnormally (onerror)'));
    }
  }, JsonpReceiver.scriptErrorTimeout);
};

JsonpReceiver.prototype._createScript = function(url) {
  debug('_createScript', url);
  var self = this;
  var script = this.script = global.document.createElement('script');
  var script2;  // Opera synchronous load trick.

  script.id = 'a' + random.string(8);
  script.src = url;
  script.type = 'text/javascript';
  script.charset = 'UTF-8';
  script.onerror = this._scriptError.bind(this);
  script.onload = function() {
    debug('onload');
    self._abort(new Error('JSONP script loaded abnormally (onload)'));
  };

  // IE9 fires 'error' event after onreadystatechange or before, in random order.
  // Use loadedOkay to determine if actually errored
  script.onreadystatechange = function() {
    debug('onreadystatechange', script.readyState);
    if (/loaded|closed/.test(script.readyState)) {
      if (script && script.htmlFor && script.onclick) {
        self.loadedOkay = true;
        try {
          // In IE, actually execute the script.
          script.onclick();
        } catch (x) {
          // intentionally empty
        }
      }
      if (script) {
        self._abort(new Error('JSONP script loaded abnormally (onreadystatechange)'));
      }
    }
  };
  // IE: event/htmlFor/onclick trick.
  // One can't rely on proper order for onreadystatechange. In order to
  // make sure, set a 'htmlFor' and 'event' properties, so that
  // script code will be installed as 'onclick' handler for the
  // script object. Later, onreadystatechange, manually execute this
  // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
  // set. For reference see:
  //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
  // Also, read on that about script ordering:
  //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
  if (typeof script.async === 'undefined' && global.document.attachEvent) {
    // According to mozilla docs, in recent browsers script.async defaults
    // to 'true', so we may use it to detect a good browser:
    // https://developer.mozilla.org/en/HTML/Element/script
    if (!browser.isOpera()) {
      // Naively assume we're in IE
      try {
        script.htmlFor = script.id;
        script.event = 'onclick';
      } catch (x) {
        // intentionally empty
      }
      script.async = true;
    } else {
      // Opera, second sync script hack
      script2 = this.script2 = global.document.createElement('script');
      script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
      script.async = script2.async = false;
    }
  }
  if (typeof script.async !== 'undefined') {
    script.async = true;
  }

  var head = global.document.getElementsByTagName('head')[0];
  head.insertBefore(script, head.firstChild);
  if (script2) {
    head.insertBefore(script2, head.firstChild);
  }
};

module.exports = JsonpReceiver;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var random = __webpack_require__(32)
  , urlUtils = __webpack_require__(14)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(10)('sockjs-client:sender:jsonp');
}

var form, area;

function createIframe(id) {
  debug('createIframe', id);
  try {
    // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
    return global.document.createElement('<iframe name="' + id + '">');
  } catch (x) {
    var iframe = global.document.createElement('iframe');
    iframe.name = id;
    return iframe;
  }
}

function createForm() {
  debug('createForm');
  form = global.document.createElement('form');
  form.style.display = 'none';
  form.style.position = 'absolute';
  form.method = 'POST';
  form.enctype = 'application/x-www-form-urlencoded';
  form.acceptCharset = 'UTF-8';

  area = global.document.createElement('textarea');
  area.name = 'd';
  form.appendChild(area);

  global.document.body.appendChild(form);
}

module.exports = function(url, payload, callback) {
  debug(url, payload);
  if (!form) {
    createForm();
  }
  var id = 'a' + random.string(8);
  form.target = id;
  form.action = urlUtils.addQuery(urlUtils.addPath(url, '/jsonp_send'), 'i=' + id);

  var iframe = createIframe(id);
  iframe.id = id;
  iframe.style.display = 'none';
  form.appendChild(iframe);

  try {
    area.value = payload;
  } catch (e) {
    // seriously broken browsers get here
  }
  form.submit();

  var completed = function(err) {
    debug('completed', id, err);
    if (!iframe.onerror) {
      return;
    }
    iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
    // Opera mini doesn't like if we GC iframe
    // immediately, thus this timeout.
    setTimeout(function() {
      debug('cleaning up', id);
      iframe.parentNode.removeChild(iframe);
      iframe = null;
    }, 500);
    area.value = '';
    // It is not possible to detect if the iframe succeeded or
    // failed to submit our form.
    callback(err);
  };
  iframe.onerror = function() {
    debug('onerror', id);
    completed();
  };
  iframe.onload = function() {
    debug('onload', id);
    completed();
  };
  iframe.onreadystatechange = function(e) {
    debug('onreadystatechange', id, iframe.readyState, e);
    if (iframe.readyState === 'complete') {
      completed();
    }
  };
  return function() {
    debug('aborted', id);
    completed(new Error('Aborted'));
  };
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(269);

var URL = __webpack_require__(136)
  , inherits = __webpack_require__(1)
  , JSON3 = __webpack_require__(19)
  , random = __webpack_require__(32)
  , escape = __webpack_require__(270)
  , urlUtils = __webpack_require__(14)
  , eventUtils = __webpack_require__(22)
  , transport = __webpack_require__(271)
  , objectUtils = __webpack_require__(85)
  , browser = __webpack_require__(49)
  , log = __webpack_require__(272)
  , Event = __webpack_require__(86)
  , EventTarget = __webpack_require__(137)
  , loc = __webpack_require__(147)
  , CloseEvent = __webpack_require__(273)
  , TransportMessageEvent = __webpack_require__(274)
  , InfoReceiver = __webpack_require__(275)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(10)('sockjs-client:main');
}

var transports;

// follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
function SockJS(url, protocols, options) {
  if (!(this instanceof SockJS)) {
    return new SockJS(url, protocols, options);
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
  }
  EventTarget.call(this);

  this.readyState = SockJS.CONNECTING;
  this.extensions = '';
  this.protocol = '';

  // non-standard extension
  options = options || {};
  if (options.protocols_whitelist) {
    log.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead.");
  }
  this._transportsWhitelist = options.transports;
  this._transportOptions = options.transportOptions || {};

  var sessionId = options.sessionId || 8;
  if (typeof sessionId === 'function') {
    this._generateSessionId = sessionId;
  } else if (typeof sessionId === 'number') {
    this._generateSessionId = function() {
      return random.string(sessionId);
    };
  } else {
    throw new TypeError('If sessionId is used in the options, it needs to be a number or a function.');
  }

  this._server = options.server || random.numberString(1000);

  // Step 1 of WS spec - parse and validate the url. Issue #8
  var parsedUrl = new URL(url);
  if (!parsedUrl.host || !parsedUrl.protocol) {
    throw new SyntaxError("The URL '" + url + "' is invalid");
  } else if (parsedUrl.hash) {
    throw new SyntaxError('The URL must not contain a fragment');
  } else if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
  }

  var secure = parsedUrl.protocol === 'https:';
  // Step 2 - don't allow secure origin with an insecure protocol
  if (loc.protocol === 'https' && !secure) {
    throw new Error('SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS');
  }

  // Step 3 - check port access - no need here
  // Step 4 - parse protocols argument
  if (!protocols) {
    protocols = [];
  } else if (!Array.isArray(protocols)) {
    protocols = [protocols];
  }

  // Step 5 - check protocols argument
  var sortedProtocols = protocols.sort();
  sortedProtocols.forEach(function(proto, i) {
    if (!proto) {
      throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
    }
    if (i < (sortedProtocols.length - 1) && proto === sortedProtocols[i + 1]) {
      throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
    }
  });

  // Step 6 - convert origin
  var o = urlUtils.getOrigin(loc.href);
  this._origin = o ? o.toLowerCase() : null;

  // remove the trailing slash
  parsedUrl.set('pathname', parsedUrl.pathname.replace(/\/+$/, ''));

  // store the sanitized url
  this.url = parsedUrl.href;
  debug('using url', this.url);

  // Step 7 - start connection in background
  // obtain server info
  // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26
  this._urlInfo = {
    nullOrigin: !browser.hasDomain()
  , sameOrigin: urlUtils.isOriginEqual(this.url, loc.href)
  , sameScheme: urlUtils.isSchemeEqual(this.url, loc.href)
  };

  this._ir = new InfoReceiver(this.url, this._urlInfo);
  this._ir.once('finish', this._receiveInfo.bind(this));
}

inherits(SockJS, EventTarget);

function userSetCode(code) {
  return code === 1000 || (code >= 3000 && code <= 4999);
}

SockJS.prototype.close = function(code, reason) {
  // Step 1
  if (code && !userSetCode(code)) {
    throw new Error('InvalidAccessError: Invalid code');
  }
  // Step 2.4 states the max is 123 bytes, but we are just checking length
  if (reason && reason.length > 123) {
    throw new SyntaxError('reason argument has an invalid length');
  }

  // Step 3.1
  if (this.readyState === SockJS.CLOSING || this.readyState === SockJS.CLOSED) {
    return;
  }

  // TODO look at docs to determine how to set this
  var wasClean = true;
  this._close(code || 1000, reason || 'Normal closure', wasClean);
};

SockJS.prototype.send = function(data) {
  // #13 - convert anything non-string to string
  // TODO this currently turns objects into [object Object]
  if (typeof data !== 'string') {
    data = '' + data;
  }
  if (this.readyState === SockJS.CONNECTING) {
    throw new Error('InvalidStateError: The connection has not been established yet');
  }
  if (this.readyState !== SockJS.OPEN) {
    return;
  }
  this._transport.send(escape.quote(data));
};

SockJS.version = __webpack_require__(144);

SockJS.CONNECTING = 0;
SockJS.OPEN = 1;
SockJS.CLOSING = 2;
SockJS.CLOSED = 3;

SockJS.prototype._receiveInfo = function(info, rtt) {
  debug('_receiveInfo', rtt);
  this._ir = null;
  if (!info) {
    this._close(1002, 'Cannot connect to server');
    return;
  }

  // establish a round-trip timeout (RTO) based on the
  // round-trip time (RTT)
  this._rto = this.countRTO(rtt);
  // allow server to override url used for the actual transport
  this._transUrl = info.base_url ? info.base_url : this.url;
  info = objectUtils.extend(info, this._urlInfo);
  debug('info', info);
  // determine list of desired and supported transports
  var enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
  this._transports = enabledTransports.main;
  debug(this._transports.length + ' enabled transports');

  this._connect();
};

SockJS.prototype._connect = function() {
  for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
    debug('attempt', Transport.transportName);
    if (Transport.needBody) {
      if (!global.document.body ||
          (typeof global.document.readyState !== 'undefined' &&
            global.document.readyState !== 'complete' &&
            global.document.readyState !== 'interactive')) {
        debug('waiting for body');
        this._transports.unshift(Transport);
        eventUtils.attachEvent('load', this._connect.bind(this));
        return;
      }
    }

    // calculate timeout based on RTO and round trips. Default to 5s
    var timeoutMs = (this._rto * Transport.roundTrips) || 5000;
    this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
    debug('using timeout', timeoutMs);

    var transportUrl = urlUtils.addPath(this._transUrl, '/' + this._server + '/' + this._generateSessionId());
    var options = this._transportOptions[Transport.transportName];
    debug('transport url', transportUrl);
    var transportObj = new Transport(transportUrl, this._transUrl, options);
    transportObj.on('message', this._transportMessage.bind(this));
    transportObj.once('close', this._transportClose.bind(this));
    transportObj.transportName = Transport.transportName;
    this._transport = transportObj;

    return;
  }
  this._close(2000, 'All transports failed', false);
};

SockJS.prototype._transportTimeout = function() {
  debug('_transportTimeout');
  if (this.readyState === SockJS.CONNECTING) {
    this._transportClose(2007, 'Transport timed out');
  }
};

SockJS.prototype._transportMessage = function(msg) {
  debug('_transportMessage', msg);
  var self = this
    , type = msg.slice(0, 1)
    , content = msg.slice(1)
    , payload
    ;

  // first check for messages that don't need a payload
  switch (type) {
    case 'o':
      this._open();
      return;
    case 'h':
      this.dispatchEvent(new Event('heartbeat'));
      debug('heartbeat', this.transport);
      return;
  }

  if (content) {
    try {
      payload = JSON3.parse(content);
    } catch (e) {
      debug('bad json', content);
    }
  }

  if (typeof payload === 'undefined') {
    debug('empty payload', content);
    return;
  }

  switch (type) {
    case 'a':
      if (Array.isArray(payload)) {
        payload.forEach(function(p) {
          debug('message', self.transport, p);
          self.dispatchEvent(new TransportMessageEvent(p));
        });
      }
      break;
    case 'm':
      debug('message', this.transport, payload);
      this.dispatchEvent(new TransportMessageEvent(payload));
      break;
    case 'c':
      if (Array.isArray(payload) && payload.length === 2) {
        this._close(payload[0], payload[1], true);
      }
      break;
  }
};

SockJS.prototype._transportClose = function(code, reason) {
  debug('_transportClose', this.transport, code, reason);
  if (this._transport) {
    this._transport.removeAllListeners();
    this._transport = null;
    this.transport = null;
  }

  if (!userSetCode(code) && code !== 2000 && this.readyState === SockJS.CONNECTING) {
    this._connect();
    return;
  }

  this._close(code, reason);
};

SockJS.prototype._open = function() {
  debug('_open', this._transport.transportName, this.readyState);
  if (this.readyState === SockJS.CONNECTING) {
    if (this._transportTimeoutId) {
      clearTimeout(this._transportTimeoutId);
      this._transportTimeoutId = null;
    }
    this.readyState = SockJS.OPEN;
    this.transport = this._transport.transportName;
    this.dispatchEvent(new Event('open'));
    debug('connected', this.transport);
  } else {
    // The server might have been restarted, and lost track of our
    // connection.
    this._close(1006, 'Server lost session');
  }
};

SockJS.prototype._close = function(code, reason, wasClean) {
  debug('_close', this.transport, code, reason, wasClean, this.readyState);
  var forceFail = false;

  if (this._ir) {
    forceFail = true;
    this._ir.close();
    this._ir = null;
  }
  if (this._transport) {
    this._transport.close();
    this._transport = null;
    this.transport = null;
  }

  if (this.readyState === SockJS.CLOSED) {
    throw new Error('InvalidStateError: SockJS has already been closed');
  }

  this.readyState = SockJS.CLOSING;
  setTimeout(function() {
    this.readyState = SockJS.CLOSED;

    if (forceFail) {
      this.dispatchEvent(new Event('error'));
    }

    var e = new CloseEvent('close');
    e.wasClean = wasClean || false;
    e.code = code || 1000;
    e.reason = reason;

    this.dispatchEvent(e);
    this.onmessage = this.onclose = this.onerror = null;
    debug('disconnected');
  }.bind(this), 0);
};

// See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
// and RFC 2988.
SockJS.prototype.countRTO = function(rtt) {
  // In a local environment, when using IE8/9 and the `jsonp-polling`
  // transport the time needed to establish a connection (the time that pass
  // from the opening of the transport to the call of `_dispatchOpen`) is
  // around 200msec (the lower bound used in the article above) and this
  // causes spurious timeouts. For this reason we calculate a value slightly
  // larger than that used in the article.
  if (rtt > 100) {
    return 4 * rtt; // rto > 400msec
  }
  return 300 + rtt; // 300msec < rto <= 400msec
};

module.exports = function(availableTransports) {
  transports = transport(availableTransports);
  __webpack_require__(278)(SockJS, availableTransports);
  return SockJS;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable */
/* jscs: disable */


// pulled specific shims from https://github.com/es-shims/es5-shim

var ArrayPrototype = Array.prototype;
var ObjectPrototype = Object.prototype;
var FunctionPrototype = Function.prototype;
var StringPrototype = String.prototype;
var array_slice = ArrayPrototype.slice;

var _toString = ObjectPrototype.toString;
var isFunction = function (val) {
    return ObjectPrototype.toString.call(val) === '[object Function]';
};
var isArray = function isArray(obj) {
    return _toString.call(obj) === '[object Array]';
};
var isString = function isString(obj) {
    return _toString.call(obj) === '[object String]';
};

var supportsDescriptors = Object.defineProperty && (function () {
    try {
        Object.defineProperty({}, 'x', {});
        return true;
    } catch (e) { /* this is ES3 */
        return false;
    }
}());

// Define configurable, writable and non-enumerable props
// if they don't exist.
var defineProperty;
if (supportsDescriptors) {
    defineProperty = function (object, name, method, forceAssign) {
        if (!forceAssign && (name in object)) { return; }
        Object.defineProperty(object, name, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: method
        });
    };
} else {
    defineProperty = function (object, name, method, forceAssign) {
        if (!forceAssign && (name in object)) { return; }
        object[name] = method;
    };
}
var defineProperties = function (object, map, forceAssign) {
    for (var name in map) {
        if (ObjectPrototype.hasOwnProperty.call(map, name)) {
          defineProperty(object, name, map[name], forceAssign);
        }
    }
};

var toObject = function (o) {
    if (o == null) { // this matches both null and undefined
        throw new TypeError("can't convert " + o + ' to object');
    }
    return Object(o);
};

//
// Util
// ======
//

// ES5 9.4
// http://es5.github.com/#x9.4
// http://jsperf.com/to-integer

function toInteger(num) {
    var n = +num;
    if (n !== n) { // isNaN
        n = 0;
    } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }
    return n;
}

function ToUint32(x) {
    return x >>> 0;
}

//
// Function
// ========
//

// ES-5 15.3.4.5
// http://es5.github.com/#x15.3.4.5

function Empty() {}

defineProperties(FunctionPrototype, {
    bind: function bind(that) { // .length is 1
        // 1. Let Target be the this value.
        var target = this;
        // 2. If IsCallable(Target) is false, throw a TypeError exception.
        if (!isFunction(target)) {
            throw new TypeError('Function.prototype.bind called on incompatible ' + target);
        }
        // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used
        var args = array_slice.call(arguments, 1); // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.
        var binder = function () {

            if (this instanceof bound) {
                // 15.3.4.5.2 [[Construct]]
                // When the [[Construct]] internal method of a function object,
                // F that was created using the bind function is called with a
                // list of arguments ExtraArgs, the following steps are taken:
                // 1. Let target be the value of F's [[TargetFunction]]
                //   internal property.
                // 2. If target has no [[Construct]] internal method, a
                //   TypeError exception is thrown.
                // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Construct]] internal
                //   method of target providing args as the arguments.

                var result = target.apply(
                    this,
                    args.concat(array_slice.call(arguments))
                );
                if (Object(result) === result) {
                    return result;
                }
                return this;

            } else {
                // 15.3.4.5.1 [[Call]]
                // When the [[Call]] internal method of a function object, F,
                // which was created using the bind function is called with a
                // this value and a list of arguments ExtraArgs, the following
                // steps are taken:
                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 2. Let boundThis be the value of F's [[BoundThis]] internal
                //   property.
                // 3. Let target be the value of F's [[TargetFunction]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Call]] internal method
                //   of target providing boundThis as the this value and
                //   providing args as the arguments.

                // equiv: target.call(this, ...boundArgs, ...args)
                return target.apply(
                    that,
                    args.concat(array_slice.call(arguments))
                );

            }

        };

        // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.

        var boundLength = Math.max(0, target.length - args.length);

        // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
            boundArgs.push('$' + i);
        }

        // XXX Build a dynamic function with desired amount of arguments is the only
        // way to set the length property of a function.
        // In environments where Content Security Policies enabled (Chrome extensions,
        // for ex.) all use of eval or Function costructor throws an exception.
        // However in all of these environments Function.prototype.bind exists
        // and so this code will never be executed.
        var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

        if (target.prototype) {
            Empty.prototype = target.prototype;
            bound.prototype = new Empty();
            // Clean up dangling references.
            Empty.prototype = null;
        }

        // TODO
        // 18. Set the [[Extensible]] internal property of F to true.

        // TODO
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.

        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.

        // 22. Return F.
        return bound;
    }
});

//
// Array
// =====
//

// ES5 15.4.3.2
// http://es5.github.com/#x15.4.3.2
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
defineProperties(Array, { isArray: isArray });


var boxedString = Object('a');
var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

var properlyBoxesContext = function properlyBoxed(method) {
    // Check node 0.6.21 bug where third parameter is not boxed
    var properlyBoxesNonStrict = true;
    var properlyBoxesStrict = true;
    if (method) {
        method.call('foo', function (_, __, context) {
            if (typeof context !== 'object') { properlyBoxesNonStrict = false; }
        });

        method.call([1], function () {
            'use strict';
            properlyBoxesStrict = typeof this === 'string';
        }, 'x');
    }
    return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
};

defineProperties(ArrayPrototype, {
    forEach: function forEach(fun /*, thisp*/) {
        var object = toObject(this),
            self = splitString && isString(this) ? this.split('') : object,
            thisp = arguments[1],
            i = -1,
            length = self.length >>> 0;

        // If no callback function or if callback is not a callable function
        if (!isFunction(fun)) {
            throw new TypeError(); // TODO message
        }

        while (++i < length) {
            if (i in self) {
                // Invoke the callback function with call, passing arguments:
                // context, property value, property key, thisArg object
                // context
                fun.call(thisp, self[i], i, object);
            }
        }
    }
}, !properlyBoxesContext(ArrayPrototype.forEach));

// ES5 15.4.4.14
// http://es5.github.com/#x15.4.4.14
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
defineProperties(ArrayPrototype, {
    indexOf: function indexOf(sought /*, fromIndex */ ) {
        var self = splitString && isString(this) ? this.split('') : toObject(this),
            length = self.length >>> 0;

        if (!length) {
            return -1;
        }

        var i = 0;
        if (arguments.length > 1) {
            i = toInteger(arguments[1]);
        }

        // handle negative indices
        i = i >= 0 ? i : Math.max(0, length + i);
        for (; i < length; i++) {
            if (i in self && self[i] === sought) {
                return i;
            }
        }
        return -1;
    }
}, hasFirefox2IndexOfBug);

//
// String
// ======
//

// ES5 15.5.4.14
// http://es5.github.com/#x15.5.4.14

// [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
// Many browsers do not split properly with regular expressions or they
// do not perform the split correctly under obscure conditions.
// See http://blog.stevenlevithan.com/archives/cross-browser-split
// I've tested in many browsers and this seems to cover the deviant ones:
//    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
//    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
//    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
//       [undefined, "t", undefined, "e", ...]
//    ''.split(/.?/) should be [], not [""]
//    '.'.split(/()()/) should be ["."], not ["", "", "."]

var string_split = StringPrototype.split;
if (
    'ab'.split(/(?:ab)*/).length !== 2 ||
    '.'.split(/(.?)(.?)/).length !== 4 ||
    'tesst'.split(/(s)*/)[1] === 't' ||
    'test'.split(/(?:)/, -1).length !== 4 ||
    ''.split(/.?/).length ||
    '.'.split(/()()/).length > 1
) {
    (function () {
        var compliantExecNpcg = /()??/.exec('')[1] === void 0; // NPCG: nonparticipating capturing group

        StringPrototype.split = function (separator, limit) {
            var string = this;
            if (separator === void 0 && limit === 0) {
                return [];
            }

            // If `separator` is not a regex, use native split
            if (_toString.call(separator) !== '[object RegExp]') {
                return string_split.call(this, separator, limit);
            }

            var output = [],
                flags = (separator.ignoreCase ? 'i' : '') +
                        (separator.multiline  ? 'm' : '') +
                        (separator.extended   ? 'x' : '') + // Proposed for ES6
                        (separator.sticky     ? 'y' : ''), // Firefox 3+
                lastLastIndex = 0,
                // Make `global` and avoid `lastIndex` issues by working with a copy
                separator2, match, lastIndex, lastLength;
            separator = new RegExp(separator.source, flags + 'g');
            string += ''; // Type-convert
            if (!compliantExecNpcg) {
                // Doesn't need flags gy, but they don't hurt
                separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
            }
            /* Values for `limit`, per the spec:
             * If undefined: 4294967295 // Math.pow(2, 32) - 1
             * If 0, Infinity, or NaN: 0
             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
             * If negative number: 4294967296 - Math.floor(Math.abs(limit))
             * If other: Type-convert, then use the above rules
             */
            limit = limit === void 0 ?
                -1 >>> 0 : // Math.pow(2, 32) - 1
                ToUint32(limit);
            while (match = separator.exec(string)) {
                // `separator.lastIndex` is not reliable cross-browser
                lastIndex = match.index + match[0].length;
                if (lastIndex > lastLastIndex) {
                    output.push(string.slice(lastLastIndex, match.index));
                    // Fix browsers whose `exec` methods don't consistently return `undefined` for
                    // nonparticipating capturing groups
                    if (!compliantExecNpcg && match.length > 1) {
                        match[0].replace(separator2, function () {
                            for (var i = 1; i < arguments.length - 2; i++) {
                                if (arguments[i] === void 0) {
                                    match[i] = void 0;
                                }
                            }
                        });
                    }
                    if (match.length > 1 && match.index < string.length) {
                        ArrayPrototype.push.apply(output, match.slice(1));
                    }
                    lastLength = match[0].length;
                    lastLastIndex = lastIndex;
                    if (output.length >= limit) {
                        break;
                    }
                }
                if (separator.lastIndex === match.index) {
                    separator.lastIndex++; // Avoid an infinite loop
                }
            }
            if (lastLastIndex === string.length) {
                if (lastLength || !separator.test('')) {
                    output.push('');
                }
            } else {
                output.push(string.slice(lastLastIndex));
            }
            return output.length > limit ? output.slice(0, limit) : output;
        };
    }());

// [bugfix, chrome]
// If separator is undefined, then the result array contains just one String,
// which is the this value (converted to a String). If limit is not undefined,
// then the output array is truncated so that it contains no more than limit
// elements.
// "0".split(undefined, 0) -> []
} else if ('0'.split(void 0, 0).length) {
    StringPrototype.split = function split(separator, limit) {
        if (separator === void 0 && limit === 0) { return []; }
        return string_split.call(this, separator, limit);
    };
}

// ECMA-262, 3rd B.2.3
// Not an ECMAScript standard, although ECMAScript 3rd Edition has a
// non-normative section suggesting uniform semantics and it should be
// normalized across all browsers
// [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
var string_substr = StringPrototype.substr;
var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
defineProperties(StringPrototype, {
    substr: function substr(start, length) {
        return string_substr.call(
            this,
            start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start,
            length
        );
    }
}, hasNegativeSubstrBug);


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var JSON3 = __webpack_require__(19);

// Some extra characters that Chrome gets wrong, and substitutes with
// something else on the wire.
// eslint-disable-next-line no-control-regex
var extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g
  , extraLookup;

// This may be quite slow, so let's delay until user actually uses bad
// characters.
var unrollLookup = function(escapable) {
  var i;
  var unrolled = {};
  var c = [];
  for (i = 0; i < 65536; i++) {
    c.push( String.fromCharCode(i) );
  }
  escapable.lastIndex = 0;
  c.join('').replace(escapable, function(a) {
    unrolled[ a ] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    return '';
  });
  escapable.lastIndex = 0;
  return unrolled;
};

// Quote string, also taking care of unicode characters that browsers
// often break. Especially, take care of unicode surrogates:
// http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
module.exports = {
  quote: function(string) {
    var quoted = JSON3.stringify(string);

    // In most cases this should be very fast and good enough.
    extraEscapable.lastIndex = 0;
    if (!extraEscapable.test(quoted)) {
      return quoted;
    }

    if (!extraLookup) {
      extraLookup = unrollLookup(extraEscapable);
    }

    return quoted.replace(extraEscapable, function(a) {
      return extraLookup[a];
    });
  }
};


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var debug = function() {};
if (true) {
  debug = __webpack_require__(10)('sockjs-client:utils:transport');
}

module.exports = function(availableTransports) {
  return {
    filterToEnabled: function(transportsWhitelist, info) {
      var transports = {
        main: []
      , facade: []
      };
      if (!transportsWhitelist) {
        transportsWhitelist = [];
      } else if (typeof transportsWhitelist === 'string') {
        transportsWhitelist = [transportsWhitelist];
      }

      availableTransports.forEach(function(trans) {
        if (!trans) {
          return;
        }

        if (trans.transportName === 'websocket' && info.websocket === false) {
          debug('disabled from server', 'websocket');
          return;
        }

        if (transportsWhitelist.length &&
            transportsWhitelist.indexOf(trans.transportName) === -1) {
          debug('not in whitelist', trans.transportName);
          return;
        }

        if (trans.enabled(info)) {
          debug('enabled', trans.transportName);
          transports.main.push(trans);
          if (trans.facadeTransport) {
            transports.facade.push(trans.facadeTransport);
          }
        } else {
          debug('disabled', trans.transportName);
        }
      });
      return transports;
    }
  };
};


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var logObject = {};
['log', 'debug', 'warn'].forEach(function (level) {
  var levelExists;

  try {
    levelExists = global.console && global.console[level] && global.console[level].apply;
  } catch(e) {
    // do nothing
  }

  logObject[level] = levelExists ? function () {
    return global.console[level].apply(global.console, arguments);
  } : (level === 'log' ? function () {} : logObject.log);
});

module.exports = logObject;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(1)
  , Event = __webpack_require__(86)
  ;

function CloseEvent() {
  Event.call(this);
  this.initEvent('close', false, false);
  this.wasClean = false;
  this.code = 0;
  this.reason = '';
}

inherits(CloseEvent, Event);

module.exports = CloseEvent;


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(1)
  , Event = __webpack_require__(86)
  ;

function TransportMessageEvent(data) {
  Event.call(this);
  this.initEvent('message', false, false);
  this.data = data;
}

inherits(TransportMessageEvent, Event);

module.exports = TransportMessageEvent;


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EventEmitter = __webpack_require__(12).EventEmitter
  , inherits = __webpack_require__(1)
  , urlUtils = __webpack_require__(14)
  , XDR = __webpack_require__(83)
  , XHRCors = __webpack_require__(64)
  , XHRLocal = __webpack_require__(48)
  , XHRFake = __webpack_require__(276)
  , InfoIframe = __webpack_require__(277)
  , InfoAjax = __webpack_require__(149)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(10)('sockjs-client:info-receiver');
}

function InfoReceiver(baseUrl, urlInfo) {
  debug(baseUrl);
  var self = this;
  EventEmitter.call(this);

  setTimeout(function() {
    self.doXhr(baseUrl, urlInfo);
  }, 0);
}

inherits(InfoReceiver, EventEmitter);

// TODO this is currently ignoring the list of available transports and the whitelist

InfoReceiver._getReceiver = function(baseUrl, url, urlInfo) {
  // determine method of CORS support (if needed)
  if (urlInfo.sameOrigin) {
    return new InfoAjax(url, XHRLocal);
  }
  if (XHRCors.enabled) {
    return new InfoAjax(url, XHRCors);
  }
  if (XDR.enabled && urlInfo.sameScheme) {
    return new InfoAjax(url, XDR);
  }
  if (InfoIframe.enabled()) {
    return new InfoIframe(baseUrl, url);
  }
  return new InfoAjax(url, XHRFake);
};

InfoReceiver.prototype.doXhr = function(baseUrl, urlInfo) {
  var self = this
    , url = urlUtils.addPath(baseUrl, '/info')
    ;
  debug('doXhr', url);

  this.xo = InfoReceiver._getReceiver(baseUrl, url, urlInfo);

  this.timeoutRef = setTimeout(function() {
    debug('timeout');
    self._cleanup(false);
    self.emit('finish');
  }, InfoReceiver.timeout);

  this.xo.once('finish', function(info, rtt) {
    debug('finish', info, rtt);
    self._cleanup(true);
    self.emit('finish', info, rtt);
  });
};

InfoReceiver.prototype._cleanup = function(wasClean) {
  debug('_cleanup');
  clearTimeout(this.timeoutRef);
  this.timeoutRef = null;
  if (!wasClean && this.xo) {
    this.xo.close();
  }
  this.xo = null;
};

InfoReceiver.prototype.close = function() {
  debug('close');
  this.removeAllListeners();
  this._cleanup(false);
};

InfoReceiver.timeout = 8000;

module.exports = InfoReceiver;


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EventEmitter = __webpack_require__(12).EventEmitter
  , inherits = __webpack_require__(1)
  ;

function XHRFake(/* method, url, payload, opts */) {
  var self = this;
  EventEmitter.call(this);

  this.to = setTimeout(function() {
    self.emit('finish', 200, '{}');
  }, XHRFake.timeout);
}

inherits(XHRFake, EventEmitter);

XHRFake.prototype.close = function() {
  clearTimeout(this.to);
};

XHRFake.timeout = 2000;

module.exports = XHRFake;


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var EventEmitter = __webpack_require__(12).EventEmitter
  , inherits = __webpack_require__(1)
  , JSON3 = __webpack_require__(19)
  , utils = __webpack_require__(22)
  , IframeTransport = __webpack_require__(143)
  , InfoReceiverIframe = __webpack_require__(148)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(10)('sockjs-client:info-iframe');
}

function InfoIframe(baseUrl, url) {
  var self = this;
  EventEmitter.call(this);

  var go = function() {
    var ifr = self.ifr = new IframeTransport(InfoReceiverIframe.transportName, url, baseUrl);

    ifr.once('message', function(msg) {
      if (msg) {
        var d;
        try {
          d = JSON3.parse(msg);
        } catch (e) {
          debug('bad json', msg);
          self.emit('finish');
          self.close();
          return;
        }

        var info = d[0], rtt = d[1];
        self.emit('finish', info, rtt);
      }
      self.close();
    });

    ifr.once('close', function() {
      self.emit('finish');
      self.close();
    });
  };

  // TODO this seems the same as the 'needBody' from transports
  if (!global.document.body) {
    utils.attachEvent('load', go);
  } else {
    go();
  }
}

inherits(InfoIframe, EventEmitter);

InfoIframe.enabled = function() {
  return IframeTransport.enabled();
};

InfoIframe.prototype.close = function() {
  if (this.ifr) {
    this.ifr.close();
  }
  this.removeAllListeners();
  this.ifr = null;
};

module.exports = InfoIframe;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var urlUtils = __webpack_require__(14)
  , eventUtils = __webpack_require__(22)
  , JSON3 = __webpack_require__(19)
  , FacadeJS = __webpack_require__(279)
  , InfoIframeReceiver = __webpack_require__(148)
  , iframeUtils = __webpack_require__(50)
  , loc = __webpack_require__(147)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(10)('sockjs-client:iframe-bootstrap');
}

module.exports = function(SockJS, availableTransports) {
  var transportMap = {};
  availableTransports.forEach(function(at) {
    if (at.facadeTransport) {
      transportMap[at.facadeTransport.transportName] = at.facadeTransport;
    }
  });

  // hard-coded for the info iframe
  // TODO see if we can make this more dynamic
  transportMap[InfoIframeReceiver.transportName] = InfoIframeReceiver;
  var parentOrigin;

  /* eslint-disable camelcase */
  SockJS.bootstrap_iframe = function() {
    /* eslint-enable camelcase */
    var facade;
    iframeUtils.currentWindowId = loc.hash.slice(1);
    var onMessage = function(e) {
      if (e.source !== parent) {
        return;
      }
      if (typeof parentOrigin === 'undefined') {
        parentOrigin = e.origin;
      }
      if (e.origin !== parentOrigin) {
        return;
      }

      var iframeMessage;
      try {
        iframeMessage = JSON3.parse(e.data);
      } catch (ignored) {
        debug('bad json', e.data);
        return;
      }

      if (iframeMessage.windowId !== iframeUtils.currentWindowId) {
        return;
      }
      switch (iframeMessage.type) {
      case 's':
        var p;
        try {
          p = JSON3.parse(iframeMessage.data);
        } catch (ignored) {
          debug('bad json', iframeMessage.data);
          break;
        }
        var version = p[0];
        var transport = p[1];
        var transUrl = p[2];
        var baseUrl = p[3];
        debug(version, transport, transUrl, baseUrl);
        // change this to semver logic
        if (version !== SockJS.version) {
          throw new Error('Incompatible SockJS! Main site uses:' +
                    ' "' + version + '", the iframe:' +
                    ' "' + SockJS.version + '".');
        }

        if (!urlUtils.isOriginEqual(transUrl, loc.href) ||
            !urlUtils.isOriginEqual(baseUrl, loc.href)) {
          throw new Error('Can\'t connect to different domain from within an ' +
                    'iframe. (' + loc.href + ', ' + transUrl + ', ' + baseUrl + ')');
        }
        facade = new FacadeJS(new transportMap[transport](transUrl, baseUrl));
        break;
      case 'm':
        facade._send(iframeMessage.data);
        break;
      case 'c':
        if (facade) {
          facade._close();
        }
        facade = null;
        break;
      }
    };

    eventUtils.attachEvent('message', onMessage);

    // Start
    iframeUtils.postMessage('s');
  };
};


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var JSON3 = __webpack_require__(19)
  , iframeUtils = __webpack_require__(50)
  ;

function FacadeJS(transport) {
  this._transport = transport;
  transport.on('message', this._transportMessage.bind(this));
  transport.on('close', this._transportClose.bind(this));
}

FacadeJS.prototype._transportClose = function(code, reason) {
  iframeUtils.postMessage('c', JSON3.stringify([code, reason]));
};
FacadeJS.prototype._transportMessage = function(frame) {
  iframeUtils.postMessage('t', frame);
};
FacadeJS.prototype._send = function(data) {
  this._transport.send(data);
};
FacadeJS.prototype._close = function() {
  this._transport.close();
  this._transport.removeAllListeners();
};

module.exports = FacadeJS;


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["webstomp"] = factory();
	else
		root["webstomp"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.unicodeStringToTypedArray = unicodeStringToTypedArray;
exports.typedArrayToUnicodeString = typedArrayToUnicodeString;
exports.sizeOfUTF8 = sizeOfUTF8;
exports.createId = createId;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var VERSIONS = exports.VERSIONS = {
    V1_0: '1.0',
    V1_1: '1.1',
    V1_2: '1.2',
    // Versions of STOMP specifications supported
    supportedVersions: function supportedVersions() {
        return '1.2,1.1,1.0';
    },
    supportedProtocols: function supportedProtocols() {
        return ['v10.stomp', 'v11.stomp', 'v12.stomp'];
    }
};

// Define constants for bytes used throughout the code.
var BYTES = exports.BYTES = {
    // LINEFEED byte (octet 10)
    LF: '\x0A',
    // NULL byte (octet 0)
    NULL: '\x00'
};

// utility function to trim any whitespace before and after a string
var trim = exports.trim = function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
};

// from https://coolaj86.com/articles/unicode-string-to-a-utf-8-typed-array-buffer-in-javascript/
function unicodeStringToTypedArray(s) {
    var escstr = encodeURIComponent(s);
    var binstr = escstr.replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
    });
    var arr = Array.prototype.map.call(binstr, function (c) {
        return c.charCodeAt(0);
    });
    return new Uint8Array(arr);
}

// from https://coolaj86.com/articles/unicode-string-to-a-utf-8-typed-array-buffer-in-javascript/
function typedArrayToUnicodeString(ua) {
    var binstr = String.fromCharCode.apply(String, _toConsumableArray(ua));
    var escstr = binstr.replace(/(.)/g, function (m, p) {
        var code = p.charCodeAt(0).toString(16).toUpperCase();
        if (code.length < 2) {
            code = '0' + code;
        }
        return '%' + code;
    });
    return decodeURIComponent(escstr);
}

// Compute the size of a UTF-8 string by counting its number of bytes
// (and not the number of characters composing the string)
function sizeOfUTF8(s) {
    if (!s) return 0;
    return encodeURIComponent(s).match(/%..|./g).length;
}

function createId() {
    var ts = new Date().getTime();
    var rand = Math.floor(Math.random() * 1000);
    return ts + '-' + rand;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _frame = __webpack_require__(2);

var _frame2 = _interopRequireDefault(_frame);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// STOMP Client Class
//
// All STOMP protocol is exposed as methods of this class (`connect()`,
// `send()`, etc.)
var Client = function () {
    function Client(ws) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Client);

        // cannot have default options object + destructuring in the same time in method signature
        var _options$binary = options.binary,
            binary = _options$binary === undefined ? false : _options$binary,
            _options$heartbeat = options.heartbeat,
            heartbeat = _options$heartbeat === undefined ? { outgoing: 10000, incoming: 10000 } : _options$heartbeat,
            _options$debug = options.debug,
            debug = _options$debug === undefined ? true : _options$debug;


        this.ws = ws;
        this.ws.binaryType = 'arraybuffer';
        this.isBinary = !!binary;
        this.hasDebug = !!debug;
        this.connected = false;
        // Heartbeat properties of the client
        // outgoing: send heartbeat every 10s by default (value is in ms)
        // incoming: expect to receive server heartbeat at least every 10s by default
        // falsy value means no heartbeat hence 0,0
        this.heartbeat = heartbeat || { outgoing: 0, incoming: 0 };
        // maximum *WebSocket* frame size sent by the client. If the STOMP frame
        // is bigger than this value, the STOMP frame will be sent using multiple
        // WebSocket frames (default is 16KiB)
        this.maxWebSocketFrameSize = 16 * 1024;
        // subscription callbacks indexed by subscriber's ID
        this.subscriptions = {};
        this.partialData = '';
    }

    // //// Debugging
    //
    // By default, debug messages are logged in the window's console if it is defined.
    // This method is called for every actual transmission of the STOMP frames over the
    // WebSocket.
    //
    // It is possible to set a `debug(message, data)` method
    // on a client instance to handle differently the debug messages:
    //
    //     client.debug = function(str) {
    //         // append the debug log to a #debug div
    //         $("#debug").append(str + "\n");
    //     };


    _createClass(Client, [{
        key: 'debug',
        value: function debug() {
            var _console;

            if (this.hasDebug) (_console = console).log.apply(_console, arguments);
        }

        // [CONNECT Frame](http://stomp.github.com/stomp-specification-1.1.html#CONNECT_or_STOMP_Frame)
        //
        // The `connect` method accepts different number of arguments and types:
        //
        // * `connect(headers, connectCallback)`
        // * `connect(headers, connectCallback, errorCallback)`
        // * `connect(login, passcode, connectCallback)`
        // * `connect(login, passcode, connectCallback, errorCallback)`
        // * `connect(login, passcode, connectCallback, errorCallback, host)`
        //
        // The errorCallback is optional and the 2 first forms allow to pass other
        // headers in addition to `client`, `passcode` and `host`.

    }, {
        key: 'connect',
        value: function connect() {
            var _this = this;

            var _parseConnect2 = this._parseConnect.apply(this, arguments),
                _parseConnect3 = _slicedToArray(_parseConnect2, 3),
                headers = _parseConnect3[0],
                connectCallback = _parseConnect3[1],
                errorCallback = _parseConnect3[2];

            this.connectCallback = connectCallback;
            this.debug('Opening Web Socket...');
            this.ws.onmessage = function (evt) {
                var data = evt.data;
                if (evt.data instanceof ArrayBuffer) {
                    data = (0, _utils.typedArrayToUnicodeString)(new Uint8Array(evt.data));
                }
                _this.serverActivity = Date.now();
                // heartbeat
                if (data === _utils.BYTES.LF) {
                    _this.debug('<<< PONG');
                    return;
                }
                _this.debug('<<< ' + data);
                // Handle STOMP frames received from the server
                // The unmarshall function returns the frames parsed and any remaining
                // data from partial frames.
                var unmarshalledData = _frame2.default.unmarshall(_this.partialData + data);
                _this.partialData = unmarshalledData.partial;
                unmarshalledData.frames.forEach(function (frame) {
                    switch (frame.command) {
                        // [CONNECTED Frame](http://stomp.github.com/stomp-specification-1.1.html#CONNECTED_Frame)
                        case 'CONNECTED':
                            _this.debug('connected to server ' + frame.headers.server);
                            _this.connected = true;
                            _this.version = frame.headers.version;
                            _this._setupHeartbeat(frame.headers);
                            if (connectCallback) connectCallback(frame);
                            break;
                        // [MESSAGE Frame](http://stomp.github.com/stomp-specification-1.1.html#MESSAGE)
                        case 'MESSAGE':
                            // the `onreceive` callback is registered when the client calls
                            // `subscribe()`.
                            // If there is registered subscription for the received message,
                            // we used the default `onreceive` method that the client can set.
                            // This is useful for subscriptions that are automatically created
                            // on the browser side (e.g. [RabbitMQ's temporary
                            // queues](http://www.rabbitmq.com/stomp.html)).
                            var subscription = frame.headers.subscription;
                            var onreceive = _this.subscriptions[subscription] || _this.onreceive;
                            if (onreceive) {
                                // 1.2 define ack header if ack is set to client
                                // and this header must be used for ack/nack
                                var messageID = _this.version === _utils.VERSIONS.V1_2 && frame.headers.ack || frame.headers['message-id'];
                                // add `ack()` and `nack()` methods directly to the returned frame
                                // so that a simple call to `message.ack()` can acknowledge the message.
                                frame.ack = _this.ack.bind(_this, messageID, subscription);
                                frame.nack = _this.nack.bind(_this, messageID, subscription);
                                onreceive(frame);
                            } else {
                                _this.debug('Unhandled received MESSAGE: ' + frame);
                            }
                            break;
                        // [RECEIPT Frame](http://stomp.github.com/stomp-specification-1.1.html#RECEIPT)
                        //
                        // The client instance can set its `onreceipt` field to a function taking
                        // a frame argument that will be called when a receipt is received from
                        // the server:
                        //
                        //     client.onreceipt = function(frame) {
                        //       receiptID = frame.headers['receipt-id'];
                        //       ...
                        //     }
                        case 'RECEIPT':
                            if (_this.onreceipt) _this.onreceipt(frame);
                            break;
                        // [ERROR Frame](http://stomp.github.com/stomp-specification-1.1.html#ERROR)
                        case 'ERROR':
                            if (errorCallback) errorCallback(frame);
                            break;
                        default:
                            _this.debug('Unhandled frame: ' + frame);
                    }
                });
            };
            this.ws.onclose = function (event) {
                _this.debug('Whoops! Lost connection to ' + _this.ws.url + ':', { event: event });
                _this._cleanUp();
                if (errorCallback) errorCallback(event);
            };
            this.ws.onopen = function () {
                _this.debug('Web Socket Opened...');
                headers['accept-version'] = _utils.VERSIONS.supportedVersions();
                // Check if we already have heart-beat in headers before adding them
                if (!headers['heart-beat']) {
                    headers['heart-beat'] = [_this.heartbeat.outgoing, _this.heartbeat.incoming].join(',');
                }
                _this._transmit('CONNECT', headers);
            };
        }

        // [DISCONNECT Frame](http://stomp.github.com/stomp-specification-1.1.html#DISCONNECT)

    }, {
        key: 'disconnect',
        value: function disconnect(disconnectCallback) {
            var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            this._transmit('DISCONNECT', headers);
            // Discard the onclose callback to avoid calling the errorCallback when
            // the client is properly disconnected.
            this.ws.onclose = null;
            this.ws.close();
            this._cleanUp();
            // TODO: what's the point of this callback disconnect is not async
            if (disconnectCallback) disconnectCallback();
        }

        // [SEND Frame](http://stomp.github.com/stomp-specification-1.1.html#SEND)
        //
        // * `destination` is MANDATORY.

    }, {
        key: 'send',
        value: function send(destination) {
            var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var hdrs = Object.assign({}, headers);
            hdrs.destination = destination;
            this._transmit('SEND', hdrs, body);
        }

        // [BEGIN Frame](http://stomp.github.com/stomp-specification-1.1.html#BEGIN)
        //
        // If no transaction ID is passed, one will be created automatically

    }, {
        key: 'begin',
        value: function begin() {
            var transaction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'tx-' + (0, _utils.createId)();

            this._transmit('BEGIN', { transaction: transaction });
            return {
                id: transaction,
                commit: this.commit.bind(this, transaction),
                abort: this.abort.bind(this, transaction)
            };
        }

        // [COMMIT Frame](http://stomp.github.com/stomp-specification-1.1.html#COMMIT)
        //
        // * `transaction` is MANDATORY.
        //
        // It is preferable to commit a transaction by calling `commit()` directly on
        // the object returned by `client.begin()`:
        //
        //     var tx = client.begin(txid);
        //     ...
        //     tx.commit();

    }, {
        key: 'commit',
        value: function commit(transaction) {
            this._transmit('COMMIT', { transaction: transaction });
        }

        // [ABORT Frame](http://stomp.github.com/stomp-specification-1.1.html#ABORT)
        //
        // * `transaction` is MANDATORY.
        //
        // It is preferable to abort a transaction by calling `abort()` directly on
        // the object returned by `client.begin()`:
        //
        //     var tx = client.begin(txid);
        //     ...
        //     tx.abort();

    }, {
        key: 'abort',
        value: function abort(transaction) {
            this._transmit('ABORT', { transaction: transaction });
        }

        // [ACK Frame](http://stomp.github.com/stomp-specification-1.1.html#ACK)
        //
        // * `messageID` & `subscription` are MANDATORY.
        //
        // It is preferable to acknowledge a message by calling `ack()` directly
        // on the message handled by a subscription callback:
        //
        //     client.subscribe(destination,
        //       function(message) {
        //         // process the message
        //         // acknowledge it
        //         message.ack();
        //       },
        //       {'ack': 'client'}
        //     );

    }, {
        key: 'ack',
        value: function ack(messageID, subscription) {
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var hdrs = Object.assign({}, headers);
            // 1.2 change id header name from message-id to id
            var idAttr = this.version === _utils.VERSIONS.V1_2 ? 'id' : 'message-id';
            hdrs[idAttr] = messageID;
            hdrs.subscription = subscription;
            this._transmit('ACK', hdrs);
        }

        // [NACK Frame](http://stomp.github.com/stomp-specification-1.1.html#NACK)
        //
        // * `messageID` & `subscription` are MANDATORY.
        //
        // It is preferable to nack a message by calling `nack()` directly on the
        // message handled by a subscription callback:
        //
        //     client.subscribe(destination,
        //       function(message) {
        //         // process the message
        //         // an error occurs, nack it
        //         message.nack();
        //       },
        //       {'ack': 'client'}
        //     );

    }, {
        key: 'nack',
        value: function nack(messageID, subscription) {
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var hdrs = Object.assign({}, headers);
            // 1.2 change id header name from message-id to id
            var idAttr = this.version === _utils.VERSIONS.V1_2 ? 'id' : 'message-id';
            hdrs[idAttr] = messageID;
            hdrs.subscription = subscription;
            this._transmit('NACK', hdrs);
        }

        // [SUBSCRIBE Frame](http://stomp.github.com/stomp-specification-1.1.html#SUBSCRIBE)

    }, {
        key: 'subscribe',
        value: function subscribe(destination, callback) {
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var hdrs = Object.assign({}, headers);
            // for convenience if the `id` header is not set, we create a new one for this client
            // that will be returned to be able to unsubscribe this subscription
            if (!hdrs.id) hdrs.id = 'sub-' + (0, _utils.createId)();
            hdrs.destination = destination;
            this.subscriptions[hdrs.id] = callback;
            this._transmit('SUBSCRIBE', hdrs);
            return {
                id: hdrs.id,
                unsubscribe: this.unsubscribe.bind(this, hdrs.id)
            };
        }

        // [UNSUBSCRIBE Frame](http://stomp.github.com/stomp-specification-1.1.html#UNSUBSCRIBE)
        //
        // * `id` is MANDATORY.
        //
        // It is preferable to unsubscribe from a subscription by calling
        // `unsubscribe()` directly on the object returned by `client.subscribe()`:
        //
        //     var subscription = client.subscribe(destination, onmessage);
        //     ...
        //     subscription.unsubscribe(headers);

    }, {
        key: 'unsubscribe',
        value: function unsubscribe(id) {
            var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var hdrs = Object.assign({}, headers);
            delete this.subscriptions[id];
            hdrs.id = id;
            this._transmit('UNSUBSCRIBE', hdrs);
        }

        // Clean up client resources when it is disconnected or the server did not
        // send heart beats in a timely fashion

    }, {
        key: '_cleanUp',
        value: function _cleanUp() {
            this.connected = false;
            clearInterval(this.pinger);
            clearInterval(this.ponger);
        }

        // Base method to transmit any stomp frame

    }, {
        key: '_transmit',
        value: function _transmit(command, headers, body) {
            var out = _frame2.default.marshall(command, headers, body);
            this.debug('>>> ' + out, { frame: { command: command, headers: headers, body: body } });
            this._wsSend(out);
        }
    }, {
        key: '_wsSend',
        value: function _wsSend(data) {
            if (this.isBinary) data = (0, _utils.unicodeStringToTypedArray)(data);
            this.debug('>>> length ' + data.length);
            // if necessary, split the *STOMP* frame to send it on many smaller
            // *WebSocket* frames
            while (true) {
                if (data.length > this.maxWebSocketFrameSize) {
                    this.ws.send(data.slice(0, this.maxWebSocketFrameSize));
                    data = data.slice(this.maxWebSocketFrameSize);
                    this.debug('remaining = ' + data.length);
                } else {
                    return this.ws.send(data);
                }
            }
        }

        // Heart-beat negotiation

    }, {
        key: '_setupHeartbeat',
        value: function _setupHeartbeat(headers) {
            var _this2 = this;

            if (this.version !== _utils.VERSIONS.V1_1 && this.version !== _utils.VERSIONS.V1_2) return;

            // heart-beat header received from the server looks like:
            //
            //     heart-beat: sx, sy

            var _split$map = (headers['heart-beat'] || '0,0').split(',').map(function (v) {
                return parseInt(v, 10);
            }),
                _split$map2 = _slicedToArray(_split$map, 2),
                serverOutgoing = _split$map2[0],
                serverIncoming = _split$map2[1];

            if (!(this.heartbeat.outgoing === 0 || serverIncoming === 0)) {
                var ttl = Math.max(this.heartbeat.outgoing, serverIncoming);
                this.debug('send PING every ' + ttl + 'ms');
                this.pinger = setInterval(function () {
                    _this2._wsSend(_utils.BYTES.LF);
                    _this2.debug('>>> PING');
                }, ttl);
            }

            if (!(this.heartbeat.incoming === 0 || serverOutgoing === 0)) {
                var _ttl = Math.max(this.heartbeat.incoming, serverOutgoing);
                this.debug('check PONG every ' + _ttl + 'ms');
                this.ponger = setInterval(function () {
                    var delta = Date.now() - _this2.serverActivity;
                    // We wait twice the TTL to be flexible on window's setInterval calls
                    if (delta > _ttl * 2) {
                        _this2.debug('did not receive server activity for the last ' + delta + 'ms');
                        _this2.ws.close();
                    }
                }, _ttl);
            }
        }

        // parse the arguments number and type to find the headers, connectCallback and
        // (eventually undefined) errorCallback

    }, {
        key: '_parseConnect',
        value: function _parseConnect() {
            var headers = {},
                connectCallback = void 0,
                errorCallback = void 0;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            switch (args.length) {
                case 2:
                    headers = args[0];
                    connectCallback = args[1];

                    break;
                case 3:
                    if (args[1] instanceof Function) {
                        headers = args[0];
                        connectCallback = args[1];
                        errorCallback = args[2];
                    } else {
                        headers.login = args[0];
                        headers.passcode = args[1];
                        connectCallback = args[2];
                    }
                    break;
                case 4:
                    headers.login = args[0];
                    headers.passcode = args[1];
                    connectCallback = args[2];
                    errorCallback = args[3];

                    break;
                default:
                    headers.login = args[0];
                    headers.passcode = args[1];
                    connectCallback = args[2];
                    errorCallback = args[3];
                    headers.host = args[4];

            }

            return [headers, connectCallback, errorCallback];
        }
    }]);

    return Client;
}();

exports.default = Client;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// [STOMP Frame](http://stomp.github.com/stomp-specification-1.1.html#STOMP_Frames) Class
var Frame = function () {

    // Frame constructor
    function Frame(command) {
        var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        _classCallCheck(this, Frame);

        this.command = command;
        this.headers = headers;
        this.body = body;
    }

    // Provides a textual representation of the frame
    // suitable to be sent to the server


    _createClass(Frame, [{
        key: 'toString',
        value: function toString() {
            var _this = this;

            var lines = [this.command],
                skipContentLength = this.headers['content-length'] === false;
            if (skipContentLength) delete this.headers['content-length'];

            Object.keys(this.headers).forEach(function (name) {
                var value = _this.headers[name];
                lines.push(name + ':' + value);
            });

            if (this.body && !skipContentLength) {
                lines.push('content-length:' + (0, _utils.sizeOfUTF8)(this.body));
            }

            lines.push(_utils.BYTES.LF + this.body);

            return lines.join(_utils.BYTES.LF);
        }

        // Unmarshall a single STOMP frame from a `data` string

    }], [{
        key: 'unmarshallSingle',
        value: function unmarshallSingle(data) {
            // search for 2 consecutives LF byte to split the command
            // and headers from the body
            var divider = data.search(new RegExp(_utils.BYTES.LF + _utils.BYTES.LF)),
                headerLines = data.substring(0, divider).split(_utils.BYTES.LF),
                command = headerLines.shift(),
                headers = {},
                body = '',

            // skip the 2 LF bytes that divides the headers from the body
            bodyIndex = divider + 2;

            // Parse headers in reverse order so that for repeated headers, the 1st
            // value is used
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = headerLines.reverse()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var line = _step.value;

                    var idx = line.indexOf(':');
                    headers[(0, _utils.trim)(line.substring(0, idx))] = (0, _utils.trim)(line.substring(idx + 1));
                }
                // Parse body
                // check for content-length or topping at the first NULL byte found.
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (headers['content-length']) {
                var len = parseInt(headers['content-length'], 10);
                body = ('' + data).substring(bodyIndex, bodyIndex + len);
            } else {
                var chr = null;
                for (var i = bodyIndex; i < data.length; i++) {
                    chr = data.charAt(i);
                    if (chr === _utils.BYTES.NULL) break;
                    body += chr;
                }
            }

            return new Frame(command, headers, body);
        }

        // Split the data before unmarshalling every single STOMP frame.
        // Web socket servers can send multiple frames in a single websocket message.
        // If the message size exceeds the websocket message size, then a single
        // frame can be fragmented across multiple messages.
        //
        // `datas` is a string.
        //
        // returns an *array* of Frame objects

    }, {
        key: 'unmarshall',
        value: function unmarshall(datas) {
            // split and unmarshall *multiple STOMP frames* contained in a *single WebSocket frame*.
            // The data is split when a NULL byte (followed by zero or many LF bytes) is found
            var frames = datas.split(new RegExp(_utils.BYTES.NULL + _utils.BYTES.LF + '*')),
                firstFrames = frames.slice(0, -1),
                lastFrame = frames.slice(-1)[0],
                r = {
                frames: firstFrames.map(function (f) {
                    return Frame.unmarshallSingle(f);
                }),
                partial: ''
            };

            // If this contains a final full message or just a acknowledgement of a PING
            // without any other content, process this frame, otherwise return the
            // contents of the buffer to the caller.
            if (lastFrame === _utils.BYTES.LF || lastFrame.search(RegExp(_utils.BYTES.NULL + _utils.BYTES.LF + '*$')) !== -1) {
                r.frames.push(Frame.unmarshallSingle(lastFrame));
            } else {
                r.partial = lastFrame;
            }

            return r;
        }

        // Marshall a Stomp frame

    }, {
        key: 'marshall',
        value: function marshall(command, headers, body) {
            var frame = new Frame(command, headers, body);
            return frame.toString() + _utils.BYTES.NULL;
        }
    }]);

    return Frame;
}();

exports.default = Frame;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _client = __webpack_require__(1);

var _client2 = _interopRequireDefault(_client);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The `webstomp` Object
var webstomp = {
    VERSIONS: _utils.VERSIONS,
    // This method creates a WebSocket client that is connected to
    // the STOMP server located at the url.
    client: function client(url) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var ws = new WebSocket(url, options.protocols || _utils.VERSIONS.supportedProtocols());
        return new _client2.default(ws, options);
    },
    // This method is an alternative to `webstomp.client()` to let the user
    // specify the WebSocket to use (either a standard HTML5 WebSocket or
    // a similar object).
    over: function over() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return new (Function.prototype.bind.apply(_client2.default, [null].concat(args)))();
    }
};

exports.default = webstomp;
module.exports = exports['default'];

/***/ })
/******/ ]);
});

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(21));
__export(__webpack_require__(97));
__export(__webpack_require__(282));
__export(__webpack_require__(2));
__export(__webpack_require__(31));
__export(__webpack_require__(69));
__export(__webpack_require__(54));


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractError_1 = __webpack_require__(21);
var IllegalActionError = (function (_super) {
    __extends(IllegalActionError, _super);
    function IllegalActionError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IllegalActionError.prototype, "name", {
        get: function () { return "IllegalActionError"; },
        enumerable: true,
        configurable: true
    });
    return IllegalActionError;
}(AbstractError_1.AbstractError));
exports.IllegalActionError = IllegalActionError;


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __importStar(__webpack_require__(103));
exports.Errors = Errors;
__export(__webpack_require__(70));
__export(__webpack_require__(107));
__export(__webpack_require__(53));
__export(__webpack_require__(28));
__export(__webpack_require__(108));
__export(__webpack_require__(284));
__export(__webpack_require__(118));


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
})(StatusCode = exports.StatusCode || (exports.StatusCode = {}));


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(78));
__export(__webpack_require__(68));
__export(__webpack_require__(44));
__export(__webpack_require__(102));


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var AddMemberAction_1 = __webpack_require__(81);
exports.AddMemberAction = AddMemberAction_1.AddMemberAction;
__export(__webpack_require__(152));
__export(__webpack_require__(153));
__export(__webpack_require__(154));
__export(__webpack_require__(287));
__export(__webpack_require__(151));
__export(__webpack_require__(72));
var RemoveMemberAction_1 = __webpack_require__(82);
exports.RemoveMemberAction = RemoveMemberAction_1.RemoveMemberAction;
__export(__webpack_require__(60));
__export(__webpack_require__(155));
__export(__webpack_require__(79));


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(288));
__export(__webpack_require__(75));


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = __webpack_require__(37);
var TransientDirectContainer_1 = __webpack_require__(75);
exports.DirectContainer = {
    TYPE: TransientDirectContainer_1.TransientDirectContainer.TYPE,
    is: function (value) {
        return TransientDirectContainer_1.TransientDirectContainer.is(value)
            && Document_1.Document.is(value);
    },
    create: TransientDirectContainer_1.TransientDirectContainer.create,
    createFrom: TransientDirectContainer_1.TransientDirectContainer.createFrom,
};


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(120));
__export(__webpack_require__(121));


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(156));
__export(__webpack_require__(157));
__export(__webpack_require__(158));
__export(__webpack_require__(159));
__export(__webpack_require__(160));
__export(__webpack_require__(74));
__export(__webpack_require__(25));
__export(__webpack_require__(161));
__export(__webpack_require__(162));
__export(__webpack_require__(87));
__export(__webpack_require__(163));
__export(__webpack_require__(164));
__export(__webpack_require__(135));
__export(__webpack_require__(111));


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(59));
__export(__webpack_require__(42));
__export(__webpack_require__(52));
__export(__webpack_require__(43));
__export(__webpack_require__(8));
__export(__webpack_require__(99));


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(165));
__export(__webpack_require__(166));


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(122));
__export(__webpack_require__(119));
var SPARQLService_1 = __webpack_require__(80);
exports.SPARQLService = SPARQLService_1.SPARQLService;


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(168));
__export(__webpack_require__(167));


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(3));
__export(__webpack_require__(296));
__export(__webpack_require__(45));
__export(__webpack_require__(297));
__export(__webpack_require__(88));
__export(__webpack_require__(298));
__export(__webpack_require__(11));


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CS = {
    namespace: "https://carbonldp.com/ns/v1/security#",
    AccessControlEntry: "https://carbonldp.com/ns/v1/security#AccessControlEntry",
    AccessControlList: "https://carbonldp.com/ns/v1/security#AccessControlList",
    AllOrigins: "https://carbonldp.com/ns/v1/security#AllOrigins",
    AuthenticatedUserInformationAccessor: "https://carbonldp.com/ns/v1/security#AuthenticatedUserInformationAccessor",
    AuthenticatedUserMetadata: "https://carbonldp.com/ns/v1/security#AuthenticatedUserMetadata",
    CreateAccessPoint: "https://carbonldp.com/ns/v1/security#CreateAccessPoint",
    CreateChild: "https://carbonldp.com/ns/v1/security#CreateChild",
    Credentials: "https://carbonldp.com/ns/v1/security#Credentials",
    CredentialsSet: "https://carbonldp.com/ns/v1/security#CredentialsSet",
    Delete: "https://carbonldp.com/ns/v1/security#Delete",
    Download: "https://carbonldp.com/ns/v1/security#Download",
    Extend: "https://carbonldp.com/ns/v1/security#Extend",
    LDAPCredentials: "https://carbonldp.com/ns/v1/security#LDAPCredentials",
    ManageSecurity: "https://carbonldp.com/ns/v1/security#ManageSecurity",
    PreferAuthToken: "https://carbonldp.com/ns/v1/security#PreferAuthToken",
    ProtectedDocument: "https://carbonldp.com/ns/v1/security#ProtectedDocument",
    Read: "https://carbonldp.com/ns/v1/security#Read",
    RemoveMember: "https://carbonldp.com/ns/v1/security#RemoveMember",
    Role: "https://carbonldp.com/ns/v1/security#Role",
    Ticket: "https://carbonldp.com/ns/v1/security#Ticket",
    TokenCredentials: "https://carbonldp.com/ns/v1/security#TokenCredentials",
    Update: "https://carbonldp.com/ns/v1/security#Update",
    Upload: "https://carbonldp.com/ns/v1/security#Upload",
    User: "https://carbonldp.com/ns/v1/security#User",
    UsernameAndPasswordCredentials: "https://carbonldp.com/ns/v1/security#UsernameAndPasswordCredentials",
    accessControlEntry: "https://carbonldp.com/ns/v1/security#accessControlEntry",
    accessControlList: "https://carbonldp.com/ns/v1/security#accessControlList",
    accessTo: "https://carbonldp.com/ns/v1/security#accessTo",
    allowsOrigin: "https://carbonldp.com/ns/v1/security#allowsOrigin",
    authToken: "https://carbonldp.com/ns/v1/security#authToken",
    authenticatedUserMetadata: "https://carbonldp.com/ns/v1/security#authenticatedUserMetadata",
    childRole: "https://carbonldp.com/ns/v1/security#childRole",
    credentials: "https://carbonldp.com/ns/v1/security#credentials",
    credentialsOf: "https://carbonldp.com/ns/v1/security#credentialsOf",
    description: "https://carbonldp.com/ns/v1/security#description",
    enabled: "https://carbonldp.com/ns/v1/security#enabled",
    expires: "https://carbonldp.com/ns/v1/security#expires",
    forIRI: "https://carbonldp.com/ns/v1/security#forIRI",
    granting: "https://carbonldp.com/ns/v1/security#granting",
    inheritableEntry: "https://carbonldp.com/ns/v1/security#inheritableEntry",
    ldapServer: "https://carbonldp.com/ns/v1/security#ldapServer",
    ldapUserDN: "https://carbonldp.com/ns/v1/security#ldapUserDN",
    name: "https://carbonldp.com/ns/v1/security#name",
    parentRole: "https://carbonldp.com/ns/v1/security#parentRole",
    password: "https://carbonldp.com/ns/v1/security#password",
    permission: "https://carbonldp.com/ns/v1/security#permission",
    rootContainer: "https://carbonldp.com/ns/v1/security#rootContainer",
    subject: "https://carbonldp.com/ns/v1/security#subject",
    subjectClass: "https://carbonldp.com/ns/v1/security#subjectClass",
    ticketKey: "https://carbonldp.com/ns/v1/security#ticketKey",
    token: "https://carbonldp.com/ns/v1/security#token",
    user: "https://carbonldp.com/ns/v1/security#user",
    username: "https://carbonldp.com/ns/v1/security#username",
};


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RDF = {
    namespace: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    type: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
};


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VCARD = {
    namespace: "http://www.w3.org/2001/vcard-rdf/3.0#",
    email: "http://www.w3.org/2001/vcard-rdf/3.0#email",
};


/***/ })
/******/ ]);
});