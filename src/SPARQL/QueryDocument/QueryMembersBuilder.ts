import { LimitToken, OffsetToken, OptionalToken, OrderToken, PatternToken, SelectToken } from "sparqler/tokens";

import * as QueryDocumentBuilder from "./QueryDocumentBuilder";
import * as QueryProperty from "./QueryProperty";

export class Class extends QueryDocumentBuilder.Class {

	orderAscendantBy( property:QueryProperty.Class ):this {
		return this._orderBy( property, "ASC" );
	}

	orderDescendantBy( property:QueryProperty.Class ):this {
		return this._orderBy( property, "DESC" );
	}

	orderBy( property:QueryProperty.Class ):this {
		return this._orderBy( property );
	}

	limit( limit:number ):this {
		const select:SelectToken = this._document.getPatterns()[ 0 ] as SelectToken;

		const limitIndex:number = select.modifiers.findIndex( pattern => pattern.token === "limit" );
		if( limitIndex !== - 1 ) select.modifiers.splice( limitIndex, 1 );

		select.addModifier( new LimitToken( limit ) );

		return this;
	}

	offset( offset:number ):this {
		const select:SelectToken = this._document.getPatterns()[ 0 ] as SelectToken;

		const offsetIndex:number = select.modifiers.findIndex( pattern => pattern.token === "offset" );
		if( offsetIndex !== - 1 ) select.modifiers.splice( offsetIndex, 1 );

		select.addModifier( new OffsetToken( offset ) );
		return this;
	}

	private _orderBy( property:QueryProperty.Class, flow?:"ASC" | "DESC" ):this {
		if( property.name.substr( this._document.name.length + 1 ).includes( "." ) ) throw new Error( `Property "${ property.name }" isn't a direct property of a member.` );

		const select:SelectToken = this._document.getPatterns()[ 0 ] as SelectToken;
		const orderIndex:number = select.modifiers.findIndex( pattern => pattern.token === "order" );

		if( orderIndex !== - 1 ) {
			select.modifiers.splice( orderIndex, 1 );

			const optionalIndex:number = select.patterns.findIndex( pattern => pattern.token === "optional" );
			select.patterns.splice( optionalIndex, 1 );
		}

		select.addModifier( new OrderToken( property.variable, flow ) );

		const propertyTriple:PatternToken = ( property.getPatterns()
			.find( pattern => pattern.token === "optional" ) as OptionalToken )
			.patterns[ 0 ];

		select.addPattern( new OptionalToken()
			.addPattern( propertyTriple )
		);

		return this;
	}
}

export default Class;

