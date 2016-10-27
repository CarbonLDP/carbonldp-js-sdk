import * as Credentials from "./Credentials";
export declare class Class implements Credentials.Class {
    private _username;
    private _password;
    readonly username: string;
    readonly password: string;
    constructor(username: string, password: string);
}
export default Class;
