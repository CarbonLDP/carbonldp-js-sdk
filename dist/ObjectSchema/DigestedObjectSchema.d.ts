import { DigestedObjectSchemaProperty } from "./DigestedObjectSchemaProperty";
export declare class DigestedObjectSchema {
    base: string;
    language: string;
    vocab: string;
    prefixes: Map<string, string>;
    properties: Map<string, DigestedObjectSchemaProperty>;
    constructor();
}
