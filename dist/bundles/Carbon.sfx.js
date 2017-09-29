(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Carbon"] = factory();
	else
		root["Carbon"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 73);
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
    return object instanceof Array;
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
function extend(target) {
    var objects = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        objects[_i - 1] = arguments[_i];
    }
    for (var _a = 0, objects_1 = objects; _a < objects_1.length; _a++) {
        var toMerge = objects_1[_a];
        if (!toMerge)
            continue;
        for (var name_1 in toMerge) {
            if (toMerge.hasOwnProperty(name_1)) {
                target[name_1] = toMerge[name_1];
            }
        }
    }
    return target;
}
exports.extend = extend;
function forEachOwnProperty(object, action) {
    if (!(isObject(object) || isFunction(object)))
        throw new Error("IllegalArgument");
    for (var name_2 in object) {
        if (object.hasOwnProperty(name_2)) {
            if (action(name_2, object[name_2]) === false)
                break;
        }
    }
}
exports.forEachOwnProperty = forEachOwnProperty;
function promiseMethod(fn) {
    return new Promise(function (resolve) { return resolve(fn()); });
}
exports.promiseMethod = promiseMethod;
var A = (function () {
    function A() {
    }
    A.from = function (iterator) {
        var array = [];
        var next = iterator.next();
        while (!next.done) {
            array.push(next.value);
            next = iterator.next();
        }
        return array;
    };
    A.joinWithoutDuplicates = function () {
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
    A.indexOf = function (array, searchedElement, comparator) {
        if (comparator === void 0) { comparator = function (a, b) { return a === b; }; }
        if (!array)
            return -1;
        for (var i = 0, length_2 = array.length; i < length_2; ++i) {
            if (comparator(array[i], searchedElement))
                return i;
        }
        return -1;
    };
    return A;
}());
exports.A = A;
var O = (function () {
    function O() {
    }
    O.extend = function (target, source, config, ignore) {
        if (config === void 0) { config = { arrays: false, objects: false }; }
        if (ignore === void 0) { ignore = {}; }
        if (!isArray(source) && !isPlainObject(source) || !isArray(target) && !isPlainObject(target))
            return null;
        var clone = target;
        source.__CarbonSDK_circularReferenceFlag = clone;
        for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
            var key = _a[_i];
            if (isFunction(source[key]) || key === "__CarbonSDK_circularReferenceFlag")
                continue;
            if (key in ignore)
                continue;
            var property = source[key];
            if (isArray(property) && config.arrays ||
                isPlainObject(property) && config.objects) {
                property = property.__CarbonSDK_circularReferenceFlag || O.clone(property, config);
            }
            clone[key] = property;
        }
        delete source.__CarbonSDK_circularReferenceFlag;
        return clone;
    };
    O.clone = function (object, config, ignore) {
        if (config === void 0) { config = { arrays: false, objects: false }; }
        if (ignore === void 0) { ignore = {}; }
        var isAnArray = isArray(object);
        if (!isAnArray && !isPlainObject(object))
            return null;
        var clone = (isAnArray ? [] : Object.create(Object.getPrototypeOf(object)));
        return O.extend(clone, object, config, ignore);
    };
    O.areEqual = function (object1, object2, config, ignore) {
        if (config === void 0) { config = { arrays: false, objects: false }; }
        if (ignore === void 0) { ignore = {}; }
        return internalAreEqual(object1, object2, config, [object1], [object2], ignore);
    };
    O.shallowUpdate = function (target, source) {
        var keys = A.joinWithoutDuplicates(Object.keys(source), Object.keys(target));
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (hasProperty(source, key)) {
                target[key] = source[key];
            }
            else {
                delete target[key];
            }
        }
        return target;
    };
    O.areShallowlyEqual = function (object1, object2) {
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
    return O;
}());
exports.O = O;
function internalAreEqual(object1, object2, config, stack1, stack2, ignore) {
    if (ignore === void 0) { ignore = {}; }
    if (object1 === object2)
        return true;
    if (!isObject(object1) || !isObject(object2))
        return false;
    if (isDate(object1))
        return object1.getTime() === object2.getTime();
    var keys = A.joinWithoutDuplicates(Object.keys(object1), Object.keys(object2));
    for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
        var key = keys_2[_i];
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
var S = (function () {
    function S() {
    }
    S.startsWith = function (str, substring) {
        return str.lastIndexOf(substring, 0) === 0;
    };
    S.endsWith = function (str, substring) {
        return str.indexOf(substring, str.length - substring.length) !== -1;
    };
    S.contains = function (str, substring) {
        return str.indexOf(substring) !== -1;
    };
    return S;
}());
exports.S = S;
var M = (function () {
    function M() {
    }
    M.from = function (object) {
        var map = new Map();
        forEachOwnProperty(object, function (name, value) {
            map.set(name, value);
        });
        return map;
    };
    M.extend = function (toExtend) {
        var extenders = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            extenders[_i - 1] = arguments[_i];
        }
        for (var i = 0, length_3 = extenders.length; i < length_3; i++) {
            var extender = extenders[i];
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
    return M;
}());
exports.M = M;
var UUID = (function () {
    function UUID() {
    }
    UUID.is = function (uuid) {
        return UUID.regExp.test(uuid);
    };
    UUID.generate = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    UUID.regExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return UUID;
}());
exports.UUID = UUID;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C = __webpack_require__(104);
exports.C = C;
var CP = __webpack_require__(105);
exports.CP = CP;
var CS = __webpack_require__(106);
exports.CS = CS;
var LDP = __webpack_require__(107);
exports.LDP = LDP;
var RDF = __webpack_require__(108);
exports.RDF = RDF;
var SHACL = __webpack_require__(109);
exports.SHACL = SHACL;
var VCARD = __webpack_require__(110);
exports.VCARD = VCARD;
var XSD = __webpack_require__(22);
exports.XSD = XSD;


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
var AbstractError_1 = __webpack_require__(12);
var Resource = __webpack_require__(5);
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        Resource.Factory.createFrom(_this);
        _this.errors = [];
        _this.requestID = null;
        _this.response = response;
        _this.statusCode = response.status;
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return "HTTPError"; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(AbstractError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IDAlreadyInUseError_1 = __webpack_require__(76);
exports.IDAlreadyInUseError = IDAlreadyInUseError_1.default;
var IllegalActionError_1 = __webpack_require__(77);
exports.IllegalActionError = IllegalActionError_1.default;
var IllegalArgumentError_1 = __webpack_require__(21);
exports.IllegalArgumentError = IllegalArgumentError_1.default;
var IllegalStateError_1 = __webpack_require__(78);
exports.IllegalStateError = IllegalStateError_1.default;
var InvalidJSONLDSyntaxError_1 = __webpack_require__(42);
exports.InvalidJSONLDSyntaxError = InvalidJSONLDSyntaxError_1.default;
var NotImplementedError_1 = __webpack_require__(79);
exports.NotImplementedError = NotImplementedError_1.default;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Literal = __webpack_require__(32);
exports.Literal = Literal;
var Document = __webpack_require__(47);
exports.Document = Document;
var List = __webpack_require__(34);
exports.List = List;
var Node = __webpack_require__(33);
exports.Node = Node;
var URI = __webpack_require__(13);
exports.URI = URI;
var Value = __webpack_require__(50);
exports.Value = Value;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Pointer = __webpack_require__(8);
var Utils = __webpack_require__(0);
function addType(type) {
    this.types.push(type);
}
function hasType(type) {
    return this.types.indexOf(type) !== -1;
}
function removeType(type) {
    var index = this.types.indexOf(type);
    if (index !== -1)
        this.types.splice(index, 1);
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return (Utils.hasPropertyDefined(object, "types")
            && Utils.hasFunction(object, "addType")
            && Utils.hasFunction(object, "hasType")
            && Utils.hasFunction(object, "removeType"));
    };
    Factory.is = function (object) {
        return Pointer.Factory.is(object)
            && Factory.hasClassProperties(object);
    };
    Factory.create = function (id, types) {
        if (id === void 0) { id = null; }
        if (types === void 0) { types = null; }
        return Factory.createFrom({}, id, types);
    };
    Factory.createFrom = function (object, id, types) {
        if (id === void 0) { id = null; }
        if (types === void 0) { types = null; }
        var resource = object;
        resource.id = id || resource.id;
        resource.types = types || resource.types;
        return Factory.decorate(resource);
    };
    Factory.decorate = function (object) {
        var resource = object;
        if (Factory.hasClassProperties(object))
            return resource;
        Pointer.Factory.decorate(resource);
        Object.defineProperties(resource, {
            "types": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: resource.types || [],
            },
            "addType": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: addType,
            },
            "hasType": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: hasType,
            },
            "removeType": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: removeType,
            },
        });
        return resource;
    };
    return Factory;
}());
exports.Factory = Factory;
var Util = (function () {
    function Util() {
    }
    Util.hasType = function (resource, type) {
        return Util.getTypes(resource).indexOf(type) !== -1;
    };
    Util.getTypes = function (resource) {
        return resource.types || [];
    };
    return Util;
}());
exports.Util = Util;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var RightSymbol_1 = __webpack_require__(38);
var LeftSymbol_1 = __webpack_require__(66);
var NewLineSymbol_1 = __webpack_require__(16);
var Operator_1 = __webpack_require__(25);
var Identifier_1 = __webpack_require__(15);
exports.VAR_SYMBOL = new LeftSymbol_1.LeftSymbol("?");
exports.PREFIX_SYMBOL = new Operator_1.Operator(":");
exports.OFF_TYPE = new Operator_1.Operator("^^");
exports.LANG_SYMBOL = new Operator_1.Operator("@");
exports.ALL = new RightSymbol_1.RightSymbol("*");
exports.OPEN_IRI = new LeftSymbol_1.LeftSymbol("<");
exports.CLOSE_IRI = new RightSymbol_1.RightSymbol(">");
exports.OPEN_QUOTE = new LeftSymbol_1.LeftSymbol("\"");
exports.CLOSE_QUOTE = new RightSymbol_1.RightSymbol("\"");
exports.GRAPH_PATTERN_SEPARATOR = new NewLineSymbol_1.NewLineSymbol(".");
exports.SAME_SUBJECT_SEPARATOR = new NewLineSymbol_1.NewLineSymbol(";");
exports.SAME_PROPERTY_SEPARATOR = new NewLineSymbol_1.NewLineSymbol(",");
exports.EMPTY_SEPARATOR = new NewLineSymbol_1.NewLineSymbol("");
exports.OPEN_MULTI_BLOCK = new NewLineSymbol_1.NewLineSymbol("{");
exports.CLOSE_MULTI_BLOCK = new NewLineSymbol_1.NewLineSymbol("}");
exports.OPEN_SINGLE_BLOCK = new LeftSymbol_1.LeftSymbol("{");
exports.CLOSE_SINGLE_BLOCK = new RightSymbol_1.RightSymbol("}");
exports.OPEN_MULTI_BN = new NewLineSymbol_1.NewLineSymbol("[");
exports.CLOSE_MULTI_BN = new NewLineSymbol_1.NewLineSymbol("]");
exports.OPEN_SINGLE_BN = new LeftSymbol_1.LeftSymbol("[");
exports.CLOSE_SINGLE_BN = new RightSymbol_1.RightSymbol("]");
exports.OPEN_MULTI_LIST = new NewLineSymbol_1.NewLineSymbol("(");
exports.CLOSE_MULTI_LIST = new NewLineSymbol_1.NewLineSymbol(")");
exports.OPEN_SINGLE_LIST = new LeftSymbol_1.LeftSymbol("(");
exports.CLOSE_SINGLE_LIST = new RightSymbol_1.RightSymbol(")");
exports.BASE = new Identifier_1.Identifier("BASE");
exports.PREFIX = new Identifier_1.Identifier("PREFIX");
exports.SELECT = new Identifier_1.Identifier("SELECT");
exports.FROM = new Identifier_1.Identifier("FROM");
exports.NAMED = new Identifier_1.Identifier("NAMED");
exports.WHERE = new Identifier_1.Identifier("WHERE");
exports.GROUP = new Identifier_1.Identifier("GROUP");
exports.BY = new Identifier_1.Identifier("BY");
exports.HAVING = new Identifier_1.Identifier("HAVING");
exports.ORDER = new Identifier_1.Identifier("ORDER");
exports.LIMIT = new Identifier_1.Identifier("LIMIT");
exports.OFFSET = new Identifier_1.Identifier("OFFSET");
exports.GRAPH = new Identifier_1.Identifier("GRAPH");
exports.OPTIONAL = new Identifier_1.Identifier("OPTIONAL");
exports.UNION = new Identifier_1.Identifier("UNION");
exports.MINUS = new Identifier_1.Identifier("MINUS");
exports.VALUES = new Identifier_1.Identifier("VALUES");
exports.UNDEF = new Identifier_1.Identifier("UNDEF");
exports.DISTINCT = new Identifier_1.Identifier("DISTINCT");
exports.REDUCED = new Identifier_1.Identifier("REDUCED");
exports.SERVICE = new Identifier_1.Identifier("SERVICE");
exports.SILENT = new Identifier_1.Identifier("SILENT");
exports.BIND = new Identifier_1.Identifier("BIND");
exports.AS = new Identifier_1.Identifier("AS");
exports.FILTER = new Identifier_1.Identifier("FILTER");

//# sourceMappingURL=Tokens.js.map


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __webpack_require__(43);
exports.Errors = Errors;
var Header = __webpack_require__(28);
exports.Header = Header;
var JSONParser = __webpack_require__(29);
exports.JSONParser = JSONParser;
var Method_1 = __webpack_require__(44);
exports.Method = Method_1.default;
var Parser = __webpack_require__(102);
exports.Parser = Parser;
var Request = __webpack_require__(103);
exports.Request = Request;
var Response = __webpack_require__(45);
exports.Response = Response;
var StatusCode_1 = __webpack_require__(116);
exports.StatusCode = StatusCode_1.default;
var StringParser = __webpack_require__(117);
exports.StringParser = StringParser;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __webpack_require__(3);
var Utils = __webpack_require__(0);
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return (Utils.hasPropertyDefined(object, "_id") &&
            Utils.hasPropertyDefined(object, "_resolved") &&
            Utils.hasPropertyDefined(object, "id") &&
            Utils.hasFunction(object, "isResolved") &&
            Utils.hasPropertyDefined(object, "resolve"));
    };
    Factory.is = function (value) {
        return (Utils.isObject(value) &&
            Factory.hasClassProperties(value));
    };
    Factory.create = function (id) {
        return Factory.createFrom({}, id);
    };
    Factory.createFrom = function (object, id) {
        var pointer = object;
        pointer.id = id || pointer.id;
        return Factory.decorate(pointer);
    };
    Factory.decorate = function (object) {
        var pointer = object;
        if (Factory.hasClassProperties(object))
            return pointer;
        Object.defineProperties(pointer, {
            "_id": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: pointer.id,
            },
            "_resolved": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: !!pointer._resolved,
            },
            "id": {
                enumerable: false,
                configurable: true,
                get: function () {
                    if (!this._id)
                        return "";
                    return this._id || "";
                },
                set: function (value) {
                    this._id = value;
                },
            },
            "isResolved": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: function () {
                    return this._resolved;
                },
            },
            "resolve": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: function () {
                    return Promise.reject(new Errors.NotImplementedError("A simple pointer cannot be resolved by it self."));
                },
            },
        });
        return pointer;
    };
    return Factory;
}());
exports.Factory = Factory;
var Util = (function () {
    function Util() {
    }
    Util.areEqual = function (pointer1, pointer2) {
        return pointer1.id === pointer2.id;
    };
    Util.getIDs = function (pointers) {
        var ids = [];
        for (var _i = 0, pointers_1 = pointers; _i < pointers_1.length; _i++) {
            var pointer = pointers_1[_i];
            ids.push(pointer.id);
        }
        return ids;
    };
    Util.resolveAll = function (pointers) {
        var promises = pointers.map(function (pointer) { return pointer.resolve(); });
        return Promise
            .all(promises)
            .then(function (results) {
            var resolvedPointers = results.map(function (result) { return result[0]; });
            var responses = results.map(function (result) { return result[1]; });
            return [resolvedPointers, responses];
        });
    };
    return Util;
}());
exports.Util = Util;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __webpack_require__(3);
var NS = __webpack_require__(1);
var RDF = __webpack_require__(4);
var Utils = __webpack_require__(0);
var ContainerType;
(function (ContainerType) {
    ContainerType[ContainerType["SET"] = 0] = "SET";
    ContainerType[ContainerType["LIST"] = 1] = "LIST";
    ContainerType[ContainerType["LANGUAGE"] = 2] = "LANGUAGE";
})(ContainerType = exports.ContainerType || (exports.ContainerType = {}));
var PointerType;
(function (PointerType) {
    PointerType[PointerType["ID"] = 0] = "ID";
    PointerType[PointerType["VOCAB"] = 1] = "VOCAB";
})(PointerType = exports.PointerType || (exports.PointerType = {}));
var DigestedObjectSchema = (function () {
    function DigestedObjectSchema() {
        this.base = "";
        this.vocab = null;
        this.language = null;
        this.prefixes = new Map();
        this.properties = new Map();
        this.prefixedURIs = new Map();
    }
    return DigestedObjectSchema;
}());
exports.DigestedObjectSchema = DigestedObjectSchema;
var DigestedPropertyDefinition = (function () {
    function DigestedPropertyDefinition() {
        this.uri = null;
        this.literal = null;
        this.literalType = null;
        this.pointerType = null;
        this.containerType = null;
    }
    return DigestedPropertyDefinition;
}());
exports.DigestedPropertyDefinition = DigestedPropertyDefinition;
var Digester = (function () {
    function Digester() {
    }
    Digester.digestSchema = function (schemaOrSchemas) {
        if (!Utils.isArray(schemaOrSchemas))
            return Digester.digestSingleSchema(schemaOrSchemas);
        var digestedSchemas = [];
        for (var _i = 0, _a = schemaOrSchemas; _i < _a.length; _i++) {
            var schema = _a[_i];
            digestedSchemas.push(Digester.digestSingleSchema(schema));
        }
        return Digester.combineDigestedObjectSchemas(digestedSchemas);
    };
    Digester.combineDigestedObjectSchemas = function (digestedSchemas) {
        if (digestedSchemas.length === 0)
            throw new Errors.IllegalArgumentError("At least one DigestedObjectSchema needs to be specified.");
        var combinedSchema = new DigestedObjectSchema();
        combinedSchema.vocab = digestedSchemas[0].vocab;
        combinedSchema.base = digestedSchemas[0].base;
        combinedSchema.language = digestedSchemas[0].language;
        for (var _i = 0, digestedSchemas_1 = digestedSchemas; _i < digestedSchemas_1.length; _i++) {
            var digestedSchema = digestedSchemas_1[_i];
            Utils.M.extend(combinedSchema.prefixes, digestedSchema.prefixes);
            Utils.M.extend(combinedSchema.prefixedURIs, digestedSchema.prefixedURIs);
            Utils.M.extend(combinedSchema.properties, digestedSchema.properties);
        }
        Digester.resolvePrefixedURIs(combinedSchema);
        return combinedSchema;
    };
    Digester.resolvePrefixedURI = function (uri, digestedSchema) {
        if (uri === null)
            return null;
        if (!RDF.URI.Util.isPrefixed(uri))
            return uri;
        var _a = uri.split(":"), prefix = _a[0], slug = _a[1];
        if (digestedSchema.prefixes.has(prefix)) {
            uri = digestedSchema.prefixes.get(prefix) + slug;
        }
        return uri;
    };
    Digester._resolvePrefixedURI = function (uri, digestedSchema) {
        if (uri.stringValue === null || !RDF.URI.Util.isPrefixed(uri.stringValue))
            return uri;
        var _a = uri.stringValue.split(":"), prefix = _a[0], slug = _a[1];
        if (digestedSchema.prefixes.has(prefix)) {
            uri.stringValue = digestedSchema.prefixes.get(prefix) + slug;
        }
        else {
            if (!digestedSchema.prefixedURIs.has(prefix))
                digestedSchema.prefixedURIs.set(prefix, []);
            digestedSchema.prefixedURIs.get(prefix).push(uri);
        }
        return uri;
    };
    Digester.digestSingleSchema = function (schema) {
        var digestedSchema = new DigestedObjectSchema();
        for (var _i = 0, _a = ["@base", "@vocab"]; _i < _a.length; _i++) {
            var propertyName = _a[_i];
            if (!(propertyName in schema))
                continue;
            var value = schema[propertyName];
            if (value !== null && !Utils.isString(value))
                throw new Errors.IllegalArgumentError("The value of '" + propertyName + "' must be a string or null.");
            if ((propertyName === "@vocab" && value === "") || !RDF.URI.Util.isAbsolute(value) && !RDF.URI.Util.isBNodeID(value))
                throw new Errors.IllegalArgumentError("The value of '" + propertyName + "' must be an absolute URI" + (propertyName === "@base" ? " or an empty string" : "") + ".");
            digestedSchema[propertyName.substr(1)] = value;
        }
        digestedSchema.base = digestedSchema.base || "";
        if ("@language" in schema) {
            var value = schema["@language"];
            if (value !== null && !Utils.isString(value))
                throw new Errors.InvalidJSONLDSyntaxError("The value of '@language' must be a string or null.");
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
                if (RDF.URI.Util.isPrefixed(propertyName))
                    throw new Errors.IllegalArgumentError("A prefixed property cannot be equal to another URI.");
                var uri = new RDF.URI.Class(propertyValue);
                if (RDF.URI.Util.isPrefixed(uri.stringValue))
                    uri = Digester._resolvePrefixedURI(uri, digestedSchema);
                digestedSchema.prefixes.set(propertyName, uri);
            }
            else if (!!propertyValue && Utils.isObject(propertyValue)) {
                var schemaDefinition = propertyValue;
                var digestedDefinition = new DigestedPropertyDefinition();
                if ("@id" in schemaDefinition) {
                    if (RDF.URI.Util.isPrefixed(propertyName))
                        throw new Errors.IllegalArgumentError("A prefixed property cannot have assigned another URI.");
                    if (!Utils.isString(schemaDefinition["@id"]))
                        throw new Errors.IllegalArgumentError("@id needs to point to a string");
                    digestedDefinition.uri = Digester._resolvePrefixedURI(new RDF.URI.Class(schemaDefinition["@id"]), digestedSchema);
                }
                else if (RDF.URI.Util.isPrefixed(propertyName)) {
                    digestedDefinition.uri = Digester._resolvePrefixedURI(new RDF.URI.Class(propertyName), digestedSchema);
                }
                else if (digestedSchema.vocab !== null) {
                    digestedDefinition.uri = new RDF.URI.Class(digestedSchema.vocab + propertyName);
                }
                if ("@type" in schemaDefinition) {
                    if (!Utils.isString(schemaDefinition["@type"]))
                        throw new Errors.IllegalArgumentError("@type needs to point to a string");
                    if (schemaDefinition["@type"] === "@id" || schemaDefinition["@type"] === "@vocab") {
                        digestedDefinition.literal = false;
                        digestedDefinition.pointerType = (schemaDefinition["@type"] === "@id") ? PointerType.ID : PointerType.VOCAB;
                    }
                    else {
                        digestedDefinition.literal = true;
                        var type = Digester._resolvePrefixedURI(new RDF.URI.Class(schemaDefinition["@type"]), digestedSchema);
                        if (RDF.URI.Util.isRelative(type.stringValue) && type.stringValue in NS.XSD.DataType)
                            type.stringValue = NS.XSD.DataType[type.stringValue];
                        digestedDefinition.literalType = type;
                    }
                }
                if ("@language" in schemaDefinition) {
                    var language = schemaDefinition["@language"];
                    if (language !== null && !Utils.isString(language))
                        throw new Errors.IllegalArgumentError("@language needs to point to a string or null.");
                    digestedDefinition.language = language;
                }
                if ("@container" in schemaDefinition) {
                    switch (schemaDefinition["@container"]) {
                        case "@set":
                            digestedDefinition.containerType = ContainerType.SET;
                            break;
                        case "@list":
                            digestedDefinition.containerType = ContainerType.LIST;
                            break;
                        case "@language":
                            if (Utils.isString(digestedDefinition.language))
                                throw new Errors.IllegalArgumentError("@container cannot be set to @language when the property definition already contains an @language tag.");
                            digestedDefinition.containerType = ContainerType.LANGUAGE;
                            break;
                        default:
                            throw new Errors.IllegalArgumentError("@container needs to be equal to '@list', '@set', or '@language'");
                    }
                }
                digestedSchema.properties.set(propertyName, digestedDefinition);
            }
            else {
                throw new Errors.IllegalArgumentError("ObjectSchema Properties can only have string values or object values.");
            }
        }
        Digester.resolvePrefixedURIs(digestedSchema);
        return digestedSchema;
    };
    Digester.resolvePrefixedURIs = function (digestedSchema) {
        digestedSchema.prefixes.forEach(function (prefixValue, prefixName) {
            if (!digestedSchema.prefixedURIs.has(prefixName))
                return;
            var prefixedURIs = digestedSchema.prefixedURIs.get(prefixName);
            for (var _i = 0, prefixedURIs_1 = prefixedURIs; _i < prefixedURIs_1.length; _i++) {
                var prefixedURI = prefixedURIs_1[_i];
                Digester._resolvePrefixedURI(prefixedURI, digestedSchema);
            }
            digestedSchema.prefixedURIs.delete(prefixName);
        });
        return digestedSchema;
    };
    return Digester;
}());
exports.Digester = Digester;
var Util = (function () {
    function Util() {
    }
    Util.resolveURI = function (uri, schema) {
        if (RDF.URI.Util.isAbsolute(uri))
            return uri;
        if (RDF.URI.Util.isPrefixed(uri)) {
            uri = Digester.resolvePrefixedURI(uri, schema);
        }
        else if (schema.vocab !== null) {
            uri = schema.vocab + uri;
        }
        return uri;
    };
    return Util;
}());
exports.Util = Util;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BlankNode = __webpack_require__(119);
var Errors = __webpack_require__(3);
var Converter_1 = __webpack_require__(31);
var NamedFragment = __webpack_require__(52);
var NS = __webpack_require__(1);
var ObjectSchema = __webpack_require__(9);
var Pointer = __webpack_require__(8);
var RDF = __webpack_require__(4);
var Resource = __webpack_require__(5);
var Utils = __webpack_require__(0);
exports.RDF_CLASS = NS.C.Class.Document;
exports.SCHEMA = {
    "contains": {
        "@id": NS.LDP.Predicate.contains,
        "@container": "@set",
        "@type": "@id",
    },
    "members": {
        "@id": NS.LDP.Predicate.member,
        "@container": "@set",
        "@type": "@id",
    },
    "membershipResource": {
        "@id": NS.LDP.Predicate.membershipResource,
        "@type": "@id",
    },
    "isMemberOfRelation": {
        "@id": NS.LDP.Predicate.isMemberOfRelation,
        "@type": "@id",
    },
    "hasMemberRelation": {
        "@id": NS.LDP.Predicate.hasMemberRelation,
        "@type": "@id",
    },
    "insertedContentRelation": {
        "@id": NS.LDP.Predicate.insertedContentRelation,
        "@type": "@id",
    },
    "created": {
        "@id": NS.C.Predicate.created,
        "@type": NS.XSD.DataType.dateTime,
    },
    "modified": {
        "@id": NS.C.Predicate.modified,
        "@type": NS.XSD.DataType.dateTime,
    },
    "defaultInteractionModel": {
        "@id": NS.C.Predicate.defaultInteractionModel,
        "@type": "@id",
    },
    "accessPoints": {
        "@id": NS.C.Predicate.accessPoint,
        "@type": "@id",
        "@container": "@set",
    },
};
function hasPointer(id) {
    var document = this;
    if (id === document.id)
        return true;
    if (!document.inScope(id))
        return false;
    return document.hasFragment(id);
}
function getPointer(id) {
    var document = this;
    if (!document.inScope(id))
        return null;
    if (id === document.id)
        return document;
    var fragment = document.getFragment(id);
    fragment = !fragment ? document.createFragment(id) : fragment;
    return fragment;
}
function inScope(idOrPointer) {
    var document = this;
    var id = Pointer.Factory.is(idOrPointer) ? idOrPointer.id : idOrPointer;
    if (id === document.id)
        return true;
    if (RDF.URI.Util.isBNodeID(id))
        return true;
    if (RDF.URI.Util.isFragmentOf(id, document.id))
        return true;
    return RDF.URI.Util.isFragmentOf(id, "");
}
function hasFragment(id) {
    var document = this;
    if (RDF.URI.Util.isAbsolute(id)) {
        if (!RDF.URI.Util.isFragmentOf(id, document.id))
            return false;
        id = RDF.URI.Util.hasFragment(id) ? RDF.URI.Util.getFragment(id) : id;
    }
    else if (Utils.S.startsWith(id, "#"))
        id = id.substring(1);
    return document._fragmentsIndex.has(id);
}
function getFragment(id) {
    var document = this;
    if (!RDF.URI.Util.isBNodeID(id))
        return document.getNamedFragment(id);
    return document._fragmentsIndex.get(id) || null;
}
function getNamedFragment(id) {
    var document = this;
    if (RDF.URI.Util.isBNodeID(id))
        throw new Errors.IllegalArgumentError("Named fragments can't have a id that starts with '_:'.");
    if (RDF.URI.Util.isAbsolute(id)) {
        if (!RDF.URI.Util.isFragmentOf(id, document.id))
            throw new Errors.IllegalArgumentError("The id is out of scope.");
        id = RDF.URI.Util.hasFragment(id) ? RDF.URI.Util.getFragment(id) : id;
    }
    else if (Utils.S.startsWith(id, "#"))
        id = id.substring(1);
    return document._fragmentsIndex.get(id) || null;
}
function getFragments() {
    var document = this;
    return Utils.A.from(document._fragmentsIndex.values());
}
function createFragment(slugOrObject, slug) {
    var document = this;
    slug = Utils.isString(slugOrObject) ? slugOrObject : slug;
    var object = !Utils.isString(slugOrObject) && !!slugOrObject ? slugOrObject : {};
    if (slug) {
        if (!RDF.URI.Util.isBNodeID(slug))
            return document.createNamedFragment(object, slug);
        if (this._fragmentsIndex.has(slug))
            throw new Errors.IDAlreadyInUseError("The slug provided is already being used by a fragment.");
    }
    var fragment = BlankNode.Factory.createFrom(object, slug, document);
    document._fragmentsIndex.set(fragment.id, fragment);
    convertNestedObjects(document, fragment);
    return fragment;
}
function createNamedFragment(slugOrObject, slug) {
    var document = this;
    slug = Utils.isString(slugOrObject) ? slugOrObject : slug;
    var object = !Utils.isString(slugOrObject) && !!slugOrObject ? slugOrObject : {};
    if (RDF.URI.Util.isBNodeID(slug))
        throw new Errors.IllegalArgumentError("Named fragments can't have a slug that starts with '_:'.");
    if (RDF.URI.Util.isAbsolute(slug)) {
        if (!RDF.URI.Util.isFragmentOf(slug, document.id))
            throw new Errors.IllegalArgumentError("The slug is out of scope.");
        slug = RDF.URI.Util.hasFragment(slug) ? RDF.URI.Util.getFragment(slug) : slug;
    }
    else if (Utils.S.startsWith(slug, "#"))
        slug = slug.substring(1);
    if (document._fragmentsIndex.has(slug))
        throw new Errors.IDAlreadyInUseError("The slug provided is already being used by a fragment.");
    var fragment = NamedFragment.Factory.createFrom(object, slug, document);
    document._fragmentsIndex.set(slug, fragment);
    convertNestedObjects(document, fragment);
    return fragment;
}
function removeFragment(fragmentOrSlug) {
    var id = Utils.isString(fragmentOrSlug) ? fragmentOrSlug : fragmentOrSlug.id;
    if (RDF.URI.Util.isAbsolute(id)) {
        if (!RDF.URI.Util.isFragmentOf(id, this.id))
            return;
        id = RDF.URI.Util.hasFragment(id) ? RDF.URI.Util.getFragment(id) : id;
    }
    else if (Utils.S.startsWith(id, "#"))
        id = id.substring(1);
    this._fragmentsIndex.delete(id);
}
function removeNamedFragment(fragmentOrSlug) {
    var id = Utils.isString(fragmentOrSlug) ? fragmentOrSlug : fragmentOrSlug.id;
    if (RDF.URI.Util.isBNodeID(id))
        throw new Errors.IllegalArgumentError("You can only remove NamedFragments.");
    this._removeFragment(id);
}
function toJSON(objectSchemaResolver, jsonldConverter) {
    if (objectSchemaResolver === void 0) { objectSchemaResolver = null; }
    if (jsonldConverter === void 0) { jsonldConverter = null; }
    var generalSchema = objectSchemaResolver ? objectSchemaResolver.getGeneralSchema() : new ObjectSchema.DigestedObjectSchema();
    jsonldConverter = !!jsonldConverter ? jsonldConverter : new Converter_1.default();
    var resources = [];
    resources.push(this);
    resources = resources.concat(this.getFragments());
    var expandedResources = [];
    for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
        var resource = resources_1[_i];
        var resourceSchema = objectSchemaResolver ? objectSchemaResolver.getSchemaFor(resource) : new ObjectSchema.DigestedObjectSchema();
        expandedResources.push(jsonldConverter.expand(resource, generalSchema, resourceSchema));
    }
    var graph = {
        "@id": this.id,
        "@graph": expandedResources,
    };
    return JSON.stringify(graph);
}
function normalize() {
    var _this = this;
    var currentFragments = this.getFragments().filter(function (fragment) { return RDF.URI.Util.isBNodeID(fragment.id); });
    var usedFragmentsIDs = new Set();
    convertNestedObjects(this, this, usedFragmentsIDs);
    currentFragments.forEach(function (fragment) {
        if (!usedFragmentsIDs.has(fragment.id)) {
            _this._fragmentsIndex.delete(fragment.id);
        }
    });
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (documentResource) {
        return (Utils.isObject(documentResource) &&
            Utils.hasPropertyDefined(documentResource, "_fragmentsIndex") &&
            Utils.hasFunction(documentResource, "_normalize") &&
            Utils.hasFunction(documentResource, "_removeFragment") &&
            Utils.hasFunction(documentResource, "hasFragment") &&
            Utils.hasFunction(documentResource, "getFragment") &&
            Utils.hasFunction(documentResource, "getNamedFragment") &&
            Utils.hasFunction(documentResource, "getFragments") &&
            Utils.hasFunction(documentResource, "createFragment") &&
            Utils.hasFunction(documentResource, "createNamedFragment") &&
            Utils.hasFunction(documentResource, "removeNamedFragment") &&
            Utils.hasFunction(documentResource, "toJSON"));
    };
    Factory.is = function (object) {
        return (Resource.Factory.is(object) &&
            Factory.hasClassProperties(object));
    };
    Factory.create = function () {
        return Factory.createFrom({});
    };
    Factory.createFrom = function (object) {
        if (Factory.is(object))
            throw new Errors.IllegalArgumentError("The object provided is already a Document");
        var resource = object;
        if (!Resource.Factory.is(object))
            resource = Resource.Factory.createFrom(object);
        var document = Factory.decorate(resource);
        convertNestedObjects(document, document);
        return document;
    };
    Factory.decorate = function (object) {
        Resource.Factory.decorate(object);
        if (Factory.hasClassProperties(object))
            return object;
        Object.defineProperties(object, {
            "_fragmentsIndex": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: new Map(),
            },
            "_normalize": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: normalize,
            },
            "_removeFragment": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: removeFragment,
            },
            "hasPointer": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: hasPointer,
            },
            "getPointer": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: getPointer,
            },
            "inScope": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: inScope,
            },
            "hasFragment": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: hasFragment,
            },
            "getFragment": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: getFragment,
            },
            "getNamedFragment": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: getNamedFragment,
            },
            "getFragments": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: getFragments,
            },
            "createFragment": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: createFragment,
            },
            "createNamedFragment": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: createNamedFragment,
            },
            "removeNamedFragment": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: removeNamedFragment,
            },
            "toJSON": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: toJSON,
            },
        });
        return object;
    };
    return Factory;
}());
exports.Factory = Factory;
function convertNestedObjects(parent, actual, fragmentsTracker) {
    if (fragmentsTracker === void 0) { fragmentsTracker = new Set(); }
    var next;
    var idOrSlug;
    var fragment;
    var keys = Object.keys(actual);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        next = actual[key];
        if (Utils.isArray(next)) {
            convertNestedObjects(parent, next, fragmentsTracker);
            continue;
        }
        if (!Utils.isPlainObject(next))
            continue;
        if (Pointer.Factory.is(next)) {
            if (parent.hasFragment(next.id) && !fragmentsTracker.has(next.id)) {
                fragmentsTracker.add(next.id);
                convertNestedObjects(parent, next, fragmentsTracker);
            }
            continue;
        }
        idOrSlug = ("id" in next) ? next.id : (("slug" in next) ? RDF.URI.Util.hasFragment(next.slug) ? next.slug : "#" + next.slug : "");
        if (!!idOrSlug && !parent.inScope(idOrSlug))
            continue;
        var parentFragment = parent.getFragment(idOrSlug);
        if (!parentFragment) {
            fragment = parent.createFragment(next, idOrSlug);
            convertNestedObjects(parent, fragment, fragmentsTracker);
        }
        else if (parentFragment !== next) {
            Object.assign(parentFragment, next);
            fragment = actual[key] = parentFragment;
            convertNestedObjects(parent, fragment, fragmentsTracker);
        }
    }
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
        var separator = exports.SPACE_SEPARATOR;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Token;

