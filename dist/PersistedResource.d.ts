export interface Class {
    _snapshot: Object;
    _syncSnapshot: () => void;
    isDirty(): boolean;
    revert(): void;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static decorate<T extends Object>(object: T, snapshot?: Object): T & Class;
}
export default Class;
