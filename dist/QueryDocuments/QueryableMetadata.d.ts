import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
export declare class QueryableMetadata {
    static readonly ALL: Readonly<DigestedObjectSchema>;
    readonly schema: DigestedObjectSchema;
    constructor(schema: DigestedObjectSchema, previousPartial?: QueryableMetadata);
    private __mergeSchemas;
}
