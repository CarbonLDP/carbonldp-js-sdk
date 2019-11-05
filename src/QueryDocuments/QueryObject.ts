import { isBNodeLabel } from "sparqler/iri";
import { BlankNodeToken, IRIToken, PrefixedNameToken } from "sparqler/tokens";

import { QueryContainer } from "./QueryContainer";


/**
 * Wrapper for a safe query value to the reference of any resource.
 */
export class QueryObject {
	private readonly _queryContainer:QueryContainer;
	private readonly _resource:IRIToken | BlankNodeToken | PrefixedNameToken;

	constructor( queryContainer:QueryContainer, id:string ) {
		this._queryContainer = queryContainer;

		this._resource = isBNodeLabel( id )
			? new BlankNodeToken( id )
			: this._queryContainer.compactIRI( id );
	}


	/**
	 * Returns the SPARQL token of the object.
	 */
	getToken():IRIToken | BlankNodeToken | PrefixedNameToken {
		return this._resource;
	}

	/**
	 * Returns the SPARQL string representation of the object.
	 */
	toString():string {
		return `${ this._resource }`;
	}
}
