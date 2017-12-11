"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("sparqler/tokens");
var NS = require("./NS");
var PersistedDocument = require("./PersistedDocument");
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
    if (requestOptions === void 0) { requestOptions = {}; }
    if (this.isResolved())
        return this._documents.get(this.accessControlList.id, requestOptions);
    var aclGraphVar = new tokens_1.VariableToken("g");
    var aclGetter = new tokens_1.SubjectToken(new tokens_1.IRIToken(this.id))
        .addPredicate(new tokens_1.PredicateToken(new tokens_1.IRIToken(NS.CS.Predicate.accessControlList))
        .addObject(aclGraphVar));
    var aclContent = new tokens_1.SubjectToken(new tokens_1.VariableToken("s"))
        .addPredicate(new tokens_1.PredicateToken(new tokens_1.VariableToken("p"))
        .addObject(new tokens_1.VariableToken("o")));
    var query = new tokens_1.QueryToken(new tokens_1.ConstructToken()
        .addTriple(aclContent)
        .addPattern(aclGetter)
        .addPattern(new tokens_1.GraphToken(aclGraphVar)
        .addPattern(aclContent)));
    return this._documents
        ._getConstructDocuments(this.id, requestOptions, query)
        .then(function (_a) {
        var documents = _a[0], response = _a[1];
        return [documents[0], response];
    });
}

//# sourceMappingURL=PersistedProtectedDocument.js.map
