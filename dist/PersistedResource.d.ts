import * as Resource from "./Resource";
export interface Class extends Resource.Class {
    _snapshot: Resource.Class;
    _syncSnapshot: () => void;
    isDirty(): boolean;
    revert(): void;
}
export declare class Factory {
    static hasClassProperties(object: object): boolean;
    static decorate<T extends Resource.Class>(object: T): T & Class;
}
export default Class;
