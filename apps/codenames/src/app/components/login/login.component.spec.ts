import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let store: MockStore<{}>;
	let dispatchSpy: jasmine.Spy;
	const initialState = {
		game: {
			tiles: [],
		},
		user: {
			loggedIn: true,
		},
	};

	beforeEach(async(() => {
		class BlankComponent {}

		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule,
				SharedModule,
				RouterTestingModule.withRoutes([{ path: 'board', component: BlankComponent }]),
			],
			declarations: [LoginComponent],
			providers: [provideMockStore({ initialState })],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		store = TestBed.get(Store);
		dispatchSpy = spyOn(store, 'dispatch');
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should create room', fakeAsync(() => {
		component.createRoom();
		tick(500);
		expect(dispatchSpy).toBeCalledTimes(1);
	}));

	it('should join room', fakeAsync(() => {
		component.joinRoom();
		tick(500);
		expect(dispatchSpy).toBeCalledTimes(1);
	}));
});
