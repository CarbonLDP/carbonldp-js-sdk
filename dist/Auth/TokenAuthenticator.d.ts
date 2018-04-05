import { Context } from "../Context";
import { Authenticator } from "./Authenticator";
import * as TokenCredentials from "./TokenCredentials";
import { UsernameAndPasswordToken } from "./UsernameAndPasswordToken";
export declare const TOKEN_CONTAINER: string;
export declare class Class extends Authenticator<UsernameAndPasswordToken, TokenCredentials.Class> {
    protected context: Context;
    protected credentials: TokenCredentials.Class;
    constructor(context: Context);
    isAuthenticated(): boolean;
    authenticate(tokenOrCredentials: UsernameAndPasswordToken | TokenCredentials.Class): Promise<TokenCredentials.Class>;
    protected _getHeaderValue(): string;
    private getCredentials(tokenOrCredentials);
}
export default Class;
