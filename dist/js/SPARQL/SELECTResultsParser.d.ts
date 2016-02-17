/// <reference path="../../typings/typings.d.ts" />
import Parser from "./../HTTP/Parser";
import SELECTResults from "./SELECTResults";
export declare class Class implements Parser<SELECTResults> {
    parse(input: string): Promise<any>;
}
export default Class;
