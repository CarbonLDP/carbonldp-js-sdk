import { XSD } from "../Vocabularies/XSD";
import * as Errors from "./../Errors";
import * as ObjectSchema from "./../ObjectSchema";
import {
	Pointer,
	PointerLibrary
} from "./../Pointer";
import * as RDF from "./../RDF";
import * as Utils from "./../Utils";
import { guessXSDType } from "./Utils";

// TODO: Use Literal.Parsers to parse literals
export class Class {
	private _literalSerializers:Map<string, RDF.Literal.Serializer>;

	get literalSerializers():Map<string, RDF.Literal.Serializer> { return this._literalSerializers; }

	private static getDefaultSerializers():Map<string, RDF.Literal.Serializer> {
		let literalSerializers:Map<string, RDF.Literal.Serializer> = new Map<string, RDF.Literal.Serializer>();

		literalSerializers.set( XSD.date, RDF.Literal.Serializers.XSD.dateSerializer );
		literalSerializers.set( XSD.dateTime, RDF.Literal.Serializers.XSD.dateTimeSerializer );
		literalSerializers.set( XSD.time, RDF.Literal.Serializers.XSD.timeSerializer );
		literalSerializers.set( XSD.integer, RDF.Literal.Serializers.XSD.integerSerializer );
		literalSerializers.set( XSD.int, RDF.Literal.Serializers.XSD.integerSerializer );
		literalSerializers.set( XSD.unsignedInt, RDF.Literal.Serializers.XSD.unsignedIntegerSerializer );
		literalSerializers.set( XSD.long, RDF.Literal.Serializers.XSD.longSerializer );
		literalSerializers.set( XSD.unsignedLong, RDF.Literal.Serializers.XSD.unsignedLongSerializer );
		literalSerializers.set( XSD.float, RDF.Literal.Serializers.XSD.floatSerializer );
		literalSerializers.set( XSD.double, RDF.Literal.Serializers.XSD.floatSerializer );
		literalSerializers.set( XSD.boolean, RDF.Literal.Serializers.XSD.booleanSerializer );
		literalSerializers.set( XSD.string, RDF.Literal.Serializers.XSD.stringSerializer );

		return literalSerializers;
	}

	constructor( literalSerializers?:Map<string, RDF.Literal.Serializer> ) {
		this._literalSerializers = ! ! literalSerializers ? literalSerializers : Class.getDefaultSerializers();
	}

	compact( expandedObjects:Object[], targetObjects:Object[], digestedSchema:ObjectSchema.DigestedObjectSchema, pointerLibrary:PointerLibrary ):Object[];
	compact( expandedObject:Object, targetObject:Object, digestedSchema:ObjectSchema.DigestedObjectSchema, pointerLibrary:PointerLibrary, strict?:boolean ):Object;
	compact( expandedObjects:Object[], digestedSchema:ObjectSchema.DigestedObjectSchema, pointerLibrary:PointerLibrary ):Object[];
	compact( expandedObject:Object, digestedSchema:ObjectSchema.DigestedObjectSchema, pointerLibrary:PointerLibrary ):Object;
	compact( expandedObjectOrObjects:any, targetObjectOrObjectsOrDigestedContext:any, digestedSchemaOrPointerLibrary:any, pointerLibrary:PointerLibrary = null, strict?:boolean ):any {
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
		if( ! ! compactedObject[ "types" ] ) expandedObject[ "@type" ] = compactedObject[ "types" ].map( ( type:string ) => ObjectSchema.Util.resolveURI( type, generalSchema, { vocab: true, base: true } ) );

		Utils.forEachOwnProperty( compactedObject, ( propertyName:string, value:any ):void => {
			if( propertyName === "id" ) return;
			if( propertyName === "types" ) return;

			const expandedPropertyName:string = ObjectSchema.Util.resolveURI( propertyName, digestedSchema, { vocab: true } );
			if( RDF.URI.Util.isRelative( expandedPropertyName ) ) return;

			const expandedValue:any[] = this.expandProperty( propertyName, value, digestedSchema, generalSchema );
			if( expandedPropertyName === null ) return;

			expandedObject[ expandedPropertyName ] = expandedValue;
		} );

		return expandedObject;
	}

