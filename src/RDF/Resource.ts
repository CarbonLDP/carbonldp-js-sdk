/// <reference path="./../../typings/tsd.d.ts" />

import AbstractInjector from "./AbstractInjector";
import * as Literal from "./Literal";
import * as URI from "./URI";
import * as Value from "./Value";
import PropertyDescription from "./PropertyDescription";

import * as Utils from "./../Utils";
import * as RDF from "./../NS/RDF";
import * as RDFNode from "./RDFNode";

export interface Class extends RDFNode.Class {
	_propertyAddedCallbacks:(( property:string, value:(RDFNode.Class | Literal.Class) ) => void)[];
	_propertyDeletedCallbacks:(( property:string, value?:any ) => void)[];

	uri:string;
	types:Array<string>;

	hasProperty:( property:string ) => boolean;
	getProperty:( property:string ) => Value.Class;
	getPropertyValue:( property:string ) => any;
	getPropertyURI:( property:string ) => string;
	getProperties:( property:string ) => any[];
	getPropertyValues:( property:string ) => any[];
	getPropertyURIs:( property:string ) => string[];
	addProperty:( property:string, value:any ) => void;
	setProperty:( property:string, value:any ) => void;
	deleteProperty:( property:string ) => void;
}

function hasProperty( propertyURI:string ):boolean {
	return Utils.hasProperty( this, propertyURI );
}

function getProperty( propertyURI:string ):Value.Class {
	let values:Value.Class[] = this.getProperties( propertyURI );
	return values[ 0 ];
}

function getPropertyValue( propertyURI:string ):any {
	let propertyObject:any = this.getProperty( propertyURI );

	if ( Utils.isNull( propertyObject ) ) return null;

	if ( ! Literal.Factory.is( propertyObject ) ) return null;
	return Literal.Factory.parse( propertyObject );
}

function getPropertyURI( propertyURI:string ):string {
	let value:Value.Class = this.getProperty( propertyURI );
	if ( Utils.isNull( value ) ) return null;
	if ( ! Utils.hasProperty( value, "@id" ) ) return null;
	return value[ "@id" ];
}

function getProperties( propertyURI:string ):Value.Class[] {
	if ( ! this.hasProperty( propertyURI ) ) return [];
	return Utils.isArray( this[ propertyURI ] ) ? this[ propertyURI ] : [ this[ propertyURI ] ];
}

function getPropertyValues( propertyURI:string ):any[] {
	let values:any[] = [];

	if ( this.hasProperty( propertyURI ) ) {
		let propertyArray:Value.Class[] = this.getProperties( propertyURI );
		for ( let i:number = 0, length:number = propertyArray.length; i < length; i ++ ) {
			let value:Value.Class = propertyArray[ i ];
			if ( Literal.Factory.is( value ) ) values.push( Literal.Factory.parse( <Literal.Class>value ) );
		}
	}

	values = new TiedArray( <Class> this, propertyURI, values );

	return values;
}

function getPropertyURIs( propertyURI:string ):string[] {
	let uris:string[] = [];

	if ( this.hasProperty( propertyURI ) ) {
		let values:Value.Class[] = this.getProperties( propertyURI );

		for ( let i:number = 0, length:number = values.length; i < length; i ++ ) {
			let value:Value.Class = values[ i ];
			if ( Utils.hasProperty( value, "@id" ) ) uris.push( value[ "@id" ] );
		}
	}

	uris = new TiedArray( <Class> this, propertyURI, uris );

	return uris;
}

function addProperty( propertyURI:string, value:any ):void {
	let propertyArray:Value.Class[] = this.getProperties( propertyURI );

	let propertyValue:Value.Class;
	if( RDFNode.Factory.is( value ) ) {
		propertyValue = {
			"@id": value[ "@id" ]
		};
	} else propertyValue = Literal.Factory.from( value );

	let callbacks:(( property:string, value:any ) => void)[] = this._propertyAddedCallbacks;
	for ( let i:number = 0, length:number = callbacks.length; i < length; i ++ ) {
		let callback:( property:string, value:any ) => void = callbacks[ i ];
		callback.call( this, propertyURI, propertyValue );
	}

	propertyArray.push( propertyValue );
	this[ propertyURI ] = propertyArray;
}

function setProperty( propertyURI:string, value:any ):void {
	this.deleteProperty( propertyURI );
	if ( Utils.isNull( value ) ) return;
	this.addProperty( propertyURI, value );
}

function deleteProperty( propertyURI:string ):void {
	let callbacks:(( property:string, value?:any ) => void)[] = this._propertyDeletedCallbacks;
	for ( let i:number = 0, length:number = callbacks.length; i < length; i ++ ) {
		let callback:( property:string, value?:any ) => void = callbacks[ i ];
		callback.call( this, propertyURI );
	}

	delete this[ propertyURI ];
}

