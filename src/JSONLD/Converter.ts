import * as Errors from "./../Errors";
import * as ObjectSchema from "./../ObjectSchema";
import * as NS from "./../NS";
import * as Pointer from "./../Pointer";
import * as RDF from "./../RDF";
import * as Utils from "./../Utils";

// TODO: Use Literal.Parsers to parse literals
export class Class {
	private _literalSerializers:Map<string, RDF.Literal.Serializer>;

	get literalSerializers():Map<string, RDF.Literal.Serializer> { return this._literalSerializers; }

	private static getDefaultSerializers():Map<string, RDF.Literal.Serializer> {
		let literalSerializers:Map<string, RDF.Literal.Serializer> = new Map<string, RDF.Literal.Serializer>();

		literalSerializers.set( NS.XSD.DataType.date, RDF.Literal.Serializers.XSD.dateSerializer );
		literalSerializers.set( NS.XSD.DataType.dateTime, RDF.Literal.Serializers.XSD.dateTimeSerializer );
		literalSerializers.set( NS.XSD.DataType.time, RDF.Literal.Serializers.XSD.timeSerializer );
		literalSerializers.set( NS.XSD.DataType.integer, RDF.Literal.Serializers.XSD.integerSerializer );
		literalSerializers.set( NS.XSD.DataType.int, RDF.Literal.Serializers.XSD.integerSerializer );
		literalSerializers.set( NS.XSD.DataType.unsignedInt, RDF.Literal.Serializers.XSD.unsignedIntegerSerializer );
		literalSerializers.set( NS.XSD.DataType.long, RDF.Literal.Serializers.XSD.longSerializer );
		literalSerializers.set( NS.XSD.DataType.unsignedLong, RDF.Literal.Serializers.XSD.unsignedLongSerializer );
		literalSerializers.set( NS.XSD.DataType.float, RDF.Literal.Serializers.XSD.floatSerializer );
		literalSerializers.set( NS.XSD.DataType.double, RDF.Literal.Serializers.XSD.floatSerializer );
		literalSerializers.set( NS.XSD.DataType.boolean, RDF.Literal.Serializers.XSD.booleanSerializer );
		literalSerializers.set( NS.XSD.DataType.string, RDF.Literal.Serializers.XSD.stringSerializer );

		return literalSerializers;
	}

	private static getPropertyURI( propertyName:string, definition:ObjectSchema.DigestedPropertyDefinition, vocab:string ):string {
		let uri:string;
		let relativeName:string = null;

		if( definition.uri !== null ) {
			uri = definition.uri.toString();
			if( RDF.URI.Util.isRelative( uri ) ) relativeName = uri;
		} else {
			relativeName = propertyName;
		}

		if( relativeName !== null ) {
			if( vocab !== null ) {
				uri = vocab + relativeName;
			} else {
				throw new Errors.InvalidJSONLDSyntaxError( `The context doesn't have a default vocabulary and the object schema does not define a proper absolute @id for the property '${ propertyName }'` );
			}
		}

		return uri;
	}

	constructor( literalSerializers?:Map<string, RDF.Literal.Serializer> ) {
		this._literalSerializers = ! ! literalSerializers ? literalSerializers : Class.getDefaultSerializers();
	}

	compact( expandedObjects:Object[], targetObjects:Object[], digestedSchema:ObjectSchema.DigestedObjectSchema, pointerLibrary:Pointer.Library ):Object[];
	compact( expandedObject:Object, targetObject:Object, digestedSchema:ObjectSchema.DigestedObjectSchema, pointerLibrary:Pointer.Library, strict?:boolean ):Object;
	compact( expandedObjects:Object[], digestedSchema:ObjectSchema.DigestedObjectSchema, pointerLibrary:Pointer.Library ):Object[];
	compact( expandedObject:Object, digestedSchema:ObjectSchema.DigestedObjectSchema, pointerLibrary:Pointer.Library ):Object;
	compact( expandedObjectOrObjects:any, targetObjectOrObjectsOrDigestedContext:any, digestedSchemaOrPointerLibrary:any, pointerLibrary:Pointer.Library = null, strict?:boolean ):any {
		let targetObjectOrObjects:any = ! pointerLibrary ? null : targetObjectOrObjectsOrDigestedContext;
		let digestedSchema:any = ! pointerLibrary ? targetObjectOrObjectsOrDigestedContext : digestedSchemaOrPointerLibrary;
		pointerLibrary = ! pointerLibrary ? digestedSchemaOrPointerLibrary : pointerLibrary;

		if( ! Utils.isArray( expandedObjectOrObjects ) ) return this.compactSingle( expandedObjectOrObjects, targetObjectOrObjects, digestedSchema, pointerLibrary, strict );

		let expandedObjects:Object[] = expandedObjectOrObjects;
		let targetObjects:Object[] = ! ! targetObjectOrObjects ? targetObjectOrObjects : [];
		for( let i:number = 0, length:number = expandedObjects.length; i < length; i ++ ) {
			let expandedObject:Object = expandedObjects[ i ];
			let targetObject:Object = targetObjects[ i ] = ! ! targetObjects[ i ] ? targetObjects[ i ] : {};

			this.compactSingle( expandedObject, targetObject, digestedSchema, pointerLibrary, strict );
		}

		return targetObjects;
	}

