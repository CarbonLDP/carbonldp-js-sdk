import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { ContainerType } from "../ObjectSchema/ContainerType";
import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { Pointer } from "../Pointer/Pointer";
import { PointerLibrary } from "../Pointer/PointerLibrary";

import { RDFList } from "../RDF/List";

import { Serializer } from "../RDF/Literal/Serializer";
import * as XSDSerializers from "../RDF/Literal/Serializers/XSD";

import { RDFNode } from "../RDF/Node";
import { URI } from "../RDF/URI";
import { RDFValue } from "../RDF/Value";

import { forEachOwnProperty, isNull, isObject, isString, MapUtils } from "../Utils";

import { XSD } from "../Vocabularies/XSD";

import { _guessXSDType } from "./Utils";


// TODO: Use Literal.Parsers to parse literals
export class JSONLDConverter {
	private readonly _literalSerializers:Map<string, Serializer>;

	get literalSerializers():Map<string, Serializer> { return this._literalSerializers; }

	private static getDefaultSerializers():Map<string, Serializer> {
		let literalSerializers:Map<string, Serializer> = new Map<string, Serializer>();

		literalSerializers.set( XSD.date, XSDSerializers.dateSerializer );
		literalSerializers.set( XSD.dateTime, XSDSerializers.dateTimeSerializer );
		literalSerializers.set( XSD.time, XSDSerializers.timeSerializer );
		literalSerializers.set( XSD.integer, XSDSerializers.integerSerializer );
		literalSerializers.set( XSD.int, XSDSerializers.integerSerializer );
		literalSerializers.set( XSD.unsignedInt, XSDSerializers.unsignedIntegerSerializer );
		literalSerializers.set( XSD.long, XSDSerializers.longSerializer );
		literalSerializers.set( XSD.unsignedLong, XSDSerializers.unsignedLongSerializer );
		literalSerializers.set( XSD.float, XSDSerializers.floatSerializer );
		literalSerializers.set( XSD.double, XSDSerializers.floatSerializer );
		literalSerializers.set( XSD.boolean, XSDSerializers.booleanSerializer );
		literalSerializers.set( XSD.string, XSDSerializers.stringSerializer );

		return literalSerializers;
	}

	constructor( literalSerializers?:Map<string, Serializer> ) {
		this._literalSerializers = literalSerializers ?
			MapUtils.extend( new Map(), literalSerializers ) :
			JSONLDConverter.getDefaultSerializers()
		;
	}

	compact( expandedObjects:Object[], targetObjects:Object[], digestedSchema:DigestedObjectSchema, pointerLibrary:PointerLibrary ):Object[];
	compact( expandedObject:Object, targetObject:Object, digestedSchema:DigestedObjectSchema, pointerLibrary:PointerLibrary, strict?:boolean ):Object;
	compact( expandedObjects:Object[], digestedSchema:DigestedObjectSchema, pointerLibrary:PointerLibrary ):Object[];
	compact( expandedObject:Object, digestedSchema:DigestedObjectSchema, pointerLibrary:PointerLibrary ):Object;
	compact( expandedObjectOrObjects:any, targetObjectOrObjectsOrDigestedContext:any, digestedSchemaOrPointerLibrary:any, pointerLibrary:PointerLibrary = null, strict?:boolean ):any {
		let targetObjectOrObjects:any = ! pointerLibrary ? null : targetObjectOrObjectsOrDigestedContext;
		let digestedSchema:any = ! pointerLibrary ? targetObjectOrObjectsOrDigestedContext : digestedSchemaOrPointerLibrary;
		pointerLibrary = ! pointerLibrary ? digestedSchemaOrPointerLibrary : pointerLibrary;

		if( ! Array.isArray( expandedObjectOrObjects ) ) return this.__compactSingle( expandedObjectOrObjects, targetObjectOrObjects, digestedSchema, pointerLibrary, strict );

		let expandedObjects:Object[] = expandedObjectOrObjects;
		let targetObjects:Object[] = ! ! targetObjectOrObjects ? targetObjectOrObjects : [];
		for( let i:number = 0, length:number = expandedObjects.length; i < length; i ++ ) {
			let expandedObject:Object = expandedObjects[ i ];
			let targetObject:Object = targetObjects[ i ] = ! ! targetObjects[ i ] ? targetObjects[ i ] : {};

			this.__compactSingle( expandedObject, targetObject, digestedSchema, pointerLibrary, strict );
		}

		return targetObjects;
	}

