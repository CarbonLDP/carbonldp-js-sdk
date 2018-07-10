import { NotImplementedError } from "../Errors";
import {
	ModelDecorator,
	ModelPrototype
} from "../Model";
import { ObjectSchemaResolver } from "../ObjectSchema";
import { BaseRepository } from "./BaseRepository";
import { ResolvablePointer } from "./ResolvablePointer";


export interface Repository<M extends ResolvablePointer = ResolvablePointer> {
	get( uri:string, ...params:any[] ):Promise<M>;
	resolve( resource:M, ...params:any[] ):Promise<M>;
	exists( uri:string, ...params:any[] ):Promise<boolean>;

	refresh( resource:M, ...params:any[] ):Promise<M>;
	save( resource:M, ...params:any[] ):Promise<M>;
	saveAndRefresh( resource:M, ...params:any[] ):Promise<M>;

	delete( uri:string, ...params:any[] ):Promise<void>;
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
