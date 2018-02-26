"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("sparqler/tokens");
var AccessPoint_1 = require("./AccessPoint");
var Auth = __importStar(require("./Auth"));
var Document_1 = require("./Document");
var Errors = __importStar(require("./Errors"));
var FreeResources = __importStar(require("./FreeResources"));
var HTTP = __importStar(require("./HTTP"));
var JSONLD = __importStar(require("./JSONLD"));
var LDP_1 = require("./LDP");
var LDPatch = __importStar(require("./LDPatch"));
var Messaging = __importStar(require("./Messaging"));
var Utils_1 = require("./Messaging/Utils");
var ObjectSchema = __importStar(require("./ObjectSchema"));
var PersistedDocument = __importStar(require("./PersistedDocument"));
var PersistedFragment = __importStar(require("./PersistedFragment"));
var PersistedProtectedDocument = __importStar(require("./PersistedProtectedDocument"));
var PersistedResource = __importStar(require("./PersistedResource"));
var Pointer_1 = require("./Pointer");
var ProtectedDocument = __importStar(require("./ProtectedDocument"));
var RDF = __importStar(require("./RDF"));
var SPARQL = __importStar(require("./SPARQL"));
var Builder_1 = __importDefault(require("./SPARQL/Builder"));
var QueryDocument_1 = require("./SPARQL/QueryDocument");
var Utils_2 = require("./SPARQL/QueryDocument/Utils");
var Utils = __importStar(require("./Utils"));
var Utils_3 = require("./Utils");
var C_1 = require("./Vocabularies/C");
var LDP_2 = require("./Vocabularies/LDP");
var Class = (function () {
    function Class(context) {
        this.context = context;
        this.pointers = new Map();
        this.documentsBeingResolved = new Map();
        if (!!this.context && !!this.context.parentContext) {
            var contextJSONLDConverter = this.context.parentContext.documents.jsonldConverter;
            this._jsonldConverter = new JSONLD.Converter.Class(contextJSONLDConverter.literalSerializers);
        }
        else {
            this._jsonldConverter = new JSONLD.Converter.Class();
        }
        var decorators = new Map();
        if (this.context && this.context.parentContext) {
            var parentDecorators = this.context.parentContext.documents.documentDecorators;
            if (parentDecorators)
                decorators = this._documentDecorators = Utils.M.extend(decorators, parentDecorators);
        }
        else {
            decorators.set(ProtectedDocument.RDF_CLASS, PersistedProtectedDocument.Factory.decorate);
            decorators.set(Auth.ACL.RDF_CLASS, Auth.PersistedACL.Factory.decorate);
            decorators.set(Auth.User.RDF_CLASS, Auth.PersistedUser.Factory.decorate);
            decorators.set(Auth.Role.RDF_CLASS, Auth.PersistedRole.Factory.decorate);
            decorators.set(Auth.Credentials.RDF_CLASS, Auth.PersistedCredentials.Factory.decorate);
        }
        this._documentDecorators = decorators;
    }
    Object.defineProperty(Class.prototype, "jsonldConverter", {
        get: function () { return this._jsonldConverter; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "documentDecorators", {
        get: function () { return this._documentDecorators; },
        enumerable: true,
        configurable: true
    });
    Class.prototype.inScope = function (idOrPointer) {
        var id = Pointer_1.Pointer.is(idOrPointer) ? idOrPointer.id : idOrPointer;
        if (RDF.URI.Util.isBNodeID(id))
            return false;
        if (!!this.context) {
            id = ObjectSchema.Util.resolveURI(id, this.context.getObjectSchema());
            if (RDF.URI.Util.isRelative(id))
                return true;
            if (RDF.URI.Util.isBaseOf(this.context.baseURI, id))
                return true;
        }
        else {
            if (RDF.URI.Util.isAbsolute(id))
                return true;
        }
        if (!!this.context && !!this.context.parentContext)
            return this.context.parentContext.documents.inScope(id);
        return RDF.URI.Util.isRelative(id);
    };
    Class.prototype.hasPointer = function (id) {
        id = this.getPointerID(id);
        if (this.pointers.has(id))
            return true;
        if (!!this.context && !!this.context.parentContext)
            return this.context.parentContext.documents.hasPointer(id);
        return false;
    };
    Class.prototype.getPointer = function (id) {
        var localID = this.getPointerID(id);
        if (localID === null) {
            if (!!this.context && !!this.context.parentContext)
                return this.context.parentContext.documents.getPointer(id);
            throw new Errors.IllegalArgumentError("The pointer id is not supported by this module.");
        }
        var pointer;
        if (!this.pointers.has(localID)) {
            pointer = this.createPointer(localID);
            this.pointers.set(localID, pointer);
        }
        return this.pointers.get(localID);
    };
    Class.prototype.removePointer = function (idOrPointer) {
        var id = Utils.isString(idOrPointer) ? idOrPointer : idOrPointer.id;
        var localID = this.getPointerID(id);
        if (localID === null) {
            if (!!this.context && !!this.context.parentContext)
                return this.context.parentContext.documents.removePointer(id);
            return false;
        }
        return this.pointers.delete(localID);
    };
    Class.prototype.get = function (uri, optionsOrQueryBuilderFn, queryBuilderFn) {
        var _this = this;
        var requestOptions = HTTP.Request.Util.isOptions(optionsOrQueryBuilderFn) ? optionsOrQueryBuilderFn : {};
        if (Utils.isFunction(optionsOrQueryBuilderFn))
            queryBuilderFn = optionsOrQueryBuilderFn;
        return Utils_3.promiseMethod(function () {
            uri = _this.getRequestURI(uri);
            return queryBuilderFn ?
                _this.getPartialDocument(uri, requestOptions, queryBuilderFn) :
                _this.getFullDocument(uri, requestOptions);
        });
    };
    Class.prototype.exists = function (documentURI, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_3.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            _this.setDefaultRequestOptions(requestOptions, LDP_2.LDP.RDFSource);
            return _this.sendRequest(HTTP.Method.HEAD, documentURI, requestOptions);
        }).then(function (response) {
            return [true, response];
        }).catch(function (error) {
            if (error.statusCode === 404)
                return [false, error.response];
            return Promise.reject(error);
        });
    };
    Class.prototype.createChild = function (parentURI, childObject, slugOrRequestOptions, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var slug = Utils.isString(slugOrRequestOptions) ? slugOrRequestOptions : null;
        requestOptions = !Utils.isString(slugOrRequestOptions) && !!slugOrRequestOptions ? slugOrRequestOptions : requestOptions;
        return Utils_3.promiseMethod(function () {
            parentURI = _this.getRequestURI(parentURI);
            HTTP.Request.Util.setPreferredRetrieval("minimal", requestOptions);
            return _this.persistChildDocument(parentURI, childObject, slug, requestOptions);
        });
    };
    Class.prototype.createChildren = function (parentURI, childrenObjects, slugsOrRequestOptions, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var slugs = Utils.isArray(slugsOrRequestOptions) ? slugsOrRequestOptions : [];
        requestOptions = !Utils.isArray(slugsOrRequestOptions) && !!slugsOrRequestOptions ? slugsOrRequestOptions : requestOptions;
        return Utils_3.promiseMethod(function () {
            parentURI = _this.getRequestURI(parentURI);
            HTTP.Request.Util.setPreferredRetrieval("minimal", requestOptions);
            return Promise.all(childrenObjects.map(function (childObject, index) {
                var cloneOptions = HTTP.Request.Util.cloneOptions(requestOptions);
                return _this.persistChildDocument(parentURI, childObject, slugs[index], cloneOptions);
            }));
        }).then(Utils_3.mapTupleArray);
    };
    Class.prototype.createChildAndRetrieve = function (parentURI, childObject, slugOrRequestOptions, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        requestOptions = HTTP.Request.Util.isOptions(slugOrRequestOptions) ? slugOrRequestOptions : requestOptions;
        var slug = Utils.isString(slugOrRequestOptions) ? slugOrRequestOptions : null;
        return Utils_3.promiseMethod(function () {
            parentURI = _this.getRequestURI(parentURI);
            HTTP.Request.Util.setPreferredRetrieval("representation", requestOptions);
            return _this.persistChildDocument(parentURI, childObject, slug, requestOptions);
        });
    };
    Class.prototype.createChildrenAndRetrieve = function (parentURI, childrenObjects, slugsOrRequestOptions, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var slugs = Utils.isArray(slugsOrRequestOptions) ? slugsOrRequestOptions : [];
        requestOptions = !Utils.isArray(slugsOrRequestOptions) && !!slugsOrRequestOptions ? slugsOrRequestOptions : requestOptions;
        return Utils_3.promiseMethod(function () {
            parentURI = _this.getRequestURI(parentURI);
            HTTP.Request.Util.setPreferredRetrieval("representation", requestOptions);
            return Promise.all(childrenObjects.map(function (childObject, index) {
                var cloneOptions = HTTP.Request.Util.cloneOptions(requestOptions);
                return _this.persistChildDocument(parentURI, childObject, slugs[index], cloneOptions);
            }));
        }).then(Utils_3.mapTupleArray);
    };
    Class.prototype.listChildren = function (parentURI, requestOptions) {
        var _this = this;
        return Utils_3.promiseMethod(function () {
            parentURI = _this.getRequestURI(parentURI);
            var queryContext = new QueryDocument_1.QueryContextBuilder.Class(_this.context);
            var childrenVar = queryContext.getVariable("child");
            var pattens = [
                new tokens_1.SubjectToken(queryContext.compactIRI(parentURI))
                    .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(LDP_2.LDP.contains))
                    .addObject(childrenVar)),
            ];
            return _this.executeSelectPatterns(parentURI, requestOptions, queryContext, "child", pattens);
        });
    };
    Class.prototype.getChildren = function (parentURI, requestOptionsOrQueryBuilderFn, queryBuilderFn) {
        var _this = this;
        var requestOptions = HTTP.Request.Util.isOptions(requestOptionsOrQueryBuilderFn) ? requestOptionsOrQueryBuilderFn : {};
        queryBuilderFn = Utils.isFunction(requestOptionsOrQueryBuilderFn) ? requestOptionsOrQueryBuilderFn : queryBuilderFn;
        return Utils_3.promiseMethod(function () {
            parentURI = _this.getRequestURI(parentURI);
            var queryContext = new QueryDocument_1.QueryContextBuilder.Class(_this.context);
            var childrenProperty = queryContext
                .addProperty("child")
                .setOptional(false);
            var selectChildren = new tokens_1.SelectToken()
                .addVariable(childrenProperty.variable)
                .addPattern(new tokens_1.SubjectToken(queryContext.compactIRI(parentURI))
                .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(LDP_2.LDP.contains))
                .addObject(childrenProperty.variable)));
            childrenProperty.addPattern(selectChildren);
            return _this.executeQueryBuilder(parentURI, requestOptions, queryContext, childrenProperty, queryBuilderFn);
        });
    };
    Class.prototype.createAccessPoint = function (documentURI, accessPoint, slugOrRequestOptions, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var slug = Utils.isString(slugOrRequestOptions) ? slugOrRequestOptions : null;
        requestOptions = !Utils.isString(slugOrRequestOptions) && !!slugOrRequestOptions ? slugOrRequestOptions : requestOptions;
        return Utils_3.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            HTTP.Request.Util.setPreferredRetrieval("minimal", requestOptions);
            return _this.persistAccessPoint(documentURI, accessPoint, slug, requestOptions);
        });
    };
    Class.prototype.createAccessPoints = function (documentURI, accessPoints, slugsOrRequestOptions, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var slugs = Utils.isArray(slugsOrRequestOptions) ? slugsOrRequestOptions : [];
        requestOptions = !Utils.isArray(slugsOrRequestOptions) && !!slugsOrRequestOptions ? slugsOrRequestOptions : requestOptions;
        return Utils_3.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            HTTP.Request.Util.setPreferredRetrieval("minimal", requestOptions);
            return Promise.all(accessPoints.map(function (accessPoint, index) {
                var cloneOptions = HTTP.Request.Util.cloneOptions(requestOptions);
                return _this.persistAccessPoint(documentURI, accessPoint, slugs[index], cloneOptions);
            }));
        }).then(Utils_3.mapTupleArray);
    };
    Class.prototype.listMembers = function (uri, requestOptions) {
        var _this = this;
        return Utils_3.promiseMethod(function () {
            uri = _this.getRequestURI(uri);
            var queryContext = new QueryDocument_1.QueryContextBuilder.Class(_this.context);
            var memberVar = queryContext.getVariable("member");
            var membershipResource = queryContext.getVariable("membershipResource");
            var hasMemberRelation = queryContext.getVariable("hasMemberRelation");
            var pattens = [
                new tokens_1.SubjectToken(queryContext.compactIRI(uri))
                    .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(LDP_2.LDP.membershipResource))
                    .addObject(membershipResource))
                    .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(LDP_2.LDP.hasMemberRelation))
                    .addObject(hasMemberRelation)),
                new tokens_1.SubjectToken(membershipResource)
                    .addPredicate(new tokens_1.PredicateToken(hasMemberRelation)
                    .addObject(memberVar)),
            ];
            return _this.executeSelectPatterns(uri, requestOptions, queryContext, "member", pattens);
        });
    };
    Class.prototype.getMembers = function (uri, requestOptionsOrQueryBuilderFn, queryBuilderFn) {
        var _this = this;
        var requestOptions = HTTP.Request.Util.isOptions(requestOptionsOrQueryBuilderFn) ? requestOptionsOrQueryBuilderFn : {};
        queryBuilderFn = Utils.isFunction(requestOptionsOrQueryBuilderFn) ? requestOptionsOrQueryBuilderFn : queryBuilderFn;
        return Utils_3.promiseMethod(function () {
            uri = _this.getRequestURI(uri);
            var queryContext = new QueryDocument_1.QueryContextBuilder.Class(_this.context);
            var membersProperty = queryContext
                .addProperty("member")
                .setOptional(false);
            var membershipResource = queryContext.getVariable("membershipResource");
            var hasMemberRelation = queryContext.getVariable("hasMemberRelation");
            var selectMembers = new tokens_1.SelectToken()
                .addVariable(membersProperty.variable)
                .addPattern(new tokens_1.SubjectToken(queryContext.compactIRI(uri))
                .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(LDP_2.LDP.membershipResource))
                .addObject(membershipResource))
                .addPredicate(new tokens_1.PredicateToken(queryContext.compactIRI(LDP_2.LDP.hasMemberRelation))
                .addObject(hasMemberRelation)))
                .addPattern(new tokens_1.SubjectToken(membershipResource)
                .addPredicate(new tokens_1.PredicateToken(hasMemberRelation)
                .addObject(membersProperty.variable)));
            membersProperty.addPattern(selectMembers);
            return _this.executeQueryBuilder(uri, requestOptions, queryContext, membersProperty, queryBuilderFn);
        });
    };
    Class.prototype.addMember = function (documentURI, memberORUri, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        return this.addMembers(documentURI, [memberORUri], requestOptions);
    };
    Class.prototype.addMembers = function (documentURI, members, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_3.promiseMethod(function () {
            var pointers = _this._parseMembers(members);
            documentURI = _this.getRequestURI(documentURI);
            _this.setDefaultRequestOptions(requestOptions, LDP_2.LDP.Container);
            HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
            var freeResources = FreeResources.Factory.create(_this);
            freeResources.createResourceFrom(LDP_1.AddMemberAction.Factory.create(pointers));
            return _this.sendRequest(HTTP.Method.PUT, documentURI, requestOptions, freeResources.toJSON());
        });
    };
    Class.prototype.removeMember = function (documentURI, memberORUri, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        return this.removeMembers(documentURI, [memberORUri], requestOptions);
    };
    Class.prototype.removeMembers = function (documentURI, members, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_3.promiseMethod(function () {
            var pointers = _this._parseMembers(members);
            documentURI = _this.getRequestURI(documentURI);
            _this.setDefaultRequestOptions(requestOptions, LDP_2.LDP.Container);
            HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
            var containerRetrievalPreferences = {
                include: [C_1.C.PreferSelectedMembershipTriples],
                omit: [C_1.C.PreferMembershipTriples],
            };
            HTTP.Request.Util.setRetrievalPreferences(containerRetrievalPreferences, requestOptions, false);
            var freeResources = FreeResources.Factory.create(_this);
            freeResources.createResourceFrom(LDP_1.RemoveMemberAction.Factory.create(pointers));
            return _this.sendRequest(HTTP.Method.DELETE, documentURI, requestOptions, freeResources.toJSON());
        });
    };
    Class.prototype.removeAllMembers = function (documentURI, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_3.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            _this.setDefaultRequestOptions(requestOptions, LDP_2.LDP.Container);
            var containerRetrievalPreferences = {
                include: [
                    C_1.C.PreferMembershipTriples,
                ],
                omit: [
                    C_1.C.PreferMembershipResources,
                    C_1.C.PreferContainmentTriples,
                    C_1.C.PreferContainmentResources,
                    C_1.C.PreferContainer,
                ],
            };
            HTTP.Request.Util.setRetrievalPreferences(containerRetrievalPreferences, requestOptions, false);
            return _this.sendRequest(HTTP.Method.DELETE, documentURI, requestOptions);
        });
    };
    Class.prototype.save = function (persistedDocument, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_3.promiseMethod(function () {
            if (!PersistedDocument.Factory.is(persistedDocument))
                throw new Errors.IllegalArgumentError("Provided element is not a valid persisted document.");
            HTTP.Request.Util.setPreferredRetrieval("minimal", requestOptions);
            return _this.patchDocument(persistedDocument, requestOptions);
        });
    };
    Class.prototype.refresh = function (persistedDocument, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils.promiseMethod(function () {
            if (!PersistedDocument.Factory.is(persistedDocument))
                throw new Errors.IllegalArgumentError("Provided element is not a valid persisted document.");
            return persistedDocument.isPartial() ?
                _this.refreshPartialDocument(persistedDocument, requestOptions) :
                _this.refreshFullDocument(persistedDocument, requestOptions);
        });
    };
    Class.prototype.saveAndRefresh = function (persistedDocument, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var responses = [];
        return Utils_3.promiseMethod(function () {
            if (!PersistedDocument.Factory.is(persistedDocument))
                throw new Errors.IllegalArgumentError("Provided element is not a valid persisted document.");
            var cloneOptions = HTTP.Request.Util.cloneOptions(requestOptions);
            HTTP.Request.Util.setPreferredRetrieval(persistedDocument.isPartial() ? "minimal" : "representation", cloneOptions);
            return _this.patchDocument(persistedDocument, cloneOptions);
        }).then(function (_a) {
            var response = _a[1];
            if (!persistedDocument.isPartial())
                return [persistedDocument, response];
            responses.push(response);
            return _this.refreshPartialDocument(persistedDocument, requestOptions);
        }).then(function (_a) {
            var response = _a[1];
            responses.push(response);
            return [persistedDocument, responses];
        });
    };
    Class.prototype.delete = function (documentURI, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_3.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            _this.setDefaultRequestOptions(requestOptions, LDP_2.LDP.RDFSource);
            return _this.sendRequest(HTTP.Method.DELETE, documentURI, requestOptions);
        }).then(function (response) {
            var pointerID = _this.getPointerID(documentURI);
            _this.pointers.delete(pointerID);
            return response;
        });
    };
    Class.prototype.getDownloadURL = function (documentURI, requestOptions) {
        var _this = this;
        if (!this.context)
            return Promise.reject(new Errors.IllegalStateError("This instance doesn't support Authenticated request."));
        return Utils_3.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            return _this.context.auth.getAuthenticatedURL(documentURI, requestOptions);
        });
    };
    Class.prototype.getGeneralSchema = function () {
        if (!this.context)
            return new ObjectSchema.DigestedObjectSchema();
        return this.context.getObjectSchema();
    };
    Class.prototype.hasSchemaFor = function (object, path) {
        if (path !== void 0)
            return false;
        return "@id" in object || "id" in object;
    };
    Class.prototype.getSchemaFor = function (object) {
        return ("@id" in object) ?
            this.getDigestedObjectSchemaForExpandedObject(object) :
            this.getDigestedObjectSchemaForDocument(object);
    };
    Class.prototype.executeRawASKQuery = function (documentURI, askQuery, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_3.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            if (_this.context && _this.context.auth.isAuthenticated())
                _this.context.auth.addAuthentication(requestOptions);
            return SPARQL.Service.executeRawASKQuery(documentURI, askQuery, requestOptions)
                .catch(_this._parseErrorResponse.bind(_this));
        });
    };
    Class.prototype.executeASKQuery = function (documentURI, askQuery, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_3.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            if (_this.context && _this.context.auth.isAuthenticated())
                _this.context.auth.addAuthentication(requestOptions);
            return SPARQL.Service.executeASKQuery(documentURI, askQuery, requestOptions)
                .catch(_this._parseErrorResponse.bind(_this));
        });
    };
    Class.prototype.executeRawSELECTQuery = function (documentURI, selectQuery, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_3.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            if (_this.context && _this.context.auth.isAuthenticated())
                _this.context.auth.addAuthentication(requestOptions);
            return SPARQL.Service.executeRawSELECTQuery(documentURI, selectQuery, requestOptions)
                .catch(_this._parseErrorResponse.bind(_this));
        });
    };
    Class.prototype.executeSELECTQuery = function (documentURI, selectQuery, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_3.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            if (_this.context && _this.context.auth.isAuthenticated())
                _this.context.auth.addAuthentication(requestOptions);
            return SPARQL.Service.executeSELECTQuery(documentURI, selectQuery, _this, requestOptions)
                .catch(_this._parseErrorResponse.bind(_this));
        });
    };
    Class.prototype.executeRawCONSTRUCTQuery = function (documentURI, constructQuery, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_3.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            if (_this.context && _this.context.auth.isAuthenticated())
                _this.context.auth.addAuthentication(requestOptions);
            return SPARQL.Service.executeRawCONSTRUCTQuery(documentURI, constructQuery, requestOptions)
                .catch(_this._parseErrorResponse.bind(_this));
        });
    };
    Class.prototype.executeRawDESCRIBEQuery = function (documentURI, describeQuery, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_3.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            if (_this.context && _this.context.auth.isAuthenticated())
                _this.context.auth.addAuthentication(requestOptions);
            return SPARQL.Service.executeRawDESCRIBEQuery(documentURI, describeQuery, requestOptions)
                .catch(_this._parseErrorResponse.bind(_this));
        });
    };
    Class.prototype.executeUPDATE = function (documentURI, update, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_3.promiseMethod(function () {
            documentURI = _this.getRequestURI(documentURI);
            if (_this.context && _this.context.auth.isAuthenticated())
                _this.context.auth.addAuthentication(requestOptions);
            return SPARQL.Service.executeUPDATE(documentURI, update, requestOptions)
                .catch(_this._parseErrorResponse.bind(_this));
        });
    };
    Class.prototype.sparql = function (documentURI) {
        var builder = new Builder_1.default(this, this.getRequestURI(documentURI));
        if (this.context) {
            var schema = this.getProcessedSchema();
            builder = builder
                .base(schema.base)
                .vocab(schema.vocab);
            schema.prefixes.forEach(function (uri, prefix) {
                builder = builder.prefix(prefix, uri);
            });
        }
        return builder;
    };
    Class.prototype.on = function (event, uriPattern, onEvent, onError) {
        try {
            Utils_1.validateEventContext(this.context);
            var destination = Utils_1.createDestination(event, uriPattern, this.context.baseURI);
            this.context.messaging.subscribe(destination, onEvent, onError);
        }
        catch (error) {
            if (!onError)
                throw error;
            onError(error);
        }
    };
    Class.prototype.off = function (event, uriPattern, onEvent, onError) {
        try {
            Utils_1.validateEventContext(this.context);
            var destination = Utils_1.createDestination(event, uriPattern, this.context.baseURI);
            this.context.messaging.unsubscribe(destination, onEvent);
        }
        catch (error) {
            if (!onError)
                throw error;
            onError(error);
        }
    };
    Class.prototype.one = function (event, uriPattern, onEvent, onError) {
        var self = this;
        this.on(event, uriPattern, function onEventWrapper(message) {
            onEvent(message);
            self.off(event, uriPattern, onEventWrapper, onError);
        }, onError);
    };
    Class.prototype.onDocumentCreated = function (uriPattern, onEvent, onError) {
        return this.on(Messaging.Event.DOCUMENT_CREATED, uriPattern, onEvent, onError);
    };
    Class.prototype.onChildCreated = function (uriPattern, onEvent, onError) {
        return this.on(Messaging.Event.CHILD_CREATED, uriPattern, onEvent, onError);
    };
    Class.prototype.onAccessPointCreated = function (uriPattern, onEvent, onError) {
        return this.on(Messaging.Event.ACCESS_POINT_CREATED, uriPattern, onEvent, onError);
    };
    Class.prototype.onDocumentModified = function (uriPattern, onEvent, onError) {
        return this.on(Messaging.Event.DOCUMENT_MODIFIED, uriPattern, onEvent, onError);
    };
    Class.prototype.onDocumentDeleted = function (uriPattern, onEvent, onError) {
        return this.on(Messaging.Event.DOCUMENT_DELETED, uriPattern, onEvent, onError);
    };
    Class.prototype.onMemberAdded = function (uriPattern, onEvent, onError) {
        return this.on(Messaging.Event.MEMBER_ADDED, uriPattern, onEvent, onError);
    };
    Class.prototype.onMemberRemoved = function (uriPattern, onEvent, onError) {
        return this.on(Messaging.Event.MEMBER_REMOVED, uriPattern, onEvent, onError);
    };
    Class.prototype._getPersistedDocument = function (rdfDocument, response) {
        var documentResources = RDF.Document.Util.getNodes(rdfDocument)[0];
        if (documentResources.length === 0)
            throw new HTTP.Errors.BadResponseError("The RDFDocument: " + rdfDocument["@id"] + ", doesn't contain a document resource.", response);
        if (documentResources.length > 1)
            throw new HTTP.Errors.BadResponseError("The RDFDocument: " + rdfDocument["@id"] + ", contains more than one document resource.", response);
        return new JSONLD.Compacter.Class(this).compactDocument(rdfDocument);
    };
    Class.prototype._getFreeResources = function (nodes) {
        var freeResourcesDocument = FreeResources.Factory.create(this);
        var resources = nodes.map(function (node) { return freeResourcesDocument.createResource(node["@id"]); });
        this.compact(nodes, resources, freeResourcesDocument);
        return freeResourcesDocument;
    };
    Class.prototype._parseErrorResponse = function (response) {
        var _this = this;
        if (response instanceof Error)
            return Promise.reject(response);
        if (!(response.status >= 400 && response.status < 600 && HTTP.Errors.statusCodeMap.has(response.status)))
            return Promise.reject(new HTTP.Errors.UnknownError(response.data, response));
        var error = new (HTTP.Errors.statusCodeMap.get(response.status))(response.data, response);
        if (!response.data || !this.context)
            return Promise.reject(error);
        return new JSONLD.Parser.Class().parse(response.data).then(function (freeNodes) {
            var freeResources = _this._getFreeResources(freeNodes);
            var errorResponses = freeResources
                .getResources()
                .filter(function (resource) { return resource.hasType(LDP_1.ErrorResponse.RDF_CLASS); });
            if (errorResponses.length === 0)
                return Promise.reject(new Errors.IllegalArgumentError("The response string does not contains a c:ErrorResponse."));
            if (errorResponses.length > 1)
                return Promise.reject(new Errors.IllegalArgumentError("The response string contains multiple c:ErrorResponse."));
            Object.assign(error, errorResponses[0]);
            error.message = LDP_1.ErrorResponse.Util.getMessage(error);
            return Promise.reject(error);
        }, function () {
            return Promise.reject(error);
        });
    };
    Class.prototype.getFullDocument = function (uri, requestOptions) {
        var _this = this;
        if (this.hasPointer(uri)) {
            var pointer = this.getPointer(uri);
            if (pointer.isResolved()) {
                var persistedDocument = pointer;
                if (!persistedDocument.isPartial() || !requestOptions.ensureLatest)
                    return Promise.resolve([persistedDocument, null]);
            }
        }
        this.setDefaultRequestOptions(requestOptions, LDP_2.LDP.RDFSource);
        if (this.documentsBeingResolved.has(uri))
            return this.documentsBeingResolved.get(uri);
        var promise = this.sendRequest(HTTP.Method.GET, uri, requestOptions, null, new RDF.Document.Parser())
            .then(function (_a) {
            var rdfDocuments = _a[0], response = _a[1];
            var eTag = HTTP.Response.Util.getETag(response);
            if (eTag === null)
                throw new HTTP.Errors.BadResponseError("The response doesn't contain an ETag", response);
            var targetURI = uri;
            var locationHeader = response.getHeader("Content-Location");
            if (locationHeader) {
                if (locationHeader.values.length !== 1)
                    throw new HTTP.Errors.BadResponseError("The response must contain one Content-Location header.", response);
                var locationString = "" + locationHeader;
                if (!locationString)
                    throw new HTTP.Errors.BadResponseError("The response doesn't contain a valid 'Content-Location' header.", response);
                targetURI = locationString;
            }
            var rdfDocument = _this.getRDFDocument(targetURI, rdfDocuments, response);
            if (rdfDocument === null)
                throw new HTTP.Errors.BadResponseError("No document was returned.", response);
            var document = _this._getPersistedDocument(rdfDocument, response);
            document._etag = eTag;
            _this.documentsBeingResolved.delete(uri);
            return [document, response];
        }).catch(function (error) {
            _this.documentsBeingResolved.delete(uri);
            return Promise.reject(error);
        });
        this.documentsBeingResolved.set(uri, promise);
        return promise;
    };
    Class.prototype.getPartialDocument = function (uri, requestOptions, queryBuilderFn) {
        var queryContext = new QueryDocument_1.QueryContextBuilder.Class(this.context);
        var documentProperty = queryContext
            .addProperty("document")
            .setOptional(false);
        var propertyValue = new tokens_1.ValuesToken().addValues(documentProperty.variable, queryContext.compactIRI(uri));
        documentProperty.addPattern(propertyValue);
        return this.executeQueryBuilder(uri, requestOptions, queryContext, documentProperty, queryBuilderFn)
            .then(function (_a) {
            var documents = _a[0], response = _a[1];
            return [documents[0], response];
        });
    };
    Class.prototype.patchDocument = function (persistedDocument, requestOptions) {
        var _this = this;
        var uri = this.getRequestURI(persistedDocument.id);
        if (!persistedDocument.isDirty())
            return Promise.resolve([persistedDocument, null]);
        if (persistedDocument.isLocallyOutDated())
            throw new Errors.IllegalStateError("Cannot save an outdated document.");
        this.setDefaultRequestOptions(requestOptions);
        HTTP.Request.Util.setContentTypeHeader("text/ldpatch", requestOptions);
        HTTP.Request.Util.setIfMatchHeader(persistedDocument._etag, requestOptions);
        persistedDocument._normalize();
        var deltaCreator = new LDPatch.DeltaCreator.Class(this.jsonldConverter);
        [persistedDocument].concat(persistedDocument.getFragments()).forEach(function (resource) {
            var schema = _this.getSchemaFor(resource);
            deltaCreator.addResource(schema, resource._snapshot, resource);
        });
        var body = deltaCreator.getPatch();
        return this.sendRequest(HTTP.Method.PATCH, uri, requestOptions, body)
            .then(function (response) {
            return _this.applyResponseData(persistedDocument, response);
        });
    };
    Class.prototype.refreshFullDocument = function (persistedDocument, requestOptions) {
        var _this = this;
        var uri = this.getRequestURI(persistedDocument.id);
        this.setDefaultRequestOptions(requestOptions, LDP_2.LDP.RDFSource);
        HTTP.Request.Util.setIfNoneMatchHeader(persistedDocument._etag, requestOptions);
        return this.sendRequest(HTTP.Method.GET, uri, requestOptions, null, new RDF.Document.Parser()).then(function (_a) {
            var rdfDocuments = _a[0], response = _a[1];
            if (response === null)
                return [rdfDocuments, response];
            var eTag = HTTP.Response.Util.getETag(response);
            if (eTag === null)
                throw new HTTP.Errors.BadResponseError("The response doesn't contain an ETag", response);
            var rdfDocument = _this.getRDFDocument(uri, rdfDocuments, response);
            if (rdfDocument === null)
                throw new HTTP.Errors.BadResponseError("No document was returned.", response);
            var updatedPersistedDocument = _this._getPersistedDocument(rdfDocument, response);
            updatedPersistedDocument._etag = eTag;
            return [updatedPersistedDocument, response];
        }).catch(function (error) {
            if (error.statusCode === 304)
                return [persistedDocument, null];
            return Promise.reject(error);
        });
    };
    Class.prototype.refreshPartialDocument = function (persistedDocument, requestOptions) {
        var uri = this.getRequestURI(persistedDocument.id);
        var queryContext = new QueryDocument_1.QueryContextPartial.Class(persistedDocument, this.context);
        var targetName = "document";
        var constructPatterns = new tokens_1.OptionalToken()
            .addPattern(new tokens_1.ValuesToken()
            .addValues(queryContext.getVariable(targetName), new tokens_1.IRIToken(uri)));
        (function createRefreshQuery(parentAdder, resource, parentName) {
            if (resource._partialMetadata.schema === SPARQL.QueryDocument.PartialMetadata.ALL) {
                parentAdder.addPattern(Utils_2.createAllPattern(queryContext, parentName));
                return;
            }
            parentAdder.addPattern(Utils_2.createTypesPattern(queryContext, parentName));
            resource._partialMetadata.schema.properties.forEach(function (digestedProperty, propertyName) {
                var path = parentName + "." + propertyName;
                var propertyPattern = (_a = new tokens_1.OptionalToken()).addPattern.apply(_a, Utils_2.createPropertyPatterns(queryContext, parentName, path, digestedProperty));
                parentAdder.addPattern(propertyPattern);
                var propertyValues = Array.isArray(resource[propertyName]) ? resource[propertyName] : [resource[propertyName]];
                var propertyFragment = propertyValues
                    .filter(PersistedFragment.Factory.is)
                    .find(function (fragment) { return fragment.isPartial(); });
                if (!propertyFragment)
                    return;
                createRefreshQuery(propertyPattern, propertyFragment, path);
                var _a;
            });
        })(constructPatterns, persistedDocument, targetName);
        return this.executeConstructPatterns(uri, requestOptions, queryContext, targetName, constructPatterns.patterns, persistedDocument)
            .then(function (_a) {
            var documents = _a[0], response = _a[1];
            return [documents[0], response];
        });
    };
    Class.prototype.executeQueryBuilder = function (uri, requestOptions, queryContext, targetProperty, queryBuilderFn) {
        var Builder = targetProperty.name === "document" ?
            QueryDocument_1.QueryDocumentBuilder.Class : QueryDocument_1.QueryDocumentsBuilder.Class;
        var queryBuilder = new Builder(queryContext, targetProperty);
        targetProperty.setType(queryBuilderFn ?
            QueryDocument_1.QueryProperty.PropertyType.PARTIAL :
            QueryDocument_1.QueryProperty.PropertyType.FULL);
        if (queryBuilderFn && queryBuilderFn.call(void 0, queryBuilder) !== queryBuilder)
            throw new Errors.IllegalArgumentError("The provided query builder was not returned");
        var constructPatterns = targetProperty.getPatterns();
        return this
            .executeConstructPatterns(uri, requestOptions, queryContext, targetProperty.name, constructPatterns)
            .then(function (returned) {
            if (queryBuilder instanceof QueryDocument_1.QueryDocumentsBuilder.Class && queryBuilder._orderData) {
                var _a = queryBuilder._orderData, path_1 = _a.path, flow = _a.flow;
                var inverter_1 = flow === "DESC" ? -1 : 1;
                returned[0].sort(function (a, b) {
                    a = Utils_2.getPathProperty(a, path_1);
                    b = Utils_2.getPathProperty(b, path_1);
                    var aValue = Pointer_1.Pointer.is(a) ? a.id : a;
                    var bValue = Pointer_1.Pointer.is(b) ? b.id : b;
                    if (aValue === bValue)
                        return 0;
                    if (aValue === void 0)
                        return -1 * inverter_1;
                    if (bValue === void 0)
                        return inverter_1;
                    if (!Utils_2.areDifferentType(a, b)) {
                        if (Pointer_1.Pointer.is(a)) {
                            var aIsBNode = RDF.URI.Util.isBNodeID(aValue);
                            var bIsBNode = RDF.URI.Util.isBNodeID(bValue);
                            if (aIsBNode && !bIsBNode)
                                return -1 * inverter_1;
                            if (bIsBNode && !aIsBNode)
                                return inverter_1;
                        }
                    }
                    else {
                        if (Pointer_1.Pointer.is(a))
                            return -1 * inverter_1;
                        if (Pointer_1.Pointer.is(b))
                            return inverter_1;
                        if (Utils.isNumber(a))
                            return -1 * inverter_1;
                        if (Utils.isNumber(b))
                            return inverter_1;
                        if (Utils.isDate(a))
                            return -1 * inverter_1;
                        if (Utils.isDate(b))
                            return inverter_1;
                        if (Utils.isBoolean(a))
                            return -1 * inverter_1;
                        if (Utils.isBoolean(b))
                            return inverter_1;
                        if (Utils.isString(a))
                            return -1 * inverter_1;
                        if (Utils.isString(b))
                            return inverter_1;
                    }
                    if (aValue < bValue)
                        return -1 * inverter_1;
                    if (aValue > bValue)
                        return inverter_1;
                });
            }
            return returned;
        });
    };
    Class.prototype.executeConstructPatterns = function (uri, requestOptions, queryContext, targetName, constructPatterns, targetDocument) {
        var _this = this;
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
        var triples = Utils_2.getAllTriples(constructPatterns);
        construct.addTriple.apply(construct, triples);
        HTTP.Request.Util.setRetrievalPreferences({ include: [C_1.C.PreferResultsContext] }, requestOptions, false);
        HTTP.Request.Util.setRetrievalPreferences({ include: [C_1.C.PreferDocumentETags] }, requestOptions, false);
        var response;
        return this.executeRawCONSTRUCTQuery(uri, query.toString(), requestOptions).then(function (_a) {
            var jsonldString = _a[0], _response = _a[1];
            response = _response;
            return new JSONLD.Parser.Class().parse(jsonldString);
        }).then(function (rdfNodes) {
            var freeResources = _this._getFreeResources(rdfNodes
                .filter(function (node) { return !RDF.Document.Factory.is(node); }));
            var targetSet = new Set(freeResources
                .getResources()
                .filter(SPARQL.QueryDocument.QueryMetadata.Factory.is)
                .map(function (x) { return _this.context ? x.target : x[C_1.C.target]; })
                .reduce(function (targets, currentTargets) { return targets.concat(currentTargets); }, [])
                .map(function (x) { return x.id; }));
            var targetETag = targetDocument && targetDocument._etag;
            if (targetDocument)
                targetDocument._etag = void 0;
            freeResources
                .getResources()
                .filter(LDP_1.ResponseMetadata.Factory.is)
                .map(function (responseMetadata) { return responseMetadata.documentsMetadata || responseMetadata[C_1.C.documentMetadata]; })
                .map(function (documentsMetadata) { return Array.isArray(documentsMetadata) ? documentsMetadata : [documentsMetadata]; })
                .forEach(function (documentsMetadata) { return documentsMetadata.forEach(function (documentMetadata) {
                if (!documentMetadata)
                    return;
                var relatedDocument = documentMetadata.relatedDocument || documentMetadata[C_1.C.relatedDocument];
                var eTag = documentMetadata.eTag || documentMetadata[C_1.C.eTag];
                if (relatedDocument._etag === void 0)
                    relatedDocument._etag = eTag;
                if (relatedDocument._etag !== eTag)
                    relatedDocument._etag = null;
            }); });
            if (targetDocument && targetETag === targetDocument._etag)
                return [[targetDocument], null];
            var rdfDocuments = rdfNodes
                .filter(RDF.Document.Factory.is);
            var targetDocuments = rdfDocuments
                .filter(function (x) { return targetSet.has(x["@id"]); });
            var documents = new JSONLD.Compacter
                .Class(_this, targetName, queryContext)
                .compactDocuments(rdfDocuments, targetDocuments);
            return [documents, response];
        });
        var _a, _b;
    };
    Class.prototype.executeSelectPatterns = function (uri, requestOptions, queryContext, targetName, selectPatterns) {
        var _this = this;
        var targetVar = queryContext.getVariable(targetName);
        var select = (_a = new tokens_1.SelectToken()
            .addVariable(targetVar)).addPattern.apply(_a, selectPatterns);
        var query = (_b = new tokens_1.QueryToken(select)).addPrologues.apply(_b, queryContext.getPrologues());
        return this
            .executeSELECTQuery(uri, query.toString(), requestOptions)
            .then(function (_a) {
            var results = _a[0], response = _a[1];
            var name = targetVar.toString().slice(1);
            var documents = results
                .bindings
                .map(function (x) { return x[name]; })
                .map(function (x) { return PersistedDocument.Factory.decorate(x, _this); });
            return [documents, response];
        });
        var _a, _b;
    };
    Class.prototype.persistChildDocument = function (parentURI, childObject, slug, requestOptions) {
        if (PersistedDocument.Factory.is(childObject))
            throw new Errors.IllegalArgumentError("The child provided has been already persisted.");
        var childDocument = Document_1.Document.is(childObject) ? childObject : Document_1.Document.createFrom(childObject);
        this.setDefaultRequestOptions(requestOptions, LDP_2.LDP.Container);
        return this.persistDocument(parentURI, slug, childDocument, requestOptions);
    };
    Class.prototype.persistAccessPoint = function (documentURI, accessPoint, slug, requestOptions) {
        if (PersistedDocument.Factory.is(accessPoint))
            throw new Errors.IllegalArgumentError("The access-point provided has been already persisted.");
        var accessPointDocument = AccessPoint_1.AccessPoint.is(accessPoint) ?
            accessPoint : AccessPoint_1.AccessPoint.createFrom(accessPoint, this.getPointer(documentURI), accessPoint.hasMemberRelation, accessPoint.isMemberOfRelation);
        if (accessPointDocument.membershipResource.id !== documentURI)
            throw new Errors.IllegalArgumentError("The documentURI must be the same as the accessPoint's membershipResource.");
        this.setDefaultRequestOptions(requestOptions, LDP_2.LDP.RDFSource);
        return this.persistDocument(documentURI, slug, accessPointDocument, requestOptions);
    };
    Class.prototype.persistDocument = function (parentURI, slug, document, requestOptions) {
        var _this = this;
        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
        if (document.id) {
            var childURI = document.id;
            if (!!this.context)
                childURI = this.context.resolve(childURI);
            if (!RDF.URI.Util.isBaseOf(parentURI, childURI)) {
                return Promise.reject(new Errors.IllegalArgumentError("The document's URI is not relative to the parentURI specified"));
            }
        }
        if (document["__CarbonSDK_InProgressOfPersisting"])
            return Promise.reject(new Errors.IllegalArgumentError("The document is already being persisted."));
        Object.defineProperty(document, "__CarbonSDK_InProgressOfPersisting", { configurable: true, enumerable: false, writable: false, value: true });
        var body = JSON.stringify(document.toJSON(this, this.jsonldConverter));
        if (!!slug)
            HTTP.Request.Util.setSlug(slug, requestOptions);
        return this.sendRequest(HTTP.Method.POST, parentURI, requestOptions, body).then(function (response) {
            delete document["__CarbonSDK_InProgressOfPersisting"];
            var locationHeader = response.getHeader("Location");
            if (locationHeader === null || locationHeader.values.length < 1)
                throw new HTTP.Errors.BadResponseError("The response is missing a Location header.", response);
            if (locationHeader.values.length !== 1)
                throw new HTTP.Errors.BadResponseError("The response contains more than one Location header.", response);
            var localID = _this.getPointerID(locationHeader.values[0].toString());
            _this.pointers.set(localID, _this.createPointerFrom(document, localID));
            var persistedDocument = PersistedProtectedDocument.Factory.decorate(document, _this);
            persistedDocument.getFragments().forEach(PersistedFragment.Factory.decorate);
            return _this.applyResponseData(persistedDocument, response);
        }, this._parseErrorResponse.bind(this)).catch(function (error) {
            delete document["__CarbonSDK_InProgressOfPersisting"];
            return Promise.reject(error);
        });
    };
    Class.prototype.getRDFDocument = function (requestURL, rdfDocuments, response) {
        rdfDocuments = rdfDocuments.filter(function (rdfDocument) { return rdfDocument["@id"] === requestURL; });
        if (rdfDocuments.length > 1)
            throw new HTTP.Errors.BadResponseError("Several documents share the same id.", response);
        return rdfDocuments.length > 0 ? rdfDocuments[0] : null;
    };
    Class.prototype.getPointerID = function (uri) {
        if (RDF.URI.Util.isBNodeID(uri))
            throw new Errors.IllegalArgumentError("BNodes cannot be fetched directly.");
        if (!!this.context) {
            uri = ObjectSchema.Util.resolveURI(uri, this.getGeneralSchema());
            if (!RDF.URI.Util.isRelative(uri)) {
                var baseURI = this.context.baseURI;
                if (!RDF.URI.Util.isBaseOf(baseURI, uri))
                    return null;
                return uri.substring(baseURI.length);
            }
            else {
                return uri[0] === "/" ? uri.substr(1) : uri;
            }
        }
        else {
            if (RDF.URI.Util.isPrefixed(uri))
                throw new Errors.IllegalArgumentError("This Documents instance doesn't support prefixed URIs.");
            if (RDF.URI.Util.isRelative(uri))
                throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
            return uri;
        }
    };
    Class.prototype.createPointer = function (localID) {
        return this.createPointerFrom({}, localID);
    };
    Class.prototype.createPointerFrom = function (object, localID) {
        var _this = this;
        var id = !!this.context ? this.context.resolve(localID) : localID;
        var pointer = Pointer_1.Pointer.createFrom(object, id);
        Object.defineProperty(pointer, "resolve", {
            writable: false,
            enumerable: false,
            configurable: true,
            value: function () {
                return _this.get(id);
            },
        });
        return pointer;
    };
    Class.prototype.compact = function (expandedObjectOrObjects, targetObjectOrObjects, pointerLibrary) {
        if (!Utils.isArray(expandedObjectOrObjects))
            return this.compactSingle(expandedObjectOrObjects, targetObjectOrObjects, pointerLibrary);
        var expandedObjects = expandedObjectOrObjects;
        var targetObjects = !!targetObjectOrObjects ? targetObjectOrObjects : [];
        for (var i = 0, length_1 = expandedObjects.length; i < length_1; i++) {
            var expandedObject = expandedObjects[i];
            var targetObject = targetObjects[i] = !!targetObjects[i] ? targetObjects[i] : {};
            this.compactSingle(expandedObject, targetObject, pointerLibrary);
        }
        return targetObjects;
    };
    Class.prototype.compactSingle = function (expandedObject, targetObject, pointerLibrary) {
        var digestedSchema = this.getDigestedObjectSchemaForExpandedObject(expandedObject);
        return this.jsonldConverter.compact(expandedObject, targetObject, digestedSchema, pointerLibrary);
    };
    Class.prototype.getDigestedObjectSchemaForExpandedObject = function (expandedObject) {
        var types = RDF.Node.Util.getTypes(expandedObject);
        return this.getDigestedObjectSchema(types, expandedObject["@id"]);
    };
    Class.prototype.getDigestedObjectSchemaForDocument = function (document) {
        if (PersistedResource.Factory.hasClassProperties(document) && document.isPartial()) {
            var schemas = [document._partialMetadata.schema];
            return this.getProcessedSchema(schemas);
        }
        else {
            var types = document.types || [];
            return this.getDigestedObjectSchema(types, document.id);
        }
    };
    Class.prototype.getDigestedObjectSchema = function (objectTypes, objectID) {
        var _this = this;
        if (!this.context)
            return new ObjectSchema.DigestedObjectSchema();
        if (Utils.isDefined(objectID) &&
            !RDF.URI.Util.hasFragment(objectID) &&
            !RDF.URI.Util.isBNodeID(objectID) &&
            objectTypes.indexOf(Document_1.Document.TYPE) === -1)
            objectTypes = objectTypes.concat(Document_1.Document.TYPE);
        var schemas = objectTypes
            .filter(function (type) { return _this.context.hasObjectSchema(type); })
            .map(function (type) { return _this.context.getObjectSchema(type); });
        return this.getProcessedSchema(schemas);
    };
    Class.prototype.getProcessedSchema = function (objectSchemas) {
        if (objectSchemas === void 0) { objectSchemas = []; }
        objectSchemas.unshift(this.context.getObjectSchema());
        return ObjectSchema.Digester
            .combineDigestedObjectSchemas(objectSchemas);
    };
    Class.prototype.getRequestURI = function (uri) {
        if (RDF.URI.Util.isBNodeID(uri)) {
            throw new Errors.IllegalArgumentError("BNodes cannot be fetched directly.");
        }
        else if (RDF.URI.Util.isPrefixed(uri)) {
            if (!this.context)
                throw new Errors.IllegalArgumentError("This Documents instance doesn't support prefixed URIs.");
            uri = ObjectSchema.Util.resolveURI(uri, this.context.getObjectSchema());
            if (RDF.URI.Util.isPrefixed(uri))
                throw new Errors.IllegalArgumentError("The prefixed URI \"" + uri + "\" could not be resolved.");
        }
        else if (RDF.URI.Util.isRelative(uri)) {
            if (!this.context)
                throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
            uri = this.context.resolve(uri);
        }
        else if (this.context && !RDF.URI.Util.isBaseOf(this.context.baseURI, uri)) {
            throw new Errors.IllegalArgumentError("\"" + uri + "\" isn't a valid URI for this Carbon instance.");
        }
        return uri;
    };
    Class.prototype.setDefaultRequestOptions = function (requestOptions, interactionModel) {
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        if (interactionModel)
            HTTP.Request.Util.setPreferredInteractionModel(interactionModel, requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        return requestOptions;
    };
    Class.prototype.updateFromPreferenceApplied = function (persistedDocument, rdfDocuments, response) {
        var eTag = HTTP.Response.Util.getETag(response);
        if (eTag === null)
            throw new HTTP.Errors.BadResponseError("The response doesn't contain an ETag", response);
        var rdfDocument = this.getRDFDocument(persistedDocument.id, rdfDocuments, response);
        if (rdfDocument === null)
            throw new HTTP.Errors.BadResponseError("No document was returned.", response);
        persistedDocument = this._getPersistedDocument(rdfDocument, response);
        persistedDocument._etag = eTag;
        return [persistedDocument, response];
    };
    Class.prototype._parseMembers = function (pointers) {
        var _this = this;
        return pointers.map(function (pointer) {
            if (Utils.isString(pointer))
                return _this.getPointer(pointer);
            if (Pointer_1.Pointer.is(pointer))
                return pointer;
            throw new Errors.IllegalArgumentError("No Carbon.Pointer or URI provided.");
        });
    };
    Class.prototype.applyResponseData = function (persistedProtectedDocument, response) {
        var _this = this;
        if (response.status === 204 || !response.data)
            return [persistedProtectedDocument, response];
        return new JSONLD.Parser.Class().parse(response.data).then(function (expandedResult) {
            var freeNodes = RDF.Node.Util.getFreeNodes(expandedResult);
            _this.applyNodeMap(freeNodes);
            var preferenceHeader = response.getHeader("Preference-Applied");
            if (preferenceHeader === null || preferenceHeader.toString() !== "return=representation")
                return [persistedProtectedDocument, response];
            var rdfDocuments = RDF.Document.Util.getDocuments(expandedResult);
            return _this.updateFromPreferenceApplied(persistedProtectedDocument, rdfDocuments, response);
        });
    };
    Class.prototype.applyNodeMap = function (freeNodes) {
        if (!freeNodes.length)
            return;
        var freeResources = this._getFreeResources(freeNodes);
        var responseMetadata = freeResources.getResources().find(LDP_1.ResponseMetadata.Factory.is);
        for (var _i = 0, _a = responseMetadata.documentsMetadata; _i < _a.length; _i++) {
            var documentMetadata = _a[_i];
            var document_1 = documentMetadata.relatedDocument;
            for (var _b = 0, _c = documentMetadata.bNodesMap.entries; _b < _c.length; _b++) {
                var _d = _c[_b], entryKey = _d.entryKey, entryValue = _d.entryValue;
                var originalBNode = document_1.getFragment(entryKey.id);
                originalBNode.id = entryValue.id;
                document_1._fragmentsIndex.delete(entryKey.id);
                document_1._fragmentsIndex.set(entryValue.id, originalBNode);
            }
            document_1._syncSavedFragments();
        }
    };
    Class.prototype.sendRequest = function (method, uri, options, body, parser) {
        return HTTP.Request.Service.send(method, uri, body || null, options, parser)
            .catch(this._parseErrorResponse.bind(this));
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=Documents.js.map
