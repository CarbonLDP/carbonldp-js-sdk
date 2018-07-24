export declare class JSONLDProcessor {
    static expand(input: object): Promise<object[]>;
    private static __getTargetFromLinkHeader(header);
    private static __findContextURLs(input, contexts, base, replace?);
    private static __retrieveContexts(input, contextsRequested, base);
    private static __isKeyword(value);
    private static __isValidType(value);
    private static __expandURI(schema, uri, relativeTo?);
    private static __expandLanguageMap(languageMap);
    private static __getContainer(context, property);
    private static __expandValue(context, value, propertyName);
    private static __process(context, element, activeProperty?, insideList?);
    private static __addValue(element, propertyName, value, options);
    private static __hasProperty(element, propertyName);
    private static __compareValues(value1, value2);
    private static __hasValue(element, propertyName, value);
}
