import { Component, OnInit } from '@angular/core';
import { Role, Team, Tile } from '@codenames/models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { App } from '../../../models/app.model';

@Component({
	selector: 'codenames-board',
	template: `
		<codenames-tile
			*ngFor="let tile of tiles$ | async as tiles; index as i"
			[tile]="tile"
			[idx]="i"
			[disabled]="disabled$ | async"
			[spymaster]="spymaster$ | async"
		></codenames-tile>
	`,
	styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
	public tiles$!: Observable<Tile[]>;

	public spymaster$!: Observable<boolean>;

	public disabled$!: Observable<boolean>;

	public constructor(private readonly store: Store<App>) {}

	public ngOnInit() {
		this.tiles$ = this.store.select(state => state.game.tiles);
		this.disabled$ = this.store.pipe(
			select(state => state),
			map(state => {
				if (state.user.team === Team.UNASSIGNED) return true;
				if (state.game.turn !== state.user.team) return true;
				if (state.game.scoreboard.red === 0 || state.game.scoreboard.blue === 0) return true;
				return false;
			}),
		);
		this.spymaster$ = this.store.select(state => state.user.role === Role.SPYMASTER);
	}
}
