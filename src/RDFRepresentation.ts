import * as NS from "./NS";
import * as ObjectSchema from "./ObjectSchema";
import * as PersistedDocument from "./PersistedDocument";
import * as Utils from "./Utils";

export const RDF_CLASS:string = NS.C.Class.RDFRepresentation;

export const SCHEMA:ObjectSchema.Class = {
	"fileIdentifier": {
		"@id": NS.C.Predicate.fileIdentifier,
		"@type": NS.XSD.DataType.string,
	},
	"mediaType": {
		"@id": NS.C.Predicate.mediaType,
		"@type": NS.XSD.DataType.string,
	},
	"size": {
		"@id": NS.C.Predicate.size,
		"@type": NS.XSD.DataType.long,
	},
};

export interface Class extends PersistedDocument.Class {
	fileIdentifier:string;
	mediaType:string;
	size:number;
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "fileIdentifier" )
			&& Utils.hasPropertyDefined( object, "mediaType" )
			&& Utils.hasPropertyDefined( object, "size" );
	}

	static is( object:Object ):boolean {
		return PersistedDocument.Factory.is( object )
			&& ( <PersistedDocument.Class> object ).types.indexOf( RDF_CLASS ) !== -1
			&& Factory.hasClassProperties( object );
	}
}

export default Class;
