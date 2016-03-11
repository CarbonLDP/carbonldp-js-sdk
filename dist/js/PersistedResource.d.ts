/// <reference path="../typings/typings.d.ts" />
export interface Class {
    _snapshot: Object;
    _syncSnapshot: () => void;
    isDirty(): boolean;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static decorate<T extends Object>(object: T, snapshot?: Object): T & Class;
}
export default Class;
