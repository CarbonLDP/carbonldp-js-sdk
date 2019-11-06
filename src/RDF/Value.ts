import { $PointerLibrary, _getPointer, PointerLibrary } from "../Pointer/PointerLibrary";

import { isString } from "../Utils";

import { RDFList } from "./List";
import { RDFLiteral } from "./Literal";
import { RDFNode } from "./Node";


/**
 * Interface that represents an RDF Value.
 */
export interface RDFValue {
	/**
	 * The URI of the current value.
	 */
	"@id"?:string;
	/**
	 * The URI if the XSD type of the possible value.
	 */
	"@type"?:string;
	/**
	 * The possible string value if the current object value.
	 */
	"@value"?:string;
	/**
	 * The specific language of the string value.
	 */
	"@language"?:string;
}


/**
 * Factory and utils for {@link RDFValue}.
 */
export interface RDFValueFactory {
	/**
	 * Returns the parsed object from an Literal, Node, or List.
	 * Returns `null` if it cannot be parsed.
	 * @param pointerLibrary Library from where to obtains pointers when RDFNode provided.
	 * @param value The RDF value to parse.
	 */
	parse( pointerLibrary:PointerLibrary | $PointerLibrary, value:RDFLiteral | RDFNode | RDFList | RDFValue | string, ):any;
}

/**
 * Constant with the factory, decorator and/or utils for a {@link RDFValue} object.
 */
export const RDFValue:{
	/**
	 * Returns the parsed object from an Literal, Node, or List.
	 * Returns `null` if it cannot be parsed.
	 * @param pointerLibrary Library from where to obtains pointers when RDFNode provided.
	 * @param value The RDF value to parse.
	 */
	parse( pointerLibrary:PointerLibrary | $PointerLibrary, value:RDFLiteral | RDFNode | RDFList | RDFValue | string, ):any;
} = <RDFValueFactory> {

	parse( pointerLibrary:PointerLibrary | $PointerLibrary, value:RDFLiteral | RDFNode | RDFList | RDFValue | string ):any {
		if( isString( value ) ) return value;

		if( RDFLiteral.is( value ) )
			return RDFLiteral.parse( value );

		if( RDFNode.is( value ) )
			return _getPointer( pointerLibrary, value[ "@id" ] );

		if( RDFList.is( value ) )
			return value[ "@list" ]
				.map( RDFValue.parse.bind( null, pointerLibrary ) );

		// TODO: What else could it be?
		return null;
	},

};