class TiedArray<T> extends Array<T> {
	private resource:Class;
	private property:string;

	constructor( resource:Class, property:string, array: T[] ) {
		super();

		super.push( ...array );

		this.resource = resource;
		this.property = property;
	}

	/**
	 * Appends new elements to an array, and returns the new length of the array.
	 * @param items New elements of the Array.
	 */
	push(...items: T[]): number {
		for ( let i:number = 0, length:number = items.length; i < length; i ++ ) {
			this.resource.addProperty( this.property, items[ i ] );
		}
		return super.push( ...items );
	}

	/**
	 * Removes the last element from an array and returns it.
	 */
	pop(): T {
		// TODO
		return null;
	}

	/**
	 * Adds all the elements of an array separated by the specified separator string.
	 * @param separator A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.
	 */
	join(separator?: string): string {
		// TODO
		return null;
	}

	/**
	 * Reverses the elements in an Array.
	 */
	reverse(): T[] {
		// TODO
		return null;
	}

	/**
	 * Removes the first element from an array and returns it.
	 */
	shift(): T {
		// TODO
		return null;
	}

	/**
	 * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
	 * @param start The zero-based location in the array from which to start removing elements.
	 */
	splice(start: number): T[];

	/**
	 * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
	 * @param start The zero-based location in the array from which to start removing elements.
	 * @param deleteCount The number of elements to remove.
	 * @param items Elements to insert into the array in place of the deleted elements.
	 */
	splice(start: number, deleteCount: number, ...items: T[]): T[];
	splice(start: number, deleteCount?: number, ...items: T[]): T[] {
		// TODO
		return null;
	}

	/**
	 * Inserts new elements at the start of an array.
	 * @param items  Elements to insert at the start of the Array.
	 */
	unshift(...items: T[]): number {
		// TODO
		return null;
	}
}


export class Factory extends AbstractInjector<Class> {
	static injectDefinitions( resource:Class, definitions:Map<string, Map<string, PropertyDescription>> ):Class;
	static injectDefinitions( resources:Class[], definitions:Map<string, Map<string, PropertyDescription>> ):Class[];
	static injectDefinitions( resourceOrResources:any, definitions:Map<string, Map<string, PropertyDescription>> ):any {
		let resources:Class[] = Utils.isArray( resourceOrResources ) ? <Class[]>resourceOrResources : [ <Class>resourceOrResources ];

		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			let resource:Class = resources[ i ];
			for ( let j:number = 0, length:number = resource.types.length; i < length; j ++ ) {
				let type:string = resource.types[ i ];
				let descriptions:Map<string, PropertyDescription> = new Map<string, PropertyDescription>();
				if ( definitions.has( type ) ) {
					Utils.M.extend( descriptions, definitions.get( type ) );
				}
				if ( descriptions.size !== 0 ) Factory.injectDescriptions( resource, descriptions );
			}
		}

