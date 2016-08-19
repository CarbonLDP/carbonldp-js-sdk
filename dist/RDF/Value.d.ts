import * as Pointer from "./../Pointer";
export interface Class {
    "@id"?: string;
    "@type"?: string;
    "@value"?: string;
}
export declare class Util {
    static parseValue(propertyValue: Class, pointerLibrary: Pointer.Library): any;
}
export default Class;
