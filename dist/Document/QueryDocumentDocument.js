"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("sparqler/tokens");
var core_1 = require("../core");
var Errors_1 = require("../Errors");
var HTTP_1 = require("../HTTP");
var JSONLD_1 = require("../JSONLD");
var LDP_1 = require("../LDP");
var Pointer_1 = require("../Pointer");
var index_1 = require("../RDF/index");
var Resource_1 = require("../Resource");
var SPARQL_1 = require("../SPARQL");
var QueryDocument_1 = require("../SPARQL/QueryDocument");
var Utils_1 = require("../SPARQL/QueryDocument/Utils");
var Utils_2 = require("../Utils");
var Vocabularies_1 = require("../Vocabularies");
var CRUDDocument_1 = require("./CRUDDocument");
var PersistedDocument_1 = require("./PersistedDocument");
var emptyQueryBuildFn = function (_) { return _; };
function getRegistry(repository) {
    if (repository._registry)
        return repository._registry;
    throw new Errors_1.IllegalActionError("\"" + repository.id + "\" does't support Querying requests.");
}
function executePatterns(registry, uri, requestOptions, queryContext, targetName, constructPatterns, target) {
    var metadataVar = queryContext.getVariable("metadata");
    var construct = (_a = new tokens_1.ConstructToken()
        .addTriple(new tokens_1.SubjectToken(metadataVar)
        .addPredicate(new tokens_1.PredicateToken("a")
        .addObject(queryContext.compactIRI(Vocabularies_1.C.VolatileResource))
        .addObject(queryContext.compactIRI(Vocabularies_1.C.QueryMetadata)))
        .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(Vocabularies_1.C.target))
        .addObject(queryContext.getVariable(targetName))))
        .addPattern(new tokens_1.BindToken("BNODE()", metadataVar))).addPattern.apply(_a, constructPatterns);
    var query = (_b = new tokens_1.QueryToken(construct)).addPrologues.apply(_b, queryContext.getPrologues());
    var triples = Utils_1.getAllTriples(constructPatterns);
    construct.addTriple.apply(construct, triples);
    HTTP_1.RequestUtils.setRetrievalPreferences({ include: [Vocabularies_1.C.PreferResultsContext] }, requestOptions);
    registry._context.auth.addAuthentication(requestOptions);
    return SPARQL_1.SPARQLService
        .executeRawCONSTRUCTQuery(uri, query.toString(), requestOptions)
        .then(function (_a) {
        var strConstruct = _a[0];
        return strConstruct;
    })
        .then(function (jsonldString) {
        return new JSONLD_1.JSONLDParser().parse(jsonldString);
    })
        .then(function (rdfNodes) {
        var freeNodes = index_1.RDFNode.getFreeNodes(rdfNodes);
        var freeResources = registry._parseFreeNodes(freeNodes);
        var targetSet = new Set(freeResources
            .getPointers()
            .filter(QueryDocument_1.QueryMetadata.is)
            .map(function (x) { return x.target || x[Vocabularies_1.C.target]; })
            .reduce(function (targets, currentTargets) { return targets.concat(currentTargets); }, [])
            .map(function (x) { return x.id; }));
        var targetETag = target && target._eTag;
        if (target)
            target._eTag = void 0;
        freeResources
            .getPointers()
            .filter(LDP_1.ResponseMetadata.is)
            .map(function (responseMetadata) { return responseMetadata.documentsMetadata || responseMetadata[Vocabularies_1.C.documentMetadata]; })
            .map(function (documentsMetadata) { return Array.isArray(documentsMetadata) ? documentsMetadata : [documentsMetadata]; })
            .forEach(function (documentsMetadata) { return documentsMetadata.forEach(function (documentMetadata) {
            if (!documentMetadata)
                return;
            var relatedDocument = documentMetadata.relatedDocument || documentMetadata[Vocabularies_1.C.relatedDocument];
            var eTag = documentMetadata.eTag || documentMetadata[Vocabularies_1.C.eTag];
            if (!eTag)
                return;
            relatedDocument._resolved = true;
            if (relatedDocument._eTag === void 0)
                relatedDocument._eTag = eTag;
            if (relatedDocument._eTag !== eTag)
                relatedDocument._eTag = null;
        }); });
        if (targetETag && targetETag === target._eTag)
            return [target];
        var rdfDocuments = rdfNodes
            .filter(index_1.RDFDocument.is);
        var targetDocuments = rdfDocuments
            .filter(function (x) { return targetSet.has(x["@id"]); });
        return new JSONLD_1.JSONLDCompacter(registry, targetName, queryContext)
            .compactDocuments(rdfDocuments, targetDocuments);
    })
        .catch(registry._parseErrorResponse.bind(this));
    var _a, _b;
}
function executeBuilder(registry, uri, requestOptions, queryContext, targetProperty, queryBuilderFn, target) {
    var Builder = targetProperty.name === "document" ?
        QueryDocument_1.QueryDocumentBuilder : QueryDocument_1.QueryDocumentsBuilder;
    var queryBuilder = new Builder(queryContext, targetProperty);
    targetProperty.setType(queryBuilderFn ?
        queryBuilderFn === emptyQueryBuildFn ?
            QueryDocument_1.QueryPropertyType.EMPTY :
            QueryDocument_1.QueryPropertyType.PARTIAL :
        QueryDocument_1.QueryPropertyType.FULL);
    if (queryBuilderFn && queryBuilderFn.call(void 0, queryBuilder) !== queryBuilder)
        throw new Errors_1.IllegalArgumentError("The provided query builder was not returned");
    var constructPatterns = targetProperty.getPatterns();
    return executePatterns(registry, uri, requestOptions, queryContext, targetProperty.name, constructPatterns, target)
        .then(function (documents) {
        if (!(queryBuilder instanceof QueryDocument_1.QueryDocumentsBuilder && queryBuilder._orderData))
            return documents;
        var _a = queryBuilder._orderData, path = _a.path, flow = _a.flow;
        var inverter = flow === "DESC" ? -1 : 1;
        return documents.sort(function (a, b) {
            a = Utils_1.getPathProperty(a, path);
            b = Utils_1.getPathProperty(b, path);
            var aValue = Pointer_1.Pointer.is(a) ? a.id : a;
            var bValue = Pointer_1.Pointer.is(b) ? b.id : b;
            if (aValue === bValue)
                return 0;
            if (aValue === void 0)
                return -1 * inverter;
            if (bValue === void 0)
                return inverter;
            if (!Utils_1.areDifferentType(a, b)) {
                if (Pointer_1.Pointer.is(a)) {
                    var aIsBNode = index_1.URI.isBNodeID(aValue);
                    var bIsBNode = index_1.URI.isBNodeID(bValue);
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
function addRefreshPatterns(queryContext, parentAdder, resource, parentName) {
    if (resource._partialMetadata.schema === QueryDocument_1.PartialMetadata.ALL) {
        parentAdder.addPattern(Utils_1.createAllPattern(queryContext, parentName));
        return;
    }
    parentAdder.addPattern(Utils_1.createTypesPattern(queryContext, parentName));
    resource._partialMetadata.schema.properties.forEach(function (digestedProperty, propertyName) {
        var path = parentName + "." + propertyName;
        var propertyPattern = (_a = new tokens_1.OptionalToken()).addPattern.apply(_a, Utils_1.createPropertyPatterns(queryContext, parentName, path, digestedProperty));
        parentAdder.addPattern(propertyPattern);
        var propertyValues = Array.isArray(resource[propertyName]) ? resource[propertyName] : [resource[propertyName]];
        var propertyFragment = propertyValues
            .filter(Resource_1.PersistedResource.is)
            .find(function (fragment) { return fragment.isPartial(); });
        if (!propertyFragment)
            return;
        addRefreshPatterns(queryContext, propertyPattern, propertyFragment, path);
        var _a;
    });
}
function getPartial(registry, uri, requestOptions, queryBuilderFn) {
    var queryContext = new QueryDocument_1.QueryContextBuilder(registry._context);
    var documentProperty = queryContext
        .addProperty("document")
        .setOptional(false);
    var propertyValue = new tokens_1.ValuesToken().addValues(documentProperty.variable, queryContext.compactIRI(uri));
    documentProperty.addPattern(propertyValue);
    HTTP_1.RequestUtils.setRetrievalPreferences({ include: [Vocabularies_1.C.PreferDocumentETags] }, requestOptions);
    var target = registry.hasPointer(uri) ?
        registry.getPointer(uri) :
        void 0;
    return executeBuilder(registry, uri, requestOptions, queryContext, documentProperty, queryBuilderFn, target)
        .then(function (documents) { return documents[0]; });
}
function refreshPartial(registry, resource, requestOptions) {
    var uri = registry._requestURLFor(resource);
    var queryContext = new QueryDocument_1.QueryContextPartial(resource, registry._context);
    var targetName = "document";
    var constructPatterns = new tokens_1.OptionalToken()
        .addPattern(new tokens_1.ValuesToken()
        .addValues(queryContext.getVariable(targetName), new tokens_1.IRIToken(uri)));
    addRefreshPatterns(queryContext, constructPatterns, resource, targetName);
    HTTP_1.RequestUtils.setRetrievalPreferences({ include: [Vocabularies_1.C.PreferDocumentETags] }, requestOptions);
    return executePatterns(registry, uri, requestOptions, queryContext, targetName, constructPatterns.patterns, resource)
        .then(function (documents) { return documents[0]; });
}
function executeChildrenBuilder(repository, uri, requestOptions, queryBuilderFn) {
    return Utils_2.promiseMethod(function () {
        var registry = getRegistry(repository);
        uri = registry._requestURLFor(repository, uri);
        var queryContext = new QueryDocument_1.QueryContextBuilder(registry._context);
        var childrenProperty = queryContext
            .addProperty("child")
            .setOptional(false);
        var selectChildren = new tokens_1.SelectToken("DISTINCT")
            .addVariable(childrenProperty.variable)
            .addPattern(new tokens_1.SubjectToken(queryContext.compactIRI(uri))
            .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(Vocabularies_1.LDP.contains))
            .addObject(childrenProperty.variable)));
        childrenProperty.addPattern(selectChildren);
        return executeBuilder(registry, uri, requestOptions, queryContext, childrenProperty, queryBuilderFn);
    });
}
function executeMembersBuilder(repository, uri, requestOptions, queryBuilderFn) {
    return Utils_2.promiseMethod(function () {
        var registry = getRegistry(repository);
        uri = registry._requestURLFor(repository, uri);
        var queryContext = new QueryDocument_1.QueryContextBuilder(registry._context);
        var membersProperty = queryContext
            .addProperty("member")
            .setOptional(false);
        var membershipResource = queryContext.getVariable("membershipResource");
        var hasMemberRelation = queryContext.getVariable("hasMemberRelation");
        var selectMembers = new tokens_1.SelectToken("DISTINCT")
            .addVariable(membersProperty.variable)
            .addPattern(new tokens_1.SubjectToken(queryContext.compactIRI(uri))
            .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(Vocabularies_1.LDP.membershipResource))
            .addObject(membershipResource))
            .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(Vocabularies_1.LDP.hasMemberRelation))
            .addObject(hasMemberRelation)))
            .addPattern(new tokens_1.SubjectToken(membershipResource)
            .addPredicate(new tokens_1.PredicateToken(hasMemberRelation)
            .addObject(membersProperty.variable)));
        membersProperty.addPattern(selectMembers);
        return executeBuilder(registry, uri, requestOptions, queryContext, membersProperty, queryBuilderFn);
    });
}
var PROTOTYPE = {
    get: function (uriOrOptionsOrQueryBuilderFn, optionsOrQueryBuilderFn, queryBuilderFn) {
        var _this = this;
        return Utils_2.promiseMethod(function () {
            var registry = getRegistry(_this);
            var iri = registry._requestURLFor(_this, Utils_2.isString(uriOrOptionsOrQueryBuilderFn) ? uriOrOptionsOrQueryBuilderFn : void 0);
            var requestOptions = Utils_2.isObject(uriOrOptionsOrQueryBuilderFn) ?
                uriOrOptionsOrQueryBuilderFn : Utils_2.isObject(optionsOrQueryBuilderFn) ? optionsOrQueryBuilderFn : {};
            queryBuilderFn = Utils_2.isFunction(uriOrOptionsOrQueryBuilderFn) ? uriOrOptionsOrQueryBuilderFn :
                Utils_2.isFunction(optionsOrQueryBuilderFn) ? optionsOrQueryBuilderFn : queryBuilderFn;
            return getPartial(registry, iri, requestOptions, queryBuilderFn);
        });
    },
    resolve: function (optionsOrQueryBuilderFn, queryBuilderFn) {
        var _this = this;
        return Utils_2.promiseMethod(function () {
            var registry = getRegistry(_this);
            var iri = registry._requestURLFor(_this);
            var requestOptions = Utils_2.isObject(optionsOrQueryBuilderFn) ? optionsOrQueryBuilderFn : {};
            if (Utils_2.isFunction(optionsOrQueryBuilderFn))
                queryBuilderFn = optionsOrQueryBuilderFn;
            return getPartial(registry, iri, requestOptions, function (_) {
                if ("types" in _this)
                    _this.types.forEach(function (type) { return _.withType(type); });
                return queryBuilderFn.call(void 0, _);
            });
        });
    },
    refresh: function (requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_2.promiseMethod(function () {
            var registry = getRegistry(_this);
            if (!_this.isPartial())
                throw new Errors_1.IllegalArgumentError("\"" + _this.id + "\" isn't a partial resource.");
            return refreshPartial(registry, _this, requestOptions);
        });
    },
    save: function (requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        getRegistry(this);
        if (this.isOutdated())
            return Promise.reject(new Errors_1.IllegalStateError("\"" + this.id + "\" is outdated and cannot be saved."));
        return CRUDDocument_1.CRUDDocument.PROTOTYPE.save.call(this, requestOptions);
    },
    saveAndRefresh: function (requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_2.promiseMethod(function () {
            var registry = getRegistry(_this);
            if (!_this.isPartial())
                throw new Errors_1.IllegalArgumentError("\"" + _this.id + "\" isn't a valid partial resource.");
            if (!_this.isDirty())
                return refreshPartial(registry, _this, requestOptions);
            var cloneOptions = HTTP_1.RequestUtils.cloneOptions(requestOptions);
            return _this.save(cloneOptions)
                .then(function (doc) {
                return refreshPartial(registry, doc, requestOptions);
            });
        });
    },
    getChildren: function (uriOrQueryBuilderFnOrOptions, queryBuilderFnOrOptions, queryBuilderFn) {
        var iri = Utils_2.isString(uriOrQueryBuilderFnOrOptions) ? uriOrQueryBuilderFnOrOptions : void 0;
        var requestOptions = Utils_2.isObject(uriOrQueryBuilderFnOrOptions) ? uriOrQueryBuilderFnOrOptions :
            Utils_2.isObject(queryBuilderFnOrOptions) ? queryBuilderFnOrOptions : {};
        queryBuilderFn = Utils_2.isFunction(uriOrQueryBuilderFnOrOptions) ? uriOrQueryBuilderFnOrOptions :
            Utils_2.isFunction(queryBuilderFnOrOptions) ? queryBuilderFnOrOptions : queryBuilderFn;
        HTTP_1.RequestUtils.setRetrievalPreferences({ include: [Vocabularies_1.C.PreferDocumentETags] }, requestOptions);
        return executeChildrenBuilder(this, iri, requestOptions, queryBuilderFn);
    },
    getMembers: function (uriOrQueryBuilderFnOrOptions, queryBuilderFnOrOptions, queryBuilderFn) {
        var iri = Utils_2.isString(uriOrQueryBuilderFnOrOptions) ? uriOrQueryBuilderFnOrOptions : void 0;
        var requestOptions = Utils_2.isObject(uriOrQueryBuilderFnOrOptions) ? uriOrQueryBuilderFnOrOptions :
            Utils_2.isObject(queryBuilderFnOrOptions) ? queryBuilderFnOrOptions : {};
        queryBuilderFn = Utils_2.isFunction(uriOrQueryBuilderFnOrOptions) ? uriOrQueryBuilderFnOrOptions :
            Utils_2.isFunction(queryBuilderFnOrOptions) ? queryBuilderFnOrOptions : queryBuilderFn;
        HTTP_1.RequestUtils.setRetrievalPreferences({ include: [Vocabularies_1.C.PreferDocumentETags] }, requestOptions);
        return executeMembersBuilder(this, iri, requestOptions, queryBuilderFn);
    },
    listChildren: function (uriOrOptions, requestOptions) {
        var iri = Utils_2.isString(uriOrOptions) ? uriOrOptions : this.id;
        requestOptions = Utils_2.isObject(uriOrOptions) ? uriOrOptions :
            requestOptions ? requestOptions : {};
        return executeChildrenBuilder(this, iri, requestOptions, emptyQueryBuildFn);
    },
    listMembers: function (uriOrOptions, requestOptions) {
        var iri = Utils_2.isString(uriOrOptions) ? uriOrOptions : this.id;
        requestOptions = Utils_2.isObject(uriOrOptions) ? uriOrOptions :
            requestOptions ? requestOptions : {};
        return executeMembersBuilder(this, iri, requestOptions, emptyQueryBuildFn);
    },
};
exports.QueryDocumentDocument = {
    PROTOTYPE: PROTOTYPE,
    isDecorated: function (object) {
        return Utils_2.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.QueryDocumentDocument.isDecorated(object))
            return object;
        var resource = core_1.ModelDecorator
            .decorateMultiple(object, PersistedDocument_1.PersistedDocument);
        return core_1.ModelDecorator.definePropertiesFrom(PROTOTYPE, resource);
    },
};

//# sourceMappingURL=QueryDocumentDocument.js.map
