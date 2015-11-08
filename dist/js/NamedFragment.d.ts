import * as Document from './Document';
import * as Fragment from './Fragment';
export interface Class extends Fragment.Class {
    slug: string;
}
export declare class Factory extends Fragment.Factory {
    from(object: Array<Object & {
        document: Document.Class;
    }>): Class[];
    from(object: Object & {
        document: Document.Class;
    }): Class;
    protected singleFrom(object: Object & {
        document: Document.Class;
    }): Class;
    protected injectBehavior(node: (Object & {
        document: Document.Class;
    })): Class;
    protected hasClassProperties(resource: Fragment.Class): boolean;
}
export declare var factory: Factory;
export default Class;
