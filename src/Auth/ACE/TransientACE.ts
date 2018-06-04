import { TransientFragment } from "../../Fragment";
import { Pointer } from "../../Pointer";
import { CS } from "../../Vocabularies";
import { BaseACE } from "./BaseACE";


export interface TransientACE extends TransientFragment {
	subject:Pointer;
	permissions:Pointer[];
}


export interface TransientACEFactory {
	TYPE:CS[ "AccessControlEntry" ];


	create<T extends object>( data:T & BaseACE ):T & TransientACE;

	createFrom<T extends object>( object:T & BaseACE ):T & TransientACE;
}

export const TransientACE:TransientACEFactory = {
	TYPE: CS.AccessControlEntry,


	create<T extends object>( data:T & BaseACE ):T & TransientACE {
		const copy:T & BaseACE = Object.assign( {}, data );
		return TransientACE.createFrom( copy );
	},

	createFrom<T extends object>( object:T & BaseACE ):T & TransientACE {
		const ace: T & TransientACE = TransientFragment.decorate( object );

		ace.addType( TransientACE.TYPE );

		return ace;
	},

};
