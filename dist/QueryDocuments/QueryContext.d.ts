import { IRIToken, PrefixedNameToken, PrefixToken } from "sparqler/tokens";
import { AbstractContext } from "../Context/AbstractContext";
import { Document } from "../Document/Document";
import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { ObjectSchemaResolver } from "../ObjectSchema/ObjectSchemaResolver";
import { QueryVariable } from "./QueryVariable";
export declare class QueryContext implements ObjectSchemaResolver {
    readonly context?: AbstractContext<Document, Document, any>;
    private _variablesCounter;
    private _variablesMap;
    private _prefixesMap;
    constructor(context?: AbstractContext<Document, Document, any>);
    getVariable(name: string): QueryVariable;
    serializeLiteral(type: string, value: any): string;
    compactIRI(iri: string): IRIToken | PrefixedNameToken;
    getPrologues(): PrefixToken[];
    getGeneralSchema(): DigestedObjectSchema;
    hasSchemaFor(object: object, path?: string): boolean;
    getSchemaFor(object: object, path?: string): DigestedObjectSchema;
}
