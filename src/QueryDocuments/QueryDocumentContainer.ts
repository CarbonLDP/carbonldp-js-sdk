import { AbstractContext } from "../Context/AbstractContext";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { QueryContainer } from "./QueryContainer";
import { QueryContainerType } from "./QueryContainerType";
import { QueryRootProperty } from "./QueryRootProperty";


export class QueryDocumentContainer extends QueryContainer {
	readonly _queryProperty:QueryRootProperty;


	constructor( context:AbstractContext<any, any, any>, rootPropertyData:{ name:string, uri:string, containerType:QueryContainerType } ) {
		super( context );

		this._queryProperty = new QueryRootProperty( {
			queryContainer: this,
			...rootPropertyData,
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
