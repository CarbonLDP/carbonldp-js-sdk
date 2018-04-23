import { ModelFactory } from "../core/ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { BaseResource, TransientResource } from "../Resource";
import { C } from "../Vocabularies";
export interface BaseAddMemberAction extends BaseResource {
    targetMembers: Pointer[];
}
export interface AddMemberAction extends TransientResource {
    targetMembers: Pointer[];
}
export interface AddMemberActionFactory extends ModelFactory<AddMemberAction> {
    TYPE: C["AddMemberAction"];
    SCHEMA: ObjectSchema;
    is(value: any): value is AddMemberAction;
    create<T extends object>(data: T & BaseAddMemberAction): T & AddMemberAction;
    createFrom<T extends object>(data: T & BaseAddMemberAction): T & AddMemberAction;
}
export declare const AddMemberAction: AddMemberActionFactory;
