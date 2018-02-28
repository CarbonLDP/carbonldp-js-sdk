import { RequestOptions } from "../HTTP/Request";
import { Response } from "../HTTP/Response";
import { PointerLibrary } from "../Pointer";
import { SPARQLRawResults } from "./RawResults";
import { SPARQLSelectResults } from "./SelectResults";
export declare class SPARQLService {
    private static DEFAULT_OPTIONS;
    private static RESULTS_PARSER;
    private static STRING_PARSER;
    static executeRawASKQuery(url: string, askQuery: string, options?: RequestOptions): Promise<[SPARQLRawResults, Response]>;
    static executeASKQuery(url: string, askQuery: string, options?: RequestOptions): Promise<[boolean, Response]>;
    static executeRawSELECTQuery(url: string, selectQuery: string, options?: RequestOptions): Promise<[SPARQLRawResults, Response]>;
    static executeSELECTQuery<T>(url: string, selectQuery: string, pointerLibrary: PointerLibrary, options?: RequestOptions): Promise<[SPARQLSelectResults<T>, Response]>;
    static executeRawCONSTRUCTQuery(url: string, constructQuery: string, options?: RequestOptions): Promise<[string, Response]>;
    static executeRawDESCRIBEQuery(url: string, describeQuery: string, options?: RequestOptions): Promise<[string, Response]>;
    static executeUPDATE(url: string, updateQuery: string, options?: RequestOptions): Promise<Response>;
    private static parseRawBindingProperty(rawBindingProperty, pointerLibrary);
}
export default SPARQLService;
