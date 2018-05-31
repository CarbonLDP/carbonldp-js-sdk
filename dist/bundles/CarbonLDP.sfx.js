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
/******/ 	return __webpack_require__(__webpack_require__.s = 180);
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(11));
__export(__webpack_require__(65));
__export(__webpack_require__(239));
__export(__webpack_require__(240));
__export(__webpack_require__(66));
__export(__webpack_require__(241));
__export(__webpack_require__(14));


/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(28));
__export(__webpack_require__(202));
__export(__webpack_require__(203));
__export(__webpack_require__(29));
__export(__webpack_require__(62));
__export(__webpack_require__(204));
__export(__webpack_require__(205));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(38));
__export(__webpack_require__(86));
__export(__webpack_require__(60));
__export(__webpack_require__(182));
__export(__webpack_require__(49));
__export(__webpack_require__(61));
__export(__webpack_require__(37));
__export(__webpack_require__(25));
__export(__webpack_require__(183));
__export(__webpack_require__(184));
__export(__webpack_require__(87));
__export(__webpack_require__(88));
__export(__webpack_require__(89));
__export(__webpack_require__(90));
__export(__webpack_require__(91));
__export(__webpack_require__(185));
__export(__webpack_require__(92));
__export(__webpack_require__(186));
__export(__webpack_require__(187));
__export(__webpack_require__(188));
__export(__webpack_require__(189));
__export(__webpack_require__(190));
__export(__webpack_require__(191));
__export(__webpack_require__(192));
__export(__webpack_require__(193));
__export(__webpack_require__(194));
__export(__webpack_require__(195));
__export(__webpack_require__(196));
__export(__webpack_require__(197));
__export(__webpack_require__(198));
__export(__webpack_require__(199));
__export(__webpack_require__(200));
__export(__webpack_require__(201));

//# sourceMappingURL=index.js.map


/***/ }),
/* 5 */
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
var Errors_1 = __webpack_require__(3);
var Resource_1 = __webpack_require__(7);
var HTTPError = (function (_super) {
    __extends(HTTPError, _super);
    function HTTPError(message, response) {
        var _this = _super.call(this, message) || this;
        Resource_1.TransientResource.createFrom(_this);
        _this.errors = [];
        _this.requestID = null;
        _this.response = response;
        _this.statusCode = response.status;
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
}(Errors_1.AbstractError));
exports.HTTPError = HTTPError;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(4);
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PersistedResource_1 = __webpack_require__(211);
exports.PersistedResource = PersistedResource_1.PersistedResource;
var TransientResource_1 = __webpack_require__(103);
exports.TransientResource = TransientResource_1.TransientResource;


/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(282);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(102)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(98));
__export(__webpack_require__(40));
__export(__webpack_require__(52));
__export(__webpack_require__(51));
__export(__webpack_require__(41));
__export(__webpack_require__(108));


/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ContainerType_1 = __webpack_require__(94);
exports.ContainerType = ContainerType_1.ContainerType;
var DigestedObjectSchema_1 = __webpack_require__(95);
exports.DigestedObjectSchema = DigestedObjectSchema_1.DigestedObjectSchema;
var DigestedObjectSchemaProperty_1 = __webpack_require__(96);
exports.DigestedObjectSchemaProperty = DigestedObjectSchemaProperty_1.DigestedObjectSchemaProperty;
var ObjectSchemaDigester_1 = __webpack_require__(206);
exports.ObjectSchemaDigester = ObjectSchemaDigester_1.ObjectSchemaDigester;
var ObjectSchemaResolver_1 = __webpack_require__(242);
exports.ObjectSchemaResolver = ObjectSchemaResolver_1.ObjectSchemaResolver;
var ObjectSchemaUtils_1 = __webpack_require__(97);
exports.ObjectSchemaUtils = ObjectSchemaUtils_1.ObjectSchemaUtils;
var PointerType_1 = __webpack_require__(109);
exports.PointerType = PointerType_1.PointerType;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(2)
  , EventTarget = __webpack_require__(138)
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
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(215));


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var URL = __webpack_require__(137);

var debug = function() {};
if (true) {
  debug = __webpack_require__(9)('sockjs-client:utils:url');
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(216));


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var BasePersistedDocument_1 = __webpack_require__(67);
exports.BasePersistedDocument = BasePersistedDocument_1.BasePersistedDocument;
var CRUDDocument_1 = __webpack_require__(72);
exports.CRUDDocument = CRUDDocument_1.CRUDDocument;
__export(__webpack_require__(263));
__export(__webpack_require__(53));


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var finish_1 = __webpack_require__(153);
var subFinish_1 = __webpack_require__(154);
var IRIResolver_1 = __webpack_require__(33);
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(250));
__export(__webpack_require__(251));
__export(__webpack_require__(252));
__export(__webpack_require__(253));
__export(__webpack_require__(255));
__export(__webpack_require__(256));
__export(__webpack_require__(257));
__export(__webpack_require__(258));
__export(__webpack_require__(117));


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(153));
__export(__webpack_require__(310));
__export(__webpack_require__(154));
__export(__webpack_require__(311));
__export(__webpack_require__(312));
__export(__webpack_require__(313));
__export(__webpack_require__(318));
__export(__webpack_require__(319));
__export(__webpack_require__(320));
__export(__webpack_require__(321));

//# sourceMappingURL=index.js.map


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(245));
__export(__webpack_require__(111));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(247));
__export(__webpack_require__(261));
__export(__webpack_require__(99));
__export(__webpack_require__(100));


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
;(function () {
  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = "function" === "function" && __webpack_require__(290);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(289)(module), __webpack_require__(8)))

/***/ }),
/* 25 */
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
/* 26 */
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
var Errors = __importStar(__webpack_require__(30));
exports.Errors = Errors;
__export(__webpack_require__(64));
__export(__webpack_require__(105));
__export(__webpack_require__(50));
__export(__webpack_require__(63));
__export(__webpack_require__(106));
__export(__webpack_require__(249));
__export(__webpack_require__(115));


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var random = __webpack_require__(35);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 28 */
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
/* 29 */
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
var AbstractError_1 = __webpack_require__(28);
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
/* 30 */
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
var ClientErrors = __importStar(__webpack_require__(101));
var ServerErrors = __importStar(__webpack_require__(104));
__export(__webpack_require__(101));
__export(__webpack_require__(104));
__export(__webpack_require__(5));
__export(__webpack_require__(237));
exports.statusCodeMap = new Map();
var addErrors = function (o) { return Object
    .keys(o)
    .map(function (k) { return o[k]; })
    .forEach(function (e) { return exports.statusCodeMap.set(e.statusCode, e); }); };
addErrors(ClientErrors);
addErrors(ServerErrors);


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = __webpack_require__(7);
var Vocabularies_1 = __webpack_require__(1);
var SCHEMA = {
    "target": {
        "@id": Vocabularies_1.C.target,
        "@type": "@id",
    },
};
exports.EventMessage = {
    SCHEMA: SCHEMA,
    is: function (value) {
        return Resource_1.TransientResource.is(value)
            && value.hasOwnProperty("target");
    },
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(33));
__export(__webpack_require__(59));

