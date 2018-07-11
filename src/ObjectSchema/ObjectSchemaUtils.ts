import { URI } from "../RDF/URI";
import { ObjectUtils } from "../Utils";
import { DigestedObjectSchema } from "./DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "./DigestedObjectSchemaProperty";

export class ObjectSchemaUtils {

	static resolveURI( uri:string, schema:DigestedObjectSchema, relativeTo:{ vocab?:boolean, base?:boolean } = {} ):string {
		if( uri === null || URI.isAbsolute( uri ) || URI.isBNodeID( uri ) ) return uri;

		const [ prefix, localName = "" ]:[ string, string ] = uri.split( ":" ) as [ string, string ];

		const definedReference:string = schema.prefixes.has( prefix ) ?
			schema.prefixes.get( prefix ) : schema.properties.has( prefix ) ?
				schema.properties.get( prefix ).uri
				: null;
		if( definedReference !== null && definedReference !== prefix ) {
			return ObjectSchemaUtils.resolveURI( definedReference + localName, schema, { vocab: true } );
		}

		if( localName ) return uri;

		if( relativeTo.vocab && schema.vocab ) return schema.vocab + uri;
		if( relativeTo.base ) return URI.resolve( schema.base, uri );

		return uri;
	}

	static resolveProperty( schema:DigestedObjectSchema, definition:DigestedObjectSchemaProperty, inSame?:boolean ):DigestedObjectSchemaProperty {
		const uri:string = definition.uri;
		const type:string = definition.literalType;

		const resolvedURI:string = ObjectSchemaUtils.resolveURI( uri, schema, { vocab: true } );
		const resolvedType:string = ObjectSchemaUtils.resolveURI( type, schema, { vocab: true, base: true } );

		if( resolvedURI !== uri || resolvedType !== type ) {
			definition = inSame ? definition : ObjectUtils.clone( definition );
			definition.uri = resolvedURI;
			definition.literalType = resolvedType;
		}

		return definition;
	}
}