	expand( compactedObjects:Object[], generalSchema:DigestedObjectSchema, digestedSchema:DigestedObjectSchema ):RDFNode[];
	expand( compactedObject:Object, generalSchema:DigestedObjectSchema, digestedSchema:DigestedObjectSchema ):RDFNode;
	expand( compactedObjectOrObjects:Object[], generalSchema:DigestedObjectSchema, digestedSchema:DigestedObjectSchema ):any {
		if( ! Array.isArray( compactedObjectOrObjects ) ) return this.__expandSingle( compactedObjectOrObjects, generalSchema, digestedSchema );
	}

	private __expandSingle( compactedObject:Object, generalSchema:DigestedObjectSchema, digestedSchema:DigestedObjectSchema ):RDFNode {
		let expandedObject:any = {};

		expandedObject[ "@id" ] = ! ! compactedObject[ "$id" ] ? compactedObject[ "$id" ] : "";

		if( compactedObject[ "types" ] ) {
			const types:string[] = Array.isArray( compactedObject[ "types" ] ) ?
				compactedObject[ "types" ] : [ compactedObject[ "types" ] ];

			if( types.length )
				expandedObject[ "@type" ] = types
					.map( type => generalSchema.resolveURI( type, { vocab: true, base: true } ) );
		}

		forEachOwnProperty( compactedObject, ( propertyName:string, value:any ):void => {
			if( propertyName === "$id" ) return;
			if( propertyName === "types" ) return;

			const expandedPropertyName:string = digestedSchema.resolveURI( propertyName, { vocab: true } );
			if( URI.isRelative( expandedPropertyName ) ) return;

			const expandedValue:any[] = this.__expandProperty( propertyName, value, digestedSchema, generalSchema );
			if( expandedValue === null ) return;

			expandedObject[ expandedPropertyName ] = expandedValue;
		} );

		return expandedObject;
	}

	private __expandProperty( propertyName:string, propertyValue:any, digestedSchema:DigestedObjectSchema, generalSchema:DigestedObjectSchema ):any[] {
		const definition:DigestedObjectSchemaProperty = digestedSchema.properties.get( propertyName );

		const propertyContainer:ContainerType = definition ? definition.containerType : void 0;
		if( propertyContainer === ContainerType.LANGUAGE ) return this.__expandPropertyLanguageMap( propertyValue );

		propertyValue = Array.isArray( propertyValue ) ? propertyValue : [ propertyValue ];
		if( propertyContainer === null ) propertyValue = [ propertyValue[ 0 ] ];

		const propertyType:boolean = definition ? definition.literal : null;
		const expandedValues:any[] = propertyType === true ?
			this.__expandPropertyLiteral( propertyValue, definition, digestedSchema ) :
			propertyType === false ?
				this.__expandPropertyPointer( propertyValue, digestedSchema, generalSchema ) :
				this.__expandPropertyValue( propertyValue, digestedSchema, generalSchema )
		;

		const filteredValues:any[] = expandedValues.filter( value => value !== null );
		if( ! filteredValues.length ) return null;

		if( propertyContainer === ContainerType.LIST ) return [
			{ "@list": filteredValues },
		];

		return filteredValues;
	}

