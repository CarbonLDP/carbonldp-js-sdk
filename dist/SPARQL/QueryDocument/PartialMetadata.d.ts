import { DigestedObjectSchema } from "../../ObjectSchema";
export declare class Class {
    readonly schema: DigestedObjectSchema;
    constructor(schema: DigestedObjectSchema, partialData?: Class);
    private mergeSchemas(oldSchema, newSchema);
}
export default Class;
