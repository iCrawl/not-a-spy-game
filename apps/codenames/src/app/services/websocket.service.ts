import { Injectable, OnDestroy } from '@angular/core';
import { debounce } from '@codenames/debounce';
import { Game, Message, Room, User } from '@codenames/models';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { SCORE_SET } from '../game/store/actions/scoreboard.actions';
import { TILES_SET } from '../game/store/actions/tiles.actions';
import { TURN_SET } from '../game/store/actions/turn.actions';
import { App } from '../models/app.model';
import { PLAYERS_SET, ROOM_SET } from '../store/actions/room.actions';
import { USER_LOGGED_IN, USER_SET } from '../store/actions/user.actions';

@Injectable({
	providedIn: 'root',
})
export class WebSocketService implements OnDestroy {
	public sub!: Subscription;

	public sub2!: Subscription;

	public interval: any;

	public subject = webSocket({
		url: environment.webSocket,
		openObserver: {
			next: () => {
				console.log('Connected to the WebSocket.');
				this.interval = setInterval(() => this.heartbeat(), 15000);
			},
		},
		closeObserver: {
			next: () => {
				clearInterval(this.interval);
				this.interval = null;
				console.log('Disconnected from the WebSocket.');
				debounce(this.webSocket, 500);
			},
		},
	});

	public user!: User;

	public constructor(private readonly store: Store<App>) {
		/* istanbul ignore next */
		this.webSocket();

		/* istanbul ignore next */
		this.sub = this.store
			.pipe(
				select(state => state.user),
				map(user => (this.user = user)),
			)
			.subscribe();
	}

	public ngOnDestroy() {
		this.sub.unsubscribe();
	}

	public webSocket() {
		if (this.sub2 && !this.sub2.closed) this.sub2.unsubscribe();
		this.sub2 = this.subject.subscribe(msg => this.parse(msg));
	}

	public heartbeat() {
		return this.subject.next({
			event: Message.HEARTBEAT,
		});
	}

	public joinRoom(room: any, player: any) {
		return this.subject.next({
			event: Message.JOIN_ROOM,
			data: {
				room,
				player,
			},
		});
	}

	public createRoom(room: any, player: any) {
		return this.subject.next({
			event: Message.CREATE_ROOM,
			data: {
				room,
				player,
			},
		});
	}

	public flip(room: Room, game: Game, idx: number) {
		return this.subject.next({
			event: Message.FLIP_TILE,
			data: {
				room,
				game,
				idx,
			},
		});
	}

	public joinTeam(room: Room, player: User) {
		return this.subject.next({
			event: Message.SWITCH_TEAM,
			data: {
				room,
				player,
			},
		});
	}

	public setRole(room: Room, player: User) {
		return this.subject.next({
			event: Message.SWITCH_ROLE,
			data: {
				room,
				player,
			},
		});
	}

	public randomizeTeams(room: Room) {
		return this.subject.next({
			event: Message.RANDOMIZE_TEAMS,
			data: {
				room,
			},
		});
	}

	public endTurn(room: Room) {
		return this.subject.next({
			event: Message.END_TURN,
			data: {
				room,
			},
		});
	}

	public newGame(room: Room) {
		return this.subject.next({
			event: Message.NEW_GAME,
			data: {
				room,
			},
		});
	}

	public parse(payload: any) {
		if (payload.event !== Message.HEARTBEAT_RECV && !payload.data) {
			return this.store.dispatch(USER_LOGGED_IN());
		}
		switch (payload.event) {
			case Message.HEARTBEAT_RECV:
				console.log('Heartbeat received.');
				break;
			case Message.CREATE_ROOM:
			case Message.JOIN_ROOM:
				this.store.dispatch(
					ROOM_SET({ name: payload.data.name, password: payload.data.password, players: payload.data.players }),
				);
				this.store.dispatch(USER_LOGGED_IN());
			case Message.NEW_GAME:
			case Message.FLIP_TILE:
				this.store.dispatch(
					SCORE_SET({ scoreboard: { red: payload.data.game.scoreboard.red, blue: payload.data.game.scoreboard.blue } }),
				);
				this.store.dispatch(TURN_SET({ turn: payload.data.game.turn }));
				this.store.dispatch(TILES_SET({ tiles: payload.data.game.tiles }));
				break;
			case Message.SWITCH_ROLE:
				this.store.dispatch(TILES_SET({ tiles: payload.data.game.tiles }));
			case Message.LEAVE_ROOM:
			case Message.SWITCH_TEAM:
				this.store.dispatch(PLAYERS_SET({ players: payload.data.players }));
				break;
			case Message.RANDOMIZE_TEAMS:
				this.store.dispatch(PLAYERS_SET({ players: payload.data.players }));
				this.store.dispatch(USER_SET({ ...payload.data.players.find((player: User) => player.id === this.user.id) }));
		}
	}
}
