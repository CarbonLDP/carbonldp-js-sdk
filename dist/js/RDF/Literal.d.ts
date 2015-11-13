export interface Class {
    "@type"?: string;
    "@value": string;
}
export declare class Factory {
    static from(value: any): Class;
    static parse(literal: Class): any;
    static is(value: any): boolean;
}
export declare class Util {
    static areEqual(literal1: Class, literal2: Class): boolean;
}
export default Class;
