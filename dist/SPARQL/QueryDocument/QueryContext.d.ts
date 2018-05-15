import { IRIToken, PrefixedNameToken, PrefixToken } from "sparqler/tokens";
import { AbstractContext } from "../../AbstractContext";
import { DigestedObjectSchema, ObjectSchemaResolver } from "../../ObjectSchema";
import { Pointer } from "../../Pointer";
import { QueryVariable } from "./QueryVariable";
export declare class QueryContext implements ObjectSchemaResolver {
    readonly context?: AbstractContext<Pointer, any>;
    private _variablesCounter;
    private _variablesMap;
    private _prefixesMap;
    constructor(context?: AbstractContext<Pointer, any>);
    getVariable(name: string): QueryVariable;
    serializeLiteral(type: string, value: any): string;
    compactIRI(iri: string): IRIToken | PrefixedNameToken;
    getPrologues(): PrefixToken[];
    getGeneralSchema(): DigestedObjectSchema;
    hasSchemaFor(object: object, path?: string): boolean;
    getSchemaFor(object: object, path?: string): DigestedObjectSchema;
}
