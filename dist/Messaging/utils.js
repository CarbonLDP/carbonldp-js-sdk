"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("../Errors");
var URI_1 = require("../RDF/URI");
function validateEventContext(context) {
    if (context &&
        "connectMessaging" in context &&
        "messagingClient" in context)
        return;
    throw new Errors_1.IllegalStateError("This instance does not support messaging events");
}
exports.validateEventContext = validateEventContext;
function validateEventType(eventType) {
    if (!/(access-point|child|\*\.created|\*)|(document|\*\.modidied|deleted\*)|(member|\*\.added|removed|\*)/.test(eventType))
        throw new Errors_1.IllegalArgumentError("Provided event type \"" + eventType + "\" is invalid");
}
exports.validateEventType = validateEventType;
function parseURIPattern(uriPattern, baseURI) {
    if (!URI_1.Util.isBaseOf(baseURI, uriPattern))
        throw new Errors_1.IllegalArgumentError("Provided uriPattern \"" + uriPattern + "\" an invalid Carbon URI");
    if (uriPattern === "/")
        return "";
    uriPattern = URI_1.Util.getRelativeURI(uriPattern, baseURI);
    uriPattern = uriPattern.substring(+uriPattern.startsWith("/"), uriPattern.length - +uriPattern.endsWith("/"));
    return uriPattern
        .split("/")
        .map(function (slug) {
        if (slug === "**")
            return "#";
        return encodeURIComponent(slug)
            .replace(".", "^");
    }).join(".");
}
exports.parseURIPattern = parseURIPattern;
function createDestination(eventType, uriPattern, baseURI) {
    uriPattern = parseURIPattern(uriPattern, baseURI);
    return "/topic/" + eventType + (uriPattern ? "." + uriPattern : uriPattern);
}
exports.createDestination = createDestination;

//# sourceMappingURL=utils.js.map
