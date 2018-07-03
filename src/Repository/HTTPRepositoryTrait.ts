import { Context } from "../Context";
import {
	ModelDecorator,
	ModelFactory,
	ModelPrototype
} from "../core";
import { FreeResources } from "../FreeResources";
import {
	Header,
	Response
} from "../HTTP";
import {
	BadResponseError,
	HTTPError,
	statusCodeMap,
	UnknownError
} from "../HTTP/Errors";
import {
	DigestedObjectSchema,
	ObjectSchemaResolver
} from "../ObjectSchema";
import { RDFNode } from "../RDF";
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
