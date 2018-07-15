export declare function hasFunction(object: Object, functionName: string): boolean;
export declare function hasProperty(object: Object, property: string): boolean;
export declare function hasPropertyDefined(object: Object, property: string): boolean;
export declare function isDefined(value: any): boolean;
export declare function isNull(value: any): boolean;
export declare function isArray(object: any): object is Array<any>;
export declare function isString(value: any): value is string;
export declare function isBoolean(value: any): value is boolean;
export declare function isNumber(value: any): value is number;
export declare function isInteger(value: any): boolean;
export declare function isDouble(value: any): boolean;
export declare function isDate(date: any): date is Date;
export declare function isObject(object: any): object is object;
export declare function isPlainObject(object: Object): boolean;
export declare function isFunction(value: any): value is Function;
export declare function isMap(value: any): boolean;
export declare function parseBoolean(value: string): boolean;
export declare function forEachOwnProperty(object: Object, action: (name: string, value: any) => (boolean | void)): void;
export declare function promiseMethod<T>(fn?: () => T | Promise<T>): Promise<T>;
export declare function mapTupleArray<T, W>(tuples: [T, W][]): [T[], W[]];
export declare class ArrayUtils {
    static from<T>(iterator: Iterator<T>): Array<T>;
    static joinWithoutDuplicates<T>(...arrays: Array<Array<T>>): Array<T>;
    static indexOf<T, W>(array: Array<T>, searchedElement: W, comparator?: (element: T, searchedElement: W) => boolean): number;
}
export declare class ObjectUtils {
    static extend<T extends object, W extends object>(target: T, source: W, config?: {
        arrays?: boolean;
        objects?: boolean;
    }): T & W;
    static clone<T extends Object>(object: T, config?: {
        arrays?: boolean;
        objects?: boolean;
    }): T;
    static areEqual(object1: Object, object2: Object, config?: {
        arrays?: boolean;
        objects?: boolean;
    }, ignore?: {
        [key: string]: boolean;
    }): boolean;
    static areShallowlyEqual(object1: Object, object2: Object): boolean;
}
export declare class StringUtils {
    static startsWith(str: string, substring: string): boolean;
    static endsWith(str: string, substring: string): boolean;
    static contains(str: string, substring: string): boolean;
}
export declare class MapUtils {
    static from<V>(object: Object): Map<string, V>;
    static extend<K, V>(toExtend: Map<K, V>, ...extenders: Map<K, V>[]): Map<K, V>;
}
export declare class UUIDUtils {
    private static regExp;
    static is(uuid: string): boolean;
    static generate(): string;
}
export declare type PickSelfProps<B extends object, A extends object, O extends keyof B = never> = Pick<B, Exclude<keyof B, keyof A> | O>;
