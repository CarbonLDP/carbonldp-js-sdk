import { Path, PathBuilder } from "sparqler/patterns";

import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { QueryContainer } from "./QueryContainer";
import { QueryProperty2 } from "./QueryProperty2";


export interface QueryPropertyData {
	queryContainer:QueryContainer;
	parent?:QueryProperty2;

	name:string;

	definition:DigestedObjectSchemaProperty;
	pathBuilderFn?:( pathBuilder:PathBuilder ) => Path;
}
