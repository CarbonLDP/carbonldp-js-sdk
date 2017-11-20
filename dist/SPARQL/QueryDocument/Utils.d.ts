import { DigestedPropertyDefinition } from "../../ObjectSchema";
import { OptionalToken } from "sparqler/tokens";
import * as QueryContext from "./QueryContext";
export declare function getLevelRegExp(property: string): RegExp;
export declare function createPropertyPattern(context: QueryContext.Class, resourceName: string, propertyName: string, propertyDefinition: DigestedPropertyDefinition): OptionalToken;
