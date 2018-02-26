import { XSD } from "../Vocabularies/index";
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
		return XSD.string;
	if( isDate( value ) )
		return XSD.dateTime;
	if( isNumber( value ) )
		return XSD.float;
	if( isBoolean( value ) )
		return XSD.boolean;

	return null;
}