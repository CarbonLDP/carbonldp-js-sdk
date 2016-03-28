import * as Document from "./../Document";
import * as HTTP from "./../HTTP";
import * as PersistedDocument from "./../PersistedDocument";
import * as Pointer from "./../Pointer";
export interface Class extends PersistedDocument.Class {
    createChild(slug: string, blob: Blob): Promise<[Pointer.Class, HTTP.Response.Class]>;
    createChild(blob: Blob): Promise<[Pointer.Class, HTTP.Response.Class]>;
    createChild(slug: string, object: Object): Promise<[Pointer.Class, HTTP.Response.Class]>;
    createChild(object: Object): Promise<[Pointer.Class, HTTP.Response.Class]>;
}
export declare class Factory {
    static hasClassProperties(document: Document.Class): boolean;
    static decorate<T extends PersistedDocument.Class>(persistedDocument: T): T & Class;
}
