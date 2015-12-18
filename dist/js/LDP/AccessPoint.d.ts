/// <reference path="../../typings/tsd.d.ts" />
import * as Container from "./Container";
import * as ObjectSchema from "./../ObjectSchema";
export declare const RDF_CLASS: string;
export interface Class extends Container.Class {
    membershipResource: string;
}
export declare const SCHEMA: ObjectSchema.Class;
export declare class Factory {
    hasClassProperties(resource: Object): boolean;
}
export default Class;
