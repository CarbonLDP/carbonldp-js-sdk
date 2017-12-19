import { promiseMethod } from "../Utils";
import * as Context from "./../Context";
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as Pointer from "./../Pointer";
import * as URI from "./../RDF/URI";
import { QueryDocumentBuilder } from "./../SPARQL/QueryDocument";
import * as PersistedUser from "./PersistedUser";
import * as User from "./User";

export class Class {
	private context:Context.Class;

	constructor( context:Context.Class ) {
		this.context = context;
	}

	register( email:string, password:string, disabled?:boolean ):Promise<[ PersistedUser.Class, HTTP.Response.Class ]> {
		return this.registerWith( {}, email, password, disabled );
	}

	registerWith<T extends object>( userObject:T, email:string, password:string, disabled?:boolean ):Promise<[ T & PersistedUser.Class, HTTP.Response.Class ]> {
		return promiseMethod( () => {
			const requestUser:T & User.Class = User.Factory.createFrom( userObject, disabled );
			requestUser.setCredentials( email, password );

			const containerURI:string = this.resolveURI();
			return this
				.context
				.documents
				.createChildAndRetrieve<any>( containerURI, requestUser )
				;
		} );
	}

	get( userURI:string, requestOptions?:HTTP.Request.Options, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder.Class ) => QueryDocumentBuilder.Class ):Promise<[ PersistedUser.Class, HTTP.Response.Class ]>;
	get( userURI:string, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder.Class ) => QueryDocumentBuilder.Class ):Promise<[ PersistedUser.Class, HTTP.Response.Class ]>;
	get( userURI:string, queryBuilderFnOrOptions:any, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder.Class ) => QueryDocumentBuilder.Class ):Promise<[ PersistedUser.Class, HTTP.Response.Class ]> {
		return promiseMethod( () => {
			const uri:string = this.resolveURI( userURI );

			return this
				.context
				.documents
				.get<PersistedUser.Class>( uri, queryBuilderFnOrOptions, queryBuilderFn );
		} );
	}

	enable( userURI:string, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedUser.Class, HTTP.Response.Class[] ]> {
		return this
			.getPersistedUser( userURI )
			.then( persistedUser => {
				return persistedUser.enable( requestOptions );
			} );
	}

	disable( userURI:string, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedUser.Class, HTTP.Response.Class[] ]> {
		return this
			.getPersistedUser( userURI )
			.then( persistedUser => {
				return persistedUser.disable( requestOptions );
			} );
	}

	delete( userURI:string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
		return promiseMethod( () => {
			const uri:string = this.resolveURI( userURI );

			return this
				.context
				.documents
				.delete( uri, requestOptions );
		} );
	}

	private getPersistedUser( userURI:string ):Promise<PersistedUser.Class> {
		return promiseMethod( () => {
			const userID:string = this.resolveURI( userURI );
			const userPointer:Pointer.Class = this.context.documents.getPointer( userID );
			return PersistedUser.Factory.decorate( userPointer, this.context.documents );
		} );
	}

	private resolveURI( relativeURI?:string ):string {
		if( ! this.context.hasSetting( "users.container" ) ) throw new Errors.IllegalStateError( `The "users.container" setting hasn't been defined.` );
		const usersContainer:string = this.context.resolve( this.context.getSetting( "users.container" ) );

		if( ! relativeURI ) return usersContainer;

		const absoluteRoleURI:string = URI.Util.resolve( usersContainer, relativeURI );
		if( ! absoluteRoleURI.startsWith( usersContainer ) ) throw new Errors.IllegalArgumentError( `The URI "${ relativeURI }" isn't a valid user URI.` );

		return absoluteRoleURI;
	}

}

export default Class;
