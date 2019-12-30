import { Role } from './role.model';
import { Team } from './team.model';

export interface User {
	id: string;
	name: string;
	team: Team;
	role: Role;
}
