import * as User from "./User";
import Context from "./../Context";
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as PersistedUser from "./PersistedUser";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as URI from "./../RDF/URI";

export class Class {
	private context:Context;

	constructor( context:Context ) {
		this.context = context;
	}

	register( userDocument:User.Class, slug:string = null ):Promise<[ PersistedProtectedDocument.Class, HTTP.Response.Class ]> {
		return this.resolveURI( "" ).then( ( containerURI:string ) => {
			if( ! User.Factory.is( userDocument ) ) throw new Errors.IllegalArgumentError( "The Document is not a cs:User object." );

			return this.context.documents.createChild( containerURI, userDocument, slug );
		} );
	}

	get( userURI:string, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedUser.Class, HTTP.Response.Class ]> {
		return this.resolveURI( userURI ).then( ( uri:string ) => {
			return this.context.documents.get( uri, requestOptions );
		} );
	}

	enable( userURI:string, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedUser.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]> {
		return this.changeEnabledStatus( userURI, true, requestOptions );
	}

	disable( userURI:string, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedUser.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]> {
		return this.changeEnabledStatus( userURI, false, requestOptions );
	}

	delete( userURI:string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
		return this.resolveURI( userURI ).then( uri => {
			return this.context.documents.delete( uri, requestOptions );
		} );
	}

	private changeEnabledStatus( userURI:string, value:boolean, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedUser.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]> {
		let getResponse:HTTP.Response.Class;
		return this.get( userURI, requestOptions ).then( ( [ user, response ]:[ PersistedUser.Class, HTTP.Response.Class ] ) => {
			getResponse = response;
			user.enabled = value;
			return user.save();
		} ).then( ( [ user, response ]:[ PersistedUser.Class, HTTP.Response.Class ] ) => {
			return [ user, [ getResponse, response ] ];
		} );
	}

	private resolveURI( userURI:string ):Promise<string> {
		return new Promise<string>( ( resolve:( uri:string ) => void ) => {
			let containerURI:string = this.context.resolve( this.getContainerURI() );
			let uri:string = URI.Util.resolve( containerURI, userURI );

			if( ! URI.Util.isBaseOf( containerURI, uri ) ) throw new Errors.IllegalArgumentError( "The URI provided is not a valid user of the current context." );

			resolve( uri );
		} );
	}

	private getContainerURI():string {
		if( ! this.context.hasSetting( "system.users.container" ) ) throw new Errors.IllegalStateError( "The users container URI hasn't been set." );
		return this.context.getSetting( "system.users.container" );
	}
}

export default Class;
