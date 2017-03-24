import AbstractError from "./AbstractError";
export declare class IDAlreadyInUseError extends AbstractError {
    readonly name: string;
    constructor(message: string);
}
export default IDAlreadyInUseError;
