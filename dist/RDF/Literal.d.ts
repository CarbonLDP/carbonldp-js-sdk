import * as Serializer from "./Literal/Serializer";
import * as Serializers from "./Literal/Serializers";
export interface RDFLiteral {
    "@type"?: string;
    "@value": string;
    "@language"?: string;
}
export interface RDFLiteralConstant {
    from(value: any): RDFLiteral;
    parse(value: string, type?: string): any;
    parse(literal: RDFLiteral): any;
    is(value: any): value is RDFLiteral;
    hasType(value: RDFLiteral, type: string): boolean;
}
export declare const RDFLiteral: RDFLiteralConstant;
export default RDFLiteral;
export { Serializer, Serializers };
