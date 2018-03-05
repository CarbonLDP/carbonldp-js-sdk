import { RDFValue } from "./Value";
export interface RDFList {
    "@list": RDFValue[];
}
export interface RDFListConstant {
    is(value: any): value is RDFList;
}
export declare const RDFList: RDFListConstant;
export default RDFList;
