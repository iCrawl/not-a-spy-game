import { Message, Role, Team } from '@codenames/models';
import { ConnectedSocket, MessageBody, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import * as WebSocket from 'ws';
import { Game } from '../models/game.model';
import { Player } from '../models/player.model';
import { Room } from '../models/room.model';
import { RoomService } from '../services/room.service';

interface Payload {
	event: number;
}

export interface PartialRoomPayload extends Payload {
	room: Pick<Room, 'name' | 'password'>;
	player: Pick<Player, 'id' | 'name'>;
}

interface PlayerPayload extends PartialRoomPayload {
	player: Player;
}

interface RoomPayload extends Payload {
	room: Room;
}

interface FlipTilePayload extends Payload {
	room: Pick<Room, 'name'>;
	game: Pick<Game, 'turn'>;
	player: Pick<Player, 'id' | 'name'>;
	idx: number;
}

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayDisconnect {
	public constructor(private readonly roomService: RoomService) {}

	/* istanbul ignore next */
	public handleDisconnect(client: WebSocket) {
		const predicate = (player: Player) => player.webSocket === client;
		const room = this.roomService.rooms.find(room => room.players.some(predicate));
		if (!room) return;
		const player = room.players.find(predicate);
		if (!player) return;
		return this.roomService.leave(room, player);
	}

	@SubscribeMessage(Message.HEARTBEAT)
	public handleHearbeatMessage() {
		return { event: Message.HEARTBEAT_RECV };
	}

	@SubscribeMessage(Message.CREATE_ROOM)
	public handleCreateRoomMessage(@ConnectedSocket() client: WebSocket, @MessageBody() payload: PartialRoomPayload) {
		const room = this.roomService.create(client, payload.room, payload.player);
		return { event: Message.CREATE_ROOM, data: room };
	}

	@SubscribeMessage(Message.JOIN_ROOM)
	public handleJoinRoomMessage(@ConnectedSocket() client: WebSocket, @MessageBody() payload: PartialRoomPayload) {
		const room = this.roomService.join(client, payload.room, payload.player);
		return { event: Message.JOIN_ROOM, data: room };
	}

	@SubscribeMessage(Message.LEAVE_ROOM)
	public handleLeaveRoomMessage(@MessageBody() payload: PartialRoomPayload) {
		return this.roomService.leave(payload.room, payload.player);
	}

	@SubscribeMessage(Message.SWITCH_TEAM)
	public handleSwitchTeamMessage(@MessageBody() payload: PlayerPayload) {
		const send = { event: Message.SWITCH_TEAM };
		const room = this.roomService.findOneRoom(payload.room);
		if (!room) return send;
		const player = this.roomService.findOnePlayer(payload.room, payload.player);
		if (!player) return send;
		player.setTeam(payload.player.team);
		this.roomService.send(room, Message.SWITCH_TEAM, payload);
		return { ...send, data: room.for(player.role) };
	}

	@SubscribeMessage(Message.RANDOMIZE_TEAMS)
	public handleRandomizeTeamsMessage(@MessageBody() payload: RoomPayload) {
		const send = { event: Message.RANDOMIZE_TEAMS };
		const room = this.roomService.findOneRoom(payload.room);
		if (!room) return send;
		room.randomizeTeams();
		const [guesser, spymaster] = room.for(Role.BOTH);
		room.players.forEach(player => {
			player.webSocket.send(JSON.stringify({ ...send, data: player.role === Role.SPYMASTER ? spymaster : guesser }));
		});
		return null;
	}

	@SubscribeMessage(Message.SWITCH_ROLE)
	public handleSwitchRoleMessage(@MessageBody() payload: PlayerPayload) {
		const send = { event: Message.SWITCH_ROLE };
		const room = this.roomService.findOneRoom(payload.room);
		if (!room) return send;
		const player = this.roomService.findOnePlayer(payload.room, payload.player);
		if (!player) return send;
		player.setRole(payload.player.role);
		this.roomService.send(room, Message.SWITCH_ROLE, payload);
		return { ...send, data: room.for(player.role) };
	}

	@SubscribeMessage(Message.FLIP_TILE)
	public handleFlipTileMessage(@MessageBody() payload: FlipTilePayload) {
		const send = { event: Message.FLIP_TILE };
		const room = this.roomService.findOneRoom(payload.room);
		if (!room) return send;
		const tile = room.game.flipTile(payload.idx);
		room.game.setTurn(room.game.turn, tile.type);
		const [guesser, spymaster] = room.for(Role.BOTH);
		room.players.forEach(player => {
			player.webSocket.send(JSON.stringify({ ...send, data: player.role === Role.SPYMASTER ? spymaster : guesser }));
		});
		return null;
	}

	@SubscribeMessage(Message.END_TURN)
	public handleEndTurnMessage(@MessageBody() payload: RoomPayload) {
		const send = { event: Message.FLIP_TILE };
		const room = this.roomService.findOneRoom(payload.room);
		if (!room) return send;
		if (room.game.turn === Team.ASSASSIN) return send;
		room.game.setTurn(room.game.turn, room.game.turn === Team.RED ? Team.BLUE : Team.RED);
		const [guesser, spymaster] = room.for(Role.BOTH);
		room.players.forEach(player => {
			player.webSocket.send(JSON.stringify({ ...send, data: player.role === Role.SPYMASTER ? spymaster : guesser }));
		});
		return null;
	}

	@SubscribeMessage(Message.NEW_GAME)
	public handleNewGameMessage(@MessageBody() payload: RoomPayload) {
		const send = { event: Message.NEW_GAME };
		const room = this.roomService.findOneRoom(payload.room);
		if (!room) return send;
		room.game.generate();
		room.game.turn = Math.random() < 0.5 ? Team.RED : Team.BLUE;
		const [guesser, spymaster] = room.for(Role.BOTH);
		room.players.forEach(player => {
			player.webSocket.send(JSON.stringify({ ...send, data: player.role === Role.SPYMASTER ? spymaster : guesser }));
		});
		return null;
	}
}
