import { LimitToken, OffsetToken, OptionalToken, OrderToken, PatternToken, SelectToken } from "sparqler/tokens";

import * as QueryDocumentBuilder from "./QueryDocumentBuilder";
import * as QueryProperty from "./QueryProperty";
import { getLevelRegExp } from "./Utils";

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
		if( ! select ) throw new Error( `A sub-select token has not been defined.` );

		const limitIndex:number = select.modifiers.findIndex( pattern => pattern.token === "limit" );
		if( limitIndex !== - 1 ) select.modifiers.splice( limitIndex, 1 );

		select.modifiers.push( new LimitToken( limit ) );

		return this;
	}

	offset( offset:number ):this {
		const select:SelectToken = this._document.getPatterns().find( pattern => pattern.token === "select" ) as SelectToken;
		if( ! select ) throw new Error( `A sub-select token has not been defined.` );

		const offsetIndex:number = select.modifiers.findIndex( pattern => pattern.token === "offset" );
		if( offsetIndex !== - 1 ) select.modifiers.splice( offsetIndex, 1 );

		select.modifiers.push( new OffsetToken( offset ) );
		return this;
	}

	private _orderBy( property:QueryProperty.Class, flow?:"ASC" | "DESC" ):this {
		const levelRegex:RegExp = getLevelRegExp( this._document.name );
		if( ! levelRegex.test( property.name ) ) throw new Error( `Property "${ property.name }" isn't a direct property of a member.` );

		const select:SelectToken = this._document.getPatterns().find( pattern => pattern.token === "select" ) as SelectToken;
		if( ! select ) throw new Error( `A sub-select token has not been defined.` );

		const orderIndex:number = select.modifiers.findIndex( pattern => pattern.token === "order" );

		if( orderIndex !== - 1 ) {
			select.modifiers.splice( orderIndex, 1 );

			const optionalIndex:number = select.patterns.findIndex( pattern => pattern.token === "optional" );
			select.patterns.splice( optionalIndex, 1 );
		}

		select.modifiers.unshift( new OrderToken( property.variable, flow ) );

		const propertyDefinitions:OptionalToken = property.getPatterns()
			.find( pattern => pattern.token === "optional" ) as OptionalToken;
		if( ! propertyDefinitions ) throw new Error( `The property provided is not a valid property defined by the builder.` );

		const propertyTriple:PatternToken = propertyDefinitions.patterns[ 0 ];

		select.addPattern( new OptionalToken()
			.addPattern( propertyTriple )
		);

		return this;
	}
}

export default Class;

