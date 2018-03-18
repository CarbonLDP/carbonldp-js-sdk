import { HTTPError } from "./HTTPError";
import { UnknownError } from "./UnknownError";
export * from "./ClientErrors";
export * from "./ServerErrors";
declare const statusCodeMap: Map<number, typeof HTTPError>;
export { HTTPError, UnknownError, statusCodeMap };
