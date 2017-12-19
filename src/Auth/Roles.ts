import {
	isString,
	Minus,
	promiseMethod,
} from "../Utils";
import Context from "./../Context";
import * as Document from "./../Document";
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as Pointer from "./../Pointer";
import * as URI from "./../RDF/URI";
import * as SPARQL from "./../SPARQL";
import {
	QueryDocumentBuilder,
	QueryDocumentsBuilder,
} from "./../SPARQL/QueryDocument";
import * as PersistedRole from "./PersistedRole";
import * as PersistedUser from "./PersistedUser";
import * as Role from "./Role";

export type NewRole = Minus<Role.Class, Document.Class>;

export class Class {
	private context:Context;

	constructor( context:Context ) {
		this.context = context;
	}

	// TODO: Requests must return all the responses made
	createChild<T extends object>( parentRole:string | Pointer.Class, role:T & NewRole, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedRole.Class, HTTP.Response.Class ]>;
	createChild<T extends object>( parentRole:string | Pointer.Class, role:T & NewRole, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedRole.Class, HTTP.Response.Class ]>;
	createChild<T extends object>( parentRole:string | Pointer.Class, role:T & NewRole, slugOrRequestOptions?:any, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedRole.Class, HTTP.Response.Class ]> {
		const slug:string = isString( slugOrRequestOptions ) ? slugOrRequestOptions : void 0;
		requestOptions = HTTP.Request.Util.isOptions( slugOrRequestOptions ) ? slugOrRequestOptions : requestOptions;

		let parentURI:string = isString( parentRole ) ? parentRole : parentRole.id;
		const responses:HTTP.Response.Class[] = [];
		return promiseMethod( () => {
			parentURI = this.resolveURI( parentURI );

			return this.context
				.documents
				.exists( parentURI );
		} ).then( ( [ exists ] ) => {
			if( ! exists ) throw new Errors.IllegalArgumentError( `The parent role "${ parentURI }" doesn't exists.` );

			const container:string = this.resolveURI();
			return this.context
				.documents
				.createChild<T>( container, role, slug, requestOptions );
		} ).then( ( [ document, response ] ) => {
			responses.push( response );

			return this.context
				.documents
				.addMember( parentURI, document );
		} ).then<[ T & PersistedRole.Class, HTTP.Response.Class ]>( () => {
			const persistedRole:T & PersistedRole.Class = PersistedRole.Factory.decorate( role, this.context.documents );
			return [ persistedRole, responses[ 0 ] ];
		} );
	}

	get<T extends object>( roleURI:string, requestOptions?:HTTP.Request.Options, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder.Class ) => QueryDocumentBuilder.Class ):Promise<[ T & PersistedRole.Class, HTTP.Response.Class ]>;
	get<T extends object>( roleURI:string, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder.Class ) => QueryDocumentBuilder.Class ):Promise<[ T & PersistedRole.Class, HTTP.Response.Class ]>;
	get<T extends object>( roleURI:string, queryBuilderFnOrOptions:any, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder.Class ) => QueryDocumentBuilder.Class ):Promise<[ T & PersistedRole.Class, HTTP.Response.Class ]> {
		return promiseMethod( () => {
			const uri:string = this.resolveURI( roleURI );

			return this.context
				.documents
				.get<T & PersistedRole.Class>( uri, queryBuilderFnOrOptions, queryBuilderFn );
		} );
	}

	getUsers<T extends object>( roleURI:string, requestOptions?:HTTP.Request.Options, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & PersistedUser.Class)[], HTTP.Response.Class ]>;
	getUsers<T extends object>( roleURI:string, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & PersistedUser.Class)[], HTTP.Response.Class ]>;
	getUsers<T extends object>( roleURI:string, queryBuilderFnOrOptions:any, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & PersistedUser.Class)[], HTTP.Response.Class ]> {
		return this
			.getUsersAccessPoint( roleURI )
			.then( accessPoint => {
				return this
					.context
					.documents
					.getMembers<T & PersistedUser.Class>( accessPoint.id, queryBuilderFnOrOptions, queryBuilderFn );
			} );
	}

	addUser( roleURI:string, user:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
		return this.addUsers( roleURI, [ user ], requestOptions );
	}

	addUsers( roleURI:string, users:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
		return this
			.getUsersAccessPoint( roleURI )
			.then( accessPoint => {
				return this
					.context
					.documents
					.addMembers( accessPoint.id, users, requestOptions );
			} );
	}

	removeUser( roleURI:string, user:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
		return this.removeUsers( roleURI, [ user ], requestOptions );
	}

	removeUsers( roleURI:string, users:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
		return this
			.getUsersAccessPoint( roleURI )
			.then( ( accessPoint:Pointer.Class ) => {
				return this
					.context
					.documents
					.removeMembers( accessPoint.id, users, requestOptions );
			} );
	}

	// TODO: Optimize
	private getUsersAccessPoint( roleURI:string ):Promise<Pointer.Class> {
		return promiseMethod( () => {
			const uri:string = this.resolveURI( roleURI );

			return this.context
				.documents
				.executeSELECTQuery( uri, `PREFIX:<https://carbonldp.com/ns/v1/>SELECT DISTINCT?accessPoint{<${ uri }>:platform#accessPoint?accessPoint.?accessPoint<http://www.w3.org/ns/ldp#hasMemberRelation>:security#user}` );
		} ).then( ( [ selectResults ]:[ SPARQL.SELECTResults.Class<{ accessPoint:Pointer.Class }>, HTTP.Response.Class ] ) => {
			return selectResults.bindings[ 0 ].accessPoint;
		} );
	}

	private resolveURI( relativeURI?:string ):string {
		if( ! this.context.hasSetting( "system.security.roles.container" ) ) throw new Errors.IllegalStateError( `The "system.security.roles.container" setting hasn't been defined.` );
		const containerURI:string = this.context.auth._resolveSecurityURL( this.context.getSetting( "system.security.roles.container" ) );

		if( ! relativeURI ) return containerURI;

		const absoluteURI:string = URI.Util.resolve( containerURI, relativeURI );
		if( ! absoluteURI.startsWith( containerURI ) ) throw new Errors.IllegalArgumentError( `The URI "${ relativeURI }" isn't a valid role URI.` );

		return absoluteURI;
	}

}

export default Class;
