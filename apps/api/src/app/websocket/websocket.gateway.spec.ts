import { Message, Role, Team } from '@codenames/models';
import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from '../services/room.service';
import { WebsocketGateway } from './websocket.gateway';

describe('WebsocketGateway', () => {
	let module: TestingModule;
	let gateway: WebsocketGateway;
	let service: RoomService;
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const ws = { close() {}, send() {} } as any;
	const payload = {
		room: { name: 'test', password: 'asd' },
		game: { turn: Team.RED },
		player: { id: '123', name: 'crawl', team: Team.UNASSIGNED, role: Role.GUESSER },
	};

	beforeEach(async () => {
		module = await Test.createTestingModule({
			providers: [RoomService, WebsocketGateway],
		}).compile();
	});

	beforeEach(() => {
		gateway = module.get(WebsocketGateway);
		service = module.get(RoomService);
		service.create(ws, payload.room, payload.player);
	});

	afterEach(() => {
		service.rooms = [];
	});

	it('should be defined', () => {
		expect(gateway).toBeDefined();
	});

	it('should handle create room', () => {
		const p = { ...payload, room: { name: 'test2', password: '' }, event: Message.CREATE_ROOM };

		expect(gateway.handleCreateRoomMessage(ws, p)).toStrictEqual({
			event: Message.CREATE_ROOM,
			data: service.rooms[1].for(Role.GUESSER),
		});
	});

	it('should handle join room', () => {
		const p = { ...payload, event: Message.JOIN_ROOM };

		expect(gateway.handleJoinRoomMessage(ws, p)).toStrictEqual({
			event: Message.JOIN_ROOM,
			data: service.rooms[0].for(Role.GUESSER),
		});
	});

	it('should handle leave room', () => {
		const p = { ...payload, event: Message.LEAVE_ROOM };
		gateway.handleLeaveRoomMessage(p);

		expect(service.rooms.length).toBe(0);
	});

	it('should handle switch team', () => {
		const p = { ...payload, player: { ...payload.player, team: Team.RED }, event: Message.SWITCH_TEAM };

		expect(service.rooms[0].players[0].team).toBe(Team.UNASSIGNED);
		expect(gateway.handleSwitchTeamMessage(p)).toStrictEqual({
			event: Message.SWITCH_TEAM,
			data: service.rooms[0].for(Role.GUESSER),
		});
		expect(service.rooms[0].players[0].team).toBe(Team.RED);
	});

	it('should handle switch role', () => {
		const p = { ...payload, player: { ...payload.player, role: Role.SPYMASTER }, event: Message.SWITCH_ROLE };

		expect(service.rooms[0].players[0].role).toBe(Role.GUESSER);
		expect(gateway.handleSwitchRoleMessage(p)).toStrictEqual({
			event: Message.SWITCH_ROLE,
			data: service.rooms[0].for(Role.SPYMASTER),
		});
		expect(service.rooms[0].players[0].role).toBe(Role.SPYMASTER);
	});

	it('should handle flip tile', () => {
		const p = { ...payload, idx: 0, event: Message.FLIP_TILE };

		expect(service.rooms[0].game.tiles[0].flipped).toBe(false);
		expect(gateway.handleFlipTileMessage(p)).toBe(null);
		expect(service.rooms[0].game.tiles[0].flipped).toBe(true);
	});
});
