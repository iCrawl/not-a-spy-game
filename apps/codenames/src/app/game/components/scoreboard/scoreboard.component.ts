import { Component, OnInit } from '@angular/core';
import { Scoreboard } from '@codenames/models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { App } from '../../../models/app.model';

@Component({
	selector: 'codenames-scoreboard',
	template: `
		<span class="red">{{ (score$ | async)?.red }}</span> - <span class="blue">{{ (score$ | async)?.blue }}</span>
	`,
	styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {
	public score$!: Observable<Scoreboard>;

	public constructor(private readonly store: Store<App>) {}

	public ngOnInit() {
		this.score$ = this.store.pipe(select(state => state.game.scoreboard));
	}
}
