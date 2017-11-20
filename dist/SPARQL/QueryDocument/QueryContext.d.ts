import { IRIToken, PrefixedNameToken, PrefixToken } from "sparqler/tokens";
import * as Context from "../../Context";
import { DigestedObjectSchema, Resolver } from "../../ObjectSchema";
import * as QueryVariable from "./QueryVariable";
export declare class Class implements Resolver {
    readonly context?: Context.Class;
    private _variablesCounter;
    private _variablesMap;
    private _prefixesMap;
    constructor(context?: Context.Class);
    getVariable(name: string): QueryVariable.Class;
    serializeLiteral(type: string, value: any): string;
    expandIRI(iri: string): string;
    compactIRI(iri: string): IRIToken | PrefixedNameToken;
    getPrologues(): PrefixToken[];
    getGeneralSchema(): DigestedObjectSchema;
    getSchemaFor(object: Object, path?: string): DigestedObjectSchema;
}
export default Class;
