import { TransientDocument } from "./TransientDocument";
import { ModelDecorator } from "./ModelDecorator";
import { ModelFactory } from "./ModelFactory";
import { Resource } from "./Resource";
export interface Fragment extends Resource {
    _document: TransientDocument;
}
export interface FragmentFactory extends ModelFactory<Fragment>, ModelDecorator<Fragment> {
    isDecorated(object: object): object is Fragment;
    is(object: object): object is Fragment;
    create(document: TransientDocument, id?: string): Fragment;
    createFrom<T extends object>(object: T, document: TransientDocument, id?: string): T & Fragment;
    decorate<T extends object>(object: T): T & Fragment;
}
export declare const Fragment: FragmentFactory;
