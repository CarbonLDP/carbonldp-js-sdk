"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
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
    var aclPromise = this.isResolved() ?
        Promise.resolve(this.accessControlList) :
        this.executeSELECTQuery("SELECT ?acl WHERE {<" + this.id + "> <" + CS_1.CS.accessControlList + "> ?acl}")
            .then(function (results) { return results.bindings[0].acl; });
    return aclPromise.then(function (acl) {
        return _this._documents.get(acl.id, requestOptions);
    });
}

//# sourceMappingURL=PersistedProtectedDocument.js.map
