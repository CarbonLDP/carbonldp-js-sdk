import * as Errors from "./../../../Errors";
import * as Utils from "./../../../Utils";

import Serializer from "./../Serializer";

function pad( value:number ):string {
	let paddedValue:string = String( value );
	if( paddedValue.length === 1 ) paddedValue = "0" + paddedValue;
	return paddedValue;
}

export class DateSerializer implements Serializer {
	serialize( value:any ):string {
		if( ! Utils.isDate( value ) ) throw new Errors.IllegalArgumentError( "The value is not a Date object." );

		return value.getUTCFullYear() + "-" + pad( (value.getUTCMonth() + 1) ) + "-" + pad( value.getUTCDate() );
	}
}

export let dateSerializer:DateSerializer = new DateSerializer();

export class DateTimeSerializer implements Serializer {
	serialize( value:any ):string {
		if( ! Utils.isDate( value ) ) throw new Errors.IllegalArgumentError( "The value is not a Date object." );

		return value.toISOString();
	}
}

export let dateTimeSerializer:DateTimeSerializer = new DateTimeSerializer();

export class TimeSerializer implements Serializer {
	serialize( value:any ):string {
		if( ! Utils.isDate( value ) ) throw new Errors.IllegalArgumentError( "The value is not a Date object." );

		return pad( value.getUTCHours() )
			+ ":" + pad( value.getUTCMinutes() )
			+ ":" + pad( value.getUTCSeconds() )
			+ "." + String( ( value.getUTCMilliseconds() / 1000 ).toFixed( 3 ) ).slice( 2, 5 )
			+ "Z"
			;
	}
}

export let timeSerializer:TimeSerializer = new TimeSerializer();

export class IntegerSerializer implements Serializer {
	serialize( value:any ):string {
		if( ! Utils.isNumber( value ) ) throw new Errors.IllegalArgumentError( "The value is not a number." );

		// Negative truncate
		return ( ~ ~ value ).toString();
	}
}

export let integerSerializer:IntegerSerializer = new IntegerSerializer();

export class UnsignedIntegerSerializer extends IntegerSerializer {
	serialize( value:any ):string {
		let stringValue:string = super.serialize( value );

		stringValue = Utils.S.startsWith( stringValue, "-" ) ? stringValue.substring( 1 ) : stringValue;

		return stringValue;
	}
}

export let unsignedIntegerSerializer:UnsignedIntegerSerializer = new UnsignedIntegerSerializer();

export class FloatSerializer implements Serializer {
	serialize( value:any ):string {
		if( ! Utils.isNumber( value ) ) throw new Errors.IllegalArgumentError( "The value is not a number." );
		if( value === Number.POSITIVE_INFINITY ) return "INF";
		if( value === Number.NEGATIVE_INFINITY ) return "-INF";

		return value.toString();
	}
}

export let floatSerializer:FloatSerializer = new FloatSerializer();

export class BooleanSerializer implements Serializer {
	serialize( value:any ):string {
		return ( ! ! value ).toString();
	}
}

export let booleanSerializer:BooleanSerializer = new BooleanSerializer();

export class StringSerializer implements Serializer {
	serialize( value:any ):string {
		return String( value );
	}
}

export let stringSerializer:StringSerializer = new StringSerializer();
