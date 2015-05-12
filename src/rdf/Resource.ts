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

	hasType:( type:string )=>boolean;
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

function hasType( type:string ):boolean {
	var property = RDF.Predicate.type;
	if ( ! this.hasOwnProperty( property ) ) return false;
	var values = Utils.isArray( this[ property ] ) ? this[ property ] : [ this[ property ] ];
	return (function () {
		for ( var i = 0, length = values.length; i < length; i ++ ) {
			var value = values[ i ];
			if ( value[ '@id' ] == type ) return true;
		}
		return false;
	})();
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
	static is( value:any ):boolean {
		return (
		RDFNode.Factory.is( value ) &&

		Utils.hasFunction( value, '_propertyAddedCallbacks' ) &&
		Utils.hasFunction( value, '_propertyDeletedCallbacks' ) &&

		Utils.hasProperty( value, 'uri' ) &&

		Utils.hasFunction( value, 'hasType' ) &&
		Utils.hasFunction( value, 'hasProperty' ) &&
		Utils.hasFunction( value, 'getProperty' ) &&
		Utils.hasFunction( value, 'getPropertyValue' ) &&
		Utils.hasFunction( value, 'getPropertyURI' ) &&
		Utils.hasFunction( value, 'getProperties' ) &&
		Utils.hasFunction( value, 'getPropertyValues' ) &&
		Utils.hasFunction( value, 'getPropertyURIs' ) &&
		Utils.hasFunction( value, 'addProperty' ) &&
		Utils.hasFunction( value, 'setProperty' ) &&
		Utils.hasFunction( value, 'deleteProperty' )
		);
	}

	static create():Resource {
		var resource = {};
		return Factory.from( resource );
	}

	static from( object:Object ):Resource;
	static from( objects:Object[] ):Resource[];
	static from( objectOrObjects:(Object | Object[]) ):any {
		var objects:Object[] = Utils.isArray( objectOrObjects ) ? <Object[]>objectOrObjects : [ <Object>objectOrObjects ];
		var resources:Resource[] = [];

		for ( var i:number = 0, length:number = objects.length; i < length; i ++ ) {
			var resource:Resource = <any>objects[ i ];

			if ( ! Factory.is( resource ) ) {
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
					'uri': {
						get: function () {
							return this[ '@id' ];
						},
						set: function ( value ) {
							this[ '@id' ] = value;
						},
						enumerable: false
					}
				} );

				resource.hasType = hasType;
				resource.hasProperty = hasProperty;
				resource.getProperty = getProperty;
				resource.getPropertyValue = getPropertyValue;
				resource.getPropertyURI = getPropertyURI;
				resource.getProperties = getProperties;
				resource.getPropertyValues = getPropertyValues;
				resource.getPropertyURIs = getPropertyURIs;
				resource.addProperty = addProperty;
				resource.setProperty = setProperty;
				resource.deleteProperty = deleteProperty;
			}

			resources.push( resource );
		}

		if ( Utils.isArray( objectOrObjects ) ) return resources;
		else return resources[ 0 ];
	}

	static injectDescriptions( resource:Resource, descriptions:PropertyDescription[] ):Object;
	static injectDescriptions( resources:Resource[], descriptions:PropertyDescription[] ):Object[];
	static injectDescriptions( resourceOrResources:(Resource | Resource[]), descriptions:PropertyDescription[] ):any {
		var resources:Resource[] = Utils.isArray( resourceOrResources ) ? <Resource[]>resourceOrResources : [ <Resource>resourceOrResources ];

		for ( var i:number = 0, length:number = resources.length; i < length; i ++ ) {
			var resource:Resource = resources[ i ];
			for ( var j:number = 0, descriptionLength:number = descriptions.length; j < descriptionLength; j ++ ) {
				var description:PropertyDescription = descriptions[ j ];

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
					resource, description.name, {
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

export { Resource as Class, Factory };