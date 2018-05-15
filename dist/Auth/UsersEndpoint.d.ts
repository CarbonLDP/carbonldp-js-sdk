import { ProtectedDocument } from "../ProtectedDocument";
export interface UsersEndpoint extends ProtectedDocument {
}
export interface UsersEndpointFactory {
    is(value: any): value is UsersEndpoint;
    decorate<T extends object>(object: T): T & UsersEndpoint;
}
export declare const UsersEndpoint: UsersEndpointFactory;
