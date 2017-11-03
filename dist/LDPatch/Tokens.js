"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("sparqler/tokens/utils");
var Utils_1 = require("../Utils");
var LDPatchToken = (function () {
    function LDPatchToken() {
        this.token = "ldpatch";
        this.prologues = [];
        this.statements = [];
    }
    LDPatchToken.prototype.toString = function () {
        var tokens = this.prologues.concat(this.statements);
        return tokens.join(" ");
    };
    return LDPatchToken;
}());
exports.LDPatchToken = LDPatchToken;
var PrefixToken = (function () {
    function PrefixToken(namespace, iri) {
        this.token = "prefix";
        this.namespace = namespace;
        this.iri = iri;
    }
    PrefixToken.prototype.toString = function () {
        return "@prefix " + this.namespace + ": " + this.iri + ".";
    };
    return PrefixToken;
}());
exports.PrefixToken = PrefixToken;
var AddToken = (function () {
    function AddToken() {
        this.token = "add";
        this.triples = [];
    }
    AddToken.prototype.toString = function () {
        return "Add { " + utils_1.joinPatterns(this.triples) + " }.";
    };
    return AddToken;
}());
exports.AddToken = AddToken;
var DeleteToken = (function () {
    function DeleteToken() {
        this.token = "delete";
        this.triples = [];
    }
    DeleteToken.prototype.toString = function () {
        return "Delete { " + utils_1.joinPatterns(this.triples) + " }.";
    };
    return DeleteToken;
}());
exports.DeleteToken = DeleteToken;
var UpdateListToken = (function () {
    function UpdateListToken(subject, predicate, slice, collection) {
        this.token = "updateList";
        this.subject = subject;
        this.predicate = predicate;
        this.slice = slice;
        this.collection = collection;
    }
    UpdateListToken.prototype.toString = function () {
        return "UpdateList " + this.subject + " " + this.predicate + " " + this.slice + " " + this.collection + ".";
    };
    return UpdateListToken;
}());
exports.UpdateListToken = UpdateListToken;
var SliceToken = (function () {
    function SliceToken(minIndex, maxIndex) {
        this.token = "slice";
        if (Utils_1.isNumber(minIndex))
            this.minIndex = minIndex;
        if (Utils_1.isNumber(maxIndex))
            this.maxIndex = maxIndex;
    }
    SliceToken.prototype.toString = function () {
        var buffer = "..";
        if (this.minIndex !== void 0)
            buffer = this.minIndex + buffer;
        if (this.maxIndex !== void 0)
            buffer = buffer + this.maxIndex;
        return buffer;
    };
    return SliceToken;
}());
exports.SliceToken = SliceToken;

//# sourceMappingURL=Tokens.js.map
