import { ObjectUtils } from "../Utils";
import { DigestedObjectSchema } from "./DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "./DigestedObjectSchemaProperty";

export class ObjectSchemaUtils {
	static resolveProperty( schema:DigestedObjectSchema, definition:DigestedObjectSchemaProperty, inSame?:boolean ):DigestedObjectSchemaProperty {
		const uri:string = definition.uri;
		const type:string = definition.literalType;

		const resolvedURI:string = schema.resolveURI( uri, { vocab: true } );
		const resolvedType:string = schema.resolveURI( type, { vocab: true, base: true } );

		if( resolvedURI !== uri || resolvedType !== type ) {
			definition = inSame ? definition : ObjectUtils.clone( definition );
			definition.uri = resolvedURI;
			definition.literalType = resolvedType;
		}

		return definition;
	}
}
