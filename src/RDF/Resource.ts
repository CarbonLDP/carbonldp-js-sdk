/// <reference path="../../typings/es6/es6.d.ts" />

import * as Literal from './Literal';
import * as Value from './Value';
import PropertyDescription from './PropertyDescription';

import * as Utils from '../Utils';
import * as RDF from '../namespaces/RDF';
import * as RDFNode from './RDFNode';

interface Resource extends RDFNode.Class {
	_propertyAddedCallbacks:(( property:string, value:any )=>void)[];
	_propertyDeletedCallbacks:(( property:string, value?:any )=>void)[];

	uri:string;
	types:Array<string>;

	hasProperty:( property:string )=>boolean;
	getProperty:( property:string )=>any;
	getPropertyValue:( property:string )=>any;
	getPropertyURI:( property:string )=>string;
	getProperties:( property:string )=>any[];
	getPropertyValues:( property:string )=>any[];
	getPropertyURIs:( property:string )=>string[];
	addProperty:( property:string, value:any )=>void;
	setProperty:( property:string, value:any )=>void;
	deleteProperty:( property:string )=>void;
}

function hasProperty( propertyURI:string ):boolean {
	return Utils.hasProperty( this, propertyURI );
}

function getProperty( propertyURI:string ):Value.Class {
	var values:Value.Class[] = this.getProperties( propertyURI );
	return values[ 0 ];
}

function getPropertyValue( propertyURI:string ):any {
	var propertyObject:any = this.getProperty( propertyURI );

	if ( Utils.isNull( propertyObject ) ) return null;

	if ( ! Literal.Factory.is( propertyObject ) ) return null;
	return Literal.Factory.parse( propertyObject );
}

function getPropertyURI( propertyURI:string ):string {
	var value:Value.Class = this.getProperty( propertyURI );
	if ( Utils.isNull( value ) ) return null;
	if ( ! Utils.hasProperty( value, '@id' ) ) return null;
	return value[ '@id' ];
}

function getProperties( propertyURI:string ):Value.Class[] {
	if ( ! this.hasProperty( propertyURI ) ) return [];
	return Utils.isArray( this[ propertyURI ] ) ? this[ propertyURI ] : [ this[ propertyURI ] ];
}

function getPropertyValues( propertyURI ):any[] {
	var values:any[] = [];

	if ( this.hasProperty( propertyURI ) ) {
		var propertyArray:Value.Class[] = this.getProperties( propertyURI );
		for ( var i:number = 0, length:number = propertyArray.length; i < length; i ++ ) {
			var value:Value.Class = propertyArray[ i ];
			if ( Literal.Factory.is( value ) ) values.push( Literal.Factory.parse( <Literal.Class>value ) );
		}
	}

	values = tieArray( <Resource> this, propertyURI, values );

	return values;
}

function getPropertyURIs( propertyURI:string ):string[] {
	var uris:string[] = [];

	if ( this.hasProperty( propertyURI ) ) {
		var values:Value.Class[] = this.getProperties( propertyURI );

		for ( var i = 0, length = values.length; i < length; i ++ ) {
			var value:Value.Class = values[ i ];
			if ( Utils.hasProperty( value, '@id' ) ) uris.push( value[ '@id' ] );
		}
	}

	uris = tieArray( <Resource> this, propertyURI, uris );

	return uris;
}

