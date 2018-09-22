import { IRIToken, LiteralToken, TermToken, VariableToken } from "sparqler/tokens";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";
import { IllegalStateError } from "../Errors/IllegalStateError";

import { Pointer } from "../Pointer/Pointer";
import { isObject } from "../Utils";

import { QueryContainer } from "./QueryContainer";
import { QueryObject } from "./QueryObject";
import { QueryProperty } from "./QueryProperty";
import { QueryPropertyType } from "./QueryPropertyType";
import { QuerySchema } from "./QuerySchema";
import { QuerySchemaProperty } from "./QuerySchemaProperty";
import { QueryValue } from "./QueryValue";


export class QueryDocumentBuilder {
	static readonly ALL:Readonly<{}> = Object.freeze( {} );
	static readonly FULL:Readonly<{}> = Object.freeze( {} );
	static readonly INHERIT:Readonly<{}> = Object.freeze( {} );

	readonly inherit:Readonly<{}> = QueryDocumentBuilder.INHERIT;
	readonly all:Readonly<{}> = QueryDocumentBuilder.ALL;

	readonly _queryContainer:QueryContainer;
	readonly _queryProperty:QueryProperty;


	constructor( queryContainer:QueryContainer, queryProperty:QueryProperty ) {
		this._queryContainer = queryContainer;
		this._queryProperty = queryProperty;
	}


	property( name?:string ):VariableToken | IRIToken | LiteralToken {
		let parent:QueryProperty | undefined = this._queryProperty;
		while( parent ) {
			const property:QueryProperty | undefined = parent.getProperty( name, { create: true } );
			if( property ) return property.identifier;

			parent = parent.parent;
		}

		throw new IllegalArgumentError( `The property "${ name }" was not declared.` );
	}

	value( value:string | number | boolean | Date ):QueryValue {
		return new QueryValue( this._queryContainer, value );
	}

	object( object:Pointer | string ):QueryObject {
		const id:string = Pointer.getID( object );
		return new QueryObject( this._queryContainer, id );
	}


	withType( type:string ):this {
		if( this._queryProperty.hasProperties() )
			throw new IllegalStateError( "Types must be specified before the properties." );

		this._queryProperty.addType( type );
		return this;
	}

	properties( propertiesSchema:QuerySchema ):this {
		if( propertiesSchema === QueryDocumentBuilder.ALL ) {
			this._queryProperty.setType( QueryPropertyType.ALL );
			return this;
		}

		if( propertiesSchema === QueryDocumentBuilder.FULL ) {
			this._queryProperty.setType( QueryPropertyType.FULL );
			return this;
		}

		for( const propertyName in propertiesSchema ) {
			const queryPropertySchema:QuerySchemaProperty | string = propertiesSchema[ propertyName ];
			const querySchemaProperty:QuerySchemaProperty = isObject( queryPropertySchema )
				? queryPropertySchema : { "@id": queryPropertySchema };

			const property:QueryProperty = this._queryProperty
				.addProperty( propertyName, querySchemaProperty );

			const subQuery:QuerySchemaProperty[ "query" ] | undefined = querySchemaProperty.query;
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


export class SubQueryDocumentsBuilder extends QueryDocumentBuilder {

	filter( constraint:string ):this {
		this._queryProperty
			.addFilter( constraint );

		return this;
	}

	values( ...values:(QueryValue | QueryObject)[] ):this {
		const tokens:(LiteralToken | IRIToken)[] = values
			.map( value => {
				const token:TermToken = value.getToken();
				if( token.token === "blankNode" ) throw new IllegalArgumentError( `Cannot assign blank nodes ("${ token.label }").` );

				if( this._queryProperty.definition.literal ) {
					if( token.token !== "literal" )
						throw new IllegalArgumentError( `"${ token }" is not a literal value.` );
				}

				if( this._queryProperty.definition.pointerType !== null ) {
					if( token.token === "literal" )
						throw new IllegalArgumentError( `"${ token }" is not a resource value.` );
				}

				return token;
			} );

		this._queryProperty.addValues( tokens );
		this._queryProperty.setObligatory( { inheritParents: true } );

		return this;
	}

}