//# sourceMappingURL=index.js.map


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(59);
var tokens_1 = __webpack_require__(6);
var tokens_2 = __webpack_require__(4);
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(244));
__export(__webpack_require__(165));


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global crypto:true */
var crypto = __webpack_require__(279);

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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(2)
  , urlUtils = __webpack_require__(16)
  , SenderReceiver = __webpack_require__(139)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(9)('sockjs-client:ajax-based');
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
/* 37 */
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
var Identifier_1 = __webpack_require__(38);
var NewLineSymbol_1 = __webpack_require__(60);
var Operator_1 = __webpack_require__(49);
var RightSymbol_1 = __webpack_require__(61);
var Token_1 = __webpack_require__(25);
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
/* 38 */
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
var StringLiteral_1 = __webpack_require__(37);
var Token_1 = __webpack_require__(25);
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
/* 39 */
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
/* 40 */
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = __webpack_require__(29);
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
            return uri;
        var parts = uri.split("/");
        if (parts[parts.length - 1] === "") {
            return parts[parts.length - 2] + "/";
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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(68));
__export(__webpack_require__(114));
__export(__webpack_require__(248));


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(118));
__export(__webpack_require__(70));
__export(__webpack_require__(120));
__export(__webpack_require__(121));
__export(__webpack_require__(71));
var QueryDocumentDocument_1 = __webpack_require__(259);
exports.QueryDocumentDocument = QueryDocumentDocument_1.QueryDocumentDocument;
__export(__webpack_require__(128));
__export(__webpack_require__(129));
__export(__webpack_require__(122));
__export(__webpack_require__(54));
__export(__webpack_require__(123));
__export(__webpack_require__(119));


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(4);
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
function isFullTriple(triple) {
    return triple
        .predicates
        .map(function (x) { return x.predicate; })
        .some(function (x) { return Utils_1.isObject(x) && x.token === "variable"; });
}
exports.isFullTriple = isFullTriple;
function getAllTriples(patterns) {
    var subjectsMap = new Map();
    internalTripleAdder(subjectsMap, patterns);
    return Array.from(subjectsMap.values());
}
exports.getAllTriples = getAllTriples;
function internalTripleAdder(subjectsMap, patterns) {
    patterns.forEach(function (pattern) {
        if (pattern.token === "optional" || pattern.token === "graph")
            return internalTripleAdder(subjectsMap, pattern.patterns);
        if (pattern.token !== "subject")
            return;
        var valid = pattern.predicates
            .map(function (predicate) { return predicate.objects; })
            .some(function (objects) { return objects.some(function (object) { return object.token === "variable"; }); });
        if (valid) {
            var subject = getSubject(subjectsMap, pattern);
            if (isFullTriple(subject))
                return;
            if (isFullTriple(pattern))
                subject.predicates.length = 0;
            (_a = subject.predicates).push.apply(_a, pattern.predicates);
        }
        var _a;
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(2)
  , XhrDriver = __webpack_require__(140)
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
/* 46 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var eventUtils = __webpack_require__(27)
  , JSON3 = __webpack_require__(24)
  , browser = __webpack_require__(46)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(9)('sockjs-client:utils:iframe');
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var XSD = __webpack_require__(316);
var StringLiteral_1 = __webpack_require__(37);
var tokens_1 = __webpack_require__(6);
var PatternBuilder_1 = __webpack_require__(156);
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
/* 49 */
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
var Token_1 = __webpack_require__(25);
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
/* 50 */
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
/* 51 */
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
var XSD_1 = __webpack_require__(14);
var Utils = __importStar(__webpack_require__(0));
var Document_1 = __webpack_require__(98);
var List_1 = __webpack_require__(40);
var Literal_1 = __webpack_require__(52);
var URI_1 = __webpack_require__(41);
var Value_1 = __webpack_require__(108);
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
    getFreeNodes: function (objects) {
        if (!Array.isArray(objects))
            return [];
        return objects
            .filter(function (element) { return !Document_1.RDFDocument.is(element); })
            .filter(exports.RDFNode.is);
    },
    getList: function (propertyValues) {
        if (!Array.isArray(propertyValues))
            return;
        return propertyValues
            .find(List_1.RDFList.is);
    },
    getProperties: function (propertyValues, pointerLibrary) {
        if (!Array.isArray(propertyValues))
            return;
        return propertyValues
            .map(Value_1.RDFValue.parse.bind(null, pointerLibrary))
            .filter(function (value) { return !Utils.isNull(value); });
    },
    getPropertyPointers: function (propertyValues, pointerLibrary) {
        if (!Array.isArray(propertyValues))
            return;
        return propertyValues
            .filter(exports.RDFNode.is)
            .map(exports.RDFNode.getID)
            .map(pointerLibrary.getPointer, pointerLibrary)
            .filter(function (pointer) { return !Utils.isNull(pointer); });
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
var Errors = __importStar(__webpack_require__(3));
var XSD_1 = __webpack_require__(14);
var Utils = __importStar(__webpack_require__(0));
var Serializers = __importStar(__webpack_require__(238));
exports.Serializers = Serializers;
exports.RDFLiteral = {
    from: function (value) {
        if (Utils.isNull(value))
            throw new Errors.IllegalArgumentError("Null cannot be converted into a Literal");
        if (!Utils.isDefined(value))
            throw new Errors.IllegalArgumentError("The value is undefined");
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
var BlankNode_1 = __webpack_require__(112);
var core_1 = __webpack_require__(15);
var Errors_1 = __webpack_require__(3);
var JSONLD_1 = __webpack_require__(23);
var NamedFragment_1 = __webpack_require__(130);
var ObjectSchema_1 = __webpack_require__(12);
var Pointer_1 = __webpack_require__(17);
var RDF_1 = __webpack_require__(10);
var Registry_1 = __webpack_require__(42);
var Resource_1 = __webpack_require__(7);
var Utils_1 = __webpack_require__(0);
var Vocabularies_1 = __webpack_require__(1);
function getNestedObjectId(object) {
    if ("id" in object)
        return object.id;
    if ("slug" in object)
        return RDF_1.URI.hasFragment(object.slug) ?
            object.slug : "#" + object.slug;
    return "";
}
function internalConverter(resource, target, tracker) {
    if (tracker === void 0) { tracker = new Set(); }
    Object
        .keys(target)
        .map(function (key) { return target[key]; })
        .forEach(function (next) {
        if (Array.isArray(next))
            return internalConverter(resource, next, tracker);
        if (!Utils_1.isPlainObject(next))
            return;
        if (exports.TransientDocument.is(next))
            return;
        if (next._registry && next._registry !== resource)
            return;
        var idOrSlug = getNestedObjectId(next);
        if (tracker.has(idOrSlug))
            return;
        if (!!idOrSlug && !resource.inScope(idOrSlug, true))
            return;
        var fragment = resource.hasPointer(idOrSlug, true) ?
            resource.getPointer(idOrSlug, true) :
            resource._register(next);
        tracker.add(fragment.id);
        internalConverter(resource, fragment, tracker);
    });
}
var PROTOTYPE = {
    _context: void 0,
    _registry: void 0,
    _normalize: function () {
        var usedFragments = new Set();
        internalConverter(this, this, usedFragments);
        this.getPointers(true)
            .map(Pointer_1.Pointer.getID)
            .filter(RDF_1.URI.isBNodeID)
            .filter(function (id) { return !usedFragments.has(id); })
            .forEach(this.removePointer, this);
    },
    _getLocalID: function (id) {
        if (RDF_1.URI.isBNodeID(id))
            return id;
        if (RDF_1.URI.isFragmentOf(id, this.id))
            return RDF_1.URI.getFragment(id);
        if (RDF_1.URI.isRelative(id))
            return id;
        return Registry_1.Registry.PROTOTYPE._getLocalID.call(this, id);
    },
    _register: function (base) {
        if (base.slug)
            base.id = base.slug;
        if (!base.id)
            base.id = RDF_1.URI.generateBNodeID();
        var pointer = Registry_1.Registry.PROTOTYPE._register.call(this, base);
        if (RDF_1.URI.isBNodeID(pointer.id))
            return BlankNode_1.TransientBlankNode.decorate(pointer);
        var resource = NamedFragment_1.TransientNamedFragment.decorate(pointer);
        resource.slug = this._getLocalID(resource._id);
        return resource;
    },
    hasFragment: function (id) {
        if (!this.inScope(id, true))
            return false;
        var localID = this._getLocalID(id);
        return this._resourcesMap.has(localID);
    },
    getFragment: function (id) {
        if (!this.inScope(id, true))
            throw new Errors_1.IllegalArgumentError("\"" + id + "\" is out of scope.");
        var localID = this._getLocalID(id);
        var resource = this._resourcesMap.get(localID);
        if (!resource)
            return null;
        return resource;
    },
    getNamedFragment: function (slug) {
        if (RDF_1.URI.isBNodeID(slug))
            throw new Errors_1.IllegalArgumentError("Invalid named fragment slug \"" + slug + "\", it can't start with \"_:\".");
        return this.getFragment(slug);
    },
    getFragments: function () {
        return Array.from(this._resourcesMap.values());
    },
    createFragment: function (isOrObject, id) {
        var object = Utils_1.isObject(isOrObject) ? isOrObject : {};
        id = Utils_1.isString(isOrObject) ? isOrObject : id;
        if (id)
            object.id = id;
        var fragment = this._register(object);
        exports.TransientDocument._convertNestedObjects(this, fragment);
        return fragment;
    },
    createNamedFragment: function (slugOrObject, slug) {
        slug = Utils_1.isString(slugOrObject) ? slugOrObject : slug;
        if (!slug)
            throw new Errors_1.IllegalArgumentError("The slug can't be empty.");
        if (RDF_1.URI.isBNodeID(slug))
            throw new Errors_1.IllegalArgumentError("Invalid named fragment slug \"" + slug + "\", it can't start with \"_:\".");
        var object = Utils_1.isObject(slugOrObject) ? slugOrObject : {};
        var base = Object.assign(object, { slug: slug });
        var fragment = this._register(base);
        exports.TransientDocument._convertNestedObjects(this, fragment);
        return fragment;
    },
    removeNamedFragment: function (fragmentOrSlug) {
        var id = Pointer_1.Pointer.getID(fragmentOrSlug);
        if (RDF_1.URI.isBNodeID(id))
            throw new Errors_1.IllegalArgumentError("\"" + id + "\" is not a valid named fragment.");
        return this._removeFragment(id);
    },
    _removeFragment: function (fragmentOrSlug) {
        if (!this.inScope(fragmentOrSlug, true))
            return false;
        return this.removePointer(fragmentOrSlug);
    },
    toJSON: function (registryOrKey) {
        var registry = Utils_1.isObject(registryOrKey) ?
            registryOrKey : this._registry;
        var generalSchema = registry ?
            registry.getGeneralSchema() : new ObjectSchema_1.DigestedObjectSchema();
        var jsonldConverter = registry ?
            registry.jsonldConverter : new JSONLD_1.JSONLDConverter();
        var expandedResources = [this].concat(this.getFragments()).map(function (resource) {
            var resourceSchema = registry ?
                registry.getSchemaFor(resource) :
                new ObjectSchema_1.DigestedObjectSchema();
            return jsonldConverter.expand(resource, generalSchema, resourceSchema);
        });
        return {
            "@id": this.id,
            "@graph": expandedResources,
        };
    },
};
exports.TransientDocument = {
    PROTOTYPE: PROTOTYPE,
    TYPE: Vocabularies_1.C.Document,
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    is: function (value) {
        return Resource_1.TransientResource.is(value) &&
            Registry_1.Registry.isDecorated(value) &&
            exports.TransientDocument.isDecorated(value);
    },
    decorate: function (object) {
        if (exports.TransientDocument.isDecorated(object))
            return object;
        var resource = core_1.ModelDecorator
            .decorateMultiple(object, Resource_1.TransientResource, Registry_1.Registry);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
    createFrom: function (object) {
        if (exports.TransientDocument.is(object))
            throw new Errors_1.IllegalArgumentError("The object provided is already a Document.");
        var document = exports.TransientDocument.decorate(object);
        exports.TransientDocument._convertNestedObjects(document, document);
        return document;
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientDocument.createFrom(copy);
    },
    _convertNestedObjects: function (resource, target) {
        internalConverter(resource, target);
        return target;
    },
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(4);
var ObjectSchema_1 = __webpack_require__(12);
var Utils_1 = __webpack_require__(44);
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
        (_a = this._patterns).push.apply(_a, patterns);
        return this;
        var _a;
    };
    QueryProperty.prototype.getPatterns = function () {
        var patterns = this._patterns.slice();
        var fn = getFunctionPattern(this.getType());
        if (fn) {
            var index = patterns.findIndex(function (pattern) { return pattern === void 0; });
            patterns[index] = fn(this._context, this.name);
        }
        if (!this._optional)
            return patterns;
        return [(_a = new tokens_1.OptionalToken()).addPattern.apply(_a, patterns),];
        var _a;
    };
    QueryProperty.prototype.getSchema = function () {
        if (this._schema)
            return this._schema;
        return this._schema = new ObjectSchema_1.DigestedObjectSchema();
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
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(2)
  , EventEmitter = __webpack_require__(13).EventEmitter
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(9)('sockjs-client:receiver:xhr');
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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(2)
  , XhrDriver = __webpack_require__(140)
  ;

function XHRCorsObject(method, url, payload, opts) {
  XhrDriver.call(this, method, url, payload, opts);
}

inherits(XHRCorsObject, XhrDriver);

XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;

module.exports = XHRCorsObject;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(6);
var tokens_2 = __webpack_require__(4);
var ObjectPattern_1 = __webpack_require__(48);
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
/* 58 */
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
var TriplesPattern_1 = __webpack_require__(57);
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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StringLiteral_1 = __webpack_require__(37);
var tokens_1 = __webpack_require__(6);
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
/* 60 */
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
var Token_1 = __webpack_require__(25);
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
/* 61 */
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
var Identifier_1 = __webpack_require__(38);
var LeftSymbol_1 = __webpack_require__(86);
var NewLineSymbol_1 = __webpack_require__(60);
var Operator_1 = __webpack_require__(49);
var Token_1 = __webpack_require__(25);
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
var AbstractError_1 = __webpack_require__(28);
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
/* 63 */
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
var http_1 = __importDefault(__webpack_require__(207));
var https_1 = __importDefault(__webpack_require__(208));
var url_1 = __importDefault(__webpack_require__(209));
var Errors_1 = __webpack_require__(3);
var ObjectSchema_1 = __webpack_require__(12);
var RDF_1 = __webpack_require__(10);
var Utils = __importStar(__webpack_require__(0));
var Errors_2 = __webpack_require__(30);
var Header_1 = __webpack_require__(64);
var HTTPMethod_1 = __webpack_require__(105);
var Response_1 = __webpack_require__(106);
function forEachHeaders(headers, setHeader) {
    var namesIterator = headers.keys();
    var next = namesIterator.next();
    while (!next.done) {
        var name_1 = next.value;
        var value = headers.get(name_1);
        setHeader(name_1, value.toString());
        next = namesIterator.next();
    }
}
function onResolve(resolve, reject, response) {
    if (response.status >= 200 && response.status <= 299) {
        resolve(response);
    }
    else {
        reject(response);
    }
}
function sendWithBrowser(method, url, body, options) {
    return new Promise(function (resolve, reject) {
        var request = options.request ? options.request : new XMLHttpRequest();
        request.open(method, url, true);
        if (options.headers)
            forEachHeaders(options.headers, function (name, value) { return request.setRequestHeader(name, value); });
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
                forEachHeaders(options.headers, function (name, value) { return requestOptions.headers[name] = value; });
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
    return Utils.isString(data)
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
        var options = Utils.hasProperty(optionsOrParser, "parse") ? bodyOrOptions : optionsOrParser;
        parser = Utils.hasProperty(optionsOrParser, "parse") ? optionsOrParser : parser;
        if (isBody(bodyOrOptions)) {
            body = bodyOrOptions;
        }
        else {
            options = bodyOrOptions ? bodyOrOptions : options;
        }
        options = Object.assign({}, RequestService.defaultOptions, options);
        if (Utils.isNumber(method))
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
                    throw new Errors_2.BadResponseError("The server responded with an unacceptable Content-Type", response);
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
        return Utils.hasPropertyDefined(object, "headers")
            || Utils.hasPropertyDefined(object, "sendCredentialsOnCORS")
            || Utils.hasPropertyDefined(object, "timeout")
            || Utils.hasPropertyDefined(object, "request");
    };
    RequestUtils.cloneOptions = function (options) {
        var clone = __assign({}, options, { headers: new Map() });
        if (options.headers)
            options.headers
                .forEach(function (value, key) { return clone.headers.set(key, new Header_1.Header(value.values.slice())); });
        return clone;
    };
    RequestUtils.getRequestURLFor = function (registry, resource, uri) {
        if (uri && registry._context) {
            var schema = registry.getGeneralSchema();
            uri = ObjectSchema_1.ObjectSchemaUtils.resolveURI(uri, schema);
        }
        var url = uri ? RDF_1.URI.resolve(resource.id, uri) : resource.id;
        var localIRI = registry._getLocalID(url);
        if (registry._context)
            return RDF_1.URI.resolve(registry._context.baseURI, localIRI);
        if (RDF_1.URI.isRelative(url))
            throw new Errors_1.IllegalArgumentError("\"" + url + "\" cannot be used as URL for the request.");
        return url;
    };
    return RequestUtils;
}());
exports.RequestUtils = RequestUtils;


/***/ }),
/* 64 */
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
            var _a;
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
/* 65 */
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
/* 66 */
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
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(15);
var Fragment_1 = __webpack_require__(22);
var Resource_1 = __webpack_require__(7);
var Utils_1 = __webpack_require__(0);
var TransientDocument_1 = __webpack_require__(53);
var PROTOTYPE = {
    _resolved: false,
    _eTag: void 0,
    get _savedFragments() { return []; },
    isResolved: function () {
        return !!this._resolved;
    },
    isOutdated: function () {
        return this._eTag === null;
    },
    _syncSavedFragments: function () {
        this._savedFragments = Array
            .from(this._resourcesMap.values())
            .map(Fragment_1.Fragment.decorate);
        this._savedFragments
            .forEach(function (fragment) { return fragment._syncSnapshot(); });
    },
};
exports.BasePersistedDocument = {
    PROTOTYPE: PROTOTYPE,
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.BasePersistedDocument.isDecorated(object))
            return object;
        var resource = core_1.ModelDecorator
            .decorateMultiple(object, TransientDocument_1.TransientDocument, Resource_1.PersistedResource);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
    is: function (value) {
        return TransientDocument_1.TransientDocument.is(value)
            && Resource_1.PersistedResource.isDecorated(value)
            && exports.BasePersistedDocument.isDecorated(value);
    },
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(15);
var Errors_1 = __webpack_require__(3);
var Pointer_1 = __webpack_require__(17);
var Utils_1 = __webpack_require__(0);
var PROTOTYPE = {
    get _resourcesMap() { return new Map(); },
    _context: void 0,
    _registry: void 0,
    inScope: function (idOrPointer, local) {
        try {
            var id = Pointer_1.Pointer.getID(idOrPointer);
            this._getLocalID(id);
            return true;
        }
        catch (_a) {
            if (local === true || !this._registry)
                return false;
            return this._registry.inScope(idOrPointer);
        }
    },
    hasPointer: function (id, local) {
        if (this.inScope(id, true)) {
            var localID = this._getLocalID(id);
            if (this._resourcesMap.has(localID))
                return true;
        }
        if (local === true || !this._registry)
            return false;
        return this._registry.hasPointer(id);
    },
    getPointer: function (id, local) {
        if (!this.inScope(id, true)) {
            if (local === true || !this._registry)
                throw new Errors_1.IllegalArgumentError("\"" + id + "\" is out of scope.");
            return this._registry.getPointer(id);
        }
        var localID = this._getLocalID(id);
        if (this._resourcesMap.has(localID))
            return this._resourcesMap.get(localID);
        if (local !== true && this._registry && this._registry.hasPointer(id))
            return this._registry.getPointer(id);
        return this._register({ id: id });
    },
    getPointers: function (local) {
        var pointers = Array.from(this._resourcesMap.values());
        if (local === true || !this._registry)
            return pointers;
        return this._registry.getPointers().concat(pointers);
    },
    removePointer: function (idOrPointer, local) {
        var id = Pointer_1.Pointer.getID(idOrPointer);
        if (this.inScope(id, true)) {
            var localID = this._getLocalID(id);
            if (this._resourcesMap.delete(localID))
                return true;
        }
        if (local === true || !this._registry)
            return false;
        return this._registry.removePointer(idOrPointer);
    },
    _getLocalID: function (id) {
        throw new Errors_1.IllegalArgumentError("\"" + id + "\" is out of scope.");
    },
    _register: function (base) {
        if (!base.id)
            throw new Errors_1.IllegalArgumentError("The resource ID is required.");
        var localID = this._getLocalID(base.id);
        if (this._resourcesMap.has(localID))
            throw new Errors_1.IDAlreadyInUseError("\"" + base.id + "\" is already being used.");
        var resource = Pointer_1.Pointer.decorate(base);
        resource._registry = this;
        this._resourcesMap.set(localID, resource);
        return resource;
    },
};
exports.Registry = {
    PROTOTYPE: PROTOTYPE,
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.Registry.isDecorated(object))
            return object;
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, object);
    },
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(15);
var JSONLD_1 = __webpack_require__(23);
var ObjectSchema_1 = __webpack_require__(12);
var RDF_1 = __webpack_require__(10);
var Registry_1 = __webpack_require__(42);
var Resource_1 = __webpack_require__(7);
var Utils_1 = __webpack_require__(0);
var PROTOTYPE = {
    _context: void 0,
    _registry: void 0,
    _getLocalID: function (id) {
        if (RDF_1.URI.isBNodeID(id))
            return id;
        return Registry_1.Registry.PROTOTYPE._getLocalID.call(this, id);
    },
    _register: function (base) {
        if (!base.id)
            base.id = RDF_1.URI.generateBNodeID();
        var pointer = Registry_1.Registry.PROTOTYPE._register.call(this, base);
        return Resource_1.TransientResource.decorate(pointer);
    },
    toJSON: function () {
        var _this = this;
        var generalSchema = this._registry ?
            this._registry.getGeneralSchema() : new ObjectSchema_1.DigestedObjectSchema();
        var jsonldConverter = this._registry ?
            this._registry.jsonldConverter : new JSONLD_1.JSONLDConverter();
        return this
            .getPointers(true)
            .map(function (resource) {
            var resourceSchema = _this._registry ?
                _this._registry.getSchemaFor(resource) : generalSchema;
            return jsonldConverter.expand(resource, generalSchema, resourceSchema);
        });
    },
};
exports.FreeResources = {
    PROTOTYPE: PROTOTYPE,
    is: function (value) {
        return Utils_1.isObject(value)
            && exports.FreeResources.isDecorated(value);
    },
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
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
        var resource = Registry_1.Registry.decorate(object);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = __webpack_require__(32);
var tokens_1 = __webpack_require__(4);
var Errors_1 = __webpack_require__(3);
var ObjectSchema_1 = __webpack_require__(12);
var QueryVariable_1 = __webpack_require__(119);
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
        if (!this.context || !this.context.registry.jsonldConverter.literalSerializers.has(type))
            return "" + value;
        return this.context.registry.jsonldConverter.literalSerializers.get(type).serialize(value);
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
                throw new Errors_1.IllegalArgumentError("Prefix \"" + namespace + "\" has not been declared.");
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
            return new ObjectSchema_1.DigestedObjectSchema();
        return this.context.registry.getGeneralSchema();
    };
    QueryContext.prototype.hasSchemaFor = function (object, path) {
        if (!this.context)
            return false;
        return this.context.registry.hasSchemaFor(object);
    };
    QueryContext.prototype.getSchemaFor = function (object, path) {
        if (!this.context)
            return new ObjectSchema_1.DigestedObjectSchema();
        return this.context.registry.getSchemaFor(object);
    };
    return QueryContext;
}());
exports.QueryContext = QueryContext;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(4);
var IllegalArgumentError_1 = __webpack_require__(29);
var IllegalStateError_1 = __webpack_require__(62);
var ObjectSchema_1 = __webpack_require__(12);
var Utils_1 = __webpack_require__(0);
var QueryObject_1 = __webpack_require__(122);
var QueryProperty_1 = __webpack_require__(54);
var QueryValue_1 = __webpack_require__(123);
var Utils_2 = __webpack_require__(44);
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
        type = ObjectSchema_1.ObjectSchemaUtils.resolveURI(type, this._schema, { vocab: true });
        if (!this._typesTriple.predicates[0].objects.length)
            this._document.addPattern(this._typesTriple);
        this._typesTriple.predicates[0].addObject(this._context.compactIRI(type));
        if (!this._context.context)
            return this;
        if (this._context.context.hasObjectSchema(type))
            ObjectSchema_1.ObjectSchemaDigester._combineSchemas([
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
        var _a;
    };
    QueryDocumentBuilder.prototype._addProperty = function (propertyName, propertyDefinition) {
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
        var _a, _b;
    };
    QueryDocumentBuilder.prototype.addPropertyDefinition = function (propertyName, propertyDefinition) {
        var digestedDefinition = ObjectSchema_1.ObjectSchemaDigester.digestProperty(propertyName, propertyDefinition, this._schema);
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
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AccessPoint_1 = __webpack_require__(110);
var core_1 = __webpack_require__(15);
var Errors_1 = __webpack_require__(3);
var Fragment_1 = __webpack_require__(22);
var HTTP_1 = __webpack_require__(26);
var Errors_2 = __webpack_require__(30);
var JSONLD_1 = __webpack_require__(23);
var LDP_1 = __webpack_require__(20);
var LDPatch_1 = __webpack_require__(124);
var ProtectedDocument_1 = __webpack_require__(34);
var RDF_1 = __webpack_require__(10);
var Resource_1 = __webpack_require__(7);
var Utils_1 = __webpack_require__(0);
var Vocabularies_1 = __webpack_require__(1);
var BasePersistedDocument_1 = __webpack_require__(67);
var TransientDocument_1 = __webpack_require__(53);
function getTargetID(uri, response) {
    var locationHeader = response.getHeader("Content-Location");
    if (!locationHeader)
        return uri;
    if (locationHeader.values.length !== 1)
        throw new Errors_2.BadResponseError("The response must contain one Content-Location header.", response);
    var locationString = "" + locationHeader;
    if (!locationString)
        throw new Errors_2.BadResponseError("The response doesn't contain a valid 'Content-Location' header.", response);
    return locationString;
}
function parseRDFDocument(registry, rdfDocument, eTag) {
    var resource = new JSONLD_1.JSONLDCompacter(registry)
        .compactDocument(rdfDocument);
    resource._eTag = eTag;
    resource._resolved = true;
    return resource;
}
function addAuthentication(registry, requestOptions) {
    if (!registry._context || !registry._context.auth)
        return;
    registry._context.auth.addAuthentication(requestOptions);
}
function setDefaultRequestOptions(registry, requestOptions, interactionModel) {
    addAuthentication(registry, requestOptions);
    if (interactionModel)
        HTTP_1.RequestUtils.setPreferredInteractionModel(interactionModel, requestOptions);
    HTTP_1.RequestUtils.setAcceptHeader("application/ld+json", requestOptions);
    return requestOptions;
}
function getRegistry(repository) {
    if (repository._registry)
        return repository._registry;
    throw new Errors_1.IllegalActionError("\"" + repository.id + "\" doesn't support CRUD requests.");
}
function getFullResource(registry, uri, requestOptions) {
    if (registry.hasPointer(uri)) {
        var resource = registry.getPointer(uri);
        if (resource.isResolved()) {
            if (!requestOptions.ensureLatest)
                return resource;
            HTTP_1.RequestUtils.setIfNoneMatchHeader(resource._eTag, requestOptions);
        }
    }
    setDefaultRequestOptions(registry, requestOptions, Vocabularies_1.LDP.RDFSource);
    return HTTP_1.RequestService
        .get(uri, requestOptions, new RDF_1.RDFDocumentParser())
        .then(function (_a) {
        var rdfDocuments = _a[0], response = _a[1];
        uri = getTargetID(uri, response);
        var rdfDocument = rdfDocuments.find(function (node) { return node["@id"] === uri; });
        if (!rdfDocument)
            throw new Errors_2.BadResponseError("No document was returned.", response);
        var eTag = response.getETag();
        return parseRDFDocument(registry, rdfDocument, eTag);
    })
        .catch(registry._parseErrorFromResponse.bind(registry));
}
function applyResponseMetadata(registry, freeNodes) {
    if (!freeNodes.length)
        return;
    var freeResources = registry._parseFreeNodes(freeNodes);
    var responseMetadata = freeResources.getPointers().find(LDP_1.ResponseMetadata.is);
    for (var _i = 0, _a = responseMetadata.documentsMetadata; _i < _a.length; _i++) {
        var documentMetadata = _a[_i];
        var resource = documentMetadata.relatedDocument;
        for (var _b = 0, _c = documentMetadata.bNodesMap.entries; _b < _c.length; _b++) {
            var _d = _c[_b], entryKey = _d.entryKey, entryValue = _d.entryValue;
            var originalBNode = resource.getPointer(entryKey.id, true);
            resource.removePointer(entryKey.id);
            originalBNode.id = entryValue.id;
            resource._register(originalBNode);
        }
    }
}
function applyResponseRepresentation(registry, resource, response) {
    if (response.status === 204 || !response.data)
        return resource;
    return new JSONLD_1.JSONLDParser()
        .parse(response.data)
        .then(function (expandedResult) {
        var freeNodes = RDF_1.RDFNode.getFreeNodes(expandedResult);
        applyResponseMetadata(registry, freeNodes);
        var preferenceHeader = response.getHeader("Preference-Applied");
        if (preferenceHeader === null || preferenceHeader.toString() !== "return=representation")
            return resource;
        var rdfDocument = RDF_1.RDFDocument
            .getDocuments(expandedResult)
            .find(function (node) { return node["@id"] === resource.id; });
        if (!rdfDocument)
            throw new Errors_2.BadResponseError("No document was returned.", response);
        return parseRDFDocument(registry, rdfDocument, response.getETag());
    });
}
function persistResource(registry, parentURI, slug, resource, requestOptions) {
    HTTP_1.RequestUtils.setContentTypeHeader("application/ld+json", requestOptions);
    if (resource.id && !RDF_1.URI.isBaseOf(parentURI, resource.id)) {
        return Promise.reject(new Errors_1.IllegalArgumentError("The document's URI is not relative to the parentURI specified"));
    }
    if (resource["__CarbonLDP_persisting__"])
        return Promise.reject(new Errors_1.IllegalArgumentError("The document is already being persisted."));
    Object.defineProperty(resource, "__CarbonLDP_persisting__", { configurable: true, enumerable: false, writable: false, value: true });
    resource._registry = registry;
    var body = JSON.stringify(resource);
    if (!!slug)
        HTTP_1.RequestUtils.setSlug(slug, requestOptions);
    return HTTP_1.RequestService
        .post(parentURI, body, requestOptions)
        .then(function (response) {
        delete resource["__CarbonLDP_persisting__"];
        var locationHeader = response.getHeader("Location");
        if (locationHeader === null || locationHeader.values.length < 1)
            throw new Errors_2.BadResponseError("The response is missing a Location header.", response);
        if (locationHeader.values.length !== 1)
            throw new Errors_2.BadResponseError("The response contains more than one Location header.", response);
        resource.id = locationHeader.values[0].toString();
        registry._register(resource);
        var persistedDocument = ProtectedDocument_1.ProtectedDocument
            .decorate(resource);
        persistedDocument
            .getFragments()
            .forEach(Fragment_1.Fragment.decorate);
        return applyResponseRepresentation(registry, persistedDocument, response);
    })
        .catch(function (error) {
        delete resource["__CarbonLDP_persisting__"];
        return registry._parseErrorFromResponse(error);
    });
}
function persistChild(registry, parentURI, requestOptions, child, slug) {
    if (Resource_1.PersistedResource.is(child))
        throw new Errors_1.IllegalArgumentError("The child provided has already been persisted.");
    var childDocument;
    if (TransientDocument_1.TransientDocument.is(child)) {
        childDocument = child;
        childDocument._normalize();
    }
    else {
        if (!child)
            child = {};
        childDocument = TransientDocument_1.TransientDocument.createFrom(child);
    }
    setDefaultRequestOptions(registry, requestOptions, Vocabularies_1.LDP.Container);
    return persistResource(registry, parentURI, slug, childDocument, requestOptions);
}
function createChildren(retrievalType, repository, uriOrChildren, childrenOrSlugsOrOptions, slugsOrOptions, requestOptions) {
    return Utils_1.promiseMethod(function () {
        var registry = getRegistry(repository);
        requestOptions = HTTP_1.RequestUtils.isOptions(childrenOrSlugsOrOptions) ?
            childrenOrSlugsOrOptions :
            HTTP_1.RequestUtils.isOptions(slugsOrOptions) ?
                slugsOrOptions :
                requestOptions ? requestOptions : {};
        var uri = Utils_1.isString(uriOrChildren) ? uriOrChildren : void 0;
        var url = HTTP_1.RequestUtils.getRequestURLFor(registry, repository, uri);
        var slugs = Utils_1.isString(childrenOrSlugsOrOptions) ?
            childrenOrSlugsOrOptions :
            Utils_1.isString(slugsOrOptions) || Array.isArray(slugsOrOptions) ?
                slugsOrOptions :
                Array.isArray(childrenOrSlugsOrOptions) && Array.isArray(uriOrChildren) ?
                    childrenOrSlugsOrOptions :
                    null;
        var children = Array.isArray(uriOrChildren) || Utils_1.isObject(uriOrChildren) ?
            uriOrChildren :
            childrenOrSlugsOrOptions;
        HTTP_1.RequestUtils.setPreferredRetrieval(retrievalType, requestOptions);
        if (!Array.isArray(slugs) && !Array.isArray(children))
            return persistChild(registry, url, requestOptions, children, slugs);
        var slugsLength = Array.isArray(slugs) ? slugs.length : 0;
        var childrenLength = Array.isArray(children) ? children.length : 0;
        var total = Math.max(slugsLength, childrenLength);
        var promises = Array(total);
        for (var index = 0; index < total; ++index) {
            var cloneOptions = HTTP_1.RequestUtils.cloneOptions(requestOptions);
            var child = index < childrenLength ? children[index] : void 0;
            var slug = index < slugsLength ? slugs[index] : void 0;
            promises[index] = persistChild(registry, url, cloneOptions, child, slug);
        }
        return Promise.all(promises);
    });
}
function persistAccessPoint(registry, documentURI, requestOptions, accessPoint, slug) {
    if (Resource_1.PersistedResource.is(accessPoint))
        throw new Errors_1.IllegalArgumentError("The access-point provided has already been persisted.");
    var accessPointDocument;
    if (AccessPoint_1.TransientAccessPoint.is(accessPoint)) {
        accessPointDocument = accessPoint;
        accessPointDocument._normalize();
    }
    else {
        accessPointDocument = AccessPoint_1.TransientAccessPoint.createFrom(accessPoint);
    }
    if (!accessPointDocument.membershipResource)
        accessPointDocument.membershipResource = registry.getPointer(documentURI);
    else if (accessPointDocument.membershipResource.id !== documentURI)
        throw new Errors_1.IllegalArgumentError("The endpoint URI must be the same as the accessPoint's membershipResource.");
    setDefaultRequestOptions(registry, requestOptions, Vocabularies_1.LDP.RDFSource);
    return persistResource(registry, documentURI, slug, accessPointDocument, requestOptions);
}
function createAccessPoint(retrievalType, repository, uriOrAccessPoint, accessPointOrSlugOrRequestOptions, slugOrRequestOptions, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    return Utils_1.promiseMethod(function () {
        var registry = getRegistry(repository);
        var uri = Utils_1.isString(uriOrAccessPoint) ? uriOrAccessPoint : void 0;
        var url = HTTP_1.RequestUtils.getRequestURLFor(registry, repository, uri);
        var accessPoint = Utils_1.isObject(uriOrAccessPoint) ? uriOrAccessPoint :
            accessPointOrSlugOrRequestOptions;
        var slug = Utils_1.isString(accessPointOrSlugOrRequestOptions) ? accessPointOrSlugOrRequestOptions :
            Utils_1.isString(slugOrRequestOptions) ? slugOrRequestOptions : void 0;
        requestOptions = HTTP_1.RequestUtils.isOptions(accessPointOrSlugOrRequestOptions) ? accessPointOrSlugOrRequestOptions :
            Utils_1.isObject(slugOrRequestOptions) ? slugOrRequestOptions : requestOptions;
        HTTP_1.RequestUtils.setPreferredRetrieval(retrievalType, requestOptions);
        return persistAccessPoint(registry, url, requestOptions, accessPoint, slug);
    });
}
function createAccessPoints(retrievalType, repository, uriOrAccessPoints, accessPointOrSlugsOrRequestOptions, slugsOrRequestOptions, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    return Utils_1.promiseMethod(function () {
        var registry = getRegistry(repository);
        var uri = Utils_1.isString(uriOrAccessPoints) ? uriOrAccessPoints : void 0;
        var url = HTTP_1.RequestUtils.getRequestURLFor(registry, repository, uri);
        var accessPoints = Array.isArray(uriOrAccessPoints) ? uriOrAccessPoints :
            accessPointOrSlugsOrRequestOptions;
        var slugs = Array.isArray(accessPointOrSlugsOrRequestOptions) && accessPointOrSlugsOrRequestOptions !== accessPoints ?
            accessPointOrSlugsOrRequestOptions :
            Array.isArray(slugsOrRequestOptions) ? slugsOrRequestOptions : void 0;
        requestOptions = HTTP_1.RequestUtils.isOptions(accessPointOrSlugsOrRequestOptions) ? accessPointOrSlugsOrRequestOptions :
            Utils_1.isObject(slugsOrRequestOptions) && slugsOrRequestOptions !== slugs ? slugsOrRequestOptions : requestOptions;
        HTTP_1.RequestUtils.setPreferredRetrieval(retrievalType, requestOptions);
        var slugsLength = Array.isArray(slugs) ? slugs.length : 0;
        var total = accessPoints.length;
        var promises = Array(total);
        for (var index = 0; index < total; ++index) {
            var cloneOptions = HTTP_1.RequestUtils.cloneOptions(requestOptions);
            var slug = index < slugsLength ? slugs[index] : void 0;
            promises[index] = persistAccessPoint(registry, url, cloneOptions, accessPoints[index], slug);
        }
        return Promise.all(promises);
    });
}
function refreshResource(registry, resource, requestOptions) {
    var url = HTTP_1.RequestUtils.getRequestURLFor(registry, resource);
    setDefaultRequestOptions(registry, requestOptions, Vocabularies_1.LDP.RDFSource);
    HTTP_1.RequestUtils.setIfNoneMatchHeader(resource._eTag, requestOptions);
    return HTTP_1.RequestService
        .get(url, requestOptions, new RDF_1.RDFDocumentParser())
        .then(function (_a) {
        var rdfDocuments = _a[0], response = _a[1];
        if (response === null)
            return resource;
        var rdfDocument = rdfDocuments.find(function (node) { return node["@id"] === url; });
        if (rdfDocument === null)
            throw new Errors_2.BadResponseError("No document was returned.", response);
        var eTag = response.getETag();
        return parseRDFDocument(registry, rdfDocument, eTag);
    })
        .catch(function (response) {
        if (response.status === 304)
            return resource;
        return resource._registry._parseErrorFromResponse(response);
    });
}
function addResourcePatch(registry, deltaCreator, pointer, current, snapshot) {
    var schema = registry.getSchemaFor(pointer);
    deltaCreator.addResource(schema, pointer.id, snapshot, current);
}
function sendPatch(registry, resource, requestOptions) {
    var url = HTTP_1.RequestUtils.getRequestURLFor(registry, resource);
    if (!resource.isDirty())
        return Promise.resolve(resource);
    resource._normalize();
    setDefaultRequestOptions(registry, requestOptions);
    HTTP_1.RequestUtils.setContentTypeHeader("text/ldpatch", requestOptions);
    HTTP_1.RequestUtils.setIfMatchHeader(resource._eTag, requestOptions);
    var deltaCreator = new LDPatch_1.DeltaCreator(resource._registry.jsonldConverter);
    addResourcePatch(registry, deltaCreator, resource, resource, resource._snapshot);
    resource
        .getPointers(true)
        .forEach(function (pointer) {
        var snapshot = Resource_1.PersistedResource.is(pointer) ? pointer._snapshot : {};
        addResourcePatch(registry, deltaCreator, pointer, pointer, snapshot);
    });
    resource._savedFragments
        .filter(function (pointer) { return !resource.hasPointer(pointer.id); })
        .forEach(function (pointer) {
        addResourcePatch(registry, deltaCreator, pointer, {}, pointer._snapshot);
    });
    var body = deltaCreator.getPatch();
    return HTTP_1.RequestService
        .patch(url, body, requestOptions)
        .then(function (response) {
        return applyResponseRepresentation(registry, resource, response);
    })
        .catch(registry._parseErrorFromResponse.bind(resource));
}
var PROTOTYPE = {
    get: function (uriOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var uri = Utils_1.isString(uriOrOptions) ? uriOrOptions : void 0;
            var url = HTTP_1.RequestUtils.getRequestURLFor(registry, _this, uri);
            requestOptions = Utils_1.isObject(uriOrOptions) ? uriOrOptions :
                requestOptions ? requestOptions : {};
            return getFullResource(registry, url, requestOptions);
        });
    },
    resolve: function (requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var url = HTTP_1.RequestUtils.getRequestURLFor(registry, _this);
            return getFullResource(registry, url, requestOptions);
        });
    },
    exists: function (uri, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var url = HTTP_1.RequestUtils.getRequestURLFor(registry, _this, uri);
            setDefaultRequestOptions(registry, requestOptions, Vocabularies_1.LDP.RDFSource);
            return HTTP_1.RequestService
                .head(url, requestOptions)
                .then(function () { return true; })
                .catch(function (response) {
                if (response.status === 404)
                    return false;
                return registry._parseErrorFromResponse(response);
            });
        });
    },
    create: function (uriOrChildren, childrenOrSlugsOrOptions, slugsOrOptions, requestOptions) {
        return createChildren("minimal", this, uriOrChildren, childrenOrSlugsOrOptions, slugsOrOptions, requestOptions);
    },
    createAndRetrieve: function (uriOrChildren, childrenOrSlugsOrOptions, slugsOrOptions, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        return createChildren("representation", this, uriOrChildren, childrenOrSlugsOrOptions, slugsOrOptions, requestOptions);
    },
    createAccessPoint: function (uriOrAccessPoint, accessPointOrSlugOrRequestOptions, slugOrRequestOptions, requestOptions) {
        return createAccessPoint("minimal", this, uriOrAccessPoint, accessPointOrSlugOrRequestOptions, slugOrRequestOptions, requestOptions);
    },
    createAccessPointAndRetrieve: function (uriOrAccessPoint, accessPointOrSlugOrRequestOptions, slugOrRequestOptions, requestOptions) {
        return createAccessPoint("representation", this, uriOrAccessPoint, accessPointOrSlugOrRequestOptions, slugOrRequestOptions, requestOptions);
    },
    createAccessPoints: function (uriOrAccessPoints, accessPointsOrSlugsOrRequestOptions, slugsOrRequestOptions, requestOptions) {
        return createAccessPoints("minimal", this, uriOrAccessPoints, accessPointsOrSlugsOrRequestOptions, slugsOrRequestOptions, requestOptions);
    },
    createAccessPointsAndRetrieve: function (uriOrAccessPoints, accessPointsOrSlugsOrRequestOptions, slugsOrRequestOptions, requestOptions) {
        return createAccessPoints("representation", this, uriOrAccessPoints, accessPointsOrSlugsOrRequestOptions, slugsOrRequestOptions, requestOptions);
    },
    refresh: function (requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            if (!Resource_1.PersistedResource.is(_this))
                throw new Errors_1.IllegalArgumentError("The resource isn't a persisted resource.");
            var registry = getRegistry(_this);
            return refreshResource(registry, _this, requestOptions);
        });
    },
    save: function (requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            if (!Resource_1.PersistedResource.is(_this))
                throw new Errors_1.IllegalArgumentError("The resource isn't a persisted resource.");
            var registry = getRegistry(_this);
            HTTP_1.RequestUtils.setPreferredRetrieval("minimal", requestOptions);
            return sendPatch(registry, _this, requestOptions);
        });
    },
    saveAndRefresh: function (requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            if (!Resource_1.PersistedResource.is(_this))
                throw new Errors_1.IllegalArgumentError("The resource isn't a persisted resource.");
            var registry = getRegistry(_this);
            HTTP_1.RequestUtils.setPreferredRetrieval("representation", requestOptions);
            return sendPatch(registry, _this, requestOptions);
        });
    },
    delete: function (uriOrOptions, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var uri = Utils_1.isString(uriOrOptions) ? uriOrOptions : void 0;
            var url = HTTP_1.RequestUtils.getRequestURLFor(registry, _this, uri);
            setDefaultRequestOptions(registry, requestOptions, Vocabularies_1.LDP.RDFSource);
            return HTTP_1.RequestService
                .delete(url, requestOptions)
                .then(function () {
                _this._registry.removePointer(url);
            })
                .catch(_this._registry._parseErrorFromResponse.bind(_this));
        });
    },
};
exports.CRUDDocument = {
    PROTOTYPE: PROTOTYPE,
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.CRUDDocument.isDecorated(object))
            return object;
        var resource = core_1.ModelDecorator
            .decorateMultiple(object, BasePersistedDocument_1.BasePersistedDocument);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
    is: function (value) {
        return Utils_1.isObject(value)
            && BasePersistedDocument_1.BasePersistedDocument.is(value)
            && exports.CRUDDocument.isDecorated(value);
    },
};


/***/ }),
/* 73 */
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
var Errors = __importStar(__webpack_require__(3));
var Request_1 = __webpack_require__(63);
var StringParser_1 = __webpack_require__(115);
var Literal_1 = __webpack_require__(52);
var RawResultsParser_1 = __webpack_require__(127);
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
                throw new Errors.NotImplementedError("BNodes cannot be queried directly");
            case "literal":
                if ("datatype" in rawBindingProperty) {
                    return Literal_1.RDFLiteral.parse(rawBindingProperty.value, rawBindingProperty.datatype);
                }
                else {
                    return Literal_1.RDFLiteral.parse(rawBindingProperty.value);
                }
            default:
                throw new Errors.IllegalArgumentError("The bindingProperty has an unsupported type");
        }
    };
    SPARQLService.DEFAULT_OPTIONS = {};
    SPARQLService.RESULTS_PARSER = new RawResultsParser_1.SPARQLRawResultsParser();
    SPARQLService.STRING_PARSER = new StringParser_1.StringParser();
    return SPARQLService;
}());
exports.SPARQLService = SPARQLService;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(265));
__export(__webpack_require__(266));
__export(__webpack_require__(267));
__export(__webpack_require__(75));
__export(__webpack_require__(268));
__export(__webpack_require__(269));
__export(__webpack_require__(270));
__export(__webpack_require__(135));
__export(__webpack_require__(31));
__export(__webpack_require__(271));
__export(__webpack_require__(272));
__export(__webpack_require__(76));
__export(__webpack_require__(273));
__export(__webpack_require__(274));
__export(__webpack_require__(275));
__export(__webpack_require__(136));


/***/ }),
/* 75 */
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
var Vocabularies_1 = __webpack_require__(1);
var EventMessage_1 = __webpack_require__(31);
var SCHEMA = __assign({}, EventMessage_1.EventMessage.SCHEMA, { "details": {
        "@id": Vocabularies_1.C.details,
        "@type": "@id",
    } });
exports.DocumentCreated = {
    SCHEMA: SCHEMA,
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(11);
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
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var EventEmitter = __webpack_require__(13).EventEmitter
  , inherits = __webpack_require__(2)
  , eventUtils = __webpack_require__(27)
  , browser = __webpack_require__(46)
  , urlUtils = __webpack_require__(16)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(9)('sockjs-client:sender:xdr');
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var inherits = __webpack_require__(2)
  , IframeTransport = __webpack_require__(144)
  , objectUtils = __webpack_require__(79)
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 79 */
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
/* 80 */
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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(323));
__export(__webpack_require__(168));


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = __webpack_require__(3);
var HTTP_1 = __webpack_require__(26);
var Errors_2 = __webpack_require__(30);
var JSONLD_1 = __webpack_require__(23);
var RDF_1 = __webpack_require__(10);
var Utils_1 = __webpack_require__(0);
var Vocabularies_1 = __webpack_require__(1);
var User_1 = __webpack_require__(83);
var AbstractAuthenticator = (function () {
    function AbstractAuthenticator(context) {
        this.context = context;
    }
    Object.defineProperty(AbstractAuthenticator.prototype, "authenticatedUser", {
        get: function () { return this._authenticatedUser; },
        enumerable: true,
        configurable: true
    });
    AbstractAuthenticator.prototype.isAuthenticated = function () {
        return !!this._credentials;
    };
    AbstractAuthenticator.prototype.clearAuthentication = function () {
        this._credentials = null;
        this._authenticatedUser = null;
    };
    AbstractAuthenticator.prototype.addAuthentication = function (requestOptions) {
        if (requestOptions.headers && requestOptions.headers.has("authorization"))
            return requestOptions;
        if (!this.isAuthenticated())
            throw new Errors_1.IllegalStateError("The authenticator isn't authenticated.");
        if (!requestOptions.headers)
            requestOptions.headers = new Map();
        var strAuthHeader = this._getHeaderValue();
        requestOptions.headers.set("authorization", new HTTP_1.Header([strAuthHeader]));
        return requestOptions;
    };
    AbstractAuthenticator.prototype.getAuthenticatedUser = function (requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        if (this._authenticatedUser)
            return Promise.resolve(this._authenticatedUser);
        return Utils_1.promiseMethod(function () {
            var metadataURI = _this.context._resolvePath("users.me");
            var localOptions = HTTP_1.RequestUtils.cloneOptions(requestOptions);
            _this.addAuthentication(localOptions);
            HTTP_1.RequestUtils.setAcceptHeader("application/ld+json", localOptions);
            HTTP_1.RequestUtils.setPreferredInteractionModel(Vocabularies_1.LDP.RDFSource, localOptions);
            localOptions.ensureLatest = true;
            return HTTP_1.RequestService
                .get(metadataURI, localOptions, new JSONLD_1.JSONLDParser())
                .catch(_this.context.registry._parseErrorFromResponse);
        }).then(function (_a) {
            var rdfData = _a[0], response = _a[1];
            var accessor = _this._parseRDFMetadata(rdfData, response, requestOptions);
            _this._authenticatedUser = accessor
                .authenticatedUserMetadata
                .user;
            return User_1.User
                .decorate(_this._authenticatedUser);
        });
    };
    AbstractAuthenticator.prototype._parseRDFMetadata = function (rdfData, response, requestOptions) {
        var metadataURI = this.context._resolvePath("users.me");
        var metadataRDFs = RDF_1.RDFDocument
            .getDocuments(rdfData)
            .filter(function (rdfDocument) { return rdfDocument["@id"] === metadataURI; });
        if (metadataRDFs.length !== 1)
            throw new Errors_2.BadResponseError("No correct cs:UserMetadata was returned.", response);
        var document = new JSONLD_1.JSONLDCompacter(this.context.registry)
            .compactDocument(metadataRDFs[0]);
        document._eTag = response.getETag();
        document._resolved = true;
        return document;
    };
    return AbstractAuthenticator;
}());
exports.AbstractAuthenticator = AbstractAuthenticator;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(171));
__export(__webpack_require__(327));


