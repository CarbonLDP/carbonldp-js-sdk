import { Context } from "../Context";
import Authenticator from "./Authenticator";
import * as TokenCredentials from "./TokenCredentials";
import * as UsernameAndPasswordToken from "./UsernameAndPasswordToken";
export declare const TOKEN_CONTAINER: string;
export declare class Class extends Authenticator<UsernameAndPasswordToken.Class, TokenCredentials.Class> {
    protected context: Context;
    protected credentials: TokenCredentials.Class;
    constructor(context: Context);
    isAuthenticated(): boolean;
    authenticate(tokenOrCredentials: UsernameAndPasswordToken.Class | TokenCredentials.Class): Promise<TokenCredentials.Class>;
    protected getHeaderValue(): string;
    private getCredentials(tokenOrCredentials);
}
export default Class;
