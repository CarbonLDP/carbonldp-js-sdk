import { TransientDocument } from "../TransientDocument";
import { ModelFactory } from "../ModelFactory";
import { Pointer } from "../Pointer";
export interface DirectContainer extends TransientDocument {
    membershipResource: Pointer;
    hasMemberRelation: Pointer;
}
export interface DirectContainerFactory extends ModelFactory<DirectContainer> {
    TYPE: string;
    is(object: object): object is DirectContainer;
    create(membershipResource: Pointer, hasMemberRelation: string | Pointer, isMemberOfRelation?: string | Pointer): DirectContainer;
    createFrom<T extends object>(object: T, membershipResource: Pointer, hasMemberRelation: string | Pointer, isMemberOfRelation?: string | Pointer): T & DirectContainer;
}
export declare const DirectContainer: DirectContainerFactory;
