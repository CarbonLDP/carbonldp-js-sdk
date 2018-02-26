import * as ObjectSchema from "./ObjectSchema";
import * as PersistedDocument from "./PersistedDocument";
import * as Utils from "./Utils";
import { C } from "./Vocabularies/C";
import { XSD } from "./Vocabularies/XSD";

export const RDF_CLASS:string = C.RDFRepresentation;

export const SCHEMA:ObjectSchema.ObjectSchema = {
	"mediaType": {
		"@id": C.mediaType,
		"@type": XSD.string,
	},
	"size": {
		"@id": C.size,
		"@type": XSD.long,
	},
};

export interface Class extends PersistedDocument.Class {
	mediaType:string;
	size:number;
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "mediaType" )
			&& Utils.hasPropertyDefined( object, "size" );
	}

	static is( object:Object ):boolean {
		return Factory.hasClassProperties( object )
			&& PersistedDocument.Factory.is( object )
			&& (<PersistedDocument.Class> object).hasType( RDF_CLASS )
			;
	}
}

export default Class;
