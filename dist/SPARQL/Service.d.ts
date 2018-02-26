import * as HTTP from "../HTTP";
import { PointerLibrary } from "./../Pointer";
import * as RawResults from "./RawResults";
import * as SELECTResults from "./SELECTResults";
export declare class Class {
    private static defaultOptions;
    private static resultsParser;
    private static stringParser;
    static executeRawASKQuery(url: string, askQuery: string, options?: HTTP.Request.Options): Promise<[RawResults.Class, HTTP.Response.Class]>;
    static executeASKQuery(url: string, askQuery: string, options?: HTTP.Request.Options): Promise<[boolean, HTTP.Response.Class]>;
    static executeRawSELECTQuery(url: string, selectQuery: string, options?: HTTP.Request.Options): Promise<[RawResults.Class, HTTP.Response.Class]>;
    static executeSELECTQuery<T>(url: string, selectQuery: string, pointerLibrary: PointerLibrary, options?: HTTP.Request.Options): Promise<[SELECTResults.Class<T>, HTTP.Response.Class]>;
    static executeRawCONSTRUCTQuery(url: string, constructQuery: string, options?: HTTP.Request.Options): Promise<[string, HTTP.Response.Class]>;
    static executeRawDESCRIBEQuery(url: string, describeQuery: string, options?: HTTP.Request.Options): Promise<[string, HTTP.Response.Class]>;
    static executeUPDATE(url: string, updateQuery: string, options?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    private static parseRawBindingProperty(rawBindingProperty, pointerLibrary);
}
export default Class;
