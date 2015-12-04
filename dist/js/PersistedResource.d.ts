/// <reference path="../typings/es6/es6.d.ts" />
import * as RDF from "./RDF";
export declare class Modifications {
    add: Map<string, RDF.Value.Class[]>;
    set: Map<string, RDF.Value.Class[]>;
    delete: Map<string, RDF.Value.Class[]>;
    constructor();
}
export declare enum ModificationType {
    ADD = 0,
    SET = 1,
    DELETE = 2,
}
export interface Class {
    _dirty: boolean;
    _modifications: Modifications;
    isDirty(): boolean;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static from<T extends RDF.Resource.Class>(object: T): T & Class;
    static from<T extends RDF.Resource.Class>(objects: T[]): (T & Class)[];
    private static singleFrom<T>(object);
    private static injectBehavior<T>(persistedResource);
}
export default Class;
