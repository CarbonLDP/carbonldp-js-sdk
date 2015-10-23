import * as RDFNode from './RDFNode';
import * as Resource from './Resource';
import * as URI from './URI';
import * as Utils from '../Utils';

interface FragmentResource extends Resource.Class {
	slug:string;
}

class Factory {
	is( resource:Resource.Class ):boolean {
		return (
			Resource.factory.is( resource ) &&
			this.hasClassProperties( resource )
		);
	}

	create( slug:string ):FragmentResource {
		slug = URI.Util.hasFragment( slug ) ? URI.Util.getFragment( slug ) : slug;
		slug = '#' + slug;

		var resource:Resource.Class = Resource.factory.create();

		var fragment:FragmentResource = this.from( resource );
		fragment.slug = slug;

		return fragment;
	}

	from( resource:RDFNode.Class ):FragmentResource;
	from( resources:RDFNode.Class[] ):FragmentResource[];
	from( resourceOrResources:any ):any {
		var resources:RDFNode.Class[] = Utils.isArray( resourceOrResources ) ? resourceOrResources : [ resourceOrResources ];
		var fragments:FragmentResource[] = [];
		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			var resource:RDFNode.Class = resources[ i ];
			resource = Resource.factory.is( resource ) ? resource : <Resource.Class> Resource.factory.from( resource );

			var fragment:FragmentResource = <FragmentResource> resource;
			if ( ! this.is( fragment ) ) this.injectBehaviour( fragment );

			fragments.push( fragment );
		}

		if ( Utils.isArray( resourceOrResources ) ) return fragments;
		else return fragments[ 0 ];
	}

	protected hasClassProperties( resource:RDFNode.Class ):boolean {
		return (
			Utils.hasProperty( resource, 'slug' )
		);
	}

	protected injectBehaviour( fragment:FragmentResource ):FragmentResource {
		Object.defineProperty( fragment, 'slug', {
			writable: true,
			enumerable: false
		} );

		if ( ! fragment.uri ) fragment.slug = null;
		else fragment.slug = '#' + URI.Util.getFragment( fragment.uri );

		return fragment;
	}
}

var factory = new Factory();

//@formatter:off
export {
	FragmentResource as Class,
	Factory,
	factory
};
//@formatter:on