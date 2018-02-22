import { Document } from "./";
export declare const isDecoratedDocument: (object: object) => object is Document;
export declare const isDocument: (object: object) => object is Document;
export declare const createDocument: () => Document;
export declare const createDocumentFrom: <T extends object>(object: T) => T & Document;
export declare const decorateDocument: <T extends object>(object: T) => T & Document;
