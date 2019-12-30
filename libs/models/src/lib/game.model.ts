import { Scoreboard } from './scoreboard.model';
import { Team } from './team.model';
import { Tile } from './tile.model';

export interface Game {
	scoreboard: Scoreboard;
	turn: Team;
	tiles: Tile[];
}
