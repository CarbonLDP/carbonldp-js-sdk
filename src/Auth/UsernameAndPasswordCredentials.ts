import * as Credentials from "./Credentials";

export class Class implements Credentials.Class {
	private _username:string;
	private _password:string;

	get username():string { return this._username; }

	get password():string { return this._password; }

	constructor( username:string, password:string ) {
		this._username = username;
		this._password = password;
	}
}

export default Class;