	private __expandPropertyValue( propertyValue:any[], digestedSchema:DigestedObjectSchema, generalSchema:DigestedObjectSchema ):any[] {
		return propertyValue.map( value => this.__expandValue( value, digestedSchema, generalSchema ) );
	}

	private __expandPropertyPointer( propertyValue:any[], digestedSchema:DigestedObjectSchema, generalSchema:DigestedObjectSchema ):any[] {
		return propertyValue.map( value => this.__expandPointerValue( value, digestedSchema, generalSchema ) );
	}

	private __expandPropertyLiteral( propertyValue:any[], definition:DigestedObjectSchemaProperty, digestedSchema:DigestedObjectSchema ):any[] {
		const literalType:string = digestedSchema.resolveURI( definition.literalType, { vocab: true, base: true } );
		const expandedValues:any[] = propertyValue.map( value => this.__expandLiteralValue( value, literalType ) );

		if( definition.language ) expandedValues.forEach( value => value[ "@language" ] = definition.language );

		return expandedValues;
	}

	private __expandPropertyLanguageMap( propertyValue:any ):any {
		if( ! isObject( propertyValue ) ) {
			// TODO: Warn of data loss
			return null;
		}

		let mapValues:Array<any> = [];
		forEachOwnProperty( propertyValue, ( languageTag:string, value:any ):void => {
			// TODO: Validate language tags

			let serializedValue:string = this.literalSerializers.get( XSD.string ).serialize( value );
			mapValues.push( { "@value": serializedValue, "@type": XSD.string, "@language": languageTag } );
		} );

		return mapValues;
	}

	private __expandPointerValue( propertyValue:any, digestedSchema:DigestedObjectSchema, generalSchema:DigestedObjectSchema ):RDFNode {
		const isStringID:boolean = isString( propertyValue );
		const id:string = Pointer.is( propertyValue ) ?
			propertyValue.$id :
			isStringID ?
				propertyValue :
				null;

		// TODO: Warn of data loss
		if( ! id ) return null;

		const resolved:string = generalSchema.resolveURI( id, { vocab: isStringID } );
		return { "@id": resolved };
	}

	private __expandValue( propertyValue:any, digestedSchema:DigestedObjectSchema, generalSchema:DigestedObjectSchema ):any {
		// TODO: Lists of lists are not currently supported by the spec
		if( Array.isArray( propertyValue ) ) return null;

		return Pointer.is( propertyValue ) ?
			this.__expandPointerValue( propertyValue, generalSchema, digestedSchema ) :
			this.__expandLiteralValue( propertyValue, _guessXSDType( propertyValue ) )
			;
	}

	private __expandLiteralValue( literalValue:any, literalType:string ):any {
		if( literalType === null ) return null;

		// TODO: Warn of data loss
		if( ! this.literalSerializers.has( literalType ) ) return null;

		const serializedValue:string = this.literalSerializers
			.get( literalType )
			.serialize( literalValue );
		return { "@value": serializedValue, "@type": literalType };
	}

	private __compactSingle( expandedObject:any, targetObject:any, digestedSchema:DigestedObjectSchema, pointerLibrary:PointerLibrary, strict?:boolean ):void {
		if( ! expandedObject[ "@id" ] ) throw new IllegalArgumentError( "The expandedObject doesn't have an @id defined." );

		targetObject[ "$id" ] = expandedObject[ "@id" ];
		targetObject[ "types" ] = ! ! expandedObject[ "@type" ] ? expandedObject[ "@type" ] : [];

		const propertyURINameMap:Map<string, string> = this.__getPropertyURINameMap( digestedSchema );
		forEachOwnProperty( expandedObject, ( propertyURI:string, propertyValues:any[] ):void => {
			if( propertyURI === "@id" ) return;
			if( propertyURI === "@type" ) return;

			if( ! propertyURINameMap.has( propertyURI ) && strict ) return;

			const propertyName:string = propertyURINameMap.has( propertyURI ) ?
				propertyURINameMap.get( propertyURI ) :
				digestedSchema.vocab !== null ?
					URI.getRelativeURI( propertyURI, digestedSchema.vocab ) :
					propertyURI
			;

			const targetValue:any = this.__getPropertyValue( propertyName, propertyValues, digestedSchema, pointerLibrary );
			if( targetValue === null || targetValue === void 0 ) return;

			targetObject[ propertyName ] = targetValue;
		} );

		return targetObject;
	}

