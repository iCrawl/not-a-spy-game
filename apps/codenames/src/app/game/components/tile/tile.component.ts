import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Game, Room, Team, Tile } from '@codenames/models';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { App } from '../../../models/app.model';
import { WebSocketService } from '../../../services/websocket.service';

@Component({
	selector: 'codenames-tile',
	template: `
		<button
			[ngClass]="{
				red: tile.type === 0,
				blue: tile.type === 1,
				assassin: tile.type === 3,
				spymaster: spymaster,
				flipped: tile.flipped
			}"
			(click)="flip()"
			mat-button
			[disabled]="disabled || spymaster || tile.flipped"
		>
			{{ tile.name | uppercase }}
		</button>
	`,
	styleUrls: ['./tile.component.scss'],
})
export class TileComponent implements OnInit, OnDestroy {
	@Input()
	public tile: Tile = {
		name: 'Loading...',
		type: Team.UNASSIGNED,
		flipped: false,
	};

	@Input()
	public idx = 0;

	@Input()
	public disabled = false;

	@Input()
	public spymaster = false;

	public sub!: Subscription;

	public room!: Room;

	public game!: Game;

	public constructor(private readonly store: Store<App>, private readonly webSocketService: WebSocketService) {}

	public ngOnInit() {
		this.sub = this.store
			.pipe(
				select((state) => state),
				map((state) => {
					this.room = state.room;
					this.game = state.game;
				}),
			)
			.subscribe();
	}

	public ngOnDestroy() {
		this.sub.unsubscribe();
	}

	public flip() {
		if (this.disabled) return;
		this.webSocketService.flip(this.room, this.game, this.idx);
	}
}
