import { AbstractContext } from "../Context/AbstractContext";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { QueryContainer } from "./QueryContainer";
import { QueryContainerType } from "./QueryContainerType";
import { QueryRootProperty } from "./QueryRootProperty";


export class QueryDocumentContainer extends QueryContainer {
	readonly _queryProperty:QueryRootProperty;


	constructor( context:AbstractContext<any, any, any>, rootPropertyData:{ uri:string, containerType:QueryContainerType } ) {
		super( context );

		this._queryProperty = new QueryRootProperty( {
			queryContainer: this,

			name: __getName( rootPropertyData.containerType ),

			definition: new DigestedObjectSchemaProperty( rootPropertyData.uri ),
			containerType: rootPropertyData.containerType,
		} );
	}


	serializeLiteral( type:string, value:any ):string {
		if( ! this.context.jsonldConverter.literalSerializers.has( type ) )
			throw new IllegalArgumentError( `Type "${ type }" hasn't a defined serializer.` );

		return this.context.jsonldConverter
			.literalSerializers
			.get( type )
			.serialize( value );
	}

}

function __getName( containerType:QueryContainerType ):string {
	switch( containerType ) {
		case QueryContainerType.DOCUMENT:
			return "document";
		case QueryContainerType.MEMBERS:
			return "member";
		case QueryContainerType.CHILDREN:
			return "child";
		default:
			throw new IllegalArgumentError( `Invalid container type: "${ containerType }"` );
	}
}