	private __getPropertyContainerType( propertyValues:any ):ContainerType {
		if( propertyValues.length === 1 ) {
			if( RDFList.is( propertyValues[ 0 ] ) ) return ContainerType.LIST;
		} else {
			return ContainerType.SET;
		}

		return null;
	}

	private __getPropertyValue( propertyName:string, propertyValues:any[], digestedSchema:DigestedObjectSchema, pointerLibrary:PointerLibrary ):any {
		const definition:DigestedObjectSchemaProperty = digestedSchema.properties.get( propertyName );
		const propertyContainer:ContainerType = definition ?
			definition.containerType :
			this.__getPropertyContainerType( propertyValues );

		if( propertyContainer === ContainerType.LANGUAGE ) return RDFNode.getPropertyLanguageMap( propertyValues );

		if( propertyContainer === ContainerType.LIST ) {
			const list:RDFList = RDFNode.getList( propertyValues );

			if( ! list ) return null;
			propertyValues = list[ "@list" ];
		}

		const propertyType:boolean = definition ? definition.literal : null;
		if( propertyType === true && definition.language ) {
			propertyValues = propertyValues.filter( value => value[ "@language" ] === definition.language );
		}

		if( propertyContainer === null ) propertyValues = [ propertyValues[ 0 ] ];

		const compactedValues:any[] | undefined = propertyType === true ?
			this.__compactPropertyLiteral( propertyValues, definition, digestedSchema ) :
			propertyType === false ?
				this.__getPropertyPointers( propertyValues, pointerLibrary ) :
				this.__getProperties( propertyValues, pointerLibrary )
		;
		if( ! compactedValues ) return null;

		const filteredValues:any[] = compactedValues.filter( value => value !== null );
		if( ! filteredValues.length ) return null;

		if( propertyContainer === null ) return filteredValues[ 0 ];
		return filteredValues;
	}

	private __getPropertyURINameMap( digestedSchema:DigestedObjectSchema ):Map<string, string> {
		const map:Map<string, string> = new Map<string, string>();
		digestedSchema.properties.forEach( ( definition:DigestedObjectSchemaProperty, propertyName:string ):void => {
			const uri:string = digestedSchema.resolveURI( definition.uri, { vocab: true } );
			map.set( uri, propertyName );
		} );
		return map;
	}

	private __compactPropertyLiteral( propertyValues:any[], definition:DigestedObjectSchemaProperty, digestedSchema:DigestedObjectSchema ):any[] {
		const literalType:string = definition.literalType === null ?
			XSD.string : digestedSchema.resolveURI( definition.literalType, { vocab: true, base: true } );

		return RDFNode.getPropertyLiterals( propertyValues, literalType );
	}

	private __getProperties( propertyValues:any[], pointerLibrary:PointerLibrary ):any[] | undefined {
		if( ! Array.isArray( propertyValues ) ) return;

		return propertyValues
			.map( RDFValue.parse.bind( null, pointerLibrary ) )
			.filter( value => ! isNull( value ) )
			;
	}

	private __getPropertyPointers( propertyValues:any[], pointerLibrary:PointerLibrary ):any[] | undefined {
		if( ! Array.isArray( propertyValues ) ) return;

		return propertyValues
			.filter( RDFNode.is )
			.map( RDFNode.getID )
			.map( pointerLibrary.getPointer, pointerLibrary )
			.filter( pointer => ! isNull( pointer ) )
			;
	}

}
