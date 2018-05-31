import { ObjectSchemaProperty } from "./ObjectSchemaProperty";
export interface ObjectSchema {
    "@base"?: string;
    "@vocab"?: string;
    "@index"?: object;
    "@language"?: string;
    "@reverse"?: object;
    [name: string]: (string | ObjectSchemaProperty);
}
