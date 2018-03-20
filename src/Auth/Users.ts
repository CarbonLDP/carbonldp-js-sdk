import { promiseMethod } from "../Utils";
import { Context } from "../Context";
import * as Errors from "../Errors";
import { RequestOptions } from "../HTTP/Request";
import { Pointer } from "../Pointer";
import { URI } from "../RDF/URI";
import { QueryDocumentBuilder } from "./../SPARQL/QueryDocument";
import * as PersistedUser from "./PersistedUser";
import * as User from "./User";

export class Class {
	private context:Context;

	constructor( context:Context ) {
		this.context = context;
	}

	register( email:string, password:string, disabled?:boolean ):Promise<PersistedUser.Class> {
		return this.registerWith( {}, email, password, disabled );
	}

	registerWith<T extends object>( userObject:T, email:string, password:string, disabled?:boolean ):Promise<T & PersistedUser.Class> {
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

	get<T extends object>( userURI:string, requestOptions?:HTTP.Request.Options, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & PersistedUser.Class>;
	get<T extends object>( userURI:string, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & PersistedUser.Class>;
	get<T extends object>( userURI:string, queryBuilderFnOrOptions:any, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & PersistedUser.Class> {
		return promiseMethod( () => {
			const uri:string = this.resolveURI( userURI );

			return this
				.context
				.documents
				.get<T & PersistedUser.Class>( uri, queryBuilderFnOrOptions, queryBuilderFn );
		} );
	}

	enable( userURI:string, requestOptions?:RequestOptions ):Promise<PersistedUser.Class> {
		return this
			.getPersistedUser( userURI )
			.then( persistedUser => {
				return persistedUser.enable( requestOptions );
			} );
	}

	disable( userURI:string, requestOptions?:RequestOptions ):Promise<PersistedUser.Class> {
		return this
			.getPersistedUser( userURI )
			.then( persistedUser => {
				return persistedUser.disable( requestOptions );
			} );
	}

	delete( userURI:string, requestOptions?:RequestOptions ):Promise<void> {
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
			const userPointer:Pointer = this.context.documents.getPointer( userID );
			return PersistedUser.Factory.decorate( userPointer, this.context.documents );
		} );
	}

	private resolveURI( relativeURI?:string ):string {
		const usersContainer:string = this.context.resolve( this.getContainerURI() );

		if( ! relativeURI ) return usersContainer;

		const absoluteRoleURI:string = URI.resolve( usersContainer, relativeURI );
		if( ! absoluteRoleURI.startsWith( usersContainer ) ) throw new Errors.IllegalArgumentError( `The URI "${ relativeURI }" isn't a valid user URI.` );

		return absoluteRoleURI;
	}

	private getContainerURI():string {
		return this.context._resolvePath( "users" );
	}

}

export default Class;
