import { DigestedObjectSchemaProperty } from "./DigestedObjectSchemaProperty";
export declare class DigestedObjectSchema {
    base: string;
    language: string;
    vocab: string;
    prefixes: Map<string, string>;
    properties: Map<string, DigestedObjectSchemaProperty>;
    constructor();
    resolveURI(uri: string, relativeTo?: {
        vocab?: boolean;
        base?: boolean;
    }): string;
}
