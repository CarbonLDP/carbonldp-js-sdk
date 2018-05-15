import { ModelDecorator } from "../core";
import { Fragment } from "../Fragment";
import { PersistedResource } from "../Resource";
import {
	TransientBlankNode,
	TransientBlankNodeFactory,
} from "./TransientBlankNode";


export interface BlankNode extends Fragment {
}


export interface BlankNodeFactory extends TransientBlankNodeFactory {
	is( value:any ):value is BlankNode;
}

export const BlankNode:BlankNodeFactory = {
	is( value:any ):value is BlankNode {
		return TransientBlankNode.is( value )
			&& PersistedResource.isDecorated( value )
			;
	},

	create: TransientBlankNode.create,
	createFrom: TransientBlankNode.createFrom,


	decorate<T extends object>( object:T ):T & BlankNode {
		return ModelDecorator
			.decorateMultiple( object, TransientBlankNode as any as ModelDecorator<TransientBlankNode>, Fragment );
	},
};
