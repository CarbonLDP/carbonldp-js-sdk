import HTTPError from "./HTTPError";
declare class UnknownError extends HTTPError {
    readonly name: string;
}
export default UnknownError;
