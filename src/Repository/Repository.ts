import { NotImplementedError } from "../Errors/NotImplementedError";

import { BiModelDecorator } from "../Model/BiModelDecorator";
import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelPrototype } from "../Model/ModelPrototype";

import { ObjectSchemaResolver } from "../ObjectSchema/ObjectSchemaResolver";

import { Pointer } from "../Pointer/Pointer";

import { $BaseRepository, BaseRepository } from "./BaseRepository";
import { ResolvablePointer } from "./ResolvablePointer";


export interface Repository<MODEL extends ResolvablePointer = ResolvablePointer> {
	get( uri:string, ...params:any[] ):Promise<MODEL>;
	resolve( resource:MODEL, ...params:any[] ):Promise<MODEL>;
	exists( uri:string, ...params:any[] ):Promise<boolean>;

	refresh( resource:MODEL, ...params:any[] ):Promise<MODEL>;
	save( resource:MODEL, ...params:any[] ):Promise<MODEL>;
	saveAndRefresh( resource:MODEL, ...params:any[] ):Promise<MODEL>;

	delete( uri:string, ...params:any[] ):Promise<void>;
}

export interface $Repository<MODEL extends ResolvablePointer = ResolvablePointer> extends Pointer {
	$get( uri:string, ...params:any[] ):Promise<MODEL>;
	$resolve( resource:MODEL, ...params:any[] ):Promise<MODEL>;
	$exists( uri:string, ...params:any[] ):Promise<boolean>;

	refresh( resource:MODEL, ...params:any[] ):Promise<MODEL>;
	save( resource:MODEL, ...params:any[] ):Promise<MODEL>;
	saveAndRefresh( resource:MODEL, ...params:any[] ):Promise<MODEL>;

	delete( uri:string, ...params:any[] ):Promise<void>;
}


function __throwNotImplemented():Promise<never> {
	return Promise.reject( new NotImplementedError( "Must be implemented for a specific repository implementation." ) );
}

// TODO: Use `unknown`
export type RepositoryFactory =
	& ModelPrototype<Repository, BaseRepository & ObjectSchemaResolver>
	& BiModelDecorator<Repository<any>, $Repository<any>, BaseRepository, $BaseRepository>
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


	isDecorated( object:object ):object is any {
		return ModelDecorator
			.hasPropertiesFrom( Repository.PROTOTYPE, object )
			;
	},

	decorate<T extends BaseRepository>( object:T ):T & any {
		if( Repository.isDecorated( object ) ) return;

		return ModelDecorator
			.definePropertiesFrom( Repository.PROTOTYPE, object );
	},
};
