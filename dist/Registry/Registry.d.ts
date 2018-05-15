import { Context } from "../Context";
import { ModelDecorator } from "../core";
import { Pointer, PointerLibrary, PointerValidator } from "../Pointer";
import { PickSelfProps } from "../Utils";
export interface BaseRegistry<M extends Pointer> {
    _context?: Context;
    _registry?: Registry<any>;
    _model: ModelDecorator<M>;
}
export interface Registry<M extends Pointer> extends PointerLibrary, PointerValidator {
    _context: Context | undefined;
    _registry: Registry<any> | undefined;
    readonly _resourcesMap: Map<string, M>;
    inScope(idOrPointer: string | Pointer): boolean;
    hasPointer(id: string): boolean;
    hasPointer(id: string, local: true): boolean;
    getPointer(id: string): Pointer;
    getPointer(id: string, local: true): M;
    getPointers(): Pointer[];
    getPointers(local: true): M[];
    removePointer(idOrPointer: string | Pointer): boolean;
    removePointer(idOrPointer: string | Pointer, local: true): boolean;
    _getLocalID(id: string): string | null;
    _register<T extends object>(base: T & {
        id: string;
    }): T & M;
}
export interface RegistryFactory {
    PROTOTYPE: PickSelfProps<Registry<Pointer>, {}>;
    isDecorated(object: object): object is Registry<any>;
    decorate<T extends object>(object: T): T & Registry<any>;
    create<T extends object, M extends Pointer>(base: T & BaseRegistry<M>): T & Registry<M>;
}
export declare const Registry: RegistryFactory;
