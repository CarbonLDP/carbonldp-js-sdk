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

interface QueryMembersBuilder extends QueryDocumentBuilder.Class {
	filter( filterExpression:string ):this;

	orderBy( property:QueryProperty.Class ):this;

	limit( limit:number ):this;

	offset( offset:number ):this;
}

interface QueryPropertyBuilder extends QueryDocumentBuilder.Class {
	filter( filterExpression:string ):this;

	values( ...values:(QueryValue.Class | QueryObject.Class)[] ):this;
}
