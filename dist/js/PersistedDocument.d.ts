import Context from "./Context";
import * as Document from "./Document";
import * as PersistedResource from "./PersistedResource";
export interface Class extends PersistedResource.Class, Document.Class {
    _context: Context;
    _etag: string;
    refresh(): Promise<void>;
    save(): Promise<void>;
    destroy(): Promise<void>;
}
export declare class Factory {
    static hasClassProperties(document: Document.Class): boolean;
    static from(documents: Document.Class[], context: Context): Class[];
    static from(document: Document.Class, context: Context): Class;
    protected static singleFrom(document: Document.Class, context: Context): Class;
    protected static injectBehavior(persisted: (Document.Class & PersistedResource.Class), context: Context): Class;
}
export default Class;
