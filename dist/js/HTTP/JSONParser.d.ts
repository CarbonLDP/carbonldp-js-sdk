/// <reference path="../../typings/typings.d.ts" />
import Parser from "./Parser";
export declare class Class implements Parser<Object> {
    parse(body: string): Promise<Object>;
}
export default Class;
