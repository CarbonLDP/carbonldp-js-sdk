import { OptionalToken, PatternToken, SubjectToken, VariableToken } from "sparqler/tokens";

import { DigestedObjectSchema } from "../../ObjectSchema";
import * as QueryContext from "./QueryContext";

export class Class {
	readonly name:string;
	readonly variable:VariableToken;

	private _context:QueryContext.Class;
	private _optional:boolean;
	private _patterns:PatternToken[];
	private _schema:DigestedObjectSchema;

	constructor( context:QueryContext.Class, name:string, isOptional:boolean = true ) {
		this.name = name;
		this.variable = context.getVariable( name );

		this._optional = isOptional;

		this._context = context;
		this._patterns = [];
	}

	addPattern( ...patterns:PatternToken[] ):this {
		this._patterns.push( ...patterns );
		return this;
	}

	getPatterns():PatternToken[] {
		if( ! this._optional ) return this._patterns;

		return [ new OptionalToken()
			.addPattern( ...this._patterns ),
		];
	}

	getSchema():DigestedObjectSchema {
		if( this._schema ) return this._schema;

		this._schema = new DigestedObjectSchema();
		this._schema.vocab = this._context.expandIRI( "" ) || null;

		return this._schema;
	}

	setOptional( optional:boolean ):this {
		this._optional = optional;
		return this;
	}

	getTriple():SubjectToken {
		return this._patterns
			.find( pattern => pattern instanceof SubjectToken ) as SubjectToken;
	}

	toString():string {
		return `${ this.variable }`;
	}
}

export default Class;
