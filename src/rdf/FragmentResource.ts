import * as RDFNode from './RDFNode';
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

	static from( resource:RDFNode.Class ):FragmentResource;
	static from( resources:RDFNode.Class[] ):FragmentResource[];
	static from( resourceOrResources:any ):any {
		var resources:RDFNode.Class[] = Utils.isArray( resourceOrResources ) ? resourceOrResources : [ resourceOrResources ];
		var fragments:FragmentResource[] = [];
		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			var resource:RDFNode.Class = resources[ i ];
			resource = Resource.Factory.is( resource ) ? resource : Resource.Factory.from( resource );

			var fragment:FragmentResource = <FragmentResource> resource;
			if ( ! Factory.is( fragment ) ) Factory.injectBehaviour( fragment );

			fragments.push( fragment );
		}

		if ( Utils.isArray( resourceOrResources ) ) return fragments;
		else return fragments[ 0 ];
	}

	private static injectBehaviour( fragment:FragmentResource ):FragmentResource {
		Object.defineProperty( fragment, 'slug', {
			writable: true,
			enumerable: false
		} );

		if ( ! fragment.uri ) fragment.slug = null;
		else fragment.slug = '#' + URI.Util.getFragment( fragment.uri );

		return fragment;
	}
}

//@formatter:off
export {
	FragmentResource as Class,
	Factory
};
//@formatter:on