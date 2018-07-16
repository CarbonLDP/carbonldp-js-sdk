export declare class JSONLDProcessor {
    static expand(input: object): Promise<object[]>;
    private static getTargetFromLinkHeader;
    private static findContextURLs;
    private static retrieveContexts;
    private static isKeyword;
    private static isValidType;
    private static expandURI;
    private static expandLanguageMap;
    private static getContainer;
    private static expandValue;
    private static process;
    private static addValue;
    private static hasProperty;
    private static compareValues;
    private static hasValue;
}
