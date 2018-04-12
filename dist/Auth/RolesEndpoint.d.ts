import { Documents } from "../Documents";
import { PersistedProtectedDocument } from "../PersistedProtectedDocument";
export interface RolesEndpoint extends PersistedProtectedDocument {
}
export interface RolesEndpointFactory {
    is(value: any): value is RolesEndpoint;
    decorate<T extends object>(object: T, documents: Documents): T & RolesEndpoint;
}
export declare const RolesEndpoint: RolesEndpointFactory;
