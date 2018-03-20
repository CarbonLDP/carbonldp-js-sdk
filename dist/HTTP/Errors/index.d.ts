import { HTTPError } from "./HTTPError";
export * from "./ClientErrors";
export * from "./ServerErrors";
export * from "./HTTPError";
export * from "./UnknownError";
export declare const statusCodeMap: Map<number, typeof HTTPError>;
