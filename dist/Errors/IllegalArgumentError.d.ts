import AbstractError from "./AbstractError";
declare class IllegalArgumentError extends AbstractError {
    readonly name: string;
}
export default IllegalArgumentError;
