"use strict";
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var AddMemberAction = require("./LDP/AddMemberAction");
var BasicContainer = require("./LDP/BasicContainer");
var Container = require("./LDP/Container");
var DirectContainer = require("./LDP/DirectContainer");
var IndirectContainer = require("./LDP/IndirectContainer");
var PersistedContainer = require("./LDP/PersistedContainer");
var RDFSource = require("./LDP/RDFSource");
var RemoveMemberAction = require("./LDP/RemoveMemberAction");
var ResponseDescription = require("./LDP/ResponseDescription");
var ResponseMetaData = require("./LDP/ResponseMetaData");
var LDP = require("./LDP");
describe(JasmineExtender_1.module("Carbon/LDP"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(LDP).toBeDefined();
        expect(Utils.isObject(LDP)).toBe(true);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "AddMemberAction", "Carbon/LDP/AddMemberAction"), function () {
        expect(LDP.AddMemberAction).toBeDefined();
        expect(LDP.AddMemberAction).toBe(AddMemberAction);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "BasicContainer", "Carbon/LDP/BasicContainer"), function () {
        expect(LDP.BasicContainer).toBeDefined();
        expect(LDP.BasicContainer).toBe(BasicContainer);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Container", "Carbon/LDP/Container"), function () {
        expect(LDP.Container).toBeDefined();
        expect(LDP.Container).toBe(Container);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "DirectContainer", "Carbon/LDP/DirectContainer"), function () {
        expect(LDP.DirectContainer).toBeDefined();
        expect(LDP.DirectContainer).toBe(DirectContainer);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "IndirectContainer", "Carbon/LDP/IndirectContainer"), function () {
        expect(LDP.IndirectContainer).toBeDefined();
        expect(LDP.IndirectContainer).toBe(IndirectContainer);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "PersistedContainer", "Carbon/LDP/PersistedContainer"), function () {
        expect(LDP.PersistedContainer).toBeDefined();
        expect(LDP.PersistedContainer).toBe(PersistedContainer);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "RDFSource", "Carbon/LDP/RDFSource"), function () {
        expect(LDP.RDFSource).toBeDefined();
        expect(LDP.RDFSource).toBe(RDFSource);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "RemoveMemberAction", "Carbon/LDP/RemoveMemberAction"), function () {
        expect(LDP.RemoveMemberAction).toBeDefined();
        expect(LDP.RemoveMemberAction).toBe(RemoveMemberAction);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "ResponseDescription", "Carbon/LDP/ResponseDescription"), function () {
        expect(LDP.ResponseDescription).toBeDefined();
        expect(LDP.ResponseDescription).toBe(ResponseDescription);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "ResponseMetaData", "Carbon/LDP/ResponseMetaData"), function () {
        expect(LDP.ResponseMetaData).toBeDefined();
        expect(LDP.ResponseMetaData).toBe(ResponseMetaData);
    });
});
