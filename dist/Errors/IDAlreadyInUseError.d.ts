import AbstractError from "./AbstractError";
export declare class Class extends AbstractError {
    readonly name: string;
    constructor(message: string);
}
export default Class;
