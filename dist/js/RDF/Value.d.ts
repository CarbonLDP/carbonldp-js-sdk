export interface Class {
    "@id"?: string;
    "@type"?: string;
    "@value"?: string;
}
export declare class Util {
    static areEqual(value1: Class, value2: Class): boolean;
}
