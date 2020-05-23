import { TestBed } from '@angular/core/testing';
import { Message, Team } from '@codenames/models';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { WebSocketService } from './websocket.service';

describe('WebSocketService', () => {
	let service: WebSocketService;
	let store: MockStore<unknown>;
	let dispatchSpy: jasmine.Spy;
	const payload = {
		event: Message.CREATE_ROOM,
		data: {
			name: 'test',
			password: '',
			players: [],
			game: { scoreboard: { red: 9, blue: 8 }, turn: Team.RED, tiles: [] },
		},
	};

	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [provideMockStore()],
		}),
	);

	beforeEach(() => {
		service = TestBed.get(WebSocketService);
		store = TestBed.get(Store);
		dispatchSpy = spyOn(store, 'dispatch');
	});

	afterEach(() => {
		service.ngOnDestroy();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should dispatch for `CREATE_ROOM`', () => {
		service.parse(payload);

		expect(dispatchSpy).toBeCalledTimes(5);
	});

	it('should dispatch for `JOIN_ROOM`', () => {
		const modPayload = { ...payload, event: Message.JOIN_ROOM };
		service.parse(modPayload);

		expect(dispatchSpy).toBeCalledTimes(5);
	});

	it('should dispatch for `FLIP_TILE`', () => {
		const modPayload = { ...payload, event: Message.FLIP_TILE };
		service.parse(modPayload);

		expect(dispatchSpy).toBeCalledTimes(3);
	});

	it('should dispatch for `SWITCH_ROLE`', () => {
		const modPayload = { ...payload, event: Message.SWITCH_ROLE };
		service.parse(modPayload);

		expect(dispatchSpy).toBeCalledTimes(2);
	});

	it('should dispatch for `LEAVE_ROOM`', () => {
		const modPayload = { ...payload, event: Message.LEAVE_ROOM };
		service.parse(modPayload);

		expect(dispatchSpy).toBeCalledTimes(1);
	});

	it('should dispatch for `SWITCH_TEAM`', () => {
		const modPayload = { ...payload, event: Message.SWITCH_TEAM };
		service.parse(modPayload);

		expect(dispatchSpy).toBeCalledTimes(1);
	});

	it('should dispatch for `RANDOMIZE_TEAMS`', () => {
		const modPayload = { ...payload, event: Message.RANDOMIZE_TEAMS };
		service.parse(modPayload);

		expect(dispatchSpy).toBeCalledTimes(2);
	});
});
