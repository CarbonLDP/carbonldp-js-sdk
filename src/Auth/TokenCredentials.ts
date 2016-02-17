import * as Credentials from "./Credentials";
import * as Token from "./Token";

export class Class implements Credentials.Class {
	private _token:Token.Class;
	get token():Token.Class { return this._token; };

	constructor( token:Token.Class ) {
		this._token = token;
	}
}

export default Class;
