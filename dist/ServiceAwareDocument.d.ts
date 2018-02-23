import { Document } from "./Document";
import { Class as Documents } from "./Documents";
import { ModelDecorator } from "./ModelDecorator";
export interface ServiceAwareDocument extends Document {
    _documents: Documents;
}
export interface ServiceAwareDocumentFactory extends ModelDecorator<ServiceAwareDocument> {
    isDecorated(object: object): object is ServiceAwareDocument;
    decorate<T extends object>(object: T, documents: Documents): T & ServiceAwareDocument;
}
export declare const ServiceAwareDocument: ServiceAwareDocumentFactory;
export default ServiceAwareDocument;
