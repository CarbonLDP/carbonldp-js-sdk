import { Document } from "./Document";
import { ModelDecorator } from "./ModelDecorator";
import { ModelFactory } from "./ModelFactory";
import { Resource } from "./Resource";
export interface Fragment extends Resource {
    _document: Document;
}
export interface FragmentFactory extends ModelFactory<Fragment>, ModelDecorator<Fragment> {
    isDecorated(object: object): object is Fragment;
    is(object: object): object is Fragment;
    create(document: Document, id?: string): Fragment;
    createFrom<T extends object>(object: T, document: Document, id?: string): T & Fragment;
    decorate<T extends object>(object: T): T & Fragment;
}
export declare const Fragment: FragmentFactory;
export default Fragment;
