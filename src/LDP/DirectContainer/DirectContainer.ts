import { Document } from "../../Document/Document";

import { TransientDirectContainer, TransientDirectContainerFactory } from "./TransientDirectContainer";


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
 * Constant that implements {@link DirectContainerFactory}.
 */
export const DirectContainer:DirectContainerFactory = {
	TYPE: TransientDirectContainer.TYPE,

	is: ( value ):value is DirectContainer =>
		TransientDirectContainer.is( value )
		&& Document.is( value )
	,

	create: TransientDirectContainer.create,
	createFrom: TransientDirectContainer.createFrom,
};
