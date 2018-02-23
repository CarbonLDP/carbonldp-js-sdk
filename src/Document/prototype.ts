import * as BlankNode from "../BlankNode";
import * as Errors from "../Errors";
import * as Fragment from "../Fragment";
import * as JSONLDConverter from "../JSONLD/Converter";
import * as NamedFragment from "../NamedFragment";
import * as ObjectSchema from "../ObjectSchema";
import { Pointer } from "../Pointer";
import * as RDF from "../RDF";
import * as Utils from "../Utils";

import { Document } from "./";

export function hasPointer( this:Document, id:string ):boolean {
	if( id === this.id ) return true;
	if( ! this.inScope( id ) ) return false;

	return this.hasFragment( id );
}

export function getPointer( this:Document, id:string ):Pointer {
	if( ! this.inScope( id ) ) return null;
	if( id === this.id ) return this;

	return this.hasFragment( id ) ?
		this.getFragment( id ) :
		this.createFragment( id );
}

export function inScope( this:Document, idOrPointer:string | Pointer ):boolean {
	const id:string = Utils.isObject( idOrPointer ) ? idOrPointer.id : idOrPointer;

	if( id === this.id ) return true;
	if( RDF.URI.Util.isBNodeID( id ) ) return true;
	if( RDF.URI.Util.isFragmentOf( id, this.id ) ) return true;
	return id.startsWith( "#" );
}

export function hasFragment( this:Document, id:string ):boolean {
	if( RDF.URI.Util.isAbsolute( id ) ) {
		if( ! RDF.URI.Util.isFragmentOf( id, this.id ) ) return false;
		id = RDF.URI.Util.hasFragment( id ) ? RDF.URI.Util.getFragment( id ) : id;
	} else if( Utils.S.startsWith( id, "#" ) ) {
		id = id.substring( 1 );
	}

	return this._fragmentsIndex.has( id );
}

export function getFragment( this:Document, id:string ):Fragment.Class {
	if( ! RDF.URI.Util.isBNodeID( id ) ) return this.getNamedFragment( id );
	return this._fragmentsIndex.get( id ) || null;
}

export function getNamedFragment( this:Document, id:string ):NamedFragment.Class {
	if( RDF.URI.Util.isBNodeID( id ) ) throw new Errors.IllegalArgumentError( "Named fragments can't have a id that starts with '_:'." );
	if( RDF.URI.Util.isAbsolute( id ) ) {
		if( ! RDF.URI.Util.isFragmentOf( id, this.id ) ) throw new Errors.IllegalArgumentError( "The id is out of scope." );
		id = RDF.URI.Util.hasFragment( id ) ? RDF.URI.Util.getFragment( id ) : id;
	} else if( Utils.S.startsWith( id, "#" ) ) {
		id = id.substring( 1 );
	}

	return <NamedFragment.Class> this._fragmentsIndex.get( id ) || null;
}

export function getFragments( this:Document ):Fragment.Class[] {
	return Utils.A.from( this._fragmentsIndex.values() );
}

export function createFragment<T extends object>( object:T, slug?:string ):T & Fragment.Class;
export function createFragment( slug?:string ):Fragment.Class;
export function createFragment<T extends object>( this:Document, slugOrObject?:any, slug?:string ):T & Fragment.Class {
	slug = Utils.isString( slugOrObject ) ? slugOrObject : slug;
	const object:T = ! Utils.isString( slugOrObject ) && ! ! slugOrObject ? slugOrObject : <T> {};

	if( slug ) {
		if( ! RDF.URI.Util.isBNodeID( slug ) ) return this.createNamedFragment<T>( object, slug );
		if( this._fragmentsIndex.has( slug ) ) throw new Errors.IDAlreadyInUseError( "The slug provided is already being used by a fragment." );
	}

	const fragment:T & BlankNode.Class = BlankNode.Factory.createFrom<T>( object, slug, this );
	this._fragmentsIndex.set( fragment.id, fragment );

	convertNestedObjects( this, fragment );
	return fragment;
}

export function createNamedFragment<T extends Object>( object:T, slug:string ):NamedFragment.Class & T;
export function createNamedFragment( slug:string ):NamedFragment.Class;
export function createNamedFragment<T extends Object>( this:Document, slugOrObject:any, slug?:string ):T & NamedFragment.Class {
	slug = Utils.isString( slugOrObject ) ? slugOrObject : slug;
	const object:T = ! Utils.isString( slugOrObject ) && ! ! slugOrObject ? slugOrObject : <T> {};

	if( RDF.URI.Util.isBNodeID( slug ) ) throw new Errors.IllegalArgumentError( "Named fragments can't have a slug that starts with '_:'." );

	if( RDF.URI.Util.isAbsolute( slug ) ) {
		if( ! RDF.URI.Util.isFragmentOf( slug, this.id ) ) throw new Errors.IllegalArgumentError( "The slug is out of scope." );
		slug = RDF.URI.Util.hasFragment( slug ) ? RDF.URI.Util.getFragment( slug ) : slug;
	} else if( Utils.S.startsWith( slug, "#" ) ) slug = slug.substring( 1 );

	if( this._fragmentsIndex.has( slug ) ) throw new Errors.IDAlreadyInUseError( "The slug provided is already being used by a fragment." );

	const fragment:T & NamedFragment.Class = NamedFragment.Factory.createFrom<T>( object, slug, this );
	this._fragmentsIndex.set( slug, fragment );

	convertNestedObjects( this, fragment );
	return fragment;
}

