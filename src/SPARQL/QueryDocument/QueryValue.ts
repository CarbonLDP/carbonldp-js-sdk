import { isAbsolute } from "sparqler/iri";
import { LiteralToken } from "sparqler/tokens";

import { isDate } from "../../Utils";
import { IllegalArgumentError } from "./../../Errors";
import * as XSD from "./../../NS/XSD";
import * as QueryContext from "./QueryContext";

export class Class {
	private _value:string | number | boolean | Date;

	private _literal:LiteralToken;
	private _context:QueryContext.Class;

	constructor( context:QueryContext.Class, value:string | number | boolean | Date ) {
		this._value = value;
		this._context = context;

		if( isDate( value ) ) {
			this._literal = new LiteralToken();
			this.withType( XSD.DataType.dateTime );
		} else {
			this._literal = new LiteralToken( value );
		}
	}

	withType( type:string ):this {
		if( ! isAbsolute( type ) ) {
			if( ! XSD.DataType.hasOwnProperty( type ) ) throw new IllegalArgumentError( "Invalid type provided." );
			type = XSD.DataType[ type ];
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



