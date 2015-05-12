/// <reference path="../typings/es6/es6.d.ts" />

import Documents from './Documents';
import Resources from './Resources';
import * as RDF from './RDF';

interface Parent {

	Definitions:Map<string, RDF.PropertyDescription[]>;
	Documents:Documents
	Resources:Resources

	resolve( relativeURI:string ):string;
}

export default Parent;