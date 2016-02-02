/// <reference path="../../typings/tsd.d.ts" />
import Parser from "./../HTTP/Parser";
import Results from "./Results";
export declare class Class implements Parser<Results> {
    parse(input: string): Promise<any>;
}
export default Class;
