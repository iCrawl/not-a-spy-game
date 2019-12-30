import { Component } from '@angular/core';

@Component({
	selector: 'codenames-header',
	template: `
		<header>
			<mat-toolbar>
				<span>Codenames</span>
			</mat-toolbar>
		</header>
	`,
	styleUrls: ['header.component.scss'],
})
export class HeaderComponent {}
