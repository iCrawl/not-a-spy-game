import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Role, Scoreboard, Team } from '@codenames/models';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jest-marbles';
import { TileComponent } from '../tile/tile.component';
import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
	let component: BoardComponent;
	let fixture: ComponentFixture<BoardComponent>;
	let store: MockStore<{ user: { team: Team; role: Role }; game: { scoreboard: Scoreboard; turn: Team } }>;
	const initialState = {
		user: {
			team: Team.UNASSIGNED,
			role: Role.GUESSER,
		},
		game: {
			scoreboard: {
				red: 9,
				blue: 8,
			},
			turn: Team.RED,
		},
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BoardComponent, TileComponent],
			providers: [provideMockStore({ initialState })],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BoardComponent);
		component = fixture.componentInstance;
		store = TestBed.get(Store);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should return true for `disabled$`', () => {
		const expected = cold('a', { a: true });

		expect(component.disabled$).toBeObservable(expected);
	});

	it('should return true for `disabled$`', () => {
		const expected = cold('a', { a: true });
		store.setState({ ...initialState, user: { team: Team.BLUE, role: Role.GUESSER } });

		expect(component.disabled$).toBeObservable(expected);
	});

	it('should return true for `disabled$`', () => {
		const expected = cold('a', { a: true });
		store.setState({
			user: { team: Team.RED, role: Role.GUESSER },
			game: { scoreboard: { red: 0, blue: 2 }, turn: Team.RED },
		});

		expect(component.disabled$).toBeObservable(expected);
	});

	it('should return false for `disabled$`', () => {
		store.setState({ ...initialState, user: { team: 0, role: 0 } });
		const expected = cold('a', { a: false });

		expect(component.disabled$).toBeObservable(expected);
	});

	it('should return true for `spymaster$`', () => {
		store.setState({ ...initialState, user: { team: 0, role: 1 } });
		const expected = cold('a', { a: true });

		expect(component.spymaster$).toBeObservable(expected);
	});

	it('should return false for `spymaster$`', () => {
		store.setState({ ...initialState, user: { team: 0, role: 0 } });
		const expected = cold('a', { a: false });

		expect(component.spymaster$).toBeObservable(expected);
	});
});
