import { QueryClause } from "sparqler/clauses";
import { DocumentsContext } from "../Context";
import { IllegalArgumentError } from "../Errors";
import {
	HTTPRepositoryTrait,
	RequestOptions
} from "../HTTP";
import {
	ModelDecorator,
	ModelPrototype
} from "../Model";
import { DigestedObjectSchema } from "../ObjectSchema";
import { BaseDocumentsRepository } from "../Repository";
import { _getNotInContextMessage } from "../Repository/Utils";
import {
	FinishSPARQLSelect,
	SPARQLBuilder
} from "./Builder";
import { SPARQLSelectResults } from "./SelectResults";
import { SPARQLService } from "./Service";


export interface SPARQLDocumentsRepositoryTrait extends HTTPRepositoryTrait {
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
			if( ! this.$context.registry.inScope( uri ) ) return Promise.reject( new IllegalArgumentError( _getNotInContextMessage( uri ) ) );
			const url:string = this.$context.resolve( uri );

			return SPARQLService
				.executeASKQuery( url, askQuery, requestOptions )
				.then( ( [ rawResults ] ) => rawResults )
				.catch( this._parseFailedResponse.bind( this ) );
		},

		executeSELECTQuery<T extends object>( this:SPARQLDocumentsRepositoryTrait, uri:string, selectQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLSelectResults<T>> {
			if( ! this.$context.registry.inScope( uri ) ) return Promise.reject( new IllegalArgumentError( _getNotInContextMessage( uri ) ) );
			const url:string = this.$context.resolve( uri );

			return SPARQLService
				.executeSELECTQuery<T>( url, selectQuery, this.$context.registry, requestOptions )
				.then( ( [ selectResults ] ) => selectResults )
				.catch( this._parseFailedResponse.bind( this ) );
		},

		executeUPDATE( this:SPARQLDocumentsRepositoryTrait, uri:string, update:string, requestOptions?:RequestOptions ):Promise<void> {
			if( ! this.$context.registry.inScope( uri ) ) return Promise.reject( new IllegalArgumentError( _getNotInContextMessage( uri ) ) );
			const url:string = this.$context.resolve( uri );

			return SPARQLService
				.executeUPDATE( url, update, requestOptions )
				.then( () => {} )
				.catch( this._parseFailedResponse.bind( this ) );
		},


		sparql( this:SPARQLDocumentsRepositoryTrait, uri:string ):QueryClause<FinishSPARQLSelect> {
			if( ! this.$context.registry.inScope( uri ) ) throw new IllegalArgumentError( _getNotInContextMessage( uri ) );
			const url:string = this.$context.resolve( uri );

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

		const target:T & HTTPRepositoryTrait = ModelDecorator
			.decorateMultiple( object, HTTPRepositoryTrait );

		return ModelDecorator
			.definePropertiesFrom( SPARQLDocumentsRepositoryTrait.PROTOTYPE, target );
	},
};
