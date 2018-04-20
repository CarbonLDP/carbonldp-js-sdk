import { QueryClause } from "sparqler/clauses";
import { AccessPointBase } from "./TransientAccessPoint";
import { Context } from "./Context";
import { FreeResources } from "./FreeResources";
import { GETOptions, RequestOptions } from "./HTTP/Request";
import { Response } from "./HTTP/Response";
import { JSONLDConverter } from "./JSONLD/Converter";
import { AccessPointCreated } from "./Messaging/AccessPointCreated";
import { ChildCreated } from "./Messaging/ChildCreated";
import { DocumentCreated } from "./Messaging/DocumentCreated";
import { DocumentDeleted } from "./Messaging/DocumentDeleted";
import { DocumentModified } from "./Messaging/DocumentModified";
import { Event } from "./Messaging/Event";
import { EventMessage } from "./Messaging/EventMessage";
import { MemberAdded } from "./Messaging/MemberAdded";
import { MemberRemoved } from "./Messaging/MemberRemoved";
import { DigestedObjectSchema, ObjectSchemaResolver } from "./ObjectSchema";
import { AccessPoint } from "./AccessPoint";
import { Document } from "./Document";
import { ProtectedDocument } from "./ProtectedDocument";
import { Pointer, PointerLibrary, PointerValidator } from "./Pointer";
import { RDFDocument } from "./RDF/Document";
import { RDFNode } from "./RDF/Node";
import { FinishSPARQLSelect } from "./SPARQL/Builder";
import { QueryDocumentBuilder } from "./SPARQL/QueryDocument/QueryDocumentBuilder";
import { QueryDocumentsBuilder } from "./SPARQL/QueryDocument/QueryDocumentsBuilder";
import { SPARQLRawResults } from "./SPARQL/RawResults";
import { SPARQLSelectResults } from "./SPARQL/SelectResults";
export declare class Documents implements PointerLibrary, PointerValidator, ObjectSchemaResolver {
    private _jsonldConverter;
    readonly jsonldConverter: JSONLDConverter;
    private _documentDecorators;
    readonly documentDecorators: Map<string, (object: object, documents?: Documents) => object>;
    private context;
    private pointers;
    private documentsBeingResolved;
    constructor(context?: Context);
    inScope(pointer: Pointer): boolean;
    inScope(id: string): boolean;
    hasPointer(id: string): boolean;
    getPointer(id: string): Pointer;
    removePointer(idOrPointer: string | Pointer): boolean;
    register<T extends object>(id: string): T & Document;
    get<T extends object>(uri: string, requestOptions?: GETOptions, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & Document>;
    get<T extends object>(uri: string, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & Document>;
    exists(documentURI: string, requestOptions?: RequestOptions): Promise<boolean>;
    createChild<T extends object>(parentURI: string, childObject: T, slug?: string, requestOptions?: RequestOptions): Promise<T & ProtectedDocument>;
    createChild<T extends object>(parentURI: string, childObject: T, requestOptions?: RequestOptions): Promise<T & ProtectedDocument>;
    createChildren<T extends object>(parentURI: string, childrenObjects: T[], slugs?: string[], requestOptions?: RequestOptions): Promise<(T & ProtectedDocument)[]>;
    createChildren<T extends object>(parentURI: string, childrenObjects: T[], requestOptions?: RequestOptions): Promise<(T & ProtectedDocument)[]>;
    createChildAndRetrieve<T extends object>(parentURI: string, childObject: T, slug?: string, requestOptions?: RequestOptions): Promise<T & ProtectedDocument>;
    createChildAndRetrieve<T extends object>(parentURI: string, childObject: T, requestOptions?: RequestOptions): Promise<T & ProtectedDocument>;
    createChildrenAndRetrieve<T extends object>(parentURI: string, childrenObjects: T[], slugs?: string[], requestOptions?: RequestOptions): Promise<(T & ProtectedDocument)[]>;
    createChildrenAndRetrieve<T extends object>(parentURI: string, childrenObjects: T[], requestOptions?: RequestOptions): Promise<(T & ProtectedDocument)[]>;
    listChildren<T extends object>(parentURI: string, requestOptions?: RequestOptions): Promise<(T & Document)[]>;
    getChildren<T extends object>(parentURI: string, requestOptions: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & Document)[]>;
    getChildren<T extends object>(parentURI: string, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & Document)[]>;
    createAccessPoint<T extends object>(documentURI: string, accessPoint: T & AccessPointBase, slug?: string, requestOptions?: RequestOptions): Promise<T & AccessPoint>;
    createAccessPoint<T extends object>(documentURI: string, accessPoint: T & AccessPointBase, requestOptions?: RequestOptions): Promise<T & AccessPoint>;
    createAccessPoints<T extends object>(documentURI: string, accessPoints: (T & AccessPointBase)[], slugs?: string[], requestOptions?: RequestOptions): Promise<(T & AccessPoint)[]>;
    createAccessPoints<T extends object>(documentURI: string, accessPoints: (T & AccessPointBase)[], requestOptions?: RequestOptions): Promise<(T & AccessPoint)[]>;
    listMembers<T extends object>(uri: string, requestOptions?: RequestOptions): Promise<(T & Document)[]>;
    getMembers<T extends object>(uri: string, requestOptions: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & Document)[]>;
    getMembers<T extends object>(uri: string, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & Document)[]>;
    addMember(documentURI: string, member: Pointer, requestOptions?: RequestOptions): Promise<void>;
    addMember(documentURI: string, memberURI: string, requestOptions?: RequestOptions): Promise<void>;
    addMembers(documentURI: string, members: (Pointer | string)[], requestOptions?: RequestOptions): Promise<void>;
    removeMember(documentURI: string, member: Pointer, requestOptions?: RequestOptions): Promise<void>;
    removeMember(documentURI: string, memberURI: string, requestOptions?: RequestOptions): Promise<void>;
    removeMembers(documentURI: string, members: (Pointer | string)[], requestOptions?: RequestOptions): Promise<void>;
    removeAllMembers(documentURI: string, requestOptions?: RequestOptions): Promise<void>;
    save<T extends object>(persistedDocument: T & Document, requestOptions?: RequestOptions): Promise<T & Document>;
    refresh<T extends object>(persistedDocument: T & Document, requestOptions?: RequestOptions): Promise<T & Document>;
    saveAndRefresh<T extends object>(persistedDocument: T & Document, requestOptions?: RequestOptions): Promise<T & Document>;
    delete(documentURI: string, requestOptions?: RequestOptions): Promise<void>;
    getGeneralSchema(): DigestedObjectSchema;
    hasSchemaFor(object: object, path?: string): boolean;
    getSchemaFor(object: object): DigestedObjectSchema;
    executeRawASKQuery(documentURI: string, askQuery: string, requestOptions?: RequestOptions): Promise<SPARQLRawResults>;
    executeASKQuery(documentURI: string, askQuery: string, requestOptions?: RequestOptions): Promise<boolean>;
    executeRawSELECTQuery(documentURI: string, selectQuery: string, requestOptions?: RequestOptions): Promise<SPARQLRawResults>;
    executeSELECTQuery<T extends object>(documentURI: string, selectQuery: string, requestOptions?: RequestOptions): Promise<SPARQLSelectResults<T>>;
    executeRawCONSTRUCTQuery(documentURI: string, constructQuery: string, requestOptions?: RequestOptions): Promise<string>;
    executeRawDESCRIBEQuery(documentURI: string, describeQuery: string, requestOptions?: RequestOptions): Promise<string>;
    executeUPDATE(documentURI: string, update: string, requestOptions?: RequestOptions): Promise<void>;
    sparql(documentURI: string): QueryClause<FinishSPARQLSelect>;
    on(event: Event.CHILD_CREATED, uriPattern: string, onEvent: (message: ChildCreated) => void, onError: (error: Error) => void): void;
    on(event: Event.ACCESS_POINT_CREATED, uriPattern: string, onEvent: (message: AccessPointCreated) => void, onError: (error: Error) => void): void;
    on(event: Event.DOCUMENT_CREATED, uriPattern: string, onEvent: (message: DocumentCreated) => void, onError: (error: Error) => void): void;
    on(event: Event.DOCUMENT_MODIFIED, uriPattern: string, onEvent: (message: DocumentModified) => void, onError: (error: Error) => void): void;
    on(event: Event.DOCUMENT_DELETED, uriPattern: string, onEvent: (message: DocumentDeleted) => void, onError: (error: Error) => void): void;
    on(event: Event.MEMBER_ADDED, uriPattern: string, onEvent: (message: MemberAdded) => void, onError: (error: Error) => void): void;
    on(event: Event.MEMBER_REMOVED, uriPattern: string, onEvent: (message: MemberRemoved) => void, onError: (error: Error) => void): void;
    on(event: Event | string, uriPattern: string, onEvent: (message: EventMessage) => void, onError: (error: Error) => void): void;
    off(event: Event.CHILD_CREATED, uriPattern: string, onEvent: (message: ChildCreated) => void, onError: (error: Error) => void): void;
    off(event: Event.ACCESS_POINT_CREATED, uriPattern: string, onEvent: (message: AccessPointCreated) => void, onError: (error: Error) => void): void;
    off(event: Event.DOCUMENT_CREATED, uriPattern: string, onEvent: (message: DocumentCreated) => void, onError: (error: Error) => void): void;
    off(event: Event.DOCUMENT_MODIFIED, uriPattern: string, onEvent: (message: DocumentModified) => void, onError: (error: Error) => void): void;
    off(event: Event.DOCUMENT_DELETED, uriPattern: string, onEvent: (message: DocumentDeleted) => void, onError: (error: Error) => void): void;
    off(event: Event.MEMBER_ADDED, uriPattern: string, onEvent: (message: MemberAdded) => void, onError: (error: Error) => void): void;
    off(event: Event.MEMBER_REMOVED, uriPattern: string, onEvent: (message: MemberRemoved) => void, onError: (error: Error) => void): void;
    off(event: Event | string, uriPattern: string, onEvent: (message: EventMessage) => void, onError: (error: Error) => void): void;
    one(event: Event.CHILD_CREATED, uriPattern: string, onEvent: (message: ChildCreated) => void, onError: (error: Error) => void): void;
    one(event: Event.ACCESS_POINT_CREATED, uriPattern: string, onEvent: (message: AccessPointCreated) => void, onError: (error: Error) => void): void;
    one(event: Event.DOCUMENT_CREATED, uriPattern: string, onEvent: (message: DocumentCreated) => void, onError: (error: Error) => void): void;
    one(event: Event.DOCUMENT_MODIFIED, uriPattern: string, onEvent: (message: DocumentModified) => void, onError: (error: Error) => void): void;
    one(event: Event.DOCUMENT_DELETED, uriPattern: string, onEvent: (message: DocumentDeleted) => void, onError: (error: Error) => void): void;
    one(event: Event.MEMBER_ADDED, uriPattern: string, onEvent: (message: MemberAdded) => void, onError: (error: Error) => void): void;
    one(event: Event.MEMBER_REMOVED, uriPattern: string, onEvent: (message: MemberRemoved) => void, onError: (error: Error) => void): void;
    one(event: Event | string, uriPattern: string, onEvent: (message: EventMessage) => void, onError: (error: Error) => void): void;
    onDocumentCreated(uriPattern: string, onEvent: (message: DocumentCreated) => void, onError: (error: Error) => void): void;
    onChildCreated(uriPattern: string, onEvent: (message: ChildCreated) => void, onError: (error: Error) => void): void;
    onAccessPointCreated(uriPattern: string, onEvent: (message: AccessPointCreated) => void, onError: (error: Error) => void): void;
    onDocumentModified(uriPattern: string, onEvent: (message: DocumentModified) => void, onError: (error: Error) => void): void;
    onDocumentDeleted(uriPattern: string, onEvent: (message: DocumentDeleted) => void, onError: (error: Error) => void): void;
    onMemberAdded(uriPattern: string, onEvent: (message: MemberAdded) => void, onError: (error: Error) => void): void;
    onMemberRemoved(uriPattern: string, onEvent: (message: MemberRemoved) => void, onError: (error: Error) => void): void;
    _convertRDFDocument<T extends object>(rdfDocument: RDFDocument, response: Response): T & Document;
    _getFreeResources(nodes: RDFNode[]): FreeResources;
    _parseErrorResponse<T extends object>(response: Response | Error): Promise<never>;
    private _getFullDocument<T>(uri, requestOptions);
    private _getPartialDocument<T>(uri, requestOptions, queryBuilderFn?);
    private _patchDocument<T>(persistedDocument, requestOptions);
    private _refreshFullDocument<T>(persistedDocument, requestOptions);
    private _refreshPartialDocument<T>(persistedDocument, requestOptions);
    private _addRefreshQueryPatterns(queryContext, parentAdder, resource, parentName);
    private _executeChildrenBuilder<T>(uri, requestOptions, queryBuilderFn?);
    private _executeMembersBuilder<T>(uri, requestOptions, queryBuilderFn?);
    private _executeQueryBuilder<T>(uri, requestOptions, queryContext, targetProperty, queryBuilderFn?);
    private _executeConstructPatterns<T>(uri, requestOptions, queryContext, targetName, constructPatterns, targetDocument?);
    private _persistChildDocument<T>(parentURI, childObject, slug, requestOptions);
    private _persistAccessPoint<T>(documentURI, accessPoint, slug, requestOptions);
    private _persistDocument<T, W>(parentURI, slug, document, requestOptions);
    private _getRDFDocument(requestURL, rdfDocuments, response);
    private _getPointerID(uri);
    private _createPointer(localID);
    private _createPointerFrom<T>(object, localID);
    private _compact(expandedObjects, targetObjects, pointerLibrary);
    private _compact(expandedObject, targetObject, pointerLibrary);
    private _compactSingle(expandedObject, targetObject, pointerLibrary);
    private _getDigestedObjectSchemaForExpandedObject(expandedObject);
    private _getDigestedObjectSchemaForDocument(document);
    private _getDigestedObjectSchema(objectTypes, objectID);
    private _getProcessedSchema(objectSchemas?);
    private _getRequestURI(uri);
    private _setDefaultRequestOptions(requestOptions, interactionModel?);
    private _updateFromPreferenceApplied<T>(persistedDocument, rdfDocuments, response);
    private _parseMembers(pointers);
    private _applyResponseData<T>(persistedProtectedDocument, response);
    private _applyNodeMap(freeNodes);
    private _sendRequest(method, uri, options, body?);
    private _sendRequest<T>(method, uri, options, body?, parser?);
}
