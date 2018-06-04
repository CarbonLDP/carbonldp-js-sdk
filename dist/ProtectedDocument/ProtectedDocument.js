"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = require("../Document");
var Utils = __importStar(require("../Utils"));
var Vocabularies_1 = require("../Vocabularies");
var TransientProtectedDocument_1 = require("./TransientProtectedDocument");
exports.ProtectedDocument = {
    TYPE: TransientProtectedDocument_1.TransientProtectedDocument.TYPE,
    SCHEMA: {
        "accessControlList": {
            "@id": Vocabularies_1.CS.accessControlList,
            "@type": "@id",
        },
        "creator": {
            "@id": Vocabularies_1.CS.creator,
            "@type": "@id",
        },
        "owners": {
            "@id": Vocabularies_1.CS.owner,
            "@type": "@id",
            "@container": "@set",
        },
    },
    isDecorated: function (object) {
        return Utils.isObject(object)
            && Utils.hasFunction(object, "getACL");
    },
    is: function (object) {
        return exports.ProtectedDocument.isDecorated(object)
            && Document_1.Document.is(object);
    },
    decorate: function (object, documents) {
        if (exports.ProtectedDocument.isDecorated(object))
            return object;
        Document_1.Document.decorate(object, documents);
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
    if (this.accessControlList)
        return this._documents.get(this.accessControlList.id, requestOptions);
    return this.resolve(function (_) { return _
        .withType(Vocabularies_1.CS.ProtectedDocument)
        .properties({
        accessControlList: {
            "query": function (__) { return __
                .properties(__.full); },
        },
    }); }).then(function () {
        return _this.accessControlList;
    });
}

//# sourceMappingURL=ProtectedDocument.js.map
