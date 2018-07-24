"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("sparqler/tokens");
var Utils_1 = require("../Utils");
function _getLevelRegExp(property) {
    if (property)
        property += ".";
    var parsedName = property.replace(/\./g, "\\.");
    return new RegExp("^" + parsedName + "[^.]+$");
}
exports._getLevelRegExp = _getLevelRegExp;
function _createPropertyPatterns(context, resourcePath, propertyPath, propertyDefinition) {
    var uri = propertyDefinition.uri, literalType = propertyDefinition.literalType, pointerType = propertyDefinition.pointerType;
    var propertyIRI = context.compactIRI(uri);
    var resource = context.getVariable(resourcePath);
    var propertyObject = context.getVariable(propertyPath);
    var propertyPatterns = [new tokens_1.SubjectToken(resource)
            .addPredicate(new tokens_1.PredicateToken(propertyIRI)
            .addObject(propertyObject)),
    ];
    if (literalType !== null)
        propertyPatterns
            .push(new tokens_1.FilterToken("datatype( " + propertyObject + " ) = " + context.compactIRI(literalType)));
    if (pointerType !== null)
        propertyPatterns
            .push(new tokens_1.FilterToken("! isLiteral( " + propertyObject + " )"));
    return propertyPatterns;
}
exports._createPropertyPatterns = _createPropertyPatterns;
function _createTypesPattern(context, resourcePath) {
    return new tokens_1.OptionalToken()
        .addPattern(new tokens_1.SubjectToken(context.getVariable(resourcePath))
        .addPredicate(new tokens_1.PredicateToken("a")
        .addObject(context.getVariable(resourcePath + ".types"))));
}
exports._createTypesPattern = _createTypesPattern;
function _createGraphPattern(context, resourcePath) {
    return new tokens_1.GraphToken(context.getVariable(resourcePath))
        .addPattern(new tokens_1.SubjectToken(context.getVariable(resourcePath + "._subject"))
        .addPredicate(new tokens_1.PredicateToken(context.getVariable(resourcePath + "._predicate"))
        .addObject(context.getVariable(resourcePath + "._object"))));
}
exports._createGraphPattern = _createGraphPattern;
function _createAllPattern(context, resourcePath) {
    return new tokens_1.SubjectToken(context.getVariable(resourcePath))
        .addPredicate(new tokens_1.PredicateToken(context.getVariable(resourcePath + "._predicate"))
        .addObject(context.getVariable(resourcePath + "._object")));
}
exports._createAllPattern = _createAllPattern;
function _getParentPath(path) {
    return path
        .split(".")
        .slice(0, -1)
        .join(".");
}
exports._getParentPath = _getParentPath;
function _getAllTriples(patterns) {
    var subjectsMap = new Map();
    __internalTripleAdder(subjectsMap, patterns);
    return Array.from(subjectsMap.values());
}
exports._getAllTriples = _getAllTriples;
function __isFullTriple(triple) {
    return triple
        .predicates
        .map(function (x) { return x.predicate; })
        .some(function (x) { return Utils_1.isObject(x) && x.token === "variable"; });
}
function __internalTripleAdder(subjectsMap, patterns) {
    patterns.forEach(function (pattern) {
        if (pattern.token === "optional" || pattern.token === "graph")
            return __internalTripleAdder(subjectsMap, pattern.patterns);
        if (pattern.token !== "subject")
            return;
        var valid = pattern.predicates
            .map(function (predicate) { return predicate.objects; })
            .some(function (objects) { return objects.some(function (object) { return object.token === "variable"; }); });
        if (!valid)
            return;
        var subject = __getSubject(subjectsMap, pattern);
        if (__isFullTriple(subject))
            return;
        if (__isFullTriple(pattern))
            subject.predicates.length = 0;
        (_a = subject.predicates).push.apply(_a, pattern.predicates);
        var _a;
    });
}
function __getSubject(subjectsMap, original) {
    var subjectStr = original.subject.toString();
    if (subjectsMap.has(subjectStr))
        return subjectsMap.get(subjectStr);
    var subject = new tokens_1.SubjectToken(original.subject);
    subjectsMap.set(subjectStr, subject);
    return subject;
}
function _getPathProperty(element, path) {
    if (element === void 0 || !path)
        return element;
    var _a = path.split("."), propName = _a[0], restParts = _a.slice(1);
    var property = element[propName];
    var restPath = restParts.join(".");
    return _getPathProperty(property, restPath);
}
exports._getPathProperty = _getPathProperty;
function _areDifferentType(a, b) {
    if (typeof a !== typeof b)
        return true;
    if (typeof a === "object")
        return a instanceof Date !== b instanceof Date;
    return false;
}
exports._areDifferentType = _areDifferentType;

//# sourceMappingURL=Utils.js.map
