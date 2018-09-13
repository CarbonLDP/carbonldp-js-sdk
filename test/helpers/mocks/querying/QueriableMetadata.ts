import { DigestedObjectSchema } from "../../../../src/ObjectSchema/DigestedObjectSchema";
import { ObjectSchema } from "../../../../src/ObjectSchema/ObjectSchema";
import { ObjectSchemaDigester } from "../../../../src/ObjectSchema/ObjectSchemaDigester";
import { QueryableProperty } from "../../../../src/QueryDocuments/QueryableProperty";
import { QueryableRootProperty } from "../../../../src/QueryDocuments/QueryableRootProperty";

import { QueryPropertyType } from "../../../../src/QueryDocuments/QueryPropertyType";


export function createMockQueryableMetadata( schema:ObjectSchema & { "$id"?:string, $propertyType?:QueryPropertyType } = {} ):QueryableRootProperty {
	const rootProperty:QueryableRootProperty = new QueryableRootProperty( {
		uri: schema.$id || "root/",
		propertyType: schema.$propertyType || QueryPropertyType.PARTIAL,
	} );

	__addProperties( schema, rootProperty );
	return rootProperty;
}

function __addProperties( schema:ObjectSchema | undefined, parentProperty:QueryableProperty ):void {
	if( ! schema ) return;

	const digestedSchema:DigestedObjectSchema = ObjectSchemaDigester
		.digestSchema( schema );

	digestedSchema.properties.forEach( ( definition, propertyName ) => {
		const subProperty:QueryableProperty = parentProperty.getProperty( {
			name: propertyName,
			definition: digestedSchema.getProperty( propertyName ),

			propertyType: schema[ propertyName ][ "$propertyType" ],
			optional: true,
		} );

		__addProperties( schema[ propertyName ][ "$subProperties" ], subProperty );
	} );
}


