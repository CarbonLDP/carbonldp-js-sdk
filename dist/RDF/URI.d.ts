import * as ObjectSchema from "./../ObjectSchema";
export declare class Util {
    static hasFragment(uri: string): boolean;
    static hasQuery(uri: string): boolean;
    static hasProtocol(uri: string): boolean;
    static isAbsolute(uri: string): boolean;
    static isRelative(uri: string): boolean;
    static isBNodeID(uri: string): boolean;
    static generateBNodeID(): string;
    static isPrefixed(uri: string): boolean;
    static isFragmentOf(fragmentURI: string, uri: string): boolean;
    static isBaseOf(baseURI: string, uri: string): boolean;
    static getRelativeURI(absoluteURI: string, base: string): string;
    static getDocumentURI(uri: string): string;
    static getFragment(uri: string): string;
    static getSlug(uri: string): string;
    static getParameters(uri: string): Map<string, string | string[]>;
    static resolve(parentURI: string, childURI: string): string;
    static removeProtocol(uri: string): string;
    static prefix(uri: string, prefix: string, prefixURI: string): string;
    static prefix(uri: string, objectSchema: ObjectSchema.DigestedObjectSchema): string;
}
