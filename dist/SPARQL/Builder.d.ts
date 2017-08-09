import Documents from "./../Documents";
import SELECTResults from "./SELECTResults";
import RawResults from "./RawResults";
import HTTPResponse from "./../HTTP/Response";
import SPARQLER from "sparqler";
declare module "sparqler/Clauses" {
    interface FinishSelect {
        execute<T>(): Promise<[SELECTResults<T>, HTTPResponse]>;
        executeRaw(): Promise<[RawResults, HTTPResponse]>;
    }
}
declare module "sparqler/SPARQLER" {
    interface SPARQLER {
        _documents: Documents;
        _entryPoint: string;
    }
}
export { SPARQLER as Class };
export default SPARQLER;
