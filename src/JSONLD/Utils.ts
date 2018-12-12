import { isBoolean, isDate, isFunction, isNumber, isString } from "../Utils";
import { XSD } from "../Vocabularies/XSD";


/**
 * Returns the guessed {@link XSD} type from the specified value.
 * @param value the value to check its matching {@link XSD} type.
 */
export function _guessXSDType( value:any ):string | null {
	if( isFunction( value ) )
		return null;

	if( isString( value ) )
		return XSD.string;
	if( isDate( value ) )
		return XSD.dateTime;
	if( isNumber( value ) )
		return XSD.float;
	if( isBoolean( value ) )
		return XSD.boolean;

	return null;
}
