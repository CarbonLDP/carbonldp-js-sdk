"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("sparqler/tokens");
var PersistedDocument_1 = require("./PersistedDocument");
var Utils = __importStar(require("./Utils"));
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
        ._getConstructDocuments(this.id, requestOptions, query);
}
exports.default = Class;

//# sourceMappingURL=PersistedProtectedDocument.js.map
