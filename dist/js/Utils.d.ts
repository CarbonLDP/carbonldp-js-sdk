/// <reference path="../typings/es6/es6.d.ts" />
declare function hasFunction(object: Object, functionName: string): boolean;
declare function hasProperty(object: Object, property: string): boolean;
declare function hasPropertyDefined(object: Object, property: string): boolean;
declare function isNull(value: any): boolean;
declare function isArray(object: any): boolean;
declare function isString(string: any): boolean;
declare function isBoolean(boolean: any): boolean;
declare function isNumber(number: any): boolean;
declare function isInteger(number: any): boolean;
declare function isDouble(number: any): boolean;
declare function isDate(date: any): boolean;
declare function isObject(object: any): boolean;
declare function isFunction(value: any): boolean;
declare function isMap(value: any): boolean;
declare function parseBoolean(value: string): boolean;
declare function extend(target: Object, ...objects: Object[]): Object;
declare function forEachOwnProperty(object: Object, action: (name: string, value: any) => void): void;
declare class S {
    static startsWith(string: string, substring: string): boolean;
    static endsWith(string: string, substring: string): boolean;
    static contains(string: string, substring: string): boolean;
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
export { hasFunction, hasProperty, hasPropertyDefined, isNull, isArray, isString, isBoolean, isNumber, isInteger, isDouble, isDate, isObject, isFunction, isMap, parseBoolean, extend, forEachOwnProperty, S, A, M, UUID };
