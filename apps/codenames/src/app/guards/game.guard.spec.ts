import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jest-marbles';
import { GameGuard } from './game.guard';

describe('BoardGuard', () => {
	let guard: GameGuard;
	let store: MockStore<{ user: { loggedIn: boolean } }>;
	const initialState = {
		user: {
			loggedIn: false,
		},
	};

	beforeEach(async(() => {
		void TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [provideMockStore({ initialState })],
		}).compileComponents();
	}));

	beforeEach(() => {
		guard = TestBed.inject(GameGuard);
		store = TestBed.get(Store);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});

	it('should return false', () => {
		const expected = cold('a', { a: false });

		expect(guard.canActivate()).toBeObservable(expected);
	});

	it('should return true', () => {
		store.setState({ user: { loggedIn: true } });
		const expected = cold('a', { a: true });

		expect(guard.canActivate()).toBeObservable(expected);
	});
});
