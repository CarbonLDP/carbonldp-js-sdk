import { ObjectSchema } from "../ObjectSchema";
import { C } from "../Vocabularies/C";
import { MemberDetails } from "./MemberDetails";


export interface MemberAddedDetails extends MemberDetails {
}


export interface MemberAddedDetailsConstant {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const TYPE:string = C.MemberAddedDetails;
const SCHEMA:ObjectSchema = MemberDetails.SCHEMA;

export const MemberAddedDetails:MemberAddedDetailsConstant = {
	TYPE,
	SCHEMA,
};


export default MemberAddedDetails;
