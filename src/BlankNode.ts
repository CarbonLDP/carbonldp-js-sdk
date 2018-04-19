import { TransientDocument } from "./TransientDocument";
import { IllegalArgumentError } from "./Errors";
import { TransientFragment } from "./TransientFragment";
import { ModelFactory } from "./ModelFactory";
import { URI } from "./RDF/URI";

export interface BlankNode extends TransientFragment {
}

export interface BlankNodeFactory extends ModelFactory<BlankNode> {
	is( object:object ):object is BlankNode;


	create( document:TransientDocument, id?:string ):BlankNode;

	createFrom<T extends object>( object:T, document:TransientDocument, id?:string ):T & BlankNode;
}

export const BlankNode:BlankNodeFactory = {
	is( object:object ):object is BlankNode {
		return TransientFragment.is( object ) &&
			URI.isBNodeID( object.id )
			;
	},


	create( document:TransientDocument, id?:string ):BlankNode {
		return BlankNode.createFrom( {}, document, id );
	},

	createFrom<T extends object>( object:T, document:TransientDocument, id?:string ):T & BlankNode {
		if( id && ! URI.isBNodeID( id ) ) throw new IllegalArgumentError( `The id "${ id }" is not an blank node label` );
		if( ! id ) id = URI.generateBNodeID();

		return TransientFragment.createFrom<T>( object, document, id );
	},
};
