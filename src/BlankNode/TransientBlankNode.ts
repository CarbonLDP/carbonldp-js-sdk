import { IllegalArgumentError } from "../Errors";
import { TransientFragment, } from "../Fragment";
import { URI } from "../RDF";
import { BaseBlankNode } from "./BaseBlankNode";


export interface TransientBlankNode extends TransientFragment {
}


export interface TransientBlankNodeFactory {
	is( value:any ):value is TransientBlankNode;


	create<T extends object>( data:T & BaseBlankNode ):T & TransientBlankNode;

	createFrom<T extends object>( object:T & BaseBlankNode ):T & TransientBlankNode;
}

export const TransientBlankNode:TransientBlankNodeFactory = {
	is( value:any ):value is TransientBlankNode {
		return TransientFragment.is( value ) &&
			URI.isBNodeID( value.id )
			;
	},


	create<T extends object>( data:T & BaseBlankNode ):T & TransientBlankNode {
		const copy:T & BaseBlankNode = Object.assign( {}, data );
		return TransientBlankNode.createFrom( copy );
	},

	createFrom<T extends object>( object:T & BaseBlankNode ):T & TransientBlankNode {
		if( ! object.id ) {
			object.id = URI.generateBNodeID();
		} else if( ! URI.isBNodeID( object.id ) ) {
			throw new IllegalArgumentError( `The id "${ object.id }" is not a blank node label.` );
		}

		return TransientFragment.createFrom( object );
	},
};
