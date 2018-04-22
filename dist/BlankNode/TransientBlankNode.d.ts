import { TransientFragment } from "../Fragment";
import { BaseBlankNode } from "./BaseBlankNode";
export interface TransientBlankNode extends TransientFragment {
}
export interface TransientBlankNodeFactory {
    is(value: any): value is TransientBlankNode;
    create<T extends BaseBlankNode>(data: T): T & TransientBlankNode;
    createFrom<T extends BaseBlankNode>(object: T): T & TransientBlankNode;
}
export declare const TransientBlankNode: TransientBlankNodeFactory;
