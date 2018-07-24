import { Context } from "../../Context/Context";

import { IllegalArgumentError } from "../../Errors/IllegalArgumentError";

import { BaseGeneralRepository } from "../../GeneralRepository/BaseGeneralRepository";
import { GeneralRepository } from "../../GeneralRepository/GeneralRepository";

import { HTTPError } from "../../HTTP/Errors/HTTPError";
import { GETOptions, RequestOptions, RequestService, RequestUtils } from "../../HTTP/Request";
import { Response } from "../../HTTP/Response";

import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";

import { RegisteredPointer } from "../../Registry/RegisteredPointer";
import { ResolvablePointer } from "../../Repository/ResolvablePointer";


export interface HTTPRepositoryTrait<MODEL extends ResolvablePointer = ResolvablePointer> extends GeneralRepository<MODEL> {
	readonly $context:Context<MODEL & RegisteredPointer, MODEL>;

	get<T extends object>( uri:string, requestOptions?:GETOptions ):Promise<T & MODEL>;
	resolve<T extends object>( resource:MODEL, requestOptions?:RequestOptions ):Promise<T & MODEL>;
	exists( uri:string, requestOptions?:RequestOptions ):Promise<boolean>;

	refresh<T extends object>( resource:MODEL, requestOptions?:RequestOptions ):Promise<T & MODEL>;
	save<T extends object>( resource:MODEL, requestOptions?:RequestOptions ):Promise<T & MODEL>;
	saveAndRefresh<T extends object>( resource:MODEL, requestOptions?:RequestOptions ):Promise<T & MODEL>;

	delete( uri:string, requestOptions?:RequestOptions ):Promise<void>;

	_parseResponseData<T extends object>( response:Response, id:string ):Promise<T & MODEL>;
}


export type OverriddenMembers =
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
	& ModelPrototype<HTTPRepositoryTrait, GeneralRepository, OverriddenMembers>
	& ModelDecorator<HTTPRepositoryTrait<any>, BaseGeneralRepository>
	;

export const HTTPRepositoryTrait:GeneralRepositoryFactory = {
	PROTOTYPE: {
		get<T extends object>( this:HTTPRepositoryTrait, uri:string, requestOptions?:GETOptions ):Promise<T & ResolvablePointer> {
			if( ! this.$context.registry.inScope( uri, true ) ) return Promise.reject( new IllegalArgumentError( `"${ uri }" is out of scope.` ) );
			const url:string = this.$context.getObjectSchema().resolveURI( uri, { base: true } );

			if( this.$context.registry.hasPointer( url, true ) ) {
				const resource:ResolvablePointer = this.$context.registry.getPointer( url, true );
				if( resource.isResolved() && ! requestOptions.ensureLatest )
					return Promise.resolve( resource as T & ResolvablePointer );
			}

			return RequestService
				.get( url, requestOptions )
				.then( ( response:Response ) => {
					return this._parseResponseData<T>( response, url );
				} );
		},

		resolve<T extends object>( this:HTTPRepositoryTrait, resource:ResolvablePointer, requestOptions?:RequestOptions ):Promise<T & ResolvablePointer> {
			return this.get<T>( resource.$id, requestOptions );
		},

		exists( this:HTTPRepositoryTrait, uri:string, requestOptions?:RequestOptions ):Promise<boolean> {
			if( ! this.$context.registry.inScope( uri, true ) ) return Promise.reject( new IllegalArgumentError( `"${ uri }" is out of scope.` ) );
			const url:string = this.$context.getObjectSchema().resolveURI( uri, { base: true } );

			return RequestService
				.head( url, requestOptions )
				.then( () => true )
				.catch<boolean>( ( error:HTTPError | Error ) => {
					if( "response" in error && error.response.status === 404 ) return false;
					return Promise.reject( error );
				} );
		},


		refresh<T extends object>( this:HTTPRepositoryTrait, resource:ResolvablePointer, requestOptions?:RequestOptions ):Promise<T & ResolvablePointer> {
			if( ! ResolvablePointer.is( resource ) ) return Promise.reject( new IllegalArgumentError( "The resource isn't a resolvable pointer." ) );

			if( ! this.$context.registry.inScope( resource.$id, true ) ) return Promise.reject( new IllegalArgumentError( `"${ resource.$id }" is out of scope.` ) );
			const url:string = this.$context.getObjectSchema().resolveURI( resource.$id, { base: true } );

			return RequestService
				.get( url, requestOptions )
				.then<T & ResolvablePointer>( ( response:Response ) => {
					return this._parseResponseData<T>( response, url );
				} )
				.catch<T & ResolvablePointer>( ( error:HTTPError | Error ) => {
					if( "response" in error && error.response.status === 304 ) return resource as T & ResolvablePointer;
					return Promise.reject( error );
				} )
				;
		},

		save<T extends object>( this:HTTPRepositoryTrait, resource:ResolvablePointer, requestOptions?:RequestOptions ):Promise<T & ResolvablePointer> {
			if( ! ResolvablePointer.is( resource ) ) return Promise.reject( new IllegalArgumentError( "The resource isn't a resolvable pointer." ) );

			if( ! this.$context.registry.inScope( resource.$id, true ) ) return Promise.reject( new IllegalArgumentError( `"${ resource.$id }" is out of scope.` ) );
			const url:string = this.$context.getObjectSchema().resolveURI( resource.$id, { base: true } );

			if( ! resource.isDirty() ) return Promise.resolve( resource as T & ResolvablePointer );

			const body:string = JSON.stringify( resource );
			return RequestService
				.put( url, body, requestOptions )
				.then( () => resource as T & ResolvablePointer );
		},

		saveAndRefresh<T extends object>( this:HTTPRepositoryTrait, resource:ResolvablePointer, requestOptions?:RequestOptions ):Promise<T & ResolvablePointer> {
			return this
				.save<T>( resource, requestOptions )
				.then( () => this.refresh<T>( resource, requestOptions ) )
				;
		},


		delete( this:HTTPRepositoryTrait, uri:string, requestOptions?:RequestOptions ):Promise<void> {
			if( ! this.$context.registry.inScope( uri, true ) ) return Promise.reject( new IllegalArgumentError( `"${ uri }" is out of scope.` ) );
			const url:string = this.$context.getObjectSchema().resolveURI( uri, { base: true } );

			return RequestService
				.delete( url, requestOptions )
				.then( () => {
					this.$context.registry.removePointer( url );
				} );
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

	decorate<T extends BaseGeneralRepository>( object:T ):T & HTTPRepositoryTrait {
		if( HTTPRepositoryTrait.isDecorated( object ) ) return;

		const resource:T & GeneralRepository = ModelDecorator
			.decorateMultiple( object, GeneralRepository );

		return ModelDecorator
			.definePropertiesFrom( HTTPRepositoryTrait.PROTOTYPE, resource );
	},
};
