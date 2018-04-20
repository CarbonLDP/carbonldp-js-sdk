import { ACL } from "./Auth/ACL";
import { Documents } from "./Documents";
import { RequestOptions } from "./HTTP/Request";
import { ModelDecorator } from "./ModelDecorator";
import { Document } from "./Document";
import { Pointer } from "./Pointer";
export interface ProtectedDocument extends Document {
    accessControlList?: Pointer;
    getACL(requestOptions?: RequestOptions): Promise<ACL>;
}
export interface ProtectedDocumentFactory extends ModelDecorator<ProtectedDocument> {
    isDecorated(object: object): object is ProtectedDocument;
    is(object: object): object is ProtectedDocument;
    decorate<T extends object>(object: T, documents: Documents): T & ProtectedDocument;
}
export declare const ProtectedDocument: ProtectedDocumentFactory;
