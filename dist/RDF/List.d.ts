import { RDFValue } from "./Value";
export interface RDFList {
    "@list": RDFValue[];
}
export interface RDFListFactory {
    is(value: any): value is RDFList;
}
export declare const RDFList: RDFListFactory;
