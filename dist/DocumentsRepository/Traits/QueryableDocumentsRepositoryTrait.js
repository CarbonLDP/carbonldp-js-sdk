"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("sparqler/tokens");
var IllegalArgumentError_1 = require("../../Errors/IllegalArgumentError");
var IllegalStateError_1 = require("../../Errors/IllegalStateError");
var FreeResources_1 = require("../../FreeResources/FreeResources");
var Request_1 = require("../../HTTP/Request");
var JSONLDCompacter_1 = require("../../JSONLD/JSONLDCompacter");
var JSONLDParser_1 = require("../../JSONLD/JSONLDParser");
var ResponseMetadata_1 = require("../../LDP/ResponseMetadata");
var ModelDecorator_1 = require("../../Model/ModelDecorator");
var Pointer_1 = require("../../Pointer/Pointer");
var QueryableMetadata_1 = require("../../QueryDocuments/QueryableMetadata");
var QueryablePointer_1 = require("../../QueryDocuments/QueryablePointer");
var QueryContextBuilder_1 = require("../../QueryDocuments/QueryContextBuilder");
var QueryContextPartial_1 = require("../../QueryDocuments/QueryContextPartial");
var QueryDocumentBuilder_1 = require("../../QueryDocuments/QueryDocumentBuilder");
var QueryDocumentsBuilder_1 = require("../../QueryDocuments/QueryDocumentsBuilder");
var QueryMetadata_1 = require("../../QueryDocuments/QueryMetadata");
var QueryProperty_1 = require("../../QueryDocuments/QueryProperty");
var Utils_1 = require("../../QueryDocuments/Utils");
var Document_1 = require("../../RDF/Document");
var URI_1 = require("../../RDF/URI");
var SPARQLService_1 = require("../../SPARQL/SPARQLService");
var Utils_2 = require("../../Utils");
var C_1 = require("../../Vocabularies/C");
var LDP_1 = require("../../Vocabularies/LDP");
var Utils_3 = require("../Utils");
var LDPDocumentsRepositoryTrait_1 = require("./LDPDocumentsRepositoryTrait");
var emptyQueryBuildFn = function (_) { return _; };
function __executePatterns(repository, url, requestOptions, queryContext, targetName, constructPatterns, target) {
    var _a, _b;
    var metadataVar = queryContext.getVariable("metadata");
    var construct = (_a = new tokens_1.ConstructToken()
        .addTriple(new tokens_1.SubjectToken(metadataVar)
        .addPredicate(new tokens_1.PredicateToken("a")
        .addObject(queryContext.compactIRI(C_1.C.VolatileResource))
        .addObject(queryContext.compactIRI(C_1.C.QueryMetadata)))
        .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(C_1.C.target))
        .addObject(queryContext.getVariable(targetName))))
        .addPattern(new tokens_1.BindToken("BNODE()", metadataVar))).addPattern.apply(_a, constructPatterns);
    var query = (_b = new tokens_1.QueryToken(construct)).addPrologues.apply(_b, queryContext.getPrologues());
    var triples = Utils_1._getAllTriples(constructPatterns);
    construct.addTriple.apply(construct, triples);
    Request_1.RequestUtils.setRetrievalPreferences({ include: [C_1.C.PreferResultsContext] }, requestOptions);
    return SPARQLService_1.SPARQLService
        .executeRawCONSTRUCTQuery(url, query.toString(), requestOptions)
        .then(function (_a) {
        var strConstruct = _a[0];
        return strConstruct;
    })
        .then(function (jsonldString) {
        return new JSONLDParser_1.JSONLDParser().parse(jsonldString);
    })
        .then(function (rdfNodes) {
        var freeNodes = Document_1.RDFDocument.getFreeNodes(rdfNodes);
        var freeResources;
        try {
            freeResources = FreeResources_1.FreeResources.parseFreeNodes(repository.context.registry, freeNodes);
        }
        catch (e) {
            throw e;
        }
        var targetSet = new Set(freeResources
            .getPointers(true)
            .filter(QueryMetadata_1.QueryMetadata.is)
            .map(function (x) { return x.target; })
            .reduce(function (targets, currentTargets) { return targets.concat(currentTargets); }, [])
            .map(function (x) { return x.$id; }));
        var targetETag = target && target.$eTag;
        if (target)
            target.$eTag = void 0;
        freeResources
            .getPointers(true)
            .filter(ResponseMetadata_1.ResponseMetadata.is)
            .map(function (responseMetadata) { return responseMetadata.documentsMetadata || responseMetadata[C_1.C.documentMetadata]; })
            .map(function (documentsMetadata) { return Array.isArray(documentsMetadata) ? documentsMetadata : [documentsMetadata]; })
            .forEach(function (documentsMetadata) { return documentsMetadata.forEach(function (documentMetadata) {
            if (!documentMetadata)
                return;
            var relatedDocument = documentMetadata.relatedDocument || documentMetadata[C_1.C.relatedDocument];
            var eTag = documentMetadata.eTag || documentMetadata[C_1.C.eTag];
            if (!eTag)
                return;
            relatedDocument.$_resolved = true;
            if (relatedDocument.$eTag === void 0)
                relatedDocument.$eTag = eTag;
            if (relatedDocument.$eTag !== eTag)
                relatedDocument.$eTag = null;
        }); });
        if (targetETag && targetETag === target.$eTag)
            return [target];
        var rdfDocuments = rdfNodes
            .filter(Document_1.RDFDocument.is);
        var targetDocuments = rdfDocuments
            .filter(function (x) { return targetSet.has(x["@id"]); });
        return new JSONLDCompacter_1.JSONLDCompacter(repository.context.registry, targetName, queryContext)
            .compactDocuments(rdfDocuments, targetDocuments);
    })
        .catch(Utils_3._getErrorResponseParserFn(repository.context.registry));
}
function __executeBuilder(repository, url, requestOptions, queryContext, targetProperty, queryBuilderFn, target) {
    var Builder = targetProperty.name === "document" ?
        QueryDocumentBuilder_1.QueryDocumentBuilder : QueryDocumentsBuilder_1.QueryDocumentsBuilder;
    var queryBuilder = new Builder(queryContext, targetProperty);
    targetProperty.setType(queryBuilderFn ?
        queryBuilderFn === emptyQueryBuildFn ?
            QueryProperty_1.QueryPropertyType.EMPTY :
            QueryProperty_1.QueryPropertyType.PARTIAL :
        QueryProperty_1.QueryPropertyType.FULL);
    if (queryBuilderFn && queryBuilderFn.call(void 0, queryBuilder) !== queryBuilder)
        throw new IllegalArgumentError_1.IllegalArgumentError("The provided query builder was not returned");
    var constructPatterns = targetProperty.getPatterns();
    return __executePatterns(repository, url, requestOptions, queryContext, targetProperty.name, constructPatterns, target)
        .then(function (documents) {
        if (!(queryBuilder instanceof QueryDocumentsBuilder_1.QueryDocumentsBuilder && queryBuilder._orderData))
            return documents;
        var _a = queryBuilder._orderData, path = _a.path, flow = _a.flow;
        var inverter = flow === "DESC" ? -1 : 1;
        return documents.sort(function (a, b) {
            a = Utils_1._getPathProperty(a, path);
            b = Utils_1._getPathProperty(b, path);
            var aValue = Pointer_1.Pointer.is(a) ? a.$id : a;
            var bValue = Pointer_1.Pointer.is(b) ? b.$id : b;
            if (aValue === bValue)
                return 0;
            if (aValue === void 0)
                return -1 * inverter;
            if (bValue === void 0)
                return inverter;
            if (!Utils_1._areDifferentType(a, b)) {
                if (Pointer_1.Pointer.is(a)) {
                    var aIsBNode = URI_1.URI.isBNodeID(aValue);
                    var bIsBNode = URI_1.URI.isBNodeID(bValue);
                    if (aIsBNode && !bIsBNode)
                        return -1 * inverter;
                    if (bIsBNode && !aIsBNode)
                        return inverter;
                }
            }
            else {
                if (Pointer_1.Pointer.is(a))
                    return -1 * inverter;
                if (Pointer_1.Pointer.is(b))
                    return inverter;
                if (Utils_2.isNumber(a))
                    return -1 * inverter;
                if (Utils_2.isNumber(b))
                    return inverter;
                if (Utils_2.isDate(a))
                    return -1 * inverter;
                if (Utils_2.isDate(b))
                    return inverter;
                if (Utils_2.isBoolean(a))
                    return -1 * inverter;
                if (Utils_2.isBoolean(b))
                    return inverter;
                if (Utils_2.isString(a))
                    return -1 * inverter;
                if (Utils_2.isString(b))
                    return inverter;
            }
            if (aValue < bValue)
                return -1 * inverter;
            if (aValue > bValue)
                return inverter;
        });
    });
}
function __getQueryable(repository, uri, requestOptions, queryBuilderFn, target) {
    if (!repository.context.registry.inScope(uri, true))
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
    var url = repository.context.getObjectSchema().resolveURI(uri, { base: true });
    var queryContext = new QueryContextBuilder_1.QueryContextBuilder(repository.context);
    var documentProperty = queryContext
        .addProperty("document")
        .setOptional(false);
    var propertyValue = new tokens_1.ValuesToken().addValues(documentProperty.variable, queryContext.compactIRI(uri));
    documentProperty.addPattern(propertyValue);
    Request_1.RequestUtils.setRetrievalPreferences({ include: [C_1.C.PreferDocumentETags] }, requestOptions);
    return __executeBuilder(repository, url, requestOptions, queryContext, documentProperty, queryBuilderFn, target)
        .then(function (documents) { return documents[0]; });
}
function __addRefreshPatterns(queryContext, parentAdder, resource, parentName) {
    if (resource.$_queryableMetadata.schema === QueryableMetadata_1.QueryableMetadata.ALL) {
        parentAdder.addPattern(Utils_1._createAllPattern(queryContext, parentName));
        return;
    }
    parentAdder.addPattern(Utils_1._createTypesPattern(queryContext, parentName));
    resource.$_queryableMetadata.schema.properties.forEach(function (digestedProperty, propertyName) {
        var _a;
        var path = parentName + "." + propertyName;
        var propertyPattern = (_a = new tokens_1.OptionalToken()).addPattern.apply(_a, Utils_1._createPropertyPatterns(queryContext, parentName, path, digestedProperty));
        parentAdder.addPattern(propertyPattern);
        var propertyValues = Array.isArray(resource[propertyName]) ? resource[propertyName] : [resource[propertyName]];
        var propertyFragment = propertyValues
            .filter(QueryablePointer_1.QueryablePointer.is)
            .find(function (fragment) { return fragment.$isQueried(); });
        if (!propertyFragment)
            return;
        __addRefreshPatterns(queryContext, propertyPattern, propertyFragment, path);
    });
}
function __refreshQueryable(repository, document, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    if (!repository.context.registry.inScope(document.$id, true))
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + document.$id + "\" is out of scope."));
    var url = repository.context.getObjectSchema().resolveURI(document.$id, { base: true });
    var queryContext = new QueryContextPartial_1.QueryContextPartial(document, repository.context);
    var targetName = "document";
    var constructPatterns = new tokens_1.OptionalToken()
        .addPattern(new tokens_1.ValuesToken()
        .addValues(queryContext.getVariable(targetName), new tokens_1.IRIToken(url)));
    __addRefreshPatterns(queryContext, constructPatterns, document, targetName);
    Request_1.RequestUtils.setRetrievalPreferences({ include: [C_1.C.PreferDocumentETags] }, requestOptions);
    return __executePatterns(repository, url, requestOptions, queryContext, targetName, constructPatterns.patterns, document)
        .then(function (documents) { return documents[0]; });
}
function __executeChildrenBuilder(repository, uri, requestOptions, queryBuilderFn) {
    if (!repository.context.registry.inScope(uri, true))
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
    var url = repository.context.getObjectSchema().resolveURI(uri, { base: true });
    var queryContext = new QueryContextBuilder_1.QueryContextBuilder(repository.context);
    var childrenProperty = queryContext
        .addProperty("child")
        .setOptional(false);
    var selectChildren = new tokens_1.SelectToken("DISTINCT")
        .addVariable(childrenProperty.variable)
        .addPattern(new tokens_1.SubjectToken(queryContext.compactIRI(url))
        .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(LDP_1.LDP.contains))
        .addObject(childrenProperty.variable)));
    childrenProperty.addPattern(selectChildren);
    return __executeBuilder(repository, url, requestOptions, queryContext, childrenProperty, queryBuilderFn);
}
function __executeMembersBuilder(repository, uri, requestOptions, queryBuilderFn) {
    if (!repository.context.registry.inScope(uri, true))
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
    var url = repository.context.getObjectSchema().resolveURI(uri, { base: true });
    var queryContext = new QueryContextBuilder_1.QueryContextBuilder(repository.context);
    var membersProperty = queryContext
        .addProperty("member")
        .setOptional(false);
    var membershipResource = queryContext.getVariable("membershipResource");
    var hasMemberRelation = queryContext.getVariable("hasMemberRelation");
    var selectMembers = new tokens_1.SelectToken("DISTINCT")
        .addVariable(membersProperty.variable)
        .addPattern(new tokens_1.SubjectToken(queryContext.compactIRI(url))
        .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(LDP_1.LDP.membershipResource))
        .addObject(membershipResource))
        .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(LDP_1.LDP.hasMemberRelation))
        .addObject(hasMemberRelation)))
        .addPattern(new tokens_1.SubjectToken(membershipResource)
        .addPredicate(new tokens_1.PredicateToken(hasMemberRelation)
        .addObject(membersProperty.variable)));
    membersProperty.addPattern(selectMembers);
    return __executeBuilder(repository, url, requestOptions, queryContext, membersProperty, queryBuilderFn);
}
exports.QueryableDocumentsRepositoryTrait = {
    PROTOTYPE: {
        get: function (uri, requestOptionsOrQueryBuilderFn, queryBuilderFn) {
            var requestOptions = Utils_2.isObject(requestOptionsOrQueryBuilderFn) ?
                requestOptionsOrQueryBuilderFn : {};
            queryBuilderFn = Utils_2.isFunction(requestOptionsOrQueryBuilderFn) ?
                requestOptionsOrQueryBuilderFn : queryBuilderFn;
            var target = this.context.registry.hasPointer(uri) ?
                this.context.registry.getPointer(uri, true) :
                void 0;
            if (queryBuilderFn) {
                var types_1 = target ? target.types : [];
                return __getQueryable(this, uri, requestOptions, function (_) {
                    types_1.forEach(function (type) { return _.withType(type); });
                    return queryBuilderFn.call(void 0, _);
                });
            }
            if (target && target.$isQueried())
                requestOptions.ensureLatest = true;
            return LDPDocumentsRepositoryTrait_1.LDPDocumentsRepositoryTrait.PROTOTYPE
                .get.call(this, uri, requestOptions);
        },
        resolve: function (document, requestOptionsOrQueryBuilderFn, queryBuilderFn) {
            return this.get(document.$id, requestOptionsOrQueryBuilderFn, queryBuilderFn);
        },
        refresh: function (document, requestOptions) {
            if (!document.$isQueried())
                return LDPDocumentsRepositoryTrait_1.LDPDocumentsRepositoryTrait.PROTOTYPE
                    .refresh.call(this, document, requestOptions);
            return __refreshQueryable(this, document, requestOptions);
        },
        saveAndRefresh: function (document, requestOptions) {
            var _this = this;
            if (!document.$_queryableMetadata)
                return LDPDocumentsRepositoryTrait_1.LDPDocumentsRepositoryTrait.PROTOTYPE
                    .saveAndRefresh.call(this, document, requestOptions);
            if (document.$eTag === null)
                return Promise.reject(new IllegalStateError_1.IllegalStateError("The document \"" + document.$id + "\" is locally outdated and cannot be saved."));
            var cloneOptions = Request_1.RequestUtils.cloneOptions(requestOptions || {});
            return this.save(document, cloneOptions)
                .then(function (doc) {
                return __refreshQueryable(_this, doc, requestOptions);
            });
        },
        getChildren: function (uri, requestOptionsOrQueryBuilderFn, queryBuilderFn) {
            var requestOptions = Utils_2.isObject(requestOptionsOrQueryBuilderFn) ?
                requestOptionsOrQueryBuilderFn : {};
            queryBuilderFn = Utils_2.isFunction(requestOptionsOrQueryBuilderFn) ?
                requestOptionsOrQueryBuilderFn : queryBuilderFn;
            Request_1.RequestUtils.setRetrievalPreferences({ include: [C_1.C.PreferDocumentETags] }, requestOptions);
            return __executeChildrenBuilder(this, uri, requestOptions, queryBuilderFn);
        },
        getMembers: function (uri, requestOptionsOrQueryBuilderFn, queryBuilderFn) {
            var requestOptions = Utils_2.isObject(requestOptionsOrQueryBuilderFn) ?
                requestOptionsOrQueryBuilderFn : {};
            queryBuilderFn = Utils_2.isFunction(requestOptionsOrQueryBuilderFn) ?
                requestOptionsOrQueryBuilderFn : queryBuilderFn;
            Request_1.RequestUtils.setRetrievalPreferences({ include: [C_1.C.PreferDocumentETags] }, requestOptions);
            return __executeMembersBuilder(this, uri, requestOptions, queryBuilderFn);
        },
        listChildren: function (uri, requestOptions) {
            if (requestOptions === void 0) { requestOptions = {}; }
            return __executeChildrenBuilder(this, uri, requestOptions, emptyQueryBuildFn);
        },
        listMembers: function (uri, requestOptions) {
            if (requestOptions === void 0) { requestOptions = {}; }
            return __executeMembersBuilder(this, uri, requestOptions, emptyQueryBuildFn);
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.QueryableDocumentsRepositoryTrait.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.QueryableDocumentsRepositoryTrait.isDecorated(object))
            return object;
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, LDPDocumentsRepositoryTrait_1.LDPDocumentsRepositoryTrait);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.QueryableDocumentsRepositoryTrait.PROTOTYPE, target);
    },
};

//# sourceMappingURL=QueryableDocumentsRepositoryTrait.js.map
