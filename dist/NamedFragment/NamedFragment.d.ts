import { Fragment } from "../Fragment";
import { TransientNamedFragment, TransientNamedFragmentFactory } from "./TransientNamedFragment";
export interface NamedFragment extends Fragment, TransientNamedFragment {
}
export interface NamedFragmentFactory extends TransientNamedFragmentFactory {
    isDecorated(object: object): object is NamedFragment;
    decorate<T extends object>(object: T): T & NamedFragment;
    is(value: any): value is NamedFragment;
}
export declare const NamedFragment: NamedFragmentFactory;