/***/ }),
/* 84 */
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
var Errors_1 = __webpack_require__(3);
var Utils_1 = __webpack_require__(0);
var AbstractAuthenticator_1 = __webpack_require__(82);
var BasicCredentials_1 = __webpack_require__(174);
var BasicAuthenticator = (function (_super) {
    __extends(BasicAuthenticator, _super);
    function BasicAuthenticator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicAuthenticator.prototype.authenticate = function (authenticationToken) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            if (!authenticationToken)
                throw new Errors_1.IllegalArgumentError("The authenticationToken cannot be empty.");
            if (!authenticationToken.username)
                throw new Errors_1.IllegalArgumentError("The username cannot be empty.");
            if (!authenticationToken.password)
                throw new Errors_1.IllegalArgumentError("The password cannot be empty.");
            _this._credentials = new BasicCredentials_1.BasicCredentials(authenticationToken.username, authenticationToken.password);
            return _this._credentials;
        });
    };
    BasicAuthenticator.prototype._getHeaderValue = function () {
        return "Basic " + toB64(this._credentials.username + ":" + this._credentials.password);
    };
    return BasicAuthenticator;
}(AbstractAuthenticator_1.AbstractAuthenticator));
exports.BasicAuthenticator = BasicAuthenticator;
function toB64(str) {
    return (typeof btoa !== "undefined") ? btoa(str) : new Buffer(str).toString("base64");
}


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LDP_1 = __webpack_require__(20);
var Utils_1 = __webpack_require__(0);
var CS_1 = __webpack_require__(65);
var XSD_1 = __webpack_require__(14);
exports.TokenCredentialsBase = {
    is: function (value) {
        return Utils_1.isObject(value)
            && value.hasOwnProperty("token")
            && value.hasOwnProperty("expires");
    },
};
var SCHEMA = {
    "token": {
        "@id": CS_1.CS.token,
        "@type": XSD_1.XSD.string,
    },
    "expires": {
        "@id": CS_1.CS.expires,
        "@type": XSD_1.XSD.dateTime,
    },
};
exports.TokenCredentials = {
    TYPE: CS_1.CS.TokenCredentials,
    SCHEMA: SCHEMA,
    is: function (value) {
        return LDP_1.VolatileResource.is(value)
            && value.hasType(exports.TokenCredentials.TYPE);
    },
    createFrom: function (object) {
        var credentials = LDP_1.VolatileResource.createFrom(object);
        credentials.addType(exports.TokenCredentials.TYPE);
        if (Utils_1.isString(credentials.expires))
            credentials.expires = new Date(credentials.expires);
        return credentials;
    },
};


/***/ }),
/* 86 */
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
var Identifier_1 = __webpack_require__(38);
var Token_1 = __webpack_require__(25);
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
/* 87 */
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
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(59);
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
/* 89 */
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
/* 90 */
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
/* 91 */
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
/* 92 */
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
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = __webpack_require__(3);
var ObjectSchema_1 = __webpack_require__(12);
var RDF_1 = __webpack_require__(10);
var Utils_1 = __webpack_require__(0);
var AbstractContext = (function () {
    function AbstractContext(parentContext) {
        this._parentContext = parentContext;
        this._typeObjectSchemaMap = new Map();
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
        return RDF_1.URI.resolve(this.baseURI, relativeURI);
    };
    AbstractContext.prototype._resolvePath = function (path) {
        var leftSearchedPaths = path.split(".");
        var currentSearchedPaths = [];
        var url = "";
        var documentPaths = this._settings && this._settings.paths;
        while (leftSearchedPaths.length) {
            var containerKey = leftSearchedPaths.shift();
            currentSearchedPaths.push(containerKey);
            var containerPath = documentPaths ? documentPaths[containerKey] : null;
            if (!containerPath)
                throw new Errors_1.IllegalStateError("The path \"" + currentSearchedPaths.join(".") + "\" hasn't been declared.");
            var slug = Utils_1.isString(containerPath) ? containerPath : containerPath.slug;
            if (!slug)
                throw new Errors_1.IllegalStateError("The path \"" + currentSearchedPaths.join(".") + "\" doesn't have a slug set.");
            url = RDF_1.URI.resolve(url, slug);
            documentPaths = Utils_1.isObject(containerPath) ? containerPath.paths : null;
        }
        return this.resolve(url);
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
            throw new Errors_1.IllegalArgumentError("\"" + type + "\" hasn't an object schema.");
        }
        else {
            var generalSchema = !this._generalObjectSchema ?
                this.parentContext ?
                    this.parentContext.getObjectSchema() :
                    new ObjectSchema_1.DigestedObjectSchema() :
                ObjectSchema_1.ObjectSchemaDigester
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
        var digestedSchema = ObjectSchema_1.ObjectSchemaDigester.digestSchema(objectSchema);
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
            this._generalObjectSchema = this.parentContext ? null : new ObjectSchema_1.DigestedObjectSchema();
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
            digestedSchemaToExtend = new ObjectSchema_1.DigestedObjectSchema();
        }
        this._generalObjectSchema = ObjectSchema_1.ObjectSchemaDigester._combineSchemas([
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
            digestedSchemaToExtend = new ObjectSchema_1.DigestedObjectSchema();
        }
        var extendedDigestedSchema = ObjectSchema_1.ObjectSchemaDigester.combineDigestedObjectSchemas([
            digestedSchemaToExtend,
            digestedSchema,
        ]);
        this._typeObjectSchemaMap.set(type, extendedDigestedSchema);
    };
    AbstractContext.prototype._resolveTypeURI = function (uri) {
        return ObjectSchema_1.ObjectSchemaUtils.resolveURI(uri, this.getObjectSchema(), { vocab: true });
    };
    return AbstractContext;
}());
exports.AbstractContext = AbstractContext;


/***/ }),
/* 94 */
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
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DigestedObjectSchema = (function () {
    function DigestedObjectSchema() {
        this.base = "";
        this.vocab = void 0;
        this.language = null;
        this.prefixes = new Map();
        this.properties = new Map();
    }
    return DigestedObjectSchema;
}());
exports.DigestedObjectSchema = DigestedObjectSchema;


/***/ }),
/* 96 */
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
/* 97 */
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
var RDF_1 = __webpack_require__(10);
var Utils = __importStar(__webpack_require__(0));
var ObjectSchemaUtils = (function () {
    function ObjectSchemaUtils() {
    }
    ObjectSchemaUtils.resolveURI = function (uri, schema, relativeTo) {
        if (relativeTo === void 0) { relativeTo = {}; }
        if (uri === null || RDF_1.URI.isAbsolute(uri) || RDF_1.URI.isBNodeID(uri))
            return uri;
        var _a = uri.split(":"), prefix = _a[0], _b = _a[1], localName = _b === void 0 ? "" : _b;
        var definedReference = schema.prefixes.has(prefix) ?
            schema.prefixes.get(prefix) : schema.properties.has(prefix) ?
            schema.properties.get(prefix).uri
            : null;
        if (definedReference !== null && definedReference !== prefix) {
            return ObjectSchemaUtils.resolveURI(definedReference + localName, schema, { vocab: true });
        }
        if (localName)
            return uri;
        if (relativeTo.vocab && schema.vocab)
            return schema.vocab + uri;
        if (relativeTo.base)
            return RDF_1.URI.resolve(schema.base, uri);
        return uri;
    };
    ObjectSchemaUtils.resolveProperty = function (schema, definition, inSame) {
        var uri = definition.uri;
        var type = definition.literalType;
        var resolvedURI = ObjectSchemaUtils.resolveURI(uri, schema, { vocab: true });
        var resolvedType = ObjectSchemaUtils.resolveURI(type, schema, { vocab: true, base: true });
        if (resolvedURI !== uri || resolvedType !== type) {
            definition = inSame ? definition : Utils.ObjectUtils.clone(definition);
            definition.uri = resolvedURI;
            definition.literalType = resolvedType;
        }
        return definition;
    };
    return ObjectSchemaUtils;
}());
exports.ObjectSchemaUtils = ObjectSchemaUtils;


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
var Parser_1 = __webpack_require__(99);
var Utils = __importStar(__webpack_require__(0));
var Node_1 = __webpack_require__(51);
var URI_1 = __webpack_require__(41);
exports.RDFDocument = {
    is: function (value) {
        return Utils.hasProperty(value, "@graph")
            && Utils.isArray(value["@graph"]);
    },
    create: function (resources, uri) {
        var document = {
            "@graph": resources,
        };
        if (uri)
            document["@id"] = uri;
        return document;
    },
    getDocuments: function (objects) {
        if (Utils.isArray(objects))
            return objects
                .filter(exports.RDFDocument.is);
        if (exports.RDFDocument.is(objects))
            return [objects];
        return [];
    },
    getResources: function (objects) {
        var resources = Node_1.RDFNode.getFreeNodes(objects);
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
var RDFDocumentParser = (function (_super) {
    __extends(RDFDocumentParser, _super);
    function RDFDocumentParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RDFDocumentParser.prototype.parse = function (input) {
        return _super.prototype.parse.call(this, input).then(exports.RDFDocument.getDocuments);
    };
    return RDFDocumentParser;
}(Parser_1.JSONLDParser));
exports.RDFDocumentParser = RDFDocumentParser;


/***/ }),
/* 99 */
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
var JSONParser_1 = __webpack_require__(50);
var Processor_1 = __webpack_require__(100);
var JSONLDParser = (function (_super) {
    __extends(JSONLDParser, _super);
    function JSONLDParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONLDParser.prototype.parse = function (input) {
        return _super.prototype.parse.call(this, input).then(Processor_1.JSONLDProcessor.expand);
    };
    return JSONLDParser;
}(JSONParser_1.JSONParser));
exports.JSONLDParser = JSONLDParser;


/***/ }),
/* 100 */
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
var Errors_1 = __webpack_require__(3);
var JSONParser_1 = __webpack_require__(50);
var Request_1 = __webpack_require__(63);
var List_1 = __webpack_require__(40);
var URI_1 = __webpack_require__(41);
var ObjectSchema = __importStar(__webpack_require__(12));
var Utils = __importStar(__webpack_require__(0));
var MAX_CONTEXT_URLS = 10;
var LINK_HEADER_REL = "http://www.w3.org/ns/json-ld#context";
var JSONLDProcessor = (function () {
    function JSONLDProcessor() {
    }
    JSONLDProcessor.expand = function (input) {
        return JSONLDProcessor.retrieveContexts(input, Object.create(null), "").then(function () {
            var expanded = JSONLDProcessor.process(new ObjectSchema.DigestedObjectSchema(), input);
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
            return Promise.reject(new Errors_1.InvalidJSONLDSyntaxError("Maximum number of @context URLs exceeded."));
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
                return { value: Promise.reject(new Errors_1.InvalidJSONLDSyntaxError("Cyclical @context URLs detected.")) };
            var requestOptions = { sendCredentialsOnCORS: false };
            Request_1.RequestUtils.setAcceptHeader("application/ld+json, application/json", requestOptions);
            var promise = Request_1.RequestService
                .get(url, requestOptions, new JSONParser_1.JSONParser())
                .catch(function (response) {
                return Promise.reject(new Errors_1.InvalidJSONLDSyntaxError("Unable to resolve context from \"" + url + "\". Status code: " + response.status));
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
        return ObjectSchema.ObjectSchemaUtils.resolveURI(uri, schema, relativeTo);
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
                    throw new Errors_1.InvalidJSONLDSyntaxError("Language map values must be strings.");
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
        var definition = new ObjectSchema.DigestedObjectSchemaProperty();
        if (context.properties.has(propertyName))
            definition = context.properties.get(propertyName);
        if (definition.literal === false || (propertyName === "@graph" && Utils.isString(value))) {
            var options = { base: true };
            if (definition.pointerType === ObjectSchema.PointerType.VOCAB)
                options.vocab = true;
            return { "@id": JSONLDProcessor.expandURI(context, value, options) };
        }
        if (JSONLDProcessor.isKeyword(propertyName))
            return value;
        var expandedValue = {};
        if (definition.literalType) {
            expandedValue["@type"] = ObjectSchema.ObjectSchemaUtils.resolveURI(definition.literalType, context, { vocab: true, base: true });
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
            insideList = insideList || container === ObjectSchema.ContainerType.LIST;
            var expanded = [];
            for (var _i = 0, _a = element; _i < _a.length; _i++) {
                var item = _a[_i];
                var expandedItem = JSONLDProcessor.process(context, item, activeProperty);
                if (expandedItem === null)
                    continue;
                if (insideList && (Utils.isArray(expandedItem) || List_1.RDFList.is(expandedItem)))
                    throw new Errors_1.InvalidJSONLDSyntaxError("Lists of lists are not permitted.");
                if (!Utils.isArray(expandedItem))
                    expandedItem = [expandedItem];
                expanded.push.apply(expanded, expandedItem);
            }
            return expanded;
        }
        if ("@context" in element) {
            context = ObjectSchema.ObjectSchemaDigester
                .combineDigestedObjectSchemas([
                context,
                ObjectSchema.ObjectSchemaDigester.digestSchema(element["@context"]),
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
                    throw new Errors_1.InvalidJSONLDSyntaxError("\"@id\" value must a string.");
                if (uri === "@type" && !JSONLDProcessor.isValidType(value))
                    throw new Errors_1.InvalidJSONLDSyntaxError("\"@type\" value must a string, an array of strings.");
                if (uri === "@graph" && !(Utils.isObject(value) || Utils.isArray(value)))
                    throw new Errors_1.InvalidJSONLDSyntaxError("\"@graph\" value must not be an object or an array.");
                if (uri === "@value" && (Utils.isObject(value) || Utils.isArray(value)))
                    throw new Errors_1.InvalidJSONLDSyntaxError("\"@value\" value must not be an object or an array.");
                if (uri === "@language") {
                    if (value === null)
                        continue;
                    if (!Utils.isString(value))
                        throw new Errors_1.InvalidJSONLDSyntaxError("\"@language\" value must be a string.");
                    value = value.toLowerCase();
                }
                if (uri === "@index" && !Utils.isString(value))
                    throw new Errors_1.InvalidJSONLDSyntaxError("\"@index\" value must be a string.");
                if (uri === "@reverse" && !Utils.isObject(value))
                    throw new Errors_1.InvalidJSONLDSyntaxError("\"@reverse\" value must be an object.");
                if (uri === "@index" || uri === "@reverse")
                    throw new Errors_1.NotImplementedError("The SDK does not support \"@index\" and \"@reverse\" tags.");
            }
            var expandedValue = void 0;
            var container = JSONLDProcessor.getContainer(context, key);
            if (container === ObjectSchema.ContainerType.LANGUAGE && Utils.isObject(value)) {
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
            if (uri !== "@list" && !List_1.RDFList.is(expandedValue) && container === ObjectSchema.ContainerType.LIST) {
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
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(210));
__export(__webpack_require__(217));
__export(__webpack_require__(218));
__export(__webpack_require__(219));
__export(__webpack_require__(220));
__export(__webpack_require__(221));
__export(__webpack_require__(222));
__export(__webpack_require__(223));
__export(__webpack_require__(224));
__export(__webpack_require__(225));
__export(__webpack_require__(226));
__export(__webpack_require__(227));
__export(__webpack_require__(228));
__export(__webpack_require__(229));


/***/ }),
/* 102 */
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
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(15);
var ObjectSchema_1 = __webpack_require__(12);
var Pointer_1 = __webpack_require__(17);
var RDF_1 = __webpack_require__(10);
var Utils_1 = __webpack_require__(0);
function resolveURI(resource, uri) {
    if (RDF_1.URI.isAbsolute(uri))
        return uri;
    if (!resource._registry || !resource._registry._context)
        return uri;
    var schema = resource._registry._context.getObjectSchema();
    return ObjectSchema_1.ObjectSchemaUtils.resolveURI(uri, schema, { vocab: true });
}
var PROTOTYPE = {
    get types() { return []; },
    addType: function (type) {
        type = resolveURI(this, type);
        if (this.types.indexOf(type) !== -1)
            return;
        this.types.push(type);
    },
    hasType: function (type) {
        type = resolveURI(this, type);
        return this.types.indexOf(type) !== -1;
    },
    removeType: function (type) {
        type = resolveURI(this, type);
        var index = this.types.indexOf(type);
        if (index !== -1)
            this.types.splice(index, 1);
    },
};
exports.TransientResource = {
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    is: function (value) {
        return Pointer_1.Pointer.is(value)
            && exports.TransientResource.isDecorated(value);
    },
    create: function (data) {
        var clone = Object.assign({}, data);
        return exports.TransientResource.createFrom(clone);
    },
    createFrom: function (object) {
        return exports.TransientResource.decorate(object);
    },
    decorate: function (object) {
        if (exports.TransientResource.isDecorated(object))
            return object;
        var resource = core_1.ModelDecorator
            .decorateMultiple(object, Pointer_1.Pointer);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(230));
__export(__webpack_require__(231));
__export(__webpack_require__(232));
__export(__webpack_require__(233));
__export(__webpack_require__(234));
__export(__webpack_require__(235));
__export(__webpack_require__(236));


/***/ }),
/* 105 */
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
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = __webpack_require__(30);
var Header_1 = __webpack_require__(64);
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
            throw new Errors_1.BadResponseError("The response doesn't contain an ETag", this);
        return eTagHeader.values[0];
    };
    return Response;
}());
exports.Response = Response;


/***/ }),
/* 107 */
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
var Errors = __importStar(__webpack_require__(3));
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
            throw new Errors.IllegalArgumentError("The value is not a Date object.");
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
            throw new Errors.IllegalArgumentError("The value is not a Date object.");
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
            throw new Errors.IllegalArgumentError("The value is not a Date object.");
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
            throw new Errors.IllegalArgumentError(notNumberError);
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
            throw new Errors.IllegalArgumentError(notNumberError);
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
            throw new Errors.IllegalArgumentError(notNumberError);
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
            throw new Errors.IllegalArgumentError(notNumberError);
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
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var List_1 = __webpack_require__(40);
var Literal_1 = __webpack_require__(52);
var Node_1 = __webpack_require__(51);
var Utils_1 = __webpack_require__(0);
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
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PointerType;
(function (PointerType) {
    PointerType[PointerType["ID"] = 0] = "ID";
    PointerType[PointerType["VOCAB"] = 1] = "VOCAB";
})(PointerType = exports.PointerType || (exports.PointerType = {}));


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(243));
__export(__webpack_require__(166));


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = __webpack_require__(7);
exports.TransientFragment = {
    isDecorated: function (object) {
        return Resource_1.TransientResource.isDecorated(object);
    },
    is: function (value) {
        return Resource_1.TransientResource.is(value);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientFragment.createFrom(copy);
    },
    createFrom: function (object) {
        return exports.TransientFragment.decorate(object);
    },
    decorate: function (object) {
        if (exports.TransientFragment.isDecorated(object))
            return object;
        Resource_1.TransientResource.decorate(object);
        return object;
    },
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(246));
__export(__webpack_require__(113));


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = __webpack_require__(3);
var Fragment_1 = __webpack_require__(22);
var RDF_1 = __webpack_require__(10);
exports.TransientBlankNode = {
    is: function (value) {
        return Fragment_1.TransientFragment.is(value) &&
            RDF_1.URI.isBNodeID(value.id);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientBlankNode.createFrom(copy);
    },
    createFrom: function (object) {
        if (!object.id) {
            object.id = RDF_1.URI.generateBNodeID();
        }
        else if (!RDF_1.URI.isBNodeID(object.id)) {
            throw new Errors_1.IllegalArgumentError("The id \"" + object.id + "\" is not a blank node label.");
        }
        return exports.TransientBlankNode.decorate(object);
    },
    decorate: function (object) {
        var resource = Fragment_1.TransientFragment.decorate(object);
        Object.defineProperties(resource, {
            "id": {
                enumerable: false,
                configurable: true,
                get: function () {
                    return this._id;
                },
                set: function (value) {
                    if (!RDF_1.URI.isBNodeID(value))
                        throw new Errors_1.IllegalActionError("Cannot assign \"" + value + "\" as a blank node ID.");
                    this._id = value;
                },
            },
        });
        return resource;
    },
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = __webpack_require__(18);
var FreeResources_1 = __webpack_require__(69);
var Errors_1 = __webpack_require__(30);
var JSONLD_1 = __webpack_require__(23);
var ObjectSchema_1 = __webpack_require__(12);
var RDF_1 = __webpack_require__(10);
var Resource_1 = __webpack_require__(7);
var Utils_1 = __webpack_require__(0);
var Registry_1 = __webpack_require__(68);
var RegistryService = (function () {
    function RegistryService(model, context) {
        this.inScope = Registry_1.Registry.PROTOTYPE.inScope;
        this.hasPointer = Registry_1.Registry.PROTOTYPE.hasPointer;
        this.getPointer = Registry_1.Registry.PROTOTYPE.getPointer;
        this.getPointers = Registry_1.Registry.PROTOTYPE.getPointers;
        this.removePointer = Registry_1.Registry.PROTOTYPE.removePointer;
        this._context = context;
        this._model = model;
        this._resourcesMap = new Map();
        this._documentDecorators = Utils_1.MapUtils.extend(new Map(), context && context.parentContext && context.parentContext.registry.documentDecorators);
        this._jsonldConverter = new JSONLD_1.JSONLDConverter(context && context.parentContext && context.parentContext.registry.jsonldConverter.literalSerializers);
    }
    Object.defineProperty(RegistryService.prototype, "_registry", {
        get: function () {
            return this._context
                && this._context.parentContext
                && this._context.parentContext.registry;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryService.prototype, "documentDecorators", {
        get: function () { return this._documentDecorators; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryService.prototype, "jsonldConverter", {
        get: function () { return this._jsonldConverter; },
        enumerable: true,
        configurable: true
    });
    RegistryService.prototype._getLocalID = function (id) {
        if (!this._context)
            return id;
        var schema = this._context.getObjectSchema();
        var iri = ObjectSchema_1.ObjectSchemaUtils.resolveURI(id, schema);
        if (!RDF_1.URI.isBaseOf(this._context.baseURI, iri))
            return Registry_1.Registry.PROTOTYPE._getLocalID.call(this, id);
        return RDF_1.URI.getRelativeURI(iri, this._context.baseURI);
    };
    RegistryService.prototype._register = function (base) {
        var pointer = Registry_1.Registry.PROTOTYPE._register.call(this, base);
        var resource = this._model.decorate(pointer);
        if (!this._context)
            return resource;
        var schema = this._context.getObjectSchema();
        resource.id = ObjectSchema_1.ObjectSchemaUtils
            .resolveURI(resource.id, schema, { base: true });
        return resource;
    };
    RegistryService.prototype.getGeneralSchema = function () {
        if (!this._context)
            return new ObjectSchema_1.DigestedObjectSchema();
        return this._context.getObjectSchema();
    };
    RegistryService.prototype.hasSchemaFor = function (object, path) {
        return !path;
    };
    RegistryService.prototype.getSchemaFor = function (object) {
        var schema = "types" in object ?
            this._getSchemaForResource(object) :
            this._getSchemaForNode(object);
        if (!Resource_1.PersistedResource.isDecorated(object) || !object.isPartial())
            return schema;
        return ObjectSchema_1.ObjectSchemaDigester
            ._combineSchemas([
            schema,
            object._partialMetadata.schema,
        ]);
    };
    RegistryService.prototype._getSchemaForNode = function (node) {
        var types = RDF_1.RDFNode.getTypes(node);
        return this._getSchema(types, node["@id"]);
    };
    RegistryService.prototype._getSchemaForResource = function (resource) {
        var types = resource.types || [];
        return this._getSchema(types, resource.id);
    };
    RegistryService.prototype._getSchema = function (objectTypes, objectID) {
        var _this = this;
        if (!this._context)
            return new ObjectSchema_1.DigestedObjectSchema();
        if (objectID !== void 0 && !RDF_1.URI.hasFragment(objectID) && !RDF_1.URI.isBNodeID(objectID) && objectTypes.indexOf(Document_1.TransientDocument.TYPE) === -1)
            objectTypes = objectTypes.concat(Document_1.TransientDocument.TYPE);
        var objectSchemas = objectTypes
            .filter(function (type) { return _this._context.hasObjectSchema(type); })
            .map(function (type) { return _this._context.getObjectSchema(type); });
        return ObjectSchema_1.ObjectSchemaDigester
            ._combineSchemas([
            this._context.getObjectSchema()
        ].concat(objectSchemas));
    };
    RegistryService.prototype._parseFreeNodes = function (freeNodes) {
        var freeResourcesDocument = FreeResources_1.FreeResources
            .createFrom({ _registry: this, _context: this._context });
        var resources = freeNodes
            .map(function (node) { return freeResourcesDocument._register({ id: node["@id"] }); });
        this._compactRDFNodes(freeNodes, resources, freeResourcesDocument);
        return freeResourcesDocument;
    };
    RegistryService.prototype._compactRDFNodes = function (nodes, targets, library) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var target = targets[i] || {};
            this._compactRDFNode(node, target, library);
        }
    };
    RegistryService.prototype._compactRDFNode = function (node, target, library) {
        var digestedSchema = this.getSchemaFor(node);
        this.jsonldConverter.compact(node, target, digestedSchema, library);
    };
    RegistryService.prototype._parseErrorFromResponse = function (response) {
        if (!response || response instanceof Error)
            return Promise.reject(response);
        if (!(response.status >= 400 && response.status < 600 && Errors_1.statusCodeMap.has(response.status)))
            return Promise.reject(new Errors_1.UnknownError(response.data, response));
        var error = new (Errors_1.statusCodeMap.get(response.status))(response.data, response);
        return Promise.reject(error);
    };
    return RegistryService;
}());
exports.RegistryService = RegistryService;


/***/ }),
/* 115 */
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
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = __webpack_require__(18);
var Errors_1 = __webpack_require__(3);
var Vocabularies_1 = __webpack_require__(1);
exports.TransientDirectContainer = {
    TYPE: Vocabularies_1.LDP.DirectContainer,
    is: function (value) {
        return Document_1.TransientDocument.is(value)
            && value.hasType(exports.TransientDirectContainer.TYPE)
            && value.hasOwnProperty("membershipResource");
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientDirectContainer.createFrom(copy);
    },
    createFrom: function (object) {
        if (exports.TransientDirectContainer.is(object))
            throw new Errors_1.IllegalArgumentError("The base object is already a DirectContainer.");
        if (!object.hasMemberRelation)
            throw new Errors_1.IllegalArgumentError("The property hasMemberRelation is required.");
        var container = Document_1.TransientDocument.is(object) ?
            object : Document_1.TransientDocument.createFrom(object);
        container.addType(exports.TransientDirectContainer.TYPE);
        return container;
    },
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = __webpack_require__(7);
var C_1 = __webpack_require__(11);
exports.VolatileResource = {
    TYPE: C_1.C.VolatileResource,
    is: function (value) {
        return Resource_1.TransientResource.is(value)
            && value.hasType(exports.VolatileResource.TYPE);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.VolatileResource.createFrom(copy);
    },
    createFrom: function (object) {
        var resource = Resource_1.TransientResource.createFrom(object);
        resource.addType(exports.VolatileResource.TYPE);
        return resource;
    },
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = __webpack_require__(29);
var ObjectSchema_1 = __webpack_require__(12);
var PartialMetadata = (function () {
    function PartialMetadata(schema, previousPartial) {
        this.schema = this.mergeSchemas(previousPartial ? previousPartial.schema : new ObjectSchema_1.DigestedObjectSchema(), schema);
    }
    PartialMetadata.prototype.mergeSchemas = function (oldSchema, newSchema) {
        if (newSchema === PartialMetadata.ALL || oldSchema === PartialMetadata.ALL)
            return PartialMetadata.ALL;
        newSchema.prefixes.forEach(function (newURI, namespace) {
            newURI = ObjectSchema_1.ObjectSchemaUtils.resolveURI(newURI, newSchema);
            if (!oldSchema.prefixes.has(namespace))
                return oldSchema.prefixes.set(namespace, newURI);
            var oldURI = oldSchema.prefixes.get(namespace);
            if (oldURI !== newURI)
                throw new IllegalArgumentError_1.IllegalArgumentError("Prefix \"" + namespace + "\" has different values: \"" + oldURI + "\", \"" + newURI + "\"");
        });
        newSchema.properties.forEach(function (newDefinition, propertyName) {
            if (!oldSchema.properties.has(propertyName))
                return oldSchema.properties.set(propertyName, newDefinition);
            var oldDefinition = oldSchema.properties.get(propertyName);
            for (var key in newDefinition) {
                var newValue = newDefinition[key];
                var oldValue = oldDefinition[key];
                if (newValue !== oldValue)
                    throw new IllegalArgumentError_1.IllegalArgumentError("Property \"" + propertyName + "\" has different \"" + key + "\": \"" + oldValue + "\", \"" + newValue + "\"");
            }
        });
        return oldSchema;
    };
    PartialMetadata.ALL = Object.freeze(new ObjectSchema_1.DigestedObjectSchema());
    return PartialMetadata;
}());
exports.PartialMetadata = PartialMetadata;


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
var tokens_1 = __webpack_require__(4);
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
/* 120 */
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
var Errors_1 = __webpack_require__(3);
var ObjectSchema_1 = __webpack_require__(12);
var QueryContext_1 = __webpack_require__(70);
var QueryProperty_1 = __webpack_require__(54);
var Utils_1 = __webpack_require__(44);
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
            var mergeSchema = ObjectSchema_1.ObjectSchemaDigester.combineDigestedObjectSchemas([existingSchema, schema]);
            var digestedProperty = ObjectSchema_1.ObjectSchemaUtils.resolveProperty(mergeSchema, schema.properties.get(propertyName));
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
                    return new ObjectSchema_1.DigestedObjectSchema();
                default:
                    throw new Errors_1.IllegalArgumentError("Property \"" + path + "\" is not a resource.");
            }
        }
        var parent = this.getProperty(Utils_1.getParentPath(path));
        if (!parent || parent.getType() !== QueryProperty_1.QueryPropertyType.FULL)
            throw new Errors_1.IllegalArgumentError("Schema path \"" + path + "\" does not exists.");
        return _super.prototype.getSchemaFor.call(this, object);
    };
    QueryContextBuilder.prototype._getTypeSchemas = function () {
        if (this._schemas)
            return this._schemas;
        return this._schemas = this.context._getTypeObjectSchemas();
    };
    return QueryContextBuilder;
}(QueryContext_1.QueryContext));
exports.QueryContextBuilder = QueryContextBuilder;


