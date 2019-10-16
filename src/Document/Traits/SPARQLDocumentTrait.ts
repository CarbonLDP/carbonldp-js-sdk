import { QueryClause } from "sparqler/clauses";

import { SPARQLDocumentsRepositoryTrait } from "../../DocumentsRepository/Traits/SPARQLDocumentsRepositoryTrait";

import { RequestOptions } from "../../HTTP/Request";

import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";

import { URI } from "../../RDF/URI";

import { ResolvablePointer } from "../../Repository/ResolvablePointer";

import { SPARQLSelectResults } from "../../SPARQL/SelectResults";
import { FinishSPARQLAsk, FinishSPARQLSelect } from "../../SPARQL/SPARQLBuilder";

import { isObject } from "../../Utils";

import { TransientDocument } from "../TransientDocument";


/**
 * Properties for creating a {@link SPARQLDocumentTrait}
 */
export interface BaseSPARQLDocumentTrait {
	/**
	 * Repository trait that will to execute requests of the trait to create.
	 */
	$repository:SPARQLDocumentsRepositoryTrait;
}

/**
 * Trait of a {@link Document} with methods for SPARQL requests.
 */
export interface SPARQLDocumentTrait extends TransientDocument, ResolvablePointer {
	/**
	 * Repository trait that actually executes the request of the current trait.
	 */
	$repository:SPARQLDocumentsRepositoryTrait;

	/**
	 * Executes an ASK query on the document of the specified URI.
	 * @param uri URI of the document where to execute the query.
	 * @param askQuery ASK query to be executed.
	 * @param requestOptions Customizable options for the request.
	 */
	$executeASKQuery( uri:string, askQuery:string, requestOptions?:RequestOptions ):Promise<boolean>;
	/**
	 * Execute an ASK query on the current document.
	 * @param askQuery ASK query to be executed.
	 * @param requestOptions Customizable options for the request.
	 */
	$executeASKQuery( askQuery:string, requestOptions?:RequestOptions ):Promise<boolean>;

	/**
	 * Executes a SELECT query on the document of the specified URI.
	 * @param uri URI of the document where to execute the query.
	 * @param selectQuery SELECT query to be executed.
	 * @param requestOptions Customizable options for the request.
	 */
	$executeSELECTQuery<T extends object>( uri:string, selectQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLSelectResults<T>>;
	/**
	 * Executes a SELECT query in the current document.
	 * @param selectQuery SELECT query to be executed.
	 * @param requestOptions Customizable options for the request.
	 */
	$executeSELECTQuery<T extends object>( selectQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLSelectResults<T>>;

	/**
	 * Executes an UPDATE in the document of the specified URI.
	 * @param uri URI of the document where to execute the update.
	 * @param update UPDATE to be executed.
	 * @param requestOptions Customizable options for the request.
	 */
	$executeUPDATE( uri:string, update:string, requestOptions?:RequestOptions ):Promise<void>;
	/**
	 * Executes an UPDATE in the current document.
	 * @param update UPDATE to be executed.
	 * @param requestOptions Customizable options for the request.
	 */
	$executeUPDATE( update:string, requestOptions?:RequestOptions ):Promise<void>;


	/**
	 * Creates an instance of [SPARQLER](https://github.com/CarbonLDP/sparqler) builder
	 * for the current document or the one specified by the URI.
	 * @param uri URI of the document from where to create the query builder.
	 */
	$sparql( uri?:string ):QueryClause<FinishSPARQLSelect, FinishSPARQLAsk>;
}


function __parseParams( this:void, resource:SPARQLDocumentTrait, uriOrQuery:string, queryOrOptions?:string | RequestOptions, options?:RequestOptions ):{ uri:string, query:string, options?:RequestOptions } {
	let uri:string = resource.$id;
	let query:string = uriOrQuery;

	if( isObject( queryOrOptions ) ) {
		options = queryOrOptions;
	} else if( queryOrOptions !== void 0 ) {
		query = queryOrOptions;
		uri = URI.resolve( resource.$id, uriOrQuery );
	}


	return { uri, query, options };
}

/**
 * Factory, decorator and utils for {@link SPARQLDocumentTrait}.
 */
export type SPARQLDocumentTraitFactory =
	& ModelPrototype<SPARQLDocumentTrait, TransientDocument & ResolvablePointer>
	& ModelDecorator<SPARQLDocumentTrait, BaseSPARQLDocumentTrait>
	;

/**
 * Constant with the factory, decorator and/or utils for a {@link SPARQLDocumentTrait} object.
 */
export const SPARQLDocumentTrait:{
	/**
	 * The object with the properties/methods to use in the decoration of a {@link SPARQLDocumentTrait}.
	 */
	PROTOTYPE:SPARQLDocumentTraitFactory["PROTOTYPE"];

	/**
	 * Checks if the SPARQLDocumentTrait has the decorated properties and methods from its prototype.
	 */
	isDecorated( object:object ):object is SPARQLDocumentTrait;

	/**
	 * Defines the SPARQLDocumentTrait's prototype properties and methods to the SPARQLDocumentTrait object.
	 */
	decorate<T extends BaseSPARQLDocumentTrait>( object:T ):T & SPARQLDocumentTrait;
} = {
	PROTOTYPE: {
		$executeASKQuery( this:SPARQLDocumentTrait, uriOrQuery:string, queryOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<boolean> {
			const { uri, query, options } = __parseParams( this, uriOrQuery, queryOrOptions, requestOptions );
			return this.$repository.executeASKQuery( uri, query, options );
		},

		$executeSELECTQuery<T extends object>( this:SPARQLDocumentTrait, uriOrQuery:string, queryOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<SPARQLSelectResults<T>> {
			const { uri, query, options } = __parseParams( this, uriOrQuery, queryOrOptions, requestOptions );
			return this.$repository.executeSELECTQuery<T>( uri, query, options );
		},

		$executeUPDATE( this:SPARQLDocumentTrait, uriOrQuery:string, updateOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
			const { uri, query, options } = __parseParams( this, uriOrQuery, updateOrOptions, requestOptions );
			return this.$repository.executeUPDATE( uri, query, options );
		},


		$sparql( this:SPARQLDocumentTrait, uri?:string ):QueryClause<FinishSPARQLSelect, FinishSPARQLAsk> {
			const $uri:string = uri ? URI.resolve( this.$id, uri ) : this.$id;
			return this.$repository.sparql( $uri );
		},
	},

	isDecorated( object:object ):object is SPARQLDocumentTrait {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( SPARQLDocumentTrait.PROTOTYPE, object )
			;
	},

	decorate<T extends BaseSPARQLDocumentTrait>( object:T ):T & SPARQLDocumentTrait {
		if( SPARQLDocumentTrait.isDecorated( object ) ) return object;

		const target:T & TransientDocument & ResolvablePointer = ModelDecorator
			.decorateMultiple( object, TransientDocument, ResolvablePointer );

		return ModelDecorator
			.definePropertiesFrom( SPARQLDocumentTrait.PROTOTYPE, target );
	},
};
