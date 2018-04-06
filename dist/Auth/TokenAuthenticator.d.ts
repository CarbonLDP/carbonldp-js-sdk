import { Response } from "../HTTP/Response";
import { Authenticator } from "./Authenticator";
import * as TokenCredentials from "./TokenCredentials";
import { UserMetadata } from "./UserMetadata";
import { UsernameAndPasswordToken } from "./UsernameAndPasswordToken";
export declare class TokenAuthenticator extends Authenticator<UsernameAndPasswordToken, TokenCredentials.Class> {
    protected credentials: TokenCredentials.Class;
    isAuthenticated(): boolean;
    authenticate(tokenOrCredentials: UsernameAndPasswordToken | TokenCredentials.Class): Promise<TokenCredentials.Class>;
    protected _getHeaderValue(): string;
    protected _parseRawCredentials(credentials: TokenCredentials.Class): Promise<TokenCredentials.Class>;
    protected _getCredentials(token: UsernameAndPasswordToken): Promise<TokenCredentials.Class>;
    protected _parseRDFMetadata(rdfData: object[], response: Response): UserMetadata;
    protected _parseRDFCredentials(rdfData: object[], response: Response): TokenCredentials.Class;
}
