import * as Credentials from "./Credentials";
export declare class Class implements Credentials.Class {
    private _username;
    private _password;
    username: string;
    password: string;
    constructor(username: string, password: string);
}
export default Class;
