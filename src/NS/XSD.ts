export const namespace:string = "http://www.w3.org/2001/XMLSchema#";
export enum DataType {
	date = <DataType><any> (namespace + "date"),
	dateTime = <DataType><any> ( namespace + "dateTime" ),
	duration = <DataType><any> ( namespace + "duration" ),
	gDay = <DataType><any> ( namespace + "gDay" ),
	gMonth = <DataType><any> ( namespace + "gMonth" ),
	gMonthDay = <DataType><any> ( namespace + "gMonthDay" ),
	gYear = <DataType><any> ( namespace + "gYear" ),
	gYearMonth = <DataType><any> ( namespace + "gYearMonth" ),
	time = <DataType><any> ( namespace + "time" ),

	byte = <DataType><any> ( namespace + "byte" ),
	decimal = <DataType><any> ( namespace + "decimal" ),
	int = <DataType><any> ( namespace + "int" ),
	integer = <DataType><any> ( namespace + "integer" ),
	long = <DataType><any> ( namespace + "long" ),
	negativeInteger = <DataType><any> ( namespace + "negativeInteger" ),
	nonNegativeInteger = <DataType><any> ( namespace + "nonNegativeInteger" ),
	nonPositiveInteger = <DataType><any> ( namespace + "nonPositiveInteger" ),
	positiveInteger = <DataType><any> ( namespace + "positiveInteger" ),
	short = <DataType><any> ( namespace + "short" ),
	unsignedLong = <DataType><any> ( namespace + "unsignedLong" ),
	unsignedInt = <DataType><any> ( namespace + "unsignedInt" ),
	unsignedShort = <DataType><any> ( namespace + "unsignedShort" ),
	unsignedByte = <DataType><any> ( namespace + "unsignedByte" ),
	double = <DataType><any> ( namespace + "double" ),
	float = <DataType><any> ( namespace + "float" ),

	boolean = <DataType><any> ( namespace + "boolean" ),
	string = <DataType><any> ( namespace + "string" ),
	object = <DataType><any> ( namespace + "object" )
}
