import { VolatileResource } from "../LDP";
import { ObjectSchema } from "../ObjectSchema";
import { CS } from "../Vocabularies";
import { User } from "./User";
export interface AuthenticatedUserMetadata extends VolatileResource {
    user: User;
}
export interface AuthenticatedUserMetadataFactory {
    TYPE: CS["AuthenticatedUserMetadata"];
    SCHEMA: ObjectSchema;
}
export declare const AuthenticatedUserMetadata: AuthenticatedUserMetadataFactory;