/***/ }),
/* 121 */
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
var Resource_1 = __webpack_require__(7);
var QueryContext_1 = __webpack_require__(70);
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
            schemaLibrary = values.find(Resource_1.PersistedResource.is);
            if (!schemaLibrary)
                return _super.prototype.getSchemaFor.call(this, object);
        }
        return schemaLibrary._partialMetadata.schema;
    };
    return QueryContextPartial;
}(QueryContext_1.QueryContext));
exports.QueryContextPartial = QueryContextPartial;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = __webpack_require__(32);
var tokens_1 = __webpack_require__(4);
var Utils_1 = __webpack_require__(0);
var QueryObject = (function () {
    function QueryObject(context, object) {
        this._context = context;
        var id = Utils_1.isString(object) ? object : object.id;
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
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = __webpack_require__(32);
var tokens_1 = __webpack_require__(4);
var IllegalArgumentError_1 = __webpack_require__(29);
var Utils_1 = __webpack_require__(0);
var XSD_1 = __webpack_require__(14);
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
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(260));
__export(__webpack_require__(126));


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(0);
var XSD_1 = __webpack_require__(14);
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
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(39);
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
/* 127 */
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
var JSONParser_1 = __webpack_require__(50);
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
var tokens_1 = __webpack_require__(4);
var IllegalArgumentError_1 = __webpack_require__(29);
var IllegalStateError_1 = __webpack_require__(62);
var QueryDocumentBuilder_1 = __webpack_require__(71);
var Utils_1 = __webpack_require__(44);
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
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LDP_1 = __webpack_require__(20);
var Vocabularies_1 = __webpack_require__(1);
var SCHEMA = {
    "target": {
        "@id": Vocabularies_1.C.target,
        "@type": "@id",
        "@container": "@set",
    },
};
exports.QueryMetadata = {
    TYPE: Vocabularies_1.C.QueryMetadata,
    SCHEMA: SCHEMA,
    is: function (value) {
        return LDP_1.VolatileResource.is(value)
            && value.hasType(exports.QueryMetadata.TYPE);
    },
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(262));
__export(__webpack_require__(131));


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = __webpack_require__(3);
var Fragment_1 = __webpack_require__(22);
var RDF_1 = __webpack_require__(10);
var Utils_1 = __webpack_require__(0);
exports.TransientNamedFragment = {
    isDecorated: function (object) {
        return Utils_1.isObject(object) &&
            object.hasOwnProperty("slug") && !object.propertyIsEnumerable("slug");
    },
    is: function (value) {
        return Fragment_1.TransientFragment.is(value)
            && exports.TransientNamedFragment.isDecorated(value);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientNamedFragment.createFrom(copy);
    },
    createFrom: function (object) {
        var slug = object.slug;
        var namedFragment = exports.TransientNamedFragment.decorate(object);
        namedFragment.slug = slug;
        return namedFragment;
    },
    decorate: function (object) {
        if (exports.TransientNamedFragment.isDecorated(object))
            return object;
        Fragment_1.TransientFragment.decorate(object);
        var namedFragment = object;
        Object.defineProperties(namedFragment, {
            "id": {
                enumerable: false,
                configurable: true,
                get: function () {
                    var registryID = this._registry && this._registry.id || "";
                    return registryID + "#" + RDF_1.URI.getFragment(this._id);
                },
                set: function (value) {
                    var fragment = RDF_1.URI.getFragment(value);
                    if (!fragment)
                        throw new Errors_1.IllegalActionError("Cannot assign \"" + value + "\" as a named fragment ID.");
                    var registryID = this._registry && this._registry.id || "";
                    if (!RDF_1.URI.isBaseOf(registryID, value))
                        throw new Errors_1.IllegalActionError("\"" + value + "\" it's outside \"" + registryID + "\"'s scope.");
                    this._id = registryID + "#" + fragment;
                },
            },
            "slug": {
                enumerable: false,
                configurable: true,
                get: function () {
                    return RDF_1.URI.getFragment(this._id);
                },
                set: function (value) {
                    var registryID = this._registry && this._registry.id || "";
                    this._id = registryID + "#" + value;
                },
            },
        });
        return namedFragment;
    },
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AddMemberAction_1 = __webpack_require__(133);
exports.AddMemberAction = AddMemberAction_1.AddMemberAction;
var MembersDocument_1 = __webpack_require__(264);
exports.MembersDocument = MembersDocument_1.MembersDocument;
var RemoveMemberAction_1 = __webpack_require__(134);
exports.RemoveMemberAction = RemoveMemberAction_1.RemoveMemberAction;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = __webpack_require__(7);
var Vocabularies_1 = __webpack_require__(1);
var SCHEMA = {
    "targetMembers": {
        "@id": Vocabularies_1.C.targetMember,
        "@type": "@id",
        "@container": "@set",
    },
};
exports.AddMemberAction = {
    TYPE: Vocabularies_1.C.AddMemberAction,
    SCHEMA: SCHEMA,
    is: function (value) {
        return Resource_1.TransientResource.is(value)
            && value.hasOwnProperty("targetMembers");
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.AddMemberAction.createFrom(copy);
    },
    createFrom: function (object) {
        var resource = Resource_1.TransientResource.createFrom(object);
        resource.addType(exports.AddMemberAction.TYPE);
        return resource;
    },
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = __webpack_require__(7);
var Vocabularies_1 = __webpack_require__(1);
var SCHEMA = {
    "targetMembers": {
        "@id": Vocabularies_1.C.targetMember,
        "@type": "@id",
        "@container": "@set",
    },
};
exports.RemoveMemberAction = {
    TYPE: Vocabularies_1.C.RemoveMemberAction,
    SCHEMA: SCHEMA,
    is: function (value) {
        return Resource_1.TransientResource.is(value)
            && value.hasOwnProperty("targetMembers");
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.RemoveMemberAction.createFrom(copy);
    },
    createFrom: function (object) {
        var resource = Resource_1.TransientResource.createFrom(object);
        resource.addType(exports.RemoveMemberAction.TYPE);
        return resource;
    },
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Event;
(function (Event) {
    Event["CHILD_CREATED"] = "child.created";
    Event["ACCESS_POINT_CREATED"] = "access-point.created";
    Event["DOCUMENT_CREATED"] = "*.created";
    Event["DOCUMENT_MODIFIED"] = "document.modified";
    Event["DOCUMENT_DELETED"] = "document.deleted";
    Event["MEMBER_ADDED"] = "member.added";
    Event["MEMBER_REMOVED"] = "member.removed";
})(Event = exports.Event || (exports.Event = {}));


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = __webpack_require__(3);
var RDF_1 = __webpack_require__(10);
function validateEventType(event) {
    if (!/(access-point|child|\*)\.(created|\*)|(document|\*)\.(modified|deleted|\*)|(member|\*)\.(added|removed|\*)/.test(event))
        throw new Errors_1.IllegalArgumentError("Provided event type \"" + event + "\" is invalid.");
}
exports.validateEventType = validateEventType;
function parseURIPattern(uriPattern, baseURI) {
    if (!RDF_1.URI.isBaseOf(baseURI, uriPattern))
        throw new Errors_1.IllegalArgumentError("Provided uriPattern \"" + uriPattern + "\" is an invalid for your Carbon LDP instance.");
    if (uriPattern === "/")
        return "";
    uriPattern = RDF_1.URI.getRelativeURI(uriPattern, baseURI);
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
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var required = __webpack_require__(280)
  , qs = __webpack_require__(281)
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 138 */
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
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(2)
  , urlUtils = __webpack_require__(16)
  , BufferedSender = __webpack_require__(286)
  , Polling = __webpack_require__(287)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(9)('sockjs-client:sender-receiver');
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
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var EventEmitter = __webpack_require__(13).EventEmitter
  , inherits = __webpack_require__(2)
  , utils = __webpack_require__(27)
  , urlUtils = __webpack_require__(16)
  , XHR = global.XMLHttpRequest
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(9)('sockjs-client:browser:xhr');
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(2)
  , AjaxBasedTransport = __webpack_require__(36)
  , XhrReceiver = __webpack_require__(55)
  , XDRObject = __webpack_require__(77)
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
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(2)
  , AjaxBasedTransport = __webpack_require__(36)
  , EventSourceReceiver = __webpack_require__(288)
  , XHRCorsObject = __webpack_require__(56)
  , EventSourceDriver = __webpack_require__(143)
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
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global.EventSource;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Few cool transports do work only for same-origin. In order to make
// them work cross-domain we shall use iframe, served from the
// remote domain. New browsers have capabilities to communicate with
// cross domain iframe using postMessage(). In IE it was implemented
// from IE 8+, but of course, IE got some details wrong:
//    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
//    http://stevesouders.com/misc/test-postmessage.php

var inherits = __webpack_require__(2)
  , JSON3 = __webpack_require__(24)
  , EventEmitter = __webpack_require__(13).EventEmitter
  , version = __webpack_require__(145)
  , urlUtils = __webpack_require__(16)
  , iframeUtils = __webpack_require__(47)
  , eventUtils = __webpack_require__(27)
  , random = __webpack_require__(35)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(9)('sockjs-client:transport:iframe');
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
/* 145 */
/***/ (function(module, exports) {

module.exports = '1.1.4';


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(2)
  , HtmlfileReceiver = __webpack_require__(291)
  , XHRLocalObject = __webpack_require__(45)
  , AjaxBasedTransport = __webpack_require__(36)
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
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(2)
  , AjaxBasedTransport = __webpack_require__(36)
  , XhrReceiver = __webpack_require__(55)
  , XHRCorsObject = __webpack_require__(56)
  , XHRLocalObject = __webpack_require__(45)
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
/* 148 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(2)
  , EventEmitter = __webpack_require__(13).EventEmitter
  , JSON3 = __webpack_require__(24)
  , XHRLocalObject = __webpack_require__(45)
  , InfoAjax = __webpack_require__(150)
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
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EventEmitter = __webpack_require__(13).EventEmitter
  , inherits = __webpack_require__(2)
  , JSON3 = __webpack_require__(24)
  , objectUtils = __webpack_require__(79)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(9)('sockjs-client:info-ajax');
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
/* 151 */
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
var QueryDocument = __importStar(__webpack_require__(43));
exports.QueryDocument = QueryDocument;
__export(__webpack_require__(152));
__export(__webpack_require__(127));
__export(__webpack_require__(73));
var SPARQLDocument_1 = __webpack_require__(322);
exports.SPARQLDocument = SPARQLDocument_1.SPARQLDocument;


/***/ }),
/* 152 */
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
var sparqler_1 = __webpack_require__(309);
var decorators_1 = __webpack_require__(21);
var SPARQLBuilder = (function (_super) {
    __extends(SPARQLBuilder, _super);
    function SPARQLBuilder(repository, entryPoint) {
        return _super.call(this, function (container, object) {
            var finishObject = decorators_1.finishDecorator(container, object);
            return Object.assign(finishObject, {
                execute: function () {
                    return repository.executeSELECTQuery(entryPoint, finishObject.toCompactString());
                },
                executeRaw: function () {
                    return repository.executeRawSELECTQuery(entryPoint, finishObject.toCompactString());
                },
            });
        }) || this;
    }
    return SPARQLBuilder;
}(sparqler_1.SPARQLER));
exports.SPARQLBuilder = SPARQLBuilder;


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(6);
var tokens_2 = __webpack_require__(4);
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
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(6);
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
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(156));

//# sourceMappingURL=index.js.map


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(19);
var decorators_1 = __webpack_require__(21);
var NotTriplesPattern_1 = __webpack_require__(157);
var ValuesPattern_1 = __webpack_require__(158);
var tokens_1 = __webpack_require__(6);
var BlankNode_1 = __webpack_require__(159);
var Collection_1 = __webpack_require__(160);
var Literals_1 = __webpack_require__(161);
var Resource_1 = __webpack_require__(162);
var Variable_1 = __webpack_require__(163);
var StringLiteral_1 = __webpack_require__(37);
var Patterns_1 = __webpack_require__(164);
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
/* 157 */
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
/* 158 */
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
var _1 = __webpack_require__(315);
var tokens_1 = __webpack_require__(6);
var ObjectPattern_1 = __webpack_require__(48);
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
/* 159 */
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
var tokens_1 = __webpack_require__(6);
var TriplesPattern_1 = __webpack_require__(57);
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
/* 160 */
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
var tokens_1 = __webpack_require__(6);
var tokens_2 = __webpack_require__(4);
var ObjectPattern_1 = __webpack_require__(48);
var TriplesPattern_1 = __webpack_require__(57);
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
/* 161 */
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
var tokens_1 = __webpack_require__(6);
var tokens_2 = __webpack_require__(4);
var ObjectPattern_1 = __webpack_require__(48);
var TriplesSubject_1 = __webpack_require__(58);
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
/* 162 */
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
var TriplesSubject_1 = __webpack_require__(58);
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
/* 163 */
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
var tokens_1 = __webpack_require__(6);
var tokens_2 = __webpack_require__(4);
var TriplesSubject_1 = __webpack_require__(58);
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
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(6);
var tokens_2 = __webpack_require__(4);
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
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vocabularies_1 = __webpack_require__(1);
exports.TransientProtectedDocument = {
    TYPE: Vocabularies_1.CS.ProtectedDocument,
};


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LDP_1 = __webpack_require__(20);
var Vocabularies_1 = __webpack_require__(1);
exports.TransientAccessPoint = {
    TYPE: Vocabularies_1.C.AccessPoint,
    is: function (value) {
        return LDP_1.TransientDirectContainer.is(value);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientAccessPoint.createFrom(copy);
    },
    createFrom: function (object) {
        return LDP_1.TransientDirectContainer.createFrom(object);
    },
};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ACE_1 = __webpack_require__(81);
exports.TransientACE = ACE_1.TransientACE;
var ACL_1 = __webpack_require__(169);
exports.TransientACL = ACL_1.TransientACL;
var AuthenticatedUserInformationAccessor_1 = __webpack_require__(325);
exports.AuthenticatedUserInformationAccessor = AuthenticatedUserInformationAccessor_1.AuthenticatedUserInformationAccessor;
var AuthenticatedUserMetadata_1 = __webpack_require__(326);
exports.AuthenticatedUserMetadata = AuthenticatedUserMetadata_1.AuthenticatedUserMetadata;
var AbstractAuthenticator_1 = __webpack_require__(82);
exports.AbstractAuthenticator = AbstractAuthenticator_1.AbstractAuthenticator;
var AuthMethod_1 = __webpack_require__(173);
exports.AuthMethod = AuthMethod_1.AuthMethod;
var AuthService_1 = __webpack_require__(328);
exports.AuthService = AuthService_1.AuthService;
var BasicAuthenticator_1 = __webpack_require__(84);
exports.BasicAuthenticator = BasicAuthenticator_1.BasicAuthenticator;
var BasicCredentials_1 = __webpack_require__(174);
exports.BasicCredentials = BasicCredentials_1.BasicCredentials;
var BasicToken_1 = __webpack_require__(175);
exports.BasicToken = BasicToken_1.BasicToken;
var CredentialsSet_1 = __webpack_require__(329);
exports.CredentialsSet = CredentialsSet_1.CredentialsSet;
var LDAPCredentials_1 = __webpack_require__(330);
exports.LDAPCredentials = LDAPCredentials_1.LDAPCredentials;
var ACE_2 = __webpack_require__(81);
exports.ACE = ACE_2.ACE;
var ACL_2 = __webpack_require__(169);
exports.ACL = ACL_2.ACL;
var User_1 = __webpack_require__(83);
exports.User = User_1.User;
var TokenAuthenticator_1 = __webpack_require__(176);
exports.TokenAuthenticator = TokenAuthenticator_1.TokenAuthenticator;
var TokenCredentials_1 = __webpack_require__(85);
exports.TokenCredentials = TokenCredentials_1.TokenCredentials;
exports.TokenCredentialsBase = TokenCredentials_1.TokenCredentialsBase;
var User_2 = __webpack_require__(83);
exports.TransientUser = User_2.TransientUser;
var UsernameAndPasswordCredentials_1 = __webpack_require__(172);
exports.UsernameAndPasswordCredentials = UsernameAndPasswordCredentials_1.UsernameAndPasswordCredentials;
var UsersEndpoint_1 = __webpack_require__(177);
exports.UsersEndpoint = UsersEndpoint_1.UsersEndpoint;


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Fragment_1 = __webpack_require__(22);
var Vocabularies_1 = __webpack_require__(1);
exports.TransientACE = {
    TYPE: Vocabularies_1.CS.AccessControlEntry,
    is: function (value) {
        return Fragment_1.TransientFragment.is(value)
            && value.hasOwnProperty("granting")
            && value.hasOwnProperty("permissions")
            && value.hasOwnProperty("subjects")
            && value.hasOwnProperty("subjectsClass");
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientACE.createFrom(copy);
    },
    createFrom: function (object) {
        Fragment_1.TransientFragment.decorate(object);
        var ace = object;
        ace.addType(exports.TransientACE.TYPE);
        return ace;
    },
};


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(324));
__export(__webpack_require__(170));


/***/ }),
/* 170 */
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
var Document_1 = __webpack_require__(18);
var Pointer_1 = __webpack_require__(17);
var Utils = __importStar(__webpack_require__(0));
var Vocabularies_1 = __webpack_require__(1);
var ACE_1 = __webpack_require__(81);
exports.TransientACL = {
    TYPE: Vocabularies_1.CS.AccessControlList,
    isDecorated: function (object) {
        return Utils.hasPropertyDefined(object, "accessTo")
            && Utils.hasFunction(object, "_parsePointer")
            && Utils.hasFunction(object, "grant")
            && Utils.hasFunction(object, "deny")
            && Utils.hasFunction(object, "configureChildInheritance")
            && Utils.hasFunction(object, "grants")
            && Utils.hasFunction(object, "denies")
            && Utils.hasFunction(object, "getChildInheritance")
            && Utils.hasFunction(object, "remove")
            && Utils.hasFunction(object, "removeChildInheritance");
    },
    decorate: function (object) {
        if (exports.TransientACL.isDecorated(object))
            return object;
        Document_1.TransientDocument.decorate(object);
        var acl = object;
        Object.defineProperties(acl, {
            "_parsePointer": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: parsePointer,
            },
            "grant": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: grant,
            },
            "deny": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: deny,
            },
            "configureChildInheritance": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: configureChildInheritance,
            },
            "grants": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: grants,
            },
            "denies": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: denies,
            },
            "getChildInheritance": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: getChildInheritance,
            },
            "remove": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: remove,
            },
            "removeChildInheritance": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: removeChildInheritance,
            },
        });
        return acl;
    },
};
function parsePointer(element) {
    return Pointer_1.Pointer.is(element) ? element : Pointer_1.Pointer.create({ id: element });
}
function parsePointers(elements) {
    var _this = this;
    var elementsArray = Utils.isArray(elements) ? elements : [elements];
    return elementsArray.map(function (element) { return _this._parsePointer(element); });
}
function configACE(granting, subject, subjectsClass, permissions, aces) {
    var subjectACEs = aces.filter(function (_) { return _.subjects.length === 1 && _.granting === granting && Pointer_1.Pointer.areEqual(_.subjects[0], subject); });
    var ace;
    if (subjectACEs.length === 0) {
        ace = ACE_1.TransientACE.createFrom({
            granting: granting,
            permissions: [],
            subjects: [subject],
            subjectsClass: subjectsClass,
        });
        aces.push(this.createFragment(ace));
    }
    else {
        ace = subjectACEs[0];
    }
    Array.prototype.push.apply(ace.permissions, permissions);
    return ace;
}
function configACEs(granting, subjects, subjectsClass, permissions, aces) {
    var subjectPointers = parsePointers.call(this, subjects);
    var subjectClassPointer = this._parsePointer(subjectsClass);
    var permissionPointers = parsePointers.call(this, permissions);
    for (var _i = 0, subjectPointers_1 = subjectPointers; _i < subjectPointers_1.length; _i++) {
        var subject = subjectPointers_1[_i];
        removePermissionsFrom.call(this, subject, permissionPointers, aces);
        configACE.call(this, granting, subject, subjectClassPointer, permissionPointers, aces);
    }
}
function grant(subjects, subjectsClass, permissions) {
    var acl = this;
    acl.entries = acl.entries || [];
    configACEs.call(this, true, subjects, subjectsClass, permissions, acl.entries);
}
function deny(subjects, subjectsClass, permissions) {
    var acl = this;
    acl.entries = acl.entries || [];
    configACEs.call(this, false, subjects, subjectsClass, permissions, acl.entries);
}
function configureChildInheritance(granting, subjects, subjectsClass, permissions) {
    var acl = this;
    acl.inheritableEntries = acl.inheritableEntries || [];
    configACEs.call(this, granting, subjects, subjectsClass, permissions, acl.inheritableEntries);
}
function grantingFrom(subject, permission, aces) {
    var subjectACEs = aces.filter(function (ace) { return Utils.ArrayUtils.indexOf(ace.subjects, subject, Pointer_1.Pointer.areEqual) !== -1; });
    for (var _i = 0, subjectACEs_1 = subjectACEs; _i < subjectACEs_1.length; _i++) {
        var ace = subjectACEs_1[_i];
        if (Utils.ArrayUtils.indexOf(ace.permissions, permission, Pointer_1.Pointer.areEqual) !== -1)
            return ace.granting;
    }
    return null;
}
function getGranting(subject, permission, aces) {
    if (!aces)
        return null;
    var subjectPointer = this._parsePointer(subject);
    var permissionPointer = this._parsePointer(permission);
    return grantingFrom(subjectPointer, permissionPointer, aces);
}
function grants(subject, permission) {
    var acl = this;
    return getGranting.call(this, subject, permission, acl.entries);
}
function denies(subject, permission) {
    var acl = this;
    var granting = getGranting.call(this, subject, permission, acl.entries);
    return granting === null ? null : !granting;
}
function getChildInheritance(subject, permission) {
    var acl = this;
    return getGranting.call(this, subject, permission, acl.inheritableEntries);
}
function removePermissionsFrom(subject, permissions, aces) {
    if (!aces)
        return;
    var acl = this;
    var opposedAces = acl.entries === aces ? acl.inheritableEntries : acl.entries;
    var subjectACEs = aces.filter(function (ace) { return Utils.ArrayUtils.indexOf(ace.subjects, subject, Pointer_1.Pointer.areEqual) !== -1; });
    for (var _i = 0, subjectACEs_2 = subjectACEs; _i < subjectACEs_2.length; _i++) {
        var ace = subjectACEs_2[_i];
        if (opposedAces && Utils.ArrayUtils.indexOf(opposedAces, ace, Pointer_1.Pointer.areEqual) !== -1) {
            aces.splice(Utils.ArrayUtils.indexOf(aces, ace, Pointer_1.Pointer.areEqual), 1);
            var newACE = configACE.call(this, ace.granting, subject, ace.subjectsClass, ace.permissions, aces);
            subjectACEs.push(newACE);
            continue;
        }
        if (ace.subjects.length > 1) {
            ace.subjects.splice(Utils.ArrayUtils.indexOf(ace.subjects, subject, Pointer_1.Pointer.areEqual), 1);
            var newACE = configACE.call(this, ace.granting, subject, ace.subjectsClass, ace.permissions, aces);
            subjectACEs.push(newACE);
            continue;
        }
        for (var _a = 0, permissions_1 = permissions; _a < permissions_1.length; _a++) {
            var permission = permissions_1[_a];
            var index = Utils.ArrayUtils.indexOf(ace.permissions, permission, Pointer_1.Pointer.areEqual);
            if (index === -1)
                continue;
            ace.permissions.splice(index, 1);
        }
        if (ace.permissions.length === 0) {
            aces.splice(Utils.ArrayUtils.indexOf(aces, ace, Pointer_1.Pointer.areEqual), 1);
            acl._removeFragment(ace);
        }
    }
}
function removePermissions(subject, permissions, aces) {
    var subjectPointer = this._parsePointer(subject);
    var permissionPointers = parsePointers.call(this, permissions);
    removePermissionsFrom.call(this, subjectPointer, permissionPointers, aces);
}
function remove(subject, permissions) {
    var acl = this;
    removePermissions.call(this, subject, permissions, acl.entries);
}
function removeChildInheritance(subject, permissions) {
    var acl = this;
    removePermissions.call(this, subject, permissions, acl.inheritableEntries);
}


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = __webpack_require__(18);
var Utils_1 = __webpack_require__(0);
var Vocabularies_1 = __webpack_require__(1);
var UsernameAndPasswordCredentials_1 = __webpack_require__(172);
exports.TransientUser = {
    TYPE: Vocabularies_1.CS.User,
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && Utils_1.hasFunction(object, "updateCredentials");
    },
    is: function (value) {
        return Document_1.TransientDocument.is(value)
            && exports.TransientUser.isDecorated(value);
    },
    decorate: function (object) {
        if (exports.TransientUser.isDecorated(object))
            return object;
        Document_1.TransientDocument.decorate(object);
        return Object.defineProperties(object, {
            "updateCredentials": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: updateCredentials,
            },
        });
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientUser.createFrom(copy);
    },
    createFrom: function (object) {
        var user = exports.TransientUser.decorate(object);
        user._normalize();
        user.addType(exports.TransientUser.TYPE);
        return user;
    },
};
function updateCredentials(username, password) {
    var credentials = UsernameAndPasswordCredentials_1.UsernameAndPasswordCredentials
        .createFrom({ username: username, password: password });
    this.credentials = this.createFragment(credentials);
    return this.credentials;
}


