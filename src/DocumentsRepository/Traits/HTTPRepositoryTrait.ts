import { Context } from "../../Context/Context";

import { IllegalArgumentError } from "../../Errors/IllegalArgumentError";

import { BaseGeneralRepository } from "../../GeneralRepository/BaseGeneralRepository";
import { GeneralRepository } from "../../GeneralRepository/GeneralRepository";

import { HTTPError } from "../../HTTP/Errors/HTTPError";
import { GETOptions, RequestOptions, RequestService } from "../../HTTP/Request";
import { Response } from "../../HTTP/Response";

import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";

import { RegisteredPointer } from "../../Registry/RegisteredPointer";
import { ResolvablePointer } from "../../Repository/ResolvablePointer";


/**
 * Trait of a {@link DocumentsRepository} with base methods of every REST repository.
 */
export interface HTTPRepositoryTrait<MODEL extends ResolvablePointer = ResolvablePointer> extends GeneralRepository<MODEL> {
	/**
	 * Context from where the repository is created.
	 */
	readonly context:Context<MODEL & RegisteredPointer, MODEL>;

	/**
	 * Retrieves the resource of the specified URI.
	 * @param uri The URI of the resource to be retrieved.
	 * @param requestOptions Customizable options for the request.
	 */
	get<T extends object>( uri:string, requestOptions?:GETOptions ):Promise<T & MODEL>;
	/**
	 * Resolves the specified resource.
	 * @param resource The resource to be resolved.
	 * @param requestOptions Customizable options for the request.
	 */
	resolve<T extends object>( resource:MODEL, requestOptions?:RequestOptions ):Promise<T & MODEL>;
	/**
	 * Checks if the resource of the specified URI exists.
	 * @param uri The URI of the resource to check its existence.
	 * @param requestOptions Customizable options for the request.
	 */
	exists( uri:string, requestOptions?:RequestOptions ):Promise<boolean>;

	/**
	 * Refreshes with the latest data of the specified resource.
	 * @param resource The resource to be refreshed.
	 * @param requestOptions Customizable options for the request.
	 */
	refresh<T extends object>( resource:MODEL, requestOptions?:RequestOptions ):Promise<T & MODEL>;
	/**
	 * Saves the changes of the specified resource.
	 * @param resource The resource to be saved.
	 * @param requestOptions Customizable options for the request.
	 */
	save<T extends object>( resource:MODEL, requestOptions?:RequestOptions ):Promise<T & MODEL>;
	/**
	 * Saves the changes of the specified resource and retrieves its latest changes.
	 * @param resource The resource to saved and refreshed.
	 * @param requestOptions Customizable options for the request.
	 */
	saveAndRefresh<T extends object>( resource:MODEL, requestOptions?:RequestOptions ):Promise<T & MODEL>;

	/**
	 * Deletes the resource of the specified URI.
	 * @param uri URI of the resource to be deleted.
	 * @param requestOptions Customizable options for the request.
	 */
	delete( uri:string, requestOptions?:RequestOptions ):Promise<void>;

	/**
	 * Method that parses the {@link Response} of a retrieval request into the desired resource model.
	 * This method must be overridden in the specialized repositories in accordance of its model since,
	 * the current behaviour only creates a shallow pointer in the associated {@link Registry}.
	 * @param response The response to be parsed into a resource model.
	 * @param id The identification of the resource, commonly the URL of the resource.
	 */
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

/**
 * Factory, decorator and utils for {@link HTTPRepositoryTrait}.
 */
export type HTTPRepositoryTraitFactory =
	& ModelPrototype<HTTPRepositoryTrait, GeneralRepository, OverriddenMembers>
	& ModelDecorator<HTTPRepositoryTrait<any>, BaseGeneralRepository>
	;

/**
 * Constant that implements {@link HTTPRepositoryTraitFactory}-
 */
export const HTTPRepositoryTrait:{
	/**
	 * The object with the properties/methods to use in the decoration of a {@link HTTPRepositoryTrait}
	 */
	PROTOTYPE: HTTPRepositoryTraitFactory["PROTOTYPE"];

	/**
	 * Checks if the HTTPRepositoryTrait has the decorated properties and methods from its prototype.
	 */
	isDecorated( object:object ):object is HTTPRepositoryTrait

	/**
	 * Defines the HTTPRepositoryTrait's prototype properties and methods to the HTTPRepositoryTrait object.
	 */
	decorate<T extends BaseGeneralRepository>( object:T ):T & HTTPRepositoryTrait;

} = {
	PROTOTYPE: {
		get<T extends object>( this:HTTPRepositoryTrait, uri:string, requestOptions?:GETOptions ):Promise<T & ResolvablePointer> {
			if( ! this.context.registry.inScope( uri, true ) ) return Promise.reject( new IllegalArgumentError( `"${uri}" is out of scope.` ) );
			const url:string = this.context.getObjectSchema().resolveURI( uri, { base: true } );

			if( this.context.registry.hasPointer( url, true ) ) {
				const resource:ResolvablePointer = this.context.registry.getPointer( url, true );
				if( resource.$isResolved() && ! (requestOptions && requestOptions.ensureLatest) )
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
			if( ! this.context.registry.inScope( uri, true ) ) return Promise.reject( new IllegalArgumentError( `"${uri}" is out of scope.` ) );
			const url:string = this.context.getObjectSchema().resolveURI( uri, { base: true } );

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

			if( ! this.context.registry.inScope( resource.$id, true ) ) return Promise.reject( new IllegalArgumentError( `"${resource.$id}" is out of scope.` ) );
			const url:string = this.context.getObjectSchema().resolveURI( resource.$id, { base: true } );

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

			if( ! this.context.registry.inScope( resource.$id, true ) ) return Promise.reject( new IllegalArgumentError( `"${resource.$id}" is out of scope.` ) );
			const url:string = this.context.getObjectSchema().resolveURI( resource.$id, { base: true } );

			if( ! resource.$isDirty() ) return Promise.resolve( resource as T & ResolvablePointer );

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
			if( ! this.context.registry.inScope( uri, true ) ) return Promise.reject( new IllegalArgumentError( `"${uri}" is out of scope.` ) );
			const url:string = this.context.getObjectSchema().resolveURI( uri, { base: true } );

			return RequestService
				.delete( url, requestOptions )
				.then( () => {
					this.context.registry.removePointer( url );
				} );
		},


		async _parseResponseData<T extends object>( this:HTTPRepositoryTrait<T & ResolvablePointer>, response:Response, id:string ):Promise<T & ResolvablePointer> {
			const resolvable:ResolvablePointer = this.context.registry
				.getPointer( id, true );

			resolvable.$eTag = response.getETag();
			resolvable.$_resolved = true;

			return resolvable as T & ResolvablePointer;
		},
	},


	isDecorated( object:object ):object is HTTPRepositoryTrait {
		return ModelDecorator
			.hasPropertiesFrom( HTTPRepositoryTrait.PROTOTYPE, object )
			;
	},

	decorate<T extends BaseGeneralRepository>( object:T ):T & HTTPRepositoryTrait {
		if( HTTPRepositoryTrait.isDecorated( object ) ) return object;

		const resource:T & GeneralRepository = ModelDecorator
			.decorateMultiple( object, GeneralRepository );

		return ModelDecorator
			.definePropertiesFrom( HTTPRepositoryTrait.PROTOTYPE, resource );
	},
};
