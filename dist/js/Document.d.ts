/// <reference path="../typings/es6/es6.d.ts" />
import * as Fragment from "./Fragment";
import * as NamedFragment from "./NamedFragment";
import * as RDF from "./RDF";
export interface Class extends RDF.Resource.Class {
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
    toJSON(): string;
}
export declare class Factory extends RDF.Resource.Factory {
    static hasClassProperties(documentResource: RDF.Resource.Class): boolean;
    from(rdfDocuments: RDF.Document.Class[]): Class[];
    from(rdfDocument: RDF.Document.Class): Class;
    protected singleFrom(rdfDocument: RDF.Document.Class): Class;
    protected injectBehavior(resource: RDF.Node.Class): Class;
}
export declare var factory: Factory;
export default Document;
