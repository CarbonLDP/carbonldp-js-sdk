export function anyThatMatches<T>( matcher:( value:any ) => value is T, name?:string ):jasmine.Any {
	return new AnyThatMatches( matcher, name ) as any;
}

export class AnyThatMatches<T> {
	private matcher:( value:any ) => value is T;
	private name?:string;

	constructor( matcher:( value:any ) => value is T, name?:string ) {
		this.matcher = matcher;
		this.name = name;
	}

	asymmetricMatch( other:any ):boolean {
		return this.matcher( other );
	}

	jasmineToString():string {
		return `<anyThatMatches(${ this.name ? this.name : this.matcher.name })>`;
	}

}
