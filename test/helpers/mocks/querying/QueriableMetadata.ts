import { DigestedObjectSchema } from "../../../../src/ObjectSchema/DigestedObjectSchema";
import { ObjectSchema } from "../../../../src/ObjectSchema/ObjectSchema";
import { ObjectSchemaDigester } from "../../../../src/ObjectSchema/ObjectSchemaDigester";
import { QueryableProperty } from "../../../../src/QueryDocuments/QueryableProperty";
import { QueryablePropertyData } from "../../../../src/QueryDocuments/QueryablePropertyData";
import { QueryableRootProperty } from "../../../../src/QueryDocuments/QueryableRootProperty";

import { QueryPropertyType } from "../../../../src/QueryDocuments/QueryPropertyType";


export function createMockQueryableMetadata( schema:ObjectSchema & { "$id"?:string, $propertyType?:QueryPropertyType, $pathBuilderFn?:Function } = {} ):QueryableRootProperty {
	const rootProperty:QueryableRootProperty = new QueryableRootProperty( {
		uri: schema.$id || "root/",
		propertyType: schema.$propertyType || QueryPropertyType.PARTIAL,
	} );

	__addProperties( schema, rootProperty );
	return rootProperty;
}

export function createSubMockQueryableMetadata( data:QueryablePropertyData & { $subProperties?:ObjectSchema } ):QueryableProperty {
	const subProperty:QueryableProperty = new QueryableProperty( data );

	if( data.$subProperties )
		__addProperties( data.$subProperties, subProperty );

	return subProperty;
}


function __addProperties( schema:ObjectSchema | undefined, parentProperty:QueryableProperty ):void {
	if( !schema ) return;

	const digestedSchema:DigestedObjectSchema = ObjectSchemaDigester
		.digestSchema( schema );

	digestedSchema.properties.forEach( ( definition, propertyName ) => {
		const subProperty:QueryableProperty = parentProperty.getProperty( propertyName, {
			definition: digestedSchema.getProperty( propertyName )!,

			propertyType: schema[ propertyName ]![ "$propertyType" ],
			pathBuilderFn: schema[ propertyName ]![ "$pathBuilderFn" ],
			optional: true,
		} );

		__addProperties( schema[ propertyName ]![ "$subProperties" ], subProperty );
	} );
}


