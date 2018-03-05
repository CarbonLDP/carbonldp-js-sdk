import { PersistedACL } from "./Auth/PersistedACL";
import { Documents } from "./Documents";
import { RequestOptions } from "./HTTP/Request";
import { Response } from "./HTTP/Response";
import { ModelDecorator } from "./ModelDecorator";
import { PersistedDocument } from "./PersistedDocument";
import { Pointer } from "./Pointer";
export interface PersistedProtectedDocument extends PersistedDocument {
    accessControlList?: Pointer;
    getACL(requestOptions?: RequestOptions): Promise<[PersistedACL, Response]>;
}
export interface PersistedProtectedDocumentConstant extends ModelDecorator<PersistedProtectedDocument> {
    isDecorated(object: object): object is PersistedProtectedDocument;
    is(object: object): object is PersistedProtectedDocument;
    decorate<T extends object>(object: T, documents: Documents): T & PersistedProtectedDocument;
}
export declare const PersistedProtectedDocument: PersistedProtectedDocumentConstant;
export default PersistedProtectedDocument;
