import * as Document from './Document';
import * as RDF from './RDF';
export interface Class extends RDF.Resource.Class {
    document: Document.Class;
}
export declare class Factory extends RDF.Resource.Factory {
    from(object: Array<Object & {
        document: Document.Class;
    }>): Class[];
    from(object: Object & {
        document: Document.Class;
    }): Class;
    protected singleFrom(object: Object & {
        document: Document.Class;
    }): Class;
    protected injectBehavior(object: (Object & {
        document: Document.Class;
    })): Class;
    protected hasClassProperties(resource: RDF.Resource.Class): boolean;
}
export declare var factory: Factory;
export declare class Util {
    static generateID(): string;
}
export default Class;
