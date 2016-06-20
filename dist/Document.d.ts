import * as Fragment from "./Fragment";
import JSONLDConverter from "./JSONLDConverter";
import * as NamedFragment from "./NamedFragment";
import * as ObjectSchema from "./ObjectSchema";
import * as Pointer from "./Pointer";
import * as Resource from "./Resource";
export interface Class extends Resource.Class, Pointer.Library, Pointer.Validator {
    _fragmentsIndex: Map<string, Fragment.Class>;
    hasFragment(slug: string): boolean;
    getFragment(slug: string): Fragment.Class;
    getNamedFragment(slug: string): NamedFragment.Class;
    getFragments(): Fragment.Class[];
    createFragment<T extends Object>(slug: string, object: T): Fragment.Class & T;
    createFragment<T extends Object>(object: T): Fragment.Class & T;
    createFragment(): Fragment.Class;
    createFragment(slug: string): NamedFragment.Class;
    createNamedFragment<T extends Object>(slug: string, object: T): NamedFragment.Class & T;
    createNamedFragment(slug: string): NamedFragment.Class;
    removeFragment(fragment: NamedFragment.Class): void;
    removeFragment(fragment: Fragment.Class): void;
    removeFragment(slug: string): void;
    toJSON(objectSchemaResolver: ObjectSchema.Resolver, jsonldConverter: JSONLDConverter): string;
    toJSON(objectSchemaResolver: ObjectSchema.Resolver): string;
    toJSON(): string;
}
export declare class Factory {
    static hasClassProperties(documentResource: Object): boolean;
    static is(object: Object): boolean;
    static create(): Class;
    static createFrom<T extends Object>(object: T): T & Class;
    static decorate<T extends Object>(object: T): T & Class;
}
export default Class;
