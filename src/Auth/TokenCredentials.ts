import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";
import * as ObjectSchema from "./../ObjectSchema";
import { Resource } from "./../Resource";
import * as Utils from "./../Utils";
import * as PersistedUser from "./PersistedUser";

export const RDF_CLASS:string = CS.Token;

export const SCHEMA:ObjectSchema.ObjectSchema = {
	"key": {
		"@id": CS.tokenKey,
		"@type": XSD.string,
	},
	"expirationTime": {
		"@id": CS.expirationTime,
		"@type": XSD.dateTime,
	},
	"user": {
		"@id": CS.credentialsOf,
		"@type": "@id",
	},
};

export interface Class extends Resource {
	key:string;
	expirationTime:Date;
	user?:PersistedUser.Class;
}

export class Factory {

	static is( object:object ):object is Class {
		return Resource.is( object )
			&& Factory.hasClassProperties( object )
			;
	}

	static hasClassProperties( object:object ):object is Class {
		return Utils.hasPropertyDefined( object, "key" )
			&& Utils.hasPropertyDefined( object, "expirationTime" )
			;
	}

}

export default Class;
