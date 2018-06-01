import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { CS } from "../Vocabularies";
import { LDAPCredentials } from "./LDAPCredentials";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";


export interface CredentialSet {
	user:Pointer;
	credentials:(UsernameAndPasswordCredentials | LDAPCredentials)[];
}


export interface CredentialSetFactory {
	TYPE:CS[ "CredentialSet" ];
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
	"user": {
		"@id": CS.user,
		"@type": "@id",
	},
	"credentials": {
		"@id": CS.credentials,
		"@type": "@id",
		"@container": "@set",
	},
};

export const CredentialSet:CredentialSetFactory = {
	TYPE: CS.CredentialSet,
	SCHEMA,
};
