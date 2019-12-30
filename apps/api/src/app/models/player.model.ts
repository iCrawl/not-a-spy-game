import { Role, Team } from '@codenames/models';
import * as WebSocket from 'ws';
import { Room } from './room.model';

export class Player {
	public constructor(
		public room: Room,
		public webSocket: WebSocket,
		public id: string,
		public name: string,
		public team: Team = Team.UNASSIGNED,
		public role: Role = Role.GUESSER,
	) {}

	public setTeam(team: Team) {
		this.team = team;
	}

	public setRole(role: Role) {
		if (role === Role.SPYMASTER && this.room.players.some(player => player.role === Role.SPYMASTER)) return;
		this.role = role;
	}

	public toJSON() {
		return {
			id: this.id,
			name: this.name,
			team: this.team,
			role: this.role,
		};
	}
}
