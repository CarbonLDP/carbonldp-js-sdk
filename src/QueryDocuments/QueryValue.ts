import { IRIToken, LanguageToken, LiteralToken, RDFLiteralToken } from "sparqler/tokens";

import { isDate } from "../Utils";

import { XSD } from "../Vocabularies/XSD";

import { QueryContext } from "./QueryContext";


export class QueryValue {
	private readonly _value:string | number | boolean | Date;

	private readonly _context:QueryContext;
	private _literal:LiteralToken;

	constructor( context:QueryContext, value:string | number | boolean | Date ) {
		this._value = value;
		this._context = context;

		if( isDate( value ) ) {
			this.withType( XSD.dateTime );
		} else {
			this._literal = new LiteralToken( value );
		}
	}

	withType( type:string ):this {
		if( XSD.hasOwnProperty( type ) ) type = XSD[ type ];

		const value:string = this._context.serializeLiteral( type, this._value );
		const typeToken:IRIToken = this._context.compactIRI( type );
		this._literal = new RDFLiteralToken( value, typeToken );

		return this;
	}

	withLanguage( language:string ):this {
		const value:string = this._context.serializeLiteral( XSD.string, this._value );
		const languageToken:LanguageToken = new LanguageToken( language );
		this._literal = new RDFLiteralToken( value, languageToken );

		return this;
	}

	getToken():LiteralToken {
		return this._literal;
	}

	toString():string {
		return `${ this._literal }`;
	}
}



