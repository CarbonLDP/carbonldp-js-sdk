import { ModelDecorator } from "../core/ModelDecorator";
import { ModelFactory } from "../core/ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { TransientResource } from "../Resource";
export interface AddMemberAction extends TransientResource {
    targetMembers: Pointer[];
}
export interface AddMemberActionFactory extends ModelFactory<AddMemberAction>, ModelDecorator<AddMemberAction> {
    TYPE: string;
    SCHEMA: ObjectSchema;
    isDecorated(object: object): object is AddMemberAction;
    create(targetMembers: Pointer[]): AddMemberAction;
}
export declare const AddMemberAction: AddMemberActionFactory;