/***/ }),
/* 172 */
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
var LDP_1 = __webpack_require__(20);
var CS_1 = __webpack_require__(65);
var XSD_1 = __webpack_require__(14);
var SCHEMA = {
    "username": {
        "@id": CS_1.CS.username,
        "@type": XSD_1.XSD.string,
    },
    "password": {
        "@id": CS_1.CS.password,
        "@type": XSD_1.XSD.string,
    },
};
exports.UsernameAndPasswordCredentials = {
    TYPE: CS_1.CS.UsernameAndPasswordCredentials,
    SCHEMA: SCHEMA,
    create: function (data) {
        return exports.UsernameAndPasswordCredentials.createFrom(__assign({}, data));
    },
    createFrom: function (object) {
        var credentials = LDP_1.VolatileResource.createFrom(object);
        credentials.addType(exports.UsernameAndPasswordCredentials.TYPE);
        return credentials;
    },
};


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AuthMethod;
(function (AuthMethod) {
    AuthMethod["BASIC"] = "BASIC";
    AuthMethod["TOKEN"] = "TOKEN";
})(AuthMethod = exports.AuthMethod || (exports.AuthMethod = {}));


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BasicCredentials = (function () {
    function BasicCredentials(username, password) {
        this._username = username;
        this._password = password;
    }
    Object.defineProperty(BasicCredentials.prototype, "username", {
        get: function () { return this._username; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasicCredentials.prototype, "password", {
        get: function () { return this._password; },
        enumerable: true,
        configurable: true
    });
    return BasicCredentials;
}());
exports.BasicCredentials = BasicCredentials;


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BasicToken = (function () {
    function BasicToken(username, password) {
        this._username = username;
        this._password = password;
    }
    Object.defineProperty(BasicToken.prototype, "username", {
        get: function () { return this._username; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasicToken.prototype, "password", {
        get: function () { return this._password; },
        enumerable: true,
        configurable: true
    });
    return BasicToken;
}());
exports.BasicToken = BasicToken;


/***/ }),
/* 176 */
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
var Errors_1 = __webpack_require__(3);
var HTTP_1 = __webpack_require__(26);
var Errors_2 = __webpack_require__(30);
var LDP_1 = __webpack_require__(20);
var RDF_1 = __webpack_require__(10);
var Utils_1 = __webpack_require__(0);
var Vocabularies_1 = __webpack_require__(1);
var AbstractAuthenticator_1 = __webpack_require__(82);
var BasicAuthenticator_1 = __webpack_require__(84);
var TokenCredentials_1 = __webpack_require__(85);
var TokenAuthenticator = (function (_super) {
    __extends(TokenAuthenticator, _super);
    function TokenAuthenticator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TokenAuthenticator.prototype.isAuthenticated = function () {
        return _super.prototype.isAuthenticated.call(this) && this._credentials.expires > new Date();
    };
    TokenAuthenticator.prototype.authenticate = function (tokenOrCredentials) {
        if (TokenCredentials_1.TokenCredentialsBase.is(tokenOrCredentials))
            return this._parseCredentialsBase(tokenOrCredentials);
        return this._getCredentials(tokenOrCredentials);
    };
    TokenAuthenticator.prototype._getHeaderValue = function () {
        return "Bearer " + this._credentials.token;
    };
    TokenAuthenticator.prototype._parseCredentialsBase = function (credentialsBase) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var credentials = TokenCredentials_1.TokenCredentials.createFrom(credentialsBase);
            if (credentials.expires <= new Date())
                throw new Errors_1.IllegalArgumentError("The token has already expired.");
            return _this._credentials = credentials;
        });
    };
    TokenAuthenticator.prototype._getCredentials = function (token) {
        var _this = this;
        var basicAuthenticator = new BasicAuthenticator_1.BasicAuthenticator(this.context);
        return basicAuthenticator
            .authenticate(token)
            .then(function () {
            var requestOptions = {};
            basicAuthenticator.addAuthentication(requestOptions);
            HTTP_1.RequestUtils.setRetrievalPreferences({ include: [Vocabularies_1.CS.PreferAuthToken] }, requestOptions);
            return _this.getAuthenticatedUser(requestOptions);
        })
            .then(function () {
            return _this._credentials;
        });
    };
    TokenAuthenticator.prototype._parseRDFMetadata = function (rdfData, response, requestOptions) {
        var accessor = _super.prototype._parseRDFMetadata.call(this, rdfData, response);
        var authTokenPrefer = "include=\"" + Vocabularies_1.CS.PreferAuthToken + "\"";
        var prefer = requestOptions.headers && requestOptions.headers.get("prefer");
        if (!prefer || !prefer.hasValue(authTokenPrefer))
            return accessor;
        var preference = response.getHeader("preference-applied");
        if (!preference || !preference.hasValue(authTokenPrefer))
            throw new Errors_2.BadResponseError("Preference \"" + authTokenPrefer + "\" was not applied.", response);
        this._parseRDFCredentials(rdfData, response);
        return accessor;
    };
    TokenAuthenticator.prototype._parseRDFCredentials = function (rdfData, response) {
        var freeNodes = RDF_1.RDFNode.getFreeNodes(rdfData);
        var freeResources = this.context.registry
            ._parseFreeNodes(freeNodes);
        var responseMetadata = freeResources.getPointers()
            .find(LDP_1.ResponseMetadata.is);
        if (!responseMetadata)
            throw new Errors_2.BadResponseError("No \"" + LDP_1.ResponseMetadata.TYPE + "\" was returned.", response);
        var tokenCredentials = responseMetadata.authToken;
        if (!tokenCredentials)
            throw new Errors_2.BadResponseError("No \"" + TokenCredentials_1.TokenCredentials.TYPE + "\" was returned.", response);
        return this._credentials = tokenCredentials;
    };
    return TokenAuthenticator;
}(AbstractAuthenticator_1.AbstractAuthenticator));
exports.TokenAuthenticator = TokenAuthenticator;


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ProtectedDocument_1 = __webpack_require__(34);
exports.UsersEndpoint = {
    is: function (value) {
        return ProtectedDocument_1.ProtectedDocument.is(value);
    },
    decorate: function (object) {
        ProtectedDocument_1.ProtectedDocument.decorate(object);
        return object;
    },
};


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(332));
__export(__webpack_require__(333));


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(334));
__export(__webpack_require__(335));


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var CarbonLDP_1 = __webpack_require__(181);
module.exports = CarbonLDP_1.CarbonLDP;


/***/ }),
/* 181 */
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
var iri_1 = __webpack_require__(32);
var AbstractContext_1 = __webpack_require__(93);
var AccessPoint_1 = __webpack_require__(110);
var Auth = __importStar(__webpack_require__(167));
var BlankNode_1 = __webpack_require__(112);
var Document_1 = __webpack_require__(18);
var Errors = __importStar(__webpack_require__(3));
var Fragment_1 = __webpack_require__(22);
var FreeResources_1 = __webpack_require__(69);
var HTTP = __importStar(__webpack_require__(26));
var JSONLD = __importStar(__webpack_require__(23));
var LDP = __importStar(__webpack_require__(20));
var LDPatch = __importStar(__webpack_require__(124));
var Messaging = __importStar(__webpack_require__(74));
var NamedFragment_1 = __webpack_require__(130);
var ObjectSchema_1 = __webpack_require__(12);
var Pointer_1 = __webpack_require__(17);
var ProtectedDocument_1 = __webpack_require__(34);
var RDF = __importStar(__webpack_require__(10));
var Registry_1 = __webpack_require__(42);
var Resource_1 = __webpack_require__(7);
var GlobalContext_1 = __webpack_require__(331);
var SHACL = __importStar(__webpack_require__(178));
var SPARQL = __importStar(__webpack_require__(151));
var System = __importStar(__webpack_require__(179));
var Utils = __importStar(__webpack_require__(0));
var Vocabularies = __importStar(__webpack_require__(1));
var CarbonLDP = (function (_super) {
    __extends(CarbonLDP, _super);
    function CarbonLDP(urlOrSettings) {
        var _this = _super.call(this, GlobalContext_1.GlobalContext.instance) || this;
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
        if (Utils.isString(urlOrSettings)) {
            if (!RDF.URI.hasProtocol(urlOrSettings))
                throw new Errors.IllegalArgumentError("The URL must contain a valid protocol: \"http://\", \"https://\".");
            _this._baseURI = urlOrSettings;
        }
        else {
            if (!Utils.isString(urlOrSettings.host))
                throw new Errors.IllegalArgumentError("The settings object must contains a valid host string.");
            if (iri_1.hasProtocol(urlOrSettings.host))
                throw new Errors.IllegalArgumentError("The host must not contain a protocol.");
            if (urlOrSettings.host.includes(":"))
                throw new Errors.IllegalArgumentError("The host must not contain a port.");
            _this._baseURI = "" + (urlOrSettings.ssl === false ? "http://" : "https://") + urlOrSettings.host;
            if (Utils.isNumber(urlOrSettings.port)) {
                if (_this._baseURI.endsWith("/"))
                    _this._baseURI = _this._baseURI.slice(0, -1);
                _this._baseURI += ":" + urlOrSettings.port;
            }
            urlOrSettings.ssl = urlOrSettings.host = urlOrSettings.port = null;
            var paths = mergePaths(_this._settings.paths, urlOrSettings.paths);
            _this._settings = Utils.ObjectUtils.extend(_this._settings, urlOrSettings);
            _this._settings.paths = paths;
        }
        if (!_this._baseURI.endsWith("/"))
            _this._baseURI = _this._baseURI + "/";
        _this.registry = new Registry_1.DocumentsRegistry(_this);
        _this.messaging = new Messaging.MessagingService(_this);
        _this.auth = new Auth.AuthService(_this);
        _this.documents = ProtectedDocument_1.ProtectedDocument
            .decorate(_this.registry.getPointer(_this._baseURI, true));
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
    CarbonLDP.Auth = Auth;
    CarbonLDP.BlankNode = BlankNode_1.BlankNode;
    CarbonLDP.Errors = Errors;
    CarbonLDP.FreeResources = FreeResources_1.FreeResources;
    CarbonLDP.HTTP = HTTP;
    CarbonLDP.JSONLD = JSONLD;
    CarbonLDP.LDP = LDP;
    CarbonLDP.LDPatch = LDPatch;
    CarbonLDP.Messaging = Messaging;
    CarbonLDP.Vocabularies = Vocabularies;
    CarbonLDP.ObjectSchemaUtils = ObjectSchema_1.ObjectSchemaUtils;
    CarbonLDP.ObjectSchemaDigester = ObjectSchema_1.ObjectSchemaDigester;
    CarbonLDP.DigestedObjectSchemaProperty = ObjectSchema_1.DigestedObjectSchemaProperty;
    CarbonLDP.PointerType = ObjectSchema_1.PointerType;
    CarbonLDP.ContainerType = ObjectSchema_1.ContainerType;
    CarbonLDP.DigestedObjectSchema = ObjectSchema_1.DigestedObjectSchema;
    CarbonLDP.Document = Document_1.Document;
    CarbonLDP.Fragment = Fragment_1.Fragment;
    CarbonLDP.NamedFragment = NamedFragment_1.NamedFragment;
    CarbonLDP.ProtectedDocument = ProtectedDocument_1.ProtectedDocument;
    CarbonLDP.PersistedResource = Resource_1.PersistedResource;
    CarbonLDP.Pointer = Pointer_1.Pointer;
    CarbonLDP.RDF = RDF;
    CarbonLDP.TransientResource = Resource_1.TransientResource;
    CarbonLDP.GlobalContext = GlobalContext_1.GlobalContext;
    CarbonLDP.SHACL = SHACL;
    CarbonLDP.SPARQL = SPARQL;
    CarbonLDP.System = System;
    CarbonLDP.Utils = Utils;
    return CarbonLDP;
}(AbstractContext_1.AbstractContext));
exports.CarbonLDP = CarbonLDP;
function mergePaths(target, source) {
    if (!source)
        return target;
    if (!target)
        return Utils.ObjectUtils.clone(source, { objects: true });
    for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
        var key = _a[_i];
        var sourcePath = source[key];
        if (sourcePath === null) {
            delete target[key];
            continue;
        }
        var targetPath = target[key];
        if (!targetPath) {
            target[key] = Utils.isObject(sourcePath) ?
                Utils.ObjectUtils.clone(sourcePath, { objects: true }) :
                sourcePath;
            continue;
        }
        if (Utils.isString(sourcePath)) {
            if (Utils.isObject(targetPath)) {
                targetPath.slug = sourcePath;
            }
            else {
                target[key] = sourcePath;
            }
            continue;
        }
        if (sourcePath.slug === void 0 && sourcePath.paths === void 0)
            continue;
        var targetDocPaths = Utils.isString(targetPath) ?
            target[key] = { slug: targetPath } : targetPath;
        if (sourcePath.slug !== void 0)
            targetDocPaths.slug = sourcePath.slug;
        if (sourcePath.paths !== void 0)
            targetDocPaths.paths = mergePaths(targetDocPaths.paths, sourcePath.paths);
    }
    return target;
}


/***/ }),
/* 182 */
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
var Identifier_1 = __webpack_require__(38);
var Operator_1 = __webpack_require__(49);
var RightSymbol_1 = __webpack_require__(61);
var Token_1 = __webpack_require__(25);
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
/* 183 */
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
/* 184 */
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
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = __webpack_require__(32);
var BooleanToken_1 = __webpack_require__(91);
var IRIToken_1 = __webpack_require__(87);
var LanguageToken_1 = __webpack_require__(90);
var NumberToken_1 = __webpack_require__(89);
var PrefixedNameToken_1 = __webpack_require__(88);
var StringToken_1 = __webpack_require__(92);
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
/* 186 */
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
/* 187 */
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
/* 188 */
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
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(39);
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
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(39);
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
/* 191 */
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
/* 192 */
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
/* 193 */
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
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(39);
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
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(39);
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
/* 196 */
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
/* 197 */
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
/* 198 */
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
/* 199 */
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
/* 200 */
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
/* 201 */
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
var AbstractError_1 = __webpack_require__(28);
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
var AbstractError_1 = __webpack_require__(28);
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
var AbstractError_1 = __webpack_require__(28);
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
var AbstractError_1 = __webpack_require__(28);
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
/* 206 */
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
var Errors_1 = __webpack_require__(3);
var ObjectSchemaUtils_1 = __webpack_require__(97);
var RDF_1 = __webpack_require__(10);
var Utils = __importStar(__webpack_require__(0));
var Vocabularies_1 = __webpack_require__(1);
var ContainerType_1 = __webpack_require__(94);
var DigestedObjectSchema_1 = __webpack_require__(95);
var DigestedObjectSchemaProperty_1 = __webpack_require__(96);
var PointerType_1 = __webpack_require__(109);
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
            if (RDF_1.URI.isPrefixed(name))
                throw new Errors_1.IllegalArgumentError("A prefixed property cannot have assigned another URI.");
            if (!Utils.isString(uri))
                throw new Errors_1.IllegalArgumentError("@id needs to point to a string");
            digestedDefinition.uri = uri;
        }
        else {
            digestedDefinition.uri = name;
        }
        if ("@type" in definition) {
            var type = definition["@type"];
            if (!Utils.isString(type))
                throw new Errors_1.IllegalArgumentError("@type needs to point to a string");
            if (type === "@id" || type === "@vocab") {
                digestedDefinition.literal = false;
                digestedDefinition.pointerType = type === "@id" ? PointerType_1.PointerType.ID : PointerType_1.PointerType.VOCAB;
            }
            else {
                if (RDF_1.URI.isRelative(type) && type in Vocabularies_1.XSD)
                    type = Vocabularies_1.XSD[type];
                digestedDefinition.literal = true;
                digestedDefinition.literalType = type;
            }
        }
        if ("@language" in definition) {
            var language = definition["@language"];
            if (language !== null && !Utils.isString(language))
                throw new Errors_1.IllegalArgumentError("@language needs to point to a string or null.");
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
                        throw new Errors_1.IllegalArgumentError("@container cannot be set to @language when the property definition already contains an @language tag.");
                    digestedDefinition.containerType = ContainerType_1.ContainerType.LANGUAGE;
                    break;
                default:
                    throw new Errors_1.IllegalArgumentError("@container needs to be equal to '@list', '@set', or '@language'");
            }
        }
        return digestedSchema ?
            ObjectSchemaUtils_1.ObjectSchemaUtils.resolveProperty(digestedSchema, digestedDefinition, true) :
            digestedDefinition;
    };
    ObjectSchemaDigester.combineDigestedObjectSchemas = function (digestedSchemas) {
        if (digestedSchemas.length === 0)
            throw new Errors_1.IllegalArgumentError("At least one DigestedObjectSchema needs to be specified.");
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
                throw new Errors_1.IllegalArgumentError("The value of '" + propertyName + "' must be a string or null.");
            if ((propertyName === "@vocab" && value === "") || !RDF_1.URI.isAbsolute(value) && !RDF_1.URI.isBNodeID(value))
                throw new Errors_1.IllegalArgumentError("The value of '" + propertyName + "' must be an absolute URI" + (propertyName === "@base" ? " or an empty string" : "") + ".");
            digestedSchema[propertyName.substr(1)] = value;
        }
        digestedSchema.base = digestedSchema.base || "";
        if ("@language" in schema) {
            var value = schema["@language"];
            if (value !== null && !Utils.isString(value))
                throw new Errors_1.InvalidJSONLDSyntaxError("The value of '@language' must be a string or null.");
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
                if (RDF_1.URI.isPrefixed(propertyName))
                    throw new Errors_1.IllegalArgumentError("A prefixed property cannot be equal to another URI.");
                digestedSchema.prefixes.set(propertyName, propertyValue);
            }
            else if (!!propertyValue && Utils.isObject(propertyValue)) {
                var definition = ObjectSchemaDigester.digestProperty(propertyName, propertyValue);
                digestedSchema.properties.set(propertyName, definition);
            }
            else {
                throw new Errors_1.IllegalArgumentError("ObjectSchema Properties can only have string values or object values.");
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
/* 207 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 208 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 209 */
/***/ (function(module, exports) {

/* (ignored) */

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
var HTTPError_1 = __webpack_require__(5);
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
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(212);
var core_1 = __webpack_require__(15);
var Utils_1 = __webpack_require__(0);
var TransientResource_1 = __webpack_require__(103);
function internalRevert(target, source) {
    if (!Utils_1.isObject(target) || !Utils_1.isObject(source))
        return;
    new Set(Object.keys(target).concat(Object.keys(source))).forEach(function (key) {
        var sourceValue = Array.isArray(source[key]) ? source[key].slice() : source[key];
        if (sourceValue === null || sourceValue === void 0) {
            delete target[key];
            return;
        }
        if (util_1.isFunction(sourceValue))
            return;
        target[key] = sourceValue;
    });
}
var PROTOTYPE = {
    get _snapshot() { return {}; },
    _partialMetadata: void 0,
    _syncSnapshot: function () {
        var clone = Utils_1.ObjectUtils.clone(this, { arrays: true });
        clone.types = this.types.slice();
        this._snapshot = clone;
    },
    isDirty: function () {
        return !Utils_1.ObjectUtils
            .areEqual(this, this._snapshot, { arrays: true });
    },
    revert: function () {
        internalRevert(this, this._snapshot);
        if (!this.types)
            this.types = [];
    },
    isPartial: function () {
        return !!this._partialMetadata;
    },
};
exports.PersistedResource = {
    PROTOTYPE: PROTOTYPE,
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    is: function (value) {
        return Utils_1.isObject(value)
            && exports.PersistedResource.isDecorated(value);
    },
    decorate: function (object) {
        if (exports.PersistedResource.isDecorated(object))
            return object;
        var resource = TransientResource_1.TransientResource.decorate(object);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
};


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = Object({"NODE_ENV":"prod"}).NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(213);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(214);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8), __webpack_require__(102)))

/***/ }),
/* 213 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 214 */
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
/* 215 */
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
            return object.hasOwnProperty(key);
        });
    },
    definePropertiesFrom: function (prototype, object) {
        Object
            .keys(prototype)
            .forEach(function (key) {
            var descriptor = {
                enumerable: false,
                configurable: true,
                writable: true,
            };
            var value = prototype[key];
            if (Utils_1.isFunction(value)) {
                descriptor.writable = false;
                descriptor.value = value;
            }
            else {
                descriptor.value = object[key] !== void 0 ?
                    object[key] : value;
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
/* 216 */
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
exports.Pointer = {
    isDecorated: function (object) {
        return (Utils.hasPropertyDefined(object, "_id") &&
            Utils.hasPropertyDefined(object, "id"));
    },
    is: function (value) {
        return (Utils.isObject(value) &&
            exports.Pointer.isDecorated(value));
    },
    create: function (data) {
        var clone = Object.assign({}, data);
        return exports.Pointer.createFrom(clone);
    },
    createFrom: function (object) {
        return exports.Pointer.decorate(object);
    },
    decorate: function (object) {
        if (exports.Pointer.isDecorated(object))
            return object;
        var pointer = object;
        Object.defineProperties(pointer, {
            "_registry": {
                writable: true,
                enumerable: false,
                configurable: true,
            },
            "_id": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: pointer.id || "",
            },
            "id": {
                enumerable: false,
                configurable: true,
                get: function () {
                    return this._id;
                },
                set: function (value) {
                    this._id = value;
                },
            },
        });
        return pointer;
    },
    areEqual: function (pointer1, pointer2) {
        return pointer1.id === pointer2.id;
    },
    getIDs: function (pointers) {
        return pointers
            .map(function (pointer) { return pointer.id; });
    },
    getID: function (pointerOrIRI) {
        return Utils.isString(pointerOrIRI) ? pointerOrIRI : pointerOrIRI.id;
    },
};


/***/ }),
/* 217 */
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
var HTTPError_1 = __webpack_require__(5);
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
/* 218 */
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
var HTTPError_1 = __webpack_require__(5);
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
/* 219 */
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
var HTTPError_1 = __webpack_require__(5);
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
var HTTPError_1 = __webpack_require__(5);
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
/* 221 */
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
var HTTPError_1 = __webpack_require__(5);
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
/* 222 */
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
var HTTPError_1 = __webpack_require__(5);
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
/* 223 */
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
var HTTPError_1 = __webpack_require__(5);
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
/* 224 */
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
var HTTPError_1 = __webpack_require__(5);
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
/* 225 */
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
var HTTPError_1 = __webpack_require__(5);
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
/* 226 */
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
var HTTPError_1 = __webpack_require__(5);
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
var HTTPError_1 = __webpack_require__(5);
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
/* 228 */
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
var HTTPError_1 = __webpack_require__(5);
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
/* 229 */
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
var HTTPError_1 = __webpack_require__(5);
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
var HTTPError_1 = __webpack_require__(5);
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
/* 231 */
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
var HTTPError_1 = __webpack_require__(5);
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
/* 232 */
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
var HTTPError_1 = __webpack_require__(5);
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
/* 233 */
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
var HTTPError_1 = __webpack_require__(5);
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
/* 234 */
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
var HTTPError_1 = __webpack_require__(5);
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
/* 235 */
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
var HTTPError_1 = __webpack_require__(5);
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
/* 236 */
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
var HTTPError_1 = __webpack_require__(5);
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
/* 237 */
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
var HTTPError_1 = __webpack_require__(5);
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
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(107));


/***/ }),
/* 239 */
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
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RDF = {
    namespace: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    type: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
};


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VCARD = {
    namespace: "http://www.w3.org/2001/vcard-rdf/3.0#",
    email: "http://www.w3.org/2001/vcard-rdf/3.0#email",
};


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(0);
exports.ObjectSchemaResolver = {
    is: function (value) {
        return Utils_1.isObject(value)
            && Utils_1.hasFunction(value, "getGeneralSchema")
            && Utils_1.hasFunction(value, "hasSchemaFor")
            && Utils_1.hasFunction(value, "getSchemaFor");
    },
};


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ProtectedDocument_1 = __webpack_require__(34);
var TransientAccessPoint_1 = __webpack_require__(166);
exports.AccessPoint = {
    TYPE: TransientAccessPoint_1.TransientAccessPoint.TYPE,
    is: function (value) {
        return TransientAccessPoint_1.TransientAccessPoint.is(value)
            && ProtectedDocument_1.ProtectedDocument.is(value);
    },
    create: TransientAccessPoint_1.TransientAccessPoint.create,
    createFrom: TransientAccessPoint_1.TransientAccessPoint.createFrom,
};


