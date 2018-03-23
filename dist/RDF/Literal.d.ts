import * as Serializers from "./Literal/Serializers";
export * from "./Literal/Serializer";
export { Serializers };
export interface RDFLiteral {
    "@type"?: string;
    "@value": string;
    "@language"?: string;
}
export interface RDFLiteralFactory {
    from(value: any): RDFLiteral;
    parse(value: string, type?: string): any;
    parse(literal: RDFLiteral): any;
    is(value: any): value is RDFLiteral;
    hasType(value: RDFLiteral, type: string): boolean;
}
export declare const RDFLiteral: RDFLiteralFactory;
