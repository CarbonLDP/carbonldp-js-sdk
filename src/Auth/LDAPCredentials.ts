import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as Resource from "./../Resource";

export const RDF_CLASS:string = NS.CS.Class.LDAPCredentials;

export const SCHEMA:ObjectSchema.Class = {
	"ldapServer": {
		"@id": NS.CS.Predicate.ldapServer,
		"@type": "@id",
	},
	"ldapUserDN": {
		"@id": NS.CS.Predicate.ldapUserDN,
		"@type": NS.XSD.DataType.string,
	},
};

export interface Class extends Resource.Class {
	ldapServer:Pointer.Class;
	ldapUserDN:string;
}

export default Class;
