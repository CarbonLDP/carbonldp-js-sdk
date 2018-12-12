import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { QueryContainerProperty } from "./QueryContainerProperty";
import { SubQueryDocumentsBuilder } from "./QueryDocumentBuilder";
import { QueryContainer } from "./QueryContainer";


/**
 * Class with the helpers and properties for construct a query for children or members.
 */
export class QueryDocumentsBuilder extends SubQueryDocumentsBuilder {
	readonly _queryProperty!:QueryContainerProperty;

	constructor( queryContainer:QueryContainer, queryProperty:QueryContainerProperty ) {
		super( queryContainer, queryProperty );
	}


	/**
	 * Makes the target documents of the query to return ordered by the property specified.
	 * If no order flow is specified, the default behaviour of SPARQL ordering is used (ascending).
	 * @param property The property name from which the results will be ordered.
	 * @param flow The specific order flow of the query.
	 */
	orderBy( property:string, flow?:"ASC" | "DESC" | "ascending" | "descending" ):this {
		this._queryProperty.setOrder( {
			path: property,
			flow: parseFlowString( flow ),
		} );

		return this;
	}

	/**
	 * Limit the target results to be returned by the number specified.
	 * @param limit The maximum number of targeted results.
	 */
	limit( limit:number ):this {
		this._queryProperty.setLimit( limit );

		return this;
	}

	/**
	 * Set an offset in the target results to be returned.
	 * @param offset The offset number to be applied to the targeted results.
	 */
	offset( offset:number ):this {
		this._queryProperty.setOffset( offset );

		return this;
	}

}


function parseFlowString( flow?:"ASC" | "DESC" | "ascending" | "descending" ):"ASC" | "DESC" | undefined {
	if( flow === void 0 ) return;

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
