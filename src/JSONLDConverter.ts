import * as Errors from "./Errors";
import * as ObjectSchema from "./ObjectSchema";
import * as NS from "./NS";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

// TODO: Use Literal.Parsers to parse literals
export class Class {
	private _literalSerializers:Map<string, RDF.Literal.Serializer>;

	get literalSerializers():Map<string, RDF.Literal.Serializer> { return this._literalSerializers; };

	private static getDefaultSerializers():Map<string, RDF.Literal.Serializer> {
		let literalSerializers:Map<string, RDF.Literal.Serializer> = new Map<string, RDF.Literal.Serializer>();

		literalSerializers.set( NS.XSD.DataType.date, RDF.Literal.Serializers.XSD.dateSerializer );
		literalSerializers.set( NS.XSD.DataType.dateTime, RDF.Literal.Serializers.XSD.dateTimeSerializer );
		literalSerializers.set( NS.XSD.DataType.time, RDF.Literal.Serializers.XSD.timeSerializer );
		literalSerializers.set( NS.XSD.DataType.integer, RDF.Literal.Serializers.XSD.integerSerializer );
		literalSerializers.set( NS.XSD.DataType.int, RDF.Literal.Serializers.XSD.integerSerializer );
		literalSerializers.set( NS.XSD.DataType.unsignedInt, RDF.Literal.Serializers.XSD.unsignedIntegerSerializer );
		literalSerializers.set( NS.XSD.DataType.long, RDF.Literal.Serializers.XSD.integerSerializer );
		literalSerializers.set( NS.XSD.DataType.unsignedLong, RDF.Literal.Serializers.XSD.unsignedIntegerSerializer );
		literalSerializers.set( NS.XSD.DataType.float, RDF.Literal.Serializers.XSD.floatSerializer );
		literalSerializers.set( NS.XSD.DataType.double, RDF.Literal.Serializers.XSD.floatSerializer );
		literalSerializers.set( NS.XSD.DataType.boolean, RDF.Literal.Serializers.XSD.booleanSerializer );
		literalSerializers.set( NS.XSD.DataType.string, RDF.Literal.Serializers.XSD.stringSerializer );

		return literalSerializers;
	}

	constructor( literalSerializers?:Map<string, RDF.Literal.Serializer> ) {
		this._literalSerializers = ! ! literalSerializers ? literalSerializers : Class.getDefaultSerializers();
	}


