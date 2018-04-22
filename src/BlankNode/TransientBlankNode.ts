import { IllegalArgumentError } from "../Errors";
import { TransientFragment, } from "../Fragment";
import { URI } from "../RDF";
import { BaseBlankNode } from "./BaseBlankNode";


export interface TransientBlankNode extends TransientFragment {
}


export interface TransientBlankNodeFactory {
	is( value:any ):value is TransientBlankNode;


	create<T extends BaseBlankNode>( data:T ):T & TransientBlankNode;

	createFrom<T extends BaseBlankNode>( object:T ):T & TransientBlankNode;
}

export const TransientBlankNode:TransientBlankNodeFactory = {
	is( value:any ):value is TransientBlankNode {
		return TransientFragment.is( value ) &&
			URI.isBNodeID( value.id )
			;
	},


	create<T extends BaseBlankNode>( data:T ):T & TransientBlankNode {
		const copy:T = Object.assign( {}, data );
		return TransientBlankNode.createFrom( copy );
	},

	createFrom<T extends BaseBlankNode>( object:T ):T & TransientBlankNode {
		if( ! object.id ) {
			object.id = URI.generateBNodeID();
		} else if( ! URI.isBNodeID( object.id ) ) {
			throw new IllegalArgumentError( `The id "${ object.id }" is not a blank node label.` );
		}

		return TransientFragment.createFrom( object );
	},
};
