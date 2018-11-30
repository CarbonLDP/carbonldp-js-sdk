import { IRIRefToken } from "sparqler/tokens";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { QueryableProperty } from "./QueryableProperty";
import { QueryPropertyType } from "./QueryPropertyType";


/**
 * Metadata of a resource that can be directly queried.
 */
export class QueryableRootProperty extends QueryableProperty {

	constructor( { uri, propertyType }:{ uri:string, propertyType?:QueryPropertyType } ) {
		super( {
			definition: new DigestedObjectSchemaProperty(),

			propertyType: propertyType,
			optional: false,

			values: [ new IRIRefToken( uri ) ],
		} );
	}

	protected __mergeDefinition( propertyName:string, newDefinition:DigestedObjectSchemaProperty ):void {
		// Definitions does not matter in root
		return;
	}

}
