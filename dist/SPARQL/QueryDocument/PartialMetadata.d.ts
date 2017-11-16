import { DigestedObjectSchema } from "../../ObjectSchema";
import { OptionalToken } from "sparqler/tokens";
export declare class Class {
    readonly schema: DigestedObjectSchema;
    readonly query: OptionalToken[];
    constructor(schema: DigestedObjectSchema, query: OptionalToken[], partialData?: Class);
    private mergeSchemas(oldSchema, newSchema);
    private mergeQueries(oldQuery, newQuery);
}
export default Class;
