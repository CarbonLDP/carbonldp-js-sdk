export interface Class {
    id: string;
    resolve(): Promise<void>;
}
export interface Library {
    hasPointer(id: string): boolean;
    getPointer(id: string): Class;
}
export declare class Factory {
    is(value: any): boolean;
}
export declare let factory: Factory;
export declare class Util {
    static getIDs(pointers: Class[]): string[];
}
export interface Validator {
    inScope(id: string): boolean;
    inScope(pointer: Class): boolean;
}
export default Class;
