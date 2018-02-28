import { isAbsolute } from "sparqler/iri";
import { LiteralToken } from "sparqler/tokens";

import { IllegalArgumentError } from "../../Errors/IllegalArgumentError";
import { isDate } from "../../Utils";
import { XSD } from "../../Vocabularies/XSD";
import { QueryContext } from "./QueryContext";

export class Class {
	private _value:string | number | boolean | Date;

	private _literal:LiteralToken;
	private _context:QueryContext;

	constructor( context:QueryContext, value:string | number | boolean | Date ) {
		this._value = value;
		this._context = context;

		if( isDate( value ) ) {
			this._literal = new LiteralToken();
			this.withType( XSD.dateTime );
		} else {
			this._literal = new LiteralToken( value );
		}
	}

	withType( type:string ):this {
		if( ! isAbsolute( type ) ) {
			if( ! XSD.hasOwnProperty( type ) ) throw new IllegalArgumentError( "Invalid type provided." );
			type = XSD[ type ];
		}
		const value:string = this._context.serializeLiteral( type, this._value );
		this._literal.setValue( value );
		this._literal.setType( this._context.compactIRI( type ) );

		return this;
	}

	withLanguage( language:string ):this {
		this._literal.setLanguage( language );

		return this;
	}

	getToken():LiteralToken {
		return this._literal;
	}

	toString():string {
		return `${ this._literal }`;
	}
}

export default Class;



