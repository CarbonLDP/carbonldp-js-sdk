import { TransientDocument } from "./TransientDocument";
import { IllegalActionError } from "./Errors";
import { ModelDecorator } from "./core/ModelDecorator";
import { ModelFactory } from "./core/ModelFactory";
import { TransientResource } from "./TransientResource";
import { isObject } from "./Utils";


export interface TransientFragment extends TransientResource {
	_document:TransientDocument;
}


export interface TransientFragmentFactory extends ModelFactory<TransientFragment>, ModelDecorator<TransientFragment> {
	isDecorated( object:object ):object is TransientFragment;

	is( object:object ):object is TransientFragment;


	create( document:TransientDocument, id?:string ):TransientFragment;

	createFrom<T extends object>( object:T, document:TransientDocument, id?:string ):T & TransientFragment;

	decorate<T extends object>( object:T ):T & TransientFragment;
}

export const TransientFragment:TransientFragmentFactory = {
	isDecorated( object:object ):object is TransientFragment {
		return isObject( object ) &&
			object.hasOwnProperty( "_document" )
			;
	},

	is( object:object ):object is TransientFragment {
		return TransientResource.is( object ) &&
			TransientFragment.isDecorated( object )
			;
	},

	create( document:TransientDocument, id?:string ):TransientFragment {
		return this.createFrom( {}, document, id );
	},

	createFrom<T extends object>( object:T, document:TransientDocument, id?:string ):T & TransientFragment {
		const fragment:T & TransientFragment = TransientFragment.decorate<T>( object );

		if( id ) fragment.id = id;
		fragment._document = document;

		return fragment;
	},

	decorate<T extends object>( object:T ):T & TransientFragment {
		if( TransientFragment.isDecorated( object ) ) return object;

		TransientResource.decorate( object );

		const fragment:T & TransientFragment = object as T & TransientFragment;
		Object.defineProperties( fragment, {
			"_document": {
				writable: true,
				enumerable: false,
				configurable: true,
			},
			"resolve": {
				configurable: true,
				value: resolveFragment,
			},
		} );

		return fragment;
	},
};

function resolveFragment():never {
	throw new IllegalActionError( "A fragment cannot be resolved by itself." );
}
