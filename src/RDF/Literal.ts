import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import * as Utils from "../Utils";

import { XSD } from "../Vocabularies/XSD";

import * as Serializers from "./Literal/Serializers";


export * from "./Literal/Serializer";
export { Serializers };


/**
 * Interface that represents an RDF Literal Value.
 */
export interface RDFLiteral {
	/**
	 * The URI of the XSD type of the literal.
	 */
	"@type"?:string;
	/**
	 * The actual string value if the literal.
	 */
	"@value":string;
	/**
	 * The specific language of the string value.
	 */
	"@language"?:string;
}


/**
 * Factory and utils for {@link RDFLiteral}.
 */
export interface RDFLiteralFactory {
	/**
	 * Convert the value provided to a {@link RDFLiteral} object.
	 * @param value
	 */
	from( value:any ):RDFLiteral;


	/**
	 * Parses the value string into the respective type specified.
	 * If no type provided, the same string will be returned.
	 * @param value
	 * @param type
	 */
	parse( value:string, type?:string ):any;
	/**
	 * Parses the {@link RDFLiteral} object to the respective JavaScript type.
	 * Returns `null` if the Literal can't be parsed.
	 * @param literal
	 */
	parse( literal:RDFLiteral ):any;


	/**
	 * Returns true if the object provided is considered a {@link RDFLiteral} object.
	 * @param value
	 */
	is( value:any ):value is RDFLiteral;


	/**
	 * Returns true if the {@link RDFLiteral} has the type specified.
	 * @param value
	 * @param type
	 */
	hasType( value:RDFLiteral, type:string ):boolean;
}

/**
 * Constant that implements {@link RDFLiteralFactory}.
 */
export const RDFLiteral:RDFLiteralFactory = {
	from( value:any ):RDFLiteral {
		if( Utils.isNull( value ) )
			throw new IllegalArgumentError( "Null cannot be converted into a Literal" );
		if( ! Utils.isDefined( value ) )
			throw new IllegalArgumentError( "The value is undefined" );

		let type:any;

		switch( true ) {
			case Utils.isDate( value ):
				type = XSD.dateTime;
				value = value.toISOString();
				break;
			case Utils.isNumber( value ):
				if( Utils.isInteger( value ) ) {
					type = XSD.integer;
				} else {
					type = XSD.double;
				}
				break;
			case Utils.isString( value ):
				type = XSD.string;
				break;
			case Utils.isBoolean( value ):
				type = XSD.boolean;
				break;
			default:
				// Treat it as an unknown object
				type = XSD.object;
				value = JSON.stringify( value );
				break;
		}

		let literal:RDFLiteral = { "@value": value.toString() };
		if( type ) literal[ "@type" ] = type;

		return literal;
	},

	parse( valueOrLiteral:string | RDFLiteral, type?:string | null ):any | null {
		let literalValue:string;
		if( Utils.isString( valueOrLiteral ) ) {
			literalValue = valueOrLiteral;
		} else {
			let literal:RDFLiteral = valueOrLiteral;
			if( ! literal ) return null;
			if( ! Utils.hasProperty( literal, "@value" ) ) return null;

			type = "@type" in literal ? literal[ "@type" ] : null;
			literalValue = literal[ "@value" ];
		}

		let value:any = literalValue;
		switch( type ) {
			// Dates
			case XSD.date:
			case XSD.dateTime:
				value = new Date( literalValue );
				break;
			case XSD.time:
				const parts:string[] | null = literalValue.match( /(\d+):(\d+):(\d+)\.(\d+)Z/ );
				if( ! parts ) throw new IllegalArgumentError( `Invalid value for type ${XSD.time}.` );
				value = new Date();
				value.setUTCHours( parseFloat( parts[ 1 ] ), parseFloat( parts[ 2 ] ), parseFloat( parts[ 3 ] ), parseFloat( parts[ 4 ] ) );
				break;
			case XSD.duration:
				// TODO: Support duration values (create a class or something...)
				break;
			case XSD.gDay:
			case XSD.gMonth:
			case XSD.gMonthDay:
			case XSD.gYear:
			case XSD.gYearMonth:
				// TODO: Decide. Should we return it as a Date?
				break;

			// Numbers
			case XSD.byte :
			case XSD.decimal :
			case XSD.int :
			case XSD.integer :
			case XSD.long :
			case XSD.negativeInteger :
			case XSD.nonNegativeInteger :
			case XSD.nonPositiveInteger :
			case XSD.positiveInteger :
			case XSD.short :
			case XSD.unsignedLong :
			case XSD.unsignedInt :
			case XSD.unsignedShort :
			case XSD.unsignedByte :
			case XSD.double :
			case XSD.float :
				value = parseFloat( literalValue );
				break;

			// Misc
			case XSD.boolean :
				value = Utils.parseBoolean( literalValue );
				break;
			case XSD.string:
				value = literalValue;
				break;
			case XSD.object:
				value = JSON.parse( literalValue );
				break;
			default:
				break;
		}

		return value;
	},

	is( value:any ):value is RDFLiteral {
		return Utils.hasProperty( value, "@value" )
			&& Utils.isString( value[ "@value" ] );
	},

	hasType( value:RDFLiteral, type:string ):boolean {
		if( ! value[ "@type" ] && type === XSD.string ) return true;
		return value[ "@type" ] === type;
	},
};
