import { QueryClause } from "sparqler/clauses";
import { AbstractContext } from "../AbstractContext";
import { RequestOptions } from "../HTTP";
import { RegistryService } from "../Registry";
import { TransientResource } from "../Resource";
import { PickSelfProps } from "../Utils";
import { FinishSPARQLSelect } from "./Builder";
import { SPARQLRawResults } from "./RawResults";
import { SPARQLSelectResults } from "./SelectResults";
export interface SPARQLDocument extends TransientResource {
    _registry: RegistryService<SPARQLDocument, AbstractContext<SPARQLDocument, any> | undefined> | undefined;
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
    PROTOTYPE: PickSelfProps<SPARQLDocument, TransientResource, "_registry">;
    isDecorated(object: object): object is SPARQLDocument;
    decorate<T extends object>(object: T): T & SPARQLDocument;
}
export declare const SPARQLDocument: SPARQLDocumentFactory;
