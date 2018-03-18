"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var ACL_1 = require("./Auth/ACL");
var Errors_1 = require("./HTTP/Errors");
var PersistedDocument_1 = require("./PersistedDocument");
var Utils = __importStar(require("./Utils"));
var CS_1 = require("./Vocabularies/CS");
exports.PersistedProtectedDocument = {
    isDecorated: function (object) {
        return Utils.isObject(object)
            && Utils.hasFunction(object, "getACL");
    },
    is: function (object) {
        return exports.PersistedProtectedDocument.isDecorated(object)
            && PersistedDocument_1.PersistedDocument.is(object);
    },
    decorate: function (object, documents) {
        if (exports.PersistedProtectedDocument.isDecorated(object))
            return object;
        PersistedDocument_1.PersistedDocument.decorate(object, documents);
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
    var aclPromise;
    if (this.isResolved()) {
        aclPromise = Promise.resolve(this.accessControlList);
    }
    else {
        aclPromise = this.executeSELECTQuery("SELECT ?acl WHERE {\n\t\t\t<" + this.id + "> <" + CS_1.CS.accessControlList + "> ?acl.\n\t\t}").then(function (_a) {
            var results = _a[0];
            return results.bindings[0].acl;
        });
    }
    return aclPromise.then(function (acl) {
        return _this._documents.get(acl.id, requestOptions);
    }).then(function (_a) {
        var acl = _a[0], response = _a[1];
        if (!acl.hasType(ACL_1.ACL.TYPE))
            throw new Errors_1.BadResponseError("The response does not contains a " + ACL_1.ACL.TYPE + " object.", response);
        return [acl, response];
    });
}
exports.default = exports.PersistedProtectedDocument;

//# sourceMappingURL=PersistedProtectedDocument.js.map
