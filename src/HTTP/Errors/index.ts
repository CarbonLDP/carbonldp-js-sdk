import { HTTPError } from "./HTTPError";

export * from "./ClientErrors/BadRequestError";
export * from "./ClientErrors/ConflictError";
export * from "./ClientErrors/ForbiddenError";
export * from "./ClientErrors/MethodNotAllowedError";
export * from "./ClientErrors/NotAcceptableError";
export * from "./ClientErrors/NotFoundError";
export * from "./ClientErrors/PreconditionFailedError";
export * from "./ClientErrors/PreconditionRequiredError";
export * from "./ClientErrors/RequestEntityTooLargeError";
export * from "./ClientErrors/RequestHeaderFieldsTooLargeError";
export * from "./ClientErrors/RequestURITooLongError";
export * from "./ClientErrors/TooManyRequestsError";
export * from "./ClientErrors/UnauthorizedError";
export * from "./ClientErrors/UnsupportedMediaTypeError";

export * from "./ServerErrors/BadResponseError";
export * from "./ServerErrors/BadGatewayError";
export * from "./ServerErrors/GatewayTimeoutError";
export * from "./ServerErrors/HTTPVersionNotSupportedError";
export * from "./ServerErrors/InternalServerErrorError";
export * from "./ServerErrors/NotImplementedError";
export * from "./ServerErrors/ServiceUnavailableError";

export * from "./HTTPError";
export * from "./UnknownError";

/**
 * Map where all the HTTP Status Codes used in the SDK are assigned to their specific error class.
 */
export const statusCodeMap:Map<number, typeof HTTPError> = new Map<number, typeof HTTPError>();