	expand( compactedObjects:Object[], generalSchema:ObjectSchema.DigestedObjectSchema, digestedSchema:ObjectSchema.DigestedObjectSchema ):RDF.Node.Class[];
	expand( compactedObject:Object, generalSchema:ObjectSchema.DigestedObjectSchema, digestedSchema:ObjectSchema.DigestedObjectSchema ):RDF.Node.Class;
	expand( compactedObjectOrObjects:Object[], generalSchema:ObjectSchema.DigestedObjectSchema, digestedSchema:ObjectSchema.DigestedObjectSchema ):any {
		if( ! Utils.isArray( compactedObjectOrObjects ) ) return this.expandSingle( compactedObjectOrObjects, generalSchema, digestedSchema );
	}

	private expandSingle( compactedObject:Object, generalSchema:ObjectSchema.DigestedObjectSchema, digestedSchema:ObjectSchema.DigestedObjectSchema ):RDF.Node.Class {
		let expandedObject:any = {};

		expandedObject[ "@id" ] = ! ! compactedObject[ "id" ] ? compactedObject[ "id" ] : "";
		if( ! ! compactedObject[ "types" ] ) expandedObject[ "@type" ] = compactedObject[ "types" ].map( ( type:string ) => ObjectSchema.Util.resolveURI( type, generalSchema ) );

		Utils.forEachOwnProperty( compactedObject, ( propertyName:string, value:any ):void => {
			if( propertyName === "id" ) return;
			if( propertyName === "types" ) return;

			let expandedValue:any;
			let expandedPropertyName:string = null;
			if( digestedSchema.properties.has( propertyName ) ) {
				let definition:ObjectSchema.DigestedPropertyDefinition = Utils.O.clone( digestedSchema.properties.get( propertyName ), { objects: true } );
				expandedPropertyName = Class.getPropertyURI( propertyName, definition, digestedSchema.vocab );
				expandedValue = this.expandProperty( value, definition, generalSchema, digestedSchema );

			} else if( RDF.URI.Util.isAbsolute( propertyName ) || digestedSchema.vocab !== null ) {
				expandedValue = this.expandPropertyValue( value, generalSchema, digestedSchema );
				expandedPropertyName = ObjectSchema.Util.resolveURI( propertyName, generalSchema );
			}

			if( ! expandedValue || ! expandedPropertyName ) return;
			expandedObject[ expandedPropertyName ] = expandedValue;
		} );

		return expandedObject;
	}

	private expandProperty( propertyValue:any, propertyDefinition:ObjectSchema.DigestedPropertyDefinition, generalSchema:ObjectSchema.DigestedObjectSchema, digestedSchema:ObjectSchema.DigestedObjectSchema ):any {
		switch( propertyDefinition.containerType ) {
			case null:
				// Property is not a list
				if( propertyDefinition.literal ) {
					return this.expandPropertyLiteral( propertyValue, propertyDefinition.literalType.toString() );
				} else if( propertyDefinition.literal === false ) {
					return this.expandPropertyPointer( propertyValue, generalSchema, digestedSchema );
				} else {
					return this.expandPropertyValue( propertyValue, generalSchema, digestedSchema );
				}
			case ObjectSchema.ContainerType.LIST:
				if( propertyDefinition.literal ) {
					return this.expandPropertyLiteralList( propertyValue, propertyDefinition.literalType.toString() );
				} else if( propertyDefinition.literal === false ) {
					return this.expandPropertyPointerList( propertyValue, generalSchema, digestedSchema );
				} else {
					return this.expandPropertyList( propertyValue, generalSchema, digestedSchema );
				}
			case ObjectSchema.ContainerType.SET:
				if( propertyDefinition.literal ) {
					return this.expandPropertyLiterals( propertyValue, propertyDefinition.literalType.toString() );
				} else if( propertyDefinition.literal === false ) {
					return this.expandPropertyPointers( propertyValue, generalSchema, digestedSchema );
				} else {
					return this.expandPropertyValues( propertyValue, generalSchema, digestedSchema );
				}
			case ObjectSchema.ContainerType.LANGUAGE:
				return this.expandPropertyLanguageMap( propertyValue );
			default:
				throw new Errors.IllegalArgumentError( "The containerType specified is not supported." );
		}
	}

