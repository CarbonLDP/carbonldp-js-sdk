"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("sparqler/tokens");
function getLevelRegExp(property) {
    if (property)
        property += ".";
    var parsedName = property.replace(/\./g, "\\.");
    return new RegExp("^" + parsedName + "[^.]+$");
}
exports.getLevelRegExp = getLevelRegExp;
function createPropertyPattern(context, resourceName, propertyName, propertyDefinition) {
    var uri = propertyDefinition.uri, literalType = propertyDefinition.literalType, pointerType = propertyDefinition.pointerType;
    var propertyPath = context.compactIRI(uri.stringValue);
    var resource = context.getVariable(resourceName);
    var propertyObject = context.getVariable(propertyName);
    var propertyPattern = new tokens_1.OptionalToken()
        .addPattern(new tokens_1.SubjectToken(resource)
        .addPredicate(new tokens_1.PredicateToken(propertyPath)
        .addObject(propertyObject)));
    if (literalType !== null)
        propertyPattern
            .addPattern(new tokens_1.FilterToken("datatype( " + propertyObject + " ) = " + context.compactIRI(literalType.stringValue)));
    if (pointerType !== null)
        propertyPattern
            .addPattern(new tokens_1.FilterToken("! isLiteral( " + propertyObject + " )"));
    return propertyPattern;
}
exports.createPropertyPattern = createPropertyPattern;

//# sourceMappingURL=Utils.js.map
