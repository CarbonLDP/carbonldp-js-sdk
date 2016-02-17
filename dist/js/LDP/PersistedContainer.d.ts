import * as Document from "./../Document";
import * as PersistedDocument from "./../PersistedDocument";
export interface Class extends PersistedDocument.Class {
    createChild(object: Object): Promise<void>;
}
export declare class Factory {
    static hasClassProperties(document: Document.Class): boolean;
    static decorate<T extends PersistedDocument.Class>(persistedDocument: T): T & Class;
}
