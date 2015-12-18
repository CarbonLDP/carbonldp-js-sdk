/// <reference path="../typings/tsd.d.ts" />
import * as HTTP from "./HTTP";
import Context from "./Context";
import * as Document from "./Document";
import * as JSONLDConverter from "./JSONLDConverter";
import * as PersistedDocument from "./PersistedDocument";
import * as Pointer from "./Pointer";
import * as ObjectSchema from "./ObjectSchema";
declare class Documents implements Pointer.Library, Pointer.Validator, ObjectSchema.Resolver {
    _jsonldConverter: JSONLDConverter.Class;
    jsonldConverter: JSONLDConverter.Class;
    private context;
    private pointers;
    constructor(context?: Context);
    inScope(pointer: Pointer.Class): boolean;
    inScope(id: string): boolean;
    hasPointer(id: string): boolean;
    getPointer(id: string): Pointer.Class;
    get(uri: string, requestOptions?: HTTP.Request.Options): Promise<HTTP.ProcessedResponse<PersistedDocument.Class>>;
    createChild(parentURI: string, childDocument: Document.Class, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    save(persistedDocument: PersistedDocument.Class, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    delete(persistedDocument: PersistedDocument.Class, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    getSchemaFor(object: Object): ObjectSchema.DigestedObjectSchema;
    private getRDFDocument(rdfDocuments, response);
    private getPointerID(uri);
    private createPointer(localID);
    private compact(expandedObjects, targetObjects, pointerLibrary);
    private compact(expandedObject, targetObject, pointerLibrary);
    private compactSingle(expandedObject, targetObject, pointerLibrary);
    private getDigestedObjectSchemaForExpandedObject(expandedObject);
    private getDigestedObjectSchemaForDocument(document);
    private getDigestedObjectSchema(objectTypes);
    private getExpandedObjectTypes(expandedObject);
    private getDocumentTypes(document);
}
export default Documents;
