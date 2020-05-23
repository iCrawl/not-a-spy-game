import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Role, Team } from '@codenames/models';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { USER_ROLE_GUESSER, USER_ROLE_SPYMASTER } from '../../../store/actions/user.actions';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
	let component: MenuComponent;
	let fixture: ComponentFixture<MenuComponent>;
	let store: MockStore<{ user: { id: string; name: string; team: Team; role: Role } }>;
	let dispatchSpy: jasmine.Spy;
	const initialState = {
		user: {
			id: '123',
			name: 'crawl',
			team: Team.RED,
			role: Role.GUESSER,
		},
		room: {
			name: 'test',
			password: '',
			players: [
				{
					id: '123',
					name: 'crawl',
					team: Team.RED,
					role: Role.GUESSER,
				},
			],
		},
		game: {
			scoreboard: {
				red: 8,
				blue: 9,
			},
			turn: Team.RED,
			tiles: [],
		},
	};

	beforeEach(async(() => {
		void TestBed.configureTestingModule({
			declarations: [MenuComponent],
			providers: [provideMockStore({ initialState })],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MenuComponent);
		component = fixture.componentInstance;
		store = TestBed.get(Store);
		dispatchSpy = spyOn(store, 'dispatch');
		fixture.detectChanges();
	});

	afterEach(() => {
		fixture.destroy();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should set users role to `Spymaster`', () => {
		component.setRole(Role.SPYMASTER);
		expect(dispatchSpy).toBeCalledTimes(1);
		expect(dispatchSpy).toBeCalledWith(USER_ROLE_SPYMASTER());
	});

	it('should set users role to `Guesser`', () => {
		store.setState({ ...initialState, user: { id: '123', name: 'crawl', team: Team.RED, role: Role.SPYMASTER } });
		component.setRole(Role.GUESSER);
		expect(dispatchSpy).toBeCalledTimes(1);
		expect(dispatchSpy).toBeCalledWith(USER_ROLE_GUESSER());
	});
});
