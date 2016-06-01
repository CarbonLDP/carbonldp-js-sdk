import * as ObjectSchema from "./../ObjectSchema";
import * as NS from "./../NS";
import * as Pointer from "./../Pointer";
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
	"agents": {
		"@id": NS.CS.Predicate.agent,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class extends Role.Class {
	parentRole?: Pointer.Class;
	childRoles?: Pointer.Class[];
	agents?: Pointer.Class[];
}

export class Factory {
	static hasClassProperties( resource:Object ):boolean {
		return Utils.hasPropertyDefined( resource, "parentRole" )
			&& Utils.hasPropertyDefined( resource, "childRoles" )
			&& Utils.hasPropertyDefined( resource, "agents" )
			;
	}

	static is( object:Object ):boolean {
		return Role.Factory.is( object )
			// TODO Use Resource.Util.hasType( RDF_CLASS ) when ACL merged.
			&& (<Resource.Class> object).types.indexOf( RDF_CLASS ) !== -1
			;
	}

	static create( name:string ):Class {
		return Factory.createFrom<Object>( {}, name );
	}

	static createFrom<T extends Object>( object:T, name:string ):T & Class {
		let app:T & Class = <T & Class> Role.Factory.createFrom( object, name );
		app.types.push( NS.CS.Class.AppRole );

		return app;
	}

}

export default Class;
