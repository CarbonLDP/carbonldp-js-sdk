import { AbstractError } from "../../Errors";
import { CarbonError } from "../../LDP/CarbonError";
import { ErrorResponse } from "../../LDP/ErrorResponse";
import { PersistedDocument } from "../../PersistedDocument";
import { Response } from "../Response";
export declare class HTTPError extends AbstractError implements ErrorResponse {
    static readonly statusCode: number;
    readonly name: string;
    _id: string;
    _resolved: boolean;
    id: string;
    errors: CarbonError[];
    requestID: string;
    response: Response;
    statusCode: number;
    types: string[];
    isResolved: () => boolean;
    resolve: <T>() => Promise<[T & PersistedDocument, Response]>;
    addType: (type: string) => void;
    hasType: (type: string) => boolean;
    removeType: (type: string) => void;
    constructor(message: string, response: Response);
}