//# sourceMappingURL=Token.js.map


/***/ }),
/* 12 */
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
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        if ("captureStackTrace" in Error)
            Error.captureStackTrace(_this, _this.constructor);
        _this.message = message;
        return _this;
    }
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return "AbstractError"; },
        enumerable: true,
        configurable: true
    });
    Class.prototype.toString = function () {
        return this.name + ": " + this.message;
    };
    return Class;
}(Error));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __webpack_require__(3);
var Utils = __webpack_require__(0);
var Class = (function () {
    function Class(stringValue) {
        this.stringValue = stringValue;
    }
    Class.prototype.toString = function () {
        return this.stringValue;
    };
    return Class;
}());
exports.Class = Class;
var Util = (function () {
    function Util() {
    }
    Util.hasFragment = function (uri) {
        return uri.indexOf("#") !== -1;
    };
    Util.hasQuery = function (uri) {
        return uri.indexOf("?") !== -1;
    };
    Util.hasProtocol = function (uri) {
        return Utils.S.startsWith(uri, "https://") || Utils.S.startsWith(uri, "http://");
    };
    Util.isAbsolute = function (uri) {
        return Utils.S.startsWith(uri, "http://")
            || Utils.S.startsWith(uri, "https://")
            || Utils.S.startsWith(uri, "://");
    };
    Util.isRelative = function (uri) {
        return !Util.isAbsolute(uri);
    };
    Util.isBNodeID = function (uri) {
        return Utils.S.startsWith(uri, "_:");
    };
    Util.generateBNodeID = function () {
        return "_:" + Utils.UUID.generate();
    };
    Util.isPrefixed = function (uri) {
        return !Util.isAbsolute(uri) && !Util.isBNodeID(uri) && Utils.S.contains(uri, ":");
    };
    Util.isFragmentOf = function (fragmentURI, uri) {
        if (!Util.hasFragment(fragmentURI))
            return false;
        return Util.getDocumentURI(fragmentURI) === uri;
    };
    Util.isBaseOf = function (baseURI, uri) {
        if (baseURI === uri)
            return true;
        if (baseURI === "")
            return true;
        if (Util.isRelative(uri) && !Util.isPrefixed(uri))
            return true;
        if (uri.startsWith(baseURI)) {
            if (Utils.S.endsWith(baseURI, "/") || Utils.S.endsWith(baseURI, "#"))
                return true;
            var relativeURI = uri.substring(baseURI.length);
            if (Utils.S.startsWith(relativeURI, "/") || Utils.S.startsWith(relativeURI, "#"))
                return true;
        }
        return false;
    };
    Util.getRelativeURI = function (absoluteURI, base) {
        if (!absoluteURI.startsWith(base))
            return absoluteURI;
        return absoluteURI.substring(base.length);
    };
    Util.getDocumentURI = function (uri) {
        var parts = uri.split("#");
        if (parts.length > 2)
            throw new Error("IllegalArgument: The URI provided has more than one # sign.");
        return parts[0];
    };
    Util.getFragment = function (uri) {
        var parts = uri.split("#");
        if (parts.length < 2)
            return null;
        if (parts.length > 2)
            throw new Error("IllegalArgument: The URI provided has more than one # sign.");
        return parts[1];
    };
    Util.getSlug = function (uri) {
        var uriParts = uri.split("#");
        if (uriParts.length === 2)
            return Util.getSlug(uriParts[1]);
        if (uriParts.length > 2)
            throw new Errors.IllegalArgumentError("Invalid URI: The uri contains two '#' symbols.");
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
    };
    Util.getParameters = function (uri) {
        var parameters = new Map();
        if (!Util.hasQuery(uri))
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
    };
    Util.resolve = function (parentURI, childURI) {
        if (!parentURI || Util.isAbsolute(childURI) || Util.isBNodeID(childURI) || Util.isPrefixed(childURI))
            return childURI;
        var protocol = parentURI.substr(0, parentURI.indexOf("://") + 3);
        var path = parentURI.substr(parentURI.indexOf("://") + 3, parentURI.length - 1);
        if (path.lastIndexOf("/") === -1)
            path += "/";
        if (Utils.S.startsWith(childURI, "?") || Utils.S.startsWith(childURI, "#")) {
            if (Util.hasQuery(path))
                path = path.substr(0, path.indexOf("?"));
            if (Util.hasFragment(path) && (!Utils.S.startsWith(childURI, "?") || Utils.S.endsWith(path, "#")))
                path = Util.getDocumentURI(path);
        }
        else {
            path = path.substr(0, path.lastIndexOf("/") + 1);
            if (!Utils.S.endsWith(path, "?") && !Utils.S.endsWith(path, "#") && !Utils.S.endsWith(path, "/"))
                path += "/";
        }
        if (Utils.S.startsWith(childURI, "/")) {
            childURI = childURI.substr(1, childURI.length);
        }
        return protocol + path + childURI;
    };
    Util.removeProtocol = function (uri) {
        if (Utils.S.startsWith(uri, "https://"))
            return uri.substr(5, uri.length);
        if (Utils.S.startsWith(uri, "http://"))
            return uri.substr(4, uri.length);
        return uri;
    };
    Util.prefix = function (uri, prefixOrObjectSchema, prefixURI) {
        if (prefixURI === void 0) { prefixURI = null; }
        var objectSchema = !Utils.isString(prefixOrObjectSchema) ? prefixOrObjectSchema : null;
        var prefix = Utils.isString(prefixOrObjectSchema) ? prefixOrObjectSchema : null;
        if (objectSchema !== null)
            return prefixWithObjectSchema(uri, objectSchema);
        if (Util.isPrefixed(uri) || !uri.startsWith(prefixURI))
            return uri;
        return prefix + ":" + uri.substring(prefixURI.length);
    };
    return Util;
}());
exports.Util = Util;
function prefixWithObjectSchema(uri, objectSchema) {
    var prefixEntries = objectSchema.prefixes.entries();
    while (true) {
        var result = prefixEntries.next();
        if (result.done)
            return uri;
        var _a = result.value, prefix = _a[0], prefixURI = _a[1];
        if (!Util.isAbsolute(prefixURI.toString()))
            continue;
        if (!uri.startsWith(prefixURI.toString()))
            continue;
        return Util.prefix(uri, prefix, prefixURI.toString());
    }
}
exports.default = Class;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Token_1 = __webpack_require__(11);
var Identifier_1 = __webpack_require__(15);
var Operator_1 = __webpack_require__(25);
var RightSymbol_1 = __webpack_require__(38);
var NewLineSymbol_1 = __webpack_require__(16);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StringLiteral;

//# sourceMappingURL=StringLiteral.js.map


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Token_1 = __webpack_require__(11);
var StringLiteral_1 = __webpack_require__(14);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Identifier;

//# sourceMappingURL=Identifier.js.map


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Token_1 = __webpack_require__(11);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NewLineSymbol;

//# sourceMappingURL=NewLineSymbol.js.map


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Converter = __webpack_require__(31);
exports.Converter = Converter;
var Parser = __webpack_require__(48);
exports.Parser = Parser;
var Processor = __webpack_require__(49);
exports.Processor = Processor;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AddMemberAction = __webpack_require__(118);
exports.AddMemberAction = AddMemberAction;
var DirectContainer = __webpack_require__(120);
exports.DirectContainer = DirectContainer;
var DocumentMetadata = __webpack_require__(121);
exports.DocumentMetadata = DocumentMetadata;
var Entry = __webpack_require__(122);
exports.Entry = Entry;
var Error = __webpack_require__(123);
exports.Error = Error;
var ErrorResponse = __webpack_require__(46);
exports.ErrorResponse = ErrorResponse;
var IndirectContainer = __webpack_require__(124);
exports.IndirectContainer = IndirectContainer;
var Map = __webpack_require__(125);
exports.Map = Map;
var RemoveMemberAction = __webpack_require__(126);
exports.RemoveMemberAction = RemoveMemberAction;
var ResponseMetadata = __webpack_require__(127);
exports.ResponseMetadata = ResponseMetadata;
var ValidationError = __webpack_require__(128);
exports.ValidationError = ValidationError;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ACE = __webpack_require__(54);
exports.ACE = ACE;
var ACL = __webpack_require__(55);
exports.ACL = ACL;
var BasicAuthenticator_1 = __webpack_require__(56);
exports.BasicAuthenticator = BasicAuthenticator_1.default;
var Credentials = __webpack_require__(57);
exports.Credentials = Credentials;
var PersistedACE = __webpack_require__(130);
exports.PersistedACE = PersistedACE;
var PersistedACL = __webpack_require__(131);
exports.PersistedACL = PersistedACL;
var PersistedCredentials = __webpack_require__(58);
exports.PersistedCredentials = PersistedCredentials;
var PersistedRole = __webpack_require__(60);
exports.PersistedRole = PersistedRole;
var PersistedUser = __webpack_require__(37);
exports.PersistedUser = PersistedUser;
var Role = __webpack_require__(132);
exports.Role = Role;
var Roles = __webpack_require__(133);
exports.Roles = Roles;
var Ticket = __webpack_require__(134);
exports.Ticket = Ticket;
var Token = __webpack_require__(61);
exports.Token = Token;
var TokenAuthenticator_1 = __webpack_require__(135);
exports.TokenAuthenticator = TokenAuthenticator_1.default;
var User = __webpack_require__(136);
exports.User = User;
var UsernameAndPasswordToken_1 = __webpack_require__(62);
exports.UsernameAndPasswordToken = UsernameAndPasswordToken_1.default;
var Users = __webpack_require__(137);
exports.Users = Users;
var Errors = __webpack_require__(3);
var FreeResources = __webpack_require__(30);
var HTTP = __webpack_require__(7);
var JSONLD = __webpack_require__(17);
var NS = __webpack_require__(1);
var RDF = __webpack_require__(4);
var Resource = __webpack_require__(5);
var Utils = __webpack_require__(0);
var Method;
(function (Method) {
    Method[Method["BASIC"] = 0] = "BASIC";
    Method[Method["TOKEN"] = 1] = "TOKEN";
})(Method = exports.Method || (exports.Method = {}));
var Class = (function () {
    function Class(context) {
        this.roles = new Roles.Class(this.context);
        this.users = new Users.Class(this.context);
        this.context = context;
        this.authenticators = [];
        this.authenticators[Method.BASIC] = new BasicAuthenticator_1.default();
        this.authenticators[Method.TOKEN] = new TokenAuthenticator_1.default(this.context);
    }
    Object.defineProperty(Class.prototype, "authenticatedUser", {
        get: function () {
            if (!this._authenticatedUser) {
                if (this.context.parentContext && this.context.parentContext.auth)
                    return this.context.parentContext.auth.authenticatedUser;
                return null;
            }
            return this._authenticatedUser;
        },
        enumerable: true,
        configurable: true
    });
    Class.prototype.isAuthenticated = function (askParent) {
        if (askParent === void 0) { askParent = true; }
        return ((this.authenticator && this.authenticator.isAuthenticated()) ||
            (askParent && !!this.context.parentContext && !!this.context.parentContext.auth && this.context.parentContext.auth.isAuthenticated()));
    };
    Class.prototype.authenticate = function (username, password) {
        return this.authenticateUsing("TOKEN", username, password);
    };
    Class.prototype.authenticateUsing = function (method, userOrTokenOrCredentials, password) {
        switch (method) {
            case "BASIC":
                return this.authenticateWithBasic(userOrTokenOrCredentials, password);
            case "TOKEN":
                return this.authenticateWithToken(userOrTokenOrCredentials, password);
            default:
                return Promise.reject(new Errors.IllegalArgumentError("No exists the authentication method '" + method + "'"));
        }
    };
    Class.prototype.addAuthentication = function (requestOptions) {
        if (this.isAuthenticated(false)) {
            this.authenticator.addAuthentication(requestOptions);
        }
        else if (!!this.context.parentContext && !!this.context.parentContext.auth) {
            this.context.parentContext.auth.addAuthentication(requestOptions);
        }
        else {
            console.warn("There is no authentication to add to the request.");
        }
    };
    Class.prototype.clearAuthentication = function () {
        if (!this.authenticator)
            return;
        this.authenticator.clearAuthentication();
        this.authenticator = null;
        this._authenticatedUser = null;
    };
    Class.prototype.createTicket = function (uri, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var resourceURI = this.context.resolve(uri);
        var freeResources = FreeResources.Factory.create(this.context.documents);
        Ticket.Factory.createFrom(freeResources.createResource(), resourceURI);
        if (this.isAuthenticated())
            this.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.RDFSource, requestOptions);
        return Promise.resolve().then(function () {
            var containerURI = _this.context.resolveSystemURI(Ticket.TICKETS_CONTAINER);
            return HTTP.Request.Service.post(containerURI, freeResources.toJSON(), requestOptions, new JSONLD.Parser.Class());
        }).then(function (_a) {
            var expandedResult = _a[0], response = _a[1];
            var freeNodes = RDF.Node.Util.getFreeNodes(expandedResult);
            var ticketNodes = freeNodes.filter(function (freeNode) { return RDF.Node.Util.hasType(freeNode, Ticket.RDF_CLASS); });
            if (ticketNodes.length === 0)
                throw new HTTP.Errors.BadResponseError("No " + Ticket.RDF_CLASS + " was returned.", response);
            if (ticketNodes.length > 1)
                throw new HTTP.Errors.BadResponseError("Multiple " + Ticket.RDF_CLASS + " were returned.", response);
            var expandedTicket = ticketNodes[0];
            var ticket = Resource.Factory.create();
            var digestedSchema = _this.context.documents.getSchemaFor(expandedTicket);
            _this.context.documents.jsonldConverter.compact(expandedTicket, ticket, digestedSchema, _this.context.documents);
            return [ticket, response];
        });
    };
    Class.prototype.getAuthenticatedURL = function (uri, requestOptions) {
        var resourceURI = this.context.resolve(uri);
        return this.createTicket(resourceURI, requestOptions).then(function (_a) {
            var ticket = _a[0], response = _a[1];
            resourceURI += RDF.URI.Util.hasQuery(resourceURI) ? "&" : "?";
            resourceURI += "ticket=" + ticket.ticketKey;
            return resourceURI;
        });
    };
    Class.prototype.authenticateWithBasic = function (username, password) {
        var _this = this;
        var authenticator = this.authenticators[Method.BASIC];
        var authenticationToken;
        authenticationToken = new UsernameAndPasswordToken_1.default(username, password);
        this.clearAuthentication();
        var credentials;
        return authenticator.authenticate(authenticationToken).then(function (_credentials) {
            credentials = _credentials;
            return _this.getAuthenticatedUser(authenticator);
        }).then(function (persistedUser) {
            _this._authenticatedUser = persistedUser;
            _this.authenticator = authenticator;
            return credentials;
        });
    };
    Class.prototype.authenticateWithToken = function (userOrTokenOrCredentials, password) {
        var _this = this;
        var authenticator = this.authenticators[Method.TOKEN];
        var credentials = null;
        var authenticationToken = null;
        if (Utils.isString(userOrTokenOrCredentials) && Utils.isString(password)) {
            authenticationToken = new UsernameAndPasswordToken_1.default(userOrTokenOrCredentials, password);
        }
        else if (Token.Factory.hasRequiredValues(userOrTokenOrCredentials)) {
            credentials = userOrTokenOrCredentials;
        }
        else {
            return Promise.reject(new Errors.IllegalArgumentError("Parameters do not match with the authentication request."));
        }
        this.clearAuthentication();
        return authenticator.authenticate((authenticationToken) ? authenticationToken : credentials).then(function (_credentials) {
            credentials = _credentials;
            if (PersistedUser.Factory.is(credentials.user))
                return credentials.user;
            return _this.getAuthenticatedUser(authenticator);
        }).then(function (persistedUser) {
            _this._authenticatedUser = persistedUser;
            credentials.user = persistedUser;
            _this.authenticator = authenticator;
            return credentials;
        });
    };
    Class.prototype.getAuthenticatedUser = function (authenticator) {
        var requestOptions = {};
        authenticator.addAuthentication(requestOptions);
        return this.context.documents.get("users/me/", requestOptions).then(function (_a) {
            var userDocument = _a[0], response = _a[1];
            return userDocument;
        });
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HTTP = __webpack_require__(7);
var Auth = __webpack_require__(19);
var NS = __webpack_require__(1);
var PersistedDocument = __webpack_require__(23);
var Resource = __webpack_require__(5);
var Utils = __webpack_require__(0);
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.isObject(object)
            && Utils.hasFunction(object, "getACL");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && PersistedDocument.Factory.is(object);
    };
    Factory.decorate = function (document, documents) {
        var persistedProtectedDocument = document;
        if (Factory.hasClassProperties(document))
            return persistedProtectedDocument;
        PersistedDocument.Factory.decorate(document, documents);
        Object.defineProperties(persistedProtectedDocument, {
            "getACL": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: getACL,
            },
        });
        return persistedProtectedDocument;
    };
    return Factory;
}());
exports.Factory = Factory;
function getACL(requestOptions) {
    var protectedDocument = this;
    var aclPromise;
    if (protectedDocument.isResolved()) {
        aclPromise = Promise.resolve(protectedDocument.accessControlList);
    }
    else {
        aclPromise = protectedDocument.executeSELECTQuery("SELECT ?acl WHERE {\n\t\t\t<" + protectedDocument.id + "> <" + NS.CS.Predicate.accessControlList + "> ?acl.\n\t\t}").then(function (_a) {
            var results = _a[0];
            return results.bindings[0].acl;
        });
    }
    return aclPromise.then(function (acl) {
        return protectedDocument._documents.get(acl.id, requestOptions);
    }).then(function (_a) {
        var acl = _a[0], response = _a[1];
        if (!Resource.Util.hasType(acl, Auth.ACL.RDF_CLASS))
            throw new HTTP.Errors.BadResponseError("The response does not contains a " + Auth.ACL.RDF_CLASS + " object.", response);
        return [acl, response];
    });
}


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
var AbstractError_1 = __webpack_require__(12);
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return "IllegalArgumentError"; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(AbstractError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils = __webpack_require__(0);
exports.namespace = "http://www.w3.org/2001/XMLSchema#";
var DataType = (function () {
    function DataType() {
    }
    DataType.date = exports.namespace + "date";
    DataType.dateTime = exports.namespace + "dateTime";
    DataType.duration = exports.namespace + "duration";
    DataType.gDay = exports.namespace + "gDay";
    DataType.gMonth = exports.namespace + "gMonth";
    DataType.gMonthDay = exports.namespace + "gMonthDay";
    DataType.gYear = exports.namespace + "gYear";
    DataType.gYearMonth = exports.namespace + "gYearMonth";
    DataType.time = exports.namespace + "time";
    DataType.byte = exports.namespace + "byte";
    DataType.decimal = exports.namespace + "decimal";
    DataType.int = exports.namespace + "int";
    DataType.integer = exports.namespace + "integer";
    DataType.long = exports.namespace + "long";
    DataType.negativeInteger = exports.namespace + "negativeInteger";
    DataType.nonNegativeInteger = exports.namespace + "nonNegativeInteger";
    DataType.nonPositiveInteger = exports.namespace + "nonPositiveInteger";
    DataType.positiveInteger = exports.namespace + "positiveInteger";
    DataType.short = exports.namespace + "short";
    DataType.unsignedLong = exports.namespace + "unsignedLong";
    DataType.unsignedInt = exports.namespace + "unsignedInt";
    DataType.unsignedShort = exports.namespace + "unsignedShort";
    DataType.unsignedByte = exports.namespace + "unsignedByte";
    DataType.double = exports.namespace + "double";
    DataType.float = exports.namespace + "float";
    DataType.boolean = exports.namespace + "boolean";
    DataType.string = exports.namespace + "string";
    DataType.object = exports.namespace + "object";
    return DataType;
}());
exports.DataType = DataType;
Utils.forEachOwnProperty(DataType, function (key, value) {
    DataType[value] = key;
});


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Document = __webpack_require__(10);
var HTTP = __webpack_require__(7);
var ObjectSchema = __webpack_require__(9);
var PersistedResource = __webpack_require__(36);
var PersistedFragment = __webpack_require__(24);
var PersistedNamedFragment = __webpack_require__(59);
var Pointer = __webpack_require__(8);
var RDF = __webpack_require__(4);
var Utils = __webpack_require__(0);
var URI = __webpack_require__(13);
function extendIsDirty(superFunction) {
    return function () {
        var isDirty = superFunction.call(this);
        if (isDirty)
            return true;
        var document = this;
        for (var _i = 0, _a = document.getFragments(); _i < _a.length; _i++) {
            var fragment = _a[_i];
            if (fragment.isDirty())
                return true;
        }
        for (var _b = 0, _c = document._savedFragments; _b < _c.length; _b++) {
            var fragment = _c[_b];
            if (!document.hasFragment(fragment.id))
                return true;
        }
        return false;
    };
}
function extendRevert(superFunction) {
    return function () {
        var persistedDocument = this;
        persistedDocument._fragmentsIndex.clear();
        for (var _i = 0, _a = persistedDocument._savedFragments; _i < _a.length; _i++) {
            var fragment = _a[_i];
            var slug = "slug" in fragment ? fragment.slug : fragment.id;
            fragment.revert();
            persistedDocument._fragmentsIndex.set(slug, fragment);
        }
        superFunction.call(persistedDocument);
    };
}
function syncSavedFragments() {
    var document = this;
    document._savedFragments = Utils.A.from(document._fragmentsIndex.values());
}
function resolveURI(uri) {
    if (URI.Util.isAbsolute(uri))
        return uri;
    var schema = this._documents.getGeneralSchema();
    return ObjectSchema.Util.resolveURI(uri, schema);
}
function extendAddType(superFunction) {
    return function (type) {
        type = resolveURI.call(this, type);
        superFunction.call(this, type);
    };
}
function extendHasType(superFunction) {
    return function (type) {
        type = resolveURI.call(this, type);
        return superFunction.call(this, type);
    };
}
function extendRemoveType(superFunction) {
    return function (type) {
        type = resolveURI.call(this, type);
        superFunction.call(this, type);
    };
}
function extendCreateFragment(superFunction) {
    return function (slugOrObject, slug) {
        var fragment = superFunction.call(this, slugOrObject, slug);
        var id = fragment.id;
        if (RDF.URI.Util.isBNodeID(id)) {
            PersistedFragment.Factory.decorate(fragment);
        }
        else {
            PersistedNamedFragment.Factory.decorate(fragment);
        }
        return fragment;
    };
}
function extendCreateNamedFragment(superFunction) {
    return function (slugOrObject, slug) {
        var fragment = superFunction.call(this, slugOrObject, slug);
        return PersistedFragment.Factory.decorate(fragment);
    };
}
function refresh() {
    return this._documents.refresh(this);
}
function save(requestOptions) {
    return this._documents.save(this, requestOptions);
}
function saveAndRefresh() {
    return this._documents.saveAndRefresh(this);
}
function _delete() {
    return this._documents.delete(this.id);
}
function getDownloadURL() {
    return this._documents.getDownloadURL(this.id);
}
function addMember(memberOrUri) {
    return this._documents.addMember(this.id, memberOrUri);
}
function addMembers(members) {
    return this._documents.addMembers(this.id, members);
}
function createChild(objectOrSlugOrRequestOptions, slugOrRequestOptions, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    requestOptions = HTTP.Request.Util.isOptions(objectOrSlugOrRequestOptions) ? objectOrSlugOrRequestOptions : HTTP.Request.Util.isOptions(slugOrRequestOptions) ? slugOrRequestOptions : requestOptions;
    var object = Utils.isString(objectOrSlugOrRequestOptions) || HTTP.Request.Util.isOptions(objectOrSlugOrRequestOptions) || !objectOrSlugOrRequestOptions ? {} : objectOrSlugOrRequestOptions;
    var slug = Utils.isString(objectOrSlugOrRequestOptions) ? objectOrSlugOrRequestOptions : Utils.isString(slugOrRequestOptions) ? slugOrRequestOptions : null;
    return this._documents.createChild(this.id, object, slug, requestOptions);
}
function createChildren(objects, slugsOrRequestOptions, requestOptions) {
    return this._documents.createChildren(this.id, objects, slugsOrRequestOptions, requestOptions);
}
function createChildAndRetrieve(objectOrSlugOrRequestOptions, slugOrRequestOptions, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    requestOptions = HTTP.Request.Util.isOptions(objectOrSlugOrRequestOptions) ? objectOrSlugOrRequestOptions : HTTP.Request.Util.isOptions(slugOrRequestOptions) ? slugOrRequestOptions : requestOptions;
    var object = Utils.isString(objectOrSlugOrRequestOptions) || HTTP.Request.Util.isOptions(objectOrSlugOrRequestOptions) || !objectOrSlugOrRequestOptions ? {} : objectOrSlugOrRequestOptions;
    var slug = Utils.isString(objectOrSlugOrRequestOptions) ? objectOrSlugOrRequestOptions : Utils.isString(slugOrRequestOptions) ? slugOrRequestOptions : null;
    return this._documents.createChildAndRetrieve(this.id, object, slug, requestOptions);
}
function createChildrenAndRetrieve(objects, slugsOrRequestOptions, requestOptions) {
    return this._documents.createChildrenAndRetrieve(this.id, objects, slugsOrRequestOptions, requestOptions);
}
function createAccessPoint(accessPoint, slugOrRequestOptions, requestOptions) {
    return this._documents.createAccessPoint(this.id, accessPoint, slugOrRequestOptions, requestOptions);
}
function createAccessPoints(accessPoints, slugsOrRequestOptions, requestOptions) {
    return this._documents.createAccessPoints(this.id, accessPoints, slugsOrRequestOptions, requestOptions);
}
function listChildren() {
    return this._documents.listChildren(this.id);
}
function getChildren(retrievalPreferences) {
    return this._documents.getChildren(this.id, retrievalPreferences);
}
function listMembers(includeNonReadable) {
    if (includeNonReadable === void 0) { includeNonReadable = true; }
    return this._documents.listMembers(this.id, includeNonReadable);
}
function getMembers(includeNonReadableOrRetrievalPreferences, retrievalPreferences) {
    var includeNonReadable = true;
    if (Utils.isBoolean(includeNonReadableOrRetrievalPreferences)) {
        includeNonReadable = includeNonReadableOrRetrievalPreferences;
    }
    else {
        retrievalPreferences = includeNonReadableOrRetrievalPreferences;
    }
    return this._documents.getMembers(this.id, includeNonReadable, retrievalPreferences);
}
function removeMember(memberOrUri) {
    return this._documents.removeMember(this.id, memberOrUri);
}
function removeMembers(members) {
    return this._documents.removeMembers(this.id, members);
}
function removeAllMembers() {
    return this._documents.removeAllMembers(this.id);
}
function upload(data, slug) {
    return this._documents.upload(this.id, data, slug);
}
function executeRawASKQuery(askQuery, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    return this._documents.executeRawASKQuery(this.id, askQuery, requestOptions);
}
function executeASKQuery(askQuery, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    return this._documents.executeASKQuery(this.id, askQuery, requestOptions);
}
function executeRawSELECTQuery(selectQuery, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    return this._documents.executeRawSELECTQuery(this.id, selectQuery, requestOptions);
}
function executeSELECTQuery(selectQuery, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    return this._documents.executeSELECTQuery(this.id, selectQuery, requestOptions);
}
function executeRawCONSTRUCTQuery(constructQuery, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    return this._documents.executeRawCONSTRUCTQuery(this.id, constructQuery, requestOptions);
}
function executeRawDESCRIBEQuery(describeQuery, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    return this._documents.executeRawDESCRIBEQuery(this.id, describeQuery, requestOptions);
}
function executeUPDATE(updateQuery, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    return this._documents.executeUPDATE(this.id, updateQuery, requestOptions);
}
function sparql() {
    return this._documents.sparql(this.id);
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "_documents")
            && Utils.hasPropertyDefined(object, "_etag")
            && Utils.hasFunction(object, "refresh")
            && Utils.hasFunction(object, "save")
            && Utils.hasFunction(object, "saveAndRefresh")
            && Utils.hasFunction(object, "delete")
            && Utils.hasFunction(object, "getDownloadURL")
            && Utils.hasFunction(object, "addMember")
            && Utils.hasFunction(object, "addMembers")
            && Utils.hasFunction(object, "createAccessPoint")
            && Utils.hasFunction(object, "createAccessPoints")
            && Utils.hasFunction(object, "createChild")
            && Utils.hasFunction(object, "createChildren")
            && Utils.hasFunction(object, "createChildAndRetrieve")
            && Utils.hasFunction(object, "createChildrenAndRetrieve")
            && Utils.hasFunction(object, "getChildren")
            && Utils.hasFunction(object, "getMembers")
            && Utils.hasFunction(object, "listChildren")
            && Utils.hasFunction(object, "listMembers")
            && Utils.hasFunction(object, "removeMember")
            && Utils.hasFunction(object, "removeMembers")
            && Utils.hasFunction(object, "removeAllMembers")
            && Utils.hasFunction(object, "upload")
            && Utils.hasFunction(object, "executeRawASKQuery")
            && Utils.hasFunction(object, "executeASKQuery")
            && Utils.hasFunction(object, "executeRawSELECTQuery")
            && Utils.hasFunction(object, "executeSELECTQuery")
            && Utils.hasFunction(object, "executeRawDESCRIBEQuery")
            && Utils.hasFunction(object, "executeRawCONSTRUCTQuery")
            && Utils.hasFunction(object, "executeUPDATE")
            && Utils.hasFunction(object, "sparql");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && Document.Factory.is(object);
    };
    Factory.create = function (uri, documents, snapshot) {
        if (snapshot === void 0) { snapshot = {}; }
        var document = Document.Factory.create();
        document.id = uri;
        return Factory.decorate(document, documents, snapshot);
    };
    Factory.createFrom = function (object, uri, documents, snapshot) {
        if (snapshot === void 0) { snapshot = {}; }
        var document = Factory.decorate(object, documents, snapshot);
        document.id = uri;
        return document;
    };
    Factory.decorate = function (document, documents, snapshot) {
        if (snapshot === void 0) { snapshot = {}; }
        Document.Factory.decorate(document);
        PersistedResource.Factory.decorate(document, snapshot);
        if (Factory.hasClassProperties(document))
            return document;
        var persistedDocument = document;
        Object.defineProperties(persistedDocument, {
            "_documents": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: documents,
            },
            "_etag": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: null,
            },
            "_savedFragments": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: [],
            },
            "_syncSavedFragments": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: syncSavedFragments,
            },
            "addType": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendAddType(persistedDocument.addType),
            },
            "hasType": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendHasType(persistedDocument.hasType),
            },
            "removeType": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendRemoveType(persistedDocument.removeType),
            },
            "hasPointer": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: (function () {
                    var superFunction = persistedDocument.hasPointer;
                    return function (id) {
                        if (RDF.URI.Util.isPrefixed(id)) {
                            id = ObjectSchema.Digester.resolvePrefixedURI(id, this._documents.getGeneralSchema());
                        }
                        if (superFunction.call(this, id))
                            return true;
                        return !URI.Util.isBNodeID(id) && this._documents.hasPointer(id);
                    };
                })(),
            },
            "getPointer": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: (function () {
                    var superFunction = persistedDocument.getPointer;
                    var inScopeFunction = persistedDocument.inScope;
                    return function (id) {
                        if (RDF.URI.Util.isPrefixed(id)) {
                            id = ObjectSchema.Digester.resolvePrefixedURI(id, this._documents.getGeneralSchema());
                        }
                        if (inScopeFunction.call(this, id))
                            return superFunction.call(this, id);
                        return this._documents.getPointer(id);
                    };
                })(),
            },
            "inScope": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: (function () {
                    var superFunction = persistedDocument.inScope;
                    return function (idOrPointer) {
                        var uri = Pointer.Factory.is(idOrPointer) ? idOrPointer.id : idOrPointer;
                        if (RDF.URI.Util.isPrefixed(uri)) {
                            uri = ObjectSchema.Digester.resolvePrefixedURI(uri, this._documents.getGeneralSchema());
                        }
                        if (superFunction.call(this, uri))
                            return true;
                        return this._documents.inScope(uri);
                    };
                })(),
            },
            "refresh": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: refresh,
            },
            "save": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: save,
            },
            "saveAndRefresh": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: saveAndRefresh,
            },
            "delete": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: _delete,
            },
            "getDownloadURL": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: getDownloadURL,
            },
            "addMember": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: addMember,
            },
            "addMembers": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: addMembers,
            },
            "createChild": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: createChild,
            },
            "createChildren": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: createChildren,
            },
            "createChildAndRetrieve": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: createChildAndRetrieve,
            },
            "createChildrenAndRetrieve": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: createChildrenAndRetrieve,
            },
            "createAccessPoint": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: createAccessPoint,
            },
            "createAccessPoints": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: createAccessPoints,
            },
            "listChildren": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: listChildren,
            },
            "getChildren": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: getChildren,
            },
            "listMembers": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: listMembers,
            },
            "getMembers": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: getMembers,
            },
            "removeMember": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: removeMember,
            },
            "removeMembers": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: removeMembers,
            },
            "removeAllMembers": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: removeAllMembers,
            },
            "upload": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: upload,
            },
            "executeRawASKQuery": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: executeRawASKQuery,
            },
            "executeASKQuery": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: executeASKQuery,
            },
            "executeRawSELECTQuery": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: executeRawSELECTQuery,
            },
            "executeSELECTQuery": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: executeSELECTQuery,
            },
            "executeRawCONSTRUCTQuery": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: executeRawCONSTRUCTQuery,
            },
            "executeRawDESCRIBEQuery": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: executeRawDESCRIBEQuery,
            },
            "executeUPDATE": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: executeUPDATE,
            },
            "sparql": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: sparql,
            },
            "createFragment": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendCreateFragment(persistedDocument.createFragment),
            },
            "createNamedFragment": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendCreateNamedFragment(persistedDocument.createNamedFragment),
            },
            "isDirty": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendIsDirty(persistedDocument.isDirty),
            },
            "revert": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendRevert(persistedDocument.revert),
            },
        });
        return persistedDocument;
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ObjectSchema = __webpack_require__(9);
var PersistedResource = __webpack_require__(36);
var RDF = __webpack_require__(4);
function resolveURI(uri) {
    if (RDF.URI.Util.isAbsolute(uri))
        return uri;
    var schema = this.document._documents.getGeneralSchema();
    return ObjectSchema.Util.resolveURI(uri, schema);
}
function extendAddType(superFunction) {
    return function (type) {
        type = resolveURI.call(this, type);
        superFunction.call(this, type);
    };
}
function extendHasType(superFunction) {
    return function (type) {
        type = resolveURI.call(this, type);
        return superFunction.call(this, type);
    };
}
function extendRemoveType(superFunction) {
    return function (type) {
        type = resolveURI.call(this, type);
        superFunction.call(this, type);
    };
}
var Factory = (function () {
    function Factory() {
    }
    Factory.decorate = function (fragment, snapshot) {
        if (snapshot === void 0) { snapshot = {}; }
        PersistedResource.Factory.decorate(fragment, snapshot);
        Object.defineProperties(fragment, {
            "addType": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendAddType(fragment.addType),
            },
            "hasType": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendHasType(fragment.hasType),
            },
            "removeType": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendRemoveType(fragment.removeType),
            },
        });
        return fragment;
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Token_1 = __webpack_require__(11);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Operator;

