import { Path, PathBuilder } from "sparqler/patterns";
import { IRIToken, LiteralToken } from "sparqler/tokens";

import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { QueryContainer } from "./QueryContainer";
import { QueryContainerPropertyType } from "./QueryContainerPropertyType";
import { QueryProperty } from "./QueryProperty";
import { QueryPropertyType } from "./QueryPropertyType";


export interface QueryPropertyData {
	queryContainer:QueryContainer;
	parent?:QueryProperty;

	name:string;
	definition:DigestedObjectSchemaProperty;
	pathBuilderFn?:( pathBuilder:PathBuilder ) => Path;

	propertyType?:QueryPropertyType;
	optional?:boolean;

	values?:(IRIToken | LiteralToken)[];
}