	private expandPropertyValue( propertyValue:any, generalSchema:ObjectSchema.DigestedObjectSchema, digestedSchema:ObjectSchema.DigestedObjectSchema ):any {
		if( Utils.isArray( propertyValue ) ) {
			return this.expandPropertyValues( propertyValue, generalSchema, digestedSchema );
		} else {
			let expandedValue:RDF.Node.Class = this.expandValue( propertyValue, generalSchema, digestedSchema );

			if( ! expandedValue ) return null;

			return [ expandedValue ];
		}
	}

	private expandPropertyPointer( propertyValue:any, generalSchema:ObjectSchema.DigestedObjectSchema, digestedSchema:ObjectSchema.DigestedObjectSchema ):any {
		let expandedPointer:RDF.Node.Class = this.expandPointer( propertyValue, generalSchema, digestedSchema );

		if( ! expandedPointer ) return null;

		return [ expandedPointer ];
	}

	private expandPropertyLiteral( propertyValue:any, literalType:string ):any {
		// TODO: Language
		let serializedValue:string = this.serializeLiteral( propertyValue, literalType );

		if( serializedValue === null ) return null;

		return [
			{ "@value": serializedValue, "@type": literalType },
		];
	}

	private expandPropertyList( propertyValues:any, generalSchema:ObjectSchema.DigestedObjectSchema, digestedSchema:ObjectSchema.DigestedObjectSchema ):any {
		propertyValues = Utils.isArray( propertyValues ) ? propertyValues : [ propertyValues ];

		let expandedArray:any = this.expandArray( propertyValues, generalSchema, digestedSchema );

		if( ! expandedArray ) return null;

		return [
			{ "@list": expandedArray },
		];
	}

	private expandPropertyPointerList( propertyValues:any, generalSchema:ObjectSchema.DigestedObjectSchema, digestedSchema:ObjectSchema.DigestedObjectSchema ):any {
		let listValues:Array<any> = this.expandPropertyPointers( propertyValues, generalSchema, digestedSchema );

		return [
			{ "@list": listValues },
		];
	}

	private expandPropertyLiteralList( propertyValues:any, literalType:string ):any {
		let listValues:Array<any> = this.expandPropertyLiterals( propertyValues, literalType );

		return [
			{ "@list": listValues },
		];
	}

	private expandPropertyValues( propertyValues:any, generalSchema:ObjectSchema.DigestedObjectSchema, digestedSchema:ObjectSchema.DigestedObjectSchema ):any {
		propertyValues = Utils.isArray( propertyValues ) ? propertyValues : [ propertyValues ];

		let expandedArray:any = this.expandArray( propertyValues, generalSchema, digestedSchema );

		if( ! expandedArray ) return null;

		return expandedArray;
	}

	private expandPropertyPointers( propertyValues:any, generalSchema:ObjectSchema.DigestedObjectSchema, digestedSchema:ObjectSchema.DigestedObjectSchema ):any {
		propertyValues = Utils.isArray( propertyValues ) ? propertyValues : [ propertyValues ];

		let expandedPointers:Array<any> = [];
		for( let propertyValue of propertyValues ) {
			let expandedPointer:RDF.Node.Class = this.expandPointer( propertyValue, generalSchema, digestedSchema );
			if( ! expandedPointer ) continue;

			expandedPointers.push( expandedPointer );
		}

		return expandedPointers;
	}

