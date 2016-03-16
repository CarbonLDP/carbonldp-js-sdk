declare function hasFunction(object: Object, functionName: string): boolean;
declare function hasProperty(object: Object, property: string): boolean;
declare function hasPropertyDefined(object: Object, property: string): boolean;
declare function isDefined(value: any): boolean;
declare function isNull(value: any): boolean;
declare function isArray(object: any): boolean;
declare function isString(value: any): boolean;
declare function isBoolean(value: any): boolean;
declare function isNumber(value: any): boolean;
declare function isInteger(value: any): boolean;
declare function isDouble(value: any): boolean;
declare function isDate(date: any): boolean;
declare function isObject(object: any): boolean;
declare function isFunction(value: any): boolean;
declare function isMap(value: any): boolean;
declare function parseBoolean(value: string): boolean;
declare function extend(target: Object, ...objects: Object[]): Object;
declare function forEachOwnProperty(object: Object, action: (name: string, value: any) => (boolean | void)): void;
declare class O {
    static areShallowlyEqual(object1: Object, object2: Object): boolean;
}
declare class S {
    static startsWith(str: string, substring: string): boolean;
    static endsWith(str: string, substring: string): boolean;
    static contains(str: string, substring: string): boolean;
}
declare class A {
    static from<T>(iterator: Iterator<T>): Array<T>;
    static joinWithoutDuplicates<T>(...arrays: Array<Array<T>>): Array<T>;
}
declare class M {
    static from<V>(object: Object): Map<string, V>;
    static extend<K, V>(toExtend: Map<K, V>, ...extenders: Map<K, V>[]): Map<K, V>;
}
declare class UUID {
    private static regExp;
    static is(uuid: string): boolean;
    static generate(): string;
}
declare class P {
    static createRejectedPromise<T extends Error>(error: T): Promise<any>;
}
export { hasFunction, hasProperty, hasPropertyDefined, isDefined, isNull, isArray, isString, isBoolean, isNumber, isInteger, isDouble, isDate, isObject, isFunction, isMap, parseBoolean, extend, forEachOwnProperty, O, S, A, M, UUID, P };
