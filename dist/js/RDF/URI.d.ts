declare class Util {
    static hasFragment(uri: string): boolean;
    static hasProtocol(uri: string): boolean;
    static isAbsolute(uri: string): boolean;
    static isRelative(uri: string): boolean;
    static isBNodeID(uri: string): boolean;
    static getDocumentURI(uri: string): string;
    static getFragment(uri: string): string;
    static resolve(parentURI: string, childURI: string): string;
    static removeProtocol(uri: string): string;
}
export { Util };
