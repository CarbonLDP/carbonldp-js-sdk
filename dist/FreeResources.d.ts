import { Documents } from "./Documents";
import { ModelDecorator } from "./core/ModelDecorator";
import { ModelFactory } from "./core/ModelFactory";
import { PointerLibrary, PointerValidator } from "./Pointer";
import { TransientResource } from "./Resource";
export interface FreeResources extends PointerLibrary, PointerValidator {
    _documents: Documents;
    _resourcesIndex: Map<string, TransientResource>;
    hasResource(id: string): boolean;
    getResource(id: string): TransientResource;
    getResources(): TransientResource[];
    getPointer(id: string): TransientResource;
    createResource(id?: string): TransientResource;
    createResourceFrom<T>(object: T, id?: string): TransientResource & T;
    toJSON(): object;
}
export interface FreeResourcesFactory extends ModelFactory<FreeResources>, ModelDecorator<FreeResources> {
    is(object: object): object is FreeResources;
    isDecorated(object: object): object is FreeResources;
    create(documents: Documents): FreeResources;
    createFrom<T extends object>(object: T, documents: Documents): T & FreeResources;
    decorate<T extends object>(object: T, documents: Documents): T & FreeResources;
}
export declare const FreeResources: FreeResourcesFactory;
