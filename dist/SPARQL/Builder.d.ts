import { SPARQLER } from "sparqler";
import { FinishClause } from "sparqler/clauses";
import { Documents } from "../Documents";
import { SPARQLRawResults } from "./RawResults";
import { SPARQLSelectResults } from "./SelectResults";
export interface FinishSPARQLSelect extends FinishClause {
    execute<T extends object>(): Promise<SPARQLSelectResults<T>>;
    executeRaw(): Promise<SPARQLRawResults>;
}
export declare class SPARQLBuilder extends SPARQLER<FinishSPARQLSelect> {
    constructor(documents: Documents, entryPoint: string);
}
export default SPARQLBuilder;
