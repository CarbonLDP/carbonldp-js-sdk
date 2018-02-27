import * as HTTP from "../HTTP";
import { Response } from "../HTTP/Response";
import { PointerLibrary } from "../Pointer";
import * as RawResults from "./RawResults";
import * as SELECTResults from "./SELECTResults";
export declare class Class {
    private static defaultOptions;
    private static resultsParser;
    private static stringParser;
    static executeRawASKQuery(url: string, askQuery: string, options?: HTTP.Request.Options): Promise<[RawResults.Class, Response]>;
    static executeASKQuery(url: string, askQuery: string, options?: HTTP.Request.Options): Promise<[boolean, Response]>;
    static executeRawSELECTQuery(url: string, selectQuery: string, options?: HTTP.Request.Options): Promise<[RawResults.Class, Response]>;
    static executeSELECTQuery<T>(url: string, selectQuery: string, pointerLibrary: PointerLibrary, options?: HTTP.Request.Options): Promise<[SELECTResults.Class<T>, Response]>;
    static executeRawCONSTRUCTQuery(url: string, constructQuery: string, options?: HTTP.Request.Options): Promise<[string, Response]>;
    static executeRawDESCRIBEQuery(url: string, describeQuery: string, options?: HTTP.Request.Options): Promise<[string, Response]>;
    static executeUPDATE(url: string, updateQuery: string, options?: HTTP.Request.Options): Promise<Response>;
    private static parseRawBindingProperty(rawBindingProperty, pointerLibrary);
}
export default Class;
