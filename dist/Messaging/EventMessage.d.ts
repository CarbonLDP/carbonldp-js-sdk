import { Document } from "../Document/Document";
import { ObjectSchema } from "../ObjectSchema/ObjectSchema";
import { Resource } from "../Resource/Resource";
export interface EventMessage extends Resource {
    target: Document;
}
export interface EventMessageFactory {
    SCHEMA: ObjectSchema;
    is(value: any): value is EventMessage;
}
export declare const EventMessage: EventMessageFactory;
