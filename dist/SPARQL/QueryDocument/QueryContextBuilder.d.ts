import { PatternToken } from "sparqler/tokens";
import * as Context from "../../Context";
import { DigestedObjectSchema, DigestedPropertyDefinition } from "../../ObjectSchema";
import * as QueryContext from "./QueryContext";
import * as QueryProperty from "./QueryProperty";
export declare class Class extends QueryContext.Class {
    private _propertiesMap;
    private _schemas;
    constructor(context?: Context.Class);
    hasProperty(name: string): boolean;
    hasProperties(name: string): boolean;
    addProperty(name: string, pattern?: PatternToken): QueryProperty.Class;
    getProperty(name: string): QueryProperty.Class;
    getProperties(propertyLevel: string): QueryProperty.Class[];
    getInheritTypeDefinition(propertyName: string, propertyURI?: string, existingSchema?: DigestedObjectSchema): DigestedPropertyDefinition;
    getSchemaFor(object: object, path?: string): DigestedObjectSchema;
    private _getTypeSchemas();
}
export default Class;
