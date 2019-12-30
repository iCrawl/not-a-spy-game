import { Team } from './team.model';

export interface Tile {
	name: string;
	type: Team;
	flipped: boolean;
}
