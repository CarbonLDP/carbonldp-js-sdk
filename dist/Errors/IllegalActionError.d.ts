import AbstractError from "./AbstractError";
declare class IllegalActionError extends AbstractError {
    readonly name: string;
    constructor(message: string);
}
export default IllegalActionError;
