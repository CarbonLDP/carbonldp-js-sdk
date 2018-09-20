import { Path, PathBuilder } from "sparqler/patterns";

import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { QueryContainerType } from "./QueryContainerType";
import { QueryPropertyType } from "./QueryPropertyType";


export interface QueryablePropertyData {
	definition:DigestedObjectSchemaProperty;
	pathBuilderFn?:( pathBuilder:PathBuilder ) => Path;

	propertyType?:QueryPropertyType;
	containerType?:QueryContainerType;

	optional:boolean;
}
