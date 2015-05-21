import Parent from './Parent';

class Platform extends Parent {
	constructor( parent:Parent ) {
		super();

		this.parent = parent;
	}
}