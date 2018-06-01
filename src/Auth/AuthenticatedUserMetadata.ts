import { VolatileResource } from "../LDP";
import { ObjectSchema } from "../ObjectSchema";
import { CS } from "../Vocabularies";
import { User } from "./User";


export interface AuthenticatedUserMetadata extends VolatileResource {
	user:User;
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

