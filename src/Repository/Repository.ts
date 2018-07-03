import { Context } from "../Context";
import {
	ModelDecorator,
	ModelFactory,
	ModelPrototype
} from "../core";
import { NotImplementedError } from "../Errors";
import {
	GETOptions,
	RequestOptions
} from "../HTTP";
import { ObjectSchemaResolver } from "../ObjectSchema";
import { BaseRepository } from "./BaseRepository";
import { ResolvablePointer } from "./ResolvablePointer";


export interface Repository<M extends ResolvablePointer = ResolvablePointer> {
	readonly $context:Context;

	get( uri:string, requestOptions?:GETOptions ):Promise<M>;
	resolve( resource:M, requestOptions?:RequestOptions ):Promise<M>;

	refresh( resource:M, requestOptions?:RequestOptions ):Promise<M>;
	save( resource:M, requestOptions?:RequestOptions ):Promise<M>;
	saveAndRefresh( resource:M, requestOptions?:RequestOptions ):Promise<M>;

	delete( uri:string, requestOptions?:RequestOptions ):Promise<void>;
}


function __throwNotImplemented():Promise<never> {
	return Promise.reject( new NotImplementedError( "Must be implemented in a repository implementation." ) );
}

export type RepositoryFactory =
	& ModelPrototype<Repository, BaseRepository & ObjectSchemaResolver>
	& ModelFactory<Repository, BaseRepository>
	& ModelDecorator<Repository, BaseRepository>
	;

export const Repository:RepositoryFactory = {
	PROTOTYPE: {
		get: __throwNotImplemented,
		resolve: __throwNotImplemented,

		refresh: __throwNotImplemented,
		save: __throwNotImplemented,
		saveAndRefresh: __throwNotImplemented,

		delete: __throwNotImplemented,
	},


	isDecorated( object:object ):object is Repository {
		return ModelDecorator
			.hasPropertiesFrom( Repository.PROTOTYPE, object )
			;
	},

	decorate<T extends BaseRepository>( object:T ):T & Repository {
		if( Repository.isDecorated( object ) ) return;

		return ModelDecorator
			.definePropertiesFrom( Repository.PROTOTYPE, object );
	},


	create<T extends object>( data:T & BaseRepository ):T & Repository {
		const copy:T & BaseRepository = Object.assign( {}, data );
		return Repository.createFrom( copy );
	},

	createFrom<T extends object>( object:T & BaseRepository ):T & Repository {
		return Repository.decorate( object );
	},
};
