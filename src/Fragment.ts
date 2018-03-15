import { Document } from "./Document";
import { ModelDecorator } from "./ModelDecorator";
import { ModelFactory } from "./ModelFactory";
import { Resource } from "./Resource";
import { isObject } from "./Utils";


export interface Fragment extends Resource {
	_document:Document;
}


export interface FragmentFactory extends ModelFactory<Fragment>, ModelDecorator<Fragment> {
	isDecorated( object:object ):object is Fragment;

	is( object:object ):object is Fragment;


	create( document:Document, id?:string ):Fragment;

	createFrom<T extends object>( object:T, document:Document, id?:string ):T & Fragment;

	decorate<T extends object>( object:T ):T & Fragment;
}

export const Fragment:FragmentFactory = {
	isDecorated( object:object ):object is Fragment {
		return isObject( object ) &&
			object.hasOwnProperty( "_document" )
			;
	},

	is( object:object ):object is Fragment {
		return Resource.is( object ) &&
			Fragment.isDecorated( object )
			;
	},

	create( document:Document, id?:string ):Fragment {
		return this.createFrom( {}, document, id );
	},

	createFrom<T extends object>( object:T, document:Document, id?:string ):T & Fragment {
		const fragment:T & Fragment = Fragment.decorate<T>( object );

		if( id ) fragment.id = id;
		fragment._document = document;

		return fragment;
	},

	decorate<T extends object>( object:T ):T & Fragment {
		if( Fragment.isDecorated( object ) ) return object;

		Resource.decorate( object );

		const fragment:T & Fragment = object as T & Fragment;
		Object.defineProperties( fragment, {
			"_document": {
				writable: true,
				enumerable: false,
				configurable: true,
			},
		} );

		return fragment;
	},
};