function addProperty( propertyURI:string, value:any ):void {
	var propertyArray = this.getProperties( propertyURI );

	var propertyValue:Value.Class;
	if ( RDFNode.Factory.is( value ) ) {
		propertyValue = {
			'@id': value[ '@id' ]
		};
	} else propertyValue = Literal.Factory.from( value );

	var callbacks:(( property:string, value:any ) => void)[] = this._propertyAddedCallbacks;
	for ( let i:number = 0, length:number = callbacks.length; i < length; i ++ ) {
		var callback:( property:string, value:any ) => void = callbacks[ i ];
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
	var callbacks:(( property:string, value?:any ) => void)[] = this._propertyDeletedCallbacks;
	for ( let i:number = 0, length:number = callbacks.length; i < length; i ++ ) {
		var callback:( property:string, value?:any ) => void = callbacks[ i ];
		callback.call( this, propertyURI );
	}

	delete this[ propertyURI ];
}

function tieArray( resource:Resource, property:string, array:any[] ) {
	array.push = (function () {
		return function ( ...items:any[] ):number {
			for ( var i:number = 0, length:number = items.length; i < length; i ++ ) {
				resource.addProperty( property, items[ i ] );
			}
			return Array.prototype.push.call( array, items );
		};
	}());
	// TODO: concat
	// TODO: join
	// TODO: pop
	// TODO: reverse
	// TODO: shift
	// TODO: slice
	// TODO: sort
	// TODO: splice
	// TODO: unshift

	return array;
}


class Factory {
	is( value:any ):boolean {
		//@formatter:off
		return (
			// RDFNode.Factory.is( value ) &&

			( ! Utils.isNull( value ) ) &&
			Utils.isObject( value ) &&

			this.hasClassProperties( value )
		);
		//@formatter:on
	}

	create():Resource {
		var resource = {};
		return <Resource> this.from( resource );
	}

	from( objectOrObjects:(Object | Object[]) ):(Resource | Resource[]) {
		var objects:Object[] = Utils.isArray( objectOrObjects ) ? <Object[]>objectOrObjects : [ <Object>objectOrObjects ];

		for ( var i:number = 0, length:number = objects.length; i < length; i ++ ) {
			var resource:RDFNode.Class = <RDFNode.Class> objects[ i ];
			if ( ! this.hasClassProperties( resource ) ) this.injectBehaviour( resource );
		}

		if ( Utils.isArray( objectOrObjects ) ) return <Resource[]> objects;
		else return <Resource> objects[ 0 ];
	}

	protected hasRDFClass( resource:RDFNode.Class ):boolean {
		// TODO: Implement
		return true;
	}

	protected hasClassProperties( resource:RDFNode.Class ):boolean {
		return (
			Utils.hasPropertyDefined( resource, '_propertyAddedCallbacks' ) &&
			Utils.hasPropertyDefined( resource, '_propertyDeletedCallbacks' ) &&

			Utils.hasPropertyDefined( resource, 'uri' ) &&
			Utils.hasPropertyDefined( resource, 'types' ) &&

			Utils.hasFunction( resource, 'hasProperty' ) &&
			Utils.hasFunction( resource, 'getProperty' ) &&
			Utils.hasFunction( resource, 'getPropertyValue' ) &&
			Utils.hasFunction( resource, 'getPropertyURI' ) &&
			Utils.hasFunction( resource, 'getProperties' ) &&
			Utils.hasFunction( resource, 'getPropertyValues' ) &&
			Utils.hasFunction( resource, 'getPropertyURIs' ) &&
			Utils.hasFunction( resource, 'addProperty' ) &&
			Utils.hasFunction( resource, 'setProperty' ) &&
			Utils.hasFunction( resource, 'deleteProperty' )
		);
	}

	protected injectBehaviour( resource:RDFNode.Class ):Resource {
		Object.defineProperties( resource, {
			'_propertyAddedCallbacks': {
				writable: false,
				enumerable: false,
				value: []
			},
			'_propertyDeletedCallbacks': {
				writable: false,
				enumerable: false,
				value: []
			},

			'types': {
				get: function () {
					if ( ! this[ '@type' ] ) this[ '@type' ] = [];
					return this[ '@type' ];
				},
				set: function ( value ) {
					// TODO: Implement
				},
				enumerable: false
			},
			'uri': {
				get: function () {
					return this[ '@id' ];
				},
				set: function ( value ) {
					this[ '@id' ] = value;
				},
				enumerable: false
			},

			'hasProperty': {
				writable: false,
				enumerable: false,
				value: hasProperty
			},
			'getProperty': {
				writable: false,
				enumerable: false,
				value: getProperty
			},
			'getPropertyValue': {
				writable: false,
				enumerable: false,
				value: getPropertyValue
			},
			'getPropertyURI': {
				writable: false,
				enumerable: false,
				value: getPropertyURI
			},
			'getProperties': {
				writable: false,
				enumerable: false,
				value: getProperties
			},
			'getPropertyValues': {
				writable: false,
				enumerable: false,
				value: getPropertyValues
			},
			'getPropertyURIs': {
				writable: false,
				enumerable: false,
				value: getPropertyURIs
			},
			'addProperty': {
				writable: false,
				enumerable: false,
				value: addProperty
			},
			'setProperty': {
				writable: false,
				enumerable: false,
				value: setProperty
			},
			'deleteProperty': {
				writable: false,
				enumerable: false,
				value: deleteProperty
			}
		} );

		return <Resource> resource;
	}

	static injectDefinitions( resource:Resource, definitions:Map<string, Map<string, PropertyDescription>> ):Resource;
	static injectDefinitions( resources:Resource[], definitions:Map<string, Map<string, PropertyDescription>> ):Resource[];
	static injectDefinitions( resourceOrResources:any, definitions:Map<string, Map<string, PropertyDescription>> ):any {
		var resources:Resource[] = Utils.isArray( resourceOrResources ) ? <Resource[]>resourceOrResources : [ <Resource>resourceOrResources ];

		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			var resource:Resource = resources[ i ];
			for ( let j:number = 0, length:number = resource.types.length; i < length; j ++ ) {
				var type:string = resource.types[ i ];
				var descriptions:Map<string, PropertyDescription> = new Map<string, PropertyDescription>();
				if ( definitions.has( type ) ) {
					Utils.M.extend( descriptions, definitions.get( type ) );
				}
				if ( descriptions.size() !== 0 ) Factory.injectDescriptions( resource, descriptions );
			}
		}

		if ( Utils.isArray( resourceOrResources ) ) return resources;
		else return resources[ 0 ];
	}


	static injectDescriptions( resource:Resource, descriptions:Map<string, PropertyDescription> ):Object;
	static injectDescriptions( resource:Resource, descriptionsObject:Object ):Object;
	static injectDescriptions( resources:Resource[], descriptions:Map<string, PropertyDescription> ):Object[];
	static injectDescriptions( resource:Resource[], descriptionsObject:Object ):Object[];
	static injectDescriptions( resourceOrResources:any, descriptionsMapOrObject:any ):any {
		var resources:Resource[] = Utils.isArray( resourceOrResources ) ? <Resource[]>resourceOrResources : [ <Resource>resourceOrResources ];

		var descriptions:Map<string, PropertyDescription>;
		if ( Utils.isMap( descriptionsMapOrObject ) ) {
			descriptions = <any> descriptionsMapOrObject;
		} else if ( Utils.isObject( descriptionsMapOrObject ) ) {
			descriptions = <any> Utils.M.from( descriptionsMapOrObject );
		} else throw new Error( 'IllegalArgument' );

		for ( var i:number = 0, length:number = resources.length; i < length; i ++ ) {
			var resource:Resource = resources[ i ];

			var descriptionNames:Iterator<string> = descriptions.keys();
			var next:IteratorValue<string>;
			while ( ! (next = descriptionNames.next()).done ) {
				var name:string = next.value;
				var description:PropertyDescription = descriptions.get( name );

				var getter:()=>any, setter:( any )=>void;

				if ( Utils.isNull( description.literal ) ) {
					// The type isn't known, inject generic versions
					if ( description.multi ) getter = Factory.genericMultipleGetter( description );
					else getter = Factory.genericGetter( description );
				} else if ( ! description.literal ) {
					if ( description.multi ) getter = Factory.urisGetter( description );
					else getter = Factory.uriGetter( description );
				} else {
					if ( description.multi ) getter = Factory.literalsGetter( description );
					else getter = Factory.literalGetter( description );
				}

				setter = Factory.setter( description );

				Object.defineProperty(
					resource, name, {
						enumerable: false,
						get: getter,
						set: setter
					}
				);
			}
		}

		if ( Utils.isArray( resourceOrResources ) ) return resources;
		else return resources[ 0 ];
	}

	private static genericGetter( description:PropertyDescription ):()=>any {
		var uri = description.uri;
		return function () {
			return this.getProperty( uri );
		};
	}

	private static genericMultipleGetter( description:PropertyDescription ):()=>any {
		var uri = description.uri;
		return function () {
			return this.getProperties( uri );
		};
	}

	private static uriGetter( description:PropertyDescription ):()=>any {
		var uri = description.uri;
		return function () {
			return this.getPropertyURI( uri );
		};
	}

	private static urisGetter( description:PropertyDescription ):()=>any {
		var uri = description.uri;
		return function () {
			return this.getPropertyURIs( uri );
		};
	}

	private static literalGetter( description:PropertyDescription ):()=>any {
		var uri = description.uri;
		return function () {
			return this.getPropertyValue( uri );
		};
	}

	private static literalsGetter( description:PropertyDescription ):()=>any {
		var uri = description.uri;
		return function ():any {
			return this.getPropertyValues( uri );
		};
	}

	private static setter( description:PropertyDescription ):( value:any )=>void {
		var uri = description.uri;
		return function ( value:any ):void {
			this.setProperty( uri, value );
		};
	}
}

var factory = new Factory;

//@formatter:off
export {
	Resource as Class,
	Factory,
	factory
};
//@formatter:on