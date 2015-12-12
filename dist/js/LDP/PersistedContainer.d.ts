import * as PersistedDocument from "./../PersistedDocument";
export interface Class extends PersistedDocument.Class {
    createChild(object: Object): Promise<void>;
}
export declare class Factory {
    create(): Class;
    createFrom<T extends Object>(object: T): T & Class;
    decorate<T extends Object>(object: T): T & Class;
}
export declare let factory: Factory;
