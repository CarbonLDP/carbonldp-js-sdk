"use strict";
var Utils = require("./Utils");
var JasmineExtender_1 = require("./test/JasmineExtender");
describe(JasmineExtender_1.module("Carbon/Utils", "The description of Carbon/Utils"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(Utils).toBeDefined();
        expect(Utils).not.toBeNull();
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasFunction", "Checks if the object has a property with that name and if it that property is a function.", [
        { name: "object", type: "object" },
        { name: "name", type: "string" },
    ], { type: "boolean" }), function () {
        expect(Utils.hasFunction).toBeDefined();
        var myObject = {};
        expect(Utils.hasFunction(myObject, "hasOwnProperty")).toBe(true);
        expect(Utils.hasFunction(myObject, "doSomething")).toBe(false);
        myObject.doSomething = function () { };
        expect(Utils.hasFunction(myObject, "doSomething")).toBe(true);
        myObject.something = "something";
        expect(Utils.hasFunction(myObject, "something")).toBe(false);
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasProperty", "Checks if the object has a property with that name.", [
        { name: "object", type: "object" },
        { name: "name", type: "string" },
    ], { type: "boolean" }), function () {
        expect(Utils.hasProperty).toBeDefined();
        var postPrototype = {};
        var post = Object.create(postPrototype);
        expect(Utils.hasProperty(post, "ownProperty")).toBe(false);
        expect(Utils.hasProperty(post, "prototypeProperty")).toBe(false);
        post.ownProperty = "something";
        postPrototype.prototypeProperty = "something-else";
        expect(Utils.hasProperty(post, "ownProperty")).toBe(true);
        expect(Utils.hasProperty(post, "prototypeProperty")).toBe(true);
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasPropertyDefined", "Checks if an object has a property defined under that name (even if its value is undefined).", [
        { name: "object", type: "object" },
        { name: "name", type: "string" },
    ], { type: "boolean" }), function () {
        expect(Utils.hasPropertyDefined).toBeDefined();
        var postPrototype = {};
        var post = Object.create(postPrototype);
        expect(Utils.hasPropertyDefined(post, "protoOnlyDefined")).toBe(false);
        expect(Utils.hasPropertyDefined(post, "protoWithValue")).toBe(false);
        expect(Utils.hasPropertyDefined(post, "onlyDefined")).toBe(false);
        expect(Utils.hasPropertyDefined(post, "withValue")).toBe(false);
        Object.defineProperty(postPrototype, "protoOnlyDefined", {
            enumerable: false,
            writable: true,
        });
        postPrototype.protoWithValue = "something";
        Object.defineProperty(post, "onlyDefined", {
            enumerable: false,
            writable: true,
        });
        post.withValue = "something";
        expect(Utils.hasPropertyDefined(post, "protoOnlyDefined")).toBe(false);
        expect(Utils.hasPropertyDefined(post, "protoWithValue")).toBe(false);
        expect(Utils.hasPropertyDefined(post, "onlyDefined")).toBe(true);
        expect(Utils.hasPropertyDefined(post, "withValue")).toBe(true);
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "isDefined", "Checks if the value passed is defined.", [
        { name: "value", type: "any" },
    ], { type: "boolean" }), function () {
        expect(Utils.isDefined).toBeDefined();
        expect(Utils.isDefined(null)).toBe(true);
        expect(Utils.isDefined("something")).toBe(true);
        expect(Utils.isDefined(true)).toBe(true);
        expect(Utils.isDefined(false)).toBe(true);
        expect(Utils.isDefined(9)).toBe(true);
        expect(Utils.isDefined({})).toBe(true);
        expect(Utils.isDefined([])).toBe(true);
        var somethingUndefined;
        expect(Utils.isDefined(undefined)).toBe(false);
        expect(Utils.isDefined(somethingUndefined)).toBe(false);
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "isNull", "Checks if the value passed is null.", [
        { name: "value", type: "any" },
    ], { type: "boolean" }), function () {
        expect(Utils.isNull).toBeDefined();
        expect(Utils.isNull(null)).toBe(true);
        expect(Utils.isNull("something")).toBe(false);
        expect(Utils.isNull(true)).toBe(false);
        expect(Utils.isNull(false)).toBe(false);
        expect(Utils.isNull(9)).toBe(false);
        expect(Utils.isNull({})).toBe(false);
        expect(Utils.isNull([])).toBe(false);
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "isArray", "Checks if the value passed is an array.", [
        { name: "value", type: "any" },
    ], { type: "boolean" }), function () {
        expect(Utils.isArray).toBeDefined();
        expect(Utils.isArray(null)).toBe(false);
        expect(Utils.isArray("something")).toBe(false);
        expect(Utils.isArray(true)).toBe(false);
        expect(Utils.isArray(false)).toBe(false);
        expect(Utils.isArray(9)).toBe(false);
        expect(Utils.isArray({})).toBe(false);
        expect(Utils.isArray([])).toBe(true);
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "isString", "Checks if the value passed is a string.", [
        { name: "value", type: "any" },
    ], { type: "boolean" }), function () {
        expect(Utils.isString).toBeDefined();
        expect(Utils.isString(null)).toBe(false);
        expect(Utils.isString("something")).toBe(true);
        expect(Utils.isString(true)).toBe(false);
        expect(Utils.isString(false)).toBe(false);
        expect(Utils.isString(9)).toBe(false);
        expect(Utils.isString({})).toBe(false);
        expect(Utils.isString([])).toBe(false);
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "isBoolean", "Checks if the value passed is a boolean.", [
        { name: "value", type: "any" },
    ], { type: "boolean" }), function () {
        expect(Utils.isBoolean).toBeDefined();
        expect(Utils.isBoolean(null)).toBe(false);
        expect(Utils.isBoolean("something")).toBe(false);
        expect(Utils.isBoolean(true)).toBe(true);
        expect(Utils.isBoolean(false)).toBe(true);
        expect(Utils.isBoolean(9)).toBe(false);
        expect(Utils.isBoolean({})).toBe(false);
        expect(Utils.isBoolean([])).toBe(false);
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "isNumber", "Checks if the value passed is a number", [
        { name: "value", type: "any" },
    ], { type: "boolean" }), function () {
        expect(Utils.isNumber).toBeDefined();
        expect(Utils.isNumber(null)).toBe(false);
        expect(Utils.isNumber("something")).toBe(false);
        expect(Utils.isNumber(true)).toBe(false);
        expect(Utils.isNumber(false)).toBe(false);
        expect(Utils.isNumber(9)).toBe(true);
        expect(Utils.isNumber(9.9)).toBe(true);
        expect(Utils.isNumber(0.1)).toBe(true);
        expect(Utils.isNumber(-1)).toBe(true);
        expect(Utils.isNumber({})).toBe(false);
        expect(Utils.isNumber([])).toBe(false);
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "isInteger", "Checks if the value passed is an integer.", [
        { name: "value", type: "any" },
    ], { type: "boolean" }), function () {
        expect(Utils.isInteger).toBeDefined();
        expect(Utils.isInteger(null)).toBe(false);
        expect(Utils.isInteger("something")).toBe(false);
        expect(Utils.isInteger(true)).toBe(false);
        expect(Utils.isInteger(false)).toBe(false);
        expect(Utils.isInteger(9)).toBe(true);
        expect(Utils.isInteger(9.9)).toBe(false);
        expect(Utils.isInteger(0.1)).toBe(false);
        expect(Utils.isInteger(-1)).toBe(true);
        expect(Utils.isInteger({})).toBe(false);
        expect(Utils.isInteger([])).toBe(false);
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "isDouble", "Checks if the value passed is a double.", [
        { name: "value", type: "any" },
    ], { type: "boolean" }), function () {
        expect(Utils.isNumber).toBeDefined();
        expect(Utils.isNumber(null)).toBe(false);
        expect(Utils.isNumber("something")).toBe(false);
        expect(Utils.isNumber(true)).toBe(false);
        expect(Utils.isNumber(false)).toBe(false);
        expect(Utils.isNumber(9)).toBe(true);
        expect(Utils.isNumber(9.9)).toBe(true);
        expect(Utils.isNumber(0.1)).toBe(true);
        expect(Utils.isNumber(-1)).toBe(true);
        expect(Utils.isNumber({})).toBe(false);
        expect(Utils.isNumber([])).toBe(false);
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "isDate", "Checks if the value passed is a Date object.", [
        { name: "value", type: "any" },
    ], { type: "boolean" }), function () {
        expect(Utils.isDate).toBeDefined();
        expect(Utils.isDate(null)).toBe(false);
        expect(Utils.isDate("something")).toBe(false);
        expect(Utils.isDate(true)).toBe(false);
        expect(Utils.isDate(false)).toBe(false);
        expect(Utils.isDate(9)).toBe(false);
        expect(Utils.isDate({})).toBe(false);
        expect(Utils.isDate([])).toBe(false);
        expect(Utils.isDate(new Date())).toBe(true);
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "isObject", "Checks if the value passed is an object (doesn\"t include null).", [
        { name: "value", type: "any" },
    ], { type: "boolean" }), function () {
        expect(Utils.isObject).toBeDefined();
        expect(Utils.isObject(null)).toBe(false);
        expect(Utils.isObject("something")).toBe(false);
        expect(Utils.isObject(true)).toBe(false);
        expect(Utils.isObject(false)).toBe(false);
        expect(Utils.isObject(9)).toBe(false);
        expect(Utils.isObject({})).toBe(true);
        expect(Utils.isObject([])).toBe(true);
        expect(Utils.isObject(new Date())).toBe(true);
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "isFunction", "Checks if the value passed is a function.", [
        { name: "value", type: "any" },
    ], { type: "boolean" }), function () {
        expect(Utils.isFunction).toBeDefined();
        expect(Utils.isFunction(null)).toBe(false);
        expect(Utils.isFunction("something")).toBe(false);
        expect(Utils.isFunction(true)).toBe(false);
        expect(Utils.isFunction(false)).toBe(false);
        expect(Utils.isFunction(9)).toBe(false);
        expect(Utils.isFunction({})).toBe(false);
        expect(Utils.isFunction([])).toBe(false);
        expect(Utils.isFunction(new Date())).toBe(false);
        expect(Utils.isFunction(function () { })).toBe(true);
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "isMap", "Checks if the value passed is an ES6 Map.", [
        { name: "value", type: "any" },
    ], { type: "boolean" }), function () {
        expect(Utils.isMap).toBeDefined();
        expect(Utils.isMap(null)).toBe(false);
        expect(Utils.isMap("something")).toBe(false);
        expect(Utils.isMap(true)).toBe(false);
        expect(Utils.isMap(false)).toBe(false);
        expect(Utils.isMap(9)).toBe(false);
        expect(Utils.isMap({})).toBe(false);
        expect(Utils.isMap([])).toBe(false);
        expect(Utils.isMap(new Date())).toBe(false);
        expect(Utils.isMap(function () { })).toBe(false);
        expect(Utils.isMap(new Map())).toBe(true);
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "parseBoolean", "Parses a string into a boolean.", [
        { name: "value", type: "string" },
    ], { type: "boolean" }), function () {
        expect(Utils.parseBoolean).toBeDefined();
        expect(Utils.parseBoolean("true")).toBe(true);
        expect(Utils.parseBoolean("yes")).toBe(true);
        expect(Utils.parseBoolean("y")).toBe(true);
        expect(Utils.parseBoolean("1")).toBe(true);
        expect(Utils.parseBoolean("false")).toBe(false);
        expect(Utils.parseBoolean("no")).toBe(false);
        expect(Utils.parseBoolean("n")).toBe(false);
        expect(Utils.parseBoolean("0")).toBe(false);
        expect(Utils.parseBoolean("an invalid string")).toBe(false);
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "extend", "", []), function () {
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "forEachOwnProperty", "Executes an action for each own property of the object.", [
        { name: "object", type: "object" },
        { name: "action", type: "function", description: "action( name, value )" },
    ]), function () {
        expect(Utils.forEachOwnProperty).toBeDefined();
        var postPrototype = {};
        var post = Object.create(postPrototype);
        postPrototype.prototypeProperty = "something";
        post.one = 1;
        post.two = 2;
        post.three = 3;
        var anotherPost = {};
        Utils.forEachOwnProperty(post, function (name, value) {
            anotherPost[name] = value;
        });
        expect(anotherPost.prototypeProperty).not.toBeDefined();
        expect(anotherPost.one).toBe(1);
        expect(anotherPost.two).toBe(2);
        expect(anotherPost.three).toBe(3);
    });
    describe(JasmineExtender_1.clazz("Carbon.Utils.O", "Utility functions related to strings."), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(Utils.O).toBeDefined();
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "areShallowlyEqual", "Checks if an object has the same enumerable properties with the same values as another object.", [
            { name: "object1", type: "object" },
            { name: "object2", type: "object" },
        ], { type: "boolean" }), function () {
            expect(Utils.O.areShallowlyEqual).toBeDefined();
            var sharedObject = {};
            expect(Utils.O.areShallowlyEqual(sharedObject, sharedObject)).toBe(true);
            expect(Utils.O.areShallowlyEqual({}, {})).toBe(true);
            expect(Utils.O.areShallowlyEqual({
                stringProperty: "something",
                numberProperty: 1,
                objectProperty: sharedObject,
                functionProperty: function () { },
            }, {
                stringProperty: "something",
                numberProperty: 1,
                objectProperty: sharedObject,
                functionProperty: function () { },
            })).toBe(true);
            expect(Utils.O.areShallowlyEqual({
                stringProperty: "something",
                numberProperty: 1,
                objectProperty: {},
            }, {
                stringProperty: "something",
                numberProperty: 1,
                objectProperty: {},
            })).toBe(false);
            expect(Utils.O.areShallowlyEqual({
                stringProperty: "something",
                numberProperty: 1,
            }, {
                stringProperty: "something",
                numberProperty: 1,
                objectProperty: sharedObject,
            })).toBe(false);
            expect(Utils.O.areShallowlyEqual({
                stringProperty: "something",
                numberProperty: 1,
                objectProperty: sharedObject,
            }, {
                stringProperty: "something",
                objectProperty: sharedObject,
            })).toBe(false);
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.Utils.S", "Utility functions related to strings."), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(Utils.S).toBeDefined();
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "startsWith", "Checks if a string starts with a substring.", [
            { name: "string", type: "string" },
            { name: "substring", type: "string" },
        ], { type: "boolean" }), function () {
            expect(Utils.S.startsWith).toBeDefined();
            expect(Utils.S.startsWith("hello", "he")).toBe(true);
            expect(Utils.S.startsWith("hello", "h")).toBe(true);
            expect(Utils.S.startsWith("hello", "hello")).toBe(true);
            expect(Utils.S.startsWith("536345", "53")).toBe(true);
            expect(Utils.S.startsWith("eeeee", "e")).toBe(true);
            expect(Utils.S.startsWith("hello", "lo")).toBe(false);
            expect(Utils.S.startsWith("hello", "llo")).toBe(false);
            expect(Utils.S.startsWith("hello", "el")).toBe(false);
            expect(Utils.S.startsWith("536345", "3")).toBe(false);
            expect(Utils.S.startsWith("eeeee", "f")).toBe(false);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "endsWith", "Checks if a string ends with a substring.", [
            { name: "string", type: "string" },
            { name: "substring", type: "string" },
        ], { type: "boolean" }), function () {
            expect(Utils.S.endsWith).toBeDefined();
            expect(Utils.S.endsWith("hello", "he")).toBe(false);
            expect(Utils.S.endsWith("hello", "h")).toBe(false);
            expect(Utils.S.endsWith("536345", "53")).toBe(false);
            expect(Utils.S.endsWith("eeeee", "f")).toBe(false);
            expect(Utils.S.endsWith("hello", "")).toBe(true);
            expect(Utils.S.endsWith("hello", "hello")).toBe(true);
            expect(Utils.S.endsWith("hello", "lo")).toBe(true);
            expect(Utils.S.endsWith("hello", "o")).toBe(true);
            expect(Utils.S.endsWith("536345", "5")).toBe(true);
            expect(Utils.S.endsWith("eeeee", "e")).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "contains", "Checks if a string contains a substring (in any part).", [
            { name: "string", type: "string" },
            { name: "substring", type: "string" },
        ], { type: "boolean" }), function () {
            expect(Utils.S.contains).toBeDefined();
            expect(Utils.S.contains("hello", "he")).toBe(true);
            expect(Utils.S.contains("hello", "ll")).toBe(true);
            expect(Utils.S.contains("hello", "lo")).toBe(true);
            expect(Utils.S.contains("536345", "53")).toBe(true);
            expect(Utils.S.contains("eeeee", "e")).toBe(true);
            expect(Utils.S.contains("hello", "hello")).toBe(true);
            expect(Utils.S.contains("hello", "")).toBe(true);
            expect(Utils.S.contains("hello", "er")).toBe(false);
            expect(Utils.S.contains("hello", "t")).toBe(false);
            expect(Utils.S.contains("hello", " ")).toBe(false);
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.Utils.A", "Utility functions related to Arrays"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(Utils.A).toBeDefined();
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "from", "Collects the values of an ES6 iterator and returns an array.", [
            { name: "iterator", type: "iterator" },
        ], { type: "array" }), function () {
            expect(Utils.A.from).toBeDefined();
            var iterator = {
                current: 0,
                values: [
                    "one", "two", "three", "four", "five"
                ],
                next: function () {
                    var value;
                    if (this.current < this.values.length) {
                        value = {
                            done: false,
                            value: this.values[this.current],
                        };
                        this.current++;
                    }
                    else {
                        value = {
                            done: true,
                            value: null,
                        };
                    }
                    return value;
                },
            };
            var array = Utils.A.from(iterator);
            expect(Utils.isArray(array)).toBe(true);
            expect(array.length).toBe(5);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "joinWithoutDuplicates", "Takes two or more arrays and joins them while removing duplicates", [
            { name: "array", type: "array" },
        ], { type: "array" }), function () {
            expect(Utils.A.joinWithoutDuplicates).toBeDefined();
            var array1 = [5, 3, 1];
            var array2 = [45, 3, 9];
            var array3 = [6, 4, 9];
            var result = Utils.A.joinWithoutDuplicates(array1, array2, array3);
            expect(Utils.isArray(result)).toBe(true);
            expect(result.length).toBe(7);
            expect(result.indexOf(5)).not.toBe(-1);
            expect(result.indexOf(3)).not.toBe(-1);
            expect(result.indexOf(1)).not.toBe(-1);
            expect(result.indexOf(45)).not.toBe(-1);
            expect(result.indexOf(9)).not.toBe(-1);
            expect(result.indexOf(6)).not.toBe(-1);
            expect(result.indexOf(4)).not.toBe(-1);
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.Utils.M", "Utility functions related to ES6 Maps."), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(Utils.M).toBeDefined();
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "from", "Takes an object and creates a map from its properties.", [
            { name: "object", type: "object" },
        ], { type: "map" }), function () {
            expect(Utils.M.from).toBeDefined();
            var post = {
                one: 1,
                two: 2,
                three: 3,
            };
            var result = Utils.M.from(post);
            expect(Utils.isMap(result)).toBe(true);
            expect(result.size).toBe(3);
            expect(result.get("one")).toBe(1);
            expect(result.get("two")).toBe(2);
            expect(result.get("three")).toBe(3);
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.Utils.UUID", "Utility functions related to UUIDs"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(Utils.UUID).toBeDefined();
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "is", "Returns true if the string provided is a UUID (version 1 to 5).", [
            { name: "uuid", type: "string" },
        ], { type: "string" }), function () {
            expect(Utils.UUID.is).toBeDefined();
            expect(Utils.UUID.is(null)).toEqual(false);
            expect(Utils.UUID.is("13123123123")).toEqual(false);
            expect(Utils.UUID.is("asdfasdfasdfasdfagawerq")).toEqual(false);
            expect(Utils.UUID.is("asdfasdfasdfasdfagawerq")).toEqual(false);
            expect(Utils.UUID.is("8cef9ec9-32b6-4beb-ba11-fb8a1d8f67cd")).toEqual(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "generate", "Generates a new, version 4, UUID.", { type: "string" }), function () {
            expect(Utils.UUID.generate).toBeDefined();
            var uuid = Utils.UUID.generate();
            expect(uuid).not.toBeNull();
        });
    });
});
