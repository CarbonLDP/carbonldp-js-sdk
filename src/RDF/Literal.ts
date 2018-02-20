import * as Utils from "./../Utils";
import { XSD } from "../Vocabularies/XSD" ;
import * as Errors from "./../Errors";

import Serializer from "./Literal/Serializer";
import * as Serializers from "./Literal/Serializers";

export interface Class {
	"@type"?:string;
	"@value":string;
}

export class Factory {
	static from( value:any ):Class {
		if( Utils.isNull( value ) )
			throw new Errors.IllegalArgumentError( "Null cannot be converted into a Literal" );
		if( ! Utils.isDefined( value ) )
			throw new Errors.IllegalArgumentError( "The value is undefined" );

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

		let literal:Class = {"@value": value.toString()};
		if( type ) literal[ "@type" ] = type;

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
			if( ! literal ) return null;
			if( ! Utils.hasProperty( literal, "@value" ) ) return null;

			literalDataType = "@type" in literal ? literal[ "@type" ] : null;
			literalValue = literal[ "@value" ];
		}

		let value:any = literalValue;
		let parts:string[];
		switch( literalDataType ) {
			// Dates
			case XSD.date:
			case XSD.dateTime:
				value = new Date( literalValue );
				break;
			case XSD.time:
				parts = literalValue.match( /(\d+):(\d+):(\d+)\.(\d+)Z/ );
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
	}

	static is( value:any ):boolean {
		return Utils.hasProperty( value, "@value" )
			&& Utils.isString( value[ "@value" ] );
	}

	static hasType( value:Class, type:string ):boolean {
		if( ! value[ "@type" ] && type === XSD.string ) return true;
		return value[ "@type" ] === type;
	}
}

export default Class;

export {
	Serializer,
	Serializers
};
