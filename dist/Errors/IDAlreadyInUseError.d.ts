import AbstractError from "./AbstractError";
declare class IDAlreadyInUseError extends AbstractError {
    readonly name: string;
}
export default IDAlreadyInUseError;
