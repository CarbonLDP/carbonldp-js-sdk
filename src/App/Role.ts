import * as ObjectSchema from "./../ObjectSchema";
import * as NS from "./../NS";
import * as Resource from "./../Resource";
import * as Role from "./../Auth/Role";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.CS.Class.AppRole;

export const SCHEMA:ObjectSchema.Class = {
	"parentRole": {
		"@id": NS.CS.Predicate.parentRole,
		"@type": "@id",
	},
	"childRoles": {
		"@id": NS.CS.Predicate.childRole,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class extends Role.Class {

}

export class Factory {

	static hasClassProperties( resource:Object ):boolean {
		return Utils.isObject( resource );
	}

	static is( object:Object ):boolean {
		return Role.Factory.is( object )
			&& (object as Role.Class).hasType( RDF_CLASS )
			;
	}

	static create( name:string, description?:string ):Class {
		return Factory.createFrom<Object>( {}, name, description );
	}

	static createFrom<T extends Object>( object:T, name:string, description?:string ):T & Class {
		let role:T & Class = <T & Class> Role.Factory.createFrom( object, name, description );
		role.types.push( NS.CS.Class.AppRole );

		return role;
	}

}

export default Class;
