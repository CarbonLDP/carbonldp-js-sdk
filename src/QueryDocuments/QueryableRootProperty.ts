import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { QueryableProperty } from "./QueryableProperty";
import { QueryContainerType } from "./QueryContainerType";
import { QueryPropertyType } from "./QueryPropertyType";


export class QueryableRootProperty extends QueryableProperty {

	constructor( { uri, propertyType }:{ uri:string, propertyType?:QueryPropertyType } ) {
		super( {
			definition: new DigestedObjectSchemaProperty( uri ),

			propertyType: propertyType,
			containerType: QueryContainerType.DOCUMENT,

			optional: false,
		} );
	}

	protected __mergeDefinition( propertyName:string, newDefinition:DigestedObjectSchemaProperty ):void {
		// Definitions does not matter in root
		return;
	}

}
