System.register(["./Errors/HTTPError", "./Errors/client/BadRequestError", "./Errors/client/ConflictError", "./Errors/client/ForbiddenError", "./Errors/client/MethodNotAllowedError", "./Errors/client/NotAcceptableError", "./Errors/client/NotFoundError", "./Errors/client/PreconditionFailedError", "./Errors/client/PreconditionRequiredError", "./Errors/client/RequestEntityTooLargeError", "./Errors/client/RequestHeaderFieldsTooLargeError", "./Errors/client/RequestURITooLongError", "./Errors/client/TooManyRequestsError", "./Errors/client/UnauthorizedError", "./Errors/client/UnsupportedMediaTypeError", "./Errors/server/BadResponseError", "./Errors/server/BadGatewayError", "./Errors/server/GatewayTimeoutError", "./Errors/server/HTTPVersionNotSupportedError", "./Errors/server/InternalServerError", "./Errors/server/NotImplementedError", "./Errors/server/ServiceUnavailableError", "./Errors/UnknownError"], function(exports_1) {
    var HTTPError_1, BadRequestError_1, ConflictError_1, ForbiddenError_1, MethodNotAllowedError_1, NotAcceptableError_1, NotFoundError_1, PreconditionFailedError_1, PreconditionRequiredError_1, RequestEntityTooLargeError_1, RequestHeaderFieldsTooLargeError_1, RequestURITooLongError_1, TooManyRequestsError_1, UnauthorizedError_1, UnsupportedMediaTypeError_1, BadResponseError_1, BadGatewayError_1, GatewayTimeoutError_1, HTTPVersionNotSupportedError_1, InternalServerError_1, NotImplementedError_1, ServiceUnavailableError_1, UnknownError_1;
    var client, server, statusCodeMap;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            },
            function (BadRequestError_1_1) {
                BadRequestError_1 = BadRequestError_1_1;
            },
            function (ConflictError_1_1) {
                ConflictError_1 = ConflictError_1_1;
            },
            function (ForbiddenError_1_1) {
                ForbiddenError_1 = ForbiddenError_1_1;
            },
            function (MethodNotAllowedError_1_1) {
                MethodNotAllowedError_1 = MethodNotAllowedError_1_1;
            },
            function (NotAcceptableError_1_1) {
                NotAcceptableError_1 = NotAcceptableError_1_1;
            },
            function (NotFoundError_1_1) {
                NotFoundError_1 = NotFoundError_1_1;
            },
            function (PreconditionFailedError_1_1) {
                PreconditionFailedError_1 = PreconditionFailedError_1_1;
            },
            function (PreconditionRequiredError_1_1) {
                PreconditionRequiredError_1 = PreconditionRequiredError_1_1;
            },
            function (RequestEntityTooLargeError_1_1) {
                RequestEntityTooLargeError_1 = RequestEntityTooLargeError_1_1;
            },
            function (RequestHeaderFieldsTooLargeError_1_1) {
                RequestHeaderFieldsTooLargeError_1 = RequestHeaderFieldsTooLargeError_1_1;
            },
            function (RequestURITooLongError_1_1) {
                RequestURITooLongError_1 = RequestURITooLongError_1_1;
            },
            function (TooManyRequestsError_1_1) {
                TooManyRequestsError_1 = TooManyRequestsError_1_1;
            },
            function (UnauthorizedError_1_1) {
                UnauthorizedError_1 = UnauthorizedError_1_1;
            },
            function (UnsupportedMediaTypeError_1_1) {
                UnsupportedMediaTypeError_1 = UnsupportedMediaTypeError_1_1;
            },
            function (BadResponseError_1_1) {
                BadResponseError_1 = BadResponseError_1_1;
            },
            function (BadGatewayError_1_1) {
                BadGatewayError_1 = BadGatewayError_1_1;
            },
            function (GatewayTimeoutError_1_1) {
                GatewayTimeoutError_1 = GatewayTimeoutError_1_1;
            },
            function (HTTPVersionNotSupportedError_1_1) {
                HTTPVersionNotSupportedError_1 = HTTPVersionNotSupportedError_1_1;
            },
            function (InternalServerError_1_1) {
                InternalServerError_1 = InternalServerError_1_1;
            },
            function (NotImplementedError_1_1) {
                NotImplementedError_1 = NotImplementedError_1_1;
            },
            function (ServiceUnavailableError_1_1) {
                ServiceUnavailableError_1 = ServiceUnavailableError_1_1;
            },
            function (UnknownError_1_1) {
                UnknownError_1 = UnknownError_1_1;
            }],
        execute: function() {
            client = [];
            client.push(BadRequestError_1.default);
            client.push(ConflictError_1.default);
            client.push(ForbiddenError_1.default);
            client.push(MethodNotAllowedError_1.default);
            client.push(NotAcceptableError_1.default);
            client.push(NotFoundError_1.default);
            client.push(PreconditionFailedError_1.default);
            client.push(PreconditionRequiredError_1.default);
            client.push(RequestEntityTooLargeError_1.default);
            client.push(RequestHeaderFieldsTooLargeError_1.default);
            client.push(RequestURITooLongError_1.default);
            client.push(TooManyRequestsError_1.default);
            client.push(UnauthorizedError_1.default);
            client.push(UnsupportedMediaTypeError_1.default);
            server = [];
            server.push(BadResponseError_1.default);
            server.push(BadGatewayError_1.default);
            server.push(GatewayTimeoutError_1.default);
            server.push(HTTPVersionNotSupportedError_1.default);
            server.push(InternalServerError_1.default);
            server.push(NotImplementedError_1.default);
            server.push(ServiceUnavailableError_1.default);
            statusCodeMap = new Map();
            for (var i = 0, length_1 = client.length; i < length_1; i++) {
                statusCodeMap.set(client[i].statusCode, client[i]);
            }
            for (var i = 0, length_2 = server.length; i < length_2; i++) {
                statusCodeMap.set(server[i].statusCode, server[i]);
            }
            exports_1("Error", HTTPError_1.default);
            exports_1("BadRequestError", BadRequestError_1.default);
            exports_1("ConflictError", ConflictError_1.default);
            exports_1("ForbiddenError", ForbiddenError_1.default);
            exports_1("MethodNotAllowedError", MethodNotAllowedError_1.default);
            exports_1("NotAcceptableError", NotAcceptableError_1.default);
            exports_1("NotFoundError", NotFoundError_1.default);
            exports_1("PreconditionFailedError", PreconditionFailedError_1.default);
            exports_1("PreconditionRequiredError", PreconditionRequiredError_1.default);
            exports_1("RequestEntityTooLargeError", RequestEntityTooLargeError_1.default);
            exports_1("RequestHeaderFieldsTooLargeError", RequestHeaderFieldsTooLargeError_1.default);
            exports_1("RequestURITooLongError", RequestURITooLongError_1.default);
            exports_1("TooManyRequestsError", TooManyRequestsError_1.default);
            exports_1("UnauthorizedError", UnauthorizedError_1.default);
            exports_1("UnsupportedMediaTypeError", UnsupportedMediaTypeError_1.default);
            exports_1("BadResponseError", BadResponseError_1.default);
            exports_1("BadGatewayError", BadGatewayError_1.default);
            exports_1("GatewayTimeoutError", GatewayTimeoutError_1.default);
            exports_1("HTTPVersionNotSupportedError", HTTPVersionNotSupportedError_1.default);
            exports_1("InternalServerError", InternalServerError_1.default);
            exports_1("NotImplementedError", NotImplementedError_1.default);
            exports_1("ServiceUnavailableError", ServiceUnavailableError_1.default);
            exports_1("UnknownError", UnknownError_1.default);
            exports_1("client", client);
            exports_1("server", server);
            exports_1("statusCodeMap", statusCodeMap);
        }
    }
});

//# sourceMappingURL=Errors.js.map
