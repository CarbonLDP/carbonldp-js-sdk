import { Document } from "../Document";
import { ObjectSchema } from "../ObjectSchema";
import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";

export interface RoleBase {
	name:string;
	description?:string;
}


export interface Role extends Document {
	name:string;
	description?:string;
}


export interface RoleFactory {
	TYPE:CS[ "Role" ];
	SCHEMA:ObjectSchema;

	is( value:any ):value is Role;

	create( data:RoleBase ):Role;

	createFrom<T extends RoleBase>( object:T ):Role;
}

const SCHEMA:ObjectSchema = {
	"name": {
		"@id": CS.name,
		"@type": XSD.string,
	},
	"description": {
		"@id": CS.description,
		"@type": XSD.string,
	},
	"parent": {
		"@id": CS.parent,
		"@type": "@id",
	},
	"children": {
		"@id": CS.child,
		"@type": "@id",
		"@container": "@set",
	},
	"users": {
		"@id": CS.user,
		"@type": "@id",
		"@container": "@set",
	},
};

export const Role:RoleFactory = {
	TYPE: CS.Role,
	SCHEMA,

	is( value:any ):value is Role {
		return Document.is( value )
			&& value.hasOwnProperty( "name" )
			;
	},

	create( data:RoleBase ):Role {
		return Role.createFrom( { ...data } );
	},

	createFrom<T extends RoleBase>( object:T ):T & Role {
		const role:T & Role = Document.isDecorated( object ) ?
			object : Document.createFrom( object );

		role.addType( Role.TYPE );

		return role;
	},

};
