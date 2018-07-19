import { AbstractContext } from "../Context/AbstractContext";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";

import { QueryablePointer } from "./QueryablePointer";
import { QueryContext } from "./QueryContext";


export class QueryContextPartial extends QueryContext {

	private readonly _resource:QueryablePointer;

	constructor( resource:QueryablePointer, context?:AbstractContext<any, any, any> ) {
		super( context );
		this._resource = resource;
	}

	getSchemaFor( object:object, path?:string ):DigestedObjectSchema {
		if( path === void 0 ) return super.getSchemaFor( object );

		const parts:string[] = path.split( /\./g ).slice( 1 );
		let schemaLibrary:QueryablePointer = this._resource;
		while( parts.length ) {
			const part:string = parts.shift();
			const values:any[] = Array.isArray( schemaLibrary[ part ] ) ?
				schemaLibrary[ part ] : [ schemaLibrary[ part ] ];

			schemaLibrary = values.find( QueryablePointer.is );
			if( ! schemaLibrary ) return super.getSchemaFor( object );
		}

		return schemaLibrary._queryableMetadata.schema;
	}
}
