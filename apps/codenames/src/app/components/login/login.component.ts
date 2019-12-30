import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role, Team } from '@codenames/models';
import { select, Store } from '@ngrx/store';
import nanoid from 'nanoid';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { App } from '../../models/app.model';
import { WebSocketService } from '../../services/websocket.service';
import { USER_SET } from '../../store/actions/user.actions';

@Component({
	selector: 'codenames-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
	public sub!: Subscription;

	public noGameFound = false;

	public loginForm = this.fb.group({
		name: ['', Validators.required],
		room: ['', Validators.required],
		password: '',
	});

	public constructor(
		private readonly fb: FormBuilder,
		private readonly store: Store<App>,
		private readonly webSocketService: WebSocketService,
		private readonly router: Router,
	) {}

	public ngOnInit() {
		this.sub = this.store
			.pipe(
				select(state => state),
				map(state => {
					if (state.game.tiles.length) return this.router.navigate(['/board']);
					if (state.user.loggedIn && !state.game.tiles.length) this.noGameFound = true;
				}),
			)
			.subscribe();
	}

	public ngOnDestroy() {
		this.sub.unsubscribe();
	}

	public get name() {
		return this.loginForm.get('name');
	}

	public get room() {
		return this.loginForm.get('room');
	}

	public get password() {
		return this.loginForm.get('password');
	}

	public generateId() {
		return nanoid(20);
	}

	public joinRoom() {
		const id = this.generateId();
		this.store.dispatch(
			USER_SET({
				id,
				name: this.name!.value,
				team: Team.UNASSIGNED,
				role: Role.GUESSER,
				loggedIn: true,
			}),
		);
		this.webSocketService.joinRoom(
			{ name: this.room!.value, password: this.password!.value },
			{ id, name: this.name!.value },
		);
	}

	public createRoom() {
		const id = this.generateId();
		this.store.dispatch(
			USER_SET({
				id,
				name: this.name!.value,
				team: Team.UNASSIGNED,
				role: Role.GUESSER,
				loggedIn: true,
			}),
		);
		this.webSocketService.createRoom(
			{ name: this.room!.value, password: this.password!.value },
			{ id, name: this.name!.value },
		);
	}
}