		if ( Utils.isArray( resourceOrResources ) ) return resources;
		return resources[ 0 ];
	}


	static injectDescriptions( resource:Class, descriptions:Map<string, PropertyDescription> ):Object;
	static injectDescriptions( resource:Class, descriptionsObject:Object ):Object;
	static injectDescriptions( resources:Class[], descriptions:Map<string, PropertyDescription> ):Object[];
	static injectDescriptions( resource:Class[], descriptionsObject:Object ):Object[];
	static injectDescriptions( resourceOrResources:any, descriptionsMapOrObject:any ):any {
		let resources:Class[] = Utils.isArray( resourceOrResources ) ? <Class[]>resourceOrResources : [ <Class>resourceOrResources ];

		let descriptions:Map<string, PropertyDescription>;
		if ( Utils.isMap( descriptionsMapOrObject ) ) {
			descriptions = <any> descriptionsMapOrObject;
		} else if ( Utils.isObject( descriptionsMapOrObject ) ) {
			descriptions = <any> Utils.M.from( descriptionsMapOrObject );
		} else throw new Error( "IllegalArgument" );

		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			let resource:Class = resources[ i ];

			let descriptionNames:Iterator<string> = descriptions.keys();
			let next:IteratorResult<string> = descriptionNames.next();
			while ( ! next.done ) {
				let name:string = next.value;
				let description:PropertyDescription = descriptions.get( name );

				let getter:() => any, setter:( value:any ) => void;

				if ( Utils.isNull( description.literal ) ) {
					// The type isn't known, inject generic versions
					if ( description.multi ) {
						getter = Factory.genericMultipleGetter( description );
					} else getter = Factory.genericGetter( description );
				} else if ( ! description.literal ) {
					if ( description.multi ) {
						getter = Factory.urisGetter( description );
					} else getter = Factory.uriGetter( description );
				} else {
					if ( description.multi ) {
						getter = Factory.literalsGetter( description );
					} else getter = Factory.literalGetter( description );
				}

				setter = Factory.setter( description );

				Object.defineProperty(
					resource, name, {
						enumerable: false,
						get: getter,
						set: setter,
					}
				);

				next = descriptionNames.next();
			}
		}

		if ( Utils.isArray( resourceOrResources ) ) return resources;
		return resources[ 0 ];
	}

	private static genericGetter( description:PropertyDescription ):() => any {
		let uri:string = description.uri;
		return function():Value.Class {
			return this.getProperty( uri );
		};
	}

	private static genericMultipleGetter( description:PropertyDescription ):() => any {
		let uri:string = description.uri;
		return function():Value.Class[] {
			return this.getProperties( uri );
		};
	}

	private static uriGetter( description:PropertyDescription ):() => any {
		let uri:string = description.uri;
		return function():string {
			return this.getPropertyURI( uri );
		};
	}

	private static urisGetter( description:PropertyDescription ):() => any {
		let uri:string = description.uri;
		return function():string[] {
			return this.getPropertyURIs( uri );
		};
	}

	private static literalGetter( description:PropertyDescription ):() => any {
		let uri:string = description.uri;
		return function():any {
			return this.getPropertyValue( uri );
		};
	}

	private static literalsGetter( description:PropertyDescription ):() => any {
		let uri:string = description.uri;
		return function():any[] {
			return this.getPropertyValues( uri );
		};
	}

	private static setter( description:PropertyDescription ):( value:any ) => void {
		let uri:string = description.uri;
		return function ( value:any ):void {
			this.setProperty( uri, value );
		};
	}

	constructor() {
		super( null );
	}

	hasClassProperties( resource:RDFNode.Class ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "_propertyAddedCallbacks" ) &&
			Utils.hasPropertyDefined( resource, "_propertyDeletedCallbacks" ) &&

			Utils.hasPropertyDefined( resource, "uri" ) &&
			Utils.hasPropertyDefined( resource, "types" ) &&

			Utils.hasFunction( resource, "hasProperty" ) &&
			Utils.hasFunction( resource, "getProperty" ) &&
			Utils.hasFunction( resource, "getPropertyValue" ) &&
			Utils.hasFunction( resource, "getPropertyURI" ) &&
			Utils.hasFunction( resource, "getProperties" ) &&
			Utils.hasFunction( resource, "getPropertyValues" ) &&
			Utils.hasFunction( resource, "getPropertyURIs" ) &&
			Utils.hasFunction( resource, "addProperty" ) &&
			Utils.hasFunction( resource, "setProperty" ) &&
			Utils.hasFunction( resource, "deleteProperty" )
		);
	}

	is( value:any ):boolean {
		return (
			super.is( value ) &&

			( ! Utils.isNull( value ) ) &&
			Utils.isObject( value ) &&

			this.hasClassProperties( value )
		);
	}

	hasRDFClass( resource:RDFNode.Class ):boolean {
		return true;
	}

	protected injectBehavior<T>( node:T ):( T & Class ) {
		let resource:Class = <any> node;
		if( this.hasClassProperties( resource ) ) return <any> resource;

		Object.defineProperties( resource, {
			"_propertyAddedCallbacks": {
				writable: false,
				enumerable: false,
				value: [],
			},
			"_propertyDeletedCallbacks": {
				writable: false,
				enumerable: false,
				value: [],
			},

			"types": {
				get: function():Value.Class[] {
					if ( ! this[ "@type" ] ) this[ "@type" ] = [];
					return this[ "@type" ];
				},
				set: function ( value:any ):void {
					// TODO: Implement
				},
				enumerable: false,
			},
			"uri": {
				get: function():string {
					return this[ "@id" ];
				},
				set: function ( value:string ):void {
					this[ "@id" ] = value;
				},
				enumerable: false,
			},

			"hasProperty": {
				writable: false,
				enumerable: false,
				value: hasProperty,
			},
			"getProperty": {
				writable: false,
				enumerable: false,
				value: getProperty,
			},
			"getPropertyValue": {
				writable: false,
				enumerable: false,
				value: getPropertyValue,
			},
			"getPropertyURI": {
				writable: false,
				enumerable: false,
				value: getPropertyURI,
			},
			"getProperties": {
				writable: false,
				enumerable: false,
				value: getProperties,
			},
			"getPropertyValues": {
				writable: false,
				enumerable: false,
				value: getPropertyValues,
			},
			"getPropertyURIs": {
				writable: false,
				enumerable: false,
				value: getPropertyURIs,
			},
			"addProperty": {
				writable: false,
				enumerable: false,
				value: addProperty,
			},
			"setProperty": {
				writable: false,
				enumerable: false,
				value: setProperty,
			},
			"deleteProperty": {
				writable: false,
				enumerable: false,
				value: deleteProperty,
			},
		} );

		return <any> resource;
	}
}

export let factory:Factory = new Factory;
