import { isBNodeLabel } from "sparqler/iri";
import { BlankNodeToken, IRIToken, PrefixedNameToken } from "sparqler/tokens";

import { QueryContainer } from "./QueryContainer";


export class QueryObject {
	private readonly _queryContainer:QueryContainer;
	private readonly _resource:IRIToken | BlankNodeToken | PrefixedNameToken;

	constructor( queryContainer:QueryContainer, id:string ) {
		this._queryContainer = queryContainer;

		this._resource = isBNodeLabel( id )
			? new BlankNodeToken( id )
			: this._queryContainer.compactIRI( id );
	}


	getToken():IRIToken | BlankNodeToken | PrefixedNameToken {
		return this._resource;
	}

	toString():string {
		return `${ this._resource }`;
	}
}
