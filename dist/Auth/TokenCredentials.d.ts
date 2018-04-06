import { VolatileResource } from "../LDP";
import { ObjectSchema } from "../ObjectSchema";
import { CS } from "../Vocabularies/CS";
export interface TokenCredentialsBase {
    token: string;
    expiresOn: string | Date;
}
export interface TokenCredentialsBaseFactory {
    is(value: any): value is TokenCredentialsBase;
}
export declare const TokenCredentialsBase: TokenCredentialsBaseFactory;
export interface TokenCredentials extends VolatileResource {
    token: string;
    expiresOn: Date;
}
export interface TokenCredentialsFactory {
    TYPE: CS["TokenCredentials"];
    SCHEMA: ObjectSchema;
    is(value: any): value is TokenCredentials;
    createFrom<T extends TokenCredentialsBase>(object: T): T & TokenCredentials;
}
export declare const TokenCredentials: TokenCredentialsFactory;
