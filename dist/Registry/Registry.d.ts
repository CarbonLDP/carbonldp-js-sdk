import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";
import { Pointer } from "../Pointer/Pointer";
import { PointerLibrary } from "../Pointer/PointerLibrary";
import { PointerValidator } from "../Pointer/PointerValidator";
import { BaseRegisteredPointer } from "./BaseRegisteredPointer";
import { BaseRegistry } from "./BaseRegistry";
import { RegisteredPointer } from "./RegisteredPointer";
export interface Registry<M extends RegisteredPointer = RegisteredPointer> extends PointerLibrary, PointerValidator {
    readonly $registry: Registry<any> | undefined;
    readonly $__modelDecorator: ModelDecorator<M, BaseRegisteredPointer>;
    readonly $__resourcesMap: Map<string, M>;
    $inScope(idOrPointer: string | Pointer): boolean;
    $inScope(idOrPointer: string | Pointer, local: true): boolean;
    $hasPointer(id: string): boolean;
    $hasPointer(id: string, local: true): boolean;
    $getPointer(id: string): RegisteredPointer;
    $getPointer(id: string, local: true): M;
    $getPointers(): RegisteredPointer[];
    $getPointers(local: true): M[];
    $removePointer(idOrPointer: string | RegisteredPointer): boolean;
    $removePointer(idOrPointer: string | RegisteredPointer, local: true): boolean;
    $_getLocalID(id: string): string;
    $_addPointer<T extends object>(pointer: T & Pointer): T & M;
}
export declare type RegistryFactory = ModelPrototype<Registry> & ModelDecorator<Registry<any>, BaseRegistry> & ModelFactory<Registry, BaseRegistry>;
export declare const Registry: RegistryFactory;
