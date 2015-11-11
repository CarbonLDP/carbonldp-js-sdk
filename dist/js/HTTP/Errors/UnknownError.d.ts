import RESTError from "./HTTPError";
declare class UnknownError extends RESTError {
    name: string;
}
export default UnknownError;
