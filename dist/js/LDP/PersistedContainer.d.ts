import * as PersistedDocument from "./../PersistedDocument";
export interface Class extends PersistedDocument.Class {
    createChild(object: Object): Promise<void>;
}
export declare class Factory {
    decorate<T extends Object>(object: T): T & Class;
}
export declare let factory: Factory;
