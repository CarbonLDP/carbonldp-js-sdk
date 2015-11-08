/// <reference path="../typings/es6/es6.d.ts" />
import * as RDF from './RDF';
declare const RDFClass: string;
declare const Definition: Map<string, RDF.PropertyDescription>;
interface APIDescription {
    version: string;
    buildDate: Date;
}
export default APIDescription;
export { APIDescription as Class, Definition, RDFClass };
