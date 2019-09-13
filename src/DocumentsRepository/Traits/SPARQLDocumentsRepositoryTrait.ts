import { QueryClause } from "sparqler/clauses";

import { DocumentsContext } from "../../Context/DocumentsContext";

import { Document } from "../../Document/Document";

import { IllegalArgumentError } from "../../Errors/IllegalArgumentError";

import { GeneralRepository } from "../../GeneralRepository/GeneralRepository";

import { RequestOptions, RequestUtils } from "../../HTTP/Request";

import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";

import { DigestedObjectSchema } from "../../ObjectSchema/DigestedObjectSchema";

import { SPARQLSelectResults } from "../../SPARQL/SelectResults";
import { FinishSPARQLAsk, FinishSPARQLSelect, SPARQLBuilder } from "../../SPARQL/SPARQLBuilder";
import { SPARQLService } from "../../SPARQL/SPARQLService";

import { BaseDocumentsRepository } from "../BaseDocumentsRepository";
import { _getErrorResponseParserFn } from "../Utils";

import { HTTPRepositoryTrait } from "./HTTPRepositoryTrait";


/**
 * Trait of a {@link DocumentsRepository} with methods for SPARQL requests.
 */
export interface SPARQLDocumentsRepositoryTrait extends GeneralRepository<Document> {
	/**
	 * Context from where the repository is created.
	 */
	readonly context:DocumentsContext;


	/**
	 * Executes an ASK query on the document of the specified URI.
	 * @param uri URI of the document where to execute the query.
	 * @param askQuery ASK query to be executed.
	 * @param requestOptions Customizable options for the request.
	 */
	executeASKQuery( uri:string, askQuery:string, requestOptions?:RequestOptions ):Promise<boolean>;

