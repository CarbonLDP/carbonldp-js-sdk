import AppContext from "./Context";
import * as AppRole from "./Role";
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as NS from "./../NS";
import * as PersistedAppRole from "./PersistedRole";
import * as PersistedRole from "./../Auth/PersistedRole";
import * as Pointer from "./../Pointer";
import AuthRoles from "./../Auth/Roles";

export class Class extends AuthRoles {

	constructor( appContext:AppContext ) {
		if( ! ( appContext instanceof AppContext ) ) throw new Errors.NotImplementedError( "The context provided is not a AppContext." );
		super( appContext );
	}

	createChild<T>( parentRole:string | Pointer.Class, role:T & AppRole.Class, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedAppRole.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>;
	createChild<T>( parentRole:string | Pointer.Class, role:T & AppRole.Class, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedAppRole.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>;
	createChild<T>( parentRole:string | Pointer.Class, role:T & AppRole.Class, slugOrRequestOptions?:any, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedAppRole.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]> {
		if( ! AppRole.Factory.is( role ) ) return Promise.reject<any>( new Errors.IllegalArgumentError( "The role is not a valid `Carbon.App.Role.Class` object." ) );

		return super.createChild<T>( parentRole, role, slugOrRequestOptions, requestOptions );
	}

	createChildren<T>( parentRole:string | Pointer.Class, roles:(T & AppRole.Class)[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedAppRole.Class)[], HTTP.Response.Class[] ]>;
	createChildren<T>( parentRole:string | Pointer.Class, roles:(T & AppRole.Class)[], slugs?:string[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedAppRole.Class)[], HTTP.Response.Class[] ]>;
	createChildren<T>( parentRole:string | Pointer.Class, roles:(T & AppRole.Class)[], slugsOrRequestOptions?:any, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedAppRole.Class)[], HTTP.Response.Class[] ]> {
		let index:number = roles.findIndex( role => ! AppRole.Factory.is( role ) );
		if( index !== -1 ) return Promise.reject<any>( new Errors.IllegalArgumentError( `The role at index ${ index }, is not a valid \`Carbon.App.Role.Class\` object.` ) );

		return super.createChildren<T>( parentRole, roles, slugsOrRequestOptions, requestOptions );
	}

	createChildAndRetrieve<T>( parentRole:string | Pointer.Class, role:T & AppRole.Class, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedAppRole.Class, [ HTTP.Response.Class, HTTP.Response.Class, HTTP.Response.Class ] ]>;
	createChildAndRetrieve<T>( parentRole:string | Pointer.Class, role:T & AppRole.Class, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedAppRole.Class, [ HTTP.Response.Class, HTTP.Response.Class, HTTP.Response.Class ] ]>;
	createChildAndRetrieve<T>( parentRole:string | Pointer.Class, role:T & AppRole.Class, slugOrRequestOptions?:any, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedAppRole.Class, [ HTTP.Response.Class, HTTP.Response.Class, HTTP.Response.Class ] ]> {
		if( ! AppRole.Factory.is( role ) ) return Promise.reject<any>( new Errors.IllegalArgumentError( "The role is not a valid `Carbon.App.Role.Class` object." ) );

		return super.createChildAndRetrieve<T>( parentRole, role, slugOrRequestOptions, requestOptions );
	}

	get( roleURI:string, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedAppRole.Class, HTTP.Response.Class ]> {
		return super.get( roleURI, requestOptions ).then( ( [ role, response ]:[ PersistedRole.Class, HTTP.Response.Class ] ) => {
			if( ! PersistedAppRole.Factory.is( role ) ) throw new Errors.IllegalArgumentError( `The resource fetched is not a ${ NS.CS.Class.AppRole }` );

			return [ role, response ];
		} );
	}

}

export default Class;
