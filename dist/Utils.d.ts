declare function hasFunction(object: Object, functionName: string): boolean;
declare function hasProperty(object: Object, property: string): boolean;
declare function hasPropertyDefined(object: Object, property: string): boolean;
declare function isDefined(value: any): boolean;
declare function isNull(value: any): boolean;
declare function isArray(object: any): boolean;
declare function isString(value: any): value is string;
declare function isBoolean(value: any): value is boolean;
declare function isNumber(value: any): value is number;
declare function isInteger(value: any): boolean;
declare function isDouble(value: any): boolean;
declare function isDate(date: any): date is Date;
declare function isObject(object: any): object is object;
declare function isPlainObject(object: Object): boolean;
declare function isFunction(value: any): value is Function;
declare function isMap(value: any): boolean;
declare function parseBoolean(value: string): boolean;
declare function extend(target: Object, ...objects: Object[]): Object;
declare function forEachOwnProperty(object: Object, action: (name: string, value: any) => (boolean | void)): void;
export declare function promiseMethod<T>(fn: () => T | Promise<T>): Promise<T>;
declare class A {
    static from<T>(iterator: Iterator<T>): Array<T>;
    static joinWithoutDuplicates<T>(...arrays: Array<Array<T>>): Array<T>;
    static indexOf<T, W>(array: Array<T>, searchedElement: W, comparator?: (element: T, searchedElement: W) => boolean): number;
}
declare class O {
    static extend<T extends Object, W extends Object>(target: T, source: W, config?: {
        arrays?: boolean;
        objects?: boolean;
    }, ignore?: {
        [key: string]: boolean;
    }): T & W;
    static clone<T extends Object>(object: T, config?: {
        arrays?: boolean;
        objects?: boolean;
    }, ignore?: {
        [key: string]: boolean;
    }): T;
    static areEqual(object1: Object, object2: Object, config?: {
        arrays?: boolean;
        objects?: boolean;
    }, ignore?: {
        [key: string]: boolean;
    }): boolean;
    static areShallowlyEqual(object1: Object, object2: Object): boolean;
}
declare class S {
    static startsWith(str: string, substring: string): boolean;
    static endsWith(str: string, substring: string): boolean;
    static contains(str: string, substring: string): boolean;
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
export { hasFunction, hasProperty, hasPropertyDefined, isDefined, isNull, isArray, isString, isBoolean, isNumber, isInteger, isDouble, isDate, isObject, isPlainObject, isFunction, isMap, parseBoolean, extend, forEachOwnProperty, O, S, A, M, UUID };
