import { QueryClause } from "sparqler/clauses";
import { SPARQLDocumentsRepositoryTrait } from "../../DocumentsRepository/Traits/SPARQLDocumentsRepositoryTrait";
import { RequestOptions } from "../../HTTP/Request";
import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";
import { ResolvablePointer } from "../../Repository/ResolvablePointer";
import { SPARQLSelectResults } from "../../SPARQL/SelectResults";
import { FinishSPARQLSelect } from "../../SPARQL/SPARQLBuilder";
import { TransientDocument } from "../TransientDocument";
export interface BaseSPARQLDocumentTrait {
    $repository: SPARQLDocumentsRepositoryTrait;
}
export interface SPARQLDocumentTrait extends TransientDocument, ResolvablePointer {
    $repository: SPARQLDocumentsRepositoryTrait;
    $executeASKQuery(uri: string, askQuery: string, requestOptions?: RequestOptions): Promise<boolean>;
    $executeASKQuery(askQuery: string, requestOptions?: RequestOptions): Promise<boolean>;
    $executeSELECTQuery<T extends object>(uri: string, selectQuery: string, requestOptions?: RequestOptions): Promise<SPARQLSelectResults<T>>;
    $executeSELECTQuery<T extends object>(selectQuery: string, requestOptions?: RequestOptions): Promise<SPARQLSelectResults<T>>;
    $executeUPDATE(uri: string, update: string, requestOptions?: RequestOptions): Promise<void>;
    $executeUPDATE(update: string, requestOptions?: RequestOptions): Promise<void>;
    $sparql(uri?: string): QueryClause<FinishSPARQLSelect>;
}
export declare type SPARQLDocumentTraitFactory = ModelPrototype<SPARQLDocumentTrait, TransientDocument & ResolvablePointer> & ModelDecorator<SPARQLDocumentTrait, BaseSPARQLDocumentTrait>;
export declare const SPARQLDocumentTrait: SPARQLDocumentTraitFactory;
