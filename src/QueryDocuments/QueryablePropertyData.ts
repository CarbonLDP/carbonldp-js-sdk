import { Path, PathBuilder } from "sparqler/patterns";

import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { QueryableProperty } from "./QueryableProperty";
import { QueryContainer } from "./QueryContainer";
import { QueryContainerType } from "./QueryContainerType";
import { QueryPropertyType } from "./QueryPropertyType";


export interface QueryablePropertyData {
	queryContainer:QueryContainer;
	parent?:QueryableProperty;

	name:string;
	definition:DigestedObjectSchemaProperty;
	pathBuilderFn?:( pathBuilder:PathBuilder ) => Path;

	propertyType?:QueryPropertyType;
	containerType?:QueryContainerType;

	optional:boolean;
}
