import { AbstractContext } from "../../AbstractContext";
import { DigestedObjectSchema } from "../../ObjectSchema";
import { Pointer } from "../../Pointer";
import { PersistedResource } from "../../Resource";
import { QueryContext } from "./QueryContext";

export class QueryContextPartial extends QueryContext {

	private readonly _resource:PersistedResource;

	constructor( resource:PersistedResource, context?:AbstractContext<Pointer, any> ) {
		super( context );
		this._resource = resource;
	}

	getSchemaFor( object:object, path?:string ):DigestedObjectSchema {
		if( path === void 0 ) return super.getSchemaFor( object );

		const parts:string[] = path.split( /\./g ).slice( 1 );
		let schemaLibrary:PersistedResource = this._resource;
		while( parts.length ) {
			const part:string = parts.shift();
			const values:any[] = Array.isArray( schemaLibrary[ part ] ) ?
				schemaLibrary[ part ] : [ schemaLibrary[ part ] ];

			schemaLibrary = values.find( PersistedResource.is );
			if( ! schemaLibrary ) return super.getSchemaFor( object );
		}

		return schemaLibrary._partialMetadata.schema;
	}
}
