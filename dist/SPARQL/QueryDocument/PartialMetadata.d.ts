import { DigestedObjectSchema } from "../../ObjectSchema";
export declare class PartialMetadata {
    static readonly ALL: Readonly<DigestedObjectSchema>;
    readonly schema: DigestedObjectSchema;
    constructor(schema: DigestedObjectSchema, previousPartial?: PartialMetadata);
    private mergeSchemas(oldSchema, newSchema);
}
export default PartialMetadata;
