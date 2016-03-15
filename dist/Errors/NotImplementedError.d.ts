import AbstractError from "./AbstractError";
declare class NotImplementedError extends AbstractError {
    name: string;
    constructor(message?: string);
}
export default NotImplementedError;
