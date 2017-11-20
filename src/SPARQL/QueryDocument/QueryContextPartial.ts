import { PatternToken } from "sparqler/tokens";

import * as Context from "../../Context";
import * as PersistedDocument from "../../PersistedDocument";
import * as PersistedResource from "../../PersistedResource";
import { DigestedObjectSchema, DigestedPropertyDefinition } from "../../ObjectSchema";
import * as QueryContext from "./QueryContext";
import * as QueryProperty from "./QueryProperty";
import { getLevelRegExp } from "./Utils";

export class Class extends QueryContext.Class {

	private _document:PersistedDocument.Class;

	constructor( document:PersistedDocument.Class, context?:Context.Class ) {
		super( context );
		this._document = document;
	}

	getSchemaFor( object:Object, path?:string ):DigestedObjectSchema {
		if( path === void 0 ) return super.getSchemaFor( object );

		const parts:string[] = path.split( /\./g ).slice( 1 );
		let schemaLibrary:PersistedResource.Class = this._document;
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

export default Class;
