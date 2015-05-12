import * as Resource from './Resource';
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

	var fragment:FragmentResource.Class = FragmentResource.Factory.create( fragmentSlug );
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

class Factory {
	static is( value:any ):boolean {
		return (
		Resource.Factory.is( value ) &&

		Utils.hasProperty( value, '_fragments' ) &&

		Utils.hasFunction( value, 'hasFragment' ) &&
		Utils.hasFunction( value, 'getFragment' ) &&
		Utils.hasFunction( value, 'getFragments' ) &&
		Utils.hasFunction( value, 'createFragment' ) &&
		Utils.hasFunction( value, 'deleteFragment' )
		);
	}

	static from( resource:Resource.Class, fragments:Resource.Class[] = [] ):DocumentResource {
		Object.defineProperty( resource, '_fragments', {
			writable: false,
			enumerable: false,
			configurable: false,
			value: []
		} );

		var documentResource:DocumentResource = <DocumentResource> resource;

		for ( let i:number = 0, length:number = fragments.length; i < length; i ++ ) {
			var resource:Resource.Class = fragments[ i ];
			var fragment:FragmentResource.Class = FragmentResource.Factory.from( resource );

			documentResource._fragments.push( fragment );
		}

		documentResource.hasFragment = hasFragment;
		documentResource.getFragment = getFragment;
		documentResource.getFragments = getFragments;
		documentResource.createFragment = createFragment;
		documentResource.deleteFragment = deleteFragment;

		return documentResource;
	}
}

export { DocumentResource as Class, Factory };