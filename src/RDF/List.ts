import * as Utils from "./../Utils";
import { RDFValue } from "./Value";


export interface RDFList {
	"@list":RDFValue[];
}


export interface RDFListFactory {
	is( value:any ):value is RDFList;
}

export const RDFList:RDFListFactory = {
	is( value:any ):value is RDFList {
		return Utils.hasPropertyDefined( value, "@list" );
	},
};

