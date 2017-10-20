import { VariableToken } from "sparqler/tokens";

export class Class extends VariableToken {
	readonly name:string;
	private readonly index:number;

	constructor( name:string, index:number ) {
		super( name
			.replace( /[:]/g, "_" )
			.replace( /[.]/g, "__" )
		);
		this.index = index;
	}

	toString():string {
		if( process.env.NODE_ENV === "prod" ) return `?_${ this.index }`;
		return super.toString();
	}
}

export default Class;
