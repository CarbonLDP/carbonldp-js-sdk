import { ModelDecorator } from "../ModelDecorator";
import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { Resource } from "../Resource";
export interface AddMemberAction extends Resource {
    targetMembers: Pointer[];
}
export interface AddMemberActionConstant extends ModelFactory<AddMemberAction>, ModelDecorator<AddMemberAction> {
    TYPE: string;
    SCHEMA: ObjectSchema;
    isDecorated(object: object): object is AddMemberAction;
    create(targetMembers: Pointer[]): AddMemberAction;
}
export declare const SCHEMA: ObjectSchema;
export declare const AddMemberAction: AddMemberActionConstant;
export default AddMemberAction;
