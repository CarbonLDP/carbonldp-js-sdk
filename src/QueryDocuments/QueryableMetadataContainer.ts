import { AbstractContext } from "../Context/AbstractContext";

import { QueryablePropertyData } from "./QueryablePropertyData";
import { QueryableRootProperty } from "./QueryableRootProperty";
import { QueryContainer } from "./QueryContainer";
import { QueryProperty } from "./QueryProperty";


export class QueryableMetadataContainer extends QueryContainer {
	readonly _queryProperty:QueryProperty;


	constructor( context:AbstractContext<any, any, any>, property:QueryableRootProperty ) {
		super( context );

		this._queryProperty = new QueryProperty( {
			...property as QueryablePropertyData,
			queryContainer: this,
		} );
	}

}
