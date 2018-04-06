import { ObjectSchema } from "../ObjectSchema";
import { PersistedProtectedDocument } from "../PersistedProtectedDocument";
import { CS } from "../Vocabularies";
import { AuthenticatedUserMetadata } from "./AuthenticatedUserMetadata";
export interface AuthenticatedUserInformationAccessor extends PersistedProtectedDocument {
    authenticatedUser: AuthenticatedUserMetadata;
}
export interface AuthenticatedUserInformationAccessorFactory {
    TYPE: CS["AuthenticatedUserInformationAccessor"];
    SCHEMA: ObjectSchema;
}
export declare const AuthenticatedUserInformationAccessor: AuthenticatedUserInformationAccessorFactory;
