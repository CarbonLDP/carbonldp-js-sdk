import { QueryClause } from "sparqler/clauses";
import * as AccessPoint from "./AccessPoint";
import Context from "./Context";
import * as FreeResources from "./FreeResources";
import * as HTTP from "./HTTP";
import * as JSONLD from "./JSONLD";
import * as Messaging from "./Messaging";
import * as ObjectSchema from "./ObjectSchema";
import * as PersistedAccessPoint from "./PersistedAccessPoint";
import * as PersistedDocument from "./PersistedDocument";
import * as PersistedProtectedDocument from "./PersistedProtectedDocument";
import { Pointer, PointerLibrary, PointerValidator } from "./Pointer";
import * as RDF from "./RDF";
import * as SPARQL from "./SPARQL";
import { QueryDocumentBuilder, QueryDocumentsBuilder } from "./SPARQL/QueryDocument";
export declare class Class implements PointerLibrary, PointerValidator, ObjectSchema.Resolver {
    private _jsonldConverter;
    readonly jsonldConverter: JSONLD.Converter.Class;
    private _documentDecorators;
    readonly documentDecorators: Map<string, (object: object, documents?: Class) => object>;
    private context;
    private pointers;
    private documentsBeingResolved;
    constructor(context?: Context);
    inScope(pointer: Pointer): boolean;
    inScope(id: string): boolean;
    hasPointer(id: string): boolean;
    getPointer(id: string): Pointer;
    removePointer(idOrPointer: string | Pointer): boolean;
    get<T extends object>(uri: string, requestOptions?: HTTP.Request.GETOptions, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder.Class) => QueryDocumentBuilder.Class): Promise<[T & PersistedDocument.Class, HTTP.Response.Class]>;
    get<T extends object>(uri: string, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder.Class) => QueryDocumentBuilder.Class): Promise<[T & PersistedDocument.Class, HTTP.Response.Class]>;
    exists(documentURI: string, requestOptions?: HTTP.Request.Options): Promise<[boolean, HTTP.Response.Class]>;
    createChild<T extends object>(parentURI: string, childObject: T, slug?: string, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedProtectedDocument.Class, HTTP.Response.Class]>;
    createChild<T extends object>(parentURI: string, childObject: T, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedProtectedDocument.Class, HTTP.Response.Class]>;
    createChildren<T extends object>(parentURI: string, childrenObjects: T[], slugs?: string[], requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[]]>;
    createChildren<T extends object>(parentURI: string, childrenObjects: T[], requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[]]>;
    createChildAndRetrieve<T extends object>(parentURI: string, childObject: T, slug?: string, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedProtectedDocument.Class, HTTP.Response.Class]>;
    createChildAndRetrieve<T extends object>(parentURI: string, childObject: T, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedProtectedDocument.Class, HTTP.Response.Class]>;
    createChildrenAndRetrieve<T extends object>(parentURI: string, childrenObjects: T[], slugs?: string[], requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[]]>;
    createChildrenAndRetrieve<T extends object>(parentURI: string, childrenObjects: T[], requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[]]>;
    listChildren(parentURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedDocument.Class[], HTTP.Response.Class]>;
    getChildren<T extends object>(parentURI: string, requestOptions: HTTP.Request.Options, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder.Class) => QueryDocumentsBuilder.Class): Promise<[(T & PersistedDocument.Class)[], HTTP.Response.Class]>;
    getChildren<T extends object>(parentURI: string, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder.Class) => QueryDocumentsBuilder.Class): Promise<[(T & PersistedDocument.Class)[], HTTP.Response.Class]>;
    createAccessPoint<T extends object>(documentURI: string, accessPoint: T & AccessPoint.Class, slug?: string, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedAccessPoint.Class, HTTP.Response.Class]>;
    createAccessPoint<T extends object>(documentURI: string, accessPoint: T & AccessPoint.Class, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedAccessPoint.Class, HTTP.Response.Class]>;
    createAccessPoints<T extends object>(documentURI: string, accessPoints: (T & AccessPoint.Class)[], slugs?: string[], requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedAccessPoint.Class)[], HTTP.Response.Class[]]>;
    createAccessPoints<T extends object>(documentURI: string, accessPoints: (T & AccessPoint.Class)[], requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedAccessPoint.Class)[], HTTP.Response.Class[]]>;
    listMembers(uri: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedDocument.Class[], HTTP.Response.Class]>;
    getMembers<T extends object>(uri: string, requestOptions: HTTP.Request.Options, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder.Class) => QueryDocumentsBuilder.Class): Promise<[(T & PersistedDocument.Class)[], HTTP.Response.Class]>;
    getMembers<T extends object>(uri: string, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder.Class) => QueryDocumentsBuilder.Class): Promise<[(T & PersistedDocument.Class)[], HTTP.Response.Class]>;
    addMember(documentURI: string, member: Pointer, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    addMember(documentURI: string, memberURI: string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    addMembers(documentURI: string, members: (Pointer | string)[], requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    removeMember(documentURI: string, member: Pointer, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    removeMember(documentURI: string, memberURI: string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    removeMembers(documentURI: string, members: (Pointer | string)[], requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    removeAllMembers(documentURI: string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    save<T extends object>(persistedDocument: T & PersistedDocument.Class, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedDocument.Class, HTTP.Response.Class]>;
    refresh<T extends object>(persistedDocument: T & PersistedDocument.Class, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedDocument.Class, HTTP.Response.Class]>;
    saveAndRefresh<T extends object>(persistedDocument: T & PersistedDocument.Class, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedDocument.Class, HTTP.Response.Class[]]>;
    delete(documentURI: string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    getDownloadURL(documentURI: string, requestOptions?: HTTP.Request.Options): Promise<string>;
    getGeneralSchema(): ObjectSchema.DigestedObjectSchema;
    hasSchemaFor(object: object, path?: string): boolean;
    getSchemaFor(object: object): ObjectSchema.DigestedObjectSchema;
    executeRawASKQuery(documentURI: string, askQuery: string, requestOptions?: HTTP.Request.Options): Promise<[SPARQL.RawResults.Class, HTTP.Response.Class]>;
    executeASKQuery(documentURI: string, askQuery: string, requestOptions?: HTTP.Request.Options): Promise<[boolean, HTTP.Response.Class]>;
    executeRawSELECTQuery(documentURI: string, selectQuery: string, requestOptions?: HTTP.Request.Options): Promise<[SPARQL.RawResults.Class, HTTP.Response.Class]>;
    executeSELECTQuery<T extends object>(documentURI: string, selectQuery: string, requestOptions?: HTTP.Request.Options): Promise<[SPARQL.SELECTResults.Class<T>, HTTP.Response.Class]>;
    executeRawCONSTRUCTQuery(documentURI: string, constructQuery: string, requestOptions?: HTTP.Request.Options): Promise<[string, HTTP.Response.Class]>;
    executeRawDESCRIBEQuery(documentURI: string, describeQuery: string, requestOptions?: HTTP.Request.Options): Promise<[string, HTTP.Response.Class]>;
    executeUPDATE(documentURI: string, update: string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    sparql(documentURI: string): QueryClause<SPARQL.Builder.ExecuteSelect>;
    on(event: Messaging.Event.CHILD_CREATED, uriPattern: string, onEvent: (message: Messaging.ChildCreated.Class) => void, onError: (error: Error) => void): void;
    on(event: Messaging.Event.ACCESS_POINT_CREATED, uriPattern: string, onEvent: (message: Messaging.AccessPointCreated.Class) => void, onError: (error: Error) => void): void;
    on(event: Messaging.Event.DOCUMENT_CREATED, uriPattern: string, onEvent: (message: Messaging.DocumentCreated.Class) => void, onError: (error: Error) => void): void;
    on(event: Messaging.Event.DOCUMENT_MODIFIED, uriPattern: string, onEvent: (message: Messaging.DocumentModified.Class) => void, onError: (error: Error) => void): void;
    on(event: Messaging.Event.DOCUMENT_DELETED, uriPattern: string, onEvent: (message: Messaging.DocumentDeleted.Class) => void, onError: (error: Error) => void): void;
    on(event: Messaging.Event.MEMBER_ADDED, uriPattern: string, onEvent: (message: Messaging.MemberAdded.Class) => void, onError: (error: Error) => void): void;
    on(event: Messaging.Event.MEMBER_REMOVED, uriPattern: string, onEvent: (message: Messaging.MemberRemoved.Class) => void, onError: (error: Error) => void): void;
    on(event: Messaging.Event | string, uriPattern: string, onEvent: (message: Messaging.Message.Class) => void, onError: (error: Error) => void): void;
    off(event: Messaging.Event.CHILD_CREATED, uriPattern: string, onEvent: (message: Messaging.ChildCreated.Class) => void, onError: (error: Error) => void): void;
    off(event: Messaging.Event.ACCESS_POINT_CREATED, uriPattern: string, onEvent: (message: Messaging.AccessPointCreated.Class) => void, onError: (error: Error) => void): void;
    off(event: Messaging.Event.DOCUMENT_CREATED, uriPattern: string, onEvent: (message: Messaging.DocumentCreated.Class) => void, onError: (error: Error) => void): void;
    off(event: Messaging.Event.DOCUMENT_MODIFIED, uriPattern: string, onEvent: (message: Messaging.DocumentModified.Class) => void, onError: (error: Error) => void): void;
    off(event: Messaging.Event.DOCUMENT_DELETED, uriPattern: string, onEvent: (message: Messaging.DocumentDeleted.Class) => void, onError: (error: Error) => void): void;
    off(event: Messaging.Event.MEMBER_ADDED, uriPattern: string, onEvent: (message: Messaging.MemberAdded.Class) => void, onError: (error: Error) => void): void;
    off(event: Messaging.Event.MEMBER_REMOVED, uriPattern: string, onEvent: (message: Messaging.MemberRemoved.Class) => void, onError: (error: Error) => void): void;
    off(event: Messaging.Event | string, uriPattern: string, onEvent: (message: Messaging.Message.Class) => void, onError: (error: Error) => void): void;
    one(event: Messaging.Event.CHILD_CREATED, uriPattern: string, onEvent: (message: Messaging.ChildCreated.Class) => void, onError: (error: Error) => void): void;
    one(event: Messaging.Event.ACCESS_POINT_CREATED, uriPattern: string, onEvent: (message: Messaging.AccessPointCreated.Class) => void, onError: (error: Error) => void): void;
    one(event: Messaging.Event.DOCUMENT_CREATED, uriPattern: string, onEvent: (message: Messaging.DocumentCreated.Class) => void, onError: (error: Error) => void): void;
    one(event: Messaging.Event.DOCUMENT_MODIFIED, uriPattern: string, onEvent: (message: Messaging.DocumentModified.Class) => void, onError: (error: Error) => void): void;
    one(event: Messaging.Event.DOCUMENT_DELETED, uriPattern: string, onEvent: (message: Messaging.DocumentDeleted.Class) => void, onError: (error: Error) => void): void;
    one(event: Messaging.Event.MEMBER_ADDED, uriPattern: string, onEvent: (message: Messaging.MemberAdded.Class) => void, onError: (error: Error) => void): void;
    one(event: Messaging.Event.MEMBER_REMOVED, uriPattern: string, onEvent: (message: Messaging.MemberRemoved.Class) => void, onError: (error: Error) => void): void;
    one(event: Messaging.Event | string, uriPattern: string, onEvent: (message: Messaging.Message.Class) => void, onError: (error: Error) => void): void;
    onDocumentCreated(uriPattern: string, onEvent: (message: Messaging.DocumentCreated.Class) => void, onError: (error: Error) => void): void;
    onChildCreated(uriPattern: string, onEvent: (message: Messaging.ChildCreated.Class) => void, onError: (error: Error) => void): void;
    onAccessPointCreated(uriPattern: string, onEvent: (message: Messaging.AccessPointCreated.Class) => void, onError: (error: Error) => void): void;
    onDocumentModified(uriPattern: string, onEvent: (message: Messaging.DocumentModified.Class) => void, onError: (error: Error) => void): void;
    onDocumentDeleted(uriPattern: string, onEvent: (message: Messaging.DocumentDeleted.Class) => void, onError: (error: Error) => void): void;
    onMemberAdded(uriPattern: string, onEvent: (message: Messaging.MemberAdded.Class) => void, onError: (error: Error) => void): void;
    onMemberRemoved(uriPattern: string, onEvent: (message: Messaging.MemberRemoved.Class) => void, onError: (error: Error) => void): void;
    _getPersistedDocument<T extends object>(rdfDocument: RDF.Document.Class, response: HTTP.Response.Class): T & PersistedDocument.Class;
    _getFreeResources(nodes: RDF.Node.Class[]): FreeResources.Class;
    _parseErrorResponse<T extends object>(response: HTTP.Response.Class | Error): any;
    private getFullDocument<T>(uri, requestOptions);
    private getPartialDocument<T>(uri, requestOptions, queryBuilderFn?);
    private patchDocument<T>(persistedDocument, requestOptions);
    private refreshFullDocument<T>(persistedDocument, requestOptions);
    private refreshPartialDocument<T>(persistedDocument, requestOptions);
    private executeQueryBuilder<T>(uri, requestOptions, queryContext, targetProperty, queryBuilderFn?);
    private executeConstructPatterns<T>(uri, requestOptions, queryContext, targetName, constructPatterns, targetDocument?);
    private executeSelectPatterns(uri, requestOptions, queryContext, targetName, selectPatterns);
    private persistChildDocument<T>(parentURI, childObject, slug, requestOptions);
    private persistAccessPoint<T>(documentURI, accessPoint, slug, requestOptions);
    private persistDocument<T, W>(parentURI, slug, document, requestOptions);
    private getRDFDocument(requestURL, rdfDocuments, response);
    private getPointerID(uri);
    private createPointer(localID);
    private createPointerFrom<T>(object, localID);
    private compact(expandedObjects, targetObjects, pointerLibrary);
    private compact(expandedObject, targetObject, pointerLibrary);
    private compactSingle(expandedObject, targetObject, pointerLibrary);
    private getDigestedObjectSchemaForExpandedObject(expandedObject);
    private getDigestedObjectSchemaForDocument(document);
    private getDigestedObjectSchema(objectTypes, objectID);
    private getProcessedSchema(objectSchemas?);
    private getRequestURI(uri);
    private setDefaultRequestOptions(requestOptions, interactionModel?);
    private updateFromPreferenceApplied<T>(persistedDocument, rdfDocuments, response);
    private _parseMembers(pointers);
    private applyResponseData<T>(persistedProtectedDocument, response);
    private applyNodeMap(freeNodes);
    private sendRequest(method, uri, options, body?);
    private sendRequest<T>(method, uri, options, body?, parser?);
}
export default Class;