//# sourceMappingURL=Operator.js.map


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var XSD = __webpack_require__(141);
var StringLiteral_1 = __webpack_require__(14);
var Tokens_1 = __webpack_require__(6);
var PatternBuilder_1 = __webpack_require__(68);
function serialize(object) {
    if (typeof object === "string" || object instanceof String) {
        if (object === PatternBuilder_1.PatternBuilder.undefined)
            return [Tokens_1.UNDEF];
        return [Tokens_1.OPEN_QUOTE, new StringLiteral_1.StringLiteral(object), Tokens_1.CLOSE_QUOTE];
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
    return [Tokens_1.OPEN_QUOTE, new StringLiteral_1.StringLiteral(value), Tokens_1.CLOSE_QUOTE, Tokens_1.OFF_TYPE, Tokens_1.OPEN_IRI, new StringLiteral_1.StringLiteral(type), Tokens_1.CLOSE_IRI];
}
exports.addType = addType;

//# sourceMappingURL=ObjectPattern.js.map


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Documents = __webpack_require__(41);
var Auth = __webpack_require__(19);
var Errors = __webpack_require__(3);
var LDP = __webpack_require__(18);
var ObjectSchema = __webpack_require__(9);
var ProtectedDocument = __webpack_require__(63);
var RDF = __webpack_require__(4);
var RDFRepresentation = __webpack_require__(152);
var System = __webpack_require__(71);
var SHACL = __webpack_require__(72);
var Class = (function () {
    function Class() {
        this.settings = new Map();
        this.generalObjectSchema = new ObjectSchema.DigestedObjectSchema();
        this.typeObjectSchemaMap = new Map();
        this.auth = new Auth.Class(this);
        this.documents = new Documents.Class(this);
        this.registerDefaultObjectSchemas();
    }
    Object.defineProperty(Class.prototype, "baseURI", {
        get: function () { return ""; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "parentContext", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Class.prototype.resolve = function (relativeURI) {
        return relativeURI;
    };
    Class.prototype.resolveSystemURI = function (relativeURI) {
        if (!this.hasSetting("system.container"))
            throw new Errors.IllegalStateError("The \"system.container\" setting hasn't been defined.");
        var systemContainer = this.resolve(this.getSetting("system.container"));
        var systemURI = RDF.URI.Util.resolve(systemContainer, relativeURI);
        if (!systemURI.startsWith(systemContainer))
            throw new Errors.IllegalArgumentError("The provided URI \"" + relativeURI + "\" doesn't belong to the system container of your Carbon LDP.");
        return systemURI;
    };
    Class.prototype.hasSetting = function (name) {
        return (this.settings.has(name))
            || (!!this.parentContext && this.parentContext.hasSetting(name));
    };
    Class.prototype.getSetting = function (name) {
        if (this.settings.has(name))
            return this.settings.get(name);
        if (this.parentContext && this.parentContext.hasSetting(name))
            return this.parentContext.getSetting(name);
        return null;
    };
    Class.prototype.setSetting = function (name, value) {
        this.settings.set(name, value);
    };
    Class.prototype.deleteSetting = function (name) {
        this.settings.delete(name);
    };
    Class.prototype.hasObjectSchema = function (type) {
        type = this.resolveTypeURI(type);
        if (this.typeObjectSchemaMap.has(type))
            return true;
        return !!this.parentContext && this.parentContext.hasObjectSchema(type);
    };
    Class.prototype.getObjectSchema = function (type) {
        if (type === void 0) { type = null; }
        if (!!type) {
            type = this.resolveTypeURI(type);
            if (this.typeObjectSchemaMap.has(type))
                return this.typeObjectSchemaMap.get(type);
            if (!!this.parentContext && this.parentContext.hasObjectSchema(type))
                return this.parentContext.getObjectSchema(type);
            return null;
        }
        else {
            if (!!this.generalObjectSchema)
                return this.generalObjectSchema;
            if (!!this.parentContext)
                return this.parentContext.getObjectSchema();
            throw new Errors.IllegalStateError();
        }
    };
    Class.prototype.extendObjectSchema = function (typeOrObjectSchema, objectSchema) {
        if (objectSchema === void 0) { objectSchema = null; }
        var type = objectSchema ? typeOrObjectSchema : null;
        objectSchema = !!objectSchema ? objectSchema : typeOrObjectSchema;
        var digestedSchema = ObjectSchema.Digester.digestSchema(objectSchema);
        if (!type) {
            this.extendGeneralObjectSchema(digestedSchema);
        }
        else {
            this.extendTypeObjectSchema(digestedSchema, type);
        }
    };
    Class.prototype.clearObjectSchema = function (type) {
        if (type === void 0) { type = null; }
        if (!type) {
            this.generalObjectSchema = !!this.parentContext ? null : new ObjectSchema.DigestedObjectSchema();
        }
        else {
            type = this.resolveTypeURI(type);
            this.typeObjectSchemaMap.delete(type);
        }
    };
    Class.prototype.extendGeneralObjectSchema = function (digestedSchema) {
        var digestedSchemaToExtend;
        if (!!this.generalObjectSchema) {
            digestedSchemaToExtend = this.generalObjectSchema;
        }
        else if (!!this.parentContext) {
            digestedSchemaToExtend = this.parentContext.getObjectSchema();
        }
        else {
            digestedSchemaToExtend = new ObjectSchema.DigestedObjectSchema();
        }
        this.generalObjectSchema = ObjectSchema.Digester.combineDigestedObjectSchemas([
            new ObjectSchema.DigestedObjectSchema(),
            digestedSchemaToExtend,
            digestedSchema,
        ]);
    };
    Class.prototype.extendTypeObjectSchema = function (digestedSchema, type) {
        type = this.resolveTypeURI(type);
        var digestedSchemaToExtend;
        if (this.typeObjectSchemaMap.has(type)) {
            digestedSchemaToExtend = this.typeObjectSchemaMap.get(type);
        }
        else if (!!this.parentContext && this.parentContext.hasObjectSchema(type)) {
            digestedSchemaToExtend = this.parentContext.getObjectSchema(type);
        }
        else {
            digestedSchemaToExtend = new ObjectSchema.DigestedObjectSchema();
        }
        var extendedDigestedSchema = ObjectSchema.Digester.combineDigestedObjectSchemas([
            digestedSchemaToExtend,
            digestedSchema,
        ]);
        this.typeObjectSchemaMap.set(type, extendedDigestedSchema);
    };
    Class.prototype.registerDefaultObjectSchemas = function () {
        this.extendObjectSchema(ProtectedDocument.RDF_CLASS, ProtectedDocument.SCHEMA);
        this.extendObjectSchema(System.PlatformMetadata.RDF_CLASS, System.PlatformMetadata.SCHEMA);
        this.extendObjectSchema(System.InstanceMetadata.RDF_CLASS, System.InstanceMetadata.SCHEMA);
        this.extendObjectSchema(RDFRepresentation.RDF_CLASS, RDFRepresentation.SCHEMA);
        this.extendObjectSchema(LDP.Entry.SCHEMA);
        this.extendObjectSchema(LDP.Error.RDF_CLASS, LDP.Error.SCHEMA);
        this.extendObjectSchema(LDP.ErrorResponse.RDF_CLASS, LDP.ErrorResponse.SCHEMA);
        this.extendObjectSchema(LDP.ResponseMetadata.RDF_CLASS, LDP.ResponseMetadata.SCHEMA);
        this.extendObjectSchema(LDP.DocumentMetadata.RDF_CLASS, LDP.DocumentMetadata.SCHEMA);
        this.extendObjectSchema(LDP.AddMemberAction.RDF_CLASS, LDP.AddMemberAction.SCHEMA);
        this.extendObjectSchema(LDP.RemoveMemberAction.RDF_CLASS, LDP.RemoveMemberAction.SCHEMA);
        this.extendObjectSchema(LDP.Map.RDF_CLASS, LDP.Map.SCHEMA);
        this.extendObjectSchema(LDP.ValidationError.RDF_CLASS, LDP.ValidationError.SCHEMA);
        this.extendObjectSchema(Auth.Role.RDF_CLASS, Auth.Role.SCHEMA);
        this.extendObjectSchema(Auth.ACE.RDF_CLASS, Auth.ACE.SCHEMA);
        this.extendObjectSchema(Auth.ACL.RDF_CLASS, Auth.ACL.SCHEMA);
        this.extendObjectSchema(Auth.User.RDF_CLASS, Auth.User.SCHEMA);
        this.extendObjectSchema(Auth.Credentials.RDF_CLASS, Auth.Credentials.SCHEMA);
        this.extendObjectSchema(Auth.Ticket.RDF_CLASS, Auth.Ticket.SCHEMA);
        this.extendObjectSchema(Auth.Token.RDF_CLASS, Auth.Token.SCHEMA);
        this.extendObjectSchema(SHACL.ValidationReport.SCHEMA);
        this.extendObjectSchema(SHACL.ValidationResult.RDF_CLASS, SHACL.ValidationResult.SCHEMA);
    };
    Class.prototype.resolveTypeURI = function (uri) {
        if (RDF.URI.Util.isAbsolute(uri))
            return uri;
        var schema = this.getObjectSchema();
        var vocab;
        if (this.hasSetting("vocabulary"))
            vocab = this.resolve(this.getSetting("vocabulary"));
        if (RDF.URI.Util.isPrefixed(uri)) {
            uri = ObjectSchema.Digester.resolvePrefixedURI(uri, schema);
        }
        else if (vocab) {
            uri = vocab + uri;
        }
        return uri;
    };
    return Class;
}());
exports.Class = Class;
exports.instance = new Class();
exports.default = exports.instance;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Value = (function () {
    function Value(value) {
        this.value = value;
    }
    Value.prototype.toString = function () {
        return this.value;
    };
    return Value;
}());
exports.Value = Value;
var Class = (function () {
    function Class(valueOrValues) {
        this.values = [];
        if (!valueOrValues) {
            return;
        }
        else if (Array.isArray(valueOrValues)) {
            this.values = valueOrValues;
        }
        else {
            this.setValues(valueOrValues);
        }
    }
    Class.prototype.toString = function () {
        return this.values.join(", ");
    };
    Class.prototype.setValues = function (valuesString) {
        this.values = [];
        var valueStrings = valuesString.split(",");
        for (var i = 0, length_1 = valueStrings.length; i < length_1; i++) {
            var valueString = valueStrings[i].trim();
            this.values.push(new Value(valueString));
        }
    };
    return Class;
}());
exports.Class = Class;
var Util = (function () {
    function Util() {
    }
    Util.parseHeaders = function (headersString) {
        var headers = new Map();
        var headerStrings = headersString.split(/\r?\n/);
        for (var i = 0, length_2 = headerStrings.length; i < length_2; i++) {
            var headerString = headerStrings[i];
            if (!headerString.trim())
                continue;
            var parts = headerString.split(":");
            if (parts.length < 2)
                throw new Error("ParseError: The header couldn't be parsed.");
            if (parts.length > 2)
                parts[1] = parts.slice(1).join(":");
            var name_1 = parts[0].trim().toLowerCase();
            var header = new Class(parts[1].trim());
            if (headers.has(name_1)) {
                var existingHeader = headers.get(name_1);
                existingHeader.values.concat(header.values);
            }
            else
                headers.set(name_1, header);
        }
        return headers;
    };
    return Util;
}());
exports.Util = Util;
exports.default = Class;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Class = (function () {
    function Class() {
    }
    Class.prototype.parse = function (body) {
        return new Promise(function (resolve, reject) {
            try {
                resolve(JSON.parse(body));
            }
            catch (error) {
                reject(error);
            }
        });
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __webpack_require__(3);
var Converter_1 = __webpack_require__(31);
var Pointer = __webpack_require__(8);
var RDF = __webpack_require__(4);
var Resource = __webpack_require__(5);
var Utils = __webpack_require__(0);
function hasPointer(id) {
    var freeResources = this;
    if (!inLocalScope(id)) {
        return freeResources._documents.hasPointer(id);
    }
    return freeResources.hasResource(id);
}
function getPointer(id) {
    var freeResources = this;
    if (!inLocalScope(id)) {
        return freeResources._documents.getPointer(id);
    }
    var resource = freeResources.getResource(id);
    return !resource ? freeResources.createResource(id) : resource;
}
function inLocalScope(id) {
    return RDF.URI.Util.isBNodeID(id);
}
function inScope(idOrPointer) {
    var freeResources = this;
    var id = Pointer.Factory.is(idOrPointer) ? idOrPointer.id : idOrPointer;
    return inLocalScope(id) || freeResources._documents.inScope(id);
}
function hasResource(id) {
    var freeResources = this;
    return freeResources._resourcesIndex.has(id);
}
function getResource(id) {
    var freeResources = this;
    return freeResources._resourcesIndex.get(id) || null;
}
function getResources() {
    var freeResources = this;
    return Utils.A.from(freeResources._resourcesIndex.values());
}
function createResource(id) {
    return this.createResourceFrom({}, id);
}
function createResourceFrom(object, id) {
    var freeResources = this;
    if (id) {
        if (!inLocalScope(id))
            throw new Errors.IllegalArgumentError("The id \"" + id + "\" is out of scope.");
        if (freeResources._resourcesIndex.has(id))
            throw new Errors.IDAlreadyInUseError("The id \"" + id + "\" is already in use by another resource.");
    }
    else {
        id = RDF.URI.Util.generateBNodeID();
    }
    var resource = Resource.Factory.createFrom(object, id);
    freeResources._resourcesIndex.set(id, resource);
    return resource;
}
function toJSON() {
    var generalSchema = this._documents.getGeneralSchema();
    var jsonldConverter = new Converter_1.default();
    var resources = this.getResources();
    var expandedResources = [];
    for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
        var resource = resources_1[_i];
        expandedResources.push(jsonldConverter.expand(resource, generalSchema, this._documents.getSchemaFor(resource)));
    }
    return JSON.stringify(expandedResources);
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return (Utils.hasPropertyDefined(object, "_documents") &&
            Utils.hasPropertyDefined(object, "_resourcesIndex") &&
            Utils.hasFunction(object, "hasResource") &&
            Utils.hasFunction(object, "getResource") &&
            Utils.hasFunction(object, "getResources") &&
            Utils.hasFunction(object, "createResource") &&
            Utils.hasFunction(object, "createResourceFrom") &&
            Utils.hasFunction(object, "hasPointer") &&
            Utils.hasFunction(object, "getPointer") &&
            Utils.hasFunction(object, "inScope") &&
            Utils.hasFunction(object, "toJSON"));
    };
    Factory.create = function (documents) {
        return Factory.createFrom({}, documents);
    };
    Factory.createFrom = function (object, documents) {
        var freeResources = Factory.decorate(object);
        freeResources._documents = documents;
        return freeResources;
    };
    Factory.decorate = function (object) {
        if (Factory.hasClassProperties(object))
            return object;
        Object.defineProperties(object, {
            "_resourcesIndex": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: new Map(),
            },
            "hasPointer": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: hasPointer,
            },
            "getPointer": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: getPointer,
            },
            "inScope": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: inScope,
            },
            "hasResource": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: hasResource,
            },
            "getResource": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: getResource,
            },
            "getResources": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: getResources,
            },
            "createResource": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: createResource,
            },
            "createResourceFrom": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: createResourceFrom,
            },
            "toJSON": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: toJSON,
            },
        });
        return object;
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __webpack_require__(3);
var ObjectSchema = __webpack_require__(9);
var NS = __webpack_require__(1);
var Pointer = __webpack_require__(8);
var RDF = __webpack_require__(4);
var Utils = __webpack_require__(0);
var Class = (function () {
    function Class(literalSerializers) {
        this._literalSerializers = !!literalSerializers ? literalSerializers : Class.getDefaultSerializers();
    }
    Object.defineProperty(Class.prototype, "literalSerializers", {
        get: function () { return this._literalSerializers; },
        enumerable: true,
        configurable: true
    });
    Class.getDefaultSerializers = function () {
        var literalSerializers = new Map();
        literalSerializers.set(NS.XSD.DataType.date, RDF.Literal.Serializers.XSD.dateSerializer);
        literalSerializers.set(NS.XSD.DataType.dateTime, RDF.Literal.Serializers.XSD.dateTimeSerializer);
        literalSerializers.set(NS.XSD.DataType.time, RDF.Literal.Serializers.XSD.timeSerializer);
        literalSerializers.set(NS.XSD.DataType.integer, RDF.Literal.Serializers.XSD.integerSerializer);
        literalSerializers.set(NS.XSD.DataType.int, RDF.Literal.Serializers.XSD.integerSerializer);
        literalSerializers.set(NS.XSD.DataType.unsignedInt, RDF.Literal.Serializers.XSD.unsignedIntegerSerializer);
        literalSerializers.set(NS.XSD.DataType.long, RDF.Literal.Serializers.XSD.longSerializer);
        literalSerializers.set(NS.XSD.DataType.unsignedLong, RDF.Literal.Serializers.XSD.unsignedLongSerializer);
        literalSerializers.set(NS.XSD.DataType.float, RDF.Literal.Serializers.XSD.floatSerializer);
        literalSerializers.set(NS.XSD.DataType.double, RDF.Literal.Serializers.XSD.floatSerializer);
        literalSerializers.set(NS.XSD.DataType.boolean, RDF.Literal.Serializers.XSD.booleanSerializer);
        literalSerializers.set(NS.XSD.DataType.string, RDF.Literal.Serializers.XSD.stringSerializer);
        return literalSerializers;
    };
    Class.getPropertyURI = function (propertyName, definition, vocab) {
        var uri;
        var relativeName = null;
        if (definition.uri !== null) {
            uri = definition.uri.toString();
            if (RDF.URI.Util.isRelative(uri))
                relativeName = uri;
        }
        else {
            relativeName = propertyName;
        }
        if (relativeName !== null) {
            if (vocab !== null) {
                uri = vocab + relativeName;
            }
            else {
                throw new Errors.InvalidJSONLDSyntaxError("The context doesn't have a default vocabulary and the object schema does not define a proper absolute @id for the property '" + propertyName + "'");
            }
        }
        return uri;
    };
    Class.prototype.compact = function (expandedObjectOrObjects, targetObjectOrObjectsOrDigestedContext, digestedSchemaOrPointerLibrary, pointerLibrary) {
        if (pointerLibrary === void 0) { pointerLibrary = null; }
        var targetObjectOrObjects = !pointerLibrary ? null : targetObjectOrObjectsOrDigestedContext;
        var digestedSchema = !pointerLibrary ? targetObjectOrObjectsOrDigestedContext : digestedSchemaOrPointerLibrary;
        pointerLibrary = !pointerLibrary ? digestedSchemaOrPointerLibrary : pointerLibrary;
        if (!Utils.isArray(expandedObjectOrObjects))
            return this.compactSingle(expandedObjectOrObjects, targetObjectOrObjects, digestedSchema, pointerLibrary);
        var expandedObjects = expandedObjectOrObjects;
        var targetObjects = !!targetObjectOrObjects ? targetObjectOrObjects : [];
        for (var i = 0, length_1 = expandedObjects.length; i < length_1; i++) {
            var expandedObject = expandedObjects[i];
            var targetObject = targetObjects[i] = !!targetObjects[i] ? targetObjects[i] : {};
            this.compactSingle(expandedObject, targetObject, digestedSchema, pointerLibrary);
        }
        return targetObjects;
    };
    Class.prototype.expand = function (compactedObjectOrObjects, generalSchema, digestedSchema) {
        if (!Utils.isArray(compactedObjectOrObjects))
            return this.expandSingle(compactedObjectOrObjects, generalSchema, digestedSchema);
    };
    Class.prototype.expandSingle = function (compactedObject, generalSchema, digestedSchema) {
        var _this = this;
        var expandedObject = {};
        expandedObject["@id"] = !!compactedObject["id"] ? compactedObject["id"] : "";
        if (!!compactedObject["types"])
            expandedObject["@type"] = compactedObject["types"].map(function (type) { return ObjectSchema.Util.resolveURI(type, generalSchema); });
        Utils.forEachOwnProperty(compactedObject, function (propertyName, value) {
            if (propertyName === "id")
                return;
            if (propertyName === "types")
                return;
            var expandedValue;
            var expandedPropertyName = null;
            if (digestedSchema.properties.has(propertyName)) {
                var definition = Utils.O.clone(digestedSchema.properties.get(propertyName), { objects: true });
                expandedPropertyName = Class.getPropertyURI(propertyName, definition, digestedSchema.vocab);
                expandedValue = _this.expandProperty(value, definition, generalSchema, digestedSchema);
            }
            else if (RDF.URI.Util.isAbsolute(propertyName) || digestedSchema.vocab !== null) {
                expandedValue = _this.expandPropertyValue(value, generalSchema, digestedSchema);
                expandedPropertyName = ObjectSchema.Util.resolveURI(propertyName, generalSchema);
            }
            if (!expandedValue || !expandedPropertyName)
                return;
            expandedObject[expandedPropertyName] = expandedValue;
        });
        return expandedObject;
    };
    Class.prototype.expandProperty = function (propertyValue, propertyDefinition, generalSchema, digestedSchema) {
        switch (propertyDefinition.containerType) {
            case null:
                if (propertyDefinition.literal) {
                    return this.expandPropertyLiteral(propertyValue, propertyDefinition.literalType.toString());
                }
                else if (propertyDefinition.literal === false) {
                    return this.expandPropertyPointer(propertyValue, generalSchema, digestedSchema);
                }
                else {
                    return this.expandPropertyValue(propertyValue, generalSchema, digestedSchema);
                }
            case ObjectSchema.ContainerType.LIST:
                if (propertyDefinition.literal) {
                    return this.expandPropertyLiteralList(propertyValue, propertyDefinition.literalType.toString());
                }
                else if (propertyDefinition.literal === false) {
                    return this.expandPropertyPointerList(propertyValue, generalSchema, digestedSchema);
                }
                else {
                    return this.expandPropertyList(propertyValue, generalSchema, digestedSchema);
                }
            case ObjectSchema.ContainerType.SET:
                if (propertyDefinition.literal) {
                    return this.expandPropertyLiterals(propertyValue, propertyDefinition.literalType.toString());
                }
                else if (propertyDefinition.literal === false) {
                    return this.expandPropertyPointers(propertyValue, generalSchema, digestedSchema);
                }
                else {
                    return this.expandPropertyValues(propertyValue, generalSchema, digestedSchema);
                }
            case ObjectSchema.ContainerType.LANGUAGE:
                return this.expandPropertyLanguageMap(propertyValue);
            default:
                throw new Errors.IllegalArgumentError("The containerType specified is not supported.");
        }
    };
    Class.prototype.expandPropertyValue = function (propertyValue, generalSchema, digestedSchema) {
        if (Utils.isArray(propertyValue)) {
            return this.expandPropertyValues(propertyValue, generalSchema, digestedSchema);
        }
        else {
            var expandedValue = this.expandValue(propertyValue, generalSchema, digestedSchema);
            if (!expandedValue)
                return null;
            return [expandedValue];
        }
    };
    Class.prototype.expandPropertyPointer = function (propertyValue, generalSchema, digestedSchema) {
        var expandedPointer = this.expandPointer(propertyValue, generalSchema, digestedSchema);
        if (!expandedPointer)
            return null;
        return [expandedPointer];
    };
    Class.prototype.expandPropertyLiteral = function (propertyValue, literalType) {
        var serializedValue = this.serializeLiteral(propertyValue, literalType);
        if (serializedValue === null)
            return null;
        return [
            { "@value": serializedValue, "@type": literalType },
        ];
    };
    Class.prototype.expandPropertyList = function (propertyValues, generalSchema, digestedSchema) {
        propertyValues = Utils.isArray(propertyValues) ? propertyValues : [propertyValues];
        var expandedArray = this.expandArray(propertyValues, generalSchema, digestedSchema);
        if (!expandedArray)
            return null;
        return [
            { "@list": expandedArray },
        ];
    };
    Class.prototype.expandPropertyPointerList = function (propertyValues, generalSchema, digestedSchema) {
        var listValues = this.expandPropertyPointers(propertyValues, generalSchema, digestedSchema);
        return [
            { "@list": listValues },
        ];
    };
    Class.prototype.expandPropertyLiteralList = function (propertyValues, literalType) {
        var listValues = this.expandPropertyLiterals(propertyValues, literalType);
        return [
            { "@list": listValues },
        ];
    };
    Class.prototype.expandPropertyValues = function (propertyValues, generalSchema, digestedSchema) {
        propertyValues = Utils.isArray(propertyValues) ? propertyValues : [propertyValues];
        var expandedArray = this.expandArray(propertyValues, generalSchema, digestedSchema);
        if (!expandedArray)
            return null;
        return expandedArray;
    };
    Class.prototype.expandPropertyPointers = function (propertyValues, generalSchema, digestedSchema) {
        propertyValues = Utils.isArray(propertyValues) ? propertyValues : [propertyValues];
        var expandedPointers = [];
        for (var _i = 0, propertyValues_1 = propertyValues; _i < propertyValues_1.length; _i++) {
            var propertyValue = propertyValues_1[_i];
            var expandedPointer = this.expandPointer(propertyValue, generalSchema, digestedSchema);
            if (!expandedPointer)
                continue;
            expandedPointers.push(expandedPointer);
        }
        return expandedPointers;
    };
    Class.prototype.expandPropertyLiterals = function (propertyValues, literalType) {
        propertyValues = Utils.isArray(propertyValues) ? propertyValues : [propertyValues];
        var listValues = [];
        for (var _i = 0, propertyValues_2 = propertyValues; _i < propertyValues_2.length; _i++) {
            var propertyValue = propertyValues_2[_i];
            var serializedValue = this.serializeLiteral(propertyValue, literalType);
            if (!serializedValue)
                continue;
            listValues.push({ "@value": serializedValue, "@type": literalType });
        }
        return listValues;
    };
    Class.prototype.expandPropertyLanguageMap = function (propertyValue) {
        var _this = this;
        if (!Utils.isObject(propertyValue)) {
            return null;
        }
        var mapValues = [];
        Utils.forEachOwnProperty(propertyValue, function (languageTag, value) {
            var serializedValue = _this.literalSerializers.get(NS.XSD.DataType.string).serialize(value);
            mapValues.push({ "@value": serializedValue, "@type": NS.XSD.DataType.string, "@language": languageTag });
        });
        return mapValues;
    };
    Class.prototype.serializeLiteral = function (propertyValue, literalType) {
        if (Pointer.Factory.is(propertyValue)) {
            return null;
        }
        if (!this.literalSerializers.has(literalType)) {
            return null;
        }
        try {
            return this.literalSerializers.get(literalType).serialize(propertyValue);
        }
        catch (error) {
            return null;
        }
    };
    Class.prototype.expandPointer = function (propertyValue, generalSchema, digestedSchema) {
        var notPointer = true;
        var id;
        if (Pointer.Factory.is(propertyValue)) {
            notPointer = false;
            propertyValue = propertyValue.id;
        }
        else if (!Utils.isString(propertyValue)) {
            propertyValue = null;
        }
        id = propertyValue;
        if (!id) {
            return null;
        }
        id = ObjectSchema.Digester.resolvePrefixedURI(id, generalSchema);
        if (generalSchema.properties.has(id)) {
            var definition = generalSchema.properties.get(id);
            if (definition.uri)
                id = definition.uri.stringValue;
        }
        if (notPointer && !!digestedSchema.vocab)
            id = ObjectSchema.Util.resolveURI(id, generalSchema);
        return { "@id": id };
    };
    Class.prototype.expandArray = function (propertyValue, generalSchema, digestedSchema) {
        var listValues = [];
        for (var _i = 0, propertyValue_1 = propertyValue; _i < propertyValue_1.length; _i++) {
            var listValue = propertyValue_1[_i];
            var expandedValue = this.expandValue(listValue, generalSchema, digestedSchema);
            if (!expandedValue)
                continue;
            listValues.push(expandedValue);
        }
        if (!listValues.length)
            return null;
        return listValues;
    };
    Class.prototype.expandValue = function (propertyValue, generalSchema, digestedSchema) {
        if (Utils.isArray(propertyValue)) {
            return null;
        }
        else if (Pointer.Factory.is(propertyValue)) {
            return this.expandPointer(propertyValue, generalSchema, digestedSchema);
        }
        else {
            return this.expandLiteral(propertyValue);
        }
    };
    Class.prototype.expandLiteral = function (literalValue) {
        var serializedValue;
        var literalType;
        switch (true) {
            case Utils.isFunction(literalValue):
                return null;
            case Utils.isDate(literalValue):
                literalType = NS.XSD.DataType.dateTime;
                break;
            case Utils.isNumber(literalValue):
                literalType = NS.XSD.DataType.float;
                break;
            case Utils.isBoolean(literalValue):
                literalType = NS.XSD.DataType.boolean;
                break;
            case Utils.isString(literalValue):
                literalType = NS.XSD.DataType.string;
                break;
            default:
                return null;
        }
        serializedValue = this.literalSerializers.get(literalType).serialize(literalValue);
        return { "@value": serializedValue, "@type": literalType };
    };
    Class.prototype.compactSingle = function (expandedObject, targetObject, digestedSchema, pointerLibrary) {
        var _this = this;
        var propertyURINameMap = this.getPropertyURINameMap(digestedSchema);
        if (!expandedObject["@id"])
            throw new Errors.IllegalArgumentError("The expandedObject doesn't have an @id defined.");
        targetObject["id"] = expandedObject["@id"];
        targetObject["types"] = !!expandedObject["@type"] ? expandedObject["@type"] : [];
        Utils.forEachOwnProperty(expandedObject, function (propertyURI, value) {
            if (propertyURI === "@id")
                return;
            if (propertyURI === "@type")
                return;
            var propertyName = propertyURI;
            var propertyValues = expandedObject[propertyURI];
            var definition;
            if (propertyURINameMap.has(propertyURI)) {
                propertyName = propertyURINameMap.get(propertyURI);
                definition = digestedSchema.properties.get(propertyName);
            }
            else {
                if (digestedSchema.vocab !== null)
                    propertyName = RDF.URI.Util.getRelativeURI(propertyURI, digestedSchema.vocab);
                definition = new ObjectSchema.DigestedPropertyDefinition();
                definition.containerType = _this.getPropertyContainerType(propertyValues);
            }
            targetObject[propertyName] = _this.getPropertyValue(expandedObject, propertyURI, definition, pointerLibrary);
        });
        return targetObject;
    };
    Class.prototype.getPropertyContainerType = function (propertyValues) {
        if (propertyValues.length === 1) {
            if (RDF.List.Factory.is(propertyValues[0]))
                return ObjectSchema.ContainerType.LIST;
        }
        else {
            return ObjectSchema.ContainerType.SET;
        }
        return null;
    };
    Class.prototype.getPropertyValue = function (expandedObject, propertyURI, propertyDefinition, pointerLibrary) {
        switch (propertyDefinition.containerType) {
            case null:
                if (propertyDefinition.literal) {
                    return RDF.Node.Util.getPropertyLiteral(expandedObject, propertyURI, propertyDefinition.literalType.toString());
                }
                else if (propertyDefinition.literal === false) {
                    return RDF.Node.Util.getPropertyPointer(expandedObject, propertyURI, pointerLibrary);
                }
                else {
                    return RDF.Node.Util.getProperty(expandedObject, propertyURI, pointerLibrary);
                }
            case ObjectSchema.ContainerType.LIST:
                if (propertyDefinition.literal) {
                    return RDF.Node.Util.getPropertyLiteralList(expandedObject, propertyURI, propertyDefinition.literalType.toString());
                }
                else if (propertyDefinition.literal === false) {
                    return RDF.Node.Util.getPropertyPointerList(expandedObject, propertyURI, pointerLibrary);
                }
                else {
                    return RDF.Node.Util.getPropertyList(expandedObject, propertyURI, pointerLibrary);
                }
            case ObjectSchema.ContainerType.SET:
                if (propertyDefinition.literal) {
                    return RDF.Node.Util.getPropertyLiterals(expandedObject, propertyURI, propertyDefinition.literalType.toString());
                }
                else if (propertyDefinition.literal === false) {
                    return RDF.Node.Util.getPropertyPointers(expandedObject, propertyURI, pointerLibrary);
                }
                else {
                    return RDF.Node.Util.getProperties(expandedObject, propertyURI, pointerLibrary);
                }
            case ObjectSchema.ContainerType.LANGUAGE:
                return RDF.Node.Util.getPropertyLanguageMap(expandedObject, propertyURI);
            default:
                throw new Errors.IllegalArgumentError("The containerType specified is not supported.");
        }
    };
    Class.prototype.getPropertyURINameMap = function (digestedSchema) {
        var map = new Map();
        digestedSchema.properties.forEach(function (definition, propertyName) {
            var uri = Class.getPropertyURI(propertyName, definition, digestedSchema.vocab);
            map.set(uri, propertyName);
        });
        return map;
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils = __webpack_require__(0);
var XSD = __webpack_require__(22);
var Errors = __webpack_require__(3);
var Serializers = __webpack_require__(111);
exports.Serializers = Serializers;
var Factory = (function () {
    function Factory() {
    }
    Factory.from = function (value) {
        if (Utils.isNull(value))
            throw new Errors.IllegalArgumentError("Null cannot be converted into a Literal");
        if (!Utils.isDefined(value))
            throw new Errors.IllegalArgumentError("The value is undefined");
        var type;
        switch (true) {
            case Utils.isDate(value):
                type = XSD.DataType.dateTime;
                value = value.toISOString();
                break;
            case Utils.isNumber(value):
                if (Utils.isInteger(value)) {
                    type = XSD.DataType.integer;
                }
                else {
                    type = XSD.DataType.double;
                }
                break;
            case Utils.isString(value):
                type = XSD.DataType.string;
                break;
            case Utils.isBoolean(value):
                type = XSD.DataType.boolean;
                break;
            default:
                type = XSD.DataType.object;
                value = JSON.stringify(value);
                break;
        }
        var literal = { "@value": value.toString() };
        if (type)
            literal["@type"] = type;
        return literal;
    };
    Factory.parse = function (literalValueOrLiteral, literalDataType) {
        if (literalDataType === void 0) { literalDataType = null; }
        var literalValue;
        if (Utils.isString(literalValueOrLiteral)) {
            literalValue = literalValueOrLiteral;
        }
        else {
            var literal = literalValueOrLiteral;
            if (!literal)
                return null;
            if (!Utils.hasProperty(literal, "@value"))
                return null;
            literalDataType = "@type" in literal ? literal["@type"] : null;
            literalValue = literal["@value"];
        }
        if (literalDataType === null)
            return literalValue;
        if (!Utils.hasProperty(XSD.DataType, literalDataType))
            return literalValue;
        var value;
        var parts;
        switch (literalDataType) {
            case XSD.DataType.date:
            case XSD.DataType.dateTime:
                value = new Date(literalValue);
                break;
            case XSD.DataType.time:
                parts = literalValue.match(/(\d+):(\d+):(\d+)\.(\d+)Z/);
                value = new Date();
                value.setUTCHours(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3]), parseFloat(parts[4]));
                break;
            case XSD.DataType.duration:
                break;
            case XSD.DataType.gDay:
            case XSD.DataType.gMonth:
            case XSD.DataType.gMonthDay:
            case XSD.DataType.gYear:
            case XSD.DataType.gYearMonth:
                break;
            case XSD.DataType.byte:
            case XSD.DataType.decimal:
            case XSD.DataType.int:
            case XSD.DataType.integer:
            case XSD.DataType.long:
            case XSD.DataType.negativeInteger:
            case XSD.DataType.nonNegativeInteger:
            case XSD.DataType.nonPositiveInteger:
            case XSD.DataType.positiveInteger:
            case XSD.DataType.short:
            case XSD.DataType.unsignedLong:
            case XSD.DataType.unsignedInt:
            case XSD.DataType.unsignedShort:
            case XSD.DataType.unsignedByte:
            case XSD.DataType.double:
            case XSD.DataType.float:
                value = parseFloat(literalValue);
                break;
            case XSD.DataType.boolean:
                value = Utils.parseBoolean(literalValue);
                break;
            case XSD.DataType.string:
                value = literalValue;
                break;
            case XSD.DataType.object:
                value = JSON.parse(literalValue);
                break;
            default:
                break;
        }
        return value;
    };
    Factory.is = function (value) {
        return Utils.hasProperty(value, "@value")
            && Utils.isString(value["@value"]);
    };
    Factory.hasType = function (value, type) {
        if (!value["@type"] && type === XSD.DataType.string)
            return true;
        return value["@type"] === type;
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils = __webpack_require__(0);
var Document = __webpack_require__(47);
var List = __webpack_require__(34);
var Literal = __webpack_require__(32);
var Value = __webpack_require__(50);
var XSD = __webpack_require__(22);
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (value) {
        return Utils.hasProperty(value, "@id")
            && Utils.isString(value["@id"]);
    };
    Factory.create = function (uri) {
        return {
            "@id": uri,
        };
    };
    return Factory;
}());
exports.Factory = Factory;
var Util = (function () {
    function Util() {
    }
    Util.areEqual = function (node1, node2) {
        return node1["@id"] === node2["@id"];
    };
    Util.hasType = function (node, type) {
        return Util.getTypes(node).indexOf(type) !== -1;
    };
    Util.getTypes = function (node) {
        if (!("@type" in node))
            return [];
        return node["@type"];
    };
    Util.getPropertyURI = function (node, predicate) {
        if (!(predicate in node))
            return null;
        if (!Utils.isArray(node[predicate]))
            return null;
        var uri = node[predicate].find(function (value) { return Factory.is(value); });
        return typeof uri !== "undefined" ? uri["@id"] : null;
    };
    Util.getFreeNodes = function (value) {
        if (!Utils.isArray(value))
            return [];
        var array = value;
        return array
            .filter(function (element) { return !Document.Factory.is(element); })
            .filter(function (element) { return Factory.is(element); });
    };
    Util.getProperty = function (expandedObject, propertyURI, pointerLibrary) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        if (!propertyValues.length)
            return null;
        var propertyValue = propertyValues[0];
        return Value.Util.parseValue(propertyValue, pointerLibrary);
    };
    Util.getPropertyPointer = function (expandedObject, propertyURI, pointerLibrary) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        for (var _i = 0, propertyValues_1 = propertyValues; _i < propertyValues_1.length; _i++) {
            var propertyValue = propertyValues_1[_i];
            if (!Factory.is(propertyValue))
                continue;
            return pointerLibrary.getPointer(propertyValue["@id"]);
        }
        return null;
    };
    Util.getPropertyLiteral = function (expandedObject, propertyURI, literalType) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        for (var _i = 0, propertyValues_2 = propertyValues; _i < propertyValues_2.length; _i++) {
            var propertyValue = propertyValues_2[_i];
            if (!Literal.Factory.is(propertyValue))
                continue;
            if (!Literal.Factory.hasType(propertyValue, literalType))
                continue;
            return Literal.Factory.parse(propertyValue);
        }
        return null;
    };
    Util.getPropertyList = function (expandedObject, propertyURI, pointerLibrary) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        var propertyList = Util.getList(propertyValues);
        if (!propertyList)
            return null;
        var listValues = [];
        for (var _i = 0, _a = propertyList["@list"]; _i < _a.length; _i++) {
            var listValue = _a[_i];
            listValues.push(Value.Util.parseValue(listValue, pointerLibrary));
        }
        return listValues;
    };
    Util.getPropertyPointerList = function (expandedObject, propertyURI, pointerLibrary) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        var propertyList = Util.getList(propertyValues);
        if (!propertyList)
            return null;
        var listPointers = [];
        for (var _i = 0, _a = propertyList["@list"]; _i < _a.length; _i++) {
            var listValue = _a[_i];
            if (!Factory.is(listValue))
                continue;
            var pointer = pointerLibrary.getPointer(listValue["@id"]);
            listPointers.push(pointer);
        }
        return listPointers;
    };
    Util.getPropertyLiteralList = function (expandedObject, propertyURI, literalType) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        var propertyList = Util.getList(propertyValues);
        if (!propertyList)
            return null;
        var listLiterals = [];
        for (var _i = 0, _a = propertyList["@list"]; _i < _a.length; _i++) {
            var listValue = _a[_i];
            if (!Literal.Factory.is(listValue))
                continue;
            if (!Literal.Factory.hasType(listValue, literalType))
                continue;
            listLiterals.push(Literal.Factory.parse(listValue));
        }
        return listLiterals;
    };
    Util.getProperties = function (expandedObject, propertyURI, pointerLibrary) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        if (!propertyValues.length)
            return null;
        var properties = [];
        for (var _i = 0, propertyValues_3 = propertyValues; _i < propertyValues_3.length; _i++) {
            var propertyValue = propertyValues_3[_i];
            var parsedValue = Value.Util.parseValue(propertyValue, pointerLibrary);
            if (parsedValue !== null)
                properties.push(parsedValue);
        }
        return properties;
    };
    Util.getPropertyPointers = function (expandedObject, propertyURI, pointerLibrary) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return [];
        if (!propertyValues.length)
            return [];
        var propertyPointers = [];
        for (var _i = 0, propertyValues_4 = propertyValues; _i < propertyValues_4.length; _i++) {
            var propertyValue = propertyValues_4[_i];
            if (!Factory.is(propertyValue))
                continue;
            var pointer = pointerLibrary.getPointer(propertyValue["@id"]);
            if (pointer !== null)
                propertyPointers.push(pointer);
        }
        return propertyPointers;
    };
    Util.getPropertyURIs = function (expandedObject, propertyURI) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        if (!propertyValues.length)
            return null;
        var propertyURIs = [];
        for (var _i = 0, propertyValues_5 = propertyValues; _i < propertyValues_5.length; _i++) {
            var propertyValue = propertyValues_5[_i];
            if (!Factory.is(propertyValue))
                continue;
            propertyURIs.push(propertyValue["@id"]);
        }
        return propertyURIs;
    };
    Util.getPropertyLiterals = function (expandedObject, propertyURI, literalType) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        var propertyLiterals = [];
        for (var _i = 0, propertyValues_6 = propertyValues; _i < propertyValues_6.length; _i++) {
            var propertyValue = propertyValues_6[_i];
            if (!Literal.Factory.is(propertyValue))
                continue;
            if (!Literal.Factory.hasType(propertyValue, literalType))
                continue;
            propertyLiterals.push(Literal.Factory.parse(propertyValue));
        }
        return propertyLiterals;
    };
    Util.getPropertyLanguageMap = function (expandedObject, propertyURI) {
        var propertyValues = expandedObject[propertyURI];
        if (!propertyValues)
            return null;
        var propertyLanguageMap = {};
        for (var _i = 0, propertyValues_7 = propertyValues; _i < propertyValues_7.length; _i++) {
            var propertyValue = propertyValues_7[_i];
            if (!Literal.Factory.is(propertyValue))
                continue;
            if (!Literal.Factory.hasType(propertyValue, XSD.DataType.string))
                continue;
            var languageTag = propertyValue["@language"];
            if (!languageTag)
                continue;
            propertyLanguageMap[languageTag] = Literal.Factory.parse(propertyValue);
        }
        return propertyLanguageMap;
    };
    Util.getList = function (propertyValues) {
        for (var _i = 0, propertyValues_8 = propertyValues; _i < propertyValues_8.length; _i++) {
            var propertyValue = propertyValues_8[_i];
            if (!List.Factory.is(propertyValue))
                continue;
            return propertyValue;
        }
        return null;
    };
    return Util;
}());
exports.Util = Util;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils = __webpack_require__(0);
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (value) {
        return Utils.hasPropertyDefined(value, "@list");
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Resource = __webpack_require__(5);
var Utils = __webpack_require__(0);
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "document"));
    };
    Factory.create = function (idOrDocument, document) {
        return this.createFrom({}, idOrDocument, document);
    };
    Factory.createFrom = function (object, idOrDocument, document) {
        if (document === void 0) { document = null; }
        var id = !!idOrDocument && Utils.isString(idOrDocument) ? idOrDocument : "";
        document = document || idOrDocument;
        var resource = Resource.Factory.createFrom(object, id);
        if (Factory.hasClassProperties(resource))
            return resource;
        Object.defineProperties(resource, {
            "document": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: document,
            },
        });
        return resource;
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils = __webpack_require__(0);
function syncSnapshot() {
    var resource = this;
    resource._snapshot = Utils.O.clone(resource, { arrays: true });
    if ("id" in resource)
        resource._snapshot.id = resource.id;
    if ("types" in resource)
        resource._snapshot.types = Utils.O.clone(resource.types);
}
function isDirty() {
    var resource = this;
    if (!Utils.O.areEqual(resource, resource._snapshot, { arrays: true }, { id: true, types: true }))
        return true;
    var response = false;
    if ("id" in resource)
        response = response || resource._snapshot.id !== resource.id;
    if ("types" in resource)
        response = response || !Utils.O.areEqual(resource._snapshot.types, resource.types);
    return response;
}
function revert() {
    var resource = this;
    for (var _i = 0, _a = Object.keys(resource); _i < _a.length; _i++) {
        var key = _a[_i];
        if (!(key in resource._snapshot))
            delete resource[key];
    }
    Utils.O.extend(resource, resource._snapshot, { arrays: true });
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return (Utils.hasPropertyDefined(object, "_snapshot")
            && Utils.hasFunction(object, "_syncSnapshot")
            && Utils.hasFunction(object, "isDirty")
            && Utils.hasFunction(object, "revert"));
    };
    Factory.decorate = function (object, snapshot) {
        if (snapshot === void 0) { snapshot = {}; }
        if (Factory.hasClassProperties(object))
            return object;
        var persistedResource = object;
        Object.defineProperties(persistedResource, {
            "_snapshot": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: snapshot,
            },
            "_syncSnapshot": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: syncSnapshot,
            },
            "isDirty": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: isDirty,
            },
            "revert": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: revert,
            },
        });
        return persistedResource;
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NS = __webpack_require__(1);
var PersistedProtectedDocument = __webpack_require__(20);
var Utils = __webpack_require__(0);
var PersistedCredentials = __webpack_require__(58);
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.isObject(object)
            && Utils.hasFunction(object, "enableCredentials")
            && Utils.hasFunction(object, "disableCredentials");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && PersistedProtectedDocument.Factory.is(object);
    };
    Factory.decorate = function (object, documents) {
        var persistedUser = object;
        if (Factory.hasClassProperties(persistedUser))
            return persistedUser;
        if (!PersistedProtectedDocument.Factory.hasClassProperties(persistedUser))
            PersistedProtectedDocument.Factory.decorate(persistedUser, documents);
        Object.defineProperties(persistedUser, {
            "enableCredentials": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: changeEnabledCredentials.bind(persistedUser, true),
            },
            "disableCredentials": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: changeEnabledCredentials.bind(persistedUser, false),
            },
        });
        if (persistedUser.credentials)
            PersistedCredentials.Factory.decorate(persistedUser.credentials, documents);
        return persistedUser;
    };
    return Factory;
}());
exports.Factory = Factory;
function changeEnabledCredentials(enabled, requestOptions) {
    var _this = this;
    var promise = "credentials" in this ?
        Promise.resolve() : obtainCredentials(this);
    var responses = [];
    return promise.then(function (response) {
        if (response)
            responses.push(response);
        if (enabled)
            return _this.credentials.enable(requestOptions);
        return _this.credentials.disable(requestOptions);
    }).then(function (_a) {
        var _credentials = _a[0], credentialsResponses = _a[1];
        responses.push.apply(responses, credentialsResponses);
        return [_this, responses];
    });
}
function obtainCredentials(user) {
    return user
        .executeSELECTQuery("BASE<" + user.id + ">SELECT?c FROM<>WHERE{GRAPH<>{<><" + NS.CS.Predicate.credentials + ">?c}}")
        .then(function (_a) {
        var credentialsBinding = _a[0].bindings[0], response = _a[1];
        user.credentials = PersistedCredentials.Factory.decorate(credentialsBinding.credentials, user._documents);
        return response;
    });
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Token_1 = __webpack_require__(11);
var Identifier_1 = __webpack_require__(15);
var Operator_1 = __webpack_require__(25);
var NewLineSymbol_1 = __webpack_require__(16);
var LeftSymbol_1 = __webpack_require__(66);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RightSymbol;

//# sourceMappingURL=RightSymbol.js.map


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TriplesPattern_1 = __webpack_require__(40);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TriplesSubject;

//# sourceMappingURL=TriplesSubject.js.map


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ObjectPattern = __webpack_require__(26);
var Tokens_1 = __webpack_require__(6);
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
                    _this.patternTokens.push(Tokens_1.SAME_SUBJECT_SEPARATOR);
                    return _this._addPattern(property, objects);
                },
            },
        };
    };
    ;
    TriplesPattern.prototype._addPattern = function (property, values) {
        var tokens = (typeof property === "string" || property instanceof String)
            ? this.resolver._resolveIRI(property, true)
            : property.getSelfTokens();
        values = Array.isArray(values) ? values : [values];
        values.forEach(function (value, index, array) {
            tokens.push.apply(tokens, ObjectPattern.serialize(value));
            if (index < array.length - 1)
                tokens.push(Tokens_1.SAME_PROPERTY_SEPARATOR);
        });
        (_a = this.patternTokens).push.apply(_a, tokens);
        return Object.assign({}, this.interfaces.addPattern, this.interfaces.graphPattern);
        var _a;
    };
    return TriplesPattern;
}());
exports.TriplesPattern = TriplesPattern;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TriplesPattern;

