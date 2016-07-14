"use strict";
var ACL = require("./../Auth/ACL");
var HTTP = require("./../HTTP");
var Resource = require("./../Resource");
var Utils = require("./../Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "created")
            && Utils.hasPropertyDefined(object, "modified")
            && Utils.hasPropertyDefined(object, "defaultInteractionModel")
            && Utils.hasPropertyDefined(object, "accessControlList")
            && Utils.hasFunction(object, "createAccessPoint")
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
            "createAccessPoint": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: createAccessPoint,
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
        if (!Resource.Util.hasType(acl, ACL.RDF_CLASS))
            throw new HTTP.Errors.BadResponseError("The response does not contains a cs:AccessControlList object.", response);
        return [acl, response];
    });
}
function createAccessPoint(accessPoint, slug, requestOptions) {
    if (slug === void 0) { slug = null; }
    if (requestOptions === void 0) { requestOptions = {}; }
    return this._documents.createAccessPoint(accessPoint, slug, requestOptions);
}

//# sourceMappingURL=PersistedRDFSource.js.map
