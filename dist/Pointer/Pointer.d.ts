import { Registry } from "../Registry";
import { BasePointer } from "./BasePointer";
export interface Pointer {
    id: string;
    _registry: Registry<Pointer> | undefined;
    _id: string;
}
export interface PointerFactory {
    isDecorated(object: object): object is Pointer;
    is(value: any): value is Pointer;
    create<T extends object>(data?: T & BasePointer): T & Pointer;
    createFrom<T extends object>(object: T & BasePointer): T & Pointer;
    decorate<T extends object>(object: T): T & Pointer;
    areEqual(pointer1: Pointer, pointer2: Pointer): boolean;
    getIDs(pointers: Pointer[]): string[];
    getID(pointerOrIRI: Pointer | string): string;
}
export declare const Pointer: PointerFactory;
