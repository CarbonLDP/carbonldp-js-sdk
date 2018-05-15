import { Fragment } from "../Fragment";
import { TransientBlankNodeFactory } from "./TransientBlankNode";
export interface BlankNode extends Fragment {
}
export interface BlankNodeFactory extends TransientBlankNodeFactory {
    is(value: any): value is BlankNode;
}
export declare const BlankNode: BlankNodeFactory;
