import { BaseDocument } from "../../Document";
import { UsernameAndPasswordCredentials } from "../UsernameAndPasswordCredentials";


export interface BaseUser extends BaseDocument {
	name?:string;
	credentials:UsernameAndPasswordCredentials;
}
