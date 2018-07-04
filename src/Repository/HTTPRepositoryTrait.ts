import { Context } from "../Context";
import {
	ModelDecorator,
	ModelFactory,
	ModelPrototype
} from "../core";
import { IllegalArgumentError } from "../Errors";
import { FreeResources } from "../FreeResources";
import {
	GETOptions,
	RequestOptions,
	RequestService,
	RequestUtils,
	Response
} from "../HTTP";
import {
	HTTPError,
	statusCodeMap,
	UnknownError
} from "../HTTP/Errors";
import {
	DigestedObjectSchema,
	ObjectSchemaResolver
} from "../ObjectSchema";
import {
	RDFNode,
	URI
} from "../RDF";
import { RegisteredPointer } from "../Registry";
import { BaseRepository } from "./BaseRepository";
import { Repository } from "./Repository";
import { ResolvablePointer } from "./ResolvablePointer";


export interface HTTPRepositoryTrait<M extends ResolvablePointer = ResolvablePointer> extends Repository<M> {
	readonly $context:Context<M & RegisteredPointer>;

	get( uri:string, requestOptions?:GETOptions ):Promise<M>;
	resolve( resource:M, requestOptions?:RequestOptions ):Promise<M>;
	exists( uri:string, requestOptions?:RequestOptions ):Promise<boolean>;

	refresh( resource:M, requestOptions?:RequestOptions ):Promise<M>;
	save( resource:M, requestOptions?:RequestOptions ):Promise<M>;
	saveAndRefresh( resource:M, requestOptions?:RequestOptions ):Promise<M>;

	delete( uri:string, requestOptions?:RequestOptions ):Promise<void>;

	_parseFailedResponse( response:Response | Error | null ):Promise<never>;
	_parseResponseData<T extends object>( response:Response, id:string ):Promise<T & M>;
	_parseFreeNodes( freeNodes:RDFNode[] ):FreeResources;
}


export function _getNotInContextMessage( uri:string ):string {
	return `"${ uri }" is outside the scope of the repository context.`;
}

export function _inScope( repository:Repository, uri:string ):boolean {
	return URI.isBaseOf( repository.$context.baseURI, uri );
}

export type OverloadedMembers =
	| "get"
	| "resolve"
	| "exists"
	| "refresh"
	| "save"
	| "saveAndRefresh"
	| "delete"
	;

// FIXME: Use `unknown` for TS 3.0
export type GeneralRepositoryFactory =
	& ModelPrototype<HTTPRepositoryTrait, Repository & ObjectSchemaResolver, OverloadedMembers>
	& ModelDecorator<HTTPRepositoryTrait<any>, BaseRepository>
	& ModelFactory<HTTPRepositoryTrait<any>, BaseRepository>
	;

