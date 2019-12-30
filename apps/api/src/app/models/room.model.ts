import { Role, Team } from '@codenames/models';
import { Game } from './game.model';
import { Player } from './player.model';

export class Room {
	public constructor(
		public readonly game: Game,
		public readonly name: string,
		public readonly password = '',
		public players: Player[] = [],
	) {}

	public join(player: Player) {
		this.players.push(player);
	}

	public leave(player: Player) {
		this.players = this.players.filter(p => p.name !== player.name);
	}

	public randomizeTeams() {
		this.players = this.players.map(p => {
			p.setTeam(Math.random() < 0.5 ? Team.RED : Team.BLUE);
			return p;
		});
	}

	public for(role: Role.BOTH): Room[];
	public for(role: Role | Role.GUESSER | Role.SPYMASTER): Room;
	public for(role: Role) {
		switch (role) {
			case Role.GUESSER:
				return { ...this.toJSON(), game: { ...this.game.for(role) } };

			case Role.SPYMASTER:
				return this.toJSON();

			case Role.BOTH:
				return [{ ...this.toJSON(), game: { ...this.game.for(Role.GUESSER) } }, this.toJSON()];
		}
	}

	public toJSON() {
		return {
			game: this.game,
			name: this.name,
			password: 'No u.',
			players: this.players,
		};
	}
}
