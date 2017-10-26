import { OptionalToken, PatternToken, VariableToken } from "sparqler/tokens";

import * as QueryContext from "./QueryContext";

export class Class {
	readonly name:string;
	readonly variable:VariableToken;

	private _patterns:PatternToken[];

	constructor( context:QueryContext.Class, name:string, pattern?:PatternToken ) {
		this.name = name;
		this.variable = context.getVariable( name );
		this._patterns = [];
		if( pattern ) this._patterns.push( pattern );
	}

	addPattern( ...patterns:PatternToken[] ):this {
		this._patterns.push( ...patterns );
		return this;
	}

	addOptionalPattern( ...patterns:PatternToken[] ):this {
		const first:PatternToken = this._patterns[ 0 ];
		const patternAdder:OptionalToken | this = first && first.token === "optional" ? first : this ;
		patternAdder.addPattern( ...patterns );

		return this;
	}

	hasFilters():boolean {
		return this._patterns.some( pattern => pattern.token === "filter" );
	}

	getPatterns():PatternToken[] {
		return this._patterns;
	}

	toString():string {
		return `${ this.variable }`;
	}
}

export default Class;
