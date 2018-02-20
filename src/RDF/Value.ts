import * as Pointer from "./../Pointer";
import * as List from "./List";
import * as Literal from "./Literal";
import * as RDFNode from "./Node";

export interface Class {
	"@id"?:string;
	"@type"?:string;
	"@value"?:string;
}

export class Util {

	static parseValue( propertyValue:Class, pointerLibrary:Pointer.Library ):any {
		if( Literal.Factory.is( propertyValue ) ) {
			return Literal.Factory.parse( <any> propertyValue );
		} else if( RDFNode.Factory.is( propertyValue ) ) {
			return pointerLibrary.getPointer( propertyValue[ "@id" ] );
		} else if( List.Factory.is( propertyValue ) ) {
			let parsedValue:Array<any> = [];
			let listValues:Array<any> = propertyValue[ "@list" ];
			for( let listValue of listValues ) {
				parsedValue.push( Util.parseValue( listValue, pointerLibrary ) );
			}
			return parsedValue;
		} else {
			// TODO: What else could it be?
		}
		return null;
	}

}

export default Class;
