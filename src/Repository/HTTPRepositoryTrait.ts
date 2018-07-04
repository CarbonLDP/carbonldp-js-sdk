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
	Header,
	RequestOptions,
	RequestService,
	RequestUtils,
	Response
} from "../HTTP";
import {
	BadResponseError,
	HTTPError,
	statusCodeMap,
	UnknownError
} from "../HTTP/Errors";
import { JSONLDParser } from "../JSONLD";
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


export interface HTTPRepositoryTrait extends Repository {
	readonly $context:Context<ResolvablePointer & RegisteredPointer>;


	_parseFailedResponse( response:Response | Error | null ):Promise<never>;

	_parseFreeNodes( freeNodes:RDFNode[] ):FreeResources;

	_parseResponseData( data:object[], response:Response, id:string ):ResolvablePointer;
}


const __PARSER:JSONLDParser = new JSONLDParser();

function __getNotInContextMessage( uri:string ):string {
	return `"${ uri }" is outside the scope of the repository context.`;
}

function __inScope( repository:Repository, uri:string ):boolean {
	return URI.isBaseOf( repository.$context.baseURI, uri );
}

function __getTargetID( id:string, response:Response ):string {
	const locationHeader:Header = response.getHeader( "Content-Location" );
	if( ! locationHeader ) return id;

	if( locationHeader.values.length !== 1 ) throw new BadResponseError( "The response must contain one Content-Location header.", response );
	const locationString:string = "" + locationHeader;

	if( ! locationString ) throw new BadResponseError( `The response doesn't contain a valid 'Content-Location' header.`, response );
	return locationString;
}

export type GeneralRepositoryFactory =
	& ModelPrototype<HTTPRepositoryTrait, Repository & ObjectSchemaResolver>
	& ModelDecorator<HTTPRepositoryTrait, BaseRepository>
	& ModelFactory<HTTPRepositoryTrait, BaseRepository>
	;

export const HTTPRepositoryTrait:GeneralRepositoryFactory = {
	PROTOTYPE: {
		get( this:HTTPRepositoryTrait, uri:string, requestOptions?:GETOptions ):Promise<ResolvablePointer> {
			const url:string = this.$context.resolve( uri );
			if( __inScope( this, url ) ) return Promise.reject( new IllegalArgumentError( __getNotInContextMessage( uri ) ) );

			if( this.$context.registry.hasPointer( url, true ) ) {
				const resource:ResolvablePointer = this.$context.registry.getPointer( url, true );
				if( resource.isResolved() ) {
					if( ! requestOptions.ensureLatest ) return Promise.resolve( resource );
					RequestUtils.setIfNoneMatchHeader( resource.$eTag, requestOptions );
				}
			}

			return RequestService
				.get( url, requestOptions, __PARSER )
				.then( ( [ rdfData, response ]:[ object[], Response ] ) => {
					const targetID:string = __getTargetID( url, response );
					return this._parseResponseData( rdfData, response, targetID );
				} )
				.catch( this._parseFailedResponse.bind( this ) );
		},

		resolve( this:HTTPRepositoryTrait, resource:ResolvablePointer, requestOptions?:RequestOptions ):Promise<ResolvablePointer> {
			return this.get( resource.$id, requestOptions );
		},


		refresh( this:HTTPRepositoryTrait, resource:ResolvablePointer, requestOptions?:RequestOptions ):Promise<ResolvablePointer> {
			if( ! ResolvablePointer.is( resource ) ) return Promise.reject( "The resource isn't a resolvable pointer." );

			const url:string = this.$context.resolve( resource.$id );
			if( __inScope( this, url ) ) return Promise.reject( new IllegalArgumentError( __getNotInContextMessage( resource.$id ) ) );

			return RequestService
				.get( url, requestOptions, __PARSER )
				.then<ResolvablePointer>( ( [ rdfData, response ] ) => {
					return this._parseResponseData( rdfData, response, url );
				} )
				.catch<ResolvablePointer>( ( response:Response ) => {
					if( response.status === 304 ) return resource;
					return this._parseFailedResponse( response );
				} )
				;
		},

		save( this:HTTPRepositoryTrait, resource:ResolvablePointer, requestOptions?:RequestOptions ):Promise<ResolvablePointer> {
			if( ! ResolvablePointer.is( resource ) ) return Promise.reject( "The resource isn't a resolvable pointer." );

			const url:string = this.$context.resolve( resource.$id );
			if( __inScope( this, url ) ) return Promise.reject( new IllegalArgumentError( __getNotInContextMessage( resource.$id ) ) );

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
			if( __inScope( this, url ) ) return Promise.reject( new IllegalArgumentError( __getNotInContextMessage( uri ) ) );

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

		_parseResponseData( this:HTTPRepositoryTrait, data:object[], response:Response, id:string ):ResolvablePointer {
			id = __getTargetID( id, response );

			const resolvable:ResolvablePointer = this.$context.registry
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