export const HTTPRepositoryTrait:GeneralRepositoryFactory = {
	PROTOTYPE: {
		get( this:HTTPRepositoryTrait, uri:string, requestOptions?:GETOptions ):Promise<ResolvablePointer> {
			const url:string = this.$context.resolve( uri );
			if( _inScope( this, url ) ) return Promise.reject( new IllegalArgumentError( _getNotInContextMessage( uri ) ) );

			if( this.$context.registry.hasPointer( url, true ) ) {
				const resource:ResolvablePointer = this.$context.registry.getPointer( url, true );
				if( resource.isResolved() ) {
					if( ! requestOptions.ensureLatest ) return Promise.resolve( resource );
					RequestUtils.setIfNoneMatchHeader( resource.$eTag, requestOptions );
				}
			}

			return RequestService
				.get( url, requestOptions )
				.then( ( response:Response ) => {
					return this._parseResponseData( response, uri );
				} )
				.catch( this._parseFailedResponse.bind( this ) );
		},

		resolve( this:HTTPRepositoryTrait, resource:ResolvablePointer, requestOptions?:RequestOptions ):Promise<ResolvablePointer> {
			return this.get( resource.$id, requestOptions );
		},

		exists( this:HTTPRepositoryTrait, uri:string, requestOptions?:RequestOptions ):Promise<boolean> {
			const url:string = this.$context.resolve( uri );
			if( _inScope( this, url ) ) return Promise.reject( new IllegalArgumentError( _getNotInContextMessage( uri ) ) );

			return RequestService
				.head( url, requestOptions )
				.then( () => true )
				.catch<boolean>( ( response:Response ) => {
					if( response.status === 404 ) return false;
					return this._parseFailedResponse( response );
				} );
		},


		refresh( this:HTTPRepositoryTrait, resource:ResolvablePointer, requestOptions?:RequestOptions ):Promise<ResolvablePointer> {
			if( ! ResolvablePointer.is( resource ) ) return Promise.reject( new IllegalArgumentError( "The resource isn't a resolvable pointer." ) );

			const url:string = this.$context.resolve( resource.$id );
			if( _inScope( this, url ) ) return Promise.reject( new IllegalArgumentError( _getNotInContextMessage( resource.$id ) ) );

			return RequestService
				.get( url, requestOptions )
				.then<ResolvablePointer>( ( response:Response ) => {
					return this._parseResponseData( response, url );
				} )
				.catch<ResolvablePointer>( ( response:Response ) => {
					if( response.status === 304 ) return resource;
					return this._parseFailedResponse( response );
				} )
				;
		},

		save( this:HTTPRepositoryTrait, resource:ResolvablePointer, requestOptions?:RequestOptions ):Promise<ResolvablePointer> {
			if( ! ResolvablePointer.is( resource ) ) return Promise.reject( new IllegalArgumentError( "The resource isn't a resolvable pointer." ) );

			const url:string = this.$context.resolve( resource.$id );
			if( _inScope( this, url ) ) return Promise.reject( new IllegalArgumentError( _getNotInContextMessage( resource.$id ) ) );

			if( ! resource.isDirty() ) return Promise.resolve( resource );

			const body:string = JSON.stringify( resource );
			return RequestService
				.put( url, body, requestOptions )
				.then( () => resource )
				.catch( this._parseFailedResponse.bind( this ) )
				;
		},

		saveAndRefresh( this:HTTPRepositoryTrait, resource:ResolvablePointer, requestOptions?:RequestOptions ):Promise<ResolvablePointer> {
			return this
				.save( resource, requestOptions )
				.then( () => this.refresh( resource, requestOptions ) )
				;
		},


		delete( this:HTTPRepositoryTrait, uri:string, requestOptions?:RequestOptions ):Promise<void> {
			const url:string = this.$context.resolve( uri );
			if( _inScope( this, url ) ) return Promise.reject( new IllegalArgumentError( _getNotInContextMessage( uri ) ) );

			return RequestService
				.delete( url, requestOptions )
				.then( () => {
					this.$context.registry.removePointer( url );
				} )
				.catch( this._parseFailedResponse.bind( this ) )
				;
		},


		_parseFailedResponse( this:HTTPRepositoryTrait, response:Response | Error | null ):Promise<never> {
			if( ! response || response instanceof Error ) return Promise.reject( response );

			if( ! statusCodeMap.has( response.status ) )
				return Promise.reject( new UnknownError( response.data, response ) );

			const error:HTTPError = new (statusCodeMap.get( response.status ))( response.data, response );
			return Promise.reject( error );
		},

		_parseFreeNodes( this:HTTPRepositoryTrait, freeNodes:RDFNode[] ):FreeResources {
			// TODO: FIXME
			const freeResources:FreeResources = FreeResources
				.createFrom( { _registry: this } as any );

			freeNodes
				.forEach( node => {
					const digestedSchema:DigestedObjectSchema = this.$context.registry.getSchemaFor( node );

					const target:object = freeResources.getPointer( node[ "@id" ], true );
					this.$context.jsonldConverter.compact( node, target, digestedSchema, freeResources );
				} );

			return freeResources;
		},

		async _parseResponseData<T extends object>( this:HTTPRepositoryTrait<T & ResolvablePointer>, response:Response, id:string ):Promise<T & ResolvablePointer> {
			const resolvable:T & ResolvablePointer = this.$context.registry
				.getPointer( id, true );

			resolvable.$eTag = response.getETag();
			resolvable._resolved = true;

			return resolvable;
		},
	},


	isDecorated( object:object ):object is HTTPRepositoryTrait {
		return ModelDecorator
			.hasPropertiesFrom( HTTPRepositoryTrait.PROTOTYPE, object )
			;
	},

	decorate<T extends BaseRepository>( object:T ):T & HTTPRepositoryTrait {
		if( HTTPRepositoryTrait.isDecorated( object ) ) return;

		const resource:T & Repository & ObjectSchemaResolver = ModelDecorator
			.decorateMultiple( object, Repository, ObjectSchemaResolver );

		return ModelDecorator
			.definePropertiesFrom( HTTPRepositoryTrait.PROTOTYPE, resource );
	},


	create<T extends object>( data:T & BaseRepository ):T & HTTPRepositoryTrait {
		const copy:T & BaseRepository = Object.assign( {}, data );
		return HTTPRepositoryTrait.createFrom( copy );
	},

	createFrom<T extends object>( object:T & BaseRepository ):T & HTTPRepositoryTrait {
		return HTTPRepositoryTrait.decorate( object );
	},
};