	private expandPropertyLiterals( propertyValues:any, literalType:string ):any {
		propertyValues = Utils.isArray( propertyValues ) ? propertyValues : [ propertyValues ];

		let listValues:Array<any> = [];
		for( let propertyValue of propertyValues ) {
			let serializedValue:string = this.serializeLiteral( propertyValue, literalType );
			if( ! serializedValue ) continue;

			listValues.push( { "@value": serializedValue, "@type": literalType } );
		}

		return listValues;
	}

	private expandPropertyLanguageMap( propertyValue:any ):any {
		if( ! Utils.isObject( propertyValue ) ) {
			// TODO: Warn of data loss
			return null;
		}

		let mapValues:Array<any> = [];
		Utils.forEachOwnProperty( propertyValue, ( languageTag:string, value:any ):void => {
			// TODO: Validate language tags

			let serializedValue:string = this.literalSerializers.get( NS.XSD.DataType.string ).serialize( value );
			mapValues.push( { "@value": serializedValue, "@type": NS.XSD.DataType.string, "@language": languageTag } );
		} );

		return mapValues;
	}

	private serializeLiteral( propertyValue:any, literalType:string ):string {
		if( Pointer.Factory.is( propertyValue ) ) {
			// TODO: Warn of data loss
			return null;
		}

		if( ! this.literalSerializers.has( literalType ) ) {
			// TODO: Warn of data loss
			return null;
		}

		try {
			return this.literalSerializers.get( literalType ).serialize( propertyValue );
		} catch( error ) {
			// TODO: Warn of data loss
			return null;
		}
	}

	private expandPointer( propertyValue:any, generalSchema:ObjectSchema.DigestedObjectSchema, digestedSchema:ObjectSchema.DigestedObjectSchema ):RDF.Node.Class {
		let notPointer:boolean = true;
		let id:string;
		if( Pointer.Factory.is( propertyValue ) ) {
			notPointer = false;
			propertyValue = propertyValue.id;
		} else if( ! Utils.isString( propertyValue ) ) {
			propertyValue = null;
		}

		id = propertyValue;
		if( ! id ) {
			// TODO: Warn of data loss
			return null;
		}

		id = ObjectSchema.Digester.resolvePrefixedURI( id, generalSchema );

		if( generalSchema.properties.has( id ) ) {
			let definition:ObjectSchema.DigestedPropertyDefinition = generalSchema.properties.get( id );
			if( definition.uri ) id = definition.uri.stringValue;
		}

		if( notPointer && ! ! digestedSchema.vocab ) id = ObjectSchema.Util.resolveURI( id, generalSchema );

		return { "@id": id };
	}

	private expandArray( propertyValue:any, generalSchema:ObjectSchema.DigestedObjectSchema, digestedSchema:ObjectSchema.DigestedObjectSchema ):any {
		let listValues:Array<any> = [];
		for( let listValue of propertyValue ) {
			let expandedValue:any = this.expandValue( listValue, generalSchema, digestedSchema );
			if( ! expandedValue ) continue;

			listValues.push( expandedValue );
		}

		if( ! listValues.length ) return null;

		return listValues;
	}

	private expandValue( propertyValue:any, generalSchema:ObjectSchema.DigestedObjectSchema, digestedSchema:ObjectSchema.DigestedObjectSchema ):any {
		if( Utils.isArray( propertyValue ) ) {
			// TODO: Lists of lists are not currently supported by the spec
			return null;
		} else if( Pointer.Factory.is( propertyValue ) ) {
			return this.expandPointer( propertyValue, generalSchema, digestedSchema );
		} else {
			return this.expandLiteral( propertyValue );
		}
	}

	private expandLiteral( literalValue:any ):any {
		let serializedValue:string;
		let literalType:string;
		switch( true ) {
			case Utils.isFunction( literalValue ):
				return null;
			case Utils.isDate( literalValue ):
				literalType = NS.XSD.DataType.dateTime;
				break;
			case Utils.isNumber( literalValue ):
				literalType = NS.XSD.DataType.float;
				break;
			case Utils.isBoolean( literalValue ):
				literalType = NS.XSD.DataType.boolean;
				break;
			case Utils.isString( literalValue ):
				literalType = NS.XSD.DataType.string;
				break;
			default:
				// TODO: Warn of data loss
				return null;
		}

		serializedValue = this.literalSerializers.get( literalType ).serialize( literalValue );

		return { "@value": serializedValue, "@type": literalType };
	}