	private expandProperty( propertyName:string, propertyValue:any, digestedSchema:ObjectSchema.DigestedObjectSchema, generalSchema:ObjectSchema.DigestedObjectSchema ):any[] {
		const definition:ObjectSchema.DigestedPropertyDefinition = digestedSchema.properties.get( propertyName );

		const propertyContainer:ObjectSchema.ContainerType = definition ? definition.containerType : void 0;
		if( propertyContainer === ObjectSchema.ContainerType.LANGUAGE ) return this.expandPropertyLanguageMap( propertyValue );

		propertyValue = Array.isArray( propertyValue ) ? propertyValue : [ propertyValue ];
		if( propertyContainer === null ) propertyValue = [ propertyValue[ 0 ] ];

		const propertyType:boolean = definition ? definition.literal : null;
		const expandedValues:any[] = propertyType === true ?
			this.expandPropertyLiteral( propertyValue, definition, digestedSchema ) :
			propertyType === false ?
				this.expandPropertyPointer( propertyValue, digestedSchema, generalSchema ) :
				this.expandPropertyValue( propertyValue, digestedSchema, generalSchema )
		;

		const filteredValues:any[] = expandedValues.filter( value => value !== null );
		if( ! filteredValues.length ) return null;

		if( propertyContainer === ObjectSchema.ContainerType.LIST ) return [
			{ "@list": filteredValues },
		];

		return filteredValues;
	}

	private expandPropertyValue( propertyValue:any[], digestedSchema:ObjectSchema.DigestedObjectSchema, generalSchema:ObjectSchema.DigestedObjectSchema ):any[] {
		return propertyValue.map( value => this.expandValue( value, digestedSchema, generalSchema ) );
	}

	private expandPropertyPointer( propertyValue:any[], digestedSchema:ObjectSchema.DigestedObjectSchema, generalSchema:ObjectSchema.DigestedObjectSchema ):any[] {
		return propertyValue.map( value => this.expandPointerValue( value, digestedSchema, generalSchema ) );
	}

	private expandPropertyLiteral( propertyValue:any[], definition:ObjectSchema.DigestedPropertyDefinition, digestedSchema:ObjectSchema.DigestedObjectSchema ):any[] {
		const literalType:string = ObjectSchema.Util.resolveURI( definition.literalType, digestedSchema, { vocab: true, base: true } );
		const expandedValues:any[] = propertyValue.map( value => this.expandLiteralValue( value, literalType ) );

		if( ! definition.language ) expandedValues.forEach( value => value[ "@language" ] = definition.language );

		return expandedValues;
	}

	private expandPropertyLanguageMap( propertyValue:any ):any {
		if( ! Utils.isObject( propertyValue ) ) {
			// TODO: Warn of data loss
			return null;
		}

		let mapValues:Array<any> = [];
		Utils.forEachOwnProperty( propertyValue, ( languageTag:string, value:any ):void => {
			// TODO: Validate language tags

			let serializedValue:string = this.literalSerializers.get( XSD.string ).serialize( value );
			mapValues.push( { "@value": serializedValue, "@type": XSD.string, "@language": languageTag } );
		} );

		return mapValues;
	}

	private expandPointerValue( propertyValue:any, digestedSchema:ObjectSchema.DigestedObjectSchema, generalSchema:ObjectSchema.DigestedObjectSchema ):RDF.Node.Class {
		const isString:boolean = Utils.isString( propertyValue );
		const id:string = Pointer.is( propertyValue ) ?
			propertyValue.id :
			isString ?
				propertyValue :
				null;

		// TODO: Warn of data loss
		if( ! id ) return null;

		const resolved:string = ObjectSchema.Util.resolveURI( id, generalSchema, { vocab: isString, base: true } );
		return { "@id": resolved };
	}

	private expandValue( propertyValue:any, digestedSchema:ObjectSchema.DigestedObjectSchema, generalSchema:ObjectSchema.DigestedObjectSchema ):any {
		// TODO: Lists of lists are not currently supported by the spec
		if( Utils.isArray( propertyValue ) ) return null;

		return Pointer.is( propertyValue ) ?
			this.expandPointerValue( propertyValue, generalSchema, digestedSchema ) :
			this.expandLiteralValue( propertyValue, guessXSDType( propertyValue ) )
			;
	}

