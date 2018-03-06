import { ModelDecorator } from "../ModelDecorator";
import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { Resource } from "../Resource";
export interface RemoveMemberAction extends Resource {
    targetMembers: Pointer[];
}
export interface RemoveMemberActionFactory extends ModelDecorator<RemoveMemberAction>, ModelFactory<RemoveMemberAction> {
    TYPE: string;
    SCHEMA: ObjectSchema;
    isDecorated(object: object): object is RemoveMemberAction;
    create(targetMembers: Pointer[]): RemoveMemberAction;
}
export declare const SCHEMA: ObjectSchema;
export declare const RemoveMemberAction: RemoveMemberActionFactory;
export default RemoveMemberAction;
