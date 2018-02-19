export declare class Class {
    static expand(input: object): Promise<object[]>;
    private static getTargetFromLinkHeader(header);
    private static findContextURLs(input, contexts, base, replace?);
    private static retrieveContexts(input, contextsRequested, base);
    private static isKeyword(value);
    private static isValidType(value);
    private static expandURI(schema, uri, relativeTo?);
    private static expandLanguageMap(languageMap);
    private static getContainer(context, property);
    private static expandValue(context, value, propertyName);
    private static process(context, element, activeProperty?, insideList?);
    private static addValue(element, propertyName, value, options);
    private static hasProperty(element, propertyName);
    private static compareValues(value1, value2);
    private static hasValue(element, propertyName, value);
}
export declare class Util {
}
export default Class;
