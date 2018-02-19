import * as Fragment from "./Fragment";
import JSONLDConverter from "./JSONLD/Converter";
import * as NamedFragment from "./NamedFragment";
import * as ObjectSchema from "./ObjectSchema";
import * as Pointer from "./Pointer";
import * as Resource from "./Resource";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Resource.Class, Pointer.Library, Pointer.Validator {
    defaultInteractionModel?: Pointer.Class;
    isMemberOfRelation?: Pointer.Class;
    hasMemberRelation?: Pointer.Class;
    _fragmentsIndex: Map<string, Fragment.Class>;
    _normalize(): void;
    _removeFragment(fragment: Fragment.Class): void;
    _removeFragment(slug: string): void;
    hasFragment(slug: string): boolean;
    getFragment<T>(slug: string): T & Fragment.Class;
    getNamedFragment<T>(slug: string): T & NamedFragment.Class;
    getFragments(): Fragment.Class[];
    createFragment<T>(object: T, slug: string): T & Fragment.Class;
    createFragment<T>(object: T): T & Fragment.Class;
    createFragment(slug: string): Fragment.Class;
    createFragment(): Fragment.Class;
    createNamedFragment<T>(object: T, slug: string): T & NamedFragment.Class;
    createNamedFragment(slug: string): NamedFragment.Class;
    removeNamedFragment(fragment: NamedFragment.Class): void;
    removeNamedFragment(slug: string): void;
    toJSON(objectSchemaResolver: ObjectSchema.Resolver, jsonldConverter: JSONLDConverter): string;
    toJSON(objectSchemaResolver: ObjectSchema.Resolver): string;
    toJSON(): string;
}
export declare class Factory {
    static hasClassProperties(documentResource: object): boolean;
    static is(object: object): object is Class;
    static create(): Class;
    static createFrom<T extends object>(object: T): T & Class;
    static decorate<T extends object>(object: T): T & Class;
}
export default Class;
