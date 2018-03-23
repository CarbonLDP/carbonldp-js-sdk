import { PointerLibrary } from "../Pointer";
import { RDFList } from "./List";
import { RDFLiteral } from "./Literal";
import { RDFNode } from "./Node";
import { isString } from "../Utils";

export interface RDFValue {
	"@id"?:string;
	"@type"?:string;
	"@value"?:string;
	"@language"?:string;
}


export interface RDFValueFactory {
	parse( pointerLibrary:PointerLibrary, value:RDFLiteral | RDFNode | RDFList | RDFValue | string, ):any;
}

export const RDFValue:RDFValueFactory = {

	parse( pointerLibrary:PointerLibrary, value:RDFLiteral | RDFNode | RDFList | RDFValue | string ):any {
		if( isString( value ) ) return value;

		if( RDFLiteral.is( value ) )
			return RDFLiteral.parse( value );

		if( RDFNode.is( value ) )
			return pointerLibrary.getPointer( value[ "@id" ] );

		if( RDFList.is( value ) )
			return value[ "@list" ]
				.map( RDFValue.parse.bind( null, pointerLibrary ) );

		// TODO: What else could it be?
		return null;
	},

};
