import { Document } from "dgeni";
import { TagDef } from "./TagDef";

export function typeParameters():TagDef {
	return {
		name: "typeParameters",
		defaultFn( doc:Document ):string {
			if( doc.typeParameters ) return;
			if( ! doc.declaration.typeParameters ) return;

			return `<${ doc.declaration.typeParameters.map( type => type.getText() ).join( ", " ) }>`;
		},
	};
}
