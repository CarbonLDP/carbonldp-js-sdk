import { OptionalToken, PatternToken, VariableToken } from "sparqler/tokens";

import { DigestedObjectSchema, Digester } from "../../ObjectSchema";
import * as QueryContext from "./QueryContext";

export class Class {
	readonly name:string;
	readonly variable:VariableToken;

	private _context:QueryContext.Class;
	private _patterns:PatternToken[];
	private _schema:DigestedObjectSchema;

	constructor( context:QueryContext.Class, name:string, pattern?:PatternToken ) {
		this.name = name;
		this.variable = context.getVariable( name );

		this._context = context;
		this._patterns = [];
		if( pattern ) this._patterns.push( pattern );
	}

	addPattern( ...patterns:PatternToken[] ):this {
		this._patterns.push( ...patterns );
		return this;
	}

	addOptionalPattern( ...patterns:PatternToken[] ):this {
		const first:PatternToken = this._patterns[ 0 ];
		const patternAdder:OptionalToken | this = first && first.token === "optional" ? first : this;
		patternAdder.addPattern( ...patterns );

		return this;
	}

	getPatterns():PatternToken[] {
		return this._patterns;
	}

	getSchema():DigestedObjectSchema {
		if( ! this._schema ) this._schema = this._context.getSchemaFor( { id: "" } );
		return this._schema;
	}

	addSchema( schema:DigestedObjectSchema ):void {
		this._schema = Digester.combineDigestedObjectSchemas( [ this.getSchema(), schema ] );
	}

	toString():string {
		return `${ this.variable }`;
	}
}

export default Class;
