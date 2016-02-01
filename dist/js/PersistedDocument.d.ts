import * as Document from "./Document";
import Documents from "./Documents";
import * as PersistedResource from "./PersistedResource";
import * as Pointer from "./Pointer";
export interface Class extends Pointer.Class, PersistedResource.Class, Document.Class {
    _documents: Documents;
    _etag: string;
    refresh(): Promise<void>;
    save(): Promise<void>;
    destroy(): Promise<void>;
}
export declare class Factory {
    static hasClassProperties(document: Document.Class): boolean;
    static is(object: Object): boolean;
    static create(uri: string, documents: Documents): Class;
    static createFrom<T extends Object>(object: T, uri: string, documents: Documents): Class;
    static decorate<T extends Document.Class>(document: T, documents: Documents): T & Class;
}
export default Class;
