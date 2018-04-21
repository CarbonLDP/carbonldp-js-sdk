import { Document } from "../Document";
import { GETOptions } from "../HTTP";
import { QueryDocumentBuilder } from "../SPARQL/QueryDocument";
import { BasePointer } from "./BasePointer";
export interface Pointer {
    _id: string;
    _resolved: boolean;
    id: string;
    isResolved(): boolean;
    resolve<T extends object>(requestOptions?: GETOptions, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & this & Document>;
    resolve<T extends object>(queryBuilderFn?: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & this & Document>;
}
export interface PointerFactory {
    isDecorated(object: object): object is Pointer;
    is(value: any): value is Pointer;
    create<T extends BasePointer>(data?: T): T & Pointer;
    createFrom<T extends BasePointer>(object: T): T & Pointer;
    decorate<T extends object>(object: T): T & Pointer;
    areEqual(pointer1: Pointer, pointer2: Pointer): boolean;
    getIDs(pointers: Pointer[]): string[];
}
export declare function isPointerResolved(this: Pointer): boolean;
export declare function resolveStandalonePointer(this: Pointer): Promise<never>;
export declare const Pointer: PointerFactory;
