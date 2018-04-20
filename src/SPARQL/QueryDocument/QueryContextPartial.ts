import { Context } from "../../Context";
import { DigestedObjectSchema } from "../../ObjectSchema";
import { Document } from "../../Document";
import { Resource } from "../../Resource";
import { QueryContext } from "./QueryContext";

export class QueryContextPartial extends QueryContext {

	private _document:Document;

	constructor( document:Document, context?:Context ) {
		super( context );
		this._document = document;
	}

	getSchemaFor( object:object, path?:string ):DigestedObjectSchema {
		if( path === void 0 ) return super.getSchemaFor( object );

		const parts:string[] = path.split( /\./g ).slice( 1 );
		let schemaLibrary:Resource = this._document;
		while( parts.length ) {
			const part:string = parts.shift();
			const values:any[] = Array.isArray( schemaLibrary[ part ] ) ?
				schemaLibrary[ part ] : [ schemaLibrary[ part ] ];

			schemaLibrary = values.find( value => value && "_partialMetadata" in value );
			if( ! schemaLibrary ) return super.getSchemaFor( object );
		}

		return schemaLibrary._partialMetadata.schema;
	}
}
