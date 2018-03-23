export declare abstract class AbstractError extends Error {
    message: string;
    readonly name: string;
    constructor(message: string);
}
