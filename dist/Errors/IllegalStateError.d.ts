import { AbstractError } from "./AbstractError";
export declare class IllegalStateError extends AbstractError {
    readonly name: string;
    constructor(message?: string);
}
