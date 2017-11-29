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
function createPropertyPatterns(context, resourcePath, propertyPath, propertyDefinition) {
    var uri = propertyDefinition.uri, literalType = propertyDefinition.literalType, pointerType = propertyDefinition.pointerType;
    var propertyIRI = context.compactIRI(uri.stringValue);
    var resource = context.getVariable(resourcePath);
    var propertyObject = context.getVariable(propertyPath);
    var propertyPatterns = [new tokens_1.SubjectToken(resource)
            .addPredicate(new tokens_1.PredicateToken(propertyIRI)
            .addObject(propertyObject)),
    ];
    if (literalType !== null)
        propertyPatterns
            .push(new tokens_1.FilterToken("datatype( " + propertyObject + " ) = " + context.compactIRI(literalType.stringValue)));
    if (pointerType !== null)
        propertyPatterns
            .push(new tokens_1.FilterToken("! isLiteral( " + propertyObject + " )"));
    return propertyPatterns;
}
exports.createPropertyPatterns = createPropertyPatterns;
function createTypesPattern(context, resourcePath) {
    return new tokens_1.OptionalToken()
        .addPattern(new tokens_1.SubjectToken(context.getVariable(resourcePath))
        .addPredicate(new tokens_1.PredicateToken("a")
        .addObject(context.getVariable(resourcePath + ".types"))));
}
exports.createTypesPattern = createTypesPattern;

//# sourceMappingURL=Utils.js.map
