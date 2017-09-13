import { Class as Context } from "../Context";
export declare function validateEventContext(context: Context): void;
export declare function validateEventType(eventType: string): void;
export declare function parseURIPattern(uriPattern: string, baseURI: string): string;
export declare function createDestination(eventType: string, uriPattern: string, baseURI: string): string;
