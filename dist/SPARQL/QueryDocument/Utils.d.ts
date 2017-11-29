import { DigestedPropertyDefinition } from "../../ObjectSchema";
import { PatternToken } from "sparqler/tokens";
import * as QueryContext from "./QueryContext";
export declare function getLevelRegExp(property: string): RegExp;
export declare function createPropertyPatterns(context: QueryContext.Class, resourcePath: string, propertyPath: string, propertyDefinition: DigestedPropertyDefinition): PatternToken[];
export declare function createTypesPattern(context: QueryContext.Class, resourcePath: string): PatternToken;
