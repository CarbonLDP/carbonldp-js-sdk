import { AbstractContext } from "../Context/AbstractContext";

import { QueryablePropertyData } from "./QueryablePropertyData";
import { QueryableRootProperty } from "./QueryableRootProperty";
import { QueryContainer } from "./QueryContainer";
import { QueryProperty2 } from "./QueryProperty2";


export class QueryableMetadataContainer extends QueryContainer {
	readonly _queryProperty:QueryProperty2;


	constructor( context:AbstractContext<any, any, any>, property:QueryableRootProperty ) {
		super( context );

		this._queryProperty = new QueryProperty2( {
			...property as QueryablePropertyData,
			queryContainer: this,
		} );
	}

}
