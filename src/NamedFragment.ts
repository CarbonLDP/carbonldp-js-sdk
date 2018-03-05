import { Document } from "./Document";
import { Fragment } from "./Fragment";
import { ModelDecorator } from "./ModelDecorator";
import { ModelFactory } from "./ModelFactory";
import { URI } from "./RDF/URI";
import { isObject } from "./Utils";

export interface NamedFragment extends Fragment {
	slug:string;
}


export interface NamedFragmentFactory extends ModelFactory<NamedFragment>, ModelDecorator<NamedFragment> {
	isDecorated( object:object ):object is NamedFragment;

	is( object:object ):object is NamedFragment;


	create( document:Document, slug:string ):NamedFragment;

	createFrom<T extends object>( object:T, document:Document, slug:string ):T & NamedFragment;

	decorate<T extends object>( object:T ):T & NamedFragment;
}

export const NamedFragment:NamedFragmentFactory = {
	isDecorated( object:object ):object is NamedFragment {
		return isObject( object ) &&
			object.hasOwnProperty( "slug" ) && ! object.propertyIsEnumerable( "slug" )
			;
	},

	is( object:object ):object is NamedFragment {
		return Fragment.is( object )
			&& NamedFragment.isDecorated( object )
			;
	},

	create( document:Document, slug:string ):NamedFragment {
		return this.createFrom( {}, document, slug );
	},

	createFrom<T extends object>( object:T, document:Document, slug:string ):T & NamedFragment {
		const id:string = document.id + "#" + slug;
		const fragment:T & Fragment = Fragment.createFrom( object, document, id );

		return NamedFragment.decorate( fragment );
	},

	decorate<T extends object>( object:T ):T & NamedFragment {
		if( NamedFragment.isDecorated( object ) ) return object;

		const namedFragment:T & NamedFragment = object as T & NamedFragment;
		Object.defineProperties( namedFragment, {
			"slug": {
				enumerable: false,
				configurable: true,
				get( this:NamedFragment ):string {
					return URI.getFragment( this.id );
				},
				set( this:NamedFragment, value:string ):void {
					this.id = this._document.id + "#" + value;
				},
			},
		} );

		return namedFragment;
	},
};

export default NamedFragment;
