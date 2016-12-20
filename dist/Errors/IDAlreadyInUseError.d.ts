import AbstractError from "./AbstractError";
declare class IDAlreadyInUseError extends AbstractError {
    readonly name: string;
    constructor(message: string);
}
export default IDAlreadyInUseError;
