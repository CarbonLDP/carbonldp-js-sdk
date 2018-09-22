import { Document } from "../../Document/Document";

import { TransientDirectContainer, TransientDirectContainerFactory } from "./TransientDirectContainer";


export interface DirectContainer extends Document {
}


export interface DirectContainerFactory {
	TYPE:TransientDirectContainerFactory[ "TYPE" ];
	create:TransientDirectContainerFactory[ "create" ];
	createFrom:TransientDirectContainerFactory[ "createFrom" ];

	is( value:any ):value is DirectContainer;
}

export const DirectContainer:DirectContainerFactory = {
	TYPE: TransientDirectContainer.TYPE,

	is: ( value ):value is DirectContainer =>
		TransientDirectContainer.is( value )
		&& Document.is( value )
	,

	create: TransientDirectContainer.create,
	createFrom: TransientDirectContainer.createFrom,
};
