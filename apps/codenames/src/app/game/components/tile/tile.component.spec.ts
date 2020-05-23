import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TileComponent } from './tile.component';

describe('TileComponent', () => {
	let component: TileComponent;
	let fixture: ComponentFixture<TileComponent>;

	beforeEach(async(() => {
		void TestBed.configureTestingModule({
			declarations: [TileComponent],
			providers: [provideMockStore()],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	afterEach(() => {
		fixture.destroy();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should flip()', () => {
		expect(component.flip()).toBeFalsy();
	});

	it('should short circuit flip()', () => {
		component.disabled = true;
		expect(component.flip()).toBeFalsy();
	});
});
