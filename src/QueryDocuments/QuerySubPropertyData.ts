import { Path, PathBuilder } from "sparqler/patterns";

import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { QueryContainer } from "./QueryContainer";
import { QueryContainerType } from "./QueryContainerType";
import { QueryProperty2 } from "./QueryProperty2";
import { QueryPropertyType } from "./QueryPropertyType";


export interface QuerySubPropertyData {
	queryContainer?:QueryContainer;
	parent?:QueryProperty2;

	name:string;
	definition:DigestedObjectSchemaProperty;
	pathBuilderFn?:( pathBuilder:PathBuilder ) => Path;

	propertyType?:QueryPropertyType;
	containerType?:QueryContainerType;

	optional?:boolean;
}
