"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var URI_1 = require("../RDF/URI");
function _validateEventType(event) {
    if (!/(access-point|child|\*)\.(created|\*)|(document|\*)\.(modified|deleted|\*)|(member|\*)\.(added|removed|\*)/.test(event))
        throw new IllegalArgumentError_1.IllegalArgumentError("Provided event type \"" + event + "\" is invalid.");
}
exports._validateEventType = _validateEventType;
function _parseURIPattern(uriPattern, baseURI) {
    if (!URI_1.URI.isBaseOf(baseURI, uriPattern))
        throw new IllegalArgumentError_1.IllegalArgumentError("\"" + uriPattern + "\" is out of scope.");
    if (uriPattern === "/")
        return "";
    uriPattern = URI_1.URI.getRelativeURI(uriPattern, baseURI);
    uriPattern = uriPattern.substring(+uriPattern.startsWith("/"), uriPattern.length - +uriPattern.endsWith("/"));
    return uriPattern
        .split("/")
        .map(function (slug) {
        if (slug === "**")
            return "#";
        return encodeURIComponent(slug)
            .replace(/\./g, "^");
    }).join(".");
}
exports._parseURIPattern = _parseURIPattern;
function _createDestination(event, uriPattern, baseURI) {
    _validateEventType(event);
    uriPattern = _parseURIPattern(uriPattern, baseURI);
    return "/topic/" + event + (uriPattern ? "." + uriPattern : uriPattern);
}
exports._createDestination = _createDestination;

//# sourceMappingURL=Utils.js.map
