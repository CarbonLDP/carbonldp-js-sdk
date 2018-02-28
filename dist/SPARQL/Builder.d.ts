import { SPARQLER } from "sparqler";
import { FinishClause } from "sparqler/clauses";
import { Documents } from "../Documents";
import { Response } from "../HTTP/Response";
import RawResults from "./RawResults";
import SELECTResults from "./SELECTResults";
export interface FinishSPARQLSelect extends FinishClause {
    execute<T extends object>(): Promise<[SELECTResults<T>, Response]>;
    executeRaw(): Promise<[RawResults, Response]>;
}
export declare class SPARQLBuilder extends SPARQLER<FinishSPARQLSelect> {
    constructor(documents: Documents, entryPoint: string);
}
export default SPARQLBuilder;
