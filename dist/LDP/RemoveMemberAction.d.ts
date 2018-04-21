import { ModelDecorator } from "../core/ModelDecorator";
import { ModelFactory } from "../core/ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { TransientResource } from "../Resource";
export interface RemoveMemberAction extends TransientResource {
    targetMembers: Pointer[];
}
export interface RemoveMemberActionFactory extends ModelDecorator<RemoveMemberAction>, ModelFactory<RemoveMemberAction> {
    TYPE: string;
    SCHEMA: ObjectSchema;
    isDecorated(object: object): object is RemoveMemberAction;
    create(targetMembers: Pointer[]): RemoveMemberAction;
}
export declare const RemoveMemberAction: RemoveMemberActionFactory;
