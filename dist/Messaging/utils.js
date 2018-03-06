"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var IllegalStateError_1 = require("../Errors/IllegalStateError");
var URI_1 = require("../RDF/URI");
var Service_1 = require("./Service");
function validateEventContext(context) {
    if (!(context && context.messaging instanceof Service_1.MessagingService))
        throw new IllegalStateError_1.IllegalStateError("This instance does not support messaging subscriptions.");
}
exports.validateEventContext = validateEventContext;
function validateEventType(event) {
    if (!/(access-point|child|\*)\.(created|\*)|(document|\*)\.(modified|deleted|\*)|(member|\*)\.(added|removed|\*)/.test(event))
        throw new IllegalArgumentError_1.IllegalArgumentError("Provided event type \"" + event + "\" is invalid.");
}
exports.validateEventType = validateEventType;
function parseURIPattern(uriPattern, baseURI) {
    if (!URI_1.URI.isBaseOf(baseURI, uriPattern))
        throw new IllegalArgumentError_1.IllegalArgumentError("Provided uriPattern \"" + uriPattern + "\" is an invalid for your Carbon LDP instance.");
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
exports.parseURIPattern = parseURIPattern;
function createDestination(event, uriPattern, baseURI) {
    validateEventType(event);
    uriPattern = parseURIPattern(uriPattern, baseURI);
    return "/topic/" + event + (uriPattern ? "." + uriPattern : uriPattern);
}
exports.createDestination = createDestination;

//# sourceMappingURL=Utils.js.map
