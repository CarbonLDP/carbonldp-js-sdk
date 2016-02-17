/// <reference path="../../typings/typings.d.ts" />
import * as HTTP from "./../HTTP";
import RawResults from "./RawResults";
export declare class Class {
    private static defaultOptions;
    private static resultsParser;
    private static stringParser;
    static executeRawASKQuery(url: string, askQuery: string, options?: HTTP.Request.Options): Promise<[RawResults, HTTP.Response.Class]>;
    static executeRawSELECTQuery(url: string, selectQuery: string, options?: HTTP.Request.Options): Promise<[RawResults, HTTP.Response.Class]>;
    static executeRawCONSTRUCTQuery(url: string, constructQuery: string, options?: HTTP.Request.Options): Promise<[string, HTTP.Response.Class]>;
    static executeRawDESCRIBEQuery(url: string, describeQuery: string, options?: HTTP.Request.Options): Promise<[string, HTTP.Response.Class]>;
}
export default Class;