/***/ }),
/* 244 */
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
var Document_1 = __webpack_require__(18);
var Utils = __importStar(__webpack_require__(0));
var Vocabularies_1 = __webpack_require__(1);
var TransientProtectedDocument_1 = __webpack_require__(165);
exports.ProtectedDocument = {
    TYPE: TransientProtectedDocument_1.TransientProtectedDocument.TYPE,
    SCHEMA: {
        "accessControlList": {
            "@id": Vocabularies_1.CS.accessControlList,
            "@type": "@id",
        },
    },
    isDecorated: function (object) {
        return Utils.isObject(object)
            && Utils.hasFunction(object, "getACL");
    },
    is: function (object) {
        return exports.ProtectedDocument.isDecorated(object)
            && Document_1.Document.is(object);
    },
    decorate: function (object) {
        if (exports.ProtectedDocument.isDecorated(object))
            return object;
        Document_1.Document.decorate(object);
        var persistedProtectedDocument = object;
        Object.defineProperties(persistedProtectedDocument, {
            "getACL": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: getACL,
            },
        });
        return persistedProtectedDocument;
    },
};
function getACL(requestOptions) {
    var _this = this;
    var aclPromise = this.isResolved() ?
        Promise.resolve(this.accessControlList) :
        this.executeSELECTQuery("SELECT ?acl WHERE {<" + this.id + "> <" + Vocabularies_1.CS.accessControlList + "> ?acl}")
            .then(function (results) { return results.bindings[0].acl; });
    return aclPromise.then(function (acl) {
        return _this.get(acl.id, requestOptions);
    });
}


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = __webpack_require__(7);
var TransientFragment_1 = __webpack_require__(111);
exports.Fragment = {
    isDecorated: function (object) {
        return TransientFragment_1.TransientFragment.isDecorated(object)
            && Resource_1.PersistedResource.isDecorated(object);
    },
    is: function (value) {
        return TransientFragment_1.TransientFragment.is(value) &&
            Resource_1.PersistedResource.isDecorated(value);
    },
    decorate: function (object) {
        if (exports.Fragment.isDecorated(object))
            return object;
        TransientFragment_1.TransientFragment.decorate(object);
        Resource_1.PersistedResource.decorate(object);
        return object;
    },
    create: TransientFragment_1.TransientFragment.create,
    createFrom: TransientFragment_1.TransientFragment.createFrom,
};


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(15);
var Fragment_1 = __webpack_require__(22);
var Resource_1 = __webpack_require__(7);
var TransientBlankNode_1 = __webpack_require__(113);
exports.BlankNode = {
    is: function (value) {
        return TransientBlankNode_1.TransientBlankNode.is(value)
            && Resource_1.PersistedResource.isDecorated(value);
    },
    create: TransientBlankNode_1.TransientBlankNode.create,
    createFrom: TransientBlankNode_1.TransientBlankNode.createFrom,
    decorate: function (object) {
        return core_1.ModelDecorator
            .decorateMultiple(object, TransientBlankNode_1.TransientBlankNode, Fragment_1.Fragment);
    },
};


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = __webpack_require__(3);
var Pointer_1 = __webpack_require__(17);
var RDF_1 = __webpack_require__(10);
var Registry_1 = __webpack_require__(42);
var Resource_1 = __webpack_require__(7);
var QueryDocument_1 = __webpack_require__(43);
var _1 = __webpack_require__(43);
var JSONLDCompacter = (function () {
    function JSONLDCompacter(registry, root, schemaResolver, jsonldConverter) {
        this.registry = registry;
        this.root = root;
        this.resolver = schemaResolver || registry;
        this.converter = jsonldConverter || registry.jsonldConverter;
        this.compactionMap = new Map();
    }
    JSONLDCompacter.prototype.compactDocument = function (rdfDocument) {
        var rdfDocuments = [rdfDocument];
        return this.compactDocuments(rdfDocuments)[0];
    };
    JSONLDCompacter.prototype.compactDocuments = function (rdfDocuments, mainDocuments) {
        var _this = this;
        if (mainDocuments === void 0) { mainDocuments = rdfDocuments; }
        rdfDocuments.forEach(function (rdfDocument) {
            var _a = RDF_1.RDFDocument.getNodes(rdfDocument), documentNodes = _a[0], fragmentNodes = _a[1];
            if (documentNodes.length === 0)
                throw new Errors_1.IllegalArgumentError("The RDFDocument \"" + rdfDocument["@id"] + "\" does not contain a document resource.");
            if (documentNodes.length > 1)
                throw new Errors_1.IllegalArgumentError("The RDFDocument \"" + rdfDocument["@id"] + "\" contains multiple document resources.");
            var documentNode = documentNodes[0];
            var targetDocument = _this._getResource(documentNode, _this.registry);
            var currentFragments = targetDocument
                .getPointers(true)
                .map(function (pointer) { return pointer.id; });
            var newFragments = fragmentNodes
                .map(function (fragmentNode) { return _this._getResource(fragmentNode, targetDocument); })
                .map(function (fragment) { return fragment.id; });
            var newFragmentsSet = new Set(newFragments);
            currentFragments
                .filter(function (id) { return !newFragmentsSet.has(id); })
                .forEach(function (id) { return targetDocument.removePointer(id); });
        });
        var compactedDocuments = rdfDocuments
            .map(function (rdfDocument) { return rdfDocument["@id"]; })
            .map(this.compactionMap.get, this.compactionMap)
            .map(function (compactionNode) { return compactionNode.resource; });
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
        compactedDocuments.forEach(function (persistedDocument) {
            persistedDocument._syncSavedFragments();
            persistedDocument.types
                .map(function (type) { return _this.registry.documentDecorators.get(type); })
                .forEach(function (decorator) { return decorator && decorator.call(void 0, persistedDocument, _this.registry); });
        });
        return mainCompactedDocuments;
    };
    JSONLDCompacter.prototype._compactNode = function (node, resource, containerLibrary, path) {
        var schema = this.resolver.getSchemaFor(node, path);
        var isPartial = this._setOrRemovePartial(resource, schema, path);
        var compactedData = this.converter.compact(node, {}, schema, containerLibrary, isPartial);
        var addedProperties = [];
        new Set(Object.keys(resource).concat(Object.keys(compactedData))).forEach(function (key) {
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
            var _a;
        });
        return addedProperties
            .filter(function (x) { return schema.properties.has(x); });
    };
    JSONLDCompacter.prototype._getResource = function (node, registry) {
        var resource = registry.getPointer(node["@id"], true);
        if (Registry_1.Registry.isDecorated(resource))
            registry = resource;
        this.compactionMap
            .set(resource.id, { paths: [], node: node, resource: resource, registry: registry });
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
            if (Resource_1.PersistedResource.is(compactionNode.resource))
                compactionNode.resource._syncSnapshot();
            for (var _i = 0, addedProperties_1 = addedProperties; _i < addedProperties_1.length; _i++) {
                var propertyName = addedProperties_1[_i];
                if (!compactionNode.resource.hasOwnProperty(propertyName))
                    continue;
                var value = compactionNode.resource[propertyName];
                var values = Array.isArray(value) ? value : [value];
                var pointers = values.filter(Pointer_1.Pointer.is);
                for (var _a = 0, pointers_1 = pointers; _a < pointers_1.length; _a++) {
                    var pointer = pointers_1[_a];
                    if (!this.compactionMap.has(pointer.id))
                        continue;
                    var subCompactionNode = this.compactionMap.get(pointer.id);
                    if (targetPath) {
                        var subPath = targetPath + "." + propertyName;
                        if (!this.resolver.hasSchemaFor(subCompactionNode.node, subPath))
                            continue;
                        subCompactionNode.paths.push(subPath);
                        compactionQueue.push(pointer.id);
                    }
                }
            }
        }
    };
    JSONLDCompacter.prototype._setOrRemovePartial = function (resource, schema, path) {
        var persisted = Resource_1.PersistedResource.decorate(resource);
        if (this._willBePartial(persisted, schema, path))
            return true;
        if (persisted._partialMetadata)
            delete persisted._partialMetadata;
        return false;
    };
    JSONLDCompacter.prototype._willBePartial = function (resource, schema, path) {
        if (this.resolver instanceof _1.QueryContextPartial)
            return true;
        if (!(this.resolver instanceof QueryDocument_1.QueryContextBuilder))
            return false;
        var type = this.resolver.hasProperty(path) ?
            this.resolver.getProperty(path).getType() : void 0;
        if (type !== QueryDocument_1.QueryPropertyType.PARTIAL && type !== QueryDocument_1.QueryPropertyType.ALL)
            return false;
        resource._partialMetadata = new QueryDocument_1.PartialMetadata(type === QueryDocument_1.QueryPropertyType.ALL ? QueryDocument_1.PartialMetadata.ALL : schema, resource._partialMetadata);
        return true;
    };
    return JSONLDCompacter;
}());
exports.JSONLDCompacter = JSONLDCompacter;


/***/ }),
/* 248 */
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
var Document_1 = __webpack_require__(18);
var Errors_1 = __webpack_require__(3);
var HTTP_1 = __webpack_require__(26);
var JSONLD_1 = __webpack_require__(23);
var LDP_1 = __webpack_require__(20);
var RDF_1 = __webpack_require__(10);
var Registry_1 = __webpack_require__(68);
var RegistryService_1 = __webpack_require__(114);
var DocumentsRegistry = (function (_super) {
    __extends(DocumentsRegistry, _super);
    function DocumentsRegistry(context) {
        return _super.call(this, Document_1.Document, context) || this;
    }
    DocumentsRegistry.prototype.register = function (id) {
        return this._register({ id: id });
    };
    DocumentsRegistry.prototype._register = function (base) {
        var document = _super.prototype._register.call(this, base);
        document._context = this._context;
        return document;
    };
    DocumentsRegistry.prototype._getLocalID = function (id) {
        if (RDF_1.URI.isBNodeID(id) || RDF_1.URI.hasFragment(id))
            return Registry_1.Registry.PROTOTYPE._getLocalID.call(this, id);
        return _super.prototype._getLocalID.call(this, id);
    };
    DocumentsRegistry.prototype._parseErrorFromResponse = function (response) {
        var _this = this;
        if (!(response instanceof HTTP_1.Response))
            return _super.prototype._parseErrorFromResponse.call(this, response);
        return _super.prototype._parseErrorFromResponse.call(this, response)
            .catch(function (error) { return _this._addErrorResponseData(response, error); });
    };
    DocumentsRegistry.prototype._addErrorResponseData = function (response, error) {
        var _this = this;
        if (!response.data)
            return Promise.reject(error);
        return new JSONLD_1.JSONLDParser()
            .parse(response.data)
            .then(function (freeNodes) {
            var freeResources = _this._parseFreeNodes(freeNodes);
            var errorResponses = freeResources
                .getPointers(true)
                .filter(LDP_1.ErrorResponse.is);
            if (errorResponses.length === 0)
                return Promise.reject(new Errors_1.IllegalArgumentError("The response string does not contains a c:ErrorResponse."));
            if (errorResponses.length > 1)
                return Promise.reject(new Errors_1.IllegalArgumentError("The response string contains multiple c:ErrorResponse."));
            var errorResponse = Object.assign(error, errorResponses[0]);
            error.message = LDP_1.ErrorResponse.getMessage(errorResponse);
            return Promise.reject(error);
        }, function () {
            return Promise.reject(error);
        });
    };
    return DocumentsRegistry;
}(RegistryService_1.RegistryService));
exports.DocumentsRegistry = DocumentsRegistry;


/***/ }),
/* 249 */
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
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(11);
var XSD_1 = __webpack_require__(14);
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
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = __webpack_require__(7);
var C_1 = __webpack_require__(11);
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
        return Resource_1.TransientResource.is(object)
            && object.hasType(exports.Map.TYPE)
            && object.hasOwnProperty("entries");
    },
};


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(11);
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
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(254));
__export(__webpack_require__(116));


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = __webpack_require__(18);
var TransientDirectContainer_1 = __webpack_require__(116);
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
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(11);
var XSD_1 = __webpack_require__(14);
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
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = __webpack_require__(7);
var C_1 = __webpack_require__(11);
var XSD_1 = __webpack_require__(14);
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
        return Resource_1.TransientResource.is(value)
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
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vocabularies_1 = __webpack_require__(1);
var VolatileResource_1 = __webpack_require__(117);
var SCHEMA = {
    "documentsMetadata": {
        "@id": Vocabularies_1.C.documentMetadata,
        "@type": "@id",
        "@container": "@set",
    },
    "authToken": {
        "@id": Vocabularies_1.CS.authToken,
        "@type": "@id",
    },
};
exports.ResponseMetadata = {
    TYPE: Vocabularies_1.C.ResponseMetadata,
    SCHEMA: SCHEMA,
    is: function (object) {
        return VolatileResource_1.VolatileResource.is(object)
            && object.hasType(exports.ResponseMetadata.TYPE);
    },
};


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vocabularies_1 = __webpack_require__(1);
var SCHEMA = {
    "errorDetails": {
        "@id": Vocabularies_1.C.errorDetails,
        "@type": "@id",
    },
};
exports.ValidationError = {
    TYPE: Vocabularies_1.C.ValidationError,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(4);
var core_1 = __webpack_require__(15);
var BasePersistedDocument_1 = __webpack_require__(67);
var CRUDDocument_1 = __webpack_require__(72);
var Errors_1 = __webpack_require__(3);
var HTTP_1 = __webpack_require__(26);
var JSONLD_1 = __webpack_require__(23);
var LDP_1 = __webpack_require__(20);
var Pointer_1 = __webpack_require__(17);
var RDF_1 = __webpack_require__(10);
var Resource_1 = __webpack_require__(7);
var Utils_1 = __webpack_require__(0);
var Vocabularies_1 = __webpack_require__(1);
var Service_1 = __webpack_require__(73);
var PartialMetadata_1 = __webpack_require__(118);
var QueryContextBuilder_1 = __webpack_require__(120);
var QueryContextPartial_1 = __webpack_require__(121);
var QueryDocumentBuilder_1 = __webpack_require__(71);
var QueryDocumentsBuilder_1 = __webpack_require__(128);
var QueryMetadata_1 = __webpack_require__(129);
var QueryProperty_1 = __webpack_require__(54);
var Utils_2 = __webpack_require__(44);
var emptyQueryBuildFn = function (_) { return _; };
function getRegistry(repository) {
    if (repository._registry)
        return repository._registry;
    throw new Errors_1.IllegalActionError("\"" + repository.id + "\" doesn't support Querying requests.");
}
function executePatterns(registry, url, requestOptions, queryContext, targetName, constructPatterns, target) {
    var metadataVar = queryContext.getVariable("metadata");
    var construct = (_a = new tokens_1.ConstructToken()
        .addTriple(new tokens_1.SubjectToken(metadataVar)
        .addPredicate(new tokens_1.PredicateToken("a")
        .addObject(queryContext.compactIRI(Vocabularies_1.C.VolatileResource))
        .addObject(queryContext.compactIRI(Vocabularies_1.C.QueryMetadata)))
        .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(Vocabularies_1.C.target))
        .addObject(queryContext.getVariable(targetName))))
        .addPattern(new tokens_1.BindToken("BNODE()", metadataVar))).addPattern.apply(_a, constructPatterns);
    var query = (_b = new tokens_1.QueryToken(construct)).addPrologues.apply(_b, queryContext.getPrologues());
    var triples = Utils_2.getAllTriples(constructPatterns);
    construct.addTriple.apply(construct, triples);
    HTTP_1.RequestUtils.setRetrievalPreferences({ include: [Vocabularies_1.C.PreferResultsContext] }, requestOptions);
    registry._context.auth.addAuthentication(requestOptions);
    return Service_1.SPARQLService
        .executeRawCONSTRUCTQuery(url, query.toString(), requestOptions)
        .then(function (_a) {
        var strConstruct = _a[0];
        return strConstruct;
    })
        .then(function (jsonldString) {
        return new JSONLD_1.JSONLDParser().parse(jsonldString);
    })
        .then(function (rdfNodes) {
        var freeNodes = RDF_1.RDFNode.getFreeNodes(rdfNodes);
        var freeResources = registry._parseFreeNodes(freeNodes);
        var targetSet = new Set(freeResources
            .getPointers()
            .filter(QueryMetadata_1.QueryMetadata.is)
            .map(function (x) { return x.target || x[Vocabularies_1.C.target]; })
            .reduce(function (targets, currentTargets) { return targets.concat(currentTargets); }, [])
            .map(function (x) { return x.id; }));
        var targetETag = target && target._eTag;
        if (target)
            target._eTag = void 0;
        freeResources
            .getPointers()
            .filter(LDP_1.ResponseMetadata.is)
            .map(function (responseMetadata) { return responseMetadata.documentsMetadata || responseMetadata[Vocabularies_1.C.documentMetadata]; })
            .map(function (documentsMetadata) { return Array.isArray(documentsMetadata) ? documentsMetadata : [documentsMetadata]; })
            .forEach(function (documentsMetadata) { return documentsMetadata.forEach(function (documentMetadata) {
            if (!documentMetadata)
                return;
            var relatedDocument = documentMetadata.relatedDocument || documentMetadata[Vocabularies_1.C.relatedDocument];
            var eTag = documentMetadata.eTag || documentMetadata[Vocabularies_1.C.eTag];
            if (!eTag)
                return;
            relatedDocument._resolved = true;
            if (relatedDocument._eTag === void 0)
                relatedDocument._eTag = eTag;
            if (relatedDocument._eTag !== eTag)
                relatedDocument._eTag = null;
        }); });
        if (targetETag && targetETag === target._eTag)
            return [target];
        var rdfDocuments = rdfNodes
            .filter(RDF_1.RDFDocument.is);
        var targetDocuments = rdfDocuments
            .filter(function (x) { return targetSet.has(x["@id"]); });
        return new JSONLD_1.JSONLDCompacter(registry, targetName, queryContext)
            .compactDocuments(rdfDocuments, targetDocuments);
    })
        .catch(registry._parseErrorFromResponse.bind(this));
    var _a, _b;
}
function executeBuilder(registry, url, requestOptions, queryContext, targetProperty, queryBuilderFn, target) {
    var Builder = targetProperty.name === "document" ?
        QueryDocumentBuilder_1.QueryDocumentBuilder : QueryDocumentsBuilder_1.QueryDocumentsBuilder;
    var queryBuilder = new Builder(queryContext, targetProperty);
    targetProperty.setType(queryBuilderFn ?
        queryBuilderFn === emptyQueryBuildFn ?
            QueryProperty_1.QueryPropertyType.EMPTY :
            QueryProperty_1.QueryPropertyType.PARTIAL :
        QueryProperty_1.QueryPropertyType.FULL);
    if (queryBuilderFn && queryBuilderFn.call(void 0, queryBuilder) !== queryBuilder)
        throw new Errors_1.IllegalArgumentError("The provided query builder was not returned");
    var constructPatterns = targetProperty.getPatterns();
    return executePatterns(registry, url, requestOptions, queryContext, targetProperty.name, constructPatterns, target)
        .then(function (documents) {
        if (!(queryBuilder instanceof QueryDocumentsBuilder_1.QueryDocumentsBuilder && queryBuilder._orderData))
            return documents;
        var _a = queryBuilder._orderData, path = _a.path, flow = _a.flow;
        var inverter = flow === "DESC" ? -1 : 1;
        return documents.sort(function (a, b) {
            a = Utils_2.getPathProperty(a, path);
            b = Utils_2.getPathProperty(b, path);
            var aValue = Pointer_1.Pointer.is(a) ? a.id : a;
            var bValue = Pointer_1.Pointer.is(b) ? b.id : b;
            if (aValue === bValue)
                return 0;
            if (aValue === void 0)
                return -1 * inverter;
            if (bValue === void 0)
                return inverter;
            if (!Utils_2.areDifferentType(a, b)) {
                if (Pointer_1.Pointer.is(a)) {
                    var aIsBNode = RDF_1.URI.isBNodeID(aValue);
                    var bIsBNode = RDF_1.URI.isBNodeID(bValue);
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
                if (Utils_1.isNumber(a))
                    return -1 * inverter;
                if (Utils_1.isNumber(b))
                    return inverter;
                if (Utils_1.isDate(a))
                    return -1 * inverter;
                if (Utils_1.isDate(b))
                    return inverter;
                if (Utils_1.isBoolean(a))
                    return -1 * inverter;
                if (Utils_1.isBoolean(b))
                    return inverter;
                if (Utils_1.isString(a))
                    return -1 * inverter;
                if (Utils_1.isString(b))
                    return inverter;
            }
            if (aValue < bValue)
                return -1 * inverter;
            if (aValue > bValue)
                return inverter;
        });
    });
}
function addRefreshPatterns(queryContext, parentAdder, resource, parentName) {
    if (resource._partialMetadata.schema === PartialMetadata_1.PartialMetadata.ALL) {
        parentAdder.addPattern(Utils_2.createAllPattern(queryContext, parentName));
        return;
    }
    parentAdder.addPattern(Utils_2.createTypesPattern(queryContext, parentName));
    resource._partialMetadata.schema.properties.forEach(function (digestedProperty, propertyName) {
        var path = parentName + "." + propertyName;
        var propertyPattern = (_a = new tokens_1.OptionalToken()).addPattern.apply(_a, Utils_2.createPropertyPatterns(queryContext, parentName, path, digestedProperty));
        parentAdder.addPattern(propertyPattern);
        var propertyValues = Array.isArray(resource[propertyName]) ? resource[propertyName] : [resource[propertyName]];
        var propertyFragment = propertyValues
            .filter(Resource_1.PersistedResource.is)
            .find(function (fragment) { return fragment.isPartial(); });
        if (!propertyFragment)
            return;
        addRefreshPatterns(queryContext, propertyPattern, propertyFragment, path);
        var _a;
    });
}
function getPartial(registry, uri, requestOptions, queryBuilderFn) {
    var queryContext = new QueryContextBuilder_1.QueryContextBuilder(registry._context);
    var documentProperty = queryContext
        .addProperty("document")
        .setOptional(false);
    var propertyValue = new tokens_1.ValuesToken().addValues(documentProperty.variable, queryContext.compactIRI(uri));
    documentProperty.addPattern(propertyValue);
    HTTP_1.RequestUtils.setRetrievalPreferences({ include: [Vocabularies_1.C.PreferDocumentETags] }, requestOptions);
    var target = registry.hasPointer(uri) ?
        registry.getPointer(uri) :
        void 0;
    return executeBuilder(registry, uri, requestOptions, queryContext, documentProperty, queryBuilderFn, target)
        .then(function (documents) { return documents[0]; });
}
function refreshPartial(registry, resource, requestOptions) {
    var url = HTTP_1.RequestUtils.getRequestURLFor(registry, resource);
    var queryContext = new QueryContextPartial_1.QueryContextPartial(resource, registry._context);
    var targetName = "document";
    var constructPatterns = new tokens_1.OptionalToken()
        .addPattern(new tokens_1.ValuesToken()
        .addValues(queryContext.getVariable(targetName), new tokens_1.IRIToken(url)));
    addRefreshPatterns(queryContext, constructPatterns, resource, targetName);
    HTTP_1.RequestUtils.setRetrievalPreferences({ include: [Vocabularies_1.C.PreferDocumentETags] }, requestOptions);
    return executePatterns(registry, url, requestOptions, queryContext, targetName, constructPatterns.patterns, resource)
        .then(function (documents) { return documents[0]; });
}
function executeChildrenBuilder(repository, uri, requestOptions, queryBuilderFn) {
    return Utils_1.promiseMethod(function () {
        var registry = getRegistry(repository);
        var url = HTTP_1.RequestUtils.getRequestURLFor(registry, repository, uri);
        var queryContext = new QueryContextBuilder_1.QueryContextBuilder(registry._context);
        var childrenProperty = queryContext
            .addProperty("child")
            .setOptional(false);
        var selectChildren = new tokens_1.SelectToken("DISTINCT")
            .addVariable(childrenProperty.variable)
            .addPattern(new tokens_1.SubjectToken(queryContext.compactIRI(url))
            .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(Vocabularies_1.LDP.contains))
            .addObject(childrenProperty.variable)));
        childrenProperty.addPattern(selectChildren);
        return executeBuilder(registry, url, requestOptions, queryContext, childrenProperty, queryBuilderFn);
    });
}
function executeMembersBuilder(repository, uri, requestOptions, queryBuilderFn) {
    return Utils_1.promiseMethod(function () {
        var registry = getRegistry(repository);
        var url = HTTP_1.RequestUtils.getRequestURLFor(registry, repository, uri);
        var queryContext = new QueryContextBuilder_1.QueryContextBuilder(registry._context);
        var membersProperty = queryContext
            .addProperty("member")
            .setOptional(false);
        var membershipResource = queryContext.getVariable("membershipResource");
        var hasMemberRelation = queryContext.getVariable("hasMemberRelation");
        var selectMembers = new tokens_1.SelectToken("DISTINCT")
            .addVariable(membersProperty.variable)
            .addPattern(new tokens_1.SubjectToken(queryContext.compactIRI(url))
            .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(Vocabularies_1.LDP.membershipResource))
            .addObject(membershipResource))
            .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(Vocabularies_1.LDP.hasMemberRelation))
            .addObject(hasMemberRelation)))
            .addPattern(new tokens_1.SubjectToken(membershipResource)
            .addPredicate(new tokens_1.PredicateToken(hasMemberRelation)
            .addObject(membersProperty.variable)));
        membersProperty.addPattern(selectMembers);
        return executeBuilder(registry, url, requestOptions, queryContext, membersProperty, queryBuilderFn);
    });
}
var PROTOTYPE = {
    get: function (uriOrOptionsOrQueryBuilderFn, optionsOrQueryBuilderFn, queryBuilderFn) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var uri = Utils_1.isString(uriOrOptionsOrQueryBuilderFn) ? uriOrOptionsOrQueryBuilderFn : void 0;
            var url = HTTP_1.RequestUtils.getRequestURLFor(registry, _this, uri);
            var requestOptions = Utils_1.isObject(uriOrOptionsOrQueryBuilderFn) ?
                uriOrOptionsOrQueryBuilderFn : Utils_1.isObject(optionsOrQueryBuilderFn) ? optionsOrQueryBuilderFn : {};
            queryBuilderFn = Utils_1.isFunction(uriOrOptionsOrQueryBuilderFn) ? uriOrOptionsOrQueryBuilderFn :
                Utils_1.isFunction(optionsOrQueryBuilderFn) ? optionsOrQueryBuilderFn : queryBuilderFn;
            return getPartial(registry, url, requestOptions, queryBuilderFn);
        });
    },
    resolve: function (optionsOrQueryBuilderFn, queryBuilderFn) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var url = HTTP_1.RequestUtils.getRequestURLFor(registry, _this);
            var requestOptions = Utils_1.isObject(optionsOrQueryBuilderFn) ? optionsOrQueryBuilderFn : {};
            if (Utils_1.isFunction(optionsOrQueryBuilderFn))
                queryBuilderFn = optionsOrQueryBuilderFn;
            return getPartial(registry, url, requestOptions, function (_) {
                if ("types" in _this)
                    _this.types.forEach(function (type) { return _.withType(type); });
                return queryBuilderFn.call(void 0, _);
            });
        });
    },
    refresh: function (requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            if (!_this.isPartial())
                throw new Errors_1.IllegalArgumentError("\"" + _this.id + "\" isn't a partial resource.");
            return refreshPartial(registry, _this, requestOptions);
        });
    },
    save: function (requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        getRegistry(this);
        if (this.isOutdated())
            return Promise.reject(new Errors_1.IllegalStateError("\"" + this.id + "\" is outdated and cannot be saved."));
        return CRUDDocument_1.CRUDDocument.PROTOTYPE.save.call(this, requestOptions);
    },
    saveAndRefresh: function (requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            if (!_this.isPartial())
                throw new Errors_1.IllegalArgumentError("\"" + _this.id + "\" isn't a valid partial resource.");
            if (!_this.isDirty())
                return refreshPartial(registry, _this, requestOptions);
            var cloneOptions = HTTP_1.RequestUtils.cloneOptions(requestOptions);
            return _this.save(cloneOptions)
                .then(function (doc) {
                return refreshPartial(registry, doc, requestOptions);
            });
        });
    },
    getChildren: function (uriOrQueryBuilderFnOrOptions, queryBuilderFnOrOptions, queryBuilderFn) {
        var iri = Utils_1.isString(uriOrQueryBuilderFnOrOptions) ? uriOrQueryBuilderFnOrOptions : void 0;
        var requestOptions = Utils_1.isObject(uriOrQueryBuilderFnOrOptions) ? uriOrQueryBuilderFnOrOptions :
            Utils_1.isObject(queryBuilderFnOrOptions) ? queryBuilderFnOrOptions : {};
        queryBuilderFn = Utils_1.isFunction(uriOrQueryBuilderFnOrOptions) ? uriOrQueryBuilderFnOrOptions :
            Utils_1.isFunction(queryBuilderFnOrOptions) ? queryBuilderFnOrOptions : queryBuilderFn;
        HTTP_1.RequestUtils.setRetrievalPreferences({ include: [Vocabularies_1.C.PreferDocumentETags] }, requestOptions);
        return executeChildrenBuilder(this, iri, requestOptions, queryBuilderFn);
    },
    getMembers: function (uriOrQueryBuilderFnOrOptions, queryBuilderFnOrOptions, queryBuilderFn) {
        var iri = Utils_1.isString(uriOrQueryBuilderFnOrOptions) ? uriOrQueryBuilderFnOrOptions : void 0;
        var requestOptions = Utils_1.isObject(uriOrQueryBuilderFnOrOptions) ? uriOrQueryBuilderFnOrOptions :
            Utils_1.isObject(queryBuilderFnOrOptions) ? queryBuilderFnOrOptions : {};
        queryBuilderFn = Utils_1.isFunction(uriOrQueryBuilderFnOrOptions) ? uriOrQueryBuilderFnOrOptions :
            Utils_1.isFunction(queryBuilderFnOrOptions) ? queryBuilderFnOrOptions : queryBuilderFn;
        HTTP_1.RequestUtils.setRetrievalPreferences({ include: [Vocabularies_1.C.PreferDocumentETags] }, requestOptions);
        return executeMembersBuilder(this, iri, requestOptions, queryBuilderFn);
    },
    listChildren: function (uriOrOptions, requestOptions) {
        var uri = Utils_1.isString(uriOrOptions) ? uriOrOptions : void 0;
        requestOptions = Utils_1.isObject(uriOrOptions) ? uriOrOptions :
            requestOptions ? requestOptions : {};
        return executeChildrenBuilder(this, uri, requestOptions, emptyQueryBuildFn);
    },
    listMembers: function (uriOrOptions, requestOptions) {
        var uri = Utils_1.isString(uriOrOptions) ? uriOrOptions : void 0;
        requestOptions = Utils_1.isObject(uriOrOptions) ? uriOrOptions :
            requestOptions ? requestOptions : {};
        return executeMembersBuilder(this, uri, requestOptions, emptyQueryBuildFn);
    },
};
exports.QueryDocumentDocument = {
    PROTOTYPE: PROTOTYPE,
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.QueryDocumentDocument.isDecorated(object))
            return object;
        var resource = core_1.ModelDecorator
            .decorateMultiple(object, BasePersistedDocument_1.BasePersistedDocument);
        return core_1.ModelDecorator.definePropertiesFrom(PROTOTYPE, resource);
    },
};


