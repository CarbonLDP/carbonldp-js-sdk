import * as List from "./List";
import * as Literal from "./Literal";
import * as NS from "./../NS";
import * as Pointer from "./../Pointer";
import * as RDFNode from "./RDFNode";

export interface Class {
	"@id"?:string;
	"@type"?:string;
	"@value"?:string;
}

// TODO: Move all getters and setters to RDFNode.Util
export class Util {
	static areEqual( value1:Class, value2:Class ):boolean {
		if ( Literal.Factory.is( value1 ) && Literal.Factory.is( value2 ) ) {
			return Literal.Util.areEqual( <Literal.Class> value1, <Literal.Class> value2 );
		} else if ( RDFNode.Factory.is( value1 ) && RDFNode.Factory.is( value2 ) ) {
			return RDFNode.Util.areEqual( <RDFNode.Class> value1, <RDFNode.Class> value2 );
		} else return false;
	}

	static getProperty( expandedObject:any, propertyURI:string, pointerLibrary:Pointer.Library ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;
		if( ! propertyValues.length ) return null;

		let propertyValue:any = propertyValues[ 0 ];

		return Util.parseValue( propertyValue, pointerLibrary );
	}

	static getPropertyPointer( expandedObject:any, propertyURI:string, pointerLibrary:Pointer.Library ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		for( let propertyValue of propertyValues ) {
			if( ! RDFNode.Factory.is( propertyValue ) ) continue;

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
			listValues.push( Util.parseValue( listValue, pointerLibrary ) );
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
			if( ! RDFNode.Factory.is( listValue ) ) continue;

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
			let parsedValue:any = Util.parseValue( propertyValue, pointerLibrary );
			if ( parsedValue !== null )
				properties.push( parsedValue );
		}

		return properties;
	}

	static getPropertyPointers( expandedObject:any, propertyURI:string, pointerLibrary:Pointer.Library ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return [];
		if( ! propertyValues.length ) return [];

		let propertyPointers:Array<any> = [];
		for( let propertyValue of propertyValues ) {
			if( ! RDFNode.Factory.is( propertyValue ) ) continue;

			let pointer:Pointer.Class = pointerLibrary.getPointer( propertyValue[ "@id" ] );
			if ( pointer !== null )
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
			if( ! RDFNode.Factory.is( propertyValue ) ) continue;

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
			if( ! Literal.Factory.hasType( propertyValue, NS.XSD.DataType.string ) ) continue;

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

	static parseValue( propertyValue:Class, pointerLibrary:Pointer.Library ):any {
		if( Literal.Factory.is( propertyValue ) ) {
			return Literal.Factory.parse( <any> propertyValue );
		} else if( RDFNode.Factory.is( propertyValue ) ) {
			return pointerLibrary.getPointer( propertyValue[ "@id" ] );
		} else if( List.Factory.is( propertyValue ) ) {
			let parsedValue:Array<any> = [];
			let listValues:Array<any> = propertyValue[ "@list" ];
			for( let listValue of listValues ) {
				parsedValue.push( this.parseValue( listValue, pointerLibrary ) );
			}
			return parsedValue;
		} else {
			// TODO: What else could it be?
		}
		return null;
	}
}

export default Class;