//# sourceMappingURL=TriplesPattern.js.map


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __webpack_require__(3);
var HTTP = __webpack_require__(7);
var RDF = __webpack_require__(4);
var Utils = __webpack_require__(0);
var AccessPoint = __webpack_require__(51);
var Auth = __webpack_require__(19);
var Document = __webpack_require__(10);
var FreeResources = __webpack_require__(30);
var JSONLD = __webpack_require__(17);
var PersistedDocument = __webpack_require__(23);
var PersistedFragment = __webpack_require__(24);
var PersistedProtectedDocument = __webpack_require__(20);
var ProtectedDocument = __webpack_require__(63);
var Pointer = __webpack_require__(8);
var NS = __webpack_require__(1);
var ObjectSchema = __webpack_require__(9);
var LDP = __webpack_require__(18);
var SPARQL = __webpack_require__(64);
var Resource = __webpack_require__(5);
var RetrievalPreferences = __webpack_require__(151);
var Builder_1 = __webpack_require__(65);
var Utils_1 = __webpack_require__(0);
var Class = (function () {
    function Class(context) {
        if (context === void 0) { context = null; }
        this.context = context;
        this.pointers = new Map();
        this.documentsBeingResolved = new Map();
        if (!!this.context && !!this.context.parentContext) {
            var contextJSONLDConverter = this.context.parentContext.documents.jsonldConverter;
            this._jsonldConverter = new JSONLD.Converter.Class(contextJSONLDConverter.literalSerializers);
        }
        else {
            this._jsonldConverter = new JSONLD.Converter.Class();
        }
        var decorators = new Map();
        if (!!this.context && !!this.context.parentContext) {
            var parentDecorators = this.context.parentContext.documents.documentDecorators;
            if (parentDecorators)
                decorators = this._documentDecorators = Utils.M.extend(decorators, parentDecorators);
        }
        else {
            decorators.set(ProtectedDocument.RDF_CLASS, { decorator: PersistedProtectedDocument.Factory.decorate });
            decorators.set(Auth.ACL.RDF_CLASS, { decorator: Auth.PersistedACL.Factory.decorate });
            decorators.set(Auth.User.RDF_CLASS, { decorator: Auth.PersistedUser.Factory.decorate, parameters: [this] });
            decorators.set(Auth.Role.RDF_CLASS, { decorator: Auth.PersistedRole.Factory.decorate, parameters: [this] });
            decorators.set(Auth.Credentials.RDF_CLASS, { decorator: Auth.PersistedCredentials.Factory.decorate, parameters: [this] });
        }
        this._documentDecorators = decorators;
    }
    Object.defineProperty(Class.prototype, "jsonldConverter", {
        get: function () { return this._jsonldConverter; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "documentDecorators", {
        get: function () { return this._documentDecorators; },
        enumerable: true,
        configurable: true
    });
    Class.prototype.inScope = function (idOrPointer) {
        var id = Pointer.Factory.is(idOrPointer) ? idOrPointer.id : idOrPointer;
        if (RDF.URI.Util.isBNodeID(id))
            return false;
        if (!!this.context) {
            if (RDF.URI.Util.isPrefixed(id))
                id = ObjectSchema.Digester.resolvePrefixedURI(id, this.context.getObjectSchema());
            if (RDF.URI.Util.isRelative(id))
                return true;
            if (RDF.URI.Util.isBaseOf(this.context.baseURI, id))
                return true;
        }
        else {
            if (RDF.URI.Util.isAbsolute(id))
                return true;
        }
        if (!!this.context && !!this.context.parentContext)
            return this.context.parentContext.documents.inScope(id);
        return RDF.URI.Util.isRelative(id);
    };
    Class.prototype.hasPointer = function (id) {
        id = this.getPointerID(id);
        if (this.pointers.has(id))
            return true;
        if (!!this.context && !!this.context.parentContext)
            return this.context.parentContext.documents.hasPointer(id);
        return false;
    };
    Class.prototype.getPointer = function (id) {
        var localID = this.getPointerID(id);
        if (localID === null) {
            if (!!this.context && !!this.context.parentContext)
                return this.context.parentContext.documents.getPointer(id);
            throw new Errors.IllegalArgumentError("The pointer id is not supported by this module.");
        }
        var pointer;
        if (!this.pointers.has(localID)) {
            pointer = this.createPointer(localID);
            this.pointers.set(localID, pointer);
        }
        return this.pointers.get(localID);
    };
    Class.prototype.removePointer = function (idOrPointer) {
        var id = Utils.isString(idOrPointer) ? idOrPointer : idOrPointer.id;
        var localID = this.getPointerID(id);
        if (localID === null) {
            if (!!this.context && !!this.context.parentContext)
                return this.context.parentContext.documents.removePointer(id);
            return false;
        }
        return this.pointers.delete(localID);
    };
    Class.prototype.get = function (uri, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            var pointerID = _this.getPointerID(uri);
            uri = _this.getRequestURI(uri);
            _this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.RDFSource);
            if (_this.hasPointer(uri)) {
                var pointer = _this.getPointer(uri);
                if (pointer.isResolved()) {
                    return Promise.resolve([pointer, null]);
                }
            }
            if (_this.documentsBeingResolved.has(pointerID))
                return _this.documentsBeingResolved.get(pointerID);
            var promise = HTTP.Request.Service.get(uri, requestOptions, new RDF.Document.Parser()).then(function (_a) {
                var rdfDocuments = _a[0], response = _a[1];
                var eTag = HTTP.Response.Util.getETag(response);
                if (eTag === null)
                    throw new HTTP.Errors.BadResponseError("The response doesn't contain an ETag", response);
                var locationHeader = response.getHeader("Content-Location");
                if (!!locationHeader) {
                    if (locationHeader.values.length !== 1)
                        throw new HTTP.Errors.BadResponseError("The response contains more than one Content-Location header.", response);
                    uri = locationHeader.toString();
                    if (!uri)
                        throw new HTTP.Errors.BadResponseError("The response doesn't contain a valid 'Content-Location' header.", response);
                }
                var rdfDocument = _this.getRDFDocument(uri, rdfDocuments, response);
                if (rdfDocument === null)
                    throw new HTTP.Errors.BadResponseError("No document was returned.", response);
                var document = _this._getPersistedDocument(rdfDocument, response);
                document._etag = eTag;
                _this.documentsBeingResolved.delete(pointerID);
                return [document, response];
            }).catch(function (error) {
                _this.documentsBeingResolved.delete(pointerID);
                return Promise.reject(error);
            });
            _this.documentsBeingResolved.set(pointerID, promise);
            return promise;
        });
    };
    Class.prototype.exists = function (documentURI, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            _this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.RDFSource);
            return HTTP.Request.Service.head(documentURI, requestOptions);
        }).then(function (response) {
            return [true, response];
        }).catch(function (error) {
            if (error.statusCode === 404)
                return [false, error.response];
            return Promise.reject(error);
        });
    };
    Class.prototype.createChild = function (parentURI, childObject, slugOrRequestOptions, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var slug = Utils.isString(slugOrRequestOptions) ? slugOrRequestOptions : null;
        requestOptions = !Utils.isString(slugOrRequestOptions) && !!slugOrRequestOptions ? slugOrRequestOptions : requestOptions;
        return Utils_1.promiseMethod(function () {
            if (PersistedDocument.Factory.is(childObject))
                return Promise.reject(new Errors.IllegalArgumentError("The child provided has been already persisted."));
            var childDocument = Document.Factory.is(childObject) ? childObject : Document.Factory.createFrom(childObject);
            _this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.Container);
            return _this.persistDocument(parentURI, slug, childDocument, requestOptions);
        });
    };
    Class.prototype.createChildren = function (parentURI, childrenObjects, slugsOrRequestOptions, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var slugs = Utils.isArray(slugsOrRequestOptions) ? slugsOrRequestOptions : null;
        requestOptions = !Utils.isArray(slugsOrRequestOptions) && !!slugsOrRequestOptions ? slugsOrRequestOptions : requestOptions;
        return Promise.all(childrenObjects.map(function (childObject, index) {
            var slug = (slugs !== null && index < slugs.length && !!slugs[index]) ? slugs[index] : null;
            var options = Object.assign({}, requestOptions);
            if (requestOptions.headers)
                options.headers = Utils.M.extend(new Map(), requestOptions.headers);
            return _this.createChild(parentURI, childObject, slug, options);
        })).then(function (requestResponses) {
            var persistedDocuments = requestResponses.map(function (response) { return response[0]; });
            var responses = requestResponses.map(function (response) { return response[1]; });
            return [persistedDocuments, responses];
        });
    };
    Class.prototype.createChildAndRetrieve = function (parentURI, childObject, slugOrRequestOptions, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var responses = [];
        var options = HTTP.Request.Util.isOptions(slugOrRequestOptions) ? slugOrRequestOptions : requestOptions;
        HTTP.Request.Util.setPreferredRetrievalResource("Created", options);
        return this.createChild(parentURI, childObject, slugOrRequestOptions, requestOptions).then(function (_a) {
            var document = _a[0], createResponse = _a[1];
            if (document.isResolved())
                return [document, createResponse];
            responses.push(createResponse);
            return _this.get(document.id);
        }).then(function (_a) {
            var persistedDocument = _a[0], resolveResponse = _a[1];
            responses.push(resolveResponse);
            return [persistedDocument, responses];
        });
    };
    Class.prototype.createChildrenAndRetrieve = function (parentURI, childrenObjects, slugsOrRequestOptions, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        var responses = [];
        var options = HTTP.Request.Util.isOptions(slugsOrRequestOptions) ? slugsOrRequestOptions : requestOptions;
        HTTP.Request.Util.setPreferredRetrievalResource("Created", options);
        return this.createChildren(parentURI, childrenObjects, slugsOrRequestOptions, requestOptions).then(function (_a) {
            var documents = _a[0], creationResponses = _a[1];
            responses.push(creationResponses);
            if (documents.every(function (document) { return document.isResolved(); }))
                return [documents, null];
            return Pointer.Util.resolveAll(documents);
        }).then(function (_a) {
            var persistedDocuments = _a[0], resolveResponses = _a[1];
            if (!!resolveResponses)
                responses.push(resolveResponses);
            return [persistedDocuments, responses];
        });
    };
    Class.prototype.listChildren = function (parentURI, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            parentURI = _this.getRequestURI(parentURI);
            _this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.Container);
            var containerRetrievalPreferences = {
                include: [
                    NS.LDP.Class.PreferContainment,
                ],
                omit: [
                    NS.LDP.Class.PreferMembership,
                    NS.LDP.Class.PreferMinimalContainer,
                    NS.C.Class.PreferContainmentResources,
                    NS.C.Class.PreferMembershipResources,
                ],
            };
            HTTP.Request.Util.setContainerRetrievalPreferences(containerRetrievalPreferences, requestOptions);
            return HTTP.Request.Service.get(parentURI, requestOptions, new RDF.Document.Parser());
        }).then(function (_a) {
            var rdfDocuments = _a[0], response = _a[1];
            var rdfDocument = _this.getRDFDocument(parentURI, rdfDocuments, response);
            if (rdfDocument === null)
                return [[], response];
            var documentResource = _this.getDocumentResource(rdfDocument, response);
            var childPointers = RDF.Node.Util.getPropertyPointers(documentResource, NS.LDP.Predicate.contains, _this);
            var persistedChildPointers = childPointers.map(function (pointer) { return PersistedDocument.Factory.decorate(pointer, _this); });
            return [persistedChildPointers, response];
        });
    };
    Class.prototype.getChildren = function (parentURI, retPrefReqOpt, requestOptions) {
        var _this = this;
        var retrievalPreferences = RetrievalPreferences.Factory.is(retPrefReqOpt) ? retPrefReqOpt : null;
        requestOptions = HTTP.Request.Util.isOptions(retPrefReqOpt) ? retPrefReqOpt : (HTTP.Request.Util.isOptions(requestOptions) ? requestOptions : {});
        var containerURI;
        return Utils_1.promiseMethod(function () {
            parentURI = _this.getRequestURI(parentURI);
            _this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.Container);
            containerURI = parentURI;
            if (!!retrievalPreferences)
                parentURI += RetrievalPreferences.Util.stringifyRetrievalPreferences(retrievalPreferences, _this.getGeneralSchema());
            var containerRetrievalPreferences = {
                include: [
                    NS.LDP.Class.PreferContainment,
                    NS.C.Class.PreferContainmentResources,
                ],
                omit: [
                    NS.LDP.Class.PreferMembership,
                    NS.LDP.Class.PreferMinimalContainer,
                    NS.C.Class.PreferMembershipResources,
                ],
            };
            HTTP.Request.Util.setContainerRetrievalPreferences(containerRetrievalPreferences, requestOptions);
            return HTTP.Request.Service.get(parentURI, requestOptions, new JSONLD.Parser.Class());
        }).then(function (_a) {
            var expandedResult = _a[0], response = _a[1];
            var freeNodes = RDF.Node.Util.getFreeNodes(expandedResult);
            var rdfDocuments = RDF.Document.Util.getDocuments(expandedResult).filter(function (document) { return document["@id"] !== containerURI; });
            var resources = _this.getPersistedMetadataResources(freeNodes, rdfDocuments, response);
            return [resources, response];
        });
    };
    Class.prototype.createAccessPoint = function (documentURI, accessPoint, slugOrRequestOptions, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        if (this.context)
            documentURI = this.context.resolve(documentURI);
        var slug = Utils.isString(slugOrRequestOptions) ? slugOrRequestOptions : null;
        requestOptions = !Utils.isString(slugOrRequestOptions) && !!slugOrRequestOptions ? slugOrRequestOptions : requestOptions;
        return Utils_1.promiseMethod(function () {
            if (PersistedDocument.Factory.is(accessPoint))
                return Promise.reject(new Errors.IllegalArgumentError("The accessPoint provided has been already persisted."));
            var accessPointDocument = AccessPoint.Factory.is(accessPoint) ? accessPoint
                : AccessPoint.Factory.createFrom(accessPoint, _this.getPointer(documentURI), accessPoint.hasMemberRelation, accessPoint.isMemberOfRelation);
            if (accessPointDocument.membershipResource.id !== documentURI)
                return Promise.reject(new Errors.IllegalArgumentError("The documentURI must be the same as the accessPoint's membershipResource"));
            _this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.RDFSource);
            return _this.persistDocument(documentURI, slug, accessPointDocument, requestOptions);
        });
    };
    Class.prototype.createAccessPoints = function (documentURI, accessPoints, slugsOrRequestOptions, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var slugs = Utils.isArray(slugsOrRequestOptions) ? slugsOrRequestOptions : null;
        requestOptions = !Utils.isArray(slugsOrRequestOptions) && !!slugsOrRequestOptions ? slugsOrRequestOptions : requestOptions;
        return Promise.all(accessPoints.map(function (accessPoint, index) {
            var slug = (slugs !== null && index < slugs.length && !!slugs[index]) ? slugs[index] : null;
            var options = Object.assign({}, requestOptions);
            if (requestOptions.headers)
                options.headers = Utils.M.extend(new Map(), requestOptions.headers);
            return _this.createAccessPoint(documentURI, accessPoint, slug, options);
        })).then(function (requestResponses) {
            var persistedAccessPoints = requestResponses.map(function (response) { return response[0]; });
            var responses = requestResponses.map(function (response) { return response[1]; });
            return [persistedAccessPoints, responses];
        });
    };
    Class.prototype.upload = function (parentURI, data, slugOrRequestOptions, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var slug = Utils.isString(slugOrRequestOptions) ? slugOrRequestOptions : null;
        requestOptions = !Utils.isString(slugOrRequestOptions) && !!slugOrRequestOptions ? slugOrRequestOptions : requestOptions;
        if (typeof Blob !== "undefined") {
            if (!(data instanceof Blob))
                return Promise.reject(new Errors.IllegalArgumentError("The data is not a valid Blob object."));
            HTTP.Request.Util.setContentTypeHeader(data.type, requestOptions);
        }
        else {
            if (!(data instanceof Buffer))
                return Promise.reject(new Errors.IllegalArgumentError("The data is not a valid Buffer object."));
            var fileType = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"file-type\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
            var bufferType = fileType(data);
            HTTP.Request.Util.setContentTypeHeader(bufferType ? bufferType.mime : "application/octet-stream", requestOptions);
        }
        return Utils_1.promiseMethod(function () {
            parentURI = _this.getRequestURI(parentURI);
            _this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.Container);
            if (!!slug)
                HTTP.Request.Util.setSlug(slug, requestOptions);
            return HTTP.Request.Service.post(parentURI, data, requestOptions);
        }).then(function (response) {
            var locationHeader = response.getHeader("Location");
            if (locationHeader === null || locationHeader.values.length < 1)
                throw new HTTP.Errors.BadResponseError("The response is missing a Location header.", response);
            if (locationHeader.values.length !== 1)
                throw new HTTP.Errors.BadResponseError("The response contains more than one Location header.", response);
            var locationURI = locationHeader.values[0].toString();
            var pointer = _this.getPointer(locationURI);
            return [pointer, response];
        });
    };
    Class.prototype.listMembers = function (uri, nonReadReqOpt, reqOpt) {
        var _this = this;
        var includeNonReadable = Utils.isBoolean(nonReadReqOpt) ? nonReadReqOpt : true;
        var requestOptions = HTTP.Request.Util.isOptions(nonReadReqOpt) ? nonReadReqOpt : (HTTP.Request.Util.isOptions(reqOpt) ? reqOpt : {});
        return Utils_1.promiseMethod(function () {
            uri = _this.getRequestURI(uri);
            _this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.Container);
            var containerRetrievalPreferences = {
                include: [
                    NS.LDP.Class.PreferMinimalContainer,
                    NS.LDP.Class.PreferMembership,
                ],
                omit: [
                    NS.LDP.Class.PreferContainment,
                    NS.C.Class.PreferContainmentResources,
                    NS.C.Class.PreferMembershipResources,
                ],
            };
            if (includeNonReadable) {
                containerRetrievalPreferences.include.push(NS.C.Class.NonReadableMembershipResourceTriples);
            }
            else {
                containerRetrievalPreferences.omit.push(NS.C.Class.NonReadableMembershipResourceTriples);
            }
            HTTP.Request.Util.setContainerRetrievalPreferences(containerRetrievalPreferences, requestOptions);
            return HTTP.Request.Service.get(uri, requestOptions, new RDF.Document.Parser());
        }).then(function (_a) {
            var rdfDocuments = _a[0], response = _a[1];
            var rdfDocument = _this.getRDFDocument(uri, rdfDocuments, response);
            if (rdfDocument === null)
                throw new HTTP.Errors.BadResponseError("No document was returned.", response);
            var documentResource = _this.getDocumentResource(rdfDocument, response);
            var membershipResource = _this.getMembershipResource(documentResource, rdfDocuments, response);
            if (membershipResource === null)
                return [[], response];
            var hasMemberRelation = RDF.Node.Util.getPropertyURI(documentResource, NS.LDP.Predicate.hasMemberRelation);
            var memberPointers = RDF.Node.Util.getPropertyPointers(membershipResource, hasMemberRelation, _this);
            var persistedMemberPointers = memberPointers.map(function (pointer) { return PersistedDocument.Factory.decorate(pointer, _this); });
            return [persistedMemberPointers, response];
        });
    };
    Class.prototype.getMembers = function (uri, nonReadRetPrefReqOpt, retPrefReqOpt, requestOptions) {
        var _this = this;
        var includeNonReadable = Utils.isBoolean(nonReadRetPrefReqOpt) ? nonReadRetPrefReqOpt : true;
        var retrievalPreferences = RetrievalPreferences.Factory.is(nonReadRetPrefReqOpt) ? nonReadRetPrefReqOpt : (RetrievalPreferences.Factory.is(retPrefReqOpt) ? retPrefReqOpt : null);
        requestOptions = HTTP.Request.Util.isOptions(nonReadRetPrefReqOpt) ? nonReadRetPrefReqOpt : (HTTP.Request.Util.isOptions(retPrefReqOpt) ? retPrefReqOpt : (HTTP.Request.Util.isOptions(requestOptions) ? requestOptions : {}));
        var containerURI;
        return Utils_1.promiseMethod(function () {
            uri = _this.getRequestURI(uri);
            _this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.Container);
            containerURI = uri;
            if (!!retrievalPreferences)
                uri += RetrievalPreferences.Util.stringifyRetrievalPreferences(retrievalPreferences, _this.getGeneralSchema());
            var containerRetrievalPreferences = {
                include: [
                    NS.LDP.Class.PreferMinimalContainer,
                    NS.LDP.Class.PreferMembership,
                    NS.C.Class.PreferMembershipResources,
                ],
                omit: [
                    NS.LDP.Class.PreferContainment,
                    NS.C.Class.PreferContainmentResources,
                ],
            };
            if (includeNonReadable) {
                containerRetrievalPreferences.include.push(NS.C.Class.NonReadableMembershipResourceTriples);
            }
            else {
                containerRetrievalPreferences.omit.push(NS.C.Class.NonReadableMembershipResourceTriples);
            }
            HTTP.Request.Util.setContainerRetrievalPreferences(containerRetrievalPreferences, requestOptions);
            return HTTP.Request.Service.get(uri, requestOptions, new JSONLD.Parser.Class());
        }).then(function (_a) {
            var expandedResult = _a[0], response = _a[1];
            var freeNodes = RDF.Node.Util.getFreeNodes(expandedResult);
            var rdfDocuments = RDF.Document.Util.getDocuments(expandedResult);
            var rdfDocument = _this.getRDFDocument(containerURI, rdfDocuments, response);
            if (rdfDocument === null)
                throw new HTTP.Errors.BadResponseError("No document was returned.", response);
            var containerResource = _this.getDocumentResource(rdfDocument, response);
            var membershipResource = _this.getMembershipResource(containerResource, rdfDocuments, response);
            if (membershipResource === null)
                return [[], response];
            rdfDocuments = rdfDocuments.filter(function (targetRDFDocument) {
                return !RDF.Node.Util.areEqual(targetRDFDocument, containerResource)
                    && !RDF.Node.Util.areEqual(targetRDFDocument, membershipResource);
            });
            var resources = _this.getPersistedMetadataResources(freeNodes, rdfDocuments, response);
            return [resources, response];
        });
    };
    Class.prototype.addMember = function (documentURI, memberORUri, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        return this.addMembers(documentURI, [memberORUri], requestOptions);
    };
    Class.prototype.addMembers = function (documentURI, members, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            var pointers = _this._parseMembers(members);
            documentURI = _this.getRequestURI(documentURI);
            _this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.Container);
            HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
            var document = LDP.AddMemberAction.Factory.createDocument(pointers);
            var body = document.toJSON(_this, _this.jsonldConverter);
            return HTTP.Request.Service.put(documentURI, body, requestOptions);
        });
    };
    Class.prototype.removeMember = function (documentURI, memberORUri, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        return this.removeMembers(documentURI, [memberORUri], requestOptions);
    };
    Class.prototype.removeMembers = function (documentURI, members, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            var pointers = _this._parseMembers(members);
            documentURI = _this.getRequestURI(documentURI);
            _this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.Container);
            HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
            var document = LDP.RemoveMemberAction.Factory.createDocument(pointers);
            var containerRetrievalPreferences = {
                include: [NS.C.Class.PreferSelectedMembershipTriples],
                omit: [NS.C.Class.PreferMembershipTriples],
            };
            HTTP.Request.Util.setContainerRetrievalPreferences(containerRetrievalPreferences, requestOptions, false);
            var body = document.toJSON(_this, _this.jsonldConverter);
            return HTTP.Request.Service.delete(documentURI, body, requestOptions);
        });
    };
    Class.prototype.removeAllMembers = function (documentURI, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            _this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.Container);
            var containerRetrievalPreferences = {
                include: [
                    NS.C.Class.PreferMembershipTriples,
                ],
                omit: [
                    NS.C.Class.PreferMembershipResources,
                    NS.C.Class.PreferContainmentTriples,
                    NS.C.Class.PreferContainmentResources,
                    NS.C.Class.PreferContainer,
                ],
            };
            HTTP.Request.Util.setContainerRetrievalPreferences(containerRetrievalPreferences, requestOptions, false);
            return HTTP.Request.Service.delete(documentURI, requestOptions);
        });
    };
    Class.prototype.save = function (persistedDocument, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            var uri = _this.getRequestURI(persistedDocument.id);
            _this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.RDFSource);
            HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
            HTTP.Request.Util.setIfMatchHeader(persistedDocument._etag, requestOptions);
            persistedDocument._normalize();
            var body = persistedDocument.toJSON(_this, _this.jsonldConverter);
            return HTTP.Request.Service.put(uri, body, requestOptions);
        }).then(function (response) {
            return _this.applyResponseData(persistedDocument, response);
        });
    };
    Class.prototype.refresh = function (persistedDocument, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var uri;
        return Utils_1.promiseMethod(function () {
            uri = _this.getRequestURI(persistedDocument.id);
            _this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.RDFSource);
            HTTP.Request.Util.setIfNoneMatchHeader(persistedDocument._etag, requestOptions);
            return HTTP.Request.Service.get(uri, requestOptions, new RDF.Document.Parser());
        }).then(function (_a) {
            var rdfDocuments = _a[0], response = _a[1];
            if (response === null)
                return [rdfDocuments, response];
            var eTag = HTTP.Response.Util.getETag(response);
            if (eTag === null)
                throw new HTTP.Errors.BadResponseError("The response doesn't contain an ETag", response);
            var rdfDocument = _this.getRDFDocument(uri, rdfDocuments, response);
            if (rdfDocument === null)
                throw new HTTP.Errors.BadResponseError("No document was returned.", response);
            var updatedPersistedDocument = _this._getPersistedDocument(rdfDocument, response);
            updatedPersistedDocument._etag = eTag;
            return [updatedPersistedDocument, response];
        }).catch(function (error) {
            if (error.statusCode === 304)
                return [persistedDocument, null];
            return Promise.reject(error);
        });
    };
    Class.prototype.saveAndRefresh = function (persistedDocument, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var responses = [];
        var previousETag = persistedDocument._etag;
        return Utils.promiseMethod(function () {
            HTTP.Request.Util.setPreferredRetrievalResource("Modified", requestOptions);
            return _this.save(persistedDocument, requestOptions);
        }).then(function (_a) {
            var document = _a[0], saveResponse = _a[1];
            if (document._etag !== previousETag)
                return [document, saveResponse];
            responses.push(saveResponse);
            return _this.refresh(document);
        }).then(function (_a) {
            var document = _a[0], refreshResponse = _a[1];
            responses.push(refreshResponse);
            return [persistedDocument, responses];
        });
    };
    Class.prototype.delete = function (documentURI, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            _this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.RDFSource);
            return HTTP.Request.Service.delete(documentURI, requestOptions);
        }).then(function (response) {
            var pointerID = _this.getPointerID(documentURI);
            _this.pointers.delete(pointerID);
            return response;
        });
    };
    Class.prototype.getDownloadURL = function (documentURI, requestOptions) {
        var _this = this;
        if (!this.context)
            return Promise.reject(new Errors.IllegalStateError("This instance doesn't support Authenticated request."));
        return Utils_1.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            return _this.context.auth.getAuthenticatedURL(documentURI, requestOptions);
        });
    };
    Class.prototype.getGeneralSchema = function () {
        if (!this.context)
            return new ObjectSchema.DigestedObjectSchema();
        var schema = ObjectSchema.Digester.combineDigestedObjectSchemas([this.context.getObjectSchema()]);
        if (this.context.hasSetting("vocabulary"))
            schema.vocab = this.context.resolve(this.context.getSetting("vocabulary"));
        return schema;
    };
    Class.prototype.getSchemaFor = function (object) {
        return ("@id" in object) ?
            this.getDigestedObjectSchemaForExpandedObject(object) :
            this.getDigestedObjectSchemaForDocument(object);
    };
    Class.prototype.executeRawASKQuery = function (documentURI, askQuery, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            if (_this.context && _this.context.auth.isAuthenticated())
                _this.context.auth.addAuthentication(requestOptions);
            return SPARQL.Service.executeRawASKQuery(documentURI, askQuery, requestOptions);
        });
    };
    Class.prototype.executeASKQuery = function (documentURI, askQuery, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            if (_this.context && _this.context.auth.isAuthenticated())
                _this.context.auth.addAuthentication(requestOptions);
            return SPARQL.Service.executeASKQuery(documentURI, askQuery, requestOptions);
        });
    };
    Class.prototype.executeRawSELECTQuery = function (documentURI, selectQuery, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            if (_this.context && _this.context.auth.isAuthenticated())
                _this.context.auth.addAuthentication(requestOptions);
            return SPARQL.Service.executeRawSELECTQuery(documentURI, selectQuery, requestOptions);
        });
    };
    Class.prototype.executeSELECTQuery = function (documentURI, selectQuery, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            if (_this.context && _this.context.auth.isAuthenticated())
                _this.context.auth.addAuthentication(requestOptions);
            return SPARQL.Service.executeSELECTQuery(documentURI, selectQuery, _this, requestOptions);
        });
    };
    Class.prototype.executeRawCONSTRUCTQuery = function (documentURI, constructQuery, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            if (_this.context && _this.context.auth.isAuthenticated())
                _this.context.auth.addAuthentication(requestOptions);
            return SPARQL.Service.executeRawCONSTRUCTQuery(documentURI, constructQuery, requestOptions);
        });
    };
    Class.prototype.executeRawDESCRIBEQuery = function (documentURI, describeQuery, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            if (_this.context && _this.context.auth.isAuthenticated())
                _this.context.auth.addAuthentication(requestOptions);
            return SPARQL.Service.executeRawDESCRIBEQuery(documentURI, describeQuery, requestOptions);
        });
    };
    Class.prototype.executeUPDATE = function (documentURI, update, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            if (_this.context && _this.context.auth.isAuthenticated())
                _this.context.auth.addAuthentication(requestOptions);
            return SPARQL.Service.executeUPDATE(documentURI, update, requestOptions);
        });
    };
    Class.prototype.sparql = function (documentURI) {
        var sparqlBuilder = new Builder_1.default();
        sparqlBuilder._documents = this;
        sparqlBuilder._entryPoint = documentURI;
        var builder = sparqlBuilder.base(documentURI);
        if (!!this.context) {
            builder.base(this.context.baseURI);
            if (this.context.hasSetting("vocabulary"))
                builder.vocab(this.context.resolve(this.context.getSetting("vocabulary")));
            var schema = this.context.getObjectSchema();
            schema.prefixes.forEach(function (uri, prefix) {
                builder.prefix(prefix, uri.stringValue);
            });
        }
        return builder;
    };
    Class.prototype._getPersistedDocument = function (rdfDocument, response) {
        var documentResource = this.getDocumentResource(rdfDocument, response);
        var fragmentResources = RDF.Document.Util.getBNodeResources(rdfDocument);
        fragmentResources = fragmentResources.concat(RDF.Document.Util.getFragmentResources(rdfDocument));
        var uri = documentResource["@id"];
        var documentPointer = this.getPointer(uri);
        var persistedDocument;
        if (PersistedDocument.Factory.is(documentPointer)) {
            persistedDocument = this.updatePersistedDocument(documentPointer, documentResource, fragmentResources);
        }
        else {
            persistedDocument = this.createPersistedDocument(documentPointer, documentResource, fragmentResources);
        }
        persistedDocument._resolved = true;
        return persistedDocument;
    };
    Class.prototype._getFreeResources = function (nodes) {
        var freeResourcesDocument = FreeResources.Factory.create(this);
        var resources = nodes.map(function (node) { return freeResourcesDocument.createResource(node["@id"]); });
        this.compact(nodes, resources, freeResourcesDocument);
        return freeResourcesDocument;
    };
    Class.prototype.persistDocument = function (parentURI, slug, document, requestOptions) {
        var _this = this;
        parentURI = this.getRequestURI(parentURI);
        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
        if (document.id) {
            var childURI = document.id;
            if (!!this.context)
                childURI = this.context.resolve(childURI);
            if (!RDF.URI.Util.isBaseOf(parentURI, childURI)) {
                return Promise.reject(new Errors.IllegalArgumentError("The document's URI is not relative to the parentURI specified"));
            }
        }
        if (document["__CarbonSDK_InProgressOfPersisting"])
            return Promise.reject(new Errors.IllegalArgumentError("The document is already being persisted."));
        Object.defineProperty(document, "__CarbonSDK_InProgressOfPersisting", { configurable: true, enumerable: false, writable: false, value: true });
        var body = document.toJSON(this, this.jsonldConverter);
        if (!!slug)
            HTTP.Request.Util.setSlug(slug, requestOptions);
        return HTTP.Request.Service.post(parentURI, body, requestOptions).then(function (response) {
            delete document["__CarbonSDK_InProgressOfPersisting"];
            var locationHeader = response.getHeader("Location");
            if (locationHeader === null || locationHeader.values.length < 1)
                throw new HTTP.Errors.BadResponseError("The response is missing a Location header.", response);
            if (locationHeader.values.length !== 1)
                throw new HTTP.Errors.BadResponseError("The response contains more than one Location header.", response);
            var localID = _this.getPointerID(locationHeader.values[0].toString());
            _this.pointers.set(localID, _this.createPointerFrom(document, localID));
            var persistedDocument = PersistedProtectedDocument.Factory.decorate(document, _this);
            persistedDocument.getFragments().forEach(PersistedFragment.Factory.decorate);
            return _this.applyResponseData(persistedDocument, response);
        }).catch(function (error) {
            delete document["__CarbonSDK_InProgressOfPersisting"];
            return Promise.reject(error);
        });
    };
    Class.prototype.getRDFDocument = function (requestURL, rdfDocuments, response) {
        rdfDocuments = rdfDocuments.filter(function (rdfDocument) { return rdfDocument["@id"] === requestURL; });
        if (rdfDocuments.length > 1)
            throw new HTTP.Errors.BadResponseError("Several documents share the same id.", response);
        return rdfDocuments.length > 0 ? rdfDocuments[0] : null;
    };
    Class.prototype.getDocumentResource = function (rdfDocument, response) {
        var documentResources = RDF.Document.Util.getDocumentResources(rdfDocument);
        if (documentResources.length === 0)
            throw new HTTP.Errors.BadResponseError("The RDFDocument: " + rdfDocument["@id"] + ", doesn't contain a document resource.", response);
        if (documentResources.length > 1)
            throw new HTTP.Errors.BadResponseError("The RDFDocument: " + rdfDocument["@id"] + ", contains more than one document resource.", response);
        return documentResources[0];
    };
    Class.prototype.getPointerID = function (uri) {
        if (RDF.URI.Util.isBNodeID(uri))
            throw new Errors.IllegalArgumentError("BNodes cannot be fetched directly.");
        if (!!this.context) {
            if (RDF.URI.Util.isPrefixed(uri))
                uri = ObjectSchema.Digester.resolvePrefixedURI(uri, this.getGeneralSchema());
            if (!RDF.URI.Util.isRelative(uri)) {
                var baseURI = this.context.baseURI;
                if (!RDF.URI.Util.isBaseOf(baseURI, uri))
                    return null;
                return uri.substring(baseURI.length);
            }
            else {
                return uri[0] === "/" ? uri.substr(1) : uri;
            }
        }
        else {
            if (RDF.URI.Util.isPrefixed(uri))
                throw new Errors.IllegalArgumentError("This Documents instance doesn't support prefixed URIs.");
            if (RDF.URI.Util.isRelative(uri))
                throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
            return uri;
        }
    };
    Class.prototype.createPointer = function (localID) {
        return this.createPointerFrom({}, localID);
    };
    Class.prototype.createPointerFrom = function (object, localID) {
        var _this = this;
        var id = !!this.context ? this.context.resolve(localID) : localID;
        var pointer = Pointer.Factory.createFrom(object, id);
        Object.defineProperty(pointer, "resolve", {
            writable: false,
            enumerable: false,
            configurable: true,
            value: function () {
                return _this.get(id);
            },
        });
        return pointer;
    };
    Class.prototype.compact = function (expandedObjectOrObjects, targetObjectOrObjects, pointerLibrary) {
        if (!Utils.isArray(expandedObjectOrObjects))
            return this.compactSingle(expandedObjectOrObjects, targetObjectOrObjects, pointerLibrary);
        var expandedObjects = expandedObjectOrObjects;
        var targetObjects = !!targetObjectOrObjects ? targetObjectOrObjects : [];
        for (var i = 0, length_1 = expandedObjects.length; i < length_1; i++) {
            var expandedObject = expandedObjects[i];
            var targetObject = targetObjects[i] = !!targetObjects[i] ? targetObjects[i] : {};
            this.compactSingle(expandedObject, targetObject, pointerLibrary);
        }
        return targetObjects;
    };
    Class.prototype.compactSingle = function (expandedObject, targetObject, pointerLibrary) {
        var digestedSchema = this.getDigestedObjectSchemaForExpandedObject(expandedObject);
        return this.jsonldConverter.compact(expandedObject, targetObject, digestedSchema, pointerLibrary);
    };
    Class.prototype.getDigestedObjectSchemaForExpandedObject = function (expandedObject) {
        var types = RDF.Node.Util.getTypes(expandedObject);
        return this.getDigestedObjectSchema(types, expandedObject["@id"]);
    };
    Class.prototype.getDigestedObjectSchemaForDocument = function (document) {
        var types = Resource.Util.getTypes(document);
        return this.getDigestedObjectSchema(types, document.id);
    };
    Class.prototype.getDigestedObjectSchema = function (objectTypes, objectID) {
        if (!this.context)
            return new ObjectSchema.DigestedObjectSchema();
        var objectSchemas = [this.context.getObjectSchema()];
        if (Utils.isDefined(objectID) && !RDF.URI.Util.hasFragment(objectID) && !RDF.URI.Util.isBNodeID(objectID))
            objectSchemas.push(Class._documentSchema);
        for (var _i = 0, objectTypes_1 = objectTypes; _i < objectTypes_1.length; _i++) {
            var type = objectTypes_1[_i];
            if (this.context.hasObjectSchema(type))
                objectSchemas.push(this.context.getObjectSchema(type));
        }
        var digestedSchema = ObjectSchema.Digester.combineDigestedObjectSchemas(objectSchemas);
        if (this.context.hasSetting("vocabulary"))
            digestedSchema.vocab = this.context.resolve(this.context.getSetting("vocabulary"));
        return digestedSchema;
    };
    Class.prototype.getRequestURI = function (uri) {
        if (RDF.URI.Util.isPrefixed(uri)) {
            if (!this.context)
                throw new Errors.IllegalArgumentError("This Documents instance doesn't support prefixed URIs.");
            uri = ObjectSchema.Digester.resolvePrefixedURI(uri, this.context.getObjectSchema());
            if (RDF.URI.Util.isPrefixed(uri))
                throw new Errors.IllegalArgumentError("The prefixed URI \"" + uri + "\" could not be resolved.");
        }
        else if (RDF.URI.Util.isRelative(uri)) {
            if (!this.context)
                throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
            uri = this.context.resolve(uri);
        }
        else if (this.context && !RDF.URI.Util.isBaseOf(this.context.baseURI, uri)) {
            throw new Errors.IllegalArgumentError("\"" + uri + "\" isn't a valid URI for this Carbon instance.");
        }
        return uri;
    };
    Class.prototype.setDefaultRequestOptions = function (requestOptions, interactionModel) {
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(interactionModel, requestOptions);
        return requestOptions;
    };
    Class.prototype.getMembershipResource = function (documentResource, rdfDocuments, response) {
        var membershipResource;
        var membershipResourceURI = RDF.Node.Util.getPropertyURI(documentResource, NS.LDP.Predicate.membershipResource);
        if (documentResource["@id"] === membershipResourceURI) {
            membershipResource = documentResource;
        }
        else if (membershipResourceURI === null) {
            if (documentResource["@type"].indexOf(NS.LDP.Class.BasicContainer) !== -1) {
                membershipResource = documentResource;
            }
            else {
                throw new HTTP.Errors.BadResponseError("The document is not an ldp:BasicContainer and it doesn't contain an ldp:membershipResource triple.", response);
            }
        }
        else {
            var membershipResourceDocument = this.getRDFDocument(membershipResourceURI, rdfDocuments, response);
            if (membershipResourceDocument === null)
                return null;
            membershipResource = this.getDocumentResource(membershipResourceDocument, response);
        }
        return membershipResource;
    };
    Class.prototype.createPersistedDocument = function (documentPointer, documentResource, fragmentResources) {
        var persistedDocument = PersistedDocument.Factory.decorate(documentPointer, this);
        var fragments = [];
        for (var _i = 0, fragmentResources_1 = fragmentResources; _i < fragmentResources_1.length; _i++) {
            var fragmentResource = fragmentResources_1[_i];
            fragments.push(persistedDocument.createFragment(fragmentResource["@id"]));
        }
        this.compact(documentResource, persistedDocument, persistedDocument);
        this.compact(fragmentResources, fragments, persistedDocument);
        persistedDocument._syncSnapshot();
        fragments.forEach(function (fragment) { return fragment._syncSnapshot(); });
        persistedDocument._syncSavedFragments();
        this.decoratePersistedDocument(persistedDocument);
        return persistedDocument;
    };
    Class.prototype.updatePersistedDocument = function (persistedDocument, documentResource, fragmentsNode) {
        for (var _i = 0, fragmentsNode_1 = fragmentsNode; _i < fragmentsNode_1.length; _i++) {
            var fragmentNode = fragmentsNode_1[_i];
            var targetObject = {};
            var currentFragment = persistedDocument.getFragment(fragmentNode["@id"]) ||
                persistedDocument.createFragment(targetObject, fragmentNode["@id"]);
            var tempFragmentData = this.compactSingle(fragmentNode, targetObject, persistedDocument);
            if (currentFragment)
                Utils.O.shallowUpdate(currentFragment, tempFragmentData);
            currentFragment._syncSnapshot();
        }
        persistedDocument._syncSavedFragments();
        var tempDocumentData = this.compact(documentResource, {}, persistedDocument);
        Utils.O.shallowUpdate(persistedDocument, tempDocumentData);
        persistedDocument._syncSnapshot();
        this.decoratePersistedDocument(persistedDocument);
        return persistedDocument;
    };
    Class.prototype.getPersistedMetadataResources = function (freeNodes, rdfDocuments, response) {
        var _this = this;
        var freeResources = this._getFreeResources(freeNodes);
        var descriptionResources = freeResources.getResources().filter(LDP.ResponseMetadata.Factory.is);
        if (descriptionResources.length === 0)
            return [];
        if (descriptionResources.length > 1)
            throw new HTTP.Errors.BadResponseError("The response contained multiple " + LDP.ResponseMetadata.RDF_CLASS + " objects.", response);
        rdfDocuments.forEach(function (rdfDocument) { return _this._getPersistedDocument(rdfDocument, response); });
        var responseMetadata = descriptionResources[0];
        return responseMetadata.documentsMetadata.map(function (documentMetadata) {
            var document = documentMetadata.relatedDocument;
            document._etag = documentMetadata.eTag;
            return document;
        });
    };
    Class.prototype.decoratePersistedDocument = function (persistedDocument) {
        this._documentDecorators.forEach(function (options, type) {
            if (!persistedDocument.hasType(type))
                return;
            (_a = options.decorator).call.apply(_a, [null, persistedDocument].concat(options.parameters));
            var _a;
        });
    };
    Class.prototype.updateFromPreferenceApplied = function (persistedDocument, rdfDocuments, response) {
        var eTag = HTTP.Response.Util.getETag(response);
        if (eTag === null)
            throw new HTTP.Errors.BadResponseError("The response doesn't contain an ETag", response);
        var rdfDocument = this.getRDFDocument(persistedDocument.id, rdfDocuments, response);
        if (rdfDocument === null)
            throw new HTTP.Errors.BadResponseError("No document was returned.", response);
        persistedDocument = this._getPersistedDocument(rdfDocument, response);
        persistedDocument._etag = eTag;
        return [persistedDocument, response];
    };
    Class.prototype._parseMembers = function (pointers) {
        var _this = this;
        return pointers.map(function (pointer) {
            if (Utils.isString(pointer))
                return _this.getPointer(pointer);
            if (Pointer.Factory.is(pointer))
                return pointer;
            throw new Errors.IllegalArgumentError("No Carbon.Pointer or URI provided.");
        });
    };
    Class.prototype.applyResponseData = function (persistedProtectedDocument, response) {
        var _this = this;
        if (response.status === 204 || !response.data)
            return [persistedProtectedDocument, response];
        return new JSONLD.Parser.Class().parse(response.data).then(function (expandedResult) {
            var freeNodes = RDF.Node.Util.getFreeNodes(expandedResult);
            _this.applyNodeMap(freeNodes);
            var preferenceHeader = response.getHeader("Preference-Applied");
            if (preferenceHeader === null || preferenceHeader.toString() !== "return=representation")
                return [persistedProtectedDocument, response];
            var rdfDocuments = RDF.Document.Util.getDocuments(expandedResult);
            return _this.updateFromPreferenceApplied(persistedProtectedDocument, rdfDocuments, response);
        });
    };
    Class.prototype.applyNodeMap = function (freeNodes) {
        if (!freeNodes.length)
            return;
        var freeResources = this._getFreeResources(freeNodes);
        var responseMetadata = freeResources.getResources().find(LDP.ResponseMetadata.Factory.is);
        for (var _i = 0, _a = responseMetadata.documentsMetadata; _i < _a.length; _i++) {
            var documentMetadata = _a[_i];
            var document_1 = documentMetadata.relatedDocument;
            for (var _b = 0, _c = documentMetadata.bNodesMap.entries; _b < _c.length; _b++) {
                var _d = _c[_b], entryKey = _d.entryKey, entryValue = _d.entryValue;
                var originalBNode = document_1.getFragment(entryKey.id);
                originalBNode.id = entryValue.id;
                document_1._fragmentsIndex.delete(entryKey.id);
                document_1._fragmentsIndex.set(entryValue.id, originalBNode);
            }
            document_1._syncSavedFragments();
        }
    };
    Class._documentSchema = ObjectSchema.Digester.digestSchema(Document.SCHEMA);
    return Class;
}());
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 42 */
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
var AbstractError_1 = __webpack_require__(12);
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return "InvalidJSONLDSyntaxError"; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(AbstractError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(2);
exports.Error = HTTPError_1.default;
var BadRequestError_1 = __webpack_require__(80);
exports.BadRequestError = BadRequestError_1.default;
var ConflictError_1 = __webpack_require__(81);
exports.ConflictError = ConflictError_1.default;
var ForbiddenError_1 = __webpack_require__(82);
exports.ForbiddenError = ForbiddenError_1.default;
var MethodNotAllowedError_1 = __webpack_require__(83);
exports.MethodNotAllowedError = MethodNotAllowedError_1.default;
var NotAcceptableError_1 = __webpack_require__(84);
exports.NotAcceptableError = NotAcceptableError_1.default;
var NotFoundError_1 = __webpack_require__(85);
exports.NotFoundError = NotFoundError_1.default;
var PreconditionFailedError_1 = __webpack_require__(86);
exports.PreconditionFailedError = PreconditionFailedError_1.default;
var PreconditionRequiredError_1 = __webpack_require__(87);
exports.PreconditionRequiredError = PreconditionRequiredError_1.default;
var RequestEntityTooLargeError_1 = __webpack_require__(88);
exports.RequestEntityTooLargeError = RequestEntityTooLargeError_1.default;
var RequestHeaderFieldsTooLargeError_1 = __webpack_require__(89);
exports.RequestHeaderFieldsTooLargeError = RequestHeaderFieldsTooLargeError_1.default;
var RequestURITooLongError_1 = __webpack_require__(90);
exports.RequestURITooLongError = RequestURITooLongError_1.default;
var TooManyRequestsError_1 = __webpack_require__(91);
exports.TooManyRequestsError = TooManyRequestsError_1.default;
var UnauthorizedError_1 = __webpack_require__(92);
exports.UnauthorizedError = UnauthorizedError_1.default;
var UnsupportedMediaTypeError_1 = __webpack_require__(93);
exports.UnsupportedMediaTypeError = UnsupportedMediaTypeError_1.default;
var BadResponseError_1 = __webpack_require__(94);
exports.BadResponseError = BadResponseError_1.default;
var BadGatewayError_1 = __webpack_require__(95);
exports.BadGatewayError = BadGatewayError_1.default;
var GatewayTimeoutError_1 = __webpack_require__(96);
exports.GatewayTimeoutError = GatewayTimeoutError_1.default;
var HTTPVersionNotSupportedError_1 = __webpack_require__(97);
exports.HTTPVersionNotSupportedError = HTTPVersionNotSupportedError_1.default;
var InternalServerErrorError_1 = __webpack_require__(98);
exports.InternalServerErrorError = InternalServerErrorError_1.default;
var NotImplementedError_1 = __webpack_require__(99);
exports.NotImplementedError = NotImplementedError_1.default;
var ServiceUnavailableError_1 = __webpack_require__(100);
exports.ServiceUnavailableError = ServiceUnavailableError_1.default;
var UnknownError_1 = __webpack_require__(101);
exports.UnknownError = UnknownError_1.default;
var client = [];
exports.client = client;
client.push(BadRequestError_1.default);
client.push(ConflictError_1.default);
client.push(ForbiddenError_1.default);
client.push(MethodNotAllowedError_1.default);
client.push(NotAcceptableError_1.default);
client.push(NotFoundError_1.default);
client.push(PreconditionFailedError_1.default);
client.push(PreconditionRequiredError_1.default);
client.push(RequestEntityTooLargeError_1.default);
client.push(RequestHeaderFieldsTooLargeError_1.default);
client.push(RequestURITooLongError_1.default);
client.push(TooManyRequestsError_1.default);
client.push(UnauthorizedError_1.default);
client.push(UnsupportedMediaTypeError_1.default);
var server = [];
exports.server = server;
server.push(BadResponseError_1.default);
server.push(BadGatewayError_1.default);
server.push(GatewayTimeoutError_1.default);
server.push(HTTPVersionNotSupportedError_1.default);
server.push(InternalServerErrorError_1.default);
server.push(NotImplementedError_1.default);
server.push(ServiceUnavailableError_1.default);
var statusCodeMap = new Map();
exports.statusCodeMap = statusCodeMap;
for (var i = 0, length_1 = client.length; i < length_1; i++) {
    statusCodeMap.set(client[i].statusCode, client[i]);
}
for (var i = 0, length_2 = server.length; i < length_2; i++) {
    statusCodeMap.set(server[i].statusCode, server[i]);
}


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Method;
(function (Method) {
    Method[Method["OPTIONS"] = 0] = "OPTIONS";
    Method[Method["HEAD"] = 1] = "HEAD";
    Method[Method["GET"] = 2] = "GET";
    Method[Method["POST"] = 3] = "POST";
    Method[Method["PUT"] = 4] = "PUT";
    Method[Method["PATCH"] = 5] = "PATCH";
    Method[Method["DELETE"] = 6] = "DELETE";
})(Method = exports.Method || (exports.Method = {}));
exports.default = Method;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Header = __webpack_require__(28);
var Utils_1 = __webpack_require__(0);
var Class = (function () {
    function Class(request, data, response) {
        if (response === void 0) { response = {}; }
        if (typeof XMLHttpRequest !== "undefined" && request instanceof XMLHttpRequest) {
            var res = request;
            this.status = res.status;
            this.data = res.responseText;
            this.setHeaders(res.getAllResponseHeaders());
        }
        else {
            this.status = response.statusCode;
            this.data = data || "";
            this.setHeaders(response.headers);
        }
        this.request = request;
    }
    Class.prototype.getHeader = function (name) {
        name = name.toLowerCase();
        return this.headers.get(name) || null;
    };
    Class.prototype.setHeaders = function (headers) {
        if (Utils_1.isString(headers)) {
            this.headers = Header.Util.parseHeaders(headers);
        }
        else {
            this.headers = new Map();
            if (Utils_1.isObject(headers)) {
                for (var _i = 0, _a = Object.keys(headers); _i < _a.length; _i++) {
                    var name_1 = _a[_i];
                    this.headers.set(name_1.toLowerCase(), new Header.Class(headers[name_1]));
                }
            }
        }
    };
    return Class;
}());
exports.Class = Class;
var Util = (function () {
    function Util() {
    }
    Util.getETag = function (response) {
        if (!response || !response.headers)
            return null;
        var etagHeader = response.getHeader("ETag");
        if (!etagHeader)
            return null;
        if (!etagHeader.values.length)
            return null;
        if (etagHeader.values.length > 1)
            console.warn("The response contains more than one ETag. Response: %o", response);
        return etagHeader.values[0].toString();
    };
    return Util;
}());
exports.Util = Util;
exports.default = Class;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FreeResources = __webpack_require__(30);
var Parser_1 = __webpack_require__(48);
var NS = __webpack_require__(1);
var RDF = __webpack_require__(4);
var SDKContext_1 = __webpack_require__(27);
var IllegalArgumentError_1 = __webpack_require__(21);
exports.RDF_CLASS = NS.C.Class.ErrorResponse;
exports.SCHEMA = {
    "errors": {
        "@id": NS.C.Predicate.error,
        "@type": "@id",
        "@container": "@set",
    },
    "requestID": {
        "@id": NS.C.Predicate.requestID,
        "@type": NS.XSD.DataType.string,
    },
    "statusCode": {
        "@id": NS.C.Predicate.httpStatusCode,
        "@type": NS.XSD.DataType.int,
    },
};
var Util = (function () {
    function Util() {
    }
    Util.getMessage = function (errorResponse) {
        return errorResponse
            .errors
            .map(function (error) { return error.errorMessage; })
            .join(", ");
    };
    return Util;
}());
exports.Util = Util;
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.parse = function (input, errorResponse) {
        if (errorResponse === void 0) { errorResponse = {}; }
        var documents = SDKContext_1.default.documents;
        var parser = new Parser_1.default();
        return parser.parse(input).then(function (freeNodes) {
            var freeResources = FreeResources.Factory.create(documents);
            for (var _i = 0, freeNodes_1 = freeNodes; _i < freeNodes_1.length; _i++) {
                var node = freeNodes_1[_i];
                var resource = void 0;
                var errorResponseFound = false;
                if (RDF.Node.Util.hasType(node, exports.RDF_CLASS)) {
                    if (errorResponseFound)
                        throw new IllegalArgumentError_1.default("The input string contains more than once c:ErrorResponse.");
                    resource = freeResources.createResourceFrom(errorResponse);
                    errorResponseFound = true;
                }
                else {
                    resource = freeResources.getPointer(node["@id"]);
                }
                documents.jsonldConverter.compact(node, resource, documents.getSchemaFor(node), freeResources);
            }
            if (!errorResponse)
                throw new IllegalArgumentError_1.default("The input string does not contains a c:ErrorResponse.");
            return errorResponse;
        });
    };
    return Parser;
}());
exports.Parser = Parser;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JSONLD = __webpack_require__(17);
var Node = __webpack_require__(33);
var Utils = __webpack_require__(0);
var URI = __webpack_require__(13);
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (object) {
        return Utils.hasProperty(object, "@graph")
            && Utils.isArray(object["@graph"]);
    };
    Factory.create = function (resources, uri) {
        var document = uri ? Node.Factory.create(uri) : {};
        document["@graph"] = resources;
        return document;
    };
    return Factory;
}());
exports.Factory = Factory;
var Util = (function () {
    function Util() {
    }
    Util.getDocuments = function (value) {
        if (Utils.isArray(value)) {
            var array = value;
            return array.filter(function (element) { return Factory.is(element); });
        }
        else if (Utils.isObject(value)) {
            if (Factory.is(value))
                return [value];
        }
        return [];
    };
    Util.getResources = function (value) {
        var freeNodes = Node.Util.getFreeNodes(value);
        var documents = Util.getDocuments(value);
        var resources = [].concat(freeNodes);
        for (var _i = 0, documents_1 = documents; _i < documents_1.length; _i++) {
            var document_1 = documents_1[_i];
            resources = resources.concat(document_1["@graph"]);
        }
        return resources;
    };
    Util.getDocumentResources = function (document) {
        var resources = Util.getResources(document);
        var documentResources = [];
        for (var i = 0, length_1 = resources.length; i < length_1; i++) {
            var resource = resources[i];
            var uri = resource["@id"];
            if (!uri)
                continue;
            if (!URI.Util.hasFragment(uri) && !URI.Util.isBNodeID(uri))
                documentResources.push(resource);
        }
        return documentResources;
    };
    Util.getFragmentResources = function (document, documentResource) {
        var resources = Util.getResources(document);
        var documentURIToMatch = null;
        if (documentResource) {
            if (Utils.isString(documentResource)) {
                documentURIToMatch = documentResource;
            }
            else
                documentURIToMatch = documentResource["@id"];
        }
        var fragmentResources = [];
        for (var i = 0, length_2 = resources.length; i < length_2; i++) {
            var resource = resources[i];
            var uri = resource["@id"];
            if (!uri)
                continue;
            if (!URI.Util.hasFragment(uri))
                continue;
            if (!documentURIToMatch) {
                fragmentResources.push(resource);
            }
            else {
                var documentURI = URI.Util.getDocumentURI(uri);
                if (documentURI === documentURIToMatch)
                    fragmentResources.push(resource);
            }
        }
        return fragmentResources;
    };
    Util.getBNodeResources = function (document) {
        var resources = Util.getResources(document);
        var bnodes = [];
        for (var i = 0, length_3 = resources.length; i < length_3; i++) {
            var resource = resources[i];
            if (!("@id" in resource) || URI.Util.isBNodeID(resource["@id"]))
                bnodes.push(resource);
        }
        return bnodes;
    };
    return Util;
}());
exports.Util = Util;
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.parse = function (input) {
        var jsonLDParser = new JSONLD.Parser.Class();
        return jsonLDParser.parse(input).then(function (expandedResult) {
            return Util.getDocuments(expandedResult);
        });
    };
    return Parser;
}());
exports.Parser = Parser;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JSONParser_1 = __webpack_require__(29);
var Processor_1 = __webpack_require__(49);
var Class = (function () {
    function Class() {
    }
    Class.prototype.parse = function (input) {
        var jsonParser = new JSONParser_1.default();
        return jsonParser.parse(input).then(function (parsedObject) {
            return Processor_1.default.expand(parsedObject);
        });
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InvalidJSONLDSyntaxError_1 = __webpack_require__(42);
var Errors = __webpack_require__(3);
var HTTP = __webpack_require__(7);
var ObjectSchema = __webpack_require__(9);
var RDF = __webpack_require__(4);
var Utils = __webpack_require__(0);
var MAX_CONTEXT_URLS = 10;
var LINK_HEADER_REL = "http://www.w3.org/ns/json-ld#context";
var Class = (function () {
    function Class() {
    }
    Class.expand = function (input) {
        return this.retrieveContexts(input, Object.create(null), "").then(function () {
            var expanded = Class.process(new ObjectSchema.DigestedObjectSchema(), input);
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
    Class.getTargetFromLinkHeader = function (header) {
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
    Class.findContextURLs = function (input, contexts, base, replace) {
        if (replace === void 0) { replace = false; }
        var previousContexts = Object.keys(contexts).length;
        if (Utils.isArray(input)) {
            for (var _i = 0, _a = input; _i < _a.length; _i++) {
                var element = _a[_i];
                Class.findContextURLs(element, contexts, base);
            }
        }
        else if (Utils.isPlainObject(input)) {
            for (var key in input) {
                if ("@context" !== key) {
                    Class.findContextURLs(input[key], contexts, base);
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
    };
    Class.retrieveContexts = function (input, contextsRequested, base) {
        if (Object.keys(contextsRequested).length > MAX_CONTEXT_URLS)
            return Promise.reject(new InvalidJSONLDSyntaxError_1.default("Maximum number of @context URLs exceeded."));
        var contextToResolved = Object.create(null);
        if (!Class.findContextURLs(input, contextToResolved, base))
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
                        link = Class.getTargetFromLinkHeader(header);
                    if (!!link)
                        contextWrapper["@context"] = link;
                }
                else {
                    contextWrapper["@context"] = ("@context" in object) ? object["@context"] : {};
                }
                contextToResolved[url] = contextWrapper["@context"];
                return Class.retrieveContexts(contextWrapper, _contextsRequested, url);
            });
        }
        var promises = [];
        for (var url in contextToResolved) {
            if (url in contextsRequested)
                return Promise.reject(new InvalidJSONLDSyntaxError_1.default("Cyclical @context URLs detected."));
            var requestOptions = { sendCredentialsOnCORS: false };
            HTTP.Request.Util.setAcceptHeader("application/ld+json, application/json", requestOptions);
            var promise = HTTP.Request.Service.get(url, requestOptions, new HTTP.JSONParser.Class());
            promises.push(resolved(url, promise));
        }
        return Promise.all(promises).then(function () {
            Class.findContextURLs(input, contextToResolved, base, true);
        });
    };
    Class.isKeyword = function (value) {
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
    Class.isValidType = function (value) {
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
    Class.expandURI = function (schema, uri, relativeTo) {
        if (relativeTo === void 0) { relativeTo = {}; }
        if (uri === null || Class.isKeyword(uri) || RDF.URI.Util.isAbsolute(uri))
            return uri;
        if (schema.properties.has(uri))
            return schema.properties.get(uri).uri.stringValue;
        if (RDF.URI.Util.isPrefixed(uri))
            return ObjectSchema.Digester.resolvePrefixedURI(uri, schema);
        if (schema.prefixes.has(uri))
            return schema.prefixes.get(uri).stringValue;
        if (relativeTo.vocab) {
            if (schema.vocab === null)
                return null;
            return schema.vocab + uri;
        }
        if (relativeTo.base)
            RDF.URI.Util.resolve(schema.base, uri);
        return uri;
    };
    Class.expandLanguageMap = function (languageMap) {
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
                    throw new InvalidJSONLDSyntaxError_1.default("Language map values must be strings.");
                expandedLanguage.push({
                    "@value": item,
                    "@language": key.toLowerCase(),
                });
            }
        }
        return expandedLanguage;
    };
    Class.getContainer = function (context, property) {
        if (context.properties.has(property))
            return context.properties.get(property).containerType;
        return undefined;
    };
    Class.expandValue = function (context, value, propertyName) {
        if (Utils.isNull(value) || !Utils.isDefined(value))
            return null;
        if (propertyName === "@id") {
            return Class.expandURI(context, value, { base: true });
        }
        else if (propertyName === "@type") {
            return Class.expandURI(context, value, { vocab: true, base: true });
        }
        var definition = new ObjectSchema.DigestedPropertyDefinition();
        if (context.properties.has(propertyName))
            definition = context.properties.get(propertyName);
        if (definition.literal === false || (propertyName === "@graph" && Utils.isString(value))) {
            var options = { base: true };
            if (definition.pointerType === ObjectSchema.PointerType.VOCAB)
                options.vocab = true;
            return { "@id": Class.expandURI(context, value, options) };
        }
        if (Class.isKeyword(propertyName))
            return value;
        var expandedValue = {};
        if (!!definition.literalType) {
            expandedValue["@type"] = definition.literalType.stringValue;
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
    Class.process = function (context, element, activeProperty, insideList) {
        if (Utils.isNull(element) || !Utils.isDefined(element))
            return null;
        if (!Utils.isArray(element) && !Utils.isObject(element)) {
            if (!insideList && (activeProperty === null || activeProperty === "@graph"))
                return null;
            return Class.expandValue(context, element, activeProperty);
        }
        if (Utils.isArray(element)) {
            var container = Class.getContainer(context, activeProperty);
            insideList = insideList || container === ObjectSchema.ContainerType.LIST;
            var expandedElement_1 = [];
            for (var _i = 0, _a = element; _i < _a.length; _i++) {
                var item = _a[_i];
                var expandedItem = Class.process(context, item, activeProperty);
                if (expandedItem === null)
                    continue;
                if (insideList && (Utils.isArray(expandedItem) || RDF.List.Factory.is(expandedItem)))
                    throw new InvalidJSONLDSyntaxError_1.default("Lists of lists are not permitted.");
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
            var uri = Class.expandURI(context, key, { vocab: true });
            if (!uri || !(RDF.URI.Util.isAbsolute(uri) || RDF.URI.Util.isBNodeID(uri) || Class.isKeyword(uri)))
                continue;
            var value = element[key];
            if (Class.isKeyword(uri)) {
                if (uri === "@id" && !Utils.isString(value))
                    throw new InvalidJSONLDSyntaxError_1.default("\"@id\" value must a string.");
                if (uri === "@type" && !Class.isValidType(value))
                    throw new InvalidJSONLDSyntaxError_1.default("\"@type\" value must a string, an array of strings.");
                if (uri === "@graph" && !(Utils.isObject(value) || Utils.isArray(value)))
                    throw new InvalidJSONLDSyntaxError_1.default("\"@graph\" value must not be an object or an array.");
                if (uri === "@value" && (Utils.isObject(value) || Utils.isArray(value)))
                    throw new InvalidJSONLDSyntaxError_1.default("\"@value\" value must not be an object or an array.");
                if (uri === "@language") {
                    if (value === null)
                        continue;
                    if (!Utils.isString(value))
                        throw new InvalidJSONLDSyntaxError_1.default("\"@language\" value must be a string.");
                    value = value.toLowerCase();
                }
                if (uri === "@index" && !Utils.isString(value))
                    throw new InvalidJSONLDSyntaxError_1.default("\"@index\" value must be a string.");
                if (uri === "@reverse" && !Utils.isObject(value))
                    throw new InvalidJSONLDSyntaxError_1.default("\"@reverse\" value must be an object.");
                if (uri === "@index" || uri === "@reverse")
                    throw new Errors.NotImplementedError("The SDK does not support \"@index\" and \"@reverse\" tags.");
            }
            var expandedValue = void 0;
            var container = Class.getContainer(context, key);
            if (container === ObjectSchema.ContainerType.LANGUAGE && Utils.isObject(value)) {
                expandedValue = Class.expandLanguageMap(value);
            }
            else {
                var nextActiveProperty = key;
                var isList = uri === "@list";
                if (isList || uri === "@set") {
                    nextActiveProperty = activeProperty;
                    if (isList && activeProperty === "@graph")
                        nextActiveProperty = null;
                }
                expandedValue = Class.process(context, value, nextActiveProperty, isList);
            }
            if (expandedValue === null && uri !== "@value")
                continue;
            if (uri !== "@list" && !RDF.List.Factory.is(expandedValue) && container === ObjectSchema.ContainerType.LIST) {
                if (!Utils.isArray(expandedValue))
                    expandedValue = [expandedValue];
                expandedValue = { "@list": expandedValue };
            }
            var useArray = ["@type", "@id", "@value", "@language"].indexOf(uri) === -1;
            Class.addValue(expandedElement, uri, expandedValue, { propertyIsArray: useArray });
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
    Class.addValue = function (element, propertyName, value, options) {
        if (Utils.isArray(value)) {
            var values = value;
            if (values.length === 0 && options.propertyIsArray && !Utils.hasProperty(element, propertyName))
                element[propertyName] = [];
            for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
                var item = values_2[_i];
                Class.addValue(element, propertyName, item, options);
            }
        }
        else if (propertyName in element) {
            if (!Class.hasValue(element, propertyName, value)) {
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
    Class.hasProperty = function (element, propertyName) {
        if (propertyName in element) {
            var item = element[propertyName];
            return !Utils.isArray(item) || item.length > 0;
        }
        return false;
    };
    Class.compareValues = function (value1, value2) {
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
    Class.hasValue = function (element, propertyName, value) {
        if (Class.hasProperty(element, propertyName)) {
            var item = element[propertyName];
            var isList = RDF.List.Factory.is(item);
            if (isList || Utils.isArray(item)) {
                var items = isList ? item["@list"] : item;
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var entry = items_1[_i];
                    if (Class.compareValues(entry, value))
                        return true;
                }
            }
            else if (!Utils.isArray(value)) {
                return Class.compareValues(item, value);
            }
        }
        return false;
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var List = __webpack_require__(34);
var Literal = __webpack_require__(32);
var RDFNode = __webpack_require__(33);
var Util = (function () {
    function Util() {
    }
    Util.parseValue = function (propertyValue, pointerLibrary) {
        if (Literal.Factory.is(propertyValue)) {
            return Literal.Factory.parse(propertyValue);
        }
        else if (RDFNode.Factory.is(propertyValue)) {
            return pointerLibrary.getPointer(propertyValue["@id"]);
        }
        else if (List.Factory.is(propertyValue)) {
            var parsedValue = [];
            var listValues = propertyValue["@list"];
            for (var _i = 0, listValues_1 = listValues; _i < listValues_1.length; _i++) {
                var listValue = listValues_1[_i];
                parsedValue.push(Util.parseValue(listValue, pointerLibrary));
            }
            return parsedValue;
        }
        else {
        }
        return null;
    };
    return Util;
}());
exports.Util = Util;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LDP = __webpack_require__(18);
var NS = __webpack_require__(1);
exports.RDF_CLASS = NS.C.Class.AccessPoint;
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (object) {
        return LDP.DirectContainer.Factory.is(object);
    };
    Factory.create = function (membershipResource, hasMemberRelation, isMemberOfRelation) {
        return Factory.createFrom({}, membershipResource, hasMemberRelation, isMemberOfRelation);
    };
    Factory.createFrom = function (object, membershipResource, hasMemberRelation, isMemberOfRelation) {
        return LDP.DirectContainer.Factory.createFrom(object, membershipResource, hasMemberRelation, isMemberOfRelation);
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Fragment = __webpack_require__(35);
var RDF = __webpack_require__(4);
var Utils = __webpack_require__(0);
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "slug"));
    };
    Factory.create = function (slug, document) {
        return this.createFrom({}, slug, document);
    };
    Factory.createFrom = function (object, slug, document) {
        var uri = document.id + "#" + slug;
        var fragment = Fragment.Factory.createFrom(object, uri, document);
        if (this.hasClassProperties(fragment))
            return fragment;
        Object.defineProperties(fragment, {
            "slug": {
                enumerable: false,
                configurable: true,
                get: function () {
                    return RDF.URI.Util.getFragment(fragment.id);
                },
                set: function (value) {
                    this.id = this.document.id + "#" + value;
                },
            },
        });
        return fragment;
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NS = __webpack_require__(1);
var Resource = __webpack_require__(5);
exports.RDF_CLASS = NS.C.Class.VolatileResource;
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (object) {
        return Resource.Factory.is(object)
            && object.hasType(exports.RDF_CLASS);
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NS = __webpack_require__(1);
var Utils = __webpack_require__(0);
exports.RDF_CLASS = NS.CS.Class.AccessControlEntry;
exports.SCHEMA = {
    "granting": {
        "@id": NS.CS.Predicate.granting,
        "@type": NS.XSD.DataType.boolean,
    },
    "permissions": {
        "@id": NS.CS.Predicate.permission,
        "@type": "@id",
        "@container": "@set",
    },
    "subjects": {
        "@id": NS.CS.Predicate.subject,
        "@type": "@id",
        "@container": "@set",
    },
    "subjectsClass": {
        "@id": NS.CS.Predicate.subjectClass,
        "@type": "@id",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "granting")
            && Utils.hasPropertyDefined(object, "permissions")
            && Utils.hasPropertyDefined(object, "subjects")
            && Utils.hasPropertyDefined(object, "subjectsClass");
    };
    Factory.createFrom = function (object, granting, subjects, subjectClass, permissions) {
        var ace = object;
        if (!ace.types)
            ace.types = [];
        ace.types.push(exports.RDF_CLASS);
        ace.granting = granting;
        ace.subjects = subjects;
        ace.subjectsClass = subjectClass;
        ace.permissions = permissions;
        return ace;
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ACE = __webpack_require__(54);
var NS = __webpack_require__(1);
var Pointer = __webpack_require__(8);
var Utils = __webpack_require__(0);
exports.RDF_CLASS = NS.CS.Class.AccessControlList;
exports.SCHEMA = {
    "entries": {
        "@id": NS.CS.Predicate.accessControlEntry,
        "@type": "@id",
        "@container": "@set",
    },
    "accessTo": {
        "@id": NS.CS.Predicate.accessTo,
        "@type": "@id",
    },
    "inheritableEntries": {
        "@id": NS.CS.Predicate.inheritableEntry,
        "@type": "@id",
        "@container": "@set",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
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
    };
    Factory.decorate = function (object) {
        var acl = object;
        if (Factory.hasClassProperties(acl))
            return acl;
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
    };
    return Factory;
}());
exports.Factory = Factory;
function parsePointer(element) {
    return Pointer.Factory.is(element) ? element : Pointer.Factory.create(element);
}
function parsePointers(elements) {
    var _this = this;
    var elementsArray = Utils.isArray(elements) ? elements : [elements];
    return elementsArray.map(function (element) { return _this._parsePointer(element); });
}
function configACE(granting, subject, subjectClass, permissions, aces) {
    var subjectACEs = aces.filter(function (ace) { return ace.subjects.length === 1 && ace.granting === granting && Pointer.Util.areEqual(ace.subjects[0], subject); });
    var ace;
    if (subjectACEs.length === 0) {
        ace = ACE.Factory.createFrom(this.createFragment(), granting, [subject], subjectClass, []);
        aces.push(ace);
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
    var subjectACEs = aces.filter(function (ace) { return Utils.A.indexOf(ace.subjects, subject, Pointer.Util.areEqual) !== -1; });
    for (var _i = 0, subjectACEs_1 = subjectACEs; _i < subjectACEs_1.length; _i++) {
        var ace = subjectACEs_1[_i];
        if (Utils.A.indexOf(ace.permissions, permission, Pointer.Util.areEqual) !== -1)
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
    var subjectACEs = aces.filter(function (ace) { return Utils.A.indexOf(ace.subjects, subject, Pointer.Util.areEqual) !== -1; });
    for (var _i = 0, subjectACEs_2 = subjectACEs; _i < subjectACEs_2.length; _i++) {
        var ace = subjectACEs_2[_i];
        if (opposedAces && Utils.A.indexOf(opposedAces, ace, Pointer.Util.areEqual) !== -1) {
            aces.splice(Utils.A.indexOf(aces, ace, Pointer.Util.areEqual), 1);
            var newACE = configACE.call(this, ace.granting, subject, ace.subjectsClass, ace.permissions, aces);
            subjectACEs.push(newACE);
            continue;
        }
        if (ace.subjects.length > 1) {
            ace.subjects.splice(Utils.A.indexOf(ace.subjects, subject, Pointer.Util.areEqual), 1);
            var newACE = configACE.call(this, ace.granting, subject, ace.subjectsClass, ace.permissions, aces);
            subjectACEs.push(newACE);
            continue;
        }
        for (var _a = 0, permissions_1 = permissions; _a < permissions_1.length; _a++) {
            var permission = permissions_1[_a];
            var index = Utils.A.indexOf(ace.permissions, permission, Pointer.Util.areEqual);
            if (index === -1)
                continue;
            ace.permissions.splice(index, 1);
        }
        if (ace.permissions.length === 0) {
            aces.splice(Utils.A.indexOf(aces, ace, Pointer.Util.areEqual), 1);
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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __webpack_require__(3);
var HTTP = __webpack_require__(7);
var UsernameAndPasswordCredentials = __webpack_require__(129);
var Class = (function () {
    function Class() {
    }
    Class.prototype.isAuthenticated = function () {
        return !!this.credentials;
    };
    Class.prototype.authenticate = function (authenticationToken) {
        var _this = this;
        if (authenticationToken === null)
            throw new Errors.IllegalArgumentError("The authenticationToken cannot be null.");
        return new Promise(function (resolve, reject) {
            if (!authenticationToken.username)
                throw new Errors.IllegalArgumentError("The username cannot be empty.");
            if (!authenticationToken.password)
                throw new Errors.IllegalArgumentError("The password cannot be empty.");
            _this.credentials = new UsernameAndPasswordCredentials.Class(authenticationToken.username, authenticationToken.password);
            resolve(_this.credentials);
        });
    };
    Class.prototype.addAuthentication = function (requestOptions) {
        if (!this.isAuthenticated())
            throw new Errors.IllegalStateError("The authenticator isn't authenticated.");
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        this.addBasicAuthenticationHeader(headers);
        return requestOptions;
    };
    Class.prototype.clearAuthentication = function () {
        this.credentials = null;
    };
    Class.prototype.addBasicAuthenticationHeader = function (headers) {
        if (headers.has("authorization"))
            return;
        var header = new HTTP.Header.Class();
        headers.set("authorization", header);
        var authorization = "Basic " + toB64(this.credentials.username + ":" + this.credentials.password);
        header.values.push(new HTTP.Header.Value(authorization));
    };
    return Class;
}());
exports.Class = Class;
function toB64(str) {
    return (typeof btoa !== "undefined") ? btoa(str) : new Buffer(str).toString("base64");
}
exports.default = Class;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Document = __webpack_require__(10);
var NS = __webpack_require__(1);
var Errors_1 = __webpack_require__(3);
exports.RDF_CLASS = NS.CS.Class.Credentials;
exports.SCHEMA = {
    "email": {
        "@id": NS.VCARD.Predicate.email,
        "@type": NS.XSD.DataType.string,
    },
    "password": {
        "@id": NS.CS.Predicate.password,
        "@type": NS.XSD.DataType.string,
    },
    "enabled": {
        "@id": NS.CS.Predicate.enabled,
        "@type": NS.XSD.DataType.boolean,
    },
    "user": {
        "@id": NS.CS.Predicate.credentialsOf,
        "@type": "@id",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.create = function (email, password) {
        return Factory.createFrom({}, email, password);
    };
    Factory.createFrom = function (object, email, password) {
        var credentials = Document.Factory.createFrom(object);
        if (!email)
            throw new Errors_1.IllegalArgumentError("The email cannot be empty.");
        if (!password)
            throw new Errors_1.IllegalArgumentError("The password cannot be empty.");
        credentials.addType(exports.RDF_CLASS);
        credentials.email = email;
        credentials.password = password;
        return credentials;
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PersistedProtectedDocument = __webpack_require__(20);
var Utils = __webpack_require__(0);
var PersistedUser = __webpack_require__(37);
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.isObject(object)
            && Utils.hasFunction(object, "enable")
            && Utils.hasFunction(object, "disable");
    };
    Factory.decorate = function (persistedDocument, documents) {
        var persistedCredentials = persistedDocument;
        if (Factory.hasClassProperties(persistedDocument))
            return persistedCredentials;
        PersistedProtectedDocument.Factory.decorate(persistedCredentials, documents);
        Object.defineProperties(persistedCredentials, {
            "enable": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: changeEnabled.bind(persistedCredentials, true),
            },
            "disable": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: changeEnabled.bind(persistedCredentials, false),
            },
        });
        if (persistedCredentials.user) {
            PersistedUser.Factory.decorate(persistedCredentials.user, documents);
            persistedCredentials.user.credentials = persistedCredentials;
        }
        return persistedCredentials;
    };
    return Factory;
}());
exports.Factory = Factory;
function changeEnabled(enabled, requestOptions) {
    var _this = this;
    var responses = [];
    var promise = this.isResolved() ? Promise.resolve([]) : this.resolve();
    return promise.then(function (_a) {
        var _credentials = _a[0], response = _a[1];
        if (response)
            responses.push(response);
        _this.enabled = enabled;
        return _this.save(requestOptions);
    }).then(function (_a) {
        var _credentials = _a[0], response = _a[1];
        if (response)
            responses.push(response);
        return [_this, responses];
    });
}


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PersistedFragment = __webpack_require__(24);
var Factory = (function () {
    function Factory() {
    }
    Factory.decorate = function (fragment, snapshot) {
        if (snapshot === void 0) { snapshot = {}; }
        PersistedFragment.Factory.decorate(fragment, snapshot);
        return fragment;
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __webpack_require__(3);
var PersistedProtectedDocument = __webpack_require__(20);
var Utils = __webpack_require__(0);
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "_roles")
            && Utils.hasFunction(object, "createChild")
            && Utils.hasFunction(object, "listUsers")
            && Utils.hasFunction(object, "getUsers")
            && Utils.hasFunction(object, "addUser")
            && Utils.hasFunction(object, "addUsers")
            && Utils.hasFunction(object, "removeUser")
            && Utils.hasFunction(object, "removeUsers");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && PersistedProtectedDocument.Factory.is(object);
    };
    Factory.decorate = function (object, documents) {
        var persistedRole = object;
        if (Factory.hasClassProperties(persistedRole))
            return persistedRole;
        PersistedProtectedDocument.Factory.decorate(persistedRole, documents);
        var context = documents.context;
        var roles = context ? context.auth.roles : null;
        Object.defineProperties(persistedRole, {
            "_roles": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: roles,
            },
            "createChild": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: createChild,
            },
            "listUsers": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: listUsers,
            },
            "getUsers": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: getUsers,
            },
            "addUser": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: addUser,
            },
            "addUsers": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: addUsers,
            },
            "removeUser": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: removeUser,
            },
            "removeUsers": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: removeUsers,
            },
        });
        return persistedRole;
    };
    return Factory;
}());
exports.Factory = Factory;
function createChild(role, slugOrRequestOptions, requestOptions) {
    checkState(this);
    return this._roles.createChild(this.id, role, slugOrRequestOptions, requestOptions);
}
function listUsers(requestOptions) {
    checkState(this);
    return this._roles.listUsers(this.id, requestOptions);
}
function getUsers(retrievalPreferencesOrRequestOptions, requestOptions) {
    checkState(this);
    return this._roles.getUsers(this.id, retrievalPreferencesOrRequestOptions, requestOptions);
}
function addUser(user, requestOptions) {
    checkState(this);
    return this._roles.addUsers(this.id, [user], requestOptions);
}
function addUsers(users, requestOptions) {
    checkState(this);
    return this._roles.addUsers(this.id, users, requestOptions);
}
function removeUser(user, requestOptions) {
    checkState(this);
    return this._roles.removeUsers(this.id, [user], requestOptions);
}
function removeUsers(users, requestOptions) {
    checkState(this);
    return this._roles.removeUsers(this.id, users, requestOptions);
}
function checkState(role) {
    if (!role._roles)
        throw new Errors.IllegalStateError("The context of the current role, does not support roles management.");
}


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NS = __webpack_require__(1);
var Resource = __webpack_require__(5);
var Utils = __webpack_require__(0);
exports.RDF_CLASS = NS.CS.Class.Token;
exports.SCHEMA = {
    "key": {
        "@id": NS.CS.Predicate.tokenKey,
        "@type": NS.XSD.DataType.string,
    },
    "expirationTime": {
        "@id": NS.CS.Predicate.expirationTime,
        "@type": NS.XSD.DataType.dateTime,
    },
    "user": {
        "@id": NS.CS.Predicate.credentialsOf,
        "@type": "@id",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (value) {
        return (Resource.Factory.is(value)
            && Factory.hasClassProperties(value));
    };
    Factory.hasClassProperties = function (object) {
        return (Utils.hasPropertyDefined(object, "key")
            && Utils.hasPropertyDefined(object, "expirationTime")
            && Utils.hasPropertyDefined(object, "user"));
    };
    Factory.hasRequiredValues = function (object) {
        return (Utils.hasProperty(object, "key")
            && Utils.hasProperty(object, "expirationTime"));
    };
    Factory.decorate = function (object) {
        if (this.hasClassProperties(object))
            return object;
        return object;
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Class = (function () {
    function Class(username, password) {
        this._username = username;
        this._password = password;
    }
    Object.defineProperty(Class.prototype, "username", {
        get: function () { return this._username; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "password", {
        get: function () { return this._password; },
        enumerable: true,
        configurable: true
    });
    return Class;
}());
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NS = __webpack_require__(1);
exports.RDF_CLASS = NS.CS.Class.ProtectedDocument;
exports.SCHEMA = {
    "accessControlList": {
        "@id": NS.CS.Predicate.accessControlList,
        "@type": "@id",
    },
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Builder = __webpack_require__(65);
exports.Builder = Builder;
var RawResults = __webpack_require__(148);
exports.RawResults = RawResults;
var RawResultsParser = __webpack_require__(70);
exports.RawResultsParser = RawResultsParser;
var Service_1 = __webpack_require__(149);
exports.Service = Service_1.default;
var SELECTResults = __webpack_require__(150);
exports.SELECTResults = SELECTResults;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sparqler_1 = __webpack_require__(138);
exports.Class = sparqler_1.default;
var queryPrototype = sparqler_1.default.prototype;
var superInit = queryPrototype.initInterfaces;
queryPrototype.initInterfaces = function () {
    superInit.call(this);
    var self = this;
    this.interfaces.finishSelect = {
        execute: function () {
            return self._documents.executeSELECTQuery(self._entryPoint, self.toCompactString());
        },
        executeRaw: function () {
            return self._documents.executeRawSELECTQuery(self._entryPoint, self.toCompactString());
        },
    };
};
exports.default = sparqler_1.default;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Token_1 = __webpack_require__(11);
var Identifier_1 = __webpack_require__(15);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LeftSymbol;

//# sourceMappingURL=LeftSymbol.js.map


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Tokens_1 = __webpack_require__(6);
var Identifier_1 = __webpack_require__(15);
var NewLineSymbol_1 = __webpack_require__(16);
function getBlockTokens(patterns) {
    var tokens = this.getTokens(patterns);
    var openToken = Tokens_1.OPEN_SINGLE_BLOCK;
    var closeToken = Tokens_1.CLOSE_SINGLE_BLOCK;
    if (this.isMultiLine(tokens)) {
        openToken = Tokens_1.OPEN_MULTI_BLOCK;
        closeToken = Tokens_1.CLOSE_MULTI_BLOCK;
    }
    return [openToken].concat(tokens, [closeToken]);
}
exports.getBlockTokens = getBlockTokens;
function getTokens(patterns) {
    var patternArray = Array.isArray(patterns) ? patterns : [patterns];
    var triplesTokens = [];
    var lastToken = void 0;
    patternArray.forEach(function (graphPattern, index) {
        var tokens = graphPattern.getPattern();
        if (lastToken === Tokens_1.GRAPH_PATTERN_SEPARATOR && (tokens[0] instanceof Identifier_1.Identifier || tokens[0] === Tokens_1.OPEN_MULTI_BLOCK || tokens[0] === Tokens_1.OPEN_SINGLE_BLOCK))
            triplesTokens.pop();
        triplesTokens.push.apply(triplesTokens, tokens);
        lastToken = tokens[tokens.length - 1];
        if (index < patternArray.length - 1 && lastToken !== Tokens_1.CLOSE_MULTI_BLOCK && lastToken !== Tokens_1.CLOSE_SINGLE_BLOCK) {
            triplesTokens.push(lastToken = Tokens_1.GRAPH_PATTERN_SEPARATOR);
        }
    });
    return triplesTokens;
}
exports.getTokens = getTokens;
function isMultiLine(tokens) {
    return tokens.find(function (token) { return token instanceof NewLineSymbol_1.NewLineSymbol && [".", ";", ",", ""].indexOf(token["value"]) !== -1; }) !== void 0;
}
exports.isMultiLine = isMultiLine;

//# sourceMappingURL=Patterns.js.map


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Literals_1 = __webpack_require__(140);
var Resource_1 = __webpack_require__(142);
var Variable_1 = __webpack_require__(143);
var BlankNode_1 = __webpack_require__(144);
var Collection_1 = __webpack_require__(145);
var NotTriplesPattern_1 = __webpack_require__(69);
var Tokens_1 = __webpack_require__(6);
var Utils = __webpack_require__(67);
var ValuesPattern_1 = __webpack_require__(146);
var StringLiteral_1 = __webpack_require__(14);
var PatternBuilder = (function () {
    function PatternBuilder(resolver) {
        this.resolver = resolver;
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
        return new Resource_1.Resource(this.resolver, iri);
    };
    PatternBuilder.prototype.var = function (name) {
        return new Variable_1.Variable(this.resolver, name);
    };
    PatternBuilder.prototype.literal = function (value) {
        if (typeof value === "string" || value instanceof String)
            return new Literals_1.RDFLiteral(this.resolver, value);
        if (typeof value === "number" || value instanceof Number)
            return new Literals_1.NumericLiteral(this.resolver, value);
        if (typeof value === "boolean" || value instanceof Boolean)
            return new Literals_1.BooleanLiteral(this.resolver, value);
        throw new Error("InvalidArgumentError: No valid value of a literal was provided.");
    };
    PatternBuilder.prototype.collection = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        if (values.length === 0)
            throw Error("InvalidArgumentError: The collection needs at least one value.");
        return new Collection_1.Collection(this.resolver, values);
    };
    PatternBuilder.prototype.blankNode = function () {
        return new BlankNode_1.BlankNode(this.resolver);
    };
    PatternBuilder.prototype.graph = function (iriOrVariable, patterns) {
        var graph = (typeof iriOrVariable === "string")
            ? this.resolver._resolveIRI(iriOrVariable)
            : iriOrVariable.getSelfTokens();
        var patternTokens = Utils.getBlockTokens(patterns);
        return new NotTriplesPattern_1.NotTriplesPattern([Tokens_1.GRAPH].concat(graph, patternTokens));
    };
    PatternBuilder.prototype.optional = function (patterns) {
        var patternTokens = Utils.getBlockTokens(patterns);
        return new NotTriplesPattern_1.NotTriplesPattern([Tokens_1.OPTIONAL].concat(patternTokens));
    };
    PatternBuilder.prototype.union = function (patterns1, patterns2) {
        var leftPatternTokens = Utils.getBlockTokens(patterns1);
        var rightPatternTokens = Utils.getBlockTokens(patterns2);
        return new NotTriplesPattern_1.NotTriplesPattern(leftPatternTokens.concat([Tokens_1.UNION], rightPatternTokens));
    };
    PatternBuilder.prototype.minus = function () {
        var patterns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            patterns[_i] = arguments[_i];
        }
        var patternTokens = Utils.getBlockTokens(patterns);
        return new NotTriplesPattern_1.NotTriplesPattern([Tokens_1.MINUS].concat(patternTokens));
    };
    PatternBuilder.prototype.values = function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        return new ValuesPattern_1.ValuesPattern(this.resolver, variables);
    };
    PatternBuilder.prototype.service = function (resource, patterns) {
        var serviceTokens = typeof resource === "string" ?
            this.resolver._resolveIRI(resource) :
            resource.getSelfTokens();
        var patternTokens = Utils.getBlockTokens(patterns);
        return new NotTriplesPattern_1.NotTriplesPattern([Tokens_1.SERVICE].concat(serviceTokens, patternTokens));
    };
    PatternBuilder.prototype.serviceSilent = function (resource, patterns) {
        var serviceTokens = typeof resource === "string" ?
            this.resolver._resolveIRI(resource) :
            resource.getSelfTokens();
        var patternTokens = Utils.getBlockTokens(patterns);
        return new NotTriplesPattern_1.NotTriplesPattern([Tokens_1.SERVICE, Tokens_1.SILENT].concat(serviceTokens, patternTokens));
    };
    PatternBuilder.prototype.bind = function (rawExpression, variable) {
        variable = typeof variable === "string" ? this.var(variable) : variable;
        var patternTokens = [Tokens_1.BIND, Tokens_1.OPEN_SINGLE_LIST, new StringLiteral_1.StringLiteral(rawExpression), Tokens_1.AS].concat(variable.getSelfTokens(), [Tokens_1.CLOSE_SINGLE_LIST]);
        return new NotTriplesPattern_1.NotTriplesPattern(patternTokens);
    };
    PatternBuilder.prototype.filter = function (rawConstraint) {
        return new NotTriplesPattern_1.NotTriplesPattern([Tokens_1.FILTER, new StringLiteral_1.StringLiteral(rawConstraint)]);
    };
    return PatternBuilder;
}());
exports.PatternBuilder = PatternBuilder;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PatternBuilder;

//# sourceMappingURL=PatternBuilder.js.map


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotTriplesPattern;

//# sourceMappingURL=NotTriplesPattern.js.map


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JSONParser_1 = __webpack_require__(29);
var Class = (function () {
    function Class() {
    }
    Class.prototype.parse = function (input) {
        var jsonParser = new JSONParser_1.default();
        return jsonParser.parse(input).then(function (parsedObject) {
            return parsedObject;
        });
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PlatformMetadata = __webpack_require__(153);
exports.PlatformMetadata = PlatformMetadata;
var InstanceMetadata = __webpack_require__(154);
exports.InstanceMetadata = InstanceMetadata;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ValidationReport = __webpack_require__(155);
exports.ValidationReport = ValidationReport;
var ValidationResult = __webpack_require__(156);
exports.ValidationResult = ValidationResult;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Carbon_1 = __webpack_require__(74);
module.exports = Carbon_1.default;


/***/ }),
/* 74 */
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
var AbstractContext = __webpack_require__(75);
var AccessPoint = __webpack_require__(51);
var Auth = __webpack_require__(19);
var Document = __webpack_require__(10);
var Documents = __webpack_require__(41);
var Errors = __webpack_require__(3);
var Fragment = __webpack_require__(35);
var HTTP = __webpack_require__(7);
var JSONLD = __webpack_require__(17);
var LDP = __webpack_require__(18);
var NamedFragment = __webpack_require__(52);
var NS = __webpack_require__(1);
var ObjectSchema = __webpack_require__(9);
var PersistedDocument = __webpack_require__(23);
var PersistedFragment = __webpack_require__(24);
var PersistedNamedFragment = __webpack_require__(59);
var PersistedResource = __webpack_require__(36);
var Pointer = __webpack_require__(8);
var RDF = __webpack_require__(4);
var Resource = __webpack_require__(5);
var SDKContext = __webpack_require__(27);
var Settings = __webpack_require__(157);
var SHACL = __webpack_require__(72);
var SPARQL = __webpack_require__(64);
var System = __webpack_require__(71);
var Utils = __webpack_require__(0);
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(domain, ssl, settings) {
        if (ssl === void 0) { ssl = true; }
        var _this = _super.call(this) || this;
        domain = RDF.URI.Util.hasProtocol(domain) ? RDF.URI.Util.removeProtocol(domain) : domain;
        domain = Utils.S.endsWith(domain, "/") ? domain : domain + "/";
        _this._baseURI = (ssl ? "https://" : "http://") + domain;
        settings = settings ? Utils.extend({}, Settings.defaultSettings, settings) : Settings.defaultSettings;
        Utils.M.extend(_this.settings, Utils.M.from(settings));
        return _this;
    }
    Object.defineProperty(Class, "version", {
        get: function () { return "1.0.0-alpha.1"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "version", {
        get: function () { return Class.version; },
        enumerable: true,
        configurable: true
    });
    Class.prototype.getPlatformMetadata = function () {
        return this.getDocumentMetadata("system.platform.metadata");
    };
    Class.prototype.getInstanceMetadata = function () {
        return this.getDocumentMetadata("system.instance.metadata");
    };
    Class.prototype.getDocumentMetadata = function (metadataSetting) {
        var _this = this;
        if (!this.hasSetting(metadataSetting))
            return Promise.reject(new Errors.IllegalStateError("The \"" + metadataSetting + "\" setting hasn't been defined."));
        return Promise.resolve()
            .then(function () { return _this.resolveSystemURI(_this.getSetting(metadataSetting)); })
            .then(function (metadataURI) { return _this.documents.get(metadataURI); })
            .then(function (_a) {
            var metadataDocument = _a[0];
            return metadataDocument;
        });
    };
    Class.AccessPoint = AccessPoint;
    Class.Auth = Auth;
    Class.Document = Document;
    Class.Documents = Documents;
    Class.Errors = Errors;
    Class.Fragment = Fragment;
    Class.HTTP = HTTP;
    Class.JSONLD = JSONLD;
    Class.LDP = LDP;
    Class.NamedFragment = NamedFragment;
    Class.NS = NS;
    Class.ObjectSchema = ObjectSchema;
    Class.PersistedDocument = PersistedDocument;
    Class.PersistedFragment = PersistedFragment;
    Class.PersistedNamedFragment = PersistedNamedFragment;
    Class.PersistedResource = PersistedResource;
    Class.Pointer = Pointer;
    Class.RDF = RDF;
    Class.Resource = Resource;
    Class.SDKContext = SDKContext;
    Class.Settings = Settings;
    Class.SHACL = SHACL;
    Class.SPARQL = SPARQL;
    Class.System = System;
    Class.Utils = Utils;
    return Class;
}(AbstractContext.Class));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 75 */
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
var SDKContext = __webpack_require__(27);
var RDF = __webpack_require__(4);
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(parentContext) {
        if (parentContext === void 0) { parentContext = null; }
        var _this = _super.call(this) || this;
        _this._parentContext = !!parentContext ? parentContext : SDKContext.instance;
        _this.generalObjectSchema = null;
        _this.typeObjectSchemaMap = new Map();
        return _this;
    }
    Object.defineProperty(Class.prototype, "baseURI", {
        get: function () { return this._baseURI; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "parentContext", {
        get: function () { return this._parentContext; },
        enumerable: true,
        configurable: true
    });
    Class.prototype.resolve = function (relativeURI) {
        return RDF.URI.Util.resolve(this.baseURI, relativeURI);
    };
    return Class;
}(SDKContext.Class));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 76 */
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
var AbstractError_1 = __webpack_require__(12);
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return "IDAlreadyInUseError"; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(AbstractError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 77 */
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
var AbstractError_1 = __webpack_require__(12);
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return "IllegalActionError"; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(AbstractError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 78 */
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
var AbstractError_1 = __webpack_require__(12);
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message) {
        if (message === void 0) { message = ""; }
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return "IllegalStateError"; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(AbstractError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 79 */
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
var AbstractError_1 = __webpack_require__(12);
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message) {
        if (message === void 0) { message = ""; }
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return "NotImplementedError"; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(AbstractError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 80 */
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
var HTTPError_1 = __webpack_require__(2);
var name = "BadRequestError";
var statusCode = 400;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 81 */
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
var HTTPError_1 = __webpack_require__(2);
var name = "ConflictError";
var statusCode = 409;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 82 */
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
var HTTPError_1 = __webpack_require__(2);
var name = "ForbiddenError";
var statusCode = 403;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 83 */
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
var HTTPError_1 = __webpack_require__(2);
var name = "MethodNotAllowedError";
var statusCode = 405;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


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
var HTTPError_1 = __webpack_require__(2);
var name = "NotAcceptableError";
var statusCode = 406;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 85 */
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
var HTTPError_1 = __webpack_require__(2);
var name = "NotFoundError";
var statusCode = 404;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


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
var HTTPError_1 = __webpack_require__(2);
var name = "PreconditionFailedError";
var statusCode = 412;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 87 */
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
var HTTPError_1 = __webpack_require__(2);
var name = "PreconditionRequiredError";
var statusCode = 428;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 88 */
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
var HTTPError_1 = __webpack_require__(2);
var name = "RequestEntityTooLargeError";
var statusCode = 413;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


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
var HTTPError_1 = __webpack_require__(2);
var name = "RequestHeaderFieldsTooLargeError";
var statusCode = 431;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 90 */
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
var HTTPError_1 = __webpack_require__(2);
var name = "RequestURITooLongError";
var statusCode = 414;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 91 */
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
var HTTPError_1 = __webpack_require__(2);
var name = "TooManyRequestsError";
var statusCode = 429;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 92 */
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
var HTTPError_1 = __webpack_require__(2);
var name = "UnauthorizedError";
var statusCode = 401;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 93 */
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
var HTTPError_1 = __webpack_require__(2);
var name = "UnsupportedMediaTypeError";
var statusCode = 415;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 94 */
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
var HTTPError_1 = __webpack_require__(2);
var name = "BadResponseError";
var statusCode = 0;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 95 */
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
var HTTPError_1 = __webpack_require__(2);
var name = "BadGatewayError";
var statusCode = 502;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 96 */
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
var HTTPError_1 = __webpack_require__(2);
var name = "GatewayTimeoutError";
var statusCode = 504;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


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
var HTTPError_1 = __webpack_require__(2);
var name = "HTTPVersionNotSupportedError";
var statusCode = 505;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


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
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = __webpack_require__(2);
var name = "InternalServerErrorError";
var statusCode = 500;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


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
var HTTPError_1 = __webpack_require__(2);
var name = "NotImplementedError";
var statusCode = 501;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 100 */
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
var HTTPError_1 = __webpack_require__(2);
var name = "ServiceUnavailableError";
var statusCode = 503;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 101 */
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
var HTTPError_1 = __webpack_require__(2);
var name = "UnknownError";
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __webpack_require__(3);
var Header = __webpack_require__(28);
var HTTPErrors = __webpack_require__(43);
var Method_1 = __webpack_require__(44);
var NS = __webpack_require__(1);
var Response_1 = __webpack_require__(45);
var ErrorResponse = __webpack_require__(46);
var Utils = __webpack_require__(0);
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
    else if (response.status >= 400 && response.status < 600 && HTTPErrors.statusCodeMap.has(response.status)) {
        var errorClass = HTTPErrors.statusCodeMap.get(response.status);
        var error_1 = new errorClass("", response);
        if (!response.data) {
            reject(error_1);
        }
        var parser = new ErrorResponse.Parser();
        parser.parse(response.data, error_1).then(function (errorResponse) {
            error_1.message = ErrorResponse.Util.getMessage(errorResponse);
            reject(error_1);
        }).catch(function () {
            error_1.message = response.data;
            reject(error_1);
        });
    }
    else {
        reject(new HTTPErrors.UnknownError(response.data, response));
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
            var response = new Response_1.default(request);
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
        var URL = __webpack_require__(113);
        function returnResponse(request, res) {
            var rawData = [];
            res.on("data", function (chunk) {
                if (typeof chunk === "string")
                    chunk = Buffer.from(chunk, "utf-8");
                rawData.push(chunk);
            }).on("end", function () {
                var data = Buffer.concat(rawData).toString("utf8");
                var response = new Response_1.default(request, data, res);
                onResolve(resolve, reject, response);
            });
        }
        var numberOfRedirects = 0;
        function sendRequest(_url) {
            var parsedURL = URL.parse(_url);
            var HTTP = parsedURL.protocol === "http:" ? __webpack_require__(114) : __webpack_require__(115);
            var requestOptions = {
                protocol: parsedURL.protocol,
                host: parsedURL.host,
                hostname: parsedURL.hostname,
                port: parseFloat(parsedURL.port),
                path: parsedURL.path,
                method: method,
                headers: {},
                withCredentials: options.sendCredentialsOnCORS,
            };
            if (options.headers)
                forEachHeaders(options.headers, function (name, value) { return requestOptions.headers[name] = value; });
            var request = HTTP.request(requestOptions);
            if (options.timeout)
                request.setTimeout(options.timeout);
            request.on("response", function (res) {
                if (res.statusCode >= 300 && res.statusCode <= 399 && "location" in res.headers) {
                    if (++numberOfRedirects < 10)
                        return sendRequest(URL.resolve(_url, res.headers.location));
                }
                returnResponse(request, res);
            });
            request.on("error", function (error) {
                var response = new Response_1.default(request, error.message);
                onResolve(resolve, reject, response);
            });
            request.end(body);
        }
        sendRequest(url);
    });
}
function isBody(data) {
    return Utils.isString(data)
        || typeof Blob !== "undefined" && data instanceof Blob
        || typeof Buffer !== "undefined" && data instanceof Buffer;
}
var Service = (function () {
    function Service() {
    }
    Service.send = function (method, url, bodyOrOptions, optionsOrParser, parser) {
        if (bodyOrOptions === void 0) { bodyOrOptions = Service.defaultOptions; }
        if (optionsOrParser === void 0) { optionsOrParser = Service.defaultOptions; }
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
        options = Utils.extend({}, Service.defaultOptions, options);
        if (Utils.isNumber(method))
            method = Method_1.default[method];
        var requestPromise;
        if (typeof XMLHttpRequest !== "undefined") {
            requestPromise = sendWithBrowser(method, url, body, options);
        }
        else {
            requestPromise = sendWithNode(method, url, body, options);
        }
        if (parser === null)
            return requestPromise;
        return requestPromise.then(function (response) {
            return parser.parse(response.data).then(function (parsedBody) {
                return [parsedBody, response];
            });
        });
    };
    Service.options = function (url, options) {
        if (options === void 0) { options = Service.defaultOptions; }
        return Service.send(Method_1.default.OPTIONS, url, options);
    };
    Service.head = function (url, options) {
        if (options === void 0) { options = Service.defaultOptions; }
        return Service.send(Method_1.default.HEAD, url, options);
    };
    Service.get = function (url, options, parser) {
        if (options === void 0) { options = Service.defaultOptions; }
        if (parser === void 0) { parser = null; }
        return Service.send(Method_1.default.GET, url, null, options, parser);
    };
    Service.post = function (url, bodyOrOptions, options, parser) {
        if (bodyOrOptions === void 0) { bodyOrOptions = Service.defaultOptions; }
        if (options === void 0) { options = Service.defaultOptions; }
        if (parser === void 0) { parser = null; }
        return Service.send(Method_1.default.POST, url, bodyOrOptions, options, parser);
    };
    Service.put = function (url, bodyOrOptions, options, parser) {
        if (bodyOrOptions === void 0) { bodyOrOptions = Service.defaultOptions; }
        if (options === void 0) { options = Service.defaultOptions; }
        if (parser === void 0) { parser = null; }
        return Service.send(Method_1.default.PUT, url, bodyOrOptions, options, parser);
    };
    Service.patch = function (url, bodyOrOptions, options, parser) {
        if (bodyOrOptions === void 0) { bodyOrOptions = Service.defaultOptions; }
        if (options === void 0) { options = Service.defaultOptions; }
        if (parser === void 0) { parser = null; }
        return Service.send(Method_1.default.PATCH, url, bodyOrOptions, options, parser);
    };
    Service.delete = function (url, bodyOrOptions, optionsOrParser, parser) {
        if (bodyOrOptions === void 0) { bodyOrOptions = Service.defaultOptions; }
        if (optionsOrParser === void 0) { optionsOrParser = Service.defaultOptions; }
        if (parser === void 0) { parser = null; }
        return Service.send(Method_1.default.DELETE, url, bodyOrOptions, optionsOrParser, parser);
    };
    Service.defaultOptions = {
        sendCredentialsOnCORS: true,
    };
    return Service;
}());
exports.Service = Service;
var Util = (function () {
    function Util() {
    }
    Util.getHeader = function (headerName, requestOptions, initialize) {
        if (initialize === void 0) { initialize = false; }
        headerName = headerName.toLowerCase();
        if (initialize) {
            var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
            if (!headers.has(headerName))
                headers.set(headerName, new Header.Class());
        }
        if (!requestOptions.headers)
            return undefined;
        return requestOptions.headers.get(headerName);
    };
    Util.setAcceptHeader = function (accept, requestOptions) {
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        headers.set("accept", new Header.Class(accept));
        return requestOptions;
    };
    Util.setContentTypeHeader = function (contentType, requestOptions) {
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        headers.set("content-type", new Header.Class(contentType));
        return requestOptions;
    };
    Util.setIfMatchHeader = function (etag, requestOptions) {
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        headers.set("if-match", new Header.Class(etag));
        return requestOptions;
    };
    Util.setIfNoneMatchHeader = function (eTag, requestOptions) {
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        headers.set("if-none-match", new Header.Class(eTag));
        return requestOptions;
    };
    Util.setPreferredInteractionModel = function (interactionModelURI, requestOptions) {
        var prefer = Util.getHeader("prefer", requestOptions, true);
        prefer.values.push(new Header.Value(interactionModelURI + "; rel=interaction-model"));
        return requestOptions;
    };
    Util.setPreferredRetrievalResource = function (typeOfRequest, requestOptions) {
        var prefer = Util.getHeader("prefer", requestOptions, true);
        var preferType;
        switch (typeOfRequest) {
            case "Created":
                preferType = NS.C.Class.CreatedResource;
                break;
            case "Modified":
                preferType = NS.C.Class.ModifiedResource;
                break;
            default:
                throw new Errors.IllegalArgumentError("Invalid type of request: '" + typeOfRequest + "'.");
        }
        prefer.values.push(new Header.Value("return=representation; " + preferType));
        return requestOptions;
    };
    Util.setContainerRetrievalPreferences = function (preferences, requestOptions, returnRepresentation) {
        if (returnRepresentation === void 0) { returnRepresentation = true; }
        var prefer = Util.getHeader("prefer", requestOptions, true);
        var representation = returnRepresentation ? "return=representation; " : "";
        var keys = ["include", "omit"];
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (key in preferences && preferences[key].length > 0) {
                prefer.values.push(new Header.Value("" + representation + key + "=\"" + preferences[key].join(" ") + "\""));
            }
        }
        return requestOptions;
    };
    Util.setSlug = function (slug, requestOptions) {
        var slugHeader = Util.getHeader("slug", requestOptions, true);
        slugHeader.values.push(new Header.Value(slug));
        return requestOptions;
    };
    Util.isOptions = function (object) {
        return Utils.hasPropertyDefined(object, "headers")
            || Utils.hasPropertyDefined(object, "sendCredentialsOnCORS")
            || Utils.hasPropertyDefined(object, "timeout")
            || Utils.hasPropertyDefined(object, "request");
    };
    return Util;
}());
exports.Util = Util;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.namespace = "https://carbonldp.com/ns/v1/platform#";
var Class = (function () {
    function Class() {
    }
    Object.defineProperty(Class, "AccessPoint", {
        get: function () { return exports.namespace + "AccessPoint"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "AddMemberAction", {
        get: function () { return exports.namespace + "AddMemberAction"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "CreatedResource", {
        get: function () { return exports.namespace + "CreatedResource"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Document", {
        get: function () { return exports.namespace + "Document"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "DocumentMetadata", {
        get: function () { return exports.namespace + "DocumentMetadata"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Instance", {
        get: function () { return exports.namespace + "Instance"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Map", {
        get: function () { return exports.namespace + "Map"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "ModifiedResource", {
        get: function () { return exports.namespace + "ModifiedResource"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "NonReadableMembershipResourceTriples", {
        get: function () { return exports.namespace + "NonReadableMembershipResourceTriples"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Platform", {
        get: function () { return exports.namespace + "Platform"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "PreferContainer", {
        get: function () { return exports.namespace + "PreferContainer"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "PreferContainmentResources", {
        get: function () { return exports.namespace + "PreferContainmentResources"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "PreferContainmentTriples", {
        get: function () { return exports.namespace + "PreferContainmentTriples"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "PreferMembershipResources", {
        get: function () { return exports.namespace + "PreferMembershipResources"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "PreferMembershipTriples", {
        get: function () { return exports.namespace + "PreferMembershipTriples"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "PreferSelectedMembershipTriples", {
        get: function () { return exports.namespace + "PreferSelectedMembershipTriples"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "VolatileResource", {
        get: function () { return exports.namespace + "VolatileResource"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "RDFRepresentation", {
        get: function () { return exports.namespace + "RDFRepresentation"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "RemoveMemberAction", {
        get: function () { return exports.namespace + "RemoveMemberAction"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "ErrorResponse", {
        get: function () { return exports.namespace + "ErrorResponse"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Error", {
        get: function () { return exports.namespace + "Error"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "ResponseMetadata", {
        get: function () { return exports.namespace + "ResponseMetadata"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "ValidationError", {
        get: function () { return exports.namespace + "ValidationError"; },
        enumerable: true,
        configurable: true
    });
    return Class;
}());
exports.Class = Class;
var Predicate = (function () {
    function Predicate() {
    }
    Object.defineProperty(Predicate, "accessPoint", {
        get: function () { return exports.namespace + "accessPoint"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "bNodesMap", {
        get: function () { return exports.namespace + "bNodesMap"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "buildDate", {
        get: function () { return exports.namespace + "buildDate"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "created", {
        get: function () { return exports.namespace + "created"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "documentMetadata", {
        get: function () { return exports.namespace + "documentMetadata"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "defaultInteractionModel", {
        get: function () { return exports.namespace + "defaultInteractionModel"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "entry", {
        get: function () { return exports.namespace + "entry"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "error", {
        get: function () { return exports.namespace + "error"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "errorCode", {
        get: function () { return exports.namespace + "errorCode"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "errorDetails", {
        get: function () { return exports.namespace + "errorDetails"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "errorMessage", {
        get: function () { return exports.namespace + "errorMessage"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "errorParameters", {
        get: function () { return exports.namespace + "errorParameters"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "eTag", {
        get: function () { return exports.namespace + "eTag"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "httpStatusCode", {
        get: function () { return exports.namespace + "httpStatusCode"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "entryKey", {
        get: function () { return exports.namespace + "key"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "mediaType", {
        get: function () { return exports.namespace + "mediaType"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "modified", {
        get: function () { return exports.namespace + "modified"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "requestID", {
        get: function () { return exports.namespace + "requestID"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "relatedDocument", {
        get: function () { return exports.namespace + "relatedDocument"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "size", {
        get: function () { return exports.namespace + "size"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "targetMember", {
        get: function () { return exports.namespace + "targetMember"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "entryValue", {
        get: function () { return exports.namespace + "value"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "version", {
        get: function () { return exports.namespace + "version"; },
        enumerable: true,
        configurable: true
    });
    return Predicate;
}());
exports.Predicate = Predicate;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var namespace = "https://carbonldp.com/ns/v1/patch#";
exports.namespace = namespace;
var Predicate = (function () {
    function Predicate() {
    }
    Predicate.ADD_ACTION = namespace + "addAction";
    Predicate.SET_ACTION = namespace + "setAction";
    Predicate.DELETE_ACTION = namespace + "deleteAction";
    return Predicate;
}());
exports.Predicate = Predicate;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var namespace = "https://carbonldp.com/ns/v1/security#";
exports.namespace = namespace;
var Class = (function () {
    function Class() {
    }
    Object.defineProperty(Class, "AccessControlEntry", {
        get: function () { return namespace + "AccessControlEntry"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "AccessControlList", {
        get: function () { return namespace + "AccessControlList"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "AllOrigins", {
        get: function () { return namespace + "AllOrigins"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "CreateAccessPoint", {
        get: function () { return namespace + "CreateAccessPoint"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "CreateChild", {
        get: function () { return namespace + "CreateChild"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Credentials", {
        get: function () { return namespace + "Credentials"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Delete", {
        get: function () { return namespace + "Delete"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Download", {
        get: function () { return namespace + "Download"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Extend", {
        get: function () { return namespace + "Extend"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "ManageSecurity", {
        get: function () { return namespace + "ManageSecurity"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "ProtectedDocument", {
        get: function () { return namespace + "ProtectedDocument"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Read", {
        get: function () { return namespace + "Read"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "RemoveMember", {
        get: function () { return namespace + "RemoveMember"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Role", {
        get: function () { return namespace + "Role"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Ticket", {
        get: function () { return namespace + "Ticket"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Token", {
        get: function () { return namespace + "Token"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Update", {
        get: function () { return namespace + "Update"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Upload", {
        get: function () { return namespace + "Upload"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "User", {
        get: function () { return namespace + "User"; },
        enumerable: true,
        configurable: true
    });
    return Class;
}());
exports.Class = Class;
var Predicate = (function () {
    function Predicate() {
    }
    Object.defineProperty(Predicate, "accessControlEntry", {
        get: function () { return namespace + "accessControlEntry"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "accessControlList", {
        get: function () { return namespace + "accessControlList"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "accessTo", {
        get: function () { return namespace + "accessTo"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "allowsOrigin", {
        get: function () { return namespace + "allowsOrigin"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "childRole", {
        get: function () { return namespace + "childRole"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "credentials", {
        get: function () { return namespace + "credentials"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "credentialsOf", {
        get: function () { return namespace + "credentialsOf"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "description", {
        get: function () { return namespace + "description"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "enabled", {
        get: function () { return namespace + "enabled"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "expirationTime", {
        get: function () { return namespace + "expirationTime"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "forIRI", {
        get: function () { return namespace + "forIRI"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "granting", {
        get: function () { return namespace + "granting"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "inheritableEntry", {
        get: function () { return namespace + "inheritableEntry"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "namae", {
        get: function () { return namespace + "name"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "parentRole", {
        get: function () { return namespace + "parentRole"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "password", {
        get: function () { return namespace + "password"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "permission", {
        get: function () { return namespace + "permission"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "rootContainer", {
        get: function () { return namespace + "rootContainer"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "subject", {
        get: function () { return namespace + "subject"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "subjectClass", {
        get: function () { return namespace + "subjectClass"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "ticketKey", {
        get: function () { return namespace + "ticketKey"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "tokenKey", {
        get: function () { return namespace + "tokenKey"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "user", {
        get: function () { return namespace + "user"; },
        enumerable: true,
        configurable: true
    });
    return Predicate;
}());
exports.Predicate = Predicate;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var namespace = "http://www.w3.org/ns/ldp#";
exports.namespace = namespace;
var Class = (function () {
    function Class() {
    }
    Object.defineProperty(Class, "Resource", {
        get: function () { return namespace + "Resource"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "RDFSource", {
        get: function () { return namespace + "RDFSource"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Container", {
        get: function () { return namespace + "Container"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "BasicContainer", {
        get: function () { return namespace + "BasicContainer"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "DirectContainer", {
        get: function () { return namespace + "DirectContainer"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "IndirectContainer", {
        get: function () { return namespace + "IndirectContainer"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "NonRDFSource", {
        get: function () { return namespace + "NonRDFSource"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "MemberSubject", {
        get: function () { return namespace + "MemberSubject"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "PreferContainment", {
        get: function () { return namespace + "PreferContainment"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "PreferMembership", {
        get: function () { return namespace + "PreferMembership"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "PreferEmptyContainer", {
        get: function () { return namespace + "PreferEmptyContainer"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "PreferMinimalContainer", {
        get: function () { return namespace + "PreferMinimalContainer"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Page", {
        get: function () { return namespace + "Page"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "PageSortCriterion", {
        get: function () { return namespace + "PageSortCriterion"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Ascending", {
        get: function () { return namespace + "Ascending"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Descending", {
        get: function () { return namespace + "Descending"; },
        enumerable: true,
        configurable: true
    });
    return Class;
}());
exports.Class = Class;
var Predicate = (function () {
    function Predicate() {
    }
    Object.defineProperty(Predicate, "contains", {
        get: function () { return namespace + "contains"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "member", {
        get: function () { return namespace + "member"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "hasMemberRelation", {
        get: function () { return namespace + "hasMemberRelation"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "isMemberOfRelation", {
        get: function () { return namespace + "isMemberOfRelation"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "membershipResource", {
        get: function () { return namespace + "membershipResource"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "insertedContentRelation", {
        get: function () { return namespace + "insertedContentRelation"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "constrainedBy", {
        get: function () { return namespace + "constrainedBy"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "pageSortCriteria", {
        get: function () { return namespace + "pageSortCriteria"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "pageSortOrder", {
        get: function () { return namespace + "pageSortOrder"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "pageSortCollation", {
        get: function () { return namespace + "pageSortCollation"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "pageSequence", {
        get: function () { return namespace + "pageSequence"; },
        enumerable: true,
        configurable: true
    });
    return Predicate;
}());
exports.Predicate = Predicate;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var namespace = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
exports.namespace = namespace;
var Predicate = (function () {
    function Predicate() {
    }
    Predicate.type = namespace + "type";
    return Predicate;
}());
exports.Predicate = Predicate;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.namespace = "http://www.w3.org/ns/shacl#";
var Class = (function () {
    function Class() {
    }
    Object.defineProperty(Class, "ValidationReport", {
        get: function () { return exports.namespace + "ValidationReport"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "ValidationResult", {
        get: function () { return exports.namespace + "ValidationResult"; },
        enumerable: true,
        configurable: true
    });
    return Class;
}());
exports.Class = Class;
var Predicate = (function () {
    function Predicate() {
    }
    Object.defineProperty(Predicate, "conforms", {
        get: function () { return exports.namespace + "conforms"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "detail", {
        get: function () { return exports.namespace + "detail"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "focusNode", {
        get: function () { return exports.namespace + "focusNode"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "result", {
        get: function () { return exports.namespace + "result"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "resultMessage", {
        get: function () { return exports.namespace + "resultMessage"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "resultPath", {
        get: function () { return exports.namespace + "resultPath"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "resultSeverity", {
        get: function () { return exports.namespace + "resultSeverity"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "shapesGraphWellFormed", {
        get: function () { return exports.namespace + "shapesGraphWellFormed"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "sourceConstraintComponent", {
        get: function () { return exports.namespace + "sourceConstraintComponent"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "sourceShape", {
        get: function () { return exports.namespace + "sourceShape"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "value", {
        get: function () { return exports.namespace + "value"; },
        enumerable: true,
        configurable: true
    });
    return Predicate;
}());
exports.Predicate = Predicate;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.namespace = "http://www.w3.org/2001/vcard-rdf/3.0#";
var Predicate = (function () {
    function Predicate() {
    }
    Object.defineProperty(Predicate, "email", {
        get: function () { return exports.namespace + "email"; },
        enumerable: true,
        configurable: true
    });
    return Predicate;
}());
exports.Predicate = Predicate;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var XSD = __webpack_require__(112);
exports.XSD = XSD;


/***/ }),
/* 112 */
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
var Errors = __webpack_require__(3);
var Utils = __webpack_require__(0);
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
        stringValue = Utils.S.startsWith(stringValue, "-") ? stringValue.substring(1) : stringValue;
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
        if (!Utils.isNumber(value))
            throw new Errors.IllegalArgumentError(notNumberError);
        if (value === Number.POSITIVE_INFINITY)
            return "INF";
        if (value === Number.NEGATIVE_INFINITY)
            return "-INF";
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
/* 113 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 114 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 115 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 116 */
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
exports.default = StatusCode;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Class = (function () {
    function Class() {
    }
    Class.prototype.parse = function (body) {
        return new Promise(function (resolve, reject) {
            resolve(body);
        });
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Document = __webpack_require__(10);
var NS = __webpack_require__(1);
var Utils = __webpack_require__(0);
exports.RDF_CLASS = NS.C.Class.AddMemberAction;
exports.SCHEMA = {
    "targetMembers": {
        "@id": NS.C.Predicate.targetMember,
        "@type": "@id",
        "@container": "@set",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "targetMembers");
    };
    Factory.createDocument = function (targetMembers) {
        var document = Document.Factory.create();
        var fragment = document.createFragment({ targetMembers: targetMembers });
        fragment.types.push(exports.RDF_CLASS);
        return document;
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Fragment = __webpack_require__(35);
var RDF = __webpack_require__(4);
var Utils = __webpack_require__(0);
var Factory = (function () {
    function Factory() {
    }
    Factory.createFrom = function (object, idOrDocument, document) {
        var id = !!idOrDocument && Utils.isString(idOrDocument) ? idOrDocument : RDF.URI.Util.generateBNodeID();
        document = document || idOrDocument;
        return Fragment.Factory.createFrom(object, id, document);
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Document = __webpack_require__(10);
var Errors = __webpack_require__(3);
var NS = __webpack_require__(1);
var Utils = __webpack_require__(0);
exports.RDF_CLASS = NS.LDP.Class.DirectContainer;
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "membershipResource"));
    };
    Factory.is = function (object) {
        return (Factory.hasClassProperties(object)
            && Document.Factory.is(object)
            && object.hasType(exports.RDF_CLASS));
    };
    Factory.create = function (membershipResource, hasMemberRelation, isMemberOfRelation) {
        return Factory.createFrom({}, membershipResource, hasMemberRelation, isMemberOfRelation);
    };
    Factory.createFrom = function (object, membershipResource, hasMemberRelation, isMemberOfRelation) {
        if (Factory.is(object))
            throw new Errors.IllegalArgumentError("The base object is already a DirectContainer.");
        if (!membershipResource)
            throw new Errors.IllegalArgumentError("The property membershipResource cannot be null.");
        if (!hasMemberRelation)
            throw new Errors.IllegalArgumentError("The property hasMemberRelation cannot be empty.");
        if (!isMemberOfRelation && Utils.isDefined(isMemberOfRelation))
            throw new Errors.IllegalArgumentError("The property isMemberOfRelation cannot be empty.");
        var container = object;
        if (!Document.Factory.is(object))
            container = Document.Factory.createFrom(object);
        container.types.push(NS.LDP.Class.Container);
        container.types.push(NS.LDP.Class.DirectContainer);
        container.membershipResource = membershipResource;
        container.hasMemberRelation = hasMemberRelation;
        container.isMemberOfRelation = isMemberOfRelation;
        return container;
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NS = __webpack_require__(1);
var Utils = __webpack_require__(0);
var VolatileResource = __webpack_require__(53);
exports.RDF_CLASS = NS.C.Class.DocumentMetadata;
exports.SCHEMA = {
    "relatedDocument": {
        "@id": NS.C.Predicate.relatedDocument,
        "@type": "@id",
    },
    "eTag": {
        "@id": NS.C.Predicate.eTag,
        "@type": NS.XSD.DataType.string,
    },
    "bNodesMap": {
        "@id": NS.C.Predicate.bNodesMap,
        "@type": "@id",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "relatedDocument");
    };
    Factory.is = function (object) {
        return VolatileResource.Factory.is(object)
            && Factory.hasClassProperties(object)
            && object.hasType(exports.RDF_CLASS);
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NS = __webpack_require__(1);
exports.SCHEMA = {
    "entryKey": {
        "@id": NS.C.Predicate.entryKey,
    },
    "entryValue": {
        "@id": NS.C.Predicate.entryValue,
    },
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NS = __webpack_require__(1);
exports.RDF_CLASS = NS.C.Class.Error;
exports.SCHEMA = {
    "errorCode": {
        "@id": NS.C.Predicate.errorCode,
        "@type": NS.XSD.DataType.string,
    },
    "errorMessage": {
        "@id": NS.C.Predicate.errorMessage,
        "@language": "en",
    },
    "errorParameters": {
        "@id": NS.C.Predicate.errorParameters,
        "@type": "@id",
    },
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NS = __webpack_require__(1);
var Utils = __webpack_require__(0);
exports.RDF_CLASS = NS.LDP.Class.IndirectContainer;
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "insertedContentRelation"));
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NS = __webpack_require__(1);
var Resource_1 = __webpack_require__(5);
exports.RDF_CLASS = NS.C.Class.Map;
exports.SCHEMA = {
    "entries": {
        "@id": NS.C.Predicate.entry,
        "@type": "@id",
        "@container": "@set",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (object) {
        return Resource_1.Factory.is(object)
            && object.hasType(exports.RDF_CLASS)
            && object.hasOwnProperty("entries");
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Document = __webpack_require__(10);
var NS = __webpack_require__(1);
var Utils = __webpack_require__(0);
exports.RDF_CLASS = NS.C.Class.RemoveMemberAction;
exports.SCHEMA = {
    "targetMembers": {
        "@id": NS.C.Predicate.targetMember,
        "@type": "@id",
        "@container": "@set",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "targetMembers");
    };
    Factory.createDocument = function (targetMembers) {
        var document = Document.Factory.create();
        var fragment = document.createFragment({ targetMembers: targetMembers });
        fragment.types.push(exports.RDF_CLASS);
        return document;
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NS = __webpack_require__(1);
var VolatileResource = __webpack_require__(53);
var Utils = __webpack_require__(0);
exports.RDF_CLASS = NS.C.Class.ResponseMetadata;
exports.SCHEMA = {
    "documentsMetadata": {
        "@id": NS.C.Predicate.documentMetadata,
        "@type": "@id",
        "@container": "@set",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (object) {
        return VolatileResource.Factory.is(object)
            && Utils.hasProperty(object, "documentsMetadata")
            && object.hasType(exports.RDF_CLASS);
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NS = __webpack_require__(1);
exports.RDF_CLASS = NS.C.Class.ValidationError;
exports.SCHEMA = {
    "errorDetails": {
        "@id": NS.C.Predicate.errorDetails,
        "@type": "@id",
    },
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Class = (function () {
    function Class(username, password) {
        this._username = username;
        this._password = password;
    }
    Object.defineProperty(Class.prototype, "username", {
        get: function () { return this._username; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "password", {
        get: function () { return this._password; },
        enumerable: true,
        configurable: true
    });
    return Class;
}());
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ACL = __webpack_require__(55);
var Pointer = __webpack_require__(8);
var Utils = __webpack_require__(0);
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "accessTo");
    };
    Factory.decorate = function (document) {
        var acl = ACL.Factory.decorate(document);
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
    };
    return Factory;
}());
exports.Factory = Factory;
function parsePointer(element) {
    return Pointer.Factory.is(element) ? element : this.getPointer(element);
}


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Document = __webpack_require__(10);
var IllegalArgumentError_1 = __webpack_require__(21);
var NS = __webpack_require__(1);
var Utils = __webpack_require__(0);
exports.RDF_CLASS = NS.CS.Class.Role;
exports.SCHEMA = {
    "name": {
        "@id": NS.CS.Predicate.namae,
        "@type": NS.XSD.DataType.string,
    },
    "description": {
        "@id": NS.CS.Predicate.description,
        "@type": NS.XSD.DataType.string,
    },
    "parentRole": {
        "@id": NS.CS.Predicate.parentRole,
        "@type": "@id",
    },
    "childRoles": {
        "@id": NS.CS.Predicate.childRole,
        "@type": "@id",
        "@container": "@set",
    },
    "users": {
        "@id": NS.CS.Predicate.user,
        "@type": "@id",
        "@container": "@set",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "name");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && Document.Factory.is(object);
    };
    Factory.create = function (name, description) {
        return Factory.createFrom({}, name, description);
    };
    Factory.createFrom = function (object, name, description) {
        if (!Document.Factory.hasClassProperties(object))
            object = Document.Factory.createFrom(object);
        if (!name)
            throw new IllegalArgumentError_1.default("The name cannot be empty.");
        var role = object;
        role.name = name;
        role.description = description;
        return role;
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __webpack_require__(3);
var HTTP = __webpack_require__(7);
var PersistedProtectedDocument = __webpack_require__(20);
var URI = __webpack_require__(13);
var PersistedRole = __webpack_require__(60);
var Utils = __webpack_require__(0);
var Class = (function () {
    function Class(context) {
        this.context = context;
    }
    Class.prototype.createChild = function (parentRole, role, slugOrRequestOptions, requestOptions) {
        var _this = this;
        var parentURI = Utils.isString(parentRole) ? parentRole : parentRole.id;
        var slug = Utils.isString(slugOrRequestOptions) ? slugOrRequestOptions : null;
        requestOptions = HTTP.Request.Util.isOptions(slugOrRequestOptions) ? slugOrRequestOptions : requestOptions;
        var containerURI;
        var persistedRole;
        var responseCreated;
        return Utils.promiseMethod(function () {
            containerURI = _this.getContainerURI();
            parentURI = URI.Util.resolve(containerURI, parentURI);
            if (!URI.Util.isBaseOf(containerURI, parentURI))
                throw new Errors.IllegalArgumentError("The parent role provided is not a valid role.");
            return _this.context.documents.exists(parentURI);
        }).then(function (_a) {
            var exists = _a[0], response = _a[1];
            if (!exists)
                throw new Errors.IllegalArgumentError("The parent role provided doesn't exist.");
            return _this.context.documents.createChild(containerURI, role, slug, requestOptions);
        }).then(function (_a) {
            var newRole = _a[0], response = _a[1];
            responseCreated = response;
            persistedRole = PersistedRole.Factory.decorate(newRole, _this.context.documents);
            return _this.context.documents.addMember(parentURI, newRole);
        }).then(function (response) {
            return [persistedRole, responseCreated];
        });
    };
    Class.prototype.get = function (roleURI, requestOptions) {
        var _this = this;
        return Utils.promiseMethod(function () {
            return _this.context.documents.get(_this.resolveURI(roleURI), requestOptions);
        });
    };
    Class.prototype.listUsers = function (roleURI, requestOptions) {
        var _this = this;
        return this.getUsersAccessPoint(roleURI).then(function (accessPoint) {
            return _this.context.documents.listMembers(accessPoint.id, requestOptions);
        }).then(function (_a) {
            var documents = _a[0], response = _a[1];
            var users = documents.map(function (user) { return PersistedProtectedDocument.Factory.decorate(user, _this.context.documents); });
            return [users, response];
        });
    };
    Class.prototype.getUsers = function (roleURI, retrievalPreferencesOrRequestOptions, requestOptions) {
        var _this = this;
        return this.getUsersAccessPoint(roleURI).then(function (accessPoint) {
            return _this.context.documents.getMembers(accessPoint.id, retrievalPreferencesOrRequestOptions, requestOptions);
        });
    };
    Class.prototype.addUser = function (roleURI, user, requestOptions) {
        return this.addUsers(roleURI, [user], requestOptions);
    };
    Class.prototype.addUsers = function (roleURI, users, requestOptions) {
        var _this = this;
        return this.getUsersAccessPoint(roleURI).then(function (accessPoint) {
            return _this.context.documents.addMembers(accessPoint.id, users, requestOptions);
        });
    };
    Class.prototype.removeUser = function (roleURI, user, requestOptions) {
        return this.removeUsers(roleURI, [user], requestOptions);
    };
    Class.prototype.removeUsers = function (roleURI, users, requestOptions) {
        var _this = this;
        return this.getUsersAccessPoint(roleURI).then(function (accessPoint) {
            return _this.context.documents.removeMembers(accessPoint.id, users, requestOptions);
        });
    };
    Class.prototype.resolveURI = function (relativeURI) {
        var rolesContainer = this.getContainerURI();
        var absoluteRoleURI = URI.Util.resolve(rolesContainer, relativeURI);
        if (!absoluteRoleURI.startsWith(rolesContainer))
            throw new Errors.IllegalArgumentError("The provided URI \"" + relativeURI + "\" isn't a valid Carbon LDP role.");
        return absoluteRoleURI;
    };
    Class.prototype.getUsersAccessPoint = function (roleURI) {
        var _this = this;
        return Utils.promiseMethod(function () {
            var uri = _this.resolveURI(roleURI);
            return _this.context.documents.executeSELECTQuery(uri, "PREFIX:<https://carbonldp.com/ns/v1/>SELECT DISTINCT?accessPoint{<" + uri + ">:platform#accessPoint?accessPoint.?accessPoint<http://www.w3.org/ns/ldp#hasMemberRelation>:security#user}");
        }).then(function (_a) {
            var selectResults = _a[0], response = _a[1];
            return selectResults.bindings[0].accessPoint;
        });
    };
    Class.prototype.getContainerURI = function () {
        if (!this.context.hasSetting("system.roles.container"))
            throw new Errors.IllegalStateError("The \"system.roles.container\" setting hasn't been defined.");
        return this.context.resolveSystemURI(this.context.getSetting("system.roles.container"));
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NS = __webpack_require__(1);
var Pointer = __webpack_require__(8);
var Resource = __webpack_require__(5);
var URI = __webpack_require__(13);
exports.TICKETS_CONTAINER = "auth-tickets/";
exports.RDF_CLASS = NS.CS.Class.Ticket;
exports.SCHEMA = {
    "forURI": {
        "@id": NS.CS.Predicate.forIRI,
        "@type": "@id",
    },
    "expirationTime": {
        "@id": NS.CS.Predicate.expirationTime,
        "@type": NS.XSD.DataType.dateTime,
    },
    "ticketKey": {
        "@id": NS.CS.Predicate.ticketKey,
        "@type": NS.XSD.DataType.string,
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.create = function (uri) {
        return Factory.createFrom(Resource.Factory.create(URI.Util.generateBNodeID()), uri);
    };
    Factory.createFrom = function (object, uri) {
        var ticket = object;
        ticket.forURI = Pointer.Factory.create(uri);
        ticket.types.push(exports.RDF_CLASS);
        return ticket;
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __webpack_require__(3);
var HTTP = __webpack_require__(7);
var JSONLD = __webpack_require__(17);
var LDP = __webpack_require__(18);
var NS = __webpack_require__(1);
var RDF = __webpack_require__(4);
var Resource = __webpack_require__(5);
var BasicAuthenticator_1 = __webpack_require__(56);
var Token = __webpack_require__(61);
var UsernameAndPasswordToken = __webpack_require__(62);
var Utils = __webpack_require__(0);
exports.TOKEN_CONTAINER = "auth-tokens/";
var Class = (function () {
    function Class(context) {
        if (context === null)
            throw new Errors.IllegalArgumentError("context cannot be null");
        this.context = context;
        this.basicAuthenticator = new BasicAuthenticator_1.default();
    }
    Class.prototype.isAuthenticated = function () {
        return !!this._credentials && this._credentials.expirationTime > new Date();
    };
    Class.prototype.authenticate = function (authenticationOrCredentials) {
        var _this = this;
        if (authenticationOrCredentials instanceof UsernameAndPasswordToken.Class)
            return this.basicAuthenticator.authenticate(authenticationOrCredentials).then(function () {
                return _this.createToken();
            }).then(function (_a) {
                var token = _a[0], response = _a[1];
                _this.basicAuthenticator.clearAuthentication();
                _this._credentials = token;
                return token;
            });
        var credentials = authenticationOrCredentials;
        if (Utils.isString(credentials.expirationTime))
            authenticationOrCredentials.expirationTime = new Date(credentials.expirationTime);
        if (credentials.expirationTime <= new Date())
            return Promise.reject(new Errors.IllegalArgumentError("The token provided in not valid."));
        this._credentials = credentials;
        return Promise.resolve(credentials);
    };
    Class.prototype.addAuthentication = function (requestOptions) {
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        this.addTokenAuthenticationHeader(headers);
        return requestOptions;
    };
    Class.prototype.clearAuthentication = function () {
        this._credentials = null;
    };
    Class.prototype.createToken = function () {
        var _this = this;
        var requestOptions = {};
        this.basicAuthenticator.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.RDFSource, requestOptions);
        return Promise.resolve().then(function () {
            var tokensURI = _this.context.resolveSystemURI(exports.TOKEN_CONTAINER);
            return HTTP.Request.Service.post(tokensURI, null, requestOptions, new JSONLD.Parser.Class());
        }).then(function (_a) {
            var expandedResult = _a[0], response = _a[1];
            var freeNodes = RDF.Node.Util.getFreeNodes(expandedResult);
            var freeResources = _this.context.documents._getFreeResources(freeNodes);
            var tokenResources = freeResources.getResources().filter(function (resource) { return Resource.Util.hasType(resource, Token.RDF_CLASS); });
            if (tokenResources.length === 0)
                throw new HTTP.Errors.BadResponseError("No '" + Token.RDF_CLASS + "' was returned.", response);
            if (tokenResources.length > 1)
                throw new HTTP.Errors.BadResponseError("Multiple '" + Token.RDF_CLASS + "' were returned. ", response);
            var token = tokenResources[0];
            var userDocuments = RDF.Document.Util.getDocuments(expandedResult).filter(function (rdfDocument) { return rdfDocument["@id"] === token.user.id; });
            userDocuments.forEach(function (document) { return _this.context.documents._getPersistedDocument(document, response); });
            var responseMetadata = freeResources
                .getResources()
                .find(LDP.ResponseMetadata.Factory.is);
            if (responseMetadata)
                responseMetadata
                    .documentsMetadata
                    .forEach(function (documentMetadata) {
                    var document = documentMetadata.relatedDocument;
                    document._etag = documentMetadata.eTag;
                });
            return [token, response];
        });
    };
    Class.prototype.addTokenAuthenticationHeader = function (headers) {
        if (headers.has("authorization"))
            return;
        var header = new HTTP.Header.Class();
        headers.set("authorization", header);
        var authorization = "Token " + this._credentials.key;
        header.values.push(new HTTP.Header.Value(authorization));
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NS = __webpack_require__(1);
var Utils = __webpack_require__(0);
exports.RDF_CLASS = NS.CS.Class.User;
exports.SCHEMA = {
    "name": {
        "@id": NS.CS.Predicate.namae,
        "@type": NS.XSD.DataType.string,
    },
    "credentials": {
        "@id": NS.CS.Predicate.credentials,
        "@type": "@id",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "name");
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __webpack_require__(3);
var URI = __webpack_require__(13);
var Credentials = __webpack_require__(57);
var PersistedUser = __webpack_require__(37);
var Class = (function () {
    function Class(context) {
        this.context = context;
    }
    Class.prototype.register = function (email, password, enabled) {
        var _this = this;
        var credentials = Credentials.Factory.create(email, password);
        credentials.enabled = enabled;
        return Promise.resolve()
            .then(function () {
            var containerURI = _this.getCredentialsContainerURI();
            return _this.context.documents.createChildAndRetrieve(containerURI, credentials);
        })
            .then(function (_a) {
            var persistedCredentials = _a[0], responses = _a[1];
            return [persistedCredentials.user, responses];
        });
    };
    Class.prototype.get = function (userURI, requestOptions) {
        var _this = this;
        return new Promise(function (resolve) {
            return resolve(_this.context.documents.get(_this.resolveURI(userURI), requestOptions));
        });
    };
    Class.prototype.enableCredentials = function (userURI, requestOptions) {
        return this.changeEnabledStatus(userURI, true, requestOptions);
    };
    Class.prototype.disableCredentials = function (userURI, requestOptions) {
        return this.changeEnabledStatus(userURI, false, requestOptions);
    };
    Class.prototype.delete = function (userURI, requestOptions) {
        var _this = this;
        return new Promise(function (resolve) {
            return resolve(_this.context.documents.delete(_this.resolveURI(userURI), requestOptions));
        });
    };
    Class.prototype.changeEnabledStatus = function (userURI, value, requestOptions) {
        var _this = this;
        return Promise.resolve().then(function () {
            var absoluteUserURI = _this.resolveURI(userURI);
            var userPointer = _this.context.documents.getPointer(absoluteUserURI);
            var persistedUser = PersistedUser.Factory.decorate(userPointer, _this.context.documents);
            if (value)
                return persistedUser.enableCredentials(requestOptions);
            return persistedUser.disableCredentials(requestOptions);
        });
    };
    Class.prototype.resolveURI = function (relativeURI) {
        var usersContainer = this.getContainerURI();
        var absoluteRoleURI = URI.Util.resolve(usersContainer, relativeURI);
        if (!absoluteRoleURI.startsWith(usersContainer))
            throw new Errors.IllegalArgumentError("The provided URI \"" + relativeURI + "\" isn't a valid Carbon LDP user.");
        return absoluteRoleURI;
    };
    Class.prototype.getContainerURI = function () {
        if (!this.context.hasSetting("system.users.container"))
            throw new Errors.IllegalStateError("The \"system.users.container\" setting hasn't been defined.");
        return this.context.resolve(this.context.getSetting("system.users.container"));
    };
    Class.prototype.getCredentialsContainerURI = function () {
        if (!this.context.hasSetting("system.credentials.container"))
            throw new Errors.IllegalStateError("The \"system.credentials.container\" setting hasn't been defined.");
        return this.context.resolveSystemURI(this.context.getSetting("system.credentials.container"));
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IRIUtils = __webpack_require__(139);
var PatternsUtils = __webpack_require__(67);
var PatternBuilder_1 = __webpack_require__(68);
var Token_1 = __webpack_require__(11);
var StringLiteral_1 = __webpack_require__(14);
var NumberLiteral_1 = __webpack_require__(147);
var Tokens_1 = __webpack_require__(6);
var NewLineSymbol_1 = __webpack_require__(16);
var SPARQLER = (function () {
    function SPARQLER() {
        this._prefixes = new Map();
        this.initInterfaces();
    }
    SPARQLER.prototype.base = function (iri) {
        this._base = iri;
        return this.interfaces.queryClause;
    };
    SPARQLER.prototype.vocab = function (iri) {
        this._vocab = iri;
        return this.interfaces.queryClause;
    };
    SPARQLER.prototype.prefix = function (name, iri) {
        this._prefixes.set(name, {
            iri: iri,
            used: false,
        });
        return this.interfaces.queryClause;
    };
    SPARQLER.prototype._select = function (selectTokens, variables) {
        var _this = this;
        if (variables && variables.length === 0)
            throw new Error("IllegalArgumentError: Need to provide al least one variable.");
        this._selects = selectTokens;
        if (variables)
            variables.forEach(function (variable) { return _this._selects.push(Tokens_1.VAR_SYMBOL, new StringLiteral_1.StringLiteral(variable)); });
        Object.assign(this.interfaces.finishClause, this.interfaces.finishSelect);
        return Object.assign({}, this.interfaces.whereClause, this.interfaces.fromClause);
    };
    SPARQLER.prototype.select = function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        return this._select([Tokens_1.SELECT], variables);
    };
    SPARQLER.prototype.selectDistinct = function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        return this._select([Tokens_1.SELECT, Tokens_1.DISTINCT], variables);
    };
    SPARQLER.prototype.selectReduced = function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        return this._select([Tokens_1.SELECT, Tokens_1.REDUCED], variables);
    };
    SPARQLER.prototype.selectAll = function () {
        return this._select([Tokens_1.SELECT, Tokens_1.ALL]);
    };
    SPARQLER.prototype.selectAllDistinct = function () {
        return this._select([Tokens_1.SELECT, Tokens_1.DISTINCT, Tokens_1.ALL]);
    };
    SPARQLER.prototype.selectAllReduced = function () {
        return this._select([Tokens_1.SELECT, Tokens_1.REDUCED, Tokens_1.ALL]);
    };
    SPARQLER.prototype.from = function (iri) {
        this._from = [Tokens_1.FROM].concat(this._resolveIRI(iri));
        return this.interfaces.whereClause;
    };
    SPARQLER.prototype.fromNamed = function (iri) {
        this._from = [Tokens_1.FROM, Tokens_1.NAMED].concat(this._resolveIRI(iri));
        return this.interfaces.whereClause;
    };
    SPARQLER.prototype.where = function (patternFunction) {
        var result = patternFunction(new PatternBuilder_1.PatternBuilder(this));
        this._where = [Tokens_1.WHERE].concat(PatternsUtils.getBlockTokens(result));
        return Object.assign({}, this.interfaces.groupClause, this.interfaces.havingClause, this.interfaces.orderClause, this.interfaces.limitClause, this.interfaces.offsetClause, this.interfaces.finishClause);
    };
    SPARQLER.prototype.groupBy = function (rawCondition) {
        this._group = [Tokens_1.GROUP, Tokens_1.BY, new StringLiteral_1.StringLiteral(rawCondition)];
        return Object.assign({}, this.interfaces.havingClause, this.interfaces.orderClause, this.interfaces.limitClause, this.interfaces.offsetClause, this.interfaces.finishClause);
    };
    SPARQLER.prototype.having = function (rawCondition) {
        this._having = [Tokens_1.HAVING, new StringLiteral_1.StringLiteral(rawCondition)];
        return Object.assign({}, this.interfaces.orderClause, this.interfaces.limitClause, this.interfaces.offsetClause, this.interfaces.finishClause);
    };
    SPARQLER.prototype.orderBy = function (rawCondition) {
        this._order = [Tokens_1.ORDER, Tokens_1.BY, new StringLiteral_1.StringLiteral(rawCondition)];
        return Object.assign({}, this.interfaces.limitClause, this.interfaces.offsetClause, this.interfaces.finishClause);
    };
    SPARQLER.prototype.limit = function (limit) {
        this._limit = [Tokens_1.LIMIT, new NumberLiteral_1.NumberLiteral(limit)];
        if (this._offset)
            return this.interfaces.finishClause;
        return Object.assign({}, this.interfaces.offsetClause, this.interfaces.finishClause);
    };
    SPARQLER.prototype.offset = function (offset) {
        this._offset = [Tokens_1.OFFSET, new NumberLiteral_1.NumberLiteral(offset)];
        if (this._limit)
            return this.interfaces.finishClause;
        return Object.assign({}, this.interfaces.limitClause, this.interfaces.finishClause);
    };
    SPARQLER.prototype.constructQuery = function (format) {
        var tokens = [];
        if (this._base)
            tokens.push(Tokens_1.BASE, Tokens_1.OPEN_IRI, new StringLiteral_1.StringLiteral(this._base), Tokens_1.CLOSE_IRI);
        this._prefixes.forEach(function (prefixInfo, prefix) {
            if (prefixInfo.used || format === Token_1.TokenFormat.PRETTY)
                tokens.push(Tokens_1.PREFIX, new StringLiteral_1.StringLiteral(prefix + ":"), Tokens_1.OPEN_IRI, new StringLiteral_1.StringLiteral(prefixInfo.iri), Tokens_1.CLOSE_IRI);
        });
        if (this._selects)
            tokens.push.apply(tokens, this._selects);
        if (this._from)
            tokens.push.apply(tokens, this._from);
        if (this._where)
            tokens.push.apply(tokens, this._where);
        if (this._order)
            tokens.push.apply(tokens, this._order);
        if (this._having)
            tokens.push.apply(tokens, this._having);
        if (this._group)
            tokens.push.apply(tokens, this._group);
        if (this._limit)
            tokens.push.apply(tokens, this._limit);
        if (this._offset)
            tokens.push.apply(tokens, this._offset);
        if (format === Token_1.TokenFormat.COMPACT) {
            return tokens.reduce(function (res, token, index) {
                var nextToken = tokens[index + 1];
                if (nextToken === Tokens_1.EMPTY_SEPARATOR)
                    nextToken = tokens[index + 2];
                return res + token.getTokenValue(format, nextToken);
            }, "");
        }
        else if (format === Token_1.TokenFormat.PRETTY) {
            var stack_1 = [];
            var actual_1 = {
                token: null,
                indentation: 0,
                subject: 0,
                property: 0,
                spaces: 0
            };
            return tokens.reduce(function (res, token, index) {
                var nextToken = tokens[index + 1];
                var tokenString = token.getTokenValue(format, nextToken);
                if (actual_1.spaces === 0) {
                    actual_1.subject += tokenString.length;
                    if (tokenString.endsWith(" "))
                        actual_1.spaces++;
                }
                else if (actual_1.spaces === 1) {
                    actual_1.property += tokenString.length;
                    if (tokenString.endsWith(" "))
                        actual_1.spaces++;
                }
                if ([Tokens_1.OPEN_MULTI_BLOCK, Tokens_1.OPEN_MULTI_BN, Tokens_1.OPEN_MULTI_LIST].indexOf(token) !== -1) {
                    stack_1.push(actual_1);
                    actual_1 = {
                        token: token,
                        indentation: actual_1.indentation + 4,
                        subject: 0,
                        property: 0,
                        spaces: token === Tokens_1.OPEN_MULTI_BLOCK ? 0 : token === Tokens_1.OPEN_MULTI_BN ? 1 : 2,
                    };
                }
                else if ([Tokens_1.CLOSE_MULTI_LIST].indexOf(token) !== -1) {
                    if (!(nextToken instanceof NewLineSymbol_1.NewLineSymbol)) {
                        var parent_1 = actual_1;
                        while ([Tokens_1.OPEN_MULTI_BLOCK, Tokens_1.OPEN_MULTI_BN, Tokens_1.OPEN_MULTI_LIST].indexOf(parent_1.token) === -1)
                            parent_1 = stack_1.pop();
                        stack_1.push(parent_1);
                        actual_1 = {
                            token: token,
                            indentation: parent_1.indentation + 4,
                            subject: 0,
                            property: 0,
                            spaces: 1
                        };
                    }
                }
                else if ([Tokens_1.SAME_SUBJECT_SEPARATOR, Tokens_1.SAME_PROPERTY_SEPARATOR, Tokens_1.CLOSE_MULTI_LIST].indexOf(token) !== -1) {
                    var parent_2 = actual_1;
                    while ([Tokens_1.OPEN_MULTI_BLOCK, Tokens_1.OPEN_MULTI_BN, Tokens_1.OPEN_MULTI_LIST, Tokens_1.CLOSE_MULTI_LIST, Tokens_1.CLOSE_MULTI_BN].indexOf(parent_2.token) === -1)
                        parent_2 = stack_1.pop();
                    stack_1.push(parent_2);
                    if (token === Tokens_1.SAME_SUBJECT_SEPARATOR) {
                        actual_1 = {
                            token: token,
                            indentation: parent_2.indentation + actual_1.subject,
                            subject: actual_1.subject,
                            property: 0,
                            spaces: 1
                        };
                    }
                    else if (token === Tokens_1.SAME_PROPERTY_SEPARATOR) {
                        actual_1 = {
                            token: token,
                            indentation: parent_2.indentation + actual_1.subject + actual_1.property,
                            subject: actual_1.subject,
                            property: actual_1.property,
                            spaces: 2
                        };
                    }
                }
                else if (token === Tokens_1.GRAPH_PATTERN_SEPARATOR) {
                    while (actual_1.token !== Tokens_1.OPEN_MULTI_BLOCK)
                        actual_1 = stack_1.pop();
                    actual_1.spaces = 0;
                    actual_1.subject = 0;
                    actual_1.property = 0;
                }
                if (nextToken === Tokens_1.CLOSE_MULTI_BLOCK) {
                    while (actual_1.token !== Tokens_1.OPEN_MULTI_BLOCK)
                        actual_1 = stack_1.pop();
                    actual_1 = stack_1.pop();
                }
                else if (nextToken === Tokens_1.CLOSE_MULTI_BN) {
                    while (actual_1.token !== Tokens_1.OPEN_MULTI_BN)
                        actual_1 = stack_1.pop();
                    actual_1 = stack_1.pop();
                }
                else if (nextToken === Tokens_1.CLOSE_MULTI_LIST) {
                    while (actual_1.token !== Tokens_1.OPEN_MULTI_LIST)
                        actual_1 = stack_1.pop();
                    actual_1 = stack_1.pop();
                }
                if (tokenString.endsWith("\n")) {
                    tokenString = tokenString + " ".repeat(actual_1.indentation);
                }
                return res + tokenString;
            }, "");
        }
    };
    SPARQLER.prototype.toCompactString = function () {
        return this.constructQuery(Token_1.TokenFormat.COMPACT);
    };
    SPARQLER.prototype.toString = function () {
        return this.toCompactString();
    };
    SPARQLER.prototype.toPrettyString = function () {
        return this.constructQuery(Token_1.TokenFormat.PRETTY);
    };
    SPARQLER.prototype.initInterfaces = function () {
        this.interfaces = {
            queryClause: {
                base: this.base.bind(this),
                vocab: this.vocab.bind(this),
                prefix: this.prefix.bind(this),
                select: this.select.bind(this),
                selectDistinct: this.selectDistinct.bind(this),
                selectReduced: this.selectReduced.bind(this),
                selectAll: this.selectAll.bind(this),
                selectAllDistinct: this.selectAllDistinct.bind(this),
                selectAllReduced: this.selectAllReduced.bind(this),
            },
            fromClause: {
                from: this.from.bind(this),
                fromNamed: this.fromNamed.bind(this),
            },
            whereClause: {
                where: this.where.bind(this),
            },
            groupClause: {
                groupBy: this.groupBy.bind(this),
            },
            havingClause: {
                having: this.having.bind(this),
            },
            orderClause: {
                orderBy: this.orderBy.bind(this),
            },
            limitClause: {
                limit: this.limit.bind(this),
            },
            offsetClause: {
                offset: this.offset.bind(this),
            },
            finishClause: {
                toCompactString: this.toCompactString.bind(this),
                toPrettyString: this.toPrettyString.bind(this),
            },
        };
    };
    SPARQLER.prototype._resolveIRI = function (iri, vocab) {
        if (vocab === void 0) { vocab = false; }
        var tokens;
        if (IRIUtils.isPrefixed(iri)) {
            var parts = IRIUtils.getPrefixedParts(iri);
            var prefixInfo = this._prefixes.get(parts[0]);
            if (prefixInfo === void 0)
                throw new Error("IllegalArgumentError: The used prefix has not been declared");
            tokens = [new StringLiteral_1.StringLiteral(parts[0]), Tokens_1.PREFIX_SYMBOL, new StringLiteral_1.StringLiteral(parts[1])];
            prefixInfo.used = true;
        }
        else {
            tokens = IRIUtils.resolve(iri, vocab ? this._vocab : void 0);
        }
        return tokens;
    };
    return SPARQLER;
}());
exports.SPARQLER = SPARQLER;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SPARQLER;

//# sourceMappingURL=SPARQLER.js.map


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var StringLiteral_1 = __webpack_require__(14);
var Tokens_1 = __webpack_require__(6);
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
var prefixRegex = /([A-Za-z](([A-Za-z_\-0-9]|\.)*[A-Za-z_\-0-9])?)?:/;
var prefixNormalizeRegex = /([_~.\-!$&'|()*+,;=/?#@%])/g;
function isPrefixed(iri) {
    return !!iri.match(prefixRegex) && !hasProtocol(iri);
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
        tokens = [Tokens_1.OPEN_IRI, new StringLiteral_1.StringLiteral(iri), Tokens_1.CLOSE_IRI];
    }
    return tokens;
}
exports.resolve = resolve;

//# sourceMappingURL=IRI.js.map


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TriplesSubject_1 = __webpack_require__(39);
var ObjectPattern = __webpack_require__(26);
var StringLiteral_1 = __webpack_require__(14);
var Tokens_1 = __webpack_require__(6);
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
        _this.elementTokens = [Tokens_1.OPEN_QUOTE, new StringLiteral_1.StringLiteral(value), Tokens_1.CLOSE_QUOTE];
        return _this;
    }
    RDFLiteral.prototype.ofType = function (type) {
        this.elementTokens = ObjectPattern.addType(this.value, type);
        return this;
    };
    ;
    RDFLiteral.prototype.withLanguage = function (language) {
        this.elementTokens = [Tokens_1.OPEN_QUOTE, new StringLiteral_1.StringLiteral(this.value), Tokens_1.CLOSE_QUOTE, Tokens_1.LANG_SYMBOL, new StringLiteral_1.StringLiteral(language)];
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
        _this.elementTokens = ObjectPattern.addType(_this.value, type);
        return _this;
    }
    return NumericLiteral;
}(Literal));
exports.NumericLiteral = NumericLiteral;
var BooleanLiteral = (function (_super) {
    __extends(BooleanLiteral, _super);
    function BooleanLiteral(resolver, value) {
        var _this = _super.call(this, resolver, value) || this;
        _this.elementTokens = ObjectPattern.addType(_this.value, "boolean");
        return _this;
    }
    return BooleanLiteral;
}(Literal));
exports.BooleanLiteral = BooleanLiteral;

//# sourceMappingURL=Literals.js.map


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.NAMESPACE = "http://www.w3.org/2001/XMLSchema#";
exports.dateTime = exports.NAMESPACE + "dateTime";
exports.integer = exports.NAMESPACE + "integer";
exports.float = exports.NAMESPACE + "float";
exports.boolean = exports.NAMESPACE + "boolean";
exports.string = exports.NAMESPACE + "string";

//# sourceMappingURL=XSD.js.map


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TriplesSubject_1 = __webpack_require__(39);
var Resource = (function (_super) {
    __extends(Resource, _super);
    function Resource(resolver, iri) {
        var _this = _super.call(this, resolver) || this;
        _this.elementTokens = resolver._resolveIRI(iri);
        return _this;
    }
    return Resource;
}(TriplesSubject_1.TriplesSubject));
exports.Resource = Resource;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Resource;

//# sourceMappingURL=Resource.js.map


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TriplesSubject_1 = __webpack_require__(39);
var StringLiteral_1 = __webpack_require__(14);
var Tokens_1 = __webpack_require__(6);
var Variable = (function (_super) {
    __extends(Variable, _super);
    function Variable(resolver, name) {
        var _this = _super.call(this, resolver) || this;
        _this.elementTokens = [Tokens_1.VAR_SYMBOL, new StringLiteral_1.StringLiteral(name)];
        return _this;
    }
    return Variable;
}(TriplesSubject_1.TriplesSubject));
exports.Variable = Variable;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Variable;

//# sourceMappingURL=Variable.js.map


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Tokens_1 = __webpack_require__(6);
var TriplesPattern_1 = __webpack_require__(40);
var BlankNode = (function (_super) {
    __extends(BlankNode, _super);
    function BlankNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlankNode.prototype.getSelfTokens = function () {
        if (!this.patternTokens.find(function (token) { return token === Tokens_1.SAME_SUBJECT_SEPARATOR || token === Tokens_1.SAME_PROPERTY_SEPARATOR; }))
            return [Tokens_1.OPEN_SINGLE_BN].concat(this.patternTokens, [Tokens_1.CLOSE_SINGLE_BN]);
        return [Tokens_1.OPEN_MULTI_BN].concat(this.patternTokens, [Tokens_1.CLOSE_MULTI_BN]);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BlankNode;

//# sourceMappingURL=BlankNode.js.map


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Tokens_1 = __webpack_require__(6);
var TriplesPattern_1 = __webpack_require__(40);
var ObjectPattern = __webpack_require__(26);
var NewLineSymbol_1 = __webpack_require__(16);
var Collection = (function (_super) {
    __extends(Collection, _super);
    function Collection(resolver, values) {
        var _this = _super.call(this, resolver) || this;
        var tokens = [];
        values.forEach(function (value, index) {
            tokens.push.apply(tokens, ObjectPattern.serialize(value));
            if (index < values.length - 1)
                tokens.push(Tokens_1.EMPTY_SEPARATOR);
        });
        var isSingle = values.length <= 1 && !tokens.find(function (token) { return token instanceof NewLineSymbol_1.NewLineSymbol; });
        _this.elementTokens = [
            isSingle ? Tokens_1.OPEN_SINGLE_LIST : Tokens_1.OPEN_MULTI_LIST
        ].concat(tokens, [
            isSingle ? Tokens_1.CLOSE_SINGLE_LIST : Tokens_1.CLOSE_MULTI_LIST
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Collection;

//# sourceMappingURL=Collection.js.map


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NotTriplesPattern_1 = __webpack_require__(69);
var Tokens_1 = __webpack_require__(6);
var ObjectPattern = __webpack_require__(26);
var ValuesPattern = (function (_super) {
    __extends(ValuesPattern, _super);
    function ValuesPattern(resolver, variables) {
        var _this = _super.call(this, [Tokens_1.VALUES]) || this;
        _this.init();
        _this.resolver = resolver;
        _this.length = variables.length;
        if (_this.length === 1) {
            (_a = _this.patternTokens).push.apply(_a, variables[0].getSelfTokens().concat([Tokens_1.OPEN_SINGLE_BLOCK]));
        }
        else {
            _this.patternTokens.push(Tokens_1.OPEN_SINGLE_LIST);
            variables.forEach(function (variable) {
                return (_a = _this.patternTokens).push.apply(_a, variable.getSelfTokens());
                var _a;
            });
            _this.patternTokens.push(Tokens_1.CLOSE_SINGLE_LIST, Tokens_1.OPEN_MULTI_BLOCK);
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
            (_a = this.patternTokens).push.apply(_a, ObjectPattern.serialize(values[0]));
        }
        else {
            this.patternTokens.push(Tokens_1.OPEN_SINGLE_LIST);
            values.forEach(function (value) {
                return (_a = _this.patternTokens).push.apply(_a, ObjectPattern.serialize(value));
                var _a;
            });
            this.patternTokens.push(Tokens_1.CLOSE_SINGLE_LIST);
        }
        return this.interfaces.addPattern;
        var _a;
    };
    ValuesPattern.prototype.getPattern = function () {
        if (this.length === 1) {
            this.patternTokens.push(Tokens_1.CLOSE_SINGLE_BLOCK);
        }
        else {
            this.patternTokens.push(Tokens_1.CLOSE_MULTI_BLOCK);
        }
        return this.patternTokens;
    };
    ValuesPattern.prototype.init = function () {
        var _this = this;
        this.interfaces = {
            addPattern: {
                and: this.has.bind(this),
                getPattern: function () { return _this.getPattern(); },
            }
        };
    };
    return ValuesPattern;
}(NotTriplesPattern_1.NotTriplesPattern));
exports.ValuesPattern = ValuesPattern;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ValuesPattern;

//# sourceMappingURL=ValuesPattern.js.map


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Token_1 = __webpack_require__(11);
var Identifier_1 = __webpack_require__(15);
var Operator_1 = __webpack_require__(25);
var RightSymbol_1 = __webpack_require__(38);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NumberLiteral;

//# sourceMappingURL=NumberLiteral.js.map


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils = __webpack_require__(0);
var ValueTypes = (function () {
    function ValueTypes() {
    }
    Object.defineProperty(ValueTypes, "URI", {
        get: function () { return "uri"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueTypes, "LITERAL", {
        get: function () { return "literal"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueTypes, "BNODE", {
        get: function () { return "bnode"; },
        enumerable: true,
        configurable: true
    });
    return ValueTypes;
}());
exports.ValueTypes = ValueTypes;
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (value) {
        return (Utils.hasPropertyDefined(value, "head"));
    };
    Factory.is = function (value) {
        return (Utils.isObject(value) &&
            Factory.hasClassProperties(value));
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __webpack_require__(3);
var HTTP = __webpack_require__(7);
var RDF = __webpack_require__(4);
var Utils = __webpack_require__(0);
var RawResultsParser_1 = __webpack_require__(70);
var Class = (function () {
    function Class() {
    }
    Class.executeRawASKQuery = function (url, askQuery, options) {
        if (options === void 0) { options = {}; }
        options = Utils.extend(options, Class.defaultOptions);
        HTTP.Request.Util.setAcceptHeader("application/sparql-results+json", options);
        HTTP.Request.Util.setContentTypeHeader("application/sparql-query", options);
        return HTTP.Request.Service.post(url, askQuery, options, Class.resultsParser);
    };
    Class.executeASKQuery = function (url, askQuery, options) {
        if (options === void 0) { options = {}; }
        return Class
            .executeRawASKQuery(url, askQuery, options)
            .then(function (_a) {
            var rawResults = _a[0], response = _a[1];
            return [rawResults.boolean, response];
        });
    };
    Class.executeRawSELECTQuery = function (url, selectQuery, options) {
        if (options === void 0) { options = {}; }
        options = Utils.extend(options, Class.defaultOptions);
        HTTP.Request.Util.setAcceptHeader("application/sparql-results+json", options);
        HTTP.Request.Util.setContentTypeHeader("application/sparql-query", options);
        return HTTP.Request.Service.post(url, selectQuery, options, Class.resultsParser);
    };
    Class.executeSELECTQuery = function (url, selectQuery, pointerLibrary, options) {
        if (options === void 0) { options = {}; }
        return Class
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
                    binding[bindingRow] = Class.parseRawBindingProperty(bindingCell, pointerLibrary);
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
    Class.executeRawCONSTRUCTQuery = function (url, constructQuery, options) {
        if (options === void 0) { options = {}; }
        options = Utils.extend(options, Class.defaultOptions);
        if (HTTP.Request.Util.getHeader("Accept", options) === undefined)
            HTTP.Request.Util.setAcceptHeader("application/ld+json", options);
        HTTP.Request.Util.setContentTypeHeader("application/sparql-query", options);
        return HTTP.Request.Service.post(url, constructQuery, options, Class.stringParser);
    };
    Class.executeRawDESCRIBEQuery = function (url, describeQuery, options) {
        if (options === void 0) { options = {}; }
        options = Utils.extend(options, Class.defaultOptions);
        if (HTTP.Request.Util.getHeader("Accept", options) === undefined)
            HTTP.Request.Util.setAcceptHeader("application/ld+json", options);
        HTTP.Request.Util.setContentTypeHeader("application/sparql-query", options);
        return HTTP.Request.Service.post(url, describeQuery, options, Class.stringParser);
    };
    Class.executeUPDATE = function (url, updateQuery, options) {
        if (options === void 0) { options = {}; }
        options = Utils.extend(options, Class.defaultOptions);
        if (HTTP.Request.Util.getHeader("Accept", options) === undefined)
            HTTP.Request.Util.setAcceptHeader("application/ld+json", options);
        HTTP.Request.Util.setContentTypeHeader("application/sparql-update", options);
        return HTTP.Request.Service.post(url, updateQuery, options);
    };
    Class.parseRawBindingProperty = function (rawBindingProperty, pointerLibrary) {
        switch (rawBindingProperty.type) {
            case "uri":
                return pointerLibrary.getPointer(rawBindingProperty.value);
            case "bnode":
                throw new Errors.NotImplementedError("BNodes cannot be queried directly");
            case "literal":
                if ("datatype" in rawBindingProperty) {
                    return RDF.Literal.Factory.parse(rawBindingProperty.value, rawBindingProperty.datatype);
                }
                else {
                    return RDF.Literal.Factory.parse(rawBindingProperty.value);
                }
            default:
                throw new Errors.IllegalArgumentError("The bindingProperty has an unsupported type");
        }
    };
    Class.defaultOptions = {};
    Class.resultsParser = new RawResultsParser_1.default();
    Class.stringParser = new HTTP.StringParser.Class();
    return Class;
}());
exports.Class = Class;
exports.default = Class;


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = __webpack_require__(21);
var ObjectSchema = __webpack_require__(9);
var XSD = __webpack_require__(22);
var URI = __webpack_require__(13);
var Utils = __webpack_require__(0);
var allowedTypes = ["numeric", "string", "boolean", "dateTime"];
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (object) {
        return Utils.hasPropertyDefined(object, "orderBy")
            || Utils.hasPropertyDefined(object, "limit")
            || Utils.hasPropertyDefined(object, "offset");
    };
    return Factory;
}());
exports.Factory = Factory;
var Util = (function () {
    function Util() {
    }
    Util.stringifyRetrievalPreferences = function (retrievalPreferences, digestedSchema) {
        var stringPreferences = "";
        if ("limit" in retrievalPreferences) {
            stringPreferences += "limit=" + retrievalPreferences.limit;
        }
        if ("offset" in retrievalPreferences) {
            stringPreferences += (stringPreferences ? "&" : "") + "offset=" + retrievalPreferences.offset;
        }
        if ("orderBy" in retrievalPreferences && retrievalPreferences.orderBy.length > 0) {
            stringPreferences += (stringPreferences ? "&" : "") + "orderBy=";
            var stringOrders = [];
            for (var _i = 0, _a = retrievalPreferences.orderBy; _i < _a.length; _i++) {
                var orderBy = _a[_i];
                var stringOrder = "";
                if ("@id" in orderBy) {
                    var id = orderBy["@id"];
                    var descending = false;
                    if (id.startsWith("-")) {
                        descending = true;
                        id = id.substr(1);
                    }
                    if (!!digestedSchema && URI.Util.isRelative(id))
                        id = ObjectSchema.Util.resolveURI(id, digestedSchema);
                    stringOrder += (descending ? "-" : "") + "<" + encodeURI(id).replace("#", "%23") + ">";
                }
                if ("@type" in orderBy) {
                    if (!stringOrder)
                        throw new IllegalArgumentError_1.default("The @id property is missing in OrderBy property.");
                    var type = orderBy["@type"];
                    if (allowedTypes.indexOf(type) === -1)
                        throw new IllegalArgumentError_1.default("The @type value specified is not valid.");
                    if (type !== "numeric")
                        type = "<" + encodeURI(XSD.DataType[type]).replace("#", "%23") + ">";
                    stringOrder += ";" + type;
                }
                if ("@language" in orderBy) {
                    if (!stringOrder)
                        throw new IllegalArgumentError_1.default("The @id property is missing in OrderBy property.");
                    stringOrder += ";" + orderBy["@language"];
                }
                stringOrders.push(stringOrder);
            }
            stringPreferences += stringOrders.join(",");
        }
        return stringPreferences ? "?" + stringPreferences : stringPreferences;
    };
    return Util;
}());
exports.Util = Util;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NS = __webpack_require__(1);
var PersistedDocument = __webpack_require__(23);
var Utils = __webpack_require__(0);
exports.RDF_CLASS = NS.C.Class.RDFRepresentation;
exports.SCHEMA = {
    "mediaType": {
        "@id": NS.C.Predicate.mediaType,
        "@type": NS.XSD.DataType.string,
    },
    "size": {
        "@id": NS.C.Predicate.size,
        "@type": NS.XSD.DataType.long,
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "mediaType")
            && Utils.hasPropertyDefined(object, "size");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && PersistedDocument.Factory.is(object)
            && object.hasType(exports.RDF_CLASS);
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NS = __webpack_require__(1);
exports.RDF_CLASS = NS.C.Class.Platform;
exports.SCHEMA = {
    "version": {
        "@id": NS.C.Predicate.version,
        "@type": NS.XSD.DataType.string,
    },
    "buildDate": {
        "@id": NS.C.Predicate.buildDate,
        "@type": NS.XSD.DataType.dateTime,
    },
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NS = __webpack_require__(1);
exports.RDF_CLASS = NS.C.Class.Instance;
exports.SCHEMA = {
    "name": {
        "@id": NS.CS.Predicate.namae,
        "@type": NS.XSD.DataType.string,
    },
    "description": {
        "@id": NS.CS.Predicate.description,
        "@type": NS.XSD.DataType.string,
    },
    "allowsOrigins": {
        "@id": NS.CS.Predicate.allowsOrigin,
        "@container": "@set",
    },
};


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NS = __webpack_require__(1);
exports.RDF_CLASS = NS.SHACL.Class.ValidationReport;
exports.SCHEMA = {
    "conforms": {
        "@id": NS.SHACL.Predicate.conforms,
        "@type": NS.XSD.DataType.boolean,
    },
    "results": {
        "@id": NS.SHACL.Predicate.result,
        "@type": "@id",
        "@container": "@set",
    },
    "shapesGraphWellFormed": {
        "@id": NS.SHACL.Predicate.shapesGraphWellFormed,
        "@type": NS.XSD.DataType.boolean,
    },
};


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NS = __webpack_require__(1);
exports.RDF_CLASS = NS.SHACL.Class.ValidationResult;
exports.SCHEMA = {
    "focusNode": {
        "@id": NS.SHACL.Predicate.focusNode,
        "@type": "@id",
    },
    "resultPath": {
        "@id": NS.SHACL.Predicate.resultPath,
        "@type": "@id",
    },
    "value": {
        "@id": NS.SHACL.Predicate.value,
    },
    "sourceShape": {
        "@id": NS.SHACL.Predicate.sourceShape,
        "@type": "@id",
    },
    "sourceConstraintComponent": {
        "@id": NS.SHACL.Predicate.sourceConstraintComponent,
        "@type": "@id",
    },
    "detail": {
        "@id": NS.SHACL.Predicate.detail,
        "@type": "@id",
    },
    "resultMessage": {
        "@id": NS.SHACL.Predicate.resultMessage,
        "@type": NS.XSD.DataType.string,
    },
    "resultSeverity": {
        "@id": NS.SHACL.Predicate.resultSeverity,
        "@type": "@id",
    },
};


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Auth = __webpack_require__(19);
exports.defaultSettings = {
    "auth.method": Auth.Method.TOKEN,
    "system.container": ".system/",
    "system.platform.metadata": "platform/",
    "system.instance.metadata": "instance/",
    "system.users.container": "users/",
    "system.credentials.container": "credentials/",
    "system.roles.container": "roles/",
    "vocabulary": "vocabulary/#",
};
exports.default = exports.defaultSettings;


/***/ })
/******/ ]);
});