"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var Errors = __importStar(require("../Errors"));
var Request_1 = require("../HTTP/Request");
var URI_1 = require("../RDF/URI");
var PersistedRole = __importStar(require("./PersistedRole"));
var Class = (function () {
    function Class(context) {
        this.context = context;
    }
    Class.prototype.createChild = function (parentRole, role, slugOrRequestOptions, requestOptions) {
        var _this = this;
        var slug = Utils_1.isString(slugOrRequestOptions) ? slugOrRequestOptions : void 0;
        requestOptions = Request_1.RequestUtils.isOptions(slugOrRequestOptions) ? slugOrRequestOptions : requestOptions;
        var parentURI = Utils_1.isString(parentRole) ? parentRole : parentRole.id;
        return Utils_1.promiseMethod(function () {
            parentURI = _this.resolveURI(parentURI);
            return _this.context
                .documents
                .exists(parentURI);
        }).then(function (exists) {
            if (!exists)
                throw new Errors.IllegalArgumentError("The parent role \"" + parentURI + "\" doesn't exists.");
            var container = _this.resolveURI();
            return _this.context
                .documents
                .createChild(container, role, slug, requestOptions);
        }).then(function (document) {
            return _this.context
                .documents
                .addMember(parentURI, document);
        }).then(function () {
            return PersistedRole.Factory.decorate(role, _this.context.documents);
        });
    };
    Class.prototype.get = function (roleURI, queryBuilderFnOrOptions, queryBuilderFn) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var uri = _this.resolveURI(roleURI);
            return _this.context
                .documents
                .get(uri, queryBuilderFnOrOptions, queryBuilderFn);
        });
    };
    Class.prototype.getUsers = function (roleURI, queryBuilderFnOrOptions, queryBuilderFn) {
        var _this = this;
        return this
            .getUsersAccessPoint(roleURI)
            .then(function (accessPoint) {
            return _this
                .context
                .documents
                .getMembers(accessPoint.id, queryBuilderFnOrOptions, queryBuilderFn);
        });
    };
    Class.prototype.addUser = function (roleURI, user, requestOptions) {
        return this.addUsers(roleURI, [user], requestOptions);
    };
    Class.prototype.addUsers = function (roleURI, users, requestOptions) {
        var _this = this;
        return this
            .getUsersAccessPoint(roleURI)
            .then(function (accessPoint) {
            return _this
                .context
                .documents
                .addMembers(accessPoint.id, users, requestOptions);
        });
    };
    Class.prototype.removeUser = function (roleURI, user, requestOptions) {
        return this.removeUsers(roleURI, [user], requestOptions);
    };
    Class.prototype.removeUsers = function (roleURI, users, requestOptions) {
        var _this = this;
        return this
            .getUsersAccessPoint(roleURI)
            .then(function (accessPoint) {
            return _this
                .context
                .documents
                .removeMembers(accessPoint.id, users, requestOptions);
        });
    };
    Class.prototype.getUsersAccessPoint = function (roleURI) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var uri = _this.resolveURI(roleURI);
            return _this.context
                .documents
                .executeSELECTQuery(uri, "PREFIX:<https://carbonldp.com/ns/v1/>SELECT DISTINCT?accessPoint{<" + uri + ">:platform#accessPoint?accessPoint.?accessPoint<http://www.w3.org/ns/ldp#hasMemberRelation>:security#user}");
        }).then(function (_a) {
            var selectResults = _a[0];
            return selectResults.bindings[0].accessPoint;
        });
    };
    Class.prototype.resolveURI = function (relativeURI) {
        var containerURI = this.context._resolvePath("system.security.roles");
        if (!relativeURI)
            return containerURI;
        var absoluteURI = URI_1.URI.Util.resolve(containerURI, relativeURI);
        if (!absoluteURI.startsWith(containerURI))
            throw new Errors.IllegalArgumentError("The URI \"" + relativeURI + "\" isn't a valid role URI.");
        return absoluteURI;
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=Roles.js.map
