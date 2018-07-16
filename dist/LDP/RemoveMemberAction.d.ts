import { ModelFactory } from "../Model/ModelFactory";
import { ObjectSchema } from "../ObjectSchema/ObjectSchema";
import { Pointer } from "../Pointer/Pointer";
import { BaseResource } from "../Resource/BaseResource";
import { Resource } from "../Resource/Resource";
import { C } from "../Vocabularies/C";
export interface BaseRemoveMemberAction extends BaseResource {
    targetMembers: Pointer[];
}
export interface RemoveMemberAction extends Resource {
    targetMembers: Pointer[];
}
export interface RemoveMemberActionFactory extends ModelFactory<RemoveMemberAction> {
    TYPE: C["RemoveMemberAction"];
    SCHEMA: ObjectSchema;
    is(value: any): value is RemoveMemberAction;
    create<T extends object>(data: T & BaseRemoveMemberAction): T & RemoveMemberAction;
    createFrom<T extends object>(object: T & BaseRemoveMemberAction): T & RemoveMemberAction;
}
export declare const RemoveMemberAction: RemoveMemberActionFactory;
