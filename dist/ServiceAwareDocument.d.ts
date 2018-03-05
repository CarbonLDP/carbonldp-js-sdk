import { Document } from "./Document";
import { Documents as Documents } from "./Documents";
import { ModelDecorator } from "./ModelDecorator";
export interface ServiceAwareDocument extends Document {
    _documents: Documents;
}
export interface ServiceAwareDocumentConstant extends ModelDecorator<ServiceAwareDocument> {
    isDecorated(object: object): object is ServiceAwareDocument;
    decorate<T extends object>(object: T, documents: Documents): T & ServiceAwareDocument;
}
export declare const ServiceAwareDocument: ServiceAwareDocumentConstant;
export default ServiceAwareDocument;
