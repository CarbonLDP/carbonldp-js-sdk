import * as Pointer from "./../../Pointer";

/*interface Documents {
	get( resourceURI:string, options:HTTP.Options, querySchema:( queryDocumentBuilder:QueryDocumentBuilder ) => QuerySchema );
}*/
type SupportedNatives = string | number | boolean | Date;


interface Token {
	value:string;
}

interface QueryDocumentGetter {
	getQueryTree():Token;
}


interface QueryDocumentBuilder {
	inherit:Readonly<{}>;

	property( name:string ):QueryProperty;

	value( value:SupportedNatives ):QueryValue;

	object( object:Pointer.Class ):QueryObject;

	withType( iriClass:string ):this & QueryDocumentGetter;

	properties( propertiesSchema:QueryPropertiesSchema ):this & QueryDocumentGetter;
}

interface QueryMembersBuilder extends QueryDocumentBuilder {
	filter( filterExpression:string ):this & QueryDocumentGetter;

	orderBy( property:QueryProperty ):this & QueryDocumentGetter;

	limit( limit:number ):this & QueryDocumentGetter;

	offset( offset:number ):this & QueryDocumentGetter;
}

interface QueryPropertiesSchema {
	[ propertyName:string ]:{
		"@id":string;
		"@type":"@id" | string;
		"@language":string;
		"@container":"@set" | "@list" | "@language";
		"@query":( builder:QueryPropertyBuilder ) => QueryDocumentGetter;
	};
}

interface QueryPropertyBuilder extends QueryDocumentBuilder {
	property( name?:string ):QueryProperty;

	filter( filterExpression:string ):this & QueryDocumentGetter;

	values( ...values:(QueryValue | QueryObject)[] ):this & QueryDocumentGetter;
}


interface QueryValue {
	new( value:SupportedNatives );

	withType( type:string ):this;

	withLanguage( language:string ):this;

	toString():string; // "value"^^xsd:type | "value"@lang
}


interface QueryObject {
	new( object:Pointer.Class );

	toString():string; // <http://...> | <_:...>
}


interface QueryProperty {
	new( name:string, index:number );

	toString():string; // ?var_index
}
