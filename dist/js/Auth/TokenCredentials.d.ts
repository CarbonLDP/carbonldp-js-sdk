import * as Credentials from "./Credentials";
import * as Token from "./Token";
export declare class Class implements Credentials.Class {
    private _token;
    token: Token.Class;
    constructor(token: Token.Class);
}
export default Class;
