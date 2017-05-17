"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTP = require("./HTTP");
var Auth = require("./Auth");
var NS = require("./NS");
var PersistedDocument = require("./PersistedDocument");
var Resource = require("./Resource");
var Utils = require("./Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.isObject(object)
            && Utils.hasFunction(object, "getACL");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && PersistedDocument.Factory.is(object);
    };
    Factory.decorate = function (document, documents) {
        var persistedProtectedDocument = document;
        if (Factory.hasClassProperties(document))
            return persistedProtectedDocument;
        PersistedDocument.Factory.decorate(document, documents);
        Object.defineProperties(persistedProtectedDocument, {
            "getACL": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: getACL,
            },
        });
        return persistedProtectedDocument;
    };
    return Factory;
}());
exports.Factory = Factory;
function getACL(requestOptions) {
    var protectedDocument = this;
    var aclPromise;
    if (protectedDocument.isResolved()) {
        aclPromise = Promise.resolve(protectedDocument.accessControlList);
    }
    else {
        aclPromise = protectedDocument.executeSELECTQuery("SELECT ?acl WHERE {\n\t\t\t<" + protectedDocument.id + "> <" + NS.CS.Predicate.accessControlList + "> ?acl.\n\t\t}").then(function (_a) {
            var results = _a[0], response = _a[1];
            return results.bindings[0]["acl"];
        });
    }
    return aclPromise.then(function (acl) {
        return protectedDocument._documents.get(acl.id, requestOptions);
    }).then(function (_a) {
        var acl = _a[0], response = _a[1];
        if (!Resource.Util.hasType(acl, Auth.ACL.RDF_CLASS))
            throw new HTTP.Errors.BadResponseError("The response does not contains a " + Auth.ACL.RDF_CLASS + " object.", response);
        return [acl, response];
    });
}

//# sourceMappingURL=PersistedProtectedDocument.js.map
