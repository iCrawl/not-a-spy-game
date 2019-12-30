import { Component } from '@angular/core';

@Component({
	selector: 'codenames-game',
	template: `
		<main>
			<div>
				<codenames-scoreboard></codenames-scoreboard>
				<codenames-teams></codenames-teams>
				<codenames-menu></codenames-menu>
			</div>
			<codenames-board></codenames-board>
		</main>
	`,
	styleUrls: ['./game.component.scss'],
})
export class GameComponent {}
