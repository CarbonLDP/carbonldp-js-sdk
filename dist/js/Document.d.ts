/// <reference path="../typings/typings.d.ts" />
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
    createFragment(): Fragment.Class;
    createFragment(slug: string): NamedFragment.Class;
    createNamedFragment(slug: string): NamedFragment.Class;
    removeFragment(fragment: NamedFragment.Class): void;
    removeFragment(fragment: Fragment.Class): void;
    removeFragment(slug: string): void;
    removeFragment(fragmentOrSlug: any): void;
    toJSON(objectSchemaResolver: ObjectSchema.Resolver, jsonldConverter: JSONLDConverter): string;
    toJSON(objectSchemaResolver: ObjectSchema.Resolver): string;
    toJSON(): string;
}
export declare class Factory {
    hasClassProperties(documentResource: Object): boolean;
    create(uri: string): Class;
    create(): Class;
    createFrom<T extends Object>(object: T, uri: string): T & Class;
    createFrom<T extends Object>(object: T): T & Class;
    decorate<T extends Object>(object: T): T & Class;
}
export declare var factory: Factory;
export default Document;
