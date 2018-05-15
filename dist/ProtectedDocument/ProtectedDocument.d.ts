import { ACL } from "../Auth";
import { ModelDecorator } from "../core";
import { Document } from "../Document";
import { RequestOptions } from "../HTTP";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { CS } from "../Vocabularies";
import { TransientProtectedDocumentFactory } from "./TransientProtectedDocument";
export interface ProtectedDocument extends Document {
    accessControlList?: Pointer;
    getACL(requestOptions?: RequestOptions): Promise<ACL>;
}
export interface ProtectedDocumentFactory extends ModelDecorator<ProtectedDocument>, TransientProtectedDocumentFactory {
    TYPE: CS["ProtectedDocument"];
    SCHEMA: ObjectSchema;
    isDecorated(object: object): object is ProtectedDocument;
    is(object: object): object is ProtectedDocument;
    decorate<T extends object>(object: T): T & ProtectedDocument;
}
export declare const ProtectedDocument: ProtectedDocumentFactory;
