export interface Class {
    "@id": string;
}
export declare class Factory {
    static is(value: any): boolean;
    static create(uri: string): Class;
}
export declare class Util {
    static areEqual(node1: Class, node2: Class): boolean;
}
