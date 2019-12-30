import { User as IUser } from '@codenames/models';

export interface User extends IUser {
	loggedIn: boolean;
}
