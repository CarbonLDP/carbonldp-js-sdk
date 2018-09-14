import { Path, PathBuilder } from "sparqler/patterns";

import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { QueryContainer } from "./QueryContainer";
import { QueryContainerType } from "./QueryContainerType";
import { QueryProperty } from "./QueryProperty";
import { QueryPropertyType } from "./QueryPropertyType";


export interface QuerySubPropertyData {
	queryContainer?:QueryContainer;
	parent?:QueryProperty;

	definition:DigestedObjectSchemaProperty;
	pathBuilderFn?:( pathBuilder:PathBuilder ) => Path;

	propertyType?:QueryPropertyType;
	containerType?:QueryContainerType;

	optional?:boolean;
}
