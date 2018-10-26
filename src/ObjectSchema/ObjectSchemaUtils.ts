import { DigestedObjectSchema } from "./DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "./DigestedObjectSchemaProperty";


/**
 * Service with useful static methods that helps with schemas.
 */
export class ObjectSchemaUtils {
	/**
	 * Resolves relative URIs of a property definition using the specified schema.
	 * @param schema The schema to use for URI resolutions.
	 * @param definition The definition of the property to resolve.
	 * @param inSame Flag to indicate if to mutate the same definition or return a copy of it.
	 * @package
	 */
	static _resolveProperty( schema:DigestedObjectSchema, definition:DigestedObjectSchemaProperty, inSame?:boolean ):DigestedObjectSchemaProperty {
		const uri:string = definition.uri;
		const type:string = definition.literalType;

		const resolvedURI:string = schema.resolveURI( uri, { vocab: true } );
		const resolvedType:string = schema.resolveURI( type, { vocab: true, base: true } );

		if( resolvedURI !== uri || resolvedType !== type ) {
			if( ! inSame ) {
				definition = Object
					.assign( new DigestedObjectSchemaProperty(), definition );
			}

			definition.uri = resolvedURI;
			definition.literalType = resolvedType;
		}

		return definition;
	}
}
