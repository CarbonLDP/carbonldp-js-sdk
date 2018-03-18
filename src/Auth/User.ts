import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";
import { Document } from "./../Document";
import * as ObjectSchema from "./../ObjectSchema";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = CS.User;

export const SCHEMA:ObjectSchema.ObjectSchema = {
	"name": {
		"@id": CS.name,
		"@type": XSD.string,
	},
	"credentials": {
		"@id": CS.credentials,
		"@type": "@id",
	},
};

export interface Class extends Document {
	name:string;
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "name" )
			;
	}
}

export default Class;
