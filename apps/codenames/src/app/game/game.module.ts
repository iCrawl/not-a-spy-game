import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { BoardComponent } from './components/board/board.component';
import { GameComponent } from './components/game/game.component';
import { MenuComponent } from './components/menu/menu.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TileComponent } from './components/tile/tile.component';
import { HighlightPlayerPipe } from './pipes/highlight-player.pipe';
import { scoreboardReducer } from './store/reducers/scoreboard.reducer';
import { tilesReducer } from './store/reducers/tiles.reducer';
import { turnReducer } from './store/reducers/turn.reducer';

@NgModule({
	declarations: [
		ScoreboardComponent,
		TeamsComponent,
		GameComponent,
		BoardComponent,
		TileComponent,
		MenuComponent,
		HighlightPlayerPipe,
	],
	imports: [
		CommonModule,
		SharedModule,
		StoreModule.forFeature('game', { scoreboard: scoreboardReducer, turn: turnReducer, tiles: tilesReducer }),
	],
	providers: [],
})
export class GameModule {}
