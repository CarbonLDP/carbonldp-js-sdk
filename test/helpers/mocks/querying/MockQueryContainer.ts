import { AbstractContext } from "../../../../src/Context/AbstractContext";

import { DigestedObjectSchemaProperty } from "../../../../src/ObjectSchema/DigestedObjectSchemaProperty";

import { QueryBuilderProperty } from "../../../../src/QueryDocuments/QueryBuilderProperty";
import { QueryContainer } from "../../../../src/QueryDocuments/QueryContainer";


export class MockQueryContainer extends QueryContainer {
	readonly _queryProperty:QueryBuilderProperty;

	constructor( context:AbstractContext<any, any, any> ) {
		super( context );

		this._queryProperty = new QueryBuilderProperty( {
			queryContainer: this,
			name: "property",
			definition: new DigestedObjectSchemaProperty(),
			optional: true,
		} );
	}
}
