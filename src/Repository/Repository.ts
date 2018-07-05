import { Context } from "../Context";
import {
	ModelDecorator,
	ModelPrototype
} from "../core";
import { NotImplementedError } from "../Errors";
import { ObjectSchemaResolver } from "../ObjectSchema";
import { BaseRepository } from "./BaseRepository";
import { ResolvablePointer } from "./ResolvablePointer";


export interface Repository<M extends ResolvablePointer = ResolvablePointer> {
	readonly $context:Context;

	get( uri:string ):Promise<M>;
	resolve( resource:M ):Promise<M>;
	exists( uri:string ):Promise<boolean>;

	refresh( resource:M ):Promise<M>;
	save( resource:M ):Promise<M>;
	saveAndRefresh( resource:M ):Promise<M>;

	delete( uri:string ):Promise<void>;
}


function __throwNotImplemented():Promise<never> {
	return Promise.reject( new NotImplementedError( "Must be implemented in a repository implementation." ) );
}

// TODO: Use `unknown`
export type RepositoryFactory =
	& ModelPrototype<Repository, BaseRepository & ObjectSchemaResolver>
	& ModelDecorator<Repository<any>, BaseRepository>
	;

export const Repository:RepositoryFactory = {
	PROTOTYPE: {
		get: __throwNotImplemented,
		resolve: __throwNotImplemented,
		exists: __throwNotImplemented,

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
};
