import { isBNodeLabel, isPrefixed } from "sparqler/iri";
import { BlankNodeToken, IRIToken, PrefixedNameToken } from "sparqler/tokens";

import * as Pointer from "../../Pointer";
import { isString } from "../../Utils";
import * as QueryContext from "./QueryContext";

export class Class {
	private _context:QueryContext.Class;
	private _resource:IRIToken | BlankNodeToken | PrefixedNameToken;

	constructor( context:QueryContext.Class, object:Pointer.Class | string ) {
		this._context = context;
		const id:string = isString( object ) ? object : object.id;
		const shortID:string = this._context.compactIRI( id );

		this._resource = isPrefixed( shortID ) ? new PrefixedNameToken( shortID ) :
			isBNodeLabel( shortID ) ? new BlankNodeToken( shortID ) : new IRIToken( shortID );
	}

	toString():string {
		return `${ this._resource }`;
	}
}

export default Class;
