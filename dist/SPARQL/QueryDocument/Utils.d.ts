import { DigestedPropertyDefinition } from "../../ObjectSchema";
import { PatternToken } from "sparqler/tokens";
import * as QueryContext from "./QueryContext";
export declare function getLevelRegExp(property: string): RegExp;
export declare function createPropertyPatterns(context: QueryContext.Class, resourceName: string, propertyName: string, propertyDefinition: DigestedPropertyDefinition): PatternToken[];
export declare function createTypePattern(context: QueryContext.Class, resourceName: string): PatternToken;
