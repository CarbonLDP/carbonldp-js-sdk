import * as NS from "./Vocabularies/index";
import * as ObjectSchema from "./ObjectSchema";
import * as PersistedDocument from "./PersistedDocument";
import * as Utils from "./Utils";

export const RDF_CLASS:string = NS.C.RDFRepresentation;

export const SCHEMA:ObjectSchema.Class = {
	"mediaType": {
		"@id": NS.C.mediaType,
		"@type": NS.XSD.string,
	},
	"size": {
		"@id": NS.C.size,
		"@type": NS.XSD.long,
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
