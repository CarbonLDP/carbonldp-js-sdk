import AbstractError from "./AbstractError";
declare class IDAlreadyInUseError extends AbstractError {
    name: string;
}
export default IDAlreadyInUseError;
