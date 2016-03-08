import * as Utils from "./../Utils";
import * as XSD from "./../NS/XSD" ;

import Serializer from "./Literal/Serializer";
import * as Serializers from "./Literal/Serializers";

export interface Class {
	"@type"?:string;
	"@value":string;
}

export class Factory {
	static from( value:any ):Class {
		if ( Utils.isNull( value ) ) throw new Error( "IllegalArgument: null cannot be converted into a Literal" );

		let type:any;

		switch ( true ) {
			case Utils.isDate( value ):
				type = XSD.DataType.dateTime;
				value = value.toISOString();
				break;
			case Utils.isNumber( value ):
				if ( Utils.isInteger( value ) ) {
					type = XSD.DataType.integer;
				} else type = XSD.DataType.double;
				break;
			case Utils.isString( value ):
				type = XSD.DataType.string;
				break;
			case Utils.isBoolean( value ):
				type = XSD.DataType.boolean;
				break;
			default:
				// Treat it as an unknown object
				type = XSD.DataType.object;
				value = JSON.stringify( value );
				break;
		}

		let literal:Class = {"@value": value};
		if ( type ) literal[ "@type" ] = type;

		return literal;
	}

	static parse( literalValue:string, literalDataType?:string ):any;
	static parse( literal:Class ):any;
	static parse( literalValueOrLiteral:any, literalDataType:string = null ):any {
		let literalValue:string;
		if( Utils.isString( literalValueOrLiteral ) ) {
			literalValue = literalValueOrLiteral;
		} else {
			let literal:Class = literalValueOrLiteral;
			if ( ! literal ) return null;
			if ( ! Utils.hasProperty( literal, "@value" ) ) return null;

			literalDataType = "@type" in literal ? literal[ "@type" ] : null;
			literalValue = literal[ "@value" ];
		}

		if ( literalDataType === null ) return literalValue;
		// The DataType isn't supported
		if ( ! Utils.hasProperty( XSD.DataType, literalDataType ) ) return literalValue;

		let value:any;
		switch ( literalDataType ) {
			// Dates
			case XSD.DataType.date:
			case XSD.DataType.dateTime:
			case XSD.DataType.time:
				value = new Date( literalValue );
				break;
			case XSD.DataType.duration:
				// TODO: Support duration values (create a class or something...)
				break;
			case XSD.DataType.gDay:
			case XSD.DataType.gMonth:
			case XSD.DataType.gMonthDay:
			case XSD.DataType.gYear:
			case XSD.DataType.gYearMonth:
				// TODO: Decide. Should we return it as a Date?
				break;

			// Numbers
			case XSD.DataType.byte :
			case XSD.DataType.decimal :
			case XSD.DataType.int :
			case XSD.DataType.integer :
			case XSD.DataType.long :
			case XSD.DataType.negativeInteger :
			case XSD.DataType.nonNegativeInteger :
			case XSD.DataType.nonPositiveInteger :
			case XSD.DataType.positiveInteger :
			case XSD.DataType.short :
			case XSD.DataType.unsignedLong :
			case XSD.DataType.unsignedInt :
			case XSD.DataType.unsignedShort :
			case XSD.DataType.unsignedByte :
			case XSD.DataType.double :
			case XSD.DataType.float :
				value = parseFloat( literalValue );
				break;

			// Misc
			case XSD.DataType.boolean :
				value = Utils.parseBoolean( literalValue );
				break;
			case XSD.DataType.string:
				value = literalValue;
				break;
			case XSD.DataType.object:
				value = JSON.parse( literalValue );
				break;
			default:
				break;
		}

		return value;
	}

	static is( value:any ):boolean {
		if ( ! value ) return false;
		if ( ! Utils.isObject( value ) ) return false;
		return Utils.hasProperty( value, "@value" );
	}

	static hasType( value:Class, type:string ):boolean {
		if( ! value[ "@type" ] && type === <any> XSD.DataType.string ) return true;
		return value[ "@type" ] === type;
	}
}

export class Util {
	static areEqual( literal1:Class, literal2:Class ):boolean {
		// TODO: Implement
		return false;
	}
}

export default Class;

export {
	Serializer,
	Serializers
};
