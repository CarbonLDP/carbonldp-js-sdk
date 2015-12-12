export interface Class {
    uri: string;
    resolve(): Promise<void>;
}
export interface Library {
    hasPointer(id: string): boolean;
    getPointer(id: string): Class;
}
export declare class Factory {
    static is(value: any): boolean;
}
export interface Validator {
    inScope(id: string): boolean;
    inScope(pointer: Class): boolean;
}
export default Class;
