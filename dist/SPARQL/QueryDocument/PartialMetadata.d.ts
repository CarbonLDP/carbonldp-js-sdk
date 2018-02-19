import { DigestedObjectSchema } from "../../ObjectSchema";
export declare const ALL: Readonly<DigestedObjectSchema>;
export declare class Class {
    readonly schema: DigestedObjectSchema;
    constructor(schema: DigestedObjectSchema, previousPartial?: Class);
    private mergeSchemas(oldSchema, newSchema);
}
export default Class;
