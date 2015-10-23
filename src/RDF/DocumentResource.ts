import * as Resource from './Resource';
import * as RDFNode from './RDFNode';
import * as FragmentResource from './FragmentResource';
import * as URI from './URI';
import * as Utils from '../Utils';

interface DocumentResource extends Resource.Class {
	_fragments:FragmentResource.Class[];

	hasFragment( uri:string ):boolean;
	getFragment( uri:string ):FragmentResource.Class;
	getFragments():FragmentResource.Class[];
	createFragment( uri:string ):FragmentResource.Class;
	deleteFragment( uri:string ):boolean;

	toJsonLD():string;
}

function getFragmentSlug( fragmentURI:string ):string {
	var fragmentSlug:string;
	if ( URI.Util.isAbsolute( fragmentURI ) ) {
		// TODO: Handle
		throw new Error( 'IllegalArgument: Absolute URIs are not currently supported.' );
	} else {
		if ( URI.Util.hasFragment( fragmentURI ) ) fragmentSlug = URI.Util.getFragment( fragmentURI );
		else fragmentSlug = fragmentURI;
	}

	return '#' + fragmentSlug;
}

function hasFragment( uri:string ):boolean {
	return ! Utils.isNull( this.getFragment( uri ) );
}
function getFragment( uri:string ):FragmentResource.Class {
	var fragmentSlug:string = getFragmentSlug( uri );

	var documentResource:DocumentResource = <DocumentResource> this;
	var fragments:FragmentResource.Class[] = documentResource._fragments;

	for ( let i:number = 0, length:number = fragments.length; i < length; i ++ ) {
		let fragment:FragmentResource.Class = fragments[ i ];
		if ( fragment.slug === fragmentSlug ) return fragment;
	}

	return null;
}
function getFragments():FragmentResource.Class[] {
	var documentResource:DocumentResource = <DocumentResource> this;
	return documentResource._fragments.slice();
}
function createFragment( uri:string ):FragmentResource.Class {
	var fragmentSlug:string = getFragmentSlug( uri );

	var documentResource:DocumentResource = <DocumentResource> this;
	if ( documentResource.hasFragment( fragmentSlug ) ) throw new Error( 'Conflict: A fragment already exists with that slug.' );

	var fragment:FragmentResource.Class = FragmentResource.factory.create( fragmentSlug );
	documentResource._fragments.push( fragment );
	return fragment;
}
function deleteFragment( uri:string ):boolean {
	var fragmentSlug:string = getFragmentSlug( uri );

	var documentResource:DocumentResource = <DocumentResource> this;

	for ( let i:number = 0, length:number = documentResource._fragments.length; i < length; i ++ ) {
		let fragment:FragmentResource.Class = documentResource._fragments[ i ];
		if ( fragment.slug === fragmentSlug ) {
			documentResource._fragments.splice( i, 1 );
			return true;
		}
	}

	return false;
}
function toJsonLD():string {
	var resources = [ this ];
	resources = resources.concat( this._fragments );
	return JSON.stringify( resources );
}

class Factory {
	is( value:any ):boolean {
		//@formatter:off
		return (
			Resource.factory.is( value ) &&
			this.hasClassProperties( value )
		);
		//@formatter:on
	}

	from( resource:RDFNode.Class, fragments:RDFNode.Class[] = [] ):DocumentResource {
		resource = Resource.factory.is( resource ) ? resource : <Resource.Class> Resource.factory.from( resource );

		var documentResource:DocumentResource = <DocumentResource> resource;
		if ( ! this.is( documentResource ) ) this.injectBehaviour( documentResource );
		this.addFragments( documentResource, fragments );

		return documentResource;
	}

	protected hasClassProperties( resource:RDFNode.Class ):boolean {
		return (
			Utils.hasProperty( resource, '_fragments' ) &&

			Utils.hasFunction( resource, 'hasFragment' ) &&
			Utils.hasFunction( resource, 'getFragment' ) &&
			Utils.hasFunction( resource, 'getFragments' ) &&
			Utils.hasFunction( resource, 'createFragment' ) &&
			Utils.hasFunction( resource, 'deleteFragment' )
		);
	}

	protected injectBehaviour( resource:Resource.Class ):DocumentResource {

		Object.defineProperties( resource, {
			'_fragments': {
				writable: false,
				enumerable: false,
				configurable: false,
				value: []
			},
			'hasFragment': {
				writable: false,
				enumerable: false,
				configurable: true,
				value: hasFragment
			},
			'getFragment': {
				writable: false,
				enumerable: false,
				configurable: true,
				value: getFragment
			},
			'getFragments': {
				writable: false,
				enumerable: false,
				configurable: true,
				value: getFragments
			},
			'createFragment': {
				writable: false,
				enumerable: false,
				configurable: true,
				value: createFragment
			},
			'deleteFragment': {
				writable: false,
				enumerable: false,
				configurable: true,
				value: deleteFragment
			},
			'toJsonLD': {
				writable: false,
				enumerable: false,
				configurable: true,
				value: toJsonLD
			}
		} );

		return <DocumentResource> resource;
	}

	private addFragments( documentResource:DocumentResource, fragments:RDFNode.Class[] ):void {
		for ( let i:number = 0, length:number = fragments.length; i < length; i ++ ) {
			var resource:RDFNode.Class = fragments[ i ];
			var fragment:FragmentResource.Class = FragmentResource.factory.from( resource );

			documentResource._fragments.push( fragment );
		}
	}
}

var factory = new Factory();

//@formatter:off
export {
	DocumentResource as Class,
	Factory,
	factory
};
//@formatter:on