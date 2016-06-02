"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Errors = require("./../Errors");
var NS = require("./../NS");
var Role = require("./../Auth/Role");
var Utils = require("./../Utils");
var AppRole = require("./Role");
describe(JasmineExtender_1.module("Carbon/Apps/Role"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(AppRole).toBeDefined();
        expect(Utils.isObject(AppRole)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "RDF_CLASS", "string"), function () {
        expect(AppRole.RDF_CLASS).toBeDefined();
        expect(Utils.isString(AppRole.RDF_CLASS)).toBe(true);
        expect(AppRole.RDF_CLASS).toBe(NS.CS.Class.AppRole);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "SCHEMA", "Carbon.ObjectSchema.Class"), function () {
        expect(AppRole.SCHEMA).toBeDefined();
        expect(Utils.isObject(AppRole.SCHEMA)).toBe(true);
        expect(Utils.hasProperty(AppRole.SCHEMA, "parentRole")).toBe(true);
        expect(AppRole.SCHEMA["parentRole"]).toEqual({
            "@id": NS.CS.Predicate.parentRole,
            "@type": "@id",
        });
        expect(Utils.hasProperty(AppRole.SCHEMA, "childRoles")).toBe(true);
        expect(AppRole.SCHEMA["childRoles"]).toEqual({
            "@id": NS.CS.Predicate.childRole,
            "@type": "@id",
            "@container": "@set",
        });
        expect(Utils.hasProperty(AppRole.SCHEMA, "agents")).toBe(true);
        expect(AppRole.SCHEMA["agents"]).toEqual({
            "@id": NS.CS.Predicate.agent,
            "@type": "@id",
            "@container": "@set",
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.App.Role.Factory", "Factory class for `Carbon.App.Role.Class` objects"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(AppRole.Factory).toBeDefined();
            expect(Utils.isFunction(AppRole.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasClassProperties", "Returns true if the object provided has the properties that defines a `Carbon.App.Role.Class` object", [
            { name: "resource", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(AppRole.Factory.hasClassProperties).toBeDefined();
            expect(Utils.isFunction(AppRole.Factory.hasClassProperties)).toBe(true);
            var object;
            expect(AppRole.Factory.hasClassProperties(object)).toBe(false);
            object = {
                parentRole: null,
                childRoles: null,
                agents: null,
            };
            expect(AppRole.Factory.hasClassProperties(object)).toBe(true);
            delete object.parentRole;
            expect(AppRole.Factory.hasClassProperties(object)).toBe(false);
            object.parentRole = null;
            delete object.childRoles;
            expect(AppRole.Factory.hasClassProperties(object)).toBe(false);
            object.childRoles = null;
            delete object.agents;
            expect(AppRole.Factory.hasClassProperties(object)).toBe(false);
            object.agents = null;
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "is", "Returns true if the object provided is considered a `Carbon.App.Role.Class` object", [
            { name: "object", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(AppRole.Factory.is).toBeDefined();
            expect(Utils.isFunction(AppRole.Factory.is)).toBe(true);
            var object;
            object = {};
            expect(AppRole.Factory.is(object)).toBe(false);
            object = {
                name: null,
                parentRole: null,
                childRoles: null,
                agents: null,
            };
            expect(AppRole.Factory.is(object)).toBe(false);
            object.types = [NS.CS.Class.AppRole];
            expect(AppRole.Factory.is(object)).toBe(false);
            object = Role.Factory.create("Role name");
            expect(AppRole.Factory.is(object)).toBe(false);
            object.types.push(NS.CS.Class.AppRole);
            expect(AppRole.Factory.is(object)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "create", "Create a `Carbon.App.Role.Class` object with the name and email specified.", [
            { name: "name", type: "string" },
            { name: "email", type: "string" }
        ], { type: "Carbon.App.Role.Class" }), function () {
            expect(AppRole.Factory.create).toBeDefined();
            expect(Utils.isFunction(AppRole.Factory.create)).toBe(true);
            var spy = spyOn(AppRole.Factory, "createFrom");
            AppRole.Factory.create("Role name");
            expect(spy).toHaveBeenCalledWith({}, "Role name");
            AppRole.Factory.create("Another Role name");
            expect(spy).toHaveBeenCalledWith({}, "Another Role name");
            AppRole.Factory.create("");
            expect(spy).toHaveBeenCalledWith({}, "");
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "createFrom", "Create a `Carbon.App.Role.Class` object with the object provided.", [
            { name: "object", type: "T extends Object" }
        ], { type: "T & Carbon.App.Role.Class" }), function () {
            expect(AppRole.Factory.createFrom).toBeDefined();
            expect(Utils.isFunction(AppRole.Factory.createFrom)).toBe(true);
            var role;
            role = AppRole.Factory.createFrom({}, "Role name");
            expect(AppRole.Factory.is(role)).toBe(true);
            expect(role.myProperty).toBeUndefined();
            expect(role.name).toBe("Role name");
            expect(role.types).toContain(NS.CS.Class.AppRole);
            role = AppRole.Factory.createFrom({ myProperty: "a property" }, "Role name");
            expect(AppRole.Factory.is(role)).toBe(true);
            expect(role.myProperty).toBeDefined();
            expect(role.myProperty).toBe("a property");
            expect(role.name).toBe("Role name");
            expect(role.types).toContain(NS.CS.Class.AppRole);
            expect(function () { return AppRole.Factory.createFrom({}, ""); }).toThrowError(Errors.IllegalArgumentError);
            expect(function () { return AppRole.Factory.createFrom({}, null); }).toThrowError(Errors.IllegalArgumentError);
            expect(function () { return AppRole.Factory.createFrom({}, undefined); }).toThrowError(Errors.IllegalArgumentError);
        });
    });
});

//# sourceMappingURL=PersistedRole.sspec.js.map
