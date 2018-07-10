import { Context } from "../Context";
import { IllegalArgumentError } from "../Errors";
import { FreeResources } from "../FreeResources";
import {
	ModelDecorator,
	ModelPrototype
} from "../Model";
import {
	DigestedObjectSchema,
	ObjectSchemaResolver
} from "../ObjectSchema";
import { RDFNode } from "../RDF";
import { RegisteredPointer } from "../Registry";
import {
	BaseRepository,
	Repository,
	ResolvablePointer
} from "../Repository";
import { _getNotInContextMessage } from "../Repository/Utils";
import {
	HTTPError,
	statusCodeMap,
	UnknownError
} from "./Errors";
import {
	GETOptions,
	RequestOptions,
	RequestService,
	RequestUtils
} from "./Request";
import { Response } from "./Response";


export interface HTTPRepositoryTrait<M extends ResolvablePointer = ResolvablePointer> extends Repository<M> {
	readonly $context:Context<M & RegisteredPointer>;

	get<T extends object>( uri:string, requestOptions?:GETOptions ):Promise<T & M>;
	resolve<T extends object>( resource:M, requestOptions?:RequestOptions ):Promise<T & M>;
	exists( uri:string, requestOptions?:RequestOptions ):Promise<boolean>;

	refresh<T extends object>( resource:M, requestOptions?:RequestOptions ):Promise<T & M>;
	save<T extends object>( resource:M, requestOptions?:RequestOptions ):Promise<T & M>;
	saveAndRefresh<T extends object>( resource:M, requestOptions?:RequestOptions ):Promise<T & M>;

	delete( uri:string, requestOptions?:RequestOptions ):Promise<void>;

	_parseFailedResponse( response:Response | Error | null ):Promise<never>;
	_parseResponseData<T extends object>( response:Response, id:string ):Promise<T & M>;
	_parseFreeNodes( freeNodes:RDFNode[] ):FreeResources;
}


export type OverrodeMembers =
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
	& ModelPrototype<HTTPRepositoryTrait, Repository & ObjectSchemaResolver, OverrodeMembers>
	& ModelDecorator<HTTPRepositoryTrait<any>, BaseRepository>
	;

export const HTTPRepositoryTrait:GeneralRepositoryFactory = {
	PROTOTYPE: {
		get<T extends object>( this:HTTPRepositoryTrait, uri:string, requestOptions?:GETOptions ):Promise<T & ResolvablePointer> {
			if( this.$context.registry.inScope( uri ) ) return Promise.reject( new IllegalArgumentError( _getNotInContextMessage( uri ) ) );
			const url:string = this.$context.resolve( uri );

			if( this.$context.registry.hasPointer( url, true ) ) {
				const resource:ResolvablePointer = this.$context.registry.getPointer( url, true );
				if( resource.isResolved() ) {
					if( ! requestOptions.ensureLatest ) return Promise.resolve( resource as T & ResolvablePointer );
					RequestUtils.setIfNoneMatchHeader( resource.$eTag, requestOptions );
				}
			}

			return RequestService
				.get( url, requestOptions )
				.then( ( response:Response ) => {
					return this._parseResponseData<T>( response, uri );
				} )
				.catch( this._parseFailedResponse.bind( this ) );
		},

		resolve<T extends object>( this:HTTPRepositoryTrait, resource:ResolvablePointer, requestOptions?:RequestOptions ):Promise<T & ResolvablePointer> {
			return this.get<T>( resource.$id, requestOptions );
		},

		exists( this:HTTPRepositoryTrait, uri:string, requestOptions?:RequestOptions ):Promise<boolean> {
			if( this.$context.registry.inScope( uri ) ) return Promise.reject( new IllegalArgumentError( _getNotInContextMessage( uri ) ) );
			const url:string = this.$context.resolve( uri );

			return RequestService
				.head( url, requestOptions )
				.then( () => true )
				.catch<boolean>( ( response:Response ) => {
					if( response.status === 404 ) return false;
					return this._parseFailedResponse( response );
				} );
		},


		refresh<T extends object>( this:HTTPRepositoryTrait, resource:ResolvablePointer, requestOptions?:RequestOptions ):Promise<T & ResolvablePointer> {
			if( ! ResolvablePointer.is( resource ) ) return Promise.reject( new IllegalArgumentError( "The resource isn't a resolvable pointer." ) );

			if( this.$context.registry.inScope( resource.$id ) ) return Promise.reject( new IllegalArgumentError( _getNotInContextMessage( resource.$id ) ) );
			const url:string = this.$context.resolve( resource.$id );

			return RequestService
				.get( url, requestOptions )
				.then<T & ResolvablePointer>( ( response:Response ) => {
					return this._parseResponseData<T>( response, url );
				} )
				.catch<T & ResolvablePointer>( ( response:Response ) => {
					if( response.status === 304 ) return resource as T & ResolvablePointer;
					return this._parseFailedResponse( response );
				} )
				;
		},

		save<T extends object>( this:HTTPRepositoryTrait, resource:ResolvablePointer, requestOptions?:RequestOptions ):Promise<T & ResolvablePointer> {
			if( ! ResolvablePointer.is( resource ) ) return Promise.reject( new IllegalArgumentError( "The resource isn't a resolvable pointer." ) );

			if( this.$context.registry.inScope( resource.$id ) ) return Promise.reject( new IllegalArgumentError( _getNotInContextMessage( resource.$id ) ) );
			const url:string = this.$context.resolve( resource.$id );

			if( ! resource.isDirty() ) return Promise.resolve( resource as T & ResolvablePointer );

			const body:string = JSON.stringify( resource );
			return RequestService
				.put( url, body, requestOptions )
				.then( () => resource as T & ResolvablePointer )
				.catch( this._parseFailedResponse.bind( this ) )
				;
		},

		saveAndRefresh<T extends object>( this:HTTPRepositoryTrait, resource:ResolvablePointer, requestOptions?:RequestOptions ):Promise<T & ResolvablePointer> {
			return this
				.save<T>( resource, requestOptions )
				.then( () => this.refresh<T>( resource, requestOptions ) )
				;
		},


		delete( this:HTTPRepositoryTrait, uri:string, requestOptions?:RequestOptions ):Promise<void> {
			if( this.$context.registry.inScope( uri ) ) return Promise.reject( new IllegalArgumentError( _getNotInContextMessage( uri ) ) );
			const url:string = this.$context.resolve( uri );

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
};
