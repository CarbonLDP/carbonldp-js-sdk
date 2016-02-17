import Serializer from "./Literal/Serializer";
import * as Serializers from "./Literal/Serializers";
export interface Class {
    "@type"?: string;
    "@value": string;
}
export declare class Factory {
    static from(value: any): Class;
    static parse(literal: Class): any;
    static is(value: any): boolean;
    static hasType(value: Class, type: string): boolean;
}
export declare class Util {
    static areEqual(literal1: Class, literal2: Class): boolean;
}
export default Class;
export { Serializer, Serializers };
