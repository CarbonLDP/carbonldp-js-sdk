import { SPARQLER } from "sparqler";
import { FinishClause } from "sparqler/clauses";
import { SPARQLDocumentsRepositoryTrait } from "../DocumentsRepository/Traits/SPARQLDocumentsRepositoryTrait";
import { SPARQLSelectResults } from "./SelectResults";
export interface FinishSPARQLSelect extends FinishClause {
    execute<T extends object>(): Promise<SPARQLSelectResults<T>>;
}
export declare class SPARQLBuilder extends SPARQLER<FinishSPARQLSelect> {
    constructor(resource: SPARQLDocumentsRepositoryTrait, entryPoint: string);
}
