import { VariableToken } from "sparqler/tokens";

import * as QueryContext from "./QueryContext";

export class Class {
	private _variable:VariableToken;

	constructor( context:QueryContext.Class, name:string ) {
		this._variable = context.getVariable( name );
	}

	toString():string {
		return `${ this._variable }`;
	}
}

export default Class;
