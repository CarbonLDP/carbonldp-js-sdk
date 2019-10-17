import { Document } from "../../Document/Document";

import { TransientDirectContainer, TransientDirectContainerFactory } from "./TransientDirectContainer";
import { LDP } from '../../Vocabularies';
import { BaseDirectContainer } from './BaseDirectContainer';


/**
 * Model that represents a `ldp:DirectContainer`.
 */
export interface DirectContainer extends Document {
}


/**
 * Factory, decorator and utils for {@link DirectContainer}.
 */
// TODO: change to type-alias
export interface DirectContainerFactory {
	TYPE:TransientDirectContainerFactory[ "TYPE" ];
	create:TransientDirectContainerFactory[ "create" ];
	createFrom:TransientDirectContainerFactory[ "createFrom" ];

	is( value:any ):value is DirectContainer;
}

/**
 * Constant with the factory, decorator and/or utils for a {@link DirectContainer} object.
 */
export const DirectContainer:{
	/**
	 * Specifies the type of the model, in this case: `http://www.w3.org/ns/ldp#DirectContainer`.
	 */
	TYPE: LDP["DirectContainer"];

	/**
	 * Returns true when the value provided is considered to be a {@link DirectContainer}.
	 */
	is( object:object ): object is DirectContainer;

	/**
	 * Creates a {@link DirectContainer} with the provided data.
	 */
	create<T extends object>( data:T & BaseDirectContainer ):T & TransientDirectContainer;

	/**
	 * Creates a {@link DirectContainer} from the provided object.
	 */
	createFrom<T extends object>( object:T & BaseDirectContainer ):T & TransientDirectContainer;
} = <DirectContainerFactory> {
	TYPE: TransientDirectContainer.TYPE,

	is: ( value ):value is DirectContainer =>
		TransientDirectContainer.is( value )
		&& Document.is( value )
	,

	create: TransientDirectContainer.create,
	createFrom: TransientDirectContainer.createFrom,
};
