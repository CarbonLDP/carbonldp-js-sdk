import {
	LimitToken,
	OffsetToken,
	OptionalToken,
	OrderToken,
	SelectToken,
	SubjectToken
} from "sparqler/tokens";

import {
	IllegalArgumentError,
	IllegalStateError
} from "../../Errors";
import { QueryDocumentBuilder } from "./QueryDocumentBuilder";
import * as QueryProperty from "./QueryProperty";
import { getParentPath } from "./Utils";

export interface OrderData {
	path:string;
	flow?:"ASC" | "DESC";
}

export class Class extends QueryDocumentBuilder {

	_orderData?:OrderData;

	orderBy( property:string, flow?:"ASC" | "DESC" | "ascending" | "descending" ):this {
		let propertyObj:QueryProperty.Class = this.property( property );

		const select:SelectToken = this._document.getPatterns().find( pattern => pattern.token === "select" ) as SelectToken;
		if( ! select ) throw new IllegalStateError( `A sub-select token has not been defined.` );

		this._orderData = void 0;
		const orderIndex:number = select.modifiers.findIndex( pattern => pattern.token === "order" );

		if( orderIndex !== - 1 ) {
			select.modifiers.splice( orderIndex, 1 );

			const optionalIndex:number = select.patterns.findIndex( pattern => pattern.token === "optional" );
			select.patterns.splice( optionalIndex, 1 );
		}

		const validatedFlow:"ASC" | "DESC" = parseFlowString( flow );
		select.modifiers.unshift( new OrderToken( propertyObj.variable, validatedFlow ) );

		const orderData:OrderData = {
			path: propertyObj.name
				.split( "." )
				.slice( 1 )
				.join( "." ),
			flow: validatedFlow,
		};

		let propertyPatternsPath:OptionalToken;
		while( propertyObj !== this._document ) {
			const propertyTriple:SubjectToken = propertyObj && propertyObj.getTriple();
			if( ! propertyTriple ) throw new IllegalArgumentError( `The property "${ propertyObj.name }" is not a valid property defined by the builder.` );

			const propertyPattern:OptionalToken = new OptionalToken()
				.addPattern( propertyTriple );

			if( propertyPatternsPath ) propertyPattern.addPattern( propertyPatternsPath );
			propertyPatternsPath = propertyPattern;

			propertyObj = this._context.getProperty( getParentPath( propertyObj.name ) );
		}

		this._orderData = orderData;
		select.addPattern( propertyPatternsPath );

		return this;
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

}

function parseFlowString( flow?:"ASC" | "DESC" | "ascending" | "descending" ):"ASC" | "DESC" {
	if( flow === void 0 ) return void 0;

	const upperCase:"ASC" | "DESC" | "ASCENDING" | "DESCENDING" = flow
		.toUpperCase() as any;

	switch( upperCase ) {
		case "ASC":
		case "DESC":
			return upperCase;

		case "ASCENDING":
		case "DESCENDING":
			return upperCase
				.slice( 0, - 6 ) as "ASC" | "DESC";

		default:
			throw new IllegalArgumentError( "Invalid flow order." );
	}
}

export default Class;

