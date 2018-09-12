import { AbstractContext } from "../Context/AbstractContext";

import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { QueryContainer } from "./QueryContainer";
import { QueryContainerType } from "./QueryContainerType";
import { QueryProperty2 } from "./QueryProperty2";


export class QueryableMetadataContainer extends QueryContainer {
	readonly _queryProperty:QueryProperty2;


	constructor( context:AbstractContext<any, any, any>, rootPropertyData:{ name:string, uri:string, containerType:QueryContainerType } ) {
		super( context );

		this._queryProperty = new QueryProperty2( {
			queryContainer: this,

			name: rootPropertyData.name,

			definition: new DigestedObjectSchemaProperty( rootPropertyData.uri ),
			containerType: rootPropertyData.containerType,

			optional: false,
		} );
	}

}
