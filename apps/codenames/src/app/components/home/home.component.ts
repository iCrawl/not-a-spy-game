import { Component } from '@angular/core';

@Component({
	selector: 'codenames-home',
	template: ` <codenames-login></codenames-login> `,
	styles: [
		`
			:host {
				display: grid;
				justify-items: center;
				align-items: center;
				margin: 2rem;
				height: 70%;
			}
		`,
	],
})
export class HomeComponent {}
