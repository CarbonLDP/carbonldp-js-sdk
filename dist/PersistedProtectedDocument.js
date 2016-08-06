"use strict";
var HTTP = require("./HTTP");
var Auth = require("./Auth");
var Resource = require("./Resource");
var Utils = require("./Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "accessControlList")
            && Utils.hasFunction(object, "getACL");
    };
    Factory.decorate = function (document) {
        if (Factory.hasClassProperties(document))
            return document;
        var rdfSource = document;
        Object.defineProperties(rdfSource, {
            "getACL": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: getACL,
            },
        });
        return rdfSource;
    };
    return Factory;
}());
exports.Factory = Factory;
function getACL(requestOptions) {
    var that = this;
    return that._documents.get(that.accessControlList.id, requestOptions).then(function (_a) {
        var acl = _a[0], response = _a[1];
        if (!Resource.Util.hasType(acl, Auth.ACL.RDF_CLASS))
            throw new HTTP.Errors.BadResponseError("The response does not contains a " + Auth.ACL.RDF_CLASS + " object.", response);
        return [acl, response];
    });
}

//# sourceMappingURL=PersistedProtectedDocument.js.map
