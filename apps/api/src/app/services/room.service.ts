import { Message, Role } from '@codenames/models';
import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';
import { Game } from '../models/game.model';
import { Player } from '../models/player.model';
import { Room } from '../models/room.model';

type RoomInput = Pick<Room, 'name' | 'password'>;
type PlayerInput = Pick<Player, 'id' | 'name'>;

@Injectable()
export class RoomService {
	public rooms: Room[] = [];

	public create(webSocket: WebSocket, { name, password }: RoomInput, { id, name: username }: PlayerInput) {
		if (this.rooms.find(room => room.name === name)) return null;
		const game = new Game();
		const room = new Room(game, name, password);
		const player = new Player(room, webSocket, id, username);
		room.join(player);
		this.rooms.push(room);
		return room.for(player.role);
	}

	public join(webSocket: WebSocket, { name, password }: RoomInput, { id, name: username }: PlayerInput) {
		const room = this.rooms.find(room => room.name === name);
		if (!room) return null;
		if (room.password && room.password !== password) return null;
		const player = new Player(room, webSocket, id, username);
		room.join(player);
		this.send(room, Message.JOIN_ROOM, { room, player });
		return room.for(player.role);
	}

	public leave({ name }: Partial<RoomInput>, { id }: Partial<PlayerInput>) {
		const room = this.rooms.find(room => room.name === name);
		if (!room) return null;
		const player = room.players.find(player => player.id === id);
		if (!player) return null;
		if (room.players.length === 1) {
			this.rooms = this.rooms.filter(room => room.name !== name);
		}
		if (player.webSocket.readyState === player.webSocket.OPEN) player.webSocket.close();
		room.leave(player);
		const [guesser, spymaster] = room.for(Role.BOTH);
		/* istanbul ignore next */
		room.players.forEach(player => {
			/* istanbul ignore next */
			player.webSocket.send(
				JSON.stringify({ event: Message.LEAVE_ROOM, data: player.role === Role.SPYMASTER ? spymaster : guesser }),
			);
		});
	}

	public send(room: Room, event: Message, payload: any) {
		const [guesser, spymaster] = room.for(Role.BOTH);
		room.players
			.filter(player => player.id !== payload.player.id)
			/* istanbul ignore next */
			.forEach(player => {
				/* istanbul ignore next */
				player.webSocket.send(JSON.stringify({ event, data: player.role === Role.SPYMASTER ? spymaster : guesser }));
			});
	}

	public findOneRoom({ name }: Pick<RoomInput, 'name'>) {
		return this.rooms.find(room => room.name === name);
	}

	public findOnePlayer(room: RoomInput, { id }: Partial<PlayerInput>) {
		const r = this.findOneRoom(room);
		if (!r) return null;
		return r.players.find(player => player.id === id);
	}
}
