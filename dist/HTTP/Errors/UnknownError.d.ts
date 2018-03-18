import { HTTPError } from "./HTTPError";
export declare class UnknownError extends HTTPError {
    readonly name: string;
}
export default UnknownError;
