import { QueryClause } from "sparqler/clauses";
import { AccessPointBase } from "./AccessPoint";
import Context from "./Context";
import { FreeResources } from "./FreeResources";
import * as Request from "./HTTP/Request";
import { Response } from "./HTTP/Response";
import * as JSONLD from "./JSONLD";
import * as Messaging from "./Messaging";
import { DigestedObjectSchema, ObjectSchemaResolver } from "./ObjectSchema";
import * as PersistedAccessPoint from "./PersistedAccessPoint";
import * as PersistedDocument from "./PersistedDocument";
import * as PersistedProtectedDocument from "./PersistedProtectedDocument";
import { Pointer, PointerLibrary, PointerValidator } from "./Pointer";
import * as RDF from "./RDF";
import * as SPARQL from "./SPARQL";
import { QueryDocumentBuilder, QueryDocumentsBuilder } from "./SPARQL/QueryDocument";
export declare class Documents implements PointerLibrary, PointerValidator, ObjectSchemaResolver {
    private _jsonldConverter;
    readonly jsonldConverter: JSONLD.Converter.Class;
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
    get<T extends object>(uri: string, requestOptions?: Request.GETOptions, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder.Class) => QueryDocumentBuilder.Class): Promise<[T & PersistedDocument.Class, Response]>;
    get<T extends object>(uri: string, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder.Class) => QueryDocumentBuilder.Class): Promise<[T & PersistedDocument.Class, Response]>;
    exists(documentURI: string, requestOptions?: Request.Options): Promise<[boolean, Response]>;
    createChild<T extends object>(parentURI: string, childObject: T, slug?: string, requestOptions?: Request.Options): Promise<[T & PersistedProtectedDocument.Class, Response]>;
    createChild<T extends object>(parentURI: string, childObject: T, requestOptions?: Request.Options): Promise<[T & PersistedProtectedDocument.Class, Response]>;
    createChildren<T extends object>(parentURI: string, childrenObjects: T[], slugs?: string[], requestOptions?: Request.Options): Promise<[(T & PersistedProtectedDocument.Class)[], Response[]]>;
    createChildren<T extends object>(parentURI: string, childrenObjects: T[], requestOptions?: Request.Options): Promise<[(T & PersistedProtectedDocument.Class)[], Response[]]>;
    createChildAndRetrieve<T extends object>(parentURI: string, childObject: T, slug?: string, requestOptions?: Request.Options): Promise<[T & PersistedProtectedDocument.Class, Response]>;
    createChildAndRetrieve<T extends object>(parentURI: string, childObject: T, requestOptions?: Request.Options): Promise<[T & PersistedProtectedDocument.Class, Response]>;
    createChildrenAndRetrieve<T extends object>(parentURI: string, childrenObjects: T[], slugs?: string[], requestOptions?: Request.Options): Promise<[(T & PersistedProtectedDocument.Class)[], Response[]]>;
    createChildrenAndRetrieve<T extends object>(parentURI: string, childrenObjects: T[], requestOptions?: Request.Options): Promise<[(T & PersistedProtectedDocument.Class)[], Response[]]>;
    listChildren(parentURI: string, requestOptions?: Request.Options): Promise<[PersistedDocument.Class[], Response]>;
    getChildren<T extends object>(parentURI: string, requestOptions: Request.Options, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder.Class) => QueryDocumentsBuilder.Class): Promise<[(T & PersistedDocument.Class)[], Response]>;
    getChildren<T extends object>(parentURI: string, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder.Class) => QueryDocumentsBuilder.Class): Promise<[(T & PersistedDocument.Class)[], Response]>;
    createAccessPoint<T extends object>(documentURI: string, accessPoint: T & AccessPointBase, slug?: string, requestOptions?: Request.Options): Promise<[T & PersistedAccessPoint.Class, Response]>;
    createAccessPoint<T extends object>(documentURI: string, accessPoint: T & AccessPointBase, requestOptions?: Request.Options): Promise<[T & PersistedAccessPoint.Class, Response]>;
    createAccessPoints<T extends object>(documentURI: string, accessPoints: (T & AccessPointBase)[], slugs?: string[], requestOptions?: Request.Options): Promise<[(T & PersistedAccessPoint.Class)[], Response[]]>;
    createAccessPoints<T extends object>(documentURI: string, accessPoints: (T & AccessPointBase)[], requestOptions?: Request.Options): Promise<[(T & PersistedAccessPoint.Class)[], Response[]]>;
    listMembers(uri: string, requestOptions?: Request.Options): Promise<[PersistedDocument.Class[], Response]>;
    getMembers<T extends object>(uri: string, requestOptions: Request.Options, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder.Class) => QueryDocumentsBuilder.Class): Promise<[(T & PersistedDocument.Class)[], Response]>;
    getMembers<T extends object>(uri: string, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder.Class) => QueryDocumentsBuilder.Class): Promise<[(T & PersistedDocument.Class)[], Response]>;
    addMember(documentURI: string, member: Pointer, requestOptions?: Request.Options): Promise<Response>;
    addMember(documentURI: string, memberURI: string, requestOptions?: Request.Options): Promise<Response>;
    addMembers(documentURI: string, members: (Pointer | string)[], requestOptions?: Request.Options): Promise<Response>;
    removeMember(documentURI: string, member: Pointer, requestOptions?: Request.Options): Promise<Response>;
    removeMember(documentURI: string, memberURI: string, requestOptions?: Request.Options): Promise<Response>;
    removeMembers(documentURI: string, members: (Pointer | string)[], requestOptions?: Request.Options): Promise<Response>;
    removeAllMembers(documentURI: string, requestOptions?: Request.Options): Promise<Response>;
    save<T extends object>(persistedDocument: T & PersistedDocument.Class, requestOptions?: Request.Options): Promise<[T & PersistedDocument.Class, Response]>;
    refresh<T extends object>(persistedDocument: T & PersistedDocument.Class, requestOptions?: Request.Options): Promise<[T & PersistedDocument.Class, Response]>;
    saveAndRefresh<T extends object>(persistedDocument: T & PersistedDocument.Class, requestOptions?: Request.Options): Promise<[T & PersistedDocument.Class, Response[]]>;
    delete(documentURI: string, requestOptions?: Request.Options): Promise<Response>;
    getDownloadURL(documentURI: string, requestOptions?: Request.Options): Promise<string>;
    getGeneralSchema(): DigestedObjectSchema;
    hasSchemaFor(object: object, path?: string): boolean;
    getSchemaFor(object: object): DigestedObjectSchema;
    executeRawASKQuery(documentURI: string, askQuery: string, requestOptions?: Request.Options): Promise<[SPARQL.RawResults.Class, Response]>;
    executeASKQuery(documentURI: string, askQuery: string, requestOptions?: Request.Options): Promise<[boolean, Response]>;
    executeRawSELECTQuery(documentURI: string, selectQuery: string, requestOptions?: Request.Options): Promise<[SPARQL.RawResults.Class, Response]>;
    executeSELECTQuery<T extends object>(documentURI: string, selectQuery: string, requestOptions?: Request.Options): Promise<[SPARQL.SELECTResults.Class<T>, Response]>;
    executeRawCONSTRUCTQuery(documentURI: string, constructQuery: string, requestOptions?: Request.Options): Promise<[string, Response]>;
    executeRawDESCRIBEQuery(documentURI: string, describeQuery: string, requestOptions?: Request.Options): Promise<[string, Response]>;
    executeUPDATE(documentURI: string, update: string, requestOptions?: Request.Options): Promise<Response>;
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
    _getPersistedDocument<T extends object>(rdfDocument: RDF.Document.Class, response: Response): T & PersistedDocument.Class;
    _getFreeResources(nodes: RDF.Node.Class[]): FreeResources;
    _parseErrorResponse<T extends object>(response: Response | Error): any;
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
export default Documents;
