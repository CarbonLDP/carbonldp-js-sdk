import { IllegalArgumentError } from "../../../Errors/IllegalArgumentError";

import { Serializer } from "../Serializer";

import * as Utils from "./../../../Utils";


function pad( value:number ):string {
	let paddedValue:string = String( value );
	if( paddedValue.length === 1 ) paddedValue = "0" + paddedValue;
	return paddedValue;
}

const notNumberError:string = "The value is not a number.";

/**
 * Class that can serialize a Date object into a string literal with format `YYYY-MM-DD`.
 *
 * Instead of instantiating this class, use the already exposed instance {@link dateSerializer}.
 */
export class DateSerializer implements Serializer {
	/**
	 * Returns the string with format `YYYY-MM-DD`, of the Date object.
	 * @param value
	 */
	serialize( value:any ):string {
		if( !Utils.isDate( value ) ) throw new IllegalArgumentError( "The value is not a Date object." );

		return value.getUTCFullYear() + "-" + pad( (value.getUTCMonth() + 1) ) + "-" + pad( value.getUTCDate() );
	}
}

/**
 * The already exposed instance of the class {@link DateSerializer}.
 */
export let dateSerializer:DateSerializer = new DateSerializer();

/**
 * Class that can serialize a Date object into a string ISO literal.
 *
 * Instead of instantiating this class, use the already exposed instance {@link dateTimeSerializer}.
 */
export class DateTimeSerializer implements Serializer {
	/**
	 * Returns the simplified extended ISO format (ISO 8601) of the Date object.
	 * @param value
	 */
	serialize( value:any ):string {
		if( !Utils.isDate( value ) ) throw new IllegalArgumentError( "The value is not a Date object." );

		return value.toISOString();
	}
}

/**
 * The already exposed instance of the class {@link DateTimeSerializer}.
 */
export let dateTimeSerializer:DateTimeSerializer = new DateTimeSerializer();

/**
 * Class that can serialize a Date object into a literal string with format `HH:mm:ss.sssZ`.
 *
 * Instead of instantiating this class, use the already exposed instance {@link timeSerializer}.
 */
export class TimeSerializer implements Serializer {
	serialize( value:any ):string {
		if( !Utils.isDate( value ) ) throw new IllegalArgumentError( "The value is not a Date object." );

		return pad( value.getUTCHours() )
			+ ":" + pad( value.getUTCMinutes() )
			+ ":" + pad( value.getUTCSeconds() )
			+ "." + String( (value.getUTCMilliseconds() / 1000).toFixed( 3 ) ).slice( 2, 5 )
			+ "Z"
			;
	}
}

/**
 * The already exposed instance of the class {@link TimeSerializer}.
 */
export let timeSerializer:TimeSerializer = new TimeSerializer();

/**
 * Class that can serialize any Number value to a string literal of an integer.
 *
 * Instead of instantiating this class, use the already exposed instance {@link integerSerializer}.
 */
export class IntegerSerializer implements Serializer {
	/**
	 * Returns a string representing an integer from the Number provided.
	 * @param value
	 */
	serialize( value:any ):string {
		if( !Utils.isNumber( value ) ) throw new IllegalArgumentError( notNumberError );

		// Negative truncate
		return (~ ~ value).toString();
	}
}

/**
 * The already exposed instance of the class {@link IntegerSerializer}.
 */
export let integerSerializer:IntegerSerializer = new IntegerSerializer();

/**
 * Class that can serialize any Number value to a string literal of a long integer.
 *
 * Instead of instantiating this class, use the already exposed instance {@link longSerializer}.
 */
export class LongSerializer implements Serializer {
	/**
	 * Returns a string representing a long integer from the Number provided.
	 * @param value
	 */
	serialize( value:any ):string {
		if( !Utils.isNumber( value ) ) throw new IllegalArgumentError( notNumberError );

		if( value === Number.POSITIVE_INFINITY ) return "0";
		if( value === Number.NEGATIVE_INFINITY ) return "0";
		if( Number.isNaN( value ) ) return "0";

		return Math.trunc( value ).toString();
	}
}

/**
 * The already exposed instance of the class {@link LongSerializer}.
 */
export const longSerializer:LongSerializer = new LongSerializer();

/**
 * Class that can serialize any Number value to a string literal of an unsigned integer.
 *
 * Instead of instantiating this class, use the already exposed instance {@link unsignedIntegerSerializer}.
 */
export class UnsignedIntegerSerializer extends IntegerSerializer {
	/**
	 * Returns a string representing an unsigned integer from the Number provided.
	 * @param value
	 */
	serialize( value:any ):string {
		let stringValue:string = super.serialize( value );

		stringValue = Utils.StringUtils.startsWith( stringValue, "-" ) ? stringValue.substring( 1 ) : stringValue;

		return stringValue;
	}
}

/**
 * The already exposed instance of the class {@link UnsignedIntegerSerializer}.
 */
export let unsignedIntegerSerializer:UnsignedIntegerSerializer = new UnsignedIntegerSerializer();

/**
 * Class that can serialize any Number value to a string literal of an unsigned long integer.
 *
 * Instead of instantiating this class, use the already exposed instance {@link unsignedLongSerializer}.
 */
export class UnsignedLongSerializer implements Serializer {
	serialize( value:any ):string {
		if( !Utils.isNumber( value ) ) throw new IllegalArgumentError( notNumberError );

		if( value === Number.POSITIVE_INFINITY ) return "0";
		if( value === Number.NEGATIVE_INFINITY ) return "0";
		if( Number.isNaN( value ) ) return "0";

		return Math.trunc( Math.abs( value ) ).toString();
	}
}

/**
 * The already exposed instance of the class {@link UnsignedLongSerializer}.
 */
export const unsignedLongSerializer:UnsignedLongSerializer = new UnsignedLongSerializer();

/**
 * Class that can serialize any Number value to a string literal of float.
 *
 * Instead of instantiating this class, use the already exposed instance {@link floatSerializer}.
 */
export class FloatSerializer implements Serializer {
	/**
	 * Returns a string representing a float from the Number provided.
	 * @param value
	 */
	serialize( value:any ):string {
		if( value === Number.POSITIVE_INFINITY ) return "INF";
		if( value === Number.NEGATIVE_INFINITY ) return "-INF";
		if( !Utils.isNumber( value ) ) throw new IllegalArgumentError( notNumberError );

		return value.toString();
	}
}

/**
 * The already exposed instance of the class {@link FloatSerializer}.
 */
export let floatSerializer:FloatSerializer = new FloatSerializer();

/**
 * Class that can serialize any variable to a string literal representation its truth value.
 *
 * Instead of instantiating this class, use the already exposed instance {@link booleanSerializer}.
 */
export class BooleanSerializer implements Serializer {
	/**
	 * Returns a string representing the truth value from the variable provided.
	 * @param value
	 */
	serialize( value:any ):string {
		return (!!value).toString();
	}
}

/**
 * The already exposed instance of the class {@link BooleanSerializer}.
 */
export let booleanSerializer:BooleanSerializer = new BooleanSerializer();

/**
 * Class that can serialize any variable to a string literal representation its truth value.
 *
 * Instead of instantiating this class, use the already exposed instance {@link stringSerializer}.
 */
export class StringSerializer implements Serializer {
	/**
	 * Returns a string representing the truth value from the variable provided.
	 * @param value
	 */
	serialize( value:any ):string {
		return String( value );
	}
}

/**
 * The already exposed instance of the class {@link StringSerializer}.
 */
export let stringSerializer:StringSerializer = new StringSerializer();
