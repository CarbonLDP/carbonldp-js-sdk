import { Document } from "dgeni";
import { TagDef } from "./TagDef";

export interface Generic {
	generics?:string[];
}

export function generics():TagDef {
	return {
		name: "generics",
		defaultFn( doc:Document ):string[] | undefined {
			if( ! doc.declaration || ! doc.declaration.typeParameters ) return;

			return doc.declaration.typeParameters
				.map( type => type.getText() );
		},
	};
}
