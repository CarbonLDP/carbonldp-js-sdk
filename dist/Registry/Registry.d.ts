import { Context } from "../Context";
import { Pointer, PointerLibrary, PointerValidator } from "../Pointer";
import { PickSelfProps } from "../Utils";
export interface Registry<M extends Pointer> extends PointerLibrary, PointerValidator {
    _context: Context | undefined;
    _registry: Registry<any> | undefined;
    readonly _resourcesMap: Map<string, M>;
    inScope(idOrPointer: string | Pointer): boolean;
    inScope(idOrPointer: string | Pointer, local: true): boolean;
    hasPointer(id: string): boolean;
    hasPointer(id: string, local: true): boolean;
    getPointer(id: string): Pointer;
    getPointer(id: string, local: true): M;
    getPointers(): Pointer[];
    getPointers(local: true): M[];
    removePointer(idOrPointer: string | Pointer): boolean;
    removePointer(idOrPointer: string | Pointer, local: true): boolean;
    _getLocalID(id: string): string;
    _register<T extends object>(base: T & {
        id: string;
    }): T & M;
}
export interface RegistryFactory {
    PROTOTYPE: PickSelfProps<Registry<Pointer>, {}>;
    isDecorated(object: object): object is Registry<any>;
    decorate<T extends object>(object: T): T & Registry<any>;
}
export declare const Registry: RegistryFactory;