	/**
	 * Executes a SELECT query on the document of the specified URI.
	 * @param uri URI of the document where to execute the query.
	 * @param selectQuery SELECT query to be executed.
	 * @param requestOptions Customizable options for the request.
	 */
	executeSELECTQuery<T extends object>( uri:string, selectQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLSelectResults<T>>;

	/**
	 * Executes an UPDATE in the document of the specified URI.
	 * @param uri URI of the document where to execute the update.
	 * @param update UPDATE to be executed.
	 * @param requestOptions Customizable options for the request.
	 */
	executeUPDATE( uri:string, update:string, requestOptions?:RequestOptions ):Promise<void>;


	/**
	 * Creates an instance of [SPARQLER](https://github.com/CarbonLDP/sparqler) builder
	 * for the current document or the one specified by the URI.
	 * @param uri URI of the document from where to create the query builder.
	 */
	sparql( uri:string ):QueryClause<FinishSPARQLSelect, FinishSPARQLAsk>;
}


/**
 * Factory, decorator and utils for {@link SPARQLDocumentsRepositoryTrait}.
 */
export type SPARQLDocumentsRepositoryTraitFactory =
	& ModelPrototype<SPARQLDocumentsRepositoryTrait, HTTPRepositoryTrait>
	& ModelDecorator<SPARQLDocumentsRepositoryTrait, BaseDocumentsRepository>
	;

/**
 * Constant that implements {@link SPARQLDocumentsRepositoryTraitFactory}.
 */
export const SPARQLDocumentsRepositoryTrait:{
	/**
	 * The object with the properties/methods to use in the decoration of a {@link SPARQLDocumentsRepositoryTrait}
	 */
	PROTOTYPE: SPARQLDocumentsRepositoryTraitFactory["PROTOTYPE"];

	/**
	 * Checks if the SPARQLDocumentsRepositoryTrait has the decorated properties and methods from its prototype.
	 */
	isDecorated( object:object ):object is SPARQLDocumentsRepositoryTrait

	/**
	 * Defines the SPARQLDocumentsRepositoryTrait's prototype properties and methods to the SPARQLDocumentsRepositoryTrait object.
	 */
	decorate<T extends BaseDocumentsRepository>( object:T ):T & SPARQLDocumentsRepositoryTrait;
} = {
	PROTOTYPE: {
		executeASKQuery( this:SPARQLDocumentsRepositoryTrait, uri:string, askQuery:string, requestOptions?:RequestOptions ):Promise<boolean> {
			if( ! this.context.registry.inScope( uri, true ) ) return Promise.reject( new IllegalArgumentError( `"${uri}" is out of scope.` ) );
			const url:string = this.context.getObjectSchema().resolveURI( uri, { base: true } );

			requestOptions = requestOptions ? requestOptions : {};

			// Accept JSON-LD as secondary accepted format in case the platform returns an error message (hence the q=0.9)
			RequestUtils.setAcceptHeader( "application/ld+json; q=0.9", requestOptions! );

			return SPARQLService
				.executeASKQuery( url, askQuery, requestOptions )
				.then( ( [ rawResults ] ) => rawResults )
				.catch( _getErrorResponseParserFn( this.context.registry ) );
		},

		executeSELECTQuery<T extends object>( this:SPARQLDocumentsRepositoryTrait, uri:string, selectQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLSelectResults<T>> {
			if( ! this.context.registry.inScope( uri, true ) ) return Promise.reject( new IllegalArgumentError( `"${uri}" is out of scope.` ) );
			const url:string = this.context.getObjectSchema().resolveURI( uri, { base: true } );

			requestOptions = requestOptions ? requestOptions : {};

			// Accept JSON-LD as secondary accepted format in case the platform returns an error message (hence the q=0.9)
			RequestUtils.setAcceptHeader( "application/ld+json; q=0.9", requestOptions! );

			return SPARQLService
				.executeSELECTQuery<T>( url, selectQuery, this.context.registry, requestOptions )
				.then( ( [ selectResults ] ) => selectResults )
				.catch( _getErrorResponseParserFn( this.context.registry ) );
		},

		executeUPDATE( this:SPARQLDocumentsRepositoryTrait, uri:string, update:string, requestOptions?:RequestOptions ):Promise<void> {
			if( ! this.context.registry.inScope( uri, true ) ) return Promise.reject( new IllegalArgumentError( `"${uri}" is out of scope.` ) );
			const url:string = this.context.getObjectSchema().resolveURI( uri, { base: true } );

			return SPARQLService
				.executeUPDATE( url, update, requestOptions )
				.then( () => {} )
				.catch( _getErrorResponseParserFn( this.context.registry ) );
		},


		sparql( this:SPARQLDocumentsRepositoryTrait, uri:string ):QueryClause<FinishSPARQLSelect, FinishSPARQLAsk> {
			if( ! this.context.registry.inScope( uri, true ) ) throw new IllegalArgumentError( `"${uri}" is out of scope.` );
			const url:string = this.context.getObjectSchema().resolveURI( uri, { base: true } );

			const schema:DigestedObjectSchema = this.context.registry.getGeneralSchema();
			let builder:QueryClause<FinishSPARQLSelect, FinishSPARQLAsk> = new SPARQLBuilder( this, url )
				.base( schema.base )
				.vocab( schema.vocab! );

			schema.prefixes.forEach( ( name:string, prefix:string ) => {
				builder = builder.prefix( prefix, name );
			} );

			return builder;
		},
	},


	isDecorated( object:object ):object is SPARQLDocumentsRepositoryTrait {
		return ModelDecorator
			.hasPropertiesFrom( SPARQLDocumentsRepositoryTrait.PROTOTYPE, object );
	},

	decorate<T extends BaseDocumentsRepository>( object:T ):T & SPARQLDocumentsRepositoryTrait {
		if( SPARQLDocumentsRepositoryTrait.isDecorated( object ) ) return object;

		const target:T & GeneralRepository<any> = ModelDecorator
			.decorateMultiple( object, GeneralRepository );

		return ModelDecorator
			.definePropertiesFrom( SPARQLDocumentsRepositoryTrait.PROTOTYPE, target );
	},
};
