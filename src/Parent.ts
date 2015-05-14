/// <reference path="../typings/es6/es6.d.ts" />

import Documents from './Documents';
import Resources from './Resources';
import * as RDF from './RDF';

interface Parent {
	Documents:Documents
	Resources:Resources

	resolve( relativeURI:string ):string;

	hasDefinition( uri:string ):boolean;
	getDefinition( uri:string ):Map<string, RDF.PropertyDescription>;
	getDefinitionURIs():string[];

	addDefinition( uri:string, descriptions:Object ):void;
	addDefinition( uri:string, descriptions:Map<string, RDF.PropertyDescription> ):void;

	setDefinition( uri:string, descriptions:Object ):void;
	setDefinition( uri:string, descriptions:Map<string, RDF.PropertyDescription> ):void;

	deleteDefinition( uri:string ):void;
}

export default Parent;