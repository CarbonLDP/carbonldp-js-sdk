interface Value {
    '@id'?: string;
    '@type'?: string;
    '@value'?: string;
}
declare class Util {
    static areEqual(value1: Value, value2: Value): boolean;
}
export { Value as Class, Util };