	private compactSingle( expandedObject:any, targetObject:any, digestedSchema:ObjectSchema.DigestedObjectSchema, pointerLibrary:Pointer.Library, strict?:boolean ):void {
		let propertyURINameMap:Map<string, string> = this.getPropertyURINameMap( digestedSchema );

		if( ! expandedObject[ "@id" ] ) throw new Errors.IllegalArgumentError( "The expandedObject doesn't have an @id defined." );
		targetObject[ "id" ] = expandedObject[ "@id" ];

		targetObject[ "types" ] = ! ! expandedObject[ "@type" ] ? expandedObject[ "@type" ] : [];

		Utils.forEachOwnProperty( expandedObject, ( propertyURI:string, value:any ):void => {
			if( propertyURI === "@id" ) return;
			if( propertyURI === "@type" ) return;

			let propertyName:string = propertyURI;
			let propertyValues:Array<any> = expandedObject[ propertyURI ];

			let definition:ObjectSchema.DigestedPropertyDefinition;
			if( propertyURINameMap.has( propertyURI ) ) {
				propertyName = propertyURINameMap.get( propertyURI );
				definition = digestedSchema.properties.get( propertyName );
			} else {
				if( strict ) return;

				if( digestedSchema.vocab !== null ) propertyName = RDF.URI.Util.getRelativeURI( propertyURI, digestedSchema.vocab );
				definition = new ObjectSchema.DigestedPropertyDefinition();
				definition.containerType = this.getPropertyContainerType( propertyValues );
			}

			targetObject[ propertyName ] = this.getPropertyValue( expandedObject, propertyURI, definition, pointerLibrary );
		} );

		return targetObject;
	}

	private getPropertyContainerType( propertyValues:any ):ObjectSchema.ContainerType {
		if( propertyValues.length === 1 ) {
			if( RDF.List.Factory.is( propertyValues[ 0 ] ) ) return ObjectSchema.ContainerType.LIST;
		} else {
			return ObjectSchema.ContainerType.SET;
		}

		return null;
	}

	private getPropertyValue( expandedObject:any, propertyURI:string, propertyDefinition:ObjectSchema.DigestedPropertyDefinition, pointerLibrary:Pointer.Library ):any {
		switch( propertyDefinition.containerType ) {
			case null:
				// Property is not a list
				if( propertyDefinition.literal ) {
					return RDF.Node.Util.getPropertyLiteral( expandedObject, propertyURI, propertyDefinition.literalType.toString() );
				} else if( propertyDefinition.literal === false ) {
					return RDF.Node.Util.getPropertyPointer( expandedObject, propertyURI, pointerLibrary );
				} else {
					return RDF.Node.Util.getProperty( expandedObject, propertyURI, pointerLibrary );
				}
			case ObjectSchema.ContainerType.LIST:
				if( propertyDefinition.literal ) {
					return RDF.Node.Util.getPropertyLiteralList( expandedObject, propertyURI, propertyDefinition.literalType.toString() );
				} else if( propertyDefinition.literal === false ) {
					return RDF.Node.Util.getPropertyPointerList( expandedObject, propertyURI, pointerLibrary );
				} else {
					return RDF.Node.Util.getPropertyList( expandedObject, propertyURI, pointerLibrary );
				}
			case ObjectSchema.ContainerType.SET:
				if( propertyDefinition.literal ) {
					return RDF.Node.Util.getPropertyLiterals( expandedObject, propertyURI, propertyDefinition.literalType.toString() );
				} else if( propertyDefinition.literal === false ) {
					return RDF.Node.Util.getPropertyPointers( expandedObject, propertyURI, pointerLibrary );
				} else {
					return RDF.Node.Util.getProperties( expandedObject, propertyURI, pointerLibrary );
				}
			case ObjectSchema.ContainerType.LANGUAGE:
				return RDF.Node.Util.getPropertyLanguageMap( expandedObject, propertyURI );
			default:
				throw new Errors.IllegalArgumentError( "The containerType specified is not supported." );
		}
	}

	private getPropertyURINameMap( digestedSchema:ObjectSchema.DigestedObjectSchema ):Map<string, string> {
		let map:Map<string, string> = new Map<string, string>();
		digestedSchema.properties.forEach( ( definition:ObjectSchema.DigestedPropertyDefinition, propertyName:string ):void => {
			let uri:string = Class.getPropertyURI( propertyName, definition, digestedSchema.vocab );
			map.set( uri, propertyName );
		} );
		return map;
	}

}

export default Class;
