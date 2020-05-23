import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;
	let element: HTMLElement;

	beforeEach(async(() => {
		void TestBed.configureTestingModule({
			imports: [SharedModule],
			declarations: [HeaderComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		element = fixture.nativeElement;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should say "Codenames"', () => {
		expect(element.querySelector('header mat-toolbar span')!.textContent).toBe('Codenames');
	});
});
