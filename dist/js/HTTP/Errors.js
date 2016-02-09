"use strict";

System.register(["./Errors/HTTPError", "./Errors/client/BadRequestError", "./Errors/client/ConflictError", "./Errors/client/ForbiddenError", "./Errors/client/MethodNotAllowedError", "./Errors/client/NotAcceptableError", "./Errors/client/NotFoundError", "./Errors/client/PreconditionFailedError", "./Errors/client/PreconditionRequiredError", "./Errors/client/RequestEntityTooLargeError", "./Errors/client/RequestHeaderFieldsTooLargeError", "./Errors/client/RequestURITooLongError", "./Errors/client/TooManyRequestsError", "./Errors/client/UnauthorizedError", "./Errors/client/UnsupportedMediaTypeError", "./Errors/server/BadResponseError", "./Errors/server/BadGatewayError", "./Errors/server/GatewayTimeoutError", "./Errors/server/HTTPVersionNotSupportedError", "./Errors/server/InternalServerErrorError", "./Errors/server/NotImplementedError", "./Errors/server/ServiceUnavailableError", "./Errors/UnknownError"], function (_export, _context) {
    var HTTPError, BadRequestError, ConflictError, ForbiddenError, MethodNotAllowedError, NotAcceptableError, NotFoundError, PreconditionFailedError, PreconditionRequiredError, RequestEntityTooLargeError, RequestHeaderFieldsTooLargeError, RequestURITooLongError, TooManyRequestsError, UnauthorizedError, UnsupportedMediaTypeError, BadResponseError, BadGatewayError, GatewayTimeoutError, HTTPVersionNotSupportedError, InternalServerErrorError, NotImplementedError, ServiceUnavailableError, UnknownError, client, server, statusCodeMap, i, length, i, length;
    return {
        setters: [function (_ErrorsHTTPError) {
            HTTPError = _ErrorsHTTPError.default;
        }, function (_ErrorsClientBadRequestError) {
            BadRequestError = _ErrorsClientBadRequestError.default;
        }, function (_ErrorsClientConflictError) {
            ConflictError = _ErrorsClientConflictError.default;
        }, function (_ErrorsClientForbiddenError) {
            ForbiddenError = _ErrorsClientForbiddenError.default;
        }, function (_ErrorsClientMethodNotAllowedError) {
            MethodNotAllowedError = _ErrorsClientMethodNotAllowedError.default;
        }, function (_ErrorsClientNotAcceptableError) {
            NotAcceptableError = _ErrorsClientNotAcceptableError.default;
        }, function (_ErrorsClientNotFoundError) {
            NotFoundError = _ErrorsClientNotFoundError.default;
        }, function (_ErrorsClientPreconditionFailedError) {
            PreconditionFailedError = _ErrorsClientPreconditionFailedError.default;
        }, function (_ErrorsClientPreconditionRequiredError) {
            PreconditionRequiredError = _ErrorsClientPreconditionRequiredError.default;
        }, function (_ErrorsClientRequestEntityTooLargeError) {
            RequestEntityTooLargeError = _ErrorsClientRequestEntityTooLargeError.default;
        }, function (_ErrorsClientRequestHeaderFieldsTooLargeError) {
            RequestHeaderFieldsTooLargeError = _ErrorsClientRequestHeaderFieldsTooLargeError.default;
        }, function (_ErrorsClientRequestURITooLongError) {
            RequestURITooLongError = _ErrorsClientRequestURITooLongError.default;
        }, function (_ErrorsClientTooManyRequestsError) {
            TooManyRequestsError = _ErrorsClientTooManyRequestsError.default;
        }, function (_ErrorsClientUnauthorizedError) {
            UnauthorizedError = _ErrorsClientUnauthorizedError.default;
        }, function (_ErrorsClientUnsupportedMediaTypeError) {
            UnsupportedMediaTypeError = _ErrorsClientUnsupportedMediaTypeError.default;
        }, function (_ErrorsServerBadResponseError) {
            BadResponseError = _ErrorsServerBadResponseError.default;
        }, function (_ErrorsServerBadGatewayError) {
            BadGatewayError = _ErrorsServerBadGatewayError.default;
        }, function (_ErrorsServerGatewayTimeoutError) {
            GatewayTimeoutError = _ErrorsServerGatewayTimeoutError.default;
        }, function (_ErrorsServerHTTPVersionNotSupportedError) {
            HTTPVersionNotSupportedError = _ErrorsServerHTTPVersionNotSupportedError.default;
        }, function (_ErrorsServerInternalServerErrorError) {
            InternalServerErrorError = _ErrorsServerInternalServerErrorError.default;
        }, function (_ErrorsServerNotImplementedError) {
            NotImplementedError = _ErrorsServerNotImplementedError.default;
        }, function (_ErrorsServerServiceUnavailableError) {
            ServiceUnavailableError = _ErrorsServerServiceUnavailableError.default;
        }, function (_ErrorsUnknownError) {
            UnknownError = _ErrorsUnknownError.default;
        }],
        execute: function () {
            _export("client", client = []);

            client.push(BadRequestError);
            client.push(ConflictError);
            client.push(ForbiddenError);
            client.push(MethodNotAllowedError);
            client.push(NotAcceptableError);
            client.push(NotFoundError);
            client.push(PreconditionFailedError);
            client.push(PreconditionRequiredError);
            client.push(RequestEntityTooLargeError);
            client.push(RequestHeaderFieldsTooLargeError);
            client.push(RequestURITooLongError);
            client.push(TooManyRequestsError);
            client.push(UnauthorizedError);
            client.push(UnsupportedMediaTypeError);

            _export("server", server = []);

            server.push(BadResponseError);
            server.push(BadGatewayError);
            server.push(GatewayTimeoutError);
            server.push(HTTPVersionNotSupportedError);
            server.push(InternalServerErrorError);
            server.push(NotImplementedError);
            server.push(ServiceUnavailableError);

            _export("statusCodeMap", statusCodeMap = new Map());

            for (i = 0, length = client.length; i < length; i++) {
                statusCodeMap.set(client[i].statusCode, client[i]);
            }

            for (i = 0, length = server.length; i < length; i++) {
                statusCodeMap.set(server[i].statusCode, server[i]);
            }

            _export("Error", HTTPError);

            _export("BadRequestError", BadRequestError);

            _export("ConflictError", ConflictError);

            _export("ForbiddenError", ForbiddenError);

            _export("MethodNotAllowedError", MethodNotAllowedError);

            _export("NotAcceptableError", NotAcceptableError);

            _export("NotFoundError", NotFoundError);

            _export("PreconditionFailedError", PreconditionFailedError);

            _export("PreconditionRequiredError", PreconditionRequiredError);

            _export("RequestEntityTooLargeError", RequestEntityTooLargeError);

            _export("RequestHeaderFieldsTooLargeError", RequestHeaderFieldsTooLargeError);

            _export("RequestURITooLongError", RequestURITooLongError);

            _export("TooManyRequestsError", TooManyRequestsError);

            _export("UnauthorizedError", UnauthorizedError);

            _export("UnsupportedMediaTypeError", UnsupportedMediaTypeError);

            _export("BadResponseError", BadResponseError);

            _export("BadGatewayError", BadGatewayError);

            _export("GatewayTimeoutError", GatewayTimeoutError);

            _export("HTTPVersionNotSupportedError", HTTPVersionNotSupportedError);

            _export("InternalServerErrorError", InternalServerErrorError);

            _export("NotImplementedError", NotImplementedError);

            _export("ServiceUnavailableError", ServiceUnavailableError);

            _export("UnknownError", UnknownError);

            _export("client", client);

            _export("server", server);

            _export("statusCodeMap", statusCodeMap);
        }
    };
});
//# sourceMappingURL=Errors.js.map
