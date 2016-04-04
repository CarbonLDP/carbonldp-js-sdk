import * as HTTP from "./../HTTP";
import * as Pointer from "./../Pointer";
import * as RawResults from "./RawResults";
export declare class Class {
    private static defaultOptions;
    private static resultsParser;
    private static stringParser;
    static executeRawASKQuery(url: string, askQuery: string, options?: HTTP.Request.Options): Promise<[RawResults.Class, HTTP.Response.Class]>;
    static executeASKQuery(url: string, askQuery: string, options?: HTTP.Request.Options): Promise<[boolean, HTTP.Response.Class]>;
    static executeRawSELECTQuery(url: string, selectQuery: string, options?: HTTP.Request.Options): Promise<[RawResults.Class, HTTP.Response.Class]>;
    static executeSELECTQuery(url: string, selectQuery: string, pointerLibrary: Pointer.Library, options?: HTTP.Request.Options): Promise<[any, HTTP.Response.Class]>;
    static executeRawCONSTRUCTQuery(url: string, constructQuery: string, options?: HTTP.Request.Options): Promise<[string, HTTP.Response.Class]>;
    static executeRawDESCRIBEQuery(url: string, describeQuery: string, options?: HTTP.Request.Options): Promise<[string, HTTP.Response.Class]>;
    private static parseRawBindingProperty(rawBindingProperty, pointerLibrary);
}
export default Class;
