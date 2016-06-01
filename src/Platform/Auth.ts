import Carbon from "./../Carbon";
import * as Auth from "./../Auth";
import * as Errors from "./../Errors";
import * as Utils from "./../Utils";

export class Class extends Auth.Class {

	set roles( role:Auth.Roles.Class ) {}
	get roles():Auth.Roles.Class { throw new Errors.NotImplementedError( "Currently there is no support for Platform Roles" ); }

	constructor( platformContext:Carbon ) {
		super( platformContext );
	}

}

export default Class;
