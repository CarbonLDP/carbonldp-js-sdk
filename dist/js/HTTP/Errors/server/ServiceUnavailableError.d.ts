import HTTPError from "./../HTTPError";
declare class ServiceUnavailableError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default ServiceUnavailableError;
