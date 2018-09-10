import { IRIToken, LiteralToken, TermToken } from "sparqler/tokens";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";
import { IllegalStateError } from "../Errors/IllegalStateError";

import { Pointer } from "../Pointer/Pointer";
import { isObject } from "../Utils";

import { QueryDocumentContainer } from "./QueryDocumentContainer";
import { QueryObject2 } from "./QueryObject2";
import { QueryProperty2 } from "./QueryProperty2";
import { QueryPropertyType } from "./QueryPropertyType";
import { QuerySchema2 } from "./QuerySchema2";
import { QuerySchemaProperty2 } from "./QuerySchemaProperty2";
import { QueryValue2 } from "./QueryValue2";
import { QueryVariable } from "./QueryVariable";


export class QueryDocumentBuilder2 {
	static readonly ALL:Readonly<{}> = Object.freeze( {} );
	static readonly FULL:Readonly<{}> = Object.freeze( {} );
	static readonly INHERIT:Readonly<{}> = Object.freeze( {} );

	readonly inherit:Readonly<{}> = QueryDocumentBuilder2.INHERIT;
	readonly all:Readonly<{}> = QueryDocumentBuilder2.ALL;

	readonly _queryContainer:QueryDocumentContainer;
	readonly _queryProperty:QueryProperty2;


	constructor( queryContainer:QueryDocumentContainer, queryProperty:QueryProperty2 ) {
		this._queryContainer = queryContainer;
		this._queryProperty = queryProperty;
	}


	property( name?:string ):QueryVariable {
		let parent:QueryProperty2 | undefined = this._queryProperty;
		while( parent ) {
			const property:QueryProperty2 | undefined = parent.getProperty( name, { create: true } );
			if( property ) return property.variable;

			parent = parent.parent;
		}

		throw new IllegalArgumentError( `The property "${ name }" was not declared.` );
	}

	value( value:string | number | boolean | Date ):QueryValue2 {
		return new QueryValue2( this._queryContainer, value );
	}

	object( object:Pointer | string ):QueryObject2 {
		const id:string = Pointer.getID( object );
		return new QueryObject2( this._queryContainer, id );
	}


	withType( type:string ):this {
		if( this._queryProperty.hasProperties() )
			throw new IllegalStateError( "Types must be specified before the properties." );

		this._queryProperty.addType( type );
		return this;
	}

	properties( propertiesSchema:QuerySchema2 ):this {
		if( propertiesSchema === QueryDocumentBuilder2.ALL ) {
			this._queryProperty.setType( QueryPropertyType.ALL );
			return this;
		}

		if( propertiesSchema === QueryDocumentBuilder2.FULL ) {
			this._queryProperty.setType( QueryPropertyType.FULL );
			return this;
		}

		for( const propertyName in propertiesSchema ) {
			const queryPropertySchema:QuerySchemaProperty2 | string = propertiesSchema[ propertyName ];
			const querySchemaProperty:QuerySchemaProperty2 = isObject( queryPropertySchema )
				? queryPropertySchema : { "@id": queryPropertySchema };

			const property:QueryProperty2 = this._queryProperty
				.addProperty( propertyName, querySchemaProperty );

			const subQuery:QuerySchemaProperty2[ "query" ] | undefined = querySchemaProperty.query;
			if( ! subQuery ) continue;

			if( property.definition.literal === false )
				property.setType( QueryPropertyType.PARTIAL );

			const builder:SubQueryDocumentsBuilder = new SubQueryDocumentsBuilder( this._queryContainer, property );
			if( builder !== subQuery.call( void 0, builder ) )
				throw new IllegalArgumentError( "The provided query builder was not returned" );
		}

		return this;
	}

}


export class SubQueryDocumentsBuilder extends QueryDocumentBuilder2 {

	filter( constraint:string ):this {
		this._queryProperty
			.getRootProperty()
			.addFilter( constraint );

		return this;
	}

	values( ...values:(QueryValue2 | QueryObject2)[] ):this {
		const tokens:(LiteralToken | IRIToken)[] = values
			.map( value => {
				const token:TermToken = value.getToken();
				if( token.token === "blankNode" ) throw new IllegalArgumentError( `Cannot assign blank nodes ("${ token.label }").` );

				return token;
			} );

		this._queryProperty.addValues( tokens );
		this._queryProperty.setObligatory( { inheritParents: true } );

		return this;
	}

}
