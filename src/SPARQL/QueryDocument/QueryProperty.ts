import { FilterToken, PatternToken, VariableToken } from "sparqler/tokens";

import * as QueryContext from "./QueryContext";

export class Class {
	private _variable:VariableToken;
	private _pattern:PatternToken;
	private _filters:FilterToken[];

	constructor( context:QueryContext.Class, name:string, pattern:PatternToken ) {
		this._variable = context.getVariable( name );
		this._pattern = pattern;
		this._filters = [];
	}

	addFilter( filter:FilterToken ):this {
		this._filters.push( filter );
		return this;
	}

	hasFilters():boolean {
		return this._filters.length !== 0;
	}

	getPatterns():PatternToken[] {
		return [
			this._pattern,
			...this._filters,
		];
	}

	toString():string {
		return `${ this._variable }`;
	}
}

export default Class;
