var BadRequestError_1 = require('./Errors/client/BadRequestError');
exports.BadRequestError = BadRequestError_1.default;
var ConflictError_1 = require('./Errors/client/ConflictError');
exports.ConflictError = ConflictError_1.default;
var ForbiddenError_1 = require('./Errors/client/ForbiddenError');
exports.ForbiddenError = ForbiddenError_1.default;
var MethodNotAllowedError_1 = require('./Errors/client/MethodNotAllowedError');
exports.MethodNotAllowedError = MethodNotAllowedError_1.default;
var NotAcceptableError_1 = require('./Errors/client/NotAcceptableError');
exports.NotAcceptableError = NotAcceptableError_1.default;
var NotFoundError_1 = require('./Errors/client/NotFoundError');
exports.NotFoundError = NotFoundError_1.default;
var PreconditionFailedError_1 = require('./Errors/client/PreconditionFailedError');
exports.PreconditionFailedError = PreconditionFailedError_1.default;
var PreconditionRequiredError_1 = require('./Errors/client/PreconditionRequiredError');
exports.PreconditionRequiredError = PreconditionRequiredError_1.default;
var RequestEntityTooLargeError_1 = require('./Errors/client/RequestEntityTooLargeError');
exports.RequestEntityTooLargeError = RequestEntityTooLargeError_1.default;
var RequestHeaderFieldsTooLargeError_1 = require('./Errors/client/RequestHeaderFieldsTooLargeError');
exports.RequestHeaderFieldsTooLargeError = RequestHeaderFieldsTooLargeError_1.default;
var RequestURITooLongError_1 = require('./Errors/client/RequestURITooLongError');
exports.RequestURITooLongError = RequestURITooLongError_1.default;
var TooManyRequestsError_1 = require('./Errors/client/TooManyRequestsError');
exports.TooManyRequestsError = TooManyRequestsError_1.default;
var UnauthorizedError_1 = require('./Errors/client/UnauthorizedError');
exports.UnauthorizedError = UnauthorizedError_1.default;
var UnsupportedMediaTypeError_1 = require('./Errors/client/UnsupportedMediaTypeError');
exports.UnsupportedMediaTypeError = UnsupportedMediaTypeError_1.default;
var BadGatewayError_1 = require('./Errors/server/BadGatewayError');
exports.BadGatewayError = BadGatewayError_1.default;
var GatewayTimeoutError_1 = require('./Errors/server/GatewayTimeoutError');
exports.GatewayTimeoutError = GatewayTimeoutError_1.default;
var HTTPVersionNotSupportedError_1 = require('./Errors/server/HTTPVersionNotSupportedError');
exports.HTTPVersionNotSupportedError = HTTPVersionNotSupportedError_1.default;
var InternalServerErrorError_1 = require('./Errors/server/InternalServerErrorError');
exports.InternalServerErrorError = InternalServerErrorError_1.default;
var NotImplementedError_1 = require('./Errors/server/NotImplementedError');
exports.NotImplementedError = NotImplementedError_1.default;
var ServiceUnavailableError_1 = require('./Errors/server/ServiceUnavailableError');
exports.ServiceUnavailableError = ServiceUnavailableError_1.default;
var UnknownError_1 = require('./Errors/UnknownError');
exports.UnknownError = UnknownError_1.default;
var client = [];
exports.client = client;
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
var server = [];
exports.server = server;
server.push(BadGatewayError_1.default);
server.push(GatewayTimeoutError_1.default);
server.push(HTTPVersionNotSupportedError_1.default);
server.push(InternalServerErrorError_1.default);
server.push(NotImplementedError_1.default);
server.push(ServiceUnavailableError_1.default);
var statusCodeMap = new Map();
exports.statusCodeMap = statusCodeMap;
for (var i = 0, length_1 = client.length; i < length_1; i++) {
    statusCodeMap.set(client[i].statusCode, client[i]);
}
for (var i = 0, length_2 = server.length; i < length_2; i++) {
    statusCodeMap.set(server[i].statusCode, server[i]);
}
//@formatter:off
//@formatter:on 

//# sourceMappingURL=Errors.js.map
