import Context from "./../Context";
import * as Errors from "../Errors";
import * as HTTP from "./../HTTP";
import * as PersistedDocument from "./../PersistedDocument";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import { Pointer } from "./../Pointer";
import * as URI from "./../RDF/URI";
import * as SPARQL from "./../SPARQL";
import * as PersistedRole from "./PersistedRole";
import * as PersistedUser from "./PersistedUser";
import * as Role from "./Role";
import * as Utils from "./../Utils";

export class Class {
	private context:Context;

	constructor( context:Context ) {
		this.context = context;
	}

	// TODO: Requests must return all the responses made
	createChild<T extends object>( parentRole:string | Pointer, role:T & Role.Class, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedRole.Class, HTTP.Response.Class ]>;
	createChild<T extends object>( parentRole:string | Pointer, role:T & Role.Class, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedRole.Class, HTTP.Response.Class ]>;
	createChild<T extends object>( parentRole:string | Pointer, role:T & Role.Class, slugOrRequestOptions?:any, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedRole.Class, HTTP.Response.Class ]> {
		let parentURI:string = Utils.isString( parentRole ) ? parentRole : parentRole.id;
		let slug:string = Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;
		requestOptions = HTTP.Request.Util.isOptions( slugOrRequestOptions ) ? slugOrRequestOptions : requestOptions;

		let containerURI:string;
		let persistedRole:T & PersistedRole.Class;
		let responseCreated:HTTP.Response.Class;
		return Utils.promiseMethod( () => {
			containerURI = this.getContainerURI();

			parentURI = URI.Util.resolve( containerURI, parentURI );
			if( ! URI.Util.isBaseOf( containerURI, parentURI ) ) throw new Errors.IllegalArgumentError( "The parent role provided is not a valid role." );
			return this.context.documents.exists( parentURI );

		} ).then( ( [ exists, response ]:[ boolean, HTTP.Response.Class ] ) => {
			if( ! exists ) throw new Errors.IllegalArgumentError( "The parent role provided doesn't exist." );
			return this.context.documents.createChild<T>( containerURI, role, slug, requestOptions );

		} ).then( ( [ newRole, response ]:[ T & PersistedDocument.Class, HTTP.Response.Class ] ) => {
			responseCreated = response;
			persistedRole = PersistedRole.Factory.decorate( newRole, this.context.documents );
			return this.context.documents.addMember( parentURI, newRole );

		} ).then<[ T & PersistedRole.Class, HTTP.Response.Class ]>( ( response ) => {
			return [ persistedRole, responseCreated ];
		} );
	}

	get<T>( roleURI:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedRole.Class, HTTP.Response.Class ]> {
		return Utils.promiseMethod( () => {
			return this.context.documents.get<T & PersistedRole.Class>( this.resolveURI( roleURI ), requestOptions );
		} );
	}

	getUsers<T>( roleURI:string, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedUser.Class)[], HTTP.Response.Class ]>;
	getUsers<T>( roleURI:string, retrievalPreferencesOrRequestOptions?:any, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedUser.Class)[], HTTP.Response.Class ]> {
		// TODO: Implement in milestone:Security
		throw new Errors.NotImplementedError( "To be re-implemented in milestone:Security" );
	}

	addUser( roleURI:string, user:Pointer | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
		return this.addUsers( roleURI, [ user ], requestOptions );
	}

	addUsers( roleURI:string, users:(Pointer | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
		return this.getUsersAccessPoint( roleURI ).then( ( accessPoint:Pointer ) => {
			return this.context.documents.addMembers( accessPoint.id, users, requestOptions );
		} );
	}

	removeUser( roleURI:string, user:Pointer | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
		return this.removeUsers( roleURI, [ user ], requestOptions );
	}

	removeUsers( roleURI:string, users:(Pointer | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
		return this.getUsersAccessPoint( roleURI ).then( ( accessPoint:Pointer ) => {
			return this.context.documents.removeMembers( accessPoint.id, users, requestOptions );
		} );
	}

	private resolveURI( relativeURI:string ):string {
		const rolesContainer:string = this.getContainerURI();
		const absoluteRoleURI:string = URI.Util.resolve( rolesContainer, relativeURI );
		if( ! absoluteRoleURI.startsWith( rolesContainer ) ) throw new Errors.IllegalArgumentError( `The provided URI "${ relativeURI }" isn't a valid Carbon LDP role.` );

		return absoluteRoleURI;
	}

	// TODO: Optimize
	private getUsersAccessPoint( roleURI:string ):Promise<Pointer> {
		type AccessPointResult = { accessPoint:Pointer };

		return Utils.promiseMethod( () => {
			const uri:string = this.resolveURI( roleURI );
			return this.context.documents.executeSELECTQuery( uri, `PREFIX:<https://carbonldp.com/ns/v1/>SELECT DISTINCT?accessPoint{<${ uri }>:platform#accessPoint?accessPoint.?accessPoint<http://www.w3.org/ns/ldp#hasMemberRelation>:security#user}` );
		} ).then( ( [ selectResults, response ]:[ SPARQL.SELECTResults.Class<AccessPointResult>, HTTP.Response.Class ] ) => {
			return selectResults.bindings[ 0 ].accessPoint;
		} );
	}

	private getContainerURI():string {
		return this.context._resolvePath( "system.roles" );
	}

}

export default Class;
