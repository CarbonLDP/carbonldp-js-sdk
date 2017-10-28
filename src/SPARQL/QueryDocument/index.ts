import * as QueryContext from "./QueryContext";
import * as QueryDocumentBuilder from "./QueryDocumentBuilder";
import * as QueryObject from "./QueryObject";
import * as QueryPropertiesSchema from "./QueryPropertiesSchema";
import * as QueryProperty from "./QueryProperty";
import * as QueryPropertySchema from "./QueryPropertySchema";
import * as QueryValue from "./QueryValue";
import * as QueryVariable from "./QueryVariable";

export {
	QueryContext,
	QueryDocumentBuilder,
	QueryObject,
	QueryPropertiesSchema,
	QueryProperty,
	QueryPropertySchema,
	QueryValue,
	QueryVariable,
};

interface QueryMembersBuilder extends QueryDocumentBuilder.Class {
	filter( filterExpression:string ):this;

	orderBy( property:QueryProperty.Class ):this;

	limit( limit:number ):this;

	offset( offset:number ):this;
}
