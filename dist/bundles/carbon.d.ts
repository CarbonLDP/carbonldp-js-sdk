declare module '0.17.4-ALPHA/Auth/AuthenticationToken' {
	export interface Class {
	}
	export default Class;

}
declare module '0.17.4-ALPHA/Utils' {
	 function hasFunction(object: Object, functionName: string): boolean; function hasProperty(object: Object, property: string): boolean; function hasPropertyDefined(object: Object, property: string): boolean; function isDefined(value: any): boolean; function isNull(value: any): boolean; function isArray(object: any): boolean; function isString(value: any): boolean; function isBoolean(value: any): boolean; function isNumber(value: any): boolean; function isInteger(value: any): boolean; function isDouble(value: any): boolean; function isDate(date: any): boolean; function isObject(object: any): boolean; function isFunction(value: any): boolean; function isMap(value: any): boolean; function parseBoolean(value: string): boolean; function extend(target: Object, ...objects: Object[]): Object; function forEachOwnProperty(object: Object, action: (name: string, value: any) => (boolean | void)): void; class O {
	    static areShallowlyEqual(object1: Object, object2: Object): boolean;
	} class S {
	    static startsWith(str: string, substring: string): boolean;
	    static endsWith(str: string, substring: string): boolean;
	    static contains(str: string, substring: string): boolean;
	} class A {
	    static from<T>(iterator: Iterator<T>): Array<T>;
	    static joinWithoutDuplicates<T>(...arrays: Array<Array<T>>): Array<T>;
	} class M {
	    static from<V>(object: Object): Map<string, V>;
	    static extend<K, V>(toExtend: Map<K, V>, ...extenders: Map<K, V>[]): Map<K, V>;
	} class UUID {
	    private static regExp;
	    static is(uuid: string): boolean;
	    static generate(): string;
	} class P {
	    static createRejectedPromise<T extends Error>(error: T): Promise<any>;
	}
	export { hasFunction, hasProperty, hasPropertyDefined, isDefined, isNull, isArray, isString, isBoolean, isNumber, isInteger, isDouble, isDate, isObject, isFunction, isMap, parseBoolean, extend, forEachOwnProperty, O, S, A, M, UUID, P };

}
declare module '0.17.4-ALPHA/Errors/AbstractError' {
	 abstract class AbstractError extends Error {
	    message: string;
	    name: string;
	    constructor(message: string);
	    toString(): string;
	}
	export default AbstractError;

}
declare module '0.17.4-ALPHA/HTTP/Header' {
	export class Class {
	    constructor();
	    constructor(values: Value[]);
	    constructor(value: string);
	    values: Value[];
	    toString(): string;
	    private setValues(valuesString);
	}
	export class Value {
	    private value;
	    constructor(value: string);
	    toString(): string;
	}
	export class Util {
	    static parseHeaders(headersString: string): Map<string, Class>;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/HTTP/Response' {
	import * as Header from '0.17.4-ALPHA/HTTP/Header';
	export class Class {
	    constructor(request: XMLHttpRequest);
	    status: number;
	    data: string;
	    headers: Map<string, Header.Class>;
	    request: XMLHttpRequest;
	    private setHeaders(request);
	}
	export class Util {
	    static getETag(response: Class): string;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/HTTP/Errors/HTTPError' {
	import AbstractError from '0.17.4-ALPHA/Errors/AbstractError';
	import Response from '0.17.4-ALPHA/HTTP/Response'; class HTTPError extends AbstractError {
	    static statusCode: number;
	    name: string;
	    response: Response;
	    constructor(message: string, response: Response);
	}
	export default HTTPError;

}
declare module '0.17.4-ALPHA/HTTP/Errors/client/BadRequestError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class BadRequestError extends HTTPError {
	    static statusCode: number;
	    name: string;
	}
	export default BadRequestError;

}
declare module '0.17.4-ALPHA/HTTP/Errors/client/ConflictError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class ConflictError extends HTTPError {
	    static statusCode: number;
	    name: string;
	}
	export default ConflictError;

}
declare module '0.17.4-ALPHA/HTTP/Errors/client/ForbiddenError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class ForbiddenError extends HTTPError {
	    static statusCode: number;
	    name: string;
	}
	export default ForbiddenError;

}
declare module '0.17.4-ALPHA/HTTP/Errors/client/MethodNotAllowedError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class MethodNotAllowedError extends HTTPError {
	    static statusCode: number;
	    name: string;
	}
	export default MethodNotAllowedError;

}
declare module '0.17.4-ALPHA/HTTP/Errors/client/NotAcceptableError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class NotAcceptableError extends HTTPError {
	    static statusCode: number;
	    name: string;
	}
	export default NotAcceptableError;

}
declare module '0.17.4-ALPHA/HTTP/Errors/client/NotFoundError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class NotFoundError extends HTTPError {
	    static statusCode: number;
	    name: string;
	}
	export default NotFoundError;

}
declare module '0.17.4-ALPHA/HTTP/Errors/client/PreconditionFailedError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class PreconditionFailedError extends HTTPError {
	    static statusCode: number;
	    name: string;
	}
	export default PreconditionFailedError;

}
declare module '0.17.4-ALPHA/HTTP/Errors/client/PreconditionRequiredError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class PreconditionRequiredError extends HTTPError {
	    static statusCode: number;
	    name: string;
	}
	export default PreconditionRequiredError;

}
declare module '0.17.4-ALPHA/HTTP/Errors/client/RequestEntityTooLargeError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class RequestEntityTooLargeError extends HTTPError {
	    static statusCode: number;
	    name: string;
	}
	export default RequestEntityTooLargeError;

}
declare module '0.17.4-ALPHA/HTTP/Errors/client/RequestHeaderFieldsTooLargeError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class RequestHeaderFieldsTooLargeError extends HTTPError {
	    static statusCode: number;
	    name: string;
	}
	export default RequestHeaderFieldsTooLargeError;

}
declare module '0.17.4-ALPHA/HTTP/Errors/client/RequestURITooLongError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class RequestURITooLongError extends HTTPError {
	    static statusCode: number;
	    name: string;
	}
	export default RequestURITooLongError;

}
declare module '0.17.4-ALPHA/HTTP/Errors/client/TooManyRequestsError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class TooManyRequestsError extends HTTPError {
	    static statusCode: number;
	    name: string;
	}
	export default TooManyRequestsError;

}
declare module '0.17.4-ALPHA/HTTP/Errors/client/UnauthorizedError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class UnauthorizedError extends HTTPError {
	    static statusCode: number;
	    name: string;
	}
	export default UnauthorizedError;

}
declare module '0.17.4-ALPHA/HTTP/Errors/client/UnsupportedMediaTypeError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class UnsupportedMediaTypeError extends HTTPError {
	    static statusCode: number;
	    name: string;
	}
	export default UnsupportedMediaTypeError;

}
declare module '0.17.4-ALPHA/HTTP/Errors/server/BadResponseError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class Class extends HTTPError {
	    static statusCode: number;
	    name: string;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/HTTP/Errors/server/BadGatewayError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class BadGatewayError extends HTTPError {
	    static statusCode: number;
	    name: string;
	}
	export default BadGatewayError;

}
declare module '0.17.4-ALPHA/HTTP/Errors/server/GatewayTimeoutError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class GatewayTimeoutError extends HTTPError {
	    static statusCode: number;
	    name: string;
	}
	export default GatewayTimeoutError;

}
declare module '0.17.4-ALPHA/HTTP/Errors/server/HTTPVersionNotSupportedError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class HTTPVersionNotSupportedError extends HTTPError {
	    static statusCode: number;
	    name: string;
	}
	export default HTTPVersionNotSupportedError;

}
declare module '0.17.4-ALPHA/HTTP/Errors/server/InternalServerErrorError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class InternalServerErrorError extends HTTPError {
	    static statusCode: number;
	    name: string;
	}
	export default InternalServerErrorError;

}
declare module '0.17.4-ALPHA/HTTP/Errors/server/NotImplementedError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class NotImplementedError extends HTTPError {
	    static statusCode: number;
	    name: string;
	}
	export default NotImplementedError;

}
declare module '0.17.4-ALPHA/HTTP/Errors/server/ServiceUnavailableError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class ServiceUnavailableError extends HTTPError {
	    static statusCode: number;
	    name: string;
	}
	export default ServiceUnavailableError;

}
declare module '0.17.4-ALPHA/HTTP/Errors/UnknownError' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError'; class UnknownError extends HTTPError {
	    name: string;
	}
	export default UnknownError;

}
declare module '0.17.4-ALPHA/HTTP/Errors' {
	import HTTPError from '0.17.4-ALPHA/HTTP/Errors/HTTPError';
	import BadRequestError from '0.17.4-ALPHA/HTTP/Errors/client/BadRequestError';
	import ConflictError from '0.17.4-ALPHA/HTTP/Errors/client/ConflictError';
	import ForbiddenError from '0.17.4-ALPHA/HTTP/Errors/client/ForbiddenError';
	import MethodNotAllowedError from '0.17.4-ALPHA/HTTP/Errors/client/MethodNotAllowedError';
	import NotAcceptableError from '0.17.4-ALPHA/HTTP/Errors/client/NotAcceptableError';
	import NotFoundError from '0.17.4-ALPHA/HTTP/Errors/client/NotFoundError';
	import PreconditionFailedError from '0.17.4-ALPHA/HTTP/Errors/client/PreconditionFailedError';
	import PreconditionRequiredError from '0.17.4-ALPHA/HTTP/Errors/client/PreconditionRequiredError';
	import RequestEntityTooLargeError from '0.17.4-ALPHA/HTTP/Errors/client/RequestEntityTooLargeError';
	import RequestHeaderFieldsTooLargeError from '0.17.4-ALPHA/HTTP/Errors/client/RequestHeaderFieldsTooLargeError';
	import RequestURITooLongError from '0.17.4-ALPHA/HTTP/Errors/client/RequestURITooLongError';
	import TooManyRequestsError from '0.17.4-ALPHA/HTTP/Errors/client/TooManyRequestsError';
	import UnauthorizedError from '0.17.4-ALPHA/HTTP/Errors/client/UnauthorizedError';
	import UnsupportedMediaTypeError from '0.17.4-ALPHA/HTTP/Errors/client/UnsupportedMediaTypeError';
	import BadResponseError from '0.17.4-ALPHA/HTTP/Errors/server/BadResponseError';
	import BadGatewayError from '0.17.4-ALPHA/HTTP/Errors/server/BadGatewayError';
	import GatewayTimeoutError from '0.17.4-ALPHA/HTTP/Errors/server/GatewayTimeoutError';
	import HTTPVersionNotSupportedError from '0.17.4-ALPHA/HTTP/Errors/server/HTTPVersionNotSupportedError';
	import InternalServerErrorError from '0.17.4-ALPHA/HTTP/Errors/server/InternalServerErrorError';
	import NotImplementedError from '0.17.4-ALPHA/HTTP/Errors/server/NotImplementedError';
	import ServiceUnavailableError from '0.17.4-ALPHA/HTTP/Errors/server/ServiceUnavailableError';
	import UnknownError from '0.17.4-ALPHA/HTTP/Errors/UnknownError'; let client: Array<typeof HTTPError>; let server: Array<typeof HTTPError>; let statusCodeMap: Map<number, typeof HTTPError>;
	export { HTTPError as Error, BadRequestError, ConflictError, ForbiddenError, MethodNotAllowedError, NotAcceptableError, NotFoundError, PreconditionFailedError, PreconditionRequiredError, RequestEntityTooLargeError, RequestHeaderFieldsTooLargeError, RequestURITooLongError, TooManyRequestsError, UnauthorizedError, UnsupportedMediaTypeError, BadResponseError, BadGatewayError, GatewayTimeoutError, HTTPVersionNotSupportedError, InternalServerErrorError, NotImplementedError, ServiceUnavailableError, UnknownError, client, server, statusCodeMap };

}
declare module '0.17.4-ALPHA/HTTP/Parser' {
	export interface Class<T> {
	    parse(body: string): Promise<T>;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/HTTP/JSONParser' {
	import Parser from '0.17.4-ALPHA/HTTP/Parser';
	export class Class implements Parser<Object> {
	    parse(body: string): Promise<Object>;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/HTTP/JSONLDParser' {
	import Parser from '0.17.4-ALPHA/HTTP/Parser';
	export class Class implements Parser<any> {
	    parse(input: string): Promise<any>;
	    private expandJSON(parsedObject, options?);
	}
	export default Class;

}
declare module '0.17.4-ALPHA/HTTP/Method' {
	 enum Method {
	    OPTIONS = 0,
	    HEAD = 1,
	    GET = 2,
	    POST = 3,
	    PUT = 4,
	    PATCH = 5,
	    DELETE = 6,
	}
	export default Method;

}
declare module '0.17.4-ALPHA/HTTP/Request' {
	import * as Header from '0.17.4-ALPHA/HTTP/Header';
	import Method from '0.17.4-ALPHA/HTTP/Method';
	import Parser from '0.17.4-ALPHA/HTTP/Parser';
	import Response from '0.17.4-ALPHA/HTTP/Response';
	export interface Options {
	    headers?: Map<string, Header.Class>;
	    sendCredentialsOnCORS?: boolean;
	    timeout?: number;
	    request?: XMLHttpRequest;
	}
	export interface ContainerRetrievalPreferences {
	    include?: string[];
	    omit?: string[];
	}
	export class Service {
	    private static defaultOptions;
	    static send(method: (Method | string), url: string, options?: Options): Promise<Response>;
	    static send(method: (Method | string), url: string, body: string, options?: Options): Promise<Response>;
	    static send(method: (Method | string), url: string, body: string, options?: Options): Promise<Response>;
	    static send<T>(method: (Method | string), url: string, body: string, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
	    static options(url: string, options?: Options): Promise<Response>;
	    static head(url: string, options?: Options): Promise<Response>;
	    static get(url: string, options?: Options): Promise<Response>;
	    static get<T>(url: string, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
	    static post(url: string, body: string, options?: Options): Promise<Response>;
	    static post<T>(url: string, body: string, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
	    static put(url: string, body: string, options?: Options): Promise<Response>;
	    static put<T>(url: string, body: string, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
	    static patch(url: string, body: string, options?: Options): Promise<Response>;
	    static patch<T>(url: string, body: string, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
	    static delete(url: string, body: string, options?: Options): Promise<Response>;
	    static delete<T>(url: string, body: string, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
	}
	export class Util {
	    static getHeader(headerName: string, requestOptions: Options, initialize?: boolean): Header.Class;
	    static setAcceptHeader(accept: string, requestOptions: Options): Options;
	    static setContentTypeHeader(contentType: string, requestOptions: Options): Options;
	    static setIfMatchHeader(etag: string, requestOptions: Options): Options;
	    static setPreferredInteractionModel(interactionModelURI: string, requestOptions: Options): Options;
	    static setContainerRetrievalPreferences(preferences: ContainerRetrievalPreferences, requestOptions: Options): Options;
	    static setSlug(slug: string, requestOptions: Options): Options;
	}

}
declare module '0.17.4-ALPHA/HTTP/StatusCode' {
	 enum StatusCode {
	    CONTINUE = 100,
	    SWITCHING_PROTOCOLS = 101,
	    OK = 200,
	    CREATED = 201,
	    ACCEPTED = 202,
	    NON_AUTHORITATIVE_INFORMATION = 203,
	    NO_CONTENT = 204,
	    RESET_CONTENT = 205,
	    PARTIAL_CONTENT = 206,
	    MULTIPLE_CHOICES = 300,
	    MOVED_PERMANENTLY = 301,
	    FOUND = 302,
	    SEE_OTHER = 303,
	    NOT_MODIFIED = 304,
	    USE_PROXY = 305,
	    TEMPORARY_REDIRECT = 307,
	    BAD_REQUEST = 400,
	    UNAUTHORIZED = 401,
	    PAYMENT_REQUIRED = 402,
	    FORBIDDEN = 403,
	    NOT_FOUND = 404,
	    METHOD_NOT_ALLOWED = 405,
	    NOT_ACCEPTABLE = 406,
	    PROXY_AUTHENTICATION_REQUIRED = 407,
	    REQUEST_TIME_OUT = 408,
	    CONFLICT = 409,
	    GONE = 410,
	    LENGTH_REQUIRED = 411,
	    PRECONDITION_FAILED = 412,
	    REQUEST_ENTITY_TOO_LARGE = 413,
	    REQUEST_URI_TOO_LARGE = 414,
	    UNSUPPORTED_MEDIA_TYPE = 415,
	    REQUESTED_RANGE_NOT_SATISFIABLE = 416,
	    EXPECTATION_FAILED = 417,
	    INTERNAL_SERVER_ERROR = 500,
	    NOT_IMPLEMENTED = 501,
	    BAD_GATEWAY = 502,
	    SERVICE_UNAVAILABLE = 503,
	    GATEWAY_TIME_OUT = 504,
	    HTTP_VERSION_NOT_SUPPORTED = 505,
	}
	export default StatusCode;

}
declare module '0.17.4-ALPHA/HTTP/StringParser' {
	import Parser from '0.17.4-ALPHA/HTTP/Parser';
	export class Class implements Parser<string> {
	    parse(body: string): Promise<string>;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/HTTP' {
	import * as Errors from '0.17.4-ALPHA/HTTP/Errors';
	import * as Header from '0.17.4-ALPHA/HTTP/Header';
	import * as JSONParser from '0.17.4-ALPHA/HTTP/JSONParser';
	import * as JSONLDParser from '0.17.4-ALPHA/HTTP/JSONLDParser';
	import Method from '0.17.4-ALPHA/HTTP/Method';
	import * as Parser from '0.17.4-ALPHA/HTTP/Parser';
	import * as Request from '0.17.4-ALPHA/HTTP/Request';
	import * as Response from '0.17.4-ALPHA/HTTP/Response';
	import StatusCode from '0.17.4-ALPHA/HTTP/StatusCode';
	import * as StringParser from '0.17.4-ALPHA/HTTP/StringParser';
	export { Errors, Header, JSONParser, JSONLDParser, Method, Parser, Request, Response, StatusCode, StringParser };

}
declare module '0.17.4-ALPHA/Auth/Credentials' {
	export interface Class {
	}
	export default Class;

}
declare module '0.17.4-ALPHA/Auth/Authenticator' {
	import * as HTTP from '0.17.4-ALPHA/HTTP';
	import AuthenticationToken from '0.17.4-ALPHA/Auth/AuthenticationToken';
	import * as Credentials from '0.17.4-ALPHA/Auth/Credentials';
	export interface Class<T extends AuthenticationToken> {
	    isAuthenticated(): boolean;
	    authenticate(authenticationToken: T): Promise<Credentials.Class>;
	    clearAuthentication(): void;
	    addAuthentication(requestOptions: HTTP.Request.Options): HTTP.Request.Options;
	    supports(authenticationToken: AuthenticationToken): boolean;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/Errors/IDAlreadyInUseError' {
	import AbstractError from '0.17.4-ALPHA/Errors/AbstractError'; class IDAlreadyInUseError extends AbstractError {
	    name: string;
	}
	export default IDAlreadyInUseError;

}
declare module '0.17.4-ALPHA/Errors/IllegalActionError' {
	import AbstractError from '0.17.4-ALPHA/Errors/AbstractError'; class IllegalActionError extends AbstractError {
	    name: string;
	}
	export default IllegalActionError;

}
declare module '0.17.4-ALPHA/Errors/IllegalArgumentError' {
	import AbstractError from '0.17.4-ALPHA/Errors/AbstractError'; class IllegalArgumentError extends AbstractError {
	    name: string;
	}
	export default IllegalArgumentError;

}
declare module '0.17.4-ALPHA/Errors/IllegalStateError' {
	import AbstractError from '0.17.4-ALPHA/Errors/AbstractError'; class IllegalStateError extends AbstractError {
	    name: string;
	    constructor(message?: string);
	}
	export default IllegalStateError;

}
declare module '0.17.4-ALPHA/Errors/NotImplementedError' {
	import AbstractError from '0.17.4-ALPHA/Errors/AbstractError'; class NotImplementedError extends AbstractError {
	    name: string;
	    constructor(message?: string);
	}
	export default NotImplementedError;

}
declare module '0.17.4-ALPHA/Errors' {
	import IDAlreadyInUseError from '0.17.4-ALPHA/Errors/IDAlreadyInUseError';
	import IllegalActionError from '0.17.4-ALPHA/Errors/IllegalActionError';
	import IllegalArgumentError from '0.17.4-ALPHA/Errors/IllegalArgumentError';
	import IllegalStateError from '0.17.4-ALPHA/Errors/IllegalStateError';
	import NotImplementedError from '0.17.4-ALPHA/Errors/NotImplementedError';
	export { IDAlreadyInUseError, IllegalActionError, IllegalArgumentError, IllegalStateError, NotImplementedError };

}
declare module '0.17.4-ALPHA/Auth/UsernameAndPasswordToken' {
	import AuthenticationToken from '0.17.4-ALPHA/Auth/AuthenticationToken';
	export class Class implements AuthenticationToken {
	    private _username;
	    private _password;
	    constructor(username: string, password: string);
	    username: string;
	    password: string;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/Auth/UsernameAndPasswordCredentials' {
	import * as Credentials from '0.17.4-ALPHA/Auth/Credentials';
	export class Class implements Credentials.Class {
	    private _username;
	    private _password;
	    username: string;
	    password: string;
	    constructor(username: string, password: string);
	}
	export default Class;

}
declare module '0.17.4-ALPHA/Auth/BasicAuthenticator' {
	import * as HTTP from '0.17.4-ALPHA/HTTP';
	import Authenticator from '0.17.4-ALPHA/Auth/Authenticator';
	import AuthenticationToken from '0.17.4-ALPHA/Auth/AuthenticationToken';
	import UsernameAndPasswordToken from '0.17.4-ALPHA/Auth/UsernameAndPasswordToken';
	import * as UsernameAndPasswordCredentials from '0.17.4-ALPHA/Auth/UsernameAndPasswordCredentials';
	export class Class implements Authenticator<UsernameAndPasswordToken> {
	    private credentials;
	    isAuthenticated(): boolean;
	    authenticate(authenticationToken: UsernameAndPasswordToken): Promise<UsernameAndPasswordCredentials.Class>;
	    addAuthentication(requestOptions: HTTP.Request.Options): HTTP.Request.Options;
	    clearAuthentication(): void;
	    supports(authenticationToken: AuthenticationToken): boolean;
	    private addBasicAuthenticationHeader(headers);
	}
	export default Class;

}
declare module '0.17.4-ALPHA/NS/C' {
	export let namespace: string;
	export class Class {
	    static AccessPoint: string;
	    static API: string;
	    static NonReadableMembershipResourceTriples: string;
	    static PreferContainmentResources: string;
	    static PreferContainmentTriples: string;
	    static PreferMembershipResources: string;
	    static PreferMembershipTriples: string;
	    static VolatileResource: string;
	}
	export class Predicate {
	    static accessPoint: string;
	    static buildDate: string;
	    static created: string;
	    static modified: string;
	    static version: string;
	}

}
declare module '0.17.4-ALPHA/NS/CP' {
	 const namespace: string; class Predicate {
	    static ADD_ACTION: string;
	    static SET_ACTION: string;
	    static DELETE_ACTION: string;
	}
	export { namespace, Predicate };

}
declare module '0.17.4-ALPHA/NS/CS' {
	 const namespace: string; class Class {
	    static Application: string;
	    static Token: string;
	    static AllOrigins: string;
	} class Predicate {
	    static name: string;
	    static allowsOrigin: string;
	    static rootContainer: string;
	    static tokenKey: string;
	    static expirationTime: string;
	}
	export { namespace, Class, Predicate };

}
declare module '0.17.4-ALPHA/NS/LDP' {
	 const namespace: string; class Class {
	    static Resource: string;
	    static RDFSource: string;
	    static Container: string;
	    static BasicContainer: string;
	    static DirectContainer: string;
	    static IndirectContainer: string;
	    static NonRDFSource: string;
	    static MemberSubject: string;
	    static PreferContainment: string;
	    static PreferMembership: string;
	    static PreferEmptyContainer: string;
	    static PreferMinimalContainer: string;
	    static Page: string;
	    static PageSortCriterion: string;
	    static Ascending: string;
	    static Descending: string;
	} class Predicate {
	    static contains: string;
	    static member: string;
	    static hasMemberRelation: string;
	    static memberOfRelation: string;
	    static membershipResource: string;
	    static insertedContentRelation: string;
	    static constrainedBy: string;
	    static pageSortCriteria: string;
	    static pageSortOrder: string;
	    static pageSortCollation: string;
	    static pageSequence: string;
	}
	export { namespace, Class, Predicate };

}
declare module '0.17.4-ALPHA/NS/RDF' {
	 const namespace: string; class Predicate {
	    static type: string;
	}
	export { namespace, Predicate };

}
declare module '0.17.4-ALPHA/NS/XSD' {
	export const namespace: string;
	export class DataType {
	    static date: string;
	    static dateTime: string;
	    static duration: string;
	    static gDay: string;
	    static gMonth: string;
	    static gMonthDay: string;
	    static gYear: string;
	    static gYearMonth: string;
	    static time: string;
	    static byte: string;
	    static decimal: string;
	    static int: string;
	    static integer: string;
	    static long: string;
	    static negativeInteger: string;
	    static nonNegativeInteger: string;
	    static nonPositiveInteger: string;
	    static positiveInteger: string;
	    static short: string;
	    static unsignedLong: string;
	    static unsignedInt: string;
	    static unsignedShort: string;
	    static unsignedByte: string;
	    static double: string;
	    static float: string;
	    static boolean: string;
	    static string: string;
	    static object: string;
	}

}
declare module '0.17.4-ALPHA/NS' {
	import * as C from '0.17.4-ALPHA/NS/C';
	import * as CP from '0.17.4-ALPHA/NS/CP';
	import * as CS from '0.17.4-ALPHA/NS/CS';
	import * as LDP from '0.17.4-ALPHA/NS/LDP';
	import * as RDF from '0.17.4-ALPHA/NS/RDF';
	import * as XSD from '0.17.4-ALPHA/NS/XSD';
	export { C, CP, CS, LDP, RDF, XSD };

}
declare module '0.17.4-ALPHA/Pointer' {
	import * as HTTP from '0.17.4-ALPHA/HTTP';
	export interface Class {
	    _id: string;
	    _resolved: boolean;
	    id: string;
	    isResolved(): boolean;
	    resolve(): Promise<[Class, HTTP.Response.Class]>;
	}
	export interface Library {
	    hasPointer(id: string): boolean;
	    getPointer(id: string): Class;
	}
	export class Factory {
	    static hasClassProperties(object: Object): boolean;
	    static is(value: any): boolean;
	    static create(id?: string): Class;
	    static decorate<T extends Object>(object: T): Class;
	}
	export class Util {
	    static getIDs(pointers: Class[]): string[];
	    static resolveAll(pointers: Class[]): Promise<[Class[], HTTP.Response.Class[]]>;
	}
	export interface Validator {
	    inScope(id: string): boolean;
	    inScope(pointer: Class): boolean;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/RDF/Literal/Serializer' {
	export interface Serializer {
	    serialize(value: any): string;
	}
	export default Serializer;

}
declare module '0.17.4-ALPHA/RDF/Literal/Serializers/XSD' {
	import Serializer from '0.17.4-ALPHA/RDF/Literal/Serializer';
	export class DateSerializer implements Serializer {
	    serialize(value: any): string;
	}
	export let dateSerializer: DateSerializer;
	export class DateTimeSerializer implements Serializer {
	    serialize(value: any): string;
	}
	export let dateTimeSerializer: DateTimeSerializer;
	export class TimeSerializer implements Serializer {
	    serialize(value: any): string;
	}
	export let timeSerializer: TimeSerializer;
	export class IntegerSerializer implements Serializer {
	    serialize(value: any): string;
	}
	export let integerSerializer: IntegerSerializer;
	export class UnsignedIntegerSerializer extends IntegerSerializer {
	    serialize(value: any): string;
	}
	export let unsignedIntegerSerializer: UnsignedIntegerSerializer;
	export class FloatSerializer implements Serializer {
	    serialize(value: any): string;
	}
	export let floatSerializer: FloatSerializer;
	export class BooleanSerializer implements Serializer {
	    serialize(value: any): string;
	}
	export let booleanSerializer: BooleanSerializer;
	export class StringSerializer implements Serializer {
	    serialize(value: any): string;
	}
	export let stringSerializer: StringSerializer;

}
declare module '0.17.4-ALPHA/RDF/Literal/Serializers' {
	import * as XSD from '0.17.4-ALPHA/RDF/Literal/Serializers/XSD';
	export { XSD };

}
declare module '0.17.4-ALPHA/RDF/Literal' {
	import Serializer from '0.17.4-ALPHA/RDF/Literal/Serializer';
	import * as Serializers from '0.17.4-ALPHA/RDF/Literal/Serializers';
	export interface Class {
	    "@type"?: string;
	    "@value": string;
	}
	export class Factory {
	    static from(value: any): Class;
	    static parse(literalValue: string, literalDataType?: string): any;
	    static parse(literal: Class): any;
	    static is(value: any): boolean;
	    static hasType(value: Class, type: string): boolean;
	}
	export class Util {
	    static areEqual(literal1: Class, literal2: Class): boolean;
	}
	export default Class;
	export { Serializer, Serializers };

}
declare module '0.17.4-ALPHA/RDF/List' {
	import Value from '0.17.4-ALPHA/RDF/Value';
	export interface Class {
	    "@list": Array<Value>;
	}
	export class Factory {
	    static is(value: any): boolean;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/RDF/Value' {
	import * as List from '0.17.4-ALPHA/RDF/List';
	import * as Pointer from '0.17.4-ALPHA/Pointer';
	export interface Class {
	    "@id"?: string;
	    "@type"?: string;
	    "@value"?: string;
	}
	export class Util {
	    static areEqual(value1: Class, value2: Class): boolean;
	    static getProperty(expandedObject: any, propertyURI: string, pointerLibrary: Pointer.Library): any;
	    static getPropertyPointer(expandedObject: any, propertyURI: string, pointerLibrary: Pointer.Library): any;
	    static getPropertyLiteral(expandedObject: any, propertyURI: string, literalType: string): any;
	    static getPropertyList(expandedObject: any, propertyURI: string, pointerLibrary: Pointer.Library): any;
	    static getPropertyPointerList(expandedObject: any, propertyURI: string, pointerLibrary: Pointer.Library): any;
	    static getPropertyLiteralList(expandedObject: any, propertyURI: string, literalType: string): any;
	    static getProperties(expandedObject: any, propertyURI: string, pointerLibrary: Pointer.Library): any;
	    static getPropertyPointers(expandedObject: any, propertyURI: string, pointerLibrary: Pointer.Library): any;
	    static getPropertyURIs(expandedObject: any, propertyURI: string): string[];
	    static getPropertyLiterals(expandedObject: any, propertyURI: string, literalType: string): any;
	    static getPropertyLanguageMap(expandedObject: any, propertyURI: string): any;
	    static getList(propertyValues: Array<any>): List.Class;
	    static parseValue(propertyValue: Class, pointerLibrary: Pointer.Library): any;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/RDF/RDFNode' {
	export interface Class {
	    "@id": string;
	}
	export class Factory {
	    static is(value: Object): boolean;
	    static create(uri: string): Class;
	}
	export class Util {
	    static areEqual(node1: Class, node2: Class): boolean;
	    static getPropertyURI(node: Class, predicate: string): string;
	}

}
declare module '0.17.4-ALPHA/RDF/URI' {
	import * as ObjectSchema from '0.17.4-ALPHA/ObjectSchema';
	export class Class {
	    stringValue: string;
	    constructor(stringValue: string);
	    toString(): string;
	}
	export class Util {
	    static hasFragment(uri: string): boolean;
	    static hasProtocol(uri: string): boolean;
	    static isAbsolute(uri: string): boolean;
	    static isRelative(uri: string): boolean;
	    static isBNodeID(uri: string): boolean;
	    static isPrefixed(uri: string): boolean;
	    static isFragmentOf(fragmentURI: string, uri: string): boolean;
	    static isBaseOf(baseURI: string, uri: string): boolean;
	    static getRelativeURI(absoluteURI: string, base: string): string;
	    static getDocumentURI(uri: string): string;
	    static getFragment(uri: string): string;
	    static getSlug(uri: string): string;
	    static resolve(parentURI: string, childURI: string): string;
	    static removeProtocol(uri: string): string;
	    static prefix(uri: string, prefix: string, prefixURI: string): string;
	    static prefix(uri: string, objectSchema: ObjectSchema.DigestedObjectSchema): string;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/RDF/Document' {
	import * as HTTP from '0.17.4-ALPHA/HTTP';
	import * as RDFNode from '0.17.4-ALPHA/RDF/RDFNode';
	export interface Class {
	    "@id"?: string;
	    "@graph": RDFNode.Class[];
	}
	export class Factory {
	    static is(object: Object): boolean;
	    static create(resources: RDFNode.Class[], uri?: string): Class;
	}
	export class Util {
	    static getDocuments(objects: Object[]): Class[];
	    static getDocuments(object: Object): Class[];
	    static getResources(objects: Object[]): RDFNode.Class[];
	    static getResources(object: Object): RDFNode.Class[];
	    static getDocumentResources(document: RDFNode.Class[]): RDFNode.Class[];
	    static getDocumentResources(document: Class): RDFNode.Class[];
	    static getFragmentResources(document: RDFNode.Class[], documentResource?: RDFNode.Class): RDFNode.Class[];
	    static getFragmentResources(document: Class, documentResource?: RDFNode.Class): RDFNode.Class[];
	    static getFragmentResources(document: RDFNode.Class[], documentResourceURI?: string): RDFNode.Class[];
	    static getFragmentResources(document: Class, documentResourceURI?: string): RDFNode.Class[];
	    static getBNodeResources(document: Class): RDFNode.Class[];
	}
	export class Parser implements HTTP.Parser.Class<Class[]> {
	    parse(input: string): Promise<any>;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/RDF' {
	import * as Literal from '0.17.4-ALPHA/RDF/Literal';
	import * as Document from '0.17.4-ALPHA/RDF/Document';
	import * as List from '0.17.4-ALPHA/RDF/List';
	import * as Node from '0.17.4-ALPHA/RDF/RDFNode';
	import * as URI from '0.17.4-ALPHA/RDF/URI';
	import * as Value from '0.17.4-ALPHA/RDF/Value';
	export { Literal, Document, List, Node, URI, Value };

}
declare module '0.17.4-ALPHA/ObjectSchema' {
	import * as RDF from '0.17.4-ALPHA/RDF';
	export interface PropertyDefinition {
	    "@id"?: string;
	    "@type"?: string;
	    "@language"?: string;
	    "@container"?: string;
	}
	export interface Class {
	    "@base"?: string;
	    "@index"?: Object;
	    "@language"?: string;
	    "@reverse"?: Object;
	    "@vocab"?: string;
	    [name: string]: (string | PropertyDefinition);
	}
	export enum ContainerType {
	    SET = 0,
	    LIST = 1,
	    LANGUAGE = 2,
	}
	export class DigestedObjectSchema {
	    base: string;
	    prefixes: Map<string, RDF.URI.Class>;
	    properties: Map<string, DigestedPropertyDefinition>;
	    prefixedURIs: Map<string, RDF.URI.Class[]>;
	    constructor();
	}
	export class DigestedPropertyDefinition {
	    uri: RDF.URI.Class;
	    literal: boolean;
	    literalType: RDF.URI.Class;
	    language: string;
	    containerType: ContainerType;
	}
	export interface Resolver {
	    getSchemaFor(object: Object): DigestedObjectSchema;
	}
	export class Digester {
	    static digestSchema(schemas: Class[]): DigestedObjectSchema;
	    static digestSchema(schema: Class): DigestedObjectSchema;
	    static combineDigestedObjectSchemas(digestedSchemas: DigestedObjectSchema[]): DigestedObjectSchema;
	    private static digestSingleSchema(schema);
	    private static resolvePrefixedURIs(digestedSchema);
	    private static resolvePrefixedURI(uri, digestedSchema);
	}
	export default Class;

}
declare module '0.17.4-ALPHA/Committer' {
	interface Committer<E> {
	    commit(object: E): Promise<any>;
	}
	export default Committer;

}
declare module '0.17.4-ALPHA/Resource' {
	import * as Pointer from '0.17.4-ALPHA/Pointer';
	export interface Class extends Pointer.Class {
	    types: string[];
	}
	export class Factory {
	    static hasClassProperties(resource: Object): boolean;
	    static create(id?: string, types?: string[]): Class;
	    static createFrom<T extends Object>(object: T, id?: string, types?: string[]): T & Class;
	    static decorate<T extends Object>(object: T): T & Class;
	}

}
declare module '0.17.4-ALPHA/Fragment' {
	import * as Document from '0.17.4-ALPHA/Document';
	import * as Resource from '0.17.4-ALPHA/Resource';
	export interface Class extends Resource.Class {
	    document: Document.Class;
	}
	export class Factory {
	    static hasClassProperties(resource: Object): boolean;
	    static create(id: string, document: Document.Class): Class;
	    static create(document: Document.Class): Class;
	    static createFrom<T extends Object>(object: T, id: string, document: Document.Class): T & Class;
	    static createFrom<T extends Object>(object: T, document: Document.Class): T & Class;
	}
	export class Util {
	    static generateID(): string;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/JSONLDConverter' {
	import * as ObjectSchema from '0.17.4-ALPHA/ObjectSchema';
	import * as Pointer from '0.17.4-ALPHA/Pointer';
	import * as RDF from '0.17.4-ALPHA/RDF';
	export class Class {
	    private _literalSerializers;
	    literalSerializers: Map<string, RDF.Literal.Serializer>;
	    private static getDefaultSerializers();
	    constructor(literalSerializers?: Map<string, RDF.Literal.Serializer>);
	    compact(expandedObjects: Object[], targetObjects: Object[], digestedSchema: ObjectSchema.DigestedObjectSchema, pointerLibrary: Pointer.Library): Object[];
	    compact(expandedObject: Object, targetObject: Object, digestedSchema: ObjectSchema.DigestedObjectSchema, pointerLibrary: Pointer.Library): Object;
	    compact(expandedObjects: Object[], digestedSchema: ObjectSchema.DigestedObjectSchema, pointerLibrary: Pointer.Library): Object[];
	    compact(expandedObject: Object, digestedSchema: ObjectSchema.DigestedObjectSchema, pointerLibrary: Pointer.Library): Object;
	    expand(compactedObjects: Object[], digestedSchema: ObjectSchema.DigestedObjectSchema, pointerValidator?: Pointer.Validator): RDF.Node.Class[];
	    expand(compactedObject: Object, digestedSchema: ObjectSchema.DigestedObjectSchema, pointerValidator?: Pointer.Validator): RDF.Node.Class;
	    private expandSingle(compactedObject, digestedSchema, pointerValidator);
	    private expandProperty(propertyValue, propertyDefinition, pointerValidator);
	    private expandPropertyValue(propertyValue, pointerValidator);
	    private expandPropertyPointer(propertyValue, pointerValidator);
	    private expandPropertyLiteral(propertyValue, literalType);
	    private expandPropertyList(propertyValues, pointerValidator);
	    private expandPropertyPointerList(propertyValues, pointerValidator);
	    private expandPropertyLiteralList(propertyValues, literalType);
	    private expandPropertyValues(propertyValues, pointerValidator);
	    private expandPropertyPointers(propertyValues, pointerValidator);
	    private expandPropertyLiterals(propertyValues, literalType);
	    private expandPropertyLanguageMap(propertyValue);
	    private serializeLiteral(propertyValue, literalType);
	    private expandPointer(propertyValue, pointerValidator);
	    private expandArray(propertyValue, pointerValidator);
	    private expandValue(propertyValue, pointerValidator);
	    private expandLiteral(literalValue);
	    private compactSingle(expandedObject, targetObject, digestedSchema, pointerLibrary);
	    private assignProperty(compactedObject, expandedObject, propertyName, digestedSchema, pointerLibrary);
	    private assignURIProperty(compactedObject, expandedObject, propertyURI, pointerLibrary);
	    private getPropertyContainerType(propertyValues);
	    private getPropertyValue(expandedObject, propertyDefinition, pointerLibrary);
	    private getProperty(expandedObject, propertyURI, pointerLibrary);
	    private getPropertyPointer(expandedObject, propertyURI, pointerLibrary);
	    private getPropertyLiteral(expandedObject, propertyURI, literalType);
	    private getPropertyList(expandedObject, propertyURI, pointerLibrary);
	    private getPropertyPointerList(expandedObject, propertyURI, pointerLibrary);
	    private getPropertyLiteralList(expandedObject, propertyURI, literalType);
	    private getProperties(expandedObject, propertyURI, pointerLibrary);
	    private getPropertyPointers(expandedObject, propertyURI, pointerLibrary);
	    private getPropertyLiterals(expandedObject, propertyURI, literalType);
	    private getPropertyLanguageMap(expandedObject, propertyURI);
	    private getList(propertyValues);
	    private getPropertyURINameMap(digestedSchema);
	    private parseValue(propertyValue, pointerLibrary);
	}
	export default Class;

}
declare module '0.17.4-ALPHA/NamedFragment' {
	import * as Document from '0.17.4-ALPHA/Document';
	import * as Fragment from '0.17.4-ALPHA/Fragment';
	export interface Class extends Fragment.Class {
	    slug: string;
	}
	export class Factory {
	    static hasClassProperties(resource: Fragment.Class): boolean;
	    static create(slug: string, document: Document.Class): Class;
	    static createFrom<T extends Object>(object: T, slug: string, document: Document.Class): T & Class;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/Document' {
	import * as Fragment from '0.17.4-ALPHA/Fragment';
	import JSONLDConverter from '0.17.4-ALPHA/JSONLDConverter';
	import * as NamedFragment from '0.17.4-ALPHA/NamedFragment';
	import * as ObjectSchema from '0.17.4-ALPHA/ObjectSchema';
	import * as Pointer from '0.17.4-ALPHA/Pointer';
	import * as Resource from '0.17.4-ALPHA/Resource';
	export interface Class extends Resource.Class, Pointer.Library, Pointer.Validator {
	    _fragmentsIndex: Map<string, Fragment.Class>;
	    hasFragment(slug: string): boolean;
	    getFragment(slug: string): Fragment.Class;
	    getNamedFragment(slug: string): NamedFragment.Class;
	    getFragments(): Fragment.Class[];
	    createFragment(): Fragment.Class;
	    createFragment(slug: string): NamedFragment.Class;
	    createNamedFragment(slug: string): NamedFragment.Class;
	    removeFragment(fragment: NamedFragment.Class): void;
	    removeFragment(fragment: Fragment.Class): void;
	    removeFragment(slug: string): void;
	    removeFragment(fragmentOrSlug: any): void;
	    toJSON(objectSchemaResolver: ObjectSchema.Resolver, jsonldConverter: JSONLDConverter): string;
	    toJSON(objectSchemaResolver: ObjectSchema.Resolver): string;
	    toJSON(): string;
	}
	export class Factory {
	    static hasClassProperties(documentResource: Object): boolean;
	    static create(uri: string): Class;
	    static create(): Class;
	    static createFrom<T extends Object>(object: T, uri: string): T & Class;
	    static createFrom<T extends Object>(object: T): T & Class;
	    static decorate<T extends Object>(object: T): T & Class;
	}
	export default Document;

}
declare module '0.17.4-ALPHA/PersistedResource' {
	export interface Class {
	    _snapshot: Object;
	    _syncSnapshot: () => void;
	    isDirty(): boolean;
	}
	export class Factory {
	    static hasClassProperties(object: Object): boolean;
	    static decorate<T extends Object>(object: T, snapshot?: Object): T & Class;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/PersistedFragment' {
	import * as Fragment from '0.17.4-ALPHA/Fragment';
	import * as PersistedResource from '0.17.4-ALPHA/PersistedResource';
	export interface Class extends PersistedResource.Class, Fragment.Class {
	}
	export class Factory {
	    static decorate<T extends Fragment.Class>(fragment: T, snapshot?: Object): T & Class;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/PersistedNamedFragment' {
	import * as Fragment from '0.17.4-ALPHA/Fragment';
	import * as NamedFragment from '0.17.4-ALPHA/NamedFragment';
	import * as PersistedFragment from '0.17.4-ALPHA/PersistedFragment';
	export interface Class extends PersistedFragment.Class, NamedFragment.Class {
	}
	export class Factory {
	    static decorate<T extends Fragment.Class>(fragment: T, snapshot?: Object): T & Class;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/SPARQL/RawResults' {
	export class ValueTypes {
	    static URI: string;
	    static LITERAL: string;
	    static BNODE: string;
	}
	export interface BindingObject {
	    [name: string]: BindingProperty;
	}
	export interface BindingProperty {
	    "type": string;
	    "value": string;
	    "datatype"?: string;
	    "xml:lang"?: string;
	}
	export interface Class {
	    "head": {
	        "vars"?: string[];
	        "links"?: string[];
	    };
	    "results"?: {
	        "bindings": BindingObject[];
	    };
	    "boolean"?: boolean;
	}
	export class Factory {
	    static hasClassProperties(value: Object): boolean;
	    static is(value: any): boolean;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/SPARQL/RawResultsParser' {
	import Parser from '0.17.4-ALPHA/HTTP/Parser';
	import RawResults from '0.17.4-ALPHA/SPARQL/RawResults';
	export class Class implements Parser<RawResults> {
	    parse(input: string): Promise<any>;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/SPARQL/SELECTResults' {
	export interface BindingObject {
	    [binding: string]: any;
	}
	export interface Class {
	    vars: string[];
	    bindings: BindingObject[];
	}
	export default Class;

}
declare module '0.17.4-ALPHA/SPARQL/Service' {
	import * as HTTP from '0.17.4-ALPHA/HTTP';
	import * as Pointer from '0.17.4-ALPHA/Pointer';
	import * as RawResults from '0.17.4-ALPHA/SPARQL/RawResults';
	export class Class {
	    private static defaultOptions;
	    private static resultsParser;
	    private static stringParser;
	    static executeRawASKQuery(url: string, askQuery: string, options?: HTTP.Request.Options): Promise<[RawResults.Class, HTTP.Response.Class]>;
	    static executeASKQuery(url: string, askQuery: string, options?: HTTP.Request.Options): Promise<[boolean, HTTP.Response.Class]>;
	    static executeRawSELECTQuery(url: string, selectQuery: string, options?: HTTP.Request.Options): Promise<[RawResults.Class, HTTP.Response.Class]>;
	    static executeSELECTQuery(url: string, selectQuery: string, pointerLibrary: Pointer.Library, options: HTTP.Request.Options): Promise<[any, HTTP.Response.Class]>;
	    static executeRawCONSTRUCTQuery(url: string, constructQuery: string, options?: HTTP.Request.Options): Promise<[string, HTTP.Response.Class]>;
	    static executeRawDESCRIBEQuery(url: string, describeQuery: string, options?: HTTP.Request.Options): Promise<[string, HTTP.Response.Class]>;
	    private static parseRawBindingProperty(rawBindingProperty, pointerLibrary);
	}
	export default Class;

}
declare module '0.17.4-ALPHA/SPARQL' {
	import * as RawResults from '0.17.4-ALPHA/SPARQL/RawResults';
	import * as RawResultsParser from '0.17.4-ALPHA/SPARQL/RawResultsParser';
	import Service from '0.17.4-ALPHA/SPARQL/Service';
	import * as SELECTResults from '0.17.4-ALPHA/SPARQL/SELECTResults';
	export { RawResults, RawResultsParser, Service, SELECTResults };

}
declare module '0.17.4-ALPHA/PersistedDocument' {
	import * as Document from '0.17.4-ALPHA/Document';
	import Documents from '0.17.4-ALPHA/Documents';
	import * as HTTP from '0.17.4-ALPHA/HTTP';
	import * as PersistedResource from '0.17.4-ALPHA/PersistedResource';
	import * as PersistedFragment from '0.17.4-ALPHA/PersistedFragment';
	import * as PersistedNamedFragment from '0.17.4-ALPHA/PersistedNamedFragment';
	import * as Pointer from '0.17.4-ALPHA/Pointer';
	import * as SPARQL from '0.17.4-ALPHA/SPARQL';
	export interface Class extends Pointer.Class, PersistedResource.Class, Document.Class {
	    _documents: Documents;
	    _etag: string;
	    _fragmentsIndex: Map<string, PersistedFragment.Class>;
	    _savedFragments: PersistedFragment.Class[];
	    _syncSavedFragments(): void;
	    getFragment(slug: string): PersistedFragment.Class;
	    getNamedFragment(slug: string): PersistedNamedFragment.Class;
	    getFragments(): PersistedFragment.Class[];
	    createFragment(): PersistedFragment.Class;
	    createFragment(slug: string): PersistedNamedFragment.Class;
	    createNamedFragment(slug: string): PersistedNamedFragment.Class;
	    refresh(): Promise<void>;
	    save(): Promise<[Class, HTTP.Response.Class]>;
	    destroy(): Promise<HTTP.Response.Class>;
	    executeRawASKQuery(askQuery: string, requestOptions?: HTTP.Request.Options): Promise<[SPARQL.RawResults.Class, HTTP.Response.Class]>;
	    executeASKQuery(askQuery: string, requestOptions?: HTTP.Request.Options): Promise<[boolean, HTTP.Response.Class]>;
	    executeRawSELECTQuery(selectQuery: string, requestOptions?: HTTP.Request.Options): Promise<[SPARQL.RawResults.Class, HTTP.Response.Class]>;
	    executeSELECTQuery(selectQuery: string, requestOptions?: HTTP.Request.Options): Promise<[SPARQL.SELECTResults.Class, HTTP.Response.Class]>;
	    executeRawCONSTRUCTQuery(constructQuery: string, requestOptions?: HTTP.Request.Options): Promise<[string, HTTP.Response.Class]>;
	    executeRawDESCRIBEQuery(describeQuery: string, requestOptions?: HTTP.Request.Options): Promise<[string, HTTP.Response.Class]>;
	}
	export class Factory {
	    static hasClassProperties(document: Document.Class): boolean;
	    static is(object: Object): boolean;
	    static create(uri: string, documents: Documents, snapshot?: Object): Class;
	    static createFrom<T extends Object>(object: T, uri: string, documents: Documents, snapshot?: Object): Class;
	    static decorate<T extends Document.Class>(document: T, documents: Documents, snapshot?: Object): T & Class;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/LDP/RDFSource' {
	import * as ObjectSchema from '0.17.4-ALPHA/ObjectSchema';
	import * as Resource from '0.17.4-ALPHA/Resource';
	export const RDF_CLASS: string;
	export const SCHEMA: ObjectSchema.Class;
	export interface Class extends Resource.Class {
	}
	export class Factory {
	}
	export default Class;

}
declare module '0.17.4-ALPHA/LDP/Container' {
	import * as ObjectSchema from '0.17.4-ALPHA/ObjectSchema';
	import * as Pointer from '0.17.4-ALPHA/Pointer';
	import * as RDF from '0.17.4-ALPHA/RDF';
	import * as Resource from '0.17.4-ALPHA/Resource';
	import * as RDFSource from '0.17.4-ALPHA/LDP/RDFSource';
	export const RDF_CLASS: string;
	export const SCHEMA: ObjectSchema.Class;
	export interface Class extends RDFSource.Class {
	    memberOfRelation: Pointer.Class;
	    hasMemberRelation: Pointer.Class;
	}
	export class Factory {
	    static hasClassProperties(resource: RDF.Node.Class): boolean;
	    static hasRDFClass(resource: Resource.Class): boolean;
	    static hasRDFClass(expandedObject: Object): boolean;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/LDP/AccessPoint' {
	import * as Container from '0.17.4-ALPHA/LDP/Container';
	import * as ObjectSchema from '0.17.4-ALPHA/ObjectSchema';
	export const RDF_CLASS: string;
	export interface Class extends Container.Class {
	    membershipResource: string;
	}
	export const SCHEMA: ObjectSchema.Class;
	export class Factory {
	    static hasClassProperties(resource: Object): boolean;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/LDP/BasicContainer' {
	import * as Pointer from '0.17.4-ALPHA/Pointer';
	import * as Container from '0.17.4-ALPHA/LDP/Container';
	export const RDF_CLASS: string;
	export interface Class extends Container.Class {
	}
	export class Factory {
	    static hasRDFClass(pointer: Pointer.Class): boolean;
	    static hasRDFClass(expandedObject: Object): boolean;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/LDP/PersistedContainer' {
	import * as Document from '0.17.4-ALPHA/Document';
	import * as HTTP from '0.17.4-ALPHA/HTTP';
	import * as PersistedDocument from '0.17.4-ALPHA/PersistedDocument';
	import * as Pointer from '0.17.4-ALPHA/Pointer';
	export interface Class extends PersistedDocument.Class {
	    createChild(slug: string, object: Object): Promise<[Pointer.Class, HTTP.Response.Class]>;
	    createChild(slug: string): Promise<[Pointer.Class, HTTP.Response.Class]>;
	    createChild(object: Object): Promise<[Pointer.Class, HTTP.Response.Class]>;
	    createChild(): Promise<[Pointer.Class, HTTP.Response.Class]>;
	}
	export class Factory {
	    static hasClassProperties(document: Document.Class): boolean;
	    static decorate<T extends PersistedDocument.Class>(persistedDocument: T): T & Class;
	}

}
declare module '0.17.4-ALPHA/LDP' {
	import * as AccessPoint from '0.17.4-ALPHA/LDP/AccessPoint';
	import * as BasicContainer from '0.17.4-ALPHA/LDP/BasicContainer';
	import * as Container from '0.17.4-ALPHA/LDP/Container';
	import * as PersistedContainer from '0.17.4-ALPHA/LDP/PersistedContainer';
	import * as RDFSource from '0.17.4-ALPHA/LDP/RDFSource';
	export { AccessPoint, BasicContainer, Container, PersistedContainer, RDFSource };

}
declare module '0.17.4-ALPHA/Documents' {
	import * as HTTP from '0.17.4-ALPHA/HTTP';
	import Context from '0.17.4-ALPHA/Context';
	import * as Document from '0.17.4-ALPHA/Document';
	import * as JSONLDConverter from '0.17.4-ALPHA/JSONLDConverter';
	import * as PersistedDocument from '0.17.4-ALPHA/PersistedDocument';
	import * as Pointer from '0.17.4-ALPHA/Pointer';
	import * as ObjectSchema from '0.17.4-ALPHA/ObjectSchema';
	import * as SPARQL from '0.17.4-ALPHA/SPARQL'; class Documents implements Pointer.Library, Pointer.Validator, ObjectSchema.Resolver {
	    _jsonldConverter: JSONLDConverter.Class;
	    jsonldConverter: JSONLDConverter.Class;
	    private context;
	    private pointers;
	    constructor(context?: Context);
	    inScope(pointer: Pointer.Class): boolean;
	    inScope(id: string): boolean;
	    hasPointer(id: string): boolean;
	    getPointer(id: string): Pointer.Class;
	    get(uri: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedDocument.Class, HTTP.Response.Class]>;
	    createChild(parentURI: string, slug: string, childDocument: Document.Class, requestOptions?: HTTP.Request.Options): Promise<[Pointer.Class, HTTP.Response.Class]>;
	    createChild(parentURI: string, childDocument: Document.Class, requestOptions?: HTTP.Request.Options): Promise<[Pointer.Class, HTTP.Response.Class]>;
	    getMembers(uri: string, includeNonReadable: boolean, requestOptions: HTTP.Request.Options): Promise<[Pointer.Class[], HTTP.Response.Class]>;
	    getMembers(uri: string, includeNonReadable: boolean): Promise<[Pointer.Class[], HTTP.Response.Class]>;
	    getMembers(uri: string, requestOptions: HTTP.Request.Options): Promise<[Pointer.Class[], HTTP.Response.Class]>;
	    getMembers(uri: string): Promise<[Pointer.Class[], HTTP.Response.Class]>;
	    save(persistedDocument: PersistedDocument.Class, requestOptions?: HTTP.Request.Options): Promise<[PersistedDocument.Class, HTTP.Response.Class]>;
	    delete(persistedDocument: PersistedDocument.Class, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
	    getSchemaFor(object: Object): ObjectSchema.DigestedObjectSchema;
	    executeRawASKQuery(documentURI: string, askQuery: string, requestOptions?: HTTP.Request.Options): Promise<[SPARQL.RawResults.Class, HTTP.Response.Class]>;
	    executeASKQuery(documentURI: string, askQuery: string, requestOptions?: HTTP.Request.Options): Promise<[boolean, HTTP.Response.Class]>;
	    executeRawSELECTQuery(documentURI: string, selectQuery: string, requestOptions?: HTTP.Request.Options): Promise<[SPARQL.RawResults.Class, HTTP.Response.Class]>;
	    executeSELECTQuery(documentURI: string, selectQuery: string, requestOptions?: HTTP.Request.Options): Promise<[SPARQL.SELECTResults.Class, HTTP.Response.Class]>;
	    executeRawCONSTRUCTQuery(documentURI: string, constructQuery: string, requestOptions?: HTTP.Request.Options): Promise<[string, HTTP.Response.Class]>;
	    executeRawDESCRIBEQuery(documentURI: string, constructQuery: string, requestOptions?: HTTP.Request.Options): Promise<[string, HTTP.Response.Class]>;
	    private getRDFDocument(requestURL, rdfDocuments, response);
	    private getDocumentResource(rdfDocument, response);
	    private getPointerID(uri);
	    private createPointer(localID);
	    private compact(expandedObjects, targetObjects, pointerLibrary);
	    private compact(expandedObject, targetObject, pointerLibrary);
	    private compactSingle(expandedObject, targetObject, pointerLibrary);
	    private getDigestedObjectSchemaForExpandedObject(expandedObject);
	    private getDigestedObjectSchemaForDocument(document);
	    private getDigestedObjectSchema(objectTypes);
	    private getExpandedObjectTypes(expandedObject);
	    private getDocumentTypes(document);
	}
	export default Documents;

}
declare module '0.17.4-ALPHA/Context' {
	import Auth from '0.17.4-ALPHA/Auth';
	import Documents from '0.17.4-ALPHA/Documents';
	import * as ObjectSchema from '0.17.4-ALPHA/ObjectSchema';
	interface Context {
	    auth: Auth;
	    documents: Documents;
	    parentContext: Context;
	    getBaseURI(): string;
	    resolve(relativeURI: string): string;
	    hasSetting(name: string): boolean;
	    getSetting(name: string): any;
	    setSetting(name: string, value: any): any;
	    deleteSetting(name: string): any;
	    hasObjectSchema(type: string): boolean;
	    getObjectSchema(type: string): ObjectSchema.DigestedObjectSchema;
	    getObjectSchema(): ObjectSchema.DigestedObjectSchema;
	    extendObjectSchema(type: string, objectSchema: ObjectSchema.Class): void;
	    extendObjectSchema(objectSchema: ObjectSchema.Class): void;
	    clearObjectSchema(type: string): void;
	    clearObjectSchema(): void;
	}
	export default Context;

}
declare module '0.17.4-ALPHA/App' {
	import AbstractContext from '0.17.4-ALPHA/AbstractContext';
	import Context from '0.17.4-ALPHA/Context';
	import * as Document from '0.17.4-ALPHA/Document';
	import * as LDP from '0.17.4-ALPHA/LDP';
	import * as ObjectSchema from '0.17.4-ALPHA/ObjectSchema';
	export interface Class extends Document.Class {
	    rootContainer: LDP.PersistedContainer.Class;
	}
	export const RDF_CLASS: string;
	export const SCHEMA: ObjectSchema.Class; class AppContext extends AbstractContext {
	    private app;
	    private base;
	    constructor(parentContext: Context, app: Class);
	    resolve(uri: string): string;
	    private getBase(resource);
	}
	export { AppContext as Context };
	export class Factory {
	    static hasClassProperties(resource: Object): boolean;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/APIDescription' {
	import * as ObjectSchema from '0.17.4-ALPHA/ObjectSchema';
	export const RDF_CLASS: string;
	export const SCHEMA: ObjectSchema.Class;
	export interface Class {
	    version: string;
	    buildDate: Date;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/SDKContext' {
	import * as Auth from '0.17.4-ALPHA/Auth';
	import Context from '0.17.4-ALPHA/Context';
	import Documents from '0.17.4-ALPHA/Documents';
	import * as ObjectSchema from '0.17.4-ALPHA/ObjectSchema';
	export class Class implements Context {
	    auth: Auth.Class;
	    documents: Documents;
	    parentContext: Context;
	    protected settings: Map<string, any>;
	    protected generalObjectSchema: ObjectSchema.DigestedObjectSchema;
	    protected typeObjectSchemaMap: Map<string, ObjectSchema.DigestedObjectSchema>;
	    constructor();
	    getBaseURI(): string;
	    resolve(relativeURI: string): string;
	    hasSetting(name: string): boolean;
	    getSetting(name: string): any;
	    setSetting(name: string, value: any): void;
	    deleteSetting(name: string): void;
	    hasObjectSchema(type: string): boolean;
	    getObjectSchema(type?: string): ObjectSchema.DigestedObjectSchema;
	    extendObjectSchema(type: string, objectSchema: ObjectSchema.Class): void;
	    extendObjectSchema(objectSchema: ObjectSchema.Class): void;
	    clearObjectSchema(type?: string): void;
	    protected extendGeneralObjectSchema(digestedSchema: ObjectSchema.DigestedObjectSchema): void;
	    protected extendTypeObjectSchema(digestedSchema: ObjectSchema.DigestedObjectSchema, type: string): void;
	    private registerDefaultObjectSchemas();
	}
	export const instance: Class;
	export default instance;

}
declare module '0.17.4-ALPHA/Auth/Token' {
	import * as ObjectSchema from '0.17.4-ALPHA/ObjectSchema';
	import * as Pointer from '0.17.4-ALPHA/Pointer';
	export const RDF_CLASS: string;
	export const CONTEXT: ObjectSchema.Class;
	export interface Class extends Pointer.Class {
	    key: string;
	    expirationTime: Date;
	}
	export class Factory {
	    static is(value: any): boolean;
	    static hasClassProperties(object: Object): boolean;
	    static decorate<T extends Object>(object: T): T & Class;
	    static hasRDFClass(pointer: Pointer.Class): boolean;
	    static hasRDFClass(expandedObject: Object): boolean;
	}
	export default Class;

}
declare module '0.17.4-ALPHA/Auth/TokenCredentials' {
	import * as Credentials from '0.17.4-ALPHA/Auth/Credentials';
	import * as Token from '0.17.4-ALPHA/Auth/Token';
	export class Class implements Credentials.Class {
	    private _token;
	    token: Token.Class;
	    constructor(token: Token.Class);
	}
	export default Class;

}
declare module '0.17.4-ALPHA/Auth/TokenAuthenticator' {
	import Context from '0.17.4-ALPHA/Context';
	import * as HTTP from '0.17.4-ALPHA/HTTP';
	import Authenticator from '0.17.4-ALPHA/Auth/Authenticator';
	import AuthenticationToken from '0.17.4-ALPHA/Auth/AuthenticationToken';
	import UsernameAndPasswordToken from '0.17.4-ALPHA/Auth/UsernameAndPasswordToken';
	import * as TokenCredentials from '0.17.4-ALPHA/Auth/TokenCredentials';
	export class Class implements Authenticator<UsernameAndPasswordToken> {
	    private static TOKEN_CONTAINER;
	    private context;
	    private basicAuthenticator;
	    private credentials;
	    constructor(context: Context);
	    isAuthenticated(): boolean;
	    authenticate(authenticationToken: UsernameAndPasswordToken): Promise<TokenCredentials.Class>;
	    addAuthentication(requestOptions: HTTP.Request.Options): HTTP.Request.Options;
	    clearAuthentication(): void;
	    supports(authenticationToken: AuthenticationToken): boolean;
	    private createToken();
	    private addTokenAuthenticationHeader(headers);
	}
	export default Class;

}
declare module '0.17.4-ALPHA/Auth' {
	import AuthenticationToken from '0.17.4-ALPHA/Auth/AuthenticationToken';
	import Authenticator from '0.17.4-ALPHA/Auth/Authenticator';
	import BasicAuthenticator from '0.17.4-ALPHA/Auth/BasicAuthenticator';
	import * as Token from '0.17.4-ALPHA/Auth/Token';
	import TokenAuthenticator from '0.17.4-ALPHA/Auth/TokenAuthenticator';
	import UsernameAndPasswordToken from '0.17.4-ALPHA/Auth/UsernameAndPasswordToken';
	import * as HTTP from '0.17.4-ALPHA/HTTP';
	import Context from '0.17.4-ALPHA/Context';
	export { AuthenticationToken, Authenticator, BasicAuthenticator, Token, TokenAuthenticator, UsernameAndPasswordToken };
	export enum Method {
	    BASIC = 0,
	    TOKEN = 1,
	}
	export class Class {
	    private context;
	    private method;
	    private authenticators;
	    private authenticator;
	    constructor(context: Context);
	    isAuthenticated(askParent?: boolean): boolean;
	    authenticate(username: string, password: string): Promise<void>;
	    authenticate(authenticationToken: AuthenticationToken): Promise<void>;
	    addAuthentication(requestOptions: HTTP.Request.Options): void;
	    clearAuthentication(): void;
	    private getAuthenticator(authenticationToken);
	}
	export default Class;

}
declare module '0.17.4-ALPHA/AbstractContext' {
	import Context from '0.17.4-ALPHA/Context';
	import * as SDKContext from '0.17.4-ALPHA/SDKContext'; abstract class AbstractContext extends SDKContext.Class {
	    _parentContext: Context;
	    parentContext: Context;
	    constructor(parentContext?: Context);
	    abstract resolve(relativeURI: string): string;
	}
	export default AbstractContext;

}
declare module '0.17.4-ALPHA/Apps' {
	import * as App from '0.17.4-ALPHA/App';
	import Context from '0.17.4-ALPHA/Context'; class Apps {
	    private context;
	    constructor(context: Context);
	    get(uri: string): Promise<App.Context>;
	    getAll(): Promise<App.Context[]>;
	    private getAppsContainerURI();
	}
	export default Apps;

}
declare module '0.17.4-ALPHA/settings' {
	import * as Auth from '0.17.4-ALPHA/Auth';
	export interface CarbonSettings {
	    "domain"?: string;
	    "http.ssl"?: boolean;
	    "auth.method"?: Auth.Method;
	    "platform.container"?: string;
	    "platform.apps.container"?: string;
	} let settings: CarbonSettings;
	export default settings;

}
declare module '0.17.4-ALPHA/Carbon' {
	import * as APIDescription from '0.17.4-ALPHA/APIDescription';
	import Apps from '0.17.4-ALPHA/Apps';
	import * as Auth from '0.17.4-ALPHA/Auth';
	import AbstractContext from '0.17.4-ALPHA/AbstractContext';
	import * as Document from '0.17.4-ALPHA/Document';
	import Documents from '0.17.4-ALPHA/Documents';
	import * as HTTP from '0.17.4-ALPHA/HTTP';
	import * as RDF from '0.17.4-ALPHA/RDF';
	import * as Utils from '0.17.4-ALPHA/Utils'; class Carbon extends AbstractContext {
	    static Apps: typeof Apps;
	    static Auth: typeof Auth;
	    static Document: typeof Document;
	    static Documents: typeof Documents;
	    static HTTP: typeof HTTP;
	    static RDF: typeof RDF;
	    static Utils: typeof Utils;
	    static version: string;
	    apps: Apps;
	    constructor(settings?: any);
	    resolve(uri: string): string;
	    getAPIDescription(): Promise<APIDescription.Class>;
	}
	export default Carbon;

}
declare module '0.17.4-ALPHA/Persisted' {
	import * as RDF from '0.17.4-ALPHA/RDF'; class Modifications {
	    add: Map<string, RDF.Value.Class[]>;
	    set: Map<string, RDF.Value.Class[]>;
	    delete: Map<string, RDF.Value.Class[]>;
	    constructor();
	} enum ModificationType {
	    ADD = 0,
	    SET = 1,
	    DELETE = 2,
	}
	interface Persisted {
	    _dirty: boolean;
	    _modifications: Modifications;
	    isDirty(): boolean;
	} class Factory {
	    static is(object: Object): boolean;
	    static from(object: Object): Persisted;
	    static from(objects: Object[]): Persisted[];
	    private static injectBehavior(value);
	}
	export { Modifications, ModificationType, Persisted as Class, Factory };

}
/// <reference no-default-lib="true"/>
/// <reference path="./../typings/typings" />
