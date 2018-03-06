import { Documents } from "./Documents";
import { ModelDecorator } from "./ModelDecorator";
import { ModelFactory } from "./ModelFactory";
import { PointerLibrary, PointerValidator } from "./Pointer";
import { Resource } from "./Resource";
export interface FreeResources extends PointerLibrary, PointerValidator {
    _documents: Documents;
    _resourcesIndex: Map<string, Resource>;
    hasResource(id: string): boolean;
    getResource(id: string): Resource;
    getResources(): Resource[];
    getPointer(id: string): Resource;
    createResource(id?: string): Resource;
    createResourceFrom<T>(object: T, id?: string): Resource & T;
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
export default FreeResources;
