import { VariableToken } from "sparqler/tokens";

export class Class extends VariableToken {
	readonly name:string;
	private readonly index:number;

	constructor( name:string, index:number ) {
		super( name
			.replace( /[.]/g, "__" )
			.replace( /[^0-9A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/g, "_" )
		);
		this.index = index;
	}

	toString():string {
		if( process.env.NODE_ENV === "prod" ) return `?_${ this.index }`;
		return super.toString();
	}
}

export default Class;