/***/ }),
/* 260 */
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
var iri_1 = __webpack_require__(32);
var tokens_1 = __webpack_require__(4);
var Utils_1 = __webpack_require__(125);
var ObjectSchema_1 = __webpack_require__(12);
var Pointer_1 = __webpack_require__(17);
var Utils_2 = __webpack_require__(0);
var Vocabularies_1 = __webpack_require__(1);
var Tokens_1 = __webpack_require__(126);
var typesDefinition = new ObjectSchema_1.DigestedObjectSchemaProperty();
typesDefinition.literal = false;
typesDefinition.pointerType = ObjectSchema_1.PointerType.ID;
typesDefinition.containerType = ObjectSchema_1.ContainerType.SET;
var DeltaCreator = (function () {
    function DeltaCreator(jsonldConverter) {
        this.prefixesMap = new Map();
        this.jsonldConverter = jsonldConverter;
        this.addToken = new Tokens_1.AddToken();
        this.deleteToken = new Tokens_1.DeleteToken();
        this.updateLists = [];
    }
    DeltaCreator.prototype.getPatch = function () {
        var patch = new Tokens_1.LDPatchToken();
        this.prefixesMap.forEach(function (prefix) { return patch.prologues.push(prefix); });
        (_a = patch.statements).push.apply(_a, this.updateLists);
        if (this.addToken.triples.length)
            patch.statements.push(this.addToken);
        if (this.deleteToken.triples.length)
            patch.statements.push(this.deleteToken);
        return "" + patch;
        var _a;
    };
    DeltaCreator.prototype.addResource = function (schema, id, previousResource, currentResource) {
        var _this = this;
        var resource = iri_1.isBNodeLabel(id) ?
            new tokens_1.BlankNodeToken(id) : this._compactIRI(schema, id);
        var updateLists = [];
        var addTriples = new tokens_1.SubjectToken(resource);
        var deleteTriples = new tokens_1.SubjectToken(resource);
        new Set([
            "types"
        ].concat(Object.keys(previousResource), Object.keys(currentResource))).forEach(function (propertyName) {
            if (propertyName === "id")
                return;
            var predicateURI = propertyName === "types" ?
                "a" : _this._getPropertyIRI(schema, propertyName);
            var definition = predicateURI === "a" ?
                typesDefinition : schema.properties.get(propertyName);
            var oldValue = previousResource[propertyName];
            var newValue = currentResource[propertyName];
            if (definition && definition.containerType === ObjectSchema_1.ContainerType.LIST && isValidValue(oldValue)) {
                var listUpdates = [];
                if (!isValidValue(newValue)) {
                    deleteTriples.addPredicate(new tokens_1.PredicateToken(predicateURI).addObject(new tokens_1.CollectionToken()));
                    listUpdates.push({ slice: [0, void 0], objects: [] });
                }
                else {
                    var tempDefinition = __assign({}, definition, { containerType: ObjectSchema_1.ContainerType.SET });
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
        var _a;
    };
    DeltaCreator.prototype._getPropertyIRI = function (schema, propertyName) {
        var propertyDefinition = schema.properties.get(propertyName);
        var uri = propertyDefinition && propertyDefinition.uri ?
            propertyDefinition.uri :
            propertyName;
        return this._compactIRI(schema, uri);
    };
    DeltaCreator.prototype._getObjects = function (value, schema, definition) {
        var values = (Array.isArray(value) ?
            !definition || definition.containerType !== null ? value : value.slice(0, 1) :
            [value]).filter(isValidValue);
        if (definition && definition.containerType === ObjectSchema_1.ContainerType.LIST) {
            if (!isValidValue(value))
                return [];
            var collection = new tokens_1.CollectionToken();
            (_a = collection.objects).push.apply(_a, this._expandValues(values, schema, definition));
            return [collection];
        }
        if (definition && definition.containerType === ObjectSchema_1.ContainerType.LANGUAGE) {
            return this._expandLanguageMap(values, schema);
        }
        return this._expandValues(values, schema, definition);
        var _a;
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
            var tempDefinition = new ObjectSchema_1.DigestedObjectSchemaProperty();
            tempDefinition.language = key;
            tempDefinition.literalType = Vocabularies_1.XSD.string;
            return _this._expandLiteral(value, schema, tempDefinition);
        }).filter(isValidValue);
    };
    DeltaCreator.prototype._expandPointer = function (value, schema) {
        var id = Pointer_1.Pointer.is(value) ? value.id : value;
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
        if (!this.jsonldConverter.literalSerializers.has(type))
            return null;
        value = this.jsonldConverter.literalSerializers.get(type).serialize(value);
        var literal = new tokens_1.LiteralToken(value);
        if (type !== Vocabularies_1.XSD.string)
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
/* 261 */
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
var IllegalArgumentError_1 = __webpack_require__(29);
var Pointer_1 = __webpack_require__(17);
var List_1 = __webpack_require__(40);
var XSDSerializers = __importStar(__webpack_require__(107));
var Node_1 = __webpack_require__(51);
var URI_1 = __webpack_require__(41);
var XSD_1 = __webpack_require__(14);
var ObjectSchema = __importStar(__webpack_require__(12));
var Utils = __importStar(__webpack_require__(0));
var Utils_1 = __webpack_require__(125);
var JSONLDConverter = (function () {
    function JSONLDConverter(literalSerializers) {
        this._literalSerializers = literalSerializers ?
            Utils.MapUtils.extend(new Map(), literalSerializers) :
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
        if (!Utils.isArray(expandedObjectOrObjects))
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
        if (!Utils.isArray(compactedObjectOrObjects))
            return this.expandSingle(compactedObjectOrObjects, generalSchema, digestedSchema);
    };
    JSONLDConverter.prototype.expandSingle = function (compactedObject, generalSchema, digestedSchema) {
        var _this = this;
        var expandedObject = {};
        expandedObject["@id"] = !!compactedObject["id"] ? compactedObject["id"] : "";
        if (compactedObject["types"]) {
            var types = Array.isArray(compactedObject["types"]) ?
                compactedObject["types"] : [compactedObject["types"]];
            if (types.length)
                expandedObject["@type"] = types
                    .map(function (type) { return ObjectSchema.ObjectSchemaUtils.resolveURI(type, generalSchema, { vocab: true, base: true }); });
        }
        Utils.forEachOwnProperty(compactedObject, function (propertyName, value) {
            if (propertyName === "id")
                return;
            if (propertyName === "types")
                return;
            var expandedPropertyName = ObjectSchema.ObjectSchemaUtils.resolveURI(propertyName, digestedSchema, { vocab: true });
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
        if (propertyContainer === ObjectSchema.ContainerType.LANGUAGE)
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
        if (propertyContainer === ObjectSchema.ContainerType.LIST)
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
        var literalType = ObjectSchema.ObjectSchemaUtils.resolveURI(definition.literalType, digestedSchema, { vocab: true, base: true });
        var expandedValues = propertyValue.map(function (value) { return _this.expandLiteralValue(value, literalType); });
        if (definition.language)
            expandedValues.forEach(function (value) { return value["@language"] = definition.language; });
        return expandedValues;
    };
    JSONLDConverter.prototype.expandPropertyLanguageMap = function (propertyValue) {
        var _this = this;
        if (!Utils.isObject(propertyValue)) {
            return null;
        }
        var mapValues = [];
        Utils.forEachOwnProperty(propertyValue, function (languageTag, value) {
            var serializedValue = _this.literalSerializers.get(XSD_1.XSD.string).serialize(value);
            mapValues.push({ "@value": serializedValue, "@type": XSD_1.XSD.string, "@language": languageTag });
        });
        return mapValues;
    };
    JSONLDConverter.prototype.expandPointerValue = function (propertyValue, digestedSchema, generalSchema) {
        var isString = Utils.isString(propertyValue);
        var id = Pointer_1.Pointer.is(propertyValue) ?
            propertyValue.id :
            isString ?
                propertyValue :
                null;
        if (!id)
            return null;
        var resolved = ObjectSchema.ObjectSchemaUtils.resolveURI(id, generalSchema, { vocab: isString });
        return { "@id": resolved };
    };
    JSONLDConverter.prototype.expandValue = function (propertyValue, digestedSchema, generalSchema) {
        if (Utils.isArray(propertyValue))
            return null;
        return Pointer_1.Pointer.is(propertyValue) ?
            this.expandPointerValue(propertyValue, generalSchema, digestedSchema) :
            this.expandLiteralValue(propertyValue, Utils_1.guessXSDType(propertyValue));
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
        targetObject["id"] = expandedObject["@id"];
        targetObject["types"] = !!expandedObject["@type"] ? expandedObject["@type"] : [];
        var propertyURINameMap = this.getPropertyURINameMap(digestedSchema);
        Utils.forEachOwnProperty(expandedObject, function (propertyURI, propertyValues) {
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
                return ObjectSchema.ContainerType.LIST;
        }
        else {
            return ObjectSchema.ContainerType.SET;
        }
        return null;
    };
    JSONLDConverter.prototype.getPropertyValue = function (propertyName, propertyValues, digestedSchema, pointerLibrary) {
        var definition = digestedSchema.properties.get(propertyName);
        var propertyContainer = definition ?
            definition.containerType :
            this.getPropertyContainerType(propertyValues);
        if (propertyContainer === ObjectSchema.ContainerType.LANGUAGE)
            return Node_1.RDFNode.getPropertyLanguageMap(propertyValues);
        if (propertyContainer === ObjectSchema.ContainerType.LIST) {
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
                Node_1.RDFNode.getPropertyPointers(propertyValues, pointerLibrary) :
                Node_1.RDFNode.getProperties(propertyValues, pointerLibrary);
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
            var uri = ObjectSchema.ObjectSchemaUtils.resolveURI(definition.uri, digestedSchema, { vocab: true });
            map.set(uri, propertyName);
        });
        return map;
    };
    JSONLDConverter.prototype.compactPropertyLiteral = function (propertyValues, definition, digestedSchema) {
        var literalType = definition.literalType === null ?
            XSD_1.XSD.string : ObjectSchema.ObjectSchemaUtils.resolveURI(definition.literalType, digestedSchema, { vocab: true, base: true });
        return Node_1.RDFNode.getPropertyLiterals(propertyValues, literalType);
    };
    return JSONLDConverter;
}());
exports.JSONLDConverter = JSONLDConverter;


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Fragment_1 = __webpack_require__(22);
var TransientNamedFragment_1 = __webpack_require__(131);
exports.NamedFragment = {
    isDecorated: function (object) {
        return Fragment_1.Fragment.isDecorated(object);
    },
    is: function (value) {
        return TransientNamedFragment_1.TransientNamedFragment.is(value);
    },
    decorate: function (object) {
        if (exports.NamedFragment.isDecorated(object))
            return object;
        var fragment = TransientNamedFragment_1.TransientNamedFragment.decorate(object);
        return Fragment_1.Fragment.decorate(fragment);
    },
    create: TransientNamedFragment_1.TransientNamedFragment.create,
    createFrom: TransientNamedFragment_1.TransientNamedFragment.createFrom,
};


/***/ }),
/* 263 */
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
var core_1 = __webpack_require__(15);
var Members_1 = __webpack_require__(132);
var Messaging_1 = __webpack_require__(74);
var Resource_1 = __webpack_require__(7);
var SPARQL_1 = __webpack_require__(151);
var QueryDocument_1 = __webpack_require__(43);
var Utils = __importStar(__webpack_require__(0));
var Utils_1 = __webpack_require__(0);
var Vocabularies_1 = __webpack_require__(1);
var CRUDDocument_1 = __webpack_require__(72);
var TransientDocument_1 = __webpack_require__(53);
function addEnsureIfPartial(iri, resource, requestOptions) {
    if (requestOptions.ensureLatest)
        return;
    if (!resource._registry || !resource._registry.hasPointer(iri, true))
        return;
    var target = resource._registry.getPointer(iri, true);
    if (target.isPartial())
        requestOptions.ensureLatest = true;
}
var PROTOTYPE = {
    get: function (uriOrOptionsOrQueryBuilderFn, optionsOrQueryBuilderFn, queryBuilderFn) {
        var iri = Utils_1.isString(uriOrOptionsOrQueryBuilderFn) ? uriOrOptionsOrQueryBuilderFn : this.id;
        var requestOptions = Utils_1.isObject(uriOrOptionsOrQueryBuilderFn) ?
            uriOrOptionsOrQueryBuilderFn : Utils_1.isObject(optionsOrQueryBuilderFn) ? optionsOrQueryBuilderFn : {};
        queryBuilderFn = Utils_1.isFunction(uriOrOptionsOrQueryBuilderFn) ? uriOrOptionsOrQueryBuilderFn :
            Utils_1.isFunction(optionsOrQueryBuilderFn) ? optionsOrQueryBuilderFn : queryBuilderFn;
        if (queryBuilderFn)
            return QueryDocument_1.QueryDocumentDocument.PROTOTYPE
                .get.call(this, iri, requestOptions, queryBuilderFn);
        addEnsureIfPartial(iri, this, requestOptions);
        return CRUDDocument_1.CRUDDocument.PROTOTYPE.get.call(this, iri, requestOptions);
    },
    resolve: function (optionsOrQueryBuilderFn, queryBuilderFn) {
        var requestOptions = Utils_1.isObject(optionsOrQueryBuilderFn) ?
            optionsOrQueryBuilderFn : {};
        if (Utils_1.isFunction(optionsOrQueryBuilderFn))
            queryBuilderFn = optionsOrQueryBuilderFn;
        if (queryBuilderFn)
            return QueryDocument_1.QueryDocumentDocument.PROTOTYPE.resolve.call(this, requestOptions, queryBuilderFn);
        addEnsureIfPartial(this.id, this, requestOptions);
        return CRUDDocument_1.CRUDDocument.PROTOTYPE.resolve.call(this, requestOptions);
    },
    refresh: function (requestOptions) {
        if (this.isPartial())
            return QueryDocument_1.QueryDocumentDocument.PROTOTYPE.refresh.call(this, requestOptions);
        return CRUDDocument_1.CRUDDocument.PROTOTYPE.refresh.call(this, requestOptions);
    },
    save: function (requestOptions) {
        if (this.isPartial())
            return QueryDocument_1.QueryDocumentDocument.PROTOTYPE.save.call(this, requestOptions);
        return CRUDDocument_1.CRUDDocument.PROTOTYPE.save.call(this, requestOptions);
    },
    saveAndRefresh: function (requestOptions) {
        if (this.isPartial())
            return QueryDocument_1.QueryDocumentDocument.PROTOTYPE.saveAndRefresh.call(this, requestOptions);
        return CRUDDocument_1.CRUDDocument.PROTOTYPE.saveAndRefresh.call(this, requestOptions);
    },
    isDirty: function () {
        var _this = this;
        var isSelfDirty = Resource_1.PersistedResource.PROTOTYPE.isDirty.call(this);
        if (isSelfDirty)
            return true;
        var hasRemovedFragments = this
            ._savedFragments
            .some(function (fragment) { return !_this.hasFragment(fragment.id); });
        if (hasRemovedFragments)
            return true;
        var hasNewFragments = this
            ._savedFragments.length !== this._resourcesMap.size;
        if (hasNewFragments)
            return true;
        return this
            ._savedFragments
            .some(function (fragment) { return fragment.isDirty(); });
    },
    revert: function () {
        var _this = this;
        Resource_1.PersistedResource.PROTOTYPE.revert.call(this);
        this._resourcesMap.clear();
        this
            ._savedFragments
            .forEach(function (fragment) {
            fragment.revert();
            var localID = "slug" in fragment ?
                fragment.slug : fragment.id;
            _this._resourcesMap.set(localID, fragment);
        });
    },
};
exports.Document = {
    PROTOTYPE: PROTOTYPE,
    TYPE: Vocabularies_1.C.Document,
    SCHEMA: {
        "contains": {
            "@id": Vocabularies_1.LDP.contains,
            "@container": "@set",
            "@type": "@id",
        },
        "members": {
            "@id": Vocabularies_1.LDP.member,
            "@container": "@set",
            "@type": "@id",
        },
        "membershipResource": {
            "@id": Vocabularies_1.LDP.membershipResource,
            "@type": "@id",
        },
        "isMemberOfRelation": {
            "@id": Vocabularies_1.LDP.isMemberOfRelation,
            "@type": "@id",
        },
        "hasMemberRelation": {
            "@id": Vocabularies_1.LDP.hasMemberRelation,
            "@type": "@id",
        },
        "insertedContentRelation": {
            "@id": Vocabularies_1.LDP.insertedContentRelation,
            "@type": "@id",
        },
        "created": {
            "@id": Vocabularies_1.C.created,
            "@type": Vocabularies_1.XSD.dateTime,
        },
        "modified": {
            "@id": Vocabularies_1.C.modified,
            "@type": Vocabularies_1.XSD.dateTime,
        },
        "defaultInteractionModel": {
            "@id": Vocabularies_1.C.defaultInteractionModel,
            "@type": "@id",
        },
        "accessPoints": {
            "@id": Vocabularies_1.C.accessPoint,
            "@type": "@id",
            "@container": "@set",
        },
    },
    isDecorated: function (object) {
        return Utils.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    is: function (object) {
        return CRUDDocument_1.CRUDDocument.is(object)
            && Members_1.MembersDocument.isDecorated(object)
            && SPARQL_1.SPARQLDocument.isDecorated(object)
            && Messaging_1.MessagingDocument.isDecorated(object)
            && QueryDocument_1.QueryDocumentDocument.isDecorated(object)
            && exports.Document.isDecorated(object);
    },
    decorate: function (object) {
        if (exports.Document.isDecorated(object))
            return object;
        var resource = core_1.ModelDecorator
            .decorateMultiple(object, CRUDDocument_1.CRUDDocument, Members_1.MembersDocument, SPARQL_1.SPARQLDocument, Messaging_1.MessagingDocument, QueryDocument_1.QueryDocumentDocument);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
    create: TransientDocument_1.TransientDocument.create,
    createFrom: TransientDocument_1.TransientDocument.createFrom,
};


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(15);
var Errors_1 = __webpack_require__(3);
var FreeResources_1 = __webpack_require__(69);
var HTTP_1 = __webpack_require__(26);
var Pointer_1 = __webpack_require__(17);
var Resource_1 = __webpack_require__(7);
var Utils_1 = __webpack_require__(0);
var Vocabularies_1 = __webpack_require__(1);
var AddMemberAction_1 = __webpack_require__(133);
var RemoveMemberAction_1 = __webpack_require__(134);
function getRegistry(repository) {
    if (repository._registry && repository._registry._context)
        return repository._registry;
    throw new Errors_1.IllegalActionError("\"" + repository.id + "\" doesn't support Members management requests.");
}
function setDefaultRequestOptions(registry, requestOptions) {
    if (registry._context && registry._context.auth)
        registry._context.auth.addAuthentication(requestOptions);
    HTTP_1.RequestUtils.setPreferredInteractionModel(Vocabularies_1.LDP.Container, requestOptions);
    HTTP_1.RequestUtils.setAcceptHeader("application/ld+json", requestOptions);
    return requestOptions;
}
function parseMembers(registry, pointers) {
    return pointers.map(function (pointer) {
        if (Utils_1.isString(pointer))
            return registry.getPointer(pointer);
        if (Pointer_1.Pointer.is(pointer))
            return pointer;
        throw new Errors_1.IllegalArgumentError("No valid Pointer or URI provided.");
    });
}
function sendAddAction(repository, uri, members, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    return Utils_1.promiseMethod(function () {
        var registry = getRegistry(repository);
        var url = HTTP_1.RequestUtils.getRequestURLFor(registry, repository, uri);
        var targetMembers = parseMembers(registry, members);
        setDefaultRequestOptions(registry, requestOptions);
        HTTP_1.RequestUtils.setContentTypeHeader("application/ld+json", requestOptions);
        var freeResources = FreeResources_1.FreeResources.createFrom({
            _registry: registry,
            _context: registry._context,
        });
        freeResources._register(AddMemberAction_1.AddMemberAction.createFrom({ targetMembers: targetMembers }));
        var body = JSON.stringify(freeResources);
        return HTTP_1.RequestService
            .put(url, body, requestOptions)
            .then(function () { })
            .catch(registry._parseErrorFromResponse.bind(registry));
    });
}
function sendRemoveAction(repository, uri, members, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    return Utils_1.promiseMethod(function () {
        var registry = getRegistry(repository);
        var url = HTTP_1.RequestUtils.getRequestURLFor(registry, repository, uri);
        var targetMembers = parseMembers(registry, members);
        setDefaultRequestOptions(registry, requestOptions);
        HTTP_1.RequestUtils.setContentTypeHeader("application/ld+json", requestOptions);
        HTTP_1.RequestUtils.setRetrievalPreferences({
            include: [Vocabularies_1.C.PreferSelectedMembershipTriples],
            omit: [Vocabularies_1.C.PreferMembershipTriples],
        }, requestOptions);
        var freeResources = FreeResources_1.FreeResources.createFrom({
            _registry: registry,
            _context: registry._context,
        });
        freeResources._register(RemoveMemberAction_1.RemoveMemberAction.createFrom({ targetMembers: targetMembers }));
        var body = JSON.stringify(freeResources);
        return HTTP_1.RequestService
            .delete(url, body, requestOptions)
            .then(function () { })
            .catch(registry._parseErrorFromResponse.bind(registry));
    });
}
var PROTOTYPE = {
    _registry: void 0,
    addMember: function (uriOrMember, memberOrOptions, requestOptions) {
        requestOptions = Utils_1.isObject(memberOrOptions) && !Pointer_1.Pointer.is(memberOrOptions) ?
            memberOrOptions :
            requestOptions;
        var member = memberOrOptions !== requestOptions ?
            memberOrOptions :
            uriOrMember;
        var uri = member !== uriOrMember ?
            uriOrMember :
            void 0;
        return sendAddAction(this, uri, [member], requestOptions);
    },
    addMembers: function (uriOrMembers, membersOrOptions, requestOptions) {
        requestOptions = !Array.isArray(membersOrOptions) ?
            membersOrOptions :
            requestOptions;
        var members = membersOrOptions !== requestOptions ?
            membersOrOptions :
            uriOrMembers;
        var uri = members !== uriOrMembers ?
            uriOrMembers :
            void 0;
        return sendAddAction(this, uri, members, requestOptions);
    },
    removeMember: function (uriOrMember, memberOrOptions, requestOptions) {
        requestOptions = Utils_1.isObject(memberOrOptions) && !Pointer_1.Pointer.is(memberOrOptions) ?
            memberOrOptions :
            requestOptions;
        var member = memberOrOptions !== requestOptions ?
            memberOrOptions :
            uriOrMember;
        var uri = member !== uriOrMember ?
            uriOrMember :
            void 0;
        return sendRemoveAction(this, uri, [member], requestOptions);
    },
    removeMembers: function (uriOrMembers, membersOrOptions, requestOptions) {
        requestOptions = !Array.isArray(membersOrOptions) ?
            membersOrOptions :
            requestOptions;
        var members = membersOrOptions !== requestOptions ?
            membersOrOptions :
            uriOrMembers;
        var uri = members !== uriOrMembers ?
            uriOrMembers :
            void 0;
        return sendRemoveAction(this, uri, members, requestOptions);
    },
    removeAllMembers: function (uriOrOptions, requestOptions) {
        var _this = this;
        requestOptions = Utils_1.isObject(uriOrOptions) ? uriOrOptions :
            requestOptions ? requestOptions : {};
        var uri = uriOrOptions !== requestOptions ?
            uriOrOptions :
            void 0;
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var url = HTTP_1.RequestUtils.getRequestURLFor(registry, _this, uri);
            setDefaultRequestOptions(registry, requestOptions);
            HTTP_1.RequestUtils.setRetrievalPreferences({
                include: [
                    Vocabularies_1.C.PreferMembershipTriples,
                ],
                omit: [
                    Vocabularies_1.C.PreferMembershipResources,
                    Vocabularies_1.C.PreferContainmentTriples,
                    Vocabularies_1.C.PreferContainmentResources,
                    Vocabularies_1.C.PreferContainer,
                ],
            }, requestOptions);
            return HTTP_1.RequestService
                .delete(url, requestOptions)
                .then(function () { })
                .catch(registry._parseErrorFromResponse.bind(registry));
        });
    },
};
exports.MembersDocument = {
    PROTOTYPE: PROTOTYPE,
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.MembersDocument.isDecorated(object))
            return object;
        var resource = core_1.ModelDecorator
            .decorateMultiple(object, Resource_1.TransientResource);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
};


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(11);
var DocumentCreated_1 = __webpack_require__(75);
var SCHEMA = DocumentCreated_1.DocumentCreated.SCHEMA;
exports.AccessPointCreated = {
    TYPE: C_1.C.AccessPointCreated,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(11);
var DocumentCreated_1 = __webpack_require__(75);
var TYPE = C_1.C.ChildCreated;
var SCHEMA = DocumentCreated_1.DocumentCreated.SCHEMA;
exports.ChildCreated = {
    TYPE: TYPE,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(15);
var Document_1 = __webpack_require__(18);
var Errors_1 = __webpack_require__(3);
var RDF_1 = __webpack_require__(10);
var Utils_1 = __webpack_require__(0);
var Event_1 = __webpack_require__(135);
var Utils_2 = __webpack_require__(136);
function getMessagingService(repository) {
    if (!repository._context || !repository._context.messaging)
        throw new Errors_1.IllegalActionError("\"" + repository.id + "\" doesn't support messaging subscriptions.");
    return repository._context.messaging;
}
function parseParams(resource, uriPatternOROnEvent, onEventOrOnError, onError) {
    var uriPattern = Utils_1.isString(uriPatternOROnEvent) ?
        RDF_1.URI.resolve(resource.id, uriPatternOROnEvent) : resource.id;
    var onEvent = Utils_1.isFunction(uriPatternOROnEvent) ?
        uriPatternOROnEvent : onEventOrOnError;
    if (onEvent !== onEventOrOnError)
        onError = onEventOrOnError;
    return { uriPattern: uriPattern, onEvent: onEvent, onError: onError };
}
var PROTOTYPE = {
    on: function (event, uriPatternOROnEvent, onEventOrOnError, onError) {
        try {
            var messaging = getMessagingService(this);
            var uriPattern = void 0, onEvent = void 0;
            (_a = parseParams(this, uriPatternOROnEvent, onEventOrOnError, onError), uriPattern = _a.uriPattern, onEvent = _a.onEvent, onError = _a.onError);
            var destination = Utils_2.createDestination(event, uriPattern, this._context.baseURI);
            messaging.subscribe(destination, onEvent, onError);
        }
        catch (error) {
            if (!onError)
                throw error;
            onError(error);
        }
        var _a;
    },
    off: function (event, uriPatternOROnEvent, onEventOrOnError, onError) {
        try {
            var messaging = getMessagingService(this);
            var uriPattern = void 0, onEvent = void 0;
            (_a = parseParams(this, uriPatternOROnEvent, onEventOrOnError, onError), uriPattern = _a.uriPattern, onEvent = _a.onEvent, onError = _a.onError);
            var destination = Utils_2.createDestination(event, uriPattern, this._context.baseURI);
            messaging.unsubscribe(destination, onEvent);
        }
        catch (error) {
            if (!onError)
                throw error;
            onError(error);
        }
        var _a;
    },
    one: function (event, uriPatternOROnEvent, onEventOrOnError, onError) {
        try {
            var messaging_1 = getMessagingService(this);
            var uriPattern = void 0, onEvent_1;
            (_a = parseParams(this, uriPatternOROnEvent, onEventOrOnError, onError), uriPattern = _a.uriPattern, onEvent_1 = _a.onEvent, onError = _a.onError);
            var destination_1 = Utils_2.createDestination(event, uriPattern, this._context.baseURI);
            messaging_1.subscribe(destination_1, function onEventWrapper(message) {
                onEvent_1(message);
                messaging_1.unsubscribe(destination_1, onEventWrapper);
            }, onError);
        }
        catch (error) {
            if (!onError)
                throw error;
            onError(error);
        }
        var _a;
    },
    onAccessPointCreated: function (uriPatternOROnEvent, onEventOrOnError, onError) {
        return this.on(Event_1.Event.ACCESS_POINT_CREATED, uriPatternOROnEvent, onEventOrOnError, onError);
    },
    onChildCreated: function (uriPatternOROnEvent, onEventOrOnError, onError) {
        return this.on(Event_1.Event.CHILD_CREATED, uriPatternOROnEvent, onEventOrOnError, onError);
    },
    onDocumentCreated: function (uriPatternOROnEvent, onEventOrOnError, onError) {
        return this.on(Event_1.Event.DOCUMENT_CREATED, uriPatternOROnEvent, onEventOrOnError, onError);
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
};
exports.MessagingDocument = {
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.MessagingDocument.isDecorated(object))
            return object;
        var resource = core_1.ModelDecorator
            .decorateMultiple(object, Document_1.TransientDocument);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
};


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(11);
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
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(11);
var EventMessage_1 = __webpack_require__(31);
var TYPE = C_1.C.DocumentDeleted;
var SCHEMA = EventMessage_1.EventMessage.SCHEMA;
exports.DocumentDeleted = {
    TYPE: TYPE,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(11);
var EventMessage_1 = __webpack_require__(31);
var TYPE = C_1.C.DocumentModified;
var SCHEMA = EventMessage_1.EventMessage.SCHEMA;
exports.DocumentModified = {
    TYPE: TYPE,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 271 */
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
var C_1 = __webpack_require__(11);
var EventMessage_1 = __webpack_require__(31);
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
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(11);
var MemberDetails_1 = __webpack_require__(76);
var TYPE = C_1.C.MemberAddedDetails;
var SCHEMA = MemberDetails_1.MemberDetails.SCHEMA;
exports.MemberAddedDetails = {
    TYPE: TYPE,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 273 */
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
var C_1 = __webpack_require__(11);
var EventMessage_1 = __webpack_require__(31);
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
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(11);
var MemberDetails_1 = __webpack_require__(76);
var TYPE = C_1.C.MemberRemovedDetails;
var SCHEMA = MemberDetails_1.MemberDetails.SCHEMA;
exports.MemberRemovedDetails = {
    TYPE: TYPE,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 275 */
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
var sockjs_client_1 = __importDefault(__webpack_require__(276));
var webstomp = __importStar(__webpack_require__(308));
var Errors_1 = __webpack_require__(3);
var JSONLD_1 = __webpack_require__(23);
var Utils_1 = __webpack_require__(0);
var EventMessage_1 = __webpack_require__(31);
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
            var error = new Errors_1.IllegalStateError("The messaging service is already connect" + (this._client.connected ? "ed" : "ing") + ".");
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
            new JSONLD_1.JSONLDParser()
                .parse(message.body)
                .then(function (data) {
                var freeResources = _this.context
                    .registry._parseFreeNodes(data);
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
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var transportList = __webpack_require__(277);

module.exports = __webpack_require__(296)(transportList);

// TODO can't get rid of this until all servers do
if ('_sockjs_onload' in global) {
  setTimeout(global._sockjs_onload, 1);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = [
  // streaming transports
  __webpack_require__(278)
, __webpack_require__(285)
, __webpack_require__(141)
, __webpack_require__(142)
, __webpack_require__(78)(__webpack_require__(142))

  // polling transports
, __webpack_require__(146)
, __webpack_require__(78)(__webpack_require__(146))
, __webpack_require__(147)
, __webpack_require__(292)
, __webpack_require__(78)(__webpack_require__(147))
, __webpack_require__(293)
];


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(27)
  , urlUtils = __webpack_require__(16)
  , inherits = __webpack_require__(2)
  , EventEmitter = __webpack_require__(13).EventEmitter
  , WebsocketDriver = __webpack_require__(284)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(9)('sockjs-client:websocket');
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
/* 279 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 280 */
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
/* 281 */
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
/* 282 */
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
exports.humanize = __webpack_require__(283);

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
/* 283 */
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
/* 284 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var inherits = __webpack_require__(2)
  , AjaxBasedTransport = __webpack_require__(36)
  , XhrReceiver = __webpack_require__(55)
  , XHRCorsObject = __webpack_require__(56)
  , XHRLocalObject = __webpack_require__(45)
  , browser = __webpack_require__(46)
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(2)
  , EventEmitter = __webpack_require__(13).EventEmitter
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(9)('sockjs-client:buffered-sender');
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
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(2)
  , EventEmitter = __webpack_require__(13).EventEmitter
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(9)('sockjs-client:polling');
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
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(2)
  , EventEmitter = __webpack_require__(13).EventEmitter
  , EventSourceDriver = __webpack_require__(143)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(9)('sockjs-client:receiver:eventsource');
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
/* 289 */
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
/* 290 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var inherits = __webpack_require__(2)
  , iframeUtils = __webpack_require__(47)
  , urlUtils = __webpack_require__(16)
  , EventEmitter = __webpack_require__(13).EventEmitter
  , random = __webpack_require__(35)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(9)('sockjs-client:receiver:htmlfile');
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(2)
  , AjaxBasedTransport = __webpack_require__(36)
  , XdrStreamingTransport = __webpack_require__(141)
  , XhrReceiver = __webpack_require__(55)
  , XDRObject = __webpack_require__(77)
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
/* 293 */
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

var inherits = __webpack_require__(2)
  , SenderReceiver = __webpack_require__(139)
  , JsonpReceiver = __webpack_require__(294)
  , jsonpSender = __webpack_require__(295)
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var utils = __webpack_require__(47)
  , random = __webpack_require__(35)
  , browser = __webpack_require__(46)
  , urlUtils = __webpack_require__(16)
  , inherits = __webpack_require__(2)
  , EventEmitter = __webpack_require__(13).EventEmitter
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(9)('sockjs-client:receiver:jsonp');
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var random = __webpack_require__(35)
  , urlUtils = __webpack_require__(16)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(9)('sockjs-client:sender:jsonp');
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(297);

var URL = __webpack_require__(137)
  , inherits = __webpack_require__(2)
  , JSON3 = __webpack_require__(24)
  , random = __webpack_require__(35)
  , escape = __webpack_require__(298)
  , urlUtils = __webpack_require__(16)
  , eventUtils = __webpack_require__(27)
  , transport = __webpack_require__(299)
  , objectUtils = __webpack_require__(79)
  , browser = __webpack_require__(46)
  , log = __webpack_require__(300)
  , Event = __webpack_require__(80)
  , EventTarget = __webpack_require__(138)
  , loc = __webpack_require__(148)
  , CloseEvent = __webpack_require__(301)
  , TransportMessageEvent = __webpack_require__(302)
  , InfoReceiver = __webpack_require__(303)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(9)('sockjs-client:main');
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

SockJS.version = __webpack_require__(145);

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
  __webpack_require__(306)(SockJS, availableTransports);
  return SockJS;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 297 */
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
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var JSON3 = __webpack_require__(24);

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
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var debug = function() {};
if (true) {
  debug = __webpack_require__(9)('sockjs-client:utils:transport');
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
/* 300 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(2)
  , Event = __webpack_require__(80)
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
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(2)
  , Event = __webpack_require__(80)
  ;

function TransportMessageEvent(data) {
  Event.call(this);
  this.initEvent('message', false, false);
  this.data = data;
}

inherits(TransportMessageEvent, Event);

module.exports = TransportMessageEvent;


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EventEmitter = __webpack_require__(13).EventEmitter
  , inherits = __webpack_require__(2)
  , urlUtils = __webpack_require__(16)
  , XDR = __webpack_require__(77)
  , XHRCors = __webpack_require__(56)
  , XHRLocal = __webpack_require__(45)
  , XHRFake = __webpack_require__(304)
  , InfoIframe = __webpack_require__(305)
  , InfoAjax = __webpack_require__(150)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(9)('sockjs-client:info-receiver');
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
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EventEmitter = __webpack_require__(13).EventEmitter
  , inherits = __webpack_require__(2)
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
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var EventEmitter = __webpack_require__(13).EventEmitter
  , inherits = __webpack_require__(2)
  , JSON3 = __webpack_require__(24)
  , utils = __webpack_require__(27)
  , IframeTransport = __webpack_require__(144)
  , InfoReceiverIframe = __webpack_require__(149)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(9)('sockjs-client:info-iframe');
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var urlUtils = __webpack_require__(16)
  , eventUtils = __webpack_require__(27)
  , JSON3 = __webpack_require__(24)
  , FacadeJS = __webpack_require__(307)
  , InfoIframeReceiver = __webpack_require__(149)
  , iframeUtils = __webpack_require__(47)
  , loc = __webpack_require__(148)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(9)('sockjs-client:iframe-bootstrap');
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
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var JSON3 = __webpack_require__(24)
  , iframeUtils = __webpack_require__(47)
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
/* 308 */
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
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(19);
var decorators_1 = __webpack_require__(21);
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
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(19);
var _1 = __webpack_require__(21);
var IRIResolver_1 = __webpack_require__(33);
var tokens_1 = __webpack_require__(6);
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
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(19);
var _1 = __webpack_require__(21);
var tokens_1 = __webpack_require__(6);
var tokens_2 = __webpack_require__(4);
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
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(19);
var _1 = __webpack_require__(21);
var tokens_1 = __webpack_require__(6);
var tokens_2 = __webpack_require__(4);
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
/* 313 */
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
var Container_1 = __webpack_require__(19);
var values_1 = __webpack_require__(314);
var tokens_1 = __webpack_require__(6);
var tokens_2 = __webpack_require__(4);
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
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(19);
var IRIResolver_1 = __webpack_require__(33);
var patterns_1 = __webpack_require__(155);
var tokens_1 = __webpack_require__(6);
var triples_1 = __webpack_require__(317);
var ObjectPattern_1 = __webpack_require__(48);
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
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(157));
__export(__webpack_require__(158));

//# sourceMappingURL=index.js.map


/***/ }),
/* 316 */
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
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(159));
__export(__webpack_require__(160));
__export(__webpack_require__(161));
__export(__webpack_require__(162));
__export(__webpack_require__(57));
__export(__webpack_require__(58));
__export(__webpack_require__(163));

//# sourceMappingURL=index.js.map


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(19);
var _1 = __webpack_require__(21);
var tokens_1 = __webpack_require__(6);
var tokens_2 = __webpack_require__(4);
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
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(19);
var _1 = __webpack_require__(21);
var IRIResolver_1 = __webpack_require__(33);
var tokens_1 = __webpack_require__(6);
var tokens_2 = __webpack_require__(4);
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
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(19);
var _1 = __webpack_require__(21);
var tokens_1 = __webpack_require__(6);
var tokens_2 = __webpack_require__(4);
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
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(19);
var _1 = __webpack_require__(21);
var IRIResolver_1 = __webpack_require__(33);
var patterns_1 = __webpack_require__(155);
var tokens_1 = __webpack_require__(6);
var Patterns_1 = __webpack_require__(164);
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
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(15);
var Errors_1 = __webpack_require__(3);
var HTTP_1 = __webpack_require__(26);
var Resource_1 = __webpack_require__(7);
var Utils_1 = __webpack_require__(0);
var Builder_1 = __webpack_require__(152);
var Service_1 = __webpack_require__(73);
function getRegistry(repository) {
    if (repository._registry)
        return repository._registry;
    throw new Errors_1.IllegalActionError("\"" + repository.id + "\" doesn't support SPARQL requests.");
}
function parseParams(resource, registry, uriOrQuery, queryOrOptions, options) {
    if (options === void 0) { options = {}; }
    var iri;
    var query = uriOrQuery;
    if (Utils_1.isObject(queryOrOptions)) {
        options = queryOrOptions;
    }
    else if (queryOrOptions !== void 0) {
        query = queryOrOptions;
        iri = uriOrQuery;
    }
    var url = HTTP_1.RequestUtils.getRequestURLFor(registry, resource, iri);
    if (registry._context && registry._context.auth)
        registry._context.auth.addAuthentication(options);
    return { url: url, query: query, options: options };
}
var PROTOTYPE = {
    _registry: void 0,
    executeRawASKQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var _a = parseParams(_this, registry, uriOrQuery, queryOrOptions, requestOptions), url = _a.url, query = _a.query, options = _a.options;
            return Service_1.SPARQLService
                .executeRawASKQuery(url, query, options)
                .then(function (_a) {
                var rawResults = _a[0];
                return rawResults;
            })
                .catch(registry._parseErrorFromResponse.bind(_this));
        });
    },
    executeASKQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var _a = parseParams(_this, registry, uriOrQuery, queryOrOptions, requestOptions), url = _a.url, query = _a.query, options = _a.options;
            return Service_1.SPARQLService
                .executeASKQuery(url, query, options)
                .then(function (_a) {
                var rawResults = _a[0];
                return rawResults;
            })
                .catch(registry._parseErrorFromResponse.bind(_this));
        });
    },
    executeRawSELECTQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var _a = parseParams(_this, registry, uriOrQuery, queryOrOptions, requestOptions), url = _a.url, query = _a.query, options = _a.options;
            return Service_1.SPARQLService
                .executeRawSELECTQuery(url, query, options)
                .then(function (_a) {
                var rawResults = _a[0];
                return rawResults;
            })
                .catch(registry._parseErrorFromResponse.bind(_this));
        });
    },
    executeSELECTQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var _a = parseParams(_this, registry, uriOrQuery, queryOrOptions, requestOptions), url = _a.url, query = _a.query, options = _a.options;
            return Service_1.SPARQLService
                .executeSELECTQuery(url, query, _this._registry, options)
                .then(function (_a) {
                var selectResults = _a[0];
                return selectResults;
            })
                .catch(registry._parseErrorFromResponse.bind(_this));
        });
    },
    executeRawCONSTRUCTQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var _a = parseParams(_this, registry, uriOrQuery, queryOrOptions, requestOptions), url = _a.url, query = _a.query, options = _a.options;
            return Service_1.SPARQLService
                .executeRawCONSTRUCTQuery(url, query, options)
                .then(function (_a) {
                var strConstruct = _a[0];
                return strConstruct;
            })
                .catch(registry._parseErrorFromResponse.bind(_this));
        });
    },
    executeRawDESCRIBEQuery: function (uriOrQuery, queryOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var _a = parseParams(_this, registry, uriOrQuery, queryOrOptions, requestOptions), url = _a.url, query = _a.query, options = _a.options;
            return Service_1.SPARQLService
                .executeRawDESCRIBEQuery(url, query, options)
                .then(function (_a) {
                var strDescribe = _a[0];
                return strDescribe;
            })
                .catch(registry._parseErrorFromResponse.bind(_this));
        });
    },
    executeUPDATE: function (uriOrQuery, updateOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var _a = parseParams(_this, registry, uriOrQuery, updateOrOptions, requestOptions), url = _a.url, update = _a.query, options = _a.options;
            return Service_1.SPARQLService
                .executeUPDATE(url, update, options)
                .then(function () { })
                .catch(registry._parseErrorFromResponse.bind(_this));
        });
    },
    sparql: function (uri) {
        var registry = getRegistry(this);
        var iri = HTTP_1.RequestUtils.getRequestURLFor(registry, this, uri);
        var schema = registry.getGeneralSchema();
        var builder = new Builder_1.SPARQLBuilder(this, iri)
            .base(schema.base)
            .vocab(schema.vocab);
        schema.prefixes.forEach(function (name, prefix) {
            builder = builder.prefix(prefix, name);
        });
        return builder;
    },
};
exports.SPARQLDocument = {
    PROTOTYPE: PROTOTYPE,
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.SPARQLDocument.isDecorated(object))
            return object;
        var resource = core_1.ModelDecorator
            .decorateMultiple(object, Resource_1.TransientResource);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
};


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Fragment_1 = __webpack_require__(22);
var Vocabularies_1 = __webpack_require__(1);
var TransientACE_1 = __webpack_require__(168);
exports.ACE = {
    TYPE: TransientACE_1.TransientACE.TYPE,
    SCHEMA: {
        "granting": {
            "@id": Vocabularies_1.CS.granting,
            "@type": Vocabularies_1.XSD.boolean,
        },
        "permissions": {
            "@id": Vocabularies_1.CS.permission,
            "@type": "@id",
            "@container": "@set",
        },
        "subjects": {
            "@id": Vocabularies_1.CS.subject,
            "@type": "@id",
            "@container": "@set",
        },
        "subjectsClass": {
            "@id": Vocabularies_1.CS.subjectClass,
            "@type": "@id",
        },
    },
    is: function (value) {
        return Fragment_1.Fragment.is(value)
            && value.hasType(exports.ACE.TYPE);
    },
    create: TransientACE_1.TransientACE.create,
    createFrom: TransientACE_1.TransientACE.createFrom,
};


