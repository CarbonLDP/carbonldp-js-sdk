import * as Resource from './Resource';
import * as URI from './URI';
import * as Utils from '../Utils';

interface FragmentResource extends Resource.Class {
	slug:string;
}

class Factory {
	static is( resource:Resource.Class ):boolean {
		if ( Utils.hasProperty( resource, 'slug' ) ) return true;
		return false;
	}

	static create( slug:string ):FragmentResource {
		slug = URI.Util.hasFragment( slug ) ? URI.Util.getFragment( slug ) : slug;
		slug = '#' + slug;

		var resource:Resource.Class = Resource.Factory.create();

		var fragment:FragmentResource = Factory.from( resource );
		fragment.slug = slug;

		return fragment;
	}

	static from( resource:Resource.Class ):FragmentResource;
	static from( resources:Resource.Class[] ):FragmentResource[];
	static from( resourceOrResources:any ):any {
		var resources:Resource.Class[] = Utils.isArray( resourceOrResources ) ? resourceOrResources : [ resourceOrResources ];
		var fragments:FragmentResource[] = [];
		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			var fragment:FragmentResource = <FragmentResource> resources[ i ];

			if ( ! Factory.is( fragment ) ) {
				Object.defineProperty( fragment, 'slug', {
					writable: true,
					enumerable: false
				} );

				if ( ! fragment.uri ) fragment.slug = null;
				else fragment.slug = '#' + URI.Util.getFragment( fragment.uri );
			}

			fragments.push( fragment );
		}

		if ( Utils.isArray( resourceOrResources ) ) return fragments;
		else return fragments[ 0 ];
	}
}

//@formatter:off
export {
	FragmentResource as Class,
	Factory
};
//@formatter:on