import { ModelFactory } from "../Model";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { BaseResource, Resource } from "../Resource";
import { C } from "../Vocabularies";
export interface BaseAddMemberAction extends BaseResource {
    targetMembers: Pointer[];
}
export interface AddMemberAction extends Resource {
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
