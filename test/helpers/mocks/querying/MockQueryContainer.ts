import { AbstractContext } from "../../../../src/Context/AbstractContext";

import { DigestedObjectSchemaProperty } from "../../../../src/ObjectSchema/DigestedObjectSchemaProperty";

import { QueryContainer } from "../../../../src/QueryDocuments/QueryContainer";
import { QueryProperty2 } from "../../../../src/QueryDocuments/QueryProperty2";


export class MockQueryContainer extends QueryContainer {
	readonly _queryProperty:QueryProperty2;

	constructor( context:AbstractContext<any, any, any> ) {
		super( context );

		this._queryProperty = new QueryProperty2( {
			queryContainer: this,
			name: "property",
			definition: new DigestedObjectSchemaProperty(),
		} );
	}
}
