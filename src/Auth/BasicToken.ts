export class Class {
	private _username:string;
	private _password:string;

	constructor( username:string, password:string ) {
		this._username = username;
		this._password = password;
	}

	get username():string { return this._username; }

	get password():string { return this._password; }
}

export default Class;
