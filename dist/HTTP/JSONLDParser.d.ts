/// <reference path="../../typings/typings.d.ts" />
import Parser from "./Parser";
export declare class Class implements Parser<any> {
    parse(input: string): Promise<any>;
    private expandJSON(parsedObject, options?);
}
export default Class;
