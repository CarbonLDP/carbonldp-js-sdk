declare abstract class AbstractError extends Error {
    message: string;
    name: string;
    constructor(message: string);
    toString(): string;
}
export default AbstractError;
