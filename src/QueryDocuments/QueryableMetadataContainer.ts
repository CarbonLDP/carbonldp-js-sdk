import { AbstractContext } from "../Context/AbstractContext";

import { QueryableProperty } from "./QueryableProperty";
import { QueryablePropertyData } from "./QueryablePropertyData";
import { QueryContainer } from "./QueryContainer";
import { QueryProperty } from "./QueryProperty";


export class QueryableMetadataContainer extends QueryContainer {
	readonly _queryProperty:QueryProperty;


	constructor( context:AbstractContext<any, any, any>, property:QueryableProperty ) {
		super( context );

		this._queryProperty = new QueryProperty( {
			...property as QueryablePropertyData,
			queryContainer: this,
			name: "document",
		} );
	}

}
