import { ModelDecorator, ModelFactory, ModelPrototype, ModelTypeGuard } from "../Model";
import { BasePointer } from "./BasePointer";
export interface Pointer {
    $id: string;
}
export interface PointerFactory extends ModelPrototype<Pointer>, ModelDecorator<Pointer, BasePointer>, ModelTypeGuard<Pointer>, ModelFactory<Pointer, BasePointer> {
    create<T extends object>(data?: T & BasePointer): T & Pointer;
    areEqual(pointer1: Pointer, pointer2: Pointer): boolean;
    getIDs(pointers: Pointer[]): string[];
    getID(pointerOrIRI: Pointer | string): string;
}
export declare const Pointer: PointerFactory;
