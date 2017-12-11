import { LimitToken, OffsetToken, OptionalToken, OrderToken, SelectToken, SubjectToken } from "sparqler/tokens";

import { IllegalArgumentError, IllegalStateError } from "./../../Errors";
import * as QueryDocumentBuilder from "./QueryDocumentBuilder";
import * as QueryProperty from "./QueryProperty";

export class Class extends QueryDocumentBuilder.Class {

	orderBy( property:QueryProperty.Class ):this {
		return this._orderBy( property );
	}

	orderAscendantBy( property:QueryProperty.Class ):this {
		return this._orderBy( property, "ASC" );
	}

	orderDescendantBy( property:QueryProperty.Class ):this {
		return this._orderBy( property, "DESC" );
	}

	limit( limit:number ):this {
		const select:SelectToken = this._document.getPatterns().find( pattern => pattern.token === "select" ) as SelectToken;
		if( ! select ) throw new IllegalStateError( `A sub-select token has not been defined.` );

		const limitIndex:number = select.modifiers.findIndex( pattern => pattern.token === "limit" );
		if( limitIndex !== - 1 ) select.modifiers.splice( limitIndex, 1 );

		select.modifiers.push( new LimitToken( limit ) );

		return this;
	}

	offset( offset:number ):this {
		const select:SelectToken = this._document.getPatterns().find( pattern => pattern.token === "select" ) as SelectToken;
		if( ! select ) throw new IllegalStateError( `A sub-select token has not been defined.` );

		const offsetIndex:number = select.modifiers.findIndex( pattern => pattern.token === "offset" );
		if( offsetIndex !== - 1 ) select.modifiers.splice( offsetIndex, 1 );

		select.modifiers.push( new OffsetToken( offset ) );
		return this;
	}

	private _orderBy( property:QueryProperty.Class, flow?:"ASC" | "DESC" ):this {
		const select:SelectToken = this._document.getPatterns().find( pattern => pattern.token === "select" ) as SelectToken;
		if( ! select ) throw new IllegalStateError( `A sub-select token has not been defined.` );

		const orderIndex:number = select.modifiers.findIndex( pattern => pattern.token === "order" );

		if( orderIndex !== - 1 ) {
			select.modifiers.splice( orderIndex, 1 );

			const optionalIndex:number = select.patterns.findIndex( pattern => pattern.token === "optional" );
			select.patterns.splice( optionalIndex, 1 );
		}

		select.modifiers.unshift( new OrderToken( property.variable, flow ) );

		let propertyPatternsPath:OptionalToken;
		while( property !== this._document ) {
			const propertyTriple:SubjectToken = property && property.getTriple();
			if( ! propertyTriple ) throw new IllegalArgumentError( `The property "${ property.name }" is not a valid property defined by the builder.` );

			const propertyPattern:OptionalToken = new OptionalToken()
				.addPattern( propertyTriple );

			if( propertyPatternsPath ) propertyPattern.addPattern( propertyPatternsPath );
			propertyPatternsPath = propertyPattern;

			property = this._context.getProperty( property.name
				.split( "." )
				.slice( 0, - 1 )
				.join( "." )
			);
		}

		select.addPattern( propertyPatternsPath );

		return this;
	}
}

export default Class;

