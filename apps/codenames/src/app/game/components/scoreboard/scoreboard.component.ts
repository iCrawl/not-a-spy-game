import { Component, OnInit } from '@angular/core';
import { Game } from '@codenames/models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { App } from '../../../models/app.model';

@Component({
	selector: 'codenames-scoreboard',
	template: `
		<span class="red" [class.turn]="(game$ | async)?.turn === 0">{{ (game$ | async)?.scoreboard?.red }}</span> -
		<span class="blue" [class.turn]="(game$ | async)?.turn === 1">{{ (game$ | async)?.scoreboard?.blue }}</span>
	`,
	styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {
	public game$!: Observable<Game>;

	public constructor(private readonly store: Store<App>) {}

	public ngOnInit() {
		this.game$ = this.store.pipe(select(state => state.game));
	}
}
