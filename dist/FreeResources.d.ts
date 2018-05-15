import { AbstractContext } from "./AbstractContext";
import { ModelDecorator, ModelFactory } from "./core";
import { Pointer } from "./Pointer";
import { RDFNode } from "./RDF";
import { Registry, RegistryService } from "./Registry";
import { TransientResource } from "./Resource";
import { PickSelfProps } from "./Utils";
export interface BaseFreeResources {
    _registry: RegistryService<Pointer, any>;
    _context: AbstractContext<Pointer, any>;
}
export interface FreeResources extends Registry<TransientResource> {
    _context: AbstractContext<Pointer, any> | undefined;
    _registry: RegistryService<Pointer, any> | undefined;
    _getLocalID(id: string): string | null;
    _register<T extends object>(base: T & {
        id?: string;
    }): T & TransientResource;
    toJSON(): RDFNode[];
}
export interface FreeResourcesFactory extends ModelFactory<FreeResources>, ModelDecorator<FreeResources, BaseFreeResources> {
    PROTOTYPE: PickSelfProps<FreeResources, Registry<TransientResource>, "_context" | "_registry" | "_getLocalID" | "_register">;
    is(value: any): value is FreeResources;
    isDecorated(object: object): object is FreeResources;
    create<T extends object>(data: T & BaseFreeResources): T & FreeResources;
    createFrom<T extends object>(object: T & BaseFreeResources): T & FreeResources;
    decorate<T extends object>(object: T): T & FreeResources;
}
export declare const FreeResources: FreeResourcesFactory;
