import * as Context from "../Context";
import * as HTTP from "./../HTTP";
import Authenticator from "./Authenticator";
import * as TokenCredentials from "./TokenCredentials";
import * as UsernameAndPasswordToken from "./UsernameAndPasswordToken";
export declare const TOKEN_CONTAINER: string;
export declare class Class extends Authenticator<UsernameAndPasswordToken.Class, TokenCredentials.Class> {
    protected context: Context.Class;
    protected credentials: TokenCredentials.Class;
    constructor(context: Context.Class);
    isAuthenticated(): boolean;
    authenticate(tokenOrCredentials: UsernameAndPasswordToken.Class | TokenCredentials.Class): Promise<TokenCredentials.Class>;
    protected getHeaderValue(): HTTP.Header.Value;
    private getCredentials(tokenOrCredentials);
}
export default Class;
