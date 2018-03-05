import { DigestedObjectSchema } from "../ObjectSchema";
export interface URIFactory {
    hasFragment(uri: string): boolean;
    hasQuery(uri: string): boolean;
    hasProtocol(uri: string): boolean;
    isAbsolute(uri: string): boolean;
    isRelative(uri: string): boolean;
    isBNodeID(uri: string): boolean;
    generateBNodeID(): string;
    isPrefixed(uri: string): boolean;
    isFragmentOf(fragmentURI: string, uri: string): boolean;
    isBaseOf(baseURI: string, uri: string): boolean;
    getRelativeURI(absoluteURI: string, base: string): string;
    getDocumentURI(uri: string): string;
    getFragment(uri: string): string;
    getSlug(uri: string): string;
    getParameters(uri: string): Map<string, string | string[]>;
    resolve(parentURI: string, childURI: string): string;
    removeProtocol(uri: string): string;
    prefix(uri: string, prefix: string, prefixURI: string): string;
    prefix(uri: string, objectSchema: DigestedObjectSchema): string;
}
export declare const URI: URIFactory;
export default URI;
