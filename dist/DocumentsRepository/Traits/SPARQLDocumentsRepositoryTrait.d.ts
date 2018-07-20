import { QueryClause } from "sparqler/clauses";
import { DocumentsContext } from "../../Context/DocumentsContext";
import { Document } from "../../Document/Document";
import { GeneralRepository } from "../../GeneralRepository/GeneralRepository";
import { RequestOptions } from "../../HTTP/Request";
import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";
import { SPARQLSelectResults } from "../../SPARQL/SelectResults";
import { FinishSPARQLSelect } from "../../SPARQL/SPARQLBuilder";
import { BaseDocumentsRepository } from "../BaseDocumentsRepository";
import { HTTPRepositoryTrait } from "./HTTPRepositoryTrait";
export interface SPARQLDocumentsRepositoryTrait extends GeneralRepository<Document> {
    context: DocumentsContext;
    executeASKQuery(uri: string, askQuery: string, requestOptions?: RequestOptions): Promise<boolean>;
    executeSELECTQuery<T extends object>(uri: string, selectQuery: string, requestOptions?: RequestOptions): Promise<SPARQLSelectResults<T>>;
    executeUPDATE(uri: string, update: string, requestOptions?: RequestOptions): Promise<void>;
    sparql(uri: string): QueryClause<FinishSPARQLSelect>;
}
export declare type SPARQLDocumentsRepositoryTraitFactory = ModelPrototype<SPARQLDocumentsRepositoryTrait, HTTPRepositoryTrait> & ModelDecorator<SPARQLDocumentsRepositoryTrait, BaseDocumentsRepository>;
export declare const SPARQLDocumentsRepositoryTrait: SPARQLDocumentsRepositoryTraitFactory;
