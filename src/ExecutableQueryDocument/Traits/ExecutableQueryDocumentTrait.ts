import { LDPDocumentTrait } from "../../Document/Traits/LDPDocumentTrait";
import { QueryableDocumentTrait } from "../../Document/Traits/QueryableDocumentTrait";
import { ExecutableQueryDocumentsRepositoryTrait } from "../../DocumentsRepository/Traits/ExecutableQueryDocumentsRepositoryTrait";
import { Response } from "../../HTTP/Response";
import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";
import { QueryablePointer } from "../../QueryDocuments/QueryablePointer";
import { SPARQLRawResults } from "../../SPARQL/RawResults";
import { ExecutableQueryDocument } from "../ExecutableQueryDocument";
import { ExecutableQuerySPARQLResults } from "../ExecutableQuerySPARQLResults";

/**
 * Properties for creating a {@link QueryableDocumentTrait}.
 */
export interface BaseExecutableQueryDocumentTrait {
	/**
	 * Repository trait that will to execute requests of the trait to create.
	 */
	$repository:ExecutableQueryDocumentsRepositoryTrait;
}

export interface ExecutableQueryDocumentTrait extends QueryableDocumentTrait {
	/**
	 * Repository trait that actually executes the request of the current trait.
	 */
	$repository:ExecutableQueryDocumentsRepositoryTrait;

	/**
	 * Executes the stored query directly. Returns the result in plain JSON Format.
	 */
	$execute():Promise<ExecutableQuerySPARQLResults>;

	/**
	 * Executes the stored query and returns the result in a decorated {@link SPARQLRawResults} format.
	 */
	$executeAsRAWSPARQLQuery():Promise<[ SPARQLRawResults, Response ]>;


	/**
	 * Modifies the document's stored query
	 */
	$modifyStoredQuery<T extends object>( newStoredQuery:string ):Promise<T & ExecutableQueryDocument>;
}

export type ExecutableQueryDocumentTraitFactory =
	& ModelPrototype<ExecutableQueryDocumentTrait, LDPDocumentTrait & QueryablePointer>
	& ModelDecorator<ExecutableQueryDocumentTrait, BaseExecutableQueryDocumentTrait>
	;


export const ExecutableQueryDocumentTrait:{
	/**
	 * The object with the properties/methods to use in the decoration of a {@link QueryableDocumentTrait}.
	 */
	PROTOTYPE:ExecutableQueryDocumentTraitFactory["PROTOTYPE"];

	/**
	 * Returns true if the object is decorated with the specific properties and methods of a {@link QueryableDocumentTrait}.
	 */
	isDecorated( object:object ):object is ExecutableQueryDocumentTrait;

	/**
	 * Decorates the object with the properties and methods from the {@link QueryableDocumentTrait} prototype.
	 */
	decorate<T extends BaseExecutableQueryDocumentTrait>( object:T ):T & ExecutableQueryDocumentTrait
} = <ExecutableQueryDocumentTraitFactory> {
	PROTOTYPE: {
		...QueryableDocumentTrait.PROTOTYPE,
		$execute( this:ExecutableQueryDocumentTrait ):Promise<ExecutableQuerySPARQLResults> {
			return this.$repository.execute( this.$id );
		},
		$executeAsRAWSPARQLQuery( this:ExecutableQueryDocumentTrait ):Promise<[ SPARQLRawResults, Response ]> {
			return this.$repository.executeAsRAWSPARQLQuery( this.$id );
		},
		$modifyStoredQuery<T extends object>( this:ExecutableQueryDocumentTrait, newStoredQuery:string ):Promise<T & ExecutableQueryDocument> {
			return this.$repository.modifyStoredQuery( this.$id, newStoredQuery );
		},
	},
	isDecorated( object:object ):object is ExecutableQueryDocumentTrait {
		return object.hasOwnProperty( "$execute" )
			&& object.hasOwnProperty( "$modifyStoredQuery" )
			&& ModelDecorator
				.hasPropertiesFrom( ExecutableQueryDocumentTrait.PROTOTYPE, object );
	},

	decorate<T extends BaseExecutableQueryDocumentTrait>( object:T ):T & ExecutableQueryDocumentTrait {
		if( ExecutableQueryDocumentTrait.isDecorated( object ) ) return object;

		type ForcedT = T & Pick<ExecutableQueryDocumentTrait, "$get" | "$resolve">;
		const forced:ForcedT = object as ForcedT;

		const target:ForcedT & LDPDocumentTrait & QueryablePointer = ModelDecorator
			.decorateMultiple( forced, LDPDocumentTrait, QueryablePointer );

		return ModelDecorator
			.definePropertiesFrom( ExecutableQueryDocumentTrait.PROTOTYPE, target );
	},

};
