import AbstractError from "./AbstractError";
declare class IllegalStateError extends AbstractError {
    readonly name: string;
    constructor(message?: string);
}
export default IllegalStateError;
