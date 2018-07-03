import { Context } from "../Context";
import {
	ModelDecorator,
	ModelFactory,
	ModelPrototype
} from "../core";
import {
	IllegalArgumentError,
	NotImplementedError
} from "../Errors";
import { FreeResources } from "../FreeResources";
import {
	GETOptions,
	RequestOptions,
	Response
} from "../HTTP";
import {
	HTTPError,
	statusCodeMap,
	UnknownError
} from "../HTTP/Errors";
import {
	JSONLDConverter,
	JSONLDParser
} from "../JSONLD";
import { ErrorResponse } from "../LDP";
import {
	DigestedObjectSchema,
	ObjectSchemaResolver
} from "../ObjectSchema";
import { PointerLibrary } from "../Pointer";
import { RDFNode } from "../RDF";
import { RegisteredPointer } from "../Registry";
import { TransientResource } from "../Resource";
import { MapUtils } from "../Utils";
import { BaseRepository } from "./BaseRepository";
import { ResolvablePointer } from "./ResolvablePointer";


export interface Repository<M extends ResolvablePointer = ResolvablePointer> extends ObjectSchemaResolver {
	readonly $context:Context<RegisteredPointer, M>;
	readonly $jsonldConverter:JSONLDConverter;


	get( uri:string, requestOptions?:GETOptions ):Promise<M>;
	resolve( resource:M, requestOptions?:RequestOptions ):Promise<M>;

	refresh( resource:M, requestOptions?:RequestOptions ):Promise<M>;
	save( resource:M, requestOptions?:RequestOptions ):Promise<M>;
	saveAndRefresh( resource:M, requestOptions?:RequestOptions ):Promise<M>;

	delete( uri:string, requestOptions?:RequestOptions ):Promise<void>;


	_parseFailedResponse( response:Response | Error | null ):Promise<never>;
	_parseFreeNodes( freeNodes:RDFNode[] ):FreeResources;
	_parseResponseData( data:object[], response:Response, target:string ):M;
}


function __compactRDFNodes( this:void, repository:Repository, nodes:RDFNode[], targets:object[], library:PointerLibrary ):void {
	nodes.forEach( ( node, i ) => {
		const digestedSchema:DigestedObjectSchema = repository.getSchemaFor( node );

		const target:object = targets[ i ] || {};
		repository.$jsonldConverter.compact( node, target, digestedSchema, library );
	} );
}

function __throwNotImplemented():Promise<never> {
	return Promise.reject( new NotImplementedError( "Must be implemented in a repository implementation." ) );
}

export type RepositoryFactory =
	& ModelPrototype<Repository, BaseRepository & ObjectSchemaResolver>
	& ModelFactory<Repository, BaseRepository>
	& ModelDecorator<Repository, BaseRepository>
	;

const Repository:RepositoryFactory = {
	PROTOTYPE: {
		get $jsonldConverter():JSONLDConverter { return new JSONLDConverter(); },

		get: __throwNotImplemented,
		resolve: __throwNotImplemented,

		refresh: __throwNotImplemented,
		save: __throwNotImplemented,
		saveAndRefresh: __throwNotImplemented,

		delete: __throwNotImplemented,

		_parseFailedResponse( this:Repository, response:Response | Error | null ):Promise<never> {
			if( ! response || response instanceof Error ) return Promise.reject( response );

			if( ! statusCodeMap.has( response.status ) )
				return Promise.reject( new UnknownError( response.data, response ) );

			const error:HTTPError = new (statusCodeMap.get( response.status ))( response.data, response );
			if( ! response.data ) return Promise.reject( error );

			return new JSONLDParser()
				.parse( response.data )
				.then( ( freeNodes:RDFNode[] ) => {
					const freeResources:FreeResources = this._parseFreeNodes( freeNodes );

					const errorResponses:ErrorResponse[] = freeResources
						.getPointers( true )
						.filter( ErrorResponse.is );

					if( errorResponses.length === 0 ) return Promise.reject( new IllegalArgumentError( "The response string does not contains a c:ErrorResponse." ) );
					if( errorResponses.length > 1 ) return Promise.reject( new IllegalArgumentError( "The response string contains multiple c:ErrorResponse." ) );

					const errorResponse:ErrorResponse = Object.assign( error, errorResponses[ 0 ] );
					error.message = ErrorResponse.getMessage( errorResponse );
					return Promise.reject( error );
				}, () => {
					return Promise.reject( error );
				} );
		},
		_parseFreeNodes( this:Repository, freeNodes:RDFNode[] ):FreeResources {
			// TODO: FIXME
			const freeResourcesDocument:FreeResources = FreeResources
				.createFrom( { _registry: this } as any );

			const resources:TransientResource[] = freeNodes
				.map( node => freeResourcesDocument._register( { id: node[ "@id" ] } ) );

			__compactRDFNodes( this, freeNodes, resources, freeResourcesDocument );

			return freeResourcesDocument;
		},
		_parseResponseData( this:Repository, data:object[], response:Response, target:string ):ResolvablePointer {
			const registered:RegisteredPointer = this.$context.registry.getPointer( target, true );
			const resolvable:ResolvablePointer = ResolvablePointer.decorate( registered );

			resolvable.$eTag = response.getETag();
			resolvable._resolved = true;

			return resolvable;
		},
	},

	isDecorated( object:object ):object is Repository {
		return ModelDecorator
			.hasPropertiesFrom( Repository.PROTOTYPE, object )
			;
	},
	decorate<T extends BaseRepository>( object:T ):T & Repository {
		if( Repository.isDecorated( object ) ) return;

		const resource:T & ObjectSchemaResolver = ModelDecorator
			.decorateMultiple( object, ObjectSchemaResolver );

		return ModelDecorator
			.definePropertiesFrom( Repository.PROTOTYPE, resource );
	},

	create<T extends object>( data:T & BaseRepository ):T & Repository {
		const copy:T & BaseRepository = Object.assign( {}, data );
		return Repository.createFrom( copy );
	},
	createFrom<T extends object>( object:T & BaseRepository ):T & Repository {
		const resource:T & Repository = Repository.decorate( object );

		if( object.$context.parentContext && object.$context.parentContext.repository )
			MapUtils.extend( resource.$jsonldConverter.literalSerializers, object.$context.parentContext.repository.$jsonldConverter.literalSerializers );

		return resource;
	},
};
