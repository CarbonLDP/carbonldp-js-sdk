import { XSD } from "../NS";
import {
	isBoolean,
	isDate,
	isFunction,
	isNumber,
	isString,
} from "../Utils";

export function guessXSDType( value:any ):string {
	if( isFunction( value ) )
		return null;

	if( isString( value ) )
		return XSD.DataType.string;
	if( isDate( value ) )
		return XSD.DataType.dateTime;
	if( isNumber( value ) )
		return XSD.DataType.float;
	if( isBoolean( value ) )
		return XSD.DataType.boolean;

	return null;
}
