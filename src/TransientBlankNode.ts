import { ModelFactory } from "./core/ModelFactory";
import { IllegalArgumentError } from "./Errors";
import {
	BaseFragment,
	TransientFragment
} from "./Fragment";
import { URI } from "./RDF";
import { TransientDocument } from "./TransientDocument";

export interface TransientBlankNode extends TransientFragment {
}

export interface TransientBlankNodeFactory extends ModelFactory<TransientBlankNode> {
	is( object:object ):object is TransientBlankNode;


	create( document:TransientDocument, id?:string ):TransientBlankNode;

	createFrom<T extends object>( object:T, document:TransientDocument, id?:string ):T & TransientBlankNode;
}

export const TransientBlankNode:TransientBlankNodeFactory = {
	is( object:object ):object is TransientBlankNode {
		return TransientFragment.is( object ) &&
			URI.isBNodeID( object.id )
			;
	},


	create( document:TransientDocument, id?:string ):TransientBlankNode {
		return TransientBlankNode.createFrom( {}, document, id );
	},

	createFrom<T extends object>( object:T, document:TransientDocument, id?:string ):T & TransientBlankNode {
		if( id && ! URI.isBNodeID( id ) ) throw new IllegalArgumentError( `The id "${ id }" is not an blank node label` );
		if( ! id ) id = URI.generateBNodeID();

		const base:T & BaseFragment = Object.assign( object, {
			_document: document,
			id,
		} );

		return TransientFragment.createFrom<T & BaseFragment>( base );
	},
};
