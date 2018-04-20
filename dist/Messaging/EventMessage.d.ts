import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { TransientResource } from "../TransientResource";
export interface EventMessage extends TransientResource {
    target: Pointer;
}
export interface EventMessageFactory extends ModelFactory<EventMessage> {
    SCHEMA: ObjectSchema;
    isDecorated(object: object): object is EventMessage;
}
export declare const EventMessage: EventMessageFactory;
