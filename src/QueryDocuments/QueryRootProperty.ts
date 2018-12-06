import { PatternToken } from "sparqler/tokens";

import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { QueryProperty } from "./QueryProperty";
import { QueryPropertyType } from "./QueryPropertyType";
import { QueryRootPropertyData } from "./QueryRootPropertyData";


/**
 * Property that represents the target resource of single fetch query.
 */
export class QueryRootProperty extends QueryProperty {

	constructor( data:QueryRootPropertyData ) {
		super( {
			queryContainer: data.queryContainer,
			name: "document",

			definition: new DigestedObjectSchemaProperty(),

			optional: false,
			propertyType: QueryPropertyType.PARTIAL,

			values: data.values,
		} );
	}

	protected __createSelfPattern():PatternToken | undefined {
		return;
	}

}
