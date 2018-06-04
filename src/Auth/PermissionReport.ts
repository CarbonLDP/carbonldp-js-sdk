import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import {
	CS,
	XSD
} from "../Vocabularies";
import { GrantingStep } from "./GrantingStep";


export interface PermissionReport {
	permission:Pointer;
	granted:boolean;
	grantingChain:GrantingStep[];
}


export interface PermissionReportFactory {
	TYPE:CS[ "PermissionReport" ];
	SCHEMA:ObjectSchema;
}

export const PermissionReport:PermissionReportFactory = {
	TYPE: CS.PermissionReport,
	SCHEMA: {
		"permission": {
			"@id": CS.permission,
			"@type": "@id",
		},
		"granted": {
			"@id": CS.granted,
			"@type": XSD.boolean,
		},
		"grantingChain": {
			"@id": CS.grantingChain,
			"@type": "@id",
			"@container": "@list",
		},
	},
};
