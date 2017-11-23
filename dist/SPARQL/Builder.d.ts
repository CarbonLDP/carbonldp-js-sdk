import { SPARQLER } from "sparqler";
import { FinishClause } from "sparqler/clauses";
import Documents from "./../Documents";
import HTTPResponse from "./../HTTP/Response";
import RawResults from "./RawResults";
import SELECTResults from "./SELECTResults";
export interface ExecuteSelect extends FinishClause {
    execute<T extends object>(): Promise<[SELECTResults<T>, HTTPResponse]>;
    executeRaw(): Promise<[RawResults, HTTPResponse]>;
}
export declare class Class extends SPARQLER<ExecuteSelect> {
    constructor(documents: Documents, entryPoint: string);
}
export default Class;
