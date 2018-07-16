import { QueryClause } from "sparqler/clauses";

import { DocumentsContext } from "../../Context/DocumentsContext";

import { Document } from "../../Document/Document";

import { IllegalArgumentError } from "../../Errors/IllegalArgumentError";

import { GeneralRepository } from "../../GeneralRepository/GeneralRepository";

import { RequestOptions } from "../../HTTP/Request";

import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";

import { DigestedObjectSchema } from "../../ObjectSchema/DigestedObjectSchema";

import { FinishSPARQLSelect, SPARQLBuilder } from "../../SPARQL/SPARQLBuilder";
import { SPARQLSelectResults } from "../../SPARQL/SelectResults";
import { SPARQLService } from "../../SPARQL/SPARQLService";

import { BaseDocumentsRepository } from "../BaseDocumentsRepository";
import { _getErrorResponseParserFn } from "../Utils";

import { HTTPRepositoryTrait } from "./HTTPRepositoryTrait";


export interface SPARQLDocumentsRepositoryTrait extends GeneralRepository<Document> {
	$context:DocumentsContext;


	executeASKQuery( uri:string, askQuery:string, requestOptions?:RequestOptions ):Promise<boolean>;

	executeSELECTQuery<T extends object>( uri:string, selectQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLSelectResults<T>>;

	executeUPDATE( uri:string, update:string, requestOptions?:RequestOptions ):Promise<void>;


	sparql( uri:string ):QueryClause<FinishSPARQLSelect>;
}


export type SPARQLDocumentsRepositoryTraitFactory =
	& ModelPrototype<SPARQLDocumentsRepositoryTrait, HTTPRepositoryTrait>
	& ModelDecorator<SPARQLDocumentsRepositoryTrait, BaseDocumentsRepository>
	;

export const SPARQLDocumentsRepositoryTrait:SPARQLDocumentsRepositoryTraitFactory = {
	PROTOTYPE: {
		executeASKQuery( this:SPARQLDocumentsRepositoryTrait, uri:string, askQuery:string, requestOptions?:RequestOptions ):Promise<boolean> {
			if( ! this.$context.registry.inScope( uri, true ) ) return Promise.reject( new IllegalArgumentError( `"${ uri }" is out of scope.` ) );
			const url:string = this.$context.getObjectSchema().resolveURI( uri, { base: true } );

			return SPARQLService
				.executeASKQuery( url, askQuery, requestOptions )
				.then( ( [ rawResults ] ) => rawResults )
				.catch( _getErrorResponseParserFn( this.$context.registry ) );
		},

		executeSELECTQuery<T extends object>( this:SPARQLDocumentsRepositoryTrait, uri:string, selectQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLSelectResults<T>> {
			if( ! this.$context.registry.inScope( uri, true ) ) return Promise.reject( new IllegalArgumentError( `"${ uri }" is out of scope.` ) );
			const url:string = this.$context.getObjectSchema().resolveURI( uri, { base: true } );

			return SPARQLService
				.executeSELECTQuery<T>( url, selectQuery, this.$context.registry, requestOptions )
				.then( ( [ selectResults ] ) => selectResults )
				.catch( _getErrorResponseParserFn( this.$context.registry ) );
		},

		executeUPDATE( this:SPARQLDocumentsRepositoryTrait, uri:string, update:string, requestOptions?:RequestOptions ):Promise<void> {
			if( ! this.$context.registry.inScope( uri, true ) ) return Promise.reject( new IllegalArgumentError( `"${ uri }" is out of scope.` ) );
			const url:string = this.$context.getObjectSchema().resolveURI( uri, { base: true } );

			return SPARQLService
				.executeUPDATE( url, update, requestOptions )
				.then( () => {} )
				.catch( _getErrorResponseParserFn( this.$context.registry ) );
		},


		sparql( this:SPARQLDocumentsRepositoryTrait, uri:string ):QueryClause<FinishSPARQLSelect> {
			if( ! this.$context.registry.inScope( uri, true ) ) throw new IllegalArgumentError( `"${ uri }" is out of scope.` );
			const url:string = this.$context.getObjectSchema().resolveURI( uri, { base: true } );

			const schema:DigestedObjectSchema = this.$context.registry.getGeneralSchema();
			let builder:QueryClause<FinishSPARQLSelect> = new SPARQLBuilder( this, url )
				.base( schema.base )
				.vocab( schema.vocab );

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
