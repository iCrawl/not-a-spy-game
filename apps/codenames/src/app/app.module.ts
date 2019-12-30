import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { GameModule } from './game/game.module';
import { WebSocketService } from './services/websocket.service';
import { SharedModule } from './shared/shared.module';
import { roomReducer } from './store/reducers/room.reducer';
import { userReducer } from './store/reducers/user.reducer';

@NgModule({
	declarations: [AppComponent, HeaderComponent, FooterComponent, HomeComponent, LoginComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		SharedModule,
		GameModule,
		StoreModule.forRoot(
			{ user: userReducer, room: roomReducer },
			{
				runtimeChecks: {
					strictStateImmutability: true,
					strictActionImmutability: true,
				},
			},
		),
		environment.production ? [] : StoreDevtoolsModule.instrument(),
		AppRoutingModule,
	],
	providers: [WebSocketService],
	bootstrap: [AppComponent],
})
export class AppModule {}
