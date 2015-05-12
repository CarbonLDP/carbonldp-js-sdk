import * as Resource from './Resource';

interface DocumentResource extends Resource.Class {

}

class Factory {
	static from( resource:Resource.Class ):DocumentResource;
	static from( resources:Resource.Class[] ):DocumentResource[];
	static from( resourceOrResources:any ):any {

	}
}

export { DocumentResource as Class, Factory };