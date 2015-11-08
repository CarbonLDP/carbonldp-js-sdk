import RESTError from './../HTTPError';
declare class ServiceUnavailableError extends RESTError {
    static statusCode: number;
    name: string;
}
export default ServiceUnavailableError;
