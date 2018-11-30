import { Context } from "../Context/Context";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";

import { RegisteredPointer } from "../Registry/RegisteredPointer";

import { Repository } from "../Repository/Repository";
import { ResolvablePointer } from "../Repository/ResolvablePointer";

import { BaseGeneralRepository } from "./BaseGeneralRepository";


/**
 * Base repository used by {@link Context}.
 */
export interface GeneralRepository<MODEL extends ResolvablePointer = ResolvablePointer> extends Repository<MODEL> {
	/**
	 * Context where the repository belongs to.
	 */
	context:Context<MODEL & RegisteredPointer, MODEL>;
}


/**
 * Factory, decorator and utils for {@link GeneralRepository}.
 */
export type GeneralRepositoryFactory =
	& ModelPrototype<GeneralRepository, Repository>
	& ModelDecorator<GeneralRepository<any>, BaseGeneralRepository>
	& ModelFactory<GeneralRepository, BaseGeneralRepository>
	;

/**
 * Constant that implements {@link GeneralRepositoryFactory}.
 */
export const GeneralRepository:GeneralRepositoryFactory = {
	PROTOTYPE: {
		get context():Context<ResolvablePointer & RegisteredPointer, ResolvablePointer> {
			throw new IllegalArgumentError( `Property "context" is required.` );
		},
	},


	isDecorated( object:object ):object is GeneralRepository {
		return ModelDecorator
			.hasPropertiesFrom( GeneralRepository.PROTOTYPE, object );
	},

	decorate<T extends BaseGeneralRepository>( object:T ):T & GeneralRepository {
		if( GeneralRepository.isDecorated( object ) ) return object;

		const target:T & Repository = ModelDecorator
			.decorateMultiple( object, Repository );

		return ModelDecorator
			.definePropertiesFrom( GeneralRepository.PROTOTYPE, target );
	},


	create<T extends object>( data:T & BaseGeneralRepository ):T & GeneralRepository {
		return GeneralRepository.createFrom( { ...data as any } );
	},

	createFrom<T extends object>( object:T & BaseGeneralRepository ):T & GeneralRepository {
		return GeneralRepository.decorate( object );
	},
};
