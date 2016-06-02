import Context from "./../Context";
import * as Errors from "./../Errors";
import * as Pointer from "./../Pointer";
import * as HTTP from "./../HTTP";
import * as Role from "./Role";
import * as PersistedRole from "./PersistedRole";
import * as URI from "./../RDF/URI";
import * as Utils from "./../Utils";

export abstract class Class {
	private context:Context;

	constructor( context:Context ) {
		this.context = context;
	}

	createChild( parentRole:string | Pointer.Class, role:Role.Class, requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>;
	createChild( parentRole:string | Pointer.Class, role:Role.Class, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>;
	createChild( parentRole:string | Pointer.Class, role:Role.Class, slugOrRequestOptions?:any, requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]> {
		let containerUri:string = this.context.resolve( this.getContainerURI() );

		let parentUri:string = Utils.isString( parentRole ) ? <string> parentRole : ( <Pointer.Class> parentRole).id;
		parentUri = URI.Util.resolve( containerUri,  parentUri );

		let slug:string = Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;
		requestOptions = HTTP.Request.Util.isOptions( slugOrRequestOptions ) ? slugOrRequestOptions : requestOptions;

		if ( ! URI.Util.isBaseOf( containerUri, parentUri ) ) return Promise.reject<any>( new Errors.IllegalArgumentError( "The parent role provided is not a valid role of the current context." ) );

		let rolePointer:Pointer.Class;
		let responseCreated:HTTP.Response.Class;
		return this.context.documents.exists( parentUri ).then( ( [ exists, response ]:[ boolean, HTTP.Response.Class ] ) => {
			if ( ! exists ) throw new Errors.IllegalArgumentError( "The parent role provided does not exist." );
			return slug ? this.context.documents.createChild( containerUri, slug, role, requestOptions ) : this.context.documents.createChild( containerUri, role, requestOptions );
		}).then( ( [ newRole, response ]:[ Pointer.Class, HTTP.Response.Class] ) => {
			rolePointer = newRole;
			responseCreated = response;
			return this.context.documents.addMember( parentUri, newRole );
		}).then( ( response ) => {
			return [ rolePointer, [ responseCreated, response ] ];
		});
	}

	get( roleURI, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedRole.Class, HTTP.Response.Class ]> {
		let containerUri:string = this.context.resolve( this.getContainerURI() );
		let uri:string = URI.Util.resolve( containerUri, roleURI );

		if ( ! URI.Util.isBaseOf( containerUri, uri ) ) return Promise.reject<any>( new Errors.IllegalArgumentError( "The URI provided is not a valid role of the current context." ) );

		return this.context.documents.get( uri, requestOptions );
	}

	private getContainerURI():string {
		if ( ! this.context.hasSetting( "platform.roles.container" ) ) throw new Errors.IllegalStateError( "The roles container setting hasn't been declared." );
		return this.context.getSetting( "platform.roles.container" );
	}
}

export default Class;
