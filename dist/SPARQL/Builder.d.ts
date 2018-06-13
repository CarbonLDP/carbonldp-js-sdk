import { SPARQLER } from "sparqler";
import { FinishClause } from "sparqler/clauses";
import { SPARQLDocument } from "./SPARQLDocument";
import { SPARQLRawResults } from "./RawResults";
import { SPARQLSelectResults } from "./SelectResults";
export interface FinishSPARQLSelect extends FinishClause {
    execute<T extends object>(): Promise<SPARQLSelectResults<T>>;
    executeRaw(): Promise<SPARQLRawResults>;
}
export declare class SPARQLBuilder extends SPARQLER<FinishSPARQLSelect> {
    constructor(resource: SPARQLDocument, entryPoint: string);
}
