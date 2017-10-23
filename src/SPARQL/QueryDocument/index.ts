import * as Pointer from "./../../Pointer";
import { TokenNode } from "sparqler/tokens";
import QueryProperty from "./QueryProperty";
import QueryValue from "./QueryValue";
import QueryObject from "./QueryObject";
import QueryPropertiesSchema from "./QueryPropertiesSchema";
import QueryDocumentBuilderImplementation from "./QueryDocumentBuilder";

/*interface Documents {
	get( resourceURI:string, options:HTTP.Options, querySchema:( queryDocumentBuilder:QueryDocumentBuilder ) => QuerySchema );
}*/
type SupportedNatives = string | number | boolean | Date;

interface QueryDocumentGetter {
	getQueryTree():TokenNode;
}


interface QueryDocumentBuilder extends QueryDocumentBuilderImplementation {
	withType( iriClass:string ):this & QueryDocumentGetter;

	properties( propertiesSchema:QueryPropertiesSchema ):this & QueryDocumentGetter;
}

interface QueryMembersBuilder extends QueryDocumentBuilder {
	filter( filterExpression:string ):this & QueryDocumentGetter;

	orderBy( property:QueryProperty ):this & QueryDocumentGetter;

	limit( limit:number ):this & QueryDocumentGetter;

	offset( offset:number ):this & QueryDocumentGetter;
}

interface QueryPropertyBuilder extends QueryDocumentBuilder {
	property( name?:string ):QueryProperty;

	filter( filterExpression:string ):this & QueryDocumentGetter;

	values( ...values:(QueryValue | QueryObject)[] ):this & QueryDocumentGetter;
}
