import { PointerLibrary } from "./../Pointer";
export interface Class {
    "@id"?: string;
    "@type"?: string;
    "@value"?: string;
}
export declare class Util {
    static parseValue(propertyValue: Class, pointerLibrary: PointerLibrary): any;
}
export default Class;
