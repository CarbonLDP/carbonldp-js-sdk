import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { QueryableProperty } from "./QueryableProperty";
import { QueryContainerType } from "./QueryContainerType";
import { QueryPropertyType } from "./QueryPropertyType";


export class QueryableRootProperty extends QueryableProperty {

	constructor( { uri, propertyType }:{ uri:string, propertyType?:QueryPropertyType } ) {
		super( {
			name: "document",

			definition: new DigestedObjectSchemaProperty( uri ),

			propertyType: propertyType,
			containerType: QueryContainerType.DOCUMENT,

			optional: false,
		} );
	}

}
