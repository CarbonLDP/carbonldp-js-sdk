import AbstractError from "./AbstractError";
declare class IllegalStateError extends AbstractError {
    name: string;
    constructor(message?: string);
}
export default IllegalStateError;
