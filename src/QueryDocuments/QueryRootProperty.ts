import { PatternToken, ValuesToken } from "sparqler/tokens";

import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { QueryProperty2 } from "./QueryProperty2";
import { QueryPropertyData } from "./QueryPropertyData";
import { QueryPropertyType } from "./QueryPropertyType";
import { QueryRootPropertyData } from "./QueryRootPropertyData";
import { _getRootPath } from "./Utils";


export class QueryRootProperty extends QueryProperty2 {
	readonly parent:undefined;

	protected _optional:false;
	protected readonly _filters:string[];


	constructor( data:QueryRootPropertyData ) {
		const definition:DigestedObjectSchemaProperty = new DigestedObjectSchemaProperty();
		definition.uri = data.uri;

		super( <QueryPropertyData> {
			...data,
			definition,
			parent: void 0,
		} );

		this._type = QueryPropertyType.PARTIAL;
		this._optional = false;
	}


	getTriple():PatternToken {
		return new ValuesToken()
			.addVariables( this.variable )
			.addValues( this.__createIRIToken() )
			;
	}


	getRootProperty():QueryRootProperty {
		return this;
	}


	addFilter( constraint:string ):void {
		this._filters.push( constraint );
	}

}
