import AbstractError from "./AbstractError";
declare class IllegalArgumentError extends AbstractError {
    readonly name: string;
    constructor(message: string);
}
export default IllegalArgumentError;
