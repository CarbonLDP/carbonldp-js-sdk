import AbstractError from "./../../Errors/AbstractError";
import * as PersistedDocument from "./../../PersistedDocument";
import * as LDP from "./../../LDP";
import Response from "./../Response";
export declare class Class extends AbstractError implements LDP.ErrorResponse.Class {
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
    resolve: <T>() => Promise<[T & PersistedDocument.Class, Response]>;
    addType: (type: string) => void;
    hasType: (type: string) => boolean;
    removeType: (type: string) => void;
    constructor(message: string, response: Response);
}
export default Class;
