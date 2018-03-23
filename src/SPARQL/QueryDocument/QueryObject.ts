import { isBNodeLabel } from "sparqler/iri";
import { BlankNodeToken, IRIToken, PrefixedNameToken } from "sparqler/tokens";

import { Pointer } from "../../Pointer";
import { isString } from "../../Utils";
import { QueryContext } from "./QueryContext";

export class QueryObject {
	private _context:QueryContext;
	private _resource:IRIToken | BlankNodeToken | PrefixedNameToken;

	constructor( context:QueryContext, object:Pointer | string ) {
		this._context = context;
		const id:string = isString( object ) ? object : object.id;
		this._resource = isBNodeLabel( id ) ? new BlankNodeToken( id ) : this._context.compactIRI( id );
	}

	getToken():IRIToken | BlankNodeToken | PrefixedNameToken {
		return this._resource;
	}

	toString():string {
		return `${ this._resource }`;
	}
}
