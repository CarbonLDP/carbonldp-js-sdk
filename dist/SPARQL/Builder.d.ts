import { SPARQLER } from "sparqler";
import { FinishClause } from "sparqler/clauses";
import { Documents } from "../Documents";
import { Response } from "../HTTP/Response";
import { SPARQLRawResults } from "./RawResults";
import { SPARQLSelectResults } from "./SelectResults";
export interface FinishSPARQLSelect extends FinishClause {
    execute<T extends object>(): Promise<[SPARQLSelectResults<T>, Response]>;
    executeRaw(): Promise<[SPARQLRawResults, Response]>;
}
export declare class SPARQLBuilder extends SPARQLER<FinishSPARQLSelect> {
    constructor(documents: Documents, entryPoint: string);
}
