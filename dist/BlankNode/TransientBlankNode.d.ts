import { TransientFragment } from "../Fragment";
import { BaseBlankNode } from "./BaseBlankNode";
export interface TransientBlankNode extends TransientFragment {
}
export interface TransientBlankNodeFactory {
    is(value: any): value is TransientBlankNode;
    create<T extends object>(data: T & BaseBlankNode): T & TransientBlankNode;
    createFrom<T extends object>(object: T & BaseBlankNode): T & TransientBlankNode;
    decorate<T extends object>(object: T): T & TransientBlankNode;
}
export declare const TransientBlankNode: TransientBlankNodeFactory;
