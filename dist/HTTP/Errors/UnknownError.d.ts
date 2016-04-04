import HTTPError from "./HTTPError";
declare class UnknownError extends HTTPError {
    name: string;
}
export default UnknownError;
