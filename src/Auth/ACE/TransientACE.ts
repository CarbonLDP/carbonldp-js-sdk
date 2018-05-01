import { ModelFactory } from "../../core/ModelFactory";
import { TransientFragment } from "../../Fragment";
import { Pointer } from "../../Pointer";
import { CS } from "../../Vocabularies";
import { BaseACE } from "./BaseACE";


export interface TransientACE extends TransientFragment {
	granting:boolean;
	permissions:Pointer[];
	subjects:Pointer[];
	subjectsClass:Pointer;
}


export interface TransientACEFactory extends ModelFactory<TransientACE> {
	TYPE:CS[ "AccessControlEntry" ];

	is( value:any ):value is TransientACE;


	create<T extends object>( data:T & BaseACE ):T & TransientACE;

	createFrom<T extends object>( object:T & BaseACE ):T & TransientACE;
}

export const TransientACE:TransientACEFactory = {
	TYPE: CS.AccessControlEntry,

	is( value:any ):value is TransientACE {
		return TransientFragment.is( value )
			&& value.hasOwnProperty( "granting" )
			&& value.hasOwnProperty( "permissions" )
			&& value.hasOwnProperty( "subjects" )
			&& value.hasOwnProperty( "subjectsClass" )
			;
	},

	create<T extends object>( data:T & BaseACE ):T & TransientACE {
		const copy:T & BaseACE = Object.assign( {}, data );
		return TransientACE.createFrom( copy );
	},

	createFrom<T extends object>( object:T & BaseACE ):T & TransientACE {
		TransientFragment.decorate( object );

		const ace:T & TransientACE = object as T & TransientACE;
		ace.addType( TransientACE.TYPE );

		return ace;
	},

};
