import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { App } from '../models/app.model';

@Injectable({
	providedIn: 'root',
})
export class GameGuard implements CanActivate {
	public constructor(private readonly store: Store<App>, private readonly router: Router) {}

	public canActivate() {
		return this.store.pipe(
			select(state => state.user.loggedIn),
			map(bool => {
				if (bool) return true;
				this.router.navigate(['/']);
				return false;
			}),
		);
	}
}
