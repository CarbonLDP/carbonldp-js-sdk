"use strict";
var Agent = require("./Agent");
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var NS = require("./NS");
var Errors = require("./Errors");
var Document = require("./Document");
describe(JasmineExtender_1.module("Carbon/Agent"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(Agent).toBeDefined();
        expect(Utils.isObject(Agent)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "RDF_CLASS", "string"), function () {
        expect(Agent.RDF_CLASS).toBeDefined();
        expect(Utils.isString(Agent.RDF_CLASS)).toBe(true);
        expect(Agent.RDF_CLASS).toBe(NS.CS.Class.Agent);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "SCHEMA", "Carbon.ObjectSchema.Class"), function () {
        expect(Agent.SCHEMA).toBeDefined();
        expect(Utils.isObject(Agent.SCHEMA)).toBe(true);
        expect(Utils.hasProperty(Agent.SCHEMA, "name")).toBe(true);
        expect(Agent.SCHEMA["name"]).toEqual({
            "@id": NS.CS.Predicate.name,
            "@type": NS.XSD.DataType.string
        });
        expect(Utils.hasProperty(Agent.SCHEMA, "email")).toBe(true);
        expect(Agent.SCHEMA["email"]).toEqual({
            "@id": NS.VCARD.Predicate.email,
            "@type": NS.XSD.DataType.string
        });
        expect(Utils.hasProperty(Agent.SCHEMA, "password")).toBe(true);
        expect(Agent.SCHEMA["password"]).toEqual({
            "@id": NS.CS.Predicate.password,
            "@type": NS.XSD.DataType.string
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.Agent.Factory", "Factory class for `Carbon.Agent.Class` objects"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(Agent.Factory).toBeDefined();
            expect(Utils.isFunction(Agent.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasClassProperties", "Returns true if the object provided has the properties that defines a `Carbon.Agent.Class` object", [
            { name: "resource", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(Agent.Factory.hasClassProperties).toBeDefined();
            expect(Utils.isFunction(Agent.Factory.hasClassProperties)).toBe(true);
            var object = {};
            expect(Agent.Factory.hasClassProperties(object)).toBe(false);
            object.name = "Agent name";
            expect(Agent.Factory.hasClassProperties(object)).toBe(false);
            object.email = "email.of.agent@example.com";
            expect(Agent.Factory.hasClassProperties(object)).toBe(true);
            object.password = "myAwesomePassword";
            expect(Agent.Factory.hasClassProperties(object)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "is", "Returns true if the object provided is considered as an `Carbon.Agent.Class` object", [
            { name: "object", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(Agent.Factory.is).toBeDefined();
            expect(Utils.isFunction(Agent.Factory.is)).toBe(true);
            var object;
            object = {};
            expect(Agent.Factory.is(object)).toBe(false);
            object.name = "Agent name";
            expect(Agent.Factory.is(object)).toBe(false);
            object.email = "email.of.agent@example.com";
            expect(Agent.Factory.is(object)).toBe(false);
            object.password = "myAwesomePassword";
            expect(Agent.Factory.is(object)).toBe(false);
            object = Document.Factory.create();
            expect(Agent.Factory.is(object)).toBe(false);
            object.name = "Agent name";
            expect(Agent.Factory.is(object)).toBe(false);
            object.email = "email.of.agent@example.com";
            expect(Agent.Factory.is(object)).toBe(false);
            object.password = "myAwesomePassword";
            expect(Agent.Factory.is(object)).toBe(false);
            object.types.push(NS.CS.Class.Agent);
            expect(Agent.Factory.is(object)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "create", "Create a `Carbon.Agent.Class` object with the name and email specified.", [
            { name: "name", type: "string" },
            { name: "email", type: "string" }
        ], { type: "Carbon.Agent.Class" }), function () {
            expect(Agent.Factory.create).toBeDefined();
            expect(Utils.isFunction(Agent.Factory.create)).toBe(true);
            var spy = spyOn(Agent.Factory, "createFrom");
            Agent.Factory.create("Agent name", "email.of.agent@example.com", "myAwesomePassword");
            expect(spy).toHaveBeenCalledWith({}, "Agent name", "email.of.agent@example.com", "myAwesomePassword");
            Agent.Factory.create("Another Agent name", "another.email.of.agent@example.com", "myAwesomePassword");
            expect(spy).toHaveBeenCalledWith({}, "Another Agent name", "another.email.of.agent@example.com", "myAwesomePassword");
            Agent.Factory.create("", "", "");
            expect(spy).toHaveBeenCalledWith({}, "", "", "");
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "createFrom", "Create a `Carbon.Agent.Class` object with the object provided.", [
            { name: "object", type: "T extends Object" }
        ], { type: "T & Carbon.Agent.Class" }), function () {
            expect(Agent.Factory.createFrom).toBeDefined();
            expect(Utils.isFunction(Agent.Factory.createFrom)).toBe(true);
            var agent;
            agent = Agent.Factory.createFrom({}, "Agent name", "email.of.agent@example.com", "myAwesomePassword");
            expect(Agent.Factory.is(agent)).toBe(true);
            expect(agent.myProperty).toBeUndefined();
            expect(agent.name).toBe("Agent name");
            expect(agent.email).toBe("email.of.agent@example.com");
            expect(agent.password).toBe("myAwesomePassword");
            expect(agent.types).toContain(NS.CS.Class.Agent);
            agent = Agent.Factory.createFrom({ myProperty: "a property" }, "Agent name", "email.of.agent@example.com", "myAwesomePassword");
            expect(Agent.Factory.is(agent)).toBe(true);
            expect(agent.myProperty).toBeDefined();
            expect(agent.myProperty).toBe("a property");
            expect(agent.name).toBe("Agent name");
            expect(agent.email).toBe("email.of.agent@example.com");
            expect(agent.password).toBe("myAwesomePassword");
            expect(agent.types).toContain(NS.CS.Class.Agent);
            expect(function () { return Agent.Factory.createFrom({}, "Agent name", "email.of.agent@example.com", ""); }).toThrowError(Errors.IllegalArgumentError);
            expect(function () { return Agent.Factory.createFrom({}, "Agent name", "", "myAwesomePassword"); }).toThrowError(Errors.IllegalArgumentError);
            expect(function () { return Agent.Factory.createFrom({}, "", "email.of.agent@example.com", "myAwesomePassword"); }).toThrowError(Errors.IllegalArgumentError);
            expect(function () { return Agent.Factory.createFrom({}, "", "", ""); }).toThrowError(Errors.IllegalArgumentError);
        });
    });
});
