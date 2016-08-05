import Serializer from "./Literal/Serializer";
import * as Serializers from "./Literal/Serializers";
export interface Class {
    "@type"?: string;
    "@value": string;
}
export declare class Factory {
    static from(value: any): Class;
    static parse(literalValue: string, literalDataType?: string): any;
    static parse(literal: Class): any;
    static is(value: any): boolean;
    static hasType(value: Class, type: string): boolean;
}
export default Class;
export { Serializer, Serializers };
