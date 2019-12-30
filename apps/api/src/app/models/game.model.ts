import { Role, Team, Tile } from '@codenames/models';
import { shuffle } from '@codenames/shuffle';
import { WORDS } from './words.model';

export class Game {
	public words = WORDS.BASE;

	public turn: Team = Math.random() < 0.5 ? Team.RED : Team.BLUE;

	public tiles: Tile[] = this.generate();

	public get red() {
		return this.tiles.filter(tile => tile.type === Team.RED && !tile.flipped).length;
	}

	public get blue() {
		return this.tiles.filter(tile => tile.type === Team.BLUE && !tile.flipped).length;
	}

	public flipTile(idx: number) {
		const tile = this.tiles[idx];
		tile.flipped = true;
		return tile;
	}

	public setTurn(state: Team, turn: Team) {
		switch (turn) {
			case Team.UNASSIGNED:
				if (state === Team.RED) {
					this.turn = Team.BLUE;
					break;
				}
				if (state === Team.BLUE) {
					this.turn = Team.RED;
					break;
				}
				break;
			default:
				this.turn = turn;
				break;
		}
	}

	public generate() {
		const pool = shuffle(this.words)
			.slice(0, 25)
			.map(word => ({ name: word, type: Team.UNASSIGNED, flipped: false }));
		const assassin = pool.splice(0, 1).map(word => ({ ...word, type: Team.ASSASSIN }));
		const red = pool.splice(0, this.turn === Team.RED ? 9 : 8).map(word => ({ ...word, type: Team.RED }));
		const blue = pool.splice(0, this.turn === Team.BLUE ? 9 : 8).map(word => ({ ...word, type: Team.BLUE }));
		const tiles: Tile[] = shuffle([...assassin, ...red, ...blue, ...pool]);

		this.tiles = tiles;
		return tiles;
	}

	public for(role: Role) {
		switch (role) {
			case Role.GUESSER:
				return {
					...this.toJSON(),
					tiles: this.tiles.map(tile => (tile.flipped ? { ...tile } : { ...tile, type: Team.UNASSIGNED })),
				};

			case Role.SPYMASTER:
				return this.toJSON();
		}
	}

	public toJSON() {
		return {
			scoreboard: {
				red: this.red,
				blue: this.blue,
			},
			turn: this.turn,
			tiles: this.tiles,
		};
	}
}
