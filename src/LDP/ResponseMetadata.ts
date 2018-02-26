import { C } from "../Vocabularies/C";
import * as ObjectSchema from "./../ObjectSchema";
import * as DocumentMetadata from "./DocumentMetadata";
import * as VolatileResource from "./VolatileResource";

export const RDF_CLASS:string = C.ResponseMetadata;

export const SCHEMA:ObjectSchema.ObjectSchema = {
	"documentsMetadata": {
		"@id": C.documentMetadata,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class extends VolatileResource.Class {
	documentsMetadata?:DocumentMetadata.Class[];
}

export class Factory {

	static is( object:object ):object is Class {
		return VolatileResource.Factory.is( object )
			&& object.hasType( RDF_CLASS );
	}

}

export default Class;