export function removeFragment( this:Document, fragmentOrSlug:string | Fragment.Class ):void {
	let id:string = Utils.isString( fragmentOrSlug ) ? fragmentOrSlug : fragmentOrSlug.id;

	if( RDF.URI.Util.isAbsolute( id ) ) {
		if( ! RDF.URI.Util.isFragmentOf( id, this.id ) ) return;
		id = RDF.URI.Util.hasFragment( id ) ? RDF.URI.Util.getFragment( id ) : id;
	} else if( Utils.S.startsWith( id, "#" ) ) {
		id = id.substring( 1 );
	}

	this._fragmentsIndex.delete( id );
}

export function removeNamedFragment( this:Document, fragmentOrSlug:NamedFragment.Class | string ):void {
	const id:string = Utils.isString( fragmentOrSlug ) ? fragmentOrSlug : fragmentOrSlug.id;

	if( RDF.URI.Util.isBNodeID( id ) ) throw new Errors.IllegalArgumentError( "You can only remove NamedFragments." );
	this._removeFragment( id );
}

export function toJSON( this:Document, key:string ):RDF.Document.Class;
export function toJSON( this:Document, objectSchemaResolver?:ObjectSchema.Resolver, jsonldConverter?:JSONLDConverter.Class ):RDF.Document.Class;
export function toJSON( this:Document, keyOrObjectSchemaResolver?:string | ObjectSchema.Resolver, jsonldConverter:JSONLDConverter.Class = new JSONLDConverter.Class() ):RDF.Document.Class {
	const objectSchemaResolver:ObjectSchema.Resolver = Utils.isObject( keyOrObjectSchemaResolver ) ? keyOrObjectSchemaResolver : null;
	const generalSchema:ObjectSchema.DigestedObjectSchema = objectSchemaResolver ?
		objectSchemaResolver.getGeneralSchema() : new ObjectSchema.DigestedObjectSchema();

	const resources:object[] = [ this, ...this.getFragments() ];
	const expandedResources:RDF.Node.Class[] = resources.map( resource => {
		const resourceSchema:ObjectSchema.DigestedObjectSchema = objectSchemaResolver ? objectSchemaResolver.getSchemaFor( resource ) : new ObjectSchema.DigestedObjectSchema();
		return jsonldConverter.expand( resource, generalSchema, resourceSchema );
	} );

	return {
		"@id": this.id,
		"@graph": expandedResources,
	};
}

export function normalize( this:Document ):void {
	const currentFragments:Fragment.Class[] = this.getFragments()
		.filter( fragment => RDF.URI.Util.isBNodeID( fragment.id ) );
	const usedFragmentsIDs:Set<string> = new Set();

	convertNestedObjects( this, this, usedFragmentsIDs );
	currentFragments.forEach( fragment => {
		if( usedFragmentsIDs.has( fragment.id ) ) return;
		this._fragmentsIndex.delete( fragment.id );
	} );
}

export const convertNestedObjects:( parent:Document, actual:any, fragmentsTracker?:Set<string> ) => void = ( parent, actual, fragmentsTracker = new Set() ) => {
	let next:any;
	let idOrSlug:string;
	let fragment:Fragment.Class;

	let keys:string[] = Object.keys( actual );
	for( let key of keys ) {
		next = actual[ key ];

		if( Utils.isArray( next ) ) {
			convertNestedObjects( parent, next, fragmentsTracker );
			continue;
		}

		if( ! Utils.isPlainObject( next ) ) continue;
		if( Pointer.is( next ) ) {
			if( parent.hasFragment( next.id ) && ! fragmentsTracker.has( next.id ) ) {
				fragmentsTracker.add( next.id );
				convertNestedObjects( parent, next, fragmentsTracker );
			}
			continue;
		}

		idOrSlug = ( "id" in next ) ? next.id : ( ( "slug" in next ) ? RDF.URI.Util.hasFragment( next.slug ) ? next.slug : "#" + next.slug : "" );
		if( ! ! idOrSlug && ! parent.inScope( idOrSlug ) ) continue;

		let parentFragment:Fragment.Class = parent.getFragment( idOrSlug );

		if( ! parentFragment ) {
			fragment = parent.createFragment( <Object> next, idOrSlug );
			convertNestedObjects( parent, fragment, fragmentsTracker );

		} else if( parentFragment !== next ) {
			Object.assign( parentFragment, next );
			fragment = actual[ key ] = parentFragment;
			convertNestedObjects( parent, fragment, fragmentsTracker );
		}

	}

};
