import * as Utils from "./../Utils";

export const namespace:string = "http://www.w3.org/2001/XMLSchema#";

export class DataType {
	static date:string = namespace + "date";
	static dateTime:string = namespace + "dateTime";
	static duration:string = namespace + "duration";
	static gDay:string = namespace + "gDay";
	static gMonth:string = namespace + "gMonth";
	static gMonthDay:string = namespace + "gMonthDay";
	static gYear:string = namespace + "gYear";
	static gYearMonth:string = namespace + "gYearMonth";
	static time:string = namespace + "time";

	static byte:string = namespace + "byte";
	static decimal:string = namespace + "decimal";
	static int:string = namespace + "int";
	static integer:string = namespace + "integer";
	static long:string = namespace + "long";
	static negativeInteger:string = namespace + "negativeInteger";
	static nonNegativeInteger:string = namespace + "nonNegativeInteger";
	static nonPositiveInteger:string = namespace + "nonPositiveInteger";
	static positiveInteger:string = namespace + "positiveInteger";
	static short:string = namespace + "short";
	static unsignedLong:string = namespace + "unsignedLong";
	static unsignedInt:string = namespace + "unsignedInt";
	static unsignedShort:string = namespace + "unsignedShort";
	static unsignedByte:string = namespace + "unsignedByte";
	static double:string = namespace + "double";
	static float:string = namespace + "float";

	static boolean:string = namespace + "boolean";
	static string:string = namespace + "string";
	static object:string = namespace + "object";
}

Utils.forEachOwnProperty( DataType, ( key:string, value:any ):void => {
	DataType[ value ] = key;
});
