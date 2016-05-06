"use strict";
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var Auth = require("./Auth");
var settings = require("./settings");
var settings_1 = require("./settings");
describe(JasmineExtender_1.module("Carbon/settings"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(settings).toBeDefined();
        expect(Utils.isObject(settings)).toBe(true);
    });
    it(JasmineExtender_1.hasDefaultExport("Carbon.settings", "\n\t\tA object of type `Carbon.settings.CarbonSettings`, whitch is the default settings of a Carbon instance:\n\t\t* domain: `\"carbonldp.com\"`\n\t\t* http.ssl: `true`\n\t\t* auth.method: `Carbon.Auth.Method.TOKEN`\n\t\t* platform.container: `\"platform/\"`\n\t\t* platform.apps.container: `\"apps/\"`\n\t\t* platform.agents.container: `\"agents/\"`\n\t\t"), function () {
        expect(settings_1.default).toBeDefined();
        expect(Utils.isObject(settings_1.default)).toBe(true);
        expect(settings_1.default["domain"]).toBeDefined();
        expect(settings_1.default["domain"]).toBe("carbonldp.com");
        expect(settings_1.default["http.ssl"]).toBeDefined();
        expect(settings_1.default["http.ssl"]).toBe(true);
        expect(settings_1.default["auth.method"]).toBeDefined();
        expect(settings_1.default["auth.method"]).toBe(Auth.Method.TOKEN);
        expect(settings_1.default["platform.container"]).toBeDefined();
        expect(settings_1.default["platform.container"]).toBe("platform/");
        expect(settings_1.default["platform.apps.container"]).toBeDefined();
        expect(settings_1.default["platform.apps.container"]).toBe("apps/");
        expect(settings_1.default["platform.agents.container"]).toBeDefined();
        expect(settings_1.default["platform.agents.container"]).toBe("agents/");
    });
});
