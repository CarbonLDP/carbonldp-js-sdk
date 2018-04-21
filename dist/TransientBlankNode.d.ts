import { TransientDocument } from "./TransientDocument";
import { TransientFragment } from "./TransientFragment";
import { ModelFactory } from "./core/ModelFactory";
export interface TransientBlankNode extends TransientFragment {
}
export interface TransientBlankNodeFactory extends ModelFactory<TransientBlankNode> {
    is(object: object): object is TransientBlankNode;
    create(document: TransientDocument, id?: string): TransientBlankNode;
    createFrom<T extends object>(object: T, document: TransientDocument, id?: string): T & TransientBlankNode;
}
export declare const TransientBlankNode: TransientBlankNodeFactory;
