import { Component, OnInit } from '@angular/core';
import { Room, Team } from '@codenames/models';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { App } from '../../../models/app.model';
import { User } from '../../../models/user.model';
import { WebSocketService } from '../../../services/websocket.service';
import { USER_TEAM_BLUE, USER_TEAM_RED } from '../../../store/actions/user.actions';

@Component({
	selector: 'codenames-teams',
	templateUrl: './teams.component.html',
	styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
	public sub!: Subscription;

	public user!: User;

	public room!: Room;

	public constructor(private readonly store: Store<App>, private readonly webSocketService: WebSocketService) {}

	public ngOnInit() {
		this.sub = this.store
			.pipe(
				select(state => state),
				map(state => {
					this.user = state.user;
					this.room = state.room;
				}),
			)
			.subscribe();
	}

	public ngOnDestroy() {
		this.sub.unsubscribe();
	}

	public joinTeam(team: Team) {
		this.store.dispatch(team === Team.RED ? USER_TEAM_RED() : USER_TEAM_BLUE());
		this.webSocketService.joinTeam(this.room, this.user);
	}

	public filterTeams(team: Team) {
		return this.room.players.filter(player => player.team === team);
	}

	public randomizeTeams() {
		this.webSocketService.randomizeTeams(this.room);
	}
}
