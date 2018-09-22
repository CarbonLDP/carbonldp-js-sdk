import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { QueryContainerProperty } from "./QueryContainerProperty";
import { SubQueryDocumentsBuilder } from "./QueryDocumentBuilder";
import { QueryContainer } from "./QueryContainer";


export class QueryDocumentsBuilder extends SubQueryDocumentsBuilder {
	readonly _queryProperty:QueryContainerProperty;

	constructor( queryContainer:QueryContainer, queryProperty:QueryContainerProperty ) {
		super( queryContainer, queryProperty );
	}


	orderBy( property:string, flow?:"ASC" | "DESC" | "ascending" | "descending" ):this {
		this._queryProperty.setOrder( {
			path: property,
			flow: parseFlowString( flow ),
		} );

		return this;
	}

	limit( limit:number ):this {
		this._queryProperty.setLimit( limit );

		return this;
	}

	offset( offset:number ):this {
		this._queryProperty.setOffset( offset );

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
