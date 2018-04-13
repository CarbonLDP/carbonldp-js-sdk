import { VolatileResource } from "../LDP";
import { ObjectSchema } from "../ObjectSchema";
import { CS } from "../Vocabularies";
import { PersistedUser } from "./PersistedUser";


export interface AuthenticatedUserMetadata extends VolatileResource {
	user:PersistedUser;
}


export interface AuthenticatedUserMetadataFactory {
	TYPE:CS[ "AuthenticatedUserMetadata" ];
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
	"user": {
		"@id": CS.user,
		"@type": "@id",
	},
};

export const AuthenticatedUserMetadata:AuthenticatedUserMetadataFactory = {
	TYPE: CS.AuthenticatedUserMetadata,
	SCHEMA,
};

