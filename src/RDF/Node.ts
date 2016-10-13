import * as Utils from "./../Utils";

import * as Document from "./Document";
import * as List from "./List";
import * as Literal from "./Literal";
import * as Pointer from "./../Pointer";
import * as Value from "./Value";
import * as XSD from "./../NS/XSD";

export interface Class {
	"@id":string;
}

export class Factory {
	static is( value:Object ):boolean {
		return Utils.hasProperty( value, "@id" )
			&& Utils.isString( value[ "@id" ] );
	}

	static create( uri:string ):Class {
		return {
			"@id": uri,
		};
	}
}

export class Util {
	static areEqual( node1:Class, node2:Class ):boolean {
		return node1[ "@id" ] === node2[ "@id" ];
	}

	static hasType( node:Class, type:string ):boolean {
		return Util.getTypes( node ).indexOf( type ) !== - 1;
	}

	static getTypes( node:Class ):string[] {
		if( ! ( "@type" in node ) ) return [];
		return node[ "@type" ];
	}

	static getPropertyURI( node:Class, predicate:string ):string {
		if( ! ( predicate in node ) ) return null;
		if( ! Utils.isArray( node[ predicate ] ) ) return null;
		let uri:string = node[ predicate ].find( ( value:Value.Class ) => Factory.is( value ) );

		return typeof uri !== "undefined" ? uri[ "@id" ] : null;
	}

	static getFreeNodes<T extends Object>( value:T ):Class[] {
		if( ! Utils.isArray( value ) ) return [];

		let array:any[] = <any> value;
		return array
			.filter( ( element ) => ! Document.Factory.is( element ) )
			.filter( ( element ) => Factory.is( element ) );
	}

	static getProperty( expandedObject:any, propertyURI:string, pointerLibrary:Pointer.Library ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;
		if( ! propertyValues.length ) return null;

		let propertyValue:any = propertyValues[ 0 ];

		return Value.Util.parseValue( propertyValue, pointerLibrary );
	}

	static getPropertyPointer( expandedObject:any, propertyURI:string, pointerLibrary:Pointer.Library ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		for( let propertyValue of propertyValues ) {
			if( ! Factory.is( propertyValue ) ) continue;

			return pointerLibrary.getPointer( propertyValue[ "@id" ] );
		}

		return null;
	}

	static getPropertyLiteral( expandedObject:any, propertyURI:string, literalType:string ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		for( let propertyValue of propertyValues ) {
			if( ! Literal.Factory.is( propertyValue ) ) continue;
			if( ! Literal.Factory.hasType( propertyValue, literalType ) ) continue;

			return Literal.Factory.parse( propertyValue );
		}

		return null;
	}

	static getPropertyList( expandedObject:any, propertyURI:string, pointerLibrary:Pointer.Library ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		let propertyList:List.Class = Util.getList( propertyValues );
		if( ! propertyList ) return null;

		let listValues:Array<any> = [];
		for( let listValue of propertyList[ "@list" ] ) {
			listValues.push( Value.Util.parseValue( listValue, pointerLibrary ) );
		}

		return listValues;
	}

	static getPropertyPointerList( expandedObject:any, propertyURI:string, pointerLibrary:Pointer.Library ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		let propertyList:List.Class = Util.getList( propertyValues );
		if( ! propertyList ) return null;

		let listPointers:Array<any> = [];
		for( let listValue of propertyList[ "@list" ] ) {
			if( ! Factory.is( listValue ) ) continue;

			let pointer:Pointer.Class = pointerLibrary.getPointer( listValue[ "@id" ] );
			listPointers.push( pointer );
		}

		return listPointers;
	}

	static getPropertyLiteralList( expandedObject:any, propertyURI:string, literalType:string ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		let propertyList:List.Class = Util.getList( propertyValues );
		if( ! propertyList ) return null;

		let listLiterals:Array<any> = [];
		for( let listValue of propertyList[ "@list" ] ) {
			if( ! Literal.Factory.is( listValue ) ) continue;
			if( ! Literal.Factory.hasType( <any> listValue, literalType ) ) continue;

			listLiterals.push( Literal.Factory.parse( <any> listValue ) );
		}

		return listLiterals;
	}

	static getProperties( expandedObject:any, propertyURI:string, pointerLibrary:Pointer.Library ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;
		if( ! propertyValues.length ) return null;

		let properties:Array<any> = [];
		for( let propertyValue of propertyValues ) {
			let parsedValue:any = Value.Util.parseValue( propertyValue, pointerLibrary );
			if( parsedValue !== null ) properties.push( parsedValue );
		}

		return properties;
	}

	static getPropertyPointers( expandedObject:any, propertyURI:string, pointerLibrary:Pointer.Library ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return [];
		if( ! propertyValues.length ) return [];

		let propertyPointers:Array<any> = [];
		for( let propertyValue of propertyValues ) {
			if( ! Factory.is( propertyValue ) ) continue;

			let pointer:Pointer.Class = pointerLibrary.getPointer( propertyValue[ "@id" ] );
			if( pointer !== null )
				propertyPointers.push( pointer );
		}

		return propertyPointers;
	}

	static getPropertyURIs( expandedObject:any, propertyURI:string ):string[] {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;
		if( ! propertyValues.length ) return null;

		let propertyURIs:string[] = [];
		for( let propertyValue of propertyValues ) {
			if( ! Factory.is( propertyValue ) ) continue;

			propertyURIs.push( propertyValue[ "@id" ] );
		}

		return propertyURIs;
	}

	static getPropertyLiterals( expandedObject:any, propertyURI:string, literalType:string ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		let propertyLiterals:Array<any> = [];
		for( let propertyValue of propertyValues ) {
			if( ! Literal.Factory.is( propertyValue ) ) continue;
			if( ! Literal.Factory.hasType( propertyValue, literalType ) ) continue;

			propertyLiterals.push( Literal.Factory.parse( propertyValue ) );
		}

		return propertyLiterals;
	}

	static getPropertyLanguageMap( expandedObject:any, propertyURI:string ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		let propertyLanguageMap:any = {};
		for( let propertyValue of propertyValues ) {
			if( ! Literal.Factory.is( propertyValue ) ) continue;
			if( ! Literal.Factory.hasType( propertyValue, XSD.DataType.string ) ) continue;

			let languageTag:string = propertyValue[ "@language" ];
			if( ! languageTag ) continue;

			propertyLanguageMap[ languageTag ] = Literal.Factory.parse( propertyValue );
		}

		return propertyLanguageMap;
	}

	static getList( propertyValues:Array<any> ):List.Class {
		for( let propertyValue of propertyValues ) {
			if( ! List.Factory.is( propertyValue ) ) continue;

			return propertyValue;
		}
		return null;
	}

}

export default Class;
