import { Documents } from "../Documents";
import { Endpoint } from "../Endpoint";
import { RequestOptions } from "../HTTP";
import { ModelDecorator } from "../ModelDecorator";
import { CS } from "../Vocabularies";
import { PersistedUser } from "./PersistedUser";
import { User, UserBase } from "./User";
export interface UsersEndpoint extends Endpoint<UserBase, User, PersistedUser> {
    enable(userURI: string, requestOptions?: RequestOptions): Promise<PersistedUser>;
    disable(userURI: string, requestOptions?: RequestOptions): Promise<PersistedUser>;
}
export interface UsersEndpointFactory extends ModelDecorator<UsersEndpoint> {
    TYPE: CS["Users"];
    isDecorated(object: object): object is UsersEndpoint;
    decorate<T extends object>(object: T, documents: Documents): T & UsersEndpoint;
}
export declare const UsersEndpoint: UsersEndpointFactory;
