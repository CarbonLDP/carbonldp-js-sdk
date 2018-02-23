import { Document } from "./Document";
import { IllegalArgumentError } from "./Errors";
import { Fragment } from "./Fragment";
import { ModelFactory } from "./ModelFactory";
import * as URI from "./RDF/URI";

export interface BlankNode extends Fragment {
}

export interface BlankNodeFactory extends ModelFactory<BlankNode> {
	is( object:object ):object is BlankNode;


	create( document:Document, id?:string ):BlankNode;

	createFrom<T extends object>( object:T, document:Document, id?:string ):T & BlankNode;
}

export const BlankNode:BlankNodeFactory = {
	is( object:object ):object is BlankNode {
		return Fragment.is( object ) &&
			URI.Util.isBNodeID( object.id )
			;
	},


	create( document:Document, id?:string ):BlankNode {
		return BlankNode.createFrom( {}, document, id );
	},

	createFrom<T extends object>( object:T, document:Document, id?:string ):T & BlankNode {
		if( id && ! URI.Util.isBNodeID( id ) ) throw new IllegalArgumentError( `The id "${ id }" is not an blank node label` );
		if( ! id ) id = URI.Util.generateBNodeID();

		return Fragment.createFrom<T>( object, document, id );
	},
};

export default BlankNode;
