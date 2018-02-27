import { Response } from "./HTTP/Response";
import { ModelDecorator } from "./ModelDecorator";
import { ModelFactory } from "./ModelFactory";
import * as PersistedDocument from "./PersistedDocument";
export interface Pointer {
    _id: string;
    _resolved: boolean;
    id: string;
    isResolved(): boolean;
    resolve<T>(): Promise<[T & PersistedDocument.Class, Response]>;
}
export interface PointerLibrary {
    hasPointer(id: string): boolean;
    getPointer(id: string): Pointer;
}
export interface PointerValidator {
    inScope(idOrPointer: string | Pointer): boolean;
}
export interface PointerFactory extends ModelFactory<Pointer>, ModelDecorator<Pointer> {
    isDecorated(object: object): object is Pointer;
    is(object: object): object is Pointer;
    create(id?: string): Pointer;
    createFrom<T extends object>(object: T, id?: string): T & Pointer;
    decorate<T extends object>(object: T): T & Pointer;
    areEqual(pointer1: Pointer, pointer2: Pointer): boolean;
    getIDs(pointers: Pointer[]): string[];
    resolveAll<T extends object>(pointers: Pointer[]): Promise<[(T & PersistedDocument.Class)[], Response[]]>;
}
export declare function isPointerResolved(this: Pointer): boolean;
export declare function resolveStandalonePointer(this: Pointer): Promise<[Pointer, Response]>;
export declare const Pointer: PointerFactory;
export default Pointer;
