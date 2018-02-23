import { isBNodeLabel } from "sparqler/iri";
import { BlankNodeToken, IRIToken, PrefixedNameToken } from "sparqler/tokens";

import { Pointer } from "../../Pointer";
import { isString } from "../../Utils";
import * as QueryContext from "./QueryContext";

export class Class {
	private _context:QueryContext.Class;
	private _resource:IRIToken | BlankNodeToken | PrefixedNameToken;

	constructor( context:QueryContext.Class, object:Pointer | string ) {
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

export default Class;
