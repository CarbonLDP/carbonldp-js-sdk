import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as UsernameAndPasswordCredentials from "./UsernameAndPasswordCredentials";

export const RDF_CLASS:string = NS.CS.Class.CredentialsSet;

export const SCHEMA:ObjectSchema.Class = {
	"user": {
		"@id": NS.CS.Predicate.user,
		"@type": "@id",
	},
	"credentials": {
		"@id": NS.CS.Predicate.credentials,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class {
	user:Pointer.Class;
	credentials:UsernameAndPasswordCredentials.Class[];
}

export default Class;
