import { TransientDocument } from "../Document";
import { ModelFactory } from "../core/ModelFactory";
import { Pointer } from "../Pointer";
export interface TransientDirectContainer extends TransientDocument {
    membershipResource: Pointer;
    hasMemberRelation: Pointer;
}
export interface TransientDirectContainerFactory extends ModelFactory<TransientDirectContainer> {
    TYPE: string;
    is(object: object): object is TransientDirectContainer;
    create(membershipResource: Pointer, hasMemberRelation: string | Pointer, isMemberOfRelation?: string | Pointer): TransientDirectContainer;
    createFrom<T extends object>(object: T, membershipResource: Pointer, hasMemberRelation: string | Pointer, isMemberOfRelation?: string | Pointer): T & TransientDirectContainer;
}
export declare const TransientDirectContainer: TransientDirectContainerFactory;
