import { QueryClause } from "sparqler/clauses";
import { RequestOptions } from "../HTTP";
import { FinishSPARQLSelect, SPARQLRawResults, SPARQLSelectResults } from "../SPARQL";
import { PickSelfProps } from "../Utils";
import { TransientDocument } from "./TransientDocument";
export interface SPARQLDocument extends TransientDocument {
    executeRawASKQuery(uri: string, askQuery: string, requestOptions?: RequestOptions): Promise<SPARQLRawResults>;
    executeRawASKQuery(askQuery: string, requestOptions?: RequestOptions): Promise<SPARQLRawResults>;
    executeASKQuery(uri: string, askQuery: string, requestOptions?: RequestOptions): Promise<boolean>;
    executeASKQuery(askQuery: string, requestOptions?: RequestOptions): Promise<boolean>;
    executeRawSELECTQuery(uri: string, selectQuery: string, requestOptions?: RequestOptions): Promise<SPARQLRawResults>;
    executeRawSELECTQuery(selectQuery: string, requestOptions?: RequestOptions): Promise<SPARQLRawResults>;
    executeSELECTQuery<T extends object>(uri: string, selectQuery: string, requestOptions?: RequestOptions): Promise<SPARQLSelectResults<T>>;
    executeSELECTQuery<T extends object>(selectQuery: string, requestOptions?: RequestOptions): Promise<SPARQLSelectResults<T>>;
    executeRawCONSTRUCTQuery(uri: string, constructQuery: string, requestOptions?: RequestOptions): Promise<string>;
    executeRawCONSTRUCTQuery(constructQuery: string, requestOptions?: RequestOptions): Promise<string>;
    executeRawDESCRIBEQuery(uri: string, describeQuery: string, requestOptions?: RequestOptions): Promise<string>;
    executeRawDESCRIBEQuery(describeQuery: string, requestOptions?: RequestOptions): Promise<string>;
    executeUPDATE(uri: string, update: string, requestOptions?: RequestOptions): Promise<void>;
    executeUPDATE(update: string, requestOptions?: RequestOptions): Promise<void>;
    sparql(uri?: string): QueryClause<FinishSPARQLSelect>;
}
export interface SPARQLDocumentFactory {
    PROTOTYPE: PickSelfProps<SPARQLDocument, TransientDocument>;
    isDecorated(object: object): object is SPARQLDocument;
    decorate<T extends object>(object: T): T & SPARQLDocument;
}
export declare const SPARQLDocument: SPARQLDocumentFactory;
