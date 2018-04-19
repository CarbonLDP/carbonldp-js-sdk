import { TransientDocument } from "./TransientDocument";
import { Fragment } from "./Fragment";
import { ModelFactory } from "./ModelFactory";
export interface BlankNode extends Fragment {
}
export interface BlankNodeFactory extends ModelFactory<BlankNode> {
    is(object: object): object is BlankNode;
    create(document: TransientDocument, id?: string): BlankNode;
    createFrom<T extends object>(object: T, document: TransientDocument, id?: string): T & BlankNode;
}
export declare const BlankNode: BlankNodeFactory;
