import { DocumentsRegistry } from "../DocumentsRegistry/DocumentsRegistry";
import { HTTPError } from "../HTTP/Errors/HTTPError";
import { ResolvablePointer } from "../Repository/ResolvablePointer";
export declare function _parseURIParams<T>(this: void, resource: ResolvablePointer, uri?: string | T, args?: IArguments): {
    _uri: string;
    _args: any[];
};
export declare function _parseResourceParams<T>(this: void, resource: ResolvablePointer, $resource?: ResolvablePointer | T, args?: IArguments): {
    _resource: ResolvablePointer;
    _args: any[];
};
export declare function _getErrorResponseParserFn(this: void, registry: DocumentsRegistry): (error: HTTPError | Error) => Promise<never>;
