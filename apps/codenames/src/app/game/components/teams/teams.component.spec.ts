import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Role, Team } from '@codenames/models';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { USER_TEAM_BLUE, USER_TEAM_RED } from '../../../store/actions/user.actions';
import { HighlightPlayerPipe } from '../../pipes/highlight-player.pipe';
import { TeamsComponent } from './teams.component';

describe('TeamsComponent', () => {
	let component: TeamsComponent;
	let fixture: ComponentFixture<TeamsComponent>;
	let store: MockStore<{ user: { id: string; name: string; team: Team; role: Role } }>;
	let dispatchSpy: jasmine.Spy;
	const initialState = {
		user: {
			id: '123',
			name: 'crawl',
			team: Team.UNASSIGNED,
			role: Role.GUESSER,
		},
		room: {
			name: 'test',
			password: '',
			players: [
				{
					id: '123',
					name: 'crawl',
					team: Team.UNASSIGNED,
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
			declarations: [TeamsComponent, HighlightPlayerPipe],
			providers: [provideMockStore({ initialState })],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TeamsComponent);
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

	it('should set users team to `Red`', () => {
		component.joinTeam(Team.RED);
		expect(dispatchSpy).toBeCalledTimes(1);
		expect(dispatchSpy).toBeCalledWith(USER_TEAM_RED());
	});

	it('should set users role to `Blue`', () => {
		store.setState({ ...initialState });
		component.joinTeam(Team.BLUE);
		expect(dispatchSpy).toBeCalledTimes(1);
		expect(dispatchSpy).toBeCalledWith(USER_TEAM_BLUE());
	});
});