	private expandLiteralValue( literalValue:any, literalType:string ):any {
		if( literalType === null ) return null;

		// TODO: Warn of data loss
		if( ! this.literalSerializers.has( literalType ) ) return null;

		const serializedValue:string = this.literalSerializers
			.get( literalType )
			.serialize( literalValue );
		return { "@value": serializedValue, "@type": literalType };
	}

	private compactSingle( expandedObject:any, targetObject:any, digestedSchema:ObjectSchema.DigestedObjectSchema, pointerLibrary:PointerLibrary, strict?:boolean ):void {
		if( ! expandedObject[ "@id" ] ) throw new Errors.IllegalArgumentError( "The expandedObject doesn't have an @id defined." );

		targetObject[ "id" ] = expandedObject[ "@id" ];
		targetObject[ "types" ] = ! ! expandedObject[ "@type" ] ? expandedObject[ "@type" ] : [];

		const propertyURINameMap:Map<string, string> = this.getPropertyURINameMap( digestedSchema );
		Utils.forEachOwnProperty( expandedObject, ( propertyURI:string, propertyValues:any[] ):void => {
			if( propertyURI === "@id" ) return;
			if( propertyURI === "@type" ) return;

			if( ! propertyURINameMap.has( propertyURI ) && strict ) return;

			const propertyName:string = propertyURINameMap.has( propertyURI ) ?
				propertyURINameMap.get( propertyURI ) :
				digestedSchema.vocab !== null ?
					RDF.URI.Util.getRelativeURI( propertyURI, digestedSchema.vocab ) :
					propertyURI
			;

			const targetValue:any = this.getPropertyValue( propertyName, propertyValues, digestedSchema, pointerLibrary );
			if( targetValue === null ) return;

			targetObject[ propertyName ] = targetValue;
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

	private getPropertyValue( propertyName:string, propertyValues:any[], digestedSchema:ObjectSchema.DigestedObjectSchema, pointerLibrary:PointerLibrary ):any {
		const definition:ObjectSchema.DigestedPropertyDefinition = digestedSchema.properties.get( propertyName );
		const propertyContainer:ObjectSchema.ContainerType = definition ?
			definition.containerType :
			this.getPropertyContainerType( propertyValues );

		if( propertyContainer === ObjectSchema.ContainerType.LANGUAGE ) return RDF.Node.Util.getPropertyLanguageMap( propertyValues );

		if( propertyContainer === ObjectSchema.ContainerType.LIST ) {
			const list:RDF.List.Class = RDF.Node.Util.getList( propertyValues );

			if( ! propertyValues ) return null;
			propertyValues = list[ "@list" ];
		}

		const propertyType:boolean = definition ? definition.literal : null;
		if( propertyType === true && definition.language ) {
			propertyValues = propertyValues.filter( value => value[ "@language" ] === definition.language );
		}

		if( propertyContainer === null ) propertyValues = [ propertyValues[ 0 ] ];

		const compactedValues:any[] = propertyType === true ?
			this.compactPropertyLiteral( propertyValues, definition, digestedSchema ) :
			propertyType === false ?
				RDF.Node.Util.getPropertyPointers( propertyValues, pointerLibrary ) :
				RDF.Node.Util.getProperties( propertyValues, pointerLibrary )
		;

		const filteredValues:any[] = compactedValues.filter( value => value !== null );
		if( ! filteredValues.length ) return null;

		if( propertyContainer === null ) return filteredValues[ 0 ];
		return filteredValues;
	}

	private getPropertyURINameMap( digestedSchema:ObjectSchema.DigestedObjectSchema ):Map<string, string> {
		const map:Map<string, string> = new Map<string, string>();
		digestedSchema.properties.forEach( ( definition:ObjectSchema.DigestedPropertyDefinition, propertyName:string ):void => {
			const uri:string = ObjectSchema.Util.resolveURI( definition.uri, digestedSchema, { vocab: true } );
			map.set( uri, propertyName );
		} );
		return map;
	}

	private compactPropertyLiteral( propertyValues:any[], definition:ObjectSchema.DigestedPropertyDefinition, digestedSchema:ObjectSchema.DigestedObjectSchema ):any[] {
		const literalType:string = definition.literalType === null ?
			XSD.string : ObjectSchema.Util.resolveURI( definition.literalType, digestedSchema, { vocab: true, base: true } );

		return RDF.Node.Util.getPropertyLiterals( propertyValues, literalType );
	}

}

export default Class;
