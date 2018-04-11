import { Context } from "../Context";
import * as Errors from "../Errors";
import {
	RequestOptions,
	RequestUtils,
} from "../HTTP/Request";
import { Pointer } from "../Pointer";
import { URI } from "../RDF/URI";
import {
	QueryDocumentBuilder,
	QueryDocumentsBuilder,
} from "../SPARQL/QueryDocument";
import {
	isString,
	promiseMethod,
} from "../Utils";
import * as PersistedRole from "./PersistedRole";
import { PersistedUser } from "./PersistedUser";

export type NewRole = {
	name:string;
	description?:string;
};

export class Class {
	private context:Context;

	constructor( context:Context ) {
		this.context = context;
	}

	createChild<T extends object>( parentRole:string | Pointer, role:T & NewRole, requestOptions?:RequestOptions ):Promise<T & PersistedRole.Class>;
	createChild<T extends object>( parentRole:string | Pointer, role:T & NewRole, slug?:string, requestOptions?:RequestOptions ):Promise<T & PersistedRole.Class>;
	createChild<T extends object>( parentRole:string | Pointer, role:T & NewRole, slugOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<T & PersistedRole.Class> {
		const slug:string = isString( slugOrRequestOptions ) ? slugOrRequestOptions : void 0;
		requestOptions = RequestUtils.isOptions( slugOrRequestOptions ) ? slugOrRequestOptions : requestOptions;

		let parentURI:string = isString( parentRole ) ? parentRole : parentRole.id;
		return promiseMethod( () => {
			parentURI = this.resolveURI( parentURI );

			return this.context
				.documents
				.exists( parentURI );
		} ).then( ( exists:boolean ) => {
			if( ! exists ) throw new Errors.IllegalArgumentError( `The parent role "${ parentURI }" doesn't exists.` );

			const container:string = this.resolveURI();
			return this.context
				.documents
				.createChild<T>( container, role, slug, requestOptions );
		} ).then( ( document ) => {
			return this.context
				.documents
				.addMember( parentURI, document );
		} ).then( () => {
			return PersistedRole.Factory.decorate( role, this.context.documents );
		} );
	}

	get<T extends object>( roleURI:string, requestOptions?:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & PersistedRole.Class>;
	get<T extends object>( roleURI:string, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & PersistedRole.Class>;
	get<T extends object>( roleURI:string, queryBuilderFnOrOptions:any, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & PersistedRole.Class> {
		return promiseMethod( () => {
			const uri:string = this.resolveURI( roleURI );

			return this.context
				.documents
				.get<T & PersistedRole.Class>( uri, queryBuilderFnOrOptions, queryBuilderFn );
		} );
	}

	getUsers<T extends object>( roleURI:string, requestOptions?:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & PersistedUser)[]>;
	getUsers<T extends object>( roleURI:string, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & PersistedUser)[]>;
	getUsers<T extends object>( roleURI:string, queryBuilderFnOrOptions:any, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & PersistedUser)[]> {
		return this
			.getUsersAccessPoint( roleURI )
			.then( accessPoint => {
				return this
					.context
					.documents
					.getMembers<T & PersistedUser>( accessPoint.id, queryBuilderFnOrOptions, queryBuilderFn );
			} );
	}

	addUser( roleURI:string, user:Pointer | string, requestOptions?:RequestOptions ):Promise<void> {
		return this.addUsers( roleURI, [ user ], requestOptions );
	}

	addUsers( roleURI:string, users:(Pointer | string)[], requestOptions?:RequestOptions ):Promise<void> {
		return this
			.getUsersAccessPoint( roleURI )
			.then( accessPoint => {
				return this
					.context
					.documents
					.addMembers( accessPoint.id, users, requestOptions );
			} );
	}

	removeUser( roleURI:string, user:Pointer | string, requestOptions?:RequestOptions ):Promise<void> {
		return this.removeUsers( roleURI, [ user ], requestOptions );
	}

	removeUsers( roleURI:string, users:(Pointer | string)[], requestOptions?:RequestOptions ):Promise<void> {
		return this
			.getUsersAccessPoint( roleURI )
			.then( ( accessPoint:Pointer ) => {
				return this
					.context
					.documents
					.removeMembers( accessPoint.id, users, requestOptions );
			} );
	}

	// TODO: Optimize
	private getUsersAccessPoint( roleURI:string ):Promise<Pointer> {
		return promiseMethod( () => {
			const uri:string = this.resolveURI( roleURI );

			return this.context
				.documents
				.executeSELECTQuery<{ accessPoint:Pointer }>( uri, `PREFIX:<https://carbonldp.com/ns/v1/>SELECT DISTINCT?accessPoint{<${ uri }>:platform#accessPoint?accessPoint.?accessPoint<http://www.w3.org/ns/ldp#hasMemberRelation>:security#user}` );
		} ).then( ( selectResults ) => {
			return selectResults.bindings[ 0 ].accessPoint;
		} );
	}

	private resolveURI( relativeURI?:string ):string {
		const containerURI:string = this.context._resolvePath( "system.security.roles" );

		if( ! relativeURI ) return containerURI;

		const absoluteURI:string = URI.resolve( containerURI, relativeURI );
		if( ! absoluteURI.startsWith( containerURI ) ) throw new Errors.IllegalArgumentError( `The URI "${ relativeURI }" isn't a valid role URI.` );

		return absoluteURI;
	}

}

export default Class;
