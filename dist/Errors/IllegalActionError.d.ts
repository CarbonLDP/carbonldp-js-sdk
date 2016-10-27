import AbstractError from "./AbstractError";
declare class IllegalActionError extends AbstractError {
    readonly name: string;
}
export default IllegalActionError;