	compact( expandedObjects:Object[], targetObjects:Object[], digestedSchema:ObjectSchema.DigestedObjectSchema, pointerLibrary:Pointer.Library ):Object[];
	compact( expandedObject:Object, targetObject:Object, digestedSchema:ObjectSchema.DigestedObjectSchema, pointerLibrary:Pointer.Library ):Object;
	compact( expandedObjects:Object[], digestedSchema:ObjectSchema.DigestedObjectSchema, pointerLibrary:Pointer.Library ):Object[];
	compact( expandedObject:Object, digestedSchema:ObjectSchema.DigestedObjectSchema, pointerLibrary:Pointer.Library ):Object;
	compact( expandedObjectOrObjects:any, targetObjectOrObjectsOrDigestedContext:any, digestedSchemaOrPointerLibrary:any, pointerLibrary:Pointer.Library = null ):any {
		let targetObjectOrObjects:any = ! pointerLibrary ? null : targetObjectOrObjectsOrDigestedContext;
		let digestedSchema:any = ! pointerLibrary ? targetObjectOrObjectsOrDigestedContext : digestedSchemaOrPointerLibrary;
		pointerLibrary = ! pointerLibrary ? digestedSchemaOrPointerLibrary : pointerLibrary;

		if( ! Utils.isArray( expandedObjectOrObjects ) ) return this.compactSingle( expandedObjectOrObjects, targetObjectOrObjects, digestedSchema, pointerLibrary );

		let expandedObjects:Object[] = expandedObjectOrObjects;
		let targetObjects:Object[] = ! ! targetObjectOrObjects ? targetObjectOrObjects : [];
		for( let i:number = 0, length:number = expandedObjects.length; i < length; i ++ ) {
			let expandedObject:Object = expandedObjects[ i ];
			let targetObject:Object = targetObjects[ i ] = ! ! targetObjects[ i ] ? targetObjects[ i ] : {};

			this.compactSingle( expandedObject, targetObject, digestedSchema, pointerLibrary );
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
		if( ! ! compactedObject[ "types" ] ) expandedObject[ "@type" ] = compactedObject[ "types" ].map( ( type:string ) => this.resolveTypeURI( type, generalSchema, digestedSchema ) );

		Utils.forEachOwnProperty( compactedObject, ( propertyName:string, value:any ):void => {
			if( propertyName === "id" ) return;
			if( propertyName === "types" ) return;

			let expandedValue:any;
			if( digestedSchema.properties.has( propertyName ) ) {
				let definition:ObjectSchema.DigestedPropertyDefinition = digestedSchema.properties.get( propertyName );
				expandedValue = this.expandProperty( value, definition, generalSchema, digestedSchema );
				propertyName = definition.uri.toString();

			} else if( RDF.URI.Util.isAbsolute( propertyName ) ) {
				expandedValue = this.expandPropertyValues( value, generalSchema, digestedSchema );

			} else if( digestedSchema.vocab ) {
				expandedValue = this.expandPropertyValue( value, generalSchema, digestedSchema );
				propertyName = RDF.URI.Util.resolve( digestedSchema.vocab, propertyName );
			}

			if( ! expandedValue ) return;
			expandedObject[ propertyName ] = expandedValue;
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
			{"@value": serializedValue, "@type": literalType},
		];
	}

	private expandPropertyList( propertyValues:any, generalSchema:ObjectSchema.DigestedObjectSchema, digestedSchema:ObjectSchema.DigestedObjectSchema ):any {
		propertyValues = Utils.isArray( propertyValues ) ? propertyValues : [ propertyValues ];

		let expandedArray:any = this.expandArray( propertyValues, generalSchema, digestedSchema );

		if( ! expandedArray ) return null;

		return [
			{"@list": expandedArray},
		];
	}

	private expandPropertyPointerList( propertyValues:any, generalSchema:ObjectSchema.DigestedObjectSchema, digestedSchema:ObjectSchema.DigestedObjectSchema ):any {
		let listValues:Array<any> = this.expandPropertyPointers( propertyValues, generalSchema, digestedSchema );

		return [
			{"@list": listValues},
		];
	}

	private expandPropertyLiteralList( propertyValues:any, literalType:string ):any {
		let listValues:Array<any> = this.expandPropertyLiterals( propertyValues, literalType );

		return [
			{"@list": listValues},
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

			listValues.push( {"@value": serializedValue, "@type": literalType} );
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
			mapValues.push( {"@value": serializedValue, "@type": NS.XSD.DataType.string, "@language": languageTag} );
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

		id = ObjectSchema.Digester.resolvePrefixedURI( new RDF.URI.Class( id ), generalSchema ).stringValue;

		if( generalSchema.properties.has( id ) ) {
			let definition:ObjectSchema.DigestedPropertyDefinition = generalSchema.properties.get( id );
			if( definition.uri ) id = definition.uri.stringValue;
		}

		if( notPointer && ! ! digestedSchema.vocab ) id = RDF.URI.Util.resolve( digestedSchema.vocab, id );

		return {"@id": id};
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

		return {"@value": serializedValue, "@type": literalType};
	}

	private compactSingle( expandedObject:any, targetObject:any, digestedSchema:ObjectSchema.DigestedObjectSchema, pointerLibrary:Pointer.Library ):void {
		let propertyURINameMap:Map<string, string> = this.getPropertyURINameMap( digestedSchema );

		if( ! expandedObject[ "@id" ] ) throw new Errors.IllegalArgumentError( "The expandedObject doesn't have an @id defined." );
		targetObject[ "id" ] = expandedObject[ "@id" ];

		targetObject[ "types" ] = ! ! expandedObject[ "@type" ] ? expandedObject[ "@type" ] : [];

		Utils.forEachOwnProperty( expandedObject, ( propertyURI:string, value:any ):void => {
			if( propertyURI === "@id" ) return;
			if( propertyURI === "@type" ) return;

			if( propertyURINameMap.has( propertyURI ) ) {
				let propertyName:string = propertyURINameMap.get( propertyURI );
				this.assignProperty( targetObject, expandedObject, propertyName, digestedSchema, pointerLibrary );
			} else {
				let propertyName:string = digestedSchema.vocab ? RDF.URI.Util.getRelativeURI( propertyURI, digestedSchema.vocab ) : propertyURI;
				this.assignURIProperty( targetObject, expandedObject, propertyURI, propertyName, pointerLibrary );
			}
		} );

		return targetObject;
	}

	private assignProperty( compactedObject:any, expandedObject:any, propertyName:string, digestedSchema:ObjectSchema.DigestedObjectSchema, pointerLibrary:Pointer.Library ):void {
		let propertyDefinition:ObjectSchema.DigestedPropertyDefinition = digestedSchema.properties.get( propertyName );
		compactedObject[ propertyName ] = this.getPropertyValue( expandedObject, propertyDefinition, pointerLibrary );
	}

	private assignURIProperty( compactedObject:any, expandedObject:any, propertyURI:string, propertyName:string, pointerLibrary:Pointer.Library ):void {
		let guessedDefinition:ObjectSchema.DigestedPropertyDefinition = new ObjectSchema.DigestedPropertyDefinition();
		guessedDefinition.uri = new RDF.URI.Class( propertyURI );
		guessedDefinition.containerType = this.getPropertyContainerType( expandedObject[ propertyURI ] );

		compactedObject[ propertyName ] = this.getPropertyValue( expandedObject, guessedDefinition, pointerLibrary );
	}

	private getPropertyContainerType( propertyValues:any ):ObjectSchema.ContainerType {
		if( propertyValues.length === 1 ) {
			if( RDF.List.Factory.is( propertyValues[ 0 ] ) ) return ObjectSchema.ContainerType.LIST;
		} else {
			return ObjectSchema.ContainerType.SET;
		}

		return null;
	}

	private getPropertyValue( expandedObject:any, propertyDefinition:ObjectSchema.DigestedPropertyDefinition, pointerLibrary:Pointer.Library ):any {
		let propertyURI:string = propertyDefinition.uri.toString();

		switch( propertyDefinition.containerType ) {
			case null:
				// Property is not a list
				if( propertyDefinition.literal ) {
					return this.getPropertyLiteral( expandedObject, propertyURI, propertyDefinition.literalType.toString() );
				} else if( propertyDefinition.literal === false ) {
					return this.getPropertyPointer( expandedObject, propertyURI, pointerLibrary );
				} else {
					return this.getProperty( expandedObject, propertyURI, pointerLibrary );
				}
			case ObjectSchema.ContainerType.LIST:
				if( propertyDefinition.literal ) {
					return this.getPropertyLiteralList( expandedObject, propertyURI, propertyDefinition.literalType.toString() );
				} else if( propertyDefinition.literal === false ) {
					return this.getPropertyPointerList( expandedObject, propertyURI, pointerLibrary );
				} else {
					return this.getPropertyList( expandedObject, propertyURI, pointerLibrary );
				}
			case ObjectSchema.ContainerType.SET:
				if( propertyDefinition.literal ) {
					return this.getPropertyLiterals( expandedObject, propertyURI, propertyDefinition.literalType.toString() );
				} else if( propertyDefinition.literal === false ) {
					return this.getPropertyPointers( expandedObject, propertyURI, pointerLibrary );
				} else {
					return this.getProperties( expandedObject, propertyURI, pointerLibrary );
				}
			case ObjectSchema.ContainerType.LANGUAGE:
				return this.getPropertyLanguageMap( expandedObject, propertyURI );
			default:
				throw new Errors.IllegalArgumentError( "The containerType specified is not supported." );
		}
	}

	private getProperty( expandedObject:any, propertyURI:string, pointerLibrary:Pointer.Library ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;
		if( ! propertyValues.length ) return null;

		let propertyValue:any = propertyValues[ 0 ];

		return this.parseValue( propertyValue, pointerLibrary );
	}

	private getPropertyPointer( expandedObject:any, propertyURI:string, pointerLibrary:Pointer.Library ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		for( let propertyValue of propertyValues ) {
			if( ! RDF.Node.Factory.is( propertyValue ) ) continue;

			return pointerLibrary.getPointer( propertyValue[ "@id" ] );
		}

		return null;
	}

	private getPropertyLiteral( expandedObject:any, propertyURI:string, literalType:string ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		for( let propertyValue of propertyValues ) {
			if( ! RDF.Literal.Factory.is( propertyValue ) ) continue;
			if( ! RDF.Literal.Factory.hasType( propertyValue, literalType ) ) continue;

			return RDF.Literal.Factory.parse( propertyValue );
		}

		return null;
	}

	private getPropertyList( expandedObject:any, propertyURI:string, pointerLibrary:Pointer.Library ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		let propertyList:RDF.List.Class = this.getList( propertyValues );
		if( ! propertyList ) return null;

		let listValues:Array<any> = [];
		for( let listValue of propertyList[ "@list" ] ) {
			listValues.push( this.parseValue( listValue, pointerLibrary ) );
		}

		return listValues;
	}

	private getPropertyPointerList( expandedObject:any, propertyURI:string, pointerLibrary:Pointer.Library ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		let propertyList:RDF.List.Class = this.getList( propertyValues );
		if( ! propertyList ) return null;

		let listPointers:Array<any> = [];
		for( let listValue of propertyList[ "@list" ] ) {
			if( ! RDF.Node.Factory.is( listValue ) ) continue;

			let pointer:Pointer.Class = pointerLibrary.getPointer( listValue[ "@id" ] );
			listPointers.push( pointer );
		}

		return listPointers;
	}

	private getPropertyLiteralList( expandedObject:any, propertyURI:string, literalType:string ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		let propertyList:RDF.List.Class = this.getList( propertyValues );
		if( ! propertyList ) return null;

		let listLiterals:Array<any> = [];
		for( let listValue of propertyList[ "@list" ] ) {
			if( ! RDF.Literal.Factory.is( listValue ) ) continue;
			if( ! RDF.Literal.Factory.hasType( <any> listValue, literalType ) ) continue;

			listLiterals.push( RDF.Literal.Factory.parse( <any> listValue ) );
		}

		return listLiterals;
	}

	private getProperties( expandedObject:any, propertyURI:string, pointerLibrary:Pointer.Library ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;
		if( ! propertyValues.length ) return null;

		let properties:Array<any> = [];
		for( let propertyValue of propertyValues ) {
			properties.push( this.parseValue( propertyValue, pointerLibrary ) );
		}

		return properties;
	}

	private getPropertyPointers( expandedObject:any, propertyURI:string, pointerLibrary:Pointer.Library ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;
		if( ! propertyValues.length ) return null;

		let propertyPointers:Array<any> = [];
		for( let propertyValue of propertyValues ) {
			if( ! RDF.Node.Factory.is( propertyValue ) ) continue;

			let pointer:Pointer.Class = pointerLibrary.getPointer( propertyValue[ "@id" ] );
			propertyPointers.push( pointer );
		}

		return propertyPointers;
	}

	private getPropertyLiterals( expandedObject:any, propertyURI:string, literalType:string ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		let propertyLiterals:Array<any> = [];
		for( let propertyValue of propertyValues ) {
			if( ! RDF.Literal.Factory.is( propertyValue ) ) continue;
			if( ! RDF.Literal.Factory.hasType( propertyValue, literalType ) ) continue;

			propertyLiterals.push( RDF.Literal.Factory.parse( propertyValue ) );
		}

		return propertyLiterals;
	}

	private getPropertyLanguageMap( expandedObject:any, propertyURI:string ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		let propertyLanguageMap:any = {};
		for( let propertyValue of propertyValues ) {
			if( ! RDF.Literal.Factory.is( propertyValue ) ) continue;
			if( ! RDF.Literal.Factory.hasType( propertyValue, NS.XSD.DataType.string ) ) continue;

			let languageTag:string = propertyValue[ "@language" ];
			if( ! languageTag ) continue;

			propertyLanguageMap[ languageTag ] = RDF.Literal.Factory.parse( propertyValue );
		}

		return propertyLanguageMap;
	}

	private getList( propertyValues:Array<any> ):RDF.List.Class {
		for( let propertyValue of propertyValues ) {
			if( ! RDF.List.Factory.is( propertyValue ) ) continue;

			return propertyValue;
		}
		return null;
	}

	private getPropertyURINameMap( digestedSchema:ObjectSchema.DigestedObjectSchema ):Map<string, string> {
		let map:Map<string, string> = new Map<string, string>();
		digestedSchema.properties.forEach( ( definition:ObjectSchema.DigestedPropertyDefinition, propertyName:string ):void => {
			map.set( definition.uri.toString(), propertyName );
		} );
		return map;
	}

	private parseValue( propertyValue:RDF.Value.Class, pointerLibrary:Pointer.Library ):any {
		if( RDF.Literal.Factory.is( propertyValue ) ) {
			return RDF.Literal.Factory.parse( <any> propertyValue );
		} else if( RDF.Node.Factory.is( propertyValue ) ) {
			return pointerLibrary.getPointer( propertyValue[ "@id" ] );
		} else if( RDF.List.Factory.is( propertyValue ) ) {
			let parsedValue:Array<any> = [];
			let listValues:Array<any> = propertyValue[ "@list" ];
			for( let listValue of listValues ) {
				parsedValue.push( this.parseValue( listValue, pointerLibrary ) );
			}
			return parsedValue;
		} else {
			// TODO: What else could it be?
		}
	}

	private resolveTypeURI( uri:string, generalSchema:ObjectSchema.DigestedObjectSchema, digestedSchema:ObjectSchema.DigestedObjectSchema ):string {
		if( RDF.URI.Util.isAbsolute( uri ) ) return uri;

		uri = ObjectSchema.Digester.resolvePrefixedURI( new RDF.URI.Class( uri ), generalSchema ).stringValue;
		if( digestedSchema.vocab ) uri = RDF.URI.Util.resolve( digestedSchema.vocab, uri );

		return uri;
	}
}

export default Class;
