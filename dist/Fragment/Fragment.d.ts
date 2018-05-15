import { Pointer } from "../Pointer";
import { Registry } from "../Registry";
import { PersistedResource } from "../Resource";
import { TransientFragment, TransientFragmentFactory } from "./TransientFragment";
export interface Fragment extends TransientFragment, PersistedResource {
    _registry: Registry<TransientFragment> & Pointer | undefined;
}
export interface FragmentFactory extends TransientFragmentFactory {
    isDecorated(object: object): object is Fragment;
    is(value: any): value is Fragment;
    decorate<T extends object>(object: T): T & Fragment;
}
export declare const Fragment: FragmentFactory;
