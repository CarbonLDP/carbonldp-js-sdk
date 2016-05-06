"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Token = require("./Token");
var Utils = require("./../Utils");
describe(JasmineExtender_1.module("Carbon/Auth/Token", ""), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(Token).toBeDefined();
        expect(Utils.isObject(Token)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.Auth.Token.Factory", ""), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(Token.Factory).toBeDefined();
            expect(Utils.isFunction(Token.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "is", "Duck tape tests if the value sent is a Token object", [
            { name: "value", type: "any" }
        ], { type: "boolean" }), function () {
            expect("is" in Token.Factory).toBe(true);
            expect(Utils.isFunction(Token.Factory.is)).toBe(true);
            expect(Token.Factory.is(false)).toBe(false);
            var object = {
                "key": {
                    "@id": "http://example.com/someID",
                    "@type": "xsd:string",
                },
                "expirationTime": {
                    "@id": "http://xmaple.com/anotherID",
                    "@type": "xsd:dateTime",
                },
            };
            expect(Token.Factory.hasClassProperties(object)).toBe(true);
            object["anotherProperty"] = {
                "@id": "http://example.com/anotherPropertyID",
                "@type": "xsd:integer"
            };
            expect(Token.Factory.hasClassProperties(object)).toBe(true);
            delete object["anotherProperty"];
            delete object["key"];
            expect(Token.Factory.hasClassProperties(object)).toBe(false);
            expect(Token.Factory.hasClassProperties({})).toBe(false);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasClassProperties", "Returns true if the object provided has the necessary information to be utilized as a object of type `Carbon.Auth.Token.Class`", [
            { name: "object", type: "Object" }
        ], { type: "boolean" }), function () {
            expect("hasClassProperties" in Token.Factory).toBe(true);
            expect(Utils.isFunction(Token.Factory.hasClassProperties)).toBe(true);
            var object = {
                "key": {
                    "@id": "http://example.com/someID",
                    "@type": "xsd:string",
                },
                "expirationTime": {
                    "@id": "http://xmaple.com/anotherID",
                    "@type": "xsd:dateTime",
                },
            };
            expect(Token.Factory.hasClassProperties(object)).toBe(true);
            object["anotherProperty"] = {
                "@id": "http://example.com/anotherPropertyID",
                "@type": "xsd:integer"
            };
            expect(Token.Factory.hasClassProperties(object)).toBe(true);
            delete object["anotherProperty"];
            delete object["key"];
            expect(Token.Factory.hasClassProperties(object)).toBe(false);
            expect(Token.Factory.hasClassProperties({})).toBe(false);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "decorate", "Adds any necessary data to the object provided to be utilized as a type `Carbon.Auth.Token.Class`", [
            { name: "object", type: "T extends Object" }
        ], { type: "Carbon.Auth.Token.Class" }), function () {
            expect("decorate" in Token.Factory).toBe(true);
            expect(Utils.isFunction(Token.Factory.decorate)).toBe(true);
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "hasRDFClass", "Description"), function () {
            it(JasmineExtender_1.hasSignature("Description", [
                { name: "pointer", type: "Carbon.Pointer.Class" }
            ], { type: "boolean" }), function () {
                expect("hasRDFClass" in Token.Factory).toBe(true);
                expect(Utils.isFunction(Token.Factory.hasRDFClass)).toBe(true);
            });
            it(JasmineExtender_1.hasSignature("Description", [
                { name: "expandedObject", type: "Object" }
            ], { type: "boolean" }), function () {
                expect("hasRDFClass" in Token.Factory).toBe(true);
                expect(Utils.isFunction(Token.Factory.hasRDFClass)).toBe(true);
            });
        });
    });
});
