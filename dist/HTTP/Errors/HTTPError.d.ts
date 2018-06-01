import { AbstractError } from "../../Errors";
import { Error } from "../../LDP/Error";
import { ErrorResponse } from "../../LDP/ErrorResponse";
import { Document } from "../../Document";
import { Response } from "../Response";
export declare class HTTPError extends AbstractError implements ErrorResponse {
    static readonly statusCode: number;
    readonly name: string;
    _id: string;
    _resolved: boolean;
    id: string;
    errors: Error[];
    requestID: string;
    response: Response;
    statusCode: number;
    types: string[];
    isResolved: () => boolean;
    resolve: <T>() => Promise<T & Document>;
    addType: (type: string) => void;
    hasType: (type: string) => boolean;
    removeType: (type: string) => void;
    constructor(message: string, response: Response);
}
