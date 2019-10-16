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
 * Constant with the factory, decorator and/or utils for a {@link GeneralRepository} object.
 */
export const GeneralRepository:{
	/**
	 * The object with the properties/methods to use in the decoration of a {@link GeneralRepository}
	 */
	PROTOTYPE: GeneralRepositoryFactory["PROTOTYPE"];

	/**
	 * Checks if the GeneralRepository has the decorated properties and methods from its prototype.
	 */
	isDecorated( object:object): object is GeneralRepository;

	/**
	 * Defines the GeneralRepository's prototype properties and methods to the GeneralRepository object.
	 */
	decorate<T extends object>( object:T &  BaseGeneralRepository ):T & GeneralRepository<any>;

	/**
	 * Creates a {@link GeneralRepository} with the provided data.
	 */
	create<T extends object>( data:T & BaseGeneralRepository ):T & GeneralRepository;

	/**
	 * Creates a {@link GeneralRepository} from the provided object.
	 */
	createFrom<T extends object>( object:T & BaseGeneralRepository ):T & GeneralRepository;
} = {
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
