import { ModelFactory } from "../ModelFactory";
import { Pointer } from "../Pointer";
import { Document } from "./../Document";
export interface DirectContainer extends Document {
    membershipResource: Pointer;
    hasMemberRelation: Pointer;
}
export interface DirectContainerConstant extends ModelFactory<DirectContainer> {
    TYPE: string;
    is(object: object): object is DirectContainer;
    create(membershipResource: Pointer, hasMemberRelation: string | Pointer, isMemberOfRelation?: string | Pointer): DirectContainer;
    createFrom<T extends object>(object: T, membershipResource: Pointer, hasMemberRelation: string | Pointer, isMemberOfRelation?: string | Pointer): T & DirectContainer;
}
export declare const DirectContainer: DirectContainerConstant;
export default DirectContainer;
