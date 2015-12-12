/// <reference path="../typings/tsd.d.ts" />
import * as Fragment from "./Fragment";
import * as NamedFragment from "./NamedFragment";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
export interface Class extends Pointer.Library, Pointer.Validator {
    _fragmentsIndex: Map<string, Fragment.Class>;
    uri: string;
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
    toJSON(): string;
}
export declare class Factory {
    hasClassProperties(documentResource: Object): boolean;
    create(uri: string): Class;
    create(): Class;
    createFrom<T extends Object>(object: T, uri: string): T & Class;
    createFrom<T extends Object>(object: T): T & Class;
    decorate<T extends Object>(object: T): T & Class;
    from(rdfDocuments: RDF.Document.Class[]): Class[];
    from(rdfDocument: RDF.Document.Class): Class;
    protected singleFrom(rdfDocument: RDF.Document.Class): Class;
}
export declare var factory: Factory;
export default Document;
