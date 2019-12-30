import { Component } from '@angular/core';

@Component({
	selector: 'codenames-root',
	template: `
		<div>
			<codenames-header></codenames-header>
			<router-outlet></router-outlet>
			<codenames-footer></codenames-footer>
		</div>
	`,
	styles: [
		`
			:host {
				display: grid;
				min-height: 100vh;
			}
		`,
	],
})
export class AppComponent {}
