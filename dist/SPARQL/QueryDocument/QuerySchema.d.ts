import { QuerySchemaProperty } from "./QuerySchemaProperty";
export interface QuerySchema {
    [propertyName: string]: QuerySchemaProperty | string;
}
export default QuerySchema;
