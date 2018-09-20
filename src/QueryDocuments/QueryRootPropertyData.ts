import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { QueryContainer } from "./QueryContainer";
import { QueryContainerType } from "./QueryContainerType";


export interface QueryRootPropertyData {
	queryContainer:QueryContainer;

	name:string;

	definition:DigestedObjectSchemaProperty;
	containerType:QueryContainerType;
}
