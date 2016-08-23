import * as Agents from "./Agents";
import Carbon from "./../Carbon";
import * as Auth from "./../Auth";
import * as Errors from "./../Errors";

export class Class extends Auth.Class {
	public agents:Agents.Class;

	set roles( role:Auth.Roles.Class ) {}

	get roles():Auth.Roles.Class { throw new Errors.NotImplementedError( "Currently there is no support for Platform Roles" ); }

	constructor( platformContext:Carbon ) {
		super( platformContext );
		this.agents = new Agents.Class( platformContext );
	}

}

export default Class;
