import Documents from "./../Documents";
import SELECTResults from "./SELECTResults";
import RawResults from "./RawResults";
import HTTPResponse from "./../HTTP/Response";
import { QueryBuilder } from "sparqler";
declare module "sparqler/Clauses" {
    interface FinishSelect {
        execute(): Promise<[SELECTResults, HTTPResponse]>;
        executeRaw(): Promise<[RawResults, HTTPResponse]>;
    }
}
declare module "sparqler/Sparqler" {
    interface QueryBuilder {
        _documents: Documents;
        _entryPoint: string;
    }
}
export default QueryBuilder;
