import { Context } from "../Context";
import * as Errors from "../Errors";
import { RequestOptions } from "../HTTP/Request";
import { Response } from "../HTTP/Response";
import { Pointer } from "../Pointer";
import { promiseMethod } from "../Utils";
import * as URI from "./../RDF/URI";
import * as Credentials from "./Credentials";
import * as PersistedCredentials from "./PersistedCredentials";
import * as PersistedUser from "./PersistedUser";

export class Class {
	private context:Context;

	constructor( context:Context ) {
		this.context = context;
	}

	register( email:string, password:string, enabled?:boolean ):Promise<[ PersistedUser.Class, Response ]> {
		const credentials:Credentials.Class = Credentials.Factory.create( email, password );
		credentials.enabled = enabled;
		return promiseMethod( () => {
			const containerURI:string = this.getCredentialsContainerURI();
			return this.context.documents.createChildAndRetrieve<PersistedCredentials.Class>( containerURI, credentials as any );
		} ).then<[ PersistedUser.Class, Response ]>( ( [ persistedCredentials, response ] ) => {
			return [ persistedCredentials.user, response ];
		} );
	}

	get( userURI:string, requestOptions?:RequestOptions ):Promise<[ PersistedUser.Class, Response ]> {
		return new Promise( resolve =>
			resolve( this.context.documents.get( this.resolveURI( userURI ), requestOptions ) )
		);
	}

	enableCredentials( userURI:string, requestOptions?:RequestOptions ):Promise<[ PersistedUser.Class, Response[] ]> {
		return this.changeEnabledStatus( userURI, true, requestOptions );
	}

	disableCredentials( userURI:string, requestOptions?:RequestOptions ):Promise<[ PersistedUser.Class, Response[] ]> {
		return this.changeEnabledStatus( userURI, false, requestOptions );
	}

	delete( userURI:string, requestOptions?:RequestOptions ):Promise<Response> {
		return new Promise( resolve =>
			resolve( this.context.documents.delete( this.resolveURI( userURI ), requestOptions ) )
		);
	}

	private changeEnabledStatus( userURI:string, value:boolean, requestOptions?:RequestOptions ):Promise<[ PersistedUser.Class, Response[] ]> {
		return Promise.resolve().then( () => {
			const absoluteUserURI:string = this.resolveURI( userURI );
			const userPointer:Pointer = this.context.documents.getPointer( absoluteUserURI );
			const persistedUser:PersistedUser.Class = PersistedUser.Factory.decorate( userPointer, this.context.documents );

			if( value ) return persistedUser.enableCredentials( requestOptions );
			return persistedUser.disableCredentials( requestOptions );
		} );
	}

	private resolveURI( relativeURI:string ):string {
		const usersContainer:string = this.getContainerURI();
		const absoluteRoleURI:string = URI.Util.resolve( usersContainer, relativeURI );
		if( ! absoluteRoleURI.startsWith( usersContainer ) ) throw new Errors.IllegalArgumentError( `The provided URI "${ relativeURI }" isn't a valid Carbon LDP user.` );

		return absoluteRoleURI;
	}

	private getContainerURI():string {
		return this.context._resolvePath( "users" );
	}

	private getCredentialsContainerURI():string {
		return this.context._resolvePath( "system.credentials" );
	}
}

export default Class;
