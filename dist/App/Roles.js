"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Context_1 = require("./Context");
var AppRole = require("./Role");
var Errors = require("./../Errors");
var PersistedAppRole = require("./PersistedRole");
var Roles_1 = require("./../Auth/Roles");
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(appContext) {
        if (!(appContext instanceof Context_1.default))
            throw new Errors.NotImplementedError("The context provided is not a AppContext.");
        _super.call(this, appContext);
    }
    Class.prototype.createChild = function (parentRole, role, slugOrRequestOptions, requestOptions) {
        if (!AppRole.Factory.is(role))
            return Promise.reject(new Errors.IllegalArgumentError("The role is not a valid `Carbon.App.Role.Class` object."));
        return _super.prototype.createChild.call(this, parentRole, role, slugOrRequestOptions, requestOptions);
    };
    Class.prototype.get = function (roleURI, requestOptions) {
        return _super.prototype.get.call(this, roleURI, requestOptions).then(function (_a) {
            var role = _a[0], response = _a[1];
            if (!PersistedAppRole.Factory.is(role))
                throw new Errors.IllegalArgumentError("The resource fetched is not a cs:AppRole");
            return [role, response];
        });
    };
    return Class;
}(Roles_1.default));
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=Roles.js.map
