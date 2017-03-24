import AbstractError from "./AbstractError";
export declare class NotImplementedError extends AbstractError {
    readonly name: string;
    constructor(message?: string);
}
export default NotImplementedError;
