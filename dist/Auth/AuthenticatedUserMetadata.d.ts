import { VolatileResource } from "../LDP";
import { ObjectSchema } from "../ObjectSchema";
import { CS } from "../Vocabularies";
import * as PersistedUser from "./PersistedUser";
export interface AuthenticatedUserMetadata extends VolatileResource {
    user: PersistedUser.Class;
}
export interface AuthenticatedUserMetadataFactory {
    TYPE: CS["AuthenticatedUserMetadata"];
    SCHEMA: ObjectSchema;
}
export declare const AuthenticatedUserMetadata: AuthenticatedUserMetadataFactory;
