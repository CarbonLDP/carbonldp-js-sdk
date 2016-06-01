import AppContext from "./Context";
import * as AppRole from "./Role";
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as Pointer from "./../Pointer";
import AuthRoles from "./../Auth/Roles";

export class Class extends AuthRoles {

	constructor( appContext:AppContext ) {
		if ( ! ( appContext instanceof AppContext ) ) throw new Errors.NotImplementedError( "The context provided is not a AppContext." );
		super( appContext );
	}

	createChild( parentRole:string | Pointer.Class, role:AppRole.Class, requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>;
	createChild( parentRole:string | Pointer.Class, role:AppRole.Class, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>;
	createChild( parentRole:string | Pointer.Class, role:AppRole.Class, slugOrRequestOptions?:any, requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]> {
		if ( ! AppRole.Factory.is( role ) ) return Promise.reject<any>( new Errors.IllegalArgumentError( "The role is not a valid `Carbon.App.Role.Class` object." ) );

		return super.createChild( parentRole, role, slugOrRequestOptions, requestOptions );
	}

}

export default Class;
