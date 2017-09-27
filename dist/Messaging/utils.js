"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("../Errors");
var URI_1 = require("../RDF/URI");
var Service_1 = require("./Service");
function validateEventContext(context) {
    if (!(context && context.messaging instanceof Service_1.default))
        throw new Errors_1.IllegalStateError("This instance does not support messaging subscriptions.");
}
exports.validateEventContext = validateEventContext;
function validateEventType(event) {
    if (!/(access-point|child|\*)\.(created|\*)|(document|\*)\.(modified|deleted|\*)|(member|\*)\.(added|removed|\*)/.test(event))
        throw new Errors_1.IllegalArgumentError("Provided event type \"" + event + "\" is invalid.");
}
exports.validateEventType = validateEventType;
function parseURIPattern(uriPattern, baseURI) {
    if (!URI_1.Util.isBaseOf(baseURI, uriPattern))
        throw new Errors_1.IllegalArgumentError("Provided uriPattern \"" + uriPattern + "\" is an invalid for your Carbon instance.");
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
