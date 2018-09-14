import { AbstractContext } from "../../../../src/Context/AbstractContext";

import { DigestedObjectSchemaProperty } from "../../../../src/ObjectSchema/DigestedObjectSchemaProperty";

import { QueryContainer } from "../../../../src/QueryDocuments/QueryContainer";
import { QueryProperty } from "../../../../src/QueryDocuments/QueryProperty";


export class MockQueryContainer extends QueryContainer {
	readonly _queryProperty:QueryProperty;

	constructor( context:AbstractContext<any, any, any> ) {
		super( context );

		this._queryProperty = new QueryProperty( {
			queryContainer: this,
			name: "root",
			definition: new DigestedObjectSchemaProperty(),
			optional: true,
		} );
	}
}
