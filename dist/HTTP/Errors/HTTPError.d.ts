import { AbstractError } from "../../Errors";
import { Response } from "../Response";
import * as LDP from "../../LDP";
import { PersistedDocument } from "./../../PersistedDocument";
export declare class HTTPError extends AbstractError implements LDP.ErrorResponse.Class {
    static readonly statusCode: number;
    readonly name: string;
    _id: string;
    _resolved: boolean;
    id: string;
    errors: LDP.Error.Class[];
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
export default HTTPError;