/***/ }),
/* 324 */
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
var Document_1 = __webpack_require__(18);
var Utils = __importStar(__webpack_require__(0));
var Vocabularies_1 = __webpack_require__(1);
var TransientACL_1 = __webpack_require__(170);
exports.ACL = {
    TYPE: Vocabularies_1.CS.AccessControlList,
    SCHEMA: {
        "entries": {
            "@id": Vocabularies_1.CS.accessControlEntry,
            "@type": "@id",
            "@container": "@set",
        },
        "accessTo": {
            "@id": Vocabularies_1.CS.accessTo,
            "@type": "@id",
        },
        "inheritableEntries": {
            "@id": Vocabularies_1.CS.inheritableEntry,
            "@type": "@id",
            "@container": "@set",
        },
    },
    isDecorated: function (object) {
        return Utils.hasPropertyDefined(object, "accessTo")
            && object["_parsePointer"] === parsePointer;
    },
    decorate: function (object) {
        if (exports.ACL.isDecorated(object))
            return object;
        TransientACL_1.TransientACL.decorate(object);
        Document_1.Document.decorate(object);
        var acl = object;
        Object.defineProperties(acl, {
            "_parsePointer": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: parsePointer,
            },
        });
        var removeInvalidACE = function (ace) {
            if (!ace.subjects)
                acl._removeFragment(ace);
            return !!ace.subjects;
        };
        if (acl.entries)
            acl.entries = acl.entries.filter(removeInvalidACE);
        if (acl.inheritableEntries)
            acl.inheritableEntries = acl.inheritableEntries.filter(removeInvalidACE);
        return acl;
    },
};
function parsePointer(element) {
    return Utils.isObject(element) ? element : this.getPointer(element);
}


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vocabularies_1 = __webpack_require__(1);
var SCHEMA = {
    "authenticatedUserMetadata": {
        "@id": Vocabularies_1.CS.authenticatedUserMetadata,
        "@type": "@id",
    },
};
exports.AuthenticatedUserInformationAccessor = {
    TYPE: Vocabularies_1.CS.AuthenticatedUserInformationAccessor,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vocabularies_1 = __webpack_require__(1);
var SCHEMA = {
    "user": {
        "@id": Vocabularies_1.CS.user,
        "@type": "@id",
    },
};
exports.AuthenticatedUserMetadata = {
    TYPE: Vocabularies_1.CS.AuthenticatedUserMetadata,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ProtectedDocument_1 = __webpack_require__(34);
var Vocabularies_1 = __webpack_require__(1);
var TransientUser_1 = __webpack_require__(171);
exports.User = {
    TYPE: TransientUser_1.TransientUser.TYPE,
    SCHEMA: {
        "name": {
            "@id": Vocabularies_1.CS.name,
            "@type": Vocabularies_1.XSD.string,
        },
        "credentials": {
            "@id": Vocabularies_1.CS.credentials,
            "@type": "@id",
        },
    },
    isDecorated: function (object) {
        return ProtectedDocument_1.ProtectedDocument.isDecorated(object)
            && TransientUser_1.TransientUser.isDecorated(object);
    },
    is: function (value) {
        return TransientUser_1.TransientUser.isDecorated(value)
            && ProtectedDocument_1.ProtectedDocument.is(value);
    },
    decorate: function (object) {
        TransientUser_1.TransientUser.decorate(object);
        ProtectedDocument_1.ProtectedDocument.decorate(object);
        var persistedUser = object;
        persistedUser.addType(TransientUser_1.TransientUser.TYPE);
        return persistedUser;
    },
    create: TransientUser_1.TransientUser.create,
    createFrom: TransientUser_1.TransientUser.createFrom,
};


/***/ }),
/* 328 */
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
var Errors_1 = __webpack_require__(3);
var Utils = __importStar(__webpack_require__(0));
var AuthMethod_1 = __webpack_require__(173);
var BasicAuthenticator_1 = __webpack_require__(84);
var BasicToken_1 = __webpack_require__(175);
var TokenAuthenticator_1 = __webpack_require__(176);
var TokenCredentials_1 = __webpack_require__(85);
var UsersEndpoint_1 = __webpack_require__(177);
var AuthService = (function () {
    function AuthService(context) {
        this.context = context;
        var usersIRI = context._resolvePath("users");
        this.users = UsersEndpoint_1.UsersEndpoint
            .decorate(context.registry.getPointer(usersIRI));
        this.authenticators = (_a = {},
            _a[AuthMethod_1.AuthMethod.BASIC] = new BasicAuthenticator_1.BasicAuthenticator(this.context),
            _a[AuthMethod_1.AuthMethod.TOKEN] = new TokenAuthenticator_1.TokenAuthenticator(this.context),
            _a);
        var _a;
    }
    Object.defineProperty(AuthService.prototype, "authenticatedUser", {
        get: function () {
            if (this._authenticatedUser)
                return this._authenticatedUser;
            return null;
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.isAuthenticated = function () {
        if (!this.authenticator)
            return false;
        return this.authenticator.isAuthenticated();
    };
    AuthService.prototype.authenticate = function (username, password) {
        return this.authenticateUsing(AuthMethod_1.AuthMethod.TOKEN, username, password);
    };
    AuthService.prototype.authenticateUsing = function (method, userOrCredentials, password) {
        var _this = this;
        this.clearAuthentication();
        var authenticator = this.authenticators[method];
        if (!authenticator)
            return Promise.reject(new Errors_1.IllegalArgumentError("Invalid authentication method \"" + method + "\"."));
        var authenticationToken = this
            ._getAuthenticationToken(userOrCredentials, password);
        if (!authenticationToken)
            return Promise.reject(new Errors_1.IllegalArgumentError("Invalid authentication token."));
        var credentials;
        return authenticator
            .authenticate(authenticationToken)
            .then(function (_credentials) {
            credentials = _credentials;
            return authenticator
                .getAuthenticatedUser();
        }).then(function (persistedUser) {
            _this._authenticatedUser = persistedUser;
            _this.authenticator = authenticator;
            return credentials;
        });
    };
    AuthService.prototype.addAuthentication = function (requestOptions) {
        if (!this.isAuthenticated())
            return;
        return this.authenticator.addAuthentication(requestOptions);
    };
    AuthService.prototype.clearAuthentication = function () {
        if (!this.authenticator)
            return;
        this.authenticator.clearAuthentication();
        this.authenticator = null;
        this._authenticatedUser = null;
    };
    AuthService.prototype._getAuthenticationToken = function (userOrCredentials, password) {
        if (Utils.isString(userOrCredentials))
            return new BasicToken_1.BasicToken(userOrCredentials, password);
        if (TokenCredentials_1.TokenCredentialsBase.is(userOrCredentials))
            return userOrCredentials;
        return null;
    };
    return AuthService;
}());
exports.AuthService = AuthService;


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vocabularies_1 = __webpack_require__(1);
var SCHEMA = {
    "user": {
        "@id": Vocabularies_1.CS.user,
        "@type": "@id",
    },
    "credentials": {
        "@id": Vocabularies_1.CS.credentials,
        "@type": "@id",
        "@container": "@set",
    },
};
exports.CredentialsSet = {
    TYPE: Vocabularies_1.CS.CredentialsSet,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vocabularies_1 = __webpack_require__(1);
var SCHEMA = {
    "ldapServer": {
        "@id": Vocabularies_1.CS.ldapServer,
        "@type": "@id",
    },
    "ldapUserDN": {
        "@id": Vocabularies_1.CS.ldapUserDN,
        "@type": Vocabularies_1.XSD.string,
    },
};
exports.LDAPCredentials = {
    TYPE: Vocabularies_1.CS.LDAPCredentials,
    SCHEMA: SCHEMA,
};


/***/ }),
/* 331 */
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
var AbstractContext_1 = __webpack_require__(93);
var Auth_1 = __webpack_require__(167);
var Document_1 = __webpack_require__(18);
var LDP_1 = __webpack_require__(20);
var Members_1 = __webpack_require__(132);
var Messaging_1 = __webpack_require__(74);
var ObjectSchema_1 = __webpack_require__(12);
var Pointer_1 = __webpack_require__(17);
var ProtectedDocument_1 = __webpack_require__(34);
var Registry_1 = __webpack_require__(42);
var SHACL_1 = __webpack_require__(178);
var QueryDocument_1 = __webpack_require__(43);
var System_1 = __webpack_require__(179);
var GlobalContext = (function (_super) {
    __extends(GlobalContext, _super);
    function GlobalContext() {
        var _this = _super.call(this) || this;
        _this.repository = undefined;
        _this.auth = undefined;
        _this._baseURI = "";
        _this._parentContext = undefined;
        _this._generalObjectSchema = new ObjectSchema_1.DigestedObjectSchema();
        _this.registry = new Registry_1.RegistryService(Pointer_1.Pointer, _this);
        _this._registerDefaultObjectSchemas();
        _this._registerDefaultDecorators();
        return _this;
    }
    GlobalContext.prototype._registerDefaultObjectSchemas = function () {
        this
            .extendObjectSchema(Document_1.Document.TYPE, Document_1.Document.SCHEMA)
            .extendObjectSchema(ProtectedDocument_1.ProtectedDocument.TYPE, ProtectedDocument_1.ProtectedDocument.SCHEMA)
            .extendObjectSchema(System_1.PlatformMetadata.TYPE, System_1.PlatformMetadata.SCHEMA)
            .extendObjectSchema(System_1.PlatformInstance.TYPE, System_1.PlatformInstance.SCHEMA)
            .extendObjectSchema(Members_1.AddMemberAction.TYPE, Members_1.AddMemberAction.SCHEMA)
            .extendObjectSchema(Members_1.RemoveMemberAction.TYPE, Members_1.RemoveMemberAction.SCHEMA)
            .extendObjectSchema(LDP_1.Error.TYPE, LDP_1.Error.SCHEMA)
            .extendObjectSchema(LDP_1.Map.TYPE, LDP_1.Map.SCHEMA)
            .extendObjectSchema(LDP_1.MapEntry.SCHEMA)
            .extendObjectSchema(LDP_1.DocumentMetadata.TYPE, LDP_1.DocumentMetadata.SCHEMA)
            .extendObjectSchema(LDP_1.ErrorResponse.TYPE, LDP_1.ErrorResponse.SCHEMA)
            .extendObjectSchema(LDP_1.ResponseMetadata.TYPE, LDP_1.ResponseMetadata.SCHEMA)
            .extendObjectSchema(LDP_1.ValidationError.TYPE, LDP_1.ValidationError.SCHEMA)
            .extendObjectSchema(Auth_1.ACE.TYPE, Auth_1.ACE.SCHEMA)
            .extendObjectSchema(Auth_1.ACL.TYPE, Auth_1.ACL.SCHEMA)
            .extendObjectSchema(Auth_1.AuthenticatedUserInformationAccessor.TYPE, Auth_1.AuthenticatedUserInformationAccessor.SCHEMA)
            .extendObjectSchema(Auth_1.AuthenticatedUserMetadata.TYPE, Auth_1.AuthenticatedUserMetadata.SCHEMA)
            .extendObjectSchema(Auth_1.User.TYPE, Auth_1.User.SCHEMA)
            .extendObjectSchema(Auth_1.TokenCredentials.TYPE, Auth_1.TokenCredentials.SCHEMA)
            .extendObjectSchema(Auth_1.CredentialsSet.TYPE, Auth_1.CredentialsSet.SCHEMA)
            .extendObjectSchema(Auth_1.UsernameAndPasswordCredentials.TYPE, Auth_1.UsernameAndPasswordCredentials.SCHEMA)
            .extendObjectSchema(Auth_1.LDAPCredentials.TYPE, Auth_1.LDAPCredentials.SCHEMA)
            .extendObjectSchema(SHACL_1.ValidationReport.TYPE, SHACL_1.ValidationReport.SCHEMA)
            .extendObjectSchema(SHACL_1.ValidationResult.TYPE, SHACL_1.ValidationResult.SCHEMA)
            .extendObjectSchema(QueryDocument_1.QueryMetadata.TYPE, QueryDocument_1.QueryMetadata.SCHEMA)
            .extendObjectSchema(Messaging_1.AccessPointCreated.TYPE, Messaging_1.AccessPointCreated.SCHEMA)
            .extendObjectSchema(Messaging_1.ChildCreated.TYPE, Messaging_1.ChildCreated.SCHEMA)
            .extendObjectSchema(Messaging_1.DocumentCreatedDetails.TYPE, Messaging_1.DocumentCreatedDetails.SCHEMA)
            .extendObjectSchema(Messaging_1.DocumentDeleted.TYPE, Messaging_1.DocumentDeleted.SCHEMA)
            .extendObjectSchema(Messaging_1.DocumentModified.TYPE, Messaging_1.DocumentModified.SCHEMA)
            .extendObjectSchema(Messaging_1.MemberAdded.TYPE, Messaging_1.MemberAdded.SCHEMA)
            .extendObjectSchema(Messaging_1.MemberAddedDetails.TYPE, Messaging_1.MemberAddedDetails.SCHEMA)
            .extendObjectSchema(Messaging_1.MemberRemoved.TYPE, Messaging_1.MemberRemoved.SCHEMA)
            .extendObjectSchema(Messaging_1.MemberRemovedDetails.TYPE, Messaging_1.MemberRemovedDetails.SCHEMA);
    };
    GlobalContext.prototype._registerDefaultDecorators = function () {
        this.registry.documentDecorators
            .set(ProtectedDocument_1.ProtectedDocument.TYPE, ProtectedDocument_1.ProtectedDocument.decorate)
            .set(Auth_1.ACL.TYPE, Auth_1.ACL.decorate)
            .set(Auth_1.User.TYPE, Auth_1.User.decorate);
    };
    GlobalContext.instance = new GlobalContext();
    return GlobalContext;
}(AbstractContext_1.AbstractContext));
exports.GlobalContext = GlobalContext;


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SHACL_1 = __webpack_require__(66);
var XSD_1 = __webpack_require__(14);
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
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SHACL_1 = __webpack_require__(66);
var XSD_1 = __webpack_require__(14);
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
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(11);
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
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = __webpack_require__(11);
var XSD_1 = __webpack_require__(14);
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


/***/ })
/******/ ]);
});