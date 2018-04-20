import { Context } from "../Context";
import * as Errors from "../Errors";
import {
	RequestOptions,
	RequestUtils,
} from "../HTTP/Request";
import { Document } from "../Document";
import { Pointer } from "../Pointer";
import { URI } from "../RDF/URI";
import { SPARQLSelectResults } from "../SPARQL/SelectResults";
import * as Utils from "./../Utils";
import * as PersistedRole from "./PersistedRole";
import { User } from "./User";
import * as Role from "./Role";

export class Class {
	private context:Context;

	constructor( context:Context ) {
		this.context = context;
	}

	// TODO: Requests must return all the responses made
	createChild<T extends object>( parentRole:string | Pointer, role:T & Role.Class, requestOptions?:RequestOptions ):Promise<T & PersistedRole.Class>;
	createChild<T extends object>( parentRole:string | Pointer, role:T & Role.Class, slug?:string, requestOptions?:RequestOptions ):Promise<T & PersistedRole.Class>;
	createChild<T extends object>( parentRole:string | Pointer, role:T & Role.Class, slugOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<T & PersistedRole.Class> {
		let parentURI:string = Utils.isString( parentRole ) ? parentRole : parentRole.id;
		let slug:string = Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;
		requestOptions = RequestUtils.isOptions( slugOrRequestOptions ) ? slugOrRequestOptions : requestOptions;

		let containerURI:string;
		let persistedRole:T & PersistedRole.Class;
		return Utils.promiseMethod( () => {
			containerURI = this.getContainerURI();

			parentURI = URI.resolve( containerURI, parentURI );
			if( ! URI.isBaseOf( containerURI, parentURI ) ) throw new Errors.IllegalArgumentError( "The parent role provided is not a valid role." );
			return this.context.documents.exists( parentURI );

		} ).then( ( exists:boolean ) => {
			if( ! exists ) throw new Errors.IllegalArgumentError( "The parent role provided doesn't exist." );
			return this.context.documents.createChild<T>( containerURI, role, slug, requestOptions );

		} ).then( ( newRole:T & Document ) => {
			persistedRole = PersistedRole.Factory.decorate( newRole, this.context.documents );
			return this.context.documents.addMember( parentURI, newRole );

		} ).then( () => {
			return persistedRole;
		} );
	}

	get<T>( roleURI:string, requestOptions?:RequestOptions ):Promise<T & PersistedRole.Class> {
		return Utils.promiseMethod( () => {
			const uri:string = this.resolveURI( roleURI );
			return this.context.documents.get<T & PersistedRole.Class>( uri, requestOptions );
		} );
	}

	getUsers<T>( roleURI:string, requestOptions?:RequestOptions ):Promise<(T & User)[]>;
	getUsers<T>( roleURI:string, retrievalPreferencesOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<(T & User)[]> {
		// TODO: Implement in milestone:Security
		throw new Errors.NotImplementedError( "To be re-implemented in milestone:Security" );
	}

	addUser( roleURI:string, user:Pointer | string, requestOptions?:RequestOptions ):Promise<void> {
		return this.addUsers( roleURI, [ user ], requestOptions );
	}

	addUsers( roleURI:string, users:(Pointer | string)[], requestOptions?:RequestOptions ):Promise<void> {
		return this.getUsersAccessPoint( roleURI ).then( ( accessPoint:Pointer ) => {
			return this.context.documents.addMembers( accessPoint.id, users, requestOptions );
		} );
	}

	removeUser( roleURI:string, user:Pointer | string, requestOptions?:RequestOptions ):Promise<void> {
		return this.removeUsers( roleURI, [ user ], requestOptions );
	}

	removeUsers( roleURI:string, users:(Pointer | string)[], requestOptions?:RequestOptions ):Promise<void> {
		return this.getUsersAccessPoint( roleURI ).then( ( accessPoint:Pointer ) => {
			return this.context.documents.removeMembers( accessPoint.id, users, requestOptions );
		} );
	}

	private resolveURI( relativeURI:string ):string {
		const rolesContainer:string = this.getContainerURI();
		const absoluteRoleURI:string = URI.resolve( rolesContainer, relativeURI );
		if( ! absoluteRoleURI.startsWith( rolesContainer ) ) throw new Errors.IllegalArgumentError( `The provided URI "${ relativeURI }" isn't a valid Carbon LDP role.` );

		return absoluteRoleURI;
	}

	// TODO: Optimize
	private getUsersAccessPoint( roleURI:string ):Promise<Pointer> {
		return Utils.promiseMethod( () => {
			const uri:string = this.resolveURI( roleURI );
			return this.context.documents.executeSELECTQuery( uri, `PREFIX:<https://carbonldp.com/ns/v1/>SELECT DISTINCT?accessPoint{<${ uri }>:platform#accessPoint?accessPoint.?accessPoint<http://www.w3.org/ns/ldp#hasMemberRelation>:security#user}` );
		} ).then( ( selectResults:SPARQLSelectResults<{ accessPoint:Pointer }>) => {
			return selectResults.bindings[ 0 ].accessPoint;
		} );
	}

	private getContainerURI():string {
		return this.context._resolvePath( "system.roles" );
	}

}

export default Class;
