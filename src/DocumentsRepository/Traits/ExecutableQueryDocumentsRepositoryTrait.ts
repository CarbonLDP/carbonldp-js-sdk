import { Document } from "../../Document/Document";
import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";
import { QueryDocumentBuilder } from "../../QueryDocuments/QueryDocumentBuilder";
import { BaseDocumentsRepository } from "../BaseDocumentsRepository";
import { LDPDocumentsRepositoryTrait } from "./LDPDocumentsRepositoryTrait";
import { OverriddenMembers, QueryableDocumentsRepositoryTrait } from "./QueryableDocumentsRepositoryTrait";

export interface ExecutableQueryDocumentsRepositoryTrait extends QueryableDocumentsRepositoryTrait {
	execute( uri:string ):Promise<JSON>;
}


/**
 * Factory, decorator and utils for {@link QueryableDocumentsRepositoryTrait}.
 */
export type ExecutableQueryDocumentsRepositoryTraitFactory =
	& ModelPrototype<ExecutableQueryDocumentsRepositoryTrait, LDPDocumentsRepositoryTrait, OverriddenMembers>
	& ModelDecorator<ExecutableQueryDocumentsRepositoryTrait, BaseDocumentsRepository>
	;

/**
 * Constant with the factory, decorator and/or utils for a {@link QueryableDocumentsRepositoryTrait} object.
 */
export const ExecutableQueryDocumentsRepositoryTrait:{
	/**
	 * The object with the properties/methods to use in the decoration of a {@link QueryableDocumentsRepositoryTrait}.
	 */
	PROTOTYPE:ExecutableQueryDocumentsRepositoryTraitFactory["PROTOTYPE"];

	/**
	 * Returns true if the object is decorated with the specific properties and methods of a {@link QueryableDocumentsRepositoryTrait}.
	 */
	isDecorated( object:object ):object is ExecutableQueryDocumentsRepositoryTrait;

	/**
	 * Decorates the object with the properties and methods from the {@link QueryableDocumentsRepositoryTrait} prototype.
	 */
	decorate<T extends BaseDocumentsRepository>( object:T ):T & ExecutableQueryDocumentsRepositoryTrait;
} = <ExecutableQueryDocumentsRepositoryTraitFactory> {
	...QueryableDocumentsRepositoryTrait,
	PROTOTYPE: {
		...QueryableDocumentsRepositoryTrait.PROTOTYPE,
		execute( uri:string ):Promise<JSON> {
			return LDPDocumentsRepositoryTrait.PROTOTYPE.execute(uri);
		},
	},
	isDecorated( object:object ):object is ExecutableQueryDocumentsRepositoryTrait {
		return ModelDecorator
			.hasPropertiesFrom( ExecutableQueryDocumentsRepositoryTrait.PROTOTYPE, object );
	},

	decorate<T extends BaseDocumentsRepository>( object:T ):T & ExecutableQueryDocumentsRepositoryTrait {
		if( ExecutableQueryDocumentsRepositoryTrait.isDecorated( object ) ) return object;

		const target:T & LDPDocumentsRepositoryTrait = ModelDecorator
			.decorateMultiple( object, LDPDocumentsRepositoryTrait );

		return ModelDecorator
			.definePropertiesFrom( ExecutableQueryDocumentsRepositoryTrait.PROTOTYPE, target );
	},
};

