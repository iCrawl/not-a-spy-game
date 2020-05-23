import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HighlightPlayerPipe } from '../../pipes/highlight-player.pipe';
import { BoardComponent } from '../board/board.component';
import { MenuComponent } from '../menu/menu.component';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';
import { TeamsComponent } from '../teams/teams.component';
import { TileComponent } from '../tile/tile.component';
import { GameComponent } from './game.component';

describe('HomeComponent', () => {
	let component: GameComponent;
	let fixture: ComponentFixture<GameComponent>;
	const initialState = {
		user: {
			id: '123',
			name: 'crawl',
			team: 0,
			role: 0,
		},
		room: {
			name: 'test',
			password: '',
			players: [
				{
					id: '123',
					name: 'crawl',
					team: 0,
					role: 0,
				},
			],
		},
		game: {
			scoreboard: {
				red: 8,
				blue: 9,
			},
			turn: 0,
			tiles: [],
		},
	};

	beforeEach(async(() => {
		void TestBed.configureTestingModule({
			declarations: [
				GameComponent,
				ScoreboardComponent,
				TeamsComponent,
				MenuComponent,
				BoardComponent,
				TileComponent,
				HighlightPlayerPipe,
			],
			providers: [provideMockStore({ initialState })],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GameComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
