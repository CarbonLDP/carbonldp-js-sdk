import { Documents } from "../Documents";
import { PersistedProtectedDocument } from "../PersistedProtectedDocument";
export declare type NewRole = {
    name: string;
    description?: string;
};
export interface RolesEndpoint extends PersistedProtectedDocument {
}
export interface RolesEndpointFactory {
    is(value: any): value is RolesEndpoint;
    decorate<T extends object>(object: T, documents: Documents): T & RolesEndpoint;
}
export declare const RolesEndpoint: RolesEndpointFactory;
