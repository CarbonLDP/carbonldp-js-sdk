"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var StatusCode_1 = require("./StatusCode");
describe(JasmineExtender_1.module("Carbon/HTTP/StatusCode"), function () {
    describe(JasmineExtender_1.enumeration("Carbon.HTTP.Method", "Enum with the HTTP/1.1 methods"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(StatusCode_1.default).toBeDefined();
            expect(Utils.isObject(StatusCode_1.default)).toBe(true);
            expect(Object.keys(StatusCode_1.default).length).toBe(40 * 2);
        });
        it(JasmineExtender_1.hasEnumeral("CONTINUE", "Enum that identifies the HTTP/1.1 100 status code"), function () {
            expect(StatusCode_1.default.CONTINUE).toBeDefined();
            expect(StatusCode_1.default.CONTINUE).toBe(100);
            expect(StatusCode_1.default[100]).toBe("CONTINUE");
        });
        it(JasmineExtender_1.hasEnumeral("OK", "Enum that identifies the HTTP/1.1 200 status code"), function () {
            expect(StatusCode_1.default.OK).toBeDefined();
            expect(StatusCode_1.default.OK).toBe(200);
            expect(StatusCode_1.default[200]).toBe("OK");
        });
        it(JasmineExtender_1.hasEnumeral("CREATED", "Enum that identifies the HTTP/1.1 201 status code"), function () {
            expect(StatusCode_1.default.CREATED).toBeDefined();
            expect(StatusCode_1.default.CREATED).toBe(201);
            expect(StatusCode_1.default[201]).toBe("CREATED");
        });
        it(JasmineExtender_1.hasEnumeral("ACCEPTED", "Enum that identifies the HTTP/1.1 202 status code"), function () {
            expect(StatusCode_1.default.ACCEPTED).toBeDefined();
            expect(StatusCode_1.default.ACCEPTED).toBe(202);
            expect(StatusCode_1.default[202]).toBe("ACCEPTED");
        });
        it(JasmineExtender_1.hasEnumeral("NON_AUTHORITATIVE_INFORMATION", "Enum that identifies the HTTP/1.1 203 status code"), function () {
            expect(StatusCode_1.default.NON_AUTHORITATIVE_INFORMATION).toBeDefined();
            expect(StatusCode_1.default.NON_AUTHORITATIVE_INFORMATION).toBe(203);
            expect(StatusCode_1.default[203]).toBe("NON_AUTHORITATIVE_INFORMATION");
        });
        it(JasmineExtender_1.hasEnumeral("NO_CONTENT", "Enum that identifies the HTTP/1.1 204 status code"), function () {
            expect(StatusCode_1.default.NO_CONTENT).toBeDefined();
            expect(StatusCode_1.default.NO_CONTENT).toBe(204);
            expect(StatusCode_1.default[204]).toBe("NO_CONTENT");
        });
        it(JasmineExtender_1.hasEnumeral("RESET_CONTENT", "Enum that identifies the HTTP/1.1 205 status code"), function () {
            expect(StatusCode_1.default.RESET_CONTENT).toBeDefined();
            expect(StatusCode_1.default.RESET_CONTENT).toBe(205);
            expect(StatusCode_1.default[205]).toBe("RESET_CONTENT");
        });
        it(JasmineExtender_1.hasEnumeral("PARTIAL_CONTENT", "Enum that identifies the HTTP/1.1 206 status code"), function () {
            expect(StatusCode_1.default.PARTIAL_CONTENT).toBeDefined();
            expect(StatusCode_1.default.PARTIAL_CONTENT).toBe(206);
            expect(StatusCode_1.default[206]).toBe("PARTIAL_CONTENT");
        });
        it(JasmineExtender_1.hasEnumeral("MULTIPLE_CHOICES", "Enum that identifies the HTTP/1.1 300 status code"), function () {
            expect(StatusCode_1.default.MULTIPLE_CHOICES).toBeDefined();
            expect(StatusCode_1.default.MULTIPLE_CHOICES).toBe(300);
            expect(StatusCode_1.default[300]).toBe("MULTIPLE_CHOICES");
        });
        it(JasmineExtender_1.hasEnumeral("MOVED_PERMANENTLY", "Enum that identifies the HTTP/1.1 301 status code"), function () {
            expect(StatusCode_1.default.MOVED_PERMANENTLY).toBeDefined();
            expect(StatusCode_1.default.MOVED_PERMANENTLY).toBe(301);
            expect(StatusCode_1.default[301]).toBe("MOVED_PERMANENTLY");
        });
        it(JasmineExtender_1.hasEnumeral("FOUND", "Enum that identifies the HTTP/1.1 302 status code"), function () {
            expect(StatusCode_1.default.FOUND).toBeDefined();
            expect(StatusCode_1.default.FOUND).toBe(302);
            expect(StatusCode_1.default[302]).toBe("FOUND");
        });
        it(JasmineExtender_1.hasEnumeral("SEE_OTHER", "Enum that identifies the HTTP/1.1 303 status code"), function () {
            expect(StatusCode_1.default.SEE_OTHER).toBeDefined();
            expect(StatusCode_1.default.SEE_OTHER).toBe(303);
            expect(StatusCode_1.default[303]).toBe("SEE_OTHER");
        });
        it(JasmineExtender_1.hasEnumeral("NOT_MODIFIED", "Enum that identifies the HTTP/1.1 304 status code"), function () {
            expect(StatusCode_1.default.NOT_MODIFIED).toBeDefined();
            expect(StatusCode_1.default.NOT_MODIFIED).toBe(304);
            expect(StatusCode_1.default[304]).toBe("NOT_MODIFIED");
        });
        it(JasmineExtender_1.hasEnumeral("USE_PROXY", "Enum that identifies the HTTP/1.1 305 status code"), function () {
            expect(StatusCode_1.default.USE_PROXY).toBeDefined();
            expect(StatusCode_1.default.USE_PROXY).toBe(305);
            expect(StatusCode_1.default[305]).toBe("USE_PROXY");
        });
        it(JasmineExtender_1.hasEnumeral("TEMPORARY_REDIRECT", "Enum that identifies the HTTP/1.1 307 status code"), function () {
            expect(StatusCode_1.default.TEMPORARY_REDIRECT).toBeDefined();
            expect(StatusCode_1.default.TEMPORARY_REDIRECT).toBe(307);
            expect(StatusCode_1.default[307]).toBe("TEMPORARY_REDIRECT");
        });
        it(JasmineExtender_1.hasEnumeral("BAD_REQUEST", "Enum that identifies the HTTP/1.1 400 status code"), function () {
            expect(StatusCode_1.default.BAD_REQUEST).toBeDefined();
            expect(StatusCode_1.default.BAD_REQUEST).toBe(400);
            expect(StatusCode_1.default[400]).toBe("BAD_REQUEST");
        });
        it(JasmineExtender_1.hasEnumeral("UNAUTHORIZED", "Enum that identifies the HTTP/1.1 401 status code"), function () {
            expect(StatusCode_1.default.UNAUTHORIZED).toBeDefined();
            expect(StatusCode_1.default.UNAUTHORIZED).toBe(401);
            expect(StatusCode_1.default[401]).toBe("UNAUTHORIZED");
        });
        it(JasmineExtender_1.hasEnumeral("PAYMENT_REQUIRED", "Enum that identifies the HTTP/1.1 402 status code"), function () {
            expect(StatusCode_1.default.PAYMENT_REQUIRED).toBeDefined();
            expect(StatusCode_1.default.PAYMENT_REQUIRED).toBe(402);
            expect(StatusCode_1.default[402]).toBe("PAYMENT_REQUIRED");
        });
        it(JasmineExtender_1.hasEnumeral("FORBIDDEN", "Enum that identifies the HTTP/1.1 403 status code"), function () {
            expect(StatusCode_1.default.FORBIDDEN).toBeDefined();
            expect(StatusCode_1.default.FORBIDDEN).toBe(403);
            expect(StatusCode_1.default[403]).toBe("FORBIDDEN");
        });
        it(JasmineExtender_1.hasEnumeral("NOT_FOUND", "Enum that identifies the HTTP/1.1 404 status code"), function () {
            expect(StatusCode_1.default.NOT_FOUND).toBeDefined();
            expect(StatusCode_1.default.NOT_FOUND).toBe(404);
            expect(StatusCode_1.default[404]).toBe("NOT_FOUND");
        });
        it(JasmineExtender_1.hasEnumeral("METHOD_NOT_ALLOWED", "Enum that identifies the HTTP/1.1 405 status code"), function () {
            expect(StatusCode_1.default.METHOD_NOT_ALLOWED).toBeDefined();
            expect(StatusCode_1.default.METHOD_NOT_ALLOWED).toBe(405);
            expect(StatusCode_1.default[405]).toBe("METHOD_NOT_ALLOWED");
        });
        it(JasmineExtender_1.hasEnumeral("NOT_ACCEPTABLE", "Enum that identifies the HTTP/1.1 406 status code"), function () {
            expect(StatusCode_1.default.NOT_ACCEPTABLE).toBeDefined();
            expect(StatusCode_1.default.NOT_ACCEPTABLE).toBe(406);
            expect(StatusCode_1.default[406]).toBe("NOT_ACCEPTABLE");
        });
        it(JasmineExtender_1.hasEnumeral("PROXY_AUTHENTICATION_REQUIRED", "Enum that identifies the HTTP/1.1 407 status code"), function () {
            expect(StatusCode_1.default.PROXY_AUTHENTICATION_REQUIRED).toBeDefined();
            expect(StatusCode_1.default.PROXY_AUTHENTICATION_REQUIRED).toBe(407);
            expect(StatusCode_1.default[407]).toBe("PROXY_AUTHENTICATION_REQUIRED");
        });
        it(JasmineExtender_1.hasEnumeral("REQUEST_TIME_OUT", "Enum that identifies the HTTP/1.1 408 status code"), function () {
            expect(StatusCode_1.default.REQUEST_TIME_OUT).toBeDefined();
            expect(StatusCode_1.default.REQUEST_TIME_OUT).toBe(408);
            expect(StatusCode_1.default[408]).toBe("REQUEST_TIME_OUT");
        });
        it(JasmineExtender_1.hasEnumeral("CONFLICT", "Enum that identifies the HTTP/1.1 409 status code"), function () {
            expect(StatusCode_1.default.CONFLICT).toBeDefined();
            expect(StatusCode_1.default.CONFLICT).toBe(409);
            expect(StatusCode_1.default[409]).toBe("CONFLICT");
        });
        it(JasmineExtender_1.hasEnumeral("GONE", "Enum that identifies the HTTP/1.1 410 status code"), function () {
            expect(StatusCode_1.default.GONE).toBeDefined();
            expect(StatusCode_1.default.GONE).toBe(410);
            expect(StatusCode_1.default[410]).toBe("GONE");
        });
        it(JasmineExtender_1.hasEnumeral("LENGTH_REQUIRED", "Enum that identifies the HTTP/1.1 411 status code"), function () {
            expect(StatusCode_1.default.LENGTH_REQUIRED).toBeDefined();
            expect(StatusCode_1.default.LENGTH_REQUIRED).toBe(411);
            expect(StatusCode_1.default[411]).toBe("LENGTH_REQUIRED");
        });
        it(JasmineExtender_1.hasEnumeral("PRECONDITION_FAILED", "Enum that identifies the HTTP/1.1 412 status code"), function () {
            expect(StatusCode_1.default.PRECONDITION_FAILED).toBeDefined();
            expect(StatusCode_1.default.PRECONDITION_FAILED).toBe(412);
            expect(StatusCode_1.default[412]).toBe("PRECONDITION_FAILED");
        });
        it(JasmineExtender_1.hasEnumeral("REQUEST_ENTITY_TOO_LARGE", "Enum that identifies the HTTP/1.1 413 status code"), function () {
            expect(StatusCode_1.default.REQUEST_ENTITY_TOO_LARGE).toBeDefined();
            expect(StatusCode_1.default.REQUEST_ENTITY_TOO_LARGE).toBe(413);
            expect(StatusCode_1.default[413]).toBe("REQUEST_ENTITY_TOO_LARGE");
        });
        it(JasmineExtender_1.hasEnumeral("REQUEST_URI_TOO_LARGE", "Enum that identifies the HTTP/1.1 414 status code"), function () {
            expect(StatusCode_1.default.REQUEST_URI_TOO_LARGE).toBeDefined();
            expect(StatusCode_1.default.REQUEST_URI_TOO_LARGE).toBe(414);
            expect(StatusCode_1.default[414]).toBe("REQUEST_URI_TOO_LARGE");
        });
        it(JasmineExtender_1.hasEnumeral("UNSUPPORTED_MEDIA_TYPE", "Enum that identifies the HTTP/1.1 415 status code"), function () {
            expect(StatusCode_1.default.UNSUPPORTED_MEDIA_TYPE).toBeDefined();
            expect(StatusCode_1.default.UNSUPPORTED_MEDIA_TYPE).toBe(415);
            expect(StatusCode_1.default[415]).toBe("UNSUPPORTED_MEDIA_TYPE");
        });
        it(JasmineExtender_1.hasEnumeral("REQUESTED_RANGE_NOT_SATISFIABLE", "Enum that identifies the HTTP/1.1 416 status code"), function () {
            expect(StatusCode_1.default.REQUESTED_RANGE_NOT_SATISFIABLE).toBeDefined();
            expect(StatusCode_1.default.REQUESTED_RANGE_NOT_SATISFIABLE).toBe(416);
            expect(StatusCode_1.default[416]).toBe("REQUESTED_RANGE_NOT_SATISFIABLE");
        });
        it(JasmineExtender_1.hasEnumeral("EXPECTATION_FAILED", "Enum that identifies the HTTP/1.1 417 status code"), function () {
            expect(StatusCode_1.default.EXPECTATION_FAILED).toBeDefined();
            expect(StatusCode_1.default.EXPECTATION_FAILED).toBe(417);
            expect(StatusCode_1.default[417]).toBe("EXPECTATION_FAILED");
        });
        it(JasmineExtender_1.hasEnumeral("INTERNAL_SERVER_ERROR", "Enum that identifies the HTTP/1.1 500 status code"), function () {
            expect(StatusCode_1.default.INTERNAL_SERVER_ERROR).toBeDefined();
            expect(StatusCode_1.default.INTERNAL_SERVER_ERROR).toBe(500);
            expect(StatusCode_1.default[500]).toBe("INTERNAL_SERVER_ERROR");
        });
        it(JasmineExtender_1.hasEnumeral("NOT_IMPLEMENTED", "Enum that identifies the HTTP/1.1 501 status code"), function () {
            expect(StatusCode_1.default.NOT_IMPLEMENTED).toBeDefined();
            expect(StatusCode_1.default.NOT_IMPLEMENTED).toBe(501);
            expect(StatusCode_1.default[501]).toBe("NOT_IMPLEMENTED");
        });
        it(JasmineExtender_1.hasEnumeral("BAD_GATEWAY", "Enum that identifies the HTTP/1.1 502 status code"), function () {
            expect(StatusCode_1.default.BAD_GATEWAY).toBeDefined();
            expect(StatusCode_1.default.BAD_GATEWAY).toBe(502);
            expect(StatusCode_1.default[502]).toBe("BAD_GATEWAY");
        });
        it(JasmineExtender_1.hasEnumeral("SERVICE_UNAVAILABLE", "Enum that identifies the HTTP/1.1 503 status code"), function () {
            expect(StatusCode_1.default.SERVICE_UNAVAILABLE).toBeDefined();
            expect(StatusCode_1.default.SERVICE_UNAVAILABLE).toBe(503);
            expect(StatusCode_1.default[503]).toBe("SERVICE_UNAVAILABLE");
        });
        it(JasmineExtender_1.hasEnumeral("GATEWAY_TIME_OUT", "Enum that identifies the HTTP/1.1 504 status code"), function () {
            expect(StatusCode_1.default.GATEWAY_TIME_OUT).toBeDefined();
            expect(StatusCode_1.default.GATEWAY_TIME_OUT).toBe(504);
            expect(StatusCode_1.default[504]).toBe("GATEWAY_TIME_OUT");
        });
        it(JasmineExtender_1.hasEnumeral("HTTP_VERSION_NOT_SUPPORTED", "Enum that identifies the HTTP/1.1 505 status code"), function () {
            expect(StatusCode_1.default.HTTP_VERSION_NOT_SUPPORTED).toBeDefined();
            expect(StatusCode_1.default.HTTP_VERSION_NOT_SUPPORTED).toBe(505);
            expect(StatusCode_1.default[505]).toBe("HTTP_VERSION_NOT_SUPPORTED");
        });
    });
});
