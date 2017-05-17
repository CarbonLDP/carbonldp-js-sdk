import Context from "./../Context";
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as PersistedDocument from "./../PersistedDocument";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as Pointer from "./../Pointer";
import * as URI from "./../RDF/URI";
import * as RetrievalPreferences from "./../RetrievalPreferences";
import * as SPARQL from "./../SPARQL";
import * as Utils from "./../Utils";
import * as PersistedRole from "./PersistedRole";
import * as PersistedUser from "./PersistedUser";
import * as Role from "./Role";

export class Class {
	private context:Context;

	constructor( context:Context ) {
		this.context = context;
	}

	// TODO: Requests must return all the responses made
	createChild<T extends Role.Class>( parentRole:string | Pointer.Class, role:T, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedRole.Class, HTTP.Response.Class ]>;
	createChild<T extends Role.Class>( parentRole:string | Pointer.Class, role:T, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedRole.Class, HTTP.Response.Class ]>;
	createChild<T extends Role.Class>( parentRole:string | Pointer.Class, role:T, slugOrRequestOptions?:any, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedRole.Class, HTTP.Response.Class ]> {
		let parentURI:string = Utils.isString( parentRole ) ? <string> parentRole : ( <Pointer.Class> parentRole).id;
		let slug:string = Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;
		requestOptions = HTTP.Request.Util.isOptions( slugOrRequestOptions ) ? slugOrRequestOptions : requestOptions;

		let containerURI:string;
		let persistedRole:T & PersistedRole.Class;
		let responseCreated:HTTP.Response.Class;
		return Promise.resolve().then( () => {
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

		} ).then( ( response ) => {
			return [ persistedRole, responseCreated ];
		} );
	}

	get<T>( roleURI:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedRole.Class, HTTP.Response.Class ]> {
		return Promise.resolve().then( () => {
			return this.context.documents.get<T & PersistedRole.Class>( this.resolveURI( roleURI ), requestOptions );
		} );
	}

	listUsers( roleURI:string, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedProtectedDocument.Class[], HTTP.Response.Class ]> {
		return this.getUsersAccessPoint( roleURI ).then( ( usersAccessPoint:Pointer.Class ) => {
			return this.context.documents.listMembers( usersAccessPoint.id, requestOptions );
		} ).then( ( [ users, response ]:[ PersistedDocument.Class[], HTTP.Response.Class ] ) => {
			return [ users.map( user => PersistedProtectedDocument.Factory.decorate( user, this.context.documents ) ), response ];
		} );
	}

	getUsers<T>( roleURI:string, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedUser.Class)[], HTTP.Response.Class ]>;
	getUsers<T>( roleURI:string, retrievalPreferences?:RetrievalPreferences.Class, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedUser.Class)[], HTTP.Response.Class ]>;
	getUsers<T>( roleURI:string, retrievalPreferencesOrRequestOptions?:RetrievalPreferences.Class, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedUser.Class)[], HTTP.Response.Class ]> {
		return this.getUsersAccessPoint( roleURI ).then( ( usersAccessPoint:Pointer.Class ) => {
			return this.context.documents.getMembers<T>( usersAccessPoint.id, retrievalPreferencesOrRequestOptions, requestOptions );
		} );
	}

	addUser( roleURI:string, user:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
		return this.addUsers( roleURI, [ user ], requestOptions );
	}

	addUsers( roleURI:string, users:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
		return this.getUsersAccessPoint( roleURI ).then( ( usersAccessPoint:Pointer.Class ) => {
			return this.context.documents.addMembers( usersAccessPoint.id, users, requestOptions );
		} );
	}

	removeUser( roleURI:string, user:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
		return this.removeUsers( roleURI, [ user ], requestOptions );
	}

	removeUsers( roleURI:string, users:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
		return this.getUsersAccessPoint( roleURI ).then( ( usersAccessPoint:Pointer.Class ) => {
			return this.context.documents.removeMembers( usersAccessPoint.id, users, requestOptions );
		} );
	}

	private resolveURI( relativeURI:string ):string {
		const rolesContainer:string = this.getContainerURI();
		const absoluteRoleURI:string = URI.Util.resolve( rolesContainer, relativeURI );
		if( ! absoluteRoleURI.startsWith( rolesContainer ) ) throw new Errors.IllegalArgumentError( `The provided URI "${ relativeURI }" isn't a valid Carbon LDP role.` );

		return absoluteRoleURI;
	}

	// TODO: Optimize
	private getUsersAccessPoint( roleURI:string ):Promise<Pointer.Class> {
		return Promise.resolve()
			.then( () => this.resolveURI( roleURI ) )
			.then( ( uri:string ) => this.context.documents.executeSELECTQuery( uri, `select distinct ?usersAccessPoint where {
				<${ uri }> <https://carbonldp.com/ns/v1/platform#accessPoint> ?usersAccessPoint .
				?usersAccessPoint <http://www.w3.org/ns/ldp#hasMemberRelation> <https://carbonldp.com/ns/v1/security#user> .
			}` ) )
			.then( ( [ selectResults, response ]:[ SPARQL.SELECTResults.Class, HTTP.Response.Class ] ) => {
				return <Pointer.Class> selectResults.bindings[ 0 ][ "usersAccessPoint" ];
			} );
	}

	private getContainerURI():string {
		if( ! this.context.hasSetting( "system.roles.container" ) ) throw new Errors.IllegalStateError( `The "system.roles.container" setting hasn't been defined.` );
		return this.context.resolveSystemURI( this.context.getSetting( "system.roles.container" ) );
	}

}

export default Class;
