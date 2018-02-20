import { IRIToken, PrefixedNameToken, PrefixToken } from "sparqler/tokens";
import { Context } from "../../Context";
import { DigestedObjectSchema, Resolver } from "../../ObjectSchema";
import * as QueryVariable from "./QueryVariable";
export declare class Class implements Resolver {
    readonly context?: Context;
    private _variablesCounter;
    private _variablesMap;
    private _prefixesMap;
    constructor(context?: Context);
    getVariable(name: string): QueryVariable.Class;
    serializeLiteral(type: string, value: any): string;
    compactIRI(iri: string): IRIToken | PrefixedNameToken;
    getPrologues(): PrefixToken[];
    getGeneralSchema(): DigestedObjectSchema;
    hasSchemaFor(object: object, path?: string): boolean;
    getSchemaFor(object: object, path?: string): DigestedObjectSchema;
}
export default Class;
