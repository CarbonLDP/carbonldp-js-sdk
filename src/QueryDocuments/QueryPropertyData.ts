import { Path, PathBuilder } from "sparqler/patterns";
import { IRIToken, LiteralToken } from "sparqler/tokens";

import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { QueryContainer } from "./QueryContainer";
import { QueryProperty } from "./QueryProperty";
import { QueryPropertyType } from "./QueryPropertyType";


/**
 * Base data to create a {@link QueryProperty}.
 */
export interface QueryPropertyData {
	queryContainer:QueryContainer;
	parent?:QueryProperty;

	name:string;
	definition:DigestedObjectSchemaProperty;
	pathBuilderFn?:( pathBuilder:PathBuilder ) => Path;

	propertyType?:QueryPropertyType;
	optional:boolean;

	values?:(IRIToken | LiteralToken)[];
}
