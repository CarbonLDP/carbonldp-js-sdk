"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var HTTPError_1 = require("./Errors/HTTPError");
var BadRequestError_1 = require("./Errors/client/BadRequestError");
var ConflictError_1 = require("./Errors/client/ConflictError");
var ForbiddenError_1 = require("./Errors/client/ForbiddenError");
var MethodNotAllowedError_1 = require("./Errors/client/MethodNotAllowedError");
var NotAcceptableError_1 = require("./Errors/client/NotAcceptableError");
var NotFoundError_1 = require("./Errors/client/NotFoundError");
var PreconditionFailedError_1 = require("./Errors/client/PreconditionFailedError");
var PreconditionRequiredError_1 = require("./Errors/client/PreconditionRequiredError");
var RequestEntityTooLargeError_1 = require("./Errors/client/RequestEntityTooLargeError");
var RequestHeaderFieldsTooLargeError_1 = require("./Errors/client/RequestHeaderFieldsTooLargeError");
var RequestURITooLongError_1 = require("./Errors/client/RequestURITooLongError");
var TooManyRequestsError_1 = require("./Errors/client/TooManyRequestsError");
var UnauthorizedError_1 = require("./Errors/client/UnauthorizedError");
var UnsupportedMediaTypeError_1 = require("./Errors/client/UnsupportedMediaTypeError");
var BadResponseError_1 = require("./Errors/server/BadResponseError");
var BadGatewayError_1 = require("./Errors/server/BadGatewayError");
var GatewayTimeoutError_1 = require("./Errors/server/GatewayTimeoutError");
var HTTPVersionNotSupportedError_1 = require("./Errors/server/HTTPVersionNotSupportedError");
var InternalServerErrorError_1 = require("./Errors/server/InternalServerErrorError");
var NotImplementedError_1 = require("./Errors/server/NotImplementedError");
var ServiceUnavailableError_1 = require("./Errors/server/ServiceUnavailableError");
var UnknownError_1 = require("./Errors/UnknownError");
var Errors = require("./Errors");
describe(JasmineExtender_1.module("Carbon/HTTP/Errors"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(Errors).toBeDefined();
        expect(Utils.isObject(Errors)).toBe(true);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Error", "Carbon/HTTP/Errors/HTTPError"), function () {
        expect(Errors.Error).toBeDefined();
        expect(Errors.Error).toBe(HTTPError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "BadRequestError", "Carbon/HTTP/Errors/client/BadRequestError"), function () {
        expect(Errors.BadRequestError).toBeDefined();
        expect(Errors.BadRequestError).toBe(BadRequestError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "ConflictError", "Carbon/HTTP/Errors/client/ConflictError"), function () {
        expect(Errors.ConflictError).toBeDefined();
        expect(Errors.ConflictError).toBe(ConflictError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "ForbiddenError", "Carbon/HTTP/Errors/client/ForbiddenError"), function () {
        expect(Errors.ForbiddenError).toBeDefined();
        expect(Errors.ForbiddenError).toBe(ForbiddenError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "MethodNotAllowedError", "Carbon/HTTP/Errors/client/MethodNotAllowedError"), function () {
        expect(Errors.MethodNotAllowedError).toBeDefined();
        expect(Errors.MethodNotAllowedError).toBe(MethodNotAllowedError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "NotAcceptableError", "Carbon/HTTP/Errors/client/NotAcceptableError"), function () {
        expect(Errors.NotAcceptableError).toBeDefined();
        expect(Errors.NotAcceptableError).toBe(NotAcceptableError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "NotFoundError", "Carbon/HTTP/Errors/client/NotFoundError"), function () {
        expect(Errors.NotFoundError).toBeDefined();
        expect(Errors.NotFoundError).toBe(NotFoundError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "PreconditionFailedError", "Carbon/HTTP/Errors/client/PreconditionFailedError"), function () {
        expect(Errors.PreconditionFailedError).toBeDefined();
        expect(Errors.PreconditionFailedError).toBe(PreconditionFailedError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "PreconditionRequiredError", "Carbon/HTTP/Errors/client/PreconditionRequiredError"), function () {
        expect(Errors.PreconditionRequiredError).toBeDefined();
        expect(Errors.PreconditionRequiredError).toBe(PreconditionRequiredError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "RequestEntityTooLargeError", "Carbon/HTTP/Errors/client/RequestEntityTooLargeError"), function () {
        expect(Errors.RequestEntityTooLargeError).toBeDefined();
        expect(Errors.RequestEntityTooLargeError).toBe(RequestEntityTooLargeError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "RequestHeaderFieldsTooLargeError", "Carbon/HTTP/Errors/client/RequestHeaderFieldsTooLargeError"), function () {
        expect(Errors.RequestHeaderFieldsTooLargeError).toBeDefined();
        expect(Errors.RequestHeaderFieldsTooLargeError).toBe(RequestHeaderFieldsTooLargeError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "RequestURITooLongError", "Carbon/HTTP/Errors/client/RequestURITooLongError"), function () {
        expect(Errors.RequestURITooLongError).toBeDefined();
        expect(Errors.RequestURITooLongError).toBe(RequestURITooLongError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "TooManyRequestsError", "Carbon/HTTP/Errors/client/TooManyRequestsError"), function () {
        expect(Errors.TooManyRequestsError).toBeDefined();
        expect(Errors.TooManyRequestsError).toBe(TooManyRequestsError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "UnauthorizedError", "Carbon/HTTP/Errors/client/UnauthorizedError"), function () {
        expect(Errors.UnauthorizedError).toBeDefined();
        expect(Errors.UnauthorizedError).toBe(UnauthorizedError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "UnsupportedMediaTypeError", "Carbon/HTTP/Errors/client/UnsupportedMediaTypeError"), function () {
        expect(Errors.UnsupportedMediaTypeError).toBeDefined();
        expect(Errors.UnsupportedMediaTypeError).toBe(UnsupportedMediaTypeError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "BadResponseError", "Carbon/HTTP/Errors/client/BadResponseError"), function () {
        expect(Errors.BadResponseError).toBeDefined();
        expect(Errors.BadResponseError).toBe(BadResponseError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "BadGatewayError", "Carbon/HTTP/Errors/client/BadGatewayError"), function () {
        expect(Errors.BadGatewayError).toBeDefined();
        expect(Errors.BadGatewayError).toBe(BadGatewayError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "GatewayTimeoutError", "Carbon/HTTP/Errors/client/GatewayTimeoutError"), function () {
        expect(Errors.GatewayTimeoutError).toBeDefined();
        expect(Errors.GatewayTimeoutError).toBe(GatewayTimeoutError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "HTTPVersionNotSupportedError", "Carbon/HTTP/Errors/client/HTTPVersionNotSupportedError"), function () {
        expect(Errors.HTTPVersionNotSupportedError).toBeDefined();
        expect(Errors.HTTPVersionNotSupportedError).toBe(HTTPVersionNotSupportedError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "InternalServerErrorError", "Carbon/HTTP/Errors/client/InternalServerErrorError"), function () {
        expect(Errors.InternalServerErrorError).toBeDefined();
        expect(Errors.InternalServerErrorError).toBe(InternalServerErrorError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "NotImplementedError", "Carbon/HTTP/Errors/client/NotImplementedError"), function () {
        expect(Errors.NotImplementedError).toBeDefined();
        expect(Errors.NotImplementedError).toBe(NotImplementedError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "ServiceUnavailableError", "Carbon/HTTP/Errors/client/ServiceUnavailableError"), function () {
        expect(Errors.ServiceUnavailableError).toBeDefined();
        expect(Errors.ServiceUnavailableError).toBe(ServiceUnavailableError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "UnknownError", "Carbon/HTTP/Errors/client/UnknownError"), function () {
        expect(Errors.UnknownError).toBeDefined();
        expect(Errors.UnknownError).toBe(UnknownError_1.default);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "client", "Array <Carbon.HTTP.Error.HTTPError>", "Array that contains all the error classes that can be occur because of a client"), function () {
        expect(Errors.client).toBeDefined();
        expect(Utils.isArray(Errors.client)).toBe(true);
        expect(Errors.client.length).toBe(14);
        expect(Errors.client.indexOf(BadRequestError_1.default)).not.toBe(-1);
        expect(Errors.client.indexOf(ConflictError_1.default)).not.toBe(-1);
        expect(Errors.client.indexOf(ForbiddenError_1.default)).not.toBe(-1);
        expect(Errors.client.indexOf(MethodNotAllowedError_1.default)).not.toBe(-1);
        expect(Errors.client.indexOf(NotAcceptableError_1.default)).not.toBe(-1);
        expect(Errors.client.indexOf(NotFoundError_1.default)).not.toBe(-1);
        expect(Errors.client.indexOf(PreconditionFailedError_1.default)).not.toBe(-1);
        expect(Errors.client.indexOf(PreconditionRequiredError_1.default)).not.toBe(-1);
        expect(Errors.client.indexOf(RequestEntityTooLargeError_1.default)).not.toBe(-1);
        expect(Errors.client.indexOf(RequestHeaderFieldsTooLargeError_1.default)).not.toBe(-1);
        expect(Errors.client.indexOf(RequestURITooLongError_1.default)).not.toBe(-1);
        expect(Errors.client.indexOf(TooManyRequestsError_1.default)).not.toBe(-1);
        expect(Errors.client.indexOf(UnauthorizedError_1.default)).not.toBe(-1);
        expect(Errors.client.indexOf(UnsupportedMediaTypeError_1.default)).not.toBe(-1);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "server", "Array <Carbon.HTTP.Error.HTTPError>", "Array that contains all the error classes that can occur because of the server"), function () {
        expect(Errors.server).toBeDefined();
        expect(Utils.isArray(Errors.server)).toBe(true);
        expect(Errors.server.length).toBe(7);
        expect(Errors.server.indexOf(BadResponseError_1.default)).not.toBe(-1);
        expect(Errors.server.indexOf(BadGatewayError_1.default)).not.toBe(-1);
        expect(Errors.server.indexOf(GatewayTimeoutError_1.default)).not.toBe(-1);
        expect(Errors.server.indexOf(HTTPVersionNotSupportedError_1.default)).not.toBe(-1);
        expect(Errors.server.indexOf(InternalServerErrorError_1.default)).not.toBe(-1);
        expect(Errors.server.indexOf(NotImplementedError_1.default)).not.toBe(-1);
        expect(Errors.server.indexOf(ServiceUnavailableError_1.default)).not.toBe(-1);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "statusCodeMap", "Map <number, Carbon.HTTP.Error.HTTPError>", "Map where are assigned the HTTP Status Codes used in the SDK with every error class declared"), function () {
        expect(Errors.statusCodeMap).toBeDefined();
        expect(Utils.isMap(Errors.statusCodeMap)).toBe(true);
        expect(Errors.statusCodeMap.size).toBe(21);
        expect(Errors.statusCodeMap.get(BadRequestError_1.default.statusCode)).toBe(BadRequestError_1.default);
        expect(Errors.statusCodeMap.get(ConflictError_1.default.statusCode)).toBe(ConflictError_1.default);
        expect(Errors.statusCodeMap.get(ForbiddenError_1.default.statusCode)).toBe(ForbiddenError_1.default);
        expect(Errors.statusCodeMap.get(MethodNotAllowedError_1.default.statusCode)).toBe(MethodNotAllowedError_1.default);
        expect(Errors.statusCodeMap.get(NotAcceptableError_1.default.statusCode)).toBe(NotAcceptableError_1.default);
        expect(Errors.statusCodeMap.get(NotFoundError_1.default.statusCode)).toBe(NotFoundError_1.default);
        expect(Errors.statusCodeMap.get(PreconditionFailedError_1.default.statusCode)).toBe(PreconditionFailedError_1.default);
        expect(Errors.statusCodeMap.get(PreconditionRequiredError_1.default.statusCode)).toBe(PreconditionRequiredError_1.default);
        expect(Errors.statusCodeMap.get(RequestEntityTooLargeError_1.default.statusCode)).toBe(RequestEntityTooLargeError_1.default);
        expect(Errors.statusCodeMap.get(RequestHeaderFieldsTooLargeError_1.default.statusCode)).toBe(RequestHeaderFieldsTooLargeError_1.default);
        expect(Errors.statusCodeMap.get(RequestURITooLongError_1.default.statusCode)).toBe(RequestURITooLongError_1.default);
        expect(Errors.statusCodeMap.get(TooManyRequestsError_1.default.statusCode)).toBe(TooManyRequestsError_1.default);
        expect(Errors.statusCodeMap.get(UnauthorizedError_1.default.statusCode)).toBe(UnauthorizedError_1.default);
        expect(Errors.statusCodeMap.get(UnsupportedMediaTypeError_1.default.statusCode)).toBe(UnsupportedMediaTypeError_1.default);
        expect(Errors.statusCodeMap.get(BadResponseError_1.default.statusCode)).toBe(BadResponseError_1.default);
        expect(Errors.statusCodeMap.get(BadGatewayError_1.default.statusCode)).toBe(BadGatewayError_1.default);
        expect(Errors.statusCodeMap.get(GatewayTimeoutError_1.default.statusCode)).toBe(GatewayTimeoutError_1.default);
        expect(Errors.statusCodeMap.get(HTTPVersionNotSupportedError_1.default.statusCode)).toBe(HTTPVersionNotSupportedError_1.default);
        expect(Errors.statusCodeMap.get(InternalServerErrorError_1.default.statusCode)).toBe(InternalServerErrorError_1.default);
        expect(Errors.statusCodeMap.get(NotImplementedError_1.default.statusCode)).toBe(NotImplementedError_1.default);
        expect(Errors.statusCodeMap.get(ServiceUnavailableError_1.default.statusCode)).toBe(ServiceUnavailableError_1.default);
    });
});
