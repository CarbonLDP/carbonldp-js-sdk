import { Path, PathBuilder } from "sparqler/patterns";

import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { QueryContainer } from "./QueryContainer";
import { QueryProperty } from "./QueryProperty";
import { QueryPropertyType } from "./QueryPropertyType";


/**
 * Base data for create a sub-property with {@link QueryProperty._addSubProperty()}.
 */
export interface QuerySubPropertyData {
	queryContainer?:QueryContainer;
	parent?:QueryProperty;

	definition:DigestedObjectSchemaProperty;
	pathBuilderFn?:( pathBuilder:PathBuilder ) => Path;

	propertyType?:QueryPropertyType;
	optional?:boolean;
}
