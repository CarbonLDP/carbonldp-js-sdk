import AuthenticationToken from "./AuthenticationToken";
export declare class Class implements AuthenticationToken {
    private _username;
    private _password;
    constructor(username: string, password: string);
    username: string;
    password: string;
}
export default Class;
