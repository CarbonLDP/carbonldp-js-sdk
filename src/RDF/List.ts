import * as Utils from "./../Utils";
import { RDFValue } from "./Value";


export interface RDFList {
	"@list":RDFValue[];
}


export interface RDFListConstant {
	is( value:any ):value is RDFList;
}

export const RDFList:RDFListConstant = {
	is( value:any ):value is RDFList {
		return Utils.hasPropertyDefined( value, "@list" );
	},
};


export default RDFList;
