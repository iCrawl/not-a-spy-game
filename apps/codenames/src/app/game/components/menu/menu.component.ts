import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game, Role, Room, User } from '@codenames/models';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { App } from '../../../models/app.model';
import { WebSocketService } from '../../../services/websocket.service';
import { USER_ROLE_GUESSER, USER_ROLE_SPYMASTER } from '../../../store/actions/user.actions';

@Component({
	selector: 'codenames-menu',
	template: `
		<div *ngIf="user.team !== 2">
			<button mat-stroked-button (click)="setRole(0)" [disabled]="user?.role === 0">
				Become Guesser
			</button>
			<button mat-stroked-button (click)="setRole(1)" [disabled]="spymaster">
				Become Spymaster
			</button>
			<button
				mat-stroked-button
				id="end-turn"
				(click)="endTurn()"
				[disabled]="user?.role === 1 || game?.turn !== user?.team"
			>
				End Turn
			</button>
			<button mat-stroked-button id="new-game" (click)="newGame()">
				New Game
			</button>
		</div>
	`,
	styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
	public sub!: Subscription;

	public user!: User;

	public room!: Room;

	public game!: Game;

	public constructor(private readonly store: Store<App>, private readonly webSocketService: WebSocketService) {}

	public get spymaster() {
		return this.room.players.some(player => player.team === this.user.team && player.role === Role.SPYMASTER);
	}

	public ngOnInit() {
		this.sub = this.store
			.pipe(
				select(state => state),
				map(state => {
					this.user = state.user;
					this.room = state.room;
					this.game = state.game;
				}),
			)
			.subscribe();
	}

	public ngOnDestroy() {
		this.sub.unsubscribe();
	}

	public setRole(role: Role) {
		this.store.dispatch(role === Role.GUESSER ? USER_ROLE_GUESSER() : USER_ROLE_SPYMASTER());
		this.webSocketService.setRole(this.room, this.user);
	}

	public endTurn() {
		this.webSocketService.endTurn(this.room);
	}

	public newGame() {
		this.webSocketService.newGame(this.room);
	}
}
