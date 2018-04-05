import { ObjectSchema } from "../ObjectSchema";
import { PersistedProtectedDocument } from "../PersistedProtectedDocument";
import { CS } from "../Vocabularies";
import { AuthenticatedUserMetadata } from "./AuthenticatedUserMetadata";


export interface UserMetadata extends PersistedProtectedDocument {
	authenticatedUser:AuthenticatedUserMetadata;
}


export interface UserMetadataFactory {
	TYPE:CS[ "UserMetadata" ];
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
	"authenticatedUser": {
		"@id": CS.authenticatedUser,
		"@type": "@id",
	},
};

export const UserMetadata:UserMetadataFactory = {
	TYPE: CS.UserMetadata,
	SCHEMA,
};
