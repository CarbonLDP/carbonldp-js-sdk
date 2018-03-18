import { Context } from "../Context";
export declare function validateEventContext(context: Context): void;
export declare function validateEventType(event: string): void;
export declare function parseURIPattern(uriPattern: string, baseURI: string): string;
export declare function createDestination(event: string, uriPattern: string, baseURI: string): string;
