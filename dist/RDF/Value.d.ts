import { PointerLibrary } from "../Pointer";
import { RDFList } from "./List";
import { RDFLiteral } from "./Literal";
import { RDFNode } from "./Node";
export interface RDFValue {
    "@id"?: string;
    "@type"?: string;
    "@value"?: string;
    "@language"?: string;
}
export interface RDFValueConstant {
    parse(pointerLibrary: PointerLibrary, value: RDFLiteral | RDFNode | RDFList | RDFValue | string): any;
}
export declare const RDFValue: RDFValueConstant;
export default RDFValue;
