import { Role } from '@codenames/models';
import { HighlightPlayerPipe } from './highlight-player.pipe';

describe('HighlightPlayerPipe', () => {
	let pipe: HighlightPlayerPipe;

	beforeEach(() => {
		pipe = new HighlightPlayerPipe();
	});

	it('should create', () => {
		expect(pipe).toBeTruthy();
	});

	it('should return username without brackets', () => {
		expect(pipe.transform({ name: 'Crawl', role: Role.GUESSER })).toBe('Crawl');
	});

	it('should return username in brackets', () => {
		expect(pipe.transform({ name: 'Crawl', role: Role.SPYMASTER })).toBe('[ Crawl ]');
	});
});
