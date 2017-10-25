import { TokenNode } from "sparqler/tokens";
import * as QueryContext from "./QueryContext";
import * as QueryDocumentBuilder from "./QueryDocumentBuilder";
import * as QueryObject from "./QueryObject";
import * as QueryProperty from "./QueryProperty";
import * as QueryValue from "./QueryValue";

export {
	QueryContext,
	QueryDocumentBuilder,
	QueryObject,
	QueryProperty,
	QueryValue,
};

interface QueryDocumentGetter {
	getQueryTree():TokenNode;
}

interface QueryMembersBuilder extends QueryDocumentBuilder.Class {
	filter( filterExpression:string ):this & QueryDocumentGetter;

	orderBy( property:QueryProperty.Class ):this & QueryDocumentGetter;

	limit( limit:number ):this & QueryDocumentGetter;

	offset( offset:number ):this & QueryDocumentGetter;
}

interface QueryPropertyBuilder extends QueryDocumentBuilder.Class {
	property( name?:string ):QueryProperty.Class;

	filter( filterExpression:string ):this & QueryDocumentGetter;

	values( ...values:(QueryValue.Class | QueryObject.Class)[] ):this & QueryDocumentGetter;
}
