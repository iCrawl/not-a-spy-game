import { Role } from '@codenames/models';
import { Test, TestingModule } from '@nestjs/testing';
import { Room } from '../models/room.model';
import { RoomService } from './room.service';

describe('RoomService', () => {
	let module: TestingModule;
	let service: RoomService;
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const ws = { close() {}, send() {} } as any;
	const payload = { room: { name: 'test', password: 'asd' }, player: { id: '123', name: 'crawl' } };
	let room: Room | null;

	beforeEach(async () => {
		module = await Test.createTestingModule({
			providers: [RoomService],
		}).compile();
	});

	beforeEach(() => {
		service = module.get(RoomService);
		room = service.create(ws, payload.room, payload.player);
	});

	afterEach(() => {
		service.rooms = [];
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create room', () => {
		expect(service.rooms.length).toBe(1);
		expect(room).toStrictEqual(service.rooms[0].for(Role.GUESSER));
	});

	it('should not create room', () => {
		const room2 = service.create(ws, payload.room, payload.player);

		expect(service.rooms.length).toBe(1);
		expect(room).toStrictEqual(service.rooms[0].for(Role.GUESSER));
		expect(room2).toBeNull();
	});

	it('should join room', () => {
		const room2 = service.join(ws, payload.room, payload.player);

		expect(service.rooms.length).toBe(1);
		expect(room).toStrictEqual(service.rooms[0].for(Role.GUESSER));
		expect(room2).toStrictEqual(service.rooms[0].for(Role.GUESSER));
	});

	it('should not join room', () => {
		const room2 = service.join(ws, { name: 'test2', password: 'asd' }, payload.player);

		expect(service.rooms.length).toBe(1);
		expect(room).toStrictEqual(service.rooms[0].for(Role.GUESSER));
		expect(room2).toBeNull();
	});

	it('should not join room with wrong passowrd', () => {
		const room2 = service.join(ws, { name: 'test', password: '' }, payload.player);

		expect(service.rooms.length).toBe(1);
		expect(room).toStrictEqual(service.rooms[0].for(Role.GUESSER));
		expect(room2).toBeNull();
	});

	it('should leave room', () => {
		expect(service.rooms.length).toBe(1);
		expect(room).toStrictEqual(service.rooms[0].for(Role.GUESSER));

		service.leave(payload.room, payload.player);

		expect(service.rooms.length).toBe(0);
	});

	it('should not leave room because no such room', () => {
		expect(service.rooms.length).toBe(1);
		expect(room).toStrictEqual(service.rooms[0].for(Role.GUESSER));

		service.leave({ name: 'test2' }, payload.player);

		expect(service.rooms.length).toBe(1);
	});

	it('should not leave room because no such player', () => {
		expect(service.rooms.length).toBe(1);
		expect(room).toStrictEqual(service.rooms[0].for(Role.GUESSER));

		service.leave(payload.room, { id: 'abc' });

		expect(service.rooms.length).toBe(1);
	});

	it('should findOne room', () => {
		expect(service.rooms.length).toBe(1);

		const r = service.findOneRoom(payload.room);
		expect(r).toStrictEqual(service.rooms[0]);
	});

	it('should not findOne room', () => {
		expect(service.rooms.length).toBe(1);

		const r = service.findOneRoom({ name: 'test2' });
		expect(r).toBeUndefined();
	});

	it('should findOne player', () => {
		expect(service.rooms.length).toBe(1);

		const r = service.findOnePlayer(payload.room, payload.player);
		expect(r).toStrictEqual(service.rooms[0].players[0]);
	});

	it('should not findOne player', () => {
		expect(service.rooms.length).toBe(1);

		const r = service.findOnePlayer(payload.room, { id: 'abc' });
		expect(r).toBeUndefined();
	});

	it('should not findOne player because no room', () => {
		expect(service.rooms.length).toBe(1);

		const r = service.findOnePlayer({ name: 'test2', password: '' }, payload.player);
		expect(r).toBeNull();
	});
});
