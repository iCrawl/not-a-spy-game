import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './game/components/game/game.component';
import { GameGuard } from './guards/game.guard';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'board', component: GameComponent, canActivate: [GameGuard] },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
