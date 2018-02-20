import * as Document from "./../Document";
import * as NS from "../Vocabularies/index";
import * as ObjectSchema from "./../ObjectSchema";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.CS.User;

export const SCHEMA:ObjectSchema.Class = {
	"name": {
		"@id": NS.CS.name,
		"@type": NS.XSD.string,
	},
	"credentials": {
		"@id": NS.CS.credentials,
		"@type": "@id",
	},
};

export interface Class extends Document.Class {
	name:string;
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "name" )
			;
	}
}

export default Class;
