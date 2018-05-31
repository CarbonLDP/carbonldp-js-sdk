import { ObjectSchema } from "../ObjectSchema";
import { ProtectedDocument } from "../ProtectedDocument";
import { CS } from "../Vocabularies";
import { AuthenticatedUserMetadata } from "./AuthenticatedUserMetadata";
export interface AuthenticatedUserInformationAccessor extends ProtectedDocument {
    authenticatedUserMetadata: AuthenticatedUserMetadata;
}
export interface AuthenticatedUserInformationAccessorFactory {
    TYPE: CS["AuthenticatedUserInformationAccessor"];
    SCHEMA: ObjectSchema;
}
export declare const AuthenticatedUserInformationAccessor: AuthenticatedUserInformationAccessorFactory;
