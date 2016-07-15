import * as Document from "./../Document";
import * as HTTP from "./../HTTP";
import * as PersistedDocument from "./../PersistedDocument";
import * as PersistedRDFSource from "./PersistedRDFSource";
import * as Pointer from "./../Pointer";
import * as RetrievalPreferences from "./../RetrievalPreferences";
export interface Class extends PersistedRDFSource.Class {
    addMember(member: Pointer.Class): Promise<HTTP.Response.Class>;
    addMember(memberURI: string): Promise<HTTP.Response.Class>;
    addMembers(members: (Pointer.Class | string)[]): Promise<HTTP.Response.Class>;
    createChild<T extends Object>(slug: string, object: T): Promise<[T & Document.Class, HTTP.Response.Class]>;
    createChild(slug: string): Promise<[Document.Class, HTTP.Response.Class]>;
    createChild<T extends Object>(object: T): Promise<[T & Document.Class, HTTP.Response.Class]>;
    createChild(): Promise<[Document.Class, HTTP.Response.Class]>;
    createChildAndRetrieve<T extends Object>(slug: string, object: T): Promise<[T & PersistedDocument.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    createChildAndRetrieve(slug: string): Promise<[PersistedDocument.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    createChildAndRetrieve<T extends Object>(object: T): Promise<[T & PersistedDocument.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    createChildAndRetrieve(): Promise<[PersistedDocument.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    listChildren(): Promise<[Pointer.Class[], HTTP.Response.Class]>;
    getChildren(retrievalPreferences?: RetrievalPreferences.Class): Promise<[Pointer.Class[], HTTP.Response.Class]>;
    listMembers(includeNonReadable?: boolean): Promise<[Pointer.Class[], HTTP.Response.Class]>;
    getMembers(includeNonReadable?: boolean, retrievalPreferences?: RetrievalPreferences.Class): Promise<[Pointer.Class[], HTTP.Response.Class]>;
    getMembers(retrievalPreferences?: RetrievalPreferences.Class): Promise<[Pointer.Class[], HTTP.Response.Class]>;
    removeMember(member: Pointer.Class): Promise<HTTP.Response.Class>;
    removeMember(memberURI: string): Promise<HTTP.Response.Class>;
    removeMembers(members: (Pointer.Class | string)[]): Promise<HTTP.Response.Class>;
    removeAllMembers(): Promise<HTTP.Response.Class>;
    upload(slug: string, blob: Blob): Promise<[Pointer.Class, HTTP.Response.Class]>;
    upload(blob: Blob): Promise<[Pointer.Class, HTTP.Response.Class]>;
    upload(slug: string, blob: Buffer): Promise<[Pointer.Class, HTTP.Response.Class]>;
    upload(blob: Buffer): Promise<[Pointer.Class, HTTP.Response.Class]>;
}
export declare class Factory {
    static hasClassProperties(document: Document.Class): boolean;
    static decorate<T extends PersistedDocument.Class>(persistedDocument: T): T & Class;
}
export default Class;
